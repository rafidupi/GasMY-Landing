'use client';

import { useState } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    question: '¿En qué ciudades funciona?',
    answer: 'Hoy en Santiago. Próximamente Paine y alrededores.',
  },
  {
    question: '¿Cómo cuidan mi privacidad/ubicación?',
    answer: 'Tus datos se usan solo para calcular y mostrar tus costos. No vendemos datos personales.',
  },
  {
    question: '¿Cuánta batería consume?',
    answer: 'Similar a apps de navegación.',
  },
  {
    question: '¿Por qué gasmy. si ya uso Waze/Maps?',
    answer: 'Ellos te guían; gasmy. te muestra el costo y tu historial.',
  },
  {
    question: '¿Detecta todos los pórticos?',
    answer: 'Soportamos pórticos TAG de autopistas urbanas de Santiago en beta.',
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
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border-subtle rounded-ios bg-bg-card overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-main transition-colors"
                >
                  <span className="font-semibold text-text-strong pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-text-mid flex-shrink-0 transition-transform',
                      openIndex === index && 'transform rotate-180'
                    )}
                  />
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-text-mid">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
