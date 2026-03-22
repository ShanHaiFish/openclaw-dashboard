import { motion } from 'framer-motion';
import { Calendar, User, MoreHorizontal } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { cn } from '../../lib/utils';

const priorityConfig = {
  low: { variant: 'default', label: 'Low', color: 'border-l-gray-500' },
  medium: { variant: 'warning', label: 'Medium', color: 'border-l-amber-500' },
  high: { variant: 'error', label: 'High', color: 'border-l-orange-500' },
  critical: { variant: 'error', label: 'Critical', color: 'border-l-red-500' },
};

const statusConfig = {
  todo: { label: 'To Do', color: 'bg-gray-500' },
  'in-progress': { label: 'In Progress', color: 'bg-blue-500' },
  review: { label: 'Review', color: 'bg-amber-500' },
  done: { label: 'Done', color: 'bg-emerald-500' },
};

export const TaskCard = ({ task, onClick, index = 0 }) => {
  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const status = statusConfig[task.status] || statusConfig.todo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        className={cn('p-4 border-l-2', priority.color)}
        onClick={() => onClick?.(task)}
      >
        <div className="flex items-start justify-between mb-3">
          <Badge variant={priority.variant} size="sm">
            {priority.label}
          </Badge>
          <button className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <h4 className="text-base font-medium text-[var(--text-primary)] mb-2">
          {task.title}
        </h4>

        {task.description && (
          <p className="text-sm text-[var(--text-secondary)] mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Progress */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-[var(--text-tertiary)]">Progress</span>
            <span className="text-[var(--text-secondary)]">{task.progress || 0}%</span>
          </div>
          <div className="h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${task.progress || 0}%` }}
              transition={{ duration: 0.5 }}
              className={cn('h-full rounded-full', status.color)}
            />
          </div>
        </div>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
          <div className="flex items-center gap-3">
            {task.assignee && (
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span>{task.assignee}</span>
              </div>
            )}
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-[var(--border-secondary)]">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default TaskCard;
