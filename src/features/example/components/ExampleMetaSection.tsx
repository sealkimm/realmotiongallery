'use client';

import useExampleInteractions from '@/hooks/useExampleInteractions';
import PageHeader from '@/components/layouts/PageHeader';
import { categories } from '@/features/category/data/categories';
import EditDeleteButtons from '@/features/example/components/EditDeleteButtons';
import ExampleCardActions from '@/features/example/components/ExampleCardActions';
import WriterInfo from '@/features/example/components/WriterInfo';

import type { ExampleDetails } from '../types/example';
import TagList from './TagList';

interface ExampleMetaSectionProps {
  example: ExampleDetails;
  isAuthor: boolean;
}

const ExampleMetaSection = ({ example, isAuthor }: ExampleMetaSectionProps) => {
  const interactions = useExampleInteractions({ example });
  const category = categories.find(c => c.type === example.type);

  const pageHeaderProps = {
    title: example.title,
    description: example.description,
    badgeTitle: category?.title,
    badgeColor: category?.color,
  };

  return (
    <div className="mb-16">
      <PageHeader {...pageHeaderProps} className="mb-6" />
      {isAuthor && <EditDeleteButtons exampleId={example.id} />}

      <div className="mb-6 flex items-center justify-between border-b border-gray-800 pb-6 align-baseline">
        <WriterInfo author={example.author} createdAt={example.created_at} />
        <ExampleCardActions
          iconSize={22}
          showComment={false}
          {...interactions}
        />
      </div>
      <TagList tags={example.tags || []} />
    </div>
  );
};

export default ExampleMetaSection;
