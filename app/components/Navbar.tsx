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
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const positioningClass = sticky
    ? 'fixed left-0 right-0 px-4'
    : 'relative z-30 px-4';
  const positioningStyle = sticky ? { 
    top: 'calc(env(safe-area-inset-top) + 1rem)',
    zIndex: 99999
  } : undefined;

  const containerClasses = cn(
    'flex items-center justify-between rounded-full px-6 py-3 backdrop-blur-xl transition-all duration-300',
    scrolled
      ? 'border border-white/70 bg-white/90 text-slate-900 shadow-lg shadow-blue-100/40'
      : 'border border-white/20 bg-white/10 text-white shadow-lg shadow-blue-500/20'
  );

  const desktopLinkClasses = scrolled
    ? 'text-slate-700 transition-colors hover:text-primary'
    : 'text-white/70 transition-colors hover:text-white';

  const burgerClasses = scrolled
    ? 'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-800 shadow-sm backdrop-blur'
    : 'flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-sm backdrop-blur';

  const mobileContainerClasses = scrolled
    ? 'absolute left-0 right-0 mt-3 rounded-3xl border border-white/70 bg-white/95 p-4 text-slate-800 shadow-xl backdrop-blur-xl md:hidden'
    : 'absolute left-0 right-0 mt-3 rounded-3xl border border-white/30 bg-white/15 p-4 text-white shadow-xl backdrop-blur-xl md:hidden';

  const mobileLinkClasses = scrolled
    ? 'block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-slate-100'
    : 'block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-white/20';

  const mobileCtaClasses = 'block rounded-2xl bg-gradient-to-r from-[#1C0AE8] via-[#1D4CFF] to-[#3A8BFF] px-4 py-3 text-center text-sm font-semibold text-white shadow-[0_10px_26px_rgba(28,10,232,0.3)]';

  const logoClasses = cn('flex items-center gap-3 text-lg font-semibold transition-colors', scrolled ? 'text-slate-900' : 'text-white');

  return (
    <header 
      className={cn('flex justify-center', positioningClass, poppins.className)} 
      style={{
        ...positioningStyle,
        zIndex: 999999,
        position: sticky ? 'fixed' : 'relative'
      }}
    >
      <div className="w-full max-w-6xl">
        <div className="relative">
          <div className={containerClasses}>
            <a href="#" className={logoClasses}>
              <img src="/logo.png" alt="GasMy" className="h-10 w-auto drop-shadow" />
            </a>

            <div className="hidden items-center gap-8 text-sm md:flex">
              {links.map((item) => (
                <a key={item.href} href={item.href} className={desktopLinkClasses}>
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
              className={cn(burgerClasses, 'md:hidden')}
              aria-label="Abrir menu"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {open && (
            <div className={mobileContainerClasses}>
              <nav className="space-y-2">
                {links.map((item) => (
                  <a key={item.href} href={item.href} className={mobileLinkClasses} onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ))}
                <a href={ctaHref} className={mobileCtaClasses} onClick={() => setOpen(false)}>
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
