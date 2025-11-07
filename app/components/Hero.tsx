'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
import SplitText from './SplitText';
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
    <section className="relative min-h-[100svh] pb-10 pt-[calc(5.5rem+env(safe-area-inset-top))] md:pb-16 md:pt-[calc(7rem+env(safe-area-inset-top))]">
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-white">
            <div className="flex flex-wrap gap-3">
              <Badge variant="default">Beta en Santiago RM</Badge>
              <Badge variant="success">Freemium</Badge>
            </div>

            <div className="space-y-3">
              <SplitText
                text="Lo que gastas al pisar el acelerador, sin sorpresas."
                tag="h1"
                className="w-full text-balance text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
                textAlign="left"
                splitType="chars"
                delay={40}
                duration={0.35}
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.2}
                rootMargin="-80px"
              />
              <p className="max-w-2xl text-lg text-white/80 md:text-xl">
                GasMy registra tus TAG y bencina en tiempo real en Santiago para que veas cuanto
                gastas por viaje y por mes.
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
              Tu auto te cuesta mas de lo que crees. GasMy lo hace visible para que puedas
              optimizar.
            </p>
          </div>

          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="relative w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] lg:max-w-[300px]"
            >
              <img
                src="/mockup7.png"
                alt="GasMy App en iPhone mostrando TAG BIP y gastos"
                className="h-auto w-full object-contain drop-shadow-[0_40px_120px_rgba(28,10,232,0.35)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
