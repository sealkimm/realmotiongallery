import { notFound } from 'next/navigation';
import CardListAnimator from '@/animations/CardListAnimator';
import { categories } from '@/data/categories';
import { Search } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';
import ExampleCard from '@/components/card/ExampleCard';
import { SearchInput } from '@/components/inputs/SearchInput';
import PageHeader from '@/components/layouts/PageHeader';
import { Badge } from '@/components/ui/badge';

interface CategoryPageProps {
  params: { type: string };
}

/// 데이터 타입스크립트 해야됨??!!
const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { type } = params;

  const category = categories.find(c => c.type === type);

  const { data: exampleListData, error } = await supabase
    .from('examples')
    .select('*')
    .eq('type', type);

  if (!category || !exampleListData) {
    return notFound();
  }

  // type 별 데이터 뿌리기 api 사용
  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <PageHeader
            title={`${category.title} Animations`}
            description={category.description}
            badgeTitle={category.title}
            badgeColor={category.color}
            className="mb-8"
          />
          <div className="relative mb-10 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <SearchInput
              type="text"
              placeholder={`${category.title} 애니메이션을 검색`}
              className="pl-10"
            />
          </div>
          <CardListAnimator direction="up">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {exampleListData.map(item => (
                <ExampleCard key={item.id} category={category} data={item} />
              ))}
            </div>
          </CardListAnimator>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
