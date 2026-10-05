import React, { useMemo, useState } from 'react';
import {
  Search,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  BadgeCheck,
  Calculator,
  ClipboardList,
  CalendarCheck,
  Table as TableIcon,
  LayoutGrid,
  Sparkles,
  Clock,
  ShieldCheck,
  Activity,
  Layers,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { LAB_METRICS, LAB_CATEGORIES, TAIWAN_SCREENINGS } from '../../data/learning/checkup';
import { LabCategory, LabTone, LabMetric } from '../../types/learning';
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

      <div className="flex gap-1 rounded-2xl bg-slate-100 dark:bg-slate-900 p-1 w-full sm:w-fit shadow-xs" role="tablist" aria-label="健檢指南分頁">
        {[
          { id: 'quick' as const, label: '報告快查與建議', icon: Calculator },
          { id: 'labs' as const, label: '檢驗數值解讀與總表', icon: ClipboardList },
          { id: 'screening' as const, label: '台灣公費篩檢時間軸', icon: CalendarCheck },
        ].map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-sm transition-colors ${
              tab === t.id
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold shadow-xs'
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
    <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">{label}</span>
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
    <li className={`rounded-2xl border p-4 transition-all shadow-xs ${BAND_TONE[result.tone]}`}>
      <div className="flex items-center gap-2.5">
        <span className={`w-3 h-3 rounded-full shrink-0 ${BAND_DOT[result.tone]}`} aria-hidden="true" />
        <span className="text-[15px] font-bold">{name}</span>
        {value && (
          <span className="text-sm tabular-nums px-2 py-0.5 rounded-md bg-white/70 dark:bg-black/20 border border-current/20 font-medium">
            {value}
          </span>
        )}
        <span className="ml-auto text-sm font-bold px-2.5 py-0.5 rounded-full border border-current/30">
          {result.label_zh}
        </span>
      </div>

      {/* Visual Spectrum Gauge Bar */}
      <div className="mt-3 space-y-1">
        <div className="grid grid-cols-4 gap-1 h-2 rounded-full overflow-hidden bg-slate-200/60 dark:bg-slate-700/60" aria-hidden="true">
          <div className={`h-full rounded-l-full transition-opacity ${result.tone === 'good' ? 'bg-emerald-500 opacity-100 ring-2 ring-emerald-600' : 'bg-emerald-300 dark:bg-emerald-800 opacity-30'}`} />
          <div className={`h-full transition-opacity ${result.tone === 'neutral' ? 'bg-slate-500 opacity-100 ring-2 ring-slate-600' : 'bg-slate-300 dark:bg-slate-600 opacity-30'}`} />
          <div className={`h-full transition-opacity ${result.tone === 'warn' ? 'bg-amber-500 opacity-100 ring-2 ring-amber-600' : 'bg-amber-300 dark:bg-amber-800 opacity-30'}`} />
          <div className={`h-full rounded-r-full transition-opacity ${result.tone === 'bad' ? 'bg-rose-500 opacity-100 ring-2 ring-rose-600' : 'bg-rose-300 dark:bg-rose-800 opacity-30'}`} />
        </div>
        <div className="flex justify-between text-[11px] opacity-75 font-medium px-0.5" aria-hidden="true">
          <span>理想</span>
          <span>臨界標準</span>
          <span>注意追蹤</span>
          <span>異常警戒</span>
        </div>
      </div>

      {result.note_zh && (
        <p className="mt-2.5 text-sm leading-6 opacity-95 border-t border-current/15 pt-2">
          {result.note_zh}
        </p>
      )}
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

  const evaluatedItems = useMemo(() => {
    const arr: { name: string; val: string; res: BandResult }[] = [];
    if (bp) arr.push({ name: '血壓', val: `${f.sys}/${f.dia} mmHg`, res: bp });
    if (fpg) arr.push({ name: '空腹血糖', val: `${f.fpg} mg/dL`, res: fpg });
    if (a1c) arr.push({ name: '糖化血色素', val: `${f.a1c}%`, res: a1c });
    if (bmi) arr.push({ name: 'BMI', val: bmi.value.toFixed(1), res: bmi });
    if (whtr) arr.push({ name: '腰圍身高比', val: String(whtr.value), res: whtr });
    if (egfr) arr.push({ name: 'eGFR', val: `${f.egfr} mL/min`, res: egfr });
    return arr;
  }, [bp, fpg, a1c, bmi, whtr, egfr, f]);

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-6">
        <form className="space-y-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs" onSubmit={(e) => e.preventDefault()}>
          <p className="text-sm text-slate-600 dark:text-slate-400">只填你有的數字即可。資料只在這個畫面計算，不會儲存或上傳。</p>
          <fieldset className="flex gap-2" aria-label="生理性別（影響腰圍與 HDL 標準）">
            {(['M', 'F'] as const).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => setF((p) => ({ ...p, sex: s }))}
                aria-pressed={f.sex === s}
                className={`rounded-xl border px-4 py-1.5 text-sm transition-colors ${
                  f.sex === s
                    ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950 font-semibold'
                    : 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500'
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
            <div className="h-full min-h-[16rem] rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center p-6 text-center text-sm text-slate-500 dark:text-slate-400 space-y-2">
              <Calculator className="w-8 h-8 text-slate-400" aria-hidden="true" />
              <span>填入任一數值，這裡會顯示它落在哪一區，以及下一步可以做什麼。</span>
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
                <div className={`rounded-xl border p-3.5 shadow-xs ${BAND_TONE[ms.met >= 3 ? 'bad' : ms.met > 0 ? 'warn' : 'good']}`}>
                  <p className="text-sm font-bold">
                    代謝症候群判定：已填 {ms.known} 項中符合 {ms.met} 項
                    {ms.met >= 3 ? '（已達判定標準 ⚠️）' : ms.known < 5 ? '（尚有指標未填）' : '（指標全數良好 🟢）'}
                  </p>
                  <p className="text-xs leading-5 mt-1 opacity-90">
                    判定需五項中符合三項：腰圍過粗、血壓 ≥130/85、空腹血糖 ≥100、三酸甘油酯 ≥150、HDL 偏低。符合三項以上將大幅提高心肌梗塞與糖尿病風險。
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 個人化臨床建議與複查週期總表 */}
      {evaluatedItems.length > 0 && <LabFollowUpAdviceTable items={evaluatedItems} />}
    </div>
  );
};

/** 個人化複查追蹤與臨床建議表 */
const LabFollowUpAdviceTable: React.FC<{ items: { name: string; val: string; res: BandResult }[] }> = ({ items }) => {
  const getAdvice = (tone: LabTone) => {
    switch (tone) {
      case 'good':
        return { freq: '每年例行健檢一次', action: '維持目前良好飲食與運動習慣', doctor: '無症狀常規追蹤即可' };
      case 'neutral':
        return { freq: '每 6–12 個月複檢', action: '落入臨界標準，建議開始 2:1:1 飲食並每週運動 150 分鐘', doctor: '回診時順便告知醫師' };
      case 'warn':
        return { freq: '每 3 個月居家或門診複查', action: '積極減重 5%、限制精緻糖與鹽分，避免菸酒', doctor: '掛號家醫科門診評估' };
      case 'bad':
        return { freq: '1–2 週內儘速複查', action: '暫停劇烈極端衝刺運動，每日記錄數值', doctor: '攜帶報告前往專科門診完整檢查' };
    }
  };

  return (
    <section aria-labelledby="advice-table-h" className="space-y-3 pt-2">
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2.5">
        <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        <h3 id="advice-table-h" className="text-base font-bold text-slate-900 dark:text-white">
          個人化數值解讀與複查追蹤建議表
        </h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
              <th scope="col" className="py-3 px-3.5 font-bold">檢驗項目</th>
              <th scope="col" className="py-3 px-3.5 font-bold">輸入數值</th>
              <th scope="col" className="py-3 px-3.5 font-bold">落點分區</th>
              <th scope="col" className="py-3 px-3.5 font-bold">建議複查頻率</th>
              <th scope="col" className="py-3 px-3.5 font-bold">首要生活改善</th>
              <th scope="col" className="py-3 px-3.5 font-bold">醫師諮詢時機</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {items.map((it, idx) => {
              const adv = getAdvice(it.res.tone);
              return (
                <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white">{it.name}</td>
                  <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 tabular-nums">{it.val}</td>
                  <td className="py-3 px-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${BAND_TONE[it.res.tone]}`}>
                      {it.res.label_zh}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-slate-700 dark:text-slate-300 font-medium">{adv.freq}</td>
                  <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">{adv.action}</td>
                  <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400">{adv.doctor}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const LabReference: React.FC = () => {
  const { go } = useNavigation();
  const [cat, setCat] = useState<LabCategory | 'all'>('all');
  const [q, setQ] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

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
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
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

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('cards')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'cards'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />
            卡片詳解
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              viewMode === 'table'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" aria-hidden="true" />
            指標總表
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2" role="toolbar" aria-label="依類別篩選">
        {(['all', ...LAB_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            aria-pressed={cat === c}
            className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
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

      {viewMode === 'table' ? (
        <ComprehensiveLabTable metrics={list} onDeepDive={(hash) => go(hash)} />
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {list.map((m) => (
            <article key={m.id} id={m.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-xs">
              <header>
                <p className="text-xs text-slate-500 dark:text-slate-400">{m.category} · 單位 {m.unit}</p>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {m.name_zh} <span className="text-sm font-normal text-slate-500">{m.abbr}</span>
                </h3>
              </header>
              <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300">{m.what_zh}</p>
              {/* Visual Bands Spectrum Preview */}
              <div className="flex h-2 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80" aria-hidden="true">
                {m.bands.map((b, bi) => {
                  const color =
                    b.tone === 'good'
                      ? 'bg-emerald-500'
                      : b.tone === 'neutral'
                      ? 'bg-slate-400'
                      : b.tone === 'warn'
                      ? 'bg-amber-500'
                      : 'bg-rose-500';
                  return <div key={bi} className={`flex-1 ${color} opacity-85`} title={`${b.label_zh}: ${b.range_zh}`} />;
                })}
              </div>
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
      )}
    </div>
  );
};

/** 全檢驗指標結構化速查總表 */
const ComprehensiveLabTable: React.FC<{ metrics: LabMetric[]; onDeepDive: (hash: string) => void }> = ({ metrics, onDeepDive }) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs bg-white dark:bg-slate-900/60">
      <table className="w-full text-left border-collapse text-xs sm:text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300">
            <th scope="col" className="py-3 px-3.5 font-bold w-1/5 min-w-[140px]">項目名稱 (縮寫)</th>
            <th scope="col" className="py-3 px-3.5 font-bold min-w-[90px]">類別 / 單位</th>
            <th scope="col" className="py-3 px-3.5 font-bold w-1/4 min-w-[150px]">生理意義</th>
            <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">分區標準與警戒值</th>
            <th scope="col" className="py-3 px-3.5 font-bold min-w-[160px]">常見誤區提醒</th>
            <th scope="col" className="py-3 px-3.5 font-bold min-w-[80px]">操作</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {metrics.map((m) => {
            const goodBand = m.bands.find((b) => b.tone === 'good');
            const warnBand = m.bands.find((b) => b.tone === 'warn' || b.tone === 'bad');
            return (
              <tr key={m.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-3.5 align-top">
                  <div className="font-bold text-slate-900 dark:text-white">{m.name_zh}</div>
                  <div className="text-xs text-slate-500 font-mono">{m.abbr}</div>
                </td>
                <td className="py-3 px-3.5 align-top text-slate-600 dark:text-slate-400">
                  <div>{m.category}</div>
                  <div className="text-xs opacity-75">{m.unit}</div>
                </td>
                <td className="py-3 px-3.5 align-top text-slate-700 dark:text-slate-300 leading-relaxed">
                  {m.what_zh}
                </td>
                <td className="py-3 px-3.5 align-top space-y-1">
                  {goodBand && (
                    <div className="text-emerald-700 dark:text-emerald-400 font-medium text-xs">
                      🟢 理想：{goodBand.range_zh}
                    </div>
                  )}
                  {warnBand && (
                    <div className="text-amber-700 dark:text-amber-400 font-medium text-xs">
                      ⚠️ 警戒：{warnBand.range_zh}
                    </div>
                  )}
                </td>
                <td className="py-3 px-3.5 align-top text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                  {m.pitfall_zh || m.tips_zh[0]}
                </td>
                <td className="py-3 px-3.5 align-top">
                  {m.related_hash && (
                    <button
                      onClick={() => onDeepDive(m.related_hash!)}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                    >
                      詳解 <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const ScreeningList: React.FC = () => (
  <div className="space-y-6">
    <p className="text-[15px] leading-7 text-slate-600 dark:text-slate-400">
      以下為衛福部國民健康署 2025–2026 年的公費預防服務。帶健保卡到有提供服務的醫療院所即可；詳細資格以國健署最新公告為準。
    </p>

    {/* 台灣全年齡公費篩檢時間軸圖解 */}
    <ScreeningTimelineChart />

    <div className="grid md:grid-cols-2 gap-4">
      {TAIWAN_SCREENINGS.map((s) => (
        <article key={s.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 space-y-3 shadow-xs">
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
              {s.funded ? '公費補助' : '多為自費'}
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

/** 台灣全年齡公費預防保健篩檢時間軸圖表 */
const ScreeningTimelineChart: React.FC = () => {
  const milestones = [
    { age: '25 歲起', items: ['子宮頸抹片檢查 (每年1次)'] },
    { age: '30 歲起', items: ['成人預防保健健檢 (2025新政下修)', '口腔黏膜檢查 (吸菸/嚼檳榔)'] },
    { age: '40 歲起', items: ['乳房 X 光攝影 (女性每2年)', '成人健檢 (每3年1次)'] },
    { age: '45 歲起', items: ['大腸癌糞便潛血 FIT (每2年)', '胃癌幽門桿菌篩檢 (2026新政一生1次)'] },
    { age: '50 歲起', items: ['肺癌 LDCT 電腦斷層 (吸菸≥20包-年/家族史)'] },
    { age: '65 歲起', items: ['成人健檢 (每年1次)', '肺炎鏈球菌公費疫苗接種'] },
  ];

  return (
    <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-5 space-y-4 shadow-xs" aria-label="台灣公費預防保健全年齡時間軸">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <figcaption className="font-bold text-slate-900 dark:text-white text-base">
            健康護航時間軸：台灣 2025–2026 全年齡公費預防保健黃金時程
          </figcaption>
        </div>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-medium">
          衛福部健保卡免自費
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
        {milestones.map((m, idx) => (
          <div key={idx} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5">
            <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
              {m.age}
            </span>
            <ul className="space-y-1 pt-0.5">
              {m.items.map((it, i) => (
                <li key={i} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </figure>
  );
};
