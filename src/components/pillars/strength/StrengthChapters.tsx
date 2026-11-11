import React, { useState } from 'react';
import { Bot, Check, ClipboardCopy, ListChecks, Microscope, ScrollText } from 'lucide-react';
import {
  MODULE_OUTLINES,
  EXAM_FORMAT,
  MODULE_MAP,
  OUTLINE_REVIEW,
  STUDY_PLAN,
  STRENGTH_SOURCES,
  PLANES,
  MUSCLE_ROLES,
  MAJOR_MUSCLES,
  LEVERS,
  ENERGY_SYSTEMS,
  SPORT_ENERGY,
  ADAPTATIONS,
  M1_PRACTICE,
  NEEDS_ANALYSIS,
  GOAL_VARIABLES,
  FREQUENCY,
  PERIODIZATION,
  SESSION_ORDER,
  BASKETBALL_PLAN,
  PLAN_LOGIC,
  SQUAT_SCREEN,
  RAMP,
  TECHNIQUE,
  CLEAN_PHASES,
  PLYO,
  DEADLIFT_HANDOUT,
  DEADLIFT_CHECKLIST,
  CUE_TYPES,
  CUE_RULES,
  ERROR_TABLE,
  REGRESSIONS,
  SPOTTING,
  M4_COMPARE,
  MACROS,
  HYDRATION,
  SUPPLEMENTS,
  PRACTICAL_FLOW,
  RANDOM_MOVE_FRAME,
  MOCK_EXAM,
  type StrengthTab,
} from '../../../data/strengthCoachData';
import { DataTable } from '../../common/pro/DataTable';
import { Callout } from '../../common/pro/Blocks';
import { copyText } from '../../../utils/copyText';

/**
 * StrengthChapters — chapter bodies for the 肌力訓練 hub (v6.7).
 *
 * Every module chapter follows the same rhythm so an examinee always knows where they are:
 *   研究大綱 (the outline as supplied) → 核心知識表 → AI 深度研究提示 (copyable) → 深度研究成果.
 */

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

const H3: React.FC<{ children: React.ReactNode; icon?: React.ReactNode }> = ({ children, icon }) => (
  <h3 className="flex items-center gap-2 text-lg font-display font-bold text-slate-900 dark:text-white">
    {icon}
    {children}
  </h3>
);

const srcLabel = (id: string) => STRENGTH_SOURCES[id]?.label.split('.')[0] ?? id;

