'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  splitType?: 'chars' | 'words' | 'lines';
  from?: { opacity?: number; y?: number; x?: number };
  to?: { opacity?: number; y?: number; x?: number };
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  textAlign?: React.CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 100,
  duration = 0.6,
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const splitText = () => {
    if (splitType === 'chars') {
      return text.split('').map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={from}
          whileInView={to}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration,
            delay: (delay / 1000) * i,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
          onAnimationComplete={() => {
            if (i === text.length - 1) {
              onLetterAnimationComplete?.();
            }
          }}
        >
          {char}
        </motion.span>
      ));
    }

    if (splitType === 'words') {
      return text.split(' ').map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={from}
          whileInView={to}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration,
            delay: (delay / 1000) * i,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ));
    }

    return text;
  };

  const style: React.CSSProperties = {
    textAlign,
    wordWrap: 'break-word',
  };

  const classes = `inline-block whitespace-normal ${className}`;

  const content = splitText();

  const Tag = tag as keyof JSX.IntrinsicElements;

  return (
    <Tag style={style} className={classes}>
      {content}
    </Tag>
  );
};

export default SplitText;
