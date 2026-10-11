import React, { useState } from 'react';
import {
  SPINE_REGIONS,
  SPINE_PARTS,
  SPINE_KEY_NUMBERS,
  SPUR_CONDITIONS,
  CLAUDICATION_COMPARE,
  CERVICAL_ROOTS,
  LUMBAR_ROOTS,
  NUMB_CAUSES,
  MYELOPATHY_SIGNS,
  POSTURE_GUIDE,
  PostureGroup,
  SPINE_EXERCISES,
  EXERCISE_TARGET_META,
  ExerciseTarget,
  PAIN_TRAFFIC_LIGHT,
  PREVENTION,
  SURGERY_INDICATIONS,
  SURGERY_TABLE,
  SPINE_MEDS,
  PAIN_TYPES,
  DRUG_INTERACTIONS,
  MED_RED_LINES,
  PT_MODALITIES,
  PT_QUESTIONS,
  SPINE_DEPARTMENTS,
  SPINE_TESTS,
  VISIT_PREP,
  URGENCY_META,
  NerveRoot,
} from '../../../data/spineData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import { SpineColumnFigure, MotionSegmentFigure, AxialSegmentFigure, AnatomyLegend } from './figures/AnatomyFigures';
import { HandMapsFigure, LegFootMapFigure, NumbPatternFigure } from './figures/NerveFigures';
import { ImagingSmallMultiples, DiscPressureChart, NeckLoadChart, RegressionChart, DegenCascadeFigure, TreatmentLadderFigure, NaturalCourseFigure } from './figures/ChartFigures';
import { POSTURE_FIGURES } from './figures/PostureFigures';
import { EXERCISE_FIGURES } from './figures/ExerciseFigures';
import { NumbLocator, RedFlagChecker, DailySpineChecklist, UrgencyBadge } from './SpineTools';

const H3: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h3 id={id} className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>;

// ── 1. Overview ─────────────────────────────────────────────────────────

