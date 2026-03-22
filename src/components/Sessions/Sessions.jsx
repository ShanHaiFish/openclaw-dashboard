import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown, ChevronUp, MessageSquare, Clock, User } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import StatusDot from '../ui/StatusDot';
import { TableRowSkeleton } from '../ui/Skeleton';
import { formatRelativeTime, truncate } from '../../utils/formatters';
import SessionDetail from './SessionDetail';

export default function Sessions({ data }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const sessions = data?.sessions || [];
  const loading = !data;

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = !search ||
      session.agentName?.toLowerCase().includes(search.toLowerCase()) ||
      session.id?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'idle', label: 'Idle' },
    { value: 'error', label: 'Error' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Sessions</h2>
          <p className="text-white/50 mt-1">Manage and monitor active sessions</p>
        </div>
        <Badge variant="blue">{sessions.length} total</Badge>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search sessions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30 transition-all"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-accent-blue/50 transition-all cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-navy-800">
                {opt.label}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
        </div>
      </div>

      {/* Sessions table */}
      <Card hover={false} className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Session ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Agent
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Messages
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Last Activity
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRowSkeleton key={i} columns={6} />
                ))
              ) : filteredSessions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <MessageSquare className="w-12 h-12 mx-auto text-white/20 mb-3" />
                    <p className="text-white/50">No sessions found</p>
                  </td>
                </tr>
              ) : (
                filteredSessions.map((session, index) => (
                  <React.Fragment key={session.id}>
                    <motion.tr
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-white/5 transition-colors cursor-pointer"
                      onClick={() => setExpandedId(expandedId === session.id ? null : session.id)}
                    >
                      <td className="px-4 py-3">
                        <StatusDot status={session.status} />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-accent-blue">
                          {truncate(session.id, 12)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-white/30" />
                          <span className="text-sm text-white/80">{session.agentName || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-white/70">{session.messageCount || 0}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 text-sm text-white/50">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(session.updatedAt)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        {expandedId === session.id ? (
                          <ChevronUp className="w-4 h-4 text-white/50" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-white/50" />
                        )}
                      </td>
                    </motion.tr>
                    <AnimatePresence>
                      {expandedId === session.id && (
                        <tr>
                          <td colSpan={6} className="p-0">
                            <SessionDetail session={session} />
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
