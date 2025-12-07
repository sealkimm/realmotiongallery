/**
 * @description 예제 CRUD 기능을 제공하는 커스텀 훅
 *
 * @returns {function} createExample - 예제 생성 함수
 * @returns {function} updateExample - 예제 수정 함수
 * @returns {function} deleteExample - 예제 삭제 함수
 * @returns {boolean} isLoading - 로딩 상태
 */

'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import { extractThumbnailUrl } from '@/lib/utils';
import { FORM_MESSAGES, type FormValues } from '@/features/example/formSchema';

import useSupabaseRequest from './useSupabaseRequest';

interface UpdateExampleData extends FormValues {
  id: string;
}

const useExample = () => {
  const router = useRouter();

  // 생성
  const { execute: createExample, isLoading: isCreating } =
    useSupabaseRequest<FormValues>({
      requestFn: async data => {
        const thumbnail = extractThumbnailUrl(data.content);

        return await supabase
          .from('examples')
          .insert({ ...data, thumbnail })
          .select('*, author:users(id, nickname, avatar_url)')
          .single();
      },
      onSuccess: result => {
        toast.success(FORM_MESSAGES.SUCCESS_CREATE);
        router.push(`/${result.type}/${result.id}`);
      },
      onError: error => {
        console.error('예제 저장 실패', error);
        toast.error(FORM_MESSAGES.ERROR_SAVE);
      },
    });

  // 수정
  const { execute: updateExample, isLoading: isUpdating } =
    useSupabaseRequest<UpdateExampleData>({
      requestFn: async data => {
        const { id, ...updateData } = data;
        const thumbnail = extractThumbnailUrl(data.content);
        // const thumbnailUrl = extractThumbnailUrl(updateData.content);

        return await supabase
          .from('examples')
          .update({ ...updateData, thumbnail })
          .eq('id', id)
          .select('*, author:users(id, nickname, avatar_url)')
          .single();
      },
      onSuccess: result => {
        toast.success(FORM_MESSAGES.SUCCESS_UPDATE);
        router.push(`/${result.type}/${result.id}`);
      },
      onError: error => {
        console.error('예제 저장 실패', error);
        toast.error(FORM_MESSAGES.ERROR_SAVE);
      },
    });

  // 삭제
  const { execute: deleteExample, isLoading: isDeleting } = useSupabaseRequest({
    requestFn: async id => {
      return await supabase.from('examples').delete().eq('id', id).select('*');
    },
    onSuccess: () => {
      toast.success(FORM_MESSAGES.SUCCESS_DELETE);
      router.push('/');
      router.refresh();
    },
    onError: error => {
      console.error('예제 삭제 실패', error);
      toast.error(FORM_MESSAGES.ERROR_DELETE);
    },
  });

  return {
    createExample,
    updateExample,
    deleteExample,
    isLoading: isCreating || isUpdating || isDeleting,
  };
};
export default useExample;
