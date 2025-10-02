type EventPayload = Record<string, any>;

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
    fbq?: (command: string, eventName: string, data?: any) => void;
  }
}

export function track(eventName: string, payload?: EventPayload): void {
  // Google Analytics 4
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...payload,
      send_to: gaId,
    });
  }

  // Meta Pixel
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
  if (pixelId && typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, payload);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, payload);
  }
}

// Specific event trackers
export const trackEvent = {
  viewHero: () => track('view_hero'),
  clickCtaBeta: () => track('click_cta_beta'),
  clickCtaCalc: () => track('click_cta_calc'),
  calcSubmitted: (payload?: EventPayload) => track('calc_submitted', payload),
  leadSubmitted: (payload?: EventPayload) => track('lead_submitted', payload),
  pricingView: () => track('pricing_view'),
};

// Initialize Google Analytics
export function initGA(): void {
  // Temporarily disabled for build - will be added via Google Tag Manager
  console.log('GA initialization placeholder');
}

// Initialize Meta Pixel
export function initMetaPixel(): void {
  // Temporarily disabled for build - will be added via Meta Pixel helper
  console.log('Meta Pixel initialization placeholder');
}
