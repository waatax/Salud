import React from 'react';
import { KnowledgePage } from '../../types';
import {
  Lightbulb,
  Sparkles,
  CheckCircle,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  Droplets,
  Flame,
  Zap,
  Coffee,
  HeartCrack,
  Sun
} from 'lucide-react';

import { renderPageIllustration } from './PageIllustrations';

interface Props {
  page: KnowledgePage;
}

export const VisualPlainEnglishDecoder: React.FC<Props> = ({ page }) => {
  if (!page.plain_analogy && !page.life_hack) return null;

  return (
    <div className="p-5 sm:p-6 rounded-3xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/70 via-white to-sky-50/50 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 shadow-sm space-y-4 font-sans text-xs">
      {/* 標題欄 */}
      <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-amber-500 text-white shadow-warm-glow">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm sm:text-base text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>深入淺出 · 生活視覺化解密</span>
              <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                秒懂生理學
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              用最接地氣的生活神譬喻，30 秒打通醫學核心觀念
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400 hidden sm:inline">
          {page.analogy_title || '生活譬喻'}
        </span>
      </div>

      {/* 神級生活譬喻 */}
      {page.plain_analogy && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-amber-900 dark:text-amber-300 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>【生活神級譬喻：{page.analogy_title}】</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-sans bg-white/80 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-amber-100 dark:border-slate-700/80 shadow-xs">
            {page.plain_analogy}
          </p>
        </div>
      )}

      {/* 專屬向量圖解展示 */}
      {renderPageIllustration(page)}

      {/* 30 秒生活實踐行動指引 (Actionable Life Hack) */}
      {page.life_hack && (
        <div className="p-3.5 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-900 dark:text-emerald-300 font-mono">
            <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>30 秒帶走生活行動指引 (Actionable Life Hack)</span>
          </div>
          <p className="text-xs text-emerald-950 dark:text-emerald-100 leading-relaxed font-sans font-medium pl-5">
            👉 {page.life_hack}
          </p>
        </div>
      )}
    </div>
  );
};
