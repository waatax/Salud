import React from 'react';
import {
  REMODEL_PHASES,
  REMODEL_SIGNALS,
  BONE_MASS_CURVE,
  OSTEO_RISK_FACTORS,
  OSTEO_RISK_TIERS,
  OSTEO_DRUG_EFFICACY,
  OSTEO_BENEFIT_HARM,
  OSTEO_EXERCISE_RX,
  OSTEO_AVOID_MOVES,
  IMMINENT_RISK_CURVE,
  POST_FRACTURE_STEPS,
} from '../../../../data/osteoData';

/**
 * OsteoFigures.tsx — v5.1 infographics for the osteoporosis knowledge points.
 * SVG text and strokes use Tailwind colour classes so they follow the colour theme and
 * dark mode; every chart has a role="img" label that states its message in words.
 */

const TONE_BOX: Record<'good' | 'warn' | 'bad' | 'neutral', string> = {
  good: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/25',
  neutral: 'border-sky-300 dark:border-sky-800 bg-sky-50/70 dark:bg-sky-950/25',
  warn: 'border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/25',
  bad: 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/25',
};

const TONE_TEXT: Record<'good' | 'warn' | 'bad' | 'neutral', string> = {
  good: 'text-emerald-800 dark:text-emerald-300',
  neutral: 'text-sky-800 dark:text-sky-300',
  warn: 'text-amber-800 dark:text-amber-300',
  bad: 'text-rose-800 dark:text-rose-300',
};

const axisText = 'fill-slate-500 dark:fill-slate-400';
const inkText = 'fill-slate-800 dark:fill-slate-100';
const gridLine = 'stroke-slate-200 dark:stroke-slate-700';

// ── KP1 Bone remodeling cycle ────────────────────────────────────────────────

