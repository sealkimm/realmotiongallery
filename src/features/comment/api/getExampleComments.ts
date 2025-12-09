'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

interface GetExampleCommentsProps {
  id: string;
  page: number;
  pageSize: number;
}

export const getExampleComments = async ({
  id,
  page,
  pageSize,
}: GetExampleCommentsProps) => {
  const supabase = await createSupabaseServerClient();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('comments')
    .select('*, author:users(id, nickname, avatar_url)', { count: 'exact' })
    .eq('example_id', id)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw new Error(`댓글을 불러오지 못했습니다: ${error.message}`);

  return {
    data,
    hasMore: (count || 0) > to + 1,
    totalCount: count || 0,
  };
};
