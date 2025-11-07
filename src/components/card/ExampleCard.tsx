import Image from 'next/image';
import Link from 'next/link';
import { Category } from '@/data/categories';
import { Example } from '@/types/example';
import { ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Card, CardContent } from '../ui/card';

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
    <Link href={`/${category.type}/${data.id}`}>
      <div
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
            {!isHorizontal && (
              <div className={`flex justify-end ${category.textColor} mt-3`}>
                <div>
                  <ArrowRight size={20} />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default ExampleCard;
