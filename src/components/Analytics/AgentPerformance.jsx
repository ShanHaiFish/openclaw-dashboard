import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { cn } from '../../lib/utils';
import { 
  Trophy, Clock, Target, Zap, Users, 
  TrendingUp, Award, Activity 
} from 'lucide-react';

const StatusIndicator = ({ status }) => {
  const statusConfig = {
    online: { color: 'bg-emerald-500', pulse: true, label: 'Online' },
    idle: { color: 'bg-amber-500', pulse: false, label: 'Idle' },
    offline: { color: 'bg-gray-500', pulse: false, label: 'Offline' },
    error: { color: 'bg-red-500', pulse: true, label: 'Error' },
  };

  const config = statusConfig[status] || statusConfig.offline;

  return (
    <div className="flex items-center gap-2">
      <span className={cn(
        'w-2.5 h-2.5 rounded-full',
        config.color,
        config.pulse && 'animate-pulse'
      )} />
      <span className="text-xs text-[var(--text-tertiary)]">{config.label}</span>
    </div>
  );
};

const LeaderboardRow = ({ agent, rank, t }) => {
  const rankColors = ['text-yellow-400', 'text-gray-300', 'text-amber-600'];
  const rankColor = rank < 3 ? rankColors[rank] : 'text-[var(--text-tertiary)]';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: rank * 0.05 }}
      className="border-b border-[var(--border-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
    >
      <td className="py-3 px-4">
        <span className={cn('font-bold text-lg', rankColor)}>
          #{rank + 1}
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.avatar}</span>
          <div>
            <p className="font-medium text-[var(--text-primary)]">{agent.name}</p>
            <StatusIndicator status={agent.status} />
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-center">
        <span className="font-semibold text-[var(--text-primary)]">
          {agent.sessionsCompleted}
        </span>
      </td>
      <td className="py-3 px-4 text-center">
        <Badge 
          variant={agent.successRate >= 97 ? 'success' : agent.successRate >= 95 ? 'warning' : 'info'}
          size="sm"
        >
          {agent.successRate.toFixed(1)}%
        </Badge>
      </td>
      <td className="py-3 px-4 text-center">
        <span className="text-[var(--text-secondary)]">
          {agent.avgResponseTime.toFixed(1)}s
        </span>
      </td>
      <td className="py-3 px-4">
        <div className="flex flex-wrap gap-1">
          {agent.capabilities?.slice(0, 3).map((cap, i) => (
            <Badge key={i} variant="outline" size="sm">{cap}</Badge>
          ))}
          {agent.capabilities?.length > 3 && (
            <Badge variant="default" size="sm">+{agent.capabilities.length - 3}</Badge>
          )}
        </div>
      </td>
    </motion.tr>
  );
};

