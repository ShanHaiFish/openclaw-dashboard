import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Shield, Code, MessageSquare, Globe } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StatusDot from '../ui/StatusDot';
import { CardSkeleton } from '../ui/Skeleton';

const capabilityIcons = {
  chat: MessageSquare,
  code: Code,
  security: Shield,
  automation: Zap,
  web: Globe,
};

function AgentCard({ agent, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5" />

        <div className="relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                <p className="text-sm text-white/50">{agent.role || 'AI Assistant'}</p>
              </div>
            </div>
            <StatusDot status={agent.status} showLabel />
          </div>

          {/* Description */}
          <p className="text-sm text-white/60 mb-4 line-clamp-2">
            {agent.description || 'No description available'}
          </p>

          {/* Capabilities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(agent.capabilities || ['chat']).map((cap) => {
              const Icon = capabilityIcons[cap] || Zap;
              return (
                <Badge key={cap} variant="purple">
                  <Icon className="w-3 h-3 mr-1" />
                  {cap}
                </Badge>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
            <div className="text-center">
              <p className="text-lg font-bold text-accent-blue">{agent.sessions || 0}</p>
              <p className="text-xs text-white/50">Sessions</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-accent-purple">{agent.tasks || 0}</p>
              <p className="text-xs text-white/50">Tasks</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-accent-green">{agent.successRate || '0%'}</p>
              <p className="text-xs text-white/50">Success</p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Agents({ data }) {
  const agents = data?.agents || [];
  const loading = !data;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Agents</h2>
          <p className="text-white/50 mt-1">Manage your AI agents and their capabilities</p>
        </div>
        <Badge variant="purple">{agents.length} agents</Badge>
      </div>

      {/* Agent grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : agents.length === 0 ? (
        <Card hover={false} className="text-center py-12">
          <Bot className="w-16 h-16 mx-auto text-white/20 mb-4" />
          <h3 className="text-lg font-medium text-white/80 mb-2">No agents configured</h3>
          <p className="text-white/50">Create an agent to get started</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <AgentCard key={agent.id} agent={agent} index={index} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
