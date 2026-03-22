import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

export const ProgressRing = ({
  value = 0,
  max = 100,
  size = 80,
  strokeWidth = 6,
  className,
  showValue = true,
  color,
  label,
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  const percentage = (value / max) * 100;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedValue / 100) * circumference;

  // Animate on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  // Determine color based on value
  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return '#ef4444'; // red
    if (percentage >= 60) return '#f59e0b'; // amber
    return '#10b981'; // emerald
  };

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--bg-tertiary)"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-ring-circle"
          style={{
            transition: 'stroke-dashoffset 0.5s ease-out',
          }}
        />
      </svg>
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-[var(--text-primary)]">
            {Math.round(animatedValue)}%
          </span>
          {label && (
            <span className="text-xs text-[var(--text-tertiary)]">{label}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
