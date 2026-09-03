import React, { useState } from 'react';
import { KnowledgePage as KnowledgePageType, DepthLevel } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { RedFlagAlert } from '../common/RedFlagAlert';
import { FigureContainer } from '../figures/FigureContainer';
import { FIGURES_CATALOG } from '../../data/figuresMeta';
import { T1Mechanism } from '../figures/T1Mechanism';
import { T2Anatomy } from '../figures/T2Anatomy';
import { T3Molecular } from '../figures/T3Molecular';
import { T5ScaleSpectrum } from '../figures/T5ScaleSpectrum';
import { T6ComparisonBar } from '../figures/T6ComparisonBar';
import { T8PortionVisual } from '../figures/T8PortionVisual';
import { T10MythCard } from '../figures/T10MythCard';
import { SimHydration } from '../simulators/SimHydration';
import { SimOilSwap } from '../simulators/SimOilSwap';
import { SimCookTemp } from '../simulators/SimCookTemp';
import { SelfCheckQuiz } from './SelfCheckQuiz';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  ShieldCheck,
  MapPin,
  ListOrdered,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface Props {
  page: KnowledgePageType;
  onNavigatePage: (pageId: string) => void;
}

export const KnowledgePage: React.FC<Props> = ({ page, onNavigatePage }) => {
  // Spec §3.5: L1 (Skim <=60s) / L2 (Understand 3-5 min, default) / L3 (Deep Dive 8-15 min)
  const [depth, setDepth] = useState<DepthLevel>('L2');
  const [expandedKPs, setExpandedKPs] = useState<Record<string, boolean>>({});

  const toggleKP = (kpId: string) => {
    setExpandedKPs((prev) => ({ ...prev, [kpId]: !prev[kpId] }));
  };

  // Render proper SVG figure by ID
  const renderFigureComponent = (figId: string) => {
    if (figId === 'FIG-W-01-02') return <T2Anatomy />;
    if (figId === 'FIG-W-03-01' || figId === 'FIG-W-03-02') return <T1Mechanism />;
    if (figId === 'FIG-W-06-01') return <T5ScaleSpectrum />;
    if (figId === 'FIG-O-02-01' || figId === 'FIG-O-02-02') return <T3Molecular />;
    if (figId === 'FIG-O-07-01') return <T6ComparisonBar />;
    if (figId === 'FIG-W-10-02' || figId === 'FIG-O-11-02') return <T8PortionVisual />;
    // Default fallback to comparison bar or mechanism
    return <T6ComparisonBar />;
  };

  return (
    <article className="space-y-8 font-sans text-xs pb-16 max-w-4xl mx-auto">
      {/* ── Page Header & Depth Switcher (Spec §3.5) ── */}
      <header className="space-y-4 border-b border-salud-light-border/80 dark:border-salud-dark-border/80 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-salud-amber-600 dark:text-salud-amber font-bold">{page.id}</span>
            <span>·</span>
            <span>第 {page.order_index} 頁</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Clock className="w-3 h-3" /> 約 {page.estimated_minutes} 分鐘
            </span>
          </div>

          {/* Depth Switcher L1 / L2 / L3 (Spec §3.5) */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-slate-900 border border-slate-300/80 dark:border-slate-800">
            <button
              onClick={() => setDepth('L1')}
              className={`px-3 py-1 rounded-lg transition-all ${
                depth === 'L1'
                  ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="L1 掃讀：KP 核心一句話 + 結論行動（約 60 秒）"
            >
              L1 掃讀
            </button>
            <button
              onClick={() => setDepth('L2')}
              className={`px-3 py-1 rounded-lg transition-all ${
                depth === 'L2'
                  ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="L2 理解：機制圖解 + 數值 + 迷思剖析（預設推薦，約 3–5 分鐘）"
            >
              ● L2 理解
            </button>
            <button
              onClick={() => setDepth('L3')}
              className={`px-3 py-1 rounded-lg transition-all ${
                depth === 'L3'
                  ? 'bg-purple-600 dark:bg-purple-500 text-white font-bold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
              title="L3 深入：生化反應式、研究限制與完整原始文獻（約 8–15 分鐘）"
            >
              L3 深入
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
          {page.title_zh}
        </h1>
        <div className="text-sm font-mono text-salud-light-muted dark:text-salud-dark-muted">
          {page.title_en}
        </div>
      </header>

      {/* ── 00 Hook (Spec §3.4) ── */}
      <section className="p-4 sm:p-5 rounded-2xl border border-salud-amber-500/30 bg-gradient-to-r from-salud-amber-500/10 via-salud-light-card/60 dark:via-salud-dark-card/40 to-transparent">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-salud-amber-500 dark:text-salud-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-salud-amber-600 dark:text-salud-amber-400 font-bold block">
              00 Hook · 機制核心提問
            </span>
            <p className="text-sm sm:text-base font-semibold text-salud-light-text dark:text-salud-dark-text leading-relaxed">
              {page.hook}
            </p>
          </div>
        </div>
      </section>

      {/* ── 01 KP List (Spec §3.4: 3-7 KPs, One-liner, Expandable) ── */}
      <section className="space-y-3">
        <div className="flex items-center justify-between border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-salud-cyan" />
            01 本頁知識點清單 (Knowledge Points, {page.kps.length})
          </h3>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            點擊展開完整陳述與證據
          </span>
        </div>

        <div className="space-y-2.5">
          {page.kps.map((kp) => {
            const isExpanded = expandedKPs[kp.id] || depth === 'L2' || depth === 'L3';

            return (
              <div
                key={kp.id}
                className="rounded-xl border border-salud-light-border dark:border-salud-dark-border/80 bg-salud-light-surface dark:bg-salud-dark-surface overflow-hidden transition-all duration-200"
              >
                {/* KP Summary Bar */}
                <button
                  onClick={() => toggleKP(kp.id)}
                  className="w-full p-3.5 text-left flex items-start justify-between gap-3 hover:bg-salud-light-card/50 dark:hover:bg-salud-dark-card/40 transition-colors"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-salud-amber-700 dark:text-salud-amber-400 font-bold border border-slate-300 dark:border-slate-700">
                        {kp.id}
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 uppercase">
                        [{kp.kp_type}]
                      </span>
                      <EvidenceBadge grade={kp.evidence_grade} showText={false} />
                    </div>
                    <h4 className="text-sm font-bold text-salud-light-text dark:text-salud-dark-text leading-snug">
                      {kp.one_liner}
                    </h4>
                  </div>

                  <div className="text-slate-400 p-1 shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {/* Expanded Statement (L2 & L3) */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 space-y-3 border-t border-salud-light-border/60 dark:border-salud-dark-border/40 text-xs text-slate-700 dark:text-slate-300 animate-fade-in">
                    <p className="leading-relaxed text-slate-800 dark:text-slate-200 font-sans text-xs sm:text-sm">
                      {kp.statement}
                    </p>

                    <div className="p-3 rounded-lg bg-salud-light-card/80 dark:bg-salud-dark-card/60 border border-slate-200 dark:border-slate-800 space-y-1">
                      <span className="text-[11px] font-mono text-salud-amber-600 dark:text-salud-amber-400 font-semibold block">
                        為什麼你該在意 (Why it matters)：
                      </span>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {kp.why_it_matters}
                      </p>
                    </div>

                    {kp.common_misconception && (
                      <div className="p-2.5 rounded-lg bg-red-100/70 dark:bg-red-950/20 border border-red-300 dark:border-red-500/30 text-red-800 dark:text-red-200 text-xs">
                        <strong className="font-mono text-red-700 dark:text-red-300">常見誤解：</strong>
                        <span>{kp.common_misconception}</span>
                      </div>
                    )}

                    {/* Metadata tags */}
                    <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-800/80 gap-2">
                      <div>適用：{kp.applies_population} · 排除：{kp.excludes.join(', ') || '無'}</div>
                      <div>審查：{kp.reviewed_by.join(', ')} · {kp.last_reviewed}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 02 Mechanism (Spec §3.4: Diagram-led) ── */}
      <section className="space-y-4">
        <div className="border-b border-salud-dark-border/60 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-salud-amber" />
            02 核心機制圖解 (Mechanism & Visual Diagrams)
          </h3>
        </div>

        <div className="space-y-6">
          {page.figure_ids.map((figId) => {
            const figMeta = FIGURES_CATALOG[figId];
            if (!figMeta) return null;

            return (
              <FigureContainer key={figId} meta={figMeta}>
                {renderFigureComponent(figId)}
              </FigureContainer>
            );
          })}
        </div>
      </section>

      {/* ── 04 Simulate (Interactive Simulator if available) ── */}
      <section className="space-y-3">
        <div className="border-b border-salud-dark-border/60 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-salud-dark-text dark:text-salud-dark-text light:text-salud-light-text flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-salud-cyan" />
            04 互動模擬 (Simulation & Interactive Testing)
          </h3>
        </div>

        {page.chapter_id === 'W' && (
          <SimHydration />
        )}

        {page.chapter_id === 'O' && (
          <div className="space-y-6">
            <SimOilSwap />
            <SimCookTemp />
          </div>
        )}
      </section>

      {/* ── 05 Taiwan Context (Spec §3.4: Climate, Food, Laws) ── */}
      <section className="p-4 sm:p-5 rounded-2xl border border-salud-light-border dark:border-salud-dark-border bg-slate-100/90 dark:bg-slate-900/60 space-y-3">
        <div className="flex items-center gap-2 text-salud-amber-600 dark:text-salud-amber-400 font-display font-bold text-sm sm:text-base">
          <MapPin className="w-4 h-4" />
          05 台灣在地情境：{page.taiwan_context.title}
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {page.taiwan_context.description}
        </p>
        <ul className="space-y-1.5 pl-2">
          {page.taiwan_context.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span className="text-salud-amber-600 dark:text-salud-amber font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 06 Myths Arena (Spec §3.4) ── */}
      {page.myths && page.myths.length > 0 && (
        <section className="space-y-3">
          <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
            <h3 className="text-sm sm:text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-salud-amber" />
              06 迷思擂台 (Myth vs Evidence)
            </h3>
          </div>
          <div className="space-y-4">
            {page.myths.map((myth) => (
              <T10MythCard key={myth.id} item={myth} />
            ))}
          </div>
        </section>
      )}

      {/* ── 07 Do This (Action Tier 1 / Tier 2 / Tier 3) ── */}
      <section className="space-y-3">
        <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            07 行動階梯 (Do This Action Ladder)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-100/70 dark:bg-emerald-950/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
              Tier 1 · 幾乎所有人皆可做
            </span>
            <p className="text-xs text-emerald-950 dark:text-emerald-100/90 leading-relaxed font-medium">
              {page.do_this.tier1}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-salud-cyan/40 bg-cyan-100/70 dark:bg-salud-cyan-950/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-800 dark:text-salud-cyan-400 font-bold block">
              Tier 2 · 需主動規劃留意
            </span>
            <p className="text-xs text-cyan-950 dark:text-cyan-100/90 leading-relaxed font-medium">
              {page.do_this.tier2}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-salud-amber/40 bg-amber-100/70 dark:bg-salud-amber-950/20 space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-salud-amber-400 font-bold block">
              Tier 3 · 需專業個別化指導
            </span>
            <p className="text-xs text-amber-950 dark:text-amber-100/90 leading-relaxed font-medium">
              {page.do_this.tier3}
            </p>
          </div>
        </div>
      </section>

      {/* ── 08 Not For You (Exceptions & Gated Population) ── */}
      {page.not_for_you && page.not_for_you.length > 0 && (
        <section className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/90 dark:bg-slate-900/60 space-y-2">
          <h4 className="font-bold text-xs font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            08 Not For You · 不適用族群與邊界例外
          </h4>
          <div className="flex flex-wrap gap-2">
            {page.not_for_you.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-300 dark:border-slate-700"
              >
                ⊘ {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── 09 Red Flags (Unified Red Flag Engine) ── */}
      {page.red_flags && page.red_flags.length > 0 && (
        <section className="space-y-2">
          <RedFlagAlert messages={page.red_flags} />
        </section>
      )}

      {/* ── 10 Self-check Interactive Quiz ── */}
      <section>
        <SelfCheckQuiz items={page.quiz_items} pageTitle={page.title_zh} />
      </section>

      {/* ── 11 Evidence Freshness & Governance Footer ── */}
      <footer className="p-4 sm:p-5 rounded-2xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/60 dark:bg-salud-dark-card/30 space-y-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-salud-light-border/60 dark:border-salud-dark-border/40 pb-2">
          <span className="font-bold text-slate-800 dark:text-slate-300">11 實證架構與治理紀錄</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
            證據新鮮度：{page.evidence_freshness}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-slate-500 block">最後醫療簽核日：</span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">{page.last_reviewed}</span>
          </div>
          <div>
            <span className="text-slate-500 block">排程再審週期：</span>
            <span className="text-slate-800 dark:text-slate-300">{page.next_review}</span>
          </div>
          <div>
            <span className="text-slate-500 block">審查專家簽核：</span>
            <span className="text-salud-amber-600 dark:text-salud-amber-400 font-bold">{page.reviewed_by.join(', ')}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-salud-light-border/60 dark:border-salud-dark-border/40 text-[10px] text-slate-500 leading-relaxed">
          免責聲明：Salud 為實證健康人體模擬與衛教平台，非個人醫療診斷、治療或處方。若有心臟、腎臟或嚴重慢性病，請務必遵循合格醫師開立之醫囑處方。
        </div>
      </footer>
    </article>
  );
};
