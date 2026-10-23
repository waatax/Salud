import React from 'react';
import { OSTEO_DXA_LEVELS, OSTEO_MEDS_TABLE, OSTEO_CALCIUM_FORMS } from '../../../data/spineData';
import {
  OSTEO_KEY_NUMBERS,
  OSTEO_KP_GROUPS,
  OSTEO_WHO_SCREEN,
  OSTEO_REPORT_TERMS,
  OSTEO_WORKUP,
  OSTEO_SEQUENCE_RULES,
  OSTEO_SIDE_EFFECTS,
  OSTEO_NUTRIENT_EVIDENCE,
  OSTEO_MED_TIMING,
  FALL_PREVENTION,
} from '../../../data/osteoData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill, KnowledgeMap, KnowledgePoint } from '../../common/pro/Blocks';
import { OsteoporosisMicrostructureFigure } from './figures/SpineSpecialtyFigures';
import {
  RemodelingCycleFigure,
  BoneMassCurveFigure,
  RiskFactorBoard,
  DxaReportFigure,
  RiskTierStaircase,
  DrugEfficacyChart,
  SequenceTimelineFigure,
  BenefitHarmPictogram,
  ExercisePyramidFigure,
  ImminentRiskFigure,
  PostFractureTimeline,
} from './figures/OsteoFigures';
import { OstaCalculator, CalciumCalculator } from './OsteoTools';

/**
 * Osteoporosis chapter (v5.1) — 11 knowledge points in four stages.
 * Figures are numbered 圖 x-1 … and tables 表 x-1 … in reading order; CourseShell
 * rewrites x to the chapter's real position.
 */

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

const toneClass: Record<'good' | 'warn' | 'bad', string> = {
  good: 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/20',
  warn: 'border-amber-300 dark:border-amber-800 bg-amber-50/60 dark:bg-amber-950/20',
  bad: 'border-rose-300 dark:border-rose-800 bg-rose-50/60 dark:bg-rose-950/20',
};

let kp = 0;
const next = () => (kp += 1);