/** The module's outline exactly as studied: sub-topic codes with their bullet points. */
const OutlineCard: React.FC<{ tab: Exclude<StrengthTab, 'OVERVIEW'> }> = ({ tab }) => {
  const o = MODULE_OUTLINES[tab];
  return (
    <section aria-label={`${o.title}研究大綱`} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <ScrollText className="w-5 h-5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">研究大綱</h3>
        <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-0.5 text-[12px] font-semibold text-emerald-800 dark:text-emerald-300">{o.kind}</span>
      </div>
      <ol className="grid gap-3 md:grid-cols-2">
        {o.topics.map((t) => (
          <li key={t.code} className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/40 p-3">
            <div className="text-[14px] font-bold text-slate-900 dark:text-white">
              <span className="tabular-nums text-emerald-700 dark:text-emerald-400 mr-1.5">{t.code}</span>
              {t.title}
            </div>
            <ul className="mt-1.5 space-y-1 text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
              {t.items.map((i) => (
                <li key={i} className="flex gap-1.5">
                  <span aria-hidden="true" className="text-emerald-600 dark:text-emerald-400">•</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
};

/** 💡 AI 深度研究提示 — shown verbatim with a copy button, followed by the worked answer. */
const AiPromptCard: React.FC<{ tab: Exclude<StrengthTab, 'OVERVIEW'> }> = ({ tab }) => {
  const o = MODULE_OUTLINES[tab];
  const [copied, setCopied] = useState(false);
  const onCopy = async () => {
    if (await copyText(o.prompt)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <section aria-label="AI 深度研究提示" className="rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/60 dark:bg-violet-950/20 p-4 sm:p-5 space-y-2.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-[15px] font-bold text-violet-900 dark:text-violet-200">
          <Bot className="w-5 h-5" aria-hidden="true" />
          AI 深度研究提示
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="no-print inline-flex items-center gap-1.5 rounded-lg border border-violet-300 dark:border-violet-700 px-2.5 py-1 text-[12.5px] font-semibold text-violet-900 dark:text-violet-200 hover:bg-violet-100 dark:hover:bg-violet-900/40"
        >
          {copied ? <Check className="w-3.5 h-3.5" aria-hidden="true" /> : <ClipboardCopy className="w-3.5 h-3.5" aria-hidden="true" />}
          {copied ? '已複製' : '複製提示'}
        </button>
      </div>
      <blockquote className="border-l-4 border-violet-400 dark:border-violet-600 pl-3 text-[14px] leading-7 text-slate-800 dark:text-slate-200">「{o.prompt}」</blockquote>
      {o.promptNote && <p className="text-[12.5px] text-violet-800/90 dark:text-violet-300/90">校訂：{o.promptNote}</p>}
    </section>
  );
};

const ResultHeader: React.FC<{ title: string }> = ({ title }) => (
  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
    <Microscope className="w-5 h-5 text-sky-700 dark:text-sky-400" aria-hidden="true" />
    <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white">深度研究成果：{title}</h3>
  </div>
);

/** Multiple-choice set with per-question reveal, or an answer key at the end. */
const PracticeSet: React.FC<{
  items: { q: string; options: string[]; answer: number; explain: string }[];
  keyAtEnd?: boolean;
  label: string;
}> = ({ items, keyAtEnd = false, label }) => {
  const [picked, setPicked] = useState<Record<number, number>>({});
  const score = items.filter((it, i) => picked[i] === it.answer).length;
  const answered = Object.keys(picked).length;
  return (
    <div className="space-y-3" aria-label={label}>
      <ol className="space-y-3">
        {items.map((it, i) => (
          <li key={it.q} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2">
            <p className="text-[14.5px] font-semibold text-slate-900 dark:text-white">
              <span className="tabular-nums mr-1.5 text-sky-700 dark:text-sky-400">{i + 1}.</span>
              {it.q}
            </p>
            <div className="grid gap-1.5 sm:grid-cols-2" role="radiogroup" aria-label={`第 ${i + 1} 題選項`}>
              {it.options.map((opt, oi) => {
                const chosen = picked[i] === oi;
                const reveal = !keyAtEnd && picked[i] != null;
                const tone = reveal
                  ? oi === it.answer
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40'
                    : chosen
                    ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30'
                    : 'border-slate-200 dark:border-slate-700'
                  : chosen
                  ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40'
                  : 'border-slate-200 dark:border-slate-700 hover:border-sky-400';
                return (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={chosen}
                    onClick={() => setPicked((p) => ({ ...p, [i]: oi }))}
                    className={`text-left rounded-xl border px-3 py-2 text-[13.5px] text-slate-800 dark:text-slate-200 transition-colors ${tone}`}
                  >
                    <span className="font-semibold mr-1">{'ABCD'[oi]}.</span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {!keyAtEnd && picked[i] != null && (
              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">
                <strong className={picked[i] === it.answer ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                  {picked[i] === it.answer ? '答對了！' : `正解是 ${'ABCD'[it.answer]}。`}
                </strong>
                {it.explain}
              </p>
            )}
          </li>
        ))}
      </ol>
      {keyAtEnd && (
        <details className="rounded-2xl border border-sky-200 dark:border-sky-900/60 bg-sky-50/60 dark:bg-sky-950/20 px-4 py-3">
          <summary className="cursor-pointer text-[14px] font-bold text-sky-900 dark:text-sky-200">
            答案與詳細解析（已作答 {answered}/{items.length} 題{answered > 0 ? `，答對 ${score} 題` : ''}）
          </summary>
          <ol className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
            {items.map((it, i) => (
              <li key={it.q} className="flex gap-2">
                <span className={`shrink-0 tabular-nums font-bold ${picked[i] == null ? 'text-slate-500' : picked[i] === it.answer ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {i + 1}. {'ABCD'[it.answer]}
                </span>
                <span>{it.explain}</span>
              </li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
};

// ── Chapter 1: overview ───────────────────────────────────────────────────

export const StrengthOverview: React.FC = () => (
  <div className="space-y-6">
    <P>
      這是「肌力訓練」主題的第一個專題：<strong>TSCA 丙級肌力及體能教練證照研究</strong>。丙級是國內肌力與體能教練分級授證的入門級，
      重點不是背誦，而是能把運動科學「用在一個真實的人身上」——開出合理的課表、示範標準的動作、看出錯誤並安全地帶領訓練。
    </P>
    <DataTable
      title="表 1-1　丙級授證的三個關卡"
      caption="課程時數、費用、報考資格與考試細則依授證單位當期簡章為準。"
      columns={[
        { key: 'part', header: '關卡', className: 'min-w-[90px]' },
        { key: 'what', header: '內容', className: 'min-w-[200px]' },
        { key: 'tip', header: '準備重點', className: 'min-w-[220px]' },
      ]}
      rows={EXAM_FORMAT}
      rowKey={(r) => r.part}
    />
    <DataTable
      title="表 1-2　五大模組備考地圖"
      caption="「建議投入時間」是依內容份量與術科難度給的讀書比例，並非官方配分。"
      columns={[
        { key: 'mod', header: '模組', className: 'min-w-[70px]' },
        { key: 'name', header: '主題', className: 'min-w-[140px]' },
        { key: 'type', header: '類型' },
        { key: 'question', header: '要回答的問題', className: 'min-w-[200px]' },
        { key: 'share', header: '建議投入時間' },
      ]}
      rows={MODULE_MAP}
      rowKey={(r) => r.mod}
    />
    <section className="space-y-3" aria-label="大綱深度確認">
      <H3 icon={<ListChecks className="w-5 h-5 text-sky-700 dark:text-sky-400" aria-hidden="true" />}>研究大綱深度確認：校訂與補充</H3>
      <P>研究大綱的架構完整、順序合理（學科 → 實務 → 術科 → 執教 → 衝刺）。逐條比對 NSCA 教科書與國際立場聲明後，以下 10 處需要校正或補充，各模組內容已依校訂版撰寫：</P>
      <DataTable
        columns={[
          { key: 'where', header: '位置', className: 'min-w-[70px]' },
          { key: 'original', header: '原大綱', className: 'min-w-[150px]' },
          { key: 'revised', header: '校訂／補充', className: 'min-w-[300px]' },
          { key: 'source', header: '依據', className: 'min-w-[120px]', render: (r) => <span className="text-[12px]">{srcLabel(r.source)}</span> },
        ]}
        rows={OUTLINE_REVIEW}
        rowKey={(r, i) => `${r.where}-${i}`}
        rowTone={(r) => (r.where.startsWith('2.3') ? 'warn' : undefined)}
      />
    </section>
    <DataTable
      title="表 1-3　8 週備考計畫（學科＋術科並進）"
      columns={[
        { key: 'week', header: '週次', className: 'min-w-[70px]' },
        { key: 'theory', header: '學科', className: 'min-w-[220px]' },
        { key: 'practice', header: '術科', className: 'min-w-[220px]' },
      ]}
      rows={STUDY_PLAN}
      rowKey={(r) => r.week}
    />
    <Callout kind="tip" title="怎麼使用每一章">
      <p>每個模組章節都依同一個順序：<strong>研究大綱 → 核心知識表 → AI 深度研究提示 → 深度研究成果</strong>。提示可一鍵複製，貼到你慣用的 AI 工具做延伸研究；本站的成果已逐條對照文獻，可當作答案的比對基準。</p>
    </Callout>
  </div>
);

// ── Chapter 2: module 1 ───────────────────────────────────────────────────

export const StrengthM1: React.FC = () => (
  <div className="space-y-6">
    <OutlineCard tab="M1_SCIENCE" />
    <DataTable
      title="表 2-1　三大運動面與關節動作"
      source="NSCA 4th ed."
      columns={[
        { key: 'plane', header: '運動面', className: 'min-w-[120px]' },
        { key: 'axis', header: '轉動軸', className: 'min-w-[110px]' },
        { key: 'motion', header: '關節動作', className: 'min-w-[150px]' },
        { key: 'example', header: '訓練動作例', className: 'min-w-[180px]' },
      ]}
      rows={PLANES}
      rowKey={(r) => r.plane}
    />
    <DataTable
      title="表 2-2　肌肉的四種角色：以背蹲舉與臥推為例"
      columns={[
        { key: 'role', header: '角色', className: 'min-w-[120px]' },
        { key: 'define', header: '定義', className: 'min-w-[160px]' },
        { key: 'squat', header: '背蹲舉', className: 'min-w-[150px]' },
        { key: 'bench', header: '臥推', className: 'min-w-[150px]' },
      ]}
      rows={MUSCLE_ROLES}
      rowKey={(r) => r.role}
    />
    <DataTable
      title="表 2-3　主要大肌群起止點與功能（胸、背、腿、核心）"
      source="標準解剖學；NSCA 4th ed."
      columns={[
        { key: 'muscle', header: '肌肉', className: 'min-w-[80px]' },
        { key: 'origin', header: '起點', className: 'min-w-[170px]' },
        { key: 'insertion', header: '止點', className: 'min-w-[150px]' },
        { key: 'action', header: '功能', className: 'min-w-[180px]' },
      ]}
      rows={MAJOR_MUSCLES}
      rowKey={(r) => r.muscle}
    />
    <DataTable
      title="表 2-4　三類槓桿"
      columns={[
        { key: 'cls', header: '類別', className: 'min-w-[90px]' },
        { key: 'layout', header: '排列', className: 'min-w-[170px]' },
        { key: 'ma', header: '力學效益', className: 'min-w-[130px]' },
        { key: 'example', header: '人體例子', className: 'min-w-[180px]' },
      ]}
      rows={LEVERS}
      rowKey={(r) => r.cls}
    />
    <Callout kind="note" title="力矩、阻力臂與力線：自由重量的三個考點">
      <ul className="space-y-1">
        <li>• <strong>力矩 = 力 × 力臂</strong>。自由重量的阻力（重力）永遠垂直向下，所以阻力臂是「關節到槓鈴重心鉛垂線的水平距離」。</li>
        <li>• 背蹲舉軀幹越前傾，髖與下背的阻力臂越長；前蹲舉軀幹較直，力矩較多轉移到膝關節。</li>
        <li>• 硬舉槓鈴離身體越遠，腰椎與髖的力矩越大——這就是「槓要貼腿」的力學理由。</li>
        <li>• 力線（Line of Pull）：當阻力方向與目標肌肉的拉力方向一致時，該肌肉負擔最大。例如啞鈴側平舉在手臂水平時阻力臂最長，站姿啞鈴彎舉在前臂水平時最難。</li>
      </ul>
    </Callout>
    <DataTable
      title="表 2-5　三大能量系統：生化機轉、限制因子、恢復與運動休息比"
      source="NSCA 4th ed.；Gastin 2001"
      columns={[
        { key: 'system', header: '系統', className: 'min-w-[110px]' },
        { key: 'fuel', header: '生化機轉', className: 'min-w-[200px]' },
        { key: 'time', header: '主導時間', className: 'min-w-[130px]' },
        { key: 'limit', header: '限制因子', className: 'min-w-[160px]' },
        { key: 'recovery', header: '恢復', className: 'min-w-[140px]' },
        { key: 'wr', header: 'W:R', className: 'min-w-[100px]' },
        { key: 'example', header: '代表運動', className: 'min-w-[130px]' },
      ]}
      rows={ENERGY_SYSTEMS}
      rowKey={(r) => r.system}
    />
    <Callout kind="evidence" title="三個系統是「同時」運作，只是比例不同">
      <p>沒有任何運動只用單一系統。全力運動約 75 秒時，有氧與無氧的貢獻就已大致相等（Gastin 2001）；所以題目問「主要」系統時，看的是強度與持續時間。</p>
    </Callout>
    <DataTable
      title="表 2-6　專項能量需求分析：100 米 vs 籃球 vs 馬拉松"
      columns={[
        { key: 'sport', header: '專項', className: 'min-w-[120px]' },
        { key: 'main', header: '主要系統', className: 'min-w-[170px]' },
        { key: 'why', header: '分析', className: 'min-w-[200px]' },
        { key: 'train', header: '訓練重點', className: 'min-w-[170px]' },
      ]}
      rows={SPORT_ENERGY}
      rowKey={(r) => r.sport}
    />
    <DataTable
      title="表 2-7　阻力訓練的生理適應"
      source="Folland & Williams 2007；Schoenfeld 2010"
      columns={[
        { key: 'type', header: '類型', className: 'min-w-[100px]' },
        { key: 'items', header: '內容', className: 'min-w-[260px]' },
        { key: 'when', header: '時程', className: 'min-w-[140px]' },
      ]}
      rows={ADAPTATIONS}
      rowKey={(r) => r.type}
    />
    <AiPromptCard tab="M1_SCIENCE" />
    <section className="space-y-4">
      <ResultHeader title="三大能量系統專題與 3 題高難度情境題" />
      <P>
        生化機轉、代表運動與運動休息比已整理於表 2-5、2-6。考試最常見的陷阱有三：把乳酸當成疲勞元兇、忽略有氧系統在短時間全力運動中的貢獻、以及用錯 W:R。
        下面 3 題就是針對這三個陷阱設計的情境題，作答後會立即顯示解析。
      </P>
      <PracticeSet label="模組一情境題" items={M1_PRACTICE.map((m) => ({ q: m.question, options: m.options, answer: m.answer, explain: m.explain }))} />
    </section>
  </div>
);

// ── Chapter 3: module 2 ───────────────────────────────────────────────────

export const StrengthM2: React.FC = () => (
  <div className="space-y-6">
    <OutlineCard tab="M2_PROGRAM" />
    <DataTable
      title="表 3-1　需求分析：以大專籃球員為例"
      columns={[
        { key: 'area', header: '面向', className: 'min-w-[100px]' },
        { key: 'ask', header: '要問的問題', className: 'min-w-[180px]' },
        { key: 'basketball', header: '籃球範例', className: 'min-w-[260px]' },
      ]}
      rows={NEEDS_ANALYSIS}
      rowKey={(r) => r.area}
    />
    <DataTable
      title="表 3-2　四大訓練目標的變數設定"
      source="NSCA 4th ed.；RPE／RIR 對照依自動調節文獻"
      columns={[
        { key: 'goal', header: '目標', className: 'min-w-[110px]' },
        { key: 'load', header: '強度（%1RM）' },
        { key: 'reps', header: '次數' },
        { key: 'sets', header: '組數' },
        { key: 'rest', header: '組間休息', className: 'min-w-[100px]' },
        { key: 'rpe', header: 'RPE／執行', className: 'min-w-[150px]' },
      ]}
      rows={GOAL_VARIABLES}
      rowKey={(r) => r.goal}
    />
    <DataTable
      title="表 3-3　每週訓練頻率"
      columns={[
        { key: 'level', header: '訓練程度', className: 'min-w-[130px]' },
        { key: 'freq', header: '頻率' },
        { key: 'note', header: '說明', className: 'min-w-[200px]' },
      ]}
      rows={FREQUENCY}
      rowKey={(r) => r.level}
    />
    <DataTable
      title="表 3-4　傳統（線性）週期化：校正版"
      source="NSCA 4th ed.（Matveyev 模型）"
      caption="原大綱將「最大肌力」放在第一轉換期；依 NSCA，基礎肌力期屬準備期，第一轉換期為肌力／爆發力期。"
      columns={[
        { key: 'period', header: '時期', className: 'min-w-[90px]' },
        { key: 'phase', header: '階段', className: 'min-w-[120px]' },
        { key: 'intensity', header: '強度', className: 'min-w-[130px]' },
        { key: 'volume', header: '訓練量', className: 'min-w-[150px]' },
        { key: 'aim', header: '目標', className: 'min-w-[200px]' },
      ]}
      rows={PERIODIZATION}
      rowKey={(r) => r.phase}
      rowTone={(r) => (r.period === '第一轉換期' ? 'good' : undefined)}
    />
    <Callout kind="note" title="週期的三個時間尺度">
      <p><strong>大週期（Macrocycle）</strong>通常是一整個訓練年；<strong>中週期（Mesocycle）</strong>數週到數月，對應一個階段；<strong>小週期（Microcycle）</strong>通常是一週。</p>
    </Callout>
    <DataTable
      title="表 3-5　單次訓練課的黃金結構"
      columns={[
        { key: 'step', header: '順序' },
        { key: 'what', header: '內容', className: 'min-w-[130px]' },
        { key: 'why', header: '理由', className: 'min-w-[200px]' },
        { key: 'example', header: '例子', className: 'min-w-[160px]' },
      ]}
      rows={SESSION_ORDER}
      rowKey={(r) => r.step}
    />
    <AiPromptCard tab="M2_PROGRAM" />
    <section className="space-y-4">
      <ResultHeader title="大專籃球員 4 週第一轉換期課表" />
      <DataTable
        title="表 3-6　每週 3 次、第 4 週減量"
        caption="格式：組數 × 次數 @%1RM。跳躍與藥球動作以最大速度完成，不做到力竭。"
        columns={[
          { key: 'day', header: '訓練日', className: 'min-w-[120px]' },
          { key: 'move', header: '動作', className: 'min-w-[150px]' },
          { key: 'w1', header: '第 1 週', className: 'min-w-[80px]' },
          { key: 'w2', header: '第 2 週', className: 'min-w-[80px]' },
          { key: 'w3', header: '第 3 週', className: 'min-w-[80px]' },
          { key: 'w4', header: '第 4 週（減量）', className: 'min-w-[90px]' },
          { key: 'rest', header: '休息' },
        ]}
        rows={BASKETBALL_PLAN}
        rowKey={(r) => `${r.day}-${r.move}`}
      />
      <Callout kind="evidence" title="編排邏輯">
        <ol className="space-y-1.5 list-decimal pl-5">
          {PLAN_LOGIC.map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ol>
      </Callout>
    </section>
  </div>
);

// ── Chapter 4: module 3 ───────────────────────────────────────────────────

export const StrengthM3: React.FC = () => (
  <div className="space-y-6">
    <OutlineCard tab="M3_TECHNIQUE" />
    <DataTable
      title="表 4-1　深蹲深度不足：活動度還是穩定度？"
      columns={[
        { key: 'cause', header: '可能誘因', className: 'min-w-[130px]' },
        { key: 'test', header: '簡易判別', className: 'min-w-[220px]' },
        { key: 'fix', header: '對策', className: 'min-w-[200px]' },
      ]}
      rows={SQUAT_SCREEN}
      rowKey={(r) => r.cause}
    />
    <DataTable
      title="表 4-2　RAMP 動態熱身"
      source="Jeffreys 2007（RAMP protocol）"
      columns={[
        { key: 'stage', header: '階段', className: 'min-w-[130px]' },
        { key: 'aim', header: '目的', className: 'min-w-[180px]' },
        { key: 'example', header: '動作例', className: 'min-w-[200px]' },
      ]}
      rows={RAMP}
      rowKey={(r) => r.stage}
    />
    <DataTable
      title="表 4-3　自由重量核心動作技術要點"
      source="NSCA 4th ed."
      columns={[
        { key: 'move', header: '動作', className: 'min-w-[90px]' },
        { key: 'pattern', header: '模式', className: 'min-w-[90px]' },
        { key: 'setup', header: '起始設定', className: 'min-w-[200px]' },
        { key: 'key', header: '執行要點', className: 'min-w-[240px]' },
        { key: 'breathe', header: '呼吸', className: 'min-w-[150px]' },
      ]}
      rows={TECHNIQUE}
      rowKey={(r) => r.move}
    />
    <DataTable
      title="表 4-4　爆發上膊（Power Clean）動作分期"
      columns={[
        { key: 'phase', header: '分期', className: 'min-w-[150px]' },
        { key: 'key', header: '要點', className: 'min-w-[300px]' },
      ]}
      rows={CLEAN_PHASES}
      rowKey={(r) => r.phase}
    />
    <DataTable
      title="表 4-5　彈力繩、藥球與跳躍訓練"
      source="NSCA 4th ed."
      columns={[
        { key: 'tool', header: '工具', className: 'min-w-[110px]' },
        { key: 'ladder', header: '進階順序', className: 'min-w-[200px]' },
        { key: 'dose', header: '劑量', className: 'min-w-[200px]' },
        { key: 'safety', header: '安全', className: 'min-w-[180px]' },
      ]}
      rows={PLYO}
      rowKey={(r) => r.tool}
    />
    <AiPromptCard tab="M3_TECHNIQUE" />
    <section className="space-y-4">
      <ResultHeader title="傳統硬舉教學講義" />
      <div className="grid gap-3 lg:grid-cols-3">
        {DEADLIFT_HANDOUT.map((s) => (
          <article key={s.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2">
            <h4 className="font-bold text-[15px] text-slate-900 dark:text-white">{s.title}</h4>
            <ul className="space-y-1.5 text-[13.5px] leading-relaxed text-slate-700 dark:text-slate-300">
              {s.points.map((p) => (
                <li key={p} className="flex gap-1.5">
                  <span aria-hidden="true" className="text-emerald-600 dark:text-emerald-400">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <Callout kind="tip" title="考官評分檢核表（8 項）">
        <div className="flex flex-wrap gap-1.5">
          {DEADLIFT_CHECKLIST.map((c, i) => (
            <span key={c} className="rounded-full border border-slate-300 dark:border-slate-600 px-2.5 py-0.5 text-[13px]">
              {i + 1}. {c}
            </span>
          ))}
        </div>
      </Callout>
      <Callout kind="redflag" title="閉氣用力後出現這些情況，立即停止並就醫">
        <p>突發劇烈頭痛、胸痛、視線模糊、單側肢體無力或說話不清、暈厥。高血壓、心血管疾病或懷孕者，請先與醫師討論適合的負荷與呼吸方式。</p>
      </Callout>
    </section>
  </div>
);

// ── Chapter 5: module 4 ───────────────────────────────────────────────────

export const StrengthM4: React.FC = () => (
  <div className="space-y-6">
    <OutlineCard tab="M4_COACHING" />
    <DataTable
      title="表 5-1　口令的三種類型"
      source="Wulf 2013"
      columns={[
        { key: 'type', header: '類型', className: 'min-w-[120px]' },
        { key: 'define', header: '定義', className: 'min-w-[170px]' },
        { key: 'example', header: '例子', className: 'min-w-[180px]' },
        { key: 'when', header: '使用時機', className: 'min-w-[160px]' },
      ]}
      rows={CUE_TYPES}
      rowKey={(r) => r.type}
    />
    <Callout kind="tip" title="建立有效口令的 5 個原則">
      <ol className="space-y-1 list-decimal pl-5">
        {CUE_RULES.map((r) => (
          <li key={r}>{r}</li>
        ))}
      </ol>
    </Callout>
    <DataTable
      title="表 5-2　九大常見錯誤：觀察、原因與口令"
      columns={[
        { key: 'lift', header: '動作' },
        { key: 'error', header: '錯誤', className: 'min-w-[130px]' },
        { key: 'see', header: '觀察重點', className: 'min-w-[150px]' },
        { key: 'cause', header: '可能原因', className: 'min-w-[190px]' },
        { key: 'cue', header: '外部口令', className: 'min-w-[150px]' },
      ]}
      rows={ERROR_TABLE}
      rowKey={(r) => r.error}
    />
    <DataTable
      title="表 5-3　退階與進階階梯"
      caption="退階的原則：縮短活動範圍、降低技術複雜度、增加穩定性或減輕負荷；能以標準動作完成 2–3 組後再往回進階。"
      columns={[
        { key: 'lift', header: '標準動作', className: 'min-w-[100px]' },
        { key: 'up', header: '進階', className: 'min-w-[130px]' },
        { key: 'r1', header: '退階 1', className: 'min-w-[130px]' },
        { key: 'r2', header: '退階 2', className: 'min-w-[130px]' },
        { key: 'r3', header: '退階 3', className: 'min-w-[130px]' },
      ]}
      rows={REGRESSIONS}
      rowKey={(r) => r.lift}
    />
    <DataTable
      title="表 5-4　保護技巧（Spotting）"
      source="NSCA 4th ed."
      columns={[
        { key: 'lift', header: '動作', className: 'min-w-[100px]' },
        { key: 'where', header: '保護位置', className: 'min-w-[170px]' },
        { key: 'grip', header: '手勢／接觸點', className: 'min-w-[180px]' },
        { key: 'when', header: '介入時機', className: 'min-w-[190px]' },
        { key: 'talk', header: '溝通', className: 'min-w-[140px]' },
      ]}
      rows={SPOTTING}
      rowKey={(r) => r.lift}
      rowTone={(r) => (r.lift.startsWith('爆發力') ? 'warn' : undefined)}
    />
    <AiPromptCard tab="M4_COACHING" />
    <section className="space-y-4">
      <ResultHeader title="三大錯誤對比修正表" />
      <DataTable
        columns={[
          { key: 'error', header: '錯誤', className: 'min-w-[100px]' },
          { key: 'cause', header: '1. 原因分析', className: 'min-w-[220px]' },
          { key: 'cue', header: '2. 外部口令', className: 'min-w-[150px]' },
          { key: 'step1', header: '3a. 退階第一步', className: 'min-w-[200px]' },
          { key: 'step2', header: '3b. 退階第二步', className: 'min-w-[200px]' },
        ]}
        rows={M4_COMPARE}
        rowKey={(r) => r.error}
      />
    </section>
  </div>
);

// ── Chapter 6: module 5 ───────────────────────────────────────────────────

export const StrengthM5: React.FC = () => (
  <div className="space-y-6">
    <OutlineCard tab="M5_EXAM" />
    <DataTable
      title="表 6-1　三大營養素：每日需求與補充時機"
      columns={[
        { key: 'nutrient', header: '營養素', className: 'min-w-[70px]' },
        { key: 'daily', header: '每日建議', className: 'min-w-[200px]' },
        { key: 'before', header: '訓練前', className: 'min-w-[160px]' },
        { key: 'after', header: '訓練後', className: 'min-w-[180px]' },
        { key: 'src', header: '依據', render: (r) => <span className="text-[12px]">{srcLabel(r.src)}</span> },
      ]}
      rows={MACROS}
      rowKey={(r) => r.nutrient}
    />
    <DataTable
      title="表 6-2　水分與電解質"
      source="ACSM 2007 運動與液體補充立場聲明"
      columns={[
        { key: 'when', header: '時機', className: 'min-w-[80px]' },
        { key: 'what', header: '建議', className: 'min-w-[300px]' },
      ]}
      rows={HYDRATION}
      rowKey={(r) => r.when}
    />
    <DataTable
      title="表 6-3　常見補給品的實證劑量"
      columns={[
        { key: 'name', header: '補給品', className: 'min-w-[100px]' },
        { key: 'dose', header: '劑量', className: 'min-w-[220px]' },
        { key: 'effect', header: '效果', className: 'min-w-[150px]' },
        { key: 'note', header: '注意', className: 'min-w-[180px]' },
      ]}
      rows={SUPPLEMENTS}
      rowKey={(r) => r.name}
    />
    <Callout kind="redflag" title="運動禁藥：運動員負「嚴格責任」">
      <p>尿液中驗出禁用物質，無論是否知情都要負責。補給品可能遭污染或標示不實，參賽運動員應優先選擇第三方禁藥檢驗認證的產品，並向中華運動禁藥防制基金會查詢成分。</p>
    </Callout>
    <DataTable
      title="表 6-4　10 分鐘術科測驗標準流程（說、示、做、修、護、結）"
      columns={[
        { key: 'time', header: '時間', className: 'min-w-[90px]' },
        { key: 'step', header: '步驟', className: 'min-w-[90px]' },
        { key: 'do', header: '做什麼', className: 'min-w-[280px]' },
      ]}
      rows={PRACTICAL_FLOW}
      rowKey={(r) => r.time}
    />
    <Callout kind="tip" title="考官隨機指定動作時：停 3 秒，套用同一個 7 格骨架">
      <div className="flex flex-wrap gap-1.5">
        {RANDOM_MOVE_FRAME.map((f, i) => (
          <span key={f} className="rounded-full border border-slate-300 dark:border-slate-600 px-2.5 py-0.5 text-[13px]">
            {i + 1}. {f}
          </span>
        ))}
      </div>
      <p className="text-[13px]">緊張時先深呼吸、說出「我先說明這個動作的目的」爭取整理時間；講錯就直接更正，考官看重的是安全意識與邏輯，而不是零失誤。</p>
    </Callout>
    <AiPromptCard tab="M5_EXAM" />
    <section className="space-y-4">
      <ResultHeader title="TSCA 丙級學科模擬考卷（15 題）" />
      <P>題目涵蓋五大模組，由易到難，包含兩題計算題。全部作答後展開最下方的「答案與詳細解析」對答案。</P>
      <PracticeSet label="模擬考卷" items={MOCK_EXAM} keyAtEnd />
    </section>
  </div>
);
