import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import OverviewCards from '../components/Dashboard/OverviewCards';
import ActivityChart from '../components/Dashboard/ActivityChart';
import SessionHeatmap from '../components/Dashboard/SessionHeatmap';
import TaskTimeline from '../components/Dashboard/TaskTimeline';
import QuickStats from '../components/Dashboard/QuickStats';
import SystemMetrics from '../components/Dashboard/SystemMetrics';
import Tabs from '../components/ui/Tabs';

export const OverviewPage = ({ t, lastUpdate }) => {
  const [overview, setOverview] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState(null);
  const [heatmapData, setHeatmapData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchOverview();
    fetchSystemMetrics();
    fetchHeatmapData();
    fetchTasks();
  }, []);

  // Update with WebSocket data
  useEffect(() => {
    if (lastUpdate) {
      setOverview((prev) => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          activeSessions: lastUpdate.activeSessions,
        },
      } : null);
    }
  }, [lastUpdate]);

  const fetchOverview = async () => {
    try {
      const response = await fetch('/api/overview');
      const data = await response.json();
      setOverview(data);
    } catch (error) {
      console.error('Failed to fetch overview:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSystemMetrics = async () => {
    try {
      const response = await fetch('/api/system');
      const data = await response.json();
      setSystemMetrics(data);
    } catch (error) {
      console.error('Failed to fetch system metrics:', error);
    }
  };

  const fetchHeatmapData = async () => {
    try {
      const response = await fetch('/api/heatmap');
      const data = await response.json();
      setHeatmapData(data);
    } catch (error) {
      console.error('Failed to fetch heatmap data:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/tasks');
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: t('nav.overview') },
    { id: 'system', label: t('system.metrics') || 'System' },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">
            {t('overview.title')}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            {t('app.tagline')}
          </p>
        </div>
        <div className="text-sm text-[var(--text-tertiary)]">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' ? (
        <>
          {/* Overview cards */}
          <OverviewCards t={t} stats={overview?.stats} />

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivityChart t={t} data={overview?.activityChart} loading={loading} />
            <QuickStats t={t} systemMetrics={systemMetrics} loading={loading} />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SessionHeatmap t={t} data={heatmapData} loading={loading} />
            <TaskTimeline t={t} tasks={tasks} loading={loading} />
          </div>
        </>
      ) : (
        /* System Metrics Tab */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <SystemMetrics t={t} metrics={systemMetrics} />
          </div>
          <div className="lg:col-span-1">
            <ActivityChart t={t} data={overview?.activityChart} loading={loading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewPage;
