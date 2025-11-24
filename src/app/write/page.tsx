import { createSupabaseServerClient } from '@/lib/supabase/server';
import WriteForm from '@/components/form/WriteForm';
import PageHeader from '@/components/layouts/PageHeader';

interface WritePageProps {
  searchParams: {
    id: string;
  };
}
// 리팩토링
const WritePage = async ({ searchParams }: WritePageProps) => {
  const supabase = createSupabaseServerClient();
  const exampleId = searchParams.id;

  let exampleData = null;

  if (exampleId) {
    const { data, error } = await supabase
      .from('examples')
      .select('*')
      .eq('id', exampleId)
      .single();

    if (error) {
      console.error(error);
    }
    exampleData = data;
  }

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <PageHeader
            title={exampleData ? '예제 수정하기' : '새 예제 등록하기'}
            // title="새 예제 등록하기"
            description="멋진 애니메이션 예제를 공유하고 커뮤니티에 기여해보세요."
          />
          <WriteForm exampleData={exampleData} />
        </div>
      </div>
    </div>
  );
};

export default WritePage;

// ✳️ 타이틀 레이아웃 컴포넌트 만들기
