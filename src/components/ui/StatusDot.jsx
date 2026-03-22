import { cn } from '../../lib/utils';

const statusColors = {
  active: 'bg-emerald-500',
  online: 'bg-emerald-500',
  idle: 'bg-amber-500',
  offline: 'bg-gray-500',
  error: 'bg-red-500',
  completed: 'bg-blue-500',
  'in-progress': 'bg-blue-500',
  review: 'bg-purple-500',
  todo: 'bg-gray-400',
};

const statusLabels = {
  active: 'Active',
  online: 'Online',
  idle: 'Idle',
  offline: 'Offline',
  error: 'Error',
  completed: 'Completed',
  'in-progress': 'In Progress',
  review: 'Review',
  todo: 'To Do',
};

export const StatusDot = ({
  status,
  size = 'sm',
  pulse = false,
  showLabel = false,
  className,
}) => {
  const sizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
  };

  return (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={cn(
          'rounded-full',
          statusColors[status] || 'bg-gray-500',
          sizes[size],
          pulse && (status === 'active' || status === 'online') && 'status-dot-pulse'
        )}
      />
      {showLabel && (
        <span className="text-sm text-[var(--text-secondary)]">
          {statusLabels[status] || status}
        </span>
      )}
    </span>
  );
};

export default StatusDot;
