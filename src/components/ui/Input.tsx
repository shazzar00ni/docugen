interface InputProps {
  placeholder?: string;
  type?: 'text' | 'email';
  className?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}

export function Input({
  placeholder,
  type = 'text',
  className = '',
  disabled = false,
  value,
  onChange,
  onBlur,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    />
  );
}
