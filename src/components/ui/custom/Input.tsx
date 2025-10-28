import * as React from 'react';

import { cn } from '@/lib/utils';
import { Input as ShadcnInput } from '@/components/ui/input';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <ShadcnInput
        ref={ref}
        {...props}
        className={cn(
          'focus-visible:ring-1 focus-visible:ring-offset-0',
          className,
        )}
      />
    );
  },
);

Input.displayName = 'Input';
export { Input };
