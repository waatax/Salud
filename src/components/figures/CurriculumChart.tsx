import React from 'react';
import type { ChartItem, ChartSpec, CurriculumFigure, Tone } from '../../data/curriculumFigures';
import { CURRICULUM_FIGURES } from '../../data/curriculumFigures';

/**
 * CurriculumChart — renders a data-driven curriculum figure (see data/curriculumFigures.ts).
 * HTML/CSS layouts wrap Chinese text cleanly on phones; only the curve and donut use SVG.
 */

const TONE: Record<Tone, { bar: string; soft: string; text: string; ring: string; stroke: string }> = {
  good: {
    bar: 'bg-emerald-500 dark:bg-emerald-400',
    soft: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
    text: 'text-emerald-800 dark:text-emerald-300',
    ring: 'ring-emerald-400',
    stroke: 'text-emerald-500 dark:text-emerald-400',
  },
  ok: {
    bar: 'bg-sky-500 dark:bg-sky-400',
    soft: 'bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800',
    text: 'text-sky-800 dark:text-sky-300',
    ring: 'ring-sky-400',
    stroke: 'text-sky-500 dark:text-sky-400',
  },
  warn: {
    bar: 'bg-amber-500 dark:bg-amber-400',
    soft: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800',
    text: 'text-amber-800 dark:text-amber-300',
    ring: 'ring-amber-400',
    stroke: 'text-amber-500 dark:text-amber-400',
  },
  bad: {
    bar: 'bg-rose-500 dark:bg-rose-400',
    soft: 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800',
    text: 'text-rose-800 dark:text-rose-300',
    ring: 'ring-rose-400',
    stroke: 'text-rose-500 dark:text-rose-400',
  },
  info: {
    bar: 'bg-violet-500 dark:bg-violet-400',
    soft: 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 dark:border-violet-800',
    text: 'text-violet-800 dark:text-violet-300',
    ring: 'ring-violet-400',
    stroke: 'text-violet-500 dark:text-violet-400',
  },
  neutral: {
    bar: 'bg-slate-400 dark:bg-slate-500',
    soft: 'bg-slate-50 dark:bg-slate-900/60 border-slate-300 dark:border-slate-700',
    text: 'text-slate-700 dark:text-slate-300',
    ring: 'ring-slate-400',
    stroke: 'text-slate-400 dark:text-slate-500',
  },
};

const PALETTE: Tone[] = ['ok', 'good', 'warn', 'info', 'bad', 'neutral'];
const toneOf = (i: { tone?: Tone }, idx: number): Tone => i.tone ?? PALETTE[idx % PALETTE.length];
const shown = (i: ChartItem, unit?: string) => i.display ?? `${i.value}${unit ? ` ${unit}` : ''}`;

const Bars: React.FC<{ spec: Extract<ChartSpec, { kind: 'bars' }> }> = ({ spec }) => {
  const max = spec.max ?? Math.max(...spec.items.map((i) => i.value), spec.ref?.value ?? 0) * 1.08;
  return (
    <div className="relative space-y-2.5">
      {spec.items.map((i, idx) => {
        const t = TONE[toneOf(i, idx)];
        return (
          <div key={i.label} className="grid grid-cols-[minmax(0,7.5rem)_1fr] sm:grid-cols-[minmax(0,11rem)_1fr] items-center gap-2 sm:gap-3">
            <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-snug">
              {i.icon && <span className="mr-1" aria-hidden>{i.icon}</span>}
              {i.label}
            </div>
            <div>
              <div className="relative h-6 rounded-md bg-slate-200/70 dark:bg-slate-800/80 overflow-hidden">
                <div className={`h-full rounded-md ${t.bar}`} style={{ width: `${Math.max(2, Math.min(100, (i.value / max) * 100))}%` }} />
                {spec.ref && (
                  <div
                    className="absolute inset-y-0 border-l-2 border-dashed border-slate-900/70 dark:border-white/80"
                    style={{ left: `${(spec.ref.value / max) * 100}%` }}
                    aria-hidden
                  />
                )}
              </div>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 text-[11px] sm:text-xs">
                <span className={`font-bold tabular-nums ${t.text}`}>{shown(i, spec.unit)}</span>
                {i.note && <span className="text-slate-500 dark:text-slate-400">{i.note}</span>}
              </div>
            </div>
          </div>
        );
      })}
      {spec.ref && (
        <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1.5 pt-1">
          <span className="inline-block w-4 border-t-2 border-dashed border-slate-900/70 dark:border-white/80" aria-hidden />
          參考線：{spec.ref.label}
        </p>
      )}
    </div>
  );
};

