import React from 'react';

/**
 * StickFigure — a tiny forward-kinematics renderer for posture and exercise drawings.
 *
 * Each pose is described by the hip position plus the absolute angle of every body
 * segment (0° = straight up, 90° = pointing right, 180° = down). The renderer walks the
 * chain hip → shoulder → head and hip → knee → ankle → toe, so every figure keeps the
 * same adult proportions no matter how it is posed. The spine is drawn as its own
 * coloured curve, because in this zone the spine's shape is the point of the picture.
 */

export type Pt = [number, number];

const rad = (d: number) => (d * Math.PI) / 180;
const step = (p: Pt, angle: number, len: number): Pt => [p[0] + Math.sin(rad(angle)) * len, p[1] - Math.cos(rad(angle)) * len];

/** Segment lengths in viewBox units — roughly adult proportions at ~1:13. */
export const SEG = { torso: 40, neck: 9, head: 8, upper: 21, fore: 19, thigh: 29, shin: 28, foot: 10 };

export type SpineShape = 'neutral' | 'flex' | 'ext';
export type SpineTone = 'good' | 'bad' | 'neutral' | 'warn';

export interface Pose {
  hip: Pt;
  /** hip → shoulder */
  torso: number;
  /** shoulder → head centre; defaults to the torso angle */
  neck?: number;
  /** near arm: upper, forearm */
  arm: [number, number];
  /** far arm (drawn lighter, behind the body) */
  arm2?: [number, number];
  /** near leg: thigh, shin, foot */
  leg: [number, number, number?];
  leg2?: [number, number, number?];
  spine?: SpineShape;
  /** +1 the figure faces right (default), -1 faces left — decides which side is "front". */
  facing?: 1 | -1;
}

export interface Joints {
  hip: Pt;
  shoulder: Pt;
  head: Pt;
  elbow: Pt;
  hand: Pt;
  elbow2?: Pt;
  hand2?: Pt;
  knee: Pt;
  ankle: Pt;
  toe: Pt;
  knee2?: Pt;
  ankle2?: Pt;
  toe2?: Pt;
}

export function solve(p: Pose): Joints {
  const shoulder = step(p.hip, p.torso, SEG.torso);
  const neckAngle = p.neck ?? p.torso;
  const head = step(shoulder, neckAngle, SEG.neck + SEG.head);
  const elbow = step(shoulder, p.arm[0], SEG.upper);
  const hand = step(elbow, p.arm[1], SEG.fore);
  const knee = step(p.hip, p.leg[0], SEG.thigh);
  const ankle = step(knee, p.leg[1], SEG.shin);
  const toe = step(ankle, p.leg[2] ?? 90 * (p.facing ?? 1), SEG.foot);
  const j: Joints = { hip: p.hip, shoulder, head, elbow, hand, knee, ankle, toe };
  if (p.arm2) {
    j.elbow2 = step(shoulder, p.arm2[0], SEG.upper);
    j.hand2 = step(j.elbow2, p.arm2[1], SEG.fore);
  }
  if (p.leg2) {
    j.knee2 = step(p.hip, p.leg2[0], SEG.thigh);
    j.ankle2 = step(j.knee2, p.leg2[1], SEG.shin);
    j.toe2 = step(j.ankle2, p.leg2[2] ?? 90 * (p.facing ?? 1), SEG.foot);
  }
  return j;
}

const SPINE_COLOR: Record<SpineTone, string> = {
  good: 'var(--viz-good)',
  bad: 'var(--viz-bad)',
  warn: 'var(--viz-warn)',
  neutral: 'var(--anat-figure)',
};

const line = (a: Pt, b: Pt) => `M${a[0].toFixed(1)} ${a[1].toFixed(1)} L${b[0].toFixed(1)} ${b[1].toFixed(1)}`;

