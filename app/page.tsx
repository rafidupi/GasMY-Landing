'use client';

import { useEffect, useState } from 'react';
import GasMyNavbar from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { TagCoverage } from './components/TagCoverage';
import { Features } from './components/Features';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ScrollCar } from './components/ScrollCar';
import { Roadmap } from './components/Roadmap';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BetaForm } from './components/BetaForm';
import { FlotaForm } from './components/FlotaForm';
import { BetaDownload } from './components/BetaDownload';
import { initGA, initMetaPixel, trackEvent } from '@/lib/analytics';

export default function Home() {
  const [betaFormOpen, setBetaFormOpen] = useState(false);
  const [flotaFormOpen, setFlotaFormOpen] = useState(false);

  useEffect(() => {
    initGA();
    initMetaPixel();
    trackEvent.viewHero();
  }, []);

  return (
    <main className="bg-bg-main text-text-strong">
      <GasMyNavbar ctaText="Iniciar sesion" ctaHref="/login" />

      <section className="relative isolate min-h-screen aurora-bg pb-3">
        <div className="relative z-30">
          <Hero onCtaBeta={() => setBetaFormOpen(true)} />
        </div>
      </section>

      <BetaDownload />
      <HowItWorks />
      <TagCoverage />
      <Features />
      <ScrollCar />
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