export const RemodelingCycleFigure: React.FC = () => (
  <div className="space-y-4">
    <svg viewBox="0 0 640 210" className="w-full h-auto" role="img" aria-label="骨重塑四階段：啟動、蝕骨細胞吸收挖坑約 2 到 4 週、轉換、造骨細胞填補約 3 到 4 個月。拆骨快、蓋骨慢。">
      {REMODEL_PHASES.map((p, i) => {
        const x = 20 + i * 155;
        return (
          <g key={p.key}>
            <text x={x + 70} y="22" textAnchor="middle" className={`${inkText} text-[14px] font-bold`}>{`${i + 1}. ${p.label}`}</text>
            <text x={x + 70} y="40" textAnchor="middle" className={`${axisText} text-[12px]`}>{p.days}</text>
            {i < 3 && <path d={`M${x + 140} 120 l12 0`} className="stroke-slate-400" strokeWidth="2" markerEnd="url(#remodel-arrow)" />}
          </g>
        );
      })}
      <defs>
        <marker id="remodel-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10z" className="fill-slate-400" />
        </marker>
      </defs>
      {/* bone band */}
      <rect x="20" y="130" width="600" height="60" rx="6" className="fill-amber-100 dark:fill-amber-900/40" />
      <text x="610" y="182" textAnchor="end" className="fill-amber-800 dark:fill-amber-300 text-[11px]">礦化骨</text>
      {/* 1 activation: osteocytes */}
      {[50, 90, 130].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="160" rx="7" ry="4" className="fill-amber-600/70" />
          <path d={`M${cx - 7} 160 l-8 -6 M${cx + 7} 160 l8 6 M${cx} 156 l0 -12`} className="stroke-amber-600/70" strokeWidth="1.2" />
        </g>
      ))}
      <path d="M95 140 l0 -18" className="stroke-rose-500" strokeWidth="2" strokeDasharray="3 3" />
      <text x="95" y="114" textAnchor="middle" className="fill-rose-600 dark:fill-rose-400 text-[11px] font-semibold">RANKL 訊號</text>
      {/* 2 resorption pit + osteoclast */}
      <path d="M195 130 Q235 172 275 130 Z" className="fill-white dark:fill-slate-900" />
      <ellipse cx="235" cy="118" rx="38" ry="16" className="fill-violet-400/80 dark:fill-violet-500/70" />
      {[218, 230, 242, 254].map((cx) => <circle key={cx} cx={cx} cy="116" r="3" className="fill-violet-900/70" />)}
      <text x="235" y="96" textAnchor="middle" className="fill-violet-700 dark:fill-violet-300 text-[11px] font-semibold">蝕骨細胞（拆）</text>
      {/* 3 reversal: empty pit */}
      <path d="M350 130 Q390 172 430 130 Z" className="fill-white dark:fill-slate-900" />
      <circle cx="372" cy="122" r="5" className="fill-sky-400/70" />
      <circle cx="405" cy="120" r="5" className="fill-sky-400/70" />
      <text x="390" y="104" textAnchor="middle" className="fill-sky-700 dark:fill-sky-300 text-[11px] font-semibold">清理、召集</text>
      {/* 4 formation: osteoid + osteoblasts */}
      <path d="M505 130 Q545 172 585 130 Z" className="fill-white dark:fill-slate-900" />
      <path d="M505 130 Q545 160 585 130 Q545 150 505 130 Z" className="fill-emerald-300 dark:fill-emerald-700" />
      {[515, 530, 545, 560, 575].map((cx, k) => (
        <rect key={cx} x={cx - 6} y={k === 2 ? 132 : k === 1 || k === 3 ? 128 : 122} width="12" height="9" rx="2" className="fill-emerald-600 dark:fill-emerald-400" />
      ))}
      <text x="545" y="104" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 text-[11px] font-semibold">造骨細胞（蓋）</text>
    </svg>

    <div className="grid gap-3 sm:grid-cols-2">
      {[
        { title: '年輕時：拆＝蓋', rem: 50, form: 50, note: '每年約 10% 骨骼被更新，總量維持不變' },
        { title: '停經後、老化：拆 > 蓋', rem: 70, form: 40, note: '每一輪都留下一點「沒填滿的坑」，日積月累變鬆' },
      ].map((b) => (
        <div key={b.title} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 space-y-2">
          <p className="text-[13px] font-bold text-slate-800 dark:text-slate-100">{b.title}</p>
          {[
            { label: '拆（吸收）', v: b.rem, cls: 'bg-violet-400 dark:bg-violet-500' },
            { label: '蓋（形成）', v: b.form, cls: 'bg-emerald-500 dark:bg-emerald-400' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-[12px] text-slate-600 dark:text-slate-300">
              <span className="w-16 shrink-0">{r.label}</span>
              <span className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <span className={`block h-full rounded-full ${r.cls}`} style={{ width: `${r.v}%` }} />
              </span>
            </div>
          ))}
          <p className="text-[12px] text-slate-500 dark:text-slate-400">{b.note}</p>
        </div>
      ))}
    </div>

    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {REMODEL_SIGNALS.map((s) => (
        <div key={s.name} className="rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-3">
          <p className="font-mono text-[13px] font-bold text-slate-900 dark:text-white">{s.name}</p>
          <p className="text-[12px] text-slate-700 dark:text-slate-300 mt-1">{s.role}</p>
          <p className="text-[12px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">→ {s.drug}</p>
        </div>
      ))}
    </div>
  </div>
);

// ── KP2 Lifetime bone mass curve ─────────────────────────────────────────────

