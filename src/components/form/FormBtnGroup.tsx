import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';

import { Button } from '../ui/button';

interface FormBtnGroupProps {
  isEditMode: boolean;
}

const FormBtnGroup = ({ isEditMode }: FormBtnGroupProps) => {
  const router = useRouter();

  const onClickCancel = () => {
    router.back();
  };
  return (
    <div className="mt-10 flex justify-end gap-2">
      <Button
        type="button"
        variant="outline"
        className="text-md"
        onClick={onClickCancel}
      >
        취소
      </Button>
      <Button type="submit" className="text-md">
        <Save /> {isEditMode ? '수정하기' : '등록하기'}
      </Button>
    </div>
  );
};

export default FormBtnGroup;
