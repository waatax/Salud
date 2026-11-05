import React, { useMemo, useState } from 'react';
import { Activity, ArrowDown, ArrowRight, Check, ChevronRight, ClipboardList, Dumbbell, ExternalLink, Pill, RotateCcw, Salad, ShieldAlert, Sparkles, X } from 'lucide-react';
import {
  BP_LIFESTYLE_EFFECTS,
  CONDITION_GUIDES,
  EXAMPLE_REPORT,
  KNOWLEDGE_MAP,
  MAP_COLUMNS,
  summarizeReport,
  THREE_HIGHS_SOURCES,
  WEEKLY_PLAN,
  WEIGHT_BENEFIT_LADDER,
  type ConditionId,
  type ReportInput,
  type Zone,
} from '../../../data/threeHighsData';
import { Callout, Choice, DeepDive, NumberField, Panel, Section, SectionNav, type SectionDef } from '../obesity/tirzepatide/chapterUi';

const LinkChip: React.FC<{ hash: string; children: React.ReactNode }> = ({ hash, children }) => (
  <a
    href={`#${hash}`}
    className="inline-flex min-h-[36px] items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-900 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/70"
  >
    {children}
    <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
  </a>
);

/** Status colours are reserved for states and always ship with a text label. */
const TONE_CHIP: Record<Zone['tone'], string> = {
  good: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200',
  neutral: 'bg-slate-200 text-slate-900 dark:bg-slate-700 dark:text-slate-100',
  warn: 'bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
  bad: 'bg-red-100 text-red-900 dark:bg-red-950/60 dark:text-red-200',
};

/** Why these four travel together. Built in HTML so it reflows on phones. */
export const RootCauseFigure: React.FC = () => {
  const box = 'rounded-xl border px-3 py-2.5 text-center text-sm leading-snug';
  return (
    <figure className="space-y-2" aria-label="熱量過多與久坐造成內臟脂肪與胰島素阻抗，進而影響血脂、血糖與血壓，最後增加心血管與腎臟疾病風險">
      <div className={`${box} border-slate-300 bg-slate-50 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200`}>
        <strong>上游</strong>：吃太多、久坐、睡不好、遺傳與年齡
      </div>
      <ArrowDown className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
      <div className={`${box} border-amber-300 bg-amber-50 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100`}>
        <strong>內臟與肝臟脂肪增加 → 胰島素阻抗</strong>
        <div className="mt-0.5 text-xs">腰圍變粗常是最早看得到的訊號</div>
      </div>
      <ArrowDown className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className={`${box} border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100`}>
          <strong>肝臟</strong>
          <div className="mt-0.5">三酸甘油酯↑、HDL↓</div>
        </div>
        <div className={`${box} border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100`}>
          <strong>肌肉與胰臟</strong>
          <div className="mt-0.5">血糖↑</div>
        </div>
        <div className={`${box} border-sky-300 bg-sky-50 text-sky-950 dark:border-sky-900 dark:bg-sky-950/30 dark:text-sky-100`}>
          <strong>血管與腎臟</strong>
          <div className="mt-0.5">血壓↑</div>
        </div>
      </div>
      <ArrowDown className="mx-auto h-4 w-4 text-slate-400" aria-hidden="true" />
      <div className={`${box} border-red-300 bg-red-50 text-red-950 dark:border-red-900 dark:bg-red-950/30 dark:text-red-100`}>
        <strong>下游</strong>：動脈硬化、心肌梗塞、中風、心衰竭、慢性腎臟病、脂肪肝
      </div>
      <figcaption className="pt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        這是最常見的路徑，但不是每個人都如此。LDL 與 Lp(a) 深受遺傳影響，高血壓也和鹽、年齡、遺傳有關，所以瘦的人也可能三高。
      </figcaption>
    </figure>
  );
};

