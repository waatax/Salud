import React from 'react';
import {
  MB_KEY_NUMBERS,
  THREE_KEYS,
  ThreeKey,
  SLEEP_STAGES_MB,
  SLEEP_NEED_BY_AGE,
  CBTI_COMPONENTS,
  BREATH_METHODS,
  KAPALA_STEPS,
  KAPALA_PROGRESSION,
  KAPALA_EVIDENCE,
  TUNA_FOUR,
  TUNA_TYPES,
  TUNA_EVIDENCE,
  MINDFUL_PRACTICES,
  MINDFUL_TRIALS,
  MEDITATION_ADVERSE,
  WIND_DOWN,
  CAPD_STEPS,
  FOUR_WEEK_PLAN,
  SAFETY_MATRIX,
  PRACTICE_COLUMNS,
  MatrixLevel,
  SLEEP_TRAFFIC,
  SLEEP_MEDS,
  MindbodyTab,
} from '../../../data/mindbodyData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import {
  AutonomicLoopFigure,
  TwoProcessFigure,
  HypnogramFigure,
  LightLuxFigure,
  RsaFigure,
  BreathSpectrumFigure,
  KapalaWaveFigure,
  AbdominalPumpFigure,
  LiuZiJueWheel,
  TunaLadderFigure,
  AttentionLoopFigure,
  MindfulEvidenceChart,
  NightWakeFlowFigure,
  CapdWheelFigure,
} from './MindBodyFigures';
import { SchedulePlanner, BreathPacer, MeditationTimer, CapdSleepDiary, KapalaScreen } from './MindBodyTools';

type ChapterProps = { goTo: (id: MindbodyTab) => void };

const H3: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
  <h3 id={id} className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">
    {children}
  </h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>;

const Grade: React.FC<{ g: 'A' | 'B' | 'C' }> = ({ g }) => <GradePill grade={g} />;

const LinkBtn: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button type="button" onClick={onClick} className="font-semibold text-sky-700 dark:text-sky-400 underline underline-offset-2 hover:text-sky-900 dark:hover:text-sky-300">
    {children}
  </button>
);

// ── 1. Overview ─────────────────────────────────────────────────────────

