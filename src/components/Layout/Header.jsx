import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Command,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import useAppStore from '../../stores/appStore';
import { StatusDot } from '../ui/StatusDot';

export const Header = ({ t, theme, onToggleTheme, lang, onToggleLang, onToggleSidebar, isMobile }) => {
  const { toggleCommandPalette, toggleNotifications, notificationsOpen } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn(
      'h-16 flex items-center justify-between px-4 lg:px-6',
      'bg-[var(--bg-secondary)]/80 backdrop-blur-lg',
      'border-b border-[var(--border-secondary)]',
      'sticky top-0 z-[var(--z-sticky)]'
    )}>
      {/* Left side */}
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)] lg:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
        
        {/* Search button */}
        <button
          onClick={toggleCommandPalette}
          className={cn(
            'flex items-center gap-3 px-4 py-2 rounded-lg',
            'bg-[var(--bg-tertiary)] border border-[var(--border-primary)]',
            'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
            'transition-colors w-64 lg:w-80'
          )}
        >
          <Search className="w-4 h-4" />
          <span className="text-sm flex-1 text-left">{t('commandPalette.placeholder')}</span>
          <kbd className="hidden sm:inline-flex kbd">⌘K</kbd>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Connection status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-tertiary)]">
          <StatusDot status="online" pulse />
          <span className="text-xs text-[var(--text-secondary)]">Connected</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'hover:bg-[var(--bg-hover)]'
          )}
          title={t('commandPalette.toggleTheme')}
        >
          {theme === 'dark' || theme === 'amoled' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>

        {/* Language toggle */}
        <button
          onClick={onToggleLang}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'hover:bg-[var(--bg-hover)]'
          )}
          title={t('commandPalette.switchLanguage')}
        >
          <Globe className="w-5 h-5" />
        </button>

        {/* Notifications */}
        <button
          onClick={toggleNotifications}
          className={cn(
            'relative p-2 rounded-lg transition-colors',
            'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
            'hover:bg-[var(--bg-hover)]',
            notificationsOpen && 'bg-[var(--bg-hover)]'
          )}
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        </button>

        {/* Command palette hint (desktop) */}
        <button
          onClick={toggleCommandPalette}
          className={cn(
            'hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg',
            'text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]',
            'hover:bg-[var(--bg-hover)] transition-colors'
          )}
        >
          <Command className="w-4 h-4" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-16 left-0 right-0 bg-[var(--bg-elevated)] border-b border-[var(--border-secondary)] p-4 lg:hidden"
          >
            <nav className="space-y-2">
              {['overview', 'sessions', 'agents', 'tasks', 'settings'].map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    // Navigate would be handled by parent
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
                >
                  {t(`nav.${item}`)}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
