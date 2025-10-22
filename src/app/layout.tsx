import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Footer from './components/layouts/Footer';
import Header from './components/layouts/Header';
import Theme from './components/theme-provider';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  // variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Motion Gallery - 애니메이션 및 모션 효과 갤러리',
  description: 'GSAP, Three.js, CSS 및 기타 기술을 활용한 애니메이션 예제 모음',
};

// layout에 category 객체 있는게 이상함. props를 위해 만들었는데 나중에 위치 다시 확인하기.
const categories = [
  {
    id: 'gsap',
    title: 'GSAP',
    description:
      'GSAP는 애니메이션 GSAP는 애니메이션 GSAP는 애니메이션 GSAP는 애니메이션',
    color: 'from-purple-500 to-pink-500',
    textColor: 'text-purple-500',
    borderColor: 'border-purple-500',
  },
  {
    id: 'threejs',
    title: 'Three.js',
    description: 'Immersive 3D experiences and animations',
    color: 'from-blue-500 to-cyan-500',
    textColor: 'text-blue-500',
    borderColor: 'border-blue-500',
  },
  {
    id: 'css',
    title: 'CSS',
    description: 'Pure CSS animations and transitions',
    color: 'from-green-500 to-emerald-500',
    textColor: 'text-green-500',
    borderColor: 'border-green-500',
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme>
          <Header categories={categories} />
          <main>{children}</main>
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
