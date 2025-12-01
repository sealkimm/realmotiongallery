import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { categories } from '@/features/category/data/categories';

interface CategoryNavProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const CategoryNav = ({
  activeCategory,
  setActiveCategory,
}: CategoryNavProps) => {
  return (
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
  );
};

export default CategoryNav;
