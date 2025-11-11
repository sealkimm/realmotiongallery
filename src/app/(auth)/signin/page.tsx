'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import z from 'zod';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [login, isLoading] = useState(false); // useAuth 써야함.

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    //한국어로 할건지 영어로 할건지 통일화하기
    // <form>
    //   <Input type="email" placeholder="Email" />
    //   <Input type="password" placeholder="Password" />
    //   <Button type="submit">Login</Button>
    // </form>
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
                  <Button type="submit" className="gradient-background w-full">
                    Sign In
                  </Button>
                </div>
              </form>
            </Form>
            <div className="mt-6 text-center text-sm text-gray-500">
              아직 계정이 없으신가요?
              <Link
                href="/signup"
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
