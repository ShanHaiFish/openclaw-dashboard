import { cn } from '../../lib/utils';
import { FileX, Search, Inbox, AlertCircle } from 'lucide-react';

const icons = {
  empty: Inbox,
  search: Search,
  notFound: FileX,
  error: AlertCircle,
};

export const EmptyState = ({
  type = 'empty',
  title,
  description,
  action,
  className,
}) => {
  const Icon = icons[type];

  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 px-6 text-center',
      className
    )}>
      <div className={cn(
        'w-16 h-16 rounded-full flex items-center justify-center mb-4',
        'bg-[var(--bg-tertiary)]'
      )}>
        <Icon className="w-8 h-8 text-[var(--text-tertiary)]" />
      </div>
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">
        {title || 'No data'}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] max-w-sm mb-4">
        {description || 'There is nothing to display here yet.'}
      </p>
      {action}
    </div>
  );
};

export default EmptyState;