const Legend: React.FC<{ items: ChartItem[]; unit?: string; total: number }> = ({ items, unit, total }) => (
  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
    {items.map((i, idx) => {
      const t = TONE[toneOf(i, idx)];
      return (
        <li key={i.label} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
          <span className={`mt-1 w-3 h-3 rounded-sm shrink-0 ${t.bar}`} aria-hidden />
          <span className="leading-snug">
            {i.icon && <span className="mr-1" aria-hidden>{i.icon}</span>}
            <strong>{i.label}</strong> <span className={`tabular-nums font-semibold ${t.text}`}>{i.display ?? `${Math.round((i.value / total) * 100)}%`}</span>
            {i.note && <span className="block text-[11px] text-slate-500 dark:text-slate-400">{i.note}</span>}
          </span>
        </li>
      );
    })}
    {unit && <li className="sr-only">單位：{unit}</li>}
  </ul>
);

const Stack: React.FC<{ spec: Extract<ChartSpec, { kind: 'stack' }> }> = ({ spec }) => {
  const total = spec.items.reduce((n, i) => n + i.value, 0);
  return (
    <div className="space-y-3">
      <div className="flex h-10 rounded-xl overflow-hidden ring-1 ring-slate-300 dark:ring-slate-700">
        {spec.items.map((i, idx) => (
          <div
            key={i.label}
            className={`${TONE[toneOf(i, idx)].bar} flex items-center justify-center text-[11px] font-bold text-white overflow-hidden`}
            style={{ width: `${(i.value / total) * 100}%` }}
            title={`${i.label} ${shown(i, spec.unit)}`}
          >
            {i.value / total > 0.09 && <span className="px-1 truncate drop-shadow">{i.icon ?? ''} {Math.round((i.value / total) * 100)}%</span>}
          </div>
        ))}
      </div>
      <Legend items={spec.items} unit={spec.unit} total={total} />
    </div>
  );
};

const Donut: React.FC<{ spec: Extract<ChartSpec, { kind: 'donut' }> }> = ({ spec }) => {
  const total = spec.items.reduce((n, i) => n + i.value, 0);
  const r = 42;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <svg viewBox="0 0 120 120" className="w-40 h-40 shrink-0 -rotate-90" role="presentation">
        <circle cx="60" cy="60" r={r} fill="none" strokeWidth="18" className="stroke-slate-200 dark:stroke-slate-800" />
        {spec.items.map((i, idx) => {
          const len = (i.value / total) * c;
          const el = (
            <circle
              key={i.label}
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="18"
              strokeDasharray={`${len} ${c - len}`}
              strokeDashoffset={-acc}
              className={TONE[toneOf(i, idx)].stroke}
            />
          );
          acc += len;
          return el;
        })}
        {spec.center && (
          <text x="60" y="60" textAnchor="middle" dominantBaseline="middle" transform="rotate(90 60 60)" className="fill-slate-800 dark:fill-slate-100 text-[11px] font-bold">
            {spec.center}
          </text>
        )}
      </svg>
      <div className="w-full">
        <Legend items={spec.items} unit={spec.unit} total={total} />
      </div>
    </div>
  );
};

const FLOW_COLS: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
};

