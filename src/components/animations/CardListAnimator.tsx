'use client';

import { useRef } from 'react';

import { gsap, useGSAP } from '@/lib/gsap';

interface CardListAnimatorProps {
  direction: 'up' | 'down' | 'left' | 'right';
  children: React.ReactNode;
}

const FROM_MAP = {
  up: { y: 50, opacity: 0 },
  down: { y: -50, opacity: 0 },
  left: { x: 100, opacity: 0 },
  right: { x: -100, opacity: 0 },
};

const CardListAnimator = ({ direction, children }: CardListAnimatorProps) => {
  const wrapperRef = useRef(null);

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const cards = gsap.utils.toArray('.example-card', wrapperRef.current);
    const from = FROM_MAP[direction];

    gsap.fromTo(cards, from, {
      x: 0,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: 'top 70%',
      },
    });
  }, {});
  return <div ref={wrapperRef}>{children}</div>;
};

export default CardListAnimator;
