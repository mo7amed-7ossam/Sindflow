import React, { useState } from 'react';
import { User, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { AuthContent, Language } from '../locales/translations';

interface ForgotPasswordFormProps {
  content: AuthContent;
  lang: Language;
  onBackToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  content,
  lang,
  onBackToLogin,
}) => {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSent, setIsSent] = useState(false);

  const isRtl = lang === 'ar';
  const t = content.forgot;
  const v = content.validation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setError(v.required);
      return;
    }

    setIsSubmitting(true);
    setError(null);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 750);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-[17px] font-semibold text-[#172326] tracking-tight">
          {t.title}
        </h2>
        <p className="text-[13px] text-[#647276] leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {isSent ? (
        <div className="space-y-4 pt-2">
          <div className="p-3.5 rounded-[8px] bg-[#EAF5F1] border border-[#C2E3D6] text-[#218B68] text-xs leading-relaxed flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{t.sentConfirmation}</span>
          </div>

          <button
            type="button"
            onClick={onBackToLogin}
            className="w-full h-10 px-4 text-[13.5px] font-medium text-white bg-[#008DA1] hover:bg-[#007F91] rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{t.backToLogin}</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
                  if (error) setError(null);
                }}
                placeholder={t.identifierPlaceholder}
                className={`w-full h-10 text-[13.5px] text-[#172326] placeholder-[#8A9799] bg-[#FFFFFF] border rounded-[8px] transition-all outline-hidden ${
                  isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                } ${
                  error
                    ? 'border-[#D94B4B] focus:border-[#D94B4B] focus:ring-2 focus:ring-[#FDF2F2]'
                    : 'border-[#E7ECEC] hover:border-[#D1D8D8] focus:border-[#008DA1] focus:ring-2 focus:ring-[#E7F5F7]'
                }`}
              />
            </div>
            {error && (
              <p className="flex items-center gap-1 text-[11.5px] text-[#D94B4B] mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{error}</span>
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-10 px-4 text-[13.5px] font-medium text-white bg-[#008DA1] hover:bg-[#007F91] active:bg-[#006D7C] disabled:opacity-60 rounded-[8px] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              {isSubmitting ? (
                <span>{t.submitting}</span>
              ) : (
                <span>{t.submitButton}</span>
              )}
            </button>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onBackToLogin}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#647276] hover:text-[#172326] transition-colors cursor-pointer"
            >
              {isRtl ? (
                <ArrowRight className="w-3.5 h-3.5" />
              ) : (
                <ArrowLeft className="w-3.5 h-3.5" />
              )}
              <span>{t.backToLogin}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

