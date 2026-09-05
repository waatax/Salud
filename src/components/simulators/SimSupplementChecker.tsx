import React, { useState } from 'react';
import { DEEP_SUPPLEMENTS, DRUG_NUTRIENT_INTERACTIONS } from '../../data/supplementsDeepData';
import { SupplementCategory } from '../../types';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Pill,
  Search,
  AlertOctagon,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const SimSupplementChecker: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('NONE');
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Filter items
  const filteredSupplements = DEEP_SUPPLEMENTS.filter((item) => {
    const matchesSearch =
      searchTerm.trim() === '' ||
      item.name_zh.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.primary_claim_zh.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'ALL' || item.category === selectedCategory;

    const matchesGrade =
      selectedGrade === 'ALL' || item.evidence_grade === selectedGrade;

    return matchesSearch && matchesCategory && matchesGrade;
  });

  // Active Drug Interaction
  const activeDrugInteraction = DRUG_NUTRIENT_INTERACTIONS.find(
    (dni) => dni.id === selectedDrugId
  );

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-nature-green-200/90 dark:border-nature-green-700/50 bg-white dark:bg-slate-900/85 shadow-lg space-y-6 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-nature-green-600 dark:text-nature-green-400" />
            {t('supplements.deep_heading')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            GRADE Systematic RCT Evidence Matrix & Drug-Nutrient Cross-Checking Firewall
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-nature-green-50 dark:bg-nature-green-950/60 border border-nature-green-200 dark:border-nature-green-700 text-nature-green-800 dark:text-nature-green-300">
          收錄 30+ 項核心成分
        </span>
      </div>

      {/* ── Drug Interaction Quick Checker Engine ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-red-50/80 dark:bg-gradient-to-br dark:from-red-950/40 dark:via-slate-900 dark:to-slate-950 border border-red-200 dark:border-red-500/60 space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-red-700 dark:text-red-400 font-display">
          <AlertOctagon className="w-5 h-5 animate-pulse text-red-600 dark:text-red-500 shrink-0" />
          <span>{t('supplements.interaction_title')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <label className="text-slate-700 dark:text-slate-300 font-medium">選擇您或家人目前正在服用的處方西藥：</label>
          <select
            value={selectedDrugId}
            onChange={(e) => setSelectedDrugId(e.target.value)}
            className="p-2 rounded-xl bg-white dark:bg-slate-950 border border-red-300 dark:border-red-500/60 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:border-red-500 font-mono shadow-sm"
          >
            <option value="NONE">-- 請選擇處方藥物進行危險比對 --</option>
            {DRUG_NUTRIENT_INTERACTIONS.map((dni) => (
              <option key={dni.id} value={dni.id}>
                {language === 'zh-TW' ? dni.drug_class_zh : dni.drug_class_en} ({dni.example_drugs})
              </option>
            ))}
          </select>
        </div>

        {/* Render Warning if Selected */}
        {activeDrugInteraction && (
          <div className="p-4 rounded-xl bg-red-100/90 dark:bg-red-900/30 border border-red-300 dark:border-red-500/80 space-y-2 text-xs text-red-900 dark:text-red-200 font-sans">
            <div className="flex flex-wrap items-center justify-between gap-1 border-b border-red-200 dark:border-red-800/80 pb-1.5">
              <span className="font-bold text-sm text-red-800 dark:text-red-300">
                ⚠ 嚴禁併服之保健成分：{activeDrugInteraction.supplement_name_zh}
              </span>
              <span className="px-2 py-0.5 rounded bg-red-700 text-white font-mono text-[10px] font-bold">
                {activeDrugInteraction.severity} HAZARD
              </span>
            </div>

            <div className="space-y-1 text-slate-800 dark:text-slate-200">
              <p><strong>生化交互機轉：</strong>{activeDrugInteraction.mechanism_zh}</p>
              <p className="text-red-700 dark:text-red-300 font-bold">
                <strong>臨床後果與威脅：</strong>{activeDrugInteraction.clinical_hazard_zh}
              </p>
              <p className="text-nature-amber-800 dark:text-amber-300">
                <strong>醫學安全指導：</strong>{activeDrugInteraction.guidance_zh}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t('supplements.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-nature-green-500 font-mono shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs font-mono">
          {[
            { id: 'ALL', label: t('supplements.category_all') },
            { id: 'CARDIOVASCULAR', label: t('supplements.category_cardio') },
            { id: 'METABOLIC', label: t('supplements.category_metabolic') },
            { id: 'BONE_JOINT', label: t('supplements.category_bone') },
            { id: 'COGNITIVE_SLEEP', label: t('supplements.category_sleep') },
            { id: 'ANTIOXIDANT_LIVER', label: t('supplements.category_liver') },
            { id: 'PERFORMANCE_ENERGY', label: t('supplements.category_energy') },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`btn-tactile px-3 py-1.5 rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? 'bg-nature-green-600 text-white font-bold shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/70 text-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:text-white border border-slate-200 dark:border-slate-700/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grade Filter Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-1">
            <span className="text-slate-500 dark:text-slate-400 text-[11px]">GRADE 實證分級：</span>
            {['ALL', 'A', 'B', 'C', 'D', 'E'].map((gr) => (
              <button
                key={gr}
                onClick={() => setSelectedGrade(gr)}
                className={`btn-tactile px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                  selectedGrade === gr
                    ? gr === 'E'
                      ? 'bg-red-700 text-white border-red-600 shadow-sm'
                      : gr === 'A'
                      ? 'bg-nature-green-600 text-white border-nature-green-700 shadow-sm'
                      : 'bg-nature-amber-500 text-white border-nature-amber-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:text-white'
                }`}
              >
                {gr === 'ALL' ? '全部評級' : `GRADE ${gr}`}
              </button>
            ))}
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            符合條件：<strong className="text-nature-sky-700 dark:text-salud-cyan font-bold">{filteredSupplements.length}</strong> 項成分
          </span>
        </div>
      </div>

      {/* ── Supplement Items List ── */}
      <div className="space-y-3">
        {filteredSupplements.map((item) => {
          const isExpanded = expandedItem === item.id;
          return (
            <div
              key={item.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                item.evidence_grade === 'E'
                  ? 'border-red-200 dark:border-red-600/60 bg-red-50/50 dark:bg-red-950/20'
                  : item.evidence_grade === 'A'
                  ? 'border-nature-green-200 dark:border-emerald-600/40 bg-nature-green-50/50 dark:bg-emerald-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-nature-green-300 dark:hover:border-slate-700 shadow-sm'
              }`}
            >
              {/* Header Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <strong className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      {language === 'zh-TW' ? item.name_zh : item.name_en}
                    </strong>
                    <span className="font-mono text-xs text-slate-500 dark:text-slate-400">({item.name_en})</span>
                    <EvidenceBadge grade={item.evidence_grade} />
                  </div>
                  <p className="text-xs text-nature-amber-700 dark:text-salud-amber-400 font-medium">
                    宣稱功能：{language === 'zh-TW' ? item.primary_claim_zh : item.primary_claim_en}
                  </p>
                </div>

                <button
                  onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  className="btn-tactile p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  aria-label="展開或收合詳細內容"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Quick Reality One-liner */}
              <p className="text-xs text-slate-700 dark:text-slate-300 pt-2 leading-relaxed font-sans">
                {language === 'zh-TW' ? item.scientific_reality_zh : item.scientific_reality_en}
              </p>

              {/* Expanded Biochemical Details */}
              {isExpanded && (
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-nature-sky-50/90 dark:bg-slate-900 border border-nature-sky-200/90 dark:border-slate-800 space-y-0.5">
                    <span className="text-nature-sky-800 dark:text-salud-cyan font-mono text-[11px] font-bold block">
                      {t('supplements.optimal_form')}：
                    </span>
                    <p className="text-slate-800 dark:text-slate-300">
                      {language === 'zh-TW' ? item.optimal_form_zh : item.optimal_form_en}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="p-3 rounded-xl bg-purple-50/90 dark:bg-slate-900 border border-purple-200/90 dark:border-slate-800 space-y-0.5">
                      <span className="text-purple-800 dark:text-purple-300 font-mono text-[11px] font-bold block">
                        臨床文獻有效劑量：
                      </span>
                      <p className="text-slate-800 dark:text-slate-300">
                        {language === 'zh-TW' ? item.therapeutic_dosage_zh : item.therapeutic_dosage_en}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-nature-amber-50/90 dark:bg-amber-950/40 border border-nature-amber-200/90 dark:border-amber-800/60 space-y-0.5 text-nature-amber-900 dark:text-amber-200">
                      <span className="font-mono text-[11px] font-bold block">
                        {t('supplements.caution')}：
                      </span>
                      <p className="text-[11px]">
                        {language === 'zh-TW' ? item.caution_and_risks_zh : item.caution_and_risks_en}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-red-50/90 dark:bg-red-950/20 border border-red-200/90 dark:border-red-800/40 text-[11px] text-red-900 dark:text-red-200">
                    <strong className="font-bold">{t('supplements.myths')}：</strong>
                    <span>{language === 'zh-TW' ? item.common_myths_zh : item.common_myths_en}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
