'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabaseClient';
import { upsertUserInfo } from '@/lib/user';

const AuthCallbackPage = () => {
  const router = useRouter();
  console.log('test2');
  // useEffect(() => {
  //   const handleAuth = async () => {
  //     const {
  //       data: { session },
  //       error,
  //     } = await supabase.auth.getSession();

  //     // if (data.session) {
  //     //   router.replace('/'); // 메인으로
  //     // } else {
  //     //   router.replace('/auth/login'); // 실패 시 로그인 페이지로
  //     // }

  //     if (error || !session) {
  //       toast.error('세션 정보를 가져오지 못했습니다.');
  //       router.replace('/auth/login');
  //       return;
  //     }

  //     try {
  //       await upsertUserInfo(session?.user);
  //     } catch (error) {
  //       toast.error('사용자 정보를 저장하지 못했습니다.');
  //       router.replace('/auth/login');
  //     } finally {
  //       router.replace('/');
  //     }
  //   };

  //   handleAuth();
  // }, [router]);
};

export default AuthCallbackPage;
