import React, { useMemo, useState } from 'react';
import {
  Accessibility,
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bandage,
  Check,
  ChevronRight,
  Copy,
  Dumbbell,
  Flag,
  HeartHandshake,
  Landmark,
  MessageCircleQuestion,
  Microscope,
  Pill,
  Printer,
  Salad,
  ScrollText,
  ShieldCheck,
  Sprout,
  TrendingUp,
  Waypoints,
} from 'lucide-react';
import { conditionLifeStages, type Condition, type Department } from '../../../data/clinical';
import { SYMPTOMS } from '../../../data/clinical/symptoms';
import { copyText } from '../../../utils/copyText';
import { Card, Disclaimer, EvidenceList, KeyNumbers, LifeStageChips, SaludLinks, Timeline } from './clinicUi';

type ListKey =
  | 'causes_zh'
  | 'symptoms_zh'
  | 'diagnosis_zh'
  | 'treatment_zh'
  | 'postop_zh'
  | 'diet_zh'
  | 'exercise_zh'
  | 'rehab_zh'
  | 'selfcare_zh'
  | 'prevention_zh'
  | 'tw_resources_zh'
  | 'red_flags_zh';

type SectionId = ListKey | 'timeline' | 'prognosis_zh' | 'questions_zh' | 'evidence';

interface SectionDef {
  id: SectionId;
  title: string;
  icon: React.ElementType;
  tone: string;
  wide?: boolean;
}

/** Page order follows Mayo Clinic / NHS condition pages, extended with Taiwan-specific care. */
const SECTIONS: SectionDef[] = [
  { id: 'causes_zh', title: '原因與風險因子', icon: Sprout, tone: 'text-amber-600' },
  { id: 'symptoms_zh', title: '症狀表現', icon: Activity, tone: 'text-sky-600' },
  { id: 'diagnosis_zh', title: '診斷與檢查', icon: Microscope, tone: 'text-indigo-600' },
  { id: 'treatment_zh', title: '治療選項', icon: Pill, tone: 'text-violet-600', wide: true },
  { id: 'postop_zh', title: '術後／出院照護', icon: Bandage, tone: 'text-rose-600' },
  { id: 'timeline', title: '復原時間軸', icon: Waypoints, tone: 'text-teal-600', wide: true },
  { id: 'diet_zh', title: '飲食建議', icon: Salad, tone: 'text-lime-600' },
  { id: 'exercise_zh', title: '運動處方', icon: Dumbbell, tone: 'text-orange-600' },
  { id: 'rehab_zh', title: '復健與物理治療', icon: Accessibility, tone: 'text-teal-600' },
  { id: 'selfcare_zh', title: '自我照護與追蹤', icon: HeartHandshake, tone: 'text-emerald-600' },
  { id: 'prevention_zh', title: '預防與避免復發', icon: ShieldCheck, tone: 'text-emerald-700' },
  { id: 'prognosis_zh', title: '預後：之後會怎樣？', icon: TrendingUp, tone: 'text-sky-700' },
  { id: 'questions_zh', title: '看診時可以問醫師', icon: MessageCircleQuestion, tone: 'text-indigo-600' },
  { id: 'tw_resources_zh', title: '台灣健保 · 篩檢 · 補助資源', icon: Landmark, tone: 'text-rose-700' },
  { id: 'red_flags_zh', title: '危險警訊：立即就醫', icon: AlertTriangle, tone: 'text-red-600', wide: true },
  { id: 'evidence', title: '實證來源與指引', icon: ScrollText, tone: 'text-emerald-600', wide: true },
];

/** Reading modes: show only what a reader at that point in the journey needs. */
const MODES: { id: string; label: string; sections: SectionId[] | 'all' }[] = [
  { id: 'all', label: '全部', sections: 'all' },
  { id: 'new', label: '🩺 剛確診 / 想了解', sections: ['causes_zh', 'symptoms_zh', 'diagnosis_zh', 'treatment_zh', 'prognosis_zh', 'questions_zh', 'red_flags_zh'] },
  { id: 'surgery', label: '🏥 治療 / 手術 / 住院', sections: ['treatment_zh', 'postop_zh', 'timeline', 'rehab_zh', 'questions_zh', 'tw_resources_zh', 'red_flags_zh'] },
  { id: 'home', label: '🏡 居家生活與照顧', sections: ['timeline', 'diet_zh', 'exercise_zh', 'rehab_zh', 'selfcare_zh', 'prevention_zh', 'tw_resources_zh', 'red_flags_zh'] },
];

