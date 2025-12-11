import PageHeader from '@/components/layouts/PageHeader';
import CategoryExampleContainer from '@/features/category/components/CategoryExampleContainer';
import { categories } from '@/features/category/data/categories';
import { getExamplesByCategory } from '@/features/example/api/getCategoryExamples';

interface CategoryPageProps {
  params: { type: string };
}
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { type } = await params;

  const category = categories.find(c => c.type === type);
  if (!category) {
    throw new Error(`카테고리를 찾을 수 없습니다: ${type}`);
  }

  const { data: examples, hasMore } = await getExamplesByCategory({
    type,
    page: 0,
    pageSize: 12,
  });

  const pageHeaderProps = {
    title: `${category.title} Animations`,
    description: category.description,
    badgeTitle: category.title,
    badgeColor: category.color,
  };

  return (
    <div className="pb-20 pt-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <PageHeader {...pageHeaderProps} />
          <CategoryExampleContainer
            category={category}
            examples={examples}
            hasMore={hasMore}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
