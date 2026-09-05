import React, { useState } from 'react';
import { KnowledgePage as KnowledgePageType, DepthLevel } from '../../types';
import { useLanguage } from '../../i18n';
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
import { SimBAC } from '../simulators/SimBAC';
import { SbxALDH2 } from '../simulators/SbxALDH2';
import { SelfCheckQuiz } from './SelfCheckQuiz';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';

interface Props {
  page: KnowledgePageType;
  onNavigatePage: (pageId: string) => void;
}

export const KnowledgePage: React.FC<Props> = ({ page, onNavigatePage }) => {
  const { t, language } = useLanguage();
  const [depth, setDepth] = useState<DepthLevel>('L2');
  const [expandedKPs, setExpandedKPs] = useState<Record<string, boolean>>({});

  const toggleKP = (kpId: string) => {
    setExpandedKPs((prev) => ({ ...prev, [kpId]: !prev[kpId] }));
  };

  // Render proper SVG figure by ID
  const renderFigureComponent = (figId: string) => {
    if (figId === 'FIG-W-01-02') return <T2Anatomy />;
    if (figId === 'FIG-W-03-01' || figId === 'FIG-W-03-02') return <T1Mechanism figureId={figId} />;
    if (figId === 'FIG-W-06-01') return <T5ScaleSpectrum />;
    if (figId === 'FIG-O-02-01' || figId === 'FIG-O-02-02') return <T3Molecular />;
    if (figId === 'FIG-O-07-01') return <T6ComparisonBar />;
    if (figId === 'FIG-W-10-02' || figId === 'FIG-O-11-02' || figId === 'FIG-A-01-01') return <T8PortionVisual />;
    if (figId === 'FIG-A-02-01') return <T1Mechanism figureId={figId} />;
    if (figId === 'FIG-A-03-01') return <T3Molecular />;
    if (figId === 'FIG-A-06-03') return <T5ScaleSpectrum />;
    if (figId === 'FIG-A-08-01') return <T6ComparisonBar />;
    return <T6ComparisonBar />;
  };

  const isAlcoholPage12 = page.id === 'PAGE-A-12';

  // Navigation calculation
  const prefix = `PAGE-${page.chapter_id}`;
  const currentIndex = page.order_index;
  const maxPages = page.chapter_id === 'W' ? 10 : page.chapter_id === 'O' ? 11 : 12;
  const prevPageId = currentIndex > 1 ? `${prefix}-${String(currentIndex - 1).padStart(2, '0')}` : null;
  const nextPageId = currentIndex < maxPages ? `${prefix}-${String(currentIndex + 1).padStart(2, '0')}` : null;

  return (
    <article className="space-y-8 font-sans text-xs pb-16 max-w-4xl mx-auto transition-colors">
      {/* ── Page Header & Depth Switcher ── */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-nature-amber-700 dark:text-salud-amber font-bold">{page.id}</span>
            <span>·</span>
            <span>{t('page.page_order', page.order_index)}</span>
            <span>·</span>
            <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300">
              <Clock className="w-3 h-3 text-nature-sky-600 dark:text-nature-sky-400" /> {t('page.estimated_time', page.estimated_minutes)}
            </span>
          </div>

          {/* Depth Switcher L1 / L2 / L3 */}
          <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={() => setDepth('L1')}
              className={`btn-tactile px-3 py-1 rounded-xl transition-all ${
                depth === 'L1'
                  ? 'bg-nature-sky-500 text-white font-bold shadow-cyan-glow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={t('page.depth_l1_tooltip')}
            >
              {t('page.depth_l1')}
            </button>
            <button
              onClick={() => setDepth('L2')}
              className={`btn-tactile px-3 py-1 rounded-xl transition-all ${
                depth === 'L2'
                  ? 'bg-nature-amber-500 text-white font-bold shadow-warm-glow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={t('page.depth_l2_tooltip')}
            >
              {t('page.depth_l2')}
            </button>
            <button
              onClick={() => setDepth('L3')}
              className={`btn-tactile px-3 py-1 rounded-xl transition-all ${
                depth === 'L3'
                  ? 'bg-purple-600 text-white font-bold shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={t('page.depth_l3_tooltip')}
            >
              {t('page.depth_l3')}
            </button>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight">
          {language === 'zh-TW' ? page.title_zh : page.title_en}
        </h1>
        <div className="text-sm font-mono text-slate-500 dark:text-slate-400">
          {language === 'zh-TW' ? page.title_en : page.title_zh}
        </div>
      </header>

      {/* ── MANDATORY Harm Reduction Banner on PAGE-A-12 ── */}
      {isAlcoholPage12 && (
        <div className="p-4 sm:p-5 rounded-2xl border-2 border-red-300 dark:border-red-500 bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-200 space-y-2 shadow-sm">
          <div className="flex items-center gap-2 font-display font-extrabold text-sm sm:text-base text-red-700 dark:text-red-400">
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 animate-pulse" />
            <span>{t('page.harm_reduction_title')}</span>
          </div>
          <p className="text-xs sm:text-sm text-red-800 dark:text-red-100 leading-relaxed font-medium">
            {t('page.harm_reduction_banner')}
          </p>
        </div>
      )}

      {/* ── 00 Hook ── */}
      <section className="p-5 rounded-2xl border border-nature-amber-200/90 dark:border-nature-amber-500/30 bg-nature-amber-50/70 dark:bg-nature-amber-950/20 shadow-sm">
        <div className="font-mono text-[11px] text-nature-amber-800 dark:text-nature-amber-400 font-bold mb-1.5 uppercase tracking-wider">
          {t('page.sec_00_hook')}
        </div>
        <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
          {page.hook}
        </p>
      </section>

      {/* ── 01 Atomic Knowledge Points ── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-nature-sky-600 dark:text-nature-sky-400" />
            {t('page.sec_01_kps')}
          </h3>
          <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            {page.kps.length} 個原子化知識點
          </span>
        </div>

        <div className="space-y-3.5">
          {page.kps.map((kp) => {
            const isExpanded = expandedKPs[kp.id] !== undefined ? expandedKPs[kp.id] : depth !== 'L1';

            return (
              <div
                key={kp.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm transition-all hover:border-nature-sky-300 dark:hover:border-nature-sky-700 space-y-3"
              >
                {/* KP Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-nature-amber-700 dark:text-nature-amber-400">
                        {kp.id}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 uppercase font-semibold border border-slate-200 dark:border-slate-700">
                        {kp.kp_type}
                      </span>
                      <EvidenceBadge grade={kp.evidence_grade} />
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white pt-0.5">
                      {kp.title}
                    </h4>
                  </div>

                  <button
                    onClick={() => toggleKP(kp.id)}
                    className="btn-tactile p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                    aria-label="展開或收合詳細內容"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {/* Core One-Liner (Nature Sky Tint in light mode) */}
                <div className="p-3 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200/90 dark:border-nature-sky-800/60 text-xs font-medium text-nature-sky-950 dark:text-nature-sky-200 leading-relaxed font-sans">
                  💡 {kp.one_liner}
                </div>

                {/* Progressive Disclosure (L2 / L3 details) */}
                {isExpanded && (
                  <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                    <p className="leading-relaxed">
                      {kp.statement}
                    </p>

                    <div className="p-3.5 rounded-xl bg-nature-green-50/90 dark:bg-nature-green-950/20 border border-nature-green-200 dark:border-nature-green-800/60 text-xs space-y-1">
                      <strong className="text-nature-green-800 dark:text-nature-green-300 font-bold block">
                        Why It Matters 為什麼這很重要：
                      </strong>
                      <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                        {kp.why_it_matters}
                      </p>
                    </div>

                    {kp.common_misconception && (
                      <div className="p-3.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60 text-xs space-y-1">
                        <strong className="text-amber-800 dark:text-amber-300 font-bold block">
                          常見誤解澄清：
                        </strong>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed">
                          {kp.common_misconception}
                        </p>
                      </div>
                    )}

                    {/* Metadata pill row */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      <span>適用：{kp.applies_population}</span>
                      <span>·</span>
                      <span>區域：{kp.applies_region}</span>
                      {kp.excludes && kp.excludes.length > 0 && (
                        <>
                          <span>·</span>
                          <span className="text-red-600 dark:text-red-400 font-medium">排除：{kp.excludes.join(', ')}</span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 02–04 Figures ── */}
      {page.figure_ids && page.figure_ids.length > 0 && (
        <section className="space-y-4">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
              {t('page.sec_02_figs')}
            </h3>
          </div>

          <div className="space-y-6">
            {page.figure_ids.map((figId) => {
              const meta = FIGURES_CATALOG[figId];
              if (!meta) return null;

              return (
                <FigureContainer key={figId} meta={meta}>
                  {renderFigureComponent(figId)}
                </FigureContainer>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Interactive Simulators for Chapter W, O, and A ── */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-nature-sky-600 dark:text-nature-sky-400" />
            {page.chapter_id === 'A'
              ? t('page.sim_banner_alcohol')
              : page.chapter_id === 'O'
              ? t('page.sim_banner_oil')
              : t('page.sim_banner_hydration')}
          </h3>
        </div>

        {page.chapter_id === 'W' && <SimHydration />}

        {page.chapter_id === 'O' && (
          <div className="space-y-6">
            <SimOilSwap />
            <SimCookTemp />
          </div>
        )}

        {page.chapter_id === 'A' && (
          <div className="space-y-6">
            <SimBAC />
            <SbxALDH2 />
          </div>
        )}
      </section>

      {/* ── 05 Taiwan Context ── */}
      <section className="p-5 rounded-2xl border border-nature-amber-200/90 dark:border-slate-800 bg-nature-amber-50/50 dark:bg-slate-900/60 space-y-3 shadow-sm">
        <div className="flex items-center gap-2 text-nature-amber-800 dark:text-nature-amber-400 font-display font-bold text-sm sm:text-base">
          <MapPin className="w-4 h-4" />
          {t('page.sec_05_tw')}：{page.taiwan_context.title}
        </div>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          {page.taiwan_context.description}
        </p>
        <ul className="space-y-1.5 pl-2">
          {page.taiwan_context.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <span className="text-nature-amber-600 dark:text-salud-amber font-bold">•</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── 06 Myths Arena ── */}
      {page.myths && page.myths.length > 0 && (
        <section className="space-y-3">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
            <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
              {t('page.sec_06_myths')}
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
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-nature-green-600 dark:text-nature-green-400" />
            {t('page.sec_07_dothis')}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl border border-nature-green-200 dark:border-emerald-800/60 bg-nature-green-50/90 dark:bg-emerald-950/20 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-nature-green-800 dark:text-nature-green-400 font-bold block">
              {t('page.tier1_title')}
            </span>
            <p className="text-xs text-nature-green-950 dark:text-emerald-100 leading-relaxed font-medium">
              {page.do_this.tier1}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-nature-sky-200 dark:border-sky-800/60 bg-nature-sky-50/90 dark:bg-sky-950/20 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-nature-sky-800 dark:text-nature-sky-400 font-bold block">
              {t('page.tier2_title')}
            </span>
            <p className="text-xs text-nature-sky-950 dark:text-sky-100 leading-relaxed font-medium">
              {page.do_this.tier2}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-nature-amber-200 dark:border-amber-800/60 bg-nature-amber-50/90 dark:bg-amber-950/20 space-y-1.5 shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-wider text-nature-amber-800 dark:text-nature-amber-400 font-bold block">
              {t('page.tier3_title')}
            </span>
            <p className="text-xs text-nature-amber-950 dark:text-amber-100 leading-relaxed font-medium">
              {page.do_this.tier3}
            </p>
          </div>
        </div>
      </section>

      {/* ── 08 Not For You ── */}
      {page.not_for_you && page.not_for_you.length > 0 && (
        <section className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2">
          <h4 className="font-bold text-xs font-mono text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            {t('page.sec_08_notyou')}
          </h4>
          <div className="flex flex-wrap gap-2">
            {page.not_for_you.map((item, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                ⊘ {item}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* ── 09 Red Flags ── */}
      {page.red_flags && page.red_flags.length > 0 && (
        <section className="space-y-2">
          <RedFlagAlert messages={page.red_flags} />
        </section>
      )}

      {/* ── 10 Self-check Interactive Quiz ── */}
      <section>
        <SelfCheckQuiz items={page.quiz_items} pageTitle={language === 'zh-TW' ? page.title_zh : page.title_en} />
      </section>

      {/* ── Previous & Next Page Navigation Cards ── */}
      <nav aria-label="前後頁導航" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {prevPageId ? (
          <button
            onClick={() => onNavigatePage(prevPageId)}
            className="btn-tactile p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-nature-sky-400 dark:hover:border-nature-sky-600 text-left transition-all shadow-sm hover:shadow-md flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-nature-sky-600 dark:group-hover:text-nature-sky-400 transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">上一篇 · Previous</span>
              <strong className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                {prevPageId}
              </strong>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextPageId && (
          <button
            onClick={() => onNavigatePage(nextPageId)}
            className="btn-tactile p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-nature-amber-400 dark:hover:border-nature-amber-600 text-right transition-all shadow-sm hover:shadow-md flex items-center justify-end gap-3 group"
          >
            <div>
              <span className="text-[10px] font-mono text-slate-400 block uppercase">下一篇 · Next</span>
              <strong className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                {nextPageId}
              </strong>
            </div>
            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:text-nature-amber-600 dark:group-hover:text-nature-amber-400 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>
        )}
      </nav>

      {/* ── 11 Evidence Freshness & Governance Footer ── */}
      <footer className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 space-y-3 font-mono text-[11px] text-slate-600 dark:text-slate-400">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
          <span className="font-bold text-slate-800 dark:text-slate-300">{t('page.sec_11_gov')}</span>
          <span className="text-nature-green-700 dark:text-nature-green-400 font-semibold">
            {t('page.freshness')}：{page.evidence_freshness}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-slate-500 block">{t('page.last_reviewed')}：</span>
            <span className="text-slate-800 dark:text-slate-300 font-bold">{page.last_reviewed}</span>
          </div>
          <div>
            <span className="text-slate-500 block">{t('page.next_review')}：</span>
            <span className="text-slate-800 dark:text-slate-300">{page.next_review}</span>
          </div>
          <div>
            <span className="text-slate-500 block">{t('page.reviewed_by')}：</span>
            <span className="text-nature-amber-700 dark:text-nature-amber-400 font-bold">{page.reviewed_by.join(', ')}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 leading-relaxed">
          {t('page.disclaimer')}
        </div>
      </footer>
    </article>
  );
};
