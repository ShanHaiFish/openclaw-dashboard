import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Globe, Bell, Keyboard, Info } from 'lucide-react';
import Card from '../ui/Card';
import Tabs from '../ui/Tabs';
import Appearance from './Appearance';
import Notifications from './Notifications';
import Shortcuts from './Shortcuts';
import About from './About';
import { cn } from '../../lib/utils';

export const SettingsPage = ({ t, theme, setTheme, lang, setLang }) => {
  const [activeTab, setActiveTab] = useState('appearance');

  const tabs = [
    { id: 'appearance', label: t('settings.appearance'), icon: Palette },
    { id: 'notifications', label: t('settings.notifications'), icon: Bell },
    { id: 'shortcuts', label: t('settings.shortcuts'), icon: Keyboard },
    { id: 'about', label: t('settings.about'), icon: Info },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
          {t('settings.title')}
        </h1>

        <Tabs
          tabs={tabs}
          defaultTab={activeTab}
          onChange={setActiveTab}
          className="mb-6"
        />

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'appearance' && (
            <Appearance t={t} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
          )}
          {activeTab === 'notifications' && <Notifications t={t} />}
          {activeTab === 'shortcuts' && <Shortcuts t={t} />}
          {activeTab === 'about' && <About t={t} />}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
