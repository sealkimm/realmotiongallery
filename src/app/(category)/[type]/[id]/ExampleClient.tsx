'use client';

import { useRef } from 'react';
import { Category } from '@/data/categories';
import { Example } from '@/types/example';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

import EditDeleteButtonGroups from '@/components/buttons/buttonGroups/EditDeleteButtonGroups';
import ExampleCard from '@/components/card/ExampleCard';
import MarkdownViewer from '@/components/editor/MarkdownViewer';
import PageHeader from '@/components/layouts/PageHeader';

gsap.registerPlugin(useGSAP);

// 더미 관련 예제
const relatedExamples = [
  {
    id: 'asdsafafsf',
    title: '관련 Example 1',
    description: 'Example 1 description',
    created_at: '2025-01-01',
    thumbnail:
      'https://cdn.crowdpic.net/detail-thumb/thumb_d_DBE010EEE9C899E04B65B2EA8FE046FE.jpg',
    type: 'gsap',
  },

  {
    id: 'dfh,mdflkbmfdknkm',
    title: '관련 Example 2',
    description: 'Example 2 description',
    created_at: '2025-01-02',
    thumbnail:
      'https://cdn.crowdpic.net/detail-thumb/thumb_d_DBE010EEE9C899E04B65B2EA8FE046FE.jpg',
    type: 'gsap',
  },
];

interface ExampleClientProps {
  category: Category;
  exampleData: Example;
}

const ExampleClient = ({ category, exampleData }: ExampleClientProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: contentRef },
  );

  return (
    <div ref={contentRef} className="relative mx-auto max-w-5xl">
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
              data={item}
              isHorizontal
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExampleClient;
