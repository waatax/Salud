import React from 'react';
import { ArrowDown, ArrowUp, Check, Syringe, X } from 'lucide-react';
import {
  FIVE_LEVERS,
  HARD_OUTCOMES,
  INCRETIN_COMPARE,
  INJECTION_STEPS,
  LONG_TERM_OPTIONS,
  MISSED_DOSE_RULES,
  MONITORING,
  MUSCLE_ACTIONS,
  MUSCLE_CHECKS,
  PLATEAU_CHECKS,
  POPULATION_RESULTS,
  S1_CARDIOMETABOLIC,
  SAFE_BUY_POINTS,
  STORAGE_RULES,
  SUPPLEMENT_NOTES,
  THREE_HIGH_MEDS,
  TZP_MYTHS,
  TZP_SOURCES,
  WITHDRAWAL_METRICS,
} from '../../../../data/tirzepatideData';
import { Callout, DataTable, DeepDive, Panel, Refs, Section, SectionNav, type SectionDef } from './chapterUi';
import {
  AeChart,
  DoseLadder,
  DoseResponseChart,
  InjectionSites,
  JourneyStrip,
  LeanFatBar,
  MaintainChart,
  MechanismFigure,
  WithdrawalChart,
} from './TzpFigures';
import { FitChecker, ProteinPlanner, RedFlagList, SideEffectExplorer, StepGuide, VisitChecklist, WeightProjection } from './TzpTools';

const SECTIONS: SectionDef[] = [
  { id: 'fit', label: '適合我嗎' },
  { id: 'how', label: '怎麼作用' },
  { id: 'expect', label: '效果多大' },
  { id: 'dose', label: '劑量怎麼爬' },
  { id: 'inject', label: '怎麼打' },
  { id: 'muscle', label: '保住肌肉' },
  { id: 'side', label: '副作用' },
  { id: 'meds', label: '三高用藥' },
  { id: 'long', label: '長期與停藥' },
  { id: 'compare', label: '和其他藥比' },
  { id: 'safe', label: '買藥與費用' },
  { id: 'visit', label: '看診清單' },
];

const STAGE_PATHS = [
  { label: '我在考慮要不要打', ids: ['fit', 'expect', 'long', 'compare'] },
  { label: '我剛開始或正在升劑量', ids: ['dose', 'inject', 'side', 'muscle'] },
  { label: '我有高血壓、糖尿病或高血脂', ids: ['meds', 'expect', 'side'] },
  { label: '體重停了，或想減量停藥', ids: ['long', 'dose', 'muscle'] },
];

const scrollToSection = (id: string) => {
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
};

const labelOf = (id: string) => SECTIONS.find((s) => s.id === id)?.label ?? id;

const Delta: React.FC<{ v: number; unit: string }> = ({ v, unit }) => {
  const Icon = v > 0 ? ArrowUp : v < 0 ? ArrowDown : null;
  return (
    <span className="inline-flex items-center justify-end gap-0.5 tabular-nums">
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {v > 0 ? '+' : ''}
      {v}
      <span className="text-xs text-slate-500 dark:text-slate-400">{unit}</span>
    </span>
  );
};

