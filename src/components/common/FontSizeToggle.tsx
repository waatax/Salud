import React from 'react';
import { useFontSize, FontSize } from '../../context/FontSizeContext';
import { Type } from 'lucide-react';

interface Props {
  variant?: 'compact' | 'full';
  className?: string;
}

export const FontSizeToggle: React.FC<Props> = ({ variant = 'compact', className = '' }) => {
  const { fontSize, setFontSize, cycleFontSize, fontSizeLabel } = useFontSize();

  if (variant === 'compact') {
    return (
      <button
        onClick={cycleFontSize}
        className={`btn-tactile flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all font-mono text-xs shadow-sm ${className}`}
        title={`當前字級：${fontSizeLabel}，點擊切換`}
        aria-label="切換字型大小"
      >
        <Type className="w-3.5 h-3.5 text-nature-sky-600 dark:text-nature-sky-400" />
        <span className="font-bold text-[11px]">{fontSize === 'standard' ? 'A' : fontSize === 'comfort' ? 'A+' : 'A++'}</span>
      </button>
    );
  }

  const options: { id: FontSize; label: string; text: string }[] = [
    { id: 'standard', label: '標準', text: '100%' },
    { id: 'comfort', label: '舒適', text: '115%' },
    { id: 'large', label: '大字', text: '130%' },
  ];

  return (
    <div className={`flex items-center gap-1 p-1 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 font-mono text-xs ${className}`}>
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setFontSize(opt.id)}
          className={`btn-tactile px-2.5 py-1 rounded-xl transition-all ${
            fontSize === opt.id
              ? 'bg-nature-sky-500 text-white font-bold shadow-cyan-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <span>{opt.label}</span>
          <span className="text-[10px] opacity-80 ml-1">({opt.text})</span>
        </button>
      ))}
    </div>
  );
};
