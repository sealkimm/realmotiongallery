'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CommentFormProps {
  initialContent?: string;
  onSubmit: (content: string) => void;
  onCancel?: () => void;
  isLoading: boolean;
  isEditMode?: boolean;
  isReply?: boolean;
  className?: string;
}

const CommentForm = ({
  initialContent = '',
  onSubmit,
  onCancel,
  isLoading,
  isEditMode,
  isReply,
  className,
}: CommentFormProps) => {
  const [content, setContent] = useState(initialContent);
  const buttonLabel = `${isReply ? '답글' : '댓글'} ${isEditMode ? '수정' : '등록'}`;

  const handleSubmit = () => {
    onSubmit(content);
    if (!isEditMode) {
      setContent('');
    }
  };

  return (
    <div className={cn('relative mb-8 flex flex-col gap-3', className)}>
      <Textarea
        placeholder={`${isReply ? '답글' : '댓글'}을 입력해주세요`}
        value={content}
        onChange={e => setContent(e.target.value)}
        className="resize-none"
      />
      <div
        className={cn(
          'flex justify-end',
          isEditMode && 'absolute bottom-2 right-2 gap-2',
          isReply && 'bottom-2 right-2 gap-2',
        )}
      >
        {(isEditMode || isReply) && (
          <Button size="xs" variant="outline" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          size={isEditMode || isReply ? 'xs' : 'sm'}
          className={cn(!isEditMode && 'gradient-background')}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
