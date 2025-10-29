'use client';

import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
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
    <section className="relative pb-12 pt-32 md:pb-20 md:pt-40">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="space-y-6 text-white">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Beta en Santiago RM</Badge>
              <Badge variant="success">Freemium</Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Lo que gastas al pisar el acelerador, sin sorpresas.
              </h1>
              <p className="max-w-2xl text-lg text-white/80 md:text-xl">
                GasMy registra tus TAG y bencina en tiempo real en Santiago para que veas cuanto gastas
                por viaje y por mes.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button variant="primary" size="lg" onClick={handleBetaClick}>
                Unete a la beta
              </Button>
              <Button variant="outline" size="lg" onClick={handleCalcClick}>
                Ir a la calculadora
              </Button>
            </div>

            <p className="text-sm text-white/60">
              Tu auto te cuesta mas de lo que crees. GasMy lo hace visible para que puedas optimizar.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <img
                src="/iphone-mockup.png"
                alt="GasMy App en iPhone mostrando TAG BIP y gastos"
                className="h-auto w-full object-contain drop-shadow-[0_40px_120px_rgba(28,10,232,0.35)]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
