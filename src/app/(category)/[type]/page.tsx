import { notFound } from 'next/navigation';
import { categories, gsapDummyData } from '@/data/categories';

import ExampleCard from '@/components/common/Card';

const CategoryPage = ({ params }: { params: { type: string } }) => {
  const { type } = params;

  const categoryData = categories.find(category => category.type === type);
  const exampleListData = gsapDummyData.filter(item => item.type === type);

  if (!categoryData || !exampleListData) {
    return notFound();
  }
  // type 별 데이터 뿌리기 api 사용
  return (
    <div className="flex grid h-[100vh] w-[100vw]">
      {/* Category: {categoryData.type} */}
      <div style={{ fontSize: '7rem' }}>
        {`category: ${categoryData.title}`}
      </div>
      <p>{categoryData.description}</p>

      <div className="container mx-auto grid grid-cols-4 gap-4">
        {exampleListData.map(item => (
          <ExampleCard key={item.id} data={categoryData} item={item} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
