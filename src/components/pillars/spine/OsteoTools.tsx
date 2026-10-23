import React, { useMemo, useState } from 'react';
import { Calculator, Minus, Plus, RotateCcw } from 'lucide-react';
import { ostaIndex, ostaBand, OSTA_META, CALCIUM_FOODS, CALCIUM_TARGET, CALCIUM_UL } from '../../../data/osteoData';

/**
 * Self-checks for the osteoporosis chapter. Like the other spine tools they estimate
 * and point to the next step; a DXA scan and a clinician decide.
 */

const BAND_BOX = {
  good: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
  warn: 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
  bad: 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-100',
} as const;

const inputCls =
  'w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-[15px] tabular-nums text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500';

export const OstaCalculator: React.FC = () => {
  const [age, setAge] = useState('65');
  const [weight, setWeight] = useState('52');
  const a = Number(age);
  const w = Number(weight);
  const valid = a >= 40 && a <= 110 && w >= 25 && w <= 200;
  const idx = valid ? ostaIndex(w, a) : null;
  const band = idx == null ? null : ostaBand(idx);
  const meta = band ? OSTA_META[band] : null;
  // strip from -10 to +4
  const pos = idx == null ? 0 : Math.min(100, Math.max(0, ((idx + 10) / 14) * 100));

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 sm:p-5 space-y-4">
      <p className="flex items-center gap-2 text-[15px] font-bold text-slate-900 dark:text-white">
        <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        OSTA 亞洲人骨鬆自我評估（1 分鐘）
      </p>
      <div className="grid grid-cols-2 gap-3 max-w-md">
        <label className="space-y-1">
          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">年齡（歲）</span>
          <input type="number" inputMode="numeric" min={40} max={110} value={age} onChange={(e) => setAge(e.target.value)} className={inputCls} />
        </label>
        <label className="space-y-1">
          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">體重（公斤）</span>
          <input type="number" inputMode="decimal" min={25} max={200} value={weight} onChange={(e) => setWeight(e.target.value)} className={inputCls} />
        </label>
      </div>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">公式：（體重 − 年齡）× 0.2。適用停經後女性；男性與年輕族群請以醫師評估為主。</p>

      <div aria-hidden="true" className="space-y-1">
        <div className="relative h-4 rounded-full overflow-hidden flex">
          <span className="h-full bg-rose-400 dark:bg-rose-600" style={{ width: `${(6 / 14) * 100}%` }} />
          <span className="h-full bg-amber-300 dark:bg-amber-500" style={{ width: `${(3 / 14) * 100}%` }} />
          <span className="h-full flex-1 bg-emerald-300 dark:bg-emerald-600" />
          {idx != null && <span className="absolute top-[-3px] w-1.5 h-[22px] rounded bg-slate-900 dark:bg-white" style={{ left: `calc(${pos}% - 3px)` }} />}
        </div>
        <div className="relative h-4 text-[11px] tabular-nums text-slate-500 dark:text-slate-400">
          {[-10, -4, -1, 4].map((t) => (
            <span key={t} className="absolute -translate-x-1/2 first:translate-x-0 last:-translate-x-full" style={{ left: `${((t + 10) / 14) * 100}%` }}>
              {t > 0 ? `+${t}` : t}
            </span>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        {meta && idx != null ? (
          <div className={`rounded-xl border p-3.5 ${BAND_BOX[meta.tone]}`}>
            <p className="text-[15px] font-bold">
              OSTA 指數 <span className="tabular-nums">{idx}</span>：{meta.label}
            </p>
            <p className="text-[13px] mt-1">{meta.advice}</p>
          </div>
        ) : (
          <p className="text-[13px] text-slate-500 dark:text-slate-400">請輸入 40–110 歲與 25–200 公斤之間的數值。</p>
        )}
      </div>
    </div>
  );
};

const SEGMENT_COLORS = [
  'bg-emerald-500', 'bg-sky-500', 'bg-amber-500', 'bg-teal-500', 'bg-violet-500', 'bg-rose-400', 'bg-lime-500',
  'bg-cyan-500', 'bg-orange-400', 'bg-indigo-400', 'bg-emerald-700', 'bg-sky-700', 'bg-amber-700',
];

export const CalciumCalculator: React.FC = () => {
  const [servings, setServings] = useState<Record<string, number>>({});
  const set = (id: string, d: number) => setServings((s) => ({ ...s, [id]: Math.max(0, Math.min(6, (s[id] ?? 0) + d)) }));

  const { total, parts } = useMemo(() => {
    const ps = CALCIUM_FOODS.map((f, i) => ({ ...f, n: servings[f.id] ?? 0, color: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }))
      .filter((f) => f.n > 0)
      .map((f) => ({ ...f, sub: f.n * f.mg }));
    return { total: ps.reduce((s, p) => s + p.sub, 0), parts: ps };
  }, [servings]);

  const gap = Math.max(0, CALCIUM_TARGET - total);
  const scale = Math.max(CALCIUM_TARGET * 1.3, total);
  const pct = (v: number) => `${(v / scale) * 100}%`;

  let verdict: { text: string; tone: keyof typeof BAND_BOX };
  if (total >= CALCIUM_UL) verdict = { text: `已超過每日上限 ${CALCIUM_UL.toLocaleString()} mg，不需要也不建議再補鈣片。`, tone: 'bad' };
  else if (gap === 0) verdict = { text: '食物已達每日 1,000 mg，一般不需要再吃鈣片。', tone: 'good' };
  else if (gap <= 300) verdict = { text: `還差約 ${gap} mg：多加 1 杯牛奶或 2 片豆干就能補上；若要用補充劑，1 顆約 250–300 mg 即可。`, tone: 'warn' };
  else verdict = { text: `還差約 ${gap} mg：先從食物增加；若仍不足，補充劑以單次 500 mg 以內分次吃（碳酸鈣隨餐）。`, tone: 'warn' };

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-4 sm:p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[15px] font-bold text-slate-900 dark:text-white">
          <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          我今天吃了多少鈣？
        </p>
        <button
          type="button"
          onClick={() => setServings({})}
          className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1.5 text-[12px] font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          清除
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between">
          <p className="text-[13px] font-semibold text-slate-700 dark:text-slate-300">今日食物鈣</p>
          <p className="text-xl font-display font-bold tabular-nums text-slate-900 dark:text-white">
            {total.toLocaleString()} <span className="text-[13px] font-normal text-slate-500">/ {CALCIUM_TARGET.toLocaleString()} mg</span>
          </p>
        </div>
        <div className="relative h-5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex" aria-hidden="true">
          {parts.map((p) => (
            <span key={p.id} className={`h-full ${p.color}`} style={{ width: pct(p.sub) }} title={`${p.name} ${p.sub} mg`} />
          ))}
          <span className="absolute top-0 bottom-0 w-0.5 bg-slate-900 dark:bg-white" style={{ left: pct(CALCIUM_TARGET) }} />
        </div>
        {parts.length > 0 && (
          <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400">
            {parts.map((p) => (
              <li key={p.id} className="inline-flex items-center gap-1">
                <span className={`w-2.5 h-2.5 rounded-sm ${p.color}`} aria-hidden="true" />
                {p.name} {p.sub} mg
              </li>
            ))}
          </ul>
        )}
      </div>

      <div aria-live="polite" className={`rounded-xl border p-3 text-[13px] ${BAND_BOX[verdict.tone]}`}>
        {total === 0 ? '點選 ＋ 加入今天吃的食物，看看離 1,000 mg 還差多少。' : verdict.text}
      </div>

      <ul className="grid gap-2 sm:grid-cols-2">
        {CALCIUM_FOODS.map((f) => {
          const n = servings[f.id] ?? 0;
          return (
            <li key={f.id} className={`flex items-center gap-3 rounded-xl border px-3 py-2 ${n ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-slate-900 dark:text-white">
                  {f.name} <span className="font-normal text-slate-500 dark:text-slate-400">· {f.portion}</span>
                </p>
                <p className="text-[12px] text-slate-600 dark:text-slate-400">
                  約 <span className="tabular-nums font-semibold">{f.mg}</span> mg{f.note ? `　${f.note}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button type="button" aria-label={`減少 ${f.name}`} onClick={() => set(f.id, -1)} disabled={!n} className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center disabled:opacity-40">
                  <Minus className="w-4 h-4" aria-hidden="true" />
                </button>
                <span className="w-6 text-center tabular-nums text-[14px] font-bold text-slate-900 dark:text-white" aria-label={`${f.name} ${n} 份`}>{n}</span>
                <button type="button" aria-label={`增加 ${f.name}`} onClick={() => set(f.id, 1)} className="w-8 h-8 rounded-lg border border-slate-300 dark:border-slate-700 inline-flex items-center justify-center">
                  <Plus className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="text-[11px] text-slate-500 dark:text-slate-400">數值為台灣食品成分資料庫約略值，品牌與做法不同會有差異。</p>
    </div>
  );
};
