import React, { useState } from 'react';
import {
  AE_RATES,
  DOSE_STEPS,
  MAINTAIN_ARMS,
  S1_DOSE_RESPONSE,
  SURMOUNT4_PATH,
} from '../../../../data/tirzepatideData';
import { Choice, DataTable, DeepDive } from './chapterUi';

/**
 * Figures for the tirzepatide chapter. Colours come from the validated --viz-* tokens, so they follow
 * every theme. Text uses ink tokens, identity is never colour alone, and each chart has a table.
 */

const ink = 'var(--viz-ink)';
const ink2 = 'var(--viz-ink-2)';
const muted = 'var(--viz-muted)';
const grid = 'var(--viz-grid)';
const base = 'var(--viz-baseline)';
const blue = 'var(--viz-series-1)';
const orange = 'var(--viz-series-2)';
const green = 'var(--viz-series-3)';

/** Pictogram person, shared by the mechanism and injection-site figures. */
const Person: React.FC = () => (
  <g aria-hidden="true">
    <circle cx="100" cy="36" r="24" fill={grid} />
    <path d="M66 78 Q100 64 134 78 L142 196 Q100 212 58 196 Z" fill={grid} />
    <path d="M60 86 Q42 104 38 150 L32 204" fill="none" stroke={grid} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M140 86 Q158 104 162 150 L168 204" fill="none" stroke={grid} strokeWidth="17" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M80 200 L74 340" fill="none" stroke={grid} strokeWidth="27" strokeLinecap="round" />
    <path d="M120 200 L126 340" fill="none" stroke={grid} strokeWidth="27" strokeLinecap="round" />
  </g>
);

const Pin: React.FC<{ x: number; y: number; n: number | string; color?: string }> = ({ x, y, n, color = blue }) => (
  <g>
    <circle cx={x} cy={y} r="11" fill={color} stroke="var(--viz-surface)" strokeWidth="2" />
    <text x={x} y={y + 4.5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
      {n}
    </text>
  </g>
);

const MECHANISM = [
  { n: 1, organ: '大腦', tag: 'GLP-1＋GIP', plain: '比較不餓、比較容易飽，腦中一直想吃的念頭（食物雜音）變小。', x: 100, y: 34 },
  { n: 2, organ: '胃', tag: 'GLP-1 為主', plain: '排空變慢，飽足感延長。這也是噁心與脹氣的來源，影響在第一劑最大，之後會減弱。', x: 88, y: 112 },
  { n: 3, organ: '胰臟', tag: 'GLP-1＋GIP', plain: '血糖高時才促進胰島素分泌，並減少升糖素，所以單獨使用時低血糖不常見。', x: 116, y: 136 },
  { n: 4, organ: '脂肪組織', tag: 'GIP（研究中）', plain: '可能改善脂肪組織處理能量的能力，對人體減重的貢獻仍在研究。', x: 92, y: 172 },
];

export const MechanismFigure: React.FC = () => (
  <figure className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
    <svg viewBox="0 0 200 360" role="img" aria-label="人形示意圖，標出藥物作用的四個部位：大腦、胃、胰臟與脂肪組織" className="mx-auto h-64 w-auto sm:h-80">
      <Person />
      {MECHANISM.map((m) => (
        <Pin key={m.n} x={m.x} y={m.y} n={m.n} />
      ))}
    </svg>
    <figcaption>
      <ol className="space-y-2.5">
        {MECHANISM.map((m) => (
          <li key={m.n} className="flex gap-2.5">
            <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ background: blue }} aria-hidden="true">
              {m.n}
            </span>
            <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              <strong className="text-slate-900 dark:text-white">{m.organ}</strong>
              <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{m.tag}</span>
              <div>{m.plain}</div>
            </div>
          </li>
        ))}
      </ol>
    </figcaption>
  </figure>
);

