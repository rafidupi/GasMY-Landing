'use client';

import { useState, useEffect } from 'react';
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
    <main className="min-h-screen">
      <Hero
        onCtaBeta={() => setBetaFormOpen(true)}
        onCtaCalc={scrollToCalculator}
      />
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

      <BetaForm
        isOpen={betaFormOpen}
        onClose={() => setBetaFormOpen(false)}
      />
      <FlotaForm
        isOpen={flotaFormOpen}
        onClose={() => setFlotaFormOpen(false)}
      />
    </main>
  );
}
