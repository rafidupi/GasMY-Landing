'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Button } from './Button';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface PricingProps {
  onBetaClick: () => void;
  onFlotaClick: () => void;
}

export function Pricing({ onBetaClick, onFlotaClick }: PricingProps) {
  const handlePricingView = () => {
    trackEvent.pricingView();
  };

  return (
    <Section id="pricing" className="bg-bg-main">
      <Container>
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Tenemos un plan para cada camino
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start" onClick={handlePricingView}>
            {/* Plan Free */}
            <Card className="p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
              <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                <h3 className="text-3xl font-bold text-text-strong">Plan Free</h3>
                <p className="text-text-mid">
                  Ideal para probar cómo gasmy. puede ayudarte a ahorrar.
                </p>
              </div>

              <ul className="space-y-3 flex-grow my-4">
                {[
                  '1 vehículo registrado',
                  'Hasta 3 registros de bencina/mes',
                  'Hasta 3 registros de TAG/mes',
                  'Tips semanales de ahorro',
                  'Funciones premium visibles pero bloqueadas (teaser de upgrade)',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-mid">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                onClick={onBetaClick}
                className="w-full mt-auto"
              >
                Empieza gratis
              </Button>
            </Card>

            {/* Plan Individual */}
            <Card className="p-8 flex flex-col h-full border-2 border-primary hover:shadow-lg transition-shadow">
              <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit -ml-3">
                  Más popular 💙
                </div>
                <h3 className="text-3xl font-bold text-text-strong">Plan Individual</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-strong">$890</span>
                  <span className="text-text-mid">CLP/mes</span>
                </div>
              </div>

              <ul className="space-y-3 flex-grow my-4">
                {[
                  'Registros ilimitados del gasto de combustible',
                  'Registros ilimitados de TAG y peajes',
                  'Gráficos completos sobre tus gastos acumulados',
                  'Planificador de rutas',
                  'Recordatorios de mantención por Kilometraje',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-mid text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                onClick={onBetaClick}
                className="w-full mt-auto"
              >
                Contratar ahora
              </Button>
            </Card>

            {/* Plan Pyme */}
            <Card className="p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
              <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                <h3 className="text-3xl font-bold text-text-strong">Plan Pyme</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-strong">$2.490</span>
                  <span className="text-text-mid">CLP/mes</span>
                </div>
                <p className="text-text-mid text-sm">Por vehículo</p>
              </div>

              <ul className="space-y-3 flex-grow my-4">
                {[
                  'Dashboard web multiusuario (dueño / conductor / contabilidad)',
                  'Reportes mensuales automáticos por correo (PDF y Excel)',
                  'Control por vehículo: TAG, bencina, rendimiento, alertas',
                  'Permisos de acceso por rol',
                  'Soporte vía WhatsApp empresarial',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-mid text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="primary"
                size="lg"
                onClick={onFlotaClick}
                className="w-full mt-auto"
              >
                Solicitar cotización
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
