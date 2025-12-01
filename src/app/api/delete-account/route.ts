import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 },
      );
    }

    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    await supabaseAdmin.from('users').delete().eq('id', userId);
    await supabaseAdmin.from('likes').delete().eq('user_id', userId);
    await supabaseAdmin.from('bookmarks').delete().eq('user_id', userId);
    await supabaseAdmin.from('comments').delete().eq('user_id', userId);
    await supabaseAdmin.from('examples').delete().eq('user_id', userId);

    const { error: deleteError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteError) {
      throw new Error(deleteError?.message || '회원탈퇴 실패');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 },
    );
  }
};
