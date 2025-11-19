import { ADJ_LIST, NOUN_LIST } from '@/constants/constants';

import { supabase } from './supabaseClient';

//user.ts도 그렇고 이 파일 여기 두는게 맞을까??
const getRandomItem = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

export const createRandomNickname = async () => {
  const MAX_TRY = 10;

  for (let i = 0; i < MAX_TRY; i++) {
    const adj = getRandomItem(ADJ_LIST);
    const noun = getRandomItem(NOUN_LIST);
    const num = Math.floor(Math.random() * 100) + 1;
    const randomNickname = `${adj}${noun}${num}`;

    // 중복 확인
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('nickname', randomNickname)
      .maybeSingle();

    if (!data && !error) {
      return randomNickname;
    }
  }

  return null;
};