const Flow: React.FC<{ spec: Extract<ChartSpec, { kind: 'flow' }> }> = ({ spec }) => (
  <ol className={`grid grid-cols-1 gap-2 ${FLOW_COLS[spec.steps.length] ?? 'sm:grid-cols-2 lg:grid-cols-3'}`}>
    {spec.steps.map((s, idx) => {
      const t = TONE[toneOf(s, idx)];
      const last = idx === spec.steps.length - 1;
      return (
        <li key={s.label} className={`relative rounded-xl border p-3 ${t.soft}`}>
          <div className={`flex items-start gap-1.5 text-xs sm:text-sm font-bold ${t.text}`}>
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/80 dark:bg-slate-900/70 text-[10px] font-mono shrink-0">{idx + 1}</span>
            {s.icon && <span aria-hidden>{s.icon}</span>}
            <span className="leading-snug">{s.label}</span>
            {!last && <span className="ml-auto pl-1 text-slate-400 dark:text-slate-500" aria-hidden>➜</span>}
          </div>
          {s.detail && <p className="mt-1 text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{s.detail}</p>}
        </li>
      );
    })}
  </ol>
);

const Ladder: React.FC<{ spec: Extract<ChartSpec, { kind: 'ladder' }> }> = ({ spec }) => (
  <ol className="space-y-1.5">
    {spec.items.map((s) => {
      const t = TONE[s.tone];
      return (
        <li key={s.range + s.label} className={`grid grid-cols-[5.5rem_1fr] sm:grid-cols-[8rem_1fr] gap-2 sm:gap-3 rounded-xl border p-2.5 ${t.soft}`}>
          <div className={`flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-bold tabular-nums ${t.text}`}>
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${t.bar}`} aria-hidden />
            {s.range}
          </div>
          <div>
            <div className={`text-xs sm:text-sm font-bold ${t.text}`}>
              {s.icon && <span className="mr-1" aria-hidden>{s.icon}</span>}
              {s.label}
            </div>
            {s.detail && <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{s.detail}</p>}
          </div>
        </li>
      );
    })}
  </ol>
);

const Compare: React.FC<{ spec: Extract<ChartSpec, { kind: 'compare' }> }> = ({ spec }) => (
  <div className="space-y-3">
    <div className={`grid grid-cols-1 gap-3 ${spec.columns.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'}`}>
      {spec.columns.map((c) => {
        const t = TONE[c.tone];
        return (
          <div key={c.title} className={`rounded-xl border p-3 ${t.soft}`}>
            <div className={`text-sm font-bold mb-1.5 ${t.text}`}>
              {c.icon && <span className="mr-1" aria-hidden>{c.icon}</span>}
              {c.title}
            </div>
            <ul className="space-y-1">
              {c.points.map((p) => (
                <li key={p} className="flex gap-1.5 text-[11px] sm:text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${t.bar}`} aria-hidden />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
    {spec.verdict && (
      <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2">
        ⚖️ {spec.verdict}
      </p>
    )}
  </div>
);

const Matrix: React.FC<{ spec: Extract<ChartSpec, { kind: 'matrix' }> }> = ({ spec }) => (
  <div className="overflow-x-auto -mx-1 px-1">
    <table className="w-full min-w-[30rem] border-separate border-spacing-1 text-[11px] sm:text-xs">
      <thead>
        <tr>
          <th className="sr-only">項目</th>
          {spec.cols.map((c) => (
            <th key={c} scope="col" className="px-2 py-1.5 rounded-lg bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {spec.rows.map((r) => (
          <tr key={r.label}>
            <th scope="row" className="px-2 py-1.5 text-left font-bold text-slate-800 dark:text-slate-100 whitespace-nowrap">
              {r.icon && <span className="mr-1" aria-hidden>{r.icon}</span>}
              {r.label}
            </th>
            {r.cells.map((cell, idx) => {
              const c = typeof cell === 'string' ? { text: cell } : cell;
              const t = TONE[c.tone ?? 'neutral'];
              return (
                <td key={idx} className={`px-2 py-1.5 rounded-lg border text-center leading-snug ${t.soft} ${t.text}`}>
                  {c.text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const Timeline: React.FC<{ spec: Extract<ChartSpec, { kind: 'timeline' }> }> = ({ spec }) => (
  <ol className="relative border-l-2 border-slate-300 dark:border-slate-700 ml-3 space-y-3">
    {spec.items.map((s, idx) => {
      const t = TONE[toneOf(s, idx)];
      return (
        <li key={s.t + s.label} className="pl-4 relative">
          <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ring-4 ring-white dark:ring-slate-950 ${t.bar}`} aria-hidden />
          <div className="flex flex-wrap items-baseline gap-x-2">
            <span className={`font-mono text-[11px] sm:text-xs font-bold ${t.text}`}>{s.t}</span>
            <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              {s.icon && <span className="mr-1" aria-hidden>{s.icon}</span>}
              {s.label}
            </span>
          </div>
          {s.detail && <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{s.detail}</p>}
        </li>
      );
    })}
  </ol>
);

const Curve: React.FC<{ spec: Extract<ChartSpec, { kind: 'curve' }> }> = ({ spec }) => {
  const W = 560;
  const H = 260;
  const P = { l: 46, r: 16, t: 14, b: 40 };
  const sx = (x: number) => P.l + ((x - spec.x.min) / (spec.x.max - spec.x.min)) * (W - P.l - P.r);
  const sy = (y: number) => H - P.b - ((y - spec.y.min) / (spec.y.max - spec.y.min)) * (H - P.t - P.b);
  const xt = spec.x.ticks ?? [spec.x.min, (spec.x.min + spec.x.max) / 2, spec.x.max];
  const yt = spec.y.ticks ?? [spec.y.min, (spec.y.min + spec.y.max) / 2, spec.y.max];
  return (
    <div className="space-y-2">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation">
        {spec.bands?.map((b) => (
          <g key={b.label}>
            <rect x={sx(b.from)} y={P.t} width={sx(b.to) - sx(b.from)} height={H - P.t - P.b} fill="currentColor" className={`${TONE[b.tone].stroke} opacity-15`} />
            <text x={(sx(b.from) + sx(b.to)) / 2} y={P.t + 12} textAnchor="middle" className={`fill-current ${TONE[b.tone].text} text-[10px] font-bold`}>
              {b.label}
            </text>
          </g>
        ))}
        {yt.map((y) => (
          <g key={`y${y}`}>
            <line x1={P.l} x2={W - P.r} y1={sy(y)} y2={sy(y)} className="stroke-slate-200 dark:stroke-slate-800" />
            <text x={P.l - 6} y={sy(y)} textAnchor="end" dominantBaseline="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px] tabular-nums">
              {y}
            </text>
          </g>
        ))}
        {xt.map((x) => (
          <text key={`x${x}`} x={sx(x)} y={H - P.b + 14} textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[10px] tabular-nums">
            {x}
          </text>
        ))}
        <line x1={P.l} x2={W - P.r} y1={H - P.b} y2={H - P.b} className="stroke-slate-400 dark:stroke-slate-600" />
        <line x1={P.l} x2={P.l} y1={P.t} y2={H - P.b} className="stroke-slate-400 dark:stroke-slate-600" />
        <text x={(W + P.l) / 2} y={H - 6} textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[11px]">
          {spec.x.label}
          {spec.x.unit ? `（${spec.x.unit}）` : ''}
        </text>
        <text x={12} y={(H - P.b + P.t) / 2} textAnchor="middle" transform={`rotate(-90 12 ${(H - P.b + P.t) / 2})`} className="fill-slate-600 dark:fill-slate-300 text-[11px]">
          {spec.y.label}
          {spec.y.unit ? `（${spec.y.unit}）` : ''}
        </text>
        {spec.markers?.map((m) => (
          <g key={m.label}>
            <line x1={sx(m.x)} x2={sx(m.x)} y1={P.t} y2={H - P.b} strokeDasharray="4 3" className="stroke-slate-500 dark:stroke-slate-400" />
            <text x={sx(m.x) + 4} y={H - P.b - 6} className="fill-slate-700 dark:fill-slate-200 text-[10px] font-bold">
              {m.label}
            </text>
          </g>
        ))}
        {spec.series.map((s) => (
          <g key={s.name} className={TONE[s.tone].stroke}>
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeDasharray={s.dashed ? '6 4' : undefined}
              points={s.points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')}
            />
            {s.points.map(([x, y]) => (
              <circle key={`${x}-${y}`} cx={sx(x)} cy={sy(y)} r="3" fill="currentColor" />
            ))}
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-700 dark:text-slate-300">
        {spec.series.map((s) => (
          <span key={s.name} className="flex items-center gap-1.5">
            <span className={`inline-block w-5 border-t-[3px] ${s.dashed ? 'border-dashed' : ''} ${TONE[s.tone].stroke}`} style={{ borderColor: 'currentColor' }} aria-hidden />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export const ChartBody: React.FC<{ chart: ChartSpec }> = ({ chart }) => {
  switch (chart.kind) {
    case 'bars':
      return <Bars spec={chart} />;
    case 'stack':
      return <Stack spec={chart} />;
    case 'donut':
      return <Donut spec={chart} />;
    case 'flow':
      return <Flow spec={chart} />;
    case 'ladder':
      return <Ladder spec={chart} />;
    case 'compare':
      return <Compare spec={chart} />;
    case 'matrix':
      return <Matrix spec={chart} />;
    case 'timeline':
      return <Timeline spec={chart} />;
    case 'curve':
      return <Curve spec={chart} />;
  }
};

interface Props {
  figureId: string;
  figure?: CurriculumFigure;
}

export const CurriculumChart: React.FC<Props> = ({ figureId, figure }) => {
  const fig = figure ?? CURRICULUM_FIGURES[figureId];
  if (!fig) return null;
  return (
    <div className="w-full max-w-3xl text-left font-sans space-y-3">
      <div role="group" aria-label={fig.title}>
        <ChartBody chart={fig.chart} />
      </div>
      <p className="rounded-xl border border-cyan-300 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 px-3 py-2 text-xs sm:text-sm text-cyan-950 dark:text-cyan-100">
        <span className="font-bold">📌 一句話帶走：</span>
        {fig.takeaway}
      </p>
    </div>
  );
};

export default CurriculumChart;
