'use client';

import { usePathname } from 'next/navigation';

const SIMPLE_HEADER_PATHS = ['/write', '/login', '/signup'];

const UseSimpleLayout = () => {
  const pathname = usePathname();
  const isSimpleLayout = SIMPLE_HEADER_PATHS.some(path =>
    pathname.startsWith(path),
  );

  return { isSimpleLayout, pathname };
};

export default UseSimpleLayout;
