import React, { useState, useId } from 'react';
import { ALDH2Genotype } from '../../types';
import { useLanguage } from '../../i18n';
import { Dna, AlertCircle, ShieldCheck, Flame, HeartPulse, Activity } from 'lucide-react';

export const SbxALDH2: React.FC = () => {
  const { t, language } = useLanguage();
  const formId = useId();
  const [genotype, setGenotype] = useState<ALDH2Genotype>('HETERO');
  const [drinks, setDrinks] = useState<number>(2.0);

  // Biological calculations
  // *1/*1: multiplier ~ 1.0 + drinks * 0.2
  // *1/*2: multiplier ~ 4.5 + drinks * 1.8
  // *2/*2: multiplier ~ 18.0 + drinks * 6.0
  let exposureMultiplier = '1.0x';
  let flushProbability = '5% – 10%';
  let enzymePct = '100%';
  let riskLevelZh = '基線族群平均';
  let riskLevelEn = 'Population Baseline';
  let riskNarrativeZh = '體內 ALDH2 酵素代謝通暢，乙醛能及時轉為乙酸；但長期高總量飲酒依然具備致癌性與肝毒性。';
  let riskNarrativeEn = 'Standard ALDH2 enzymatic activity; acetaldehyde converts to acetate efficiently, but high cumulative volume remains carcinogenic.';

  if (genotype === 'NORMAL') {
    exposureMultiplier = (1.0 + drinks * 0.15).toFixed(1) + 'x';
    flushProbability = drinks >= 3 ? '15% – 25%' : '5% – 10%';
    enzymePct = '100%';
    riskLevelZh = '基線風險';
    riskLevelEn = 'Baseline Risk';
  } else if (genotype === 'HETERO') {
    exposureMultiplier = (4.5 + drinks * 1.6).toFixed(1) + 'x';
    flushProbability = drinks >= 0.5 ? '85% – 95%' : '40% – 60%';
    enzymePct = '約 10% – 20%';
    riskLevelZh = '高度警示（高致癌突變暴露）';
    riskLevelEn = 'High Warning (Elevated Carcinogenic Exposure)';
    riskNarrativeZh = '帶有一套突變基因，乙醛清除速度萎縮至正常人的五分之一。此狀態下若維持中重度飲酒與抽菸，食道鱗狀細胞癌與頭頸癌風險陡增。';
    riskNarrativeEn = 'Carries one mutant allele; clearance rate is 10-20% of normal. Sustained drinking exponentially raises esophageal and head/neck cancer risks.';
  } else if (genotype === 'HOMO') {
    exposureMultiplier = (18.0 + drinks * 4.5).toFixed(1) + 'x';
    flushProbability = '> 98%';
    enzymePct = '< 2% (近乎完全喪失)';
    riskLevelZh = '極度危險（強烈毒性蓄積）';
    riskLevelEn = 'Critical Hazard (Severe Acetaldehyde Poisoning)';
    riskNarrativeZh = '酵素四聚體幾乎完全失去催化功能，微量酒精即引起劇烈心悸、噁心與血壓驟降。身體以極端不適作為天然防衛屏障，嚴格禁絕酒精。';
    riskNarrativeEn = 'Near total loss of catalytic function; minuscule alcohol triggers severe flushing and tachycardia. Strict total abstinence is imperative.';
  }

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-cyan/40 bg-slate-900/80 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Dna className="w-5 h-5 text-salud-cyan" />
            {t('aldh2.title')}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Biochemical Sandbox · Pharmacogenomics of rs671 & Acetaldehyde Exposure
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950/60 border border-cyan-800 text-cyan-300">
          EC-24 藥物基因體學專責
        </span>
      </div>

      {/* Control Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* Genotype Selector */}
        <div className="space-y-2 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
          <label className="text-slate-300 font-bold block">{t('aldh2.genotype_label')}</label>
          <div className="space-y-2">
            <button
              onClick={() => setGenotype('NORMAL')}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                genotype === 'NORMAL'
                  ? 'border-emerald-400 bg-emerald-950/50 text-emerald-200 font-bold shadow-sm'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{t('aldh2.normal')}</span>
              <span className="text-[10px] opacity-75">歐美多數 / 台灣 ~53%</span>
            </button>

            <button
              onClick={() => setGenotype('HETERO')}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                genotype === 'HETERO'
                  ? 'border-amber-400 bg-amber-950/50 text-amber-200 font-bold shadow-sm'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{t('aldh2.hetero')}</span>
              <span className="text-[10px] opacity-75">台灣約 40–42%</span>
            </button>

            <button
              onClick={() => setGenotype('HOMO')}
              className={`w-full p-2.5 rounded-xl border text-left font-mono transition-all flex items-center justify-between ${
                genotype === 'HOMO'
                  ? 'border-red-400 bg-red-950/50 text-red-200 font-bold shadow-sm'
                  : 'border-slate-700 bg-slate-900/50 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>{t('aldh2.homo')}</span>
              <span className="text-[10px] opacity-75">台灣約 5–6%</span>
            </button>
          </div>
        </div>

        {/* Standard Drinks Slider */}
        <div className="space-y-3 p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between text-slate-300 pb-1">
              <label htmlFor={`${formId}-drinks`} className="font-bold">{t('aldh2.drinks_label')}</label>
              <strong className="text-salud-amber font-mono text-base">{drinks} 杯</strong>
            </div>
            <p className="text-[11px] text-slate-400 pb-3">
              1 標準杯 = 10g 純酒精（≈ 250mL 啤酒 / 100mL 紅酒 / 30mL 烈酒）
            </p>
            <input
              id={`${formId}-drinks`}
              type="range"
              min="0"
              max="6"
              step="0.5"
              value={drinks}
              onChange={(e) => setDrinks(Number(e.target.value))}
              className="w-full accent-salud-amber cursor-pointer h-2 bg-slate-950 rounded-lg"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between font-mono text-xs">
            <span className="text-slate-400">粒線體酵素剩餘活性：</span>
            <strong className={
              genotype === 'HOMO' ? 'text-red-400 font-bold' : genotype === 'HETERO' ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'
            }>
              {enzymePct}
            </strong>
          </div>
        </div>
      </div>

      {/* Output Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Exposure Multiplier */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <Flame className="w-4 h-4 text-salud-coral" />
            <span>{t('aldh2.exposure_mult')}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-3xl font-display font-extrabold text-salud-coral">
              {exposureMultiplier}
            </strong>
            <span className="text-[11px] text-slate-500 font-mono">相對基準倍率</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            指體內細胞直接接觸一級致癌物「乙醛」的相對暴露濃度曲線面積（AUC）。
          </p>
        </div>

        {/* Flush Risk */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
            <HeartPulse className="w-4 h-4 text-salud-cyan" />
            <span>{t('aldh2.flush_risk')}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <strong className="text-3xl font-display font-extrabold text-salud-cyan">
              {flushProbability}
            </strong>
            <span className="text-[11px] text-slate-500 font-mono">外顯生理表型</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            乙醛刺激血管平滑肌與肥大細胞釋放組織胺，造成強烈臉部發燙潮紅與心悸。
          </p>
        </div>
      </div>

      {/* Stratified Risk Narrative (Anti-Determinism, Spec §8.5 & §10.3) */}
      <div className="p-4 rounded-2xl border border-slate-700 bg-slate-800/40 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
          <Activity className="w-4 h-4 text-salud-amber" />
          <span>{t('aldh2.stratified_risk')}：</span>
          <span className="font-mono text-salud-amber">
            {language === 'zh-TW' ? riskLevelZh : riskLevelEn}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          {language === 'zh-TW' ? riskNarrativeZh : riskNarrativeEn}
        </p>

        {/* Anti-fatalism callout */}
        <div className="pt-2 border-t border-slate-700/60 flex items-start gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>
            <strong>科學反基因宿命論</strong>：突變基因改變的是相同飲酒量下的「風險斜率」，並不決定個人結局。只要選擇不飲酒，體內便不會產生額外乙醛蓄積，食道癌風險拉回與無突變常人完全一致。
          </span>
        </div>
      </div>
    </div>
  );
};
