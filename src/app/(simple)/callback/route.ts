import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { createRandomNickname } from '@/features/auth/api/createRandomNickname';

export const GET = async (request: Request) => {
  const supabase = await createSupabaseServerClient();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Social Login Error', error);
      return NextResponse.redirect(
        new URL('/login?error=SocialLoginFailed', requestUrl.origin),
      );
    }

    if (data?.user) {
      const { data: dbUser } = await supabase
        .from('users')
        .select('nickname')
        .eq('id', data.user.id)
        .single();

      if (dbUser?.nickname.startsWith('사용자')) {
        const randomNickname = await createRandomNickname();

        await supabase
          .from('users')
          .update({ nickname: randomNickname })
          .eq('id', data.user.id);
      }
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
};
