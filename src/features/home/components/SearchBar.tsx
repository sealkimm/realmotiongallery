import { ArrowUp, Search, Sparkles } from 'lucide-react';

import { SearchInput } from '@/components/SearchInput';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="relative flex items-center justify-between gap-2 rounded-xl border border-gray-800 bg-gray-800/50 p-1.5 focus-within:border-ring hover:border-ring">
        <div className="rounded-lg bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 p-2">
          <Sparkles size={20} className="text-purple-300" />
        </div>
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={16}
          />
          <SearchInput
            className="border-0 pl-9"
            placeholder="어떤 모션을 찾으시나요?"
          />
        </div>
        <Button size="sm" className="rounded-lg bg-purple-800/60">
          <ArrowUp className="text-purple-300" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
