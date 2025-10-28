import Image from 'next/image';
import Link from 'next/link';
import { categories, gsapDummyData } from '@/data/categories';
import { ArrowUp, ChevronRight, Search, Sparkles } from 'lucide-react';

import ExampleCard from '@/components/common/Card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { Input } from '../components/ui/custom/Input';

// import { Input } from '@/components/ui/input';

const MainPage = () => {
  return (
    <main className="flex-1 bg-black">
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
            <p className="text-xl text-gray-400 md:text-2xl">
              Discover a collection of stunning animations and visual effects
              created using GSAP, Three.js, and CSS.
            </p>
          </div>
          {/* !!! 컬러 사용한것들 공통으로 할 수 있을지 보기,....버튼 컬러.... */}
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute -inset-0.5 rounded-xl bg-white/15 blur-md"></div>
            <div className="hover:border-ring focus-within:border-ring relative flex items-center justify-between gap-2 rounded-xl border border-gray-900 bg-[#121318] p-1.5">
              <div className="rounded-lg bg-gradient-to-br from-violet-500/30 via-fuchsia-500/30 p-2">
                <Sparkles size={20} className="text-purple-300" />
              </div>
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={16}
                />
                {/* 다양한 인풋 사이즈 필요하다면 커스텀에서 props s,m,l 사이즈 주는거 추가하기, 스타일링 준것도 공통으로 뺄거 빼기 */}
                <Input
                  className="rounded-lg border-0 bg-transparent pl-9 focus-visible:ring-0"
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
        <div className="container mx-auto flex flex-col gap-24 border border-red-500 px-4">
          {categories.map(category => (
            <div id={category.type} key={category.id}>
              {/* 제목 */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-3">
                  <h2
                    className={`text-3xl font-bold md:text-4xl ${category.textColor}`}
                  >
                    {category.title}
                  </h2>
                  <p className="text-xl text-gray-500">
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
                {gsapDummyData.map(item => (
                  <ExampleCard key={item.id} data={category} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
