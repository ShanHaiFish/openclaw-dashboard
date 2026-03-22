import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  CheckSquare,
  Settings,
  BarChart3,
  Activity,
  Bell,
  Package,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Logo } from '../ui/Logo';
import useAppStore from '../../stores/appStore';

const icons = {
  LayoutDashboard,
  MessageSquare,
  Bot,
  CheckSquare,
  Settings,
  BarChart3,
  Activity,
  Bell,
  Package,
};

const navItems = [
  { id: 'overview', path: '/', icon: 'LayoutDashboard', labelKey: 'nav.overview' },
  { id: 'sessions', path: '/sessions', icon: 'MessageSquare', labelKey: 'nav.sessions' },
  { id: 'agents', path: '/agents', icon: 'Bot', labelKey: 'nav.agents' },
  { id: 'tasks', path: '/tasks', icon: 'CheckSquare', labelKey: 'nav.tasks' },
  { id: 'analytics', path: '/analytics', icon: 'BarChart3', labelKey: 'nav.analytics' },
  { id: 'activity', path: '/activity', icon: 'Activity', labelKey: 'nav.activity' },
  { id: 'alerts', path: '/alerts', icon: 'Bell', labelKey: 'nav.alerts' },
  { id: 'skills', path: '/skills', icon: 'Package', labelKey: 'nav.skills' },
  { id: 'settings', path: '/settings', icon: 'Settings', labelKey: 'nav.settings' },
];

export const Sidebar = ({ t, collapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={cn(
        'hidden lg:flex flex-col h-screen sticky top-0',
        'bg-[var(--bg-secondary)] border-r border-[var(--border-secondary)]',
        'z-[var(--z-sticky)]'
      )}
    >
      {/* Logo */}
      <div className={cn(
        'flex items-center h-16 px-4 border-b border-[var(--border-secondary)]',
        collapsed ? 'justify-center' : 'justify-between'
      )}>
        <div className="flex items-center gap-3">
          <Logo size={32} />
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-semibold text-[var(--text-primary)]"
            >
              OpenClaw
            </motion.span>
          )}
        </div>
        <button
          onClick={onToggle}
          className={cn(
            'p-1.5 rounded-lg transition-colors',
            'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
            'hover:bg-[var(--bg-hover)]',
            collapsed && 'hidden'
          )}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = icons[item.icon];
          const active = isActive(item.path);

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg',
                'transition-all duration-150',
                'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                'hover:bg-[var(--bg-hover)]',
                active && [
                  'bg-[var(--accent-muted)] text-[var(--accent-primary)]',
                  'hover:bg-[var(--accent-muted)] hover:text-[var(--accent-primary)]',
                ],
                collapsed && 'justify-center px-2'
              )}
              title={collapsed ? t(item.labelKey) : undefined}
            >
              {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium"
                >
                  {t(item.labelKey)}
                </motion.span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle (when collapsed) */}
      {collapsed && (
        <div className="p-3 border-t border-[var(--border-secondary)]">
          <button
            onClick={onToggle}
            className={cn(
              'w-full flex items-center justify-center p-2 rounded-lg',
              'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]',
              'hover:bg-[var(--bg-hover)] transition-colors'
            )}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.aside>
  );
};

export default Sidebar;
