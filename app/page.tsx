'use client';

import { useEffect, useState } from 'react';
import GasMyNavbar from './components/Navbar';
import { Hero } from './components/Hero';
import { Calculator } from './components/Calculator';
import { HowItWorks } from './components/HowItWorks';
import { TagCoverage } from './components/TagCoverage';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BetaForm } from './components/BetaForm';
import { FlotaForm } from './components/FlotaForm';
import Aurora from './components/Aurora';
import { initGA, initMetaPixel, trackEvent } from '@/lib/analytics';

export default function Home() {
  const [betaFormOpen, setBetaFormOpen] = useState(false);
  const [flotaFormOpen, setFlotaFormOpen] = useState(false);

  useEffect(() => {
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
    <main className="bg-bg-main text-text-strong">
      <section className="relative isolate min-h-screen overflow-hidden bg-[#0b0b14]">
        <div className="pointer-events-none absolute inset-0 -z-30 bg-[#0b0b14]" />
        <div className="pointer-events-none absolute inset-0 -z-20">
          <Aurora
            colorStops={['#1C0AE8', '#3A8BFF', '#6666FF']}
            amplitude={1.4}
            blend={0.85}
            speed={0.6}
            intensity={1.8}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white/15 via-white/5 to-transparent mix-blend-screen" />

        <div className="relative z-30">
          <GasMyNavbar />
          <Hero onCtaBeta={() => setBetaFormOpen(true)} onCtaCalc={scrollToCalculator} />
        </div>
      </section>

      <HowItWorks />
      <TagCoverage />
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
    </main>
  );
}
