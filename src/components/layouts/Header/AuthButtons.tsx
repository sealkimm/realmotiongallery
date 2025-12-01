import Link from 'next/link';
import { LogIn, Plus, UserPlus2 } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AuthButtonsProps {
  isAuthenticated: boolean;
}

const AuthButtons = ({ isAuthenticated }: AuthButtonsProps) => {
  if (isAuthenticated) {
    return (
      <>
        <Button asChild className="gradient-background ml-4">
          <Link href="/write" className="flex items-center gap-4">
            <Plus size={16} />
            <span>글작성</span>
          </Link>
        </Button>
      </>
    );
  }

  return (
    <>
      <Button
        asChild
        variant="secondary"
        className="bg-purple-500/20 text-white hover:bg-purple-500/30"
      >
        <Link href="/auth/login" className="flex items-center gap-4">
          <LogIn />
          <span>로그인</span>
        </Link>
      </Button>
      <Button asChild className="gradient-background ml-4">
        <Link href="/auth/signup" className="flex items-center gap-4">
          <UserPlus2 />
          <span>회원가입</span>
        </Link>
      </Button>
    </>
  );
};
export default AuthButtons;
