//gsap땜에 client 넣음, 분리하기
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { Example } from '@/types/example';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import CategorySection from '@/components/sections/CategorySection';
import HeroSection from '@/components/sections/HeroSection';

const MainPage = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: examples, error } = await supabase.from('examples').select('*');

  const { data: likes } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', user?.id);

  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user?.id);

  if (!examples) {
    //다른 페이지랑 통일성 주기
    return notFound();
  }

  // 이 방식도 쓸 수 있는지 보기
  // const list = examples.map(e => ({
  //   ...e,
  //   isLiked: !!e.likes?.length,
  //   isBookmarked: !!e.bookmarks?.length,
  // }));

  const likedSet = new Set(likes?.map(i => i.example_id));
  const bookmarkedSet = new Set(bookmarks?.map(i => i.example_id));

  const exampleWithInteractions: Example[] = examples.map(item => ({
    ...item,
    isLiked: likedSet.has(item.id),
    isBookmarked: bookmarkedSet.has(item.id),
  }));

  const examplesByType = exampleWithInteractions.reduce<
    Record<string, Example[]>
  >((acc, item) => {
    const type = item.type;
    (acc[type] ||= []).push(item);
    return acc;
  }, {});

  const filteredCategories = categories.filter(
    category => examplesByType[category.type]?.length > 0,
  );

  return (
    <div>
      {/* 메인 배너 영역 */}
      <HeroSection />
      {/* 메인 컨텐츠 영역*/}
      <div className="relative pb-40">
        <div className="container mx-auto flex flex-col gap-24 px-4">
          {filteredCategories.map(category => (
            <CategorySection
              key={category.id}
              category={category}
              exampleList={examplesByType[category.type]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
