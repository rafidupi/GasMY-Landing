'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
});

interface NavbarProps {
  bg?: string;
  text?: string;
  muted?: string;
  accent?: string;
  ctaText?: string;
  ctaHref?: string;
  sticky?: boolean;
}

export default function GasMyNavbar({
  bg = '#F8F9FA',
  text = '#111827',
  muted = 'rgba(17,24,39,0.65)',
  accent = '#4f7cff',
  ctaText = 'Inicia sesión',
  ctaHref = '#',
  sticky = true,
}: NavbarProps) {
  const [open, setOpen] = React.useState(false);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Planes', href: '#planes' },
    { label: 'Testimonios', href: '#testimonios' },
    { label: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav
      className={poppins.className}
      style={{
        position: sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 100,
        width: '100%',
        height: '64px',
        background: bg,
        color: text,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <style jsx>{`
        .gm-container {
          width: 100%;
          max-width: 1200px;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .gm-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .gm-logo {
          width: 32px;
          height: 32px;
          display: grid;
          place-items: center;
        }
        .gm-links {
          display: none;
          align-items: center;
          gap: 22px;
          font-size: 14px;
        }
        .gm-cta {
          display: none;
        }
        .gm-burger {
          display: inline-flex;
          background: transparent;
          border: 0;
          color: ${text};
          cursor: pointer;
          padding: 8px;
          border-radius: 10px;
        }
        .gm-burger:hover {
          background: rgba(0, 0, 0, 0.04);
        }
        .gm-mobile {
          position: absolute;
          left: 0;
          right: 0;
          top: 64px;
          background: ${bg};
          border-top: 1px solid rgba(0, 0, 0, 0.06);
          display: ${open ? 'block' : 'none'};
        }
        .gm-mobile a {
          display: block;
          padding: 14px 18px;
          color: ${muted};
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .gm-mobile a:hover {
          color: #0066ff;
          background: rgba(0, 102, 255, 0.08);
        }
        @media (min-width: 768px) {
          .gm-links {
            display: flex;
          }
          .gm-cta {
            display: inline-flex;
          }
          .gm-burger {
            display: none;
          }
          .gm-mobile {
            display: none !important;
          }
        }
      `}</style>

      <div className="gm-container">
        <a className="gm-brand" href="#" style={{ textDecoration: 'none', color: text }}>
          <span className="gm-logo" aria-hidden>
            {/* Gota de petróleo */}
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4C16 4 10 12 10 17C10 20.866 13.134 24 17 24C20.866 24 24 20.866 24 17C24 12 18 4 18 4C17.5 4.5 16.5 4.5 16 4Z"
                fill="#1a1a1a"
                stroke="#000000"
                strokeWidth="0.5"
              />
              {/* Brillo en la gota */}
              <ellipse cx="18" cy="14" rx="2.5" ry="3" fill="rgba(255,255,255,0.3)" />
            </svg>
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '-0.02em',
            }}
          >
            GasMy
          </span>
        </a>

        <div className="gm-links">
          {links.map((l) => (
            <motion.a
              key={l.href}
              href={l.href}
              style={{ color: muted, textDecoration: 'none' }}
              whileHover={{ color: '#0066ff' }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            >
              {l.label}
            </motion.a>
          ))}
        </div>

        <motion.a
          className="gm-cta"
          href={ctaHref}
          style={{
            textDecoration: 'none',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #0066ff 0%, #0052cc 100%)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 12,
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.2,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 6px 20px rgba(0, 102, 255, 0.5)',
            willChange: 'transform, box-shadow',
          }}
          whileHover={{
            background: 'linear-gradient(135deg, #0052cc 0%, #0044aa 100%)',
            y: -2,
            boxShadow: '0 8px 28px rgba(0, 102, 255, 0.65)',
          }}
          whileTap={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25, duration: 0.3 }}
        >
          {ctaText}
        </motion.a>

        <button className="gm-burger" aria-label="Abrir menú" onClick={() => setOpen(!open)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <div className="gm-mobile">
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        <a href={ctaHref} onClick={() => setOpen(false)} style={{ color: text }}>
          {ctaText}
        </a>
      </div>
    </nav>
  );
}
