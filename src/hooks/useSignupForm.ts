'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/client';
import useEmailVerification from '@/hooks/useEmailVerification';
import useSupabaseRequest from '@/hooks/useSupabaseRequest';
import { checkUserExists } from '@/features/auth/api/checkUserExists';
import { createRandomNickname } from '@/features/auth/api/createRandomNickname';
import { insertUserInfo } from '@/features/auth/api/insertUserInfo';
import { formSchema, type FormValues } from '@/features/auth/formSchema';

// signupform이랑 중복
interface UseSignupFormProps {
  onSuccess: () => void;
}

// 분리 필요하니
const DEFAULT_FORM_VALUES = {
  nickname: '',
  email: '',
  verifyCode: '',
  password: '',
  confirmPassword: '',
};

const useSignupForm = ({ onSuccess }: UseSignupFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });

  const {
    isVerified,
    isEmailSent,
    isCodeSent,
    sendVerificationCode,
    verifyEmailCode,
  } = useEmailVerification(form);

  const { execute: executeSignUp, isLoading } = useSupabaseRequest({
    requestFn: async ({ email, password, nickname }) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { nickname },
        },
      });
      return { data, error };
    },
    onSuccess: ({ user }) => {
      if (user) {
        insertUserInfo(user);
      }
      toast.success('✅ 회원가입이 완료되었습니다.');
      onSuccess();
    },
    onError: error => {
      console.error('회원가입 실패', error);
      toast.error('❌ 회원가입에 실패했습니다.');
    },
  });

  const currentPassword = form.watch('password');

  useEffect(() => {
    if (currentPassword) {
      form.trigger('password');
    }
  }, [currentPassword, form]);

  const applyRandomNickname = async () => {
    const randomNickname = await createRandomNickname();
    if (randomNickname) {
      form.setValue('nickname', randomNickname);
    }
  };

  const onSubmit = async (data: FormValues) => {
    const { nickname, email, password } = data;
    const trimmedNickname = nickname.trim();

    // 이메일 인증 여부 검사
    if (!isVerified) {
      toast.error('⚠️ 이메일 인증을 완료해주세요.');
      return;
    }

    // 닉네임 중복 검사
    const isNicknameExists = await checkUserExists('nickname', trimmedNickname);
    if (isNicknameExists) {
      form.setError('nickname', { message: '이미 존재하는 닉네임입니다.' });
      return;
    }

    executeSignUp({ email, password, nickname });
  };

  return {
    form,
    isLoading,
    isVerified,
    isEmailSent,
    isCodeSent,
    sendVerificationCode,
    verifyEmailCode,
    applyRandomNickname,
    onSubmit,
  };
};

export default useSignupForm;
