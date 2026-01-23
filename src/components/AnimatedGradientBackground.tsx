import { useEffect, useState } from 'react';

export function AnimatedGradientBackground() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-animate bg-gradient-to-br from-teal-500/10 via-dark-950/0 to-teal-600/10" />
      <div className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-conic from-teal-500/5 via-transparent to-teal-500/5 animate-[spin_30s_linear_infinite]" />
    </div>
  );
}
