import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, Bell, BellOff, ShieldAlert, ClipboardCheck, Trash2, Wand2 } from 'lucide-react';
import { SCHEDULE_ANCHORS, KAPALA_CONTRA } from '../../../data/mindbodyData';
import { Wide } from './MindBodyFigures';
import { DiaryRow, diaryNight, summarise, titrate, toMin, fmtClock as fmt } from '../../../utils/sleepDiary';

/**
 * Interactive tools for the 睡眠・呼吸・正念 zone. Nothing leaves the reader's browser;
 * the sleep diary is kept in localStorage (wrapped — private windows simply start empty).
 */

const CALM = 'var(--viz-series-1)';
const ALERT = 'var(--viz-series-2)';
const GOOD = 'var(--viz-series-3)';
const MIND = 'var(--fig-series-4)';
const INK = 'var(--viz-ink)';
const INK2 = 'var(--viz-ink-2)';
const GRID = 'var(--viz-grid)';

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
};

/** One soft bell tone with the Web Audio API (no audio files). */
function chime(ctx: AudioContext | null, freq = 528, dur = 1.6) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
  o.connect(g).connect(ctx.destination);
  o.start();
  o.stop(ctx.currentTime + dur);
}

const inputCls =
  'rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-[14px] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500';
const btnCls =
  'inline-flex items-center justify-center gap-1.5 rounded-xl px-3.5 py-2 min-h-[44px] text-[14px] font-semibold border focus:outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-50';

// ── 1. 24 小時作息規劃器 ─────────────────────────────────────────────────

const KIND_COLOR: Record<string, string> = { light: 'var(--viz-warn)', eat: ALERT, move: GOOD, calm: CALM, sleep: MIND };
const KIND_LABEL: Record<string, string> = { light: '光線', eat: '飲食', move: '運動', calm: '放鬆', sleep: '睡眠' };

