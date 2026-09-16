import React, { useState } from 'react';
import {
  EOSS_STAGES,
  OBESITY_MECHANISMS,
  OBESITY_DRUGS,
  DIET_REGIMENS,
  BARIATRIC_SURGERIES,
  EXERCISE_OBESITY_SCIENCE,
  OBESITY_MYTHS,
  MDT_CONSENSUS_STATEMENTS,
} from '../../data/obesityData';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { SimWeightTrajectory } from '../simulators/SimWeightTrajectory';
import { UrgeSurfingTimer } from './obesity/UrgeSurfingTimer';
import { TaiwanDiningGuide } from './obesity/TaiwanDiningGuide';
import { DrugInteractionMatrix } from './obesity/DrugInteractionMatrix';
import { ObesityMasteryQuiz } from './obesity/ObesityMasteryQuiz';
import { MuscleHypertrophyPanel } from './obesity/MuscleHypertrophyPanel';
import { FatLossMetabolismPanel } from './obesity/FatLossMetabolismPanel';
import { BodyRecompositionCalculator } from './obesity/BodyRecompositionCalculator';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { ObesitySubTab } from '../../types';
import {
  Scale,
  Activity,
  Flame,
  Pill,
  Utensils,
  Scissors,
  Dumbbell,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  CheckCircle2,
  FileText,
  Heart,
  TrendingDown,
  ArrowRight,
  Info,
  Stethoscope,
  Brain,
  ShieldAlert,
  Zap,
  RefreshCw,
  Award,
} from 'lucide-react';

