import React from 'react';

/**
 * Determine whether the current environment's viewport width is considered mobile.
 *
 * @returns `true` if `window` is defined and `window.innerWidth` is less than 768, `false` otherwise.
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768; // 'md' breakpoint in Tailwind
}

/**
 * Subscribes to a CSS media query and exposes whether it currently matches.
 *
 * Reads window.matchMedia for the provided `query` and updates the returned value when the query's match state changes.
 *
 * @param query - A valid CSS media query string (e.g., "(min-width: 768px)").
 * @returns `true` if the media query currently matches, `false` otherwise.
 *
 * @remarks
 * This hook reads `window.matchMedia` and therefore requires a browser-like environment; calling it where `window` is undefined may throw. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
}