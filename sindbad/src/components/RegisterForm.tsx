import React, { useState } from 'react';
import { Eye, EyeOff, Lock, User, AtSign, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AuthContent, Language } from '../locales/translations';

interface RegisterFormProps {
  content: AuthContent;
  lang: Language;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  content,
  lang,
}) => {
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    username?: string;
    identifier?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isRtl = lang === 'ar';
  const t = content.register;
  const v = content.validation;

  const validate = () => {
    const newErrors: {
      username?: string;
      identifier?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    const cleanUsername = username.trim();
    if (!cleanUsername) {
      newErrors.username = v.required;
    } else if (cleanUsername.length < 3) {
      newErrors.username = isRtl
        ? 'اسم المستخدم يجب ألا يقل عن 3 أحرف'
        : 'Username must be at least 3 characters';
    }

    const cleanId = identifier.trim();
    if (!cleanId) {
      newErrors.identifier = v.required;
    } else {
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
    } else if (password.length < 8) {
      newErrors.password = v.passwordLength;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = v.required;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = v.passwordMismatch;
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
          ? `تم إنشاء حساب ${username} بنجاح. جاري فتح بيئة العمل...`
          : `Account for ${username} created successfully. Loading workspace...`
      );
    }, 750);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* Supporting text */}
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

      {/* 1. Username Field (اسم المستخدم) */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#172326]">
          {t.usernameLabel}
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
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors((prev) => ({ ...prev, username: undefined }));
            }}
            placeholder={t.usernamePlaceholder}
            autoComplete="name"
            className={`w-full h-10 text-[13.5px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] transition-all outline-hidden ${
              isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
            } ${
              errors.username
                ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                : 'border-[#E7ECEC] hover:border-[#D1D8D8] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
            }`}
          />
        </div>

        {errors.username && (
          <p className="flex items-center gap-1 text-[11.5px] text-[#D94B4B] mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.username}</span>
          </p>
        )}
      </div>

      {/* 2. Identifier Field (بيانات الحساب: البريد الإلكتروني أو رقم الهاتف) */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#172326]">
          {t.identifierLabel}
        </label>

        <div className="relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'right-3' : 'left-3'
            }`}
          >
            <AtSign className="w-4 h-4 text-[#8A9799]" />
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

      {/* 3. Password Creation */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#172326]">
          {t.passwordLabel}
        </label>
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
            autoComplete="new-password"
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

      {/* 4. Confirm Password */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-[#172326]">
          {t.confirmPasswordLabel}
        </label>
        <div className="relative">
          <div
            className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
              isRtl ? 'right-3' : 'left-3'
            }`}
          >
            <Lock className="w-4 h-4 text-[#8A9799]" />
          </div>

          <input
            type={showConfirmPassword ? 'text' : 'password'}
            dir="ltr"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }}
            placeholder={t.confirmPasswordPlaceholder}
            autoComplete="new-password"
            className={`w-full h-10 text-[13.5px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] transition-all outline-hidden ${
              isRtl ? 'pr-9 pl-9 text-right' : 'pl-9 pr-9 text-left'
            } ${
              errors.confirmPassword
                ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                : 'border-[#E7ECEC] hover:border-[#D1D8D8] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
            }`}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
            className={`absolute top-1/2 -translate-y-1/2 text-[#8A9799] hover:text-[#172326] p-1 transition-colors cursor-pointer ${
              isRtl ? 'left-2.5' : 'right-2.5'
            }`}
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {errors.confirmPassword && (
          <p className="flex items-center gap-1 text-[11.5px] text-[#D94B4B] mt-1">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
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
