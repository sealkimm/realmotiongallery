'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Shuffle } from 'lucide-react';
import { toast } from 'sonner';
import z from 'zod';

import { createRandomNickname } from '@/lib/nickname';
import { supabase } from '@/lib/supabaseClient';
import { upsertUserInfo } from '@/lib/user';
import useSocialLogin from '@/hooks/useSocialLogin';
import AuthSocialButtonGroups from '@/components/buttons/buttonGroups/AuthSocialButtonGroups';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const passwordSchema = z
  .string()
  .min(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
  .max(20, { message: '비밀번호는 20자 이하이어야 합니다.' })
  .regex(/[A-Za-z]/, { message: '영문자를 포함해야 합니다.' })
  .regex(/\d/, { message: '숫자를 포함해야 합니다.' });

const formSchema = z
  .object({
    nickname: z
      .string()
      .min(1, { message: '닉네임을 입력해주세요.' })
      .regex(/^\S+$/, { message: '닉네임에 공백을 포함할 수 없습니다.' }),
    email: z
      .string()
      .email({ message: '유효하지 않은 이메일 주소입니다.' })
      .refine(email => email.endsWith('@gmail.com'), {
        message: '인증 정책상 Gmail(@gmail.com) 주소만 지원하고 있습니다.',
      }),
    verifyCode: z.string().optional(),
    password: passwordSchema,
    confirmPassword: z.string().min(1, { message: '비밀번호를 확인해주세요.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

const SignupPage = () => {
  const router = useRouter();
  const { onClickSocialLogin } = useSocialLogin();
  const [isEmailVerificationSent, setIsEmailVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeSending, setIsCodeSending] = useState(false);

  //바깥에 적어도 돠나??
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      email: '',
      verifyCode: '',
      password: '',
      confirmPassword: '',
    },
  });

  const currentPassword = form.watch('password');

  useEffect(() => {
    if (currentPassword) {
      form.trigger('password');
    }
  }, [currentPassword]);

  // ✅ DB에서 특정 값 중복 확인
  const checkDuplication = async (column: string, value: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq(column, value)
      .maybeSingle();

    if (error) {
      toast.error('중복 확인 중 오류가 발생했습니다.');
      return false;
    }

    return Boolean(data);
  };

  // ✅ 이메일 중복확인 / 인증번호 전송
  const onClickSendVerification = async email => {
    // 1. 스키마 기반 유효성 검사
    const isValid = await form.trigger('email');
    if (!isValid) return;

    const trimmedEmail = email.trim();
    const isDuplicatedEmail = await checkDuplication('email', trimmedEmail);
    if (isDuplicatedEmail) {
      form.setError('email', { message: '이미 존재하는 이메일입니다.' });
      return;
    }

    try {
      setIsCodeSending(true);

      const response = await fetch('/api/send-verification-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('이메일 전송 실패');
      }

      toast.success('인증번호가 이메일로 전송되었습니다.');
      setIsEmailVerificationSent(true);
    } catch (error) {
      toast.error('❌ 이메일 전송에 실패했습니다.');
    } finally {
      setIsCodeSending(false);
    }
  };

  // ✅ 인증번호 확인
  const onClickVerifyCode = async () => {
    const email = form.getValues('email');
    const code = form.getValues('verifyCode');

    const { data } = await supabase
      .from('verification_codes')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .maybeSingle();

    if (!data) {
      form.setError('verifyCode', { message: '인증번호가 일치하지 않습니다.' });
      return;
    }
    setIsEmailVerified(true);
    form.clearErrors('verifyCode');
    toast.success('✅ 이메일 인증이 완료되었습니다.');
  };

  const onSubmit = async (data: FormValues) => {
    const { nickname, email, password } = data;

    if (!isEmailVerified) {
      toast.error('⚠️ 이메일 인증을 완료해주세요.');
      return;
    }

    const isDuplicatedNickname = await checkDuplication('nickname', nickname);
    if (isDuplicatedNickname) {
      form.setError('nickname', { message: '이미 존재하는 닉네임입니다.' });
      return;
    }

    //try문 해야하나??
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    const authUser = signUpData.user;

    if (authUser) {
      await upsertUserInfo(authUser);
      await supabase.auth.refreshSession();
    }

    toast.success('✅ 회원가입이 완료되었습니다.');
    router.push('/');
  };

  const onClickRandomBtn = async () => {
    const randomNickname = await createRandomNickname();
    if (randomNickname) {
      form.setValue('nickname', randomNickname);
    }
  };

  return (
    // signin 페이지랑 유사함 컴포넌트 분리 알아보기
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center border border-blue-500 bg-background">
      <div className="w-full max-w-md">
        <Card className="border-white/10 bg-gray-900/50 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="gradient-text mb-2 text-3xl font-bold">
              회원가입
            </CardTitle>
            <CardDescription className="text-gray-400">
              좋아하는 모션을 기록하고 공유하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-gray-300">
                            닉네임
                          </FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input {...field} placeholder="닉네임" />
                            </FormControl>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={onClickRandomBtn}
                            >
                              <Shuffle />
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-gray-300">
                            이메일
                          </FormLabel>
                          <div className="flex items-center gap-2">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="이메일을 입력해주세요."
                                disabled={isEmailVerificationSent}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="secondary"
                              onClick={() =>
                                onClickSendVerification(field.value)
                              }
                              className="min-w-20"
                              disabled={isEmailVerificationSent}
                            >
                              {isCodeSending ? (
                                <Loader2 className="animate-spin" />
                              ) : (
                                '인증하기'
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {isEmailVerificationSent && !isEmailVerified && (
                      <div className="mt-2">
                        <FormField
                          control={form.control}
                          name="verifyCode"
                          render={({ field }) => (
                            <FormItem>
                              <div className="flex items-center gap-2">
                                <FormControl>
                                  <Input
                                    {...field}
                                    placeholder="인증번호를 입력해주세요."
                                    disabled={isEmailVerified}
                                  />
                                </FormControl>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  onClick={onClickVerifyCode}
                                  className="min-w-20"
                                  disabled={isEmailVerified}
                                >
                                  확인
                                </Button>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mb-2 block text-gray-300">
                            비밀번호
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="영문자,숫자,특수문자 포함 6~20자"
                              type="password"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="mt-2">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="비밀번호를 확인해 주세요."
                                type="password"
                                onBlur={async () =>
                                  await form.trigger('confirmPassword')
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div>
                    {/* <Button type="submit" className="gradient-background w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" /> Signing In...
                  </>
                ) : (
                  'Sign In'
                )}
              </Button> */}
                    <Button
                      type="submit"
                      className="gradient-background w-full"
                    >
                      Sign Up
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="border-t border-white/10"></div>
              <AuthSocialButtonGroups onClickSocialLogin={onClickSocialLogin} />
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              이미 계정이 있으신가요?
              <Link
                href="/auth/login"
                className="ml-2 align-text-bottom text-purple-400 transition-colors hover:text-purple-300"
              >
                Sign In
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
