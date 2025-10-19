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
    <>
      {/* SECCIÓN 1: CONDUCTORES PARTICULARES */}
      <Section id="pricing-individuals" className="bg-bg-main">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
                Tenemos un plan para cada camino
              </h2>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-text-strong">
                Soy conductor particular
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start" onClick={handlePricingView}>
              {/* Plan Free */}
              <Card className="p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                  <h3 className="text-3xl font-bold text-text-strong">Plan Free</h3>
                  <p className="text-text-mid">
                    Ideal para probar cómo GasMy puede ayudarte a ahorrar.
                  </p>
                </div>

                <ul className="space-y-3 flex-grow my-6">
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

                <Button variant="primary" size="lg" onClick={onBetaClick} className="w-full mt-auto">
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
                    <span className="text-4xl font-bold text-text-strong">$790</span>
                    <span className="text-text-mid">CLP/mes</span>
                  </div>
                  <p className="text-text-mid">
                    Para quienes quieren el control total de su gasto en bencina y TAG.
                  </p>
                </div>

                <ul className="space-y-3 flex-grow my-6">
                  {[
                    'Incluye todo lo del Free, y además:',
                    'Registros de gasto de combustible ilimitados',
                    'Registro completo de TAG y peajes',
                    'Gráficos avanzados (rendimiento por mes, gasto acumulado, etc.)',
                    'Alertas inteligentes: gasto inusual, exceso TAG, baja eficiencia',
                    'Historial completo sin límite',
                    'Recomendaciones personalizadas de ahorro',
                    'Recordatorios de mantención y kilometraje',
                    'Descuentos en talleres mecánicos',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-mid text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="lg" onClick={onBetaClick} className="w-full mt-auto">
                  Contratar ahora
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* SECCIÓN 2: EMPRESAS Y FLOTAS */}
      <Section id="pricing-enterprise" className="bg-bg-main">
        <Container>
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-text-strong">
                Soy empresa o flota
              </h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start" onClick={handlePricingView}>
              {/* Plan Pyme */}
              <Card className="p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
                <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                  <h3 className="text-3xl font-bold text-text-strong">Plan Pyme</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-text-mid">desde</span>
                    <span className="text-4xl font-bold text-text-strong">$5.990</span>
                    <span className="text-text-mid">CLP/mes</span>
                  </div>
                  <p className="text-text-mid">
                    Ideal para flotas pequeñas. Simple, eficiente y accesible.
                  </p>
                  <p className="text-sm text-text-mid font-medium">Incluye todo lo del Individual, más:</p>
                </div>

                <ul className="space-y-3 flex-grow my-6">
                  {[
                    'Hasta 10 vehículos registrados',
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

                <Button variant="primary" size="lg" onClick={onFlotaClick} className="w-full mt-auto">
                  Solicitar cotización
                </Button>
              </Card>

              {/* Plan Empresa */}
              <Card className="p-8 flex flex-col h-full border-2 border-primary hover:shadow-lg transition-shadow">
                <div className="space-y-3 min-h-[80px] flex flex-col justify-start">
                  <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium w-fit -ml-3">
                    Más completo
                  </div>
                  <h3 className="text-3xl font-bold text-text-strong">Plan Empresa</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-semibold text-text-mid">desde</span>
                    <span className="text-4xl font-bold text-text-strong">$10.990</span>
                    <span className="text-text-mid">CLP/mes</span>
                  </div>
                  <p className="text-text-mid">
                    Para flotas medianas y grandes que necesitan control, eficiencia y analítica avanzada.
                  </p>
                  <p className="text-sm text-text-mid font-medium">Incluye todo lo del Pyme, más:</p>
                </div>

                <ul className="space-y-3 flex-grow my-6">
                  {[
                    'Vehículos ilimitados',
                    'Dashboard avanzado con analítica (consumo por ruta, eficiencia por conductor)',
                    'Control de TAG por grupo, centro de costo o proyecto',
                    'Integración con ERP o Google Sheets',
                    'Usuarios ilimitados con permisos personalizados',
                    'Reportes por área / proyecto / mes',
                    'API para integración con sistemas internos',
                    'Ejecutivo de cuentas dedicado',
                    'Acceso prioritario a nuevas funciones (beta testers empresariales)',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-text-mid text-sm">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button variant="primary" size="lg" onClick={onFlotaClick} className="w-full mt-auto">
                  Solicitar cotización
                </Button>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
