'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import z from 'zod';

import { supabase } from '@/lib/supabaseClient';
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

type FormValues = z.infer<typeof formSchema>;

const formSchema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 주소입니다.' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
});

const LoginPage = () => {
  const router = useRouter();
  const { onClickSocialLogin } = useSocialLogin();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    try {
      const { data: signInData, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (error) {
        toast.error('❌ 이메일 또는 비밀번호를 다시 확인해주세요.');
        return;
      }

      toast.success('✅ 로그인이 완료되었습니다.'); // 알림 필요없는거 같으면 빼기

      // 회원가입 페이지에서는 settimeout 줌
      router.push('/');
    } catch (error) {
      toast.error('서버 오류가 발생했습니다.');
      console.error(error);
      toast.error('로그인 실패');
    }
  };

  return (
    //텍스트들 한국어로 할건지 영어로 할건지 통일화하기
    <div className="fixed inset-0 z-50 flex h-screen items-center justify-center border border-blue-500 bg-background">
      <div className="w-full max-w-md">
        <Card className="border-white/10 bg-gray-900/50 backdrop-blur-md">
          <CardHeader className="text-center">
            <CardTitle className="gradient-text mb-2 text-3xl font-bold">
              로그인
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
                  <div className="mb-8">
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
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      Sign In
                    </Button>
                  </div>
                </form>
              </Form>
              <div className="border-t border-white/10"></div>
              <AuthSocialButtonGroups onClickSocialLogin={onClickSocialLogin} />
            </div>
            <div className="mt-6 text-center text-sm text-gray-500">
              아직 계정이 없으신가요?
              <Link
                href="/auth/signup"
                className="ml-2 align-text-bottom text-purple-400 transition-colors hover:text-purple-300"
              >
                Sign Up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
