import React, { useState } from 'react';
import { BREATH_SPECTRUM, LIU_ZI_JUE, MINDFUL_EVIDENCE, CAPD_STEPS } from '../../../data/mindbodyData';

/**
 * Infographics for the 睡眠・呼吸・正念 zone.
 *
 * Colour roles (theme tokens, never raw hex, so light and dark both work):
 *   calm / 副交感 → --viz-series-1 (blue)     alert / 交感 → --viz-series-2 (orange)
 *   good / 深睡   → --viz-series-3 (green)    mind / REM   → --fig-series-4 (violet)
 * Every figure also says it in words (labels, aria-label), never colour alone.
 */

const CALM = 'var(--viz-series-1)';
const ALERT = 'var(--viz-series-2)';
const GOOD = 'var(--viz-series-3)';
const MIND = 'var(--fig-series-4)';
const INK = 'var(--viz-ink)';
const INK2 = 'var(--viz-ink-2)';
const GRID = 'var(--viz-grid)';
const BASE = 'var(--viz-baseline)';

/** Wide charts keep a legible drawing width on phones and scroll sideways instead of shrinking text. */
export const Wide: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div>
    <div className="overflow-x-auto overscroll-x-contain -mx-1 px-1 print:overflow-visible">{children}</div>
    <p className="sm:hidden mt-1 text-center text-[11px] text-slate-400 dark:text-slate-500" aria-hidden="true">
      ← 左右滑動看完整圖 →
    </p>
  </div>
);

const Hint: React.FC<{ text: string | null; fallback?: string }> = ({ text, fallback = '　' }) => (
  <p className="min-h-[1.25rem] text-[12px] text-slate-600 dark:text-slate-300 tabular-nums" aria-live="polite">
    {text ?? fallback}
  </p>
);

const Arrow: React.FC<{ id: string; color: string }> = ({ id, color }) => (
  <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
    <path d="M0 0 L10 5 L0 10 z" fill={color} />
  </marker>
);

// ── 1. 自律神經迴路：惡性循環 vs 良性循環 ─────────────────────────────────

export const AutonomicLoopFigure: React.FC = () => {
  const [mode, setMode] = useState<'vicious' | 'virtuous'>('vicious');
  const v = mode === 'vicious';
  const c = v ? ALERT : CALM;
  const nodes = v
    ? [
        { x: 180, y: 52, t: '睡不好', s: '睡意壓力被焦慮蓋過' },
        { x: 318, y: 236, t: '呼吸淺快', s: '胸式、CO₂ 偏低' },
        { x: 42, y: 236, t: '焦慮反芻', s: '腦中停不下來' },
      ]
    : [
        { x: 180, y: 52, t: '睡得深', s: '前半夜深睡充足' },
        { x: 318, y: 236, t: '呼吸慢長', s: '吐比吸長、6 次/分' },
        { x: 42, y: 236, t: '心平靜', s: '覺察而不陷入' },
      ];
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2" role="group" aria-label="切換循環">
        {(['vicious', 'virtuous'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            aria-pressed={mode === m}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              mode === m
                ? m === 'vicious'
                  ? 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200'
                  : 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200'
                : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {m === 'vicious' ? '🔥 惡性循環（油門卡住）' : '🌙 良性循環（煞車回來）'}
          </button>
        ))}
      </div>
      <svg
        viewBox="-20 0 400 300"
        className="w-full max-w-lg mx-auto h-auto"
        role="img"
        aria-label={v ? '惡性循環：睡不好導致焦慮反芻，焦慮使呼吸淺快，呼吸淺快又讓人更睡不好' : '良性循環：慢長呼吸讓心平靜，心平靜幫助深睡，深睡又讓白天呼吸與情緒更穩'}
      >
        <defs>
          <Arrow id="mb-loop-arrow" color={c} />
        </defs>
        {/* center: autonomic balance */}
        <circle cx={180} cy={170} r={50} fill="none" stroke={GRID} strokeWidth={10} />
        <text x={180} y={160} textAnchor="middle" fontSize={12} fontWeight={700} fill={INK}>
          自律神經
        </text>
        {/* seesaw: the dominant side sinks — 油門 (right) when stuck, 煞車 (left) when calm */}
        <line x1={146} x2={214} y1={v ? 168 : 184} y2={v ? 184 : 168} stroke={INK2} strokeWidth={3} strokeLinecap="round" />
        <polygon points="180,177 173,190 187,190" fill={INK2} />
        <circle cx={150} cy={v ? 162 : 176} r={7} fill={CALM} opacity={v ? 0.5 : 1} />
        <circle cx={210} cy={v ? 176 : 162} r={7} fill={ALERT} opacity={v ? 1 : 0.5} />
        <text x={146} y={204} textAnchor="middle" fontSize={9.5} fill={CALM} fontWeight={700}>
          煞車
        </text>
        <text x={214} y={204} textAnchor="middle" fontSize={9.5} fill={ALERT} fontWeight={700}>
          油門
        </text>
        {/* arrows between nodes (clockwise) */}
        <path d="M232 70 Q318 110 320 196" fill="none" stroke={c} strokeWidth={3} markerEnd="url(#mb-loop-arrow)" />
        <path d="M268 262 Q180 296 96 262" fill="none" stroke={c} strokeWidth={3} markerEnd="url(#mb-loop-arrow)" />
        <path d="M40 196 Q42 110 128 70" fill="none" stroke={c} strokeWidth={3} markerEnd="url(#mb-loop-arrow)" />
        {nodes.map((n) => (
          <g key={n.t}>
            <rect x={n.x - 52} y={n.y - 26} width={104} height={50} rx={14} fill="var(--viz-surface)" stroke={c} strokeWidth={2} />
            <text x={n.x} y={n.y - 4} textAnchor="middle" fontSize={14} fontWeight={800} fill={INK}>
              {n.t}
            </text>
            <text x={n.x} y={n.y + 13} textAnchor="middle" fontSize={9.5} fill={INK2}>
              {n.s}
            </text>
          </g>
        ))}
      </svg>
      <p className="text-[13px] text-slate-600 dark:text-slate-300 text-center">{v ? '任何一環卡住，另外兩環都會被拖下水。' : '從最容易的「呼吸」切入，幾分鐘內就能把另外兩環一起拉回來。'}</p>
    </div>
  );
};

// ── 2. 兩歷程模型 ─────────────────────────────────────────────────────────

