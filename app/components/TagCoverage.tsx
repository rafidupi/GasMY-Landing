'use client';

import { Container } from './Container';
import { Card } from './Card';
import { Section } from './Section';

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
              Hay más TAG de lo que vemos. Armamos un mapa con cada pórtico en la Región Metropolitana para que no te pillen de sorpresa.
            </p>
            <p className="text-sm text-white/55">
              Muy pronto podrás ver horarios, tarifas y rutas recomendadas directamente en este mapa interactivo.
            </p>
          </div>

          <Card className="bg-[#141414] border-white/10 shadow-xl shadow-black/30">
            <div className="flex aspect-[4/3] w-full items-center justify-center rounded-[18px] bg-gradient-to-br from-[#232323] via-[#1f2a3f] to-[#0b0f1f] text-center text-white/70">
              <div className="space-y-2 px-6">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">Mapa en camino</p>
                <p className="text-lg font-medium">
                  Aquí pronto cargaremos el mapa Mapbox con todos los TAG de Santiago.
                </p>
                <p className="text-xs text-white/50">
                  Dejamos el espacio listo para integrar la API y tus datos GeoJSON.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}

export default TagCoverage;
