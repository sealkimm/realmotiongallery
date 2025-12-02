'use client';

import useExampleInteractions from '@/hooks/useExampleInteractions';
import PageHeader from '@/components/layouts/PageHeader';
import { categories } from '@/features/category/data/categories';
import EditDeleteButtons from '@/features/example/components/EditDeleteButtons';
import ExampleCardActions from '@/features/example/components/ExampleCardActions';
import WriterInfo from '@/features/example/components/WriterInfo';

import type { ExampleWithRelations } from '../types/example';
import TagList from './TagList';

interface ExampleMetaSectionProps {
  example: ExampleWithRelations;
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
      <PageHeader {...pageHeaderProps} />
      {isAuthor && <EditDeleteButtons exampleId={example.id} />}
      <WriterInfo user={example.users} />
      <div className="flex items-center justify-between">
        <TagList tags={example.tags || []} />
        <ExampleCardActions
          iconSize={22}
          showComment={false}
          {...interactions}
        />
      </div>
    </div>
  );
};

export default ExampleMetaSection;
