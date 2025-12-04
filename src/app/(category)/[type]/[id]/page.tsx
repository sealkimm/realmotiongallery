import { createSupabaseServerClient } from '@/lib/supabase/server';
import ContentAnimator from '@/components/animations/ContentAnimator';
import MarkdownViewer from '@/components/editor/MarkdownViewer';
import { categories } from '@/features/category/data/categories';
import CommentSection from '@/features/comment/components/CommentSection';
import ExampleMetaSection from '@/features/example/components/ExampleMetaSection';
import RelatedExampleSection from '@/features/example/components/RelatedExampleSection-del';
import type { ExampleFull } from '@/features/example/types/example';

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
    created_by: '123',
    author: {
      id: 'asdasd',
      nickname: 'Example 1 Author',
      avatar_url: 'https://example.com/avatar.jpg',
    },
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
    created_by: '123',
    author: {
      id: 'asdasd',
      nickname: 'Example 2 Author',
      avatar_url: 'https://example.com/avatar.jpg',
    },
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
    .select(
      `*, author:users(id, nickname, avatar_url), likes(user_id), bookmarks(user_id)`,
    )
    .eq('id', id)
    .eq('type', type)
    .single<ExampleFull>();

  if (!category || exampleError) throw new Error('예제를 불러오지 못했습니다.');

  const isAuthor = user?.id === example?.author.id;

  const isLiked = example.likes.some(like => like.user_id === user?.id);
  const isBookmarked = example.bookmarks.some(bm => bm.user_id === user?.id);

  const exampleWithInteractions = {
    ...example,
    isLiked,
    isBookmarked,
  };

  // //////////////
  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*, author:users(id, nickname, avatar_url)')
    .eq('example_id', id)
    .order('created_at');

  if (commentsError) throw new Error('댓글을 불러오지 못했습니다.');

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <ContentAnimator>
          <ExampleMetaSection
            example={exampleWithInteractions}
            isAuthor={isAuthor}
          />
          <MarkdownViewer content={example.content} />
          {/* 관련 예제(나중에 추가) => 이전, 다음 예제*/}
          {/* <RelatedExampleSection
            examples={relatedExamples}
            category={category}
          /> */}
          <CommentSection exampleId={id} comments={comments} />
        </ContentAnimator>
      </div>
    </div>
  );
};

export default ExamplePage;
