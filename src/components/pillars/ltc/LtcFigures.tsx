import React from 'react';
import { LTC3_TIMELINE } from '../../../data/ltcData';

/**
 * LtcFigures — bespoke figures for the long-term-care zone. Charts draw with the
 * --viz-* tokens so they follow every colour theme; layouts that must reflow on a
 * phone (timelines, ranges) are HTML rather than fixed-size SVG.
 */

// ── 圖：三種失能軌跡（Lunney 2003）──────────────────────────────────────────

const TRAJ = [
  { key: 'sudden', label: '突發型（中風、髖骨骨折）', color: 'var(--viz-series-2)', d: 'M40,40 L260,42 L262,150 C300,140 340,128 380,124 L520,128' },
  { key: 'step', label: '階梯型（心衰竭、慢性肺病反覆住院）', color: 'var(--viz-series-1)', d: 'M40,40 L140,46 L148,80 C170,70 190,66 210,70 L300,82 L308,122 C330,112 350,110 370,116 L450,128 L458,176 L520,190' },
  { key: 'dwindle', label: '緩慢衰退型（衰弱、失智）', color: 'var(--viz-series-3)', d: 'M40,70 C150,90 260,118 360,148 C430,168 480,182 520,196' },
];

export const TrajectoryFigure: React.FC = () => (
  <div className="space-y-3">
    <svg viewBox="0 0 560 240" className="w-full h-auto" role="img" aria-label="三種失能軌跡：突發型、階梯型與緩慢衰退型，功能隨時間下降的方式不同">
      <rect x="0" y="0" width="560" height="240" rx="12" fill="var(--viz-surface)" />
      {[40, 90, 140, 190].map((y) => (
        <line key={y} x1="40" x2="530" y1={y} y2={y} stroke="var(--viz-grid)" strokeWidth="1" />
      ))}
      <line x1="40" x2="530" y1="210" y2="210" stroke="var(--viz-baseline)" strokeWidth="1.5" />
      <line x1="40" x2="40" y1="24" y2="210" stroke="var(--viz-baseline)" strokeWidth="1.5" />
      <text x="46" y="34" fontSize="11" fill="var(--viz-ink-2)">功能高（獨立）</text>
      <text x="46" y="204" fontSize="11" fill="var(--viz-ink-2)">功能低（完全依賴）</text>
      <text x="530" y="228" fontSize="11" textAnchor="end" fill="var(--viz-ink-2)">時間 →</text>
      {TRAJ.map((t) => (
        <path key={t.key} d={t.d} fill="none" stroke={t.color} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}
      <g fontSize="11" fill="var(--viz-ink)">
        <text x="268" y="166">事件發生</text>
        <text x="150" y="98">住院</text>
        <text x="310" y="140">住院</text>
      </g>
    </svg>
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-[12.5px] text-slate-700 dark:text-slate-300">
      {TRAJ.map((t) => (
        <li key={t.key} className="inline-flex items-center gap-1.5">
          <span className="w-5 h-1.5 rounded-full" style={{ background: t.color }} aria-hidden="true" />
          {t.label}
        </li>
      ))}
    </ul>
  </div>
);

// ── 圖：照顧光譜 ──────────────────────────────────────────────────────────────

const SPECTRUM = [
  { stage: '健康／亞健康', cms: '—', svc: '運動、營養、ICOPE 功能評估、社區據點共餐', tone: 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-300 dark:border-emerald-800' },
  { stage: '衰弱', cms: '1 級', svc: '預防延緩失能課程、巷弄長照站、居家復能', tone: 'bg-teal-100 dark:bg-teal-950/50 border-teal-300 dark:border-teal-800' },
  { stage: '輕中度失能', cms: '2–4 級', svc: '居家服務、日照、家托、輔具與無障礙、喘息', tone: 'bg-sky-100 dark:bg-sky-950/50 border-sky-300 dark:border-sky-800' },
  { stage: '中重度失能', cms: '5–6 級', svc: '居家服務＋日照或外看、交通接送、專業服務', tone: 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-800' },
  { stage: '重度／臥床', cms: '7–8 級', svc: '外看＋居家護理／醫療、住宿機構、居家安寧', tone: 'bg-rose-100 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800' },
];

export const CareSpectrumFigure: React.FC = () => (
  <ol className="grid gap-2 sm:grid-cols-5" aria-label="從健康到重度失能的照顧光譜">
    {SPECTRUM.map((s, i) => (
      <li key={s.stage} className={`relative rounded-xl border p-3 space-y-1 ${s.tone}`}>
        <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400">階段 {i + 1} · 長照 {s.cms}</p>
        <p className="text-[14px] font-bold text-slate-900 dark:text-white">{s.stage}</p>
        <p className="text-[12.5px] leading-snug text-slate-700 dark:text-slate-300">{s.svc}</p>
      </li>
    ))}
  </ol>
);

// ── 圖：長照 3.0 時間軸 ─────────────────────────────────────────────────────

export const Ltc3TimelineFigure: React.FC = () => (
  <ol className="relative border-l-2 border-teal-300 dark:border-teal-800 ml-2 space-y-4">
    {LTC3_TIMELINE.map((t) => (
      <li key={t.date} className="ml-4">
        <span className="absolute -left-[7px] mt-1.5 w-3 h-3 rounded-full bg-teal-500 ring-4 ring-white dark:ring-slate-900" aria-hidden="true" />
        <p className="text-[12px] font-bold tabular-nums text-teal-700 dark:text-teal-300">{t.date}</p>
        <p className="text-[14px] font-bold text-slate-900 dark:text-white">{t.title}</p>
        <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-300">{t.detail}</p>
      </li>
    ))}
  </ol>
);

// ── 圖：每月自付費用區間比較 ───────────────────────────────────────────────

const COST_RANGES = [
  { name: '家人＋長照居家服務', lo: 0.2, hi: 0.6, note: '依用量，一般戶自付 16%' },
  { name: '日照中心＋家人', lo: 0.3, hi: 0.9, note: '含餐費與交通自付' },
  { name: '外籍家庭看護工', lo: 2.3, hi: 2.7, note: '薪資＋就安費＋健保＋加班' },
  { name: '住宿式機構（補助後）', lo: 1.5, hi: 4.5, note: '月費 3–6 萬 − 每月 1.5 萬補助（4 級以上）' },
  { name: '住宿式機構（未補助）', lo: 3, hi: 6, note: '不含耗材、尿布與就醫交通' },
  { name: '本國 24 小時看護', lo: 8.4, hi: 10.5, note: '約 2,800–3,500 元／日' },
];
const COST_MAX = 11;

export const CostRangeChart: React.FC = () => (
  <div className="space-y-2.5" role="img" aria-label="各種照顧安排的每月自付費用區間比較，單位萬元">
    {COST_RANGES.map((r) => (
      <div key={r.name} className="grid grid-cols-[minmax(0,9.5rem)_1fr] sm:grid-cols-[12rem_1fr] gap-2 items-center">
        <p className="text-[12.5px] font-semibold leading-snug text-slate-800 dark:text-slate-100">{r.name}</p>
        <div className="space-y-0.5">
          <div className="relative h-4 rounded-full bg-slate-100 dark:bg-slate-800">
            <div
              className="absolute top-0 h-4 rounded-full"
              style={{ left: `${(r.lo / COST_MAX) * 100}%`, width: `${Math.max(((r.hi - r.lo) / COST_MAX) * 100, 1.5)}%`, background: 'var(--viz-series-1)' }}
            />
          </div>
          <p className="text-[11.5px] text-slate-500 dark:text-slate-400 tabular-nums">
            約 {r.lo}–{r.hi} 萬元／月 · {r.note}
          </p>
        </div>
      </div>
    ))}
    <div className="grid grid-cols-[minmax(0,9.5rem)_1fr] sm:grid-cols-[12rem_1fr] gap-2" aria-hidden="true">
      <span />
      <div className="flex justify-between text-[10.5px] text-slate-500 dark:text-slate-400 tabular-nums">
        {[0, 2, 4, 6, 8, 10].map((v) => (
          <span key={v}>{v} 萬</span>
        ))}
      </div>
    </div>
  </div>
);

// ── 圖：ADL 依賴的常見順序 ─────────────────────────────────────────────────

const ADL_ORDER = ['洗澡', '穿衣', '如廁', '移位', '大小便控制', '進食'];

export const AdlOrderFigure: React.FC = () => (
  <div className="space-y-2">
    <div className="flex flex-wrap items-center gap-1.5 text-[13px]">
      {ADL_ORDER.map((a, i) => (
        <React.Fragment key={a}>
          <span
            className="rounded-lg px-2.5 py-1.5 font-semibold text-white"
            style={{ background: `color-mix(in srgb, var(--viz-series-2) ${100 - i * 12}%, var(--viz-series-1))` }}
          >
            {a}
          </span>
          {i < ADL_ORDER.length - 1 && <span className="text-slate-400" aria-hidden="true">→</span>}
        </React.Fragment>
      ))}
    </div>
    <p className="text-[12.5px] text-slate-600 dark:text-slate-400">失能常「最先失去洗澡，最後失去進食」（Katz 階層）；復能訓練則常反向，從進食、移位開始找回。</p>
  </div>
);
