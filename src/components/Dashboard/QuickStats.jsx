import { motion } from 'framer-motion';
import { ProgressRing } from '../ui/ProgressRing';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';

export const QuickStats = ({ t, systemMetrics, loading }) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('overview.quickStats')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-around">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="w-20 h-20 rounded-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = [
    { label: t('system.cpu'), value: systemMetrics?.cpu || 0 },
    { label: t('system.memory'), value: systemMetrics?.memory || 0 },
    { label: t('system.disk'), value: systemMetrics?.disk || 0 },
  ];

  const formatUptime = (seconds) => {
    if (!seconds) return '0d 0h';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    return `${days}d ${hours}h`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('overview.quickStats')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-around gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <ProgressRing
                value={stat.value}
                size={80}
                strokeWidth={6}
                label={stat.label}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional stats */}
        <div className="mt-6 pt-6 border-t border-[var(--border-secondary)] grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">
              {formatUptime(systemMetrics?.uptime)}
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              {t('system.uptime')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--text-primary)]">
              {systemMetrics?.requests?.success || 99}%
            </div>
            <div className="text-sm text-[var(--text-secondary)]">
              {t('system.healthy')}
            </div>
          </div>
        </div>

        {/* Network stats */}
        <div className="mt-4 pt-4 border-t border-[var(--border-secondary)]">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--text-secondary)]">{t('system.network')}</span>
            <div className="flex items-center gap-4">
              <span className="text-emerald-400">
                ↓ {systemMetrics?.network?.in || 0} MB/s
              </span>
              <span className="text-blue-400">
                ↑ {systemMetrics?.network?.out || 0} MB/s
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickStats;
