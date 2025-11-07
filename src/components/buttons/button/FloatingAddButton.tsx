import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '../../ui/button';

const FloatingAddButton = () => {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Button asChild className="gradient-background h-14 w-14 rounded-full">
        <Link href="/write">
          <Plus size={24} />
        </Link>
      </Button>
    </div>
  );
};

export default FloatingAddButton;
