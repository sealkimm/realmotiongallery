import { createSupabaseServerClient } from '@/lib/supabase/server';
import { categories } from '@/features/category/data/categories';
import type {
  ExampleDetails,
  UserRelation,
} from '@/features/example/types/example';
import CategorySection from '@/features/home/components/CategorySection';
import HeroSection from '@/features/home/components/HeroSection';

const HomePage = async () => {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: examples, error: examplesError } = await supabase
    .from('examples')
    .select(
      '*, users(id,nickname,avatar_url), comments(count),likes(count), user_like:likes!left(user_id), user_bookmark:bookmarks!left(user_id)',
    )
    .order('created_at')
    .then(({ data, error }) => ({
      data:
        data?.map(
          ({ users, comments, likes, user_like, user_bookmark, ...item }) => ({
            ...item,
            author: users,
            commentCount: comments[0].count,
            likeCount: likes[0].count,
            isLiked: user_like.some(
              (i: UserRelation) => i.user_id === user?.id,
            ),
            isBookmarked: user_bookmark.some(
              (i: UserRelation) => i.user_id === user?.id,
            ),
          }),
        ) || [],
      error,
    }));

  if (examplesError) throw new Error('예제 목록을 불러오지 못했습니다.');

  const examplesByType = examples.reduce<Record<string, ExampleDetails[]>>(
    (acc, item) => {
      const type = item.type;
      (acc[type] ||= []).push(item);
      return acc;
    },
    {},
  );

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
              examples={examplesByType[category.type]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
