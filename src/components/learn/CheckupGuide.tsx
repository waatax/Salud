import React, { useMemo, useState } from 'react';
import { Search, ArrowRight, AlertTriangle, Lightbulb, BadgeCheck, Calculator, ClipboardList, CalendarCheck } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { LAB_METRICS, LAB_CATEGORIES, TAIWAN_SCREENINGS } from '../../data/learning/checkup';
import { LabCategory, LabTone } from '../../types/learning';
import { useHashTab } from '../../hooks/useHashTab';
import { CHECKUP_TABS, CheckupTab } from '../../config/routes';
import {
  BandResult,
  classifyBP,
  classifyFPG,
  classifyA1c,
  classifyBMI,
  classifyWHtR,
  classifyEGFR,
  countMetSyn,
} from '../../utils/labBands';
import { PageHeader } from './learnUi';
import { QuickTips } from './QuickTips';

const BAND_TONE: Record<LabTone, string> = {
  good: 'bg-emerald-50 text-emerald-900 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-800/70',
  neutral: 'bg-slate-50 text-slate-800 border-slate-200 dark:bg-slate-800/50 dark:text-slate-200 dark:border-slate-700',
  warn: 'bg-amber-50 text-amber-950 border-amber-200 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-800/70',
  bad: 'bg-rose-50 text-rose-900 border-rose-200 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-800/70',
};
const BAND_DOT: Record<LabTone, string> = {
  good: 'bg-emerald-500',
  neutral: 'bg-slate-400',
  warn: 'bg-amber-500',
  bad: 'bg-rose-500',
};


export const CheckupGuide: React.FC = () => {
  const [tab, setTab] = useHashTab<CheckupTab>('checkup', CHECKUP_TABS, 'quick');

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        eyebrow="看懂健檢報告"
        title="紅字嚴不嚴重？你的目標是多少？"
        lead="把報告上的數字填進來，先知道它落在哪一區；再看每一項檢驗在測什麼、怎麼量才準、最常被誤讀的地方。最後對照台灣公費篩檢，看看自己該做哪些。"
      />

      <QuickTips sectionKey="checkup" />

      <div className="flex gap-1 rounded-2xl bg-slate-100 dark:bg-slate-900 p-1 w-full sm:w-fit" role="tablist" aria-label="健檢指南分頁">
        {[
          { id: 'quick' as const, label: '報告快查', icon: Calculator },
          { id: 'labs' as const, label: '檢驗數值解讀', icon: ClipboardList },
          { id: 'screening' as const, label: '台灣公費篩檢', icon: CalendarCheck },
        ].map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm transition-colors ${
              tab === t.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <t.icon className="w-4 h-4" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'quick' && <QuickRead />}
      {tab === 'labs' && <LabReference />}
      {tab === 'screening' && <ScreeningList />}

      <p className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
        <AlertTriangle className="w-4 h-4 shrink-0 mt-1 text-amber-500" aria-hidden="true" />
        各實驗室參考範圍略有不同；單次數值不能作為診斷。數值異常、或同時有症狀時，請帶著報告與你的醫師討論。
      </p>
    </div>
  );
};

const num = (s: string) => {
  const v = parseFloat(s);
  return Number.isFinite(v) ? v : 0;
};

const Field: React.FC<{
  label: string;
  unit: string;
  value: string;
  onChange: (v: string) => void;
  step?: string;
}> = ({ label, unit, value, onChange, step = '1' }) => (
  <label className="flex flex-col gap-1">
    <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
    <span className="flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-emerald-500">
      <input
        type="number"
        inputMode="decimal"
        min="0"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full min-w-0 bg-transparent px-3 py-2 text-base text-slate-900 dark:text-white outline-none tabular-nums"
      />
      <span className="px-3 text-xs text-slate-500 shrink-0">{unit}</span>
    </span>
  </label>
);

