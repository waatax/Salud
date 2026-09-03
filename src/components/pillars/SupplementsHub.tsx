import React from 'react';
import { SimSupplementChecker } from '../simulators/SimSupplementChecker';
import { useLanguage } from '../../i18n';
import { Pill, ShieldCheck, AlertOctagon, Sparkles, BookOpen } from 'lucide-react';

export const SupplementsHub: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-salud-amber/40 bg-gradient-to-br from-amber-100/70 via-salud-light-card/80 to-slate-100 dark:from-amber-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-amber/40 bg-salud-amber/20 text-salud-amber-700 dark:text-salud-amber-300">
            Health Pillar 04 · 實證保健食品與健康食品總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '保健營養品實證矩陣與交互作用防火牆' : 'Evidence Nutraceutical Matrix & Interaction Firewall'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            終結市售保健食品的概念置換與智商稅。嚴格依循國際 GRADE 實證醫學標準，完整盤點 30+ 種核心成分的真實人體臨床效益（A 至 E 級），並建置最嚴格的「處方西藥 × 保健品交互作用警示防火牆」與台灣衛福部 (TFDA) 小綠人法規指南。
          </p>
        </div>
      </div>

      {/* ── Sub-module 1: TFDA 4-Tier Regulatory Firewall Guide ── */}
      <section className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-salud-amber-600 dark:text-salud-amber-400 font-display">
          <ShieldCheck className="w-5 h-5" />
          <span>台灣衛生福利部食品藥物管理署 (TFDA) 四層法規防火牆指南</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-center text-xs">
          <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Level 1</span>
            <strong className="text-slate-700 dark:text-slate-300">一般食品</strong>
            <span className="text-[10px] text-slate-500 block">嚴禁任何療效或生理調節宣稱</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Level 2</span>
            <strong className="text-salud-cyan">膳食營養補充劑</strong>
            <span className="text-[10px] text-slate-500 block">補充日常飲食微量營養素不足</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Level 3</span>
            <strong className="text-salud-amber">健康食品 (小綠人標章)</strong>
            <span className="text-[10px] text-slate-500 block">具許可證特定保健功效審核</span>
          </div>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-0.5">
            <span className="text-slate-400 text-[10px] block">Level 4</span>
            <strong className="text-purple-400">指示/處方藥品</strong>
            <span className="text-[10px] text-slate-500 block">具明確治療疾病之大規模臨床驗證</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-500 leading-relaxed font-mono pt-1">
          ※ 法律紅線提醒：任何宣稱可「治療、治癒、速效解毒、替代降血壓/降血脂處方藥物」之市售保健食品，皆屬重大違規違法廣告。所有此類宣稱一律列為 E 級無效且高風險。
        </p>
      </section>

      {/* ── Sub-module 2: Interactive 30+ Supplements & Drug Interaction Checker ── */}
      <section className="space-y-3">
        <SimSupplementChecker />
      </section>
    </div>
  );
};
