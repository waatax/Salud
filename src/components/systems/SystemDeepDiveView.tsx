import React, { useState } from 'react';
import { SystemDeepDive, DeepCondition, DeepKnowledgePoint, DeepProtocol, SystemChartItem } from '../../types/systemDeepDive';
import { HumanSystem } from '../../types';
import { SystemDiagram } from './SystemDiagram';
import { SystemSchematicFigure } from './SystemSchematicFigure';
import {
  BookOpen,
  Stethoscope,
  ShieldPlus,
  AlertOctagon,
  ChevronDown,
  ChevronRight,
  Activity,
  Search,
  Pill,
  HeartHandshake,
  CalendarClock,
  BarChart3,
  Layers,
  Sparkles,
} from 'lucide-react';

/**
 * SystemDeepDiveView — renders a body system as the journey a reader actually takes:
 * what it is → how it works → charts & diagrams → what goes wrong → what to do → when to get help.
 *
 * Every teaching point and every condition carries a diagram, which is why the section
 * components below can assume `diagram` is present rather than guarding for it.
 */

type SectionId = 'overview' | 'how' | 'charts' | 'conditions' | 'prevent' | 'flags';

const SECTIONS: { id: SectionId; label_zh: string; icon: React.ElementType }[] = [
  { id: 'overview', label_zh: '系統總覽', icon: BookOpen },
  { id: 'how', label_zh: '運作原理', icon: Activity },
  { id: 'charts', label_zh: '圖示與圖表', icon: BarChart3 },
  { id: 'conditions', label_zh: '常見疾病', icon: Stethoscope },
  { id: 'prevent', label_zh: '預防與改善', icon: ShieldPlus },
  { id: 'flags', label_zh: '危險警訊', icon: AlertOctagon },
];

const GRADE_STYLE: Record<string, string> = {
  A: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
  B: 'bg-sky-100 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800',
  C: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
  D: 'bg-orange-100 text-orange-800 border-orange-300 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800',
  E: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800',
};

const GRADE_TITLE: Record<string, string> = {
  A: 'A 級：系統性回顧、大型隨機對照試驗或國際指引',
  B: 'B 級：單一隨機對照試驗或高品質世代研究',
  C: 'C 級：小型或觀察性研究',
  D: 'D 級：主要為機轉推論',
  E: 'E 級：專家意見，尚待驗證',
};

