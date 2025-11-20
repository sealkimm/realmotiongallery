//gsap땜에 client 넣음, 분리하기
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { Example } from '@/types/example';

import { supabase } from '@/lib/supabaseClient';
import CategorySection from '@/components/sections/CategorySection';
import HeroSection from '@/components/sections/HeroSection';

const MainPage = async () => {
  const { data: exampleListData, error } = await supabase
    .from('examples')
    .select('*');

  if (!exampleListData) {
    //다른 페이지랑 통일성 주기
    return notFound();
  }

  const examplesByType = exampleListData.reduce<Record<string, Example[]>>(
    (acc, item) => {
      const type = item.type;
      (acc[type] ||= []).push(item);
      return acc;
    },
    {},
  );

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
