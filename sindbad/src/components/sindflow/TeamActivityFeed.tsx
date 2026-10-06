import React from 'react';
import { ActivityItemData } from '../../types/sindflow';
import { AuthContent } from '../../locales/translations';
import { CheckCircle2, GitCommit, UserPlus, MessageSquare } from 'lucide-react';

interface TeamActivityFeedProps {
  content: AuthContent;
  activities: ActivityItemData[];
}

export const TeamActivityFeed: React.FC<TeamActivityFeedProps> = ({
  content,
  activities,
}) => {
  const t = content.sindFlow.home.activitySection;

  const getActionIcon = (type: ActivityItemData['type']) => {
    switch (type) {
      case 'completed':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#218B68]" />;
      case 'assigned':
        return <UserPlus className="w-3.5 h-3.5 text-[#008DA1]" />;
      case 'updated':
        return <GitCommit className="w-3.5 h-3.5 text-[#3479A8]" />;
      case 'commented':
      default:
        return <MessageSquare className="w-3.5 h-3.5 text-[#C58A22]" />;
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7ECEC] rounded-[12px] p-4 sm:p-5 select-none">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E7ECEC]">
        <div>
          <h3 className="text-[14px] font-semibold text-[#172326] tracking-tight">
            {t.title}
          </h3>
          <p className="text-[11px] text-[#647276]">
            {t.subtitle}
          </p>
        </div>

        <span className="text-[11px] font-medium text-[#008DA1] hover:underline cursor-pointer">
          {t.viewAll}
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((item) => (
          <div key={item.id} className="flex items-start gap-3 text-xs">
            {/* User Initials Badge */}
            <div className="w-6 h-6 rounded-full bg-[#F2F5F5] text-[#172326] font-medium text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-[#E7ECEC]">
              {item.initials}
            </div>

            {/* Action Narrative */}
            <div className="flex-1 min-w-0 leading-relaxed">
              <span className="font-semibold text-[#172326]">{item.user}</span>{' '}
              <span className="text-[#647276]">{item.action}</span>{' '}
              <span className="font-medium text-[#006D7C]">{item.target}</span>
              <span className="block text-[10.5px] text-[#8A9799] mt-0.5">
                {item.timeAgo}
              </span>
            </div>

            {/* Micro Icon */}
            <div className="shrink-0 mt-1">
              {getActionIcon(item.type)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
