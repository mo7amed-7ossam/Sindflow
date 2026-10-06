import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  FolderKanban,
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  SlidersHorizontal,
} from 'lucide-react';
import { SindFlowLogo } from './SindFlowLogo';
import { NavTabId } from '../../types/sindflow';
import { AuthContent, Language } from '../../locales/translations';

interface SindFlowSidebarProps {
  content: AuthContent;
  lang: Language;
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  unreadNotificationsCount?: number;
  onSignOut: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const SindFlowSidebar: React.FC<SindFlowSidebarProps> = ({
  content,
  lang,
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  unreadNotificationsCount = 3,
  onSignOut,
  mobileOpen = false,
  onCloseMobile,
}) => {
  const isRtl = lang === 'ar';
  const nav = content.sindFlow.nav;

  const navItems: Array<{
    id: NavTabId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }> = [
    { id: 'home', label: nav.home, icon: LayoutDashboard },
    { id: 'myTasks', label: nav.myTasks, icon: CheckSquare, badge: 5 },
    { id: 'team', label: nav.team, icon: Users },
    { id: 'projects', label: nav.projects, icon: FolderKanban },
    { id: 'notifications', label: nav.notifications, icon: Bell, badge: unreadNotificationsCount },
  ];

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-[#FFFFFF] border-e border-[#E7ECEC] select-none">
      {/* Top Header & Brand */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-[#E7ECEC]">
          <SindFlowLogo lang={lang} size="sm" collapsed={collapsed} />

          {/* Desktop collapse toggle */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? nav.expand : nav.collapse}
            className="hidden lg:flex w-7 h-7 rounded-[6px] items-center justify-center text-[#8A9799] hover:text-[#172326] hover:bg-[#F2F5F5] transition-colors cursor-pointer"
          >
            {collapsed ? (
              isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
            ) : (
              isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="p-3 space-y-1" aria-label="Main Navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  if (onCloseMobile) onCloseMobile();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-[8px] transition-all duration-150 cursor-pointer text-start ${
                  isActive
                    ? 'bg-[#E7F5F7] text-[#006D7C] font-semibold'
                    : 'text-[#647276] hover:text-[#172326] hover:bg-[#F8FAFA] font-normal'
                } ${collapsed ? 'justify-center px-2' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <div className="relative shrink-0">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#008DA1]' : 'text-[#8A9799]'}`} />
                  {collapsed && item.badge && item.badge > 0 && (
                    <span className="absolute -top-1 -end-1 w-2 h-2 rounded-full bg-[#008DA1]" />
                  )}
                </div>

                {!collapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}

                {!collapsed && item.badge && item.badge > 0 && (
                  <span
                    className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-medium ${
                      isActive
                        ? 'bg-[#008DA1] text-white'
                        : 'bg-[#F2F5F5] text-[#647276] border border-[#E7ECEC]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User / Account Bottom Area */}
      <div className="p-3 border-t border-[#E7ECEC]">
        <div
          className={`flex items-center gap-3 p-2 rounded-[8px] hover:bg-[#F8FAFA] transition-colors ${
            collapsed ? 'justify-center p-1.5' : ''
          }`}
        >
          {/* User Avatar with online indicator */}
          <div className="relative shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#008DA1] text-white font-medium text-xs flex items-center justify-center tracking-tight shadow-xs">
              حج
            </div>
            <span className="absolute bottom-0 end-0 w-2 h-2 rounded-full bg-[#218B68] ring-1.5 ring-white" />
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0 text-start">
              <p className="text-[13px] font-medium text-[#172326] truncate leading-tight">
                حجازي
              </p>
              <p className="text-[11px] text-[#647276] truncate leading-tight mt-0.5">
                {content.sindFlow.navbar.roleSubtitle}
              </p>
            </div>
          )}

          {!collapsed && (
            <button
              type="button"
              onClick={onSignOut}
              title={content.sindFlow.navbar.signOut}
              className="w-7 h-7 rounded-[6px] text-[#8A9799] hover:text-[#D94B4B] hover:bg-[#FDF2F2] flex items-center justify-center transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 shrink-0 transition-all duration-200 z-20 ${
          collapsed ? 'w-[68px]' : 'w-[230px]'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div
            className={`relative w-[240px] max-w-[80vw] h-full shadow-lg ${
              isRtl ? 'me-auto' : 'ms-auto'
            }`}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
