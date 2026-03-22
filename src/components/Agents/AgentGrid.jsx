import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, MessageSquare, Clock, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import { StatusDot } from '../ui/StatusDot';
import Avatar from '../ui/Avatar';
import { SkeletonList } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { cn, formatNumber } from '../../lib/utils';

const statusVariants = {
  online: 'success',
  idle: 'warning',
  offline: 'default',
};

export const AgentGrid = ({ t }) => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents');
      const data = await response.json();
      // Handle both array and object response formats
      const agentList = Array.isArray(data) ? data : (data.agents || data || []);
      setAgents(Array.isArray(agentList) ? agentList : []);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
      setAgents([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = (Array.isArray(agents) ? agents : []).filter(
    (agent) =>
      agent && (
        !search ||
        (agent.name && agent.name.toLowerCase().includes(search.toLowerCase())) ||
        (agent.description && agent.description.toLowerCase().includes(search.toLowerCase()))
      )
  );

  if (loading) {
    return <SkeletonList items={4} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Input
          icon={Search}
          placeholder={t('agents.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2 bg-[var(--bg-secondary)] rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              'p-2 rounded-md transition-colors',
              viewMode === 'grid'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            )}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              'p-2 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)]'
                : 'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]'
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Agents */}
      {filteredAgents.length === 0 ? (
        <EmptyState
          type="search"
          title={t('agents.noAgents')}
          description="Try adjusting your search"
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAgents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} t={t} index={index} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredAgents.map((agent, index) => (
            <AgentListItem key={agent.id} agent={agent} t={t} index={index} />
          ))}
        </div>
      )}
    </div>
  );
};

const AgentCard = ({ agent, t, index }) => {
  if (!agent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card hover className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${agent.color || '#6b7280'}20` }}
            >
              {agent.avatar || '🤖'}
            </div>
            <div>
              <h3 className="font-medium text-[var(--text-primary)]">{agent.name || 'Unknown'}</h3>
              <Badge variant={statusVariants[agent.status] || 'default'} size="sm" dot>
                {t(`agents.${agent.status}`) || agent.status}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
          {agent.description || ''}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--text-primary)]">
              {formatNumber(agent.sessionsCompleted || agent.sessions || 0)}
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.sessions')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-emerald-400">
              {agent.successRate || 0}%
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.successRate')}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-[var(--text-primary)]">
              {agent.avgResponseTime || 0}s
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{t('agents.avgResponse')}</div>
          </div>
        </div>

        {agent.capabilities && agent.capabilities.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {agent.capabilities.map((cap) => (
              <span
                key={cap}
                className="px-2 py-1 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
              >
                {cap}
              </span>
            ))}
          </div>
        )}
      </Card>
    </motion.div>
  );
};

const AgentListItem = ({ agent, t, index }) => {
  if (!agent) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
    >
      <Card hover className="p-4">
        <div className="flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{ backgroundColor: `${agent.color || '#6b7280'}20` }}
          >
            {agent.avatar || '🤖'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-[var(--text-primary)]">{agent.name || 'Unknown'}</h3>
              <Badge variant={statusVariants[agent.status] || 'default'} size="sm" dot>
                {t(`agents.${agent.status}`) || agent.status}
              </Badge>
            </div>
            <p className="text-sm text-[var(--text-tertiary)] truncate">{agent.description || ''}</p>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-medium text-[var(--text-primary)]">{formatNumber(agent.sessionsCompleted || agent.sessions || 0)}</div>
              <div className="text-xs text-[var(--text-tertiary)]">{t('agents.sessions')}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-emerald-400">{agent.successRate || 0}%</div>
              <div className="text-xs text-[var(--text-tertiary)]">{t('agents.successRate')}</div>
            </div>
            <div className="text-center">
              <div className="font-medium text-[var(--text-primary)]">{agent.avgResponseTime || 0}s</div>
              <div className="text-xs text-[var(--text-tertiary)]">{t('agents.avgResponse')}</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AgentGrid;
