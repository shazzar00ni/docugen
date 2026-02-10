import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    const plausibleDomain = (window as unknown as { PLAUSIBLE_DOMAIN?: string }).PLAUSIBLE_DOMAIN;
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
