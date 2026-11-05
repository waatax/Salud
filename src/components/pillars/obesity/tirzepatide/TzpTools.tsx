import React, { useMemo, useState } from 'react';
import { Check, Copy, Minus, Plus, Printer, RotateCcw, ShieldAlert } from 'lucide-react';
import {
  assessFit,
  COMORBIDITY_ITEMS,
  CONTRAINDICATION_ITEMS,
  DOSE_STEPS,
  PROTEIN_FOODS,
  projectLoss,
  proteinPlan,
  RED_FLAGS,
  SIDE_EFFECTS,
  stepAdvice,
  VISIT_QUESTIONS,
  type ContraId,
  type FitVerdict,
  type Progress,
  type StepVerdict,
  type Tolerance,
} from '../../../../data/tirzepatideData';
import { copyText } from '../../../../utils/copyText';
import { Choice, NumberField } from './chapterUi';

const CheckRow: React.FC<{ checked: boolean; onChange: () => void; children: React.ReactNode }> = ({ checked, onChange, children }) => (
  <label className="flex min-h-[44px] cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 text-sm leading-relaxed text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60">
    <input type="checkbox" checked={checked} onChange={onChange} className="mt-0.5 h-4 w-4 shrink-0 accent-emerald-700" />
    <span>{children}</span>
  </label>
);

const FIT_TONE: Record<FitVerdict, string> = {
  not_for_you: 'border-red-300 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100',
  meets_label: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100',
  meets_label_caution: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100',
  below_label_comorbid: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100',
  below_label: 'border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100',
};

