'use client';

import { Container } from './Container';
import { Card } from './Card';
import { Section } from './Section';
import { TollMap } from './TollMap';
import { useRef, useState } from 'react';

export function TagCoverage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <Section id="tag-coverage" className="bg-[#1b1b1b] text-white">
      <Container className="max-w-6xl">
        <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-wide text-white/70">
              Cobertura TAG RM
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              ¿Sabías cuántos TAG hay en la Región Metropolitana?
            </h2>
            <p className="text-lg text-white/90 md:text-xl font-medium">
              Son más de los que imaginas
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl text-white font-bold">223</span>
              <span className="text-2xl text-white font-bold">pórticos solo en la RM</span>
            </div>
            <p className="text-base text-white/70">
              Partimos por la RM y pronto llegaremos a todo Chile. Estamos mapeando pórtico por
              pórtico, para que cada kilómetro que manejes lo hagas tranquilo y sin sorpresas.
            </p>
          </div>

          <div
            style={{ perspective: '1000px' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              style={{
                transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out',
              }}
            >
              <Card className="bg-[#141414] border-white/10 shadow-xl shadow-black/30 p-0 overflow-hidden">
                <TollMap />
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default TagCoverage;
