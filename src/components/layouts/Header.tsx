'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { LogIn, UserPlus2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

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
  const [activeCategory, setActiveCategory] = useState('gsap');

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/0 backdrop-blur-md">
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
          {/* User Menu 로그인 후 화면 만들어야 함, 로그인 버튼 컴포 분리 */}
          <Button
            asChild
            variant="secondary"
            className="bg-purple-500/20 text-white hover:bg-purple-500/30"
          >
            <Link href="/" className="flex items-center gap-4">
              <LogIn />
              <span>Sign In</span>
            </Link>
          </Button>
          <Button asChild className="gradient-background ml-4">
            <Link href="/" className="flex items-center gap-4">
              <UserPlus2 />
              <span>Sign Up</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
