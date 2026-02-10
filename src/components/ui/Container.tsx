import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * Responsive container component with consistent padding and max-width.
 * Centers content and provides responsive horizontal padding.
 *
 * @param children - Child elements to wrap
 * @param className - Additional CSS classes
 * @returns Responsive container div
 *
 * @example
 * ```typescript
 * <Container className="py-8">
 *   <h1>Content</h1>
 * </Container>
 * ```
 */
export function Container({ children, className = '' }: ContainerProps) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}
