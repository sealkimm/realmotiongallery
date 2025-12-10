'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

const SimpleHeader = () => {
  const router = useRouter();

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/0 backdrop-blur-md">
      <div className="container relative mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="relative text-2xl font-bold">
          <span className="gradient-text">Motion Gallery</span>
        </Link>
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </Button>
      </div>
    </header>
  );
};

export default SimpleHeader;
