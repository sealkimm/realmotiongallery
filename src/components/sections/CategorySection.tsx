'use client';

//이 폴더 위치에 넣는게 맞을까??
import { useRef } from 'react';
import Link from 'next/link';
import CardListAnimator from '@/animations/CardListAnimator';
import { Category } from '@/data/categories';
import { Example } from '@/types/example';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

import ExampleCard from '@/components/card/ExampleCard';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface CategorySectionProps {
  category: Category;
  exampleList: Example[];
}

const CategorySection = ({ category, exampleList }: CategorySectionProps) => {
  const categorySectionRef = useRef<HTMLDivElement>(null);

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
      {/* 카드 */}
      <CardListAnimator direction="left">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {exampleList.map(item => (
            <ExampleCard key={item.id} category={category} data={item} />
          ))}
        </div>
      </CardListAnimator>
    </div>
  );
};

export default CategorySection;
