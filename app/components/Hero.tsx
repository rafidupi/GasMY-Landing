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
    <section className="pt-16 pb-12 md:pt-24 md:pb-16 bg-bg-main">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Beta en Santiago RM</Badge>
              <Badge variant="success">Freemium</Badge>
              <Badge variant="outline">7 días gratis</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-strong leading-tight">
                Tu gasto en auto, ordenado y optimizado.
              </h1>
              <p className="text-lg md:text-xl text-text-mid max-w-2xl">
                GasMy registra tus TAG y bencina en tiempo real en Santiago para que veas cuánto
                gastas por viaje y por mes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" onClick={handleBetaClick}>
                Únete a la beta
              </Button>
              <Button variant="outline" size="lg" onClick={handleCalcClick}>
                Calcula tu ahorro
              </Button>
            </div>

            <p className="text-sm text-text-light">
              Tu auto te cuesta más de lo que crees. GasMy lo hace visible para que puedas
              optimizar.
            </p>
          </div>

          {/* Right Visual - iPhone Mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative max-w-md lg:max-w-lg w-full">
              <img 
                src="/iphone-mockup.png" 
                alt="GasMy App en iPhone mostrando TAG BIP y gastos" 
                className="w-full h-auto drop-shadow-2xl object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
