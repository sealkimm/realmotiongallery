'use client';

// 위치 다시...
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

gsap.registerPlugin(useGSAP);

interface AnimatedContentWrapperProps {
  children: React.ReactNode;
}

const AnimatedContentWrapper = ({ children }: AnimatedContentWrapperProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;

      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    },
    { scope: contentRef },
  );
  return (
    <div ref={contentRef} className="relative mx-auto max-w-5xl">
      {children}
    </div>
  );
};

export default AnimatedContentWrapper;
