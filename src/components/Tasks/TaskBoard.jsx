import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, MoreHorizontal } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { cn, getPriorityColor } from '../../lib/utils';

const columns = [
  { id: 'todo', label: 'tasks.todo', color: 'border-gray-500' },
  { id: 'in-progress', label: 'tasks.inProgress', color: 'border-blue-500' },
  { id: 'review', label: 'tasks.review', color: 'border-amber-500' },
  { id: 'done', label: 'tasks.done', color: 'border-emerald-500' },
];

const priorityLabels = {
  low: { variant: 'default', label: 'tasks.low' },
  medium: { variant: 'warning', label: 'tasks.medium' },
  high: { variant: 'error', label: 'tasks.high' },
  critical: { variant: 'error', label: 'tasks.critical' },
};

export const TaskBoard = ({ t }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleDragStart = (task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const handleDrop = (status) => {
    if (draggedTask && draggedTask.status !== status) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === draggedTask.id ? { ...task, status } : task
        )
      );
    }
    setDraggedTask(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col) => (
          <Card key={col.id} className="p-4">
            <Skeleton className="h-6 w-24 mb-4" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map((column) => {
        const columnTasks = getTasksByStatus(column.id);

        return (
          <div
            key={column.id}
            className={cn(
              'flex flex-col bg-[var(--bg-secondary)] rounded-xl p-4',
              'border-t-2',
              column.color
            )}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-[var(--text-primary)]">
                  {t(column.label)}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]">
                  {columnTasks.length}
                </span>
              </div>
              <button className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Tasks */}
            <div className="flex-1 space-y-3 overflow-y-auto">
              {columnTasks.length === 0 ? (
                <div className="text-center py-8 text-[var(--text-tertiary)] text-sm">
                  No tasks
                </div>
              ) : (
                columnTasks.map((task, index) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    t={t}
                    index={index}
                    onDragStart={() => handleDragStart(task)}
                    onDragEnd={handleDragEnd}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const TaskCard = ({ task, t, index, onDragStart, onDragEnd }) => {
  const priority = priorityLabels[task.priority] || priorityLabels.medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <Card
        hover
        className={cn(
          'p-4 cursor-grab active:cursor-grabbing',
          'border-l-2',
          task.priority === 'critical' ? 'border-l-red-500' :
          task.priority === 'high' ? 'border-l-orange-500' :
          task.priority === 'medium' ? 'border-l-amber-500' :
          'border-l-gray-500'
        )}
      >
        <div className="flex items-start justify-between mb-2">
          <Badge variant={priority.variant} size="sm">
            {t(priority.label)}
          </Badge>
          <button className="p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        <h4 className="text-sm font-medium text-[var(--text-primary)] mb-2">
          {task.title}
        </h4>

        <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
          <span>{task.assignee}</span>
          {task.dueDate && (
            <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
          )}
        </div>

        {/* Progress bar */}
        {task.progress !== undefined && (
          <div className="mt-3">
            <div className="h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all',
                  task.status === 'done' ? 'bg-emerald-400' :
                  task.status === 'in-progress' ? 'bg-blue-400' :
                  task.status === 'review' ? 'bg-amber-400' :
                  'bg-gray-400'
                )}
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {task.tags.map((tag) => (
              <span
                key={tag}
                className="px-1.5 py-0.5 text-[10px] rounded bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
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

export default TaskBoard;
