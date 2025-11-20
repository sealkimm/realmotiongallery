import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';

import { supabase } from '@/lib/supabaseClient';

import ExampleClient from './ExampleClient';

// import { gsapDummyData } from '@/data/categories';

interface Props {
  params: {
    type: string;
    id: string;
  };
}

const ExamplePage = async ({ params }: Props) => {
  const { type, id } = params;

  //이거 categories 중복으로 많이 쓰네...
  const category = categories.find(c => c.type === type);

  const { data: exampleData, error } = await supabase
    .from('examples')
    .select('*')
    .eq('id', id)
    .single();

  if (!category || !exampleData) {
    return notFound();
  }

  return (
    <div className="pb-20 pt-24">
      <div className="container mx-auto px-4">
        <ExampleClient category={category} exampleData={exampleData} />
      </div>
    </div>
  );
};

export default ExamplePage;
