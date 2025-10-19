import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GasMy — Ahorra mientras conduces en Santiago',
  description:
    'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes. Freemium con 7 días gratis.',
  openGraph: {
    title: 'GasMy — Ahorra mientras conduces en Santiago',
    description:
      'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes. Freemium con 7 días gratis.',
    url: 'https://gasmy.org',
    siteName: 'GasMy',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GasMy - Tu gasto en auto, ordenado y optimizado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GasMy — Ahorra mientras conduces en Santiago',
    description:
      'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes. Freemium con 7 días gratis.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body>
        {/* Gradient Spotlight Effect - TEST VISIBLE */}
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
            background: '#f8f9fa',
            pointerEvents: 'none'
          }}
        >
          {/* Spotlight SUPER VISIBLE para test */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              right: '5%',
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(0, 102, 255, 0.9) 0%, rgba(0, 68, 255, 0.7) 25%, rgba(0, 51, 204, 0.5) 50%, transparent 80%)',
              filter: 'blur(100px)',
            }}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
