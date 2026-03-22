import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  MessageSquare,
  Clock,
  Hash,
  User,
  Calendar,
  Tag,
  Bot,
} from 'lucide-react';
import Badge from '../ui/Badge';
import { StatusDot } from '../ui/StatusDot';
import { Skeleton } from '../ui/Skeleton';
import { cn, formatRelativeTime, formatDuration, formatNumber } from '../../lib/utils';

const statusVariants = {
  active: 'success',
  idle: 'warning',
  error: 'error',
  completed: 'info',
};

export const SessionDetail = ({ session, onClose, t }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.id) {
      fetchSessionDetail();
    }
  }, [session?.id]);

  const fetchSessionDetail = async () => {
    try {
      const response = await fetch(`/api/sessions/${session.id}`);
      const data = await response.json();
      setDetail(data);
    } catch (error) {
      console.error('Failed to fetch session detail:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[var(--z-modal)]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 100 }}
        className={cn(
          'fixed right-0 top-0 bottom-0 w-full max-w-lg',
          'bg-[var(--bg-elevated)] border-l border-[var(--border-primary)]',
          'z-[var(--z-modal)] overflow-hidden flex flex-col'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-secondary)]">
          <div className="flex items-center gap-3">
            <StatusDot status={session.status} pulse />
            <Badge variant={statusVariants[session.status]}>
              {t(`sessions.${session.status}`)}
            </Badge>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-32" />
            </div>
          ) : (
            <div className="p-6">
              {/* Title */}
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                {detail?.name || session.name}
              </h2>

              {/* Meta info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Hash className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">Model:</span>
                  <span className="font-mono text-[var(--text-primary)]">{detail?.model || session.model}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageSquare className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">Messages:</span>
                  <span className="text-[var(--text-primary)]">{formatNumber(detail?.messages || session.messages)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">Duration:</span>
                  <span className="text-[var(--text-primary)]">{formatDuration(detail?.duration || session.duration)}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-[var(--text-tertiary)]" />
                  <span className="text-[var(--text-secondary)]">Created:</span>
                  <span className="text-[var(--text-primary)]">{formatRelativeTime(detail?.createdAt || session.createdAt, t)}</span>
                </div>
                {detail?.agentId && (
                  <div className="flex items-center gap-3 text-sm">
                    <Bot className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span className="text-[var(--text-secondary)]">Agent:</span>
                    <span className="text-[var(--text-primary)]">{detail.agentId}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {(detail?.tags || session.tags) && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-[var(--text-tertiary)]" />
                    <span className="text-sm text-[var(--text-secondary)]">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(detail?.tags || session.tags).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm rounded-full bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Message history */}
              {detail?.history && detail.history.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3">
                    Recent Messages
                  </h3>
                  <div className="space-y-3">
                    {detail.history.slice(0, 10).map((msg, i) => (
                      <div
                        key={msg.id}
                        className={cn(
                          'p-3 rounded-lg text-sm',
                          msg.role === 'user'
                            ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] ml-4'
                            : 'bg-[var(--accent-muted)] text-[var(--text-primary)] mr-4'
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-[var(--text-tertiary)]">
                            {msg.role === 'user' ? 'User' : 'Assistant'}
                          </span>
                        </div>
                        <p className="text-[var(--text-secondary)]">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SessionDetail;
