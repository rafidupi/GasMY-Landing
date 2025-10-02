'use client';

import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
import { Card } from './Card';
import { trackEvent } from '@/lib/analytics';

interface HeroProps {
  onCtaBeta: () => void;
  onCtaCalc: () => void;
}

export function Hero({ onCtaBeta, onCtaCalc }: HeroProps) {
  const handleBetaClick = () => {
    trackEvent.clickCtaBeta();
    onCtaBeta();
  };

  const handleCalcClick = () => {
    trackEvent.clickCtaCalc();
    onCtaCalc();
  };

  return (
    <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-bg-main">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Beta en Santiago RM</Badge>
              <Badge variant="success">Freemium</Badge>
              <Badge variant="outline">7 días gratis</Badge>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong leading-tight">
                Tu gasto en auto, ordenado y optimizado.
              </h1>
              <p className="text-lg md:text-xl text-text-mid max-w-2xl">
                GasMy registra tus TAG y bencina en tiempo real en Santiago para que veas cuánto gastas por viaje y por mes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={handleBetaClick}
              >
                Únete a la beta
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleCalcClick}
              >
                Calcula tu ahorro
              </Button>
            </div>

            <p className="text-sm text-text-light">
              Tu auto te cuesta más de lo que crees. GasMy lo hace visible para que puedas optimizar.
            </p>
          </div>

          {/* Right Visual - Mockup Card */}
          <div className="flex justify-center lg:justify-end">
            <Card gradient className="max-w-sm w-full space-y-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">Estado actual</span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                    En ruta
                  </span>
                </div>
                <h3 className="text-2xl font-bold">Tu viaje de hoy</h3>
              </div>

              <div className="space-y-4">
                {/* TAG detectado */}
                <div className="bg-white/10 backdrop-blur-sm rounded-ios p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">TAG detectado</span>
                  </div>
                  <p className="text-2xl font-bold">Costanera Norte</p>
                  <p className="text-sm text-white/70">$1.200 CLP</p>
                </div>

                {/* Costo por km */}
                <div className="bg-white/10 backdrop-blur-sm rounded-ios p-4">
                  <p className="text-sm text-white/70 mb-1">Costo por km</p>
                  <p className="text-3xl font-bold">$85</p>
                </div>

                {/* Costo del viaje */}
                <div className="bg-white/10 backdrop-blur-sm rounded-ios p-4">
                  <p className="text-sm text-white/70 mb-1">Costo del viaje</p>
                  <p className="text-3xl font-bold">$2.550</p>
                  <p className="text-xs text-white/60 mt-1">Bencina + peajes</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/20">
                <p className="text-sm text-white/70 text-center">
                  Tracking automático en tiempo real
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
