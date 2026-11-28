import React, { useEffect, useState } from 'react';
import { DEEP_SUPPLEMENTS, DRUG_NUTRIENT_INTERACTIONS, SUPPLEMENT_GOAL_META } from '../../data/supplementsDeepData';
import type { SupplementGoal } from '../../types';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Pill,
  Search,
  AlertOctagon,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  BookOpen,
  Clock,
  Salad,
  Target,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  initialCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const VALID_CATEGORIES = new Set([
  'ALL',
  'AMINO_PROTEIN',
  'PERFORMANCE_ENERGY',
  'VITAMINS_MINERALS',
  'FIBER_PREBIOTICS',
  'CARDIOVASCULAR',
  'METABOLIC',
  'BONE_JOINT',
  'COGNITIVE_SLEEP',
  'ANTIOXIDANT_LIVER',
]);

export const SimSupplementChecker: React.FC<Props> = ({ initialCategory, onCategoryChange }) => {
  const { t, language } = useLanguage();
  const zh = language === 'zh-TW';
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory && VALID_CATEGORIES.has(initialCategory) ? initialCategory : 'ALL'
  );
  const [selectedGoal, setSelectedGoal] = useState<SupplementGoal | 'ALL'>('ALL');
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('NONE');
  const [expandedItem, setExpandedItem] = useState<string | null>('SUP-WHEY');

  useEffect(() => {
    if (initialCategory && VALID_CATEGORIES.has(initialCategory)) {
      setSelectedCategory(initialCategory);
      setSelectedGoal('ALL');
      const firstMatch = DEEP_SUPPLEMENTS.find((s) => initialCategory === 'ALL' || s.category === initialCategory);
      if (firstMatch) setExpandedItem(firstMatch.id);
    }
  }, [initialCategory]);

  const handleCategoryPick = (cat: string) => {
    setSelectedCategory(cat);
    onCategoryChange?.(cat);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('ALL');
    setSelectedGoal('ALL');
    setSelectedGrade('ALL');
    onCategoryChange?.('ALL');
  };

  const countByCat = (cat: string) =>
    cat === 'ALL' ? DEEP_SUPPLEMENTS.length : DEEP_SUPPLEMENTS.filter((item) => item.category === cat).length;

  const strongEvidenceCount = DEEP_SUPPLEMENTS.filter((s) => s.evidence_grade === 'A' || s.evidence_grade === 'B').length;

  // Filter items
  const filteredSupplements = DEEP_SUPPLEMENTS.filter((item) => {
    const q = searchTerm.trim().toLowerCase();
    const matchesSearch =
      q === '' ||
      item.name_zh.toLowerCase().includes(q) ||
      item.name_en.toLowerCase().includes(q) ||
      item.primary_claim_zh.toLowerCase().includes(q) ||
      item.scientific_reality_zh.toLowerCase().includes(q) ||
      (item.effect_summary_zh?.toLowerCase().includes(q) ?? false) ||
      (item.food_first_zh?.toLowerCase().includes(q) ?? false);

    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

    const matchesGoal = selectedGoal === 'ALL' || (item.goals?.includes(selectedGoal) ?? false);

    const matchesGrade =
      selectedGrade === 'ALL'
        ? true
        : selectedGrade === 'AB'
        ? item.evidence_grade === 'A' || item.evidence_grade === 'B'
        : item.evidence_grade === selectedGrade;

    return matchesSearch && matchesCategory && matchesGoal && matchesGrade;
  });

  // Active Drug Interaction
  const activeDrugInteraction = DRUG_NUTRIENT_INTERACTIONS.find((dni) => dni.id === selectedDrugId);

  const hasActiveFilter =
    searchTerm.trim() !== '' || selectedCategory !== 'ALL' || selectedGoal !== 'ALL' || selectedGrade !== 'ALL';

  const categories = [
    { id: 'ALL', label: t('supplements.category_all') },
    { id: 'AMINO_PROTEIN', label: t('supplements.category_amino') },
    { id: 'PERFORMANCE_ENERGY', label: t('supplements.category_energy') },
    { id: 'VITAMINS_MINERALS', label: t('supplements.category_vitamins') },
    { id: 'FIBER_PREBIOTICS', label: t('supplements.category_fiber') },
    { id: 'CARDIOVASCULAR', label: t('supplements.category_cardio') },
    { id: 'METABOLIC', label: t('supplements.category_metabolic') },
    { id: 'BONE_JOINT', label: t('supplements.category_bone') },
    { id: 'COGNITIVE_SLEEP', label: t('supplements.category_sleep') },
    { id: 'ANTIOXIDANT_LIVER', label: t('supplements.category_liver') },
  ];

  return (
    <div
      id="supplement-matrix"
      className="scroll-mt-24 p-5 sm:p-7 rounded-3xl border border-emerald-200/90 dark:border-emerald-800/50 bg-white dark:bg-slate-900/85 shadow-sm space-y-6 text-slate-800 dark:text-slate-100 font-sans transition-colors"
    >
      {/* Title */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Pill className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <span>{t('supplements.deep_heading')}</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            依同儕審查人體隨機對照試驗 (RCT)、系統性統合分析與國際運動／臨床醫學立場聲明編寫，誠實呈現有效邊界與無效迷思。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300">
            共 {DEEP_SUPPLEMENTS.length} 項核心成分
          </span>
          <span className="px-2.5 py-1 rounded-full font-bold bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300">
            A/B 級實證 {strongEvidenceCount} 項
          </span>
        </div>
      </div>

      {/* ── Drug Interaction Quick Checker Engine ── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/75 dark:bg-rose-950/25 border border-rose-200/90 dark:border-rose-800/60 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-bold text-rose-800 dark:text-rose-300 font-display">
            <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" aria-hidden="true" />
            <span>{t('supplements.interaction_title')}</span>
          </div>
          <span className="text-xs font-mono text-rose-700 dark:text-rose-300 font-semibold">
            涵蓋 {DRUG_NUTRIENT_INTERACTIONS.length} 大常見慢性病與用藥情境
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs">
          <label htmlFor="drug-interaction-select" className="text-slate-700 dark:text-slate-300 font-semibold shrink-0">
            正在服用的處方藥物或慢性病況：
          </label>
          <select
            id="drug-interaction-select"
            value={selectedDrugId}
            onChange={(e) => setSelectedDrugId(e.target.value)}
            className="flex-1 min-h-11 px-3 py-2 rounded-xl bg-white dark:bg-slate-950 border border-rose-300 dark:border-rose-700/70 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 shadow-2xs"
          >
            <option value="NONE">-- 請選擇處方藥物或病況，立即比對禁止／須間隔之補給品 --</option>
            {DRUG_NUTRIENT_INTERACTIONS.map((dni) => (
              <option key={dni.id} value={dni.id}>
                {zh ? dni.drug_class_zh : dni.drug_class_en}（{dni.example_drugs}）
              </option>
            ))}
          </select>
        </div>

        {/* Render Warning if Selected */}
        {activeDrugInteraction && (
          <div
            role="status"
            className="p-4 rounded-xl bg-white dark:bg-slate-900/90 border border-rose-300 dark:border-rose-600/70 space-y-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 animate-fade-in"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100 dark:border-rose-900/60 pb-2">
              <span className="font-bold text-rose-800 dark:text-rose-300">
                留意交互作用成分：{activeDrugInteraction.supplement_name_zh}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full font-mono text-[0.72rem] font-bold ${
                  activeDrugInteraction.severity === 'CRITICAL'
                    ? 'bg-rose-700 text-white'
                    : activeDrugInteraction.severity === 'HIGH'
                    ? 'bg-amber-600 text-white'
                    : 'bg-sky-700 text-white'
                }`}
              >
                {activeDrugInteraction.severity === 'CRITICAL'
                  ? '嚴重禁忌 CRITICAL'
                  : activeDrugInteraction.severity === 'HIGH'
                  ? '高度警戒 HIGH'
                  : '需追蹤調整 MODERATE'}
              </span>
            </div>

            <div className="space-y-1.5 leading-relaxed">
              <p>
                <strong className="text-slate-900 dark:text-white">藥理機轉：</strong>
                {activeDrugInteraction.mechanism_zh}
              </p>
              <p className="text-rose-800 dark:text-rose-300 font-semibold">
                <strong>臨床風險：</strong>
                {activeDrugInteraction.clinical_hazard_zh}
              </p>
              <p className="rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 px-3 py-2 text-emerald-900 dark:text-emerald-200 border border-emerald-200/70 dark:border-emerald-800/50">
                <strong>安全行動指引：</strong>
                {activeDrugInteraction.guidance_zh}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 1: Goal-Driven Quick Selector ── */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span>依你的健康目標快速篩選：</span>
          </p>
          {hasActiveFilter && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>重設全部篩選</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2" role="group" aria-label="依健康目標篩選補給品">
          <button
            type="button"
            aria-pressed={selectedGoal === 'ALL'}
            onClick={() => setSelectedGoal('ALL')}
            className={`min-h-10 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              selectedGoal === 'ALL'
                ? 'bg-emerald-800 text-white border-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:border-emerald-400'
                : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
            }`}
          >
            全部目標
          </button>
          {SUPPLEMENT_GOAL_META.map((g) => (
            <button
              key={g.id}
              type="button"
              aria-pressed={selectedGoal === g.id}
              onClick={() => {
                setSelectedGoal(selectedGoal === g.id ? 'ALL' : g.id);
                setSelectedCategory('ALL');
              }}
              title={g.desc_zh}
              className={`min-h-10 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                selectedGoal === g.id
                  ? 'bg-emerald-800 text-white border-emerald-800 dark:bg-emerald-400 dark:text-emerald-950 dark:border-emerald-400'
                  : 'bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
              }`}
            >
              {g.label_zh}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 2: Search, Category & Evidence Grade Controls ── */}
      <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" aria-hidden="true" />
          <input
            type="text"
            placeholder={t('supplements.search_placeholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="搜尋營養補給品名稱或關鍵字"
            className="w-full min-h-11 pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-slate-900 dark:text-white text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 text-xs" role="group" aria-label="補給品成分類別">
          {categories.map((cat) => {
            const count = countByCat(cat.id);
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={active}
                onClick={() => handleCategoryPick(cat.id)}
                className={`btn-tactile min-h-9 px-3 py-1.5 rounded-xl transition-all inline-flex items-center gap-1.5 ${
                  active
                    ? 'bg-emerald-700 text-white font-bold shadow-xs dark:bg-emerald-400 dark:text-emerald-950'
                    : 'bg-slate-100/90 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/60'
                }`}
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[0.7rem] opacity-80">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grade Filter Pills & Count */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="依研究實證強度篩選">
            <span className="text-slate-600 dark:text-slate-400 font-semibold">實證強度篩選：</span>
            {[
              { id: 'ALL', label: '全部評級' },
              { id: 'AB', label: '僅看驗證有效 (A+B)' },
              { id: 'A', label: 'A 級 (強實證)' },
              { id: 'B', label: 'B 級 (中度實證)' },
              { id: 'C', label: 'C 級 (有限/特定)' },
              { id: 'D', label: 'D 級 (實證薄弱)' },
              { id: 'E', label: 'E 級 (警示防雷)' },
            ].map((gr) => (
              <button
                key={gr.id}
                type="button"
                aria-pressed={selectedGrade === gr.id}
                onClick={() => setSelectedGrade(gr.id)}
                className={`btn-tactile min-h-8 px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                  selectedGrade === gr.id
                    ? gr.id === 'E'
                      ? 'bg-rose-700 text-white border-rose-700 shadow-2xs'
                      : gr.id === 'ALL' || gr.id === 'A' || gr.id === 'AB'
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-2xs'
                      : 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                    : 'bg-white dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                {gr.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-slate-600 dark:text-slate-400" role="status">
            符合條件：<strong className="text-emerald-800 dark:text-emerald-300 font-bold">{filteredSupplements.length}</strong> / {DEEP_SUPPLEMENTS.length} 項
          </span>
        </div>
      </div>

      {/* ── Supplement Items List ── */}
      {filteredSupplements.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-center space-y-3">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            目前篩選條件下找不到對應補給品，建議放寬分類或改用較短關鍵字（例如「蛋白」「肌酸」「維生素」「纖維」）。
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>顯示全部 {DEEP_SUPPLEMENTS.length} 項成分</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredSupplements.map((item) => {
            const isExpanded = expandedItem === item.id;
            const isGradeE = item.evidence_grade === 'E';
            const isGradeA = item.evidence_grade === 'A';
            return (
              <article
                key={item.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isGradeE
                    ? 'border-rose-300 dark:border-rose-700/70 bg-rose-50/40 dark:bg-rose-950/20'
                    : isGradeA
                    ? 'border-emerald-200/90 dark:border-emerald-800/50 bg-emerald-50/25 dark:bg-emerald-950/10'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:border-emerald-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Clickable Header */}
                <button
                  type="button"
                  onClick={() => setExpandedItem(isExpanded ? null : item.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-600"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {zh ? item.name_zh : item.name_en}
                      </h4>
                      <span className="font-mono text-xs text-slate-500 dark:text-slate-400">({item.name_en})</span>
                      <EvidenceBadge grade={item.evidence_grade} showText={false} />
                      {item.citations && item.citations.length > 0 && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.7rem] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          <BookOpen className="w-3 h-3" aria-hidden="true" />
                          {item.citations.length} 篇研究引用
                        </span>
                      )}
                    </div>

                    {item.effect_summary_zh && (
                      <p
                        className={`text-xs sm:text-[0.84rem] font-semibold leading-relaxed flex items-start gap-1.5 ${
                          isGradeE
                            ? 'text-rose-800 dark:text-rose-300'
                            : isGradeA
                            ? 'text-emerald-900 dark:text-emerald-200'
                            : 'text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {isGradeE ? (
                          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                        )}
                        <span>{item.effect_summary_zh}</span>
                      </p>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {zh ? item.scientific_reality_zh : item.scientific_reality_en}
                    </p>
                  </div>

                  <span
                    className="shrink-0 mt-0.5 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold text-emerald-800 dark:text-emerald-300"
                    aria-hidden="true"
                  >
                    <span className="hidden sm:inline">{isExpanded ? '收合' : '看研究與劑量'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Expanded Scientific Dossier */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-3 text-xs sm:text-[0.84rem] bg-white/85 dark:bg-slate-900/50 animate-fade-in">
                    {/* Mechanism */}
                    {item.mechanism_zh && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1">
                        <span className="inline-flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                          <FlaskConical className="w-3.5 h-3.5" aria-hidden="true" />
                          生理與分子作用機轉
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.mechanism_zh}</p>
                      </div>
                    )}

                    {/* Form / Dosage / Timing 3-card row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                      <div className="p-3.5 rounded-xl bg-sky-50/75 dark:bg-sky-950/25 border border-sky-200/80 dark:border-sky-900/50 space-y-1">
                        <span className="text-sky-900 dark:text-sky-300 font-bold text-xs block">
                          {t('supplements.optimal_form')}
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                          {zh ? item.optimal_form_zh : item.optimal_form_en}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-emerald-50/75 dark:bg-emerald-950/25 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1">
                        <span className="text-emerald-900 dark:text-emerald-300 font-bold text-xs block">
                          臨床實證有效劑量
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                          {zh ? item.therapeutic_dosage_zh : item.therapeutic_dosage_en}
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-violet-50/70 dark:bg-violet-950/25 border border-violet-200/80 dark:border-violet-900/50 space-y-1">
                        <span className="inline-flex items-center gap-1 text-violet-900 dark:text-violet-300 font-bold text-xs">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          最佳服用時機與搭配
                        </span>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                          {item.timing_protocol_zh ?? '依個人飲食作息與產品標示，並避免與高交互作用處方藥同時吞服。'}
                        </p>
                      </div>
                    </div>

                    {/* Who Benefits & Food First */}
                    {(item.who_benefits_zh || item.food_first_zh) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {item.who_benefits_zh && (
                          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                            <span className="inline-flex items-center gap-1 text-slate-900 dark:text-white font-bold text-xs">
                              <Target className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                              哪些族群最明確有效？
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.who_benefits_zh}</p>
                          </div>
                        )}
                        {item.food_first_zh && (
                          <div className="p-3.5 rounded-xl bg-emerald-50/45 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-900/40 space-y-1">
                            <span className="inline-flex items-center gap-1 text-emerald-900 dark:text-emerald-200 font-bold text-xs">
                              <Salad className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                              原型食物優先對照 (Food-First)
                            </span>
                            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.food_first_zh}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Caution & Myths */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="p-3.5 rounded-xl bg-amber-50/85 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-800/60 space-y-1 text-amber-950 dark:text-amber-100">
                        <span className="font-bold text-xs block">{t('supplements.caution')}</span>
                        <p className="leading-relaxed">{zh ? item.caution_and_risks_zh : item.caution_and_risks_en}</p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-rose-50/75 dark:bg-rose-950/25 border border-rose-200/90 dark:border-rose-800/50 space-y-1 text-rose-950 dark:text-rose-100">
                        <span className="font-bold text-xs block">{t('supplements.myths')}</span>
                        <p className="leading-relaxed">{zh ? item.common_myths_zh : item.common_myths_en}</p>
                      </div>
                    </div>

                    {/* Peer-Reviewed Citations */}
                    {item.citations && item.citations.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                          嚴謹同儕審查研究與國際指引來源
                        </span>
                        <ul className="space-y-2">
                          {item.citations.map((cite, idx) => (
                            <li
                              key={idx}
                              className="p-2.5 rounded-lg bg-white dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 space-y-1"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className="font-semibold text-slate-900 dark:text-white text-xs">
                                  {cite.study}
                                </span>
                                <span className="font-mono text-[0.7rem] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                                  {cite.journal} · {cite.year}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                                {cite.finding_zh}
                              </p>
                              {cite.url && (
                                <a
                                  href={cite.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[0.72rem] font-mono font-semibold text-emerald-700 dark:text-emerald-400 hover:underline"
                                >
                                  <span>DOI: {cite.doi ?? cite.url}</span>
                                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
