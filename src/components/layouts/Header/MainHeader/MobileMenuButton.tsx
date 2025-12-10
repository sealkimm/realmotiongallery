import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="ml-4 md:hidden"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </Button>
  );
};

export default MobileMenuButton;
