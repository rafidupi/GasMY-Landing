'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/firebase';
import { initGA, initMetaPixel } from '@/lib/analytics';

export default function AnalyticsInit() {
  useEffect(() => {
    // Firebase Analytics
    initAnalytics();
    
    // Google Analytics 4
    initGA();
    
    // Meta Pixel (Facebook)
    initMetaPixel();
    
    console.log('✅ All analytics initialized');
  }, []);

  return null;
}
