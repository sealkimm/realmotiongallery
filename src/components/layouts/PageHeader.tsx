import { cn } from '@/lib/utils';

import { Badge } from '../ui/badge';

interface PageHeaderProps {
  title: string;
  description: string;
  badgeTitle?: string;
  badgeColor?: string;
  className?: string;
}

const PageHeader = ({
  title,
  description,
  badgeTitle,
  badgeColor,
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
      <p className="text-xl text-gray-400">{description}</p>
    </div>
  );
};

export default PageHeader;
