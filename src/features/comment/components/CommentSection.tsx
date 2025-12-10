'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { MessageCircle } from 'lucide-react';

import useComment from '@/hooks/useComment';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import CommentForm from '@/features/comment/components/CommentForm';
import type { CommentWithUser } from '@/features/comment/types/comment';

import { getExampleComments } from '../api/getExampleComments';
import CommentItem from './CommentItem';
import CommentSkeleton from './CommentSkeleton';

interface CommentSectionProps {
  exampleId: string;
  comments: CommentWithUser[];
  hasMore: boolean;
  totalCount: number;
}

const PAGE_SIZE = 10;

//// onchnage 한글자 적을때마다 콘솔 나옴 -> 성능에 적합한 방법 찾기
const CommentSection = ({
  exampleId,
  comments: initialComments,
  hasMore: initialHasMore,
  totalCount: initialTotalCount,
}: CommentSectionProps) => {
  const { user } = useAuth();
  const [totalCount, setTotalCount] = useState(initialTotalCount);

  const {
    data: comments,
    setData: setComments,
    isLoading,
    observerRef,
  } = useInfiniteScroll({
    initialData: initialComments,
    initialHasMore,
    fetchFn: page =>
      getExampleComments({
        id: exampleId,
        page,
        pageSize: PAGE_SIZE,
      }),
  });

  const {
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
  } = useComment({
    exampleId,
    userId: user?.id,
    setComments,
    setTotalCount,
  });

  const parentComments = comments.filter(comment => !comment.parent_id);
  const getReplies = (parentId: string) => {
    return comments.filter(comment => comment.parent_id === parentId);
  };

  return (
    <div id="comment" className="border-t border-gray-800 pt-10">
      <h3 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <MessageCircle /> 댓글 {totalCount}개
      </h3>
      <CommentForm onSubmit={handleCreateComment} isLoading={isCreating} />
      <div className="flex flex-col gap-4">
        {parentComments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            userId={user?.id}
            replies={getReplies(comment.id)}
            onCreate={handleCreateComment}
            onUpdate={handleUpdateComment}
            onDelete={handleDeleteComment}
            isCreating={isCreating}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
          />
        ))}
      </div>
      {isLoading && <CommentSkeleton count={PAGE_SIZE} />}
      <div ref={observerRef} className="-mt-10 h-10" />
    </div>
  );
};

export default CommentSection;
