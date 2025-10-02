export interface BetaFormData {
  email: string;
  nombre?: string;
  tipoUsuario: string;
  comuna?: string;
}

export interface FlotaFormData {
  empresa: string;
  rut: string;
  correo: string;
  numeroVehiculos: number;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateBetaForm(data: BetaFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.email || !data.email.trim()) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(data.email)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!data.tipoUsuario || !data.tipoUsuario.trim()) {
    errors.push('Debes seleccionar un tipo de usuario');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function validateFlotaForm(data: FlotaFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.empresa || !data.empresa.trim()) {
    errors.push('El nombre de la empresa es requerido');
  }

  if (!data.rut || !data.rut.trim()) {
    errors.push('El RUT es requerido');
  }

  if (!data.correo || !data.correo.trim()) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(data.correo)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!data.numeroVehiculos || data.numeroVehiculos < 1) {
    errors.push('El número de vehículos debe ser mayor a 0');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
