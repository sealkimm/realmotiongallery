'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CardListAnimator from '@/components/animations/CardListAnimator';
import type { Category } from '@/features/category/types/category';

import { getExamplesByCategory } from '../api/getCategoryExamples';
import type { ExampleDetails } from '../types/example';
import ExampleCard from './ExampleCard';
import ExampleSkeleton from './ExampleSkeleton';

interface ExampleSectionProps {
  initialExamples: ExampleDetails[];
  initialHasMore: boolean;
  category: Category;
}

const PAGE_SIZE = 12;

const ExampleSection = ({
  initialExamples,
  initialHasMore,
  category,
}: ExampleSectionProps) => {
  const {
    data: examples,
    isLoading,
    observerRef,
  } = useInfiniteScroll({
    initialData: initialExamples,
    initialHasMore,
    fetchFn: page =>
      getExamplesByCategory({
        type: category.type,
        page,
        pageSize: PAGE_SIZE,
      }),
  });

  // 예제가 없는 경우!!!!!!!!!!!!!!!
  // if (examples.length === 0) {
  //   return (
  //     <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
  //       <p className="text-lg font-medium text-gray-600">
  //         아직 예제가 없습니다
  //       </p>
  //       <p className="mt-2 text-sm text-gray-500">
  //         첫 번째 예제를 만들어보세요!
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <>
      <CardListAnimator direction="up">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {examples.map(item => (
            <ExampleCard key={item.id} category={category} example={item} />
          ))}
        </div>
      </CardListAnimator>
      {isLoading && <ExampleSkeleton count={PAGE_SIZE} />}
      <div ref={observerRef} className="h-10" />
    </>
  );
};
export default ExampleSection;
