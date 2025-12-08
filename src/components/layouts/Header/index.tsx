'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { ArrowLeft } from 'lucide-react';

import { gsap, useGSAP } from '@/lib/gsap';
import UseSimpleLayout from '@/hooks/useSimpleLayout';
import { Button } from '@/components/ui/button';

import AuthButtons from './AuthButtons';
import CategoryNav from './CategoryNav';
import UserMenu from './UserMenu';

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const { user, isLoading, signOut } = useAuth();
  const { isSimpleLayout, pathname } = UseSimpleLayout();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    if (pathname === '/') {
      setActiveCategory('all');
    } else {
      const type = pathname.split('/')[1];
      setActiveCategory(type);
    }
  }, [pathname]);

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
      <div className="flex h-[200] w-full items-center justify-center bg-green-500">
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
        {isSimpleLayout ? (
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
        ) : (
          <div className="relative flex items-center">
            <CategoryNav activeCategory={activeCategory} />
            {user && <UserMenu user={user} onSignOut={signOut} />}
            <AuthButtons isAuthenticated={!!user} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
