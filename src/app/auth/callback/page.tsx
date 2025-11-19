'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createRandomNickname } from '@/lib/nickname';
import { supabase } from '@/lib/supabaseClient';
import { upsertUserInfo } from '@/lib/user';

//소셜 로그인 전용 콜백페이지!
const AuthCallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        toast.error('세션 정보를 가져오지 못했습니다.');
        return;
      }

      const user = session.user;
      const nickname = await createRandomNickname();
      // const nickname = (await createRandomNickname()) ?? user.id.slice(0, 6);

      await upsertUserInfo(user, nickname);
      await supabase.auth.refreshSession();
      router.push('/');
    };

    handleAuth();
  }, [router]);
};

export default AuthCallbackPage;
