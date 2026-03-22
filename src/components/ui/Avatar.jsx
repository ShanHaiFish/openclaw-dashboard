import { cn } from '../../lib/utils';

const sizeStyles = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
};

export const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  className,
  style,
}) => {
  const initials = name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn('relative inline-flex', className)}>
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={cn(
            'rounded-full object-cover',
            sizeStyles[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-medium',
            'bg-[var(--accent-muted)] text-[var(--accent-primary)]',
            sizeStyles[size]
          )}
          style={style}
        >
          {initials || '?'}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full border-2 border-[var(--bg-elevated)]',
            status === 'online' ? 'bg-emerald-500' :
            status === 'idle' ? 'bg-amber-500' :
            'bg-gray-500',
            size === 'xs' ? 'w-1.5 h-1.5' :
            size === 'sm' ? 'w-2 h-2' :
            'w-2.5 h-2.5'
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