const GradeBadge: React.FC<{ grade: string }> = ({ grade }) => (
  <span
    title={GRADE_TITLE[grade]}
    className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border shrink-0 ${GRADE_STYLE[grade]}`}
  >
    證據 {grade}
  </span>
);

const Bullets: React.FC<{ items: string[]; tone?: string; icon?: string }> = ({
  items,
  tone = 'text-slate-700 dark:text-slate-300',
  icon = '·',
}) => (
  <ul className="space-y-1.5">
    {items.map((it, i) => (
      <li key={i} className={`flex gap-2 text-xs sm:text-sm leading-relaxed ${tone}`}>
        <span className="text-emerald-500 shrink-0 font-bold">{icon}</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

// ── How it works: one expandable card per teaching point ──────────────────────
const KnowledgePointCard: React.FC<{ kp: DeepKnowledgePoint; index: number }> = ({ kp, index }) => {
  const [open, setOpen] = useState(index === 0);
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left"
      >
        <span className="flex items-start gap-3 min-w-0">
          <span className="mt-0.5 w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <span className="min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {kp.question_zh}
            </h3>
            {!open && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {kp.answer_zh}
              </p>
            )}
          </span>
        </span>
        <span className="flex items-center gap-2 shrink-0">
          <GradeBadge grade={kp.grade} />
          {open ? (
            <ChevronDown className="w-4 h-4 text-slate-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400" />
          )}
        </span>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-4 border-t border-slate-200 dark:border-slate-800 pt-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{kp.answer_zh}</p>
          <SystemDiagram diagram={kp.diagram} />
          {kp.detail_zh && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                想知道更多
              </span>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {kp.detail_zh}
              </p>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

// ── Conditions: the full arc for one disease ──────────────────────────────────
const Block: React.FC<{ title: string; icon: React.ElementType; children: React.ReactNode; accent?: string }> = ({
  title,
  icon: Icon,
  children,
  accent = 'text-emerald-600 dark:text-emerald-400',
}) => (
  <div className="space-y-2">
    <h4 className={`flex items-center gap-1.5 text-xs font-bold font-mono ${accent}`}>
      <Icon className="w-3.5 h-3.5" />
      {title}
    </h4>
    {children}
  </div>
);

const ConditionCard: React.FC<{ c: DeepCondition }> = ({ c }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full p-4 sm:p-5 text-left space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-slate-100">
              {c.name_zh}
            </h3>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">{c.name_en}</span>
          </div>
          {open ? (
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          ) : (
            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
          )}
        </div>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">{c.what_zh}</p>
        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-500 border-l-2 border-slate-200 dark:border-slate-700 pl-2.5">
          {c.prevalence_zh}
        </p>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-5 border-t border-slate-200 dark:border-slate-800 pt-5">
          <SystemDiagram diagram={c.diagram} />

          <Block title="為什麼會這樣（機轉）" icon={Activity}>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {c.mechanism_zh}
            </p>
          </Block>

          <div className="grid gap-5 sm:grid-cols-2">
            <Block title="早期症狀" icon={Search} accent="text-amber-600 dark:text-amber-400">
              <Bullets items={c.symptoms_early_zh} />
            </Block>
            <Block title="惡化時的表現" icon={Search} accent="text-rose-600 dark:text-rose-400">
              <Bullets items={c.symptoms_progressive_zh} />
            </Block>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Block title="風險因子" icon={AlertOctagon} accent="text-slate-500 dark:text-slate-400">
              <Bullets items={c.risk_factors_zh} tone="text-slate-600 dark:text-slate-400" />
            </Block>
            <Block title="你可以改變的部分" icon={ShieldPlus}>
              <Bullets items={c.modifiable_zh} icon="✓" />
            </Block>
          </div>

          <Block title="怎麼診斷" icon={Stethoscope} accent="text-sky-600 dark:text-sky-400">
            <div className="space-y-2">
              {c.diagnosis_zh.map((d, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-sky-200/70 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 p-3"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{d.name_zh}</span>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 mt-1">{d.what_zh}</p>
                  {d.threshold_zh && (
                    <p className="text-[11px] font-mono text-sky-700 dark:text-sky-300 mt-1.5">
                      判讀：{d.threshold_zh}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Block>

          <Block title="自我照護：你現在就能做的" icon={HeartHandshake}>
            <Bullets items={c.self_care_zh} icon="✓" />
          </Block>

          <Block title="醫療處置選項" icon={Pill} accent="text-purple-600 dark:text-purple-400">
            <div className="space-y-2.5">
              {c.treatment_zh.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-purple-200/70 dark:border-purple-900/50 bg-purple-50/40 dark:bg-purple-950/20 p-3"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{t.tier_zh}</span>
                  <div className="flex flex-wrap gap-1.5 my-2">
                    {t.options_zh.map((o, j) => (
                      <span
                        key={j}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900 text-slate-700 dark:text-slate-300"
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{t.note_zh}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-2 leading-relaxed">
              以上為治療選項的衛教說明，實際用藥與處置需由醫師依你的狀況決定。
            </p>
          </Block>

          <Block title="什麼時候該看醫生" icon={CalendarClock} accent="text-rose-600 dark:text-rose-400">
            <Bullets items={c.see_doctor_zh} tone="text-rose-800 dark:text-rose-300" icon="→" />
          </Block>
        </div>
      )}
    </article>
  );
};

// ── Protocols ─────────────────────────────────────────────────────────────────
const ProtocolCard: React.FC<{ p: DeepProtocol }> = ({ p }) => {
  const [open, setOpen] = useState(false);
  return (
    <article className="rounded-2xl border border-emerald-200/70 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/15 overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full p-4 sm:p-5 text-left space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-slate-100">{p.title_zh}</h3>
          <span className="flex items-center gap-2 shrink-0">
            <GradeBadge grade={p.grade} />
            {open ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <span className="font-bold text-emerald-700 dark:text-emerald-300">目標：</span>
          {p.goal_zh}
        </p>
      </button>

      {open && (
        <div className="px-4 sm:px-5 pb-5 space-y-4 border-t border-emerald-200/70 dark:border-emerald-900/50 pt-4">
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{p.why_zh}</p>
          <SystemDiagram diagram={p.diagram} />
          <Block title="怎麼做" icon={ShieldPlus}>
            <ol className="space-y-2">
              {p.steps_zh.map((s, i) => (
                <li key={i} className="flex gap-2.5 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <span className="w-5 h-5 rounded-md bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </Block>
          <div className="rounded-xl bg-white dark:bg-slate-900/60 border border-emerald-200 dark:border-emerald-900 p-3">
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 block mb-1">
              劑量與頻率
            </span>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{p.dose_zh}</p>
          </div>
        </div>
      )}
    </article>
  );
};

const URGENCY_STYLE: Record<string, { label: string; cls: string }> = {
  EMERGENT: {
    label: '立即急診',
    cls: 'border-red-300 dark:border-red-900 bg-red-50/70 dark:bg-red-950/25',
  },
  URGENT: {
    label: '盡速就醫',
    cls: 'border-orange-300 dark:border-orange-900 bg-orange-50/70 dark:bg-orange-950/25',
  },
  SOON: {
    label: '安排門診',
    cls: 'border-amber-300 dark:border-amber-900 bg-amber-50/60 dark:bg-amber-950/20',
  },
};

// ── Chart & Diagram Cards ───────────────────────────────────────────────────
const ChartItemCard: React.FC<{ chart: SystemChartItem; index: number }> = ({ chart, index }) => {
  return (
    <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 p-4 sm:p-6 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 font-mono text-xs font-bold flex items-center justify-center shrink-0">
            {index + 1}
          </span>
          <div>
            <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-slate-100">
              {chart.title_zh}
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {chart.category === 'illustration' ? '核心解剖與機制圖示' : '臨床量化數據與診斷圖表'}
            </span>
          </div>
        </div>
        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          {chart.kind_badge_zh}
        </span>
      </div>

      <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {chart.summary_zh}
      </p>

      {/* Render the Diagram */}
      <div className="py-2">
        <SystemDiagram diagram={chart.diagram} />
      </div>

      {/* Clinical / Practical Takeaway */}
      <div className="rounded-xl border border-emerald-200/80 dark:border-emerald-800/40 bg-emerald-50/70 dark:bg-emerald-950/30 p-3.5 space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-800 dark:text-emerald-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>臨床解讀與日常應用指針</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          {chart.clinical_takeaway_zh}
        </p>
      </div>
    </article>
  );
};

export const SystemDeepDiveView: React.FC<{
  data: SystemDeepDive;
  systemMeta?: HumanSystem;
}> = ({ data, systemMeta }) => {
  const [section, setSection] = useState<SectionId>('overview');
  const [chartFilter, setChartFilter] = useState<'all' | 'illustration' | 'chart'>('all');

  const chartList = data.charts || [];
  const filteredCharts = chartList.filter((c) => {
    if (chartFilter === 'illustration') return c.category === 'illustration';
    if (chartFilter === 'chart') return c.category === 'chart';
    return true;
  });

  const counts: Record<SectionId, number> = {
    overview: data.numbers.length,
    how: data.how_it_works.length,
    charts: chartList.length,
    conditions: data.conditions.length,
    prevent: data.protocols.length,
    flags: data.red_flags.length,
  };

  return (
    <div className="space-y-6">
      {/* Section tabs */}
      <nav className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const active = section === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-mono border transition-all ${
                active
                  ? 'bg-emerald-600 text-white font-bold border-emerald-700 shadow-emerald-glow'
                  : 'bg-white dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{s.label_zh}</span>
              <span
                className={`text-[10px] px-1.5 rounded-full ${
                  active ? 'bg-white/25' : 'bg-slate-100 dark:bg-slate-800'
                }`}
              >
                {counts[s.id]}
              </span>
            </button>
          );
        })}
      </nav>

      {section === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          <p className="text-sm sm:text-base leading-loose text-slate-700 dark:text-slate-300 max-w-4xl">
            {data.plain_intro_zh}
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {data.numbers.map((n, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40"
              >
                <div className="text-lg font-mono font-extrabold text-emerald-700 dark:text-emerald-400">
                  {n.value}
                </div>
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-0.5">{n.label_zh}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {n.note_zh}
                </div>
              </div>
            ))}
          </div>

          {/* Visual Vector Organ Schematic Figure */}
          {systemMeta && (
            <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: systemMeta.theme_color }}
                  />
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                    {systemMeta.name_zh} 視覺解剖圖譜
                  </h3>
                  <span className="text-xs font-mono text-slate-400">({systemMeta.name_en})</span>
                </div>
                <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {systemMeta.major_organs.length} 大核心器官
                </span>
              </div>
              <SystemSchematicFigure system={systemMeta} />
              <div className="space-y-1 pt-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  主要解剖結構 (Major Anatomical Organs)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {systemMeta.major_organs.map((org, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      {org.name_zh.split(' ')[0]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-display font-bold text-slate-800 dark:text-slate-100 mb-3">
              構造：由外而內
            </h3>
            <SystemDiagram diagram={data.anatomy} />
          </div>
        </div>
      )}

      {section === 'how' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            每一題都附一張圖解。點開標題展開完整說明。
          </p>
          {data.how_it_works.map((kp, i) => (
            <KnowledgePointCard key={kp.id} kp={kp} index={i} />
          ))}
        </div>
      )}

      {section === 'charts' && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/70 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              為本系統量身打造的生理機制因果圖示 (Illustrations) 與臨床監測數據圖表 (Charts)，協助化繁為簡、直觀掌握核心概念。
            </p>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shrink-0">
              <button
                onClick={() => setChartFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  chartFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                全部 ({chartList.length})
              </button>
              <button
                onClick={() => setChartFilter('illustration')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  chartFilter === 'illustration'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                核心圖示 ({chartList.filter((c) => c.category === 'illustration').length})
              </button>
              <button
                onClick={() => setChartFilter('chart')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  chartFilter === 'chart'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                數據圖表 ({chartList.filter((c) => c.category === 'chart').length})
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredCharts.map((chart, i) => (
              <ChartItemCard key={chart.id} chart={chart} index={i} />
            ))}
          </div>
        </div>
      )}

      {section === 'conditions' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            每個疾病包含：機轉 · 早期與惡化症狀 · 風險因子 · 怎麼診斷 · 自我照護 · 醫療處置 · 何時就醫。
          </p>
          {data.conditions.map((c) => (
            <ConditionCard key={c.id} c={c} />
          ))}
        </div>
      )}

      {section === 'prevent' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            依實證強度排序的可執行方案，每項都標明具體劑量與頻率。
          </p>
          {data.protocols.map((p) => (
            <ProtocolCard key={p.id} p={p} />
          ))}
        </div>
      )}

      {section === 'flags' && (
        <div className="space-y-3 animate-fade-in">
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            出現以下情形時，不要在家觀察或上網自我診斷。
          </p>
          {data.red_flags.map((f, i) => {
            const u = URGENCY_STYLE[f.urgency];
            return (
              <div key={i} className={`p-4 rounded-2xl border ${u.cls}`}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {f.sign_zh}
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-current text-red-700 dark:text-red-300 shrink-0">
                    {u.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{f.why_zh}</p>
                <p className="text-xs leading-relaxed text-slate-800 dark:text-slate-200 font-bold mt-1.5">
                  → {f.action_zh}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
