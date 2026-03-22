import { motion } from 'framer-motion';
import { MessageSquare, Clock, Hash } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { StatusDot } from '../ui/StatusDot';
import { cn, formatRelativeTime, formatNumber } from '../../lib/utils';

const statusVariants = {
  active: 'success',
  idle: 'warning',
  error: 'error',
  completed: 'info',
};

export const SessionCard = ({ session, onClick, t, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        className="p-5"
        onClick={() => onClick?.(session)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <StatusDot status={session.status} pulse />
            <Badge variant={statusVariants[session.status]} size="sm">
              {t(`sessions.${session.status}`)}
            </Badge>
          </div>
          <span className="text-xs text-[var(--text-tertiary)]">
            {formatRelativeTime(session.lastActivity, t)}
          </span>
        </div>

        <h3 className="text-base font-medium text-[var(--text-primary)] mb-2 line-clamp-2">
          {session.name}
        </h3>

        <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4" />
            <span>{formatNumber(session.messages)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Hash className="w-4 h-4" />
            <span className="font-mono text-xs">{session.model}</span>
          </div>
        </div>

        {session.tags && session.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {session.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
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

export default SessionCard;
