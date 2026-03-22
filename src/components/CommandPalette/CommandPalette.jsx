import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  LayoutDashboard,
  MessageSquare,
  Bot,
  CheckSquare,
  Settings,
  Moon,
  Sun,
  Globe,
  Command,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import useAppStore from '../../stores/appStore';

export const CommandPalette = ({ t }) => {
  const navigate = useNavigate();
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    recentCommands,
    addRecentCommand,
  } = useAppStore();
  
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  // Command groups
  const commands = useMemo(() => [
    {
      id: 'navigation',
      label: t('commandPalette.navigation'),
      items: [
        { id: 'go-overview', label: t('nav.overview'), icon: LayoutDashboard, action: () => navigate('/'), shortcut: 'G O' },
        { id: 'go-sessions', label: t('nav.sessions'), icon: MessageSquare, action: () => navigate('/sessions'), shortcut: 'G S' },
        { id: 'go-agents', label: t('nav.agents'), icon: Bot, action: () => navigate('/agents'), shortcut: 'G A' },
        { id: 'go-tasks', label: t('nav.tasks'), icon: CheckSquare, action: () => navigate('/tasks'), shortcut: 'G T' },
        { id: 'go-settings', label: t('nav.settings'), icon: Settings, action: () => navigate('/settings'), shortcut: 'G ,' },
      ],
    },
    {
      id: 'actions',
      label: t('commandPalette.actions'),
      items: [
        { id: 'toggle-dark', label: t('shortcuts.toggleDark'), icon: Moon, action: () => document.documentElement.setAttribute('data-theme', 'dark') },
        { id: 'toggle-light', label: t('shortcuts.toggleLight'), icon: Sun, action: () => document.documentElement.setAttribute('data-theme', 'light') },
        { id: 'toggle-lang', label: t('commandPalette.switchLanguage'), icon: Globe, action: () => {} },
      ],
    },
  ], [t, navigate]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!query.trim()) return commands;
    
    const lowerQuery = query.toLowerCase();
    return commands.map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.label.toLowerCase().includes(lowerQuery)
      ),
    })).filter(group => group.items.length > 0);
  }, [commands, query]);

  // Flatten for keyboard navigation
  const flatItems = useMemo(() => 
    filteredCommands.flatMap(group => group.items),
    [filteredCommands]
  );

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!commandPaletteOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(i => (i + 1) % flatItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(i => (i - 1 + flatItems.length) % flatItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (flatItems[selectedIndex]) {
            executeCommand(flatItems[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          closePalette();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, selectedIndex, flatItems]);

  // Focus input when opened
  useEffect(() => {
    if (commandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [commandPaletteOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex];
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const executeCommand = (item) => {
    addRecentCommand(item.label);
    item.action();
    closePalette();
  };

  const closePalette = () => {
    setCommandPaletteOpen(false);
    setQuery('');
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[var(--z-overlay)]"
            onClick={closePalette}
          />

          {/* Command palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl',
              'bg-[var(--bg-elevated)] rounded-xl shadow-2xl',
              'border border-[var(--border-primary)]',
              'z-[var(--z-modal)] overflow-hidden'
            )}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 border-b border-[var(--border-secondary)]">
              <Search className="w-5 h-5 text-[var(--text-tertiary)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder={t('commandPalette.placeholder')}
                className={cn(
                  'flex-1 py-4 bg-transparent border-none outline-none',
                  'text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]'
                )}
              />
              <kbd className="kbd">ESC</kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-4 py-8 text-center text-[var(--text-tertiary)]">
                  {t('commandPalette.noResults')}
                </div>
              ) : (
                filteredCommands.map((group) => (
                  <div key={group.id}>
                    <div className="px-4 py-2 text-xs font-medium text-[var(--text-tertiary)] uppercase">
                      {group.label}
                    </div>
                    {group.items.map((item) => {
                      const globalIndex = flatItems.indexOf(item);
                      const isSelected = globalIndex === selectedIndex;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => executeCommand(item)}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                          className={cn(
                            'w-full flex items-center gap-3 px-4 py-2.5',
                            'transition-colors text-left',
                            isSelected
                              ? 'bg-[var(--accent-muted)] text-[var(--accent-primary)]'
                              : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                          )}
                        >
                          {item.icon && <item.icon className="w-4 h-4" />}
                          <span className="flex-1 text-sm">{item.label}</span>
                          {item.shortcut && (
                            <span className="text-xs text-[var(--text-tertiary)]">
                              {item.shortcut}
                            </span>
                          )}
                          {isSelected && <ArrowRight className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center gap-4 px-4 py-2 border-t border-[var(--border-secondary)] text-xs text-[var(--text-tertiary)]">
              <span className="flex items-center gap-1">
                <kbd className="kbd">↑↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="kbd">↵</kbd> Select
              </span>
              <span className="flex items-center gap-1">
                <kbd className="kbd">Esc</kbd> Close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
