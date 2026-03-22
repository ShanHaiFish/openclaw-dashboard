import { useState } from 'react';
import { motion } from 'framer-motion';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { cn } from '../../lib/utils';

const Toggle = ({ checked, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <div className="text-sm font-medium text-[var(--text-primary)]">{label}</div>
        {description && (
          <div className="text-xs text-[var(--text-tertiary)] mt-0.5">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors',
          checked ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-tertiary)]'
        )}
      >
        <motion.div
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
        />
      </button>
    </div>
  );
};

export const Notifications = ({ t }) => {
  const [settings, setSettings] = useState({
    enabled: true,
    email: false,
    push: true,
    info: true,
    success: true,
    warning: true,
    error: true,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('settings.notificationTypes')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Toggle
              label={t('settings.enableNotifications')}
              description="Receive notifications for important events"
              checked={settings.enabled}
              onChange={(v) => updateSetting('enabled', v)}
            />
            <Toggle
              label={t('settings.emailNotifications')}
              description="Receive notifications via email"
              checked={settings.email}
              onChange={(v) => updateSetting('email', v)}
            />
            <Toggle
              label={t('settings.pushNotifications')}
              description="Receive push notifications in browser"
              checked={settings.push}
              onChange={(v) => updateSetting('push', v)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Toggle
              label="Info"
              description="General information and updates"
              checked={settings.info}
              onChange={(v) => updateSetting('info', v)}
            />
            <Toggle
              label="Success"
              description="Successful operations and completions"
              checked={settings.success}
              onChange={(v) => updateSetting('success', v)}
            />
            <Toggle
              label="Warning"
              description="Warnings that need attention"
              checked={settings.warning}
              onChange={(v) => updateSetting('warning', v)}
            />
            <Toggle
              label="Error"
              description="Errors and failures"
              checked={settings.error}
              onChange={(v) => updateSetting('error', v)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