/** 6-step staircase. Each step is a real button; bar height encodes dose. */
export const DoseLadder: React.FC = () => {
  const [mg, setMg] = useState(5);
  const step = DOSE_STEPS.find((d) => d.mg === mg) ?? DOSE_STEPS[1];
  let week = 1;
  const rows = DOSE_STEPS.map((d) => {
    const from = week;
    week += d.minWeeks;
    return { ...d, from };
  });
  return (
    <figure className="space-y-3">
      <div className="grid grid-cols-6 items-end gap-1 sm:gap-2" role="group" aria-label="劑量階梯，選擇一階查看說明">
        {rows.map((d) => {
          const on = d.mg === mg;
          return (
            <button
              key={d.mg}
              type="button"
              onClick={() => setMg(d.mg)}
              aria-pressed={on}
              className="group flex flex-col items-stretch gap-1 rounded-lg text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              <span className={`text-sm font-bold tabular-nums sm:text-base ${on ? 'text-emerald-800 dark:text-emerald-300' : 'text-slate-800 dark:text-slate-200'}`}>{d.mg}</span>
              <span
                className={`block rounded-t border-2 transition-colors ${on ? 'border-emerald-800 dark:border-emerald-300' : 'border-transparent group-hover:border-emerald-500'}`}
                style={{
                  height: `${28 + d.mg * 8}px`,
                  background: d.isMaintenance ? green : 'transparent',
                  outline: d.isMaintenance ? 'none' : `2px dashed ${muted}`,
                  outlineOffset: '-2px',
                }}
                aria-hidden="true"
              />
              <span className="text-xs leading-tight text-slate-600 dark:text-slate-400">{d.role}</span>
              <span className="text-xs tabular-nums leading-tight text-slate-500 dark:text-slate-500">{d.mg === 15 ? `第 ${d.from} 週起` : `最快第 ${d.from} 週`}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-sm" style={{ background: green }} aria-hidden="true" />核准的維持劑量（5、10、15 mg）</span>
        <span className="inline-flex items-center gap-1.5"><span className="inline-block h-3 w-3 rounded-sm" style={{ outline: `2px dashed ${muted}`, outlineOffset: '-2px' }} aria-hidden="true" />起始或過渡劑量</span>
        <span>單位：mg／每週一次</span>
      </div>
      <figcaption className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3 text-sm leading-relaxed text-slate-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-slate-200" aria-live="polite">
        <strong>{step.mg} mg：</strong>
        {step.note}
      </figcaption>
    </figure>
  );
};

const RESPONSE_METRICS = [
  { key: 'pct', label: '平均減重', unit: '%', suffix: '體重下降' },
  { key: 'over5', label: '減 ≥5%', unit: '%', suffix: '的人做到' },
  { key: 'over10', label: '減 ≥10%', unit: '%', suffix: '的人做到' },
  { key: 'over15', label: '減 ≥15%', unit: '%', suffix: '的人做到' },
  { key: 'over20', label: '減 ≥20%', unit: '%', suffix: '的人做到' },
] as const;

type MetricKey = (typeof RESPONSE_METRICS)[number]['key'];

/** Single-series magnitude bars; placebo is drawn in neutral so the drug arms carry the colour. */
export const DoseResponseChart: React.FC = () => {
  const [metric, setMetric] = useState<MetricKey>('pct');
  const def = RESPONSE_METRICS.find((m) => m.key === metric)!;
  const max = metric === 'pct' ? 25 : 100;
  return (
    <figure className="space-y-3">
      <Choice<MetricKey>
        legend="想看哪個指標？"
        options={RESPONSE_METRICS.map((m) => ({ value: m.key, label: m.label }))}
        value={metric}
        onChange={setMetric}
        columns={3}
      />
      <div className="space-y-2" role="img" aria-label={`SURMOUNT-1 第 72 週，${def.label}：${S1_DOSE_RESPONSE.map((d) => `${d.arm} ${d[metric]}%`).join('、')}`}>
        {S1_DOSE_RESPONSE.map((d) => {
          const v = d[metric];
          return (
            <div key={d.arm} className="grid grid-cols-[56px_1fr_72px] items-center gap-2" title={`${d.arm}：${v}% ${def.suffix}`}>
              <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{d.arm}</span>
              <span className="block h-5 overflow-hidden rounded-r" style={{ background: 'color-mix(in srgb, var(--viz-grid) 45%, transparent)' }}>
                <span className="block h-full rounded-r transition-[width] duration-300" style={{ width: `${(v / max) * 100}%`, background: d.arm === '安慰劑' ? muted : blue }} />
              </span>
              <span className="text-right text-sm font-semibold tabular-nums text-slate-900 dark:text-white">{v.toFixed(1)}%</span>
            </div>
          );
        })}
      </div>
      <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        SURMOUNT-1，第 72 週，無糖尿病、平均 BMI 38、平均體重約 105 公斤；所有受試者都接受飲食與運動諮詢。數字為群體平均，個人差異很大。
      </figcaption>
    </figure>
  );
};

/** Week 0/36/88 means from SURMOUNT-4. Only reported time points are joined. */
export const WithdrawalChart: React.FC = () => {
  const [hover, setHover] = useState<number | null>(null);
  const W = 380;
  const H = 270;
  const m = { l: 40, r: 92, t: 18, b: 32 };
  const x = (w: number) => m.l + (w / 88) * (W - m.l - m.r);
  const y = (v: number) => m.t + (-v / 30) * (H - m.t - m.b);
  const line = (key: 'continued' | 'withdrawn') => SURMOUNT4_PATH.map((p) => `${x(p.week)},${y(p[key])}`).join(' ');
  const end = SURMOUNT4_PATH[SURMOUNT4_PATH.length - 1];
  return (
    <figure className="space-y-2">
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
        <span className="inline-flex items-center gap-1.5"><span className="inline-block h-0.5 w-5" style={{ background: blue }} aria-hidden="true" />繼續用藥</span>
        <span className="inline-flex items-center gap-1.5"><span className="inline-block h-0.5 w-5" style={{ background: orange }} aria-hidden="true" />第 36 週改安慰劑</span>
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="SURMOUNT-4：前 36 週平均減重 20.9%。第 88 週，繼續用藥組累計減 25.3%，改安慰劑組累計減 9.9%。"
        onMouseLeave={() => setHover(null)}
      >
        {[0, -10, -20, -30].map((t) => (
          <g key={t}>
            <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke={t === 0 ? base : grid} strokeWidth="1" />
            <text x={m.l - 7} y={y(t) + 4} textAnchor="end" fontSize="13" fill={muted}>{t}%</text>
          </g>
        ))}
        {SURMOUNT4_PATH.map((p) => (
          <text key={p.week} x={x(p.week)} y={H - 9} textAnchor="middle" fontSize="13" fill={muted}>第 {p.week} 週</text>
        ))}
        <line x1={x(36)} x2={x(36)} y1={m.t} y2={H - m.b} stroke={base} strokeWidth="1" />
        <text x={x(36) + 6} y={m.t + 10} fontSize="13" fill={ink2}>隨機分組</text>
        <polyline points={line('withdrawn')} fill="none" stroke={orange} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <polyline points={line('continued')} fill="none" stroke={blue} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx={x(end.week)} cy={y(end.withdrawn)} r="5" fill={orange} stroke="var(--viz-surface)" strokeWidth="2" />
        <circle cx={x(end.week)} cy={y(end.continued)} r="5" fill={blue} stroke="var(--viz-surface)" strokeWidth="2" />
        <circle cx={x(36)} cy={y(-20.9)} r="5" fill={ink2} stroke="var(--viz-surface)" strokeWidth="2" />
        <text x={x(end.week) + 9} y={y(end.continued) + 5} fontSize="14" fontWeight="700" fill={ink}>繼續 −25.3%</text>
        <text x={x(end.week) + 9} y={y(end.withdrawn) + 5} fontSize="14" fontWeight="700" fill={ink}>停藥 −9.9%</text>
        <text x={x(36) - 8} y={y(-20.9) - 10} textAnchor="end" fontSize="14" fontWeight="700" fill={ink}>−20.9%</text>
        {SURMOUNT4_PATH.map((p) => (
          <rect
            key={p.week}
            x={x(p.week) - 26}
            y={m.t}
            width="52"
            height={H - m.t - m.b}
            fill="transparent"
            tabIndex={0}
            aria-label={`第 ${p.week} 週：繼續用藥 ${p.continued}%，停藥組 ${p.withdrawn}%`}
            onMouseEnter={() => setHover(p.week)}
            onFocus={() => setHover(p.week)}
            onBlur={() => setHover(null)}
          />
        ))}
        {hover !== null && hover > 0 && (() => {
          const p = SURMOUNT4_PATH.find((q) => q.week === hover)!;
          const left = Math.max(140, Math.min(x(p.week) + 8, W - 4));
          return (
            <g pointerEvents="none">
              <rect x={left - 130} y={H - m.b - 66} width="132" height="58" rx="6" fill="var(--viz-surface)" stroke={base} />
              <text x={left - 122} y={H - m.b - 47} fontSize="12" fontWeight="700" fill={ink}>第 {p.week} 週</text>
              <text x={left - 122} y={H - m.b - 31} fontSize="12" fill={ink2}>繼續 {p.continued}%</text>
              <text x={left - 122} y={H - m.b - 15} fontSize="12" fill={ink2}>停藥 {p.withdrawn}%</text>
            </g>
          );
        })()}
      </svg>
      <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        SURMOUNT-4 平均體重變化（相對第 0 週）。線條只連接試驗報告的時間點，不代表中間的走勢。受試者在第 36 週已達最高耐受劑量（10 或 15 mg）。
      </figcaption>
      <DeepDive title="看表格版本">
        <DataTable
          caption="SURMOUNT-4 三個時間點的平均體重變化"
          head={['時間點', '繼續用藥', '第 36 週改安慰劑']}
          align={['left', 'right', 'right']}
          rows={SURMOUNT4_PATH.map((p) => [`第 ${p.week} 週`, `${p.continued}%`, `${p.withdrawn}%`])}
        />
      </DeepDive>
    </figure>
  );
};

/** Three maintenance strategies at week 112. */
export const MaintainChart: React.FC = () => (
  <figure className="space-y-3">
    <div className="space-y-2.5">
      {MAINTAIN_ARMS.map((a, i) => (
        <div key={a.arm} title={`${a.arm}：第 112 週平均減 ${a.pct}%`}>
          <div className="mb-1 flex items-baseline justify-between gap-2 text-sm">
            <span className="font-medium text-slate-800 dark:text-slate-200">{a.arm}</span>
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">−{a.pct}%</span>
          </div>
          <span className="block h-5 overflow-hidden rounded-r" style={{ background: 'color-mix(in srgb, var(--viz-grid) 45%, transparent)' }}>
            <span className="block h-full rounded-r" style={{ width: `${(a.pct / 25) * 100}%`, background: i === 2 ? orange : i === 1 ? green : blue }} />
          </span>
        </div>
      ))}
    </div>
    <DataTable
      caption="SURMOUNT-MAINTAIN 三種維持策略的第 112 週結果"
      head={['策略', '平均減重', '仍減 ≥20%', '回升過半需救援']}
      align={['left', 'right', 'right', 'right']}
      rows={MAINTAIN_ARMS.map((a) => [a.short, `−${a.pct}%`, `${a.kept20}%`, `${a.rescue}%`])}
    />
    <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      SURMOUNT-MAINTAIN（Lancet 2026）：先用最高耐受劑量 60 週，再隨機分配 52 週。受試者平均 BMI 40，全部來自美國。研究報告尚未解答「哪些人適合減量」。
    </figcaption>
  </figure>
);

/** 75/25 share of weight lost. A proportion of a whole, so one stacked bar. */
export const LeanFatBar: React.FC = () => (
  <figure className="space-y-2">
    <div className="flex h-7 gap-0.5" role="img" aria-label="減掉的重量中，約 75% 為脂肪，25% 為去脂組織">
      <span className="grid place-items-center rounded-l text-sm font-bold text-white" style={{ width: '75%', background: blue }}>脂肪 75%</span>
      <span className="grid place-items-center rounded-r text-sm font-bold text-white" style={{ width: '25%', background: orange }}>去脂 25%</span>
    </div>
    <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      SURMOUNT-1 DXA 次研究（160 人，72 週）：脂肪量平均減 33.9%，去脂組織減 10.9%；安慰劑組的比例也差不多。去脂組織包含肌肉、水分與器官，不等於肌肉。
    </figcaption>
  </figure>
);

/** Dumbbell-style: placebo dot vs the 5–15 mg range on one axis. */
export const AeChart: React.FC = () => (
  <figure className="space-y-2">
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
      <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: muted }} aria-hidden="true" />安慰劑</span>
      <span className="inline-flex items-center gap-1.5"><span className="inline-block h-2 w-5 rounded-full" style={{ background: blue }} aria-hidden="true" />5–15 mg 的範圍</span>
    </div>
    <div className="space-y-1.5">
      {AE_RATES.map((a) => {
        const lo = Math.min(a.d5, a.d10, a.d15);
        const hi = Math.max(a.d5, a.d10, a.d15);
        const scale = (v: number) => `${(v / 35) * 100}%`;
        return (
          <div key={a.name} className="grid grid-cols-[92px_1fr_76px] items-center gap-2 text-sm" title={`${a.name}：安慰劑 ${a.placebo}%；5 mg ${a.d5}%、10 mg ${a.d10}%、15 mg ${a.d15}%`}>
            <span className="text-slate-800 dark:text-slate-200">{a.name}</span>
            <span className="relative block h-3 rounded-full" style={{ background: 'color-mix(in srgb, var(--viz-grid) 45%, transparent)' }} aria-hidden="true">
              <span className="absolute top-0 h-3 rounded-full" style={{ left: scale(lo), width: `max(10px, ${scale(hi - lo)})`, background: blue }} />
              <span className="absolute top-0 h-3 w-3 -translate-x-1/2 rounded-full ring-2 ring-[color:var(--viz-surface)]" style={{ left: scale(a.placebo), background: muted }} />
            </span>
            <span className="text-right text-xs tabular-nums text-slate-700 dark:text-slate-300">{lo === hi ? `${lo}%` : `${lo}–${hi}%`}</span>
          </div>
        );
      })}
    </div>
    <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
      兩個試驗合併（美國仿單表 1）。整體腸胃不適約 56%（安慰劑 30%），但因腸胃不適停藥只有 1.9–4.3%（安慰劑 0.5%）。多數噁心、嘔吐、腹瀉發生在升劑量期並隨時間減少。
    </figcaption>
    <DeepDive title="看各劑量的完整數字">
      <DataTable
        caption="常見副作用發生率"
        head={['副作用', '安慰劑', '5 mg', '10 mg', '15 mg']}
        align={['left', 'right', 'right', 'right', 'right']}
        rows={AE_RATES.map((a) => [a.name, `${a.placebo}%`, `${a.d5}%`, `${a.d10}%`, `${a.d15}%`])}
      />
    </DeepDive>
  </figure>
);

const SITES = [
  { id: 'A', label: '腹部', body: '離肚臍至少 5 公分。自己打最方便。', x: 100, y: 164 },
  { id: 'B', label: '大腿前側', body: '大腿中段的前方與外側，可自己打。', x: 76, y: 262 },
  { id: 'C', label: '上臂後側', body: '自己不好打，請家人或醫護協助。', x: 40, y: 138 },
];

export const InjectionSites: React.FC = () => (
  <figure className="grid items-center gap-4 sm:grid-cols-[170px_1fr]">
    <svg viewBox="0 0 200 360" role="img" aria-label="注射部位示意圖：A 腹部、B 大腿前側、C 上臂後側" className="mx-auto h-60 w-auto sm:h-72">
      <Person />
      <ellipse cx="100" cy="164" rx="32" ry="24" fill={green} opacity="0.35" />
      <circle cx="100" cy="164" r="6" fill="var(--viz-surface)" />
      <ellipse cx="76" cy="262" rx="13" ry="36" fill={green} opacity="0.35" />
      <ellipse cx="124" cy="262" rx="13" ry="36" fill={green} opacity="0.35" />
      <ellipse cx="40" cy="138" rx="11" ry="26" fill={green} opacity="0.35" />
      <ellipse cx="160" cy="138" rx="11" ry="26" fill={green} opacity="0.35" />
      {SITES.map((s) => (
        <Pin key={s.id} x={s.id === 'A' ? 132 : s.x} y={s.id === 'A' ? 164 : s.y} n={s.id} color={blue} />
      ))}
    </svg>
    <figcaption className="space-y-2.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
      {SITES.map((s) => (
        <div key={s.id} className="flex gap-2.5">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-bold text-white" style={{ background: blue }} aria-hidden="true">{s.id}</span>
          <div><strong className="text-slate-900 dark:text-white">{s.label}</strong>：{s.body}</div>
        </div>
      ))}
      <p className="text-xs text-slate-500 dark:text-slate-400">每次換位置。三個部位的效果沒有差別，選你最方便、最不怕的。</p>
    </figcaption>
  </figure>
);

/** Treatment journey shown at the top of the chapter. */
export const JourneyStrip: React.FC = () => {
  const stages = [
    { t: '開始前', d: '1–2 次門診', b: '確認適應症、抽血、調藥、避孕與運動計畫' },
    { t: '爬升期', d: '最快約 20 週到 15 mg', b: '每階至少 4 週，副作用多在這段；蛋白質與肌力訓練就此開始' },
    { t: '減重期', d: '約到 1 年前後', b: '體重下降逐漸趨緩，定期複查三高並調藥' },
    { t: '維持期', d: '長期', b: '選擇繼續、減量或停藥並追蹤；平台期是正常的' },
  ];
  return (
    <ol className="grid grid-cols-1 gap-2 sm:grid-cols-4">
      {stages.map((s, i) => (
        <li key={s.t} className="relative rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex items-center gap-2">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-700 text-xs font-bold text-white dark:bg-emerald-600" aria-hidden="true">{i + 1}</span>
            <strong className="text-sm text-slate-900 dark:text-white">{s.t}</strong>
          </div>
          <div className="mt-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300">{s.d}</div>
          <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.b}</p>
        </li>
      ))}
    </ol>
  );
};
