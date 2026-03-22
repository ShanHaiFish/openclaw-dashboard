import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MessageSquare, ArrowRight } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import StatusDot from '../ui/StatusDot';
import Badge from '../ui/Badge';
import { formatRelativeTime, truncate } from '../../utils/formatters';

export default function SessionList({ sessions = [] }) {
  const displaySessions = sessions.slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent Sessions</CardTitle>
        <Badge variant="blue">{sessions.length} total</Badge>
      </CardHeader>

      <div className="space-y-3">
        {displaySessions.length === 0 ? (
          <div className="text-center py-8">
            <MessageSquare className="w-12 h-12 mx-auto text-white/20 mb-3" />
            <p className="text-white/50 text-sm">No active sessions</p>
          </div>
        ) : (
          displaySessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
            >
              {/* Status */}
              <StatusDot status={session.status} />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-white/90 truncate">
                    {session.agentName || 'Unknown Agent'}
                  </span>
                  <Badge variant={session.status === 'active' ? 'green' : session.status === 'error' ? 'red' : 'yellow'} dot>
                    {session.status}
                  </Badge>
                </div>
                <p className="text-xs text-white/50 truncate">
                  {truncate(session.lastMessage || 'No messages yet', 60)}
                </p>
              </div>

              {/* Time */}
              <div className="flex items-center gap-1 text-xs text-white/40">
                <Clock className="w-3 h-3" />
                {formatRelativeTime(session.updatedAt)}
              </div>

              {/* Arrow */}
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}
