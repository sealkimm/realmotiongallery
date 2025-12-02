import type { User } from '@/types/user';
import { UserIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WriterInfoProps {
  user: Pick<User, 'nickname' | 'avatar_url'>;
}

const WriterInfo = ({ user }: WriterInfoProps) => {
  return (
    <div className="mb-8 flex items-center gap-3 border-b border-gray-800 pb-6">
      <Avatar className="h-10 w-10 border-2 border-purple-500">
        <AvatarImage src={user.avatar_url} alt={user.nickname} />
        <AvatarFallback>
          <UserIcon size={16} />
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm text-gray-500">Created by</p>
        <p className="font-medium">{user.nickname}</p>
      </div>
    </div>
  );
};

export default WriterInfo;
