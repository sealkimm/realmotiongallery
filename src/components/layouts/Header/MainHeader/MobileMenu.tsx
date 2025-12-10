import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { categories } from '@/features/category/data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: string;
}

const MobileMenu = ({ isOpen, onClose, activeCategory }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 bg-black/95 pt-20 backdrop-blur-md"
        >
          <nav className="flex flex-col gap-6 px-4 py-8">
            <Button
              asChild
              variant="ghost"
              onClick={onClose}
              className={cn(
                'h-auto justify-start border-b border-white/10 text-2xl font-medium',
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
                onClick={onClose}
                className={cn(
                  'h-auto justify-start border-b border-white/10 text-2xl font-medium',
                  activeCategory === category.type
                    ? 'text-foreground'
                    : 'text-gray-500',
                )}
              >
                <Link href={`/${category.type}`}>{category.title}</Link>
              </Button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
