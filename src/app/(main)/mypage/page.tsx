'use client';

import { useAuth } from '@/providers/AuthProvider';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

const MyPage = () => {
  const { user, signOut } = useAuth();

  const handleDeleteAccount = async () => {
    if (!user) return;

    const res = await fetch('/api/delete-account', {
      method: 'POST',
      body: JSON.stringify({ userId: user.id }),
    });

    if (res.ok) {
      signOut();
      toast.success('회원탈퇴가 완료되었습니다.');
    } else {
      toast.error('회원탈퇴에 실패했습니다.');
    }
  };

  return (
    <div className="container mx-auto h-screen">
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div>내가 좋아요한 예제</div>
        <div>내가 작성한 예제</div>
        <div>내가 북마크한 예제</div>
        <div>내가 쓴 댓글</div>
        <div>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            회원탈퇴
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
