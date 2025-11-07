import { VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge, badgeVariants } from '@/components/ui/badge';

interface TagProps extends VariantProps<typeof badgeVariants> {
  label: string;
  color?: string;
  onClickRemove?: (label) => void;
  removable?: boolean;
  className?: string;
}

const Tag = ({
  label,
  color,
  onClickRemove,
  removable = false,
  className,
  variant,
  ...props
}: TagProps) => {
  return (
    <Badge
      variant={variant}
      className={cn(
        'group relative cursor-pointer bg-purple-500/50 text-sm font-light text-white/80',
        variant === 'outline' &&
          'cursor-default border-gray-700 bg-gray-900 text-white/80',
        className,
      )}
      onClick={onClickRemove && (() => onClickRemove(label))}
      {...props}
    >
      {label}
      {removable && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100">
          <X size={14} className="text-white" />
        </div>
      )}
    </Badge>
  );
};

export default Tag;
