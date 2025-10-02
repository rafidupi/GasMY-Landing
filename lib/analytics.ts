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
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);

  window.gtag = function() {
    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.dataLayer.push(arguments);
  };

  // @ts-ignore
  window.gtag('js', new Date());
  window.gtag('config', gaId);
}

// Initialize Meta Pixel
export function initMetaPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
  if (!pixelId || typeof window === 'undefined') return;

  // @ts-ignore
  !(function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  })(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  // @ts-ignore
  window.fbq!('init', pixelId);
  // @ts-ignore
  window.fbq!('track', 'PageView');
}
