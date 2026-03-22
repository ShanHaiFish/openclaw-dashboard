import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const variantStyles = {
  default: 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]',
  primary: 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]',
  secondary: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
  danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
};

const sizeStyles = {
  sm: 'h-8 px-3 text-xs gap-1.5',
  md: 'h-9 px-4 text-sm gap-2',
  lg: 'h-10 px-5 text-sm gap-2',
  icon: 'h-8 w-8',
  'icon-md': 'h-9 w-9',
  'icon-lg': 'h-10 w-10',
};

const Button = forwardRef(({
  children,
  variant = 'default',
  size = 'md',
  className,
  disabled = false,
  loading = false,
  icon: Icon,
  iconRight: IconRight,
  ...props
}, ref) => (
  <button
    ref={ref}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-medium rounded-lg',
      'transition-all duration-150 ease-out',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2',
      'disabled:opacity-50 disabled:pointer-events-none',
      'active:scale-[0.98]',
      variantStyles[variant],
      sizeStyles[size],
      className
    )}
    {...props}
  >
    {loading ? (
      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    ) : Icon ? (
      <Icon className="w-4 h-4" />
    ) : null}
    {children}
    {IconRight && !loading && <IconRight className="w-4 h-4" />}
  </button>
));

Button.displayName = 'Button';

export default Button;
