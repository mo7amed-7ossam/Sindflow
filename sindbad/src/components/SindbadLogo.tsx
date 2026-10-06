import React from 'react';

interface SindbadLogoProps {
  lang?: 'ar' | 'en';
  size?: 'sm' | 'md';
}

export const SindbadLogo: React.FC<SindbadLogoProps> = ({
  lang = 'ar',
  size = 'md',
}) => {
  const isArabic = lang === 'ar';
  const iconSize = size === 'sm' ? 32 : 38;

  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Refined Layered Geometric Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
        aria-hidden="true"
      >
        {/* Subtle circular ambient carrier for clean contrast */}
        <rect width="48" height="48" rx="10" fill="#E7F5F7" />
        
        {/* Layer 1 - Top progressive directional stroke */}
        <path
          d="M13 16.5C13 15.67 13.67 15 14.5 15H31.5C33.15 15 34.2 16.78 33.4 18.2L31.8 21.1C31.45 21.72 30.8 22.1 30.1 22.1H14.5C13.67 22.1 13 21.43 13 20.6V16.5Z"
          fill="#008DA1"
          opacity="0.72"
        />

        {/* Layer 2 - Middle prominent directional beam */}
        <path
          d="M11 23.5C11 22.67 11.67 22 12.5 22H34.5C36.16 22 37.2 23.78 36.4 25.2L34.8 28.1C34.45 28.72 33.8 29.1 33.1 29.1H12.5C11.67 29.1 11 28.43 11 27.6V23.5Z"
          fill="#008DA1"
        />

        {/* Layer 3 - Base grounding directional band */}
        <path
          d="M15 30.5C15 29.67 15.67 29 16.5 29H28.5C30.15 29 31.2 30.78 30.4 32.2L29.2 34.4C28.85 35.05 28.18 35.45 27.45 35.45H16.5C15.67 35.45 15 34.78 15 33.95V30.5Z"
          fill="#006D7C"
          opacity="0.88"
        />

        {/* Accent dot / progressive anchor */}
        <circle cx="36" cy="18.5" r="2.2" fill="#E7B866" />
      </svg>

      {/* Wordmark & Product Identifier */}
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[19px] leading-tight font-semibold tracking-tight text-[#172326]">
            {isArabic ? 'سندباد' : 'Sindbad'}
          </span>
          <span className="text-[10.5px] font-medium tracking-wide uppercase px-1.5 py-0.5 rounded-[4px] bg-[#E7F5F7] text-[#006D7C]">
            {isArabic ? 'مهام' : 'Tasks'}
          </span>
        </div>
        <span className="text-[11px] leading-tight text-[#647276] font-normal mt-0.5">
          {isArabic ? 'نظام العمل الداخلي' : 'Internal Workspace'}
        </span>
      </div>
    </div>
  );
};
