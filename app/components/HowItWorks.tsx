import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Car, Navigation, FileText } from 'lucide-react';

const steps = [
  {
    icon: Car,
    title: 'Inicia tracking',
    description: 'Activa el autotracking con bluetooth',
  },
  {
    icon: Navigation,
    title: 'Detectamos tus TAGs',
    description: 'Calculamos costo por viaje (bencina + pórticos).',
  },
  {
    icon: FileText,
    title: 'Reporte mensual',
    description: 'Entiende tus gastos y optimízalos.',
  },
];

export function HowItWorks() {
  return (
    <Section id="como-funciona" className="bg-bg-main">
      <Container className="max-w-6xl">
        <div className="grid min-h-[520px] place-items-center gap-10 text-center lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="space-y-6 max-w-xl">
            <p className="inline-flex rounded-full border border-border-subtle px-4 py-1 text-sm uppercase tracking-wide text-text-mid">
              Paso a paso
            </p>
            <h2 className="text-3xl font-bold leading-tight text-text-strong md:text-4xl">
              Cómo funciona gasmy.
            </h2>
            <p className="text-lg text-text-mid md:text-xl">
              Tres pasos simples para tener control total de tus gastos. Te acompañamos desde que partes el motor hasta el resumen mensual.
            </p>
            <p className="text-sm text-text-light">
              Cada registro se hace en segundo plano, así puedes concentrarte en manejar mientras gasmy. lleva la cuenta completa.
            </p>
          </div>

          <Card className="w-full max-w-md bg-bg-card border-border-subtle shadow-lg shadow-slate-900/10">
            <div className="space-y-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1 text-left">
                      <p className="text-sm font-semibold text-primary">Paso {index + 1}</p>
                      <h3 className="text-lg font-semibold text-text-strong">{step.title}</h3>
                      <p className="text-sm text-text-mid">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </Container>
    </Section>
  );
}