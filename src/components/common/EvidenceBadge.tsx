import React from 'react';
import { EvidenceGrade } from '../../types';

interface Props {
  grade: EvidenceGrade;
  showText?: boolean;
  className?: string;
}

const GRADE_CONFIG: Record<EvidenceGrade, { bg: string; text: string; label: string; desc: string }> = {
  A: {
    bg: 'bg-emerald-50 border-emerald-300 text-emerald-800 dark:bg-emerald-500/15 dark:border-emerald-500/40 dark:text-emerald-300',
    text: 'text-emerald-300',
    label: '閱讀標籤 A',
    desc: '多項大型隨機對照試驗 (RCT) 或高品質系統性回顧/Meta 分析支持。',
  },
  B: {
    bg: 'bg-cyan-50 border-cyan-300 text-cyan-800 dark:bg-cyan-500/15 dark:border-cyan-500/40 dark:text-cyan-300',
    text: 'text-cyan-300',
    label: '閱讀標籤 B',
    desc: '前瞻性大型世代研究 (Prospective Cohorts) 或良好控制的介入性試驗。',
  },
  C: {
    bg: 'bg-amber-50 border-amber-300 text-amber-800 dark:bg-amber-500/15 dark:border-amber-500/40 dark:text-amber-300',
    text: 'text-salud-amber-300',
    label: '閱讀標籤 C',
    desc: '觀察性研究、回溯性個案對照、或官方經驗法則 (Rule of Thumb)。',
  },
  D: {
    bg: 'bg-orange-50 border-orange-300 text-orange-800 dark:bg-orange-500/15 dark:border-orange-500/40 dark:text-orange-300',
    text: 'text-orange-300',
    label: '閱讀標籤 D',
    desc: '專家委員會共識、動物或細胞機制研究，人體臨床資料尚不充分。',
  },
  E: {
    bg: 'bg-slate-100 border-slate-300 text-slate-700 dark:bg-slate-500/15 dark:border-slate-500/40 dark:text-slate-300',
    text: 'text-slate-300',
    label: '閱讀標籤 E',
    desc: '個人經驗軼事或流行說法，目前缺乏足夠醫學同儕審查支持。',
  },
};

export const EvidenceBadge: React.FC<Props> = ({ grade, showText = true, className = '' }) => {
  const config = GRADE_CONFIG[grade] || GRADE_CONFIG.C;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-mono font-medium ${config.bg} ${className}`}
      title={`本站閱讀標籤，非正式 GRADE 評定。${config.desc}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      <span>實證 {grade}</span>
      {showText && <span className="text-[0.75rem] opacity-80 hidden sm:inline">· {'閱讀標籤'}</span>}
    </span>
  );
};
