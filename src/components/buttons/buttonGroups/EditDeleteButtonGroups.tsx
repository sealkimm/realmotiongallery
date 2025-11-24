'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

interface EditDeleteButtonGroupProps {
  exampleId: string;
}

const EditDeleteButtonGroup = ({ exampleId }: EditDeleteButtonGroupProps) => {
  const router = useRouter();

  const handleDeleteExample = async id => {
    try {
      const { error } = await supabase.from('examples').delete().eq('id', id);

      if (error) {
        throw new Error(error.message);
      }

      toast.success('예제 삭제가 완료되었습니다.');

      // 로딩이나 셋타임 아웃 주기 -> 너무 바로 화면 넘어감
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 200);
    } catch (error) {
      toast.error(error.message || '삭제 실패');
    }
  };

  return (
    <div className="absolute right-0 top-0 flex gap-2">
      <Button
        asChild
        variant="secondary"
        size="sm"
        className="flex items-center gap-2"
      >
        <Link href={`/write?id=${exampleId}`}>
          <Edit size={14} /> 수정
        </Link>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            size="sm"
            className="flex items-center gap-2"
          >
            <Trash size={14} />
            삭제
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="border-gray-800 bg-gray-900">
          <AlertDialogHeader>
            <AlertDialogTitle>삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              삭제 하실 경우 복구가 불가능 합니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {/* edit버튼이랑... */}
            <AlertDialogCancel className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
              취소
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => handleDeleteExample(exampleId)}
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EditDeleteButtonGroup;
