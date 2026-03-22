import { clsx } from 'clsx';

// Combine class names conditionally
export const cn = (...inputs) => clsx(inputs);

// Format number with abbreviation
export const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Format duration in seconds to human readable
export const formatDuration = (seconds) => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Format relative time
export const formatRelativeTime = (dateString, t) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return t('time.now');
  if (diffMin === 1) return t('time.minuteAgo');
  if (diffMin < 60) return t('time.minutesAgo', { n: diffMin });
  if (diffHour === 1) return t('time.hourAgo');
  if (diffHour < 24) return t('time.hoursAgo', { n: diffHour });
  if (diffDay === 1) return t('time.dayAgo');
  return t('time.daysAgo', { n: diffDay });
};

// Truncate text
export const truncate = (str, length = 50) => {
  if (!str || str.length <= length) return str;
  return str.slice(0, length) + '...';
};

// Generate random ID
export const generateId = () => {
  return Math.random().toString(36).substring(2, 11);
};

// Debounce function
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Throttle function
export const throttle = (fn, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    active: 'bg-emerald-500',
    online: 'bg-emerald-500',
    idle: 'bg-amber-500',
    offline: 'bg-gray-500',
    error: 'bg-red-500',
    completed: 'bg-blue-500',
    'in-progress': 'bg-blue-500',
    review: 'bg-purple-500',
    todo: 'bg-gray-400',
  };
  return colors[status] || 'bg-gray-500';
};

// Get priority color
export const getPriorityColor = (priority) => {
  const colors = {
    low: 'text-gray-400',
    medium: 'text-amber-400',
    high: 'text-orange-400',
    critical: 'text-red-400',
  };
  return colors[priority] || 'text-gray-400';
};

// Get notification type color
export const getNotificationColor = (type) => {
  const colors = {
    info: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
  };
  return colors[type] || 'bg-gray-500';
};
