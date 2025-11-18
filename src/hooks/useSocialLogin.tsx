import { useCallback } from 'react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabaseClient';

type Provider = 'google' | 'github' | 'kakao';

// try문 필요할까
const useSocialLogin = () => {
  const onClickSocialLogin = useCallback(async (provider: Provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return;
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, []);

  return { onClickSocialLogin };
};

export default useSocialLogin;
