'use client';

import { Container } from './Container';
import { Card } from './Card';
import { Section } from './Section';
import { TollMap } from './TollMap';

export function TagCoverage() {
  return (
    <Section id="tag-coverage" className="bg-[#1b1b1b] text-white">
      <Container className="max-w-6xl">
        <div className="grid min-h-[520px] items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <p className="inline-flex rounded-full border border-white/20 px-4 py-1 text-sm uppercase tracking-wide text-white/70">
              Cobertura TAG RM
            </p>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              ¿Sabías todos los TAG que hay en RM?
            </h2>
            <p className="text-lg text-white/70 md:text-xl">
              Hay más TAG de lo que vemos. Armamos un mapa con cada pórtico en la Región
              Metropolitana para que no te pillen de sorpresa.
            </p>
            <p className="text-sm text-white/55">
              Muy pronto podrás ver horarios, tarifas y rutas recomendadas directamente en este mapa
              interactivo.
            </p>
          </div>

          <Card className="bg-[#141414] border-white/10 shadow-xl shadow-black/30 p-0 overflow-hidden">
            <TollMap />
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default TagCoverage;
