import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    const plausibleDomain = (import.meta as any).env?.VITE_PLAUSIBLE_DOMAIN as string | undefined;
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
