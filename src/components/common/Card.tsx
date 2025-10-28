import Image from 'next/image';
import Link from 'next/link';
import { Category, Example } from '@/types/category';
import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '../ui/card';

interface ExampleCardProps {
  data: Category;
  item: Example;
}

const ExampleCard = ({ data, item }: ExampleCardProps) => {
  return (
    <Link href={`/${data.type}/${item.id}`}>
      <div
        className={`bg-gradient-to-br ${data.color} h-full rounded-xl p-[2px]`}
      >
        <Card className="overflow-hidden rounded-xl border-0">
          <div className="relative">
            <div
              className={`absolute bg-gradient-to-b ${data.color} inset-0 h-full w-full opacity-30 mix-blend-overlay`}
            ></div>
            <Image src={item.image} alt={item.title} width={320} height={160} />
          </div>
          <CardContent className="p-6">
            <div>
              <h3 className="mb-3 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
            <div className={`flex justify-end ${data.textColor} mt-3`}>
              <div>
                <ArrowRight size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Link>
  );
};

export default ExampleCard;
