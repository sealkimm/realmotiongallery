'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EXAMPLE_SELECT } from '@/features/example/constants/exampleSelect';
import { transformExampleData } from '@/features/example/utils/groupExamplesByCategory';

interface GetExamplesByCategoryProps {
  type: string;
  page: number;
  pageSize: number;
}

export const getExamplesByCategory = async ({
  type,
  page,
  pageSize,
}: GetExamplesByCategoryProps) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  const { data, error, count } = await supabase
    .from('examples')
    .select(EXAMPLE_SELECT, { count: 'exact' })
    .eq('type', type)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(`예제 목록을 불러오지 못했습니다: ${error.message}`);
  }

  return {
    data: transformExampleData(data, user?.id),
    hasMore: (count || 0) > to + 1,
  };
};
