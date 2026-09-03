import React, { useState } from 'react';
import { DIETARY_PATTERNS } from '../../data/dietaryPatterns';
import { DietaryPatternId } from '../../types';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Utensils,
  Flame,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';

export const SimDietPatterns: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedPatternId, setSelectedPatternId] = useState<DietaryPatternId>('MEDITERRANEAN');
  const [dailyCalories, setDailyCalories] = useState<number>(2000);

  const currentPattern =
    DIETARY_PATTERNS.find((p) => p.id === selectedPatternId) || DIETARY_PATTERNS[0];

  // Macronutrient Grams Calculation
  // Carbs: 4 kcal/g, Protein: 4 kcal/g, Fat: 9 kcal/g
  const carbCalories = (dailyCalories * currentPattern.macro_distribution.carbs_pct) / 100;
  const proteinCalories = (dailyCalories * currentPattern.macro_distribution.protein_pct) / 100;
  const fatCalories = (dailyCalories * currentPattern.macro_distribution.fat_pct) / 100;

  const carbGrams = Math.round(carbCalories / 4);
  const proteinGrams = Math.round(proteinCalories / 4);
  const fatGrams = Math.round(fatCalories / 9);

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-salud-amber/40 bg-slate-900/85 shadow-2xl space-y-6 text-slate-100 font-sans">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-white flex items-center gap-2">
            <Utensils className="w-5 h-5 text-salud-amber" />
            {t('diet.patterns_heading')}
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Biochemical Mechanism, Macronutrient Distribution & Micronutrient Safeguards
          </p>
        </div>
        <EvidenceBadge grade={currentPattern.evidence_grade} />
      </div>

      {/* Pattern Selector Pills */}
      <div className="flex flex-wrap gap-2">
        {DIETARY_PATTERNS.map((pattern) => {
          const isSelected = pattern.id === selectedPatternId;
          return (
            <button
              key={pattern.id}
              onClick={() => setSelectedPatternId(pattern.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-salud-amber text-black font-bold shadow-warm-glow scale-102'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
              }`}
            >
              <span>{language === 'zh-TW' ? pattern.name_zh.split(' ')[0] : pattern.name_en}</span>
            </button>
          );
        })}
      </div>

      {/* Hero Overview Card */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base sm:text-lg font-display font-bold text-white">
            {language === 'zh-TW' ? currentPattern.name_zh : currentPattern.name_en}
          </h4>
          <span className="text-xs font-mono text-salud-cyan">
            {language === 'zh-TW' ? currentPattern.tagline_zh : currentPattern.tagline_en}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          {language === 'zh-TW' ? currentPattern.description_zh : currentPattern.description_en}
        </p>
      </div>

      {/* Calorie & Macro Distribution Sandbox */}
      <div className="space-y-4 p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <label className="text-slate-300 font-bold flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-salud-amber" />
            個人化每日目標總熱量 (Daily Energy Target):
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1200"
              max="3500"
              step="50"
              value={dailyCalories}
              onChange={(e) => setDailyCalories(Number(e.target.value))}
              className="accent-salud-amber cursor-pointer w-32 sm:w-44"
            />
            <strong className="text-sm font-mono text-salud-amber">{dailyCalories} kcal</strong>
          </div>
        </div>

        {/* Quick Calorie Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-mono">
            {language === 'zh-TW' ? '熱量情境預設：' : 'Caloric Presets:'}
          </span>
          {[
            { cal: 1500, label_zh: '1500 kcal · 減脂代謝', label_en: '1500 kcal · Fat Loss' },
            { cal: 2000, label_zh: '2000 kcal · 均衡日常', label_en: '2000 kcal · Baseline' },
            { cal: 2500, label_zh: '2500 kcal · 增肌高耗能', label_en: '2500 kcal · Performance' },
          ].map((preset) => (
            <button
              key={preset.cal}
              onClick={() => setDailyCalories(preset.cal)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono border transition-all ${
                dailyCalories === preset.cal
                  ? 'bg-salud-amber text-black font-bold border-salud-amber shadow-warm-glow'
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              {language === 'zh-TW' ? preset.label_zh : preset.label_en}
            </button>
          ))}
        </div>

        {/* Visual Macro Ratio Bar */}
        <div className="space-y-1.5 font-mono text-xs">
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>{t('diet.macro_ratio')}</span>
            <span>碳水 : 蛋白 : 脂肪</span>
          </div>

          <div className="h-6 w-full rounded-xl overflow-hidden flex shadow-inner bg-slate-950 border border-slate-700">
            <div
              style={{ width: `${currentPattern.macro_distribution.carbs_pct}%` }}
              className="bg-cyan-500 flex items-center justify-center text-[11px] font-bold text-black transition-all"
              title={`碳水化合物 ${currentPattern.macro_distribution.carbs_pct}%`}
            >
              {currentPattern.macro_distribution.carbs_pct > 8 && `${currentPattern.macro_distribution.carbs_pct}%`}
            </div>
            <div
              style={{ width: `${currentPattern.macro_distribution.protein_pct}%` }}
              className="bg-purple-500 flex items-center justify-center text-[11px] font-bold text-white transition-all"
              title={`蛋白質 ${currentPattern.macro_distribution.protein_pct}%`}
            >
              {currentPattern.macro_distribution.protein_pct > 8 && `${currentPattern.macro_distribution.protein_pct}%`}
            </div>
            <div
              style={{ width: `${currentPattern.macro_distribution.fat_pct}%` }}
              className="bg-amber-500 flex items-center justify-center text-[11px] font-bold text-black transition-all"
              title={`脂肪 ${currentPattern.macro_distribution.fat_pct}%`}
            >
              {currentPattern.macro_distribution.fat_pct > 8 && `${currentPattern.macro_distribution.fat_pct}%`}
            </div>
          </div>

          {/* Daily Gram Breakdown */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-cyan-950/50 border border-cyan-800/60 text-cyan-200">
              <span className="text-[10px] text-cyan-400 block">碳水化合物 (4 kcal/g)</span>
              <strong className="text-base font-bold">{carbGrams} g</strong>
              <span className="text-[10px] text-slate-400 block">({carbCalories} kcal)</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-950/50 border border-purple-800/60 text-purple-200">
              <span className="text-[10px] text-purple-400 block">優質蛋白質 (4 kcal/g)</span>
              <strong className="text-base font-bold">{proteinGrams} g</strong>
              <span className="text-[10px] text-slate-400 block">({proteinCalories} kcal)</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-950/50 border border-amber-800/60 text-amber-200">
              <span className="text-[10px] text-amber-400 block">健康脂質 (9 kcal/g)</span>
              <strong className="text-base font-bold">{fatGrams} g</strong>
              <span className="text-[10px] text-slate-400 block">({fatCalories} kcal)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Mechanism & Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Core Principles */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <strong className="text-salud-amber font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-salud-amber" />
            {t('diet.principles_title')}
          </strong>
          <ul className="space-y-1.5 text-slate-300">
            {(language === 'zh-TW' ? currentPattern.core_principles_zh : currentPattern.core_principles_en).map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-salud-amber font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Biochemical Mechanisms */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <strong className="text-salud-cyan font-bold text-xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-salud-cyan" />
            {t('diet.mechanisms_title')}
          </strong>
          <ul className="space-y-1.5 text-slate-300">
            {(language === 'zh-TW' ? currentPattern.biochemical_mechanisms_zh : currentPattern.biochemical_mechanisms_en).map((pt, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-salud-cyan font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Proven Benefits & Precautions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Proven Benefits */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-600/40 space-y-2">
          <strong className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {t('diet.benefits_title')}
          </strong>
          <ul className="space-y-1.5 text-slate-300">
            {(language === 'zh-TW' ? currentPattern.proven_benefits_zh : currentPattern.proven_benefits_en).map((b, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Precautions */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-600/40 space-y-2">
          <strong className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            {t('diet.precautions_title')}
          </strong>
          <ul className="space-y-1.5 text-slate-300">
            {(language === 'zh-TW' ? currentPattern.precautions_and_risks_zh : currentPattern.precautions_and_risks_en).map((p, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">⚠</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Critical Nutrient Deficiencies Alert */}
      {currentPattern.deficiency_risks.length > 0 && (
        <div className="p-4 rounded-2xl border border-red-500/60 bg-red-950/30 space-y-3 text-xs">
          <div className="flex items-center gap-2 font-display font-bold text-sm text-red-300">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>{t('diet.deficiency_alert')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentPattern.deficiency_risks.map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-900 border border-red-800/60 space-y-1">
                <div className="flex items-center justify-between">
                  <strong className="text-red-200 font-bold">
                    {language === 'zh-TW' ? item.nutrient_zh : item.nutrient_en}
                  </strong>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold ${
                    item.risk_level === 'HIGH' ? 'bg-red-900 text-red-200 border border-red-700' : 'bg-amber-900 text-amber-200'
                  }`}>
                    {item.risk_level} RISK
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  💡 {language === 'zh-TW' ? item.solution_zh : item.solution_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
