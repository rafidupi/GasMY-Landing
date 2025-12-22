'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
import SplitText from './SplitText';
import { trackEvent } from '@/lib/analytics';

interface HeroProps {
  onCtaBeta: () => void;
}

export function Hero({ onCtaBeta }: HeroProps) {
  const handleBetaClick = () => {
    trackEvent.clickCtaBeta();
    onCtaBeta();
  };

  return (
    <section className="relative min-h-[100svh] pb-8 pt-[calc(5.5rem+env(safe-area-inset-top))] md:pb-12 md:pt-[calc(7rem+env(safe-area-inset-top))]">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8 text-white">
            <div className="flex flex-wrap gap-2">
              <Badge variant="default">Beta en Santiago RM</Badge>
            </div>

            <div className="space-y-6">
              <SplitText
                text="El costo real de moverte. Una app que te dice lo que nadie más te cuenta."
                tag="h1"
                className="w-full text-balance text-3xl font-medium leading-relaxed tracking-normal text-gray-900 md:text-4xl lg:text-5xl"
                textAlign="left"
                splitType="words"
                delay={50}
                duration={0.4}
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
              />
              <p className="max-w-xl text-base leading-relaxed text-gray-600 md:text-lg">
                gasmy te muestra en vivo lo que gastas en bencina y TAG,
                <br />
                para que puedas tomar el control de tu billetera
              </p>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Button variant="primary" size="lg" onClick={handleBetaClick}>
                Únete a la lista de espera
              </Button>
            </div>

            <p className="text-sm text-gray-500">Para probar la app en la RM como beta</p>
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
                alt="gasmy. App en iPhone mostrando TAG BIP y gastos"
                className="h-auto w-full object-contain drop-shadow-[0_20px_60px_rgba(28,10,232,0.15)]"
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