/** Reads the label's criteria against what the reader enters. Nothing is stored or sent. */
export const FitChecker: React.FC = () => {
  const [height, setHeight] = useState<number | undefined>(165);
  const [weight, setWeight] = useState<number | undefined>(80);
  const [comorb, setComorb] = useState<string[]>([]);
  const [flags, setFlags] = useState<ContraId[]>([]);
  const valid = !!height && !!weight && height >= 120 && height <= 230 && weight >= 30 && weight <= 300;
  const result = valid ? assessFit(weight!, height!, comorb.length, flags) : null;
  const toggle = <T,>(list: T[], item: T, set: (v: T[]) => void) => set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="身高" unit="公分" value={height} onChange={setHeight} min={120} max={230} />
        <NumberField label="體重" unit="公斤" value={weight} onChange={setWeight} min={30} max={300} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-800 dark:text-slate-200">我有這些狀況（可複選）</legend>
          <div className="mt-1 grid gap-0.5">
            {COMORBIDITY_ITEMS.map((c) => (
              <CheckRow key={c} checked={comorb.includes(c)} onChange={() => toggle(comorb, c, setComorb)}>{c}</CheckRow>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-800 dark:text-slate-200">需要特別注意的情況（可複選）</legend>
          <div className="mt-1 grid gap-0.5">
            {CONTRAINDICATION_ITEMS.map((c) => (
              <CheckRow key={c.id} checked={flags.includes(c.id)} onChange={() => toggle(flags, c.id, setFlags)}>{c.label}</CheckRow>
            ))}
          </div>
        </fieldset>
      </div>
      <div aria-live="polite">
        {result ? (
          <div className={`rounded-xl border p-4 ${FIT_TONE[result.verdict]}`}>
            <div className="text-xs font-semibold opacity-80">BMI {result.bmi.toFixed(1)}</div>
            <div className="mt-0.5 text-base font-bold">{result.title}</div>
            <p className="mt-1 text-sm leading-relaxed">{result.detail}</p>
          </div>
        ) : (
          <p className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">請輸入身高與體重。</p>
        )}
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">這只是把適應條件整理給你看，不是診斷，也不代表應該用藥。資料不會儲存或上傳。</p>
    </div>
  );
};

/** Trial averages applied to one weight, framed as a range rather than a promise. */
export const WeightProjection: React.FC = () => {
  const [weight, setWeight] = useState<number | undefined>(80);
  const valid = !!weight && weight >= 30 && weight <= 300;
  const rows = useMemo(() => (valid ? projectLoss(weight!) : []), [valid, weight]);
  return (
    <div className="space-y-3">
      <div className="max-w-[200px]">
        <NumberField label="我現在的體重" unit="公斤" value={weight} onChange={setWeight} min={30} max={300} />
      </div>
      {valid && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {rows.map((r) => (
            <div key={r.arm} className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">{r.arm}</div>
              <div className="mt-1 font-display text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">−{r.kg.toFixed(1)} <span className="text-sm font-medium">公斤</span></div>
              <div className="text-xs text-slate-600 dark:text-slate-400">試驗平均 −{r.pct}%，約到 {r.newWeight.toFixed(1)} 公斤</div>
              <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">仍有約 {r.under5}% 的人減不到 5%</div>
            </div>
          ))}
        </div>
      )}
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">用 SURMOUNT-1 的 72 週平均值換算，不是個人預測。基礎體重較輕、合併糖尿病或未持續用藥時，結果可能較少。</p>
    </div>
  );
};

const STEP_TONE: Record<StepVerdict, string> = {
  hold_call: 'border-red-300 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100',
  wait: 'border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100',
  extend: 'border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100',
  must_step: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100',
  at_max: 'border-slate-300 bg-slate-100 text-slate-900 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-100',
  stay: 'border-emerald-300 bg-emerald-50 text-emerald-950 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-100',
  can_discuss_up: 'border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100',
};

export const StepGuide: React.FC = () => {
  const [mg, setMg] = useState(5);
  const [weeks, setWeeks] = useState(4);
  const [tolerance, setTolerance] = useState<Tolerance>('fine');
  const [progress, setProgress] = useState<Progress>('on_track');
  const advice = stepAdvice({ currentMg: mg, weeksOnDose: weeks, tolerance, progress });
  return (
    <div className="space-y-4">
      <Choice<number> legend="1. 目前劑量（mg）" options={DOSE_STEPS.map((d) => ({ value: d.mg, label: String(d.mg) }))} value={mg} onChange={setMg} columns={6} />
      <Choice<number>
        legend="2. 在這個劑量多久了？"
        options={[
          { value: 2, label: '不到 4 週' },
          { value: 4, label: '滿 4 週' },
          { value: 8, label: '8 週以上' },
        ]}
        value={weeks}
        onChange={setWeeks}
        columns={3}
      />
      <Choice<Tolerance>
        legend="3. 腸胃狀況"
        options={[
          { value: 'fine', label: '沒什麼不舒服，吃得下' },
          { value: 'mild', label: '有噁心、脹氣，但還能吃' },
          { value: 'severe', label: '常吐、吃不下或喝不下' },
        ]}
        value={tolerance}
        onChange={setTolerance}
      />
      <Choice<Progress>
        legend="4. 這段時間的進展"
        options={[
          { value: 'on_track', label: '體重與三高數字持續改善' },
          { value: 'slow', label: '超過 4 週幾乎沒變，且未達目標' },
          { value: 'goal_met', label: '已經達到和醫師訂的目標' },
        ]}
        value={progress}
        onChange={setProgress}
      />
      <div aria-live="polite" className={`rounded-xl border p-4 ${STEP_TONE[advice.verdict]}`}>
        <div className="text-base font-bold">{advice.title}</div>
        <p className="mt-1 text-sm leading-relaxed">{advice.detail}</p>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">用來整理下次回診要談的重點。升降劑量一律由處方醫師決定，請勿自行調整。</p>
    </div>
  );
};

/** Target calculator plus a tap-to-add plate using Taiwan's food-exchange portions. */
export const ProteinPlanner: React.FC = () => {
  const [height, setHeight] = useState<number | undefined>(165);
  const [weight, setWeight] = useState<number | undefined>(80);
  const [counts, setCounts] = useState<Record<string, number>>({ egg: 2, soy: 1, fish: 3, chicken: 3 });
  const valid = !!height && !!weight && height >= 120 && height <= 230 && weight >= 30 && weight <= 300;
  const plan = valid ? proteinPlan(weight!, height!) : null;
  const total = PROTEIN_FOODS.reduce((sum, f) => sum + (counts[f.id] ?? 0) * f.g, 0);
  const pct = plan ? Math.min(100, (total / plan.highG) * 100) : 0;
  const lowMark = plan ? (plan.lowG / plan.highG) * 100 : 0;
  const status = !plan ? '' : total < plan.lowG ? `還差 ${plan.lowG - total} 公克` : total <= plan.highG ? '已達目標範圍' : '已超過範圍上限，不需要再加';
  const bump = (id: string, d: number) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="身高" unit="公分" value={height} onChange={setHeight} min={120} max={230} />
        <NumberField label="體重" unit="公斤" value={weight} onChange={setWeight} min={30} max={300} />
      </div>
      {plan && (
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
            <dt className="text-xs text-slate-600 dark:text-slate-400">每日蛋白質目標</dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums text-emerald-900 dark:text-emerald-200">{plan.lowG}–{plan.highG} <span className="text-sm font-medium">公克</span></dd>
          </div>
          <div className="rounded-xl bg-emerald-50 p-3 dark:bg-emerald-950/30">
            <dt className="text-xs text-slate-600 dark:text-slate-400">分 3–4 餐，每餐約</dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums text-emerald-900 dark:text-emerald-200">{plan.perMealLow}–{plan.perMealHigh} <span className="text-sm font-medium">公克</span></dd>
          </div>
          <div className="col-span-2 rounded-xl bg-slate-100 p-3 dark:bg-slate-800/60 sm:col-span-1">
            <dt className="text-xs text-slate-600 dark:text-slate-400">計算用的參考體重</dt>
            <dd className="font-display text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">{plan.referenceKg} <span className="text-sm font-medium">公斤</span></dd>
          </div>
        </dl>
      )}
      <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        依每公斤 1.2–1.6 公克估算。BMI ≥27 時，用「理想體重＋多餘體重的 25%」避免高估。共識指出最佳參考體重尚無定論，實務上多數人落在每日 80–120 公克。
        <strong className="font-semibold text-slate-700 dark:text-slate-300">慢性腎臟病或 eGFR &lt;60 者，目標請先問腎臟科或營養師。</strong>
      </p>
      <div>
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">排排看你的一天</h4>
          <button type="button" onClick={() => setCounts({})} className="inline-flex min-h-[36px] items-center gap-1 rounded-lg px-2 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />清空
          </button>
        </div>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {PROTEIN_FOODS.map((f) => {
            const n = counts[f.id] ?? 0;
            return (
              <li key={f.id} className={`flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${n > 0 ? 'border-emerald-300 bg-emerald-50/60 dark:border-emerald-800 dark:bg-emerald-950/20' : 'border-slate-200 dark:border-slate-800'}`}>
                <div className="min-w-0 flex-1 text-sm">
                  <div className="font-medium text-slate-900 dark:text-slate-100">{f.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{f.portion} ≈ {f.g} 公克</div>
                </div>
                <button type="button" onClick={() => bump(f.id, -1)} aria-label={`${f.name}減一份`} disabled={n === 0} className="grid h-9 w-9 place-items-center rounded-lg border border-slate-300 text-slate-700 disabled:opacity-30 dark:border-slate-700 dark:text-slate-300">
                  <Minus className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="w-5 text-center text-sm font-semibold tabular-nums text-slate-900 dark:text-white" aria-live="polite">{n}</span>
                <button type="button" onClick={() => bump(f.id, 1)} aria-label={`${f.name}加一份`} className="grid h-9 w-9 place-items-center rounded-lg border border-emerald-500 text-emerald-800 dark:text-emerald-300">
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
        {plan && (
          <div className="mt-3" aria-live="polite">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-semibold text-slate-900 dark:text-white">合計 <span className="tabular-nums">{total}</span> 公克</span>
              <span className="text-slate-600 dark:text-slate-400">{status}</span>
            </div>
            <div className="relative mt-1 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div className="h-full rounded-full bg-emerald-600 transition-[width] duration-300" style={{ width: `${pct}%` }} />
              <div className="absolute inset-y-0 w-0.5 bg-slate-900 dark:bg-white" style={{ left: `${lowMark}%` }} aria-hidden="true" />
            </div>
            <div className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">黑線是目標下限，右端是上限。份量依國健署食物代換估算，生重為準。</div>
          </div>
        )}
      </div>
    </div>
  );
};

export const SideEffectExplorer: React.FC = () => {
  const [id, setId] = useState(SIDE_EFFECTS[0].id);
  const s = SIDE_EFFECTS.find((x) => x.id === id) ?? SIDE_EFFECTS[0];
  return (
    <div className="space-y-3">
      <div role="tablist" aria-label="選擇症狀" className="flex flex-wrap gap-1.5">
        {SIDE_EFFECTS.map((x) => (
          <button
            key={x.id}
            type="button"
            role="tab"
            aria-selected={x.id === id}
            onClick={() => setId(x.id)}
            className={`min-h-[40px] rounded-lg border px-3 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 ${
              x.id === id ? 'border-emerald-700 bg-emerald-700 font-semibold text-white dark:bg-emerald-600' : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
            }`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h4 className="text-base font-bold text-slate-900 dark:text-white">{s.name}</h4>
          <span className="text-xs text-slate-500 dark:text-slate-400">{s.rate}</span>
        </div>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{s.why}</p>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-emerald-200 bg-white p-3 dark:border-emerald-900 dark:bg-slate-900">
            <div className="text-sm font-bold text-emerald-800 dark:text-emerald-300">先這樣做</div>
            <ul className="mt-1.5 space-y-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {s.selfCare.map((t) => (
                <li key={t} className="flex gap-1.5"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-sky-200 bg-white p-3 dark:border-sky-900 dark:bg-slate-900">
            <div className="text-sm font-bold text-sky-800 dark:text-sky-300">和醫師討論</div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{s.askDoctor}</p>
          </div>
          <div className="rounded-lg border border-red-200 bg-white p-3 dark:border-red-900 dark:bg-slate-900">
            <div className="text-sm font-bold text-red-800 dark:text-red-300">需要就醫</div>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{s.urgent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RedFlagList: React.FC = () => (
  <div className="rounded-2xl border-2 border-red-300 bg-red-50/70 p-4 dark:border-red-900 dark:bg-red-950/20">
    <h3 className="flex items-center gap-2 text-base font-bold text-red-900 dark:text-red-200">
      <ShieldAlert className="h-5 w-5" aria-hidden="true" />
      這些情況不要等下次回診
    </h3>
    <ul className="mt-3 grid gap-2 md:grid-cols-2">
      {RED_FLAGS.map((f) => (
        <li key={f.sign} className="rounded-lg border border-red-200 bg-white p-3 text-sm leading-relaxed dark:border-red-900/60 dark:bg-slate-900">
          <div className="font-semibold text-slate-900 dark:text-white">{f.sign}</div>
          <div className="mt-0.5 text-slate-600 dark:text-slate-400">可能是 {f.meaning}</div>
          <div className="mt-0.5 font-medium text-red-800 dark:text-red-300">{f.action}</div>
        </li>
      ))}
    </ul>
  </div>
);

export const VisitChecklist: React.FC = () => {
  const [picked, setPicked] = useState<string[]>(VISIT_QUESTIONS);
  const [copied, setCopied] = useState(false);
  const text = `【猛健樂看診問題】\n${picked.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
  return (
    <div className="space-y-3">
      <ul className="grid gap-0.5">
        {VISIT_QUESTIONS.map((q) => (
          <li key={q}>
            <CheckRow checked={picked.includes(q)} onChange={() => setPicked((p) => (p.includes(q) ? p.filter((x) => x !== q) : [...p, q]))}>{q}</CheckRow>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2" data-print-hide>
        <button
          type="button"
          onClick={async () => setCopied(await copyText(text))}
          className="btn-tactile inline-flex min-h-[44px] items-center gap-1.5 rounded-xl bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 dark:bg-emerald-600"
        >
          {copied ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {copied ? '已複製，可貼到手機備忘錄' : `複製勾選的 ${picked.length} 個問題`}
        </button>
        <button type="button" onClick={() => window.print()} className="btn-tactile inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
          <Printer className="h-4 w-4" aria-hidden="true" />列印本章
        </button>
      </div>
    </div>
  );
};
