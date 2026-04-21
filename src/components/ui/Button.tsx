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
 * Renders a configurable button with selectable visual variant, size, and additional CSS classes.
 *
 * @param children - Content displayed inside the button
 * @param variant - Visual style of the button: 'primary', 'secondary', or 'ghost'
 * @param size - Size of the button: 'sm', 'md', or 'lg'
 * @param className - Additional CSS classes to append to the button
 * @param onClick - Optional click event handler
 * @param type - HTML button type attribute ('button' or 'submit')
 * @returns The rendered HTML button element with applied styles and handlers
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
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-950';

  const variants = {
    primary:
      'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500 shadow-lg shadow-teal-500/25',
    secondary:
      'bg-dark-800 text-light-100 hover:bg-dark-700 focus:ring-dark-500 border border-dark-700',
    ghost: 'text-dark-300 hover:text-teal-400 hover:bg-dark-950/50 focus:ring-dark-500',
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