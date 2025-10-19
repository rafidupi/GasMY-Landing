import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Fuel, FileBarChart, Map, Rocket } from 'lucide-react';

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

export function Features() {
  return (
    <Section id="diferenciadores" className="bg-bg-card">
      <Container>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Qué nos hace excepcionales
            </h2>
            <p className="text-lg text-text-mid max-w-2xl mx-auto">
              Tu auto te cuesta más de lo que crees. GasMy lo hace visible para que puedas optimizar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center space-y-4 hover:shadow-md transition-shadow">
                  <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-text-strong">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-mid">
                      {feature.description}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}
