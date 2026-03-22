import { cn } from '../../lib/utils';

export const Skeleton = ({ className, ...props }) => (
  <div
    className={cn(
      'shimmer rounded-md bg-[var(--bg-tertiary)]',
      className
    )}
    {...props}
  />
);

export const SkeletonCard = ({ className }) => (
  <div className={cn('rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-6', className)}>
    <div className="flex items-center justify-between mb-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <Skeleton className="h-8 w-32 mb-2" />
    <Skeleton className="h-3 w-48" />
  </div>
);

export const SkeletonTable = ({ rows = 5, cols = 4, className }) => (
  <div className={cn('rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)]', className)}>
    <div className="flex gap-4 p-4 border-b border-[var(--border-secondary)]">
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div
        key={rowIndex}
        className="flex gap-4 p-4 border-b border-[var(--border-secondary)] last:border-0"
      >
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-4 flex-1" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonList = ({ items = 3, className }) => (
  <div className={cn('space-y-3', className)}>
    {Array.from({ length: items }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)]">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export default Skeleton;
