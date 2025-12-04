import { cn } from '@/lib/utils';

export const getCardStyles = (isHorizontal: boolean) => ({
  container: cn(
    'flex h-full overflow-hidden rounded-xl border-0 bg-gray-900',
    isHorizontal ? 'flex-row items-center' : 'flex-col',
  ),
  imageWrapper: cn(
    'relative',
    isHorizontal ? 'aspect-square h-full w-1/3' : 'h-40 w-full',
  ),
  title: cn(
    'line-clamp-1 font-semibold',
    isHorizontal ? 'mb-1 text-base' : 'mb-3 text-xl',
  ),
  desc: cn(
    'line-clamp-1 text-gray-400',
    isHorizontal ? 'flex items-center gap-2 text-sm' : 'text-base',
  ),
  content: cn(isHorizontal ? 'p-4' : 'p-6'),
});
