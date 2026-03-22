import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle, Circle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';

const statusConfig = {
  done: { icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-400/20' },
  'in-progress': { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-400/20' },
  review: { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/20' },
  todo: { icon: Circle, color: 'text-gray-400', bg: 'bg-gray-400/20' },
};

export const TaskTimeline = ({ t, tasks, loading }) => {
  // Sort tasks by date and take recent ones
  const sortedTasks = tasks
    ? [...tasks]
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .slice(0, 8)
    : [];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('overview.taskProgress')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="shimmer w-8 h-8 rounded-full" />
                <div className="flex-1">
                  <div className="shimmer h-4 w-3/4 rounded mb-2" />
                  <div className="shimmer h-3 w-1/2 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('overview.taskProgress')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[var(--border-secondary)]" />

          <div className="space-y-4">
            {sortedTasks.map((task, index) => {
              const config = statusConfig[task.status] || statusConfig.todo;
              const Icon = config.icon;

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative flex items-start gap-4 pl-2"
                >
                  {/* Timeline dot */}
                  <div className={cn(
                    'relative z-10 flex items-center justify-center w-8 h-8 rounded-full',
                    config.bg
                  )}>
                    <Icon className={cn('w-4 h-4', config.color)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0 pb-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {task.title}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          {task.assignee} • {t(`tasks.${task.status.replace('-', '')}`)}
                        </p>
                      </div>
                      <div className={cn(
                        'px-2 py-0.5 rounded text-xs font-medium',
                        config.bg,
                        config.color
                      )}>
                        {task.progress}%
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-2 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${task.progress}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={cn(
                          'h-full rounded-full',
                          task.status === 'done' ? 'bg-emerald-400' :
                          task.status === 'in-progress' ? 'bg-blue-400' :
                          task.status === 'review' ? 'bg-amber-400' :
                          'bg-gray-400'
                        )}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTimeline;