/** Circadian alerting signal: lowest ~04:00, climbs through the day, peaks ~21:00, falls fast after. */
const C_KNOTS: [number, number][] = [
  [4, 0.1],
  [7, 0.24],
  [9, 0.38],
  [12, 0.52],
  [15, 0.62],
  [18, 0.71],
  [21, 0.78],
  [23, 0.62],
  [25, 0.35],
  [28, 0.1],
];
function circadian(clock: number): number {
  const c = clock < 4 ? clock + 24 : clock;
  const n = C_KNOTS.length - 1; // last knot repeats the first, one day later
  const at = (i: number) => C_KNOTS[((i % n) + n) % n][1];
  for (let i = 0; i < n; i++) {
    const [h0] = C_KNOTS[i];
    const [h1] = C_KNOTS[i + 1];
    if (c >= h0 && c <= h1) {
      // centripetal-free Catmull-Rom through neighbouring knots: smooth, no flat spots
      const t = (c - h0) / (h1 - h0);
      const p0 = at(i - 1);
      const p1 = at(i);
      const p2 = at(i + 1);
      const p3 = at(i + 2);
      return 0.5 * (2 * p1 + (-p0 + p2) * t + (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t + (-p0 + 3 * p1 - 3 * p2 + p3) * t * t * t);
    }
  }
  return 0.1;
}

export const TwoProcessFigure: React.FC = () => {
  const [late, setLate] = useState(false);
  // x axis: 07:00 day 1 → 23:00 day 2 (40 h). S = homeostatic sleep pressure; C = circadian
  // alerting signal (peaks ~21:00, the "wake-maintenance zone"; lowest ~05:00). Sleep comes
  // easily where S rises above C — that gap is shaded.
  const W = 520;
  const H = 236;
  const L = 36;
  const R = 12;
  const T = 22;
  const B = 190;
  const hours = 40;
  const step = 0.25;
  const x = (h: number) => L + ((W - L - R) * h) / hours;
  const y = (v: number) => B - (B - T) * v;
  const sleepStart = late ? 20 : 16; // 23:00 or 03:00
  const sleepEnd = 24; // 07:00 alarm
  const S: number[] = [];
  const C: number[] = [];
  let s = 0.15;
  for (let i = 0; i <= hours / step; i++) {
    const h = i * step;
    S.push(s);
    C.push(circadian((7 + h) % 24));
    const asleep = h >= sleepStart && h < sleepEnd;
    s = asleep ? s * Math.exp(-step / 4.2) : 1 - (1 - s) * Math.exp(-step / 14);
  }
  const line = (arr: number[]) => arr.map((v, i) => `${x(i * step).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  // contiguous runs where S > C → filled polygons between the two curves
  const areas: string[] = [];
  let run: number[] = [];
  const flush = () => {
    if (run.length > 1) {
      const top = run.map((i) => `${x(i * step).toFixed(1)},${y(S[i]).toFixed(1)}`);
      const bot = [...run].reverse().map((i) => `${x(i * step).toFixed(1)},${y(C[i]).toFixed(1)}`);
      areas.push([...top, ...bot].join(' '));
    }
    run = [];
  };
  S.forEach((v, i) => (v > C[i] ? run.push(i) : flush()));
  flush();
  const alarmIdx = Math.round(sleepEnd / step);
  const groggy = S[alarmIdx] > C[alarmIdx];
  const ticks = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40];
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2" role="group" aria-label="情境切換">
        <button
          type="button"
          aria-pressed={!late}
          onClick={() => setLate(false)}
          className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold ${!late ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
        >
          23:00 睡、07:00 起
        </button>
        <button
          type="button"
          aria-pressed={late}
          onClick={() => setLate(true)}
          className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold ${late ? 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
        >
          熬夜到 03:00、07:00 鬧鐘
        </button>
      </div>
      <Wide>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[500px] h-auto"
          role="img"
          aria-label={
            late
              ? '熬夜情境：凌晨 3 點才睡，睡意壓力 S 只清掉一部分就被鬧鐘叫醒，起床時 S 仍高於清醒訊號 C，整天昏沉'
              : '正常情境：白天 S 累積，晚上 9 點左右 C 最強所以還不想睡；11 點後 S 超過 C，睡眠閘門打開；睡眠中 S 被清除，早上 7 點 S 低於 C，自然醒來'
          }
        >
          <rect x={x(sleepStart)} y={T - 8} width={x(sleepEnd) - x(sleepStart)} height={B - T + 8} fill={CALM} opacity={0.1} />
          <text x={(x(sleepStart) + x(sleepEnd)) / 2} y={B - 6} textAnchor="middle" fontSize={11} fontWeight={700} fill={CALM}>
            睡眠中
          </text>
          {[0, 0.5, 1].map((g) => (
            <line key={g} x1={L} x2={W - R} y1={y(g)} y2={y(g)} stroke={GRID} />
          ))}
          <line x1={L} x2={W - R} y1={B} y2={B} stroke={BASE} />
          {areas.map((pts, i) => (
            <polygon key={i} points={pts} fill={GOOD} opacity={0.3} />
          ))}
          <polyline points={line(C)} fill="none" stroke={MIND} strokeWidth={2.5} strokeDasharray="6 4" />
          <polyline points={line(S)} fill="none" stroke={ALERT} strokeWidth={3} />
          {ticks.map((h) => (
            <text key={h} x={x(h)} y={B + 16} fontSize={10} textAnchor="middle" fill={INK2}>
              {String((7 + h) % 24).padStart(2, '0')}:00
            </text>
          ))}
          <text x={x(5)} y={y(0.27)} fontSize={11} fontWeight={700} fill={ALERT}>
            S 睡意壓力（腺苷）
          </text>
          <text x={x(3)} y={y(0.86)} fontSize={11} fontWeight={700} fill={MIND}>
            C 生理時鐘清醒訊號（約 21:00 最強）
          </text>
          <text x={x(late ? 22 : 18.5)} y={T + 2} fontSize={10.5} fontWeight={700} fill={GOOD} textAnchor="middle">
            ▼ 綠區：S 高於 C，容易睡著
          </text>
          <circle cx={x(sleepEnd)} cy={y(S[alarmIdx])} r={5} fill={groggy ? ALERT : GOOD} stroke="var(--viz-surface)" strokeWidth={1.5} />
          <text x={x(sleepEnd) + 8} y={y(S[alarmIdx]) + (groggy ? -8 : 18)} fontSize={11} fontWeight={700} fill={INK}>
            {groggy ? '鬧鐘響：睡意仍高 → 昏沉' : '07:00 S 低於 C → 自然醒'}
          </text>
          <text x={L - 4} y={y(1) + 4} fontSize={10} textAnchor="end" fill={INK2}>
            高
          </text>
          <text x={L - 4} y={y(0) + 4} fontSize={10} textAnchor="end" fill={INK2}>
            低
          </text>
        </svg>
      </Wide>
      <p className="text-[13px] text-slate-600 dark:text-slate-300">
        綠色區域＝睡意壓力高過生理時鐘的清醒訊號，最容易睡著。晚上 9 點左右 C 最強（「清醒維持區」），所以太早上床反而睡不著；熬夜時則是 S 還沒清完就被鬧鐘打斷。
      </p>
    </div>
  );
};

// ── 3. 一夜睡眠圖（Hypnogram） ─────────────────────────────────────────────

const HYPNO: [number, number][] = [
  // [minutes from lights-out, level] level: 0 wake, 1 REM, 2 N1, 3 N2, 4 N3
  [0, 0],
  [10, 2],
  [18, 3],
  [35, 4],
  [75, 3],
  [85, 1],
  [95, 3],
  [115, 4],
  [160, 3],
  [175, 1],
  [195, 3],
  [230, 4],
  [250, 3],
  [270, 1],
  [300, 3],
  [330, 2],
  [340, 3],
  [370, 1],
  [410, 3],
  [430, 1],
  [470, 0],
  [480, 0],
];

export const HypnogramFigure: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const W = 520;
  const H = 212;
  const L = 64;
  const R = 10;
  const T = 14;
  const B = 160;
  const x = (m: number) => L + ((W - L - R) * m) / 480;
  const levels = ['清醒', 'REM', 'N1', 'N2', 'N3 深睡'];
  const y = (lv: number) => T + ((B - T) * lv) / 4;
  const colorFor = (lv: number) => (lv === 4 ? GOOD : lv === 1 ? MIND : lv === 0 ? ALERT : INK2);
  const segs = HYPNO.slice(0, -1).map(([m, lv], i) => ({ m, lv, end: HYPNO[i + 1][0] }));
  return (
    <div className="space-y-2">
      <Wide>
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[500px] h-auto" role="img" aria-label="一夜睡眠圖：約 5 個 90 分鐘週期，深睡集中在前半夜，REM 越到清晨越長">
          {levels.map((lb, i) => (
            <g key={lb}>
              <line x1={L} x2={W - R} y1={y(i)} y2={y(i)} stroke={GRID} />
              <text x={L - 6} y={y(i) + 4} textAnchor="end" fontSize={10.5} fill={colorFor(i)} fontWeight={i === 4 || i === 1 ? 700 : 500}>
                {lb}
              </text>
            </g>
          ))}
          {segs.map((sg, i) => {
            const label = `${Math.floor(sg.m / 60)}:${String(sg.m % 60).padStart(2, '0')}–${Math.floor(sg.end / 60)}:${String(sg.end % 60).padStart(2, '0')}（熄燈後）：${levels[sg.lv]}`;
            return (
              <g key={i}>
                <rect x={x(sg.m)} y={y(sg.lv) - 5} width={Math.max(2, x(sg.end) - x(sg.m))} height={10} rx={3} fill={colorFor(sg.lv)} opacity={hover && hover !== label ? 0.45 : 1} />
                {i < segs.length - 1 && <line x1={x(sg.end)} x2={x(sg.end)} y1={y(sg.lv)} y2={y(segs[i + 1].lv)} stroke={BASE} strokeWidth={1.5} />}
                <rect
                  x={x(sg.m)}
                  y={T - 8}
                  width={Math.max(4, x(sg.end) - x(sg.m))}
                  height={B - T + 16}
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
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((h) => (
            <text key={h} x={x(h * 60)} y={B + 18} fontSize={10} textAnchor="middle" fill={INK2}>
              {h}h
            </text>
          ))}
          <rect x={x(0)} y={B + 28} width={x(236) - x(0)} height={5} rx={2.5} fill={GOOD} opacity={0.75} />
          <rect x={x(244)} y={B + 28} width={x(480) - x(244)} height={5} rx={2.5} fill={MIND} opacity={0.75} />
          <text x={x(120)} y={B + 46} textAnchor="middle" fontSize={10} fontWeight={700} fill={GOOD}>
            前半夜：深睡多（修復）
          </text>
          <text x={x(360)} y={B + 46} textAnchor="middle" fontSize={10} fontWeight={700} fill={MIND}>
            後半夜：REM 變長（情緒記憶）
          </text>
        </svg>
      </Wide>
      <Hint text={hover} fallback="把滑鼠移到（或 Tab 到）任一段，看時間與睡眠階段。" />
    </div>
  );
};

// ── 4. 光照勒克斯對數圖 ───────────────────────────────────────────────────

const LUX = [
  { label: '月光', lux: 0.3, tone: CALM },
  { label: '睡前目標（≤ 10）', lux: 10, tone: CALM },
  { label: '一般客廳夜間', lux: 150, tone: ALERT },
  { label: '辦公室', lux: 400, tone: INK2 },
  { label: '陰天戶外', lux: 5000, tone: GOOD },
  { label: '晴天戶外', lux: 80000, tone: GOOD },
];

export const LightLuxFigure: React.FC = () => {
  const W = 520;
  const rowH = 30;
  const L = 130;
  const R = 70;
  const H = LUX.length * rowH + 30;
  const lx = (v: number) => L + ((W - L - R) * (Math.log10(v) + 1)) / 6; // 0.1 → 100,000
  return (
    <Wide>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[500px] h-auto"
        role="img"
        aria-label="光照強度對數比較：陰天戶外約 5,000 勒克斯、晴天約 8 萬，是室內的 10 到 200 倍；睡前 3 小時建議 10 勒克斯以下"
      >
        {[0.1, 1, 10, 100, 1000, 10000, 100000].map((g) => (
          <g key={g}>
            <line x1={lx(g)} x2={lx(g)} y1={6} y2={H - 22} stroke={GRID} />
            <text x={lx(g)} y={H - 8} textAnchor="middle" fontSize={9.5} fill={INK2}>
              {g >= 1000 ? `${g / 1000}k` : g}
            </text>
          </g>
        ))}
        {LUX.map((d, i) => {
          const yy = 10 + i * rowH;
          return (
            <g key={d.label}>
              <text x={L - 8} y={yy + 14} textAnchor="end" fontSize={11.5} fill={INK} fontWeight={600}>
                {d.label}
              </text>
              <rect x={L} y={yy + 3} width={Math.max(3, lx(d.lux) - L)} height={16} rx={4} fill={d.tone} opacity={0.85} />
              <text x={lx(d.lux) + 6} y={yy + 15} fontSize={11} fontWeight={700} fill={INK}>
                {d.lux.toLocaleString()} lux
              </text>
            </g>
          );
        })}
      </svg>
    </Wide>
  );
};

// ── 5. 呼吸性竇性心律不整 RSA ──────────────────────────────────────────────

export const RsaFigure: React.FC = () => {
  const [slow, setSlow] = useState(true);
  const W = 520;
  const H = 210;
  const L = 50;
  const R = 92;
  const secs = 30;
  const period = slow ? 10 : 4; // seconds per breath
  const x = (t: number) => L + ((W - L - R) * t) / secs;
  const lung: string[] = [];
  const hr: string[] = [];
  const amp = slow ? 9 : 3.5; // bpm swing
  for (let t = 0; t <= secs; t += 0.1) {
    // inhale 40%, exhale 60% of cycle
    const ph = (t % period) / period;
    const v = ph < 0.4 ? Math.sin((ph / 0.4) * (Math.PI / 2)) : Math.cos(((ph - 0.4) / 0.6) * (Math.PI / 2));
    lung.push(`${x(t).toFixed(1)},${(78 - v * 52).toFixed(1)}`);
    const h = 66 + amp * (v - 0.5) * 2;
    hr.push(`${x(t).toFixed(1)},${(186 - (h - 50) * 2.2).toFixed(1)}`);
  }
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2" role="group" aria-label="呼吸速度">
        <button
          type="button"
          aria-pressed={!slow}
          onClick={() => setSlow(false)}
          className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold ${!slow ? 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
        >
          平常：15 次／分
        </button>
        <button
          type="button"
          aria-pressed={slow}
          onClick={() => setSlow(true)}
          className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold ${slow ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
        >
          共振慢呼吸：6 次／分
        </button>
      </div>
      <Wide>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[500px] h-auto"
          role="img"
          aria-label={`呼吸與心跳同步：吸氣時心跳加快、吐氣時變慢。${slow ? '每分鐘 6 次時心跳起伏約 ±9 下，變異度最大' : '每分鐘 15 次時心跳起伏只有約 ±3 下'}`}
        >
          <text x={L - 6} y={30} textAnchor="end" fontSize={10.5} fontWeight={700} fill={CALM}>
            肺容量
          </text>
          <text x={L - 6} y={130} textAnchor="end" fontSize={10.5} fontWeight={700} fill={ALERT}>
            心跳
          </text>
          <line x1={L} x2={W - R} y1={80} y2={80} stroke={GRID} />
          <line x1={L} x2={W - R} y1={186} y2={186} stroke={BASE} />
          {Array.from({ length: Math.floor(secs / period) + 1 }).map((_, i) => (
            <rect key={i} x={x(i * period + period * 0.4)} y={16} width={x(period * 0.6) - x(0)} height={172} fill={CALM} opacity={0.07} />
          ))}
          <polyline points={lung.join(' ')} fill="none" stroke={CALM} strokeWidth={3} />
          <polyline points={hr.join(' ')} fill="none" stroke={ALERT} strokeWidth={2.5} />
          <g>
            <line x1={W - R + 10} x2={W - R + 10} y1={186 - (66 + amp - 50) * 2.2} y2={186 - (66 - amp - 50) * 2.2} stroke={INK} strokeWidth={1.5} />
            <line x1={W - R + 5} x2={W - R + 15} y1={186 - (66 + amp - 50) * 2.2} y2={186 - (66 + amp - 50) * 2.2} stroke={INK} strokeWidth={1.5} />
            <line x1={W - R + 5} x2={W - R + 15} y1={186 - (66 - amp - 50) * 2.2} y2={186 - (66 - amp - 50) * 2.2} stroke={INK} strokeWidth={1.5} />
            <text x={W - R + 20} y={186 - (66 - 50) * 2.2 - 4} fontSize={11} fontWeight={800} fill={INK}>
              心跳起伏
            </text>
            <text x={W - R + 20} y={186 - (66 - 50) * 2.2 + 12} fontSize={11} fontWeight={800} fill={ALERT}>
              約 {slow ? '18' : '7'} 下／分
            </text>
          </g>
          <text x={x(period * 0.18)} y={14} fontSize={10} fill={INK2} textAnchor="middle">
            吸
          </text>
          <text x={x(period * 0.7)} y={14} fontSize={10} fill={CALM} fontWeight={700} textAnchor="middle">
            吐（藍底）
          </text>
          {[0, 10, 20, 30].map((t) => (
            <text key={t} x={x(t)} y={202} fontSize={10} textAnchor="middle" fill={INK2}>
              {t}s
            </text>
          ))}
        </svg>
      </Wide>
      <p className="text-[13px] text-slate-600 dark:text-slate-300">
        吸氣時迷走神經「放手」心跳變快，吐氣時「踩煞車」心跳變慢。呼吸放慢到每分鐘約 6 次，這個起伏和血壓反射共振，變得最大——心率變異度高代表神經系統彈性好。
      </p>
    </div>
  );
};

// ── 6. 呼吸頻率光譜 ────────────────────────────────────────────────────────

export const BreathSpectrumFigure: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const W = 520;
  const H = 196;
  const L = 18;
  const R = 18;
  const axisY = 112;
  const lx = (r: number) => L + ((W - L - R) * Math.log(r / 2.5)) / Math.log(140 / 2.5);
  // Sorted by rate and dealt into three label rows so neighbours never collide.
  const items = [...BREATH_SPECTRUM].sort((a, b) => a.rate - b.rate);
  const rowY = [22, 48, 74];
  return (
    <div className="space-y-2">
      <Wide>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[500px] h-auto"
          role="img"
          aria-label="呼吸頻率光譜：每分鐘 3 到 6 次為平靜型（4-7-8、吐納、共振呼吸），12 到 20 次為平常，24 次以上的過度換氣與每分鐘 60 到 120 次的卡帕拉巴提為激發型"
        >
          <defs>
            <linearGradient id="mb-spectrum" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor={CALM} />
              <stop offset="45%" stopColor={BASE} />
              <stop offset="100%" stopColor={ALERT} />
            </linearGradient>
          </defs>
          <rect x={L} y={axisY - 7} width={W - L - R} height={14} rx={7} fill="url(#mb-spectrum)" />
          {[3, 6, 12, 20, 60, 120].map((r) => (
            <g key={r}>
              <line x1={lx(r)} x2={lx(r)} y1={axisY + 8} y2={axisY + 13} stroke={INK2} />
              <text x={lx(r)} y={axisY + 25} fontSize={10} textAnchor="middle" fill={INK2}>
                {r}
              </text>
            </g>
          ))}
          <text x={W / 2} y={axisY + 40} fontSize={10} textAnchor="middle" fill={INK2}>
            每分鐘呼吸次數（對數刻度）
          </text>
          <text x={L} y={axisY + 62} fontSize={11.5} fontWeight={800} fill={CALM}>
            ◀ 煞車：平靜、助眠
          </text>
          <text x={W - R} y={axisY + 62} fontSize={11.5} fontWeight={800} fill={ALERT} textAnchor="end">
            油門：提神、激發 ▶
          </text>
          {items.map((b, i) => {
            const cx = lx(b.rate);
            const ty = rowY[i % 3];
            const anchor = cx < 90 ? 'start' : cx > W - 110 ? 'end' : 'middle';
            const tx = anchor === 'start' ? cx - 6 : anchor === 'end' ? cx + 6 : cx;
            const label = `${b.name}：約 ${b.rate} 次／分（${b.note}）`;
            const col = b.effect === 'calm' ? CALM : b.effect === 'alert' ? ALERT : INK2;
            const on = hover === label;
            return (
              <g
                key={b.name}
                tabIndex={0}
                onMouseEnter={() => setHover(label)}
                onFocus={() => setHover(label)}
                onMouseLeave={() => setHover(null)}
                onBlur={() => setHover(null)}
                style={{ outline: 'none' }}
              >
                <line x1={cx} x2={cx} y1={ty + 5} y2={axisY - 8} stroke={col} strokeWidth={on ? 2.5 : 1.5} strokeDasharray={on ? undefined : '2 2'} />
                <circle cx={cx} cy={axisY} r={on ? 7 : 5} fill="var(--viz-surface)" stroke={col} strokeWidth={2.5} />
                <text x={tx} y={ty} fontSize={10.5} fontWeight={700} textAnchor={anchor} fill={on ? col : INK}>
                  {b.name}
                </text>
                <title>{label}</title>
              </g>
            );
          })}
        </svg>
      </Wide>
      <Hint text={hover} fallback="移到（或 Tab 到）任一點看說明。" />
    </div>
  );
};

// ── 7. 卡帕拉巴提波形 vs 一般呼吸 ─────────────────────────────────────────

export const KapalaWaveFigure: React.FC = () => {
  const W = 520;
  const H = 230;
  const L = 70;
  const R = 10;
  const secs = 8;
  const x = (t: number) => L + ((W - L - R) * t) / secs;
  const normal: string[] = [];
  const kap: string[] = [];
  for (let t = 0; t <= secs; t += 0.02) {
    const ph = (t % 4) / 4;
    const v = ph < 0.4 ? Math.sin((ph / 0.4) * (Math.PI / 2)) : Math.cos(((ph - 0.4) / 0.6) * (Math.PI / 2));
    normal.push(`${x(t).toFixed(1)},${(90 - v * 50).toFixed(1)}`);
    // Kapalabhati at 1/s: quick active exhale (0.3 s) then passive recoil (0.7 s), small volume around a mid baseline
    const p = t % 1;
    const k = p < 0.3 ? 1 - p / 0.3 : 1 - Math.exp(-(p - 0.3) / 0.18);
    kap.push(`${x(t).toFixed(1)},${(200 - (0.35 + k * 0.4) * 50).toFixed(1)}`);
  }
  return (
    <Wide>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full min-w-[500px] h-auto"
        role="img"
        aria-label="一般呼吸是平滑緩慢的波，每 4 秒一次；卡帕拉巴提是每秒一次的鋸齒波：主動快速吐氣、被動回彈吸氣，換氣量小但頻率高"
      >
        <text x={L - 8} y={66} textAnchor="end" fontSize={11} fontWeight={700} fill={CALM}>
          一般呼吸
        </text>
        <text x={L - 8} y={80} textAnchor="end" fontSize={9.5} fill={INK2}>
          15 次／分
        </text>
        <text x={L - 8} y={176} textAnchor="end" fontSize={11} fontWeight={700} fill={ALERT}>
          卡帕拉巴提
        </text>
        <text x={L - 8} y={190} textAnchor="end" fontSize={9.5} fill={INK2}>
          60 次／分
        </text>
        <line x1={L} x2={W - R} y1={92} y2={92} stroke={GRID} />
        <line x1={L} x2={W - R} y1={202} y2={202} stroke={GRID} />
        <polyline points={normal.join(' ')} fill="none" stroke={CALM} strokeWidth={3} />
        <polyline points={kap.join(' ')} fill="none" stroke={ALERT} strokeWidth={2.5} />
        {/* annotations on first kapalabhati cycle */}
        <line x1={x(1)} x2={x(1.3)} y1={156} y2={156} stroke={INK} strokeWidth={1.5} />
        <text x={x(1.15)} y={150} fontSize={10} textAnchor="middle" fill={INK} fontWeight={700}>
          主動吐 0.3s
        </text>
        <line x1={x(2.3)} x2={x(3)} y1={156} y2={156} stroke={INK2} strokeWidth={1.5} strokeDasharray="3 2" />
        <text x={x(2.65)} y={150} fontSize={10} textAnchor="middle" fill={INK2}>
          被動吸回彈
        </text>
        {[0, 2, 4, 6, 8].map((t) => (
          <text key={t} x={x(t)} y={222} fontSize={10} textAnchor="middle" fill={INK2}>
            {t}s
          </text>
        ))}
      </svg>
    </Wide>
  );
};

/** Side-view seated figure: the abdominal pump of one Kapalabhati stroke (exhale vs passive inhale). */
export const AbdominalPumpFigure: React.FC = () => (
  <Wide>
    <svg
      viewBox="0 0 520 250"
      className="w-full min-w-[500px] h-auto"
      role="img"
      aria-label="腹部幫浦：左圖主動吐氣時，下腹快速內收、橫膈被推高、肺縮小，氣從鼻子噴出；右圖被動吸氣時，腹肌放鬆、腹部回彈、橫膈下降、空氣自然流入。兩圖胸口與肩膀都保持不動"
    >
      <defs>
        <Arrow id="mb-pump-a" color={ALERT} />
        <Arrow id="mb-pump-c" color={CALM} />
      </defs>
      {[0, 1].map((i) => {
        const exhale = i === 0;
        const col = exhale ? ALERT : CALM;
        const belly = exhale ? 0 : 16; // how far the lower belly sits forward
        const dia = exhale ? 118 : 136; // diaphragm dome apex
        return (
          <g key={i} transform={`translate(${i * 262},0)`}>
            <rect x={4} y={4} width={250} height={240} rx={14} fill={col} opacity={0.06} />
            <text x={129} y={26} textAnchor="middle" fontSize={13.5} fontWeight={800} fill={col}>
              {exhale ? '① 主動吐氣（約 0.3 秒）' : '② 被動吸氣（放鬆回彈）'}
            </text>
            {/* seat */}
            <rect x={52} y={204} width={96} height={8} rx={3} fill="var(--viz-baseline)" />
            {/* thigh */}
            <path d="M70 196 L150 196 L150 208 L70 208 Z" fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.2} />
            {/* torso: straight back, chest, then belly that moves */}
            <path
              d={`M70 74 L66 200 L${112 + belly} 200 Q${124 + belly} 178 ${116 + belly * 0.7} 150 Q108 126 112 104 Q114 84 98 74 Z`}
              fill="var(--anat-skin)"
              stroke="var(--anat-figure)"
              strokeWidth={1.5}
            />
            {/* neck + head facing right, with nose */}
            <rect x={80} y={62} width={14} height={16} fill="var(--anat-skin)" />
            <circle cx={88} cy={46} r={19} fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.5} />
            <path d="M106 44 L113 50 L106 52" fill="var(--anat-skin)" stroke="var(--anat-figure)" strokeWidth={1.2} />
            {/* lung */}
            <ellipse cx={89} cy={exhale ? 100 : 104} rx={exhale ? 13 : 16} ry={exhale ? 17 : 23} fill={CALM} opacity={0.4} />
            {/* diaphragm */}
            <path d={`M70 ${dia + 12} Q90 ${dia - 8} 110 ${dia + 12}`} fill="none" stroke="var(--anat-hit)" strokeWidth={3} strokeLinecap="round" />
            <line x1={90} y1={exhale ? dia + 20 : dia - 12} x2={90} y2={exhale ? dia + 4 : dia + 4} stroke="var(--anat-hit)" strokeWidth={2} markerEnd="url(#mb-pump-a)" />
            {/* chest is still */}
            <text x={150} y={92} fontSize={10.5} fill={INK2}>
              胸口、肩膀不動
            </text>
            <line x1={146} y1={89} x2={114} y2={92} stroke={INK2} strokeWidth={1} strokeDasharray="2 2" />
            {/* diaphragm label */}
            <text x={150} y={dia + 4} fontSize={10.5} fontWeight={700} fill={INK}>
              橫膈 {exhale ? '↑ 被推高' : '↓ 回落'}
            </text>
            <line x1={146} y1={dia + 1} x2={110} y2={dia + 8} stroke={INK2} strokeWidth={1} strokeDasharray="2 2" />
            {/* belly arrow */}
            {exhale ? (
              <line x1={176} y1={172} x2={130} y2={172} stroke={ALERT} strokeWidth={3.5} markerEnd="url(#mb-pump-a)" />
            ) : (
              <line x1={134} y1={172} x2={178} y2={172} stroke={CALM} strokeWidth={2.5} strokeDasharray="5 3" markerEnd="url(#mb-pump-c)" />
            )}
            <text x={182} y={176} fontSize={11} fontWeight={800} fill={col}>
              {exhale ? '下腹內收' : '腹部回彈'}
            </text>
            {/* nose airflow */}
            {exhale ? (
              <line x1={116} y1={50} x2={160} y2={42} stroke={ALERT} strokeWidth={3.5} markerEnd="url(#mb-pump-a)" />
            ) : (
              <line x1={162} y1={42} x2={118} y2={50} stroke={CALM} strokeWidth={2.5} strokeDasharray="5 3" markerEnd="url(#mb-pump-c)" />
            )}
            <text x={166} y={46} fontSize={11} fontWeight={700} fill={INK}>
              {exhale ? '鼻子「哼」出' : '空氣自然流入'}
            </text>
            <text x={129} y={234} textAnchor="middle" fontSize={10.5} fill={INK2}>
              {exhale ? '用力：只有下腹快速一收' : '不用力：放鬆就好，不刻意吸'}
            </text>
          </g>
        );
      })}
    </svg>
  </Wide>
);

// ── 8. 六字訣輪盤 ─────────────────────────────────────────────────────────

/** Simplified front-view mouth shape for each 六字訣 sound (口型示意). */
const MOUTH: Record<string, { rx: number; ry: number; teeth: boolean; smile: number; round?: boolean }> = {
  噓: { rx: 26, ry: 5, teeth: true, smile: 2 },
  呵: { rx: 20, ry: 13, teeth: false, smile: 0 },
  呼: { rx: 11, ry: 11, teeth: false, smile: 0, round: true },
  呬: { rx: 22, ry: 4, teeth: true, smile: 0 },
  吹: { rx: 24, ry: 6, teeth: false, smile: 1 },
  嘻: { rx: 28, ry: 5, teeth: true, smile: 6 },
};

const MouthGlyph: React.FC<{ sound: string }> = ({ sound }) => {
  const m = MOUTH[sound] ?? MOUTH['噓'];
  const cx = 40;
  const cy = 34;
  const lip = `M${cx - m.rx - 6} ${cy - m.smile} Q${cx} ${cy - m.ry - 9} ${cx + m.rx + 6} ${cy - m.smile} Q${cx} ${cy + m.ry + 11 + m.smile} ${cx - m.rx - 6} ${cy - m.smile} Z`;
  return (
    <svg viewBox="0 0 80 64" className="w-20 h-16 shrink-0" role="img" aria-label={`「${sound}」字口型示意`}>
      <path d={lip} fill="var(--anat-hit)" opacity={0.75} />
      {m.round ? <circle cx={cx} cy={cy} r={m.rx - 3} fill="#3F1212" /> : <ellipse cx={cx} cy={cy} rx={m.rx} ry={m.ry} fill="#3F1212" />}
      {m.teeth && <rect x={cx - m.rx + 4} y={cy - m.ry} width={(m.rx - 4) * 2} height={Math.max(2.5, m.ry * 0.7)} rx={1} fill="#fff" />}
      <path d={`M${cx + m.rx + 10} ${cy} l10 -4 m-10 4 l10 0 m-10 0 l10 4`} stroke={CALM} strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </svg>
  );
};

export const LiuZiJueWheel: React.FC = () => {
  const [sel, setSel] = useState(0);
  const [focus, setFocus] = useState<number | null>(null);
  const cur = LIU_ZI_JUE[sel];
  const cx = 130;
  const cy = 130;
  const r = 92;
  return (
    <div className="grid gap-4 md:grid-cols-[260px_minmax(0,1fr)] items-center">
      <svg viewBox="0 0 260 260" className="w-full max-w-[260px] mx-auto h-auto" role="group" aria-label="六字訣輪盤：點選一個字查看口型與說明">
        <circle cx={cx} cy={cy} r={r + 28} fill="none" stroke={GRID} strokeWidth={1.5} />
        <circle cx={cx} cy={cy} r={44} fill={CALM} opacity={0.12} />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize={13} fontWeight={800} fill={INK}>
          六字訣
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize={10} fill={INK2}>
          延長吐氣
        </text>
        {LIU_ZI_JUE.map((z, i) => {
          const a = (i / LIU_ZI_JUE.length) * Math.PI * 2 - Math.PI / 2;
          const x = cx + r * Math.cos(a);
          const y = cy + r * Math.sin(a);
          const on = i === sel;
          return (
            <g
              key={z.sound}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${z.sound}（${z.pinyin}），傳統對應${z.organ}`}
              onClick={() => setSel(i)}
              onFocus={() => setFocus(i)}
              onBlur={() => setFocus(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSel(i);
                }
              }}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              <line x1={cx + 44 * Math.cos(a)} y1={cy + 44 * Math.sin(a)} x2={x - 26 * Math.cos(a)} y2={y - 26 * Math.sin(a)} stroke={on ? CALM : GRID} strokeWidth={on ? 3 : 1.5} />
              {focus === i && <circle cx={x} cy={y} r={31} fill="none" stroke={INK} strokeWidth={2} strokeDasharray="4 3" />}
              <circle cx={x} cy={y} r={26} fill={on ? CALM : 'var(--viz-surface)'} stroke={CALM} strokeWidth={2} />
              <text x={x} y={y + 2} textAnchor="middle" fontSize={20} fontWeight={800} fill={on ? '#fff' : INK}>
                {z.sound}
              </text>
              <text x={x} y={y + 16} textAnchor="middle" fontSize={9} fill={on ? '#fff' : INK2}>
                {z.pinyin}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-sky-50/60 dark:bg-sky-950/20 p-4 space-y-2" aria-live="polite">
        <div className="flex items-center gap-3">
          <MouthGlyph sound={cur.sound} />
          <p className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            「{cur.sound}」<span className="text-base font-semibold text-slate-500 dark:text-slate-400 ml-1">{cur.pinyin}</span>
          </p>
        </div>
        <p className="text-[14px] text-slate-700 dark:text-slate-200">
          <strong>口型：</strong>
          {cur.mouth}
        </p>
        <p className="text-[14px] text-slate-700 dark:text-slate-200">
          <strong>現代生理角度：</strong>
          {cur.modern}
        </p>
        <p className="text-[13px] text-slate-500 dark:text-slate-400">
          <span className="inline-block rounded bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 text-[11px] font-bold mr-1">傳統理論</span>
          對應：{cur.organ}・{cur.element}（古籍說法，非現代醫學證據）
        </p>
        <p className="text-[12px] text-slate-500 dark:text-slate-400">練法：鼻吸 → 口型就位 → 輕聲或默念字音，緩慢吐氣 6–10 秒 → 自然吸氣。每字 6 次，依序練完六字約 10 分鐘。</p>
      </div>
    </div>
  );
};