export const OverviewChapter: React.FC = () => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {SPINE_KEY_NUMBERS.map((n) => (
        <div key={n.label} className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3">
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>

    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start">
      <FigureFrame number="圖 1-1" title="脊椎側面：三段彎曲與脊髓的終點" source="標準解剖學；ASIA ISNCSCI" caption="頸椎與腰椎向前彎、胸椎與薦骨向後彎，像彈簧一樣分散走路與跳躍的衝擊。脊髓在 L1–L2 附近結束，所以腰椎椎間盤突出壓到的是神經根，而不是脊髓。">
        <SpineColumnFigure />
      </FigureFrame>
      <div className="space-y-4">
        <P>
          脊椎不只是「一根骨頭」，而是由骨頭、軟墊、關節、韌帶、肌肉與神經組成的系統。<strong>骨頭負責撐、椎間盤負責緩衝、小面關節負責導引方向、肌肉負責穩定</strong>，中間的通道則保護著從大腦一路往下的脊髓與神經。
        </P>
        <Callout kind="tip" title="把脊椎想成一棟大樓">
          <p>椎體是樓板、椎間盤是樓層間的避震墊、椎管是電纜管道間、神經孔是每層樓牆上讓電線出去的孔。退化時，避震墊變薄、牆角長出「骨刺」，孔就可能變小、壓到電線。</p>
        </Callout>
        <DataTable
          title="表 1-1　脊椎五段的分工"
          source="標準解剖學"
          columns={[
            { key: 'region', header: '部位', className: 'min-w-[110px]' },
            { key: 'count', header: '節數' },
            { key: 'job', header: '主要工作', className: 'min-w-[160px]' },
            { key: 'problems', header: '常見問題', className: 'min-w-[180px]' },
          ]}
          rows={SPINE_REGIONS}
          rowKey={(r) => r.region}
        />
      </div>
    </div>

    <FigureFrame number="圖 1-2" title="從上往下看一節腰椎：神經住在哪裡？" source="標準解剖學" caption="圖的上方是肚子側。椎間盤在前、椎管在後，兩側的神經根從神經孔出去；黃韌帶與小面關節在後方。紅框標示的是常見的受壓與增生位置。">
      <AxialSegmentFigure />
      <div className="mt-3">
        <AnatomyLegend />
      </div>
    </FigureFrame>

    <DataTable
      title="表 1-2　脊椎的零件：白話說明與出問題時的表現"
      columns={[
        { key: 'part', header: '構造', className: 'min-w-[100px]' },
        { key: 'plain', header: '它是什麼', className: 'min-w-[180px]' },
        { key: 'analogy', header: '比喻', className: 'min-w-[96px]' },
        { key: 'when_hurt', header: '出問題時', className: 'min-w-[200px]' },
      ]}
      rows={SPINE_PARTS}
      rowKey={(r) => r.part}
    />
  </div>
);

// ── 2. Spurs ────────────────────────────────────────────────────────────

export const SpursChapter: React.FC = () => (
  <div className="space-y-6">
    <P>
      「骨刺」的醫學名稱是<strong>骨贅（osteophyte）</strong>，它不是刺，而是骨頭邊緣因為長期受力而增生的一圈骨質，就像橋墩受力的地方會加厚。它通常出現在椎間盤已經變薄、關節負擔變大的節段，是身體試圖把這一節「重新穩住」的結果。
    </P>
    <FigureFrame number="圖 2-1" title="退化的連鎖反應：從椎間盤脫水到神經受壓" source="Kirkaldy-Willis 退化模型；標準脊椎外科教材" note={false}>
      <DegenCascadeFigure />
    </FigureFrame>
    <FigureFrame number="圖 2-2" title="側面看同一節脊椎的三個階段" caption="椎間盤變薄後，上下兩節靠得更近，神經孔（虛線）跟著變小；骨刺與肥厚的小面關節再從邊緣擠壓，神經根（黃色）才會被壓扁。多數人停在第 ② 階段，沒有任何症狀。">
      <MotionSegmentFigure />
    </FigureFrame>

    <FigureFrame
      number="圖 2-3"
      title="沒有任何症狀的人，MRI 也常看到「異常」"
      source="Brinjikji 2015, AJNR（33 篇研究、3,110 位無症狀者）"
      note={false}
      caption="椎間盤退化、膨出與小面關節退化，隨年齡增加到 80 歲時大多數人都有。這是為什麼報告上的「退化」「骨刺」「膨出」必須和症狀、神經學檢查一起解讀。"
    >
      <ImagingSmallMultiples />
    </FigureFrame>

    <Callout kind="evidence" title="研究怎麼說：影像與疼痛常不成比例">
      <p>40 歲無症狀的人，約 68% 有椎間盤退化、33% 有椎間盤突出；60 歲則分別約 88% 與 38%。醫師判斷「痛是不是它造成的」，靠的是症狀分布、理學檢查與影像三者是否對得起來。</p>
    </Callout>

    <DataTable
      title="表 2-1　與骨刺、退化相關的常見診斷"
      columns={[
        { key: 'name', header: '診斷', className: 'min-w-[130px]' },
        { key: 'what', header: '發生了什麼', className: 'min-w-[170px]' },
        { key: 'symptoms', header: '典型症狀', className: 'min-w-[170px]' },
        { key: 'clue', header: '辨識線索', className: 'min-w-[170px]' },
      ]}
      rows={SPUR_CONDITIONS}
      rowKey={(r) => r.name}
      rowTone={(r) => (r.name.includes('脊髓') || r.name.includes('OPLL') ? 'warn' : undefined)}
    />

    <DataTable
      title="表 2-2　走路腿麻：是腰椎狹窄，還是血管阻塞？"
      source="臨床鑑別要點"
      columns={[
        { key: 'feature', header: '比較項目', className: 'min-w-[90px]' },
        { key: 'neuro', header: '腰椎椎管狹窄（神經性）', className: 'min-w-[170px]' },
        { key: 'vascular', header: '周邊動脈疾病（血管性）', className: 'min-w-[170px]' },
      ]}
      rows={CLAUDICATION_COMPARE}
      rowKey={(r) => r.feature}
    />
  </div>
);

// ── 3. Numbness ─────────────────────────────────────────────────────────

const rootColumns = [
  { key: 'root', header: '神經根', className: 'w-16' },
  { key: 'disc', header: '常見受壓椎間盤' },
  { key: 'sensory', header: '麻痛位置', className: 'min-w-[150px]' },
  { key: 'weakness', header: '可能無力的動作', className: 'min-w-[150px]' },
  { key: 'reflex', header: '反射' },
  { key: 'note', header: '備註', render: (r: NerveRoot) => r.note ?? '—' },
];

export const NumbnessChapter: React.FC = () => (
  <div className="space-y-6">
    <Callout kind="redflag" title="先排除急症：以下三種麻不要等">
      <ul className="space-y-1">
        <li>• 突然單側臉、手、腳麻或無力，嘴歪、說話不清 → <strong>中風，立即撥 119</strong></li>
        <li>• 屁股、會陰部麻，小便解不出或失禁 → <strong>馬尾症候群，立即急診</strong></li>
        <li>• 雙手麻且變笨拙、走路不穩 → <strong>頸椎脊髓病變，數日內就醫</strong></li>
      </ul>
    </Callout>

    <FigureFrame number="圖 3-1" title="七種常見的「麻」分布型態" caption="脊椎神經根造成的麻通常「單側、沿一條帶狀」；周邊神經病變從「最遠的腳趾」開始、左右對稱；脊髓與腦的問題則同時影響好幾個肢體。紅框的三種需要盡快就醫。" note="示意圖；人與人之間的分布範圍會有重疊。">
      <NumbPatternFigure />
    </FigureFrame>

    <NumbLocator />

    <FigureFrame number="圖 3-2" title="手麻：神經根 vs 腕部神經" source="ASIA ISNCSCI 關鍵感覺點；周邊神經解剖" caption="同樣是拇指、食指麻，若連前臂也麻、脖子轉動會加重，較像 C6 神經根；若只在手掌側、晚上麻醒、甩手會好，較像腕隧道症候群。小指麻則要分辨 C8 與尺神經（肘隧道）。">
      <HandMapsFigure />
    </FigureFrame>

    <DataTable title="表 3-1　頸椎神經根：麻在哪、哪裡會沒力" source="臨床神經學標準；ISNCSCI" columns={rootColumns} rows={CERVICAL_ROOTS} rowKey={(r) => r.root} />

    <FigureFrame number="圖 3-3" title="腳麻：腰薦神經根的典型分布" source="ASIA ISNCSCI 關鍵感覺點" caption="超過九成的腰椎間盤突出發生在 L4–L5 與 L5–S1，所以最常被壓到的是 L5 與 S1 神經根。">
      <LegFootMapFigure />
    </FigureFrame>

    <DataTable title="表 3-2　腰薦神經根：麻在哪、哪裡會沒力" source="臨床神經學標準；ISNCSCI" columns={rootColumns} rows={LUMBAR_ROOTS} rowKey={(r) => r.root} />

    <Callout kind="note" title="自我觀察：脊髓病變的 5 個早期訊號">
      <ul className="space-y-1">
        {MYELOPATHY_SIGNS.map((s) => (
          <li key={s}>• {s}</li>
        ))}
      </ul>
      <p className="text-[13px] opacity-90">任何一項持續出現，都建議盡快就醫評估頸椎 MRI。退化性頸椎脊髓病變常常沒有脖子痛，容易被當成「老了手不靈活」。</p>
    </Callout>

    <DataTable
      title="表 3-3　手腳麻的 13 種常見原因總整理"
      columns={[
        { key: 'condition', header: '可能原因', className: 'min-w-[120px]' },
        { key: 'pattern', header: '麻的分布', className: 'min-w-[150px]' },
        { key: 'clues', header: '辨識線索', className: 'min-w-[180px]' },
        { key: 'tests', header: '常見檢查', className: 'min-w-[150px]' },
        { key: 'dept', header: '建議科別' },
        { key: 'urgency', header: '急迫程度', render: (r) => <UrgencyBadge level={r.urgency} /> },
      ]}
      rows={NUMB_CAUSES}
      rowKey={(r) => r.id}
      rowTone={(r) => (r.urgency === 'now' ? 'bad' : r.urgency === 'soon' ? 'warn' : undefined)}
    />
  </div>
);

// ── 4. Posture ──────────────────────────────────────────────────────────

const GROUPS: PostureGroup[] = ['躺', '坐', '站', '動'];

export const PostureChapter: React.FC = () => {
  const [group, setGroup] = useState<PostureGroup>('躺');
  const guide = POSTURE_GUIDE.find((g) => g.group === group)!;
  return (
    <div className="space-y-6">
      <FigureFrame
        number="圖 4-1"
        title="不同姿勢下，腰椎椎間盤承受多少壓力？"
        source="Wilke 1999, Spine（L4–L5 椎間盤內植入感測器的活體量測）"
        note="單一健康受試者的量測，適合比較相對大小，不代表每個人的絕對數值。"
        caption="躺著最低；放鬆坐和站差不多；身體前彎與彎腰駝背提重物最高。靠著椅背放鬆坐，反而比刻意挺直坐還低。"
      >
        <DiscPressureChart />
      </FigureFrame>

      <div className="space-y-4">
        <div className="flex gap-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 p-1 w-full sm:w-fit" role="tablist" aria-label="日常姿勢分類">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              role="tab"
              aria-selected={group === g}
              onClick={() => setGroup(g)}
              className={`flex-1 sm:flex-none rounded-xl px-5 py-2 text-[15px] font-semibold transition-colors ${
                group === g ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
        <div className="space-y-1">
          <H3>{guide.title}</H3>
          <P>{guide.intro}</P>
        </div>
        <div className="space-y-4">
          {guide.items.map((it, i) => {
            const Fig = it.figure ? POSTURE_FIGURES[it.figure] : undefined;
            return (
              <article key={it.title} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 sm:p-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] print-avoid-break">
                <div className="space-y-2">
                  <h4 className="font-bold text-[16px] text-slate-900 dark:text-white flex gap-2">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white dark:text-emerald-950 text-xs font-bold inline-flex items-center justify-center tabular-nums">
                      {i + 1}
                    </span>
                    {it.title}
                  </h4>
                  <p className="text-[14px] leading-relaxed text-slate-800 dark:text-slate-200">
                    <strong className="text-emerald-700 dark:text-emerald-400">怎麼做：</strong>
                    {it.how}
                  </p>
                  <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                    <strong className="text-sky-700 dark:text-sky-400">為什麼：</strong>
                    {it.why}
                  </p>
                  {it.avoid && (
                    <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
                      <strong className="text-rose-700 dark:text-rose-400">避免：</strong>
                      {it.avoid}
                    </p>
                  )}
                </div>
                {Fig ? (
                  <div className="w-full max-w-2xl mx-auto lg:max-w-none">
                    <Fig />
                  </div>
                ) : (
                  <div className="hidden lg:block" />
                )}
              </article>
            );
          })}
        </div>
      </div>

      <FigureFrame number="圖 4-2" title="低頭角度與頸椎的等效負荷" source="Hansraj 2014, Surg Technol Int（電腦模型）" note="模型估算，非活體量測；用來理解「頭越低、脖子越吃力」的趨勢。">
        <NeckLoadChart />
      </FigureFrame>

      <DailySpineChecklist />
    </div>
  );
};

// ── 5. Exercise ─────────────────────────────────────────────────────────

const TARGETS: (ExerciseTarget | 'all')[] = ['all', 'neck', 'back', 'nerve', 'general'];

export const ExerciseChapter: React.FC = () => {
  const [target, setTarget] = useState<ExerciseTarget | 'all'>('all');
  const list = target === 'all' ? SPINE_EXERCISES : SPINE_EXERCISES.filter((e) => e.target === target);
  return (
    <div className="space-y-6">
      <Callout kind="redflag" title="開始前">
        <p>有本專區「立即急診」或「盡快就醫」等級的警訊、剛受過外傷、或醫師要求暫停活動時，請先就醫，不要自行運動。手術後的運動請依主治醫師與物理治療師指示。</p>
      </Callout>

      <DataTable
        title="表 5-1　運動時的疼痛紅綠燈"
        source="物理治療常用的疼痛監測原則"
        compact
        columns={[
          { key: 'light', header: '燈號', className: 'w-20' },
          { key: 'range', header: '疼痛（0–10 分）', className: 'min-w-[120px]' },
          { key: 'meaning', header: '怎麼做' },
        ]}
        rows={PAIN_TRAFFIC_LIGHT}
        rowKey={(r) => r.light}
        rowTone={(r) => r.tone}
      />

      <Callout kind="tip" title="集中化 vs 周邊化">
        <p>
          <strong>集中化：</strong>做完某個動作後，小腿或手臂的麻痛往脊椎方向「收回來」——這通常是好方向，可以繼續。
          <br />
          <strong>周邊化：</strong>麻痛往腳底、手指方向「跑出去」——這個動作暫時不適合你，換一個方向的動作，或請治療師評估。
        </p>
      </Callout>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="運動部位">
        {TARGETS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={target === t}
            onClick={() => setTarget(t)}
            className={`rounded-xl border px-3.5 py-2 text-[13px] font-semibold transition-colors ${
              target === t ? 'bg-emerald-700 border-emerald-700 text-white dark:bg-emerald-500 dark:border-emerald-500 dark:text-emerald-950' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
            }`}
          >
            {t === 'all' ? `全部（${SPINE_EXERCISES.length}）` : EXERCISE_TARGET_META[t]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((e) => {
          const Fig = EXERCISE_FIGURES[e.figure];
          return (
            <article key={e.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 flex flex-col gap-3 print-avoid-break">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">{EXERCISE_TARGET_META[e.target]}</p>
                  <h4 className="font-bold text-[16px] text-slate-900 dark:text-white leading-snug">{e.name}</h4>
                </div>
                <GradePill grade={e.grade} withLabel={false} />
              </div>
              {Fig && (
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 p-1">
                  <Fig />
                </div>
              )}
              <p className="text-[13px] text-slate-600 dark:text-slate-400">
                <strong className="text-slate-800 dark:text-slate-200">適合：</strong>
                {e.for_zh}
              </p>
              <ol className="space-y-1 text-[14px] leading-relaxed text-slate-800 dark:text-slate-200 list-decimal pl-5">
                {e.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
              <div className="mt-auto grid gap-1.5 text-[13px]">
                <p className="rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 px-3 py-1.5">
                  <strong>份量：</strong>
                  {e.dose}
                </p>
                <p className="rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-100 px-3 py-1.5">
                  <strong>停止條件：</strong>
                  {e.stop}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};

// ── 6. Treatment ────────────────────────────────────────────────────────

export const TreatmentChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame number="圖 6-1" title="多數頸腰痛與神經根痛的自然病程" source="NICE NG59；Lancet 2018 下背痛系列；NASS 2014" note={false}>
      <NaturalCourseFigure />
    </FigureFrame>

    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <FigureFrame number="圖 6-2" title="治療階梯：從最低風險開始" source="WHO 2023；ACP 2017；NICE NG59" note={false} caption="每一階都包含下面所有階的內容：即使接受注射或手術，運動與自我照護仍然是基礎。">
        <TreatmentLadderFigure />
      </FigureFrame>
      <FigureFrame number="圖 6-3" title="椎間盤突出：越大塊越容易被吸收" source="Chiu 2015, Clin Rehabil（31 篇研究）" note={false} caption="突出的髓核被免疫系統視為「外來物」，巨噬細胞會把它慢慢吃掉；脫出或游離的碎片接觸到血流較多，吸收機率反而更高。">
        <RegressionChart />
      </FigureFrame>
    </div>

    <DataTable
      title="表 6-1　預防頸腰痛：哪些有效、哪些沒用"
      source="Steffens 2016 JAMA Intern Med；WalkBack 2024 Lancet"
      columns={[
        { key: 'action', header: '方法', className: 'min-w-[120px]' },
        { key: 'effect', header: '研究結果', className: 'min-w-[200px]' },
        { key: 'grade', header: '證據', render: (r) => <GradePill grade={r.grade} withLabel={false} /> },
        {
          key: 'verdict',
          header: '建議',
          render: (r) => (
            <span className={`font-bold ${r.verdict === '推薦' ? 'text-emerald-700 dark:text-emerald-400' : r.verdict === '無效' ? 'text-rose-700 dark:text-rose-400' : 'text-amber-700 dark:text-amber-400'}`}>
              {r.verdict === '推薦' ? '✓ ' : r.verdict === '無效' ? '✗ ' : '△ '}
              {r.verdict}
            </span>
          ),
        },
      ]}
      rows={PREVENTION}
      rowKey={(r) => r.action}
      rowTone={(r) => (r.verdict === '無效' ? 'bad' : r.verdict === '推薦' ? 'good' : undefined)}
    />

    <Callout kind="redflag" title="什麼情況要考慮手術？">
      <ul className="space-y-1.5">
        {SURGERY_INDICATIONS.map((s) => (
          <li key={s.text} className="flex flex-wrap items-center gap-2">
            <UrgencyBadge level={s.level} />
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </Callout>

    <DataTable
      title="表 6-2　常見脊椎與神經手術"
      source="NASS、AO Spine 指引；Peul 2007 NEJM"
      columns={[
        { key: 'name', header: '手術', className: 'min-w-[140px]' },
        { key: 'for_zh', header: '適合誰', className: 'min-w-[140px]' },
        { key: 'how', header: '做什麼', className: 'min-w-[150px]' },
        { key: 'recovery', header: '恢復期' },
        { key: 'note', header: '要知道的事', className: 'min-w-[200px]' },
      ]}
      rows={SURGERY_TABLE}
      rowKey={(r) => r.name}
    />
  </div>
);

// ── 7. Medications ──────────────────────────────────────────────────────

export const MedsChapter: React.FC = () => (
  <div className="space-y-6">
    <Callout kind="note" title="閱讀說明">
      <p>本章是衛教用途，介紹藥物「類別」與常見成分名稱，不提供個人劑量建議。是否用藥、用多少、用多久，請由醫師依你的病史、腎肝功能與其他用藥決定；有疑問可詢問社區藥局藥師。</p>
    </Callout>

    <DataTable
      title="表 7-1　先分清楚是哪一種痛"
      source="IASP 疼痛分類"
      columns={[
        { key: 'type', header: '疼痛類型', className: 'min-w-[110px]' },
        { key: 'feel', header: '感覺像', className: 'min-w-[160px]' },
        { key: 'examples', header: '常見例子', className: 'min-w-[150px]' },
        { key: 'approach', header: '處理方向', className: 'min-w-[200px]' },
      ]}
      rows={PAIN_TYPES}
      rowKey={(r) => r.type}
    />

    <DataTable
      title="表 7-2　頸腰痛與手腳麻的常見處方藥"
      source="ACP 2017；WHO 2023；NICE NG59；PACE 2014；PRECISE 2017；Cashin 2021；Goldberg 2015"
      columns={[
        { key: 'klass', header: '藥物類別', className: 'min-w-[130px]' },
        { key: 'examples', header: '常見成分（商品名例）', className: 'min-w-[150px]' },
        { key: 'evidence', header: '效果有多大', className: 'min-w-[170px]', render: (r) => (
          <span className="space-y-1 block">
            <GradePill grade={r.grade} />
            <span className="block">{r.evidence}</span>
          </span>
        ) },
        { key: 'side_effects', header: '常見副作用', className: 'min-w-[130px]' },
        { key: 'caution', header: '誰要特別小心', className: 'min-w-[170px]' },
        { key: 'tip', header: '用藥提醒', className: 'min-w-[160px]' },
      ]}
      rows={SPINE_MEDS}
      rowKey={(r) => r.id}
    />

    <DataTable
      title="表 7-3　危險的藥物組合"
      columns={[
        { key: 'combo', header: '組合', className: 'min-w-[220px]' },
        { key: 'risk', header: '可能後果', className: 'min-w-[160px]' },
      ]}
      rows={DRUG_INTERACTIONS}
      rowKey={(r) => r.combo}
      rowTone={(r) => r.tone}
    />

    <Callout kind="redflag" title="這些用藥方式不建議">
      <ul className="space-y-1">
        {MED_RED_LINES.map((m) => (
          <li key={m}>• {m}</li>
        ))}
      </ul>
    </Callout>

    <Callout kind="tip" title="看診時可以問醫師的 3 個問題">
      <ol className="list-decimal pl-5 space-y-0.5">
        <li>這個藥是為了治療哪一種痛？大約多久能看出效果？</li>
        <li>跟我現在吃的其他藥（含保健品）有沒有衝突？</li>
        <li>如果吃了沒效或有副作用，什麼時候該停、要不要回診？</li>
      </ol>
    </Callout>
  </div>
);

// ── 8. Rehab ────────────────────────────────────────────────────────────

export const RehabChapter: React.FC = () => {
  const groups: { kind: '主動' | '被動' | '輔具'; title: string; sub: string }[] = [
    { kind: '主動', title: '主動治療：你自己動', sub: '長期效果的核心' },
    { kind: '被動', title: '被動治療：治療師或儀器作用在你身上', sub: '短期舒緩、幫助你能開始動' },
    { kind: '輔具', title: '輔具', sub: '短期保護，避免依賴' },
  ];
  return (
    <div className="space-y-6">
      <P>
        在台灣，復健科常見的組合是「熱敷＋電療＋牽引」，每次約 30–60 分鐘。這些<strong>被動治療</strong>能讓疼痛暫時下降，但國際指引一致認為，真正改變長期結果的是<strong>主動治療</strong>：個別化運動、動作再教育與疼痛衛教。
      </P>
      {groups.map((g) => (
        <DataTable
          key={g.kind}
          title={`${g.title}（${g.sub}）`}
          source="WHO 2023；NICE NG59；ACP 2017；Cochrane；RESTORE 2023；Basson 2017；Kuijper 2009"
          columns={[
            { key: 'name', header: '方法', className: 'min-w-[140px]' },
            { key: 'what', header: '在做什麼', className: 'min-w-[180px]' },
            { key: 'feel', header: '感覺' },
            { key: 'grade', header: '證據', render: (r) => <GradePill grade={r.grade} /> },
            { key: 'verdict', header: '指引怎麼說', className: 'min-w-[200px]' },
          ]}
          rows={PT_MODALITIES.filter((m) => m.kind === g.kind)}
          rowKey={(r) => r.id}
          rowTone={(r) => (r.grade === 'A' ? 'good' : r.grade === 'D' ? 'bad' : undefined)}
        />
      ))}
      <Callout kind="tip" title="去復健時，問治療師這 5 個問題">
        <ol className="list-decimal pl-5 space-y-0.5">
          {PT_QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </Callout>
      <Callout kind="evidence" title="研究怎麼說：認知功能治療（RESTORE, Lancet 2023）">
        <p>澳洲 492 位慢性下背痛患者的試驗中，接受物理治療師帶領的認知功能治療（找出讓疼痛持續的動作與想法，逐步重新建立信心與動作），一年後的失能程度改善明顯優於一般照護，而且效益在追蹤期間持續存在。</p>
      </Callout>
    </div>
  );
};

// ── 9. Triage ───────────────────────────────────────────────────────────

export const TriageChapter: React.FC = () => (
  <div className="space-y-6">
    <RedFlagChecker />
    <DataTable
      title="表 9-1　看哪一科？"
      columns={[
        { key: 'dept', header: '科別', className: 'min-w-[90px]' },
        { key: 'when', header: '什麼時候看', className: 'min-w-[170px]' },
        { key: 'does', header: '會做什麼', className: 'min-w-[200px]' },
      ]}
      rows={SPINE_DEPARTMENTS}
      rowKey={(r) => r.dept}
      rowTone={(r) => (r.dept === '急診' ? 'bad' : undefined)}
    />
    <DataTable
      title="表 9-2　常見檢查：看得到什麼、看不到什麼"
      source="NICE NG59；ACP 2017；臨床實務"
      columns={[
        { key: 'test', header: '檢查', className: 'min-w-[120px]' },
        { key: 'shows', header: '看得到', className: 'min-w-[170px]' },
        { key: 'not', header: '限制', className: 'min-w-[150px]' },
        { key: 'when', header: '何時需要', className: 'min-w-[200px]' },
      ]}
      rows={SPINE_TESTS}
      rowKey={(r) => r.test}
    />
    <Callout kind="tip" title="就醫前準備：把這 7 件事寫下來">
      <ol className="list-decimal pl-5 space-y-0.5">
        {VISIT_PREP.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ol>
    </Callout>
    <p className="text-[13px] text-slate-500 dark:text-slate-400">
      急迫程度分級：{(['now', 'soon', 'clinic', 'self'] as const).map((k) => URGENCY_META[k].label).join(' → ')}
    </p>
  </div>
);

export const CHAPTER_SOURCES: Record<string, string[]> = {
  OVERVIEW: ['ISNCSCI', 'GBD2023'],
  SPURS: ['BRINJIKJI2015', 'AOSPINE2017'],
  NUMBNESS: ['ISNCSCI', 'AOSPINE2017', 'ADA2025', 'NASS2014'],
  POSTURE: ['WILKE1999', 'HANSRAJ2014', 'KOVACS2003', 'WALKBACK2024'],
  EXERCISE: ['WHO2023', 'BASSON2017', 'WALKBACK2024', 'LANCET2018'],
  TREATMENT: ['STEFFENS2016', 'WALKBACK2024', 'CHIU2015', 'PEUL2007', 'NASS2014', 'AOSPINE2017', 'NICE59'],
  MEDS: ['ACP2017', 'WHO2023', 'PACE2014', 'PRECISE2017', 'CASHIN2021', 'GOLDBERG2015', 'EFSA2023B6', 'ADA2025'],
  REHAB: ['WHO2023', 'NICE59', 'ACP2017', 'TRACTION2013', 'HEAT2006', 'BASSON2017', 'RESTORE2023', 'KUIJPER2009'],
  TRIAGE: ['NICE59', 'ACP2017', 'AOSPINE2017', 'LANCET2018'],
};
