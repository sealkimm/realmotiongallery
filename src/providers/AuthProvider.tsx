'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/types/user';

import { supabase } from '@/lib/supabase/client';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDBUser = async (authUserId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUserId)
      .single();

    if (error) {
      console.error('[AuthProvider] fetchDBUser 에러', error);
      return null;
    }
    return data;
  };

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const { data } = await supabase.auth.getSession();

      if (!mounted) return;

      if (data.session?.user) {
        const dbUser = await fetchDBUser(data.session.user.id);
        if (mounted) setUser(dbUser);
      } else {
        setUser(null);
      }

      setIsLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
