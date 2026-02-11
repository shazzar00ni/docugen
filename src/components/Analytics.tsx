import { useEffect } from 'react';

/**
 * Analytics component that injects Plausible analytics script.
 * Prevents duplicate script injection with guards and cleanup.
 *
 * @returns Analytics tracking component (renders null)
 */
export function Analytics() {
  useEffect(() => {
    const plausibleDomain = import.meta.env?.VITE_PLAUSIBLE_DOMAIN as string | undefined;
    if (plausibleDomain) {
      const s = document.createElement('script');
      s.defer = true;
      s.setAttribute('data-domain', plausibleDomain);
      s.src = 'https://plausible.io/js/plausible.js';
      document.head.appendChild(s);
    }
  }, []);
  return null;
}
