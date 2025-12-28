'use client';

import { useState } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: '¿En qué ciudades funciona?',
    answer:
      'Actualmente la detección de TAG en Santiago, pero nos estamos expandiendo a alrededores. Y la función de bencina funciona en todo Chile.',
  },
  {
    question: '¿Cómo cuidan mi privacidad/ubicación?',
    answer:
      'Tus datos se usan solo para calcular y mostrar tus costos. Nunca compartiremos tu información con terceros.',
  },
  {
    question: '¿Cuánta batería consume?',
    answer: 'Similar a todas las apps de navegación, que ya utilizas diariamente.',
  },
  {
    question: '¿Por qué gasmy. si ya uso Waze/Maps?',
    answer:
      'Nosotros te decimos cuánto te cuesta. Somos tu copiloto financiero diseñado exclusivamente para gestionar tus gastos vehiculares, controlar el rendimiento y encontrar el ahorro que un GPS normal no te muestra.',
  },
  {
    question: '¿Detecta los horarios punta o de saturación?',
    answer:
      'Sí!, desarrollamos un algoritmo que detecta estos escenarios para detectar exactamente cuánto pagas en cada pórtico.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="bg-bg-card">
      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
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
              Preguntas frecuentes
            </motion.h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isActive = openIndex === index;
              const isInactive = openIndex !== null && !isActive;

              return (
                <motion.div
                  key={index}
                  animate={{
                    opacity: isInactive ? 0.85 : 1,
                  }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className="relative"
                >
                  {/* Focus glow effect */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="absolute inset-0 rounded-[24px] pointer-events-none"
                        style={{
                          boxShadow:
                            '0 0 0 1px rgba(0, 102, 255, 0.08), 0 0 24px rgba(0, 102, 255, 0.06), 0 0 48px rgba(0, 102, 255, 0.04)',
                        }}
                      />
                    )}
                  </AnimatePresence>

                  <div className="border border-border-subtle rounded-ios bg-bg-card overflow-hidden relative">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left transition-colors duration-200"
                    >
                      <span className="font-semibold text-text-strong pr-4">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                      >
                        <ChevronDown className="w-5 h-5 text-text-mid flex-shrink-0" />
                      </motion.div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.28, ease: 'easeOut', delay: 0.05 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                              opacity: { duration: 0.2, ease: 'easeOut' },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <motion.div
                            initial={{ y: -8 }}
                            animate={{
                              y: 0,
                              transition: { duration: 0.28, ease: 'easeOut', delay: 0.1 },
                            }}
                            exit={{
                              y: -6,
                              transition: { duration: 0.2, ease: 'easeOut' },
                            }}
                          >
                            <div className="px-6 pb-4 text-text-mid">{faq.answer}</div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
