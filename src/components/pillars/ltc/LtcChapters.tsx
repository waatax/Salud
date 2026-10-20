import React from 'react';
import { Phone } from 'lucide-react';
import type { LtcTab } from '../../../config/routes';
import {
  LTC_KEY_NUMBERS,
  ADL_VS_IADL,
  LTC3_GOALS,
  ICOPE_DOMAINS,
  PREVENT_RX,
  ASSESS_COMPARE,
  OTHER_SCALES,
  APPLY_STEPS,
  ELIGIBLE_GROUPS,
  ASSESS_PREP,
  FOUR_PACKS,
  OTHER_SUBSIDIES,
  CARE_OPTIONS,
  CHOOSE_QUESTIONS,
  HOME_SERVICES,
  NHI_HOME,
  COMMUNITY_SERVICES,
  DAYCARE_VISIT,
  FOREIGN_RULES,
  FOREIGN_STEPS,
  FOREIGN_COST,
  FOREIGN_DUTIES,
  FOREIGN_TIPS,
  FACILITY_TYPES,
  FACILITY_HIDDEN_COSTS,
  MOVE_IN_TIPS,
  SKILL_CARDS,
  LTC_RED_FLAGS,
  LTC_URGENCY_META,
  IDDSI_LEVELS,
  DEMENTIA_WARNINGS,
  DICE_STEPS,
  BPSD_TIPS,
  DEMENTIA_RESOURCES,
  RESPITE_MODES,
  CAREGIVER_HELP,
  LEGAL_TOOLS,
  INSURANCE_NOTES,
  BARTHEL_SCORING_STANDARDS,
  FOREIGN_CAREGIVER_3_TRACKS,
  FOREIGN_CAREGIVER_COST_DETAILED,
  MULTILINGUAL_CAREGIVER_PHRASES,
  FACILITY_5_TYPES_DEEP,
  BEDSORE_STAGING_GUIDE,
  HOME_THREE_TUBES_SOP,
} from '../../../data/ltcData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import { BarthelCalculator, LtcBudgetCalculator, ForeignEligibilityChecker, FrailtyCheck, CaregiverStrainCheck, FacilityChecklist } from './LtcTools';
import { TrajectoryFigure, CareSpectrumFigure, Ltc3TimelineFigure, CostRangeChart, AdlOrderFigure } from './LtcFigures';

/**
 * LtcChapters — 失能照護與長照專區 (v5.0): 14 chapters in five units, from what
 * disability is and how to prevent it, through the 1966 application and every
 * benefit, to choosing home / community / foreign caregiver / facility care, daily
 * caregiving skills, dementia, caregiver support and legal / end-of-life planning.
 */

type GoTo = { goTo: (id: LtcTab) => void };

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((i) => (
      <li key={i} className="flex gap-2 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
        <span className="text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true">●</span>
        <span>{i}</span>
      </li>
    ))}
  </ul>
);

const Steps: React.FC<{ items: { step: string; detail: string; time?: string; who?: string }[] }> = ({ items }) => (
  <ol className="space-y-2.5">
    {items.map((s, i) => (
      <li key={s.step} className="flex gap-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3">
        <span className="shrink-0 w-7 h-7 rounded-full bg-teal-600 dark:bg-teal-400 text-white dark:text-teal-950 text-[13px] font-bold flex items-center justify-center tabular-nums" aria-hidden="true">
          {i + 1}
        </span>
        <div className="min-w-0 space-y-0.5">
          <p className="text-[14.5px] font-bold text-slate-900 dark:text-white">
            {s.step}
            {s.time && <span className="ml-2 text-[12px] font-semibold text-teal-700 dark:text-teal-300">{s.time}</span>}
          </p>
          <p className="text-[13.5px] leading-relaxed text-slate-600 dark:text-slate-300">{s.detail}</p>
          {s.who && <p className="text-[12px] text-slate-500 dark:text-slate-400">負責：{s.who}</p>}
        </div>
      </li>
    ))}
  </ol>
);

const LinkBtn: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className="font-semibold text-teal-700 dark:text-teal-300 underline underline-offset-2 hover:text-teal-900 dark:hover:text-teal-100">
    {children}
  </button>
);

const PhoneStrip: React.FC = () => (
  <div className="flex flex-wrap gap-2">
    {[
      { tel: '1966', label: '長照專線 1966' },
      { tel: '119', label: '緊急 119' },
      { tel: '1925', label: '安心專線 1925' },
      { tel: '0800507272', label: '家總 0800-507272' },
    ].map((p) => (
      <a
        key={p.tel}
        href={`tel:${p.tel}`}
        className="inline-flex items-center gap-1.5 rounded-xl border border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-teal-950/40 px-3 py-2 text-[13px] font-semibold text-teal-900 dark:text-teal-100"
      >
        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
        {p.label}
      </a>
    ))}
  </div>
);

// ── 1. Overview ──────────────────────────────────────────────────────────────

