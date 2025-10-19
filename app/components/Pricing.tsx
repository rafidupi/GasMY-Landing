'use client';

import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Button } from './Button';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { useState } from 'react';

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
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Planes simples y transparentes
            </h2>
            <p className="text-lg text-text-mid">
              Menos que un café ☕. $790 CLP/mes. 7 días gratis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" onClick={handlePricingView}>
            {/* Persona Plan */}
            <Card className="p-8 space-y-6 hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  Freemium
                </div>
                <h3 className="text-2xl font-bold text-text-strong">Persona</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-strong">$790</span>
                  <span className="text-text-mid">CLP/mes</span>
                </div>
                <p className="text-sm text-success font-medium">✓ 7 días gratis</p>
              </div>

              <ul className="space-y-3">
                {[
                  'Tracking automático',
                  'Historial mensual completo',
                  'Calculadora de costos',
                  '1 vehículo incluido',
                  'Reportes por viaje y mes',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-mid">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="primary" size="lg" onClick={onBetaClick} className="w-full">
                Únete a la beta
              </Button>
            </Card>

            {/* Flotas Plan */}
            <Card className="p-8 space-y-6 border-2 border-primary hover:shadow-lg transition-shadow">
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                  B2B
                </div>
                <h3 className="text-2xl font-bold text-text-strong">Flotas</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-text-strong">A cotizar</span>
                </div>
                <p className="text-sm text-text-mid">Perfecto para empresas y PyMEs</p>
              </div>

              <ul className="space-y-3">
                {[
                  'Todo lo de Persona',
                  'Múltiples vehículos',
                  'Dashboard para flotas',
                  'Reportes por vehículo y conductor',
                  'API para integración',
                  'Soporte prioritario',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-text-mid">{item}</span>
                  </li>
                ))}
              </ul>

              <Button variant="outline" size="lg" onClick={onFlotaClick} className="w-full">
                Cotiza ahora
              </Button>
            </Card>
          </div>
        </div>
      </Container>
    </Section>
  );
}
