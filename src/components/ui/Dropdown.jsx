import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Dropdown = ({
  trigger,
  items,
  align = 'start',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const alignments = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-[var(--z-dropdown)] mt-2 min-w-[180px]',
              'rounded-lg border border-[var(--border-primary)]',
              'bg-[var(--bg-elevated)] shadow-xl',
              alignments[align]
            )}
          >
            <div className="py-1">
              {items.map((item, index) => {
                if (item.divider) {
                  return (
                    <div
                      key={index}
                      className="my-1 border-t border-[var(--border-secondary)]"
                    />
                  );
                }
                if (item.label) {
                  return (
                    <div
                      key={index}
                      className="px-3 py-1.5 text-xs font-medium text-[var(--text-tertiary)] uppercase"
                    >
                      {item.label}
                    </div>
                  );
                }
                return (
                  <button
                    key={index}
                    onClick={() => {
                      item.onClick?.();
                      setIsOpen(false);
                    }}
                    disabled={item.disabled}
                    className={cn(
                      'w-full flex items-center gap-2 px-3 py-2 text-sm',
                      'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                      'hover:bg-[var(--bg-hover)] transition-colors',
                      'disabled:opacity-50 disabled:pointer-events-none',
                      item.active && 'text-[var(--accent-primary)] bg-[var(--accent-muted)]'
                    )}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    {item.label}
                    {item.shortcut && (
                      <span className="ml-auto text-xs text-[var(--text-tertiary)]">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
