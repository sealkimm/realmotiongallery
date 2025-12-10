import PageHeader from '@/components/layouts/PageHeader';
import SearchBar from '@/features/category/components/SearchBar';
import { categories } from '@/features/category/data/categories';
import { getExamplesByCategory } from '@/features/example/api/getCategoryExamples';
import ExampleSection from '@/features/example/components/ExampleSection';

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
    className: 'mb-8',
  };

  return (
    <div className="pb-20 pt-24">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <PageHeader {...pageHeaderProps} />
          <SearchBar category={category} />
          <ExampleSection
            initialExamples={examples}
            initialHasMore={hasMore}
            category={category}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
