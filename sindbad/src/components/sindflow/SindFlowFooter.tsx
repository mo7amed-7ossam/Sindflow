import React from 'react';
import { AuthContent } from '../../locales/translations';

interface SindFlowFooterProps {
  content: AuthContent;
}

export const SindFlowFooter: React.FC<SindFlowFooterProps> = ({ content }) => {
  const f = content.sindFlow.footer;

  return (
    <footer className="w-full mt-10 py-5 px-6 border-t border-[#E7ECEC] text-[11px] text-[#8A9799] flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
      <div className="flex items-center gap-2">
        <span dangerouslySetInnerHTML={{ __html: f.systemNote }} />
      </div>

      <div className="flex items-center gap-4 text-[#647276]">
        <button type="button" className="hover:text-[#172326] transition-colors cursor-pointer">
          {f.support}
        </button>
        <span>&bull;</span>
        <button type="button" className="hover:text-[#172326] transition-colors cursor-pointer">
          {f.policy}
        </button>
        <span>&bull;</span>
        <span className="font-mono text-[#8A9799]">{f.version}</span>
      </div>
    </footer>
  );
};
