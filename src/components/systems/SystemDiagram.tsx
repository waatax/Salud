import React from 'react';
import { Diagram, Tone } from '../../types/systemDeepDive';

/**
 * SystemDiagram — renders a `Diagram` spec as a real inline SVG.
 *
 * Every teaching point in the body-system deep dives carries one of these. Seven generic
 * kinds cover almost every explanation we need, which is what makes "a diagram for every
 * knowledge point" tractable: content authors describe the structure, not the geometry.
 *
 * All colours come from the --fig-* CSS custom properties, so a diagram is legible in both
 * light and dark themes without a second code path.
 */

const TONE_FILL: Record<Tone, string> = {
  neutral: 'var(--fig-surface)',
  good: 'color-mix(in srgb, var(--fig-series-1) 16%, var(--fig-surface))',
  warn: 'color-mix(in srgb, #F59E0B 18%, var(--fig-surface))',
  bad: 'color-mix(in srgb, var(--fig-alert) 15%, var(--fig-surface))',
  accent: 'color-mix(in srgb, var(--fig-series-2) 16%, var(--fig-surface))',
};

const TONE_STROKE: Record<Tone, string> = {
  neutral: 'var(--fig-border)',
  good: 'var(--fig-series-1)',
  warn: '#F59E0B',
  bad: 'var(--fig-alert)',
  accent: 'var(--fig-series-2)',
};

const INK = 'var(--fig-ink)';
const INK_WEAK = 'var(--fig-ink-weak)';

