import React, { useState } from 'react';
import { IMAGING_AGES, IMAGING_PREVALENCE, DISC_PRESSURE, NECK_LOAD, HERNIATION_REGRESSION, DEGEN_CASCADE, TREATMENT_LADDER, NATURAL_COURSE } from '../../../../data/spineData';
import { GradePill } from '../../../common/pro/Blocks';

/**
 * Data charts for the spine zone. Rules (dataviz method):
 *  - single-series charts use one hue and no legend; the title names the measure
 *  - ≤ 24px bars, 4px rounded data end, square at the baseline, hairline grid
 *  - selective direct labels; every mark has a hover/focus tooltip; a table view exists
 *  - text uses ink tokens, never the series colour
 */

const BAR = 'var(--viz-series-1)';

/** Rounded data-end bar (vertical), square at the baseline. */
function colPath(x: number, w: number, base: number, top: number, r = 4): string {
  const h = base - top;
  const rr = Math.min(r, h / 2, w / 2);
  return `M${x} ${base} L${x} ${top + rr} Q${x} ${top} ${x + rr} ${top} L${x + w - rr} ${top} Q${x + w} ${top} ${x + w} ${top + rr} L${x + w} ${base} Z`;
}

/** Rounded data-end bar (horizontal), square at the baseline (left). */
function rowPath(base: number, y: number, h: number, end: number, r = 4): string {
  const w = end - base;
  const rr = Math.min(r, w / 2, h / 2);
  return `M${base} ${y} L${end - rr} ${y} Q${end} ${y} ${end} ${y + rr} L${end} ${y + h - rr} Q${end} ${y + h} ${end - rr} ${y + h} L${base} ${y + h} Z`;
}

const Tip: React.FC<{ text: string | null }> = ({ text }) => (
  <p className="min-h-[1.25rem] text-[12px] text-slate-600 dark:text-slate-300 tabular-nums" aria-live="polite">
    {text ?? '　'}
  </p>
);

// ── Imaging prevalence: small multiples ─────────────────────────────────