const ResultRow: React.FC<{ name: string; value?: string; result: BandResult | null }> = ({ name, value, result }) => {
  if (!result) return null;
  return (
    <li className={`rounded-xl border p-3 ${BAND_TONE[result.tone]}`}>
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${BAND_DOT[result.tone]}`} aria-hidden="true" />
        <span className="text-sm font-semibold">{name}</span>
        {value && <span className="text-sm tabular-nums opacity-80">{value}</span>}
        <span className="ml-auto text-sm font-bold">{result.label_zh}</span>
      </div>
      {result.note_zh && <p className="mt-1 text-sm leading-6 opacity-90">{result.note_zh}</p>}
    </li>
  );
};

const QuickRead: React.FC = () => {
  const [f, setF] = useState({ sex: 'M' as 'M' | 'F', sys: '', dia: '', fpg: '', a1c: '', height: '', weight: '', waist: '', egfr: '', tg: '', hdl: '' });
  const set = (k: keyof typeof f) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  const bp = classifyBP(num(f.sys), num(f.dia));
  const fpg = classifyFPG(num(f.fpg));
  const a1c = classifyA1c(num(f.a1c));
  const bmi = classifyBMI(num(f.weight), num(f.height));
  const whtr = classifyWHtR(num(f.waist), num(f.height));
  const egfr = classifyEGFR(num(f.egfr));
  const ms = countMetSyn({
    sex: f.sex,
    waistCm: num(f.waist) || undefined,
    sys: num(f.sys) || undefined,
    dia: num(f.dia) || undefined,
    fpg: num(f.fpg) || undefined,
    tg: num(f.tg) || undefined,
    hdl: num(f.hdl) || undefined,
  });
  const any = bp || fpg || a1c || bmi || whtr || egfr || ms.known > 0;

  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
      <form className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5" onSubmit={(e) => e.preventDefault()}>
        <p className="text-sm text-slate-600 dark:text-slate-400">只填你有的數字即可。資料只在這個畫面計算，不會儲存或上傳。</p>
        <fieldset className="flex gap-2" aria-label="生理性別（影響腰圍與 HDL 標準）">
          {(['M', 'F'] as const).map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setF((p) => ({ ...p, sex: s }))}
              aria-pressed={f.sex === s}
              className={`rounded-xl border px-4 py-1.5 text-sm ${
                f.sex === s ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold' : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {s === 'M' ? '男性' : '女性'}
            </button>
          ))}
        </fieldset>
        <div className="grid grid-cols-2 gap-3">
          <Field label="收縮壓（上）" unit="mmHg" value={f.sys} onChange={set('sys')} />
          <Field label="舒張壓（下）" unit="mmHg" value={f.dia} onChange={set('dia')} />
          <Field label="空腹血糖" unit="mg/dL" value={f.fpg} onChange={set('fpg')} />
          <Field label="糖化血色素" unit="%" value={f.a1c} onChange={set('a1c')} step="0.1" />
          <Field label="身高" unit="cm" value={f.height} onChange={set('height')} />
          <Field label="體重" unit="kg" value={f.weight} onChange={set('weight')} step="0.1" />
          <Field label="腰圍" unit="cm" value={f.waist} onChange={set('waist')} step="0.5" />
          <Field label="eGFR" unit="mL/min" value={f.egfr} onChange={set('egfr')} />
          <Field label="三酸甘油酯" unit="mg/dL" value={f.tg} onChange={set('tg')} />
          <Field label="HDL 膽固醇" unit="mg/dL" value={f.hdl} onChange={set('hdl')} />
        </div>
      </form>

      <div className="space-y-3" aria-live="polite">
        {!any ? (
          <div className="h-full min-h-[12rem] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400">
            填入任一數值，這裡會顯示它落在哪一區，以及下一步可以做什麼。
          </div>
        ) : (
          <>
            <ul className="space-y-2">
              <ResultRow name="血壓" value={bp ? `${f.sys}/${f.dia}` : undefined} result={bp} />
              <ResultRow name="空腹血糖" value={f.fpg} result={fpg} />
              <ResultRow name="糖化血色素" value={f.a1c ? `${f.a1c}%` : undefined} result={a1c} />
              <ResultRow name="BMI" value={bmi ? bmi.value.toFixed(1) : undefined} result={bmi} />
              <ResultRow name="腰圍身高比" value={whtr ? String(whtr.value) : undefined} result={whtr} />
              <ResultRow name="eGFR" value={f.egfr} result={egfr} />
            </ul>
            {ms.known >= 3 && (
              <div className={`rounded-xl border p-3 ${BAND_TONE[ms.met >= 3 ? 'bad' : ms.met > 0 ? 'warn' : 'good']}`}>
                <p className="text-sm font-semibold">
                  代謝症候群：已填 {ms.known} 項中符合 {ms.met} 項
                  {ms.met >= 3 ? '（達判定標準）' : ms.known < 5 ? '（尚有項目未填）' : ''}
                </p>
                <p className="text-sm leading-6 mt-1 opacity-90">
                  判定需五項中符合三項：腰圍、血壓 ≥130/85、空腹血糖 ≥100、三酸甘油酯 ≥150、HDL 偏低。
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const LabReference: React.FC = () => {
  const { go } = useNavigation();
  const [cat, setCat] = useState<LabCategory | 'all'>('all');
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return LAB_METRICS.filter(
      (m) =>
        (cat === 'all' || m.category === cat) &&
        (!needle || `${m.name_zh} ${m.abbr} ${m.what_zh}`.toLowerCase().includes(needle))
    );
  }, [cat, q]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <label className="relative flex-1 max-w-md">
          <span className="sr-only">搜尋檢驗項目</span>
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜尋：LDL、肝指數、eGFR…"
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-[15px] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </label>
      </div>
      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依類別篩選">
        {(['all', ...LAB_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              cat === c
                ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
            }`}
          >
            {c === 'all' ? '全部' : c}
          </button>
        ))}
      </div>

      {list.length === 0 && <p className="text-sm text-slate-500">找不到符合的項目。</p>}

      <div className="grid md:grid-cols-2 gap-4">
        {list.map((m) => (
          <article key={m.id} id={m.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
            <header>
              <p className="text-xs text-slate-500 dark:text-slate-400">{m.category} · 單位 {m.unit}</p>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {m.name_zh} <span className="text-sm font-normal text-slate-500">{m.abbr}</span>
              </h3>
            </header>
            <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{m.what_zh}</p>
            <ul className="space-y-1.5" aria-label="數值分區">
              {m.bands.map((b) => (
                <li key={b.label_zh} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${BAND_TONE[b.tone]}`}>
                  <span className={`w-2 h-2 rounded-full shrink-0 ${BAND_DOT[b.tone]}`} aria-hidden="true" />
                  <span className="flex-1">{b.label_zh}</span>
                  <span className="font-semibold tabular-nums text-right">{b.range_zh}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5">
              {m.tips_zh.map((t, i) => (
                <p key={i} className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  <Lightbulb className="w-4 h-4 shrink-0 mt-1 text-amber-500" aria-hidden="true" />
                  <span>{t}</span>
                </p>
              ))}
            </div>
            {m.pitfall_zh && (
              <p className="text-sm leading-6 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 text-rose-950 dark:text-rose-100 p-3">
                <strong>常見誤讀：</strong>
                {m.pitfall_zh}
              </p>
            )}
            <footer className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-500 dark:text-slate-400">
              <span>依據：{m.authority}</span>
              {m.related_hash && (
                <button onClick={() => go(m.related_hash!)} className="ml-auto inline-flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">
                  深入了解
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
};

const ScreeningList: React.FC = () => (
  <div className="space-y-4">
    <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-400">
      以下為衛福部國民健康署 2025–2026 年的公費預防服務。帶健保卡到有提供服務的醫療院所即可；詳細資格以國健署最新公告為準。
    </p>
    <div className="grid md:grid-cols-2 gap-4">
      {TAIWAN_SCREENINGS.map((s) => (
        <article key={s.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3">
          <header className="flex items-start gap-2">
            <h3 className="flex-1 text-base font-bold text-slate-900 dark:text-white">{s.name_zh}</h3>
            <span
              className={`shrink-0 inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
                s.funded
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                  : 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700'
              }`}
            >
              {s.funded && <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />}
              {s.funded ? '公費' : '多為自費'}
            </span>
          </header>
          <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-2 text-sm leading-6">
            <dt className="text-slate-500 dark:text-slate-400">對象</dt>
            <dd className="text-slate-800 dark:text-slate-200">{s.who_zh}</dd>
            <dt className="text-slate-500 dark:text-slate-400">方式</dt>
            <dd className="text-slate-800 dark:text-slate-200">{s.how_zh}</dd>
            <dt className="text-slate-500 dark:text-slate-400">頻率</dt>
            <dd className="text-slate-800 dark:text-slate-200 font-semibold">{s.frequency_zh}</dd>
          </dl>
          {s.note_zh && <p className="text-sm leading-6 text-slate-600 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-2">{s.note_zh}</p>}
          <p className="text-xs text-slate-400">依據：{s.authority}</p>
        </article>
      ))}
    </div>
  </div>
);
