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
} from 'lucide-react';
import { cn } from '../../lib/utils';

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
  { id: 'skills', path: '/skills', icon: 'Package', labelKey: 'nav.skills' },
  { id: 'alerts', path: '/alerts', icon: 'Bell', labelKey: 'nav.alerts' },
  { id: 'settings', path: '/settings', icon: 'Settings', labelKey: 'nav.settings' },
];

export const MobileNav = ({ t }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="mobile-nav flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = icons[item.icon];
        const active = isActive(item.path);

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={cn(
              'flex flex-col items-center gap-1 p-2 rounded-lg',
              'transition-colors min-w-[60px]',
              active
                ? 'text-[var(--accent-primary)]'
                : 'text-[var(--text-tertiary)]'
            )}
          >
            {Icon && <Icon className="w-5 h-5" />}
            <span className="text-[10px] font-medium">{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
