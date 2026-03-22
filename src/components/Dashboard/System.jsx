import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Cpu,
  MemoryStick,
  HardDrive,
  Activity,
  Clock,
  Zap,
  Globe,
  Shield,
} from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import StatusDot from '../ui/StatusDot';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { formatUptime, formatBytes } from '../../utils/formatters';

function InfoRow({ icon: Icon, label, value, color = 'text-accent-blue' }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-sm text-white/60">{label}</span>
      </div>
      <span className="text-sm font-medium text-white/90">{value}</span>
    </div>
  );
}

export default function System({ data }) {
  const system = data?.system || {};
  const runtime = data?.runtime || {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">System</h2>
          <p className="text-white/50 mt-1">Runtime information and system status</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusDot status={system.healthy ? 'active' : 'error'} />
          <Badge variant={system.healthy ? 'green' : 'red'}>
            {system.healthy ? 'Healthy' : 'Degraded'}
          </Badge>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Runtime Info */}
        <Card>
          <CardHeader>
            <CardTitle>Runtime Information</CardTitle>
            <Server className="w-5 h-5 text-accent-blue" />
          </CardHeader>

          <div>
            <InfoRow icon={Activity} label="Status" value={system.healthy ? 'Running' : 'Error'} color="text-accent-green" />
            <InfoRow icon={Clock} label="Uptime" value={formatUptime(runtime.uptime || 0)} color="text-accent-purple" />
            <InfoRow icon={Globe} label="Environment" value={runtime.env || 'production'} color="text-accent-cyan" />
            <InfoRow icon={Shield} label="Version" value={runtime.version || '1.0.0'} color="text-accent-blue" />
            <InfoRow icon={Zap} label="Platform" value={runtime.platform || 'linux'} color="text-accent-yellow" />
          </div>
        </Card>

        {/* Resource Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <Activity className="w-5 h-5 text-accent-purple" />
          </CardHeader>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm text-white/70">CPU Usage</span>
                </div>
                <span className="text-sm font-medium text-white/90">{system.cpu || 0}%</span>
              </div>
              <ProgressBar value={system.cpu || 0} color="blue" showLabel={false} size="md" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <MemoryStick className="w-4 h-4 text-accent-purple" />
                  <span className="text-sm text-white/70">Memory</span>
                </div>
                <span className="text-sm font-medium text-white/90">
                  {formatBytes(runtime.memory?.used || 0)} / {formatBytes(runtime.memory?.total || 0)}
                </span>
              </div>
              <ProgressBar
                value={runtime.memory?.used || 0}
                max={runtime.memory?.total || 1}
                color="purple"
                showLabel={false}
                size="md"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-accent-cyan" />
                  <span className="text-sm text-white/70">Disk</span>
                </div>
                <span className="text-sm font-medium text-white/90">{system.disk || 0}%</span>
              </div>
              <ProgressBar value={system.disk || 0} color="cyan" showLabel={false} size="md" />
            </div>
          </div>
        </Card>

        {/* Model Information */}
        <Card>
          <CardHeader>
            <CardTitle>Model Information</CardTitle>
            <Zap className="w-5 h-5 text-accent-cyan" />
          </CardHeader>

          <div>
            <InfoRow icon={Zap} label="Active Model" value={runtime.model || 'Not loaded'} color="text-accent-blue" />
            <InfoRow icon={MemoryStick} label="Model Size" value={formatBytes(runtime.modelSize || 0)} color="text-accent-purple" />
            <InfoRow icon={Cpu} label="GPU Memory" value={formatBytes(runtime.gpuMemory || 0)} color="text-accent-cyan" />
            <InfoRow icon={Activity} label="Inference Time" value={`${runtime.inferenceTime || 0}ms`} color="text-accent-green" />
          </div>
        </Card>

        {/* Services Status */}
        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <Shield className="w-5 h-5 text-accent-green" />
          </CardHeader>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'API Server', status: system.api },
              { name: 'WebSocket', status: system.websocket },
              { name: 'Database', status: system.database },
              { name: 'OpenClaw', status: system.openclaw },
              { name: 'Cache', status: system.cache },
              { name: 'Logger', status: system.logger },
            ].map((service) => (
              <div
                key={service.name}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5"
              >
                <span className="text-sm text-white/70">{service.name}</span>
                <StatusDot status={service.status ? 'active' : 'error'} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
