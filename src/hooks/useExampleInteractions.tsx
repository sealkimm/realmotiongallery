'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Example } from '@/types/example';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';

interface UseExampleInteractionsProps {
  example: Example;
}

const useExampleInteractions = ({ example }: UseExampleInteractionsProps) => {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(example.like_count);
  const [isLiked, setIsLiked] = useState(example.isLiked ?? false);
  const [isBookmarked, setIsBookmarked] = useState(
    example.isBookmarked ?? false,
  );

  const handleLike = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (isLiked) {
      await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('example_id', example.id);
      setIsLiked(false);
      setLikeCount(likeCount - 1);
    } else {
      await supabase.from('likes').insert({
        user_id: user.id,
        example_id: example.id,
      });
      setIsLiked(true);
      setLikeCount(likeCount + 1);
    }
  };

  const handleBookmark = async e => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    if (isBookmarked) {
      await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('example_id', example.id);
      setIsBookmarked(false);
    } else {
      await supabase.from('bookmarks').insert({
        user_id: user.id,
        example_id: example.id,
      });
      setIsBookmarked(true);
    }
  };
  return { handleLike, handleBookmark, likeCount, isLiked, isBookmarked };
};

export default useExampleInteractions;
