import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn, formatRelativeTime } from '../../lib/utils';
import { 
  Play, CheckCircle, AlertTriangle, XCircle, 
  Zap, Filter, RefreshCw, Clock, ChevronDown 
} from 'lucide-react';

const EVENT_TYPES = {
  session_start: {
    icon: Play,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/20',
    label: 'Session Started',
  },
  task_complete: {
    icon: CheckCircle,
    color: 'text-blue-400',
    bg: 'bg-blue-500/20',
    label: 'Task Completed',
  },
  error: {
    icon: XCircle,
    color: 'text-red-400',
    bg: 'bg-red-500/20',
    label: 'Error',
  },
  token_milestone: {
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-500/20',
    label: 'Token Milestone',
  },
  warning: {
    icon: AlertTriangle,
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    label: 'Warning',
  },
};

const EventItem = ({ event, t }) => {
  const config = EVENT_TYPES[event.type] || EVENT_TYPES.session_start;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
    >
      <div className={cn('p-2 rounded-lg', config.bg)}>
        <Icon className={cn('w-5 h-5', config.color)} />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-medium text-[var(--text-primary)]">{event.title}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-1">{event.description}</p>
          </div>
          <Badge variant={
            event.type === 'error' ? 'error' : 
            event.type === 'warning' ? 'warning' : 
            event.type === 'task_complete' ? 'success' : 'info'
          } size="sm">
            {config.label}
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
            <Clock className="w-3 h-3" />
            {formatRelativeTime(event.timestamp, t)}
          </div>
          {event.agent && (
            <span className="text-xs text-[var(--text-tertiary)]">
              Agent: {event.agent}
            </span>
          )}
          {event.session && (
            <span className="text-xs text-[var(--text-tertiary)]">
              Session: {event.session}
            </span>
          )}
        </div>

        {event.details && (
          <div className="mt-2 p-2 rounded bg-[var(--bg-secondary)] text-xs text-[var(--text-secondary)] font-mono">
            {event.details}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FilterDropdown = ({ value, onChange, options, label }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm',
          'bg-[var(--bg-secondary)] border border-[var(--border-secondary)]',
          'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
          'transition-colors'
        )}
      >
        <Filter className="w-4 h-4" />
        <span>{label}</span>
        <ChevronDown className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-secondary)] shadow-lg z-50"
          >
            <div className="p-2">
              <button
                onClick={() => { onChange('all'); setIsOpen(false); }}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm',
                  'hover:bg-[var(--bg-hover)] transition-colors',
                  value === 'all' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                )}
              >
                All Events
              </button>
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={cn(
                    'w-full text-left px-3 py-2 rounded-md text-sm',
                    'hover:bg-[var(--bg-hover)] transition-colors',
                    value === option.value ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const ActivityFeed = ({ events = [], t, showFilters = true, maxHeight = '600px' }) => {
  const [typeFilter, setTypeFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');

  const filterOptions = useMemo(() => [
    { value: 'session_start', label: 'Session Started' },
    { value: 'task_complete', label: 'Task Completed' },
    { value: 'error', label: 'Error' },
    { value: 'token_milestone', label: 'Token Milestone' },
    { value: 'warning', label: 'Warning' },
  ], []);

  const timeOptions = useMemo(() => [
    { value: '1h', label: 'Last Hour' },
    { value: '6h', label: 'Last 6 Hours' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
  ], []);

  const filteredEvents = useMemo(() => {
    let filtered = [...events];

    if (typeFilter !== 'all') {
      filtered = filtered.filter(e => e.type === typeFilter);
    }

    if (timeFilter !== 'all') {
      const now = new Date();
      const cutoff = new Date();
      
      switch (timeFilter) {
        case '1h':
          cutoff.setHours(now.getHours() - 1);
          break;
        case '6h':
          cutoff.setHours(now.getHours() - 6);
          break;
        case '24h':
          cutoff.setDate(now.getDate() - 1);
          break;
        case '7d':
          cutoff.setDate(now.getDate() - 7);
          break;
      }

      filtered = filtered.filter(e => new Date(e.timestamp) >= cutoff);
    }

    return filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }, [events, typeFilter, timeFilter]);

  const eventCounts = useMemo(() => {
    const counts = { all: events.length };
    events.forEach(event => {
      counts[event.type] = (counts[event.type] || 0) + 1;
    });
    return counts;
  }, [events]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            {t('activity.title')}
            <Badge variant="default" size="sm">{filteredEvents.length}</Badge>
          </CardTitle>
          
          {showFilters && (
            <div className="flex items-center gap-2">
              <FilterDropdown
                value={typeFilter}
                onChange={setTypeFilter}
                options={filterOptions}
                label={typeFilter === 'all' ? 'All Types' : filterOptions.find(o => o.value === typeFilter)?.label}
              />
              <FilterDropdown
                value={timeFilter}
                onChange={setTimeFilter}
                options={timeOptions}
                label={timeOptions.find(o => o.value === timeFilter)?.label || 'Time Range'}
              />
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Event type pills */}
        <div className="px-4 py-3 border-b border-[var(--border-secondary)] flex flex-wrap gap-2">
          <button
            onClick={() => setTypeFilter('all')}
            className={cn(
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              typeFilter === 'all' 
                ? 'bg-[var(--accent-primary)] text-white' 
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            )}
          >
            All ({eventCounts.all})
          </button>
          {Object.entries(EVENT_TYPES).map(([key, config]) => (
            <button
              key={key}
              onClick={() => setTypeFilter(key)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors',
                typeFilter === key 
                  ? 'bg-[var(--accent-primary)] text-white' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
              )}
            >
              {config.label} ({eventCounts[key] || 0})
            </button>
          ))}
        </div>

        {/* Event list */}
        <div 
          className="divide-y divide-[var(--border-secondary)] overflow-y-auto"
          style={{ maxHeight }}
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.length > 0 ? (
              filteredEvents.map((event, index) => (
                <EventItem key={event.id || index} event={event} t={t} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center text-[var(--text-tertiary)]"
              >
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t('activity.noActivity')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
