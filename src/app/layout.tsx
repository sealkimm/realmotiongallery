import { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import Footer from '../components/layouts/Footer';
import Header from '../components/layouts/Header';
import Theme from '../providers/theme-provider';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  // variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Motion Gallery - 애니메이션 및 모션 효과 갤러리',
  description: 'GSAP, Three.js, CSS 및 기타 기술을 활용한 애니메이션 예제 모음',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Theme>
          {/* 이거 뭐 homewrapper 컨테이너로 따로 빼기 */}
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            {children}
            <Footer />
          </div>
        </Theme>
      </body>
    </html>
  );
}
