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
    icon: '/favicon.svg?v=2',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className="bg-bg-main text-text-strong antialiased">{children}</body>
    </html>
  );
}
