'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

import { supabase } from '@/lib/supabase/supabaseClient';

const useExampleAction = () => {
  const { user } = useAuth();
  const router = useRouter();

  const toggleLike = useCallback(
    async exampleId => {
      if (!user) return;

      const { data: likeData } = await supabase
        .from('likes')
        .select('id')
        .eq('example_id', exampleId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (likeData) {
        await supabase.from('likes').delete().eq('id', likeData.id);
        return false;
      } else {
        await supabase.from('likes').insert({
          example_id: exampleId,
          user_id: user.id,
        });
        return true;
      }
    },
    [user],
  );

  const toggleBookmark = useCallback(
    async exampleId => {
      if (!user) return;

      const { data: bookmarkData } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('example_id', exampleId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (bookmarkData) {
        await supabase.from('bookmarks').delete().eq('id', bookmarkData.id);
        return false;
      } else {
        await supabase.from('bookmarks').insert({
          example_id: exampleId,
          user_id: user.id,
        });
        return true;
      }
    },
    [user],
  );

  const goToComment = () => {
    // router.push(`/${category.type}/${data.id}#comment`);
  };
  return {};
};

export default useExampleAction;
