import React from 'react';

export type AuthMode = 'login' | 'register';

interface AuthModeSwitcherProps {
  currentMode: AuthMode;
  onChangeMode: (mode: AuthMode) => void;
  loginLabel: string;
  registerLabel: string;
}

export const AuthModeSwitcher: React.FC<AuthModeSwitcherProps> = ({
  currentMode,
  onChangeMode,
  loginLabel,
  registerLabel,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Authentication selection"
      className="flex items-center gap-6 border-b border-[#E7ECEC] select-none"
    >
      <button
        type="button"
        role="tab"
        id="tab-login"
        aria-selected={currentMode === 'login'}
        aria-controls="auth-panel"
        onClick={() => onChangeMode('login')}
        className={`relative pb-3 text-[14px] transition-colors cursor-pointer ${
          currentMode === 'login'
            ? 'text-[#172326] font-semibold'
            : 'text-[#647276] hover:text-[#172326] font-normal'
        }`}
      >
        <span>{loginLabel}</span>
        {currentMode === 'login' && (
          <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#008DA1] rounded-t-full" />
        )}
      </button>

      <button
        type="button"
        role="tab"
        id="tab-register"
        aria-selected={currentMode === 'register'}
        aria-controls="auth-panel"
        onClick={() => onChangeMode('register')}
        className={`relative pb-3 text-[14px] transition-colors cursor-pointer ${
          currentMode === 'register'
            ? 'text-[#172326] font-semibold'
            : 'text-[#647276] hover:text-[#172326] font-normal'
        }`}
      >
        <span>{registerLabel}</span>
        {currentMode === 'register' && (
          <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#008DA1] rounded-t-full" />
        )}
      </button>
    </div>
  );
};
