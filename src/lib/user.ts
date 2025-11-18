// 이 파일 위치 여기가 맞을까

import { User } from '@supabase/supabase-js';

import { supabase } from './supabaseClient';

export const upsertUserInfo = async (user: User) => {
  const { id, email, user_metadata } = user;

  const { error } = await supabase.from('users').upsert(
    {
      id,
      email,
      nickname: user_metadata.nickname || 'test',
    },
    { onConflict: 'id' },
  );

  if (error) {
    throw error;
  }
};
