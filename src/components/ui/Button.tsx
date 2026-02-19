import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

/**
 * Reusable button component with multiple variants and sizes.
 * Supports primary, secondary, and ghost styles with focus states.
 *
 * @param children - Button content or components
 * @param variant - Button style variant ('primary' | 'secondary' | 'ghost')
 * @param size - Button size ('sm' | 'md' | 'lg')
 * @param className - Additional CSS classes
 * @param onClick - Click event handler
 * @param type - HTML button type ('button' | 'submit')
 * @returns Styled button component
 *
 * @example
 * ```typescript
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-light-950';

  const variants = {
    primary:
      'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500 shadow-lg shadow-teal-500/25',
    secondary:
      'dark:bg-light-800 dark:text-light-100 dark:hover:bg-light-700 dark:focus:ring-light-500 dark:border-light-700',
    ghost:
      'dark:text-light-300 dark:hover:text-teal-400 dark:hover:bg-light-950/50 dark:focus:ring-light-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
