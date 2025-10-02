import { Container } from './Container';
import { Section } from './Section';
import { CheckCircle2 } from 'lucide-react';

const roadmapItems = [
  'Precios bencina automáticos (Waze API)',
  'Alertas de pórticos y costo por tramo',
  'Rutas más baratas',
  'Modo flota (múltiples vehículos y reportes)',
];

export function Roadmap() {
  return (
    <Section className="bg-bg-main">
      <Container>
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Roadmap
            </h2>
            <p className="text-lg text-text-mid">
              Estamos construyendo alertas de costo por pórtico y precios de bencina automáticos.
            </p>
          </div>

          <div className="space-y-4">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-bg-card border border-border-subtle rounded-ios p-4 hover:border-primary transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                <span className="text-lg text-text-strong">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
