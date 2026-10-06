import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthContent } from '../../locales/translations';

interface MetricCardsProps {
  content: AuthContent;
  todayCount: number;
  inProgressCount: number;
  completedCount: number;
  attentionCount: number;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  content,
  todayCount,
  inProgressCount,
  completedCount,
  attentionCount,
}) => {
  const m = content.sindFlow.home.metrics;

  const metrics = [
    {
      id: 'today',
      label: m.todayTasks,
      value: todayCount,
      icon: Calendar,
      accentColor: 'text-[#008DA1]',
      bgAccent: 'bg-[#E7F5F7]',
    },
    {
      id: 'inProgress',
      label: m.inProgress,
      value: inProgressCount,
      icon: Clock,
      accentColor: 'text-[#3479A8]',
      bgAccent: 'bg-[#EAF2F8]',
    },
    {
      id: 'completed',
      label: m.completedWeek,
      value: completedCount,
      icon: CheckCircle2,
      accentColor: 'text-[#218B68]',
      bgAccent: 'bg-[#EAF5F1]',
    },
    {
      id: 'attention',
      label: m.needsAttention,
      value: attentionCount,
      icon: AlertCircle,
      accentColor: 'text-[#C58A22]',
      bgAccent: 'bg-[#FBF4E8]',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 select-none">
      {metrics.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="p-3.5 sm:p-4 rounded-[10px] bg-[#FFFFFF] border border-[#E7ECEC] flex items-center justify-between transition-all hover:border-[#D1D8D8]"
          >
            <div className="space-y-1">
              <span className="text-xs text-[#647276] font-normal block leading-tight">
                {item.label}
              </span>
              <span className="text-[22px] font-semibold text-[#172326] tracking-tight block leading-tight font-mono">
                {item.value}
              </span>
            </div>

            <div className={`w-9 h-9 rounded-[8px] ${item.bgAccent} flex items-center justify-center shrink-0`}>
              <Icon className={`w-4 h-4 ${item.accentColor}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
