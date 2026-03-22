import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import { Search } from 'lucide-react';

const Input = forwardRef(({
  className,
  type = 'text',
  icon: Icon,
  iconPosition = 'left',
  error,
  ...props
}, ref) => {
  const inputClasses = cn(
    'w-full rounded-lg border bg-[var(--bg-secondary)]',
    'text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]',
    'transition-all duration-150',
    'focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-transparent',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error && 'border-red-500 focus:ring-red-500',
    !error && 'border-[var(--border-primary)]',
    Icon && iconPosition === 'left' ? 'pl-10 pr-4 py-2.5' : 'px-4 py-2.5',
    className
  );

  if (Icon) {
    return (
      <div className="relative">
        <div className={cn(
          'absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none',
          'text-[var(--text-tertiary)]'
        )}>
          <Icon className="w-4 h-4" />
        </div>
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      ref={ref}
      type={type}
      className={inputClasses}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export const SearchInput = ({ className, ...props }) => (
  <Input
    icon={Search}
    placeholder="Search..."
    className={className}
    {...props}
  />
);

export default Input;
