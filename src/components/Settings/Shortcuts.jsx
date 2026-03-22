import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { KEYBOARD_SHORTCUTS } from '../../lib/constants';

export const Shortcuts = ({ t }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('shortcuts.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
            <motion.div
              key={shortcut.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center justify-between py-2 border-b border-[var(--border-secondary)] last:border-0"
            >
              <span className="text-sm text-[var(--text-secondary)]">
                {t(shortcut.label)}
              </span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-[var(--text-tertiary)] mx-1">then</span>}
                    <kbd className="kbd">{key}</kbd>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Shortcuts;