export const BoneMassCurveFigure: React.FC = () => {
  const X0 = 50, X1 = 615, Y0 = 250, Y1 = 24;
  const x = (age: number) => X0 + (age / 90) * (X1 - X0);
  const y = (v: number) => Y0 - (v / 110) * (Y0 - Y1);
  const line = (k: 'women' | 'men') => BONE_MASS_CURVE.map((p, i) => `${i ? 'L' : 'M'}${x(p.age).toFixed(1)} ${y(p[k]).toFixed(1)}`).join(' ');
  return (
    <svg viewBox="0 0 640 290" className="w-full h-auto" role="img" aria-label="一生骨量曲線示意：約 30 歲達到峰值骨量；女性停經後 5 到 7 年快速流失，較男性更早跌破骨折閾值。">
      <rect x={x(48)} y={Y1} width={x(58) - x(48)} height={Y0 - Y1} className="fill-rose-100/70 dark:fill-rose-900/25" />
      <text x={(x(48) + x(58)) / 2} y={Y1 + 14} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 text-[11px] font-semibold">停經後快速流失期</text>
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className={gridLine} />
          <text x={X0 - 8} y={y(v) + 4} textAnchor="end" className={`${axisText} text-[11px]`}>{v}%</text>
        </g>
      ))}
      {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90].map((a) => (
        <text key={a} x={x(a)} y={Y0 + 18} textAnchor="middle" className={`${axisText} text-[11px]`}>{a}</text>
      ))}
      <text x={X1} y={Y0 + 34} textAnchor="end" className={`${axisText} text-[11px]`}>年齡（歲）</text>
      <line x1={X0} x2={X1} y1={y(68)} y2={y(68)} className="stroke-rose-500" strokeWidth="1.5" strokeDasharray="6 4" />
      <text x={x(60)} y={y(68) + 16} textAnchor="start" className="fill-rose-600 dark:fill-rose-400 text-[11px] font-semibold">骨折閾值（示意）</text>
      <line x1={x(30)} x2={x(30)} y1={y(100)} y2={Y0} className="stroke-slate-400" strokeDasharray="3 3" />
      <text x={x(30)} y={y(100) - 8} textAnchor="middle" className={`${inkText} text-[12px] font-bold`}>峰值骨量 ≈ 30 歲</text>
      <path d={line('men')} fill="none" className="stroke-sky-600 dark:stroke-sky-400" strokeWidth="3" />
      <path d={line('women')} fill="none" className="stroke-rose-500 dark:stroke-rose-400" strokeWidth="3" />
      <text x={x(90) - 4} y={y(72) - 8} textAnchor="end" className="fill-sky-700 dark:fill-sky-300 text-[12px] font-bold">男性</text>
      <text x={x(90) - 4} y={y(55) + 18} textAnchor="end" className="fill-rose-600 dark:fill-rose-300 text-[12px] font-bold">女性</text>
      <path d={`M${x(12)} ${y(30)} Q${x(14)} ${y(60)} ${x(22)} ${y(80)}`} fill="none" className="stroke-emerald-600" strokeWidth="1.5" markerEnd="url(#bm-arrow)" />
      <defs>
        <marker id="bm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0 0 L10 5 L0 10z" className="fill-emerald-600" />
        </marker>
      </defs>
      <text x={x(13)} y={y(22)} textAnchor="start" className="fill-emerald-700 dark:fill-emerald-400 text-[11px] font-semibold">青春期存下約一半骨量</text>
    </svg>
  );
};

// ── KP3 Risk factor board ────────────────────────────────────────────────────

