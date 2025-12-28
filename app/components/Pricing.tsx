'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Button } from './Button';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { motion } from 'framer-motion';

interface PricingProps {
  onBetaClick: () => void;
  onFlotaClick: () => void;
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.85,
    rotateY: -25,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      damping: 18,
      stiffness: 90,
      duration: 1,
    },
  },
};

const featuredCardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotateY: 0,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 80,
      duration: 1.2,
    },
  },
};

const badgeVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 200,
      delay: 0.5,
    },
  },
};

const priceVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.4 + i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export function Pricing({ onBetaClick, onFlotaClick }: PricingProps) {
  const handlePricingView = () => {
    trackEvent.pricingView();
  };

  return (
    <Section id="pricing" className="bg-bg-main">
      <Container>
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-text-strong"
              initial={{ backgroundPosition: '0% 50%' }}
              whileInView={{ backgroundPosition: '100% 50%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: 'linear' }}
              style={{
                backgroundImage: 'linear-gradient(90deg, #0066ff, #0052cc, #0066ff)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                paddingBottom: '0.25rem',
              }}
            >
              Tenemos un plan para cada camino
            </motion.h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 items-stretch"
            onClick={handlePricingView}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            style={{ perspective: '2000px' }}
          >
            {/* Plan Free */}
            <motion.div
              variants={cardVariants}
              className="rounded-ios-lg overflow-hidden"
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: 5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-8 flex flex-col h-full">
                <motion.div
                  className="space-y-3 min-h-[80px] flex flex-col justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold text-text-strong">Plan Free</h3>
                  <p className="text-text-mid">
                    Ideal para probar cómo gasmy. puede ayudarte a ahorrar.
                  </p>
                </motion.div>

                <motion.ul
                  className="space-y-3 flex-grow my-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    '1 vehículo registrado',
                    'Hasta 3 registros de bencina/mes',
                    'Hasta 3 registros de TAG/mes',
                    'Tips semanales de ahorro',
                    'Funciones premium visibles pero bloqueadas (teaser de upgrade)',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      custom={index}
                      variants={listItemVariants}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.08, type: 'spring', damping: 12 }}
                      >
                        <Check className="w-5 h-5 text-text-strong flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-text-mid">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Button variant="dark" size="lg" onClick={onBetaClick} className="w-full mt-auto">
                    Empieza gratis
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Plan Individual */}
            <motion.div
              variants={featuredCardVariants}
              className="rounded-ios-lg overflow-hidden"
              whileHover={{
                y: -20,
                scale: 1.05,
                rotateY: 0,
                boxShadow: '0 30px 60px -15px rgba(0, 102, 255, 0.3)',
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-8 flex flex-col h-full border-2 border-primary">
                <motion.div
                  className="space-y-3 min-h-[80px] flex flex-col justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <motion.div
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit -ml-3"
                    variants={badgeVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    Más popular 💙
                  </motion.div>
                  <h3 className="text-3xl font-bold text-text-strong">Plan Individual</h3>
                  <motion.div
                    className="flex items-baseline gap-2"
                    variants={priceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <span className="text-4xl font-bold text-text-strong">$890</span>
                    <span className="text-text-mid">CLP/mes</span>
                  </motion.div>
                </motion.div>

                <motion.ul
                  className="space-y-3 flex-grow my-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    'Registros ilimitados del gasto de combustible',
                    'Registros ilimitados de TAG y peajes',
                    'Gráficos completos sobre tus gastos acumulados',
                    'Planificador de rutas',
                    'Recordatorios de mantención por Kilometraje',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      custom={index}
                      variants={listItemVariants}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.08, type: 'spring', damping: 12 }}
                      >
                        <Check className="w-5 h-5 text-text-strong flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-text-mid text-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Button variant="dark" size="lg" onClick={onBetaClick} className="w-full mt-auto">
                    Contratar ahora
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Plan Pyme */}
            <motion.div
              variants={cardVariants}
              className="rounded-ios-lg overflow-hidden"
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: -5,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { duration: 0.4 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="p-8 flex flex-col h-full">
                <motion.div
                  className="space-y-3 min-h-[80px] flex flex-col justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-3xl font-bold text-text-strong">Plan Pyme</h3>
                  <motion.div
                    className="flex items-baseline gap-2"
                    variants={priceVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <span className="text-4xl font-bold text-text-strong">$2.490</span>
                    <span className="text-text-mid">CLP/mes</span>
                  </motion.div>
                  <p className="text-text-mid text-sm">Por vehículo</p>
                </motion.div>

                <motion.ul
                  className="space-y-3 flex-grow my-4"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {[
                    'Dashboard web multiusuario (dueño / conductor / contabilidad)',
                    'Reportes mensuales automáticos por correo (PDF y Excel)',
                    'Control por vehículo: TAG, bencina, rendimiento, alertas',
                    'Permisos de acceso por rol',
                    'Soporte vía WhatsApp empresarial',
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start gap-3"
                      custom={index}
                      variants={listItemVariants}
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.08, type: 'spring', damping: 12 }}
                      >
                        <Check className="w-5 h-5 text-text-strong flex-shrink-0 mt-0.5" />
                      </motion.div>
                      <span className="text-text-mid text-sm">{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  variants={buttonVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Button
                    variant="dark"
                    size="lg"
                    onClick={onFlotaClick}
                    className="w-full mt-auto"
                  >
                    Solicitar cotización
                  </Button>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
