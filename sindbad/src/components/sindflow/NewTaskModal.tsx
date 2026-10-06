import React, { useState } from 'react';
import { X, Plus, Calendar, Flag, Folder } from 'lucide-react';
import { AuthContent, Language } from '../../locales/translations';
import { TaskItemData, TaskPriority } from '../../types/sindflow';

interface NewTaskModalProps {
  content: AuthContent;
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (newTask: Omit<TaskItemData, 'id'>) => void;
}

export const NewTaskModal: React.FC<NewTaskModalProps> = ({
  content,
  lang,
  isOpen,
  onClose,
  onAddTask,
}) => {
  const [title, setTitle] = useState('');
  const [project, setProject] = useState('العمليات اللوجستية');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [dueDate, setDueDate] = useState('اليوم، 4:00 م');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const isRtl = lang === 'ar';
  const m = content.sindFlow.modal;
  const pLabels = content.sindFlow.home.priorities;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError(true);
      return;
    }

    onAddTask({
      title: title.trim(),
      project,
      priority,
      status: 'pending',
      dueDate,
      dueToday: dueDate.includes('اليوم') || dueDate.toLowerCase().includes('today'),
      urgent: priority === 'high',
      assignee: {
        name: 'حجازي',
        avatarInitials: 'حج',
      },
    });

    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/25 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="relative w-full max-w-[440px] bg-[#FFFFFF] border border-[#E7ECEC] rounded-[12px] p-5 sm:p-6 shadow-xl z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E7ECEC]">
          <div>
            <h3 className="text-[16px] font-semibold text-[#172326] tracking-tight">
              {m.title}
            </h3>
            <p className="text-xs text-[#647276] mt-0.5">
              {m.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-[6px] text-[#8A9799] hover:text-[#172326] hover:bg-[#F2F5F5] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#172326]">
              {m.taskTitleLabel}
            </label>
            <input
              type="text"
              autoFocus
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError(false);
              }}
              placeholder={m.taskTitlePlaceholder}
              className={`w-full h-10 px-3 text-[13px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] outline-hidden transition-all ${
                error
                  ? 'border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                  : 'border-[#E7ECEC] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
              }`}
            />
            {error && (
              <p className="text-[11px] text-[#D94B4B]">
                {content.validation.required}
              </p>
            )}
          </div>

          {/* Project & Priority Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#172326] flex items-center gap-1.5">
                <Folder className="w-3.5 h-3.5 text-[#8A9799]" />
                <span>{m.projectLabel}</span>
              </label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full h-9 px-2.5 text-xs text-[#172326] bg-[#FFFFFF] border border-[#E7ECEC] rounded-[6px] outline-hidden focus:border-[#008DA1] cursor-pointer"
              >
                <option value="العمليات اللوجستية">العمليات اللوجستية</option>
                <option value="تطوير البوابة">تطوير البوابة</option>
                <option value="مراجعة التراخيص">مراجعة التراخيص</option>
                <option value="البنية التحتية">البنية التحتية</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-[#172326] flex items-center gap-1.5">
                <Flag className="w-3.5 h-3.5 text-[#8A9799]" />
                <span>{m.priorityLabel}</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full h-9 px-2.5 text-xs text-[#172326] bg-[#FFFFFF] border border-[#E7ECEC] rounded-[6px] outline-hidden focus:border-[#008DA1] cursor-pointer"
              >
                <option value="normal">{pLabels.normal}</option>
                <option value="medium">{pLabels.medium}</option>
                <option value="high">{pLabels.high}</option>
              </select>
            </div>
          </div>

          {/* Due Date */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-[#172326] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8A9799]" />
              <span>{m.dueDateLabel}</span>
            </label>
            <input
              type="text"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="مثال: غداً، 12:00 م"
              className="w-full h-9 px-3 text-xs text-[#172326] bg-[#FFFFFF] border border-[#E7ECEC] rounded-[6px] outline-hidden focus:border-[#008DA1]"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E7ECEC]">
            <button
              type="button"
              onClick={onClose}
              className="h-9 px-3.5 text-xs font-medium text-[#647276] hover:text-[#172326] hover:bg-[#F2F5F5] rounded-[6px] transition-colors cursor-pointer"
            >
              {m.cancel}
            </button>
            <button
              type="submit"
              className="h-9 px-4 text-xs font-medium text-white bg-[#008DA1] hover:bg-[#007F91] rounded-[6px] transition-colors cursor-pointer shadow-xs"
            >
              {m.create}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
