import React, { useState, useEffect, Suspense, lazy } from 'react';
import { SportsDiscipline } from '../../../types';
import { DISCIPLINE_HASH } from '../../../config/routes';
import { SPORT_GOALS, SPORT_PRIMERS, type SportGoalId } from '../../../data/sportPrimers';
import { ExerciseHeroHeader } from './ExerciseHeroHeader';
import { DisciplineTabBar } from './DisciplineTabBar';
import {
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  BookOpen,
  ArrowRight,
  Compass,
  Play,
} from 'lucide-react';

// Lazy load all 9 discipline panels for optimal performance
const PhysiologyPanel = lazy(() => import('./disciplines/PhysiologyPanel').then(m => ({ default: m.PhysiologyPanel })));
const RunningPanel = lazy(() => import('./disciplines/RunningPanel').then(m => ({ default: m.RunningPanel })));
const CyclingPanel = lazy(() => import('./disciplines/CyclingPanel').then(m => ({ default: m.CyclingPanel })));
const MountaineeringPanel = lazy(() => import('./disciplines/MountaineeringPanel').then(m => ({ default: m.MountaineeringPanel })));
const StrengthPanel = lazy(() => import('./disciplines/StrengthPanel').then(m => ({ default: m.StrengthPanel })));
const MobilityPanel = lazy(() => import('./disciplines/MobilityPanel').then(m => ({ default: m.MobilityPanel })));
const BadmintonPanel = lazy(() => import('./disciplines/BadmintonPanel').then(m => ({ default: m.BadmintonPanel })));
const TableTennisPanel = lazy(() => import('./disciplines/TableTennisPanel').then(m => ({ default: m.TableTennisPanel })));
const PickleballPanel = lazy(() => import('./disciplines/PickleballPanel').then(m => ({ default: m.PickleballPanel })));

interface Props {
  initialSubTab?: SportsDiscipline;
}

const PanelLoadingFallback: React.FC = () => (
  <div className="py-12 flex flex-col items-center justify-center space-y-3">
    <div className="w-8 h-8 rounded-full border-2 border-emerald-600 border-t-transparent animate-spin" />
    <span className="text-xs font-mono text-slate-500">載入運動專項內容...</span>
  </div>
);

export const ExerciseHub: React.FC<Props> = ({ initialSubTab = 'PHYSIOLOGY' }) => {
  const [activeTab, setActiveTab] = useState<SportsDiscipline>(initialSubTab);
  const [selectedGoalId, setSelectedGoalId] = useState<SportGoalId>('beginner_daily');

  useEffect(() => {
    setActiveTab(initialSubTab);
  }, [initialSubTab]);

  const handleSelectTab = (tab: SportsDiscipline) => {
    setActiveTab(tab);
    window.location.hash = DISCIPLINE_HASH[tab] || 'exercise';
  };

  const activePrimer = SPORT_PRIMERS[activeTab];
  const currentGoal = SPORT_GOALS.find((g) => g.id === selectedGoalId) || SPORT_GOALS[0];

  return (
    <div className="space-y-7 max-w-5xl mx-auto font-sans text-sm pb-16 animate-fade-in">
      {/* Hero Header */}
      <ExerciseHeroHeader compact={activeTab !== 'PHYSIOLOGY'} />

      {/* Goal-based interactive sport recommender */}
      {activeTab === 'PHYSIOLOGY' && (
        <section
          aria-label="依目標挑選運動"
          className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-salud-dark-card sm:p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                不知道從哪項運動開始？點選你的主要目標
              </h2>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              點擊推薦專項可直接切換分頁
            </span>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="運動目標選擇">
            {SPORT_GOALS.map((goal) => {
              const isSelected = goal.id === selectedGoalId;
              return (
                <button
                  key={goal.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedGoalId(goal.id)}
                  className={`btn-tactile rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all ${
                    isSelected
                      ? 'bg-emerald-800 text-white shadow-xs dark:bg-emerald-400 dark:text-slate-950'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  {goal.label_zh}
                </button>
              );
            })}
          </div>

          <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/25 space-y-3">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <strong className="font-semibold text-emerald-900 dark:text-emerald-300">適合情境：</strong>
              {currentGoal.desc_zh}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {currentGoal.recommended.map((discId, idx) => {
                const p = SPORT_PRIMERS[discId];
                const isCurrent = discId === activeTab;
                return (
                  <button
                    key={discId}
                    type="button"
                    onClick={() => handleSelectTab(discId)}
                    className={`btn-tactile text-left rounded-xl border p-3.5 transition-all flex flex-col justify-between gap-2 ${
                      isCurrent
                        ? 'border-emerald-600 bg-white ring-1 ring-emerald-600/30 dark:border-emerald-400 dark:bg-slate-900'
                        : 'border-slate-200/90 bg-white/90 hover:border-emerald-400 dark:border-slate-800 dark:bg-slate-900/80'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
                          推薦 {idx + 1} · {p.eyebrow_zh.split('·')[1]?.trim() || p.eyebrow_zh}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      </div>
                      <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                        {p.title_zh.split('：')[0]}
                      </div>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                      {p.intensity_badge_zh}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 9-Discipline Tab Switcher */}
      <DisciplineTabBar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Plain-Language Sport Primer Card for the Active Discipline */}
      <section
        aria-label={`${activePrimer.title_zh}白話導讀`}
        className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-salud-dark-card sm:p-7 space-y-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
              {activePrimer.eyebrow_zh}
            </span>
            <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-300">
              {activePrimer.intensity_badge_zh}
            </span>
          </div>
          <a
            href={`#${activePrimer.starter_lesson.hash}`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50/90 px-3 py-1.5 text-xs font-semibold text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>搭配 5 分鐘課：{activePrimer.starter_lesson.label}</span>
            <ArrowRight className="w-3 h-3 shrink-0" />
          </a>
        </div>

        <div className="space-y-2">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {activePrimer.title_zh}
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
            {activePrimer.lead_zh}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-300">適合誰：</strong>
            {activePrimer.suitable_for_zh}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50/90 p-4 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
            這項運動最重要的 3 個觀念
          </div>
          <ul className="space-y-2">
            {activePrimer.benefits_zh.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-1" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 dark:border-emerald-900/50 dark:bg-emerald-950/25 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>新手今天就能做的第一步</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {activePrimer.beginner_step_zh}
            </p>
          </div>

          <div className="rounded-xl border border-amber-200/80 bg-amber-50/50 p-4 dark:border-amber-900/50 dark:bg-amber-950/20 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 dark:text-amber-300">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>安全與防傷關鍵提醒</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {activePrimer.injury_tip_zh}
            </p>
          </div>
        </div>
      </section>

      {/* Active Discipline Panel with Lazy Suspense */}
      <Suspense fallback={<PanelLoadingFallback />}>
        {activeTab === 'PHYSIOLOGY' && <PhysiologyPanel />}
        {activeTab === 'RUNNING' && <RunningPanel />}
        {activeTab === 'CYCLING' && <CyclingPanel />}
        {activeTab === 'MOUNTAINEERING' && <MountaineeringPanel />}
        {activeTab === 'STRENGTH_TRAINING' && <StrengthPanel />}
        {activeTab === 'MOBILITY_FASCIA' && <MobilityPanel />}
        {activeTab === 'BADMINTON' && <BadmintonPanel />}
        {activeTab === 'TABLE_TENNIS' && <TableTennisPanel />}
        {activeTab === 'PICKLEBALL' && <PickleballPanel />}
      </Suspense>
    </div>
  );
};
