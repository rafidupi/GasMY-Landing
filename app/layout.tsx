import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'gasmy. — Ahorra mientras conduces en Santiago',
  description: 'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes.',
  openGraph: {
    title: 'gasmy. — Ahorra mientras conduces en Santiago',
    description: 'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes.',
    url: 'https://gasmy.org',
    siteName: 'gasmy.',
    locale: 'es_CL',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'gasmy. - Tu gasto en auto, ordenado y optimizado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gasmy. — Ahorra mientras conduces en Santiago',
    description: 'Registra tus TAG y bencina en tiempo real. Ve tu costo por viaje y por mes.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className={`${inter.className} bg-bg-main text-text-strong antialiased`}>
        {children}
      </body>
    </html>
  );
}
