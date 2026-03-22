import { cn } from '../../lib/utils';

const variantStyles = {
  default: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]',
  primary: 'bg-[var(--accent-primary)] text-white',
  secondary: 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-primary)]',
  success: 'bg-emerald-500/20 text-emerald-400',
  warning: 'bg-amber-500/20 text-amber-400',
  error: 'bg-red-500/20 text-red-400',
  info: 'bg-blue-500/20 text-blue-400',
  outline: 'border border-[var(--border-primary)] text-[var(--text-secondary)]',
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className,
  dot = false,
  ...props 
}) => (
  <span
    className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      variantStyles[variant],
      sizeStyles[size],
      className
    )}
    {...props}
  >
    {dot && (
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        variant === 'success' ? 'bg-emerald-400' :
        variant === 'warning' ? 'bg-amber-400' :
        variant === 'error' ? 'bg-red-400' :
        variant === 'info' ? 'bg-blue-400' :
        'bg-current'
      )} />
    )}
    {children}
  </span>
);

export default Badge;
