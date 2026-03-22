import React from 'react';
import { motion } from 'framer-motion';
import OverviewCards from './OverviewCards';
import SessionList from './SessionList';
import TaskProgress from './TaskProgress';
import SystemHealth from './SystemHealth';
import { CardSkeleton } from '../ui/Skeleton';

export default function Overview({ data }) {
  const loading = !data;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Stats cards */}
      <OverviewCards stats={data.overview} />

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sessions - takes 2 columns */}
        <div className="lg:col-span-2">
          <SessionList sessions={data.sessions} />
        </div>

        {/* System health */}
        <div>
          <SystemHealth system={data.system} />
        </div>
      </div>

      {/* Task progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskProgress tasks={data.tasks} />
        {/* Quick stats */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white/90 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-blue">
                {data.overview?.totalMessages || 0}
              </p>
              <p className="text-sm text-white/50">Total Messages</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-purple">
                {data.overview?.avgResponseTime || '0ms'}
              </p>
              <p className="text-sm text-white/50">Avg Response Time</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-cyan">
                {data.overview?.successRate || '0%'}
              </p>
              <p className="text-sm text-white/50">Success Rate</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <p className="text-2xl font-bold text-accent-green">
                {data.overview?.modelsLoaded || 0}
              </p>
              <p className="text-sm text-white/50">Models Loaded</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
