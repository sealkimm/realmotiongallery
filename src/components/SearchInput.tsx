import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const SearchInput = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      {...props}
      className={cn(
        'border-gray-800 bg-[#11141b] hover:border-ring focus:border-ring focus-visible:ring-0 focus-visible:ring-offset-0',
        className,
      )}
    />
  );
});

SearchInput.displayName = 'SearchInput';
export { SearchInput };
