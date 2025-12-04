'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';

import useExample from '@/hooks/useExample';
import DeleteConfirmDialog from '@/components/dialog/DeleteConfirmDialog';
import { Button } from '@/components/ui/button';

interface EditDeleteButtonsProps {
  exampleId: string;
}

const EditDeleteButtons = ({ exampleId }: EditDeleteButtonsProps) => {
  const { deleteExample, isLoading } = useExample();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteExample(exampleId);
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
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <Trash size={14} />
        삭제
      </Button>
      <DeleteConfirmDialog
        type="example"
        onDelete={handleDelete}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default EditDeleteButtons;