// ── 9. 吐納細勻深長階梯 ────────────────────────────────────────────────────

const LADDER = [
  { stage: '第 1 週', inh: 4, exh: 4 },
  { stage: '第 2 週', inh: 4, exh: 6 },
  { stage: '第 3 週', inh: 4, exh: 8 },
  { stage: '第 4 週', inh: 5, exh: 10 },
];

export const TunaLadderFigure: React.FC = () => {
  const W = 520;
  const L = 70;
  const R = 90;
  const rowH = 38;
  const H = LADDER.length * rowH + 34;
  const sx = (s: number) => ((W - L - R) * s) / 15;
  return (
    <Wide>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[500px] h-auto" role="img" aria-label="吐納四週進度：吸 4 吐 4（每分鐘 7.5 次）→ 吸 4 吐 6（6 次）→ 吸 4 吐 8（5 次）→ 吸 5 吐 10（4 次）">
        {[0, 5, 10, 15].map((g) => (
          <g key={g}>
            <line x1={L + sx(g)} x2={L + sx(g)} y1={8} y2={H - 24} stroke={GRID} />
            <text x={L + sx(g)} y={H - 8} textAnchor="middle" fontSize={10} fill={INK2}>
              {g}s
            </text>
          </g>
        ))}
        {LADDER.map((d, i) => {
          const yy = 12 + i * rowH;
          const bpm = (60 / (d.inh + d.exh)).toFixed(1).replace(/\.0$/, '');
          return (
            <g key={d.stage}>
              <text x={L - 8} y={yy + 16} textAnchor="end" fontSize={11.5} fontWeight={700} fill={INK}>
                {d.stage}
              </text>
              <rect x={L} y={yy + 3} width={sx(d.inh)} height={20} rx={4} fill={GOOD} />
              <text x={L + sx(d.inh) / 2} y={yy + 17} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#fff">
                吸 {d.inh}
              </text>
              <rect x={L + sx(d.inh) + 2} y={yy + 3} width={sx(d.exh)} height={20} rx={4} fill={CALM} />
              <text x={L + sx(d.inh) + 2 + sx(d.exh) / 2} y={yy + 17} textAnchor="middle" fontSize={10.5} fontWeight={700} fill="#fff">
                吐 {d.exh}
              </text>
              <text x={L + sx(d.inh + d.exh) + 10} y={yy + 17} fontSize={11.5} fontWeight={800} fill={INK}>
                {bpm} 次／分
              </text>
            </g>
          );
        })}
      </svg>
    </Wide>
  );
};