export const ImagingSmallMultiples: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const W = 150;
  const H = 96;
  const base = 78;
  const top = 14;
  const bw = 14;
  const gap = (W - 16 - IMAGING_AGES.length * bw) / (IMAGING_AGES.length - 1);
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {IMAGING_PREVALENCE.map((f) => (
          <div key={f.finding_zh} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2">
            <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-tight">{f.finding_zh}</p>
            <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${f.finding_zh}：20 歲 ${f.values[0]}%，80 歲 ${f.values[6]}%`} className="w-full h-auto">
              {[0, 50, 100].map((g) => {
                const y = base - ((base - top) * g) / 100;
                return <line key={g} x1={8} x2={W - 8} y1={y} y2={y} stroke="var(--viz-grid)" strokeWidth={1} />;
              })}
              <line x1={8} x2={W - 8} y1={base} y2={base} stroke="var(--viz-baseline)" strokeWidth={1} />
              {f.values.map((v, i) => {
                const x = 8 + i * (bw + gap);
                const y = base - ((base - top) * v) / 100;
                const label = `${f.finding_zh}・${IMAGING_AGES[i]} 歲：${v}%`;
                return (
                  <g key={i}>
                    <path d={colPath(x, bw, base, y)} fill={BAR} opacity={hover && hover !== label ? 0.55 : 1} />
                    <rect
                      x={x - gap / 2}
                      y={top - 6}
                      width={bw + gap}
                      height={base - top + 6}
                      fill="transparent"
                      tabIndex={0}
                      onMouseEnter={() => setHover(label)}
                      onFocus={() => setHover(label)}
                      onMouseLeave={() => setHover(null)}
                      onBlur={() => setHover(null)}
                    >
                      <title>{label}</title>
                    </rect>
                    {(i === 0 || i === f.values.length - 1) && (
                      <text x={x + bw / 2} y={y - 3} fontSize={10} fontWeight={700} textAnchor="middle" fill="var(--viz-ink)">
                        {v}%
                      </text>
                    )}
                    <text x={x + bw / 2} y={base + 12} fontSize={9} textAnchor="middle" fill="var(--viz-ink-2)">
                      {IMAGING_AGES[i]}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        ))}
      </div>
      <Tip text={hover ?? '橫軸為年齡（歲），縱軸為「沒有任何症狀的人」中出現該影像發現的比例。滑過或點選長條可看數值。'} />
    </div>
  );
};

// ── Disc pressure by posture ────────────────────────────────────────────

export const DiscPressureChart: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const max = 2.5;
  const rowH = 26;
  const labelW = 150;
  const plotW = 230;
  const W = labelW + plotW + 60;
  const H = DISC_PRESSURE.length * rowH + 30;
  const x = (v: number) => labelW + (plotW * v) / max;
  const standX = x(0.5);
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="不同姿勢下第 4–5 腰椎椎間盤壓力（MPa），仰躺 0.1、站立 0.5、彎腰駝背提 20 公斤 2.3" className="w-full max-w-2xl h-auto">
        {[0, 0.5, 1, 1.5, 2, 2.5].map((g) => (
          <g key={g}>
            <line x1={x(g)} x2={x(g)} y1={4} y2={H - 22} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={x(g)} y={H - 8} fontSize={10} textAnchor="middle" fill="var(--viz-ink-2)">
              {g}
            </text>
          </g>
        ))}
        <text x={W - 4} y={H - 8} fontSize={10} textAnchor="end" fill="var(--viz-ink-2)">
          MPa
        </text>
        <line x1={standX} x2={standX} y1={0} y2={H - 22} stroke="var(--viz-ink-2)" strokeWidth={1.2} strokeDasharray="4 3" />
        {DISC_PRESSURE.map((d, i) => {
          const y = 6 + i * rowH;
          const pct = Math.round((d.mpa / 0.5) * 100);
          const label = `${d.label}：${d.mpa} MPa（站立的 ${pct}%）${d.note ? `・${d.note}` : ''}`;
          return (
            <g key={d.label}>
              <text x={labelW - 8} y={y + 13} fontSize={11.5} textAnchor="end" fill="var(--viz-ink)">
                {d.label}
              </text>
              <path d={rowPath(labelW, y + 3, 14, x(d.mpa))} fill={BAR} opacity={hover && hover !== label ? 0.55 : 1} />
              <text x={x(d.mpa) + 5} y={y + 14} fontSize={11} fontWeight={600} fill="var(--viz-ink)" className="tabular-nums">
                {d.mpa} · {pct}%
              </text>
              <rect
                x={0}
                y={y}
                width={W}
                height={rowH}
                fill="transparent"
                tabIndex={0}
                onMouseEnter={() => setHover(label)}
                onFocus={() => setHover(label)}
                onMouseLeave={() => setHover(null)}
                onBlur={() => setHover(null)}
              >
                <title>{label}</title>
              </rect>
            </g>
          );
        })}
      </svg>
      <Tip text={hover ?? '虛線＝自然站立（0.5 MPa＝100%）。數字為 MPa · 相對站立的百分比。'} />
    </div>
  );
};

// ── Neck load by head angle ─────────────────────────────────────────────

export const NeckLoadChart: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const W = 360;
  const H = 190;
  const base = 128;
  const top = 18;
  const max = 30;
  const bw = 24;
  const slot = (W - 40) / NECK_LOAD.length;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="低頭角度與頸椎等效負荷：0 度約 5 公斤、15 度 12、30 度 18、45 度 22、60 度 27 公斤" className="w-full max-w-xl h-auto">
        {[0, 10, 20, 30].map((g) => {
          const y = base - ((base - top) * g) / max;
          return (
            <g key={g}>
              <line x1={30} x2={W - 6} y1={y} y2={y} stroke="var(--viz-grid)" strokeWidth={1} />
              <text x={24} y={y + 3} fontSize={10} textAnchor="end" fill="var(--viz-ink-2)">
                {g}
              </text>
            </g>
          );
        })}
        <text x={4} y={12} fontSize={10} fill="var(--viz-ink-2)">
          公斤
        </text>
        {NECK_LOAD.map((d, i) => {
          const cx = 34 + slot * i + slot / 2;
          const y = base - ((base - top) * d.kg) / max;
          const label = `${d.label}：約 ${d.kg} 公斤`;
          const a = (d.angle * Math.PI) / 180;
          // head glyph: neck line from shoulder, head circle tipped forward by the angle
          const sx = cx;
          const sy = H - 14;
          const hx = sx + Math.sin(a) * 18;
          const hy = sy - Math.cos(a) * 18;
          return (
            <g key={d.angle}>
              <path d={colPath(cx - bw / 2, bw, base, y)} fill={BAR} opacity={hover && hover !== label ? 0.55 : 1} />
              <text x={cx} y={y - 5} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--viz-ink)">
                {d.kg}
              </text>
              <line x1={sx - 10} y1={sy + 2} x2={sx + 10} y2={sy + 2} stroke="var(--anat-figure)" strokeWidth={3} strokeLinecap="round" />
              <line x1={sx} y1={sy} x2={hx} y2={hy} stroke="var(--anat-figure)" strokeWidth={3} strokeLinecap="round" />
              <circle cx={sx + Math.sin(a) * 26} cy={sy - Math.cos(a) * 26} r={8} fill="var(--viz-surface)" stroke="var(--anat-figure)" strokeWidth={2} />
              <text x={cx + 24} y={sy - 26} fontSize={10} fill="var(--viz-ink-2)">
                {d.angle}°
              </text>
              <rect x={cx - slot / 2} y={top} width={slot} height={H - top} fill="transparent" tabIndex={0} onMouseEnter={() => setHover(label)} onFocus={() => setHover(label)} onMouseLeave={() => setHover(null)} onBlur={() => setHover(null)}>
                <title>{label}</title>
              </rect>
            </g>
          );
        })}
      </svg>
      <Tip text={hover ?? '電腦模型估算的「等效負荷」，用來比較相對大小，不是實際量測值。'} />
    </div>
  );
};

// ── Disc herniation regression ──────────────────────────────────────────

const DiscIcon: React.FC<{ kind: number; cx: number; cy: number }> = ({ kind, cx, cy }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={20} ry={13} fill="var(--anat-disc)" stroke="var(--anat-disc-core)" strokeWidth={1} />
    <ellipse cx={cx} cy={cy} rx={8} ry={5} fill="var(--anat-disc-core)" />
    {kind === 0 && <ellipse cx={cx} cy={cy + 1} rx={23} ry={15} fill="none" stroke="var(--anat-hit)" strokeWidth={1.5} />}
    {kind === 1 && <path d={`M${cx - 6} ${cy + 12} Q${cx} ${cy + 20} ${cx + 6} ${cy + 12}`} fill="var(--anat-disc-core)" stroke="var(--anat-hit)" strokeWidth={1.5} />}
    {kind === 2 && <path d={`M${cx - 3} ${cy + 12} L${cx - 7} ${cy + 22} Q${cx} ${cy + 27} ${cx + 7} ${cy + 22} L${cx + 3} ${cy + 12} Z`} fill="var(--anat-disc-core)" stroke="var(--anat-hit)" strokeWidth={1.5} />}
    {kind === 3 && <circle cx={cx + 2} cy={cy + 25} r={5} fill="var(--anat-disc-core)" stroke="var(--anat-hit)" strokeWidth={1.5} />}
  </g>
);

export const RegressionChart: React.FC = () => {
  const W = 360;
  const H = 210;
  const base = 120;
  const top = 18;
  const bw = 24;
  const slot = (W - 40) / HERNIATION_REGRESSION.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="腰椎間盤突出自行縮小的機率：膨出 13%、突出 41%、脫出 70%、游離 96%" className="w-full max-w-xl h-auto mx-auto">
      {[0, 50, 100].map((g) => {
        const y = base - ((base - top) * g) / 100;
        return (
          <g key={g}>
            <line x1={30} x2={W - 6} y1={y} y2={y} stroke="var(--viz-grid)" strokeWidth={1} />
            <text x={24} y={y + 3} fontSize={10} textAnchor="end" fill="var(--viz-ink-2)">
              {g}%
            </text>
          </g>
        );
      })}
      {HERNIATION_REGRESSION.map((d, i) => {
        const cx = 34 + slot * i + slot / 2;
        const y = base - ((base - top) * d.pct) / 100;
        return (
          <g key={d.type}>
            <path d={colPath(cx - bw / 2, bw, base, y)} fill={BAR}>
              <title>{`${d.type}（${d.en}）：約 ${d.pct}% 會自行縮小`}</title>
            </path>
            <text x={cx} y={y - 5} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--viz-ink)">
              {d.pct}%
            </text>
            <DiscIcon kind={i} cx={cx} cy={base + 24} />
            <text x={cx} y={H - 8} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--viz-ink)">
              {d.type}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ── HTML diagrams (text-heavy, so they reflow on phones) ─────────────────

const TONE_BOX = {
  neutral: 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900/70',
  warn: 'border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/25',
  bad: 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/25',
} as const;

export const DegenCascadeFigure: React.FC = () => (
  <ol className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
    {DEGEN_CASCADE.map((s, i) => (
      <li key={s.step} className={`relative rounded-xl border p-3 ${TONE_BOX[s.tone]}`}>
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">STEP {i + 1}</span>
        <p className="font-semibold text-[14px] text-slate-900 dark:text-white leading-snug">{s.step}</p>
        <p className="text-[12px] leading-relaxed text-slate-600 dark:text-slate-300 mt-1">{s.detail}</p>
        {i < DEGEN_CASCADE.length - 1 && (
          <span aria-hidden="true" className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 items-center justify-center text-[11px] text-slate-500">
            →
          </span>
        )}
      </li>
    ))}
  </ol>
);

export const TreatmentLadderFigure: React.FC = () => (
  <ol className="space-y-2" aria-label="治療階梯，由第 1 階到第 5 階">
    {[...TREATMENT_LADDER].reverse().map((s) => (
      <li key={s.step} className="flex items-stretch gap-2" style={{ paddingLeft: `${(5 - s.step) * 6}%` }}>
        <div
          className={`shrink-0 w-12 rounded-xl flex flex-col items-center justify-center font-bold text-white ${
            s.step === 1 ? 'bg-emerald-700' : s.step === 2 ? 'bg-emerald-600' : s.step === 3 ? 'bg-sky-700' : s.step === 4 ? 'bg-amber-600' : 'bg-rose-700'
          }`}
        >
          <span className="text-[10px] opacity-90">第</span>
          <span className="text-lg leading-none tabular-nums">{s.step}</span>
          <span className="text-[10px] opacity-90">階</span>
        </div>
        <div className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-bold text-slate-900 dark:text-white">{s.title}</p>
            <GradePill grade={s.grade} withLabel={false} />
          </div>
          <p className="text-[12px] text-slate-500 dark:text-slate-400">{s.who}</p>
          <p className="text-[13px] text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">{s.items.join('・')}</p>
        </div>
      </li>
    ))}
  </ol>
);

export const NaturalCourseFigure: React.FC = () => (
  <ol className="relative grid gap-3 sm:grid-cols-4">
    {NATURAL_COURSE.map((n, i) => (
      <li key={n.when} className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3">
        <div className="h-1.5 rounded-full mb-2" style={{ background: 'var(--viz-series-1)', opacity: 1 - i * 0.2 }} aria-hidden="true" />
        <p className="font-bold text-slate-900 dark:text-white tabular-nums">{n.when}</p>
        <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 mt-1">{n.what}</p>
      </li>
    ))}
  </ol>
);