export const RiskFactorBoard: React.FC = () => (
  <div className="grid gap-3 md:grid-cols-3">
    {OSTEO_RISK_FACTORS.map((g) => (
      <div key={g.group} className={`rounded-xl border p-3.5 ${g.changeable ? TONE_BOX.good : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60'}`}>
        <p className={`text-[13px] font-bold mb-2 ${g.changeable ? TONE_TEXT.good : 'text-slate-800 dark:text-slate-100'}`}>
          {g.group}
          {g.changeable && <span className="ml-1.5 text-[11px] font-semibold rounded-full bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-950 px-1.5 py-0.5">你能改</span>}
        </p>
        <ul className="space-y-1.5">
          {g.items.map((it) => (
            <li key={it} className="flex gap-2 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
              <span className={`shrink-0 mt-2 w-1.5 h-1.5 rounded-full ${g.changeable ? 'bg-emerald-600' : 'bg-slate-400'}`} aria-hidden="true" />
              {it}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// ── KP4 Reading a DXA report ─────────────────────────────────────────────────

const DXA_SITES = [
  { site: '腰椎 L1–L4', t: -2.1 },
  { site: '全髖', t: -1.8 },
  { site: '股骨頸', t: -2.7 },
];

export const DxaReportFigure: React.FC = () => {
  const X0 = 110, X1 = 610;
  const x = (t: number) => X0 + ((t + 4) / 6) * (X1 - X0);
  const lowest = Math.min(...DXA_SITES.map((s) => s.t));
  return (
    <svg viewBox="0 0 640 230" className="w-full h-auto" role="img" aria-label="DXA 報告判讀範例：腰椎 T 值 -2.1、全髖 -1.8、股骨頸 -2.7；診斷以最低的 -2.7 為準，屬骨質疏鬆。">
      <rect x={x(-4)} y="20" width={x(-2.5) - x(-4)} height="22" className="fill-rose-400/80 dark:fill-rose-500/70" />
      <rect x={x(-2.5)} y="20" width={x(-1) - x(-2.5)} height="22" className="fill-amber-300/90 dark:fill-amber-500/70" />
      <rect x={x(-1)} y="20" width={x(2) - x(-1)} height="22" className="fill-emerald-300/90 dark:fill-emerald-600/70" />
      <text x={(x(-4) + x(-2.5)) / 2} y="35" textAnchor="middle" className="fill-rose-950 dark:fill-white text-[12px] font-bold">骨質疏鬆</text>
      <text x={(x(-2.5) + x(-1)) / 2} y="35" textAnchor="middle" className="fill-amber-950 dark:fill-white text-[12px] font-bold">骨質缺乏</text>
      <text x={(x(-1) + x(2)) / 2} y="35" textAnchor="middle" className="fill-emerald-950 dark:fill-white text-[12px] font-bold">正常</text>
      {[-4, -3, -2.5, -2, -1, 0, 1, 2].map((t) => (
        <g key={t}>
          <line x1={x(t)} x2={x(t)} y1="42" y2="200" className={gridLine} />
          <text x={x(t)} y="218" textAnchor="middle" className={`${axisText} text-[11px]`}>{t}</text>
        </g>
      ))}
      {DXA_SITES.map((s, i) => {
        const yy = 80 + i * 42;
        const isLow = s.t === lowest;
        return (
          <g key={s.site}>
            <text x={X0 - 10} y={yy + 4} textAnchor="end" className={`${inkText} text-[12px] ${isLow ? 'font-bold' : ''}`}>{s.site}</text>
            <line x1={x(0)} x2={x(s.t)} y1={yy} y2={yy} className={isLow ? 'stroke-rose-500' : 'stroke-slate-400'} strokeWidth="6" strokeLinecap="round" />
            <circle cx={x(s.t)} cy={yy} r="7" className={isLow ? 'fill-rose-600' : 'fill-slate-500'} />
            <text x={x(s.t) - 12} y={yy - 10} textAnchor="middle" className={`text-[12px] font-bold ${isLow ? 'fill-rose-600 dark:fill-rose-400' : inkText}`}>{s.t.toFixed(1)}</text>
            {isLow && <text x={x(s.t) - 2} y={yy + 24} textAnchor="start" className="fill-rose-600 dark:fill-rose-400 text-[12px] font-bold">↑ 最低值決定診斷</text>}
          </g>
        );
      })}
    </svg>
  );
};

// ── KP5 Risk tier staircase ──────────────────────────────────────────────────

export const RiskTierStaircase: React.FC = () => (
  <ol className="grid gap-3 md:grid-cols-4 items-stretch">
    {OSTEO_RISK_TIERS.map((t, i) => (
      <li key={t.key} className={`relative rounded-xl border-2 p-3.5 flex flex-col gap-2 ${TONE_BOX[t.tone]}`}>
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-mono font-bold ${TONE_TEXT[t.tone]}`}>第 {i + 1} 級</span>
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, k) => (
              <span key={k} className={`w-2 h-3 rounded-sm ${k <= i ? 'bg-current ' + TONE_TEXT[t.tone] : 'bg-slate-200 dark:bg-slate-700'}`} />
            ))}
          </span>
        </div>
        <p className={`text-[15px] font-bold ${TONE_TEXT[t.tone]}`}>{t.label}</p>
        <ul className="space-y-1 text-[12px] text-slate-700 dark:text-slate-300">
          {t.criteria.map((c) => <li key={c}>• {c}</li>)}
        </ul>
        <div className="mt-auto pt-2 border-t border-current/10 space-y-1 text-[12px]">
          <p className="text-slate-800 dark:text-slate-100"><strong>藥物：</strong>{t.drugs}</p>
          <p className="text-slate-600 dark:text-slate-400"><strong>追蹤：</strong>{t.recheck}</p>
        </div>
      </li>
    ))}
  </ol>
);

// ── KP6 Drug efficacy chart ──────────────────────────────────────────────────

export const DrugEfficacyChart: React.FC = () => (
  <div className="space-y-3" role="img" aria-label={`主要骨鬆藥物在關鍵試驗中降低骨折的幅度：${OSTEO_DRUG_EFFICACY.map((d) => `${d.name} 脊椎 ${d.vert}%${d.hip ? `、髖部 ${d.hip}%` : ''}`).join('；')}`}>
    <div className="flex flex-wrap gap-4 text-[12px] text-slate-600 dark:text-slate-300" aria-hidden="true">
      <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-sky-600 dark:bg-sky-400" />脊椎骨折降低</span>
      <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 dark:bg-amber-400" />髖部骨折降低</span>
      <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm border-2 border-violet-500" />促生成藥</span>
    </div>
    <div className="space-y-2.5" aria-hidden="true">
      {OSTEO_DRUG_EFFICACY.map((d) => (
        <div key={d.name} className="grid grid-cols-[7.5rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)_10rem] gap-x-3 gap-y-1 items-center">
          <span className={`text-[13px] font-semibold text-slate-800 dark:text-slate-100 ${d.kind === 'ana' ? 'border-l-4 border-violet-500 pl-1.5' : 'pl-2.5'}`}>{d.name}</span>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-3.5 rounded-r bg-sky-600 dark:bg-sky-400" style={{ width: `${d.vert}%` }} />
              <span className="text-[12px] font-bold tabular-nums text-sky-800 dark:text-sky-300">{d.vert}%</span>
            </div>
            <div className="flex items-center gap-2">
              {d.hip ? (
                <>
                  <span className="h-3.5 rounded-r bg-amber-500 dark:bg-amber-400" style={{ width: `${d.hip}%` }} />
                  <span className="text-[12px] font-bold tabular-nums text-amber-800 dark:text-amber-300">{d.hip}%</span>
                </>
              ) : (
                <span className="text-[11px] text-slate-400 dark:text-slate-500">髖部：試驗未證實或未單獨報告</span>
              )}
            </div>
          </div>
          <span className="col-start-2 sm:col-start-auto text-[11px] text-slate-500 dark:text-slate-400">{d.trial}</span>
        </div>
      ))}
    </div>
  </div>
);

// ── KP7 Treatment sequence timeline ──────────────────────────────────────────

const SEQ_LINES = [
  { key: 'a', label: '先長骨 → 再固守', cls: 'stroke-emerald-600 dark:stroke-emerald-400', pts: [[0, 0], [1, 13], [2, 16], [3, 17.5], [4, 18], [5, 18.5]] },
  { key: 'b', label: 'Denosumab 突然停', cls: 'stroke-rose-500 dark:stroke-rose-400', pts: [[0, 0], [1, 5], [2, 7.5], [3, 9], [3.5, 5], [4, 1], [5, 0]] },
  { key: 'c', label: '長骨後沒接續', cls: 'stroke-amber-500 dark:stroke-amber-400', pts: [[0, 0], [1, 13], [1.5, 10], [2, 6], [3, 4], [5, 3]] },
] as const;

export const SequenceTimelineFigure: React.FC = () => {
  const X0 = 60, X1 = 450, Y0 = 210, Y1 = 20;
  const x = (yr: number) => X0 + (yr / 5) * (X1 - X0);
  const y = (v: number) => Y0 - ((v + 2) / 22) * (Y0 - Y1);
  return (
    <svg viewBox="0 0 640 250" className="w-full h-auto" role="img" aria-label="療程接力示意：先促生成再接抗吸收，骨密度持續上升並維持；Denosumab 突然停藥，一年內骨密度回到起點；促生成藥後沒有接續，新長的骨量大多流失。">
      <rect x={x(0)} y={Y1} width={x(1) - x(0)} height={Y0 - Y1} className="fill-violet-100/70 dark:fill-violet-900/25" />
      <text x={(x(0) + x(1)) / 2} y={Y1 + 14} textAnchor="middle" className="fill-violet-700 dark:fill-violet-300 text-[11px] font-semibold">促生成期</text>
      {[0, 5, 10, 15, 20].map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className={gridLine} />
          <text x={X0 - 8} y={y(v) + 4} textAnchor="end" className={`${axisText} text-[11px]`}>{v > 0 ? `+${v}` : v}%</text>
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((t) => (
        <text key={t} x={x(t)} y={Y0 + 18} textAnchor="middle" className={`${axisText} text-[11px]`}>第 {t} 年</text>
      ))}
      <text x={X0 - 8} y={Y1 - 6} textAnchor="start" className={`${axisText} text-[11px]`}>腰椎骨密度變化（示意）</text>
      {SEQ_LINES.map((l) => (
        <path key={l.key} d={l.pts.map(([a, b], i) => `${i ? 'L' : 'M'}${x(a)} ${y(b)}`).join(' ')} fill="none" className={l.cls} strokeWidth="3" strokeLinejoin="round" />
      ))}
      <line x1={x(3)} x2={x(3)} y1={y(9) - 6} y2={Y0} className="stroke-rose-400" strokeDasharray="3 3" />
      <text x={x(3) + 4} y={y(11)} className="fill-rose-600 dark:fill-rose-400 text-[11px] font-semibold">停打</text>
      {SEQ_LINES.map((l, i) => (
        <g key={l.key} transform={`translate(470 ${50 + i * 50})`}>
          <line x1="0" x2="22" y1="0" y2="0" className={l.cls} strokeWidth="3" />
          <text x="30" y="4" className={`${inkText} text-[12px]`}>{l.label}</text>
        </g>
      ))}
    </svg>
  );
};

// ── KP8 Benefit vs harm pictogram ────────────────────────────────────────────

export const BenefitHarmPictogram: React.FC = () => {
  const { population, years, hipPrevented, aff, source } = OSTEO_BENEFIT_HARM;
  return (
    <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] items-center" role="img" aria-label={`每 ${population.toLocaleString()} 名女性使用雙磷酸鹽 ${years} 年，約預防 ${hipPrevented} 例髖部骨折，同時約發生 ${aff} 例非典型股骨骨折。`}>
      <div aria-hidden="true" className="space-y-2">
        <p className="text-[13px] font-bold text-emerald-800 dark:text-emerald-300">預防的髖部骨折：約 {hipPrevented} 例</p>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}>
          {Array.from({ length: hipPrevented }).map((_, i) => (
            <span key={i} className="aspect-square rounded-full bg-emerald-500 dark:bg-emerald-400" />
          ))}
        </div>
        <p className="text-[13px] font-bold text-rose-700 dark:text-rose-300 pt-1">非典型股骨骨折：約 {aff} 例</p>
        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(25, minmax(0, 1fr))' }}>
          {Array.from({ length: aff }).map((_, i) => (
            <span key={i} className="aspect-square rounded-full bg-rose-500 dark:bg-rose-400" />
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 p-3 text-center">
        <p className="text-[12px] text-slate-500 dark:text-slate-400">每 {population.toLocaleString()} 人治療 {years} 年</p>
        <p className="text-2xl font-display font-bold text-slate-900 dark:text-white tabular-nums">≈ 75 : 1</p>
        <p className="text-[12px] text-slate-500 dark:text-slate-400">效益比風險</p>
        <p className="text-[10px] text-slate-400 mt-1 max-w-[12rem]">{source}</p>
      </div>
    </div>
  );
};

// ── KP10 Exercise pyramid ────────────────────────────────────────────────────

export const ExercisePyramidFigure: React.FC = () => {
  const order = [...OSTEO_EXERCISE_RX].reverse();
  const widths = ['62%', '76%', '88%', '100%'];
  const tones = [
    'bg-sky-100 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800',
    'bg-amber-100 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800',
    'bg-emerald-100 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800',
    'bg-teal-100 dark:bg-teal-950/40 border-teal-300 dark:border-teal-800',
  ];
  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
      <ol className="flex flex-col items-center gap-1.5" aria-label="骨鬆運動金字塔，由上到下">
        {order.map((r, i) => (
          <li key={r.title} className={`rounded-xl border px-3 py-2.5 text-center ${tones[i]}`} style={{ width: widths[i] }}>
            <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">{r.level}</p>
            <p className="text-[14px] font-bold text-slate-900 dark:text-white">{r.title}</p>
            <p className="text-[12px] text-slate-700 dark:text-slate-300">{r.examples}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{r.dose}</p>
          </li>
        ))}
      </ol>
      <div className="rounded-xl border border-rose-200 dark:border-rose-800/70 bg-rose-50 dark:bg-rose-950/30 p-3.5">
        <p className="text-[13px] font-bold text-rose-800 dark:text-rose-300 mb-2">骨鬆或脊椎骨折者避免</p>
        <ul className="space-y-1.5">
          {OSTEO_AVOID_MOVES.map((m) => (
            <li key={m} className="flex gap-2 text-[13px] text-rose-950 dark:text-rose-100">
              <span aria-hidden="true">✕</span>
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── KP11 Imminent fracture risk ──────────────────────────────────────────────

export const ImminentRiskFigure: React.FC = () => {
  const X0 = 50, X1 = 610, Y0 = 200, Y1 = 22;
  const x = (m: number) => X0 + (m / 96) * (X1 - X0);
  const y = (rr: number) => Y0 - (rr / 5.5) * (Y0 - Y1);
  const d = IMMINENT_RISK_CURVE.map((p, i) => `${i ? 'L' : 'M'}${x(p.month)} ${y(p.rr)}`).join(' ');
  return (
    <svg viewBox="0 0 640 240" className="w-full h-auto" role="img" aria-label="骨折後再骨折相對風險示意：骨折後頭兩年最高，約為一般人的 2 到 5 倍，之後逐漸下降但仍高於一般人。">
      <rect x={x(0)} y={Y1} width={x(24) - x(0)} height={Y0 - Y1} className="fill-rose-100/70 dark:fill-rose-900/25" />
      <text x={(x(0) + x(24)) / 2} y={Y1 + 14} textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 text-[12px] font-bold">黃金治療期（前 2 年）</text>
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={X0} x2={X1} y1={y(v)} y2={y(v)} className={gridLine} />
          <text x={X0 - 8} y={y(v) + 4} textAnchor="end" className={`${axisText} text-[11px]`}>{v}×</text>
        </g>
      ))}
      {[0, 12, 24, 36, 48, 60, 72, 84, 96].map((m) => (
        <text key={m} x={x(m)} y={Y0 + 18} textAnchor="middle" className={`${axisText} text-[11px]`}>{m / 12} 年</text>
      ))}
      <line x1={X0} x2={X1} y1={y(1)} y2={y(1)} className="stroke-slate-400" strokeWidth="1.5" />
      <text x={X1} y={y(1) + 16} textAnchor="end" className={`${axisText} text-[11px]`}>沒骨折過的人＝1×</text>
      <path d={d} fill="none" className="stroke-rose-600 dark:stroke-rose-400" strokeWidth="3" strokeLinejoin="round" />
      <text x={x(40)} y={y(2.6)} className="fill-rose-700 dark:fill-rose-300 text-[12px] font-semibold">再骨折相對風險（示意）</text>
    </svg>
  );
};

export const PostFractureTimeline: React.FC = () => (
  <ol className="grid gap-3 md:grid-cols-4">
    {POST_FRACTURE_STEPS.map((s, i) => (
      <li key={s.when} className="relative rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3.5">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400">
          <span className="w-5 h-5 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 inline-flex items-center justify-center tabular-nums">{i + 1}</span>
          {s.when}
        </span>
        <p className="text-[14px] font-bold text-slate-900 dark:text-white mt-1.5">{s.title}</p>
        <ul className="mt-1.5 space-y-1 text-[12px] leading-relaxed text-slate-700 dark:text-slate-300">
          {s.items.map((it) => <li key={it}>• {it}</li>)}
        </ul>
      </li>
    ))}
  </ol>
);
