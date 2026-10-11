import React, { useMemo, useState } from 'react';
import { MapPin, Siren, ClipboardCheck, RotateCcw } from 'lucide-react';
import { NUMB_LOCATOR, RED_FLAG_TIERS, URGENCY_META, Urgency, DAILY_CHECKLIST } from '../../../data/spineData';

/**
 * Interactive helpers for the spine zone. They narrow possibilities and say how soon
 * to be seen; they never name a diagnosis as certain. Every result repeats that a
 * clinician's examination decides.
 */

const URGENCY_BOX: Record<Urgency, string> = {
  now: 'border-rose-400 dark:border-rose-700 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-100',
  soon: 'border-amber-400 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/30 text-amber-950 dark:text-amber-100',
  clinic: 'border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/30 text-sky-950 dark:text-sky-100',
  self: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-100',
};

const URGENCY_DOT: Record<Urgency, string> = {
  now: 'bg-rose-600',
  soon: 'bg-amber-500',
  clinic: 'bg-sky-600',
  self: 'bg-emerald-600',
};

export const UrgencyBadge: React.FC<{ level: Urgency }> = ({ level }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[12px] font-bold ${URGENCY_BOX[level]}`}>
    <span className={`w-2 h-2 rounded-full ${URGENCY_DOT[level]}`} aria-hidden="true" />
    {URGENCY_META[level].short}
  </span>
);

// ── Where is it numb? ───────────────────────────────────────────────────

const AREA_LABEL = { whole: '全身／緊急', hand: '手', arm: '手臂', leg: '大腿／小腿', foot: '腳' } as const;

export const NumbLocator: React.FC = () => {
  const [pick, setPick] = useState<string>('thumb-index');
  const opt = NUMB_LOCATOR.find((o) => o.id === pick) ?? NUMB_LOCATOR[0];
  const groups = useMemo(() => {
    const order: (keyof typeof AREA_LABEL)[] = ['whole', 'hand', 'arm', 'leg', 'foot'];
    return order.map((a) => ({ area: a, items: NUMB_LOCATOR.filter((o) => o.area === a) })).filter((g) => g.items.length);
  }, []);
  return (
    <section className="rounded-2xl border-2 border-sky-200 dark:border-sky-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4" aria-labelledby="numb-locator-h">
      <div className="flex items-center gap-2">
        <MapPin className="w-5 h-5 text-sky-600 dark:text-sky-400" aria-hidden="true" />
        <h3 id="numb-locator-h" className="text-base font-bold text-slate-900 dark:text-white">
          互動工具：我的麻在哪裡？
        </h3>
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400 -mt-2">選一個最接近你的描述，看看常見原因、醫師會問什麼，以及多快該就醫。</p>
      <div className="space-y-2.5">
        {groups.map((g) => (
          <div key={g.area} className="space-y-1.5">
            <p className="text-[12px] font-semibold text-slate-500 dark:text-slate-400">{AREA_LABEL[g.area]}</p>
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={AREA_LABEL[g.area]}>
              {g.items.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={pick === o.id}
                  onClick={() => setPick(o.id)}
                  className={`btn-tactile text-left rounded-xl border px-3 py-2 text-[13px] leading-snug transition-colors ${
                    pick === o.id
                      ? 'bg-sky-700 border-sky-700 text-white dark:bg-sky-400 dark:border-sky-400 dark:text-sky-950 font-semibold'
                      : o.urgency === 'now'
                      ? 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 hover:border-rose-500'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-sky-400'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`rounded-2xl border-2 p-4 space-y-3 ${URGENCY_BOX[opt.urgency]}`} role="status" aria-live="polite">
        <div className="flex flex-wrap items-center gap-2">
          <UrgencyBadge level={opt.urgency} />
          <span className="text-[13px] font-semibold">{URGENCY_META[opt.urgency].label}</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[12px] font-bold opacity-80 mb-1">常見可能原因</p>
            <ul className="space-y-1 text-[14px] leading-relaxed">
              {opt.likely.map((l) => (
                <li key={l} className="flex gap-1.5">
                  <span aria-hidden="true">•</span>
                  {l}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[12px] font-bold opacity-80 mb-1">先問自己（醫師也會問）</p>
            <ul className="space-y-1 text-[14px] leading-relaxed">
              {opt.ask.map((a) => (
                <li key={a} className="flex gap-1.5">
                  <span aria-hidden="true">?</span>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-[14px] leading-relaxed">
          <strong>下一步：</strong>
          {opt.next}
        </p>
      </div>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">這個工具只用來幫你整理方向，不能取代醫師的神經學檢查與診斷。</p>
    </section>
  );
};

// ── Red-flag checker ────────────────────────────────────────────────────

const ORDER: Urgency[] = ['now', 'soon', 'clinic', 'self'];

export const RedFlagChecker: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, true>>({});
  const toggle = (k: string) =>
    setChecked((c) => {
      const n = { ...c };
      if (n[k]) delete n[k];
      else n[k] = true;
      return n;
    });
  const highest = ORDER.find((lvl) => RED_FLAG_TIERS.find((t) => t.level === lvl)!.items.some((_, i) => checked[`${lvl}-${i}`]));
  return (
    <section className="rounded-2xl border-2 border-rose-200 dark:border-rose-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-4" aria-labelledby="redflag-h">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Siren className="w-5 h-5 text-rose-600 dark:text-rose-400" aria-hidden="true" />
          <h3 id="redflag-h" className="text-base font-bold text-slate-900 dark:text-white">
            互動工具：我需要多快就醫？
          </h3>
        </div>
        {Object.keys(checked).length > 0 && (
          <button type="button" onClick={() => setChecked({})} className="inline-flex items-center gap-1 text-[12px] font-semibold text-slate-600 dark:text-slate-300 hover:underline">
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            清除
          </button>
        )}
      </div>
      <p className="text-[13px] text-slate-600 dark:text-slate-400 -mt-2">勾選所有符合你的狀況，系統會顯示「最緊急」的那一級。</p>
      <div className="grid gap-3 lg:grid-cols-2">
        {RED_FLAG_TIERS.map((tier) => (
          <fieldset key={tier.level} className={`rounded-xl border p-3 ${URGENCY_BOX[tier.level]}`}>
            <legend className="px-1 text-[13px] font-bold flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${URGENCY_DOT[tier.level]}`} aria-hidden="true" />
              {URGENCY_META[tier.level].label}
            </legend>
            <ul className="space-y-1.5 mt-1">
              {tier.items.map((it, i) => {
                const k = `${tier.level}-${i}`;
                return (
                  <li key={k}>
                    <label className="flex gap-2 items-start text-[13px] leading-relaxed cursor-pointer">
                      <input type="checkbox" checked={!!checked[k]} onChange={() => toggle(k)} className="mt-1 w-4 h-4 shrink-0 accent-rose-600" />
                      <span>{it}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
      <div role="status" aria-live="polite">
        {highest ? (
          <div className={`rounded-2xl border-2 p-4 ${URGENCY_BOX[highest]}`}>
            <p className="text-[12px] font-bold opacity-80">你的結果</p>
            <p className="text-lg font-bold">{URGENCY_META[highest].label}</p>
            {highest === 'now' && <p className="text-[14px] mt-1">請立即撥打 119，或請家人陪同前往急診；不要自行開車。</p>}
            {highest === 'soon' && <p className="text-[14px] mt-1">請在 1–3 天內就醫（神經外科、骨科脊椎或神經內科）；若症狀快速惡化，直接到急診。</p>}
            {highest === 'clinic' && <p className="text-[14px] mt-1">安排復健科、骨科或家醫科門診，並參考下方「就醫前準備」整理資訊。</p>}
            {highest === 'self' && <p className="text-[14px] mt-1">可以先依本專區的姿勢與運動建議自我照護 2–6 週；若出現上面任何一項，再提早就醫。</p>}
          </div>
        ) : (
          <p className="text-[13px] text-slate-500 dark:text-slate-400">尚未勾選任何項目。</p>
        )}
      </div>
    </section>
  );
};

// ── Daily checklist (resets each day) ───────────────────────────────────

const todayKey = () => {
  const d = new Date();
  return `salud-spine-daily-${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const DailySpineChecklist: React.FC = () => {
  const key = todayKey();
  const [done, setDone] = useState<number[]>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as number[]) : [];
    } catch {
      return [];
    }
  });
  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };
  const pct = Math.round((done.length / DAILY_CHECKLIST.length) * 100);
  return (
    <section className="rounded-2xl border border-emerald-200 dark:border-emerald-900/70 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3" aria-labelledby="daily-spine-h">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <h3 id="daily-spine-h" className="text-base font-bold text-slate-900 dark:text-white">
            今日護脊清單
          </h3>
        </div>
        <span className="text-[13px] font-semibold text-emerald-700 dark:text-emerald-300 tabular-nums">
          {done.length}/{DAILY_CHECKLIST.length}
        </span>
      </div>
      <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="今日護脊清單完成度">
        <div className="h-full bg-emerald-600 dark:bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
      </div>
      <ul className="grid gap-1.5 sm:grid-cols-2">
        {DAILY_CHECKLIST.map((c, i) => (
          <li key={c}>
            <label className="flex gap-2 items-start rounded-xl border border-slate-200 dark:border-slate-800 px-3 py-2 text-[13px] leading-snug cursor-pointer hover:border-emerald-400">
              <input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} className="mt-0.5 w-4 h-4 shrink-0 accent-emerald-600" />
              <span className={done.includes(i) ? 'line-through text-slate-500 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}>{c}</span>
            </label>
          </li>
        ))}
      </ul>
      <p className="text-[12px] text-slate-500 dark:text-slate-400">清單每天自動重新開始，只存在你自己的瀏覽器。</p>
    </section>
  );
};
