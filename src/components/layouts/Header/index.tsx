'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';

import { gsap, useGSAP } from '@/lib/gsap';

import AuthButtons from './AuthButtons';
import CategoryNav from './CategoryNav';
import UserMenu from './UserMenu';

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const { user, isLoading, signOut } = useAuth();
  const [activeCategory, setActiveCategory] = useState('gsap');

  // 로딩부분 깔끔하게 다시 만들기

  useGSAP(
    () => {
      if (!headerRef.current) return;

      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: headerRef },
  );

  // ✳️✳️✳️✳️ 로그인할때 에러때문에 넣은 로딩인데 이거때문에 모션 안되서 잠시 지움 -> 다시 확인 꼭 하기!!
  if (isLoading)
    return (
      <div className="flex h-full w-full items-center justify-center bg-green-500">
        로딩중...
      </div>
    );

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/0 backdrop-blur-md"
    >
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="relative text-2xl font-bold">
          <span className="gradient-text">Motion Gallery</span>
        </Link>
        <div className="relative flex items-center">
          <CategoryNav
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          {user && <UserMenu user={user} onSignOut={signOut} />}
          <AuthButtons isAuthenticated={!!user} />
        </div>
      </div>
    </header>
  );
};

export default Header;