const hasContent = (c: Condition, id: SectionId) => {
  if (id === 'timeline') return c.timeline.length > 0;
  if (id === 'prognosis_zh') return c.prognosis_zh.trim().length > 0;
  if (id === 'evidence') return c.evidence.length > 0;
  const v = c[id];
  return Array.isArray(v) && v.length > 0;
};

const BulletList: React.FC<{ items: string[]; danger?: boolean }> = ({ items, danger }) => (
  <ul className="mt-3 space-y-2">
    {items.map((t, i) => (
      <li key={i} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${danger ? 'bg-red-500' : 'bg-emerald-500'}`} aria-hidden="true" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
);

const QuestionList: React.FC<{ cond: Condition }> = ({ cond }) => {
  const [copied, setCopied] = useState(false);
  const text = `【${cond.name_zh}】看診問題\n` + cond.questions_zh.map((q, i) => `${i + 1}. ${q}`).join('\n');
  return (
    <>
      <ol className="mt-3 space-y-2 list-decimal ml-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        {cond.questions_zh.map((q) => (
          <li key={q}>{q}</li>
        ))}
      </ol>
      <div className="mt-3 flex flex-wrap gap-2" data-print-hide>
        <button
          onClick={async () => setCopied(await copyText(text))}
          className="inline-flex items-center gap-1 rounded-lg border border-indigo-200 dark:border-indigo-900 px-2.5 py-1 text-xs text-indigo-700 dark:text-indigo-300"
        >
          {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
          {copied ? '已複製，可貼到手機備忘錄' : '複製問題清單'}
        </button>
        <button onClick={() => window.print()} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300">
          <Printer className="w-3.5 h-3.5" aria-hidden="true" /> 列印整頁衛教單
        </button>
      </div>
    </>
  );
};

export const ClinicCondition: React.FC<{ dept: Department; cond: Condition; go: (h: string) => void }> = ({ dept, cond, go }) => {
  const [mode, setMode] = useState('all');
  const idx = dept.conditions.findIndex((c) => c.id === cond.id);
  const prev = dept.conditions[idx - 1];
  const next = dept.conditions[idx + 1];
  const modeDef = MODES.find((m) => m.id === mode)!;
  const visible = useMemo(
    () => SECTIONS.filter((s) => hasContent(cond, s.id) && (modeDef.sections === 'all' || modeDef.sections.includes(s.id))),
    [cond, modeDef]
  );
  const entrySymptoms = SYMPTOMS.filter((s) => s.routes.some((r) => r.cond === cond.id));
  const scrollTo = (id: string) => document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const renderBody = (s: SectionDef) => {
    switch (s.id) {
      case 'timeline':
        return (
          <div className="mt-3">
            <Timeline phases={cond.timeline} />
          </div>
        );
      case 'prognosis_zh':
        return <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{cond.prognosis_zh}</p>;
      case 'questions_zh':
        return <QuestionList cond={cond} />;
      case 'evidence':
        return <EvidenceList items={cond.evidence} />;
      default:
        return <BulletList items={cond[s.id] as string[]} danger={s.id === 'red_flags_zh'} />;
    }
  };

  return (
    <div className="space-y-5">
      <nav className="text-sm flex flex-wrap items-center gap-1 text-slate-500" aria-label="麵包屑" data-print-hide>
        <button onClick={() => go('clinic')} className="hover:text-emerald-700">臨床科別</button>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <button onClick={() => go(`clinic/${dept.id}`)} className="hover:text-emerald-700">{dept.name_zh}</button>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <span className="text-slate-800 dark:text-slate-200">{cond.name_zh}</span>
      </nav>

      <header className="rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-900 text-white p-6">
        <p className="text-xs text-emerald-200">
          {dept.name_zh}
          {cond.icd10 ? ` · ICD-10 ${cond.icd10}` : ''}
        </p>
        <h1 className="mt-1 text-2xl sm:text-3xl font-display font-bold">{cond.name_zh}</h1>
        <p className="text-sm text-emerald-100/80">{cond.name_en}</p>
        <p className="mt-4 text-sm leading-relaxed text-slate-100">{cond.summary_zh}</p>
        <div className="mt-4">
          <KeyNumbers items={cond.key_numbers} dark />
        </div>
        <div className="mt-3 [&_span]:bg-white/10 [&_span]:text-white [&_span]:border-white/20">
          <LifeStageChips stages={conditionLifeStages(dept, cond)} />
        </div>
      </header>

      {cond.red_flags_zh.length > 0 && (
        <button
          onClick={() => scrollTo('red_flags_zh')}
          className="w-full text-left rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 px-4 py-2.5 text-sm text-red-800 dark:text-red-200 flex items-center gap-2"
        >
          <Flag className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">
            <b>何時要立刻就醫：</b>
            {cond.red_flags_zh[0]}
            {cond.red_flags_zh.length > 1 && `…等 ${cond.red_flags_zh.length} 項`}
          </span>
          <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
        </button>
      )}

      <div className="sticky top-16 z-10 -mx-1 px-1 py-2 bg-salud-light-bg/95 dark:bg-salud-dark-bg/95 backdrop-blur space-y-2" data-print-hide>
        <div role="tablist" aria-label="閱讀模式" className="flex gap-1.5 overflow-x-auto">
          {MODES.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={mode === m.id}
              onClick={() => setMode(m.id)}
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold border ${
                mode === m.id
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-salud-dark-surface text-slate-600 dark:text-slate-300'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
        <ol className="flex gap-1.5 overflow-x-auto">
          {visible.map((s, i) => (
            <li key={s.id} className="shrink-0">
              <button
                onClick={() => scrollTo(s.id)}
                className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-salud-dark-surface px-2.5 py-1 text-xs text-slate-700 dark:text-slate-300 hover:border-emerald-400"
              >
                <span className="font-bold text-emerald-700 dark:text-emerald-400">{i + 1}</span> {s.title.split('：')[0]}
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {visible.map((s) => {
          const Icon = s.icon;
          const danger = s.id === 'red_flags_zh';
          return (
            <Card
              key={s.id}
              id={`sec-${s.id}`}
              className={`${s.wide ? 'md:col-span-2' : ''} ${danger ? 'border-red-200 dark:border-red-900 bg-red-50/60 dark:bg-red-950/20' : ''}`}
            >
              <h2 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <Icon className={`w-5 h-5 ${s.tone}`} aria-hidden="true" /> {s.title}
              </h2>
              {renderBody(s)}
            </Card>
          );
        })}
      </div>

      {entrySymptoms.length > 0 && (
        <Card>
          <h2 className="font-bold text-slate-900 dark:text-white">🧭 相關症狀入口</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {entrySymptoms.map((s) => (
              <button key={s.id} onClick={() => go(`clinic/by/symptom/${s.id}`)} className="rounded-full border border-amber-300 dark:border-amber-800 px-3 py-1 text-sm text-amber-800 dark:text-amber-300">
                {s.emoji} {s.name_zh}
              </button>
            ))}
          </div>
        </Card>
      )}

      {cond.salud_links && cond.salud_links.length > 0 && <SaludLinks links={cond.salud_links} go={go} />}

      <div className="flex flex-wrap gap-2 justify-between" data-print-hide>
        {prev ? (
          <button onClick={() => go(`clinic/${dept.id}/${prev.id}`)} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {prev.name_zh}
          </button>
        ) : (
          <button onClick={() => go(`clinic/${dept.id}`)} className="inline-flex items-center gap-1 text-sm text-emerald-700 dark:text-emerald-400">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> 回 {dept.name_zh}
          </button>
        )}
        {next && (
          <button onClick={() => go(`clinic/${dept.id}/${next.id}`)} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            下一個：{next.name_zh} <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
      <Disclaimer />
    </div>
  );
};
