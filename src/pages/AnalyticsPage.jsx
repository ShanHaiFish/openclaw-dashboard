import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TokenAnalytics from '../components/Analytics/TokenAnalytics';
import AgentPerformance from '../components/Analytics/AgentPerformance';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { 
  BarChart3, PieChart, TrendingUp, DollarSign,
  ArrowUpRight, ArrowDownRight
} from 'lucide-react';

export const AnalyticsPage = ({ t }) => {
  const [tokenData, setTokenData] = useState(null);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('tokens');

  useEffect(() => {
    fetchTokenData();
    fetchAgents();
  }, []);

  const fetchTokenData = async () => {
    try {
      const response = await fetch('/api/analytics/tokens');
      const data = await response.json();
      setTokenData(data);
    } catch (error) {
      console.error('Failed to fetch token data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/analytics/agents');
      const data = await response.json();
      setAgents(data || []);
    } catch (error) {
      console.error('Failed to fetch agents:', error);
    }
  };

  const sections = [
    { id: 'tokens', label: t('analytics.tokens'), icon: BarChart3 },
    { id: 'agents', label: t('agents.title'), icon: TrendingUp },
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
            {t('analytics.title')}
          </h1>
          <p className="text-[var(--text-secondary)] mt-1">
            Track token usage, costs, and agent performance
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="info" size="sm">Last 7 days</Badge>
          <Badge variant="success" size="sm">Live</Badge>
        </div>
      </motion.div>

      {/* Section tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--border-secondary)] pb-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-[var(--accent-primary)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
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
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'tokens' && (
            <TokenAnalytics data={tokenData} t={t} />
          )}
          {activeSection === 'agents' && (
            <AgentPerformance agents={agents} t={t} />
          )}
        </motion.div>
      )}

      {/* Cost Breakdown Section */}
      {activeSection === 'tokens' && tokenData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Cost Breakdown by Model
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tokenData.modelDistribution?.map((model, index) => {
                  const totalTokens = tokenData.modelDistribution.reduce((sum, m) => sum + m.value, 0);
                  const percentage = totalTokens > 0 ? (model.value / totalTokens) * 100 : 0;
                  const modelCost = model.cost || (model.value * 0.002);
                  
                  return (
                    <div key={model.name || index} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[var(--text-primary)]">{model.name}</span>
                          <Badge variant="default" size="sm">{percentage.toFixed(1)}%</Badge>
                        </div>
                        <span className="text-[var(--text-secondary)]">${modelCost.toFixed(2)}</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, delay: index * 0.1 }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${
                              ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#6366f1'][index % 6]
                            }, ${
                              ['#a78bfa', '#22d3ee', '#34d399', '#fbbf24', '#f472b6', '#818cf8'][index % 6]
                            })`
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default AnalyticsPage;
