'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';

import { gsap, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import UseSimpleLayout from '@/hooks/useSimpleLayout';
import { Button } from '@/components/ui/button';
import { categories } from '@/features/category/data/categories';

import AuthButtons from './AuthButtons';
import CategoryNav from './CategoryNav';
import UserMenu from './UserMenu';

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const { user, isLoading, signOut } = useAuth();
  const { isSimpleLayout, pathname } = UseSimpleLayout();
  const [activeCategory, setActiveCategory] = useState('all');

  // 리팩토링
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <>
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
              {/* 모바일 메뉴 버튼 분리 */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="ml-4 md:hidden"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* mobileNav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 pt-20 backdrop-blur-md"
          >
            <nav className="flex flex-col gap-6 px-4 py-8">
              <Button
                asChild
                variant="ghost"
                onClick={() => setIsMenuOpen(false)}
                className={cn(
                  'h-auto justify-start border-b border-white/10 text-2xl font-medium',
                  activeCategory === 'all'
                    ? 'text-foreground'
                    : 'text-gray-500',
                )}
              >
                <Link href={`/`}>All</Link>
              </Button>
              {categories.map(category => (
                <Button
                  asChild
                  key={category.type}
                  variant="ghost"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'h-auto justify-start border-b border-white/10 text-2xl font-medium',
                    activeCategory === category.type
                      ? 'text-foreground'
                      : 'text-gray-500',
                  )}
                >
                  <Link href={`/${category.type}`}>{category.title}</Link>
                </Button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
