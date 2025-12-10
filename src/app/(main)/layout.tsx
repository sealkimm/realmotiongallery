import '@/styles/globals.css';

import Footer from '@/components/layouts/Footer';
import MainHeader from '@/components/layouts/header/main';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
