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
 * Render a configurable button with selectable variant, size, and additional CSS classes.
 *
 * @param children - Button content to be rendered inside the element
 * @param variant - Visual style of the button: 'primary', 'secondary', or 'ghost'
 * @param size - Size of the button: 'sm', 'md', or 'lg'
 * @param className - Additional CSS classes to append to the button
 * @param onClick - Optional click event handler
 * @param type - HTML button type attribute ('button' or 'submit')
 * @returns A styled HTML button element
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
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950';

  const variants = {
    primary:
      'bg-teal-600 text-white hover:bg-teal-500 focus:ring-teal-500 shadow-lg shadow-teal-500/25',
    secondary:
      'bg-slate-800 text-slate-100 hover:bg-slate-700 focus:ring-slate-500 border border-slate-700',
    ghost: 'text-slate-300 hover:text-teal-400 hover:bg-slate-900/50 focus:ring-slate-500',
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