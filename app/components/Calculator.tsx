'use client';

import { useState } from 'react';
import { Container } from './Container';
import { Section } from './Section';
import { Card } from './Card';
import { Input } from './Input';
import { Button } from './Button';
import { calculateCosts, formatCLP, type CalculatorInputs } from '@/lib/calc';
import { trackEvent } from '@/lib/analytics';

interface CalculatorProps {
  onResultEmail: () => void;
}

export function Calculator({ onResultEmail }: CalculatorProps) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    kmPorLitro: 12,
    precioBencina: 1100,
    kmsDiarios: 30,
    diasMes: 22,
    peajesMensuales: 0,
    porcentajeAhorro: 5,
  });

  const [calculated, setCalculated] = useState(false);

  const results = calculateCosts(inputs);

  const handleInputChange = (field: keyof CalculatorInputs, value: string) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0,
    }));
    setCalculated(false);
  };

  const handleCalculate = () => {
    setCalculated(true);
    trackEvent.calcSubmitted({
      kmPorLitro: inputs.kmPorLitro,
      precioBencina: inputs.precioBencina,
      costoEstimado: results.costoTotalMensual,
    });
  };

  const handleEmailResults = () => {
    onResultEmail();
  };

  return (
    <Section id="calculadora" className="bg-bg-card">
      <Container>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-strong">
              Calcula tu ahorro potencial
            </h2>
            <p className="text-lg text-text-mid">
              Descubre cuánto gastas realmente en tu auto cada mes
            </p>
          </div>

          <Card className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Km por litro */}
              <Input
                type="number"
                label="Km por litro"
                placeholder="Ej: 12"
                value={inputs.kmPorLitro}
                onChange={(e) => handleInputChange('kmPorLitro', e.target.value)}
                min="1"
                step="0.1"
              />

              {/* Precio bencina */}
              <Input
                type="number"
                label="Precio bencina (CLP/litro)"
                placeholder="Ej: 1100"
                value={inputs.precioBencina}
                onChange={(e) => handleInputChange('precioBencina', e.target.value)}
                min="1"
                step="10"
              />

              {/* Km diarios */}
              <Input
                type="number"
                label="Kilómetros diarios"
                placeholder="Ej: 30"
                value={inputs.kmsDiarios}
                onChange={(e) => handleInputChange('kmsDiarios', e.target.value)}
                min="1"
              />

              {/* Días al mes */}
              <Input
                type="number"
                label="Días al mes que usas el auto"
                placeholder="Ej: 22"
                value={inputs.diasMes}
                onChange={(e) => handleInputChange('diasMes', e.target.value)}
                min="1"
                max="31"
              />

              {/* Peajes mensuales */}
              <Input
                type="number"
                label="Peajes mensuales (CLP, opcional)"
                placeholder="Ej: 25000"
                value={inputs.peajesMensuales}
                onChange={(e) => handleInputChange('peajesMensuales', e.target.value)}
                min="0"
                step="100"
              />

              {/* Porcentaje ahorro */}
              <div>
                <label className="block text-sm font-medium text-text-strong mb-2">
                  Ahorro potencial (%): {inputs.porcentajeAhorro}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={inputs.porcentajeAhorro}
                  onChange={(e) => handleInputChange('porcentajeAhorro', e.target.value)}
                  className="w-full h-2 bg-border-subtle rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-text-light mt-1">
                  <span>0%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleCalculate}
              className="w-full mb-6"
            >
              Calcular
            </Button>

            {calculated && (
              <div className="space-y-4 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Costo total mensual */}
                  <div className="bg-bg-main rounded-ios p-5">
                    <p className="text-sm text-text-mid mb-1">Tu costo mensual estimado</p>
                    <p className="text-3xl font-bold text-text-strong">
                      {formatCLP(results.costoTotalMensual)}
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      Bencina: {formatCLP(results.costoBencinaMensual)}
                    </p>
                  </div>

                  {/* Con GasMy */}
                  <div className="bg-gradient-to-br from-grad-start to-grad-end rounded-ios p-5 text-white">
                    <p className="text-sm text-white/80 mb-1">Con GasMy</p>
                    <p className="text-3xl font-bold">
                      {formatCLP(results.costoConGasMy)}
                    </p>
                    <p className="text-xs text-white/70 mt-1">
                      Ahorro: {formatCLP(results.ahorroEstimado)}
                    </p>
                  </div>

                  {/* Costo por km */}
                  <div className="bg-bg-main rounded-ios p-5">
                    <p className="text-sm text-text-mid mb-1">Costo por kilómetro</p>
                    <p className="text-2xl font-bold text-text-strong">
                      {formatCLP(results.costoPorKm)}
                    </p>
                  </div>

                  {/* Costo por viaje tipo */}
                  <div className="bg-bg-main rounded-ios p-5">
                    <p className="text-sm text-text-mid mb-1">Costo por viaje (10 km)</p>
                    <p className="text-2xl font-bold text-text-strong">
                      {formatCLP(results.costoPorViajeTipo)}
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-ios p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Disclaimer:</strong> Cálculo referencial. GasMy no promete un % fijo de ahorro; te ayuda a medir y optimizar tus gastos.
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleEmailResults}
                  className="w-full"
                >
                  Recibir resultado por correo
                </Button>
              </div>
            )}
          </Card>
        </div>
      </Container>
    </Section>
  );
}
