import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from 'lucide-react';
import { cn, formatRelativeTime } from '../../lib/utils';
import useAppStore from '../../stores/appStore';

const typeIcons = {
  info: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: AlertCircle,
};

const typeColors = {
  info: 'text-blue-400 bg-blue-500/20',
  success: 'text-emerald-400 bg-emerald-500/20',
  warning: 'text-amber-400 bg-amber-500/20',
  error: 'text-red-400 bg-red-500/20',
};

export const NotificationPanel = ({ t }) => {
  const { notificationsOpen, setNotificationsOpen } = useAppStore();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (notificationsOpen) {
      fetchNotifications();
    }
  }, [notificationsOpen]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      setNotifications(prev =>
        prev.map(n => n.id === id ? { ...n, read: true } : n)
      );
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const clearAll = async () => {
    try {
      await fetch('/api/notifications/clear', { method: 'POST' });
      setNotifications([]);
    } catch (error) {
      console.error('Failed to clear notifications:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[var(--z-overlay)]"
            onClick={() => setNotificationsOpen(false)}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed right-4 top-16 w-96 max-h-[70vh]',
              'bg-[var(--bg-elevated)] rounded-xl shadow-2xl',
              'border border-[var(--border-primary)]',
              'z-[var(--z-modal)] overflow-hidden',
              'flex flex-col'
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-secondary)]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-[var(--text-secondary)]" />
                <h3 className="font-medium text-[var(--text-primary)]">
                  {t('notifications.title')}
                </h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-[var(--accent-primary)] text-white">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={clearAll}
                    className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                    title={t('notifications.clearAll')}
                  >
                    <CheckCheck className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1.5 rounded-lg text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Notifications list */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="shimmer h-16 rounded-lg" />
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 mx-auto mb-3 text-[var(--text-tertiary)] opacity-50" />
                  <p className="text-[var(--text-secondary)]">
                    {t('notifications.noNotifications')}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border-secondary)]">
                  {notifications.map((notification) => {
                    const Icon = typeIcons[notification.type];
                    return (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          'flex gap-3 p-4',
                          !notification.read && 'bg-[var(--bg-hover)]'
                        )}
                      >
                        <div className={cn(
                          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
                          typeColors[notification.type]
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className={cn(
                              'text-sm font-medium',
                              notification.read
                                ? 'text-[var(--text-secondary)]'
                                : 'text-[var(--text-primary)]'
                            )}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="flex-shrink-0 p-1 rounded text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
                                title={t('notifications.markAsRead')}
                              >
                                <Check className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <p className="text-sm text-[var(--text-tertiary)] mt-0.5">
                            {notification.message}
                          </p>
                          <p className="text-xs text-[var(--text-tertiary)] mt-1">
                            {formatRelativeTime(notification.timestamp, t)}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
