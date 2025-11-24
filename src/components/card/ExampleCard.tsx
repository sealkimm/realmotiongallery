'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Category } from '@/data/categories';
import { Example } from '@/types/example';
import { ArrowRight } from 'lucide-react';
import * as motion from 'motion/react-client';

import { cn } from '@/lib/utils';
import useExampleInteractions from '@/hooks/useExampleInteractions';
import ExampleActions from '@/features/example/components/ExampleCardActions';
import ExampleCardActions from '@/features/example/components/ExampleCardActions';

import { Card, CardContent } from '../ui/card';

// 코드 너무 지저분...정리 필요

interface ExampleCardProps {
  category: Category;
  example: Example;
  isHorizontal?: boolean;
}

const ExampleCard = ({
  category,
  example,
  isHorizontal = false,
}: ExampleCardProps) => {
  const router = useRouter();
  const { handleLike, handleBookmark, likeCount, isLiked, isBookmarked } =
    useExampleInteractions({ example });

  const handleComment = async e => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/${example.type}/${example.id}#comment`);
  };
  //초기값 설정
  // console.log('example', example);
  return (
    <Link href={`/${example.type}/${example.id}`} className="example-card">
      <motion.div
        whileHover={{ y: isHorizontal ? -5 : -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-br ${category.color} h-full rounded-xl p-[2px]`}
      >
        <Card
          className={cn(
            'flex h-full overflow-hidden rounded-xl border-0 bg-gray-900',
            isHorizontal ? 'flex-row items-center' : 'flex-col',
          )}
        >
          <div
            className={cn(
              'relative',
              isHorizontal ? 'aspect-square h-full w-1/3' : 'h-40 w-full',
            )}
          >
            <div
              className={`absolute bg-gradient-to-b ${category.color} inset-0 h-full w-full opacity-30 mix-blend-overlay`}
            ></div>
            <Image
              src={example.thumbnail}
              alt={example.title}
              width={isHorizontal ? 120 : 320}
              height={isHorizontal ? 120 : 160}
              className="h-full w-full object-cover"
            />
          </div>
          <CardContent className={cn(isHorizontal ? 'p-4' : 'p-6')}>
            <div>
              <h3
                className={cn(
                  'line-clamp-1 font-semibold',
                  isHorizontal ? 'mb-1 text-base' : 'mb-3 text-xl',
                )}
              >
                {example.title}
              </h3>
              <p
                className={cn(
                  'line-clamp-1 text-gray-400',
                  isHorizontal
                    ? 'flex items-center gap-2 text-sm'
                    : 'text-base',
                )}
              >
                {example.description}
                {isHorizontal && <ArrowRight size={14} />}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              {/* 컴포분리 */}
              <ExampleCardActions
                handleLike={handleLike}
                handleBookmark={handleBookmark}
                handleComment={handleComment}
                likeCount={likeCount}
                isLiked={isLiked}
                isBookmarked={isBookmarked}
              />
              {!isHorizontal && (
                <div className={category.textColor}>
                  <div>
                    <ArrowRight size={20} />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ExampleCard;
