import React, { useState } from 'react';
import {
  Search,
  Plus,
  Bell,
  Menu,
  Check,
  Globe,
  LogOut,
  User,
  Shield,
  Layers,
} from 'lucide-react';
import { AuthContent, Language } from '../../locales/translations';
import { LanguageToggle } from '../LanguageToggle';

interface SindFlowNavbarProps {
  content: AuthContent;
  lang: Language;
  onToggleLang: (nextLang: Language) => void;
  onOpenMobileMenu: () => void;
  onNewTaskClick: () => void;
  onSignOut: () => void;
  onSwitchToAuth: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  unreadCount?: number;
}

export const SindFlowNavbar: React.FC<SindFlowNavbarProps> = ({
  content,
  lang,
  onToggleLang,
  onOpenMobileMenu,
  onNewTaskClick,
  onSignOut,
  onSwitchToAuth,
  searchQuery,
  onSearchChange,
  unreadCount = 3,
}) => {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isRtl = lang === 'ar';
  const navContent = content.sindFlow.navbar;

  const notifications = [
    {
      id: 1,
      title: isRtl ? 'أكمل سالم إعداد تقرير الشحنات' : 'Salem completed the logistics dispatch audit',
      time: isRtl ? 'منذ 15 دقيقة' : '15m ago',
      unread: true,
    },
    {
      id: 2,
      title: isRtl ? 'تم إسناد مهمة فحص السيرفرات إليك' : 'Server health check was assigned to you',
      time: isRtl ? 'منذ ساعة' : '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: isRtl ? 'موافقة رئيس الفريق على خطة الأسبوع' : 'Team lead approved the weekly agenda',
      time: isRtl ? 'منذ 3 ساعات' : '3h ago',
      unread: false,
    },
  ];

  return (
    <header className="h-16 px-4 sm:px-6 bg-[#FFFFFF] border-b border-[#E7ECEC] flex items-center justify-between gap-4 sticky top-0 z-10 select-none">
      
      {/* Right Side (RTL): Mobile Hamburger & Breadcrumb Context */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="lg:hidden w-8 h-8 rounded-[6px] text-[#647276] hover:text-[#172326] hover:bg-[#F2F5F5] flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-[#172326] text-sm tracking-tight">
            {navContent.breadcrumb}
          </span>
          <span className="text-[#8A9799]">/</span>
          <span className="text-[#647276] hidden sm:inline-block">
            {navContent.workspace}
          </span>
        </div>
      </div>

      {/* Center: Restrained Compact Search Bar */}
      <div className="flex-1 max-w-[340px] hidden md:block">
        <div className="relative">
          <Search className={`w-3.5 h-3.5 text-[#8A9799] absolute top-1/2 -translate-y-1/2 pointer-events-none ${
            isRtl ? 'right-3' : 'left-3'
          }`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={navContent.searchPlaceholder}
            className={`w-full h-8 text-[12.5px] text-[#172326] placeholder-[#8A9799] bg-[#F8FAFA] hover:bg-[#F2F5F5] focus:bg-[#FFFFFF] border border-[#E7ECEC] focus:border-[#008DA1] rounded-[6px] transition-all outline-hidden ${
              isRtl ? 'pr-8 pl-3 text-right' : 'pl-8 pr-3 text-left'
            }`}
          />
        </div>
      </div>

      {/* Left Side (RTL): Actions, Notifications & Profile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        
        {/* Quick Action: New Task Button */}
        <button
          type="button"
          onClick={onNewTaskClick}
          className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-medium text-white bg-[#008DA1] hover:bg-[#007F91] active:bg-[#006D7C] rounded-[6px] transition-colors cursor-pointer shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{navContent.newTaskButton}</span>
        </button>

        {/* Notifications Icon with Popover */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-8 h-8 rounded-[6px] text-[#647276] hover:text-[#172326] hover:bg-[#F2F5F5] flex items-center justify-center transition-colors relative cursor-pointer"
            aria-label={navContent.notificationsTitle}
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 end-1.5 w-2 h-2 rounded-full bg-[#008DA1] ring-1 ring-white" />
            )}
          </button>

          {notificationsOpen && (
            <div
              className={`absolute top-full mt-2 w-80 bg-[#FFFFFF] border border-[#E7ECEC] rounded-[10px] shadow-lg p-3 z-30 animate-in fade-in-50 duration-150 ${
                isRtl ? 'left-0' : 'right-0'
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E7ECEC]">
                <span className="text-xs font-semibold text-[#172326]">
                  {navContent.notificationsTitle}
                </span>
                <button
                  type="button"
                  onClick={() => setNotificationsOpen(false)}
                  className="text-[11px] text-[#008DA1] hover:underline cursor-pointer"
                >
                  {navContent.markAllRead}
                </button>
              </div>

              <div className="space-y-2">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`p-2 rounded-[6px] text-xs transition-colors cursor-pointer ${
                      item.unread ? 'bg-[#E7F5F7]/50 hover:bg-[#E7F5F7]' : 'hover:bg-[#F8FAFA]'
                    }`}
                  >
                    <p className="text-[#172326] font-medium leading-snug">
                      {item.title}
                    </p>
                    <span className="text-[10px] text-[#8A9799] mt-0.5 inline-block">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quiet Language Toggle */}
        <LanguageToggle currentLang={lang} onToggle={onToggleLang} />

        {/* User Profile Access Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-[6px] hover:bg-[#F8FAFA] transition-colors cursor-pointer"
            aria-label="User profile menu"
          >
            <div className="w-7 h-7 rounded-full bg-[#008DA1] text-white text-[11px] font-semibold flex items-center justify-center">
              حج
            </div>
          </button>

          {profileOpen && (
            <div
              className={`absolute top-full mt-2 w-56 bg-[#FFFFFF] border border-[#E7ECEC] rounded-[10px] shadow-lg p-2 z-30 animate-in fade-in-50 duration-150 ${
                isRtl ? 'left-0' : 'right-0'
              }`}
            >
              <div className="px-2.5 py-2 border-b border-[#E7ECEC] mb-1">
                <p className="text-xs font-semibold text-[#172326]">
                  {navContent.profileTitle}
                </p>
                <p className="text-[11px] text-[#647276]">
                  {navContent.roleSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onSwitchToAuth();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#647276] hover:text-[#172326] hover:bg-[#F8FAFA] rounded-[6px] transition-colors cursor-pointer text-start"
              >
                <Layers className="w-3.5 h-3.5 text-[#008DA1]" />
                <span>{navContent.authScreenToggle}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setProfileOpen(false);
                  onSignOut();
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#D94B4B] hover:bg-[#FDF2F2] rounded-[6px] transition-colors cursor-pointer text-start"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{navContent.signOut}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};
