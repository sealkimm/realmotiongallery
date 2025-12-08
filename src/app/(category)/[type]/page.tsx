import { createSupabaseServerClient } from '@/lib/supabase/server';
import CardListAnimator from '@/components/animations/CardListAnimator';
import PageHeader from '@/components/layouts/PageHeader';
import SearchBar from '@/features/category/components/SearchBar';
import { categories } from '@/features/category/data/categories';
import ExampleCard from '@/features/example/components/ExampleCard';
import { EXAMPLE_SELECT } from '@/features/example/constants/exampleSelect';
import type { UserRelation } from '@/features/example/types/example';
import { transformExampleData } from '@/features/example/utils/groupExamplesByCategory';

interface CategoryPageProps {
  params: { type: string };
}
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { type } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const category = categories.find(c => c.type === type);
  if (!category) {
    throw new Error(`카테고리를 찾을 수 없습니다: ${type}`);
  }

  const { data, error: examplesError } = await supabase
    .from('examples')
    .select(EXAMPLE_SELECT)
    .eq('type', type)
    .order('created_at', { ascending: false });

  if (examplesError) {
    throw new Error(
      `예제 목록을 불러오지 못했습니다: ${examplesError.message}`,
    );
  }

  const examples = transformExampleData(data, user?.id);

  const pageHeaderProps = {
    title: `${category.title} Animations`,
    description: category.description,
    badgeTitle: category.title,
    badgeColor: category.color,
    className: 'mb-8',
  };

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <PageHeader {...pageHeaderProps} />
          <SearchBar category={category} />
          <CardListAnimator direction="up">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {examples.map(item => (
                <ExampleCard key={item.id} category={category} example={item} />
              ))}
            </div>
          </CardListAnimator>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
