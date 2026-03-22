import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlertCenter from '../components/Alerts/AlertCenter';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  Bell, Settings, History, Shield,
  ToggleLeft, ToggleRight, Volume2, VolumeX
} from 'lucide-react';

export const AlertsPage = ({ t }) => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [preferences, setPreferences] = useState({
    criticalEnabled: true,
    warningEnabled: true,
    infoEnabled: true,
    soundEnabled: false,
    emailEnabled: false,
    pushEnabled: true,
  });

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await fetch('/api/alerts');
      const data = await response.json();
      setAlerts(data || []);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  const handleSnooze = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, snoozedUntil: new Date(Date.now() + 3600000).toISOString() } : alert
    ));
  };

  const togglePreference = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const alertStats = {
    total: alerts.length,
    active: alerts.filter(a => !a.dismissed).length,
    critical: alerts.filter(a => a.severity === 'critical' && !a.dismissed).length,
    warning: alerts.filter(a => a.severity === 'warning' && !a.dismissed).length,
    info: alerts.filter(a => a.severity === 'info' && !a.dismissed).length,
    dismissed: alerts.filter(a => a.dismissed).length,
  };

  const tabs = [
    { id: 'active', label: 'Active Alerts', icon: Bell, count: alertStats.active },
    { id: 'history', label: 'Alert History', icon: History, count: alertStats.dismissed },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {t('alerts.title')}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Monitor and manage system alerts
          </p>
        </div>
        <div className="flex items-center gap-2">
          {alertStats.critical > 0 && (
            <Badge variant="error" size="md" className="animate-pulse">
              {alertStats.critical} Critical
            </Badge>
          )}
          {alertStats.warning > 0 && (
            <Badge variant="warning" size="md">
              {alertStats.warning} Warning
            </Badge>
          )}
        </div>
      </motion.div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Alerts', value: alertStats.total, color: 'from-violet-500/20 to-purple-500/10' },
          { label: 'Active', value: alertStats.active, color: 'from-cyan-500/20 to-blue-500/10' },
          { label: 'Critical', value: alertStats.critical, color: 'from-red-500/20 to-pink-500/10' },
          { label: 'Dismissed', value: alertStats.dismissed, color: 'from-gray-500/20 to-slate-500/10' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br ${stat.color} p-4`}
          >
            <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
            <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-secondary)] pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && (
                <Badge 
                  variant={activeTab === tab.id ? 'default' : 'secondary'} 
                  size="sm"
                >
                  {tab.count}
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--border-primary)]" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-t-[var(--accent-primary)] animate-spin" />
            </div>
            <p className="text-sm text-[var(--text-tertiary)]">{t('common.loading')}</p>
          </div>
        </div>
      ) : (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'active' && (
            <AlertCenter
              alerts={alerts}
              onDismiss={handleDismiss}
              onSnooze={handleSnooze}
              t={t}
              showHeader={false}
              maxHeight="600px"
            />
          )}

          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Alert History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {alerts.filter(a => a.dismissed).length > 0 ? (
                  <div className="space-y-3">
                    {alerts.filter(a => a.dismissed).map((alert) => (
                      <div
                        key={alert.id}
                        className="p-4 rounded-lg border border-[var(--border-secondary)] bg-[var(--bg-secondary)] opacity-70"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-[var(--text-primary)]">{alert.title}</p>
                            <p className="text-sm text-[var(--text-secondary)] mt-1">{alert.message}</p>
                          </div>
                          <Badge variant="default" size="sm">Dismissed</Badge>
                        </div>
                        <p className="text-xs text-[var(--text-tertiary)] mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-[var(--text-tertiary)]">
                    <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No alert history</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {activeTab === 'settings' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Alert Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Alert Types */}
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">Alert Types</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'criticalEnabled', label: 'Critical Alerts', description: 'Budget exceeded, system failures' },
                        { key: 'warningEnabled', label: 'Warning Alerts', description: 'Approaching limits, performance issues' },
                        { key: 'infoEnabled', label: 'Info Alerts', description: 'Updates, milestones, general info' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                          <div>
                            <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                            <p className="text-xs text-[var(--text-tertiary)]">{item.description}</p>
                          </div>
                          <button
                            onClick={() => togglePreference(item.key)}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            {preferences[item.key] ? (
                              <ToggleRight className="w-8 h-8 text-[var(--accent-primary)]" />
                            ) : (
                              <ToggleLeft className="w-8 h-8" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification Methods */}
                  <div>
                    <h4 className="text-sm font-medium text-[var(--text-primary)] mb-4">Notification Methods</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'pushEnabled', label: 'Push Notifications', description: 'Browser push notifications' },
                        { key: 'soundEnabled', label: 'Sound Alerts', description: 'Play sound for new alerts' },
                        { key: 'emailEnabled', label: 'Email Notifications', description: 'Receive alerts via email' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-secondary)]">
                          <div className="flex items-center gap-3">
                            {item.key === 'soundEnabled' && (
                              preferences[item.key] ? <Volume2 className="w-4 h-4 text-[var(--text-secondary)]" /> : <VolumeX className="w-4 h-4 text-[var(--text-secondary)]" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
                              <p className="text-xs text-[var(--text-tertiary)]">{item.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => togglePreference(item.key)}
                            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                          >
                            {preferences[item.key] ? (
                              <ToggleRight className="w-8 h-8 text-[var(--accent-primary)]" />
                            ) : (
                              <ToggleLeft className="w-8 h-8" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AlertsPage;
