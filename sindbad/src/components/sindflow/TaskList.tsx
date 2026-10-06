import React, { useState } from 'react';
import { Check, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { TaskItemData, TaskPriority, TaskStatus } from '../../types/sindflow';
import { AuthContent, Language } from '../../locales/translations';

interface TaskListProps {
  content: AuthContent;
  lang: Language;
  tasks: TaskItemData[];
  onToggleTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  content,
  lang,
  tasks,
  onToggleTask,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'today' | 'urgent' | 'review'>('all');

  const isRtl = lang === 'ar';
  const t = content.sindFlow.home.tasksSection;
  const pLabels = content.sindFlow.home.priorities;
  const sLabels = content.sindFlow.home.statuses;

  const filteredTasks = tasks.filter((task) => {
    if (activeFilter === 'today') return task.dueToday;
    if (activeFilter === 'urgent') return task.priority === 'high';
    if (activeFilter === 'review') return task.status === 'review';
    return true;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#FDF2F2] text-[#D94B4B] border border-[#F9D7D7]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D94B4B]" />
            {pLabels.high}
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-[4px] bg-[#FBF4E8] text-[#C58A22] border border-[#F4E1BD]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C58A22]" />
            {pLabels.medium}
          </span>
        );
      case 'normal':
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-normal px-2 py-0.5 rounded-[4px] bg-[#F2F5F5] text-[#647276] border border-[#E7ECEC]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8A9799]" />
            {pLabels.normal}
          </span>
        );
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="text-[11.5px] font-medium text-[#218B68] bg-[#EAF5F1] px-2 py-0.5 rounded-[4px]">
            {sLabels.completed}
          </span>
        );
      case 'inProgress':
        return (
          <span className="text-[11.5px] font-medium text-[#006D7C] bg-[#E7F5F7] px-2 py-0.5 rounded-[4px]">
            {sLabels.inProgress}
          </span>
        );
      case 'review':
        return (
          <span className="text-[11.5px] font-medium text-[#3479A8] bg-[#EAF2F8] px-2 py-0.5 rounded-[4px]">
            {sLabels.review}
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="text-[11.5px] font-normal text-[#647276] bg-[#F2F5F5] px-2 py-0.5 rounded-[4px]">
            {sLabels.pending}
          </span>
        );
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7ECEC] rounded-[12px] overflow-hidden select-none">
      {/* Header and Filter Controls */}
      <div className="p-4 sm:p-5 border-b border-[#E7ECEC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172326] tracking-tight">
            {t.title}
          </h2>
          <p className="text-xs text-[#647276] mt-0.5">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="inline-flex p-0.5 bg-[#F2F5F5] rounded-[6px] border border-[#E7ECEC] self-start sm:self-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 font-medium rounded-[4px] transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-white text-[#172326] shadow-xs'
                : 'text-[#647276] hover:text-[#172326]'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('today')}
            className={`px-2.5 py-1 font-medium rounded-[4px] transition-all cursor-pointer ${
              activeFilter === 'today'
                ? 'bg-white text-[#172326] shadow-xs'
                : 'text-[#647276] hover:text-[#172326]'
            }`}
          >
            {t.filterToday}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('urgent')}
            className={`px-2.5 py-1 font-medium rounded-[4px] transition-all cursor-pointer ${
              activeFilter === 'urgent'
                ? 'bg-white text-[#172326] shadow-xs'
                : 'text-[#647276] hover:text-[#172326]'
            }`}
          >
            {t.filterUrgent}
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('review')}
            className={`px-2.5 py-1 font-medium rounded-[4px] transition-all cursor-pointer ${
              activeFilter === 'review'
                ? 'bg-white text-[#172326] shadow-xs'
                : 'text-[#647276] hover:text-[#172326]'
            }`}
          >
            {t.filterReview}
          </button>
        </div>
      </div>

      {/* Structured Task List / Hybrid Table */}
      {filteredTasks.length === 0 ? (
        <div className="py-12 text-center text-xs text-[#8A9799]">
          {t.emptyState}
        </div>
      ) : (
        <div className="divide-y divide-[#E7ECEC]">
          {filteredTasks.map((task) => {
            const isCompleted = task.status === 'completed';

            return (
              <div
                key={task.id}
                className={`p-3.5 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3.5 hover:bg-[#F8FAFA] transition-colors ${
                  isCompleted ? 'bg-[#FAFCFC]' : ''
                }`}
              >
                {/* Right / Start: Checkbox & Task Title */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  {/* Task Toggle Button */}
                  <button
                    type="button"
                    onClick={() => onToggleTask(task.id)}
                    aria-label={`Toggle task: ${task.title}`}
                    className={`w-5 h-5 rounded-[5px] border flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-[#218B68] border-[#218B68] text-white shadow-xs'
                        : 'border-[#D1D8D8] hover:border-[#008DA1] bg-white'
                    }`}
                  >
                    {isCompleted && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                  </button>

                  {/* Title & Project context */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className={`text-[13px] font-medium transition-all ${
                          isCompleted
                            ? 'text-[#8A9799] line-through decoration-[#8A9799]/60'
                            : 'text-[#172326]'
                        }`}
                      >
                        {task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#647276]">
                      <span className="font-medium text-[#006D7C] bg-[#E7F5F7] px-1.5 py-0.2 rounded-[3px]">
                        {task.project}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1 text-[#8A9799]">
                        <Clock className="w-3 h-3" />
                        <span>{task.dueDate}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Left / End: Priority, Status, Assignee */}
                <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
                  <div className="hidden sm:block">
                    {getPriorityBadge(task.priority)}
                  </div>

                  <div>
                    {getStatusBadge(task.status)}
                  </div>

                  {/* Assignee Avatar Initials */}
                  <div
                    title={task.assignee.name}
                    className="w-6 h-6 rounded-full bg-[#E7F5F7] text-[#006D7C] border border-[#CDE9ED] text-[10px] font-medium flex items-center justify-center shrink-0"
                  >
                    {task.assignee.avatarInitials}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
