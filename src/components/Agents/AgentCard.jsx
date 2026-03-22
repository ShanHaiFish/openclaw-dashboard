import { motion } from 'framer-motion';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { StatusDot } from '../ui/StatusDot';
import { cn, formatNumber } from '../../lib/utils';

const statusVariants = {
  online: 'success',
  idle: 'warning',
  offline: 'default',
};

export const AgentCard = ({ agent, t, onClick, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        hover
        className="p-6"
        onClick={() => onClick?.(agent)}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${agent.color}20` }}
            >
              {agent.avatar}
            </div>
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">{agent.name}</h3>
              <div className="flex items-center gap-2 mt-0.5">
                <StatusDot status={agent.status} size="sm" />
                <span className="text-xs text-[var(--text-tertiary)]">
                  {t(`agents.${agent.status}`)}
                </span>
              </div>
            </div>
          </div>
          <Badge variant={statusVariants[agent.status]}>
            {agent.model}
          </Badge>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {agent.description}
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border-secondary)]">
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--text-primary)]">
              {formatNumber(agent.sessionsCompleted)}
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.sessions')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-400">
              {agent.successRate}%
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.successRate')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--text-primary)]">
              {agent.avgResponseTime}s
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.avgResponse')}</div>
          </div>
        </div>

        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {agent.capabilities.slice(0, 4).map((cap) => (
              <span
                key={cap}
                className="px-2 py-0.5 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
              >
                {cap}
              </span>
            ))}
            {agent.capabilities.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-[var(--text-tertiary)]">
                +{agent.capabilities.length - 4}
              </span>
            )}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default AgentCard;
