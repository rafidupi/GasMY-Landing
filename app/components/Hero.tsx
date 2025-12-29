'use client';

import { motion } from 'framer-motion';
import { Container } from './Container';
import { Button } from './Button';
import { Badge } from './Badge';
import SplitText from './SplitText';
import { trackEvent } from '@/lib/analytics';
import { Wallet, MapPin } from 'lucide-react';

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
                <strong>gasmy.</strong> te muestra en vivo lo que gastas en bencina y TAG,
                <br />
                para que puedas tomar el control de tu billetera.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg" onClick={handleBetaClick}>
                Únete a la beta
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                onClick={() =>
                  window.open('https://chat.whatsapp.com/ICS0lvDbm47CV5BiRMPfY8', '_blank')
                }
              >
                <svg
                  className="mr-2 h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Comunidad
              </Button>
            </div>

            <p className="text-base text-gray-500">
              Inscríbete en el formulario para acceder a la beta y súmate a nuestra comunidad en
              WhatsApp, para que todos podamos construir una app que nos beneficie a todos.
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
              {/* Phone mockup image */}
              <img
                src="/Mockupfinal.png"
                alt="gasmy. App en iPhone mostrando TAG BIP y gastos"
                className="h-auto w-full object-contain drop-shadow-[0_20px_60px_rgba(28,10,232,0.15)]"
              />

              {/* Floating glass cards - hidden on mobile */}
              <div className="pointer-events-none absolute inset-0 hidden md:block">
                {/* Top-right floating card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.85, 0.95, 0.85],
                    y: [0, -12, 0],
                    scale: 1,
                  }}
                  transition={{
                    opacity: { duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                    y: { duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                    scale: { duration: 0.6, delay: 0.5 },
                  }}
                  className="absolute -right-4 top-16 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl"
                >
                  <Wallet className="h-7 w-7 text-blue-500" strokeWidth={2} />
                </motion.div>

                {/* Left-middle floating card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0.9, 0.85, 0.9],
                    y: [0, -12, 0],
                    scale: 1,
                  }}
                  transition={{
                    opacity: { duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                    y: { duration: 3.5, repeat: Infinity, ease: [0.4, 0, 0.6, 1] },
                    scale: { duration: 0.6, delay: 0.7 },
                  }}
                  className="absolute -left-2 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl"
                >
                  <MapPin className="h-7 w-7 text-blue-500" strokeWidth={2} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
