import React from 'react';
import { EvidenceGrade } from '../../types';

interface Props {
  grade: EvidenceGrade;
  showText?: boolean;
  className?: string;
}

const GRADE_CONFIG: Record<EvidenceGrade, { bg: string; text: string; label: string; desc: string }> = {
  A: {
    bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
    text: 'text-emerald-300',
    label: '證據等級 A (最高)',
    desc: '多項大型隨機對照試驗 (RCT) 或高品質系統性回顧/Meta 分析支持。',
  },
  B: {
    bg: 'bg-cyan-500/15 border-cyan-500/40 text-cyan-400',
    text: 'text-cyan-300',
    label: '證據等級 B (優良)',
    desc: '前瞻性大型世代研究 (Prospective Cohorts) 或良好控制的介入性試驗。',
  },
  C: {
    bg: 'bg-salud-amber-500/15 border-salud-amber-500/40 text-salud-amber-400',
    text: 'text-salud-amber-300',
    label: '證據等級 C (中等)',
    desc: '觀察性研究、回溯性個案對照、或官方經驗法則 (Rule of Thumb)。',
  },
  D: {
    bg: 'bg-orange-500/15 border-orange-500/40 text-orange-400',
    text: 'text-orange-300',
    label: '證據等級 D (有限)',
    desc: '專家委員會共識、動物或細胞機制研究，人體臨床資料尚不充分。',
  },
  E: {
    bg: 'bg-slate-500/15 border-slate-500/40 text-slate-400',
    text: 'text-slate-300',
    label: '證據等級 E (待驗證)',
    desc: '個人經驗軼事或流行說法，目前缺乏足夠醫學同儕審查支持。',
  },
};

export const EvidenceBadge: React.FC<Props> = ({ grade, showText = true, className = '' }) => {
  const config = GRADE_CONFIG[grade] || GRADE_CONFIG.C;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono font-medium ${config.bg} ${className}`}
      title={config.desc}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      <span>Grade {grade}</span>
      {showText && <span className="text-[11px] opacity-80 hidden sm:inline">· {config.label.split(' ')[1]}</span>}
    </span>
  );
};
