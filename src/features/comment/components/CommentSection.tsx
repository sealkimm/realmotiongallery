'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { MessageCircle } from 'lucide-react';

import useComment from '@/hooks/useComment';
import CommentForm from '@/features/comment/components/CommentForm';
import type { CommentWithUser } from '@/features/comment/types/comment';

import CommentItem from './CommentItem';

interface CommentSectionProps {
  exampleId: string;
  comments: CommentWithUser[];
}

//// onchnage 한글자 적을때마다 콘솔 나옴 -> 성능에 적합한 방법 찾기

const CommentSection = ({
  exampleId,
  comments: initialComments,
}: CommentSectionProps) => {
  const { user } = useAuth();
  // const [content, setContent] = useState('');

  const {
    comments,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
  } = useComment({
    exampleId,
    initialComments,
    userId: user?.id,
  });

  //리팩토링
  //handleSubmit도 props로 하는데 왜 다른 handle이랑 다르게 여기서 하나?
  // const handleSubmit = () => {
  //   handleCreateComment(content);
  //   setContent('');
  // };

  return (
    <div id="comment" className="border-t border-gray-800 pt-10">
      {/* 타이틀 */}
      <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <MessageCircle /> 댓글 {comments.length}개
      </h3>
      {/* 댓글 작성 */}
      <CommentForm
        // content={content}
        // setContent={setContent}
        onSubmit={handleCreateComment}
        isLoading={isCreating}
      />
      {/* 댓글 목록 */}
      <div className="flex flex-col gap-4">
        {comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={user?.id}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
