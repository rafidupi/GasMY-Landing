'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Car, Navigation, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: Car,
    title: 'Inicia tracking',
    description: 'Activa el autotracking con bluetooth.',
  },
  {
    icon: Navigation,
    title: 'Detectamos tus costos por viaje',
    description: 'Calculamos bencina + TAG.',
  },
  {
    icon: FileText,
    title: 'Reporte mensual',
    description: 'Entiende tus gastos y optimízalos.',
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-bg-main !pt-0 md:!pt-0">
      <Container className="max-w-6xl">
        <div className="grid min-h-[520px] place-items-center gap-10 text-center lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <motion.div
            className="space-y-6 max-w-xl"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h2
              className="text-3xl font-bold leading-tight text-text-strong md:text-4xl"
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
              ¿Cómo funciona gasmy?
            </motion.h2>
            <p className="text-lg text-text-mid md:text-xl">
              Tres pasos simples para tener control total de tus gastos. Te acompañamos desde que
              partes el motor hasta el resumen mensual.
            </p>
            <p className="text-sm text-text-light">
              Cada registro se hace en segundo plano, así puedes concentrarte en manejar mientras
              gasmy. lleva la cuenta completa.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Card className="w-full max-w-md bg-bg-card border-border-subtle shadow-lg shadow-slate-900/10">
              <div className="space-y-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center">
                        <Icon className="h-6 w-6 text-text-strong" />
                      </div>
                      <div className="space-y-1 text-left">
                        <p className="text-sm font-semibold text-text-mid">Paso {index + 1}</p>
                        <h3 className="text-lg font-semibold text-text-strong">{step.title}</h3>
                        <p className="text-sm text-text-mid">{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