export const SchedulePlanner: React.FC = () => {
  const [wake, setWake] = useState('07:00');
  const [need, setNeed] = useState(7.5);
  const wakeMin = toMin(wake);
  const bedMin = (wakeMin - Math.round(need * 60) + 1440) % 1440;

  const items = useMemo(
    () =>
      SCHEDULE_ANCHORS.map((a) => {
        const at = a.from === 'wake' ? wakeMin + a.offset : bedMin + a.offset;
        // minutes since wake, used for ordering across midnight
        const sinceWake = (((at - wakeMin) % 1440) + 1440) % 1440;
        return { ...a, at: ((at % 1440) + 1440) % 1440, sinceWake };
      }).sort((p, q) => p.sinceWake - q.sinceWake),
    [wakeMin, bedMin],
  );

  // timeline geometry: one awake day, wake → bed. Markers are numbered (matching the list
  // below) and stacked into lanes so evening items never overprint each other.
  const W = 560;
  const L = 16;
  const R = 16;
  const barY = 92;
  const awake = 1440 - Math.round(need * 60);
  const tx = (sinceWake: number) => L + ((W - L - R) * Math.min(sinceWake, awake)) / awake;
  const lanesEnd: number[] = [];
  const placed = items.map((it, i) => {
    const x = tx(it.sinceWake);
    let lane = lanesEnd.findIndex((end) => x - end >= 22);
    if (lane === -1) {
      lane = lanesEnd.length;
      lanesEnd.push(x);
    } else lanesEnd[lane] = x;
    return { ...it, n: i + 1, x, lane };
  });
  const laneY = (lane: number) => barY - 24 - lane * 22;
  const hourTicks = Array.from({ length: Math.floor(awake / 180) + 1 }, (_, i) => i * 180).filter((m) => awake - m >= 100);

  return (
    <div className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-[13px] font-semibold text-slate-700 dark:text-slate-300">
          我固定幾點起床
          <input type="time" value={wake} onChange={(e) => setWake(e.target.value || '07:00')} className={inputCls} />
        </label>
        <label className="flex flex-col gap-1 text-[13px] font-semibold text-slate-700 dark:text-slate-300 min-w-[200px]">
          我需要的躺床時間：{need} 小時
          <input type="range" min={6} max={9} step={0.25} value={need} onChange={(e) => setNeed(Number(e.target.value))} className="accent-sky-600" aria-valuetext={`${need} 小時`} />
        </label>
        <div className="rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900 px-3 py-2">
          <p className="text-[12px] text-violet-800 dark:text-violet-300">建議上床時間</p>
          <p className="text-2xl font-display font-bold text-violet-950 dark:text-violet-100 tabular-nums">{fmt(bedMin)}</p>
        </div>
      </div>

      <Wide>
        <svg viewBox={`0 0 ${W} 124`} className="w-full min-w-[500px] h-auto" role="img" aria-label={`從 ${wake} 起床到 ${fmt(bedMin)} 上床的作息時間軸，共 ${items.length} 個時間點，詳見下方清單`}>
          <rect x={L} y={barY} width={W - L - R} height={10} rx={5} fill={GRID} />
          <rect x={L} y={barY} width={tx(240) - L} height={10} rx={5} fill="var(--viz-warn)" opacity={0.45} />
          <rect x={tx(awake - 180)} y={barY} width={tx(awake) - tx(awake - 180)} height={10} rx={5} fill={CALM} opacity={0.45} />
          {hourTicks.map((m) => (
            <text key={m} x={tx(m)} y={barY + 26} textAnchor="middle" fontSize={10} fill={INK2}>
              {fmt(wakeMin + m)}
            </text>
          ))}
          <text x={tx(awake)} y={barY + 26} textAnchor="end" fontSize={10} fontWeight={800} fill={MIND}>
            {fmt(bedMin)} 上床
          </text>
          {placed.map((it) => {
            const y = laneY(it.lane);
            return (
              <g key={it.id}>
                <title>{`${it.n}. ${fmt(it.at)} ${it.label}`}</title>
                <line x1={it.x} x2={it.x} y1={y + 9} y2={barY + 5} stroke={KIND_COLOR[it.kind]} strokeWidth={1.5} />
                <circle cx={it.x} cy={barY + 5} r={3.5} fill={KIND_COLOR[it.kind]} />
                <circle cx={it.x} cy={y} r={9} fill={KIND_COLOR[it.kind]} stroke="var(--viz-surface)" strokeWidth={1.5} />
                <text x={it.x} y={y + 3.5} textAnchor="middle" fontSize={10} fontWeight={800} fill="#fff">
                  {it.n}
                </text>
              </g>
            );
          })}
        </svg>
      </Wide>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-slate-600 dark:text-slate-300">
        {Object.entries(KIND_LABEL).map(([k, v]) => (
          <span key={k}>
            <span className="inline-block w-2.5 h-2.5 rounded-full align-middle mr-1" style={{ background: KIND_COLOR[k] }} aria-hidden="true" />
            {v}
          </span>
        ))}
        <span>　黃底：起床後 4 小時多曬光　藍底：睡前 3 小時調暗</span>
      </div>

      <ol className="divide-y divide-slate-100 dark:divide-slate-800 rounded-xl border border-slate-200 dark:border-slate-800">
        {items.map((it, i) => (
          <li key={it.id} className="flex gap-3 px-3 py-2.5">
            <span
              className="w-6 h-6 mt-0.5 shrink-0 rounded-full text-white text-[12px] font-bold inline-flex items-center justify-center"
              style={{ background: KIND_COLOR[it.kind] }}
              aria-hidden="true"
            >
              {i + 1}
            </span>
            <span className="w-12 shrink-0 font-display font-bold tabular-nums text-slate-900 dark:text-white">{fmt(it.at)}</span>
            <span className="flex-1 min-w-0">
              <span className="block text-[14px] font-semibold text-slate-900 dark:text-white">
                {it.label}
                <span className="ml-1.5 text-[11px] font-medium text-slate-500 dark:text-slate-400">［{KIND_LABEL[it.kind]}］</span>
              </span>
              <span className="block text-[13px] text-slate-600 dark:text-slate-400">{it.detail}</span>
            </span>
            <span className="hidden sm:block shrink-0 text-[11px] text-slate-400 dark:text-slate-500 self-center">{it.source}</span>
          </li>
        ))}
      </ol>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">輪班工作者：以「這次起床時間」為準套用即可；夜班下班回家請戴墨鏡減少晨光，臥室全黑。</p>
    </div>
  );
};

// ── 2. 呼吸引導器 ───────────────────────────────────────────────────────────

interface Phase {
  name: string;
  secs: number;
  /** target circle scale 0..1 at the end of this phase */
  to: number;
}
interface PacerMode {
  id: string;
  label: string;
  hint: string;
  phases: Phase[];
  /** for kapalabhati: rounds of strokes */
  kapala?: { strokes: number; rate: number; rest: number; rounds: number };
  calm: boolean;
}

