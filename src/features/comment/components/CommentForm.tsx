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
}

const CommentForm = ({
  initialContent = '',
  onSubmit,
  onCancel,
  isLoading,
  isEditMode,
}: CommentFormProps) => {
  const [content, setContent] = useState(initialContent);

  const handleSubmit = () => {
    onSubmit(content);
    if (!isEditMode) {
      setContent('');
    }
  };

  return (
    <div className="relative mb-8 flex flex-col gap-3">
      <Textarea
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={e => setContent(e.target.value)}
        className="resize-none"
      />
      <div
        className={cn(
          'flex justify-end',
          isEditMode && 'absolute bottom-2 right-2 gap-2',
        )}
      >
        {isEditMode && (
          <Button size="xs" variant="outline" onClick={onCancel}>
            취소
          </Button>
        )}
        <Button
          size={isEditMode ? 'xs' : 'sm'}
          className={cn(!isEditMode && 'gradient-background')}
          onClick={handleSubmit}
          disabled={!content || isLoading}
        >
          {isEditMode ? '댓글 수정' : '댓글 등록'}
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
