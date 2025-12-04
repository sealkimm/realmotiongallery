'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import useSupabaseRequest from '@/hooks/useSupabaseRequest';
import DeleteConfirmDialog from '@/components/dialog/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';

interface EditDeleteButtonsProps {
  exampleId: string;
}

const EditDeleteButtons = ({ exampleId }: EditDeleteButtonsProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { execute, isLoading } = useSupabaseRequest({
    requestFn: async exampleId => {
      const result = await supabase
        .from('examples')
        .delete()
        .eq('id', exampleId);
      return result;
    },
    onSuccess: () => {
      // !!!!!!!!!!!!!!!! 예제 삭제됐는지 확인하기
      toast.success('예제 삭제가 완료되었습니다.');
      router.back();
    },
    onError: error => {
      console.error('예제 삭제 실패', error);
      toast.error('예제 삭제에 실패했습니다.');
    },
  });

  const handleDeleteExample = () => {
    execute(exampleId);
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
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2"
      >
        <Trash size={14} />
        삭제
      </Button>
      <DeleteConfirmDialog
        type="example"
        onDelete={handleDeleteExample}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EditDeleteButtons;
