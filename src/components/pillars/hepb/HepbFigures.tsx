import React, { useState } from 'react';
import { CHRONICITY_BY_AGE, HBV_PHASES, MTCT_STEPS, PROGRESSION, SEROLOGY, Tri } from '../../../data/hepbData';

/**
 * Figures for the hepatitis B zone. The virion schematic follows the standard Dane-
 * particle structure (envelope with HBsAg, icosahedral core HBcAg, partially double-
 * stranded DNA with polymerase); HBeAg is drawn outside as a secreted protein.
 */

const BAR = 'var(--viz-series-1)';

function colPath(x: number, w: number, base: number, top: number, r = 4): string {
  const h = base - top;
  const rr = Math.min(r, h / 2, w / 2);
  return `M${x} ${base} L${x} ${top + rr} Q${x} ${top} ${x + rr} ${top} L${x + w - rr} ${top} Q${x + w} ${top} ${x + w} ${top + rr} L${x + w} ${base} Z`;
}

// ── Virus structure ─────────────────────────────────────────────────────

export const VirusFigure: React.FC = () => {
  const cx = 130;
  const cy = 120;
  const spikes = Array.from({ length: 22 }, (_, i) => (i / 22) * Math.PI * 2);
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${cx + Math.cos(a) * 46},${cy + Math.sin(a) * 46}`;
  }).join(' ');
  return (
    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center">
      <svg viewBox="0 0 260 240" role="img" aria-label="B 型肝炎病毒結構：外層包膜上的表面抗原、內層核心、核心內的病毒 DNA 與聚合酶，以及病毒分泌的 e 抗原" className="w-full max-w-sm mx-auto h-auto">
        {/* envelope with HBsAg spikes */}
        {spikes.map((a) => (
          <g key={a}>
            <line x1={cx + Math.cos(a) * 78} y1={cy + Math.sin(a) * 78} x2={cx + Math.cos(a) * 90} y2={cy + Math.sin(a) * 90} stroke="var(--viz-series-2)" strokeWidth={3} strokeLinecap="round" />
            <circle cx={cx + Math.cos(a) * 92} cy={cy + Math.sin(a) * 92} r={4} fill="var(--viz-series-2)" />
          </g>
        ))}
        <circle cx={cx} cy={cy} r={78} fill="var(--anat-soft)" opacity={0.35} stroke="var(--viz-series-2)" strokeWidth={3} />
        {/* core */}
        <polygon points={hex} fill="var(--anat-disc)" stroke="var(--anat-disc-core)" strokeWidth={2.5} />
        {/* partially double-stranded DNA */}
        <circle cx={cx} cy={cy} r={24} fill="none" stroke="var(--viz-series-3)" strokeWidth={3} />
        <path d={`M${cx + 28} ${cy} A28 28 0 1 1 ${cx} ${cy - 28}`} fill="none" stroke="var(--viz-series-3)" strokeWidth={3} strokeDasharray="5 3" />
        <circle cx={cx + 24} cy={cy} r={5} fill="var(--viz-series-1)" />
        {/* secreted HBeAg */}
        {[
          [26, 212],
          [42, 222],
          [232, 208],
          [218, 224],
        ].map(([x, y]) => (
          <rect key={`${x}`} x={x - 4} y={y - 4} width={8} height={8} rx={2} fill="var(--viz-warn)" transform={`rotate(45 ${x} ${y})`} />
        ))}
      </svg>
      <ul className="space-y-2.5 text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
        <li className="flex gap-2">
          <span className="mt-1 w-3 h-3 rounded-full shrink-0" style={{ background: 'var(--viz-series-2)' }} aria-hidden="true" />
          <span>
            <strong className="text-slate-900 dark:text-white">表面抗原 HBsAg</strong>：病毒外殼上的蛋白。驗到它＝體內有病毒；身體對它產生的 <strong>Anti-HBs</strong> 就是保護力（疫苗也是讓你產生這個抗體）。
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-3 h-3 rounded-sm shrink-0" style={{ background: 'var(--anat-disc)' }} aria-hidden="true" />
          <span>
            <strong className="text-slate-900 dark:text-white">核心 HBcAg</strong>：包住 DNA 的蛋白殼。血中驗的是 <strong>Anti-HBc</strong>，陽性代表「曾經感染過」，疫苗不會產生。
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-3 h-3 rounded-full shrink-0 border-2" style={{ borderColor: 'var(--viz-series-3)' }} aria-hidden="true" />
          <span>
            <strong className="text-slate-900 dark:text-white">病毒 DNA</strong>：驗 <strong>HBV DNA（病毒量）</strong>，是決定要不要治療、治療有沒有效的關鍵。
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-1 w-3 h-3 rotate-45 shrink-0" style={{ background: 'var(--viz-warn)' }} aria-hidden="true" />
          <span>
            <strong className="text-slate-900 dark:text-white">e 抗原 HBeAg</strong>：病毒複製時分泌到血中的蛋白，陽性代表病毒活躍、傳染力高。
          </span>
        </li>
      </ul>
    </div>
  );
};

// ── Liver progression ───────────────────────────────────────────────────

const LIVER = 'M8 34 C 8 14, 40 6, 70 10 C 92 13, 108 18, 112 26 C 116 36, 100 44, 84 50 C 64 58, 40 62, 24 58 C 12 55, 8 46, 8 34 Z';

const LiverIcon: React.FC<{ kind: number }> = ({ kind }) => {
  const fill = kind === 0 ? '#C0634F' : kind === 1 ? '#C9584A' : kind === 2 ? '#B9785F' : kind === 3 ? '#A98A62' : '#A98A62';
  return (
    <svg viewBox="0 0 120 68" className="w-full h-auto" aria-hidden="true">
      <path d={LIVER} fill={fill} stroke="var(--anat-figure)" strokeWidth={1.5} />
      {kind === 1 &&
        [
          [34, 30],
          [56, 22],
          [72, 38],
          [48, 44],
          [88, 30],
        ].map(([x, y]) => <circle key={`${x}`} cx={x} cy={y} r={4} fill="#F08A7A" opacity={0.9} />)}
      {kind === 2 && (
        <g stroke="#F3E3D6" strokeWidth={1.4} opacity={0.85} fill="none">
          <path d="M20 30 L44 24 L60 34 L82 26 L102 30" />
          <path d="M26 46 L50 40 L70 48 L92 40" />
        </g>
      )}
      {kind >= 3 &&
        Array.from({ length: 16 }, (_, i) => {
          const x = 20 + (i % 6) * 15 + (Math.floor(i / 6) % 2) * 7;
          const y = 22 + Math.floor(i / 6) * 13;
          return <circle key={i} cx={x} cy={y} r={5.2} fill="none" stroke="#F3E3D6" strokeWidth={1.3} opacity={0.85} />;
        })}
      {kind === 4 && <circle cx={74} cy={34} r={11} fill="#5B3A82" stroke="#F3E3D6" strokeWidth={1.5} />}
    </svg>
  );
};

const STAGE_BORDER = {
  good: 'border-emerald-300 dark:border-emerald-800',
  neutral: 'border-slate-200 dark:border-slate-700',
  warn: 'border-amber-300 dark:border-amber-800',
  bad: 'border-rose-300 dark:border-rose-800',
} as const;

export const LiverProgressionFigure: React.FC = () => (
  <ol className="grid grid-cols-2 sm:grid-cols-5 gap-2" aria-label="慢性 B 型肝炎從健康肝到肝癌的進程">
    {PROGRESSION.map((p, i) => (
      <li key={p.stage} className={`relative rounded-xl border bg-white dark:bg-slate-900/70 p-2.5 ${STAGE_BORDER[p.tone]}`}>
        <LiverIcon kind={i} />
        <p className="font-semibold text-[14px] text-slate-900 dark:text-white mt-1">{p.stage}</p>
        <p className="text-[12px] leading-snug text-slate-600 dark:text-slate-400 mt-0.5">{p.detail}</p>
        {i < PROGRESSION.length - 1 && (
          <span aria-hidden="true" className="hidden sm:flex absolute -right-2.5 top-8 z-10 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 items-center justify-center text-[11px] text-slate-500">
            →
          </span>
        )}
      </li>
    ))}
  </ol>
);

// ── Chronicity by age ───────────────────────────────────────────────────

export const ChronicityChart: React.FC = () => {
  const W = 340;
  const H = 180;
  const base = 136;
  const top = 18;
  const bw = 24;
  const slot = (W - 40) / CHRONICITY_BY_AGE.length;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="感染 B 肝的年齡與變成慢性帶原的機率：新生兒約 90%、5 歲以下約 30%、成人約 2 到 6%" className="w-full max-w-md mx-auto h-auto">
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
      {CHRONICITY_BY_AGE.map((d, i) => {
        const cx = 34 + slot * i + slot / 2;
        const y = base - ((base - top) * d.pct) / 100;
        return (
          <g key={d.age}>
            <path d={colPath(cx - bw / 2, bw, base, y)} fill={BAR}>
              <title>{`${d.age}感染：${d.label}變成慢性`}</title>
            </path>
            <text x={cx} y={y - 6} fontSize={12} fontWeight={700} textAnchor="middle" fill="var(--viz-ink)">
              {d.label}
            </text>
            <text x={cx} y={base + 18} fontSize={12} textAnchor="middle" fill="var(--viz-ink)">
              {d.age}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const TaiwanImpactChart: React.FC = () => {
  const rows = [
    { label: '疫苗計畫前（台北市兒童）', pct: 9.8 },
    { label: '全面接種約 20 年後', pct: 0.6 },
  ];
  const max = 12;
  return (
    <div className="space-y-2.5" role="img" aria-label="台北市兒童 B 肝表面抗原帶原率：疫苗計畫前 9.8%，全面接種約 20 年後 0.6%">
      {rows.map((r) => (
        <div key={r.label} className="grid grid-cols-[9.5rem_1fr] sm:grid-cols-[12rem_1fr] items-center gap-3">
          <span className="text-[13px] text-slate-700 dark:text-slate-300 text-right">{r.label}</span>
          <span className="flex items-center gap-2">
            <span className="h-5 rounded-r-[4px]" style={{ width: `${Math.max(1.5, (r.pct / max) * 100)}%`, background: BAR }} aria-hidden="true" />
            <span className="text-[13px] font-bold text-slate-900 dark:text-white tabular-nums">{r.pct}%</span>
          </span>
        </div>
      ))}
    </div>
  );
};

// ── Mother-to-child timeline ────────────────────────────────────────────

export const MtctTimeline: React.FC = () => (
  <ol className="relative border-l-2 border-emerald-300 dark:border-emerald-800 ml-3 space-y-4">
    {MTCT_STEPS.map((s, i) => (
      <li key={s.when} className="pl-5 relative">
        <span className="absolute -left-[13px] top-0.5 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 text-[11px] font-bold inline-flex items-center justify-center tabular-nums">
          {i + 1}
        </span>
        <p className="font-semibold text-[14px] text-slate-900 dark:text-white">{s.when}</p>
        <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">{s.what}</p>
      </li>
    ))}
  </ol>
);

// ── Phases ──────────────────────────────────────────────────────────────

const Meter: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
  <div className="space-y-0.5">
    <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400">
      <span>{label}</span>
    </div>
    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" aria-hidden="true">
      <div className="h-full rounded-full" style={{ width: `${(value / 4) * 100}%`, background: color }} />
    </div>
  </div>
);

export const PhasesFigure: React.FC = () => (
  <ol className="grid gap-2 sm:grid-cols-5">
    {HBV_PHASES.map((p, i) => (
      <li key={p.name} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3 space-y-2">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 tabular-nums">階段 {i + 1}</span>
        <p className="font-bold text-[14px] leading-snug text-slate-900 dark:text-white">{p.name}</p>
        <p className="text-[11px] text-slate-500 dark:text-slate-400">{p.old}</p>
        <Meter value={p.level.dna} label="病毒量（示意）" color="var(--viz-series-1)" />
        <Meter value={p.level.alt} label="肝發炎 ALT（示意）" color="var(--viz-series-2)" />
        <p className="text-[12px] leading-snug text-slate-700 dark:text-slate-300 pt-1 border-t border-slate-100 dark:border-slate-800">{p.plan}</p>
      </li>
    ))}
  </ol>
);

// ── Serology decoder ────────────────────────────────────────────────────

const TONE_BOX = {
  good: 'border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
  warn: 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
  bad: 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100',
  neutral: 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-950 dark:text-sky-100',
} as const;

const Toggle: React.FC<{ label: string; sub: string; value: Tri; onChange: (v: Tri) => void }> = ({ label, sub, value, onChange }) => (
  <fieldset className="rounded-xl border border-slate-200 dark:border-slate-700 p-3">
    <legend className="px-1 text-[13px] font-bold text-slate-900 dark:text-white">{label}</legend>
    <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">{sub}</p>
    <div className="grid grid-cols-2 gap-1.5" role="radiogroup" aria-label={label}>
      {(['neg', 'pos'] as Tri[]).map((v) => (
        <button
          key={v}
          type="button"
          role="radio"
          aria-checked={value === v}
          onClick={() => onChange(v)}
          className={`rounded-lg border px-2 py-1.5 text-[13px] font-semibold transition-colors ${
            value === v
              ? v === 'pos'
                ? 'bg-rose-600 border-rose-600 text-white dark:bg-rose-500 dark:text-rose-950'
                : 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:text-emerald-950'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
          }`}
        >
          {v === 'pos' ? '陽性（＋）' : '陰性（－）'}
        </button>
      ))}
    </div>
  </fieldset>
);

export const SerologyDecoder: React.FC = () => {
  const [s, setS] = useState<Tri>('neg');
  const [abs, setAbs] = useState<Tri>('neg');
  const [abc, setAbc] = useState<Tri>('neg');
  const r = SEROLOGY[`${s}-${abs}-${abc}`];
  return (
    <section className="rounded-2xl border-2 border-sky-200 dark:border-sky-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4" aria-labelledby="sero-h">
      <div>
        <h3 id="sero-h" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：輸入你的 B 肝三項檢驗
        </h3>
        <p className="text-[13px] text-slate-600 dark:text-slate-400">照報告上的結果點選陰性或陽性，立即看懂代表什麼、下一步該做什麼。</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        <Toggle label="HBsAg 表面抗原" sub="有沒有被感染" value={s} onChange={setS} />
        <Toggle label="Anti-HBs 表面抗體" sub="有沒有保護力" value={abs} onChange={setAbs} />
        <Toggle label="Anti-HBc 核心抗體" sub="有沒有感染過" value={abc} onChange={setAbc} />
      </div>
      <div className={`rounded-2xl border-2 p-4 ${TONE_BOX[r.tone]}`} role="status" aria-live="polite">
        <p className="text-[12px] font-bold opacity-80">解讀結果</p>
        <p className="text-lg font-bold">{r.title}</p>
        <p className="text-[14px] leading-relaxed mt-1">{r.meaning}</p>
        <p className="text-[14px] leading-relaxed mt-1">
          <strong>下一步：</strong>
          {r.action}
        </p>
      </div>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">若報告寫的是數值（例如 Anti-HBs 8 mIU/mL），一般以 ≥10 mIU/mL 視為有保護力。此工具為衛教用途，請與醫師確認。</p>
    </section>
  );
};