export const OverviewChapter: React.FC<ChapterProps> = ({ goTo }) => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {MB_KEY_NUMBERS.map((n) => (
        <div key={n.label} className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3">
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-slate-900 dark:text-white">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>

    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
      <FigureFrame
        number="圖 1-1"
        title="睡眠、呼吸、情緒：同一條自律神經迴路"
        source="Russo 2017；Riemann 2023 失眠過度激發模型"
        caption="自律神經像一座天平：交感神經是油門、副交感（迷走）神經是煞車。失眠者白天晚上都偏向油門（過度激發）。切換上方按鈕看兩種循環。"
      >
        <AutonomicLoopFigure />
      </FigureFrame>
      <div className="space-y-4">
        <P>
          睡不好的人常說「累得要命，躺下腦袋卻像開了燈」。這不是意志力問題，而是神經系統卡在<strong>「油門」</strong>：心跳偏快、呼吸偏淺、腦中反覆演練明天的事。睡眠醫學把這叫
          <strong>過度激發（hyperarousal）</strong>，是慢性失眠的核心機轉。
        </P>
        <P>
          好消息是，這條迴路有三個你自己就能操作的開關：<strong>作息（睡眠）、呼吸、注意力（正念）</strong>
          。其中呼吸是唯一能「用意志直接控制」的自律神經功能，所以是最快的切入點——幾分鐘就能讓心跳慢下來。
        </P>
        <Callout kind="tip" title="三分鐘先試一次">
          <p>現在就做：用鼻子吸 4 秒、慢慢吐 6 秒，重複 18 次（3 分鐘）。很多人做完會發現肩膀放鬆、心跳變慢——這就是迷走神經煞車。</p>
        </Callout>
      </div>
    </div>

    <DataTable<ThreeKey>
      title="表 1-1　身心修復的四把鑰匙：作用、速度與最佳時段"
      source="AASM 2021；Fincham 2023；Goyal 2014；Raghuraj 1998"
      columns={[
        { key: 'key', header: '鑰匙', className: 'min-w-[120px]' },
        { key: 'lever', header: '作用在哪裡', className: 'min-w-[150px]' },
        { key: 'speed', header: '多快見效' },
        { key: 'best_time', header: '最佳時段', className: 'min-w-[130px]' },
        { key: 'evidence', header: '證據', render: (r) => <Grade g={r.evidence} /> },
        { key: 'first_step', header: '今天的第一步', className: 'min-w-[180px]' },
      ]}
      rows={THREE_KEYS}
      rowKey={(r) => r.key}
      rowTone={(r) => (r.key.startsWith('卡帕拉巴提') ? 'warn' : 'good')}
    />

    <H3>怎麼讀這個專區</H3>
    <ol className="grid gap-2 sm:grid-cols-2 text-[14px]">
      {[
        { t: '先懂睡眠', d: '第 2–3 章：兩歷程模型、24 小時作息規劃器', go: 'SLEEP_SCIENCE' as MindbodyTab },
        { t: '再學呼吸', d: '第 4–6 章：呼吸生理、卡帕拉巴提（提神）、吐納六字訣（安神）', go: 'BREATH_SCIENCE' as MindbodyTab },
        { t: '練注意力', d: '第 7 章：正念冥想與計時器', go: 'MINDFULNESS' as MindbodyTab },
        { t: '整合與迭代', d: '第 8–10 章：睡前處方、CAP-D 四週計畫、安全與就醫', go: 'BEDTIME' as MindbodyTab },
      ].map((s, i) => (
        <li key={s.t} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3">
          <p className="font-bold text-slate-900 dark:text-white">
            {i + 1}. <LinkBtn onClick={() => goTo(s.go)}>{s.t}</LinkBtn>
          </p>
          <p className="text-slate-600 dark:text-slate-400">{s.d}</p>
        </li>
      ))}
    </ol>
  </div>
);

// ── 2. Sleep science ────────────────────────────────────────────────────

export const SleepScienceChapter: React.FC = () => (
  <div className="space-y-6">
    <P>
      睡意由兩股力量決定。<strong>歷程 S</strong> 是「清醒越久越想睡」的睡意壓力，主要來自大腦裡逐漸累積的腺苷——咖啡因能提神，就是因為它擋住了腺苷受體。<strong>歷程 C</strong> 是約 24
      小時的生理時鐘，它在傍晚反而會送出最強的清醒訊號，直到深夜才打開「睡眠閘門」。
    </P>
    <FigureFrame
      number="圖 2-1"
      title="兩歷程模型：睡意壓力 S × 生理時鐘 C"
      source="Borbély 2016（J Sleep Res）"
      caption="橘線是睡意壓力，睡眠中被清除；紫色虛線是生理時鐘的清醒訊號。切換到「熬夜」看看：S 還沒清完就被鬧鐘打斷，隔天從很高的睡意開始。"
    >
      <TwoProcessFigure />
    </FigureFrame>

    <H3>一夜之中：深睡在前、REM 在後</H3>
    <FigureFrame
      number="圖 2-2"
      title="一夜睡眠圖（Hypnogram）：約 5 個 90 分鐘週期"
      source="AASM 睡眠分期標準；Xie 2013（Science）"
      caption="前兩個週期以深睡（N3）為主；動物研究發現這時大腦的膠淋巴系統清除代謝廢物最有效（Xie 2013）；越接近清晨，REM 越長。所以「晚睡」砍到深睡，「早起」砍到 REM。"
    >
      <HypnogramFigure />
    </FigureFrame>

    <DataTable
      title="表 2-1　四種睡眠階段在做什麼"
      source="AASM 睡眠評分手冊"
      columns={[
        { key: 'stage', header: '階段', className: 'min-w-[110px]' },
        { key: 'pct', header: '佔一夜' },
        { key: 'brain', header: '腦波特徵', className: 'min-w-[150px]' },
        { key: 'job', header: '主要功能', className: 'min-w-[200px]' },
      ]}
      rows={SLEEP_STAGES_MB}
      rowKey={(r) => r.stage}
      rowTone={(r) => r.tone}
    />

    <div className="grid gap-4 md:grid-cols-2">
      <DataTable
        title="表 2-2　各年齡建議睡眠時數"
        source="AASM/SRS 2015；AASM 2016 兒科共識；NSF 2015"
        columns={[
          { key: 'age', header: '年齡' },
          { key: 'hours', header: '建議' },
          { key: 'note', header: '備註', className: 'min-w-[150px]' },
        ]}
        rows={SLEEP_NEED_BY_AGE}
        rowKey={(r) => r.age}
      />
      <Callout kind="evidence" title="規律比時數更重要">
        <p>
          英國 UK Biobank 6 萬多人戴手環的研究發現：<strong>每天睡覺起床時間越規律，全因死亡風險越低</strong>，而且規律度的預測力比睡眠時數更強（Windred, Sleep 2024）。
        </p>
        <p className="mt-2">實際做法：先固定「起床時間」，週末差距在 1 小時內；上床時間自然會被睡意壓力推到固定位置。</p>
      </Callout>
    </div>
  </div>
);

// ── 3. 24h plan ─────────────────────────────────────────────────────────

export const SleepPlanChapter: React.FC = () => (
  <div className="space-y-6">
    <P>今晚睡得好不好，有一半是從今天早上就決定的。下面的規劃器會用你的起床時間與所需躺床時間，倒推出光線、咖啡因、運動、晚餐、洗澡與睡前流程的最佳時間點——每一項都附上研究依據。</P>
    <FigureFrame number="圖 3-1" title="個人化 24 小時睡眠作息規劃器" source="Brown 2022；Gardiner 2023；Haghayegh 2019；Stutz 2019；AASM 2021" note="互動工具：輸入你的起床時間，時間軸會即時更新。">
      <SchedulePlanner />
    </FigureFrame>

    <FigureFrame
      number="圖 3-2"
      title="光有多亮？白天要夠亮、晚上要夠暗（對數刻度）"
      source="Brown 2022（PLoS Biol）國際光照建議"
      caption="陰天戶外就比辦公室亮 10 倍以上，所以「早上到戶外」比開燈有效得多；而一般客廳晚上的燈光，已經足以壓抑褪黑激素、把生理時鐘往後推。"
    >
      <LightLuxFigure />
    </FigureFrame>

    <H3>失眠認知行為治療（CBT-I）：慢性失眠的第一線治療</H3>
    <P>
      美國睡眠醫學會（AASM 2021）、美國內科醫師學會（ACP 2016）與歐洲失眠指引（2023）都把 CBT-I 列為慢性失眠的<strong>第一線治療</strong>
      ，優先於安眠藥；它的效果在停止治療後仍能維持。台灣各醫學中心身心科與睡眠中心都有提供，也有數位 CBT-I 課程。
    </P>
    <DataTable
      title="表 3-1　CBT-I 的五個成分與證據"
      source="Edinger 2021（AASM）；Riemann 2023（歐洲失眠指引）"
      columns={[
        { key: 'part', header: '成分', className: 'min-w-[90px]' },
        { key: 'what', header: '怎麼做', className: 'min-w-[260px]' },
        { key: 'grade', header: '證據', render: (r) => <Grade g={r.grade} /> },
        { key: 'note', header: '備註', className: 'min-w-[150px]' },
      ]}
      rows={CBTI_COMPONENTS}
      rowKey={(r) => r.part}
      rowTone={(r) => (r.grade === 'A' ? 'good' : r.grade === 'C' ? 'warn' : 'neutral')}
    />
    <Callout kind="note" title="臥室環境三件事">
      <ul className="list-disc pl-5 space-y-1">
        <li>
          <strong>暗：</strong>遮光窗簾或眼罩；電器指示燈貼起來。
        </li>
        <li>
          <strong>涼：</strong>多數人在約 18–24°C（台灣夏天冷氣 26°C 加電扇也可）較好睡；被子透氣。
        </li>
        <li>
          <strong>靜：</strong>耳塞或白噪音；伴侶打鼾嚴重請他先做睡眠呼吸中止評估。
        </li>
      </ul>
    </Callout>
  </div>
);

// ── 4. Breath science ───────────────────────────────────────────────────

export const BreathScienceChapter: React.FC<ChapterProps> = ({ goTo }) => (
  <div className="space-y-6">
    <P>
      心跳其實不是固定的節拍器：<strong>吸氣時心跳加快、吐氣時心跳變慢</strong>
      ，這叫「呼吸性竇性心律不整（RSA）」，是健康的表現。原因是吐氣時迷走神經活性增強、對心臟踩下煞車。所以只要讓吐氣比吸氣長，就等於多踩幾秒煞車。
    </P>
    <FigureFrame
      number="圖 4-1"
      title="呼吸帶動心跳：吸氣加速、吐氣減速"
      source="Russo 2017（Breathe）；Lehrer & Gevirtz 2014"
      caption="切換兩種呼吸速度：每分鐘 6 次時，心跳起伏與血壓反射共振，變異度最大。這就是「共振呼吸」與許多傳統慢呼吸法（吐納、唸經、瑜伽咒語）共同的生理基礎。"
    >
      <RsaFigure />
    </FigureFrame>

    <FigureFrame
      number="圖 4-2"
      title="呼吸頻率光譜：哪些是煞車、哪些是油門？"
      source="Zaccaro 2018；Raghuraj 1998"
      caption="同樣叫「呼吸法」，效果可以完全相反。左邊的慢呼吸讓人平靜、適合睡前；右邊的卡帕拉巴提讓交感神經上升、適合早上提神。"
    >
      <BreathSpectrumFigure />
    </FigureFrame>

    <DataTable
      title="表 4-1　常見呼吸法速查：模式、效果與時機"
      source="Fincham 2023；Balban 2023；Bernardi 2001；Raghuraj 1998"
      columns={[
        { key: 'method', header: '方法', className: 'min-w-[120px]' },
        { key: 'pattern', header: '怎麼呼吸', className: 'min-w-[170px]' },
        { key: 'rate', header: '頻率' },
        { key: 'effect', header: '效果' },
        { key: 'best', header: '適合時機', className: 'min-w-[120px]' },
        { key: 'evidence', header: '證據', render: (r) => <Grade g={r.evidence} /> },
      ]}
      rows={BREATH_METHODS}
      rowKey={(r) => r.method}
      rowTone={(r) => (r.effect.startsWith('激發') ? 'warn' : 'good')}
    />

    <div className="grid gap-4 md:grid-cols-2">
      <Callout kind="myth" title="為什麼焦慮時「大口深呼吸」反而更暈？">
        <p>
          焦慮時呼吸本來就偏快，再大口用力吸，會把二氧化碳排得太多（過度換氣），血管收縮、手腳麻、頭暈，身體以為更危險。正確做法是<strong>「量輕、吐長」</strong>：鼻子輕輕吸，嘴巴或鼻子慢慢吐。
        </p>
      </Callout>
      <Callout kind="evidence" title="研究怎麼說">
        <p>
          12 個隨機對照試驗統合：呼吸練習降低自評壓力，效果量 g = −0.35（小到中度），焦慮與憂鬱也有改善（Fincham, Sci Rep 2023）。另一個 108 人的試驗中，每天 5
          分鐘「生理嘆息」改善情緒的幅度大於同時間的正念冥想（Balban 2023）。
        </p>
      </Callout>
    </div>

    <FigureFrame number="工具 4-1" title="呼吸引導器：跟著圓圈呼吸" note="互動工具。支援「減少動態效果」設定；提示音以瀏覽器合成，不下載任何檔案。">
      <BreathPacer />
    </FigureFrame>
    <p className="text-[14px] text-slate-600 dark:text-slate-400">
      想要提神？看 <LinkBtn onClick={() => goTo('KAPALABHATI')}>第 5 章 卡帕拉巴提</LinkBtn>；想要安神？看 <LinkBtn onClick={() => goTo('TUNA')}>第 6 章 吐納與六字訣</LinkBtn>。
    </p>
  </div>
);

// ── 5. Kapalabhati ──────────────────────────────────────────────────────

export const KapalabhatiChapter: React.FC<ChapterProps> = ({ goTo }) => (
  <div className="space-y-6">
    <Callout kind="redflag" title="先說結論：它是提神的「油門」，不是助眠法">
      <p>
        卡帕拉巴提（Kapalabhati，梵文「頭顱＋光亮」，中文常譯「頭顱清明調息」「聖光調息」「火呼吸」）會讓交感神經上升。<strong>請在早上或白天練，睡前 2 小時內不要做。</strong>
        有心血管、懷孕、癲癇、疝氣、氣胸病史等狀況者不要練（見下方快篩）。
      </p>
    </Callout>

    <div className="grid gap-4 items-start">
      <FigureFrame
        number="圖 5-1"
        title="呼吸波形：一般呼吸 vs 卡帕拉巴提"
        source="依 Kapalabhati 標準練法繪製；Raghuraj 1998"
        caption="卡帕拉巴提是「主動吐、被動吸」：每一下用 0.3 秒快速把氣推出，吸氣靠腹肌放鬆自然回彈。每次換氣量小、頻率高。"
      >
        <KapalaWaveFigure />
      </FigureFrame>
      <FigureFrame number="圖 5-2" title="腹部幫浦：一下動作的兩個瞬間" source="瑜伽調息傳統教學；呼吸力學" caption="動作來自下腹，不是胸口或肩膀。胸廓保持穩定，只有肚臍下方快速內收、放鬆。">
        <AbdominalPumpFigure />
      </FigureFrame>
    </div>

    <H3>入門 6 步驟</H3>
    <ol className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {KAPALA_STEPS.map((s) => (
        <li key={s.n} className="rounded-2xl border border-orange-200 dark:border-orange-900/60 bg-orange-50/40 dark:bg-orange-950/15 p-3.5">
          <p className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
            <span className="w-7 h-7 shrink-0 rounded-full bg-orange-600 text-white inline-flex items-center justify-center text-[13px]">{s.n}</span>
            {s.title}
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">{s.how}</p>
        </li>
      ))}
    </ol>

    <DataTable
      title="表 5-1　四週漸進表：寧可慢，不要快"
      columns={[
        { key: 'week', header: '時間' },
        { key: 'dose', header: '劑量', className: 'min-w-[170px]' },
        { key: 'rest', header: '休息' },
        { key: 'check', header: '進級條件', className: 'min-w-[170px]' },
      ]}
      rows={KAPALA_PROGRESSION}
      rowKey={(r) => r.week}
    />

    <H3>它是否適合你？30 秒快篩</H3>
    <KapalaScreen />

    <DataTable
      title="表 5-2　研究發現了什麼？（誠實版）"
      source="Raghuraj 1998；Telles 團隊；Balban 2023；Fincham 2023；Chest 2004 個案報告"
      columns={[
        { key: 'finding', header: '發現', className: 'min-w-[260px]' },
        { key: 'study', header: '研究', className: 'min-w-[180px]' },
        { key: 'grade', header: '證據', render: (r) => <Grade g={r.grade} /> },
      ]}
      rows={KAPALA_EVIDENCE}
      rowKey={(r) => r.finding}
      rowTone={(r) => (r.finding.includes('氣胸') ? 'bad' : 'neutral')}
    />
    <Callout kind="note" title="練完應該是什麼感覺？">
      <p>
        理想狀態是「清醒、溫暖、頭腦清楚」。如果出現<strong>頭暈、眼前發黑、手指或嘴唇發麻、胸悶、心悸、焦慮感上升</strong>，代表過度換氣或不適合，立刻停止、恢復自然呼吸，改練{' '}
        <LinkBtn onClick={() => goTo('TUNA')}>吐納</LinkBtn> 或 <LinkBtn onClick={() => goTo('BREATH_SCIENCE')}>共振呼吸</LinkBtn>。
      </p>
    </Callout>

    <FigureFrame number="工具 5-1" title="卡帕拉巴提入門節拍器（含安全確認）" note="互動工具。預設入門劑量：每秒 1 下 × 20 下 × 3 輪；晚上 8 點後會提醒你改練平靜型呼吸。">
      <BreathPacer initial="kapala" />
    </FigureFrame>
  </div>
);

// ── 6. 吐納 ─────────────────────────────────────────────────────────────

export const TunaChapter: React.FC = () => (
  <div className="space-y-6">
    <P>
      「吐納」出自《莊子・刻意》：「吹呴呼吸，吐故納新，熊經鳥申，為壽而已矣。」意思是吐出濁氣、納入清氣，搭配模仿動物的伸展導引來養生。後來的道家與中醫養生把它發展成各種功法，其中流傳最廣、也被現代研究最多的是
      <strong>六字訣</strong>——南朝陶弘景《養性延命錄》記載「納氣有一，吐氣有六」。
    </P>

    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {TUNA_FOUR.map((t) => (
        <div key={t.word} className="rounded-2xl border border-sky-200 dark:border-sky-900 bg-sky-50/50 dark:bg-sky-950/20 p-3.5">
          <p className="text-3xl font-display font-bold text-sky-800 dark:text-sky-300">{t.word}</p>
          <p className="mt-1 text-[14px] text-slate-800 dark:text-slate-200">{t.meaning}</p>
          <p className="mt-1.5 text-[12px] text-slate-500 dark:text-slate-400">
            <strong>現代對照：</strong>
            {t.modern}
          </p>
        </div>
      ))}
    </div>

    <FigureFrame
      number="圖 6-1"
      title="細勻深長：四週把吐氣拉長"
      source="吐納傳統練法；Russo 2017 慢呼吸生理"
      caption="每週只把吐氣拉長 2 秒，四週後自然落在每分鐘 4–6 次的共振區間。任何時候覺得憋、胸悶，就退回上一週的節奏。"
    >
      <TunaLadderFigure />
    </FigureFrame>

    <FigureFrame
      number="圖 6-2"
      title="健身氣功・六字訣：六種口型、六種吐氣"
      source="國家體育總局健身氣功管理中心《六字訣》；陶弘景《養性延命錄》"
      caption="點選任一字看口型與練法。六字的發聲都會在口腔製造一點阻力，讓吐氣自然變慢變長——這部分有清楚的生理依據；臟腑五行對應則是傳統理論。"
    >
      <LiuZiJueWheel />
    </FigureFrame>

    <DataTable
      title="表 6-1　四種吐納呼吸型態"
      columns={[
        { key: 'type', header: '型態', className: 'min-w-[100px]' },
        { key: 'how', header: '做法', className: 'min-w-[160px]' },
        { key: 'for_', header: '適合誰', className: 'min-w-[150px]' },
        { key: 'caution', header: '注意', className: 'min-w-[160px]' },
      ]}
      rows={TUNA_TYPES}
      rowKey={(r) => r.type}
      rowTone={(r) => (r.type === '順腹式呼吸' ? 'good' : r.type.startsWith('逆') || r.type.startsWith('停閉') ? 'warn' : 'neutral')}
    />

    <H3>10 分鐘吐納入門功（早晚皆可，睡前最佳）</H3>
    <ol className="space-y-2 text-[15px] text-slate-700 dark:text-slate-300 list-decimal pl-5 max-w-3xl">
      <li>
        <strong>調身（1 分鐘）：</strong>坐椅子前 1/3 或平躺，下巴微收、舌尖輕抵上顎、肩膀放下，一手放胸口、一手放肚臍下。
      </li>
      <li>
        <strong>調息（6 分鐘）：</strong>鼻子細細吸氣，感覺下腹那隻手被推起、胸口的手幾乎不動；吐氣時下腹慢慢內收。先吸 4 吐 4，舒服後吐氣拉到 6、8 秒。
      </li>
      <li>
        <strong>六字訣（2 分鐘）：</strong>選一個字（睡前推薦「噓」或「呬」），吐氣時輕聲或默念，重複 6 次。
      </li>
      <li>
        <strong>收功（1 分鐘）：</strong>恢復自然呼吸，雙手搓熱敷眼，慢慢睜眼。
      </li>
    </ol>

    <DataTable
      title="表 6-2　吐納與氣功：現代研究證實了什麼？"
      source="Bernardi 2001；Liuzijue 統合分析 2021；Siu 2021；Zaccaro 2018"
      columns={[
        { key: 'finding', header: '發現', className: 'min-w-[260px]' },
        { key: 'study', header: '研究', className: 'min-w-[170px]' },
        { key: 'grade', header: '證據', render: (r) => <Grade g={r.grade} /> },
      ]}
      rows={TUNA_EVIDENCE}
      rowKey={(r) => r.finding}
      rowTone={(r) => (r.grade === 'C' ? 'warn' : 'good')}
    />
    <Callout kind="tip" title="吐納 × 卡帕拉巴提：一動一靜的搭配">
      <p>早上：卡帕拉巴提 3 輪提神（無禁忌者）→ 接 3 分鐘吐納讓呼吸回穩。晚上：只做吐納或六字訣。這樣一天的節律就是「白天油門、晚上煞車」，跟生理時鐘同方向。</p>
    </Callout>
  </div>
);

// ── 7. Mindfulness ──────────────────────────────────────────────────────

export const MindfulnessChapter: React.FC = () => (
  <div className="space-y-6">
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
      <FigureFrame
        number="圖 7-1"
        title="正念的核心：注意力循環"
        source="Killingsworth 2010（Science）；MBSR 課程架構"
        caption="正念不是讓腦袋放空，而是一次次「發現走神 → 溫和帶回」。走神不是失敗，發現走神的那一刻就是練習成功。"
      >
        <AttentionLoopFigure />
      </FigureFrame>
      <div className="space-y-4">
        <P>
          哈佛研究用手機隨機詢問 2,250 人：「你現在在想眼前的事嗎？」結果醒著約 <strong>47% 的時間在走神</strong>，而走神時普遍比較不快樂（Killingsworth & Gilbert, Science 2010）。
        </P>
        <P>
          正念（mindfulness）是「刻意、不評判地，把注意力放在當下」。最有系統的課程是卡巴金的 <strong>MBSR（正念減壓，8 週）</strong>與專為憂鬱復發設計的 <strong>MBCT（正念認知治療）</strong>
          ，台灣多家醫院與正念中心都有開課。
        </P>
        <Callout kind="note" title="正念與失眠的關係">
          <p>失眠者常在床上「努力想睡」，越努力越清醒。正念教的是允許清醒、不和念頭打架——睡意反而比較容易來。</p>
        </Callout>
      </div>
    </div>

    <FigureFrame
      number="圖 7-2"
      title="效果有多大？冥想與呼吸法的統合分析"
      source="Goyal 2014（JAMA Intern Med，47 RCT）；Fincham 2023（Sci Rep，12 RCT）"
      caption="點代表效果量、線段是 95% 信賴區間。效果屬小到中等，與抗憂鬱藥在一般族群的效果量相近；需要規律練習數週。"
    >
      <MindfulEvidenceChart />
    </FigureFrame>

    <DataTable
      title="表 7-1　關鍵臨床試驗"
      columns={[
        { key: 'trial', header: '試驗', className: 'min-w-[150px]' },
        { key: 'who', header: '對象', className: 'min-w-[120px]' },
        { key: 'result', header: '結果', className: 'min-w-[220px]' },
        { key: 'source', header: '出處', className: 'min-w-[140px]' },
        { key: 'grade', header: '證據', render: (r) => <Grade g={r.grade} /> },
      ]}
      rows={MINDFUL_TRIALS}
      rowKey={(r) => r.trial}
    />

    <H3>六種入門練習</H3>
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {MINDFUL_PRACTICES.map((m) => (
        <div key={m.name} className="rounded-2xl border border-violet-200 dark:border-violet-900/60 bg-violet-50/40 dark:bg-violet-950/15 p-3.5">
          <p className="font-bold text-slate-900 dark:text-white">{m.name}</p>
          <p className="text-[12px] font-semibold text-violet-700 dark:text-violet-300">
            {m.dose}・{m.for_}
          </p>
          <p className="mt-1.5 text-[14px] leading-relaxed text-slate-700 dark:text-slate-300">{m.how}</p>
        </div>
      ))}
    </div>

    <FigureFrame number="工具 7-1" title="正念計時器：呼吸覺察・身體掃描・三分鐘呼吸空間・慈心" note="互動工具。依時間自動給下一句引導；鐘聲由瀏覽器合成。">
      <MeditationTimer />
    </FigureFrame>

    <DataTable
      title="表 7-2　冥想的副作用：辨識與調整"
      source="Britton 2021（Clin Psychol Sci）"
      caption="多數人練習安全；但在正念課程參與者中，少數人回報持續數天以上的不適，有創傷或精神疾病史者較常見。"
      columns={[
        { key: 'sign', header: '出現這些', className: 'min-w-[150px]' },
        { key: 'adjust', header: '怎麼調整', className: 'min-w-[260px]' },
      ]}
      rows={MEDITATION_ADVERSE}
      rowKey={(r) => r.sign}
      rowTone={() => 'warn'}
    />
  </div>
);

// ── 8. Bedtime ──────────────────────────────────────────────────────────

export const BedtimeChapter: React.FC = () => (
  <div className="space-y-6">
    <P>把前面學到的東西串成一個固定順序的睡前儀式。順序固定很重要：重複幾週後，大腦會把這串動作學成「要睡覺了」的條件反射。</P>
    <ol className="relative border-l-2 border-sky-300 dark:border-sky-800 ml-3 space-y-4">
      {WIND_DOWN.map((w) => (
        <li key={w.t} className="pl-5 relative">
          <span className="absolute -left-[11px] top-0.5 w-5 h-5 rounded-full bg-sky-600 ring-4 ring-white dark:ring-slate-950" aria-hidden="true" />
          <p className="text-[12px] font-bold text-sky-700 dark:text-sky-400 tabular-nums">睡前 {w.t}</p>
          <p className="font-bold text-slate-900 dark:text-white">{w.step}</p>
          <p className="text-[14px] text-slate-600 dark:text-slate-400">{w.detail}</p>
        </li>
      ))}
    </ol>

    <Callout kind="evidence" title="台灣研究：睡前 20 分鐘慢呼吸">
      <p>
        陽明大學團隊讓失眠者睡前做 20 分鐘、每分鐘 6 次的慢呼吸，多項睡眠檢查顯示<strong>入睡時間縮短、半夜醒來次數與清醒時間減少、睡眠效率提高</strong>（Tsai, Psychophysiology 2015）。樣本只有 14
        位失眠者，屬初步證據，但做法安全、零成本。
      </p>
    </Callout>

    <FigureFrame
      number="圖 8-1"
      title="半夜醒來怎麼辦？決策圖"
      source="AASM 2021 刺激控制；Tsai 2015；Black 2015"
      caption="半夜醒來本身很正常（每晚都會有短暫清醒）。真正讓人失眠的是醒來後的動作：看時間、算還能睡多久、滑手機。"
    >
      <NightWakeFlowFigure />
    </FigureFrame>

    <div className="grid gap-4 md:grid-cols-2">
      <Callout kind="tip" title="「煩惱時段」：傍晚先把腦袋清空">
        <p>晚餐後找 10–15 分鐘，紙上畫兩欄：「我在擔心什麼」｜「下一步可以做什麼（或明天幾點處理）」。寫完闔上本子。上床後念頭又來，就對自己說：「這已經寫在本子上了，明天再處理。」</p>
      </Callout>
      <Callout kind="tip" title="認知洗牌：腦袋停不下來時">
        <p>隨便想一個字（例如「睡眠」），用每個字開頭聯想不相關的畫面：「睡」→ 水果、水母、水壺…每個畫面想 5 秒。這讓大腦脫離有邏輯的煩惱思考（小型研究，證據 C）。</p>
      </Callout>
    </div>
    <FigureFrame number="工具 8-1" title="睡前呼吸：預設吐納模式" note="互動工具。建議 5–10 分鐘，熄燈前做；可以關掉螢幕只聽提示音。">
      <BreathPacer initial="tuna" />
    </FigureFrame>
  </div>
);

// ── 9. CAP-D ────────────────────────────────────────────────────────────

export const CapdChapter: React.FC = () => (
  <div className="space-y-6">
    <div className="grid gap-4 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] items-center">
      <FigureFrame number="圖 9-1" title="CAP-D 自我迭代循環" source="PDCA 品質循環改編；CBT-I 睡眠窗口調整規則" note={false}>
        <CapdWheelFigure />
      </FigureFrame>
      <div className="space-y-3">
        <P>
          CAP-D 是品質管理 PDCA 循環的變形：<strong>先 Check（看數據）</strong>，再
          Act、Plan、Do。睡眠特別適合這樣做——因為人對自己睡了多久的感覺常常不準，記錄一週往往會發現「其實睡著的時間比以為的多，但躺床太久」。
        </P>
        <ul className="space-y-2">
          {CAPD_STEPS.map((s) => (
            <li key={s.step} className="flex gap-3 rounded-xl border border-slate-200 dark:border-slate-800 p-2.5">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 inline-flex items-center justify-center font-display font-black">{s.step}</span>
              <span>
                <span className="block font-bold text-slate-900 dark:text-white">{s.name}</span>
                <span className="block text-[14px] text-slate-600 dark:text-slate-400">{s.what}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>

    <FigureFrame number="工具 9-1" title="CAP-D 睡眠日記與下週睡眠窗口計算" source="Edinger 2021（AASM）；Riemann 2023" note="互動工具。資料只存在你這台裝置的瀏覽器；隨時可清空。">
      <CapdSleepDiary />
    </FigureFrame>

    <DataTable
      title="表 9-1　四週練習進度表：每週只加一件事"
      columns={[
        { key: 'week', header: '週' },
        { key: 'focus', header: '重點', className: 'min-w-[120px]' },
        { key: 'sleep', header: '睡眠', className: 'min-w-[170px]' },
        { key: 'breath', header: '呼吸', className: 'min-w-[170px]' },
        { key: 'mind', header: '正念', className: 'min-w-[130px]' },
      ]}
      rows={FOUR_WEEK_PLAN}
      rowKey={(r) => r.week}
    />
    <Callout kind="redflag" title="做睡眠窗口調整前請注意">
      <p>前 1–2 週白天可能更睏：避免疲勞駕駛與操作危險機械。躁鬱症、癲癇、懷孕、需要高度警覺的職業（司機、機師、醫護輪班）者，請在醫師或心理師指導下進行。</p>
    </Callout>
  </div>
);

// ── 10. Safety ──────────────────────────────────────────────────────────

const LEVEL: Record<MatrixLevel, { sym: string; label: string; cls: string }> = {
  ok: { sym: '✓', label: '可以', cls: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200' },
  caution: { sym: '!', label: '調整後可', cls: 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200' },
  avoid: { sym: '✕', label: '避免', cls: 'bg-rose-100 text-rose-900 dark:bg-rose-950/50 dark:text-rose-200' },
};

const TRAFFIC = {
  green: { cls: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/70 dark:bg-emerald-950/20', dot: 'bg-emerald-500', label: '綠燈' },
  amber: { cls: 'border-amber-300 dark:border-amber-800 bg-amber-50/70 dark:bg-amber-950/20', dot: 'bg-amber-500', label: '黃燈' },
  red: { cls: 'border-rose-300 dark:border-rose-800 bg-rose-50/70 dark:bg-rose-950/20', dot: 'bg-rose-500', label: '紅燈' },
};

export const SafetyChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame number="圖 10-1" title="睡眠紅綠燈：自己調整、看門診、還是立刻求助？" source="Riemann 2023；ACP 2016；衛福部 1925 安心專線" note={false}>
      <div className="grid gap-3 md:grid-cols-3">
        {SLEEP_TRAFFIC.map((t) => (
          <div key={t.level} className={`rounded-2xl border p-3.5 ${TRAFFIC[t.level].cls}`}>
            <p className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <span className={`w-3.5 h-3.5 rounded-full ${TRAFFIC[t.level].dot}`} aria-hidden="true" />
              {TRAFFIC[t.level].label}・{t.title}
            </p>
            <ul className="mt-2 space-y-1.5 text-[14px] text-slate-700 dark:text-slate-300 list-disc pl-5">
              {t.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </FigureFrame>

    <FigureFrame
      number="圖 10-2"
      title="練習 × 身體狀況 安全矩陣"
      source="Johnson 2004 個案；Britton 2021；各練法傳統禁忌與臨床共識"
      caption="✓ 可以　! 調整後可（縮短、睜眼、不閉氣或專業帶領）　✕ 避免。符號與顏色雙重標示。"
      note="依一般臨床共識整理，個別狀況請與你的醫師討論。"
    >
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full min-w-[640px] table-fixed text-[13px] border-separate border-spacing-1">
          <caption className="sr-only">各種呼吸與冥想練習在不同身體狀況下的安全程度</caption>
          <colgroup>
            <col className="w-[150px]" />
            {PRACTICE_COLUMNS.map((c) => (
              <col key={c} className="w-[92px]" />
            ))}
            <col />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="text-left text-slate-600 dark:text-slate-400 font-semibold px-1">
                狀況
              </th>
              {PRACTICE_COLUMNS.map((c) => (
                <th key={c} scope="col" className="text-center text-slate-700 dark:text-slate-300 font-bold px-1">
                  {c}
                </th>
              ))}
              <th scope="col" className="text-left text-slate-600 dark:text-slate-400 font-semibold px-1">
                說明
              </th>
            </tr>
          </thead>
          <tbody>
            {SAFETY_MATRIX.map((r) => (
              <tr key={r.condition}>
                <th scope="row" className="text-left font-semibold text-slate-900 dark:text-white px-1">
                  {r.condition}
                </th>
                {r.levels.map((lv, i) => (
                  <td key={i} className={`text-center rounded-md py-1.5 font-bold ${LEVEL[lv].cls}`}>
                    <span aria-hidden="true">{LEVEL[lv].sym}</span>
                    <span className="sr-only">
                      {PRACTICE_COLUMNS[i]}：{LEVEL[lv].label}
                    </span>
                    <span className="ml-1 text-[11px] font-semibold">{LEVEL[lv].label}</span>
                  </td>
                ))}
                <td className="text-slate-600 dark:text-slate-400 px-1">{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FigureFrame>

    <DataTable
      title="表 10-1　助眠藥物與褪黑激素的定位"
      source="ACP 2016；AASM 2017 藥物指引；Riemann 2023"
      caption="藥物需由醫師開立與調整；不要自行停藥或加量，也不要與酒精併用。"
      columns={[
        { key: 'klass', header: '類別', className: 'min-w-[150px]' },
        { key: 'role', header: '適合情境', className: 'min-w-[130px]' },
        { key: 'caution', header: '注意事項', className: 'min-w-[220px]' },
        { key: 'grade', header: '證據', render: (r) => <Grade g={r.grade} /> },
      ]}
      rows={SLEEP_MEDS}
      rowKey={(r) => r.klass}
      rowTone={(r) => (r.klass.startsWith('CBT-I') ? 'good' : 'neutral')}
    />

    <Callout kind="redflag" title="需要談一談？">
      <p>
        <strong>1925 安心專線</strong>（依舊愛我）24 小時免付費；<strong>1995 生命線</strong>、<strong>1980 張老師</strong>。有立即危險請撥 <strong>119</strong> 或 <strong>110</strong>
        。失眠與憂鬱常常一起出現，求助不代表軟弱。
      </p>
    </Callout>
  </div>
);
