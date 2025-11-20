import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/data/categories';
import { Example } from '@/types/example';
import { ArrowRight, Bookmark, Heart, MessageCircle } from 'lucide-react';
import * as motion from 'motion/react-client';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '../ui/card';

// 코드 너무 지저분...정리 필요
interface ExampleCardProps {
  category: Category;
  data: Example;
  isHorizontal?: boolean;
}

const ExampleCard = ({
  category,
  data,
  isHorizontal = false,
}: ExampleCardProps) => {
  return (
    <Link href={`/${category.type}/${data.id}`} className="example-card">
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
              src={data.thumbnail}
              alt={data.title}
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
                {data.title}
              </h3>
              <p
                className={cn(
                  'line-clamp-1 text-gray-400',
                  isHorizontal
                    ? 'flex items-center gap-2 text-sm'
                    : 'text-base',
                )}
              >
                {data.description}
                {isHorizontal && <ArrowRight size={14} />}
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between">
              {/* 컴포분리 */}
              <div className="flex items-center justify-end gap-3">
                {/*  중복.. 뭔가 똑똑한 방법이 있을까 */}
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-red-500"
                >
                  <Heart size={16} />
                  <span className="text-sm">10</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-blue-500"
                >
                  <MessageCircle size={16} />
                  <span className="text-sm">24</span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1 text-gray-400 transition-colors hover:text-yellow-500"
                >
                  <Bookmark size={16} />
                </button>
              </div>
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
