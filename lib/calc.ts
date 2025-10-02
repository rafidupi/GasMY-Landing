export interface CalculatorInputs {
  kmPorLitro: number;
  precioBencina: number;
  kmsDiarios: number;
  diasMes: number;
  peajesMensuales: number;
  porcentajeAhorro: number;
}

export interface CalculatorResults {
  costoBencinaMensual: number;
  costoTotalMensual: number;
  ahorroEstimado: number;
  costoConGasMy: number;
  costoPorKm: number;
  costoPorViajeTipo: number;
}

export function calculateCosts(inputs: CalculatorInputs): CalculatorResults {
  const {
    kmPorLitro,
    precioBencina,
    kmsDiarios,
    diasMes,
    peajesMensuales,
    porcentajeAhorro,
  } = inputs;

  const costoBencinaMensual = (kmsDiarios * diasMes / kmPorLitro) * precioBencina;
  const costoTotalMensual = costoBencinaMensual + peajesMensuales;
  const ahorroEstimado = costoTotalMensual * (porcentajeAhorro / 100);
  const costoConGasMy = costoTotalMensual - ahorroEstimado;
  const costoPorKm = precioBencina / kmPorLitro;
  const costoPorViajeTipo = (10 / kmPorLitro) * precioBencina; // base 10 km

  return {
    costoBencinaMensual,
    costoTotalMensual,
    ahorroEstimado,
    costoConGasMy,
    costoPorKm,
    costoPorViajeTipo,
  };
}

export function formatCLP(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
