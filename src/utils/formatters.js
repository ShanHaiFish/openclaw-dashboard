/**
 * Format a date to a readable string
 */
export function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date to time string
 */
export function formatTime(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Format a date to relative time (e.g., "2 minutes ago")
 */
export function formatRelativeTime(date) {
  if (!date) return '-';
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return formatDate(date);
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Format uptime in seconds to human readable string
 */
export function formatUptime(seconds) {
  if (!seconds) return '-';
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/**
 * Format a number with commas
 */
export function formatNumber(num) {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString('en-US');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text, length = 50) {
  if (!text) return '';
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
}

/**
 * Get status color class
 */
export function getStatusColor(status) {
  switch (status) {
    case 'active':
    case 'running':
      return 'status-active';
    case 'idle':
    case 'pending':
      return 'status-idle';
    case 'error':
    case 'failed':
      return 'status-error';
    default:
      return 'status-offline';
  }
}

/**
 * Get badge class for status
 */
export function getStatusBadge(status) {
  switch (status) {
    case 'active':
    case 'running':
      return 'badge-green';
    case 'idle':
    case 'pending':
      return 'badge-yellow';
    case 'error':
    case 'failed':
      return 'badge-red';
    default:
      return 'badge-blue';
  }
}
