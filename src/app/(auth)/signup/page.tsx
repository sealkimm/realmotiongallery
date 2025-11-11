'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import z from 'zod';

import { supabase } from '@/lib/supabaseClient';
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

type FormValues = z.infer<typeof formSchema>;

const formSchema = z
  .object({
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요.' }),
    email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 6자 이상이어야 합니다.' })
      .max(20, { message: '비밀번호는 20자 이하이어야 합니다.' }),
    confirmPassword: z.string().min(1, { message: '비밀번호를 확인해주세요.' }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

const SignupPage = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const checkNicknameDuplicate = async nickname => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('nickname', nickname)
      .maybeSingle();

    if (error) {
      toast.error('닉네임 확인 중 오류가 발생했습니다.');
      return false;
    }

    return !!data;
  };

  const checkEmailDuplicate = async email => {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle();

    if (error) {
      toast.error('이메일 확인 중 오류가 발생했습니다.');
      return false;
    }

    return !!data;
  };

  const onSubmit = async (data: FormValues) => {
    const { nickname, email, password } = data;

    const [isDuplicateNickname, isDuplicateEmail] = await Promise.all([
      checkNicknameDuplicate(nickname),
      checkEmailDuplicate(email),
    ]);

    let hasError = false;

    if (isDuplicateNickname) {
      form.setError('nickname', { message: '이미 존재하는 닉네임입니다.' });
      hasError = true;
    }

    if (isDuplicateEmail) {
      form.setError('email', { message: '이미 존재하는 이메일입니다.' });
      hasError = true;
    }

    if (hasError) return;

    //try문 해야하나??
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { nickname },
        emailRedirectTo: `${window.location.origin}/signin`,
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    // 이메일 인증이 필요한 경우
    // if (signUpData?.user?.identities?.length === 0) {
    //   toast.info('이미 가입된 이메일입니다.');
    //   return;
    // }

    const userId = signUpData.user?.id;
    if (userId) {
      const { error: userError } = await supabase.from('users').insert({
        id: userId,
        nickname,
        email,
      });

      if (userError) {
        toast.error(userError.message);
        return;
      }
    }

    toast.success('회원가입이 완료되었습니다.');
    // router.push('/signin');
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
                        <FormControl>
                          <Input {...field} placeholder="닉네임" />
                        </FormControl>
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
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="이메일을 입력해주세요."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mb-6">
                  <div>
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
                  </div>
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
                  <Button type="submit" className="gradient-background w-full">
                    Sign Up
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm text-gray-500">
              이미 계정이 있으신가요?
              <Link
                href="/signin"
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
