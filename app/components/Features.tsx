'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Fuel, FileBarChart, Map, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Fuel,
    title: 'Registro automático',
    description: 'Tus peajes y bencina, en un solo lugar.',
  },
  {
    icon: FileBarChart,
    title: 'Reportes mensuales claros',
    description: 'Por viaje y por mes, sin Excel.',
  },
  {
    icon: Map,
    title: 'No somos Waze/Maps',
    description: 'Ellos te llevan; nosotros medimos y ordenamos tus gastos.',
  },
  {
    icon: Rocket,
    title: 'Próximamente',
    description: 'Alertas de costo y rutas más baratas.',
  },
];

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
      duration: 0.8,
    },
  },
};

const iconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
      delay: 0.2,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.3,
    },
  },
};

export function Features() {
  return (
    <Section id="diferenciadores" className="bg-bg-card">
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
              Qué nos hace excepcionales
            </motion.h2>
            <motion.p
              className="text-lg text-text-mid max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Tu auto te cuesta más de lo que crees. gasmy. lo hace visible para que puedas
              optimizar.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            style={{ perspective: '1200px' }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="rounded-ios-lg overflow-hidden"
                  whileHover={{
                    y: -12,
                    scale: 1.05,
                    boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
                    transition: { duration: 0.3 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card className="text-center space-y-4 h-full">
                    <motion.div
                      className="mx-auto w-14 h-14 flex items-center justify-center"
                      variants={iconVariants}
                    >
                      <motion.div
                        whileHover={{
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6, ease: 'easeInOut' },
                        }}
                      >
                        <Icon className="w-7 h-7 text-text-strong" />
                      </motion.div>
                    </motion.div>
                    <motion.div className="space-y-2" variants={textVariants}>
                      <h3 className="text-lg font-semibold text-text-strong">{feature.title}</h3>
                      <p className="text-sm text-text-mid">{feature.description}</p>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
