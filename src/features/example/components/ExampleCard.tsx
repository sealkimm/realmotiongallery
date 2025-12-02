'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, UserIcon } from 'lucide-react';
import * as motion from 'motion/react-client';

import { cn } from '@/lib/utils';
import useExampleInteractions from '@/hooks/useExampleInteractions';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Category } from '@/features/category/types/category';
import ExampleCardActions from '@/features/example/components/ExampleCardActions';
import type { Example } from '@/features/example/types/example';

import { Card, CardContent } from '../../../components/ui/card';
import WriterInfo from './WriterInfo';

interface ExampleCardProps {
  category: Category;
  example: Example;
  layout?: 'horizontal' | 'vertical';
}

const ExampleCard = ({
  category,
  example,
  layout = 'vertical',
}: ExampleCardProps) => {
  const router = useRouter();
  const interactions = useExampleInteractions({ example });
  const isHorizontal = layout === 'horizontal';

  const handleComment = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(`/${example.type}/${example.id}#comment`);
  };

  const cardLayoutClass = cn(
    'flex h-full overflow-hidden rounded-xl border-0 bg-gray-900',
    isHorizontal ? 'flex-row items-center' : 'flex-col',
  );
  const imageWrapperClass = cn(
    'relative',
    isHorizontal ? 'aspect-square h-full w-1/3' : 'h-40 w-full',
  );

  const titleClass = cn(
    'line-clamp-1 font-semibold',
    isHorizontal ? 'mb-1 text-base' : 'mb-3 text-xl',
  );

  const descClass = cn(
    'line-clamp-1 text-gray-400',
    isHorizontal ? 'flex items-center gap-2 text-sm' : 'text-base',
  );

  return (
    <Link href={`/${example.type}/${example.id}`} className="example-card">
      <motion.div
        whileHover={{ y: isHorizontal ? -5 : -10, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-gradient-to-br ${category.color} h-full rounded-xl p-[2px]`}
      >
        <Card className={cardLayoutClass}>
          <div className={imageWrapperClass}>
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
              <h3 className={titleClass}>{example.title}</h3>
              <p className={descClass}>
                {example.description}
                {isHorizontal && <ArrowRight size={14} />}
              </p>
            </div>
            <WriterInfo author={example.author} variant="card" />
            <div className="mt-3 flex items-center justify-between">
              <ExampleCardActions
                {...interactions}
                handleComment={handleComment}
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