const FIELD_GROUPS: { title: string; fields: { key: keyof ReportInput; label: string; unit: string; step?: number }[] }[] = [
  {
    title: '體重',
    fields: [
      { key: 'heightCm', label: '身高', unit: '公分' },
      { key: 'weightKg', label: '體重', unit: '公斤' },
      { key: 'waistCm', label: '腰圍', unit: '公分' },
    ],
  },
  {
    title: '血壓',
    fields: [
      { key: 'sys', label: '收縮壓', unit: 'mmHg' },
      { key: 'dia', label: '舒張壓', unit: 'mmHg' },
    ],
  },
  {
    title: '血糖',
    fields: [
      { key: 'fpg', label: '空腹血糖', unit: 'mg/dL' },
      { key: 'a1c', label: 'HbA1c', unit: '%', step: 0.1 },
    ],
  },
  {
    title: '血脂',
    fields: [
      { key: 'ldl', label: 'LDL', unit: 'mg/dL' },
      { key: 'tg', label: '三酸甘油酯', unit: 'mg/dL' },
      { key: 'hdl', label: 'HDL', unit: 'mg/dL' },
    ],
  },
];

const NEXT_STEP: Record<ConditionId, string> = {
  weight: '先從腰圍和體重著手：第一階段目標減 5–10%。',
  bp: '先連續量一週 722，帶著平均值和醫師討論。',
  glucose: '先戒含糖飲料、飯後散步，並和醫師確認要不要複驗。',
  lipid: '先問醫師你的風險等級與 LDL 目標，再決定飲食或用藥。',
};

