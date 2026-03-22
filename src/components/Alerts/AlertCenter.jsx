import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { 
  AlertTriangle, XCircle, Info, CheckCircle, 
  Bell, BellOff, Clock, X, Eye, EyeOff,
  DollarSign, UserX, AlertOctagon
} from 'lucide-react';

const SEVERITY_CONFIG = {
  critical: {
    icon: AlertOctagon,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    badge: 'error',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    border: 'border-amber-500/30',
    badge: 'warning',
  },
  info: {
    icon: Info,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    border: 'border-blue-500/30',
    badge: 'info',
  },
};

const ALERT_TYPE_ICONS = {
  budget_exceeded: DollarSign,
  task_failed: XCircle,
  agent_unresponsive: UserX,
  default: AlertTriangle,
};

const AlertItem = ({ alert, onDismiss, onSnooze, t }) => {
  const severityConfig = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.info;
  const TypeIcon = ALERT_TYPE_ICONS[alert.type] || ALERT_TYPE_ICONS.default;
  const SeverityIcon = severityConfig.icon;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMin = Math.floor(diffMs / 60000);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHour < 24) return `${diffHour}h ago`;
    return `${diffDay}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className={cn(
        'rounded-lg border p-4 transition-all',
        severityConfig.border,
        alert.dismissed ? 'opacity-50' : 'bg-[var(--bg-elevated)]'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-2 rounded-lg', severityConfig.bg)}>
          <SeverityIcon className={cn('w-5 h-5', severityConfig.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-[var(--text-primary)]">{alert.title}</h4>
                <Badge variant={severityConfig.badge} size="sm">
                  {alert.severity}
                </Badge>
                {alert.dismissed && (
                  <Badge variant="default" size="sm">
                    <EyeOff className="w-3 h-3 mr-1" />
                    Dismissed
                  </Badge>
                )}
              </div>
              <p className="text-sm text-[var(--text-secondary)] mt-1">{alert.message}</p>
            </div>
            
            <div className="flex items-center gap-1">
              <TypeIcon className="w-4 h-4 text-[var(--text-tertiary)]" />
            </div>
          </div>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Clock className="w-3 h-3" />
              {formatTimestamp(alert.timestamp)}
            </div>
            {alert.source && (
              <span className="text-xs text-[var(--text-tertiary)]">
                Source: {alert.source}
              </span>
            )}
            {alert.agent && (
              <span className="text-xs text-[var(--text-tertiary)]">
                Agent: {alert.agent}
              </span>
            )}
          </div>

          {alert.details && (
            <div className="mt-2 p-2 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)]">
              {alert.details}
            </div>
          )}

          {!alert.dismissed && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onDismiss(alert.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Eye className="w-3 h-3" />
                {t('alerts.dismiss')}
              </button>
              <button
                onClick={() => onSnooze(alert.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors"
              >
                <Clock className="w-3 h-3" />
                Snooze 1h
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const AlertCountBadge = ({ alerts }) => {
  const criticalCount = alerts.filter(a => a.severity === 'critical' && !a.dismissed).length;
  const warningCount = alerts.filter(a => a.severity === 'warning' && !a.dismissed).length;
  const totalCount = alerts.filter(a => !a.dismissed).length;

  if (totalCount === 0) return null;

  return (
    <div className="flex items-center gap-2">
      {criticalCount > 0 && (
        <Badge variant="error" size="sm" className="animate-pulse">
          {criticalCount} critical
        </Badge>
      )}
      {warningCount > 0 && (
        <Badge variant="warning" size="sm">
          {warningCount} warning
        </Badge>
      )}
    </div>
  );
};

export const AlertCenter = ({ alerts = [], onDismiss, onSnooze, t, showHeader = true, maxHeight = '500px' }) => {
  const [filter, setFilter] = useState('all');
  const [showDismissed, setShowDismissed] = useState(false);

  const filteredAlerts = useMemo(() => {
    let filtered = [...alerts];

    if (!showDismissed) {
      filtered = filtered.filter(a => !a.dismissed);
    }

    if (filter !== 'all') {
      filtered = filtered.filter(a => a.severity === filter);
    }

    return filtered.sort((a, b) => {
      // Critical first, then by timestamp
      if (a.severity === 'critical' && b.severity !== 'critical') return -1;
      if (b.severity === 'critical' && a.severity !== 'critical') return 1;
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
  }, [alerts, filter, showDismissed]);

  const activeAlerts = alerts.filter(a => !a.dismissed);
  const criticalCount = activeAlerts.filter(a => a.severity === 'critical').length;

  const handleDismiss = (id) => {
    if (onDismiss) onDismiss(id);
  };

  const handleSnooze = (id) => {
    if (onSnooze) onSnooze(id);
  };

  const handleDismissAll = () => {
    activeAlerts.forEach(alert => handleDismiss(alert.id));
  };

  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CardTitle className="flex items-center gap-2">
                <Bell className={cn('w-5 h-5', criticalCount > 0 && 'text-red-400 animate-pulse')} />
                {t('alerts.title')}
              </CardTitle>
              <AlertCountBadge alerts={alerts} />
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowDismissed(!showDismissed)}
                className={cn(
                  'flex items-center gap-1 px-2 py-1 rounded text-xs',
                  'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
                  'transition-colors'
                )}
              >
                {showDismissed ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showDismissed ? 'Hide dismissed' : 'Show dismissed'}
              </button>
              
              {activeAlerts.length > 0 && (
                <button
                  onClick={handleDismissAll}
                  className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  <BellOff className="w-3 h-3" />
                  Dismiss all
                </button>
              )}
            </div>
          </div>
        </CardHeader>
      )}

      <CardContent className="p-0">
        {/* Filter pills */}
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex items-center gap-2">
          {['all', 'critical', 'warning', 'info'].map((severity) => (
            <button
              key={severity}
              onClick={() => setFilter(severity)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                filter === severity 
                  ? severity === 'critical' ? 'bg-red-500 text-white'
                    : severity === 'warning' ? 'bg-amber-500 text-white'
                    : severity === 'info' ? 'bg-blue-500 text-white'
                    : 'bg-[var(--accent-primary)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              )}
            >
              {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
              {severity !== 'all' && ` (${alerts.filter(a => a.severity === severity && !a.dismissed).length})`}
            </button>
          ))}
        </div>

        {/* Alert list */}
        <div 
          className="divide-y divide-[var(--border-secondary)] overflow-y-auto p-4 space-y-3"
          style={{ maxHeight }}
        >
          <AnimatePresence mode="popLayout">
            {filteredAlerts.length > 0 ? (
              filteredAlerts.map((alert) => (
                <AlertItem
                  key={alert.id}
                  alert={alert}
                  onDismiss={handleDismiss}
                  onSnooze={handleSnooze}
                  t={t}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-8 text-center text-[var(--text-tertiary)]"
              >
                <CheckCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('alerts.noAlerts')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlertCenter;
