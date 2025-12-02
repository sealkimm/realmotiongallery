import type { User } from '@/types/user';
import { UserIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WriterInfoProps {
  author: Pick<User, 'nickname' | 'avatar_url'>;
  variant?: 'card' | 'full';
}

const WriterInfo = ({ author, variant = 'full' }: WriterInfoProps) => {
  const isFull = variant === 'full';

  return (
    // <div className="mb-8 flex items-center gap-3 border-b border-gray-800 pb-6">
    <div
      className={cn(
        'flex items-center gap-3 border-gray-800',
        isFull ? 'mb-8 border-b pb-6' : 'mt-3 border-t pt-4',
      )}
    >
      <Avatar
        className={cn(
          'border-2 border-purple-500/50',
          isFull ? 'h-10 w-10' : 'h-8 w-8',
        )}
      >
        <AvatarImage src={author.avatar_url} alt={author.nickname} />
        <AvatarFallback>
          <UserIcon size={16} />
        </AvatarFallback>
      </Avatar>
      <div>
        {isFull && <p className="text-sm text-gray-500">Created by</p>}
        <p
          className={cn(
            'font-medium',
            isFull ? 'text-base' : 'text-sm text-gray-100',
          )}
        >
          {author.nickname}
        </p>
      </div>
    </div>
  );
};

export default WriterInfo;
