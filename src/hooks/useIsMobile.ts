'use client';

import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );

    const handleOnChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);

    mediaQuery.addEventListener('change', handleOnChange);

    return () => {
      mediaQuery.removeEventListener('change', handleOnChange);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
