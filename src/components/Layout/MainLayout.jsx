import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandPalette from '../CommandPalette/CommandPalette';
import NotificationPanel from '../Notifications/NotificationPanel';
import MobileNav from './MobileNav';
import useAppStore from '../../stores/appStore';

export const MainLayout = ({ t, theme, onToggleTheme, lang, onToggleLang }) => {
  const navigate = useNavigate();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1023px)');

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)]">
      {/* Sidebar */}
      <Sidebar
        t={t}
        collapsed={sidebarCollapsed || isTablet}
        onToggle={toggleSidebar}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          t={t}
          theme={theme}
          onToggleTheme={onToggleTheme}
          lang={lang}
          onToggleLang={onToggleLang}
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>

        {/* Mobile bottom navigation */}
        {isMobile && <MobileNav t={t} />}
      </div>

      {/* Command Palette */}
      <CommandPalette t={t} />

      {/* Notification Panel */}
      <NotificationPanel t={t} />
    </div>
  );
};

export default MainLayout;
