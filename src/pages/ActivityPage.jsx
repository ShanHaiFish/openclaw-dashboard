import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActivityFeed from '../components/Activity/ActivityFeed';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Clock, Calendar, Filter, BarChart3,
  Play, CheckCircle, XCircle, Zap
} from 'lucide-react';

export const ActivityPage = ({ t }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    fetchActivity();
  }, [timeRange]);

  const fetchActivity = async () => {
    try {
      const response = await fetch('/api/activity');
      const data = await response.json();
      setEvents(data || []);
    } catch (error) {
      console.error('Failed to fetch activity:', error);
    } finally {
      setLoading(false);
    }
  };

  const timeRanges = [
    { id: '1h', label: '1 Hour' },
    { id: '6h', label: '6 Hours' },
    { id: '24h', label: '24 Hours' },
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
  ];

  const eventStats = {
    total: events.length,
    sessionStart: events.filter(e => e.type === 'session_start').length,
    taskComplete: events.filter(e => e.type === 'task_complete').length,
    errors: events.filter(e => e.type === 'error').length,
    milestones: events.filter(e => e.type === 'token_milestone').length,
  };

  const statCards = [
    { 
      label: 'Total Events', 
      value: eventStats.total, 
      icon: BarChart3,
      color: 'from-violet-500/20 to-purple-500/10' 
    },
    { 
      label: 'Sessions Started', 
      value: eventStats.sessionStart, 
      icon: Play,
      color: 'from-emerald-500/20 to-green-500/10' 
    },
    { 
      label: 'Tasks Completed', 
      value: eventStats.taskComplete, 
      icon: CheckCircle,
      color: 'from-blue-500/20 to-cyan-500/10' 
    },
    { 
      label: 'Errors', 
      value: eventStats.errors, 
      icon: XCircle,
      color: 'from-red-500/20 to-pink-500/10' 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {t('activity.title')}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Monitor system events and activity in real-time
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm" className="animate-pulse">
            ● Live
          </Badge>
        </div>
      </motion.div>

      {/* Time range selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-[var(--text-secondary)] mr-2">Time Range:</span>
        {timeRanges.map((range) => (
          <button
            key={range.id}
            onClick={() => setTimeRange(range.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeRange === range.id
                ? 'bg-[var(--accent-primary)] text-white'
                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br ${stat.color} p-4`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{stat.value}</p>
                </div>
                <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Activity Feed */}
      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--border-primary)]" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-[var(--accent-primary)] animate-spin" />
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">{t('common.loading')}</p>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ActivityFeed
            events={events}
            t={t}
            showFilters={true}
            maxHeight="700px"
          />
        </motion.div>
      )}

      {/* Timeline Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Activity Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[var(--border-secondary)]" />
              
              {/* Timeline events */}
              <div className="space-y-6">
                {events.slice(0, 10).map((event, index) => {
                  const typeColors = {
                    session_start: 'bg-emerald-500',
                    task_complete: 'bg-blue-500',
                    error: 'bg-red-500',
                    token_milestone: 'bg-amber-500',
                    warning: 'bg-yellow-500',
                  };

                  return (
                    <motion.div
                      key={event.id || index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative pl-10"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-2.5 w-3 h-3 rounded-full ${typeColors[event.type] || 'bg-gray-500'} ring-4 ring-[var(--bg-primary)]`} />
                      
                      <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-secondary)]">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-medium text-[var(--text-primary)] text-sm">{event.title}</p>
                            <p className="text-xs text-[var(--text-secondary)] mt-1">{event.description}</p>
                          </div>
                          <span className="text-xs text-[var(--text-tertiary)] whitespace-nowrap">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ActivityPage;
