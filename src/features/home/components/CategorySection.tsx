'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

import { gsap, useGSAP } from '@/lib/gsap';
import CardListAnimator from '@/components/animations/CardListAnimator';
import { Button } from '@/components/ui/button';
import type { Category } from '@/features/category/data/categories';
import ExampleCard from '@/features/example/components/ExampleCard';
import type { Example } from '@/features/example/types/example';

interface CategorySectionProps {
  category: Category;
  exampleList: Example[];
}

const CategorySection = ({ category, exampleList }: CategorySectionProps) => {
  const categorySectionRef = useRef(null);

  useGSAP(
    () => {
      if (!categorySectionRef.current) return;

      gsap.from(categorySectionRef.current, {
        scrollTrigger: {
          trigger: categorySectionRef.current,
          start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    },
    { scope: categorySectionRef },
  );

  return (
    <div ref={categorySectionRef}>
      <div className="mb-8 flex items-center justify-between">
        <div className="flex flex-col gap-3">
          <h2
            className={`text-3xl font-bold md:text-4xl ${category.textColor}`}
          >
            {category.title}
          </h2>
          <p className="text-xl text-gray-400">
            Smooth animations powered by GreenSock Animation Platform
          </p>
        </div>
        <Button variant="link" asChild className={`${category.textColor}`}>
          <Link href={`/${category.type}`}>
            View All
            <ChevronRight />
          </Link>
        </Button>
      </div>
      <CardListAnimator direction="left">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {exampleList.map(item => (
            <ExampleCard key={item.id} category={category} example={item} />
          ))}
        </div>
      </CardListAnimator>
    </div>
  );
};

export default CategorySection;
