'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

import { Button } from '../../ui/button';

const FloatingAddButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button asChild className="gradient-background h-14 w-14 rounded-full">
          <Link href="/write">
            <Plus size={24} />
          </Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingAddButton;
