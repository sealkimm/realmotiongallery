import { createSupabaseServerClient } from '@/lib/supabase/server';
import ContentAnimator from '@/components/animations/ContentAnimator';
import MarkdownViewer from '@/components/editor/MarkdownViewer';
import { categories } from '@/features/category/data/categories';
import ExampleCard from '@/features/example/components/ExampleCard';
import ExampleMetaSection from '@/features/example/components/ExampleMetaSection';

interface ExamplePageProps {
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
    created_by: 'asdasd',
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
    created_by: 'asdasd',
    created_at: '2025-01-02',
    thumbnail:
      'https://cdn.crowdpic.net/detail-thumb/thumb_d_DBE010EEE9C899E04B65B2EA8FE046FE.jpg',
    type: 'gsap',
    like_count: 0,
  },
];

const ExamplePage = async ({ params }: ExamplePageProps) => {
  const { type, id } = await params;
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const category = categories.find(c => c.type === type);

  const { data: example, error: exampleError } = await supabase
    .from('examples')
    .select(`*, users(nickname, avatar_url)`)
    .eq('id', id)
    .eq('type', type)
    .single();

  if (!category || exampleError) throw new Error('예제를 불러오지 못했습니다.');

  const isAuthor = user?.id === example?.created_by;

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <ContentAnimator>
          <ExampleMetaSection example={example} isAuthor={isAuthor} />
          <MarkdownViewer content={example.content} />
          {/* 관련 예제(나중에 추가) => 이전, 다음 예제*/}
          <div>
            <h3 className="mb-6 text-2xl font-bold">Related Examples</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedExamples.map(item => (
                <ExampleCard
                  key={item.id}
                  category={category}
                  example={item}
                  layout="horizontal"
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
        </ContentAnimator>
      </div>
    </div>
  );
};

export default ExamplePage;
