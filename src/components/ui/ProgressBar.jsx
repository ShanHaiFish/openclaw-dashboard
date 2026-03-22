import React from 'react';
import { motion } from 'framer-motion';

const colorMap = {
  blue: 'from-accent-blue to-accent-cyan',
  purple: 'from-accent-purple to-accent-blue',
  cyan: 'from-accent-cyan to-accent-green',
  green: 'from-accent-green to-accent-cyan',
  yellow: 'from-accent-yellow to-accent-green',
  red: 'from-accent-red to-accent-yellow',
};

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'blue',
  showLabel = true,
  size = 'md',
  animated = true,
  className = '',
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const gradientClass = colorMap[color] || colorMap.blue;

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-white/50">Progress</span>
          <span className="text-xs font-medium text-white/80">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full ${sizeClasses[size]} bg-navy-600 rounded-full overflow-hidden`}>
        <motion.div
          className={`h-full bg-gradient-to-r ${gradientClass} rounded-full ${animated ? 'progress-shimmer' : ''}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
