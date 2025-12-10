'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function ScrollCar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Transform scroll progress to horizontal position
  const x = useTransform(scrollYProgress, [0, 1], ['-150%', '150%']);

  return (
    <div ref={containerRef} className="relative w-full h-[300px] overflow-hidden bg-bg-card">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          style={{ x }}
          className="absolute w-[300px] md:w-[400px] lg:w-[500px] h-auto z-10"
        >
          <img
            src="/Auto.png"
            alt="Car driving"
            className="w-full h-auto object-contain drop-shadow-xl"
          />
        </motion.div>
      </div>
    </div>
  );
}
