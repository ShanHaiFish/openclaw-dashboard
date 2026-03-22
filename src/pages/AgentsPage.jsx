import { motion } from 'framer-motion';
import AgentGrid from '../components/Agents/AgentGrid';

export const AgentsPage = ({ t }) => {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {t('agents.title')}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          View and manage your AI agents
        </p>
      </motion.div>

      {/* Agent grid */}
      <AgentGrid t={t} />
    </div>
  );
};

export default AgentsPage;
