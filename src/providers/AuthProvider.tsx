'use client';

import { createContext, useContext, useEffect, useState } from 'react';
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
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDBUser = async (authUserId: string) => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUserId)
      .single();

    return data;
  };

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const dbUser = await fetchDBUser(authUser.id);
      setUser(dbUser);
      setIsLoading(false);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      const dbUser = await fetchDBUser(session.user.id);
      setUser(dbUser);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    // router.push('/');
    // setUser(null);
    // setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
