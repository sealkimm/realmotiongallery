'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import {
  ChevronDown,
  Loader2,
  LogIn,
  LogOut,
  Plus,
  User,
  UserPlus2,
} from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/lib/supabase/supabaseClient';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { categories } from '@/features/category/data/categories';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

gsap.registerPlugin(useGSAP);

// interface Category {
//   id: string;
//   title: string;
//   description: string;
//   color: string;
//   textColor: string;
//   borderColor: string;
// }

// interface HeaderProps {
//   categories: Category[];
// }

const Header = () => {
  const router = useRouter();
  const headerRef = useRef(null);
  const { user, isLoading, signOut } = useAuth();
  const [activeCategory, setActiveCategory] = useState('gsap');

  // 로딩부분 깔끔하게 다시 만들기
  // console.log('user', user);

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
      {/* container는 tailwind.config.ts에 설정되어 있는데 px, py 재설정함. 확인해보기 */}
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4">
        {/* logo컴포로 분리 */}
        <Link href="/" className="relative text-2xl font-bold">
          <span className="gradient-text">Motion Gallery</span>
        </Link>
        <div className="relative flex items-center">
          <nav className="mr-8 flex gap-8">
            {categories.map(category => (
              <Button
                key={category.type}
                variant="ghost"
                asChild
                onClick={() => {
                  setActiveCategory(category.type);
                }}
                className={cn(
                  'transition-colors',
                  'hover:text-foreground',
                  activeCategory === category.type
                    ? 'text-foreground'
                    : 'text-gray-500',
                )}
              >
                <Link href={`/${category.type}`}>{category.title}</Link>
              </Button>
            ))}
          </nav>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-4">
                  <Avatar className="h-8 w-8 border-2 border-purple-500">
                    <AvatarImage src={user.avatar_url} alt={user.nickname} />
                    <AvatarFallback>
                      <User size={16} />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden text-sm md:block">
                    {user.nickname}
                  </span>
                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 border-gray-800 bg-gray-900">
                <DropdownMenuItem asChild>
                  <Link
                    href="/"
                    className="flex cursor-pointer items-center gap-4"
                  >
                    <User size={16} />
                    프로필
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={signOut}
                  className="flex cursor-pointer items-center gap-4"
                >
                  <LogOut size={16} />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              asChild
              variant="secondary"
              className="bg-purple-500/20 text-white hover:bg-purple-500/30"
            >
              <Link href="/auth/login" className="flex items-center gap-4">
                <LogIn />
                <span>로그인</span>
              </Link>
            </Button>
          )}
          {user ? (
            <Button asChild className="gradient-background ml-4">
              <Link href="/write" className="flex items-center gap-4">
                <Plus size={16} />
                <span>글작성</span>
              </Link>
            </Button>
          ) : (
            <Button asChild className="gradient-background ml-4">
              <Link href="/auth/signup" className="flex items-center gap-4">
                <UserPlus2 />
                <span>회원가입</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
