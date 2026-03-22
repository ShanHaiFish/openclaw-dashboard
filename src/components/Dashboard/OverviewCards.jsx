import { motion } from 'framer-motion';
import {
  MessageSquare,
  CheckSquare,
  Bot,
  Activity,
  TrendingUp,
  Clock,
} from 'lucide-react';
import Card from '../ui/Card';
import { cn, formatNumber } from '../../lib/utils';

const icons = {
  activeSessions: MessageSquare,
  runningTasks: CheckSquare,
  totalAgents: Bot,
  onlineAgents: Activity,
  totalMessages: TrendingUp,
  systemUptime: Clock,
};

const colorMap = {
  activeSessions: 'from-sky-500 to-blue-600',
  runningTasks: 'from-violet-500 to-purple-600',
  totalAgents: 'from-emerald-500 to-green-600',
  onlineAgents: 'from-amber-500 to-orange-600',
  totalMessages: 'from-pink-500 to-rose-600',
  systemUptime: 'from-cyan-500 to-teal-600',
};

export const OverviewCards = ({ t, stats }) => {
  const cards = [
    { key: 'activeSessions', value: stats?.activeSessions || 0, change: '+12%' },
    { key: 'runningTasks', value: stats?.runningTasks || 0, change: '+5%' },
    { key: 'totalAgents', value: stats?.totalAgents || 0 },
    { key: 'onlineAgents', value: stats?.onlineAgents || 0 },
    { key: 'totalMessages', value: formatNumber(stats?.totalMessages || 0), change: '+23%' },
    { key: 'systemUptime', value: '99.9%' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
    >
      {cards.map((card) => {
        const Icon = icons[card.key];
        const gradient = colorMap[card.key];

        return (
          <motion.div key={card.key} variants={item}>
            <Card className="relative overflow-hidden p-5">
              {/* Gradient background */}
              <div className={cn(
                'absolute inset-0 opacity-10',
                'bg-gradient-to-br',
                gradient
              )} />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-gradient-to-br',
                    gradient
                  )}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {card.change && (
                    <span className="text-xs font-medium text-emerald-400">
                      {card.change}
                    </span>
                  )}
                </div>
                
                <div className="text-2xl font-bold text-[var(--text-primary)] count-animate">
                  {card.value}
                </div>
                <div className="text-sm text-[var(--text-secondary)] mt-1">
                  {t(`overview.${card.key}`)}
                </div>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default OverviewCards;
