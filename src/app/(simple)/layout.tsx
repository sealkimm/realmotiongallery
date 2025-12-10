import '@/styles/globals.css';

import SimpleHeader from '@/components/layouts/Header/SimpleHeader';

const SimpleLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SimpleHeader />
      <main>{children}</main>
    </>
  );
};
export default SimpleLayout;