/** Break a string into lines of at most `max` display columns (CJK counts double). */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  let width = 0;
  for (const ch of text) {
    const w = /[　-鿿＀-￯]/.test(ch) ? 2 : 1;
    if (width + w > max) {
      lines.push(line);
      line = ch;
      width = w;
    } else {
      line += ch;
      width += w;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const Text: React.FC<{
  x: number;
  y: number;
  children: string;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  maxCols?: number;
  lineHeight?: number;
}> = ({ x, y, children, size = 12, weight = 400, fill = INK, anchor = 'middle', maxCols, lineHeight }) => {
  const lines = maxCols ? wrap(children, maxCols) : [children];
  const lh = lineHeight ?? size * 1.35;
  return (
    <>
      {lines.map((l, i) => (
        <text
          key={i}
          x={x}
          y={y + i * lh}
          fontSize={size}
          fontWeight={weight}
          fill={fill}
          textAnchor={anchor}
          dominantBaseline="middle"
        >
          {l}
        </text>
      ))}
    </>
  );
};

const Arrow: React.FC<{ x1: number; y1: number; x2: number; y2: number }> = ({ x1, y1, x2, y2 }) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={INK_WEAK}
    strokeWidth={1.5}
    markerEnd="url(#sd-arrow)"
  />
);

const Defs = () => (
  <defs>
    <marker id="sd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" fill={INK_WEAK} />
    </marker>
  </defs>
);

// ── flow: a causal chain, wrapped to two rows when long ───────────────────────
const FlowDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const nodes = d.nodes || [];
  const perRow = nodes.length > 4 ? Math.ceil(nodes.length / 2) : nodes.length;
  const rows = Math.ceil(nodes.length / perRow);
  const boxW = 150;
  const boxH = 74;
  const gapX = 34;
  const gapY = 40;
  const w = perRow * boxW + (perRow - 1) * gapX;
  const h = rows * boxH + (rows - 1) * gapY;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      {nodes.map((n, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const x = c * (boxW + gapX);
        const y = r * (boxH + gapY);
        const tone = n.tone || 'neutral';
        const isLast = i === nodes.length - 1;
        const nextInRow = c < perRow - 1 && !isLast;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx={12}
              fill={TONE_FILL[tone]}
              stroke={TONE_STROKE[tone]}
              strokeWidth={1.5}
            />
            <Text x={x + boxW / 2} y={y + (n.sub ? 24 : boxH / 2)} size={12.5} weight={700} maxCols={20}>
              {n.label}
            </Text>
            {n.sub && (
              <Text x={x + boxW / 2} y={y + 48} size={10.5} fill={INK_WEAK} maxCols={24}>
                {n.sub}
              </Text>
            )}
            {n.badge && (
              <>
                <rect x={x + boxW - 8 - n.badge.length * 7} y={y - 9} width={n.badge.length * 7 + 8} height={18} rx={9} fill={TONE_STROKE[tone]} />
                <Text x={x + boxW - 4 - (n.badge.length * 7) / 2} y={y} size={9.5} weight={700} fill="var(--fig-surface)">
                  {n.badge}
                </Text>
              </>
            )}
            {nextInRow && <Arrow x1={x + boxW + 5} y1={y + boxH / 2} x2={x + boxW + gapX - 5} y2={y + boxH / 2} />}
            {/* wrap to the next row */}
            {c === perRow - 1 && !isLast && (
              <path
                d={`M ${x + boxW / 2} ${y + boxH + 4} L ${x + boxW / 2} ${y + boxH + gapY / 2} L ${boxW / 2} ${y + boxH + gapY / 2} L ${boxW / 2} ${y + boxH + gapY - 4}`}
                fill="none"
                stroke={INK_WEAK}
                strokeWidth={1.5}
                strokeDasharray="4 3"
                markerEnd="url(#sd-arrow)"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ── layers: nested structure, outermost at the top ────────────────────────────
const LayersDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const nodes = d.nodes || [];
  const rowH = 58;
  const gap = 10;
  const w = 560;
  const h = nodes.length * (rowH + gap) - gap;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      {nodes.map((n, i) => {
        const inset = i * 26;
        const y = i * (rowH + gap);
        const tone = n.tone || 'neutral';
        return (
          <g key={i}>
            <rect
              x={inset}
              y={y}
              width={w - inset * 2}
              height={rowH}
              rx={10}
              fill={TONE_FILL[tone]}
              stroke={TONE_STROKE[tone]}
              strokeWidth={1.5}
            />
            <Text x={inset + 16} y={y + (n.sub ? 20 : rowH / 2)} size={13} weight={700} anchor="start" maxCols={34}>
              {n.label}
            </Text>
            {n.sub && (
              <Text x={inset + 16} y={y + 40} size={10.5} fill={INK_WEAK} anchor="start" maxCols={52}>
                {n.sub}
              </Text>
            )}
            {n.badge && (
              <Text x={w - inset - 16} y={y + rowH / 2} size={11} weight={700} fill={TONE_STROKE[tone]} anchor="end">
                {n.badge}
              </Text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

// ── scale: a value against labelled bands ─────────────────────────────────────
const ScaleDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const s = d.scale!;
  const w = 600;
  const barY = 54;
  const barH = 34;
  const h = 150;
  const span = s.max - s.min;
  const pos = (v: number) => {
    const t = (v - s.min) / span;
    return (s.invert ? 1 - t : t) * w;
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      {s.bands.map((b, i) => {
        const x1 = Math.min(pos(b.from), pos(b.to));
        const x2 = Math.max(pos(b.from), pos(b.to));
        return (
          <g key={i}>
            <rect
              x={x1}
              y={barY}
              width={Math.max(x2 - x1, 1)}
              height={barH}
              fill={TONE_FILL[b.tone]}
              stroke={TONE_STROKE[b.tone]}
              strokeWidth={1.25}
            />
            <Text x={(x1 + x2) / 2} y={barY + barH + 18} size={10.5} weight={700} fill={TONE_STROKE[b.tone]} maxCols={12} lineHeight={13}>
              {b.label}
            </Text>
          </g>
        );
      })}

      {/* axis end labels */}
      <Text x={0} y={barY - 14} size={10.5} fill={INK_WEAK} anchor="start">
        {`${s.invert ? s.max : s.min}${s.unit}`}
      </Text>
      <Text x={w} y={barY - 14} size={10.5} fill={INK_WEAK} anchor="end">
        {`${s.invert ? s.min : s.max}${s.unit}`}
      </Text>

      {(s.markers || []).map((m, i) => {
        const x = pos(m.at);
        return (
          <g key={i}>
            <line x1={x} y1={barY - 6} x2={x} y2={barY + barH + 4} stroke={INK} strokeWidth={2} />
            <circle cx={x} cy={barY - 8} r={4} fill={INK} />
            <Text x={Math.min(Math.max(x, 46), w - 46)} y={h - 22} size={11} weight={700} maxCols={26} lineHeight={13}>
              {m.label}
            </Text>
          </g>
        );
      })}
    </svg>
  );
};

// ── compare: two states, row by row ───────────────────────────────────────────
const CompareDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const c = d.compare!;
  const w = 600;
  const headH = 42;
  const rowH = 52;
  const colW = (w - 130) / 2;
  const h = headH + c.rows.length * rowH;
  const lTone = c.leftTone || 'bad';
  const rTone = c.rightTone || 'good';

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      <rect x={130} y={0} width={colW} height={h} rx={10} fill={TONE_FILL[lTone]} stroke={TONE_STROKE[lTone]} strokeWidth={1.25} />
      <rect x={130 + colW + 10} y={0} width={colW - 10} height={h} rx={10} fill={TONE_FILL[rTone]} stroke={TONE_STROKE[rTone]} strokeWidth={1.25} />
      <Text x={130 + colW / 2} y={headH / 2} size={12.5} weight={700} fill={TONE_STROKE[lTone]} maxCols={22}>
        {c.leftTitle}
      </Text>
      <Text x={130 + colW + 10 + (colW - 10) / 2} y={headH / 2} size={12.5} weight={700} fill={TONE_STROKE[rTone]} maxCols={22}>
        {c.rightTitle}
      </Text>

      {c.rows.map((r, i) => {
        const y = headH + i * rowH;
        return (
          <g key={i}>
            <line x1={0} y1={y} x2={w} y2={y} stroke="var(--fig-border)" strokeWidth={1} />
            <Text x={0} y={y + rowH / 2} size={11} weight={700} fill={INK_WEAK} anchor="start" maxCols={16} lineHeight={14}>
              {r.label}
            </Text>
            <Text x={130 + colW / 2} y={y + rowH / 2} size={11.5} maxCols={20} lineHeight={14}>
              {r.left}
            </Text>
            <Text x={130 + colW + 10 + (colW - 10) / 2} y={y + rowH / 2} size={11.5} maxCols={20} lineHeight={14}>
              {r.right}
            </Text>
          </g>
        );
      })}
    </svg>
  );
};

// ── cycle: a self-reinforcing loop ────────────────────────────────────────────
const CycleDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const nodes = d.nodes || [];
  const size = 420;
  const cx = size / 2;
  const cy = size / 2;
  const R = 148;
  const r = 56;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" style={{ maxWidth: 420, margin: '0 auto', display: 'block' }} role="img" aria-label={d.caption}>
      <Defs />
      {nodes.map((_, i) => {
        const a1 = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const a2 = ((i + 1) / nodes.length) * Math.PI * 2 - Math.PI / 2;
        // arc between consecutive node circles
        const pad = 0.34;
        const sx = cx + Math.cos(a1 + pad) * R;
        const sy = cy + Math.sin(a1 + pad) * R;
        const ex = cx + Math.cos(a2 - pad) * R;
        const ey = cy + Math.sin(a2 - pad) * R;
        return (
          <path
            key={`a${i}`}
            d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`}
            fill="none"
            stroke={INK_WEAK}
            strokeWidth={1.5}
            markerEnd="url(#sd-arrow)"
          />
        );
      })}
      {nodes.map((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const tone = n.tone || 'bad';
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill={TONE_FILL[tone]} stroke={TONE_STROKE[tone]} strokeWidth={1.5} />
            <Text x={x} y={y - (n.sub ? 10 : 0)} size={11.5} weight={700} maxCols={11} lineHeight={14}>
              {n.label}
            </Text>
            {n.sub && (
              <Text x={x} y={y + 22} size={9.5} fill={INK_WEAK} maxCols={13} lineHeight={11}>
                {n.sub}
              </Text>
            )}
          </g>
        );
      })}
      <Text x={cx} y={cy} size={12} weight={700} fill={INK_WEAK} maxCols={10} lineHeight={15}>
        惡性循環
      </Text>
    </svg>
  );
};

// ── proportion: how a whole divides ───────────────────────────────────────────
const ProportionDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const segs = d.proportion!.segments;
  const w = 600;
  const barY = 8;
  const barH = 46;
  const h = barH + 30 + segs.length * 20;
  let acc = 0;
  const palette = ['var(--fig-series-1)', 'var(--fig-series-2)', 'var(--fig-series-3)', 'var(--fig-series-4)', 'var(--fig-series-5)'];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      {segs.map((s, i) => {
        const x = (acc / 100) * w;
        const sw = (s.pct / 100) * w;
        acc += s.pct;
        const fill = s.tone ? TONE_STROKE[s.tone] : palette[i % palette.length];
        return (
          <g key={i}>
            <rect x={x} y={barY} width={sw} height={barH} fill={fill} opacity={0.9} />
            {s.pct >= 8 && (
              <Text x={x + sw / 2} y={barY + barH / 2} size={12} weight={700} fill="var(--fig-surface)">
                {`${s.pct}%`}
              </Text>
            )}
          </g>
        );
      })}
      {segs.map((s, i) => {
        const y = barH + 30 + i * 20;
        const fill = s.tone ? TONE_STROKE[s.tone] : palette[i % palette.length];
        return (
          <g key={`l${i}`}>
            <rect x={0} y={y - 6} width={12} height={12} rx={3} fill={fill} />
            <Text x={20} y={y} size={11.5} anchor="start">
              {`${s.label} — ${s.pct}%`}
            </Text>
          </g>
        );
      })}
    </svg>
  );
};

// ── timeline: staged progression ──────────────────────────────────────────────
const TimelineDiagram: React.FC<{ d: Diagram }> = ({ d }) => {
  const stages = d.timeline!.stages;
  const w = 600;
  const rowH = 76;
  const h = stages.length * rowH;
  const lineX = 92;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" role="img" aria-label={d.caption}>
      <Defs />
      <line x1={lineX} y1={12} x2={lineX} y2={h - 12} stroke="var(--fig-border)" strokeWidth={2} />
      {stages.map((s, i) => {
        const y = i * rowH + rowH / 2 - 10;
        const tone = s.tone || 'neutral';
        return (
          <g key={i}>
            <Text x={lineX - 18} y={y} size={11} weight={700} fill={INK_WEAK} anchor="end" maxCols={12} lineHeight={13}>
              {s.when}
            </Text>
            <circle cx={lineX} cy={y} r={7} fill={TONE_STROKE[tone]} stroke="var(--fig-surface)" strokeWidth={2.5} />
            <rect
              x={lineX + 18}
              y={y - 26}
              width={w - lineX - 18}
              height={54}
              rx={9}
              fill={TONE_FILL[tone]}
              stroke={TONE_STROKE[tone]}
              strokeWidth={1.25}
            />
            <Text x={lineX + 32} y={y - 10} size={12} weight={700} anchor="start" maxCols={38}>
              {s.label}
            </Text>
            <Text x={lineX + 32} y={y + 12} size={10.5} fill={INK_WEAK} anchor="start" maxCols={46}>
              {s.detail}
            </Text>
          </g>
        );
      })}
    </svg>
  );
};

export const SystemDiagram: React.FC<{ diagram: Diagram; className?: string }> = ({
  diagram,
  className = '',
}) => {
  let body: React.ReactNode = null;
  switch (diagram.kind) {
    case 'flow':
      body = <FlowDiagram d={diagram} />;
      break;
    case 'layers':
      body = <LayersDiagram d={diagram} />;
      break;
    case 'scale':
      body = diagram.scale ? <ScaleDiagram d={diagram} /> : null;
      break;
    case 'compare':
      body = diagram.compare ? <CompareDiagram d={diagram} /> : null;
      break;
    case 'cycle':
      body = <CycleDiagram d={diagram} />;
      break;
    case 'proportion':
      body = diagram.proportion ? <ProportionDiagram d={diagram} /> : null;
      break;
    case 'timeline':
      body = diagram.timeline ? <TimelineDiagram d={diagram} /> : null;
      break;
  }
  if (!body) return null;

  return (
    <figure
      className={`rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/40 p-4 sm:p-5 overflow-x-auto ${className}`}
    >
      {/* Capped so a wide viewport does not scale the SVG text up out of proportion. */}
      <div className="min-w-[320px] max-w-[760px] mx-auto">{body}</div>
      <figcaption className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-[11px] leading-relaxed text-slate-600 dark:text-slate-400">
        {diagram.caption}
      </figcaption>
    </figure>
  );
};