/** Torso curve: flexion bulges toward the back, extension toward the front. */
function torsoPath(p: Pose, j: Joints): string {
  const shape = p.spine ?? 'neutral';
  const [hx, hy] = j.hip;
  const [sx, sy] = j.shoulder;
  const mx = (hx + sx) / 2;
  const my = (hy + sy) / 2;
  if (shape === 'neutral') {
    // A healthy spine is not straight: a gentle S hint (lumbar lordosis, thoracic kyphosis).
    const facing = p.facing ?? 1;
    const ax = Math.cos(rad(p.torso)) * facing;
    const ay = Math.sin(rad(p.torso)) * facing;
    const c1: Pt = [hx + (sx - hx) * 0.3 + ax * 2.2, hy + (sy - hy) * 0.3 + ay * 2.2];
    const c2: Pt = [hx + (sx - hx) * 0.72 - ax * 2.6, hy + (sy - hy) * 0.72 - ay * 2.6];
    return `M${hx.toFixed(1)} ${hy.toFixed(1)} C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
  }
  const facing = p.facing ?? 1;
  // Anterior unit vector for a figure facing right is the torso vector rotated +90°.
  const ax = Math.cos(rad(p.torso)) * facing;
  const ay = Math.sin(rad(p.torso)) * facing;
  const k = shape === 'flex' ? -11 : 9;
  const cx = mx + ax * k;
  const cy = my + ay * k;
  return `M${hx.toFixed(1)} ${hy.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${sx.toFixed(1)} ${sy.toFixed(1)}`;
}

export const Figure: React.FC<{ pose: Pose; tone?: SpineTone; ghost?: boolean }> = ({ pose, tone = 'neutral', ghost = false }) => {
  const j = solve(pose);
  const body = 'var(--anat-figure)';
  const far = 'var(--viz-muted)';
  const op = ghost ? 0.28 : 1;
  const sw = 5;
  return (
    <g opacity={op} strokeLinecap="round" strokeLinejoin="round" fill="none">
      {/* far limbs */}
      {j.knee2 && j.ankle2 && j.toe2 && (
        <path d={`${line(j.hip, j.knee2)} ${line(j.knee2, j.ankle2)} ${line(j.ankle2, j.toe2)}`} stroke={far} strokeWidth={sw - 0.5} opacity={0.75} />
      )}
      {j.elbow2 && j.hand2 && <path d={`${line(j.shoulder, j.elbow2)} ${line(j.elbow2, j.hand2)}`} stroke={far} strokeWidth={sw - 1} opacity={0.75} />}
      {/* neck */}
      <path d={line(j.shoulder, step(j.shoulder, pose.neck ?? pose.torso, SEG.neck))} stroke={SPINE_COLOR[tone]} strokeWidth={sw - 1} />
      {/* torso / spine */}
      <path d={torsoPath(pose, j)} stroke={SPINE_COLOR[tone]} strokeWidth={sw + 1.5} />
      {/* near leg */}
      <path d={`${line(j.hip, j.knee)} ${line(j.knee, j.ankle)} ${line(j.ankle, j.toe)}`} stroke={body} strokeWidth={sw} />
      {/* near arm */}
      <path d={`${line(j.shoulder, j.elbow)} ${line(j.elbow, j.hand)}`} stroke={body} strokeWidth={sw - 0.5} />
      {/* head */}
      <circle cx={j.head[0]} cy={j.head[1]} r={SEG.head} fill="var(--viz-surface)" stroke={body} strokeWidth={2.5} />
      {/* hip joint */}
      <circle cx={j.hip[0]} cy={j.hip[1]} r={2.6} fill={body} stroke="none" />
    </g>
  );
};

// ── Props ──────────────────────────────────────────────────────────────────

export const Ground: React.FC<{ y: number; x1?: number; x2?: number }> = ({ y, x1 = 6, x2 = 194 }) => (
  <line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--viz-baseline)" strokeWidth={2} strokeLinecap="round" />
);

export const Box: React.FC<{ x: number; y: number; w: number; h: number; fill?: string; rx?: number }> = ({ x, y, w, h, fill = 'var(--viz-grid)', rx = 3 }) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke="var(--viz-baseline)" strokeWidth={1.2} />
);

export const Arrow: React.FC<{ from: Pt; to: Pt; color?: string; curve?: number }> = ({ from, to, color = 'var(--viz-series-1)', curve = 0 }) => {
  const mx = (from[0] + to[0]) / 2;
  const my = (from[1] + to[1]) / 2;
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * curve;
  const cy = my + (dx / len) * curve;
  // Arrowhead along the tangent at the end point.
  const tx = to[0] - cx;
  const ty = to[1] - cy;
  const tl = Math.hypot(tx, ty) || 1;
  const ux = tx / tl;
  const uy = ty / tl;
  const h1: Pt = [to[0] - ux * 7 - uy * 4, to[1] - uy * 7 + ux * 4];
  const h2: Pt = [to[0] - ux * 7 + uy * 4, to[1] - uy * 7 - ux * 4];
  return (
    <g stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M${from[0]} ${from[1]} Q${cx} ${cy} ${to[0]} ${to[1]}`} strokeDasharray="0" />
      <path d={`M${h1[0]} ${h1[1]} L${to[0]} ${to[1]} L${h2[0]} ${h2[1]}`} />
    </g>
  );
};

export const Label: React.FC<{ x: number; y: number; children: React.ReactNode; anchor?: 'start' | 'middle' | 'end'; size?: number; weight?: number; tone?: 'ink' | 'muted' | 'good' | 'bad' }> = ({
  x,
  y,
  children,
  anchor = 'middle',
  size = 11,
  weight = 600,
  tone = 'ink',
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={size}
    fontWeight={weight}
    fill={tone === 'ink' ? 'var(--viz-ink)' : tone === 'muted' ? 'var(--viz-ink-2)' : tone === 'good' ? 'var(--viz-good)' : 'var(--viz-bad)'}
    style={{ fontFamily: 'inherit' }}
  >
    {children}
  </text>
);

/** A panel: one small SVG with a ✓ / ✗ verdict and an HTML caption, so text never scales below legibility. */
export const PosePanel: React.FC<{
  title: string;
  verdict?: 'good' | 'bad' | 'info';
  caption?: string;
  viewBox?: string;
  label: string;
  children: React.ReactNode;
}> = ({ title, verdict = 'info', caption, viewBox = '0 0 200 150', label, children }) => (
  <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/30 p-2.5 flex flex-col">
    <svg viewBox={viewBox} role="img" aria-label={label} className="w-full h-auto">
      {children}
    </svg>
    <div className="mt-1.5 flex items-start gap-1.5">
      {verdict !== 'info' && (
        <span
          className={`shrink-0 mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
            verdict === 'good' ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950' : 'bg-rose-600 text-white dark:bg-rose-500 dark:text-rose-950'
          }`}
          aria-label={verdict === 'good' ? '建議' : '避免'}
        >
          {verdict === 'good' ? '✓' : '✗'}
        </span>
      )}
      <div className="min-w-0">
        <p className="text-[13px] font-semibold text-slate-900 dark:text-white leading-snug">{title}</p>
        {caption && <p className="text-[12px] text-slate-600 dark:text-slate-400 leading-snug mt-0.5">{caption}</p>}
      </div>
    </div>
  </div>
);
