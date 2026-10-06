import React, { useState } from 'react';
import { Calendar, Sparkles, FolderKanban, Users } from 'lucide-react';
import { AuthContent, Language } from '../../locales/translations';
import { MetricCards } from './MetricCards';
import { TaskList } from './TaskList';
import { TeamActivityFeed } from './TeamActivityFeed';
import { SindFlowFooter } from './SindFlowFooter';
import { TaskItemData, ActivityItemData } from '../../types/sindflow';

interface SindFlowHomeProps {
  content: AuthContent;
  lang: Language;
  onNewTaskClick: () => void;
  tasks: TaskItemData[];
  onToggleTask: (taskId: string) => void;
  searchQuery: string;
}

export const SindFlowHome: React.FC<SindFlowHomeProps> = ({
  content,
  lang,
  onNewTaskClick,
  tasks,
  onToggleTask,
  searchQuery,
}) => {
  const isRtl = lang === 'ar';
  const home = content.sindFlow.home;

  const initialActivities: ActivityItemData[] = [
    {
      id: '1',
      user: isRtl ? 'سالم البلوشي' : 'Salem Al-Balushi',
      initials: 'سب',
      action: isRtl ? 'أكمل فحص' : 'completed review for',
      target: isRtl ? 'تقرير الشحنات للأسبوع الثالث' : 'Week 3 Dispatch Audit',
      timeAgo: isRtl ? 'منذ 18 دقيقة' : '18m ago',
      type: 'completed',
    },
    {
      id: '2',
      user: isRtl ? 'سارة المعمرية' : 'Sara Al-Maamari',
      initials: 'سم',
      action: isRtl ? 'حدّثت حالة' : 'updated status of',
      target: isRtl ? 'تصاريح النقل الجوي' : 'Air Transport Permits',
      timeAgo: isRtl ? 'منذ 45 دقيقة' : '45m ago',
      type: 'updated',
    },
    {
      id: '3',
      user: isRtl ? 'خالد الهنائي' : 'Khalid Al-Hinai',
      initials: 'خه',
      action: isRtl ? 'أضاف ملاحظة في' : 'added a note on',
      target: isRtl ? 'جدول توزيع المهام' : 'Team Task Allocation',
      timeAgo: isRtl ? 'منذ ساعتين' : '2h ago',
      type: 'commented',
    },
  ];

  // Filter tasks based on navbar search query if typed
  const displayedTasks = tasks.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.project.toLowerCase().includes(q)
    );
  });

  // Calculate live metric counts from tasks state
  const todayTasksCount = tasks.filter((t) => t.dueToday && t.status !== 'completed').length;
  const inProgressCount = tasks.filter((t) => t.status === 'inProgress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length + 8; // base + completed
  const attentionCount = tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length;

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto w-full space-y-6 sm:space-y-7">
        
        {/* 1. Welcome & Context Section */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#E7ECEC]/60 select-none">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-[20px] sm:text-[22px] font-semibold text-[#172326] tracking-tight">
                {home.greeting}
              </h1>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#006D7C] bg-[#E7F5F7] px-2 py-0.5 rounded-[4px] border border-[#CDE9ED]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008DA1]" />
                <span>{home.teamBadge}</span>
              </span>
            </div>
            <p className="text-[13px] text-[#647276]">
              {home.contextMessage}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 text-xs text-[#8A9799] bg-[#FFFFFF] px-2.5 py-1 rounded-[6px] border border-[#E7ECEC] self-start sm:self-auto shrink-0">
            <Calendar className="w-3.5 h-3.5 text-[#008DA1]" />
            <span>{isRtl ? 'الاثنين، 5 أكتوبر' : 'Monday, Oct 5'}</span>
          </div>
        </section>

        {/* 2. Lightweight Summary Information */}
        <section aria-label="Summary Metrics">
          <MetricCards
            content={content}
            todayCount={todayTasksCount}
            inProgressCount={inProgressCount}
            completedCount={completedCount}
            attentionCount={attentionCount}
          />
        </section>

        {/* 3. Primary Work Area: Priority Tasks & Team Workspace Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Work Column: Structured Task Hybrid List (8 cols on desktop) */}
          <div className="lg:col-span-8 space-y-4">
            <TaskList
              content={content}
              lang={lang}
              tasks={displayedTasks}
              onToggleTask={onToggleTask}
            />
          </div>

          {/* Secondary Work Column: Team Activity & Active Focus (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Team Activity Feed */}
            <TeamActivityFeed
              content={content}
              activities={initialActivities}
            />

            {/* Subtle Team / Project Focus Context Box */}
            <div className="bg-[#FFFFFF] border border-[#E7ECEC] rounded-[12px] p-4 select-none">
              <div className="flex items-center gap-2 mb-2 text-[#008DA1]">
                <FolderKanban className="w-4 h-4" />
                <span className="text-xs font-semibold text-[#172326]">
                  {isRtl ? 'المسار النشط حالياً' : 'Active Project Stream'}
                </span>
              </div>
              <p className="text-xs font-medium text-[#172326]">
                {isRtl ? 'تطوير مسارات الخدمات والعمليات اللوجستية' : 'Logistics & Workflow Modernization'}
              </p>
              <p className="text-[11.5px] text-[#647276] mt-1 leading-normal">
                {isRtl ? 'مرحلة الاعتماد الفني ومطابقة الجودة' : 'Technical sign-off & operational alignment phase'}
              </p>
              
              <div className="mt-3 pt-3 border-t border-[#E7ECEC] flex items-center justify-between text-[11px] text-[#8A9799]">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3 text-[#647276]" />
                  <span>{isRtl ? '6 أعضاء يشاركون في المسار' : '6 team members active'}</span>
                </span>
                <span className="font-mono text-[#008DA1] font-medium">85%</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Subtle Application Footer */}
      <SindFlowFooter content={content} />
    </div>
  );
};