export const TirzepatideChapter: React.FC = () => {
  return (
    <article className="space-y-10" aria-label="猛健樂完整指南">
      {/* ── Opening: what this is and what "maximum benefit" means ── */}
      <header className="space-y-4">
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 dark:border-emerald-900 dark:from-emerald-950/40 dark:to-salud-dark-surface sm:p-7">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-800 dark:text-emerald-300">
            <Syringe className="h-4 w-4" aria-hidden="true" />
            瘦瘦針專章 · 依 2026 年仿單與試驗整理
          </p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">猛健樂（tirzepatide）完整指南</h2>
          <p className="mt-2 max-w-3xl text-base leading-relaxed text-slate-700 dark:text-slate-300">
            「最大效益」不是打到最高劑量、掉得最快，而是
            <strong className="text-slate-900 dark:text-white">在吃得下、練得動、副作用可接受的前提下，長期守住減重與三高的改善</strong>。
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {[
              { k: '15–21%', v: '72 週平均減重（5–15 mg，SURMOUNT-1）' },
              { k: '每週 1 針', v: '由 2.5 mg 起步，每階至少 4 週' },
              { k: '約 3:1', v: '減掉的重量中，脂肪與去脂組織的比例' },
              { k: '82%', v: '停藥一年內回升至少四分之一的減重量' },
            ].map((s) => (
              <div key={s.k} className="rounded-xl bg-white/80 p-3 dark:bg-slate-900/60">
                <dt className="font-display text-xl font-extrabold tabular-nums text-emerald-800 dark:text-emerald-300 sm:text-2xl">{s.k}</dt>
                <dd className="mt-0.5 text-xs leading-snug text-slate-600 dark:text-slate-400">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Callout tone="warn" title="這是衛教資料，不是處方">
          猛健樂是處方藥。開始、升降劑量或停藥都要由醫師評估。本章數字主要來自美國仿單與國際試驗，台灣使用時以包裝內仿單與醫師指示為準。
        </Callout>

        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">你現在在哪個階段？</h3>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {STAGE_PATHS.map((p) => (
              <div key={p.label} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-salud-dark-surface">
                <div className="text-sm font-semibold text-slate-900 dark:text-white">{p.label}</div>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.ids.map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => scrollToSection(id)}
                      className="btn-tactile min-h-[36px] rounded-lg bg-emerald-50 px-2.5 py-1 text-sm text-emerald-900 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:hover:bg-emerald-950/70"
                    >
                      {labelOf(id)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">用得好的五個關鍵</h3>
          <ol className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {FIVE_LEVERS.map((l, i) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(l.id)}
                  className="btn-tactile h-full w-full rounded-xl border border-slate-200 bg-white p-3 text-left hover:border-emerald-400 dark:border-slate-800 dark:bg-salud-dark-surface dark:hover:border-emerald-700"
                >
                  <span className="text-xs font-bold tabular-nums text-emerald-700 dark:text-emerald-400">關鍵 {i + 1}</span>
                  <span className="mt-0.5 block text-sm font-bold text-slate-900 dark:text-white">{l.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400">{l.body}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="mb-2 text-base font-bold text-slate-900 dark:text-white">整段療程長這樣</h3>
          <JourneyStrip />
        </div>
      </header>

      <SectionNav sections={SECTIONS} ariaLabel="本章段落" />

      {/* 1 */}
      <Section id="fit" n={1} title="我適合打猛健樂嗎？" answer="適應條件是成人 BMI ≥30，或 BMI ≥27 且至少有一項體重相關共病；甲狀腺髓質癌或 MEN 2 的本人或家族史、嚴重過敏史者不可使用。">
        <Panel title="對照一下你的狀況">
          <FitChecker />
        </Panel>
        <DeepDive title="為什麼亞洲人的門檻常被討論？">
          <p>台灣把 BMI 24 定為過重、27 定為肥胖，亞洲人在較低 BMI 就可能出現三高。但藥物適應症是依試驗條件核准的，BMI 24–27 使用屬於仿單外，缺少長期資料，也沒有必要為了「再瘦一點」承擔副作用與費用。</p>
          <p>世界衛生組織 2025 年指引把這類藥物定位為肥胖的長期治療，並建議搭配密集行為治療；同時指出長期效果、停藥復胖與費用仍有不確定性。</p>
        </DeepDive>
        <Refs ids={['label', 'tfda2025', 'tfda2026', 'who']} />
      </Section>

      {/* 2 */}
      <Section id="how" n={2} title="它怎麼讓人變瘦？" answer="它同時模仿兩種腸泌素（GIP 與 GLP-1），主要靠降低食慾、增加飽足感，讓人自然吃得比較少，而不是燃燒脂肪。">
        <Panel>
          <MechanismFigure />
        </Panel>
        <DeepDive title="深入一點：藥物設計與藥理">
          <p>Tirzepatide 是 39 個胺基酸的單一胜肽，同時活化 GIP 與 GLP-1 受體，並接上 C20 脂肪酸鏈與白蛋白結合，半衰期約 5–6 天，所以每週打一次就夠。</p>
          <p>聯合共識指出，這類藥物使熱量攝取比安慰劑低約 16–39%。人體試驗裡，它對胃排空的延遲在第一劑最大，之後會減弱，因此噁心通常不是一直存在，升劑量時才又出現。</p>
          <p>GIP 在脂肪組織與中樞神經的角色仍在研究。動物與小型人體研究提示它可能改善脂肪儲存與胰島素敏感性，但不能把這些機轉直接當成已被證實的臨床好處。</p>
        </DeepDive>
        <Refs ids={['label', 'advisory']} />
      </Section>

      {/* 3 */}
      <Section id="expect" n={3} title="效果有多大？三高會改善多少？" answer="無糖尿病者 72 週平均減 15–21%，第 2 型糖尿病者約 13–15%。三酸甘油酯與血壓改善明顯，但 LDL 只下降一點，不能取代 statin。">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="劑量越高平均越多，但差距有限">
            <DoseResponseChart />
          </Panel>
          <Panel title="換算成你的體重" hint="試驗平均值只能當參考，用來和醫師設定合理的期待。">
            <WeightProjection />
          </Panel>
        </div>
        <Panel title="不同族群的結果" hint="跨試驗比較只能當參考。亞洲試驗人數較少，追蹤時間也不一定相同。">
          <DataTable
            caption="各試驗的平均體重變化"
            head={['族群', '週數', '安慰劑', '10 mg', '15 mg', '備註']}
            align={['left', 'right', 'right', 'right', 'right', 'left']}
            rows={POPULATION_RESULTS.map((r) => [r.group, r.weeks, `${r.placebo}%`, `${r.d10}%`, `${r.d15}%`, r.note])}
          />
        </Panel>
        <Panel title="對三高的影響（SURMOUNT-1，72 週）" hint="數值為相對基準的平均變化。多數受試者一開始血壓、血脂並不算高，已有三高者的改善幅度可能不同。">
          <DataTable
            caption="SURMOUNT-1 心血管代謝指標的變化"
            head={['指標', '安慰劑', '5 mg', '10 mg', '15 mg', '怎麼解讀']}
            align={['left', 'right', 'right', 'right', 'right', 'left']}
            rows={S1_CARDIOMETABOLIC.map((m) => [`${m.metric}（${m.unit}）`, m.placebo, m.d5, m.d10, m.d15, m.take])}
          />
        </Panel>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">體重以外已有的證據</h3>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {HARD_OUTCOMES.map((o) => (
              <li key={o.title} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-salud-dark-surface">
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">{o.title}</div>
                <div className="mt-0.5 font-display text-xl font-extrabold tabular-nums text-slate-900 dark:text-white">{o.stat}</div>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <Callout tone="info" title="還不知道的事">
          對「沒有糖尿病的肥胖者」是否減少心肌梗塞、中風與死亡，專門的 SURMOUNT-MMO 試驗尚未發表，不能直接套用其他藥物或族群的結果。
        </Callout>
        <Refs ids={['s1', 's1-3y', 's2', 'j', 'cn', 'abpm', 'osa', 'summit', 'cvot', 'synergy']} />
      </Section>

      {/* 4 */}
      <Section id="dose" n={4} title="劑量怎麼爬？一定要打到最高嗎？" answer="從 2.5 mg 開始，每階至少 4 週，每次加 2.5 mg。5、10、15 mg 都是核准的維持劑量，依效果與耐受度選擇，不一定要到最高。">
        <Panel title="點每一階看說明">
          <DoseLadder />
        </Panel>
        <Panel title="我該升劑量了嗎？" hint="回答四個問題，整理出下次回診要討論的方向。">
          <StepGuide />
        </Panel>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Callout tone="tip" title="多等幾週沒關係">
            有腸胃症狀時可以把這階延長 2–4 週。專家共識也建議若某一階持續不舒服，可以回到前一階，或把維持劑量訂在較低的那一階。
          </Callout>
          <Callout tone="warn" title="不要這樣做">
            不要自行提早升、一次跳兩階、一週打兩次，或超過 15 mg。不會比較快瘦，只會增加脫水與急性腎損傷的風險。
          </Callout>
        </div>
        <Callout tone="info" title="什麼時候算「效果不好」？">
          英國 NICE 建議：用藥 6 個月減重未達 5% 時，可以考慮停藥並重新評估。這時也要檢查是否漏打、保存方式、其他藥物與飲食，或討論換藥與手術。
        </Callout>
        <Refs ids={['label', 'gi', 'nice', 's1']} />
      </Section>

      {/* 5 */}
      <Section id="inject" n={5} title="怎麼打？忘記了怎麼辦？" answer="每週固定一天打在腹部、大腿或上臂後側。漏打 4 天內可以補，超過就跳過。不可與別人共用，即使換了針頭也不行。">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="可以打哪裡">
            <InjectionSites />
          </Panel>
          <Panel title="每次注射的步驟" hint="第一次請讓藥師或護理師示範。不同筆型步驟不同，以包裝內說明書為準。">
            <ol className="space-y-2.5">
              {INJECTION_STEPS.map((s, i) => (
                <li key={s.title} className="flex gap-2.5 text-sm leading-relaxed">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-700 text-xs font-bold text-white dark:bg-emerald-600" aria-hidden="true">{i + 1}</span>
                  <div className="text-slate-700 dark:text-slate-300"><strong className="text-slate-900 dark:text-white">{s.title}</strong>：{s.body}</div>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="忘記打或想換日子">
            <DataTable caption="漏打與換日規則" head={['情況', '怎麼做']} rows={MISSED_DOSE_RULES.map((r) => [r.when, r.action])} />
          </Panel>
          <Panel title="怎麼保存">
            <DataTable caption="藥品保存規則" head={['類型', '規則']} rows={STORAGE_RULES.map((r) => [r.type, r.rule])} />
          </Panel>
        </div>
        <Refs ids={['label', 'prime']} />
      </Section>

      {/* 6 */}
      <Section id="muscle" n={6} title="怎麼保住肌肉？" answer="每週至少 2 次肌力訓練，加上足夠蛋白質。只補蛋白質、不做阻力訓練，很可能不夠。">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.4fr]">
          <Panel title="減掉的是什麼？">
            <LeanFatBar />
            <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">這個比例和一般節食減重相近，並非猛健樂特別傷肌肉。但減得越多，去脂組織的絕對流失也越多，長者、更年期女性與不運動者特別要注意。</p>
            <ul className="mt-3 space-y-2">
              {MUSCLE_ACTIONS.map((a) => (
                <li key={a.title} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                    <strong className="text-slate-900 dark:text-white">{a.title}</strong>
                    <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">{a.dose}</span>
                  </div>
                  <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-400">{a.body}</p>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="我每天要吃多少蛋白質？">
            <ProteinPlanner />
          </Panel>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="肌肉有沒有掉？三個簡單檢查" hint="體脂機的數字波動大，功能比較可靠。">
            <ul className="space-y-2">
              {MUSCLE_CHECKS.map((c) => (
                <li key={c.title} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{c.title}</strong>
                  <span className="ml-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">{c.cut}</span>
                  <div>{c.body}</div>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="保健品要吃嗎？">
            <ul className="space-y-2">
              {SUPPLEMENT_NOTES.map((s) => (
                <li key={s.name} className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  <strong className="text-slate-900 dark:text-white">{s.name}</strong>
                  <span className="ml-1.5 rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700 dark:bg-slate-800 dark:text-slate-300">{s.verdict}</span>
                  <div>{s.body}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
        <Callout tone="tip" title="水怎麼喝？">
          少量多次，尿色保持淡黃即可，不必強灌固定毫升數。心臟衰竭或腎臟病有限水指示者，請照醫師的量。
        </Callout>
        <Refs ids={['dxa', 'advisory', 'awgs']} />
      </Section>

      {/* 7 */}
      <Section id="side" n={7} title="副作用怎麼辦？" answer="最常見的是腸胃不適，多半在升劑量時出現，之後減輕。大多可以靠飲食調整與放慢速度處理，但有幾種警訊必須立刻就醫。">
        <RedFlagList />
        <Panel title="點症狀看怎麼處理">
          <SideEffectExplorer />
        </Panel>
        <Panel title="發生率有多高？" hint="安慰劑組也會有症狀，兩者的差距才比較接近藥物的影響。">
          <AeChart />
        </Panel>
        <DeepDive title="其他要知道的安全資訊">
          <p><strong>甲狀腺：</strong>大鼠試驗有甲狀腺 C 細胞腫瘤，人體關聯未知。例行驗降鈣素或做甲狀腺超音波的價值不明，但有脖子腫塊等症狀要檢查。</p>
          <p><strong>胰臟炎：</strong>體重管理試驗中約 0.2%，和安慰劑相近；上市後曾有嚴重甚至致命的個案。懷疑時要停藥。曾得過胰臟炎者須先和醫師討論。</p>
          <p><strong>膽囊：</strong>膽囊炎約 0.7%（安慰劑 0.2%），和體重下降有關。</p>
          <p><strong>腎臟：</strong>上市後有急性腎損傷通報，多發生在嘔吐腹瀉造成脫水之後。腎功能不全本身不需調整劑量，但有症狀時要驗腎功能。</p>
          <p><strong>情緒：</strong>FDA 2026 年回顧後認為與自殺意念沒有因果關係，已要求移除警語。出現情緒問題仍應求助，1925 安心專線 24 小時服務。</p>
        </DeepDive>
        <Refs ids={['label', 'gi', 'advisory', 'fda-si']} />
      </Section>

      {/* 8 */}
      <Section id="meds" n={8} title="我有三高，用藥要怎麼調？" answer="血壓和血糖會跟著下降，原本的藥可能變得太強，需要醫師調整；LDL 改善不多，statin 通常要繼續。不要自行停藥。">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {THREE_HIGH_MEDS.map((m) => (
            <Panel key={m.id} title={m.title}>
              <div className="space-y-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <p><strong className="text-slate-900 dark:text-white">會發生什麼：</strong>{m.effect}</p>
                <p><strong className="text-slate-900 dark:text-white">要注意：</strong>{m.risk}</p>
                <ul className="space-y-1">
                  {m.plan.map((p) => (
                    <li key={p} className="flex gap-1.5"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />{p}</li>
                  ))}
                </ul>
                <p className="flex gap-1.5 font-semibold text-red-800 dark:text-red-300"><X className="mt-1 h-3.5 w-3.5 shrink-0" aria-hidden="true" />{m.never}</p>
              </div>
            </Panel>
          ))}
        </div>
        <Panel title="追蹤時間表" hint="這是整理自仿單與聯合共識的實務建議，實際安排請依醫師指示。">
          <DataTable caption="用藥追蹤時間表" head={['時間', '要看什麼']} rows={MONITORING.map((m) => [m.when, m.items])} />
        </Panel>
        <Refs ids={['label', 'abpm', 'advisory', 'periop', 'nice']} />
      </Section>

      {/* 9 */}
      <Section id="long" n={9} title="要打多久？可以減量或停藥嗎？" answer="肥胖是慢性疾病，多數人停藥後體重與三高會回升。目前有隨機試驗支持的維持方式是繼續原劑量，或降到 5 mg。">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Panel title="突然停藥會怎樣？（SURMOUNT-4）">
            <WithdrawalChart />
          </Panel>
          <Panel title="哪種維持方式比較好？（SURMOUNT-MAINTAIN）">
            <MaintainChart />
          </Panel>
        </div>
        <Panel title="三高也會跟著回來" hint="SURMOUNT-4：前 36 週用藥時的改善，以及之後 52 週停藥或繼續用藥的變化。">
          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full min-w-[420px] border-collapse text-sm">
              <caption className="sr-only">SURMOUNT-4 三高指標在用藥與停藥期間的變化</caption>
              <thead className="bg-slate-50 text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                <tr>
                  <th scope="col" className="px-3 py-2 text-left font-semibold">指標</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">前 36 週用藥</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">之後停藥</th>
                  <th scope="col" className="px-3 py-2 text-right font-semibold">之後繼續用藥</th>
                </tr>
              </thead>
              <tbody>
                {WITHDRAWAL_METRICS.map((m) => (
                  <tr key={m.metric} className="border-t border-slate-200 dark:border-slate-800">
                    <th scope="row" className="px-3 py-2 text-left font-medium text-slate-900 dark:text-slate-100">{m.metric}</th>
                    <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300"><Delta v={m.leadIn} unit={m.unit} /></td>
                    <td className="px-3 py-2 text-right font-semibold text-slate-900 dark:text-white"><Delta v={m.stopped} unit={m.unit} /></td>
                    <td className="px-3 py-2 text-right text-slate-700 dark:text-slate-300"><Delta v={m.continued} unit={m.unit} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">達標之後的四條路</h3>
          <ul className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-2">
            {LONG_TERM_OPTIONS.map((o) => (
              <li key={o.id} className={`rounded-xl border p-3 ${o.id === 'interval' ? 'border-amber-300 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/20' : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-salud-dark-surface'}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-2">
                  <strong className="text-sm text-slate-900 dark:text-white">{o.title}</strong>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{o.evidence}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{o.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <Panel title="體重停了怎麼辦？">
          <ul className="space-y-1.5">
            {PLATEAU_CHECKS.map((c) => (
              <li key={c} className="flex gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                {c}
              </li>
            ))}
          </ul>
        </Panel>
        <Callout tone="tip" title="如果決定要停">
          和醫師先約好：下一次量體重與抽血的時間、體重回升多少就回診。分析顯示，回升不到四分之一的人，腰圍、非 HDL 膽固醇與空腹胰島素沒有明顯惡化；回升越多，三高惡化越明顯。及早處理很重要，這不是意志力不足。
        </Callout>
        <Refs ids={['s4', 's4-regain', 'maintain', 'label', 'step1']} />
      </Section>

      {/* 10 */}
      <Section id="compare" n={10} title="和其他瘦瘦針比起來呢？" answer="直接對決的試驗顯示，72 週 tirzepatide 平均減 20.2%，semaglutide 減 13.7%。但選藥還要看共病、耐受度、費用與能否取得。">
        <Panel hint="除 SURMOUNT-5 外，以下為不同試驗的結果，族群與設計不同，不能直接相比。">
          <DataTable
            caption="腸泌素類減重藥比較"
            head={['藥物', '類型', '使用方式', '試驗', '平均減重', '安慰劑', '狀態', '重點']}
            align={['left', 'left', 'left', 'left', 'right', 'right', 'left', 'left']}
            rows={INCRETIN_COMPARE.map((d) => [d.name, d.type, d.route, d.trial, `−${d.pct.toFixed(1)}%`, d.placebo === null ? '—' : `−${d.placebo.toFixed(1)}%`, d.status, d.highlight])}
          />
        </Panel>
        <Callout tone="warn" title="還沒上市的不要買">
          Retatrutide 尚未在任何國家核准，TRIUMPH-1 僅公布頂線結果。網路上販售的都不是合法藥品，內容物與劑量也無法確認。
        </Callout>
        <Refs ids={['s5', 'triumph', 'orfo', 'tfda2026']} />
      </Section>

      {/* 11 */}
      <Section id="safe" n={11} title="去哪裡拿藥？要花多少錢？" answer="一定要經醫師評估、由藥師調劑。網購與代購可能買到假藥，出事也不適用藥害救濟。純減重多為自費。">
        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {SAFE_BUY_POINTS.map((p) => (
            <li key={p.title} className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-salud-dark-surface">
              <strong className="text-sm text-slate-900 dark:text-white">{p.title}</strong>
              <p className="mt-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{p.body}</p>
            </li>
          ))}
        </ul>
        <Refs ids={['tfda2026', 'tfda2025']} />
      </Section>

      {/* 常見迷思 */}
      <div className="space-y-3">
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">常見說法，對不對？</h3>
        <ul className="grid gap-2 md:grid-cols-2">
          {TZP_MYTHS.map((m) => (
            <li key={m.myth} className="rounded-xl border border-slate-200 bg-white p-3 text-sm leading-relaxed dark:border-slate-800 dark:bg-salud-dark-surface">
              <div className="flex gap-1.5 font-semibold text-slate-900 dark:text-white"><X className="mt-1 h-3.5 w-3.5 shrink-0 text-red-700 dark:text-red-400" aria-hidden="true" />{m.myth}</div>
              <div className="mt-1 flex gap-1.5 text-slate-700 dark:text-slate-300"><Check className="mt-1 h-3.5 w-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /><span>{m.fact}</span></div>
            </li>
          ))}
        </ul>
      </div>

      {/* 12 */}
      <Section id="visit" n={12} title="看診前準備什麼？" answer="帶著近期抽血、一週 722 血壓與目前用藥清單，再把想問的問題列好。">
        <Panel>
          <VisitChecklist />
        </Panel>
      </Section>

      <DeepDive title={`本章參考資料（${TZP_SOURCES.length} 項）`}>
        <ul className="grid gap-1.5 md:grid-cols-2">
          {TZP_SOURCES.map((s) => (
            <li key={s.id}>
              <a href={s.url} target="_blank" rel="noreferrer noopener" className="underline decoration-slate-300 underline-offset-2 hover:text-emerald-700 dark:decoration-slate-600 dark:hover:text-emerald-400">{s.label}</a>
              <span className="text-xs text-slate-500 dark:text-slate-400">　{s.detail}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500 dark:text-slate-400">最後查證：2026 年 11 月。SURMOUNT-MAINTAIN、SURMOUNT-J、SURPASS-CVOT 的數字取自公開摘要與會議報告；若與原始論文有出入，以原文為準。</p>
      </DeepDive>
    </article>
  );
};
