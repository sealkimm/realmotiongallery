// 이 파일 위치 여기가 맞을까
// 파일 분리해야하는거 같음
import { User } from '@supabase/supabase-js';

import { supabase } from './supabase/client';

export const upsertUserInfo = async (user: User, nickname?: string) => {
  const { id, email, user_metadata } = user;
  const finalNickname = nickname || user_metadata.nickname;
  const finalAvatarUrl = user_metadata.avatar_url || '';
  const finalCreatedAt = user_metadata.created_at || new Date();

  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (existingUser) return existingUser;

  const { data, error } = await supabase.from('users').insert({
    id,
    email,
    nickname: finalNickname,
    created_at: finalCreatedAt,
    avatar_url: finalAvatarUrl,
  });
  if (error) throw error;

  return data;
};
