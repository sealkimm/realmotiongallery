import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteConfirmDialogProps {
  type: 'example' | 'comment';
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
}

const DeleteConfirmDialog = ({
  type = 'example',
  open,
  setOpen,
  onDelete,
}: DeleteConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="w-[calc(100%-2rem)] border-gray-800 bg-gray-900">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {type === 'example' ? '예제' : '댓글'} 삭제
          </AlertDialogTitle>
          <AlertDialogDescription>
            정말로 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onDelete}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
