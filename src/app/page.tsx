import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories } from '@/data/categories';
import { Example } from '@/types/example';
import { ArrowUp, ChevronRight, Search, Sparkles } from 'lucide-react';

import { supabase } from '@/lib/supabaseClient';
import ExampleCard from '@/components/card/ExampleCard';
import { SearchInput } from '@/components/inputs/SearchInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// import { Input } from '@/components/ui/input';

const MainPage = async () => {
  const { data: exampleListData, error } = await supabase
    .from('testdata')
    .select('*');

  if (!exampleListData) {
    return notFound();
  }

  const examplesByType = exampleListData.reduce<Record<string, Example[]>>(
    (acc, item) => {
      const type = item.type;
      (acc[type] ||= []).push(item);
      return acc;
    },
    {},
  );

  const filteredCategories = categories.filter(
    category => examplesByType[category.type]?.length > 0,
  );

  return (
    <div>
      {/* 메인 배너 영역 */}
      <div className="relative pb-20 pt-32">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(102, 0, 204, 0.2) 0%, rgba(102, 0, 204, 0.1) 30%, transparent 80%)',
          }}
        ></div>
        <div className="container relative mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <h1 className="gradient-text mb-6 text-4xl font-bold md:text-6xl">
              {/* <h1 className="mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"> */}
              Explore the Art of Motion
            </h1>
            <p className="text-xl text-gray-300 md:text-2xl">
              Discover a collection of stunning animations and visual effects
              created using GSAP, Three.js, and CSS.
            </p>
          </div>
          {/* !!! 컬러 사용한것들 공통으로 할 수 있을지 보기,....버튼 컬러.... */}
          <div className="relative mx-auto max-w-2xl">
            {/* <div className="absolute -inset-0.5 rounded-xl bg-white/30 blur-md"></div> */}
            <div className="relative flex items-center justify-between gap-2 rounded-xl border border-gray-800 bg-gray-800/50 p-1.5 focus-within:border-ring hover:border-ring">
              <div className="rounded-lg bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 p-2">
                <Sparkles size={20} className="text-purple-300" />
              </div>
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={16}
                />
                {/* 다양한 인풋 사이즈 필요하다면 커스텀에서 props s,m,l 사이즈 주는거 추가하기, 스타일링 준것도 공통으로 뺄거 빼기 */}
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
        </div>
      </div>
      {/* 메인 컨텐츠 영역*/}
      <div className="relative pb-40">
        <div className="container mx-auto flex flex-col gap-24 px-4">
          {filteredCategories.map(category => (
            <div key={category.id}>
              {/* 제목 */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <h2
                    className={`text-3xl font-bold md:text-4xl ${category.textColor}`}
                  >
                    {category.title}
                  </h2>
                  <p className="text-xl text-gray-400">
                    Smooth animations powered by GreenSock Animation Platform
                  </p>
                </div>
                <Button
                  variant="link"
                  asChild
                  className={`${category.textColor}`}
                >
                  <Link href={`/${category.type}`}>
                    View All
                    <ChevronRight />
                  </Link>
                </Button>
              </div>
              {/* 카드 */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {examplesByType[category.type].map(item => (
                  <ExampleCard key={item.id} category={category} data={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
