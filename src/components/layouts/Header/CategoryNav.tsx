import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { categories } from '@/features/category/data/categories';

interface CategoryNavProps {
  activeCategory: string;
}

const CategoryNav = ({ activeCategory }: CategoryNavProps) => {
  return (
    <nav className="mr-8 flex gap-8">
      <Button
        asChild
        variant="ghost"
        className={cn(
          'transition-colors',
          'hover:text-foreground',
          activeCategory === 'all' ? 'text-foreground' : 'text-gray-500',
        )}
      >
        <Link href={`/`}>All</Link>
      </Button>
      {categories.map(category => (
        <Button
          asChild
          key={category.type}
          variant="ghost"
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
