import { NextResponse } from 'next/server';

import { createSupabaseServerClient } from '@/lib/supabase/server';

/** 방문자 조회 */
export const GET = async () => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('visitors')
    .select('*')
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

export const POST = async () => {
  const supabase = await createSupabaseServerClient();
  const today = new Date().toISOString().slice(0, 10);

  // 기존 카운트
  const { data: stats } = await supabase
    .from('visitors')
    .select('*')
    .eq('id', 1)
    .single();

  let totalVisits = stats.total_visits;
  let todayVisits = stats.today_visits;
  const savedDate = stats.today_date;

  // 날짜 바뀌면 초기화
  if (savedDate !== today) {
    todayVisits = 0;
  }

  // 카운팅 증가
  totalVisits += 1;
  todayVisits += 1;

  // 수파베이스 업데이트
  const { data, error } = await supabase
    .from('visitors')
    .update({
      total_visits: totalVisits,
      today_visits: todayVisits,
      today_date: today,
      updated_at: new Date(),
    })
    .eq('id', 1)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};
