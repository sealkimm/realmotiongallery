import { supabase } from '@/lib/supabase/client';

export const checkUserExists = async (col: string, val: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq(col, val)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
};