// ── 10. 注意力循環 ─────────────────────────────────────────────────────────

export const AttentionLoopFigure: React.FC = () => {
  const steps = [
    { t: '① 專注', s: '注意呼吸的感覺', c: CALM },
    { t: '② 走神', s: '想到工作、晚餐…', c: ALERT },
    { t: '③ 覺察', s: '「啊，我走神了」', c: MIND },
    { t: '④ 回來', s: '溫和地帶回呼吸', c: GOOD },
  ];
  const cx = 180;
  const cy = 140;
  const r = 96;
  return (
    <svg viewBox="0 0 360 280" className="w-full max-w-md mx-auto h-auto" role="img" aria-label="正念注意力循環：專注、走神、覺察、回來，四步不斷重複；每一次回來就是一次練習">
      <defs>
        <Arrow id="mb-att-arrow" color={INK2} />
      </defs>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={GRID} strokeWidth={14} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={13} fontWeight={800} fill={INK}>
        每回來一次
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={13} fontWeight={800} fill={GOOD}>
        ＝ 練一下
      </text>
      {steps.map((s, i) => {
        const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        const a2 = ((i + 0.5) / 4) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={s.t}>
            <path
              d={`M${cx + (r + 0) * Math.cos(a + 0.42)} ${cy + r * Math.sin(a + 0.42)} A${r} ${r} 0 0 1 ${cx + r * Math.cos(a2 + 0.36)} ${cy + r * Math.sin(a2 + 0.36)}`}
              fill="none"
              stroke={INK2}
              strokeWidth={2}
              markerEnd="url(#mb-att-arrow)"
            />
            <rect x={x - 54} y={y - 22} width={108} height={44} rx={12} fill="var(--viz-surface)" stroke={s.c} strokeWidth={2.5} />
            <text x={x} y={y - 3} textAnchor="middle" fontSize={13} fontWeight={800} fill={s.c}>
              {s.t}
            </text>
            <text x={x} y={y + 13} textAnchor="middle" fontSize={9.5} fill={INK2}>
              {s.s}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

// ── 11. 冥想證據 dot-and-whisker ──────────────────────────────────────────

export const MindfulEvidenceChart: React.FC = () => {
  const [hover, setHover] = useState<string | null>(null);
  const W = 520;
  const L = 150;
  const R = 20;
  const rowH = 34;
  const H = MINDFUL_EVIDENCE.length * rowH + 44;
  const sx = (v: number) => L + ((W - L - R) * v) / 0.8;
  return (
    <div className="space-y-2">
      <Wide>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full min-w-[500px] h-auto"
          role="img"
          aria-label="效果量與 95% 信賴區間：焦慮 0.38、憂鬱 0.30、疼痛 0.33（Goyal 2014 冥想課程），呼吸法降低壓力 0.35（Fincham 2023）。0.2 為小、0.5 為中等效果"
        >
          <rect x={sx(0.2)} y={6} width={sx(0.5) - sx(0.2)} height={H - 36} fill={GOOD} opacity={0.07} />
          <text x={sx(0.35)} y={H - 32} textAnchor="middle" fontSize={9.5} fill={INK2}>
            小 → 中等效果
          </text>
          {[0, 0.2, 0.4, 0.6, 0.8].map((g) => (
            <g key={g}>
              <line x1={sx(g)} x2={sx(g)} y1={6} y2={H - 40} stroke={g === 0 ? BASE : GRID} />
              <text x={sx(g)} y={H - 16} textAnchor="middle" fontSize={10} fill={INK2}>
                {g.toFixed(1)}
              </text>
            </g>
          ))}
          {MINDFUL_EVIDENCE.map((e, i) => {
            const y = 22 + i * rowH;
            const label = `${e.outcome}：效果量 ${e.es.toFixed(2)}（95% CI ${e.lo.toFixed(2)}–${e.hi.toFixed(2)}），${e.study}`;
            const col = e.study.startsWith('Fincham') ? CALM : MIND;
            return (
              <g
                key={e.outcome}
                tabIndex={0}
                onMouseEnter={() => setHover(label)}
                onFocus={() => setHover(label)}
                onMouseLeave={() => setHover(null)}
                onBlur={() => setHover(null)}
                style={{ outline: 'none' }}
              >
                <text x={L - 10} y={y + 4} textAnchor="end" fontSize={11.5} fontWeight={700} fill={INK}>
                  {e.outcome}
                </text>
                <line x1={sx(e.lo)} x2={sx(e.hi)} y1={y} y2={y} stroke={col} strokeWidth={2.5} strokeLinecap="round" />
                <circle cx={sx(e.es)} cy={y} r={hover === label ? 7 : 5.5} fill={col} />
                <text x={sx(e.hi) + 6} y={y + 4} fontSize={10.5} fontWeight={700} fill={INK}>
                  {e.es.toFixed(2)}
                </text>
                <title>{label}</title>
              </g>
            );
          })}
          <text x={L + (W - L - R) / 2} y={H - 2} textAnchor="middle" fontSize={10} fill={INK2}>
            標準化效果量（越大越好；與對照組相比）
          </text>
        </svg>
      </Wide>
      <Hint text={hover} fallback="紫色：冥想課程（Goyal 2014，47 個 RCT）；藍色：呼吸法（Fincham 2023，12 個 RCT）。" />
    </div>
  );
};

// ── 12. 半夜醒來決策圖 ─────────────────────────────────────────────────────

export const NightWakeFlowFigure: React.FC = () => {
  const box = (x: number, y: number, w: number, h: number, title: string, sub: string, col: string, key: string) => (
    <g key={key}>
      <rect x={x} y={y} width={w} height={h} rx={12} fill="var(--viz-surface)" stroke={col} strokeWidth={2} />
      <text x={x + w / 2} y={y + h / 2 - (sub ? 3 : -4)} textAnchor="middle" fontSize={12.5} fontWeight={800} fill={INK}>
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} textAnchor="middle" fontSize={9.5} fill={INK2}>
          {sub}
        </text>
      )}
    </g>
  );
  return (
    <Wide>
      <svg
        viewBox="0 0 520 330"
        className="w-full min-w-[500px] h-auto"
        role="img"
        aria-label="半夜醒來決策圖：先不看時間；做 10 次延長吐氣；有尿意就去，回來繼續；約 20 分鐘仍清醒就離床到昏暗處做無聊的事，想睡再回床；不要滑手機、吃東西或喝酒"
      >
        <defs>
          <Arrow id="mb-flow-arrow" color={INK2} />
        </defs>
        {box(170, 8, 180, 44, '😶 半夜醒來', '不看時間、不拿手機', ALERT, 'a')}
        <line x1={260} y1={52} x2={260} y2={76} stroke={INK2} strokeWidth={2} markerEnd="url(#mb-flow-arrow)" />
        {box(150, 78, 220, 48, '🌬️ 10 次延長吐氣', '吸 4 吐 6，或默念「噓」字', CALM, 'b')}
        <line x1={260} y1={126} x2={260} y2={150} stroke={INK2} strokeWidth={2} markerEnd="url(#mb-flow-arrow)" />
        {box(150, 152, 220, 48, '🧘 身體掃描', '從腳趾慢慢往上', CALM, 'c')}
        <line x1={260} y1={200} x2={260} y2={222} stroke={INK2} strokeWidth={2} />
        <text x={268} y={216} fontSize={10.5} fill={INK2}>
          約 20 分鐘後？
        </text>
        <line x1={260} y1={222} x2={110} y2={222} stroke={INK2} strokeWidth={2} />
        <line x1={110} y1={222} x2={110} y2={244} stroke={INK2} strokeWidth={2} markerEnd="url(#mb-flow-arrow)" />
        <line x1={260} y1={222} x2={410} y2={222} stroke={INK2} strokeWidth={2} />
        <line x1={410} y1={222} x2={410} y2={244} stroke={INK2} strokeWidth={2} markerEnd="url(#mb-flow-arrow)" />
        {box(20, 246, 180, 52, '😴 睡著了', '很好，什麼都不用做', GOOD, 'd')}
        {box(310, 246, 200, 52, '🛋️ 仍清醒 → 離床', '昏暗處看無聊的書、聽音樂', MIND, 'e')}
        <path d="M510 272 Q516 140 372 100" fill="none" stroke={MIND} strokeWidth={1.5} strokeDasharray="4 3" markerEnd="url(#mb-flow-arrow)" />
        <text x={420} y={150} fontSize={10} fill={MIND} fontWeight={700}>
          想睡再回床
        </text>
        <text x={260} y={322} textAnchor="middle" fontSize={10.5} fill="var(--viz-bad)" fontWeight={700}>
          ✕ 不要：看時鐘計算、滑手機、吃宵夜、喝酒、在床上硬撐
        </text>
      </svg>
    </Wide>
  );
};

// ── 13. CAP-D 輪 ───────────────────────────────────────────────────────────

const CAPD_COLOR: Record<string, string> = { sky: CALM, amber: 'var(--viz-warn)', violet: MIND, emerald: GOOD };

export const CapdWheelFigure: React.FC<{ active?: number }> = ({ active }) => {
  const cx = 160;
  const cy = 160;
  const r = 130;
  const ri = 58;
  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-xs mx-auto h-auto" role="img" aria-label="CAP-D 循環：Check 檢查睡眠日記 → Act 調整上床時間 → Plan 規劃下週 → Do 執行 7 天，再回到 Check">
      {CAPD_STEPS.map((s, i) => {
        const a0 = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / 4) * Math.PI * 2 - Math.PI / 2 - 0.04;
        const p = (rr: number, a: number) => `${cx + rr * Math.cos(a)} ${cy + rr * Math.sin(a)}`;
        const d = `M${p(ri, a0 + 0.04)} L${p(r, a0 + 0.04)} A${r} ${r} 0 0 1 ${p(r, a1)} L${p(ri, a1)} A${ri} ${ri} 0 0 0 ${p(ri, a0 + 0.04)} Z`;
        const am = (a0 + a1) / 2;
        const tx = cx + ((r + ri) / 2) * Math.cos(am);
        const ty = cy + ((r + ri) / 2) * Math.sin(am);
        const on = active === undefined || active === i;
        return (
          <g key={s.step} opacity={on ? 1 : 0.35}>
            <path d={d} fill={CAPD_COLOR[s.color]} opacity={0.9} />
            <text x={tx} y={ty - 4} textAnchor="middle" fontSize={26} fontWeight={900} fill="#fff">
              {s.step}
            </text>
            <text x={tx} y={ty + 16} textAnchor="middle" fontSize={11} fontWeight={700} fill="#fff">
              {s.name.split(' ')[1]}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={ri - 6} fill="var(--viz-surface)" stroke={GRID} strokeWidth={2} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={12} fontWeight={800} fill={INK}>
        睡眠日記
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fontSize={10} fill={INK2}>
        每週一圈 ↻
      </text>
    </svg>
  );
};
