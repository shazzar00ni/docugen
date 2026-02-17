import { useEffect } from 'react';

/**
 * Injects the Plausible Analytics script into the document head when `VITE_PLAUSIBLE_DOMAIN` is set.
 *
 * Reads `VITE_PLAUSIBLE_DOMAIN` from `import.meta.env` and, if present, appends a deferred
 * `<script>` with `data-domain` set to that value pointing to `https://plausible.io/js/plausible.js`.
 *
 * @returns `null` — this component renders nothing
 */
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