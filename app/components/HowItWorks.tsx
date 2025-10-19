import { Container } from './Container';
import { Section } from './Section';
import { Car, Navigation, FileText } from 'lucide-react';

const steps = [
  {
    icon: Car,
    title: 'Inicia tracking',
    description: 'Activa GasMy antes de conducir.',
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
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">Cómo funciona</h2>
            <p className="text-lg text-text-mid">
              Tres pasos simples para tener control total de tus gastos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-text-strong">{step.title}</h3>
                    <p className="text-text-mid">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
