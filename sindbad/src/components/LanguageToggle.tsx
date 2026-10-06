import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../locales/translations';

interface LanguageToggleProps {
  currentLang: Language;
  onToggle: (nextLang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  currentLang,
  onToggle,
}) => {
  const nextLang: Language = currentLang === 'ar' ? 'en' : 'ar';
  const label = currentLang === 'ar' ? 'English' : 'العربية';

  return (
    <button
      type="button"
      onClick={() => onToggle(nextLang)}
      aria-label={`Switch language to ${label}`}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#647276] hover:text-[#172326] bg-transparent hover:bg-[#FFFFFF] border border-transparent hover:border-[#E7ECEC] rounded-[6px] transition-all duration-150 cursor-pointer select-none"
    >
      <Globe className="w-3.5 h-3.5 text-[#8A9799]" />
      <span>{label}</span>
    </button>
  );
};
