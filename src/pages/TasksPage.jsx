import { motion } from 'framer-motion';
import TaskBoard from '../components/Tasks/TaskBoard';

export const TasksPage = ({ t }) => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {t('tasks.title')}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Track and manage your tasks
        </p>
      </motion.div>

      {/* Task board */}
      <TaskBoard t={t} />
    </div>
  );
};

export default TasksPage;