const MODES: PacerMode[] = [
  {
    id: 'resonance',
    label: '共振呼吸 4-6',
    hint: '吸 4 秒、吐 6 秒，每分鐘 6 次：最通用的放鬆與睡前練習。',
    phases: [
      { name: '吸氣', secs: 4, to: 1 },
      { name: '吐氣', secs: 6, to: 0 },
    ],
    calm: true,
  },
  {
    id: 'sigh',
    label: '生理嘆息',
    hint: '鼻子吸到八分 → 再補吸一小口 → 嘴巴慢慢長長吐掉。壓力當下 1–5 分鐘。',
    phases: [
      { name: '鼻吸', secs: 2.5, to: 0.8 },
      { name: '再補吸一口', secs: 1, to: 1 },
      { name: '嘴巴長吐', secs: 6.5, to: 0 },
    ],
    calm: true,
  },
  {
    id: 'tuna',
    label: '吐納（細勻深長）',
    hint: '吸 5 秒腹部鼓起、吐 10 秒腹部內收，可默念「噓」字。每分鐘 4 次，不舒服就改回 4-6。',
    phases: [
      { name: '細細吸（腹部鼓起）', secs: 5, to: 1 },
      { name: '長長吐（默念「噓」）', secs: 10, to: 0 },
    ],
    calm: true,
  },
  {
    id: '478',
    label: '4-7-8',
    hint: '吸 4、停 7、吐 8。閉氣不舒服可把「停」縮短到 2–3 秒。',
    phases: [
      { name: '吸氣', secs: 4, to: 1 },
      { name: '停住', secs: 7, to: 1 },
      { name: '吐氣', secs: 8, to: 0 },
    ],
    calm: true,
  },
  {
    id: 'box',
    label: '箱式 4-4-4-4',
    hint: '吸 4、停 4、吐 4、停 4。上台、考試前穩定專注。',
    phases: [
      { name: '吸氣', secs: 4, to: 1 },
      { name: '停住', secs: 4, to: 1 },
      { name: '吐氣', secs: 4, to: 0 },
      { name: '停住', secs: 4, to: 0 },
    ],
    calm: true,
  },
  {
    id: 'kapala',
    label: '卡帕拉巴提（入門）',
    hint: '每秒 1 下快速腹部內收「哼」出氣，吸氣自然回彈；20 下一輪、休息 45 秒、共 3 輪。僅限早上／白天。',
    phases: [],
    kapala: { strokes: 20, rate: 1, rest: 45, rounds: 3 },
    calm: false,
  },
];

