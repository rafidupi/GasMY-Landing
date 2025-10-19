'use client';

import { useState, useEffect } from 'react';
import GasMyNavbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BetaForm } from './components/BetaForm';
import { FlotaForm } from './components/FlotaForm';
import { initGA, initMetaPixel, trackEvent } from '@/lib/analytics';

export default function Home() {
  const [betaFormOpen, setBetaFormOpen] = useState(false);
  const [flotaFormOpen, setFlotaFormOpen] = useState(false);

  useEffect(() => {
    // Initialize analytics
    initGA();
    initMetaPixel();
    trackEvent.viewHero();
  }, []);

  const scrollToCalculator = () => {
    const calcElement = document.getElementById('calculadora');
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen" style={{ position: 'relative' }}>
      {/* Gradient Spotlight Effect - Con z-index positivo */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          background: '#f8f9fa',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '5%',
            right: '5%',
            width: '700px',
            height: '700px',
            background:
              'radial-gradient(circle, rgba(0, 102, 255, 0.7) 0%, rgba(0, 68, 255, 0.5) 30%, rgba(0, 51, 204, 0.3) 50%, transparent 75%)',
            filter: 'blur(100px)',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <GasMyNavbar />
        <Hero onCtaBeta={() => setBetaFormOpen(true)} onCtaCalc={scrollToCalculator} />
        <HowItWorks />
        <Features />
        <Calculator onResultEmail={() => setBetaFormOpen(true)} />
        <Pricing
          onBetaClick={() => setBetaFormOpen(true)}
          onFlotaClick={() => setFlotaFormOpen(true)}
        />
        <Testimonials />
        <Roadmap />
        <FAQ />
        <Footer />

        <BetaForm isOpen={betaFormOpen} onClose={() => setBetaFormOpen(false)} />
        <FlotaForm isOpen={flotaFormOpen} onClose={() => setFlotaFormOpen(false)} />
      </div>
    </main>
  );
}
