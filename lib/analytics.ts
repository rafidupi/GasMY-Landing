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
  leadSubmitted: (payload?: EventPayload) => track('lead_submitted', payload),
  pricingView: () => track('pricing_view'),
  downloadClick: (payload?: EventPayload) => track('download_click', payload),
};

// Initialize Google Analytics
export function initGA(): void {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  
  if (!gaId || typeof window === 'undefined') {
    console.log('GA not initialized - missing GA_ID or not in browser');
    return;
  }

  // GA is already initialized via Script tags in layout.tsx
  // Just verify it's working
  if (window.gtag) {
    console.log('✅ Google Analytics initialized:', gaId);
    
    // Send initial pageview
    window.gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  } else {
    console.warn('⚠️ Google Analytics script not loaded yet');
  }
}

// Initialize Meta Pixel
export function initMetaPixel(): void {
  const pixelId = process.env.NEXT_PUBLIC_PIXEL_ID;
  
  if (!pixelId || typeof window === 'undefined') {
    console.log('Meta Pixel not initialized - missing PIXEL_ID or not in browser');
    return;
  }

  // Check if fbq is already loaded
  if (window.fbq) {
    console.log('✅ Meta Pixel already initialized:', pixelId);
    return;
  }

  // Initialize Meta Pixel
  /* eslint-disable */
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */

  window.fbq!('init', pixelId);
  window.fbq!('track', 'PageView');
  
  console.log('✅ Meta Pixel initialized:', pixelId);
}
