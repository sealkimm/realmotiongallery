'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import type { CommentWithUser } from '@/features/comment/types/comment';

import useSupabaseRequest from './useSupabaseRequest';

interface UseCommentProps {
  exampleId: string;
  initialComments: CommentWithUser[];
  userId?: string;
}

const MAX_COMMENT_LENGTH = 300;

const useComment = ({
  exampleId,
  initialComments,
  userId,
}: UseCommentProps) => {
  const [comments, setComments] = useState(initialComments);

  const { execute: executeCreateComment, isLoading: isCreating } =
    useSupabaseRequest<{
      //타입 분리하기
      content: string;
      exampleId: string;
      userId: string;
    }>({
      requestFn: async ({ content, exampleId, userId }) => {
        const result = await supabase
          .from('comments')
          .insert({
            content,
            example_id: exampleId,
            user_id: userId,
          })
          .select('*, author:users(id, nickname, avatar_url)')
          .single();
        return result;
      },
      onSuccess: result => {
        setComments(prev => [...prev, result]);
      },
    });

  const { execute: executeUpdateComment, isLoading: isUpdating } =
    useSupabaseRequest({
      requestFn: async ({ commentId, content }) => {
        const result = await supabase
          .from('comments')
          .update({ content })
          .eq('id', commentId)
          .select('*, author:users(id, nickname, avatar_url)')
          .single();
        return result;
      },
      onSuccess: result => {
        if (!result) return;

        setComments(prev =>
          prev.map(comment => (comment.id === result.id ? result : comment)),
        );
      },
    });

  const { execute: executeDeleteComment, isLoading: isDeleting } =
    useSupabaseRequest({
      requestFn: async ({ commentId }) => {
        const result = await supabase
          .from('comments')
          .delete()
          .eq('id', commentId)
          .select()
          .single();
        return result;
      },
      onSuccess: result => {
        if (!result) return;

        setComments(prev => prev.filter(comment => comment.id !== result.id));
      },
    });

  const validateComment = (content: string) => {
    const trimmed = content.trim();
    if (trimmed.length === 0) {
      toast.error('댓글을 최소 1자 이상 입력해주세요.');
      return false;
    }
    if (trimmed.length > MAX_COMMENT_LENGTH) {
      toast.error(
        `댓글은 최대 ${MAX_COMMENT_LENGTH}자까지만 입력할 수 있습니다.`,
      );
      return false;
    }
    return true;
  };

  const handleCreateComment = (content: string) => {
    if (!userId) {
      toast.error('로그인 후 댓글을 작성할 수 있습니다.');
      return;
    }
    if (!validateComment(content)) return;
    executeCreateComment({ content, exampleId, userId });
  };

  const handleUpdateComment = (commentId: string, content: string) => {
    if (!validateComment(content)) return false;
    executeUpdateComment({ commentId, content });
    return true;
  };

  const handleDeleteComment = (commentId: string) => {
    executeDeleteComment({ commentId });
  };

  return {
    comments,
    isCreating,
    isUpdating,
    isDeleting,
    handleCreateComment,
    handleUpdateComment,
    handleDeleteComment,
  };
};
export default useComment;
