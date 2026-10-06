import React from 'react';
import { SindbadLogo } from './SindbadLogo';
import { AuthContent, Language } from '../locales/translations';

interface BrandEditorialProps {
  content: AuthContent;
  lang: Language;
}

export const BrandEditorial: React.FC<BrandEditorialProps> = ({
  content,
  lang,
}) => {
  const isRtl = lang === 'ar';
  const editorial = content.brandEditorial;

  return (
    <div className="relative h-full w-full flex flex-col justify-between px-8 sm:px-12 lg:px-16 py-8 sm:py-10 lg:py-12 select-none overflow-hidden bg-[#F4F7F7]">
      
      {/* 
        SUBTLE ARCHITECTURAL WORKFLOW ATMOSPHERE
        Softened lines, reduced density, no card fragments, sparse directional flow.
      */}
      <div 
        className={`absolute inset-0 w-full h-full pointer-events-none ${
          isRtl ? 'scale-x-100' : '-scale-x-100'
        }`}
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 720 720"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Tertiary architectural rhythm: extremely soft guides */}
          <line x1="120" y1="0" x2="120" y2="720" stroke="#008DA1" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.08" />
          <line x1="380" y1="0" x2="380" y2="720" stroke="#008DA1" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.07" />
          <line x1="600" y1="0" x2="600" y2="720" stroke="#008DA1" strokeWidth="0.6" strokeDasharray="2 6" opacity="0.08" />
          
          <line x1="0" y1="190" x2="720" y2="190" stroke="#E7ECEC" strokeWidth="0.6" opacity="0.4" />
          <line x1="0" y1="510" x2="720" y2="510" stroke="#E7ECEC" strokeWidth="0.6" opacity="0.4" />

          {/* Soft connecting path: directional stage flow */}
          <path
            d="M-30 230H160C190 230 215 215 230 200L260 170C275 155 295 145 325 145H540C570 145 595 160 610 185L640 230H740"
            stroke="#008DA1"
            strokeWidth="0.85"
            opacity="0.14"
          />

          {/* Parallel secondary guide path */}
          <path
            d="M-40 470H200C230 470 250 485 265 500L295 530C310 545 330 555 360 555H660"
            stroke="#006D7C"
            strokeWidth="0.75"
            strokeDasharray="3 5"
            opacity="0.12"
          />

          {/* Sparse milestone nodes (Soft, minimal, zero card boxes) */}
          <g transform="translate(160, 224)" opacity="0.22">
            <circle cx="6" cy="6" r="3" fill="#008DA1" />
            <circle cx="6" cy="6" r="6" stroke="#008DA1" strokeWidth="0.75" />
          </g>

          <g transform="translate(325, 139)" opacity="0.25">
            <circle cx="6" cy="6" r="5" fill="#FFFFFF" stroke="#008DA1" strokeWidth="0.75" />
            <circle cx="6" cy="6" r="2" fill="#008DA1" />
          </g>

          <g transform="translate(540, 139)" opacity="0.2">
            <circle cx="6" cy="6" r="3" fill="#E7B866" />
            <circle cx="6" cy="6" r="6" stroke="#E7B866" strokeWidth="0.75" strokeDasharray="2 2" />
          </g>

          <g transform="translate(200, 464)" opacity="0.18">
            <circle cx="6" cy="6" r="3" fill="#008DA1" />
          </g>

          <g transform="translate(360, 549)" opacity="0.18">
            <circle cx="6" cy="6" r="2.5" fill="#006D7C" />
          </g>
        </svg>
      </div>

      {/* PRIMARY LAYER: Top Identity & Meta Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <SindbadLogo lang={lang} size="sm" />
        
        <div className="inline-flex items-center gap-2 text-[11px] text-[#647276] bg-white/70 backdrop-blur-xs px-2.5 py-1 rounded-[6px] border border-[#E7ECEC]/70">
          <span className="w-1.5 h-1.5 rounded-full bg-[#008DA1]" />
          <span>{editorial.meta}</span>
        </div>
      </div>

      {/* PRIMARY LAYER: Center Hero Narrative (Preserved, refined, intentional) */}
      <div className="relative z-10 max-w-[480px] my-auto py-10 space-y-3.5">
        <h2 className="text-[25px] sm:text-[28px] font-semibold text-[#172326] leading-[1.32] tracking-tight">
          {editorial.statement}
        </h2>
        <p className="text-[13.5px] text-[#647276] leading-relaxed max-w-[430px]">
          {editorial.substatement}
        </p>
      </div>

      {/* PRIMARY LAYER: Bottom System Attribution */}
      <div className="relative z-10 pt-6 border-t border-[#E7ECEC]/70 flex items-center justify-between text-[11.5px] text-[#8A9799]">
        <span>{content.systemTitle}</span>
        <span>{content.brandName} &copy; {new Date().getFullYear()}</span>
      </div>
    </div>
  );
};
