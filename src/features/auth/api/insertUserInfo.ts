import type { User } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase/client';
import { createRandomNickname } from '@/features/auth/api/createRandomNickname';

export const insertUserInfo = async (user: User) => {
  const { id, email, user_metadata } = user;
  const isEmailProvider = user.app_metadata.provider === 'email';
  let nickname;

  //  기존 유저 조회
  const { data: existingUser, error: existingUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (existingUserError) {
    throw existingUserError;
  }

  if (existingUser) {
    return existingUser;
  }

  if (isEmailProvider) {
    nickname = user_metadata.nickname;
  } else {
    nickname = await createRandomNickname();
  }

  // 유저 정보 삽입
  const { data: insertedUser, error: insertError } = await supabase
    .from('users')
    .insert({
      id,
      email,
      nickname: nickname ?? `user-${id.slice(0, 6)}`,
      avatar_url: user_metadata.avatar_url || '',
    })
    .select()
    .single();

  if (insertError) throw insertError;

  return insertedUser;
};
