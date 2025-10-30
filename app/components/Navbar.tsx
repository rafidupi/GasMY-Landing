'use client';

import * as React from 'react';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

const links = [
  { label: 'Features', href: '#diferenciadores' },
  { label: 'Planes', href: '#pricing-individuals' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'Contacto', href: '#contacto' },
];

interface NavbarProps {
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
}

export default function GasMyNavbar({
  ctaText = 'Inicia sesion',
  ctaHref = '#',
  sticky = true,
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  const positioningClass = sticky
    ? 'pointer-events-none fixed left-0 right-0 z-40 px-4'
    : 'pointer-events-none relative z-30 px-4';
  const positioningStyle = sticky ? { top: 'calc(env(safe-area-inset-top) + 1rem)' } : undefined;

  return (
    <header className={cn('flex justify-center', positioningClass, poppins.className)} style={positioningStyle}>
      <div className="pointer-events-auto w-full max-w-6xl">
        <div className="relative">
          <div className="flex items-center justify-between rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white shadow-lg shadow-blue-500/20 backdrop-blur-xl transition-all duration-300">
            <a href="#" className="flex items-center gap-3 text-lg font-semibold text-white">
              <img src="/logo.png" alt="GasMy" className="h-10 w-auto drop-shadow" />
            </a>

            <div className="hidden items-center gap-8 text-sm md:flex">
              {links.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white/70 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="hidden md:flex">
              <a
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#1C0AE8] via-[#1D4CFF] to-[#3A8BFF] px-6 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(28,10,232,0.35)] transition hover:shadow-[0_12px_36px_rgba(28,10,232,0.45)]"
              >
                {ctaText}
              </a>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-sm backdrop-blur md:hidden"
              aria-label="Abrir menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {open && (
            <div className="absolute left-0 right-0 mt-3 rounded-3xl border border-white/30 bg-white/15 p-4 text-white shadow-xl backdrop-blur-xl md:hidden">
              <nav className="space-y-2">
                {links.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-white/20"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href={ctaHref}
                  className="block rounded-2xl bg-gradient-to-r from-[#1C0AE8] via-[#1D4CFF] to-[#3A8BFF] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_26px_rgba(28,10,232,0.35)]"
                  onClick={() => setOpen(false)}
                >
                  {ctaText}
                </a>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
