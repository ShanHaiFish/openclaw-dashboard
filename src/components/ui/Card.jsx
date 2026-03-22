import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const Card = forwardRef(({ className, children, hover = false, glass = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-xl border transition-all duration-200',
      glass
        ? 'glass'
        : 'border-[var(--border-secondary)] bg-[var(--bg-elevated)]',
      hover && 'card-hover cursor-pointer',
      className
    )}
    {...props}
  >
    {children}
  </div>
));

Card.displayName = 'Card';

export const CardHeader = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4 border-b border-[var(--border-secondary)]', className)} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn('text-lg font-semibold text-[var(--text-primary)]', className)} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className, children, ...props }) => (
  <p className={cn('text-sm text-[var(--text-secondary)] mt-1', className)} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4', className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className, children, ...props }) => (
  <div className={cn('px-6 py-4 border-t border-[var(--border-secondary)]', className)} {...props}>
    {children}
  </div>
);

export default Card;
