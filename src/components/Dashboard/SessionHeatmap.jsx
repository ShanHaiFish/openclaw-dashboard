import { useState, useEffect } from 'react';
import { format, subDays, startOfWeek, addDays } from 'date-fns';
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { cn } from '../../lib/utils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const getColorClass = (value) => {
  if (value === 0) return 'bg-[var(--bg-tertiary)]';
  if (value <= 2) return 'bg-emerald-900/50';
  if (value <= 4) return 'bg-emerald-700/60';
  if (value <= 6) return 'bg-emerald-500/70';
  if (value <= 8) return 'bg-emerald-400/80';
  return 'bg-emerald-300';
};

export const SessionHeatmap = ({ t, data, loading }) => {
  const [heatmapData, setHeatmapData] = useState([]);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (data) {
      setHeatmapData(data);
    }
  }, [data]);

  // Group data by weeks
  const weeks = [];
  if (heatmapData.length > 0) {
    const sortedData = [...heatmapData].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    
    let currentWeek = [];
    let currentDate = new Date(sortedData[0].date);
    const endDate = new Date(sortedData[sortedData.length - 1].date);
    
    while (currentDate <= endDate) {
      const dateStr = format(currentDate, 'yyyy-MM-dd');
      const dayData = sortedData.find(d => d.date === dateStr);
      currentWeek.push({
        date: dateStr,
        value: dayData?.value || 0,
        dayOfWeek: currentDate.getDay(),
      });
      
      if (currentDate.getDay() === 6 || currentDate.getTime() === endDate.getTime()) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      
      currentDate = addDays(currentDate, 1);
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t('overview.recentActivity')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t('overview.recentActivity')}</CardTitle>
        <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-[var(--bg-tertiary)]" />
            <div className="w-3 h-3 rounded-sm bg-emerald-900/50" />
            <div className="w-3 h-3 rounded-sm bg-emerald-700/60" />
            <div className="w-3 h-3 rounded-sm bg-emerald-500/70" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400/80" />
          </div>
          <span>More</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1">
            {/* Weekday labels */}
            <div className="flex gap-1 pl-8">
              {WEEKDAYS.map((day) => (
                <div
                  key={day}
                  className="w-3 text-[10px] text-[var(--text-tertiary)] text-center"
                >
                  {day.charAt(0)}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="flex gap-1">
              {/* Month labels */}
              <div className="flex flex-col gap-1">
                {MONTHS.map((month, i) => (
                  <div
                    key={month}
                    className="h-3 text-[10px] text-[var(--text-tertiary)] leading-3"
                    style={{ visibility: i % 2 === 0 ? 'visible' : 'hidden' }}
                  >
                    {month}
                  </div>
                ))}
              </div>
              
              {/* Grid */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const day = week.find(d => d.dayOfWeek === dayIndex);
                      return (
                        <div
                          key={dayIndex}
                          className={cn(
                            'w-3 h-3 rounded-sm transition-colors cursor-pointer',
                            day ? getColorClass(day.value) : 'bg-transparent',
                            'hover:ring-1 hover:ring-[var(--text-tertiary)]'
                          )}
                          onMouseEnter={() => day && setTooltip({ ...day, x: weekIndex, y: dayIndex })}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Tooltip */}
        {tooltip && (
          <div className="mt-4 text-sm text-[var(--text-secondary)]">
            <span className="font-medium">{tooltip.date}</span>
            <span className="mx-2">—</span>
            <span>{tooltip.value} sessions</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionHeatmap;
