import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

const taskColors = ['blue', 'purple', 'cyan', 'green', 'yellow'];

export default function TaskProgress({ tasks = [] }) {
  const displayTasks = tasks.slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Task Progress</CardTitle>
        <span className="text-sm text-white/50">
          {tasks.filter(t => t.status === 'completed').length}/{tasks.length} completed
        </span>
      </CardHeader>

      <div className="space-y-4">
        {displayTasks.length === 0 ? (
          <div className="text-center py-8">
            <Circle className="w-12 h-12 mx-auto text-white/20 mb-3" />
            <p className="text-white/50 text-sm">No tasks running</p>
          </div>
        ) : (
          displayTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-accent-green" />
                  ) : task.status === 'running' ? (
                    <Loader2 className="w-4 h-4 text-accent-blue animate-spin" />
                  ) : (
                    <Circle className="w-4 h-4 text-white/30" />
                  )}
                  <span className="text-sm text-white/80">{task.name}</span>
                </div>
                <span className="text-xs text-white/50">
                  {task.status === 'completed' ? '100%' : `${task.progress || 0}%`}
                </span>
              </div>
              <ProgressBar
                value={task.status === 'completed' ? 100 : task.progress || 0}
                color={taskColors[index % taskColors.length]}
                showLabel={false}
                size="sm"
              />
            </motion.div>
          ))
        )}
      </div>
    </Card>
  );
}
