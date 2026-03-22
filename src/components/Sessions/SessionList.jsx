import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpDown, ChevronRight } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { SkeletonTable } from '../ui/Skeleton';
import EmptyState from '../ui/EmptyState';
import { StatusDot } from '../ui/StatusDot';
import { cn, formatRelativeTime, formatDuration, formatNumber } from '../../lib/utils';

const statusVariants = {
  active: 'success',
  idle: 'warning',
  error: 'error',
  completed: 'info',
};

export const SessionList = ({ t, onSelectSession }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('lastActivity');
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSessions();
  }, [page, search, statusFilter]);

  const fetchSessions = async () => {
    try {
      const params = new URLSearchParams({
        page,
        limit: 10,
        ...(search && { search }),
        ...(statusFilter && { status: statusFilter }),
      });
      const response = await fetch(`/api/sessions?${params}`);
      const data = await response.json();
      // Handle both possible response formats
      const sessionList = data.sessions || data.data || [];
      setSessions(Array.isArray(sessionList) ? sessionList : []);
    } catch (error) {
      console.error('Failed to fetch sessions:', error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSessions = sessions
    .filter(s => !search || s.name.toLowerCase().includes(search.toLowerCase()))
    .filter(s => !statusFilter || s.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'lastActivity') {
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      }
      if (sortBy === 'messages') return b.messages - a.messages;
      if (sortBy === 'created') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  if (loading) {
    return <SkeletonTable rows={5} cols={6} />;
  }

  return (
    <div className="space-y-4">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            icon={Search}
            placeholder={t('sessions.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm',
              'bg-[var(--bg-secondary)] border border-[var(--border-primary)]',
              'text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]'
            )}
          >
            <option value="">{t('common.all')}</option>
            <option value="active">{t('sessions.active')}</option>
            <option value="idle">{t('sessions.idle')}</option>
            <option value="error">{t('sessions.error')}</option>
            <option value="completed">{t('sessions.completed')}</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm',
              'bg-[var(--bg-secondary)] border border-[var(--border-primary)]',
              'text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]'
            )}
          >
            <option value="lastActivity">{t('sessions.lastActivity')}</option>
            <option value="created">{t('sessions.created')}</option>
            <option value="messages">{t('sessions.messages')}</option>
          </select>
        </div>
      </div>

      {/* Sessions table */}
      {filteredSessions.length === 0 ? (
        <EmptyState
          type="search"
          title={t('sessions.noSessions')}
          description="Try adjusting your search or filters"
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-secondary)]">
                  <th className="text-left px-6 py-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">
                    {t('sessions.title')}
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">
                    {t('sessions.status')}
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-[var(--text-tertiary)] uppercase">
                    {t('sessions.model')}
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden md:table-cell">
                    {t('sessions.messages')}
                  </th>
                  <th className="text-left px-4 py-4 text-xs font-medium text-[var(--text-tertiary)] uppercase hidden lg:table-cell">
                    {t('sessions.lastActivity')}
                  </th>
                  <th className="px-4 py-4"></th>
                </tr>
              </thead>
              <tbody>
                {filteredSessions.map((session, index) => (
                  <motion.tr
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    onClick={() => onSelectSession(session)}
                    className={cn(
                      'border-b border-[var(--border-secondary)] last:border-0',
                      'hover:bg-[var(--bg-hover)] cursor-pointer transition-colors'
                    )}
                  >
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {session.name}
                        </p>
                        <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                          {session.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant={statusVariants[session.status]} dot>
                        {t(`sessions.${session.status}`)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-[var(--text-secondary)] font-mono">
                        {session.model}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {formatNumber(session.messages)}
                      </span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {formatRelativeTime(session.lastActivity, t)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <ChevronRight className="w-4 h-4 text-[var(--text-tertiary)]" />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border-secondary)]">
            <span className="text-sm text-[var(--text-secondary)]">
              Page {page}
            </span>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                {t('common.previous')}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setPage(p => p + 1)}
                disabled={filteredSessions.length < 10}
              >
                {t('common.next')}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SessionList;
