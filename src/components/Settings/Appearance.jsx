import { motion } from 'framer-motion';
import { Sun, Moon, Monitor, Circle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';
import { THEMES, ACCENT_COLORS } from '../../lib/constants';

const themeIcons = {
  dark: Moon,
  light: Sun,
  amoled: Circle,
  system: Monitor,
};

export const Appearance = ({ t, theme, setTheme, lang, setLang }) => {
  return (
    <div className="space-y-6">
      {/* Theme selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.theme')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {THEMES.map((themeOption) => {
              const Icon = themeIcons[themeOption.id];
              const isActive = theme === themeOption.id;

              return (
                <motion.button
                  key={themeOption.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme(themeOption.id)}
                  className={cn(
                    'relative flex flex-col items-center gap-3 p-4 rounded-xl',
                    'border-2 transition-all',
                    isActive
                      ? 'border-[var(--accent-primary)] bg-[var(--accent-muted)]'
                      : 'border-[var(--border-secondary)] hover:border-[var(--border-primary)]'
                  )}
                >
                  <div className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center',
                    isActive ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={cn(
                    'text-sm font-medium',
                    isActive ? 'text-[var(--accent-primary)]' : 'text-[var(--text-secondary)]'
                  )}>
                    {t(themeOption.label)}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="theme-indicator"
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent-primary)] flex items-center justify-center"
                    >
                      <span className="text-[10px] text-white">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Language selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.language')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLang('en')}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                lang === 'en'
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-muted)]'
                  : 'border-[var(--border-secondary)] hover:border-[var(--border-primary)]'
              )}
            >
              <span className="text-2xl">🇺🇸</span>
              <div className="text-left">
                <div className={cn(
                  'font-medium',
                  lang === 'en' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
                )}>
                  English
                </div>
                <div className="text-sm text-[var(--text-tertiary)]">English (US)</div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setLang('zh')}
              className={cn(
                'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
                lang === 'zh'
                  ? 'border-[var(--accent-primary)] bg-[var(--accent-muted)]'
                  : 'border-[var(--border-secondary)] hover:border-[var(--border-primary)]'
              )}
            >
              <span className="text-2xl">🇨🇳</span>
              <div className="text-left">
                <div className={cn(
                  'font-medium',
                  lang === 'zh' ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'
                )}>
                  中文
                </div>
                <div className="text-sm text-[var(--text-tertiary)]">简体中文</div>
              </div>
            </motion.button>
          </div>
        </CardContent>
      </Card>

      {/* Accent color */}
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.accentColor')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {ACCENT_COLORS.map((color) => (
              <motion.button
                key={color.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'w-10 h-10 rounded-full transition-all',
                  'ring-2 ring-offset-2 ring-offset-[var(--bg-elevated)]'
                )}
                style={{
                  backgroundColor: color.id,
                  ringColor: color.id,
                }}
                title={color.name}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Appearance;
