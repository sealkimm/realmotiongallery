import { createSupabaseServerClient } from '@/lib/supabase/server';
import { categories } from '@/features/category/data/categories';
import type { Example } from '@/features/example/types/example';
import CategorySection from '@/features/home/components/CategorySection';
import HeroSection from '@/features/home/components/HeroSection';

const HomePage = async () => {
  const supabase = createSupabaseServerClient();

  const [
    {
      data: { user },
    },
    { data: examples, error: examplesError },
  ] = await Promise.all([
    supabase.auth.getUser(),
    supabase.from('examples').select('*'),
  ]);

  if (examplesError) throw new Error('예제 목록을 불러오지 못했습니다.');

  const [{ data: likes }, { data: bookmarks }] = await Promise.all([
    supabase.from('likes').select('*').eq('user_id', user?.id),
    supabase.from('bookmarks').select('*').eq('user_id', user?.id),
  ]);

  const likedSet = new Set(likes?.map(i => i.example_id) ?? []);
  const bookmarkedSet = new Set(bookmarks?.map(i => i.example_id) ?? []);

  const exampleWithInteractions: Example[] = (examples ?? []).map(item => ({
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
    cate => examplesByType[cate.type]?.length > 0,
  );

  return (
    <>
      <HeroSection />
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
    </>
  );
};

export default HomePage;
