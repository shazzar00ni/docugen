/**
 * Utility function to conditionally join CSS class names.
 * Filters out falsy values and joins remaining classes with spaces.
 *
 * @param classes - Array of class names that may include strings, undefined, null, or false
 * @returns A concatenated string of valid class names
 *
 * @example
 * ```typescript
 * cn('btn', isActive && 'btn-active', null, 'btn-primary')
 * // Returns: 'btn btn-active btn-primary'
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
