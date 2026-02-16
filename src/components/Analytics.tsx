import { useEffect } from 'react';

/**
 * Analytics component that injects Plausible analytics script.
 * Prevents duplicate script injection with guards and cleanup.
 *
 * @returns Analytics tracking component (renders null)
 */
export function Analytics() {
  useEffect(() => {
    const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
    if (plausibleDomain) {
      const existingScript = document.querySelector(
        'script[data-domain="' + plausibleDomain + '"]'
      );
      if (existingScript) {
        return;
      }

      const script = document.createElement('script');
      script.defer = true;
      script.setAttribute('data-domain', plausibleDomain);
      script.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);
  return null;
}
