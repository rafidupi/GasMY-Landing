import validator from 'validator';
import DOMPurify from 'isomorphic-dompurify';

export interface BetaFormData {
  email: string;
  nombre: string;
  tipoUsuario: string;
  comuna: string;
  sistemaOperativo?: string;
}

export interface FlotaFormData {
  empresa: string;
  rut: string;
  correo: string;
  numeroVehiculos: number;
}

// Sanitizar input de texto - elimina HTML, scripts y código malicioso
export function sanitizeInput(input: string): string {
  if (!input) return '';
  // Limpiar HTML/scripts maliciosos
  const cleaned = DOMPurify.sanitize(input, { 
    ALLOWED_TAGS: [], // No permitir ningún tag HTML
    ALLOWED_ATTR: [] // No permitir atributos
  });
  // Eliminar espacios extras y trim
  return cleaned.trim();
}

// Sanitizar email
export function sanitizeEmail(email: string): string {
  if (!email) return '';
  return validator.normalizeEmail(email) || '';
}

// Validar y sanitizar RUT chileno
export function sanitizeRut(rut: string): string {
  if (!rut) return '';
  // Remover todo excepto números, K y guión
  return rut.replace(/[^0-9kK\-]/g, '').toUpperCase();
}

export function validateEmail(email: string): boolean {
  return validator.isEmail(email);
}

export function validateBetaForm(data: BetaFormData): { valid: boolean; errors: string[]; sanitized: BetaFormData } {
  const errors: string[] = [];

  // Sanitizar todos los inputs
  const sanitized: BetaFormData = {
    email: sanitizeEmail(data.email),
    nombre: sanitizeInput(data.nombre),
    tipoUsuario: sanitizeInput(data.tipoUsuario),
    comuna: sanitizeInput(data.comuna),
    sistemaOperativo: data.sistemaOperativo ? sanitizeInput(data.sistemaOperativo) : undefined,
  };

  // Validaciones
  if (!sanitized.email) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(sanitized.email)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!sanitized.nombre) {
    errors.push('El nombre es requerido');
  } else if (sanitized.nombre.length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  } else if (sanitized.nombre.length > 100) {
    errors.push('El nombre es demasiado largo');
  }

  if (!sanitized.tipoUsuario) {
    errors.push('Debes seleccionar un tipo de usuario');
  }

  if (!sanitized.comuna) {
    errors.push('Debes seleccionar una comuna');
  }

  if (!sanitized.sistemaOperativo) {
    errors.push('Debes seleccionar un sistema operativo');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized,
  };
}

export function validateFlotaForm(data: FlotaFormData): { valid: boolean; errors: string[]; sanitized: FlotaFormData } {
  const errors: string[] = [];

  // Sanitizar todos los inputs
  const sanitized: FlotaFormData = {
    empresa: sanitizeInput(data.empresa),
    rut: sanitizeRut(data.rut),
    correo: sanitizeEmail(data.correo),
    numeroVehiculos: Number(data.numeroVehiculos) || 0,
  };

  // Validaciones
  if (!sanitized.empresa) {
    errors.push('El nombre de la empresa es requerido');
  } else if (sanitized.empresa.length < 2) {
    errors.push('El nombre de la empresa debe tener al menos 2 caracteres');
  } else if (sanitized.empresa.length > 200) {
    errors.push('El nombre de la empresa es demasiado largo');
  }

  if (!sanitized.rut) {
    errors.push('El RUT es requerido');
  } else if (sanitized.rut.length < 8 || sanitized.rut.length > 12) {
    errors.push('El RUT no tiene un formato válido');
  }

  if (!sanitized.correo) {
    errors.push('El correo electrónico es requerido');
  } else if (!validateEmail(sanitized.correo)) {
    errors.push('El correo electrónico no es válido');
  }

  if (!sanitized.numeroVehiculos || sanitized.numeroVehiculos < 1) {
    errors.push('El número de vehículos debe ser mayor a 0');
  } else if (sanitized.numeroVehiculos > 10000) {
    errors.push('El número de vehículos es demasiado alto');
  }

  return {
    valid: errors.length === 0,
    errors,
    sanitized,
  };
}