export const LtcOverview: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {LTC_KEY_NUMBERS.map((n) => (
        <div key={n.label} className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3">
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-0.5">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>
    <P>
      「失能」不是一種病，而是一種狀態：因為疾病、受傷、老化或失智，<strong>日常生活需要別人幫忙</strong>。它可能一夕之間發生（中風、跌倒骨折），也可能在幾年內悄悄滑落（衰弱、失智）。長期照顧（長照）的目的，是讓失能的人在最熟悉的地方、以最有尊嚴的方式生活，同時讓照顧他的家人不被壓垮。
    </P>
    <DataTable
      title="表 1-1　ADL 與 IADL：失能的兩把尺"
      columns={[
        { key: 'kind', header: '類別', className: 'min-w-[130px]' },
        { key: 'items', header: '包含的活動', className: 'min-w-[200px]' },
        { key: 'tool', header: '常用量表', className: 'min-w-[130px]' },
        { key: 'meaning', header: '代表意義', className: 'min-w-[180px]' },
      ]}
      rows={ADL_VS_IADL}
      rowKey={(r) => r.kind}
    />
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <FigureFrame number="圖 1-1" title="三種常見的失能軌跡" source="Lunney JR, et al. JAMA 2003" caption="知道家人走在哪一條路上，就能預先準備：突發型要搶出院銜接，階梯型要在每次住院後重新評估，緩慢衰退型則要及早做預防與法律財務規劃。">
        <TrajectoryFigure />
      </FigureFrame>
      <FigureFrame number="圖 1-2" title="失能常見的退化順序" note={false} source="Katz ADL 階層">
        <AdlOrderFigure />
      </FigureFrame>
    </div>
    <FigureFrame number="圖 1-3" title="照顧光譜：失能程度與對應服務" note={false} caption="照顧需求會隨時間改變，服務也應該跟著調整；長照等級不是一次定終身，狀況改變就申請複評。">
      <CareSpectrumFigure />
    </FigureFrame>
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <FigureFrame number="圖 1-4" title="長照 2.0 → 3.0：新制時間軸" note={false} source="衛福部長照司公告；行政院 2026-09-10">
        <Ltc3TimelineFigure />
      </FigureFrame>
      <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3">
        <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">長照 3.0 八大目標（2026–2035）</h3>
        <ul className="grid grid-cols-2 gap-2">
          {LTC3_GOALS.map((g) => (
            <li key={g.title} className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-2.5">
              <p className="text-[13.5px] font-bold text-slate-900 dark:text-white">
                <span aria-hidden="true">{g.icon} </span>
                {g.title}
              </p>
              <p className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{g.detail}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
    <Callout kind="tip" title="從哪裡開始？三個最常見的起點">
      <p>
        ① 家人住院中、即將出院 → <LinkBtn onClick={() => goTo('APPLY')}>第 4 章 申請長照</LinkBtn>；② 想請外籍看護 →{' '}
        <LinkBtn onClick={() => goTo('FOREIGN')}>第 9 章 外看申請</LinkBtn>；③ 長輩還能自理但越來越虛弱 →{' '}
        <LinkBtn onClick={() => goTo('PREVENT')}>第 2 章 預防延緩失能</LinkBtn>。
      </p>
    </Callout>
    <PhoneStrip />
  </div>
);

// ── 2. Prevention ────────────────────────────────────────────────────────────

export const LtcPrevent: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <P>
      失能之前，通常有一段「衰弱」期：走路變慢、提不起勁、體重默默掉。這時肌肉與平衡的儲備還在，<strong>是最值得投資的時間點</strong>。WHO 的 ICOPE（長者整合照護）把重點從「治療疾病」轉向「維持功能」——認知、行動、營養、視力、聽力、心理六大內在能力。
    </P>
    <FrailtyCheck />
    <DataTable
      title="表 2-1　長者功能評估（ICOPE）六大面向"
      source="WHO ICOPE 2024；國健署"
      columns={[
        { key: 'domain', header: '面向', className: 'min-w-[70px]' },
        { key: 'screen', header: '簡易篩檢', className: 'min-w-[200px]' },
        { key: 'next', header: '異常時下一步', className: 'min-w-[200px]' },
      ]}
      rows={ICOPE_DOMAINS}
      rowKey={(r) => r.domain}
    />
    <H3>預防失能處方：六個有證據的槓桿</H3>
    <div className="grid gap-3 md:grid-cols-2">
      {PREVENT_RX.map((r) => (
        <article key={r.lever} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-[15px] font-bold text-slate-900 dark:text-white">{r.lever}</h4>
            <GradePill grade={r.grade} />
          </div>
          <p className="text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>怎麼做：</strong>
            {r.dose}
          </p>
          <p className="text-[12.5px] leading-relaxed text-slate-500 dark:text-slate-400">{r.evidence}</p>
        </article>
      ))}
    </div>
    <Callout kind="evidence" title="研究怎麼說">
      <p>LIFE 試驗（JAMA 2014）讓 1,635 位 70–89 歲久坐長者做步行＋肌力＋平衡的結構化運動，平均追蹤 2.6 年，重大行動失能風險降低約 18%。FINGER 試驗（Lancet 2015）以飲食、運動、認知訓練與血管風險控制的多領域介入，改善了高風險長者的認知表現。</p>
      <p>Lancet 失智委員會 2024 年指出，14 項可改變的危險因子（包括聽損、高 LDL、缺乏運動、社交孤立、視力損失等）約占失智風險的 45%。</p>
    </Callout>
    <Callout kind="tip" title="社區就有的免費資源">
      <p>巷弄長照站（C 據點）與社區照顧關懷據點提供共餐、肌力課程與「預防及延緩失能照護計畫」（通常 12 週一期）；65 歲以上（原住民 55 歲以上）可在衛生所、診所或據點做長者功能評估。撥 1966 或洽里長、衛生所即可查詢。</p>
    </Callout>
  </div>
);

// ── 3. Assessment ────────────────────────────────────────────────────────────

export const LtcAssess: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      台灣常用的失能評估有兩套系統，常讓家屬搞混：<strong>醫院醫師評的「巴氏量表」</strong>主要用於申請外籍看護與保險；<strong>照管專員評的「長照需要等級」</strong>決定政府長照給付。兩者彼此參考，但不能互相取代。
    </P>
    <BarthelCalculator />
    <DataTable
      title="表 3-1　巴氏量表、長照等級與身障證明的差別"
      columns={[
        { key: 'tool', header: '評估', className: 'min-w-[120px]' },
        { key: 'who', header: '誰來評', className: 'min-w-[110px]' },
        { key: 'what', header: '評什麼', className: 'min-w-[180px]' },
        { key: 'used', header: '用在哪裡', className: 'min-w-[160px]' },
        { key: 'note', header: '補充', className: 'min-w-[140px]' },
      ]}
      rows={ASSESS_COMPARE}
      rowKey={(r) => r.tool}
    />
    <Callout kind="note" title="長照需要等級（CMS）1–8 級怎麼來？">
      <p>照管專員到府使用「照顧管理評估量表」，除了 ADL 與 IADL，也評估溝通、短期記憶、情緒與行為（如遊走、妄想）、特殊複雜照護（管路、傷口、呼吸器）與主要照顧者負荷，綜合換算成 1–8 級。等級越高、每月可用的照顧及專業服務額度越多（見 <LinkBtn onClick={() => goTo('BENEFITS')}>第 5 章</LinkBtn>）。</p>
    </Callout>
    <DataTable
      title="表 3-2　其他常用評估量表"
      source="各量表原始文獻；臨床常用切點"
      columns={[
        { key: 'name', header: '量表', className: 'min-w-[110px]' },
        { key: 'area', header: '評估面向', className: 'min-w-[100px]' },
        { key: 'use', header: '內容', className: 'min-w-[180px]' },
        { key: 'cut', header: '判讀參考', className: 'min-w-[180px]' },
      ]}
      rows={OTHER_SCALES}
      rowKey={(r) => r.name}
    />
    <Callout kind="tip" title="評估當天的 4 個小技巧">
      <ul className="space-y-1">
        <li>• 照實呈現「最常見的一天」，不要讓長輩逞強「表演」，也不要誇大。</li>
        <li>• 主要照顧者一定要在場，晚上與假日的狀況由最了解的人說明。</li>
        <li>• 準備照顧日誌：一週內跌倒、失禁、夜間起床、混亂的次數。</li>
        <li>• 對結果有疑問，可詢問評估依據或在狀況改變時申請複評。</li>
      </ul>
    </Callout>

    <H3>巴氏量表 10 大項目臨床評分細則與計分眉角</H3>
    <div className="grid gap-3 md:grid-cols-2">
      {BARTHEL_SCORING_STANDARDS.map((b) => (
        <article key={b.item} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-[14.5px] font-bold text-slate-900 dark:text-white">{b.item}</h4>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
              滿分 {b.maxScore} 分
            </span>
          </div>
          <div className="space-y-1.5 text-[12.5px]">
            {b.levels.map((l) => (
              <div key={l.score} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white mb-0.5">
                  <span className="text-teal-700 dark:text-teal-400">{l.score} 分</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-snug">{l.desc}</p>
                <p className="text-[11px] text-amber-800 dark:text-amber-400 mt-1">💡 臨床評分關鍵：{l.clinicalTip}</p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>

    <Callout kind="evidence" title="失智症雙軌制：CDR 與巴氏量表如何分流？">
      <p>
        臨床常見困境：失智長輩四肢健全、巴氏量表高達 80–90 分，但因定向感喪失、反覆開瓦斯、遊走走失，需要 24 小時寸步不離照顧。
        <strong>解決方案</strong>：勞動部與衛福部明訂，凡<strong>臨床失智評估量表（CDR）達到 1 分（輕度失智）以上</strong>，即可直接憑醫師失智診斷與 CDR 報告申請外籍看護，<strong>完全不受巴氏量表分數限制</strong>！
      </p>
    </Callout>
  </div>
);

// ── 4. Apply ─────────────────────────────────────────────────────────────────

export const LtcApply: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      長照服務的入口只有一個：<strong>撥打 1966（前 5 分鐘免費）</strong>，或請住院醫院的出院準備小組轉介。之後由長期照顧管理中心的照管專員到府評估，再由社區整合型服務中心（A 單位）的個案管理員和你一起排出服務。
    </P>
    <PhoneStrip />
    <H3>從申請到服務：6 個步驟</H3>
    <Steps items={APPLY_STEPS} />
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <DataTable
        title="表 4-1　誰可以申請長照？"
        source="衛福部長照專區；2026-01 新制"
        compact
        columns={[
          { key: 'group', header: '對象', className: 'min-w-[160px]' },
          { key: 'note', header: '說明', className: 'min-w-[140px]' },
        ]}
        rows={ELIGIBLE_GROUPS}
        rowKey={(r) => r.group}
      />
      <Callout kind="tip" title="照專到府評估前，先準備這些">
        <Bullets items={ASSESS_PREP} />
      </Callout>
    </div>
    <Callout kind="evidence" title="出院準備服務：住院中就把長照排好">
      <p>多數醫院設有出院準備小組。家屬在住院期間主動告訴護理站「回家後照顧有困難」，小組可在出院前完成長照評估、安排居家護理或輔具，避免「出院當天才手忙腳亂」。長照 3.0 的醫照整合目標，是 2030 年出院銜接長照「零天等待」。</p>
      <p>中風、髖骨骨折、衰弱等住院者，也可詢問是否符合健保「急性後期整合照護（PAC）」；2026 年起 PAC 對象納入長照給付範圍。</p>
    </Callout>
    <Callout kind="note">
      <p>
        核定後的額度與自付比例，可以用 <LinkBtn onClick={() => goTo('BENEFITS')}>第 5 章的四包錢試算器</LinkBtn> 先算一次，和 A 個管討論時更有方向。
      </p>
    </Callout>
  </div>
);

// ── 5. Benefits ──────────────────────────────────────────────────────────────

export const LtcBenefits: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <div className="grid gap-3 sm:grid-cols-2">
      {FOUR_PACKS.map((p) => (
        <article key={p.name} className="rounded-2xl border border-teal-200 dark:border-teal-900/70 bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/30 dark:to-slate-900/60 p-4 space-y-1.5">
          <h4 className="text-[16px] font-bold text-slate-900 dark:text-white">
            <span aria-hidden="true">{p.icon} </span>
            {p.name}
          </h4>
          <p className="text-[18px] font-display font-bold text-teal-700 dark:text-teal-300">{p.amount}</p>
          <p className="text-[13px] text-slate-600 dark:text-slate-300">
            <strong>對象：</strong>
            {p.who}　<strong>自付：</strong>
            {p.copay}
          </p>
          <p className="text-[13px] leading-relaxed text-slate-600 dark:text-slate-400">{p.covers}</p>
        </article>
      ))}
    </div>
    <LtcBudgetCalculator />
    <DataTable
      title="表 5-1　照顧及專業服務每月額度（依長照需要等級）"
      source="長期照顧服務申請及給付辦法"
      compact
      columns={[
        { key: 'level', header: '等級', className: 'min-w-[60px]' },
        { key: 'amount', header: '每月額度', className: 'min-w-[90px]' },
        { key: 'general', header: '一般戶用滿自付（16%）', className: 'min-w-[120px]' },
        { key: 'mid', header: '中低收入戶（5%）', className: 'min-w-[110px]' },
      ]}
      rows={[2, 3, 4, 5, 6, 7, 8].map((l) => {
        const a = ({ 2: 10020, 3: 15460, 4: 18580, 5: 24100, 6: 28070, 7: 32090, 8: 36180 } as Record<number, number>)[l];
        return { level: `第 ${l} 級`, amount: `${a.toLocaleString()} 元`, general: `${Math.round(a * 0.16).toLocaleString()} 元`, mid: `${Math.round(a * 0.05).toLocaleString()} 元` };
      })}
      rowKey={(r) => r.level}
    />
    <DataTable
      title="表 5-2　其他補助與 2026 年新制"
      columns={[
        { key: 'name', header: '項目', className: 'min-w-[140px]' },
        { key: 'amount', header: '金額', className: 'min-w-[150px]' },
        { key: 'rule', header: '條件與說明', className: 'min-w-[240px]' },
        { key: 'src', header: '依據', className: 'min-w-[100px]' },
      ]}
      rows={OTHER_SUBSIDIES}
      rowKey={(r) => r.name}
    />
    <Callout kind="tip" title="把額度用好的 5 個建議">
      <ul className="space-y-1">
        <li>• 先排「最能減輕負擔」的服務：洗澡、日照、喘息，比零散的陪伴更省力。</li>
        <li>• 居家復能優先：先讓長輩「自己做得到」，長期需要的照顧時數反而減少。</li>
        <li>• 輔具先租後買、先評估再買：氣墊床、移位機、洗澡椅都可用輔具額度。</li>
        <li>• 喘息是「年度額度」，分散到全年規律使用，不要年底才想起來。</li>
        <li>• 報稅時記得申報長照特別扣除額（每人 18 萬），並保留相關證明。</li>
      </ul>
    </Callout>
  </div>
);

// ── 6. Choose ────────────────────────────────────────────────────────────────

export const LtcChoose: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      照顧安排常是家庭會議裡最難的決定。與其爭論「誰應該照顧」，不如先一起回答下面五個問題，再把各種方案的費用與優缺點攤開來比較。
    </P>
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {CHOOSE_QUESTIONS.map((q, i) => (
        <li key={q.q} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3 space-y-1">
          <p className="text-[12px] font-bold text-teal-700 dark:text-teal-300">問題 {i + 1}</p>
          <p className="text-[14.5px] font-bold text-slate-900 dark:text-white">{q.q}</p>
          <p className="text-[12.5px] leading-snug text-slate-600 dark:text-slate-400">{q.hint}</p>
        </li>
      ))}
    </ol>
    <DataTable
      title="表 6-1　五種照顧安排比較"
      source="長照給付辦法；勞動部；市場行情（2026，各地差異大）"
      columns={[
        { key: 'name', header: '安排', className: 'min-w-[140px]' },
        { key: 'fit', header: '適合', className: 'min-w-[150px]' },
        { key: 'cost', header: '每月自付（約）', className: 'min-w-[140px]' },
        { key: 'pros', header: '優點', className: 'min-w-[140px]' },
        { key: 'cons', header: '要注意', className: 'min-w-[150px]' },
        { key: 'night', header: '夜間誰顧', className: 'min-w-[70px]' },
      ]}
      rows={CARE_OPTIONS}
      rowKey={(r) => r.id}
    />
    <FigureFrame number="圖 6-1" title="每月自付費用區間比較（萬元）" note="估算區間，實際依失能等級、地區、福利身分與使用量而定。" source="長照給付辦法；衛福部 2026 住宿補助；勞動部">
      <CostRangeChart />
    </FigureFrame>
    <Callout kind="tip" title="常見而可行的混搭">
      <ul className="space-y-1">
        <li>• <strong>白天日照＋晚上家人</strong>：家人可以上班，長輩白天有活動、晚上睡得好。</li>
        <li>• <strong>外看＋長照專業服務＋喘息</strong>：治療師教外看正確技巧，外看休假時用喘息銜接。</li>
        <li>• <strong>居家服務＋居家護理／醫療</strong>：管路與慢性病由醫護到府，生活照顧由照服員。</li>
        <li>• <strong>機構＋家人固定探視</strong>：專業處理醫療與夜間，家人專心陪伴。</li>
      </ul>
      <p>
        想深入了解：<LinkBtn onClick={() => goTo('HOME')}>居家</LinkBtn>、<LinkBtn onClick={() => goTo('COMMUNITY')}>社區</LinkBtn>、
        <LinkBtn onClick={() => goTo('FOREIGN')}>外籍看護</LinkBtn>、<LinkBtn onClick={() => goTo('FACILITY')}>機構</LinkBtn>。
      </p>
    </Callout>
    <Callout kind="note" title="家庭會議的小撇步">
      <p>邀請所有手足（包含住外地的），先由主要照顧者說明現況與極限，再分工「出力、出錢、出時間」；把決定寫下來，3 個月後再檢討一次。必要時可請 A 個管或社工協助主持。</p>
    </Callout>
  </div>
);

// ── 7. Home ──────────────────────────────────────────────────────────────────

export const LtcHome: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      在家照顧不等於「家人全部自己來」。長照的居家服務與專業服務、健保的居家護理與居家醫療，可以組成一個到府的照顧團隊。關鍵是讓每個人做自己最擅長的事。
    </P>
    <DataTable
      title="表 7-1　長照居家式服務一覽"
      source="長期照顧給付及支付基準；衛福部 2025-09 修正"
      columns={[
        { key: 'code', header: '代碼', className: 'min-w-[80px]' },
        { key: 'name', header: '服務', className: 'min-w-[110px]' },
        { key: 'who', header: '提供者', className: 'min-w-[100px]' },
        { key: 'what', header: '內容', className: 'min-w-[200px]' },
        { key: 'note', header: '注意', className: 'min-w-[150px]' },
      ]}
      rows={HOME_SERVICES}
      rowKey={(r) => r.code + r.name}
    />
    <Callout kind="evidence" title="為什麼要先做「復能」？">
      <p>傳統居家服務是「幫他做」，復能則是「陪他重新做到」。國際研究（如丹麥、紐澳的 reablement 模式）顯示，以目標為導向的短期密集復能，能讓部分長者恢復自理、減少後續需要的照顧時數。台灣長照 3.0 也把「積極長照復能」列為八大目標之一。</p>
    </Callout>
    <DataTable
      title="表 7-2　健保到府醫療服務"
      source="健保署居家醫療照護整合計畫"
      columns={[
        { key: 'name', header: '服務', className: 'min-w-[120px]' },
        { key: 'what', header: '內容', className: 'min-w-[200px]' },
        { key: 'who', header: '適用', className: 'min-w-[150px]' },
        { key: 'how', header: '怎麼申請', className: 'min-w-[160px]' },
      ]}
      rows={NHI_HOME}
      rowKey={(r) => r.name}
    />
    <Callout kind="tip" title="讓居家照顧更順的準備">
      <ul className="space-y-1">
        <li>• 床邊放一本「照顧筆記」：用藥、管路更換日期、翻身與排便紀錄，所有照顧者共用。</li>
        <li>• 浴室與床邊先申請扶手、洗澡椅、便盆椅與氣墊床（輔具額度）。</li>
        <li>• 冰箱貼上緊急聯絡卡：主要家屬、居家護理所、A 個管與就醫醫院。</li>
        <li>• 照顧技巧不熟練，請專業服務到府指導，或看 <LinkBtn onClick={() => goTo('SKILLS')}>第 11 章 照護技巧</LinkBtn>。</li>
      </ul>
    </Callout>
  </div>
);

// ── 8. Community ─────────────────────────────────────────────────────────────

export const LtcCommunity: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <P>
      社區式照顧是長照 2.0 以來成長最快的服務：長輩白天到離家不遠的中心活動、用餐、復能，晚上回家睡覺。對失智長輩來說，規律作息與社交刺激本身就是治療。
    </P>
    <DataTable
      title="表 8-1　社區式照顧服務"
      columns={[
        { key: 'name', header: '服務', className: 'min-w-[130px]' },
        { key: 'for', header: '適合對象', className: 'min-w-[150px]' },
        { key: 'what', header: '內容', className: 'min-w-[200px]' },
        { key: 'hours', header: '時段', className: 'min-w-[100px]' },
      ]}
      rows={COMMUNITY_SERVICES}
      rowKey={(r) => r.name}
    />
    <Callout kind="evidence" title="2025-09-01 新制：外看家庭也能用日照與家托">
      <p>過去聘僱外籍看護的家庭幾乎無法使用社區式服務。長照 3.0 第一階段起，外看家庭可在既有核定額度內使用日間照顧與家庭托顧，讓長輩白天有團體活動與復能、外看也能協同照顧；交通接送每趟補助提高到一般地區 115 元、原鄉離島 140 元，並擴及身障日間服務。</p>
    </Callout>
    <H3>參訪與試讀日照中心的檢核清單</H3>
    <Bullets items={DAYCARE_VISIT} />
    <Callout kind="tip" title="讓長輩願意去日照的說法">
      <p>避免說「送你去被照顧」。可以說「去上課、去當志工、去找朋友」，第一週家人陪同、從半天開始；帶一樣熟悉的物品，並請工作人員安排他擅長的事（寫書法、唱歌、摺紙）。</p>
    </Callout>
  </div>
);

// ── 9. Foreign caregiver ─────────────────────────────────────────────────────

export const LtcForeign: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      外籍家庭看護工是台灣中重度失能家庭最重要的 24 小時照顧人力之一。就業服務法第 46 條修正後，<strong>2025 年 8 月 1 日起 80 歲以上長者免醫療評估即可申請</strong>，勞動部同時採「輕重分流、重症優先」，讓重症家庭在每個環節優先處理。
    </P>
    <ForeignEligibilityChecker />
    <DataTable
      title="表 9-1　被看護者資格與文件（2025-08-01 起）"
      source="勞動部 2025-07-28；勞動力發展署；審查標準"
      columns={[
        { key: 'who', header: '被看護者', className: 'min-w-[150px]' },
        { key: 'need', header: '條件', className: 'min-w-[150px]' },
        { key: 'doc', header: '需要的文件', className: 'min-w-[220px]' },
      ]}
      rows={FOREIGN_RULES}
      rowKey={(r) => r.who}
      rowTone={(r) => r.tone}
    />
    <H3>申請流程：8 個步驟</H3>
    <Steps items={FOREIGN_STEPS} />
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <DataTable
        title="表 9-2　每月與一次性費用"
        source="勞動部規定；2026 市場行情"
        columns={[
          { key: 'item', header: '項目', className: 'min-w-[100px]' },
          { key: 'amount', header: '金額', className: 'min-w-[100px]' },
          { key: 'note', header: '說明', className: 'min-w-[180px]' },
        ]}
        rows={FOREIGN_COST}
        rowKey={(r) => r.item}
        footnote="合計每月約 2.3–2.7 萬元（依休假日工作天數而定）。"
      />
      <Callout kind="note" title="雇主的法定義務">
        <Bullets items={FOREIGN_DUTIES} />
      </Callout>
    </div>
    <div className="grid gap-3 md:grid-cols-2">
      {FOREIGN_TIPS.map((t) => (
        <Callout key={t.title} kind="tip" title={t.title}>
          <p>{t.detail}</p>
        </Callout>
      ))}
    </div>
    <DataTable
      title="表 9-3　外籍家庭看護工 2025/2026 多元免評三軌申請資格全解析"
      source="就業服務法第 46 條；勞動部 2025-08 新制公告"
      columns={[
        { key: 'trackName', header: '申請軌道', className: 'min-w-[130px]' },
        { key: 'targetGroup', header: '適用對象', className: 'min-w-[180px]' },
        { key: 'exemptionRule', header: '免評規定', className: 'min-w-[170px]' },
        { key: 'requiredProof', header: '應備文件', className: 'min-w-[180px]' },
        { key: 'processingSpeed', header: '審查與求才時效', className: 'min-w-[160px]' },
        { key: 'keyNotice', header: '重要注意事項', className: 'min-w-[180px]' },
      ]}
      rows={FOREIGN_CAREGIVER_3_TRACKS}
      rowKey={(r) => r.trackName}
    />

    <DataTable
      title="表 9-4　聘僱外看完整月度與一次性支出精算（含政府減免）"
      source="勞動部勞動力發展署；健保法；所得稅法"
      columns={[
        { key: 'category', header: '費用類別', className: 'min-w-[120px]' },
        { key: 'item', header: '費用項目', className: 'min-w-[180px]' },
        { key: 'monthlyAmount', header: '費用金額', className: 'min-w-[140px]' },
        { key: 'payee', header: '收款對象', className: 'min-w-[150px]' },
        { key: 'legalBasis', header: '法規依據與減免說明', className: 'min-w-[200px]' },
      ]}
      rows={FOREIGN_CAREGIVER_COST_DETAILED}
      rowKey={(r) => r.item}
    />

    <DataTable
      title="表 9-5　外看日常與急症照護三語溝通快速手冊（印尼語、越南語、菲律賓語）"
      source="勞動部跨國勞動力權益維護指南；長照臨床溝通實務"
      columns={[
        { key: 'chinese', header: '中文指令', className: 'min-w-[130px]' },
        { key: 'pinyinOrUsage', header: '照護情境說明', className: 'min-w-[130px]' },
        { key: 'indonesian', header: '印尼語 (Bahasa Indonesia)', className: 'min-w-[190px]' },
        { key: 'vietnamese', header: '越南語 (Tiếng Việt)', className: 'min-w-[190px]' },
        { key: 'tagalog', header: '菲律賓語 (Tagalog)', className: 'min-w-[190px]' },
      ]}
      rows={MULTILINGUAL_CAREGIVER_PHRASES}
      rowKey={(r) => r.chinese}
    />

    <Callout kind="myth" title="外看不是「全包」">
      <p>
        外籍看護同樣需要休息、訓練與支持。把照顧步驟寫成圖卡、請治療師到府示範、讓外看參加補充訓練，並安排規律喘息，照顧品質與留任率都會更好。家屬自己的負荷也請檢視 <LinkBtn onClick={() => goTo('CAREGIVER')}>第 13 章</LinkBtn>。
      </p>
    </Callout>
  </div>
);

// ── 10. Facility ─────────────────────────────────────────────────────────────

export const LtcFacility: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      住宿式機構不是「最後的選擇」，而是當照顧需要超過家庭能力時的專業選擇：24 小時有人、護理與醫師巡診、緊急狀況有人處理。台灣的住宿機構依法源分成好幾類，收住對象與人力配置不同。
    </P>
    <DataTable
      title="表 10-1　住宿式機構類型比較"
      source="衛福部；各類機構設置標準；收費為 2026 年概估"
      columns={[
        { key: 'type', header: '類型', className: 'min-w-[130px]' },
        { key: 'law', header: '法源／主管', className: 'min-w-[120px]' },
        { key: 'for', header: '適合對象', className: 'min-w-[180px]' },
        { key: 'staff', header: '人力', className: 'min-w-[160px]' },
        { key: 'cost', header: '每月費用', className: 'min-w-[100px]' },
      ]}
      rows={FACILITY_TYPES}
      rowKey={(r) => r.type}
    />
    <Callout kind="evidence" title="2026 年住宿式機構補助：每月 1.5 萬、全年最高 18 萬">
      <p>行政院 2026-09-10 通過調增：長照需要等級 4 級以上或領有中度以上身心障礙證明、入住合法住宿式機構的住民，每月補助由 1 萬提高為 1.5 萬，全年最高 18 萬，追溯自 2026-01-01；不排富。</p>
      <p>認列方式改為「按月」：當月實際入住達日曆天數一半以上即算一個月，地方政府上下半年分兩次撥付。2025 年已領 12 萬者，2026 年 1–8 月住滿 180 天仍給 12 萬；9 月起適用新制。申請時程依各縣市公告。</p>
    </Callout>

    <DataTable
      title="表 10-2　五大機構類型全景橫向深度矩陣表（護病比、三管收治、月費與補助）"
      source="衛福部護理及健康照護司；社會及家庭署老人福利機構設置標準"
      columns={[
        { key: 'type', header: '機構類型', className: 'min-w-[150px]' },
        { key: 'authority', header: '主管機關與法源', className: 'min-w-[140px]' },
        { key: 'nurseRatio', header: '護理人力配置', className: 'min-w-[160px]' },
        { key: 'caregiverRatio', header: '照服員配置', className: 'min-w-[150px]' },
        { key: 'threeTubesEligible', header: '三管收案能力', className: 'min-w-[170px]' },
        { key: 'suitableResidents', header: '收住對象', className: 'min-w-[180px]' },
        { key: 'averageMonthlyCost', header: '每月平均收費', className: 'min-w-[160px]' },
        { key: 'subsidyEligible', header: '住宿補助 18 萬適用性', className: 'min-w-[180px]' },
      ]}
      rows={FACILITY_5_TYPES_DEEP}
      rowKey={(r) => r.type}
    />
    <FacilityChecklist />
    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <Callout kind="note" title="月費以外，常被忽略的費用">
        <Bullets items={FACILITY_HIDDEN_COSTS} />
      </Callout>
      <Callout kind="tip" title="入住後的適應">
        <Bullets items={MOVE_IN_TIPS} />
      </Callout>
    </div>
    <Callout kind="note">
      <p>
        入住前後的財務與法律安排（存款怎麼支付、誰簽約、監護問題），請參考 <LinkBtn onClick={() => goTo('LEGAL')}>第 14 章</LinkBtn>。
      </p>
    </Callout>
  </div>
);

// ── 11. Skills ───────────────────────────────────────────────────────────────

export const LtcSkills: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <P>
      以下七張照護卡涵蓋居家照顧最常遇到的情境。第一次操作前，最好請居家護理師、治療師或照服員到府示範，再依長輩的狀況調整。
    </P>
    <div className="grid gap-3 lg:grid-cols-2">
      {SKILL_CARDS.map((c) => (
        <article key={c.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2 print-avoid-break">
          <h4 className="text-[16px] font-bold text-slate-900 dark:text-white">
            <span aria-hidden="true">{c.icon} </span>
            {c.title}
          </h4>
          <ol className="space-y-1 list-decimal pl-5 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
            {c.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
          <p className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 px-3 py-2 text-[13px] leading-relaxed text-amber-950 dark:text-amber-100">
            ⚠️ {c.caution}
          </p>
        </article>
      ))}
    </div>
    <DataTable
      title="表 11-1　IDDSI 吞嚥飲食分級"
      source="IDDSI 國際吞嚥障礙飲食標準"
      compact
      columns={[
        { key: 'level', header: '等級', className: 'min-w-[50px]' },
        { key: 'name', header: '名稱', className: 'min-w-[110px]' },
        { key: 'example', header: '例子', className: 'min-w-[180px]' },
      ]}
      rows={IDDSI_LEVELS}
      rowKey={(r) => r.level}
    />

    <DataTable
      title="表 11-2　壓瘡（壓力性損傷）1–4 期臨床分期表徵、處置與敷料選用指南"
      source="EPUAP / NPIAP 2019 國際壓瘡臨床實務指引"
      columns={[
        { key: 'stage', header: '分期', className: 'min-w-[150px]' },
        { key: 'clinicalFeatures', header: '臨床傷口特徵', className: 'min-w-[220px]' },
        { key: 'anatomicalDepth', header: '侵蝕深度', className: 'min-w-[150px]' },
        { key: 'nursingActions', header: '處置關鍵動作', className: 'min-w-[200px]' },
        { key: 'recommendedDressings', header: '推薦敷料', className: 'min-w-[170px]' },
        { key: 'contraindications', header: '重大禁忌', className: 'min-w-[180px]' },
      ]}
      rows={BEDSORE_STAGING_GUIDE}
      rowKey={(r) => r.stage}
    />

    <H3>居家「三管」（鼻胃管、導尿管、氣切管）照護黃金 SOP 與急症處置</H3>
    <div className="space-y-4">
      {HOME_THREE_TUBES_SOP.map((tube) => (
        <article key={tube.tubeName} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <h4 className="text-[16px] font-bold text-slate-900 dark:text-white">{tube.tubeName}</h4>
            <span className="text-[12px] font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
              更換週期：{tube.replacementCycle}
            </span>
          </div>
          <p className="text-[13.5px] text-slate-600 dark:text-slate-300">{tube.purpose}</p>
          <div className="space-y-1.5">
            <p className="text-[13px] font-bold text-slate-900 dark:text-white">日常照護重點與 SOP：</p>
            <ul className="space-y-1 text-[13px] text-slate-700 dark:text-slate-300 pl-4 list-disc">
              {tube.dailyCareProtocol.map((proto, pidx) => (
                <li key={pidx}>{proto}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 p-3 space-y-1">
            <p className="text-[12.5px] font-bold text-rose-900 dark:text-rose-300">🚨 急症紅燈與緊急聯絡警訊：</p>
            <ul className="space-y-0.5 text-[12px] text-rose-950 dark:text-rose-200 pl-4 list-disc">
              {tube.emergencyAlerts.map((alert, aidx) => (
                <li key={aidx}>{alert}</li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>

    <DataTable
      title="表 11-3　居家照護分級警訊：什麼時候要就醫？"
      columns={[
        { key: 'sign', header: '狀況', className: 'min-w-[180px]' },
        { key: 'why', header: '可能原因', className: 'min-w-[180px]' },
        { key: 'urgency', header: '怎麼做', className: 'min-w-[140px]', render: (r) => <strong>{LTC_URGENCY_META[r.urgency].label}</strong> },
      ]}
      rows={LTC_RED_FLAGS}
      rowKey={(r) => r.sign}
      rowTone={(r) => LTC_URGENCY_META[r.urgency].tone}
    />
    <Callout kind="note" title="更多照護技巧">
      <p>壓傷分期圖、好發部位與翻身時鐘，請參考脊椎照護專區的
        <a href="#spine/CAREGIVER" className="font-semibold text-teal-700 dark:text-teal-300 underline underline-offset-2">「家屬居家照護」章</a>；照顧者的護腰姿勢與防跌改造也收錄在該章。</p>
    </Callout>
  </div>
);

// ── 12. Dementia ─────────────────────────────────────────────────────────────

export const LtcDementia: React.FC<GoTo> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      失智症不是正常老化。它是一群讓記憶、判斷、語言與行為逐漸退化的疾病，最常見的是阿茲海默症與血管性失智。早期診斷能排除可治療的原因（甲狀腺、維生素 B12、憂鬱、藥物、水腦），也讓家人有時間一起規劃。
    </P>
    <section className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-4 space-y-2">
      <h3 className="text-[15px] font-bold text-slate-900 dark:text-white">失智症十大警訊</h3>
      <ol className="grid gap-1.5 sm:grid-cols-2 list-decimal pl-5 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">
        {DEMENTIA_WARNINGS.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ol>
      <p className="text-[12.5px] text-slate-500 dark:text-slate-400">出現這些變化，可先做 AD-8 篩檢（見 第 3 章），再到神經內科、精神科或記憶門診評估。資料來源：台灣失智症協會。</p>
    </section>
    <H3>處理精神行為症狀（BPSD）：DICE 四步驟</H3>
    <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {DICE_STEPS.map((s) => (
        <li key={s.step} className="rounded-2xl border border-teal-200 dark:border-teal-900/70 bg-teal-50/60 dark:bg-teal-950/20 p-3 space-y-1">
          <p className="text-[14px] font-bold text-teal-800 dark:text-teal-200">{s.step}</p>
          <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300">{s.detail}</p>
        </li>
      ))}
    </ol>
    <DataTable
      title="表 12-1　常見困擾行為與可以試試的做法"
      source="NICE NG97；Kales 2014（DICE）"
      columns={[
        { key: 'symptom', header: '狀況', className: 'min-w-[140px]' },
        { key: 'try', header: '可以這樣做', className: 'min-w-[260px]' },
      ]}
      rows={BPSD_TIPS}
      rowKey={(r) => r.symptom}
    />
    <Callout kind="redflag" title="失智長輩突然變得更混亂？">
      <p>幾小時到幾天內突然加重的混亂、嗜睡或躁動，常是「譫妄」——感染（尿道炎、肺炎）、脫水、便秘、尿滯留或新藥物引起，需要儘快就醫，不要以為只是失智變嚴重。</p>
    </Callout>
    <DataTable
      title="表 12-2　失智照顧資源"
      compact
      columns={[
        { key: 'name', header: '資源', className: 'min-w-[160px]' },
        { key: 'what', header: '提供什麼', className: 'min-w-[200px]' },
      ]}
      rows={DEMENTIA_RESOURCES}
      rowKey={(r) => r.name}
    />
    <Callout kind="tip" title="趁早規劃">
      <p>
        失智初期仍有判斷能力，是完成意定監護、信託與預立醫療決定的最佳時機，請參考 <LinkBtn onClick={() => goTo('LEGAL')}>第 14 章</LinkBtn>。照顧者壓力特別大，記得使用 <LinkBtn onClick={() => goTo('CAREGIVER')}>喘息與支持資源</LinkBtn>。
      </p>
    </Callout>
  </div>
);

// ── 13. Caregiver ────────────────────────────────────────────────────────────

export const LtcCaregiver: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <P>
      照顧是一場長跑。研究一致發現，長期家庭照顧者有較高的憂鬱、焦慮、慢性病與社會孤立風險。照顧者願意求助、規律休息，被照顧者的生活品質也會更好。
    </P>
    <CaregiverStrainCheck />
    <DataTable
      title="表 13-1　喘息服務的四種用法"
      source="長期照顧給付及支付基準"
      columns={[
        { key: 'mode', header: '方式', className: 'min-w-[110px]' },
        { key: 'how', header: '怎麼用', className: 'min-w-[200px]' },
        { key: 'tip', header: '小技巧', className: 'min-w-[180px]' },
      ]}
      rows={RESPITE_MODES}
      rowKey={(r) => r.mode}
    />
    <DataTable
      title="表 13-2　照顧者求助管道"
      compact
      columns={[
        { key: 'name', header: '管道', className: 'min-w-[170px]' },
        { key: 'what', header: '提供什麼', className: 'min-w-[200px]' },
      ]}
      rows={CAREGIVER_HELP}
      rowKey={(r) => r.name}
    />
    <Callout kind="evidence" title="研究怎麼說">
      <p>針對失智症照顧者的心理社會介入（照顧技巧訓練、問題解決、支持團體、認知行為取向）在系統性回顧中可降低照顧負荷與憂鬱症狀；效果最好的是「多元件、持續數週以上、依個別需要調整」的方案。</p>
    </Callout>
    <Callout kind="tip" title="照顧者自己的「每日最低劑量」">
      <ul className="space-y-1">
        <li>• 每天 20 分鐘只屬於自己：散步、聽音樂、和朋友講電話。</li>
        <li>• 每週至少半天喘息，每年安排一次自己的健康檢查。</li>
        <li>• 學會說「我需要幫忙」：把可以分出去的事列成清單，讓親友認領。</li>
        <li>• 照顧不是完美比賽：接受「夠好」就好，對自己寬容一點。</li>
      </ul>
    </Callout>
    <PhoneStrip />
  </div>
);

// ── 14. Legal & end of life ──────────────────────────────────────────────────

export const LtcLegal: React.FC<GoTo> = () => (
  <div className="space-y-6">
    <P>
      失能與失智最常見的家庭衝突，不是誰照顧，而是「錢與決定」：存款領不出來、房子不能賣、臨終要不要插管。這些事最好在本人還能清楚表達時，<strong>由本人自己決定、寫下來、告訴家人</strong>。
    </P>
    <DataTable
      title="表 14-1　法律與醫療決定工具"
      source="民法；病人自主權利法；安寧緩和醫療條例"
      columns={[
        { key: 'tool', header: '工具', className: 'min-w-[110px]' },
        { key: 'when', header: '適用時機', className: 'min-w-[160px]' },
        { key: 'what', header: '效果', className: 'min-w-[200px]' },
        { key: 'how', header: '怎麼辦理', className: 'min-w-[170px]' },
      ]}
      rows={LEGAL_TOOLS}
      rowKey={(r) => r.tool}
    />
    <Callout kind="tip" title="趁清楚時完成的 5 件事">
      <ol className="space-y-1 list-decimal pl-5">
        <li>列出財產、保險、帳戶與密碼保管方式，並告訴一位信任的家人。</li>
        <li>簽署意定監護契約（公證），指定未來的監護人。</li>
        <li>評估安養信託，讓照顧費用自動支付、避免詐騙。</li>
        <li>預約預立醫療照護諮商（ACP），簽署預立醫療決定並註記健保卡。</li>
        <li>和家人聊「重要的事」：想在哪裡生活、在哪裡走完最後一程。</li>
      </ol>
    </Callout>
    <DataTable
      title="表 14-2　長照相關保險的基本概念"
      compact
      columns={[
        { key: 'kind', header: '類型', className: 'min-w-[110px]' },
        { key: 'trigger', header: '理賠條件', className: 'min-w-[200px]' },
        { key: 'note', header: '要看清楚', className: 'min-w-[160px]' },
      ]}
      rows={INSURANCE_NOTES}
      rowKey={(r) => r.kind}
      footnote="本表為一般知識說明，不構成保險或財務建議；投保前請詳閱條款或諮詢專業人員。"
    />
    <Callout kind="evidence" title="居家安寧與善終">
      <p>末期病人可以選擇在家接受安寧照顧：健保居家安寧團隊到府控制疼痛、喘與焦慮，並支持家屬。病人自主權利法讓每個人在五種臨床條件下，依預立醫療決定拒絕或接受維生醫療與人工營養——這是送給家人最好的禮物之一，免去他們替你做艱難決定的負擔。</p>
    </Callout>
    <Callout kind="redflag" title="小心長照詐騙與財務剝削">
      <p>假冒長照、健保或社會局人員要求匯款、提供存摺密碼；推銷高價「長照保證床位」；陌生人突然與長輩過度親近並談錢——都要警覺。可撥 165 反詐騙專線查證。</p>
    </Callout>
  </div>
);
