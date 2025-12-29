'use client';

import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { Container } from './Container';
import { Button } from './Button';
import { Section } from './Section';

export function BetaDownload() {
  const isAndroid = typeof navigator !== 'undefined' && /android/i.test(navigator.userAgent);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 80,
        duration: 0.9,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: 0.6,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Section className="bg-white">
      <Container>
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div variants={titleVariants}>
            <motion.h2
              className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl leading-tight"
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
              Descarga la beta
            </motion.h2>
            <motion.p
              className="mt-4 text-lg text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Sigue estos pasos para instalar gasmy. en tu teléfono
            </motion.p>
          </motion.div>

          <div className="mt-12 grid gap-8 md:grid-cols-2" style={{ perspective: '1000px' }}>
            {/* Android Card */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                  variants={iconVariants}
                >
                  <motion.svg
                    className="h-8 w-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                  >
                    <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85a.637.637 0 00-.83.22l-1.88 3.24a11.43 11.43 0 00-8.94 0L5.65 5.67a.643.643 0 00-.87-.2c-.28.18-.37.54-.22.83L6.4 9.48A10.81 10.81 0 001 18h22a10.81 10.81 0 00-5.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
                  </motion.svg>
                </motion.div>
                <motion.h3
                  className="mt-4 text-xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Android
                </motion.h3>
                <motion.p
                  className="mt-2 text-sm text-gray-600"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Descarga directa del APK
                </motion.p>
              </div>

              <div className="flex-grow space-y-4 text-left">
                {[ 
                  'Haz clic en el botón "Descargar para Android"',
                  'Permite la instalación de fuentes desconocidas cuando se solicite',
                  'Instala el archivo APK descargado',
                  '¡Abre gasmy. y comienza a usar!',
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3"
                    custom={i}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <span className="shrink-0 text-sm font-semibold text-gray-900">{i + 1}</span>
                    <p className="text-sm text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a href="https://drive.google.com/file/d/1KJY98csMRdBAfRU7zYrV3qMgifauD6x-/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                  <Button variant="dark" size="lg" className="mt-8 w-full">
                    Descargar para Android
                  </Button>
                </a>
              </motion.div>
            </motion.div>

            {/* iOS Card */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
              whileHover={{
                y: -8,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                transition: { duration: 0.3 },
              }}
            >
              <div className="mb-6">
                <motion.div
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100"
                  variants={iconVariants}
                >
                  <motion.svg
                    className="h-8 w-8 text-gray-700"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </motion.svg>
                </motion.div>
                <motion.h3
                  className="mt-4 text-xl font-bold text-gray-900"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  iPhone
                </motion.h3>
                <motion.div
                  className="group relative mt-2 inline-block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <p className="inline text-sm text-gray-600">
                    Instalación vía TestFlight
                    <span className="ml-1 inline-flex cursor-help text-gray-500 transition-colors hover:text-gray-700">
                      <Info className="h-3.5 w-3.5" strokeWidth={2} />
                    </span>
                  </p>
                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-24 left-1/2 z-50 w-60 -translate-x-1/2 scale-95 rounded-lg border border-white/20 bg-white/95 p-3 opacity-0 shadow-lg backdrop-blur-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100">
                    <p className="mb-1 text-xs font-semibold text-gray-900">¿Qué es TestFlight?</p>
                    <p className="text-xs text-gray-700">
                      TestFlight es la app oficial de Apple para probar versiones beta.
                    </p>
                    <a
                      href="https://apps.apple.com/app/testflight/id899247664"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto mt-2 inline-block text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      Descarga TestFlight en App Store →
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="flex-grow space-y-4 text-left">
                {[
                  'Instala TestFlight desde la App Store',
                  'Haz clic en "Descargar para IOS" para recibir el link de invitación',
                  'Abre el link en tu iPhone desde TestFlight',
                  '¡Abre gasmy. y comienza a usarla!',
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3"
                    custom={i}
                    variants={stepVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <span className="shrink-0 text-sm font-semibold text-gray-900">{i + 1}</span>
                    <p className="text-sm text-gray-700">{step}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={buttonVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <a href="https://testflight.apple.com/join/ptExUGaU" target="_blank" rel="noopener noreferrer">
                  <Button variant="dark" size="lg" className="mt-8 w-full">
                    Descargar para IOS
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-sm text-gray-500"
          >
            ¿Necesitas ayuda con la instalación? Escríbenos a nuestra{' '}
            <a
              href="https://chat.whatsapp.com/ICS0lvDbm47CV5BiRMPfY8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700"
            >
              comunidad de WhatsApp
            </a>{' '}
            o a{' '}
            <a
              href="mailto:support@gasmy.org"
              className="text-blue-600 underline hover:text-blue-700"
            >
              support@gasmy.org
            </a>
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}


