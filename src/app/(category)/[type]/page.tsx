import { createSupabaseServerClient } from '@/lib/supabase/server';
import CardListAnimator from '@/components/animations/CardListAnimator';
import PageHeader from '@/components/layouts/PageHeader';
import SearchBar from '@/features/category/components/SearchBar';
import { categories } from '@/features/category/data/categories';
import ExampleCard from '@/features/example/components/ExampleCard';

interface CategoryPageProps {
  params: { type: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { type } = await params;
  const supabase = await createSupabaseServerClient();
  const category = categories.find(c => c.type === type);

  const { data: examples, error: examplesError } = await supabase
    .from('examples')
    .select('*')
    .eq('type', type);

  if (!category || examplesError)
    throw new Error('예제 목록을 불러오지 못했습니다.');

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
