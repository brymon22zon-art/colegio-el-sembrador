import React from 'react';
import { X, Info, HelpCircle } from 'lucide-react';
import { SCHOOL_INFO } from '../data/mockData';

interface InfoModalProps {
  title: string | null;
  content: string | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ title, content, onClose }) => {
  if (!title || !content) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#00142f]/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-[#e5eeff] space-y-4 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between border-b border-[#e5eeff] pb-3">
          <div className="flex items-center gap-2 text-[#00142f]">
            <Info className="w-5 h-5 text-[#006c49]" />
            <h3 className="text-base font-bold text-[#00142f]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-[#eff4ff]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-xs text-[#44474e] leading-relaxed space-y-2">
          <p>{content}</p>
        </div>

        <div className="pt-2 border-t border-[#e5eeff] flex justify-between items-center text-[11px] text-[#44474e]">
          <span>{SCHOOL_INFO.name} • Atención y Soporte</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold text-white bg-[#00142f] hover:bg-[#0f294a] rounded-xl transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
