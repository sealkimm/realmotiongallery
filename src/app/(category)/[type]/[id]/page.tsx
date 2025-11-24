import { notFound } from 'next/navigation';
import AnimatedContentWrapper from '@/animations/AnimatedContentWrapper';
import { categories } from '@/data/categories';

import { createSupabaseServerClient } from '@/lib/supabase/server';
import EditDeleteButtonGroups from '@/components/buttons/buttonGroups/EditDeleteButtonGroups';
import ExampleCard from '@/components/card/ExampleCard';
import MarkdownViewer from '@/components/editor/MarkdownViewer';
import PageHeader from '@/components/layouts/PageHeader';

// import { gsapDummyData } from '@/data/categories';

interface Props {
  params: {
    type: string;
    id: string;
  };
}

const relatedExamples = [
  {
    id: 'asdsafafsf',
    title: '관련 Example 1',
    description: 'Example 1 description',
    content: 'Example 1 content',
    created_at: '2025-01-01',
    thumbnail:
      'https://cdn.crowdpic.net/detail-thumb/thumb_d_DBE010EEE9C899E04B65B2EA8FE046FE.jpg',
    type: 'gsap',
    like_count: 0,
  },

  {
    id: 'dfh,mdflkbmfdknkm',
    title: '관련 Example 2',
    description: 'Example 2 description',
    content: 'Example 2 content',
    created_at: '2025-01-02',
    thumbnail:
      'https://cdn.crowdpic.net/detail-thumb/thumb_d_DBE010EEE9C899E04B65B2EA8FE046FE.jpg',
    type: 'gsap',
    like_count: 0,
  },
];

const ExamplePage = async ({ params }: Props) => {
  const { type, id } = params;
  const supabase = await createSupabaseServerClient();
  //이거 categories 중복으로 많이 쓰네...
  const category = categories.find(c => c.type === type);

  // exampleData 네이밍... 다른 페이지랑 통일성 주기
  const { data: exampleData, error } = await supabase
    .from('examples')
    .select('*')
    .eq('id', id)
    .single();

  if (!category || !exampleData) {
    return notFound();
  }

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <AnimatedContentWrapper>
          <PageHeader
            title={exampleData.title}
            description={exampleData.description}
            badgeTitle={category.title}
            badgeColor={category.color}
            tags={exampleData.tags}
          />
          <EditDeleteButtonGroups exampleId={exampleData.id} />
          <div className="mb-10">
            <MarkdownViewer content={exampleData.content} />
          </div>
          {/* 관련 예제(나중에 추가) => 이전, 다음 예제*/}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Related Examples</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedExamples.map(item => (
                <ExampleCard
                  key={item.id}
                  category={category}
                  example={item}
                  isHorizontal
                />
              ))}
            </div>
          </div>
          <div
            id="comment"
            className="h-[500px] w-full border border-green-500"
          >
            댓글영역입니다.
          </div>
        </AnimatedContentWrapper>
      </div>
    </div>
  );
};

export default ExamplePage;
