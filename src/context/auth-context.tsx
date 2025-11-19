'use client';

import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '@/lib/supabaseClient';

// users 테이블 타입
interface User {
  id: string;
  email: string;
  nickname: string;
  created_at: string;
  avatar_url: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = async (id: string) => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    setUser(data ?? null);
  };

  const initUser = async () => {
    const { data } = await supabase.auth.getUser();
    const authUser = data?.user;

    if (authUser) {
      await fetchUser(authUser.id);
    } else {
      setUser(null);
    }

    setIsLoading(false);
  };

  const subscribeAuth = () =>
    supabase.auth.onAuthStateChange((_event, session) => {
      const authUser = session?.user;

      if (authUser) {
        fetchUser(authUser.id);
      } else {
        setUser(null);
      }
    });

  useEffect(() => {
    initUser();

    const { data } = subscribeAuth();
    return () => data.subscription.unsubscribe();
  }, []);
  console.log('✳️user', user);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
