import { notFound } from 'next/navigation';
import { gsapDummyData } from '@/data/categories';

interface Props {
  params: {
    type: string;
    id: string;
  };
}

const ExamplePage = ({ params }: Props) => {
  const { type, id } = params;
  console.log(type);
  // type 별 데이터 뿌리기 api 사용
  const exampleData = gsapDummyData.find(item => item.id === Number(id));
  if (!exampleData) {
    return notFound();
  }

  return (
    <div>
      <div>
        <div style={{ fontSize: '7rem' }}>
          태그: {exampleData.title.toUpperCase()}
        </div>
        <div style={{ fontSize: '2rem' }}>제목: {exampleData.title}</div>
        <div style={{ fontSize: '2rem' }}>설명: {exampleData.description}</div>
      </div>
      <div>미리보기</div>
      <div>코드 영역</div>
    </div>
  );
};

export default ExamplePage;
