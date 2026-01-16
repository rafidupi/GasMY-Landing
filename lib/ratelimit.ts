/**
 * Rate Limiter simple usando memoria
 * Limita el número de requests por IP en un período de tiempo
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Almacenar en memoria (se reinicia con cada deploy, pero suficiente para protección básica)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Limpiar entradas viejas cada 5 minutos
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitConfig {
  /**
   * Número máximo de requests permitidos
   * @default 3
   */
  limit?: number;
  
  /**
   * Ventana de tiempo en segundos
   * @default 60 (1 minuto)
   */
  window?: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Verifica si un identificador (IP) ha excedido el límite de rate
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {}
): RateLimitResult {
  const limit = config.limit ?? 3;
  const windowMs = (config.window ?? 60) * 1000; // Convertir a ms
  
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  // Si no existe o ya expiró, crear nueva entrada
  if (!entry || entry.resetTime < now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: now + windowMs,
    };
  }

  // Si aún está dentro de la ventana
  if (entry.count < limit) {
    entry.count++;
    
    return {
      success: true,
      limit,
      remaining: limit - entry.count,
      reset: entry.resetTime,
    };
  }

  // Límite excedido
  return {
    success: false,
    limit,
    remaining: 0,
    reset: entry.resetTime,
  };
}

/**
 * Obtener IP del request
 */
export function getClientIP(request: Request): string {
  // Vercel usa x-forwarded-for
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  // Fallback
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  // Último fallback
  return 'unknown';
}