const AgentCard = ({ agent, t }) => {
  const performanceScore = Math.round(
    (agent.successRate * 0.4) + 
    (Math.max(0, 100 - agent.avgResponseTime * 10) * 0.3) + 
    (Math.min(agent.sessionsCompleted / 3, 100) * 0.3)
  );

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-xl border border-[var(--border-secondary)] bg-[var(--bg-elevated)] p-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{agent.avatar}</span>
          <div>
            <h4 className="font-semibold text-[var(--text-primary)]">{agent.name}</h4>
            <StatusIndicator status={agent.status} />
          </div>
        </div>
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ 
            background: `conic-gradient(${agent.color || '#8b5cf6'} ${performanceScore * 3.6}deg, var(--bg-tertiary) 0deg)`,
          }}
        >
          <span className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] flex items-center justify-center text-sm">
            {performanceScore}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <p className="text-lg font-bold text-[var(--text-primary)]">{agent.sessionsCompleted}</p>
          <p className="text-xs text-[var(--text-tertiary)]">Tasks</p>
        </div>
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <p className="text-lg font-bold text-[var(--text-primary)]">{agent.successRate}%</p>
          <p className="text-xs text-[var(--text-tertiary)]">Success</p>
        </div>
        <div className="p-2 rounded-lg bg-[var(--bg-secondary)]">
          <p className="text-lg font-bold text-[var(--text-primary)]">{agent.avgResponseTime}s</p>
          <p className="text-xs text-[var(--text-tertiary)]">Avg Time</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1">
        {agent.capabilities?.map((cap, i) => (
          <Badge key={i} variant="outline" size="sm">{cap}</Badge>
        ))}
      </div>
    </motion.div>
  );
};

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-secondary)] rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-[var(--text-secondary)]">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AgentPerformance = ({ agents = [], t }) => {
  const sortedAgents = useMemo(() => {
    return [...agents].sort((a, b) => {
      const scoreA = (a.successRate * 0.4) + (Math.max(0, 100 - a.avgResponseTime * 10) * 0.3) + (Math.min(a.sessionsCompleted / 3, 100) * 0.3);
      const scoreB = (b.successRate * 0.4) + (Math.max(0, 100 - b.avgResponseTime * 10) * 0.3) + (Math.min(b.sessionsCompleted / 3, 100) * 0.3);
      return scoreB - scoreA;
    });
  }, [agents]);

  const comparisonData = useMemo(() => {
    return agents.map(agent => ({
      name: agent.name,
      'Success Rate': agent.successRate,
      'Response Score': Math.max(0, 100 - agent.avgResponseTime * 10),
      'Volume': Math.min(agent.sessionsCompleted / 3, 100),
    }));
  }, [agents]);

  const radarData = useMemo(() => {
    if (agents.length === 0) return [];
    const topAgent = sortedAgents[0];
    return [
      { metric: 'Success', value: topAgent.successRate, fullMark: 100 },
      { metric: 'Speed', value: Math.max(0, 100 - topAgent.avgResponseTime * 10), fullMark: 100 },
      { metric: 'Volume', value: Math.min(topAgent.sessionsCompleted / 3, 100), fullMark: 100 },
      { metric: 'Reliability', value: 95 + Math.random() * 5, fullMark: 100 },
      { metric: 'Quality', value: 90 + Math.random() * 10, fullMark: 100 },
    ];
  }, [sortedAgents, agents]);

  const onlineCount = agents.filter(a => a.status === 'online').length;
  const avgSuccessRate = agents.length > 0 
    ? (agents.reduce((sum, a) => sum + a.successRate, 0) / agents.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br from-violet-500/20 to-purple-500/10 p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Agents</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{agents.length}</p>
            </div>
            <Users className="w-5 h-5 text-[var(--text-secondary)]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br from-emerald-500/20 to-green-500/10 p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Online</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{onlineCount}</p>
            </div>
            <Activity className="w-5 h-5 text-emerald-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br from-cyan-500/20 to-blue-500/10 p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Avg Success Rate</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{avgSuccessRate}%</p>
            </div>
            <Target className="w-5 h-5 text-cyan-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-[var(--border-secondary)] bg-gradient-to-br from-amber-500/20 to-yellow-500/10 p-5"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-[var(--text-secondary)]">Total Tasks</p>
              <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">
                {agents.reduce((sum, a) => sum + a.sessionsCompleted, 0)}
              </p>
            </div>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Agent Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border-secondary)] bg-[var(--bg-secondary)]">
                  <th className="py-3 px-4 text-left text-sm font-medium text-[var(--text-secondary)]">Rank</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-[var(--text-secondary)]">Agent</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-[var(--text-secondary)]">Tasks</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-[var(--text-secondary)]">Success</th>
                  <th className="py-3 px-4 text-center text-sm font-medium text-[var(--text-secondary)]">Avg Time</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-[var(--text-secondary)]">Capabilities</th>
                </tr>
              </thead>
              <tbody>
                {sortedAgents.map((agent, index) => (
                  <LeaderboardRow key={agent.id} agent={agent} rank={index} t={t} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                <XAxis 
                  type="number" 
                  domain={[0, 100]}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  width={80}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip content={<CustomBarTooltip />} />
                <Bar dataKey="Success Rate" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Response Score" fill="#06b6d4" radius={[0, 4, 4, 0]} />
                <Bar dataKey="Volume" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Agent Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Top Performer Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            {radarData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(148, 163, 184, 0.2)" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 10 }}
                  />
                  <Radar
                    name="Performance"
                    dataKey="value"
                    stroke="#8b5cf6"
                    fill="#8b5cf6"
                    fillOpacity={0.3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-[var(--text-tertiary)]">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Agent Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Agent Status Grid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {agents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} t={t} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentPerformance;