/** Report reader: empty by default, skips unknown numbers, and names one next step per area. */
export const ReportChecker: React.FC<{ onPick?: (id: ConditionId) => void }> = ({ onPick }) => {
  const [report, setReport] = useState<ReportInput>({ sex: 'M' });
  const summary = useMemo(() => summarizeReport(report), [report]);
  const set = (key: keyof ReportInput, v: number | undefined) => setReport((r) => ({ ...r, [key]: v }));
  const hasInput = summary.rows.length > 0;
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div className="min-w-[200px] flex-1">
            <Choice<'M' | 'F'> legend="生理性別（會影響腰圍與 HDL 標準）" options={[{ value: 'M', label: '男' }, { value: 'F', label: '女' }]} value={report.sex} onChange={(sex) => setReport((r) => ({ ...r, sex }))} columns={2} />
          </div>
        </div>
        {FIELD_GROUPS.map((g) => (
          <fieldset key={g.title}>
            <legend className="mb-1.5 text-sm font-bold text-slate-900 dark:text-white">{g.title}</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {g.fields.map((f) => (
                <NumberField key={f.key} label={f.label} unit={f.unit} step={f.step} value={report[f.key] as number | undefined} onChange={(v) => set(f.key, v)} min={0} />
              ))}
            </div>
          </fieldset>
        ))}
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setReport(EXAMPLE_REPORT)} className="btn-tactile inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-emerald-500 px-3 py-2 text-sm font-semibold text-emerald-900 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-emerald-950/40">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            代入範例看看
          </button>
          <button type="button" onClick={() => setReport({ sex: report.sex })} className="btn-tactile inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-300">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            清空
          </button>
        </div>
      </div>

      <div className="space-y-3" aria-live="polite">
        {!hasInput ? (
          <div className="grid h-full min-h-[200px] place-items-center rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm leading-relaxed text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <div>
              <ClipboardList className="mx-auto mb-2 h-6 w-6 text-slate-400" aria-hidden="true" />
              拿出健檢報告，有幾項填幾項。
              <br />
              資料只在你的瀏覽器計算，不會儲存或上傳。
            </div>
          </div>
        ) : (
          <>
            {summary.needsDoctorSoon && (
              <Callout tone="danger" title="有數字需要盡快和醫師討論">
                單次數字不等於診斷，但下面標成紅色的項目不建議再等。若同時有胸痛、呼吸困難、肢體無力或劇烈腹痛，請立刻就醫。
              </Callout>
            )}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/60">
                <div className="text-xs text-slate-600 dark:text-slate-400">代謝症候群（符合 3 項即成立）</div>
                <div className="font-display text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">{summary.metSyn.met} <span className="text-sm font-medium">／已填 {summary.metSyn.known} 項</span></div>
                <div className="text-xs text-slate-600 dark:text-slate-400">{summary.metSyn.met >= 3 ? '已符合。' : summary.metSyn.known < 5 ? '未填滿 5 項前不能排除。' : '未符合。'}</div>
              </div>
              {summary.ckmStage !== null && (
                <div className="rounded-xl bg-slate-100 p-3 dark:bg-slate-800/60">
                  <div className="text-xs text-slate-600 dark:text-slate-400">CKM 分期（至少）</div>
                  <div className="font-display text-2xl font-extrabold tabular-nums text-slate-900 dark:text-white">第 {summary.ckmStage} 期</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">{summary.ckmNote}</div>
                </div>
              )}
            </div>
            <ul className="divide-y divide-slate-200 rounded-xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {summary.rows.map((r) => (
                <li key={r.id} className="px-3 py-2">
                  <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{r.name} <span className="ml-1 tabular-nums text-slate-600 dark:text-slate-400">{r.value}</span></span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${TONE_CHIP[r.band.tone]}`}>{r.band.label_zh}</span>
                  </div>
                  {r.band.note_zh && <p className="mt-0.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">{r.band.note_zh}</p>}
                </li>
              ))}
            </ul>
            {summary.priorities.length > 0 && (
              <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-3 dark:border-emerald-900 dark:bg-emerald-950/20">
                <div className="text-sm font-bold text-emerald-950 dark:text-emerald-100">建議的下一步</div>
                <ol className="mt-1.5 space-y-1.5">
                  {summary.priorities.map((id, i) => {
                    const g = CONDITION_GUIDES.find((c) => c.id === id)!;
                    return (
                      <li key={id} className="flex gap-2 text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                        <span className="font-bold tabular-nums text-emerald-800 dark:text-emerald-300">{i + 1}.</span>
                        <span>
                          {NEXT_STEP[id]}
                          {onPick && (
                            <button type="button" onClick={() => onPick(id)} className="ml-1 inline-flex items-center gap-0.5 font-semibold text-emerald-800 underline underline-offset-2 dark:text-emerald-300">
                              看{g.name}指南 <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            )}
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">血壓請以居家 722 平均值為準；血糖需要複驗才能確診。這份整理不能取代醫師判斷。</p>
          </>
        )}
      </div>
    </div>
  );
};

const GuideColumn: React.FC<{ icon: React.ElementType; title: string; items: string[]; tone?: string }> = ({ icon: Icon, title, items, tone = 'text-emerald-700 dark:text-emerald-400' }) => (
  <div>
    <h4 className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
      <Icon className={`h-4 w-4 ${tone}`} aria-hidden="true" />
      {title}
    </h4>
    <ul className="mt-1.5 space-y-1.5">
      {items.map((t) => (
        <li key={t} className="flex gap-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** Same skeleton for all four topics, so moving between them never means relearning the page. */
export const ConditionExplorer: React.FC<{ active: ConditionId; onChange: (id: ConditionId) => void }> = ({ active, onChange }) => {
  const g = CONDITION_GUIDES.find((c) => c.id === active)!;
  return (
    <div className="space-y-4">
      <div role="tablist" aria-label="選擇主題" className="grid grid-cols-4 gap-1.5">
        {CONDITION_GUIDES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={c.id === active}
            onClick={() => onChange(c.id)}
            className={`btn-tactile min-h-[48px] rounded-xl border px-2 py-2 text-sm font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:text-base ${
              c.id === active ? 'border-emerald-700 bg-emerald-700 text-white dark:bg-emerald-600' : 'border-slate-200 bg-white text-slate-800 hover:border-emerald-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200'
            }`}
          >
            {c.shortName}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-salud-dark-surface sm:p-5">
        <div>
          <h3 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">{g.name}</h3>
          <p className="mt-1 text-base leading-relaxed text-slate-800 dark:text-slate-200">{g.oneLiner}</p>
        </div>
        <div className="space-y-3">
          {g.scales.map((s) => (
            <div key={s.name}>
              <div className="mb-1 text-sm font-semibold text-slate-800 dark:text-slate-200">{s.name}</div>
              <ul className="flex flex-wrap gap-1.5 sm:flex-nowrap">
                {s.zones.map((z) => (
                  <li key={z.label} className={`flex-1 rounded-lg px-2.5 py-1.5 text-sm ${TONE_CHIP[z.tone]}`}>
                    <div className="font-semibold">{z.label}</div>
                    <div className="text-xs tabular-nums">{z.range}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="rounded-xl bg-emerald-50 p-3 text-sm leading-relaxed text-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-100">
          <strong>目標：</strong>{g.target}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <GuideColumn icon={Salad} title="怎麼吃" items={g.eat} />
          <GuideColumn icon={Dumbbell} title="怎麼動" items={g.move} />
          <GuideColumn icon={Pill} title="治療與用藥" items={g.treat} />
          <GuideColumn icon={Activity} title="怎麼追蹤" items={g.track} />
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-3 text-sm leading-relaxed text-sky-950 dark:border-sky-900 dark:bg-sky-950/20 dark:text-sky-100">
          <strong>減重的幫助：</strong>{g.weightEffect}
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50/70 p-3 dark:border-red-900 dark:bg-red-950/20">
          <h4 className="flex items-center gap-1.5 text-sm font-bold text-red-900 dark:text-red-200"><ShieldAlert className="h-4 w-4" aria-hidden="true" />要就醫的情況</h4>
          <ul className="mt-1 space-y-1 text-sm leading-relaxed text-red-950 dark:text-red-100">
            {g.urgent.map((u) => <li key={u}>{u}</li>)}
          </ul>
        </div>
        <div className="text-sm leading-relaxed">
          <div className="flex gap-1.5 font-semibold text-slate-900 dark:text-white"><X className="mt-1 h-3.5 w-3.5 shrink-0 text-red-700 dark:text-red-400" aria-hidden="true" />{g.myth.myth}</div>
          <div className="mt-0.5 flex gap-1.5 text-slate-700 dark:text-slate-300"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /><span>{g.myth.fact}</span></div>
        </div>
        <div>
          <div className="mb-1.5 text-sm font-semibold text-slate-800 dark:text-slate-200">繼續深入</div>
          <div className="flex flex-wrap gap-1.5">
            {g.links.map((l) => <LinkChip key={l.hash} hash={l.hash}>{l.label}</LinkChip>)}
          </div>
        </div>
      </div>
    </div>
  );
};

/** Magnitude bars on one axis. The range ends are the two labelled values. */
const BpEffectChart: React.FC = () => (
  <figure className="space-y-2">
    <div className="space-y-1.5">
      {BP_LIFESTYLE_EFFECTS.map((e) => (
        <div key={e.label} className="grid grid-cols-[72px_1fr_64px] items-center gap-2 text-sm" title={`${e.label}（${e.note}）：約降 ${e.low === e.high ? e.low : `${e.low}–${e.high}`} mmHg`}>
          <span className="text-slate-800 dark:text-slate-200">{e.label}</span>
          <span className="relative block h-4 overflow-hidden rounded-r" style={{ background: 'color-mix(in srgb, var(--viz-grid) 45%, transparent)' }}>
            <span className="absolute inset-y-0 left-0 rounded-r" style={{ width: `${(e.high / 12) * 100}%`, background: 'var(--viz-series-1)', opacity: 0.35 }} />
            <span className="absolute inset-y-0 left-0 rounded-r" style={{ width: `${(e.low / 12) * 100}%`, background: 'var(--viz-series-1)' }} />
          </span>
          <span className="text-right font-semibold tabular-nums text-slate-900 dark:text-white">−{e.low === e.high ? e.low : `${e.low}–${e.high}`}</span>
        </div>
      ))}
    </div>
    <figcaption className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">收縮壓約可下降幅度（mmHg），淺色為範圍上限。各項來自不同研究，不能直接相加；另外每減重 1 公斤約降 1 mmHg。</figcaption>
  </figure>
);

/** Topic × layer matrix that links to pages the site already has. */
export const KnowledgeMap: React.FC = () => (
  <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
    <table className="w-full min-w-[640px] border-collapse text-sm">
      <caption className="sr-only">體重與三高知識地圖</caption>
      <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
        <tr>
          <th scope="col" className="sticky left-0 z-10 w-14 bg-slate-50 px-2 py-2 text-left font-semibold dark:bg-slate-900">主題</th>
          {MAP_COLUMNS.map((c) => <th key={c} scope="col" className="px-2 py-2 text-left font-semibold">{c}</th>)}
        </tr>
      </thead>
      <tbody>
        {KNOWLEDGE_MAP.map((row) => (
          <tr key={row.id} className="border-t border-slate-200 dark:border-slate-800">
            <th scope="row" className="sticky left-0 z-10 bg-white px-2 py-2 text-left font-bold text-slate-900 dark:bg-salud-dark-surface dark:text-white">{row.name}</th>
            {row.cells.map((cell) => (
              <td key={cell.hash} className="px-2 py-1.5 align-top">
                <a href={`#${cell.hash}`} className="block rounded-md px-1.5 py-1 leading-snug text-emerald-800 underline decoration-emerald-300 underline-offset-2 hover:bg-emerald-50 dark:text-emerald-300 dark:decoration-emerald-800 dark:hover:bg-emerald-950/40">
                  {cell.label}
                </a>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Compact entry used on hub overviews. */
export const ThreeHighsEntry: React.FC<{ from: 'cardio' | 'obesity' }> = ({ from }) => (
  <section aria-labelledby="map-title" className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-salud-dark-surface sm:p-5">
    <div className="flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 id="map-title" className="font-display text-lg font-extrabold text-slate-900 dark:text-white">體重與三高知識地圖</h2>
        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-400">四個主題、五個層次。找到你現在需要的那一格。</p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {from === 'obesity' && <LinkChip hash="cardiometabolic/THREE_HIGHS">三高完整指南</LinkChip>}
        {from === 'cardio' && <LinkChip hash="obesity/TIRZEPATIDE_PROTOCOL">猛健樂完整指南</LinkChip>}
      </div>
    </div>
    <div className="mt-3">
      <KnowledgeMap />
    </div>
  </section>
);

const SECTIONS: SectionDef[] = [
  { id: 'why', label: '為什麼一起來' },
  { id: 'report', label: '看我的數字' },
  { id: 'topics', label: '四大主題' },
  { id: 'gain', label: '減重有多大幫助' },
  { id: 'plan', label: '一週怎麼做' },
  { id: 'map', label: '知識地圖' },
];

export const ThreeHighsGuide: React.FC = () => {
  const [active, setActive] = useState<ConditionId>('weight');
  const pick = (id: ConditionId) => {
    setActive(id);
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('sec-topics')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };
  return (
    <article className="space-y-10" aria-label="體重與三高完整指南">
      <header className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-salud-dark-surface sm:p-7">
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">體重與三高完整指南</h2>
        <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
          高血壓、高血糖、高血脂常常和體重一起出現，也常一起改善。這裡用同一種方式整理四件事：
          <strong className="text-slate-900 dark:text-white">數字怎麼看、目標是多少、怎麼吃、怎麼動、怎麼治療、怎麼追蹤。</strong>
        </p>
      </header>

      <SectionNav sections={SECTIONS} ariaLabel="本頁段落" />

      <Section id="why" n={1} title="為什麼三高常常一起來？" answer="很多人的三高有共同源頭：內臟脂肪增加造成胰島素阻抗。所以處理體重，常常能同時改善多項數字。但 LDL 主要受遺傳影響，要另外看。">
        <Panel>
          <RootCauseFigure />
        </Panel>
        <DeepDive title="深入一點：胰島素阻抗怎麼影響三個器官">
          <p><strong>肝臟：</strong>胰島素阻抗下，肝臟持續製造葡萄糖與極低密度脂蛋白，因此空腹血糖與三酸甘油酯上升、HDL 下降，LDL 顆粒也會變得小而密。</p>
          <p><strong>肌肉與胰臟：</strong>肌肉是餐後最大的葡萄糖去處。胰島素阻抗使它吸收變差，胰臟只好分泌更多胰島素，代償失敗後血糖就會上升。肌肉收縮不需要胰島素也能吸收葡萄糖，所以運動特別有效。</p>
          <p><strong>血管與腎臟：</strong>高胰島素血症、交感神經活化與腎臟對鈉的回收，都會推高血壓；脂肪組織的發炎也會影響血管內皮功能。</p>
          <p>美國心臟學會 2023 年把這條路徑稱為心血管-腎臟-代謝（CKM）症候群，分為 0–4 期。</p>
        </DeepDive>
      </Section>

      <Section id="report" n={2} title="我的健檢數字代表什麼？" answer="把報告上的數字填進來，就能看到各項落在哪一區、是否符合代謝症候群，以及該先處理哪一項。">
        <Panel>
          <ReportChecker onPick={pick} />
        </Panel>
      </Section>

      <Section id="topics" n={3} title="四個主題，同一種讀法" answer="每個主題都依序說明：數字、目標、飲食、運動、治療、追蹤與警訊。選你現在最需要的開始。">
        <ConditionExplorer active={active} onChange={setActive} />
      </Section>

      <Section id="gain" n={4} title="減重到底有多大幫助？" answer="不必減到理想體重才有用。減 5% 就開始有感，減得越多，血糖與血脂的改善通常越明顯。">
        <ol className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {WEIGHT_BENEFIT_LADDER.map((s) => (
            <li key={s.at} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-salud-dark-surface">
              <div className="font-display text-2xl font-extrabold tabular-nums text-emerald-800 dark:text-emerald-300">{s.at}</div>
              <div className="mt-0.5 text-sm font-bold text-slate-900 dark:text-white">{s.title}</div>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.body}</p>
              <a href={s.source.url} target="_blank" rel="noreferrer noopener" className="mt-1 inline-flex items-center gap-0.5 text-xs text-slate-500 underline underline-offset-2 hover:text-emerald-700 dark:text-slate-400">
                {s.source.label}
                <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
        <Panel title="血壓：生活調整能降多少？">
          <BpEffectChart />
        </Panel>
        <Callout tone="info" title="靠生活調整減不下來怎麼辦？">
          藥物與手術都是正式的治療選項。符合條件時可以和醫師討論，
          <a href="#obesity/TIRZEPATIDE_PROTOCOL" className="font-semibold underline underline-offset-2">猛健樂完整指南</a>
          整理了適應症、劑量、副作用、三高用藥調整與長期規劃。
        </Callout>
      </Section>

      <Section id="plan" n={5} title="一週可以怎麼做？" answer="四項一起動。同一份生活處方同時照顧體重、血壓、血糖與血脂，不必各做各的。">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {WEEKLY_PLAN.map((w) => (
            <li key={w.title} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-salud-dark-surface">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{w.title}</h3>
              <ul className="mt-1.5 space-y-1">
                {w.items.map((i) => (
                  <li key={i} className="flex gap-1.5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                    <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          <LinkChip hash="start">從 4 週啟動計畫開始</LinkChip>
          <LinkChip hash="diet/patterns">比較地中海、得舒等飲食法</LinkChip>
          <LinkChip hash="exercise">運動處方與心率區間</LinkChip>
        </div>
      </Section>

      <Section id="map" n={6} title="想再深入？" answer="這張地圖把站內相關內容整理成四個主題、五個層次，每一格都能點進去。">
        <KnowledgeMap />
        <DeepDive title="本頁主要依據">
          <ul className="space-y-1">
            {THREE_HIGHS_SOURCES.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer noopener" className="underline underline-offset-2 hover:text-emerald-700">{s.label}</a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 dark:text-slate-400">最後查證：2026 年 11 月。站內數字與各課程、「看懂健檢報告」使用相同門檻。</p>
        </DeepDive>
      </Section>
    </article>
  );
};
