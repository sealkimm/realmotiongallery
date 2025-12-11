'use server';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import { EXAMPLE_SELECT } from '@/features/example/constants/exampleSelect';
import { transformExampleData } from '@/features/example/utils';

interface GetExamplesByCategoryProps {
  type: string;
  page: number;
  pageSize: number;
  searchQuery?: string;
}

export const getExamplesByCategory = async ({
  type,
  page,
  pageSize,
  searchQuery,
}: GetExamplesByCategoryProps) => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const from = page * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('examples')
    .select(EXAMPLE_SELECT, { count: 'exact' })
    .eq('type', type);

  // 검색어 있는 경우 검색 조건 추가
  if (searchQuery && searchQuery.trim()) {
    query = query.or(
      `title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`,
    );
  }

  const { data, error, count } = await query
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
