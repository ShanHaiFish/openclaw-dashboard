import { useState } from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export const Tabs = ({
  tabs,
  defaultTab,
  onChange,
  className,
  variant = 'default',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const variants = {
    default: {
      container: 'border-b border-[var(--border-secondary)]',
      tab: 'px-4 py-2.5 text-sm font-medium transition-colors relative',
      active: 'text-[var(--accent-primary)]',
      inactive: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    },
    pills: {
      container: 'bg-[var(--bg-secondary)] rounded-lg p-1',
      tab: 'px-4 py-2 text-sm font-medium rounded-md transition-all relative',
      active: 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm',
      inactive: 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
    },
  };

  const style = variants[variant];

  return (
    <div className={cn(style.container, className)}>
      <div className="flex gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              style.tab,
              activeTab === tab.id ? style.active : style.inactive
            )}
          >
            {tab.icon && <tab.icon className="w-4 h-4 mr-2 inline" />}
            {tab.label}
            {activeTab === tab.id && variant === 'default' && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent-primary)]"
                transition={{ duration: 0.2 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
