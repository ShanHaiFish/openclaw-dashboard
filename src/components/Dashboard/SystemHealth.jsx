import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Activity } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import StatusDot from '../ui/StatusDot';

function MetricBar({ label, value, max = 100, color, icon: Icon }) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className="text-sm text-white/70">{label}</span>
        </div>
        <span className="text-sm font-medium text-white/90">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2 bg-navy-600 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            percentage > 80 ? 'bg-gradient-to-r from-accent-red to-accent-yellow' :
            percentage > 60 ? 'bg-gradient-to-r from-accent-yellow to-accent-green' :
            'bg-gradient-to-r from-accent-green to-accent-cyan'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function SystemHealth({ system = {} }) {
  const status = system.healthy ? 'active' : 'error';

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <div className="flex items-center gap-2">
          <StatusDot status={status} />
          <span className={`text-sm font-medium ${system.healthy ? 'text-accent-green' : 'text-accent-red'}`}>
            {system.healthy ? 'Healthy' : 'Degraded'}
          </span>
        </div>
      </CardHeader>

      <div className="space-y-5">
        <MetricBar
          label="CPU Usage"
          value={system.cpu || 0}
          icon={Cpu}
          color="text-accent-blue"
        />
        <MetricBar
          label="Memory"
          value={system.memory || 0}
          icon={MemoryStick}
          color="text-accent-purple"
        />
        <MetricBar
          label="Disk"
          value={system.disk || 0}
          icon={HardDrive}
          color="text-accent-cyan"
        />

        {/* Status indicators */}
        <div className="pt-4 border-t border-white/5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <StatusDot status={system.api ? 'active' : 'error'} size="sm" />
              <span className="text-xs text-white/60">API Server</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={system.websocket ? 'active' : 'error'} size="sm" />
              <span className="text-xs text-white/60">WebSocket</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={system.database ? 'active' : 'error'} size="sm" />
              <span className="text-xs text-white/60">Database</span>
            </div>
            <div className="flex items-center gap-2">
              <StatusDot status={system.openclaw ? 'active' : 'error'} size="sm" />
              <span className="text-xs text-white/60">OpenClaw</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
