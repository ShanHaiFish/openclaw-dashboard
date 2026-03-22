import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatNumber } from '../../lib/utils';
import { 
  TrendingUp, TrendingDown, Zap, DollarSign, 
  BarChart3, PieChartIcon, Activity 
} from 'lucide-react';

const MODEL_PRICING = {
  'gpt-4': { input: 0.03, output: 0.06 },
  'gpt-4-turbo': { input: 0.01, output: 0.03 },
  'gpt-3.5-turbo': { input: 0.0005, output: 0.0015 },
  'claude-3-opus': { input: 0.015, output: 0.075 },
  'claude-3-sonnet': { input: 0.003, output: 0.015 },
  'gemini-pro': { input: 0.0005, output: 0.0015 },
  'llama-3-70b': { input: 0.0006, output: 0.0008 },
  'mistral-large': { input: 0.004, output: 0.012 },
};

const MODEL_COLORS = [
  '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', 
  '#ec4899', '#6366f1', '#14b8a6', '#f97316'
];

const calculateCost = (model, inputTokens, outputTokens) => {
  const pricing = MODEL_PRICING[model] || { input: 0.001, output: 0.002 };
  return (inputTokens * pricing.input + outputTokens * pricing.output) / 1000;
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'primary' }) => {
  const colorClasses = {
    primary: 'from-violet-500/20 to-purple-500/10 border-violet-500/20',
    success: 'from-emerald-500/20 to-green-500/10 border-emerald-500/20',
    warning: 'from-amber-500/20 to-yellow-500/10 border-amber-500/20',
    info: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/20',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border bg-gradient-to-br ${colorClasses[color]} p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[var(--text-secondary)]">{title}</p>
          <p className="text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-[var(--text-tertiary)] mt-1">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-[var(--bg-secondary)]/50">
            <Icon className="w-5 h-5 text-[var(--text-secondary)]" />
          </div>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-1 mt-3">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-400" />
          )}
          <span className={`text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--bg-elevated)] border border-[var(--border-secondary)] rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-[var(--text-primary)] mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-[var(--text-secondary)]">
            <span className="inline-block w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            {entry.name}: {entry.name.includes('Cost') ? `$${entry.value.toFixed(2)}` : formatNumber(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const TokenAnalytics = ({ data, t }) => {
  const tokenData = data || {
    totalInput: 0,
    totalOutput: 0,
    totalCost: 0,
    burnRate: 0,
    budget: { used: 0, limit: 100 },
    modelDistribution: [],
    trend: [],
  };

  const budgetPercentage = (tokenData.budget.used / tokenData.budget.limit) * 100;
  const budgetStatus = budgetPercentage >= 90 ? 'critical' : budgetPercentage >= 70 ? 'warning' : 'normal';

  const pieData = useMemo(() => {
    if (!tokenData.modelDistribution || tokenData.modelDistribution.length === 0) {
      return [];
    }
    return tokenData.modelDistribution.map((item, index) => ({
      ...item,
      color: MODEL_COLORS[index % MODEL_COLORS.length],
    }));
  }, [tokenData.modelDistribution]);

  const trendData = useMemo(() => {
    if (!tokenData.trend || tokenData.trend.length === 0) {
      return [];
    }
    return tokenData.trend.map(item => ({
      ...item,
      cost: calculateCost(item.model || 'gpt-4-turbo', item.input, item.output),
    }));
  }, [tokenData.trend]);

  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-[var(--text-secondary)]">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('analytics.inputTokens')}
          value={formatNumber(tokenData.totalInput)}
          subtitle="This period"
          icon={BarChart3}
          trend="up"
          trendValue="+12.5%"
          color="info"
        />
        <StatCard
          title={t('analytics.outputTokens')}
          value={formatNumber(tokenData.totalOutput)}
          subtitle="This period"
          icon={Activity}
          trend="up"
          trendValue="+8.2%"
          color="primary"
        />
        <StatCard
          title={t('analytics.totalCost')}
          value={`$${tokenData.totalCost.toFixed(2)}`}
          subtitle="This period"
          icon={DollarSign}
          trend="down"
          trendValue="-3.1%"
          color="success"
        />
        <StatCard
          title={t('analytics.burnRate')}
          value={`${formatNumber(tokenData.burnRate)}/min`}
          subtitle="Current rate"
          icon={Zap}
          color="warning"
        />
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            {t('analytics.budget')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">
                ${tokenData.budget.used.toFixed(2)} / ${tokenData.budget.limit.toFixed(2)}
              </span>
              <Badge 
                variant={budgetStatus === 'critical' ? 'error' : budgetStatus === 'warning' ? 'warning' : 'success'}
                size="sm"
              >
                {budgetPercentage.toFixed(1)}%
              </Badge>
            </div>
            <div className="w-full h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${
                  budgetStatus === 'critical' 
                    ? 'bg-gradient-to-r from-red-500 to-red-400' 
                    : budgetStatus === 'warning'
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-emerald-500 to-green-400'
                }`}
              />
            </div>
            {budgetStatus !== 'normal' && (
              <p className={`text-xs ${budgetStatus === 'critical' ? 'text-red-400' : 'text-amber-400'}`}>
                {budgetStatus === 'critical' 
                  ? '⚠️ Budget nearly exhausted!' 
                  : '⚡ Approaching budget limit'}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5" />
              {t('analytics.modelDistribution')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-[var(--bg-elevated)] border border-[var(--border-secondary)] rounded-lg p-3 shadow-lg">
                            <p className="text-sm font-medium text-[var(--text-primary)]">
                              {payload[0].name}
                            </p>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {formatNumber(payload[0].value)} tokens
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend content={renderCustomLegend} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-[var(--text-tertiary)]">
                No data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* 7-Day Trend Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('analytics.trend')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorInput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
                  />
                  <YAxis 
                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                    axisLine={{ stroke: 'rgba(148, 163, 184, 0.2)' }}
                    tickFormatter={(value) => formatNumber(value)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="input" 
                    name="Input Tokens"
                    stroke="#8b5cf6" 
                    fillOpacity={1}
                    fill="url(#colorInput)"
                    strokeWidth={2}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="output" 
                    name="Output Tokens"
                    stroke="#06b6d4" 
                    fillOpacity={1}
                    fill="url(#colorOutput)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-[var(--text-tertiary)]">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { MODEL_PRICING, calculateCost };
export default TokenAnalytics;