export const OsteoporosisChapter: React.FC = () => {
  kp = 0;
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <P>
          骨質疏鬆在骨折之前<strong>完全不痛</strong>，所以常被忽略；但它是可以檢查、可以治療、也可以預防的。這一章把骨鬆拆成 11 個知識點，依「認識骨頭 → 評估風險 → 治療用藥 → 生活與骨折後」四個階段排列，每一點都有一句話重點、關鍵數字、圖解與具體做法。
        </P>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {OSTEO_KEY_NUMBERS.map((n) => (
            <div key={n.label} className="rounded-2xl border border-emerald-200 dark:border-emerald-900/70 bg-emerald-50/50 dark:bg-emerald-950/20 px-3.5 py-3">
              <dt className="sr-only">{n.label}</dt>
              <dd className="text-2xl font-display font-bold tabular-nums text-emerald-800 dark:text-emerald-300">{n.value}</dd>
              <dd className="text-[12px] leading-snug text-slate-700 dark:text-slate-300 mt-0.5">{n.label}</dd>
            </div>
          ))}
        </dl>
        <KnowledgeMap groups={OSTEO_KP_GROUPS} title="骨質疏鬆知識地圖（點選跳到該知識點）" />
      </div>

      {/* ── 認識骨頭 ───────────────────────────────────────────── */}

      <KnowledgePoint
        id="kp-remodel"
        index={next()}
        title="骨頭是活的：骨重塑循環決定骨本"
        oneLine="骨頭一直在「拆舊蓋新」；當拆的速度長期大於蓋的速度，骨小梁變細、斷裂，就成了骨質疏鬆。"
        grade="A"
        numbers={[
          { value: '≈ 10%', label: '成人骨骼每年被更新的比例' },
          { value: '2–4 週', label: '蝕骨細胞「拆」一個坑' },
          { value: '3–4 個月', label: '造骨細胞把坑「填回」' },
        ]}
        actions={['理解骨鬆藥物分兩類：讓「拆」變慢的剎車，或讓「蓋」變快的油門', '影響拆蓋平衡的因素（停經、類固醇、甲狀腺）都要告訴醫師']}
      >
        <P>
          骨頭裡有兩種工人：<strong>蝕骨細胞</strong>負責把老舊或有微小裂縫的骨頭溶掉，<strong>造骨細胞</strong>負責鋪上膠原蛋白再礦化成新骨。年輕時兩者平衡；停經後雌激素下降，天然煞車 OPG 減少、RANKL 訊號增加，拆骨加速，每一輪重塑都留下沒填滿的坑。骨小梁的橫樑先斷，承重能力下降的速度比骨密度數字下降得更快。
        </P>
        <FigureFrame number="圖 3-1" title="骨重塑四階段與拆蓋失衡" source="Kanis 2019 IOF/ESCEO；骨生物學教科書" caption="上：一個重塑單位從啟動到填補約需 4–5 個月，拆比蓋快很多。中：失衡時每輪都少補一點。下：四個關鍵訊號分子，也正是現代骨鬆藥物的作用靶點。">
          <RemodelingCycleFigure />
        </FigureFrame>
        <FigureFrame number="圖 3-2" title="健康骨小梁 vs 骨質疏鬆骨小梁" source="IOF 2023；WHO DXA 診斷標準" caption="骨鬆時水平橫樑穿孔斷裂、垂直主樑變細孤立，輕微受力就可能塌陷。">
          <OsteoporosisMicrostructureFigure />
        </FigureFrame>
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-peak"
        index={next()}
        title="骨本曲線：30 歲前存骨，停經後守骨"
        oneLine="骨量約在 30 歲達到一生的最高點；峰值存得越高，之後跌破骨折閾值的時間就越晚。"
        grade="B"
        numbers={[
          { value: '≈ 30 歲', label: '達到峰值骨量' },
          { value: '最多 20%', label: '女性停經後 5–7 年內可能流失的骨量' },
          { value: '+10% → 晚 13 年', label: '峰值骨量提高 10%，模型推估骨鬆延後約 13 年' },
        ]}
        actions={['兒童與青少年：喝奶或吃豆製品、多跑跳，存骨效益最大', '停經前後：主動與醫師討論骨密度與風險評估', '男性也會骨鬆，只是約晚 10 年出現']}
      >
        <P>
          青春期是存骨最快的時期，約一半的成人骨量在這幾年累積。30 歲後骨量緩慢下降；女性在停經前後因雌激素驟降，會有一段約 5–7 年的快速流失期，所以女性骨鬆比男性早、也比男性多。
        </P>
        <FigureFrame number="圖 3-3" title="一生的骨量曲線（女性 vs 男性）" source="Hernandez 2003 骨量模型；IOF" caption="橫軸年齡、縱軸為相對於峰值的骨量。紅色區塊為停經後快速流失期；虛線為示意的骨折閾值。">
          <BoneMassCurveFigure />
        </FigureFrame>
      </KnowledgePoint>

      {/* ── 評估風險 ───────────────────────────────────────────── */}

      <KnowledgePoint
        id="kp-risk"
        index={next()}
        title="誰該擔心：風險因子與 OSTA 一分鐘自評"
        oneLine="年齡、性別、低體重、骨折史與長期類固醇是最強的風險因子；OSTA 只用年齡和體重就能初步篩出高風險者。"
        grade="B"
        numbers={[
          { value: '1 / 3', label: '50 歲以上女性一生會骨鬆骨折' },
          { value: '1 / 5', label: '50 歲以上男性一生會骨鬆骨折' },
          { value: '≥ 4 cm', label: '身高比年輕時矮，要懷疑脊椎骨折' },
        ]}
        actions={['用下方 OSTA 算出指數，中、高風險者與醫師討論 DXA', '列出正在使用的類固醇、荷爾蒙阻斷藥物與抗癲癇藥，回診時帶著', '每年量一次身高並記錄']}
      >
        <RiskFactorBoard />
        <OstaCalculator />
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-dxa"
        index={next()}
        title="看懂報告：DXA T 值、FRAX 與找原因的抽血"
        oneLine="DXA 負責「診斷」、FRAX 負責「預估 10 年骨折機率」、抽血負責「找出讓骨頭變鬆的其他疾病」，三件事缺一不可。"
        grade="A"
        numbers={[
          { value: '≤ -2.5', label: 'T 值達骨質疏鬆' },
          { value: '-1 ~ -2.5', label: '骨質缺乏，用 FRAX 決定是否用藥' },
          { value: '≥ 20% / 3%', label: 'FRAX 主要骨折 / 髖部骨折的治療門檻' },
        ]}
        actions={['報告上找三個部位的 T 值，以「最低」者為準', '請醫師同時計算台灣版 FRAX', '初次診斷時完成血鈣、腎功能、維生素 D 等抽血']}
        caution="骨密度正常不代表不會骨折：已經發生輕微外力的髖部或脊椎骨折，不論 T 值都視為骨質疏鬆。"
      >
        <DataTable
          title="表 3-1　誰應該做骨密度檢查"
          source="USPSTF 2025；中華民國骨質疏鬆症學會"
          columns={[
            { key: 'who', header: '對象', className: 'min-w-[180px]' },
            { key: 'how', header: '建議', className: 'min-w-[200px]' },
            { key: 'note', header: '說明', className: 'min-w-[180px]' },
          ]}
          rows={OSTEO_WHO_SCREEN}
          rowKey={(r) => r.who}
        />
        <FigureFrame number="圖 3-4" title="DXA 報告判讀範例：診斷看最低值" source="WHO DXA 診斷標準；ISCD 立場聲明" caption="範例中腰椎 -2.1、全髖 -1.8 都只是骨質缺乏，但股骨頸 -2.7 已達骨質疏鬆，因此診斷為骨質疏鬆。">
          <DxaReportFigure />
        </FigureFrame>
        <DataTable
          title="表 3-2　報告常見名詞"
          columns={[
            { key: 'term', header: '名詞', className: 'min-w-[90px]' },
            { key: 'meaning', header: '意思', className: 'min-w-[200px]' },
            { key: 'use', header: '用在哪裡', className: 'min-w-[240px]' },
          ]}
          rows={OSTEO_REPORT_TERMS}
          rowKey={(r) => r.term}
        />
        <DataTable
          title="表 3-3　DXA T 值分級與臨床行動"
          source="WHO；中華民國骨質疏鬆症學會"
          columns={[
            { key: 't_score', header: 'T 值', className: 'min-w-[110px]' },
            { key: 'category', header: '診斷分類', className: 'min-w-[130px]' },
            { key: 'fracture_risk', header: '骨折風險', className: 'min-w-[150px]' },
            { key: 'action_zh', header: '建議', className: 'min-w-[240px]' },
          ]}
          rows={OSTEO_DXA_LEVELS}
          rowKey={(r) => r.t_score}
          rowTone={(r) => r.tone}
        />
        <DataTable
          title="表 3-4　找出次發性原因的檢查"
          source="Kanis 2019；AACE 2020"
          columns={[
            { key: 'test', header: '檢查', className: 'min-w-[150px]' },
            { key: 'why', header: '為什麼要做', className: 'min-w-[260px]' },
            { key: 'when', header: '時機', className: 'min-w-[120px]' },
          ]}
          rows={OSTEO_WORKUP}
          rowKey={(r) => r.test}
        />
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-tier"
        index={next()}
        title="風險分層：決定要不要用藥、用哪一類"
        oneLine="治療強度跟著「骨折風險」走，不只看 T 值：高風險先用抗吸收藥，極高風險優先用促生成藥。"
        grade="A"
        numbers={[
          { value: '4 級', label: '低、中、高、極高風險' },
          { value: '12 個月', label: '近一年內骨折即屬極高風險' },
          { value: '≤ -3.0', label: 'T 值達此即屬極高風險' },
        ]}
        actions={['回診時直接問醫師：「我屬於哪一級風險？」', '健保給付條件（是否已骨折、T 值門檻）會隨公告調整，自費與健保選項請與醫師討論']}
      >
        <FigureFrame number="圖 3-5" title="骨折風險四級與對應治療" source="AACE/ACE 2020；Kanis 2019 IOF/ESCEO" note={false}>
          <RiskTierStaircase />
        </FigureFrame>
      </KnowledgePoint>

      {/* ── 治療用藥 ───────────────────────────────────────────── */}

      <KnowledgePoint
        id="kp-meds"
        index={next()}
        title="兩類藥：抗吸收是剎車，促生成是油門"
        oneLine="抗吸收藥減少拆骨，促生成藥直接長新骨；兩類都能把脊椎骨折風險降低約四到七成，鈣與維生素 D 只是配角。"
        grade="A"
        numbers={[
          { value: '40–70%', label: '抗吸收藥降低脊椎骨折' },
          { value: '65–73%', label: '促生成藥降低脊椎骨折' },
          { value: '≈ 40–50%', label: '雙磷酸鹽、Denosumab 降低髖部骨折' },
        ]}
        actions={['了解自己用的是哪一類、多久一次、療程多長', '把下一次打針或拿藥的日期寫進手機行事曆', '用藥前完成牙科檢查與抽血']}
      >
        <FigureFrame number="圖 3-6" title="主要藥物在關鍵試驗中的骨折降低幅度" source="FIT 1996；HORIZON 2007；FREEDOM 2009；MORE 1999；Neer 2001；FRAME 2016" caption="各試驗收案族群與時間不同，數字不能直接比大小；選藥要看風險分層、腎功能、用藥方便性與給付。" note={false}>
          <DrugEfficacyChart />
        </FigureFrame>
        <DataTable
          title="表 3-5　常見骨鬆處方藥物"
          source="AACE/ACE 2020；IOF 2023"
          columns={[
            { key: 'category', header: '分類', className: 'min-w-[90px]' },
            { key: 'generic_name', header: '成分', className: 'min-w-[140px]' },
            { key: 'method', header: '用法', className: 'min-w-[160px]' },
            { key: 'vertebral_risk_reduction', header: '骨折降低', className: 'min-w-[140px]' },
            { key: 'key_precautions', header: '注意事項', className: 'min-w-[240px]' },
          ]}
          rows={OSTEO_MEDS_TABLE}
          rowKey={(r) => r.generic_name}
        />
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-sequence"
        index={next()}
        title="療程是接力賽：順序對、不中斷"
        oneLine="先長骨再固守效果最好；促生成藥結束要接抗吸收藥，Denosumab 不能自己停。"
        grade="A"
        numbers={[
          { value: '-48%', label: '先 Romosozumab 再 Alendronate，新脊椎骨折比單用 Alendronate 少' },
          { value: '> 7 個月', label: 'Denosumab 延遲未打，骨吸收開始反彈' },
          { value: '3–5 年', label: '雙磷酸鹽評估藥物假期的時間點' },
        ]}
        actions={['設定 Denosumab 每 6 個月的提醒，不要拖延', '療程結束前一次回診就討論「下一棒」用什麼', '藥物假期期間仍要追蹤 DXA，必要時重新開始']}
        caution="不要因為骨密度「變好了」就自行停藥，尤其是 Denosumab：停藥前務必與醫師規劃銜接。"
      >
        <FigureFrame number="圖 3-7" title="三種療程路徑的骨密度走勢" source="ARCH 2017；ECTS 2017；ASBMR 2016" caption="示意不同路徑的典型走勢：正確接力可累積並保住骨量；突然停 Denosumab 或促生成藥後沒有接續，骨量會快速流失。">
          <SequenceTimelineFigure />
        </FigureFrame>
        <div className="grid gap-3 sm:grid-cols-2">
          {OSTEO_SEQUENCE_RULES.map((r) => (
            <div key={r.title} className={`rounded-xl border p-3.5 ${toneClass[r.tone]}`}>
              <p className="text-[14px] font-bold text-slate-900 dark:text-white">{r.title}</p>
              <p className="text-[13px] leading-relaxed text-slate-700 dark:text-slate-300 mt-1">{r.body}</p>
            </div>
          ))}
        </div>
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-safety"
        index={next()}
        title="副作用的真實比例：怕顎骨壞死，更該怕骨折"
        oneLine="顎骨壞死與非典型股骨骨折確實存在但很罕見；對高風險者，藥物預防的骨折遠多於它造成的副作用。"
        grade="A"
        numbers={[
          { value: '≈ 75 : 1', label: '預防髖部骨折數 vs 非典型股骨骨折數（3 年）' },
          { value: '1 / 10,000', label: '骨鬆劑量顎骨壞死的年發生率上限' },
          { value: '30 分鐘', label: '口服雙磷酸鹽後保持直立' },
        ]}
        actions={['開始用藥前先看牙科，把需要拔的牙處理好', '大腿或鼠蹊部持續隱痛超過數週，回診照 X 光', '看牙時主動告知正在使用的骨鬆藥物']}
      >
        <FigureFrame number="圖 3-8" title="效益與風險：每 1 萬名女性治療 3 年" source="Black DM, NEJM 2020" note="每一個點代表 1 人。">
          <BenefitHarmPictogram />
        </FigureFrame>
        <DataTable
          title="表 3-6　常見副作用、發生率與預防"
          source="ASBMR 2016；各藥品仿單"
          columns={[
            { key: 'name', header: '副作用', className: 'min-w-[130px]' },
            { key: 'freq', header: '發生率', className: 'min-w-[180px]' },
            { key: 'prevent', header: '怎麼預防與處理', className: 'min-w-[260px]' },
          ]}
          rows={OSTEO_SIDE_EFFECTS}
          rowKey={(r) => r.name}
        />
      </KnowledgePoint>

      {/* ── 生活與骨折後 ───────────────────────────────────────── */}

      <KnowledgePoint
        id="kp-nutrition"
        index={next()}
        title="吃對：鈣、維生素 D、蛋白質，食物優先"
        oneLine="先把食物鈣吃到每天 1,000 mg、蛋白質吃到每公斤 1.0–1.2 g；補充劑只補差額，證據弱的保健品不必花錢。"
        grade="B"
        numbers={[
          { value: '1,000 mg', label: '成人每日鈣建議量（上限 2,500）' },
          { value: '≈ 500–600', label: '國人平均每日鈣攝取（mg）' },
          { value: '≤ 500 mg', label: '鈣片單次劑量，分次吃' },
          { value: '1.0–1.2 g/kg', label: '長者每日蛋白質' },
        ]}
        actions={['用下方計算器算出今天吃了多少鈣，再決定要不要補', '板豆腐、豆干、小魚乾與深綠蔬菜是不喝奶者的好選擇；嫩豆腐與一般豆漿鈣很少', '使用口服雙磷酸鹽者，鈣片改到午餐或晚餐吃']}
        caution="不要一年打一次或一次吞超高劑量維生素 D：試驗顯示反而增加長者跌倒與骨折。"
      >
        <CalciumCalculator />
        <DataTable
          title="表 3-7　骨骼營養素與保健品證據分級"
          source="Endocrine Society 2024；VITAL 2022；Bolland 2015；國健署 DRIs"
          columns={[
            { key: 'name', header: '營養素', className: 'min-w-[140px]' },
            { key: 'grade', header: '證據', className: 'min-w-[110px]', render: (r) => <GradePill grade={r.grade} /> },
            { key: 'verdict', header: '結論', className: 'min-w-[220px]' },
            { key: 'dose', header: '建議量', className: 'min-w-[150px]' },
            { key: 'caution', header: '注意', className: 'min-w-[200px]' },
          ]}
          rows={OSTEO_NUTRIENT_EVIDENCE}
          rowKey={(r) => r.name}
        />
        <DataTable
          title="表 3-8　鈣片劑型比較"
          source="AJCN；NIH Office of Dietary Supplements"
          columns={[
            { key: 'form_name', header: '劑型', className: 'min-w-[130px]' },
            { key: 'elemental_calcium_pct', header: '元素鈣比例', className: 'min-w-[120px]' },
            { key: 'stomach_acid_dependency', header: '需要胃酸嗎', className: 'min-w-[130px]' },
            { key: 'best_timing', header: '怎麼吃', className: 'min-w-[140px]' },
            { key: 'suitable_population', header: '適合誰', className: 'min-w-[220px]' },
          ]}
          rows={OSTEO_CALCIUM_FORMS}
          rowKey={(r) => r.form_name}
        />
        <DataTable
          title="表 3-9　骨鬆藥物與鈣片的服用時間"
          source="各藥品仿單；臨床藥學建議"
          columns={[
            { key: 'drug', header: '藥物', className: 'min-w-[170px]' },
            { key: 'how', header: '怎麼吃', className: 'min-w-[220px]' },
            { key: 'separate', header: '要間隔什麼', className: 'min-w-[220px]' },
          ]}
          rows={OSTEO_MED_TIMING}
          rowKey={(r) => r.drug}
        />
        <Callout kind="myth" title="「K2 能把鈣導進骨頭、避免血管鈣化」是真的嗎？">
          <p className="text-[13px]">
            K2 確實參與活化骨鈣素與基質 Gla 蛋白，但人體隨機試驗中補充 MK-7 對骨密度的效果小且不一致，目前<strong>沒有證據能降低骨折或延緩血管鈣化</strong>。均衡飲食中的納豆、起司、蛋黃已足夠；服用 Warfarin 者補充前務必詢問醫師。
          </p>
        </Callout>
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-exercise"
        index={next()}
        title="動對：阻力、衝擊、平衡三管齊下"
        oneLine="阻力與衝擊訓練能維持甚至小幅增加骨密度，平衡訓練能減少約四分之一的跌倒；骨折大多由跌倒造成，兩者都要練。"
        grade="A"
        numbers={[
          { value: '-23%', label: '規律運動減少長者跌倒次數' },
          { value: '+2.9%', label: 'LIFTMOR 8 個月腰椎骨密度（對照組下降）' },
          { value: '≥ 3 小時/週', label: '平衡訓練防跌效果最好' },
        ]}
        actions={['每週 2–3 次阻力訓練，從坐站起立與彈力帶開始', '曾有脊椎骨折者，先由物理治療師評估再加入衝擊與負重', '用居家防跌清單檢查浴室、走道與照明']}
        caution="高強度訓練（如 LIFTMOR）是在專業監督下進行；骨鬆或已骨折者不要自行做大重量硬舉或跳躍。"
      >
        <FigureFrame number="圖 3-9" title="骨鬆運動金字塔與避免動作" source="Too Fit To Fracture 2014；Sherrington Cochrane 2019；LIFTMOR 2018" note={false}>
          <ExercisePyramidFigure />
        </FigureFrame>
        <div className="grid gap-3 md:grid-cols-3">
          {FALL_PREVENTION.map((f) => (
            <div key={f.area} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-3.5">
              <p className="text-[13px] font-bold text-slate-900 dark:text-white mb-1.5">防跌：{f.area}</p>
              <ul className="space-y-1 text-[13px] text-slate-700 dark:text-slate-300">
                {f.items.map((i) => <li key={i}>✓ {i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </KnowledgePoint>

      <KnowledgePoint
        id="kp-after"
        index={next()}
        title="骨折後：把握再骨折的黃金治療期"
        oneLine="第一次輕微外力骨折就是骨鬆警報；之後 1–2 年再骨折風險最高，應在骨折後盡快開始治療，而不是等骨頭長好。"
        grade="A"
        numbers={[
          { value: '2–5 倍', label: '骨折後 1–2 年內再骨折風險' },
          { value: '15–20%', label: '髖部骨折後 1 年死亡率' },
          { value: '< 3 成', label: '骨折後實際接受骨鬆治療的比例（各國調查）' },
        ]}
        actions={['骨折住院或門診時，主動問：「要不要做骨鬆評估？」', '詢問醫院是否有骨折聯合照護服務（FLS）個管師', '家人骨折後陪同回診，協助記住打針與吃藥時間']}
      >
        <FigureFrame number="圖 3-10" title="骨折後再骨折風險隨時間的變化" source="Johansson 2017；Kanis 2019" caption="骨折後頭兩年風險最高，之後下降但仍高於沒骨折過的人，所以治療要「早」也要「久」。">
          <ImminentRiskFigure />
        </FigureFrame>
        <FigureFrame number="圖 3-11" title="骨折後四步驟" source="IOF Capture the Fracture；中華民國骨質疏鬆症學會" note={false}>
          <PostFractureTimeline />
        </FigureFrame>
      </KnowledgePoint>
    </div>
  );
};
