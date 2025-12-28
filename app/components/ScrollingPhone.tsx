'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

type Bounds = { start: number; end: number };

export function ScrollingPhone() {
  const [bounds, setBounds] = useState<Bounds>({ start: 0, end: 0 });
  const [isLocked, setIsLocked] = useState(false);
  const [lockedY, setLockedY] = useState(0);
  const { scrollY } = useScroll();

  useEffect(() => {
    const calculateBounds = () => {
      const hero = document.querySelector('[data-section="hero"]') as HTMLElement | null;
      const beta = document.querySelector('[data-section="beta-download"]') as HTMLElement | null;

      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight;

      const betaTop = beta
        ? beta.getBoundingClientRect().top + window.scrollY
        : heroBottom + window.innerHeight;

      setBounds({ start: heroBottom, end: betaTop });
    };

    calculateBounds();
    window.addEventListener('resize', calculateBounds);

    const t1 = setTimeout(calculateBounds, 200);
    const t2 = setTimeout(calculateBounds, 800);

    return () => {
      window.removeEventListener('resize', calculateBounds);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Lock detection
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (!isLocked && latest >= bounds.end && bounds.end > 0) {
        setLockedY(350);
        setIsLocked(true);
      }
    });

    return () => unsubscribe();
  }, [scrollY, bounds.end, isLocked]);

  // Scroll transform - ONLY used when not locked
  const scrollY_transform = useTransform(scrollY, [bounds.start, bounds.end], [0, 350], {
    clamp: true,
  });
  const scrollScale_transform = useTransform(scrollY, [bounds.start, bounds.end], [1, 0.97], {
    clamp: true,
  });

  return (
    <div className="pointer-events-none">
      <motion.div
        style={{
          y: isLocked ? lockedY : scrollY_transform,
          scale: isLocked ? 0.97 : scrollScale_transform,
        }}
        className="fixed right-[15%] top-[15%] z-40 hidden lg:block"
      >
        <img
          src="/mockuphero.png"
          alt="gasmy app interface"
          className="w-[300px] h-auto object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}
