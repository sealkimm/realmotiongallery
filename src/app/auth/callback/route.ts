import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { insertUserInfo } from '@/features/auth/api/insertUserInfo';

export const GET = async (request: Request) => {
  const supabase = await createSupabaseServerClient();
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error('Social Login Error', error);
      return NextResponse.redirect(
        new URL('/auth/login?error=SocialLoginFailed', requestUrl.origin),
      );
    }

    if (data?.user) {
      await insertUserInfo(data.user);
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
};
