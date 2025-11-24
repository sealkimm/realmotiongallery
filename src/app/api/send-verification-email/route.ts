import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { supabase } from '@/lib/supabase/client';

const resend = new Resend(process.env.RESEND_API_KEY);

// auth에 있는 route.ts랑 비교
export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();

    // 6자리 인증번호 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 이미 존재하는 경우 삭제
    await supabase.from('verification_codes').delete().eq('email', email);
    await supabase.from('verification_codes').insert({ email, code });

    // 이메일 전송
    await resend.emails.send({
      from: 'MotionGallery <onboarding@resend.dev>',
      to: email,
      subject: 'MotionGallery 이메일 인증 코드',
      html: `
        <p>안녕하세요. MotionGallery 입니다.</p>
        <p>인증 코드는 ${code}입니다.</p>
        <p>감사합니다.</p>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
