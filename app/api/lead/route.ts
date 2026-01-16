import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIP } from '@/lib/ratelimit';

// CORS - Dominios permitidos
const ALLOWED_ORIGINS = [
  'https://gasmy.org',
  'https://www.gasmy.org',
  'http://localhost:3000', // Para desarrollo local
];

// Headers de seguridad CORS
function corsHeaders(origin: string | null) {
  // Si el origin está en la lista permitida, permitir
  const allowedOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400', // 24 horas
  };
}

// Manejar preflight requests (OPTIONS)
export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin');
  return NextResponse.json({}, { 
    status: 200,
    headers: corsHeaders(origin),
  });
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  
  // 1. Verificar que el origin sea permitido (CORS)
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return NextResponse.json(
      { success: false, message: 'Origin not allowed' },
      { status: 403, headers: corsHeaders(origin) }
    );
  }

  // 2. Rate limiting - Limitar a 3 envíos por minuto por IP
  const clientIP = getClientIP(request);
  const rateLimitResult = checkRateLimit(clientIP, {
    limit: 3,
    window: 60, // 1 minuto
  });

  if (!rateLimitResult.success) {
    const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Demasiados intentos. Por favor, espera un momento.',
        retryAfter,
      },
      { 
        status: 429, // Too Many Requests
        headers: {
          ...corsHeaders(origin),
          'Retry-After': retryAfter.toString(),
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  }

  try {
    const body = await request.json();

    // Log to console (in development)
    console.log('📨 New lead received:', {
      type: body.type,
      timestamp: new Date().toISOString(),
      data: body,
    });

    // Google Sheets webhook - Always send data here
    const googleSheetsWebhook =
      'https://script.google.com/macros/s/AKfycbzTxhcvTOc1A45y8GkqNefhhCUgrBZbB6BIuuRqgJsvSxJfwzusTZZ8bifMQb6r2WZNxQ/exec';

    try {
      const response = await fetch(googleSheetsWebhook, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error('Failed to save to Google Sheets:', response.statusText);
      } else {
        console.log('✅ Lead saved to Google Sheets successfully');
      }
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
    }

    // Optional: If NEXT_PUBLIC_FORM_ENDPOINT is configured, forward there too
    const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

    if (formEndpoint) {
      try {
        const response = await fetch(formEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          console.error('Failed to forward to external endpoint:', response.statusText);
        } else {
          console.log('✅ Lead forwarded to external endpoint successfully');
        }
      } catch (error) {
        console.error('Error forwarding to external endpoint:', error);
      }
    }

    // Send confirmation email for beta registrations
    if (body.type === 'beta' && (body.email || body.correo)) {
      try {
        const emailResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/send-email`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: body.email || body.correo,
              nombre: body.nombre,
            }),
          }
        );

        if (!emailResponse.ok) {
          console.error('Failed to send confirmation email:', emailResponse.statusText);
        } else {
          console.log('✅ Confirmation email sent successfully');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
      }
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Lead received successfully',
      },
      { 
        status: 200,
        headers: {
          ...corsHeaders(origin),
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error processing lead',
      },
      { 
        status: 500,
        headers: corsHeaders(origin),
      }
    );
  }
}
