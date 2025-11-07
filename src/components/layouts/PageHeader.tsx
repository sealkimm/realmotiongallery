import { cn } from '@/lib/utils';

import Tag from '../tag/Tag';
import { Badge } from '../ui/badge';

interface PageHeaderProps {
  title: string;
  description: string;
  badgeTitle?: string;
  badgeColor?: string;
  tags?: string[];
  className?: string;
}

const PageHeader = ({
  title,
  description,
  badgeTitle,
  badgeColor,
  tags,
  className,
}: PageHeaderProps) => {
  const showBadge = badgeTitle && badgeColor;

  return (
    <div className={cn('mb-10', className)}>
      {showBadge && (
        <Badge
          className={cn(
            'mb-5 border-0 bg-gradient-to-r px-3 py-1 text-sm font-medium text-white',
            badgeColor,
          )}
        >
          {badgeTitle}
        </Badge>
      )}
      <h2 className={`mb-4 text-3xl font-bold md:text-5xl`}>{title}</h2>
      {/* {tags &&
       } */}

      <div className="my-4 flex gap-2">
        {tags &&
          tags.map((tag, index) => (
            <Tag variant="outline" key={index} label={tag} />
          ))}
      </div>
      <p className="mb-8 text-xl text-gray-400">{description}</p>
    </div>
  );
};

export default PageHeader;
