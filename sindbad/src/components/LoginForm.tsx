import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AuthContent, Language } from '../locales/translations';

interface LoginFormProps {
  content: AuthContent;
  lang: Language;
  onForgotPassword: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  content,
  lang,
  onForgotPassword,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ identifier?: string; password?: string }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isRtl = lang === 'ar';
  const t = content.login;
  const v = content.validation;

  const validate = () => {
    const newErrors: { identifier?: string; password?: string } = {};

    const cleanId = identifier.trim();
    if (!cleanId) {
      newErrors.identifier = v.required;
    } else {
      // Automatic detection: if it has '@', validate email; else validate phone
      const isEmail = cleanId.includes('@');
      if (isEmail) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanId)) {
          newErrors.identifier = v.invalidIdentifier;
        }
      } else {
        if (!/^[\d\s+()-]{7,16}$/.test(cleanId)) {
          newErrors.identifier = v.invalidIdentifier;
        }
      }
    }

    if (!password) {
      newErrors.password = v.required;
    } else if (password.length < 6) {
      newErrors.password = v.passwordLength;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(
        isRtl
          ? 'تم التحقق بنجاح. جاري فتح بيئة العمل...'
          : 'Authentication verified. Loading workspace...'
      );
    }, 750);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Supporting greeting / instruction */}
      <p className="text-[13px] text-[#647276] leading-relaxed">
        {t.subtitle}
      </p>

      {/* Success Notification */}
      {successMsg && (
        <div className="flex items-start gap-2.5 p-3 rounded-[8px] bg-[#EAF5F1] border border-[#C2E3D6] text-[#218B68] text-xs leading-relaxed animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Unified Identifier Field (No toggle, backend recognizes email vs phone) */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-[#172326]">
          {t.identifierLabel}
        </label>

        <div className="relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'right-3' : 'left-3'
            }`}
          >
            <User className="w-4 h-4 text-[#8A9799]" />
          </div>

          <input
            type="text"
            dir="auto"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              if (errors.identifier) setErrors((prev) => ({ ...prev, identifier: undefined }));
            }}
            placeholder={t.identifierPlaceholder}
            autoComplete="username"
            className={`w-full h-10 text-[13.5px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] transition-all outline-hidden ${
              isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
            } ${
              errors.identifier
                ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                : 'border-[#E7ECEC] hover:border-[#D1D8D8] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
            }`}
          />
        </div>

        {errors.identifier && (
          <p className="flex items-center gap-1 text-[11.5px] text-[#D94B4B] mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.identifier}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-medium text-[#172326]">
            {t.passwordLabel}
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs font-medium text-[#008DA1] hover:text-[#006D7C] hover:underline transition-colors cursor-pointer"
          >
            {t.forgotPassword}
          </button>
        </div>

        <div className="relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'right-3' : 'left-3'
            }`}
          >
            <Lock className="w-4 h-4 text-[#8A9799]" />
          </div>

          <input
            type={showPassword ? 'text' : 'password'}
            dir="ltr"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            placeholder={t.passwordPlaceholder}
            autoComplete="current-password"
            className={`w-full h-10 text-[13.5px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] transition-all outline-hidden ${
              isRtl ? 'pr-9 pl-9 text-right' : 'pl-9 pr-9 text-left'
            } ${
              errors.password
                ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                : 'border-[#E7ECEC] hover:border-[#D1D8D8] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
            }`}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className={`absolute top-1/2 -translate-y-1/2 text-[#8A9799] hover:text-[#172326] p-1 transition-colors cursor-pointer ${
              isRtl ? 'left-2.5' : 'right-2.5'
            }`}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="flex items-center gap-1 text-[11.5px] text-[#D94B4B] mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me */}
      <div className="flex items-center pt-0.5">
        <label className="inline-flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-3.5 h-3.5 rounded-[4px] border-[#D1D8D8] text-[#008DA1] focus:ring-[#008DA1] accent-[#008DA1] cursor-pointer"
          />
          <span className="text-xs text-[#647276] hover:text-[#172326] transition-colors">
            {t.rememberMe}
          </span>
        </label>
      </div>

      {/* Primary Submit CTA */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-10 px-4 text-[13.5px] font-medium text-white bg-[#008DA1] hover:bg-[#007F91] active:bg-[#006D7C] disabled:opacity-60 rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          {isSubmitting ? (
            <div className="inline-flex items-center gap-2">
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>{t.submitting}</span>
            </div>
          ) : (
            <span>{t.submitButton}</span>
          )}
        </button>
      </div>
    </form>
  );
};
