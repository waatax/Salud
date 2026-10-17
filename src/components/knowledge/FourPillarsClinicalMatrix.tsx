import React, { useState } from 'react';
import { getFourPillarsProfile, PillarActionDetail } from '../../data/fourPillarsMatrix';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { useActionPlan } from '../../hooks/useActionPlan';
import {
  Utensils,
  Activity,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Check,
  Plus,
  AlertOctagon,
  BookOpen,
  LayoutGrid,
  Layers,
  ArrowRight,
  ShieldAlert,
  Info,
  ExternalLink
} from 'lucide-react';

interface Props {
  pageIdOrTopic: string;
  pageTitle?: string;
}

type PillarKey = 'diet' | 'exercise' | 'prevention' | 'treatment';

export const FourPillarsClinicalMatrix: React.FC<Props> = ({ pageIdOrTopic, pageTitle }) => {
  const profile = getFourPillarsProfile(pageIdOrTopic);
  const [activePillar, setActivePillar] = useState<PillarKey>('diet');
  const [viewMode, setViewMode] = useState<'tabs' | 'grid'>('tabs');
  const { inPlan, add: addAction, remove: removeAction } = useActionPlan();

  const PILLAR_CONFIGS: {
    key: PillarKey;
    label_zh: string;
    sublabel: string;
    icon: React.ElementType;
    badgeTone: string;
    cardBorder: string;
    cardBg: string;
    activeTabClass: string;
    accentText: string;
  }[] = [
    {
      key: 'diet',
      label_zh: '飲食營養對策',
      sublabel: '飲食模式 · 營養素 · 禁忌',
      icon: Utensils,
      badgeTone: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
      cardBorder: 'border-emerald-300/80 dark:border-emerald-800/60',
      cardBg: 'bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/30 dark:from-emerald-950/20 dark:via-salud-dark-surface dark:to-slate-900',
      activeTabClass: 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-md',
      accentText: 'text-emerald-700 dark:text-emerald-400',
    },
    {
      key: 'exercise',
      label_zh: '運動體能處方',
      sublabel: 'Zone 2 · 肌力訓練 · 傷害防範',
      icon: Activity,
      badgeTone: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-800',
      cardBorder: 'border-sky-300/80 dark:border-sky-800/60',
      cardBg: 'bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/30 dark:from-sky-950/20 dark:via-salud-dark-surface dark:to-slate-900',
      activeTabClass: 'bg-sky-600 text-white shadow-sky-500/20 shadow-md',
      accentText: 'text-sky-700 dark:text-sky-400',
    },
    {
      key: 'prevention',
      label_zh: '預防監測策略',
      sublabel: '數值指標 · 公費篩檢 · 早期預防',
      icon: ShieldCheck,
      badgeTone: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
      cardBorder: 'border-amber-300/80 dark:border-amber-800/60',
      cardBg: 'bg-gradient-to-br from-amber-50/70 via-white to-orange-50/30 dark:from-amber-950/20 dark:via-salud-dark-surface dark:to-slate-900',
      activeTabClass: 'bg-amber-600 text-white shadow-amber-500/20 shadow-md',
      accentText: 'text-amber-700 dark:text-amber-400',
    },
    {
      key: 'treatment',
      label_zh: '正規醫療與警訊',
      sublabel: '一線藥物 · 臨床階梯 · 就醫紅線',
      icon: Stethoscope,
      badgeTone: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
      cardBorder: 'border-rose-300/80 dark:border-rose-800/60',
      cardBg: 'bg-gradient-to-br from-rose-50/70 via-white to-purple-50/30 dark:from-rose-950/20 dark:via-salud-dark-surface dark:to-slate-900',
      activeTabClass: 'bg-rose-600 text-white shadow-rose-500/20 shadow-md',
      accentText: 'text-rose-700 dark:text-rose-400',
    },
  ];

  const renderPillarCard = (cfg: typeof PILLAR_CONFIGS[0]) => {
    const detail: PillarActionDetail = profile[cfg.key];
    const planId = `${pageIdOrTopic}#${cfg.key}`;
    const isAdded = inPlan(planId);
    const Icon = cfg.icon;

    return (
      <div
        key={cfg.key}
        className={`rounded-2xl border ${cfg.cardBorder} ${cfg.cardBg} p-5 sm:p-6 space-y-4 shadow-sm transition-all hover:shadow-md`}
      >
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs ${cfg.accentText}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border ${cfg.badgeTone}`}>
                {cfg.label_zh}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white pt-1">
                {detail.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <EvidenceBadge grade={detail.evidence_grade} />
          </div>
        </div>

        {/* One Liner Banner */}
        <div className="p-3.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed shadow-2xs">
          💡 <strong>核心行動：</strong>{detail.one_liner}
        </div>

        {/* Key Metric Highlight */}
        {detail.key_metric && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <span className="text-slate-500 dark:text-slate-400 font-sans">{detail.key_metric.label}:</span>
            <span className={`font-bold ${cfg.accentText}`}>{detail.key_metric.target}</span>
            {detail.key_metric.unit && <span className="text-slate-400">{detail.key_metric.unit}</span>}
          </div>
        )}

        {/* Clinical Points */}
        <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
          {detail.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className={`${cfg.accentText} font-bold mt-0.5`}>•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {/* Red Flag Alert for Treatment or Safety */}
        {detail.caution && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-900/60 text-xs text-red-900 dark:text-red-200 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-red-700 dark:text-red-400 font-mono text-[11px]">
              <AlertOctagon className="w-3.5 h-3.5 animate-pulse" />
              <span>臨床警訊與急診紅線 (Clinical Warning Boundary)</span>
            </div>
            <p className="leading-relaxed">{detail.caution}</p>
          </div>
        )}

        {/* Action Button & Evidence Source */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
          <div className="text-[10px] text-slate-500 font-mono truncate max-w-xs" title={detail.evidence_source}>
            實證來源：{detail.evidence_source}
          </div>

          <button
            onClick={() => (isAdded ? removeAction(planId) : addAction(planId))}
            className={`btn-tactile px-3.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              isAdded
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-700'
            }`}
          >
            {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{isAdded ? '已在今日計畫' : '加入個人行動處方'}</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <section id="sec-four-pillars" className="space-y-4 pt-2">
      {/* Title & Mode Switcher */}
      <div className="p-5 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-gradient-to-br from-emerald-50/60 via-white to-sky-50/40 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-800 pb-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300 font-mono">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>全人醫療與生活實證 · 四大健康處方導圖</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white">
              {pageTitle ? `${pageTitle} 的四大全景臨床對策` : `${profile.title_zh} 四大臨床處方`}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              整合【飲食營養】、【運動體能】、【預防監測】與【正規醫療治療】，讓你能自主實踐、精準防護與掌握就醫時機。
            </p>
          </div>

          {/* View Mode Toggle: Tabs vs 4-Grid */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-mono">
            <button
              onClick={() => setViewMode('tabs')}
              className={`btn-tactile px-2.5 py-1 rounded-xl flex items-center gap-1 transition-all ${
                viewMode === 'tabs'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="分頁標籤切換"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>分頁閱讀</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`btn-tactile px-2.5 py-1 rounded-xl flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
              title="四象限全景對照"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>四象限全覽</span>
            </button>
          </div>
        </div>

        {/* Tab Selector (when in Tabs mode) */}
        {viewMode === 'tabs' && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {PILLAR_CONFIGS.map((cfg) => {
              const active = activePillar === cfg.key;
              const Icon = cfg.icon;
              return (
                <button
                  key={cfg.key}
                  onClick={() => setActivePillar(cfg.key)}
                  className={`btn-tactile p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                    active
                      ? `${cfg.activeTabClass} border-transparent`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${active ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {profile[cfg.key].evidence_grade} 級實證
                    </span>
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold block leading-tight">
                      {cfg.label_zh}
                    </span>
                    <span className={`text-[10px] line-clamp-1 opacity-80 ${active ? 'text-white' : 'text-slate-500'}`}>
                      {cfg.sublabel}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Content Render */}
        <div className="pt-2">
          {viewMode === 'tabs' ? (
            <div className="animate-fade-in">
              {renderPillarCard(PILLAR_CONFIGS.find((c) => c.key === activePillar)!)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
              {PILLAR_CONFIGS.map((cfg) => renderPillarCard(cfg))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