export const BreathPacer: React.FC<{ initial?: string }> = ({ initial = 'resonance' }) => {
  const reduced = usePrefersReducedMotion();
  const [modeId, setModeId] = useState(initial);
  const [minutes, setMinutes] = useState(5);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds
  const [sound, setSound] = useState(false);
  const [cleared, setCleared] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const lastPhaseRef = useRef<string>('');
  const mode = MODES.find((m) => m.id === modeId) ?? MODES[0];

  // Kapalabhati session length is defined by rounds, not minutes.
  const kap = mode.kapala;
  const total = kap ? kap.rounds * (kap.strokes / kap.rate) + (kap.rounds - 1) * kap.rest : minutes * 60;

  useEffect(() => {
    if (!running) return;
    const start = performance.now() - elapsed * 1000;
    const id = window.setInterval(() => {
      const e = (performance.now() - start) / 1000;
      if (e >= total) {
        setElapsed(total);
        setRunning(false);
        if (sound) chime(audioRef.current, 396, 2.4);
      } else setElapsed(e);
    }, 50);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, total]);

  // current phase + circle scale
  let phaseName = '準備';
  let scale = 0.15;
  let remain = 0;
  let cycles = 0;
  let detail = '';
  if (kap) {
    const roundLen = kap.strokes / kap.rate;
    const block = roundLen + kap.rest;
    const r = Math.min(kap.rounds - 1, Math.floor(elapsed / block));
    const inBlock = elapsed - r * block;
    if (inBlock < roundLen) {
      const stroke = Math.floor(inBlock * kap.rate);
      const p = (inBlock * kap.rate) % 1;
      phaseName = p < 0.3 ? '哼！（腹部內收）' : '放鬆回彈';
      scale = p < 0.3 ? 0.45 - p : 0.15 + Math.min(1, (p - 0.3) / 0.4) * 0.3;
      detail = `第 ${r + 1}/${kap.rounds} 輪・第 ${Math.min(kap.strokes, stroke + 1)}/${kap.strokes} 下`;
      remain = roundLen - inBlock;
      cycles = stroke;
    } else {
      phaseName = '自然呼吸・休息';
      scale = 0.5;
      remain = block - inBlock;
      detail = `第 ${r + 1} 輪完成；觀察身體，頭暈就結束`;
    }
  } else {
    const cycle = mode.phases.reduce((s, p) => s + p.secs, 0);
    cycles = Math.floor(elapsed / cycle);
    let t = elapsed % cycle;
    let from = mode.phases[mode.phases.length - 1].to;
    for (const p of mode.phases) {
      if (t < p.secs) {
        phaseName = p.name;
        const k = t / p.secs;
        const ease = 0.5 - Math.cos(k * Math.PI) / 2;
        scale = 0.15 + (from + (p.to - from) * ease) * 0.85;
        remain = p.secs - t;
        break;
      }
      t -= p.secs;
      from = p.to;
    }
    detail = `每分鐘 ${(60 / cycle).toFixed(1).replace(/\.0$/, '')} 次・已完成 ${cycles} 個循環`;
  }
  if (!running && elapsed === 0) {
    phaseName = '按「開始」';
    scale = 0.3;
  }
  if (!running && elapsed >= total && total > 0) {
    phaseName = '完成 ✓';
    scale = 0.3;
  }

  // a soft tick when the phase changes (calm modes only — kapalabhati would be a metronome)
  useEffect(() => {
    if (!running || !sound || kap) return;
    if (phaseName !== lastPhaseRef.current) {
      lastPhaseRef.current = phaseName;
      chime(audioRef.current, phaseName.includes('吸') ? 528 : 396, 0.9);
    }
  }, [phaseName, running, sound, kap]);

  const toggle = () => {
    if (sound && !audioRef.current && typeof window !== 'undefined') {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) audioRef.current = new Ctor();
    }
    if (elapsed >= total) setElapsed(0);
    setRunning((r) => !r);
  };
  const reset = () => {
    setRunning(false);
    setElapsed(0);
  };
  const pick = (id: string) => {
    setModeId(id);
    reset();
  };

  const locked = !!kap && !cleared;
  const color = mode.calm ? CALM : ALERT;
  const pct = total > 0 ? Math.min(100, (elapsed / total) * 100) : 0;
  const hour = new Date().getHours();
  const lateForKapala = !!kap && (hour >= 20 || hour < 4);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="呼吸模式">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            role="radio"
            aria-checked={m.id === modeId}
            onClick={() => pick(m.id)}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold min-h-[36px] ${
              m.id === modeId
                ? m.calm
                  ? 'border-sky-500 bg-sky-50 text-sky-900 dark:bg-sky-950/40 dark:text-sky-200'
                  : 'border-orange-500 bg-orange-50 text-orange-900 dark:bg-orange-950/40 dark:text-orange-200'
                : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
            }`}
          >
            {m.calm ? '🌙 ' : '🔥 '}
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-[14px] text-slate-700 dark:text-slate-300">{mode.hint}</p>

      {kap && (
        <div className="rounded-xl border border-orange-300 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/30 p-3 space-y-2">
          <p className="flex items-center gap-1.5 text-[14px] font-bold text-orange-950 dark:text-orange-100">
            <ShieldAlert className="w-4 h-4" aria-hidden="true" />
            開始前安全確認：有以下任一項，請改練 🌙 平靜型呼吸
          </p>
          <ul className="grid gap-1 sm:grid-cols-2 text-[13px] text-orange-950 dark:text-orange-100">
            {KAPALA_CONTRA.filter((c) => c.level === 'bad').map((c) => (
              <li key={c.who}>・{c.who}</li>
            ))}
            <li>・恐慌症或焦慮發作期、剛吃飽</li>
          </ul>
          <label className="flex items-start gap-2 text-[14px] font-semibold text-orange-950 dark:text-orange-100">
            <input type="checkbox" checked={cleared} onChange={(e) => setCleared(e.target.checked)} className="mt-1 w-4 h-4 accent-orange-600" />
            我確認以上都沒有，且頭暈、手麻、胸悶時會立刻停止
          </label>
          {lateForKapala && <p className="text-[13px] font-semibold text-orange-900 dark:text-orange-200">⏰ 現在已接近睡覺時間：卡帕拉巴提會提神，今晚建議改練共振呼吸或吐納。</p>}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-[220px_minmax(0,1fr)] items-center">
        <div className="relative mx-auto w-[200px] h-[200px]" aria-hidden="true">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx={100} cy={100} r={92} fill="none" stroke={GRID} strokeWidth={6} />
            <circle cx={100} cy={100} r={92} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round" strokeDasharray={`${(pct / 100) * 578} 578`} transform="rotate(-90 100 100)" />
            <circle cx={100} cy={100} r={reduced ? 50 : 18 + 66 * scale} fill={color} opacity={0.22} />
            <circle cx={100} cy={100} r={reduced ? 40 : 12 + 56 * scale} fill={color} opacity={0.5} />
          </svg>
        </div>
        <div className="space-y-2 text-center sm:text-left">
          <p className="text-2xl font-display font-bold text-slate-900 dark:text-white" aria-hidden={running && !!kap}>
            {phaseName}
          </p>
          {/* Screen readers: calm modes announce each phase (every 4–10 s); kapalabhati strokes come twice a
              second, so only the round / rest transitions are announced. */}
          <p className="sr-only" aria-live="polite">
            {kap ? (running ? (phaseName.startsWith('自然呼吸') ? `休息。${detail}` : detail.replace(/・第 \d+\/\d+ 下/, '')) : phaseName) : phaseName}
          </p>
          {running && (
            <p className="text-[15px] tabular-nums text-slate-600 dark:text-slate-300">
              {remain > 0 ? `${Math.ceil(remain)} 秒` : ''}　{detail}
            </p>
          )}
          <p className="text-[13px] tabular-nums text-slate-500 dark:text-slate-400">
            {Math.floor(elapsed / 60)}:{String(Math.floor(elapsed % 60)).padStart(2, '0')} / {Math.floor(total / 60)}:{String(Math.round(total % 60)).padStart(2, '0')}
          </p>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              type="button"
              onClick={toggle}
              disabled={locked}
              className={`${btnCls} ${mode.calm ? 'bg-sky-600 border-sky-600 text-white hover:bg-sky-700' : 'bg-orange-600 border-orange-600 text-white hover:bg-orange-700'}`}
            >
              {running ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
              {running ? '暫停' : elapsed > 0 && elapsed < total ? '繼續' : '開始'}
            </button>
            <button type="button" onClick={reset} className={`${btnCls} border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}>
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              重來
            </button>
            <button type="button" onClick={() => setSound((s) => !s)} aria-pressed={sound} className={`${btnCls} border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}>
              {sound ? <Bell className="w-4 h-4" aria-hidden="true" /> : <BellOff className="w-4 h-4" aria-hidden="true" />}
              {sound ? '提示音開' : '提示音關'}
            </button>
          </div>
          {!kap && (
            <label className="flex items-center gap-2 justify-center sm:justify-start text-[13px] text-slate-600 dark:text-slate-300">
              時間
              <select
                value={minutes}
                onChange={(e) => {
                  setMinutes(Number(e.target.value));
                  reset();
                }}
                className={inputCls}
              >
                {[1, 3, 5, 10, 20].map((m) => (
                  <option key={m} value={m}>
                    {m} 分鐘
                  </option>
                ))}
              </select>
            </label>
          )}
          {locked && <p className="text-[13px] font-semibold text-orange-800 dark:text-orange-300">請先完成上方安全確認。</p>}
        </div>
      </div>
    </div>
  );
};

// ── 3. 正念計時器（含身體掃描引導） ─────────────────────────────────────────

const BODY_SCAN = ['雙腳腳趾、腳底', '腳踝、小腿', '膝蓋、大腿', '臀部、骨盆', '下腹、腰背', '胸口、上背、呼吸起伏', '雙手、手臂', '肩膀、脖子', '下巴、臉頰、眼周', '頭頂，再擴展到全身'];
const GUIDES: Record<string, { label: string; cue: (k: number) => string }> = {
  breath: {
    label: '呼吸覺察',
    cue: (k) => (k < 0.1 ? '找一個舒服的姿勢，輕輕閉眼或垂下視線。' : k > 0.92 ? '慢慢把注意力擴展到整個房間，準備睜眼。' : '注意鼻孔或腹部的呼吸感覺。走神了？標記「想法」，回到呼吸。'),
  },
  scan: { label: '身體掃描', cue: (k) => `把注意力放在：${BODY_SCAN[Math.min(BODY_SCAN.length - 1, Math.floor(k * BODY_SCAN.length))]}。只觀察，不需要改變。` },
  space: {
    label: '三分鐘呼吸空間',
    cue: (k) => (k < 1 / 3 ? '① 覺察：此刻有什麼想法、情緒、身體感覺？' : k < 2 / 3 ? '② 聚焦：只注意呼吸，一吸一吐。' : '③ 擴展：把覺察擴展到整個身體、姿勢與臉部表情。'),
  },
  kind: {
    label: '慈心',
    cue: (k) =>
      k < 0.25
        ? '默念：願我平安、願我健康、願我自在。'
        : k < 0.5
          ? '想一位你在乎的人：願你平安、願你健康、願你自在。'
          : k < 0.75
            ? '想一位不熟的人：願你平安、願你健康、願你自在。'
            : '擴展到所有人：願大家平安、健康、自在。',
  },
};

export const MeditationTimer: React.FC = () => {
  const [guide, setGuide] = useState<keyof typeof GUIDES>('breath');
  const [minutes, setMinutes] = useState(5);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [bell, setBell] = useState(true);
  const audioRef = useRef<AudioContext | null>(null);
  const total = (guide === 'space' ? 3 : minutes) * 60;

  useEffect(() => {
    if (!running) return;
    const start = performance.now() - elapsed * 1000;
    const id = window.setInterval(() => {
      const e = (performance.now() - start) / 1000;
      if (e >= total) {
        setElapsed(total);
        setRunning(false);
        if (bell) {
          chime(audioRef.current, 432, 3);
          window.setTimeout(() => chime(audioRef.current, 432, 3), 900);
        }
      } else setElapsed(e);
    }, 250);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, total]);

  const start = () => {
    if (bell && !audioRef.current && typeof window !== 'undefined') {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (Ctor) audioRef.current = new Ctor();
    }
    if (!running && elapsed === 0 && bell) chime(audioRef.current, 432, 3);
    if (elapsed >= total) setElapsed(0);
    setRunning((r) => !r);
  };

  const k = total ? elapsed / total : 0;
  const left = Math.max(0, total - elapsed);
  const done = elapsed >= total && total > 0;

  return (
    <div className="rounded-2xl border border-violet-200 dark:border-violet-900 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="練習類型">
        {(Object.keys(GUIDES) as (keyof typeof GUIDES)[]).map((g) => (
          <button
            key={g}
            type="button"
            role="radio"
            aria-checked={guide === g}
            onClick={() => {
              setGuide(g);
              setRunning(false);
              setElapsed(0);
            }}
            className={`rounded-full border px-3 py-1.5 text-[13px] font-semibold min-h-[36px] ${guide === g ? 'border-violet-500 bg-violet-50 text-violet-900 dark:bg-violet-950/40 dark:text-violet-200' : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'}`}
          >
            {GUIDES[g].label}
          </button>
        ))}
      </div>
      <div className="rounded-xl bg-violet-50/70 dark:bg-violet-950/20 p-4 min-h-[88px]" aria-live="polite">
        <p className="text-[12px] font-semibold text-violet-700 dark:text-violet-300">{done ? '練習結束' : running ? '現在' : '開始後會依時間給你提示'}</p>
        <p className="text-[16px] leading-relaxed text-slate-900 dark:text-white">{done ? '慢慢動動手指腳趾，帶著這份覺察回到生活。今天練習完成 ✓' : GUIDES[guide].cue(k)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-3xl font-display font-bold tabular-nums text-slate-900 dark:text-white w-24">
          {Math.floor(left / 60)}:{String(Math.floor(left % 60)).padStart(2, '0')}
        </p>
        <button type="button" onClick={start} className={`${btnCls} bg-violet-600 border-violet-600 text-white hover:bg-violet-700`}>
          {running ? <Pause className="w-4 h-4" aria-hidden="true" /> : <Play className="w-4 h-4" aria-hidden="true" />}
          {running ? '暫停' : elapsed > 0 && !done ? '繼續' : '開始'}
        </button>
        <button
          type="button"
          onClick={() => {
            setRunning(false);
            setElapsed(0);
          }}
          className={`${btnCls} border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          重來
        </button>
        <button type="button" onClick={() => setBell((b) => !b)} aria-pressed={bell} className={`${btnCls} border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}>
          {bell ? <Bell className="w-4 h-4" aria-hidden="true" /> : <BellOff className="w-4 h-4" aria-hidden="true" />}
          {bell ? '鐘聲開' : '鐘聲關'}
        </button>
        {guide !== 'space' && (
          <label className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-300">
            時間
            <select
              value={minutes}
              onChange={(e) => {
                setMinutes(Number(e.target.value));
                setRunning(false);
                setElapsed(0);
              }}
              className={inputCls}
            >
              {[3, 5, 10, 15, 20].map((m) => (
                <option key={m} value={m}>
                  {m} 分鐘
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div
        className="h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(k * 100)}
        aria-label="練習進度"
      >
        <div className="h-full transition-all" style={{ width: `${k * 100}%`, background: MIND }} />
      </div>
    </div>
  );
};

// ── 4. CAP-D 睡眠日記 ───────────────────────────────────────────────────────

const STORE_KEY = 'salud.mindbody.diary.v1';
const EMPTY: DiaryRow = { bed: '', out: '', latency: 0, waso: 0 };
const EXAMPLE: DiaryRow[] = [
  { bed: '23:00', out: '07:00', latency: 45, waso: 40 },
  { bed: '22:45', out: '07:10', latency: 60, waso: 30 },
  { bed: '23:30', out: '07:00', latency: 30, waso: 50 },
  { bed: '23:00', out: '06:50', latency: 50, waso: 35 },
  { bed: '22:30', out: '07:00', latency: 70, waso: 45 },
  { bed: '00:00', out: '08:30', latency: 30, waso: 40 },
  { bed: '23:30', out: '09:00', latency: 40, waso: 30 },
];

const readDiary = (): DiaryRow[] => {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (!raw) return Array.from({ length: 7 }, () => ({ ...EMPTY }));
    const rows = JSON.parse(raw) as DiaryRow[];
    return Array.from({ length: 7 }, (_, i) => ({ ...EMPTY, ...(rows[i] ?? {}) }));
  } catch {
    return Array.from({ length: 7 }, () => ({ ...EMPTY }));
  }
};

export const CapdSleepDiary: React.FC = () => {
  const [rows, setRows] = useState<DiaryRow[]>(() => (typeof window === 'undefined' ? Array.from({ length: 7 }, () => ({ ...EMPTY })) : readDiary()));
  const [wakeGoal, setWakeGoal] = useState('07:00');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(rows));
    } catch {
      /* private mode: diary simply is not remembered */
    }
  }, [rows]);

  const set = (i: number, patch: Partial<DiaryRow>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const nights = rows.map(diaryNight);
  const avg = summarise(nights);
  const valid = nights.filter(Boolean);
  const plan = avg && avg.n >= 5 ? titrate(avg.tst, avg.se, avg.tib) : null;
  const nextBed = plan ? fmt(toMin(wakeGoal) - plan.nextTib) : null;
  const hm = (m: number) => `${Math.floor(m / 60)} 小時 ${Math.round(m % 60)} 分`;
  const W = 520;
  const barW = 50;

  return (
    <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[15px] font-bold text-slate-900 dark:text-white">
          <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          Check：過去 7 晚睡眠日記（每天早上 1 分鐘）
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRows(EXAMPLE.map((r) => ({ ...r })))}
            className={`${btnCls} min-h-[36px] py-1 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}
          >
            <Wand2 className="w-4 h-4" aria-hidden="true" />
            填入範例
          </button>
          <button
            type="button"
            onClick={() => setRows(Array.from({ length: 7 }, () => ({ ...EMPTY })))}
            className={`${btnCls} min-h-[36px] py-1 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            清空
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[560px] text-[13px]">
          <caption className="sr-only">7 晚睡眠日記，每列一晚</caption>
          <thead>
            <tr className="text-left text-slate-600 dark:text-slate-400">
              <th scope="col" className="py-1.5 pr-2 font-semibold">
                晚
              </th>
              <th scope="col" className="py-1.5 pr-2 font-semibold">
                上床
              </th>
              <th scope="col" className="py-1.5 pr-2 font-semibold">
                起床離床
              </th>
              <th scope="col" className="py-1.5 pr-2 font-semibold">
                多久才睡著（分）
              </th>
              <th scope="col" className="py-1.5 pr-2 font-semibold">
                半夜醒著共（分）
              </th>
              <th scope="col" className="py-1.5 font-semibold text-right">
                效率
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => {
              const n = nights[i];
              return (
                <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                  <th scope="row" className="py-1.5 pr-2 font-semibold text-slate-700 dark:text-slate-300">
                    第 {i + 1} 晚
                  </th>
                  <td className="py-1.5 pr-2">
                    <input type="time" aria-label={`第 ${i + 1} 晚上床時間`} value={r.bed} onChange={(e) => set(i, { bed: e.target.value })} className={inputCls} />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input type="time" aria-label={`第 ${i + 1} 晚起床離床時間`} value={r.out} onChange={(e) => set(i, { out: e.target.value })} className={inputCls} />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="number"
                      min={0}
                      max={300}
                      step={5}
                      inputMode="numeric"
                      aria-label={`第 ${i + 1} 晚入睡所需分鐘`}
                      value={r.latency || ''}
                      onChange={(e) => set(i, { latency: Math.max(0, Number(e.target.value) || 0) })}
                      className={`${inputCls} w-20`}
                    />
                  </td>
                  <td className="py-1.5 pr-2">
                    <input
                      type="number"
                      min={0}
                      max={400}
                      step={5}
                      inputMode="numeric"
                      aria-label={`第 ${i + 1} 晚半夜清醒分鐘`}
                      value={r.waso || ''}
                      onChange={(e) => set(i, { waso: Math.max(0, Number(e.target.value) || 0) })}
                      className={`${inputCls} w-20`}
                    />
                  </td>
                  <td className={`py-1.5 text-right font-bold tabular-nums ${n ? (n.se >= 0.85 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400') : 'text-slate-400'}`}>
                    {n ? `${Math.round(n.se * 100)}%` : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {valid.length > 0 && (
        <Wide>
          <svg viewBox={`0 0 ${W} 150`} className="w-full min-w-[500px] h-auto" role="img" aria-label={`7 晚睡眠效率長條圖，平均 ${avg ? Math.round(avg.se * 100) : 0}%`}>
            {[0.85, 0.9].map((g) => (
              <g key={g}>
                <line x1={40} x2={W - 10} y1={120 - g * 100} y2={120 - g * 100} stroke={g === 0.85 ? 'var(--viz-bad)' : GOOD} strokeDasharray="4 3" />
                <text x={W - 10} y={120 - g * 100 - 3} textAnchor="end" fontSize={9.5} fill={INK2}>
                  {g * 100}%
                </text>
              </g>
            ))}
            <line x1={40} x2={W - 10} y1={120} y2={120} stroke="var(--viz-baseline)" />
            {nights.map((n, i) => {
              const x = 50 + i * ((W - 70) / 7);
              const h = n ? n.se * 100 : 0;
              return (
                <g key={i}>
                  {n && <rect x={x} y={120 - h} width={barW * 0.7} height={h} rx={4} fill={n.se >= 0.9 ? GOOD : n.se >= 0.85 ? 'var(--viz-warn)' : ALERT} />}
                  {n && (
                    <text x={x + barW * 0.35} y={114 - h} textAnchor="middle" fontSize={10} fontWeight={700} fill={INK}>
                      {Math.round(n.se * 100)}
                    </text>
                  )}
                  <text x={x + barW * 0.35} y={136} textAnchor="middle" fontSize={10} fill={INK2}>
                    第{i + 1}晚
                  </text>
                </g>
              );
            })}
          </svg>
        </Wide>
      )}

      {avg && (
        <dl className="grid grid-cols-3 gap-2">
          {[
            { k: '平均躺床', v: hm(avg.tib) },
            { k: '平均睡著', v: hm(avg.tst) },
            { k: '睡眠效率', v: `${Math.round(avg.se * 100)}%` },
          ].map((d) => (
            <div key={d.k} className="flex flex-col-reverse rounded-xl border border-slate-200 dark:border-slate-800 p-2.5">
              <dt className="text-[12px] text-slate-500 dark:text-slate-400">{d.k}</dt>
              <dd className="text-[17px] font-display font-bold text-slate-900 dark:text-white tabular-nums">{d.v}</dd>
            </div>
          ))}
        </dl>
      )}

      {plan ? (
        <div
          className={`rounded-xl border p-3.5 space-y-1.5 ${plan.tone === 'good' ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/25 dark:border-emerald-800' : plan.tone === 'warn' ? 'border-amber-300 bg-amber-50 dark:bg-amber-950/25 dark:border-amber-800' : 'border-rose-300 bg-rose-50 dark:bg-rose-950/25 dark:border-rose-800'}`}
        >
          <p className="text-[14px] font-bold text-slate-900 dark:text-white">Act：{plan.verdict}</p>
          <div className="flex flex-wrap items-center gap-2 text-[14px] text-slate-800 dark:text-slate-200">
            <span>Plan：下週固定</span>
            <input type="time" value={wakeGoal} onChange={(e) => setWakeGoal(e.target.value || '07:00')} aria-label="下週固定起床時間" className={inputCls} />
            <span>起床 → 上床時間</span>
            <strong className="text-xl font-display tabular-nums">{nextBed}</strong>
            <span>（躺床 {hm(plan.nextTib)}）</span>
          </div>
          <p className="text-[13px] text-slate-600 dark:text-slate-400">Do：照這個窗口做 7 天，想睡才上床、20 分鐘睡不著就離床；下週回來重新 Check。躺床時間最少 5 小時；白天嗜睡時不要開車。</p>
        </div>
      ) : (
        <p className="text-[13px] text-slate-500 dark:text-slate-400">至少填滿 5 晚，就會依睡眠效率給你下週的上床時間建議。資料只存在這台裝置的瀏覽器。</p>
      )}
    </div>
  );
};

// ── 5. 卡帕拉巴提適合度快篩 ─────────────────────────────────────────────────

export const KapalaScreen: React.FC = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (w: string) => setChecked((c) => (c.includes(w) ? c.filter((x) => x !== w) : [...c, w]));
  const bad = KAPALA_CONTRA.filter((c) => c.level === 'bad' && checked.includes(c.who));
  const warn = KAPALA_CONTRA.filter((c) => c.level === 'warn' && checked.includes(c.who));
  const verdict = bad.length
    ? {
        t: '不建議練卡帕拉巴提',
        d: '請改練共振呼吸、吐納或六字訣——一樣有放鬆與提神效果，且安全得多。',
        cls: 'border-rose-300 bg-rose-50 text-rose-950 dark:bg-rose-950/30 dark:border-rose-800 dark:text-rose-100',
        icon: '✕',
      }
    : warn.length
      ? {
          t: '暫時調整後再練',
          d: '避開睡前與飯後；恐慌症者先從慢呼吸練起，或在合格老師陪同下嘗試。',
          cls: 'border-amber-300 bg-amber-50 text-amber-950 dark:bg-amber-950/30 dark:border-amber-800 dark:text-amber-100',
          icon: '!',
        }
      : {
          t: '可以從入門劑量開始',
          d: '每秒 1 下 × 20 下 × 3 輪，早上空腹練；任何頭暈手麻胸悶都立刻停。',
          cls: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/30 dark:border-emerald-800 dark:text-emerald-100',
          icon: '✓',
        };
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3">
      <p className="text-[14px] font-bold text-slate-900 dark:text-white">勾選符合你的狀況（沒有就不用勾）：</p>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {KAPALA_CONTRA.map((c) => (
          <li key={c.who}>
            <label className="flex items-start gap-2 rounded-lg border border-slate-200 dark:border-slate-800 px-2.5 py-2 text-[13px] text-slate-800 dark:text-slate-200 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 min-h-[44px]">
              <input type="checkbox" checked={checked.includes(c.who)} onChange={() => toggle(c.who)} className="mt-0.5 w-4 h-4 accent-orange-600" />
              <span>
                <span className="font-semibold">{c.who}</span>
                <span className="block text-[12px] text-slate-500 dark:text-slate-400">{c.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
      <div className={`rounded-xl border p-3 ${verdict.cls}`} aria-live="polite">
        <p className="text-[15px] font-bold">
          <span aria-hidden="true" className="mr-1.5">
            {verdict.icon}
          </span>
          {verdict.t}
        </p>
        <p className="text-[13px] mt-0.5">{verdict.d}</p>
      </div>
    </div>
  );
};
