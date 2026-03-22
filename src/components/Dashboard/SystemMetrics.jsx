import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Network, RefreshCw } from 'lucide-react';

// Animated circular progress for CPU
const CircularProgress = ({ value, size = 120, strokeWidth = 8, color, label, icon: Icon }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--bg-tertiary)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {Icon && <Icon className="w-5 h-5 text-[var(--text-tertiary)] mb-1" />}
          <motion.span
            className="text-2xl font-bold text-[var(--text-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(animatedValue)}%
          </motion.span>
        </div>
      </div>
      <span className="mt-2 text-sm text-[var(--text-secondary)]">{label}</span>
    </div>
  );
};

// Animated progress bar
const ProgressBar = ({ value, label, icon: Icon, color }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-[var(--text-tertiary)]" />}
          <span className="text-sm text-[var(--text-secondary)]">{label}</span>
        </div>
        <motion.span
          className="text-sm font-medium text-[var(--text-primary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(animatedValue)}%
        </motion.span>
      </div>
      <div className="h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

// Network I/O display
const NetworkIO = ({ inValue, outValue }) => {
  const [animatedIn, setAnimatedIn] = useState(0);
  const [animatedOut, setAnimatedOut] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedIn(inValue);
      setAnimatedOut(outValue);
    }, 100);
    return () => clearTimeout(timer);
  }, [inValue, outValue]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Network className="w-4 h-4 text-[var(--text-tertiary)]" />
        <span className="text-sm text-[var(--text-secondary)]">Network I/O</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-[var(--bg-tertiary)]/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-green-500">↓ IN</span>
          </div>
          <motion.span
            className="text-lg font-semibold text-[var(--text-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(animatedIn)} MB/s
          </motion.span>
        </div>
        <div className="p-3 bg-[var(--bg-tertiary)]/50 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-blue-500">↑ OUT</span>
          </div>
          <motion.span
            className="text-lg font-semibold text-[var(--text-primary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {Math.round(animatedOut)} MB/s
          </motion.span>
        </div>
      </div>
    </div>
  );
};

// Format uptime
const formatUptime = (seconds) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

const SystemMetrics = ({ t, metrics }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent-primary)]" />
      </div>
    );
  }

  // Determine color based on value
  const getColor = (value) => {
    if (value >= 90) return '#ef4444'; // red
    if (value >= 70) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
          {t('system.cpu').split(' ')[0] || 'System'} Metrics
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          className="p-2 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] transition-colors"
        >
          <RefreshCw className={`w-4 h-4 text-[var(--text-secondary)] ${isRefreshing ? 'animate-spin' : ''}`} />
        </motion.button>
      </div>

      {/* CPU Gauge */}
      <div className="flex justify-center py-4">
        <CircularProgress
          value={metrics.cpu}
          label={t('system.cpu')}
          icon={Cpu}
          color={getColor(metrics.cpu)}
        />
      </div>

      {/* Memory & Disk Bars */}
      <div className="space-y-4 p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)]">
        <ProgressBar
          value={metrics.memory}
          label={t('system.memory')}
          icon={MemoryStick}
          color={getColor(metrics.memory)}
        />
        <ProgressBar
          value={metrics.disk}
          label={t('system.disk')}
          icon={HardDrive}
          color={getColor(metrics.disk)}
        />
      </div>

      {/* Network I/O */}
      <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)]">
        <NetworkIO inValue={metrics.network?.in || 0} outValue={metrics.network?.out || 0} />
      </div>

      {/* Uptime & Requests */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)]">
          <span className="text-xs text-[var(--text-tertiary)]">{t('system.uptime')}</span>
          <p className="text-lg font-semibold text-[var(--text-primary)] mt-1">
            {formatUptime(metrics.uptime || 0)}
          </p>
        </div>
        <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-primary)]">
          <span className="text-xs text-[var(--text-tertiary)]">Success Rate</span>
          <p className="text-lg font-semibold text-green-500 mt-1">
            {metrics.requests?.success || 98.5}%
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SystemMetrics;
