import { useState } from 'react';
import { motion } from 'framer-motion';
import SessionList from '../components/Sessions/SessionList';
import SessionDetail from '../components/Sessions/SessionDetail';

export const SessionsPage = ({ t }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          {t('sessions.title')}
        </h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Manage and monitor all active sessions
        </p>
      </motion.div>

      {/* Session list */}
      <SessionList t={t} onSelectSession={setSelectedSession} />

      {/* Session detail panel */}
      {selectedSession && (
        <SessionDetail
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
          t={t}
        />
      )}
    </div>
  );
};

export default SessionsPage;