export const ObesityHub: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ObesitySubTab>('OVERVIEW');
  const [expandedMechanism, setExpandedMechanism] = useState<string | null>('OM-01');
  const [selectedDrugId, setSelectedDrugId] = useState<string>('DRUG-01');
  const [selectedDietId, setSelectedDietId] = useState<string>('DIET-01');
  const [selectedEossStage, setSelectedEossStage] = useState<number>(2);

  const selectedDrug = OBESITY_DRUGS.find((d) => d.id === selectedDrugId) || OBESITY_DRUGS[0];
  const selectedDiet = DIET_REGIMENS.find((d) => d.id === selectedDietId) || DIET_REGIMENS[0];
  const activeEoss = EOSS_STAGES.find((s) => s.stage === selectedEossStage) || EOSS_STAGES[2];

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* ── Grand Hero Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-emerald-300/80 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50 via-teal-50/70 to-emerald-100/50 dark:from-cyan-950/80 dark:via-slate-900/95 dark:to-emerald-950/40 p-6 sm:p-10 shadow-sm dark:shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700/60 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
              <span>Salud 旗艦支柱 · 增肌減脂與體組成醫學專科總樞紐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <span>增肌肌肥大生理、減脂生化代謝、雙軌重組與臨床醫學</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              超越傳統「只看體重計數字、少吃挨餓掉肌肉」的單純減重思維，全面建構「增肌 (Hypertrophy) × 減脂 (Lipolysis) × 同步重組 (Recomposition)」現代體組成運動生理學與臨床代謝醫學雙翼體系！整合機械力學轉導、白胺酸蛋白質時序、脂肪水解級聯、胰島素阻斷閥、EOSS 分級、GLP-1/GIP 腸泌素評析與動態體組成預測。
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">三大機轉</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">肌肥大機械轉導</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-rose-700 dark:text-rose-400">五部曲</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">脂肪水解與氧化</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-cyan-700 dark:text-cyan-400">Recomp</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">雙軌同步試算器</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-emerald-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">CEBM 1a</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">最高實證醫學等級</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-emerald-200/80 dark:border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-emerald-600 text-white font-extrabold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>專區綜覽與 EOSS 分級</span>
        </button>

        <button
          onClick={() => setActiveTab('HYPERTROPHY')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'HYPERTROPHY'
              ? 'bg-emerald-600 text-white font-extrabold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-amber-400" />
          <span>增肌科學 · 肌肥大三大機轉</span>
        </button>

        <button
          onClick={() => setActiveTab('FAT_LOSS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'FAT_LOSS'
              ? 'bg-rose-600 text-white font-extrabold border-rose-500 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-rose-400 hover:bg-rose-50/40'
          }`}
        >
          <Flame className="w-4 h-4 text-amber-300" />
          <span>減脂代謝 · 脂解級聯與氧化</span>
        </button>

        <button
          onClick={() => setActiveTab('RECOMP')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'RECOMP'
              ? 'bg-cyan-600 text-white font-extrabold border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-cyan-400 hover:bg-cyan-50/40'
          }`}
        >
          <Scale className="w-4 h-4 text-cyan-200" />
          <span>同步重組 · 增肌減脂試算器</span>
        </button>

        <button
          onClick={() => setActiveTab('PHARMACOTHERAPY')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'PHARMACOTHERAPY'
              ? 'bg-emerald-700 text-white font-extrabold border-emerald-600 shadow-md ring-2 ring-emerald-600/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-500 hover:bg-emerald-50/40'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>抗肥胖用藥 (GLP-1/GIP)</span>
        </button>

        <button
          onClick={() => setActiveTab('DIETARY_REGIMENS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'DIETARY_REGIMENS'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Utensils className="w-4 h-4" />
          <span>8大代表飲食法雷達對比</span>
        </button>

        <button
          onClick={() => setActiveTab('PATHOPHYSIOLOGY')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'PATHOPHYSIOLOGY'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/40'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>神經內分泌病理機轉</span>
        </button>

        <button
          onClick={() => setActiveTab('SURGERY_AND_SIM')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'SURGERY_AND_SIM'
              ? 'bg-teal-700 text-white font-bold border-teal-600 shadow-md ring-2 ring-teal-600/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-500 hover:bg-teal-50/40'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>手術 · 迷思 · 動態模擬器</span>
        </button>

        <button
          onClick={() => setActiveTab('BEHAVIOR_AND_QUIZ')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'BEHAVIOR_AND_QUIZ'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>衝動急救儀 · 精熟測驗</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW & EOSS CLINICAL STAGING
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-fade-in">
          {/* Cross-link to Longevity Hub */}
          <div className="p-4 sm:p-5 rounded-2xl border border-emerald-300/80 dark:border-emerald-800/60 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-indigo-950/60 dark:via-slate-900 dark:to-cyan-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span>全新旗艦跨支柱聯動：肥胖與加速衰老病理</span>
              </div>
              <div className="font-bold text-sm text-slate-900 dark:text-white">
                內臟脂肪是人體最大的「殭屍細胞」發炎風暴源！深入抗老延壽專區
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                BMI 每增加 5，DNA 甲基化時鐘加速 1.2 年。立即檢視 12 大衰老標誌、DunedinPACE 老化步速與健康壽命模擬器。
              </p>
            </div>
            <a
              href="#longevity"
              className="btn-tactile px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs font-mono shrink-0 flex items-center gap-1.5 shadow-md self-start sm:self-auto"
            >
              <span>前往抗老延壽專區</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* EOSS Interactive Staging Navigator */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase tracking-wider mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Clinical Staging Tool</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                  愛德蒙頓肥胖分級系統 (EOSS, 0~4 級)
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                  國際醫學界公認比 BMI 更精準的臨床分級系統。不僅看體重計數字，更評估「代謝受損程度、器官損害與日常活動失能」。
                </p>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-xs">
                {EOSS_STAGES.map((s) => (
                  <button
                    key={`eoss-btn-${s.stage}`}
                    onClick={() => setSelectedEossStage(s.stage)}
                    className={`w-9 h-9 rounded-xl font-extrabold transition-all ${
                      selectedEossStage === s.stage
                        ? 'bg-salud-cyan text-slate-950 shadow-md scale-105'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    S{s.stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Stage Detail Card */}
            <div className="p-5 sm:p-6 rounded-2xl border border-salud-cyan/30 bg-salud-cyan/5 dark:bg-slate-950/70 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-salud-cyan/20 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-salud-cyan text-slate-950 flex items-center justify-center font-mono font-extrabold text-sm">
                    {activeEoss.stage}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-white">
                    {activeEoss.title_zh}
                  </h3>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-salud-cyan/20 text-salud-cyan font-bold border border-salud-cyan/30">
                  {activeEoss.intensity_badge}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span>臨床病理指標定義</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    {activeEoss.medical_definition_zh}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Brain className="w-3.5 h-3.5 text-purple-400" />
                    <span>身心功能與日常失能</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    {activeEoss.mental_functional_status_zh}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/60 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                    <span>建議臨床治療指引</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                    {activeEoss.recommended_clinical_action_zh}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Multidisciplinary Team Consensus Highlights */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-slate-50 to-cyan-50/20 dark:from-slate-950 dark:to-cyan-950/20 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
              <Zap className="w-4 h-4 text-salud-cyan" />
              <span>多學科專家會議 (MDT) 核心簽核共識</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {MDT_CONSENSUS_STATEMENTS.map((item, idx) => (
                <div
                  key={`mdt-${idx}`}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-slate-500 text-[10px] font-mono">
                    <span className="font-bold text-salud-cyan">{item.expert_id} · {item.expert_title}</span>
                    <span>Consensus Statement</span>
                  </div>
                  <p className="leading-relaxed text-[11px]">"{item.consensus_zh}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: HYPERTROPHY & PROGRESSIVE OVERLOAD SCIENCE (增肌科學)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'HYPERTROPHY' && (
        <MuscleHypertrophyPanel />
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: FAT LOSS BIOCHEMICAL CASCADE (減脂生化代謝)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'FAT_LOSS' && (
        <FatLossMetabolismPanel />
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: BODY RECOMPOSITION & MACRO CALCULATOR (同步重組試算)
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'RECOMP' && (
        <BodyRecompositionCalculator />
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: PATHOPHYSIOLOGY & NEUROENDOCRINE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'PATHOPHYSIOLOGY' && (
        <div className="space-y-6 animate-fade-in">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 shadow-sm backdrop-blur-sm">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-1">
                <Brain className="w-3.5 h-3.5" />
                <span>Molecular & Neuroendocrine Architecture</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                肥胖病理機轉：從脂肪細胞破裂到下視丘神經迴路
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                點選展開任一主題，查閱其詳細生理機制、分子靶點與常見迷思。
              </p>
            </div>

            {/* Feature: Microscopic Adipocyte Browning & UCP-1 Thermogenesis Banner */}
            <div className="mb-6 p-5 rounded-2xl bg-gradient-to-br from-purple-500/10 via-amber-500/10 to-transparent border border-purple-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                <span className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>【臨床生理微觀圖解】脂肪細胞褐變 (Browning) 與 UCP-1 粒線體生熱傳導鏈</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">CEBM Level 1a 實證機轉</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs text-center">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">Step 1 · 誘發刺激</div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">低溫環境 / 運動肌動素</div>
                  <div className="text-[10px] text-slate-400">交感神經去甲腎上腺素 + 肌肉釋放 Irisin 鳶尾素</div>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-purple-700 dark:text-purple-400 font-bold">Step 2 · 受體點火</div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">β3-腎上腺素受體</div>
                  <div className="text-[10px] text-slate-400">活化 Gs 蛋白 ➔ 激發腺苷酸環化酶 ➔ cAMP 暴增</div>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-cyan-700 dark:text-cyan-400 font-bold">Step 3 · 核基因轉錄</div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">PGC-1α / PPAR-γ 軸線</div>
                  <div className="text-[10px] text-slate-400">白色脂肪 WAT 轉化為高粒線體米色脂肪 (Beige)</div>
                </div>

                <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">Step 4 · 熱能燃燒</div>
                  <div className="font-bold text-slate-900 dark:text-white text-[11px]">UCP-1 解偶聯生熱</div>
                  <div className="text-[10px] text-slate-400">質子繞過 ATP 合成酶，直接燃燒脂肪轉化為熱量</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {OBESITY_MECHANISMS.map((mech) => {
                const isExpanded = expandedMechanism === mech.id;
                return (
                  <div
                    key={mech.id}
                    className={`rounded-2xl border transition-all ${
                      isExpanded
                        ? 'border-purple-500/50 bg-purple-50/30 dark:bg-purple-950/20 shadow-md'
                        : 'border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedMechanism(isExpanded ? null : mech.id)}
                      className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                          <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/30">
                            {mech.badge}
                          </span>
                          <EvidenceBadge grade={mech.evidence_grade} />
                        </div>

                        <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white">
                          {mech.title_zh}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
                          {mech.one_liner}
                        </p>
                      </div>

                      <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 shrink-0">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-5 pb-5 pt-2 border-t border-purple-200/50 dark:border-purple-900/40 space-y-4 text-xs animate-fade-in">
                        <div className="p-4 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-2">
                          <div className="font-bold text-purple-700 dark:text-purple-300 font-mono flex items-center gap-1.5">
                            <BookOpen className="w-4 h-4" />
                            <span>四維生理機轉深入拆解 (Physiological Mechanism)</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-xs whitespace-pre-line">
                            {mech.physiological_mechanism_zh}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
                            <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>臨床意義與介入價值 (Clinical Relevance)</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                              {mech.clinical_relevance_zh}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white/80 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1">
                            <div className="font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              <span>大眾常見直覺迷思擊破 (Misconception)</span>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                              {mech.common_misconception_zh}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 pt-2">
                          <span className="text-[10px] font-mono text-slate-400">關鍵生化靶點：</span>
                          {mech.molecular_targets.map((tgt, i) => (
                            <span
                              key={`target-${i}`}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-purple-700 dark:text-purple-300 text-[10px] font-mono border border-slate-200 dark:border-slate-700"
                            >
                              {tgt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: PHARMACOTHERAPY MEDICAL REVIEWS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'PHARMACOTHERAPY' && (
        <div className="space-y-6 animate-fade-in">
          {/* Drug Selector Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {OBESITY_DRUGS.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDrugId(d.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedDrugId === d.id
                    ? 'border-amber-400 bg-amber-500/20 text-slate-950 dark:text-white shadow-md ring-2 ring-amber-400/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-amber-700 dark:text-amber-300 font-bold truncate">
                  {d.drug_class.split(' ')[0]}
                </div>
                <div className="font-bold text-xs truncate mt-0.5 text-slate-900 dark:text-white">
                  {d.generic_name_zh.split(' ')[0]}
                </div>
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 mt-1">
                  平均 -{d.avg_weight_loss_pct}%
                </div>
              </button>
            ))}
          </div>

          {/* Selected Drug Deep Dive Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-md backdrop-blur-md">
            {/* Drug Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold border border-amber-500/40">
                    {selectedDrug.drug_class}
                  </span>
                  <EvidenceBadge grade={selectedDrug.evidence_grade} />
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                  {selectedDrug.generic_name_zh}
                </h2>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {selectedDrug.generic_name_en} · 商標名: {selectedDrug.brand_names.join(', ')}
                </div>
              </div>

              {/* Loss Metrics Pill */}
              <div className="p-3 rounded-2xl bg-amber-50 dark:bg-slate-950 border border-amber-200 dark:border-slate-800 text-center shrink-0">
                <div className="text-[10px] font-mono text-slate-500">RCT 平均減重幅度</div>
                <div className="text-2xl font-mono font-extrabold text-amber-700 dark:text-amber-400">
                  -{selectedDrug.avg_weight_loss_pct}%
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  (安慰劑組 -{selectedDrug.placebo_weight_loss_pct}%)
                </div>
              </div>
            </div>

            {/* Trial & Regulatory Badge Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">指標臨床三期試驗</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                  {selectedDrug.primary_trial_name}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{selectedDrug.trial_citation}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">台灣 TFDA 核准狀態</div>
                <div className={`font-bold mt-0.5 ${selectedDrug.tfda_approved ? 'text-emerald-700 dark:text-emerald-400' : 'text-amber-700 dark:text-amber-400'}`}>
                  {selectedDrug.tfda_approved ? '✓ 已正式核准處方' : '未上市 / 試驗階段'}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{selectedDrug.tfda_status_note}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div className="text-[10px] text-slate-400">用法用量與自費月成本</div>
                <div className="font-bold text-slate-800 dark:text-slate-200 truncate mt-0.5">
                  {selectedDrug.typical_dose}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{selectedDrug.approx_monthly_cost_twd}</div>
              </div>
            </div>

            {/* Mechanism Breakdown */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-amber-700 dark:text-amber-400 font-mono flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>分子受體機轉 (Receptor Mechanisms)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedDrug.mechanism_detail_zh}
              </p>
              {selectedDrug.cardiovascular_benefit_zh && (
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] mt-2">
                  <strong>心血管獲益終點：</strong> {selectedDrug.cardiovascular_benefit_zh}
                </div>
              )}
            </div>

            {/* Critical Clinical Safety: Muscle Loss & Rebound */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300/40 dark:border-emerald-800/40 space-y-2">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <Dumbbell className="w-4 h-4" />
                  <span>骨骼肌 (去脂體重) 流失對策</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  {selectedDrug.muscle_loss_mitigation_zh}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-300/40 dark:border-rose-800/40 space-y-2">
                <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <RefreshCw className="w-4 h-4" />
                  <span>停藥反彈率與終身維持考量</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  {selectedDrug.cessation_rebound_data_zh}
                </p>
              </div>
            </div>

            {/* Adverse Effects & Contraindications */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>常見不良反應</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {selectedDrug.common_adverse_effects.map((e, idx) => (
                    <li key={`adv-${idx}`}>{e}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                  <span>嚴重警告與監測</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {selectedDrug.serious_warnings.map((w, idx) => (
                    <li key={`warn-${idx}`}>{w}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                  <span>絕對禁忌族群</span>
                </div>
                <ul className="space-y-1 text-[11px] text-red-700 dark:text-red-400 list-disc list-inside">
                  {selectedDrug.contraindications.map((c, idx) => (
                    <li key={`contra-${idx}`}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expert Verdict Box */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  臨床實證總結審定意見：
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {selectedDrug.expert_review_summary}
                </p>
              </div>
            </div>
          </div>

          {/* Clinical Trials Megadataset & Drug Interaction Firewall */}
          <DrugInteractionMatrix />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: 8 DIETARY REGIMENS RADAR BENCHMARK
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'DIETARY_REGIMENS' && (
        <div className="space-y-6 animate-fade-in">
          {/* Diet Selector Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {DIET_REGIMENS.map((diet) => (
              <button
                key={diet.id}
                onClick={() => setSelectedDietId(diet.id)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  selectedDietId === diet.id
                    ? 'border-emerald-500 bg-emerald-500/20 text-slate-950 dark:text-white shadow-md ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold truncate">
                  GRADE {diet.evidence_grade}
                </div>
                <div className="font-bold text-xs truncate mt-0.5 text-slate-900 dark:text-white">
                  {diet.name_zh.split(' ')[0]}
                </div>
                <div className="text-[10px] font-mono text-slate-400 truncate mt-1">
                  碳水 {diet.macro_distribution.carbs_pct.split(' ')[0]}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Diet Detailed Benchmark Card */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-md backdrop-blur-md">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/40">
                    飲食模式評定
                  </span>
                  <EvidenceBadge grade={selectedDiet.evidence_grade} />
                </div>

                <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                  {selectedDiet.name_zh}
                </h2>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  {selectedDiet.name_en} · 別名: {selectedDiet.alias}
                </div>
              </div>

              {/* Macro Distribution Chips */}
              <div className="flex items-center gap-2 font-mono text-xs">
                <div className="px-2.5 py-1.5 rounded-xl bg-blue-500/15 border border-blue-500/30 text-blue-800 dark:text-blue-300 text-center">
                  <div className="text-[9px] text-slate-400">碳水</div>
                  <div className="font-bold">{selectedDiet.macro_distribution.carbs_pct}</div>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-center">
                  <div className="text-[9px] text-slate-400">蛋白質</div>
                  <div className="font-bold">{selectedDiet.macro_distribution.protein_pct}</div>
                </div>
                <div className="px-2.5 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-center">
                  <div className="text-[9px] text-slate-400">脂肪</div>
                  <div className="font-bold">{selectedDiet.macro_distribution.fat_pct}</div>
                </div>
              </div>
            </div>

            {/* 5-Dimension Radar Comparison Bars */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-500" />
                  <span>五維度臨床實證評分指標 (Clinical Radar Dimension)</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">滿分 10 分</span>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { label: '短期減重速度 (Weight Loss Speed)', score: selectedDiet.radar_scores.weight_loss_speed, color: 'bg-amber-400' },
                  { label: '去脂骨骼肌保存力 (Muscle Preservation)', score: selectedDiet.radar_scores.muscle_preservation, color: 'bg-emerald-400' },
                  { label: '心血代謝獲益 (Cardio-Metabolic)', score: selectedDiet.radar_scores.cardio_metabolic, color: 'bg-blue-400' },
                  { label: '日常遵從與社交可行性 (Adherence)', score: selectedDiet.radar_scores.adherence_feasibility, color: 'bg-purple-400' },
                  { label: '微量營養素安全性 (Micronutrient Safety)', score: selectedDiet.radar_scores.micronutrient_safety, color: 'bg-teal-400' },
                ].map((item, idx) => (
                  <div key={`radar-${idx}`} className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-700 dark:text-slate-300">{item.label}</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">{item.score} / 10</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        style={{ width: `${item.score * 10}%` }}
                        className={`h-full ${item.color} rounded-full transition-all duration-300`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Biochemical Mechanism Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-emerald-700 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>生化生理機轉 (Biochemical Mechanism)</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                {selectedDiet.biochemical_mechanism_zh}
              </p>
            </div>

            {/* Pros & Pitfalls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-300/40 dark:border-emerald-800/40 space-y-2">
                <div className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>核心臨床優勢</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {selectedDiet.clinical_benefits.map((b, idx) => (
                    <li key={`ben-${idx}`}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-300/40 dark:border-rose-800/40 space-y-2">
                <div className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>潛在風險與常見踩坑</span>
                </div>
                <ul className="space-y-1 text-[11px] text-slate-700 dark:text-slate-300 list-disc list-inside">
                  {selectedDiet.risks_and_pitfalls.map((r, idx) => (
                    <li key={`risk-${idx}`}>{r}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Populations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-slate-800 dark:text-slate-200">最適適用族群：</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {selectedDiet.suitable_populations.join('、')}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <div className="font-bold text-rose-700 dark:text-rose-400">不建議或禁忌族群：</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  {selectedDiet.contraindicated_populations.join('、')}
                </div>
              </div>
            </div>

            {/* Expert Verdict */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-3">
              <Stethoscope className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="font-bold text-emerald-700 dark:text-emerald-400">
                  臨床營養實證評審指引：
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {selectedDiet.expert_verdict_zh}
                </p>
              </div>
            </div>
          </div>

          {/* Taiwan Local Dining Guide & 30g Protein Ruler */}
          <TaiwanDiningGuide />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: SURGERY, MYTHS & SIMULATOR
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'SURGERY_AND_SIM' && (
        <div className="space-y-8 animate-fade-in">
          {/* Integrated Interactive Simulator */}
          <SimWeightTrajectory />

          {/* Bariatric Surgery Section */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider mb-1">
                <Scissors className="w-3.5 h-3.5" />
                <span>Bariatric & Metabolic Surgery</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                減重與代謝手術：解剖重塑與腸道荷爾蒙風暴
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                重度肥胖與頑固難控第 2 型糖尿病的終極利器，依據國際 IFSO 臨床指引規範。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BARIATRIC_SURGERIES.map((surg) => (
                <div
                  key={surg.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 space-y-3.5 flex flex-col justify-between hover:border-rose-400 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/30">
                        {surg.procedure_type === 'RESTRICTIVE' ? '容積限制型' : surg.procedure_type === 'COMBINED' ? '限制 + 吸收不良雙重' : '內視鏡暫時置放'}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400">
                        緩解率 {surg.t2d_remission_rate_pct.split(' ')[0]}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                      {surg.name_zh}
                    </h3>
                    <div className="text-[10px] font-mono text-slate-400">{surg.name_en}</div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                      {surg.anatomical_mechanism_zh}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] space-y-1">
                      <div className="font-bold text-rose-700 dark:text-rose-400">神經內分泌效應：</div>
                      <p className="text-slate-500 dark:text-slate-400 leading-normal">
                        {surg.neuroendocrine_impact_zh}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                    <div className="text-slate-500 dark:text-slate-400">
                      <strong>手術適應症：</strong> {surg.nih_indication_zh}
                    </div>
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-800 dark:text-amber-300 text-[10px] font-mono">
                      <strong>終身警示：</strong> {surg.long_term_nutritional_deficits[0]}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pontzer Constrained Energy Model Card */}
          <div className="rounded-3xl border border-emerald-300/80 dark:border-slate-800 bg-gradient-to-br from-emerald-50 via-teal-50/60 to-emerald-100/40 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-salud-cyan">
              <Dumbbell className="w-5 h-5 text-emerald-600 dark:text-salud-cyan" />
              <span>運動在減重中的真實角色：Herman Pontzer 受限能量消耗模型</span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {EXERCISE_OBESITY_SCIENCE.pontzer_model_summary}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {EXERCISE_OBESITY_SCIENCE.exercise_true_roles.map((item, idx) => (
                <div
                  key={`ex-${idx}`}
                  className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-950 border border-emerald-200/80 dark:border-slate-800 text-xs space-y-1 shadow-xs"
                >
                  <div className="font-bold text-emerald-700 dark:text-amber-400">{item.role_zh}</div>
                  <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">{item.detail_zh}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Myth Busters Accordion */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-sm">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-rose-500 uppercase tracking-wider mb-1">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Myth Busters</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
                5 大坊間流行偽科學迷思粉碎機
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                以嚴謹生物化學與人體生理學數據，粉碎商業炒作與致命誤區。
              </p>
            </div>

            <div className="space-y-4">
              {OBESITY_MYTHS.map((m) => (
                <div
                  key={m.id}
                  className="p-5 rounded-2xl border border-rose-200/60 dark:border-rose-900/40 bg-rose-50/30 dark:bg-rose-950/10 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>迷思宣稱</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-700 dark:text-rose-300 font-bold border border-rose-500/40 self-start">
                      危險度: {m.danger_level}
                    </span>
                  </div>

                  <div className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {m.myth_claim}
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400">
                      ✓ 科學真相：{m.scientific_reality}
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                      <strong>生化原理：</strong> {m.biochemical_why}
                    </p>
                    <div className="text-amber-800 dark:text-amber-300 text-[11px] bg-amber-500/10 p-2 rounded-lg">
                      <strong>正確實踐策略：</strong> {m.actionable_correction}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: BEHAVIOR RESCUE & MASTERY QUIZ
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'BEHAVIOR_AND_QUIZ' && (
        <div className="space-y-8 animate-fade-in">
          <UrgeSurfingTimer />
          <ObesityMasteryQuiz onNavigateToTab={(tab) => setActiveTab(tab as ObesitySubTab)} />
        </div>
      )}
    </div>
  );
};
