export type TaskPriority = 'high' | 'medium' | 'normal';
export type TaskStatus = 'pending' | 'inProgress' | 'review' | 'completed';

export interface TaskItemData {
  id: string;
  title: string;
  project: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  dueToday?: boolean;
  urgent?: boolean;
  assignee: {
    name: string;
    avatarInitials: string;
  };
}

export interface ActivityItemData {
  id: string;
  user: string;
  initials: string;
  action: string;
  target: string;
  timeAgo: string;
  type: 'completed' | 'assigned' | 'updated' | 'commented';
}

export type NavTabId = 'home' | 'myTasks' | 'team' | 'projects' | 'notifications';
