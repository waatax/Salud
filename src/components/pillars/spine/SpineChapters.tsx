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
  VCF_GENANT_GRADES,
  BONE_CEMENT_TABLE,
  CEMENT_MATERIALS_TABLE,
  MISS_TECHNIQUES_TABLE,
  MISS_METRICS_COMPARISON,
  REHAB_PHASES_TABLE,
  MCGILL_BIG_THREE,
  SPINE_HEALTH_CURVES,
  TMGRGH_SPINE_CENTER_SERVICES,
} from '../../../data/spineData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout, GradePill } from '../../common/pro/Blocks';
import { SpineColumnFigure, MotionSegmentFigure, AxialSegmentFigure, AnatomyLegend } from './figures/AnatomyFigures';
import { HandMapsFigure, LegFootMapFigure, NumbPatternFigure } from './figures/NerveFigures';
import { ImagingSmallMultiples, DiscPressureChart, NeckLoadChart, RegressionChart, DegenCascadeFigure, TreatmentLadderFigure, NaturalCourseFigure } from './figures/ChartFigures';
import {
  VertebralWedgeFractureFigure,
  BoneCementProcedureFigure,
  MissVsOpenFigure,
  McgillBigThreeFigure,
  SpineSpringBiomechanicsFigure,
  PostOpLogRollAndBraceFigure,
  NavigationOlifAndEndoscopyFigure,
} from './figures/SpineSpecialtyFigures';
import { POSTURE_FIGURES } from './figures/PostureFigures';
import { EXERCISE_FIGURES } from './figures/ExerciseFigures';
import { NumbLocator, RedFlagChecker, DailySpineChecklist, UrgencyBadge, ShareableSpineCareGuide } from './SpineTools';

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

    <H3 id="spinal-health">整體脊柱健康：生理曲線、彈簧避震與矢狀平衡</H3>
    <P>
      脊柱健康的核心是維持<strong>四段天然生理曲線的彈性平衡</strong>。頸前凸、胸後凸、腰前凸與薦骨形成一個巨大的機械避震彈簧。當因為長期低頭、駝背或久坐導致曲線變直（平背）或過度後凸時，重力鉛垂線偏離骨盆中央，椎間盤與小面關節的局部壓縮負荷將激增數倍。
    </P>

    <FigureFrame
      number="圖 1-3"
      title="脊柱彈簧避震力學與矢狀平衡 (Sagittal Balance)"
      source="臨床生物力學；AO Spine 脊椎對齊標準"
      caption="左為健康的 S 型彈簧曲線，重力鉛垂線穿過 S1 上後緣，衝擊被多段均勻吸收；右為平背與前傾駝背，避震彈簧失效，衝擊直衝椎間盤與小面關節。"
    >
      <SpineSpringBiomechanicsFigure />
    </FigureFrame>

    <DataTable
      title="表 1-3　脊柱四段生理曲線健康指標與失衡矯治"
      source="脊椎外科學與人體工學標準"
      columns={[
        { key: 'segment', header: '脊柱節段', className: 'min-w-[130px]' },
        { key: 'normal_angle', header: '正常生理角度', className: 'min-w-[120px]' },
        { key: 'mechanical_function', header: '力學功能', className: 'min-w-[180px]' },
        { key: 'common_distortion', header: '常見失衡形態', className: 'min-w-[160px]' },
        { key: 'correction_focus', header: '保健與日常調校重點', className: 'min-w-[200px]' },
      ]}
      rows={SPINE_HEALTH_CURVES}
      rowKey={(r) => r.segment}
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

// ── 3. Osteoporosis ─────────────────────────────────────────────────────

export { OsteoporosisChapter } from './OsteoporosisChapter';

// ── 4. Compression Fractures & Bone Cement ──────────────────────────────

export const FractureChapter: React.FC = () => (
  <div className="space-y-6">
    <P>
      脊椎壓迫性骨折（Vertebral Compression Fracture, VCF）是骨質疏鬆症最常見的嚴重併發症。長者常常只是<strong>彎腰抱孫、提重物、劇烈咳嗽或在浴室滑倒坐地</strong>，胸腰椎前側就因無法承受縱向應力而發生「楔形塌陷（Wedge Collapse）」，造成痛到無法翻身坐起的劇烈背痛。
    </P>

    <FigureFrame
      number="圖 4-1"
      title="脊椎壓迫性骨折塌陷形態與連鎖駝背效應"
      source="Genant HK 1993 半定量分類；脊椎外科學"
      caption="正常椎體為矩形；壓迫骨折多以前壁塌陷（楔形）最常見。前壁塌陷改變了重力力臂，將額外壓力轉嫁至相鄰椎體，若未積極治療，容易引發連鎖骨牌式再骨折。"
    >
      <VertebralWedgeFractureFigure />
    </FigureFrame>

    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <div className="space-y-4">
        <H3>如何判斷新骨折 vs 舊骨折？磁振造影（MRI）是關鍵</H3>
        <P>
          長者常因退化而有以往癒合的舊骨折。當突發劇烈背痛時，X 光只能看出「骨頭扁了」，無法分辨是這次新發生的還是十年前的舊傷。<strong>MRI 的 STIR 序列（水腫顯影）</strong>能偵測骨骼微血管破裂產生的骨髓水腫（急性期呈亮白高訊號）。<strong>只有確認為新鮮水腫的急性骨折，才適合評估微創骨泥手術</strong>！
        </P>
        <Callout kind="tip" title="壓迫性骨折的黃金照護守則">
          <ul className="list-disc pl-5 space-y-1 text-[13px]">
            <li><strong>嚴格限制臥床 &lt; 48 小時</strong>：除前兩天劇痛相對休息，應盡早下床防範肌少失能。</li>
            <li><strong>起床務必穿戴硬式背架（TLSO / Jewett 背架）</strong>：提供三點支撐，限制向前彎腰，減輕前柱壓力。</li>
            <li><strong>短暫使用降鈣素（Calcitonin）止痛</strong>：具備獨特中樞骨痛止痛效果，減輕對強效止痛藥依賴。</li>
            <li><strong>下床翻身採用「滾木翻身法」</strong>：肩膀與骨盆同步旋轉，嚴禁扭轉腰部。</li>
          </ul>
        </Callout>
      </div>

      <DataTable
        title="表 4-1　Genant 脊椎壓迫性骨折半定量分級"
        source="Genant HK, et al. J Bone Miner Res 1993"
        columns={[
          { key: 'grade', header: '分級', className: 'min-w-[80px]' },
          { key: 'name', header: '形態名稱', className: 'min-w-[120px]' },
          { key: 'collapse_pct', header: '前壁塌陷比例' },
          { key: 'treatment_approach', header: '臨床處置方向', className: 'min-w-[200px]' },
        ]}
        rows={VCF_GENANT_GRADES}
        rowKey={(r) => r.grade}
      />
    </div>

    <H3 id="bone-cement">微創骨泥手術：椎體成形術 (PVP) vs 氣球擴張椎體成形術 (PKP)</H3>
    <P>
      當保守治療（硬背架、藥物）經過 2–3 週仍劇烈疼痛無法翻身下床、或椎體高度持續進行性塌陷時，<strong>微創骨泥灌注手術</strong>能在局部麻醉下顯著緩解疼痛、穩固骨折。
    </P>

    <FigureFrame
      number="圖 4-2"
      title="微創氣球擴張椎體成形術（PKP 骨泥）步驟與力學比較"
      source="FREE Trial (Lancet 2009)；VAPOUR Trial (Lancet 2016)"
      caption="經皮穿刺置入氣球充氣，將塌陷椎體撐起復位並擠出封閉空腔；抽出氣球後在極低壓力下推注高黏度骨泥，能大幅降低骨泥外漏風險。"
    >
      <BoneCementProcedureFigure />
    </FigureFrame>

    <DataTable
      title="表 4-2　常見骨泥灌注手術方式比較（PVP vs PKP vs SpineJack）"
      source="Lancet FREE 試驗；Cochrane 系統性回顧"
      columns={[
        { key: 'method_name', header: '手術術式', className: 'min-w-[160px]' },
        { key: 'height_restoration', header: '高度復原能力', className: 'min-w-[140px]' },
        { key: 'leakage_risk', header: '骨泥滲漏風險', className: 'min-w-[180px]' },
        { key: 'suitable_patients', header: '適合對象', className: 'min-w-[180px]' },
      ]}
      rows={BONE_CEMENT_TABLE}
      rowKey={(r) => r.method_name}
    />

    <DataTable
      title="表 4-3　骨泥填充材料特性：壓克力 (PMMA) vs 磷酸鈣 (CPC)"
      source="生物力學與材料學教材"
      columns={[
        { key: 'material', header: '材料名稱', className: 'min-w-[150px]' },
        { key: 'curing_temp', header: '固化溫度與反應', className: 'min-w-[150px]' },
        { key: 'mechanical_strength', header: '抗壓強度', className: 'min-w-[140px]' },
        { key: 'clinical_tradeoffs', header: '臨床優缺點分析', className: 'min-w-[240px]' },
      ]}
      rows={CEMENT_MATERIALS_TABLE}
      rowKey={(r) => r.material}
    />

    <Callout kind="redflag" title="骨泥手術後的關鍵真相：只治標不治本！">
      <p>
        灌骨泥能立竿見影地把「碎掉的這塊積木」黏住固定、快速止痛，但它<strong>絲毫沒有解決病人全身骨質疏鬆的根本問題</strong>！由於 PMMA 骨泥硬度遠高於疏鬆骨質，術後注入節段會形成堅硬的應力集中點；臨床統計顯示，<strong>灌完骨泥若未接受抗骨鬆藥物治療，術後一年內相鄰節段再骨折率高達 15–20%</strong>！因此，術後務必立即啟動促骨生成或抗吸收處方藥物。
      </p>
    </Callout>

    <H3 id="fracture-postop-care">脊椎骨折與微創骨泥術後：標準上下床與背架照護</H3>
    <P>
      無論採取保守背架治療或接受微創氣球骨泥灌注（PKP/PVP），出院返家後的<strong>「圓滾木翻身法」</strong>與<strong>「背架正確穿脫順序（先穿再坐、先躺再脫）」</strong>是保護脆弱椎體、預防骨泥鬆動或鄰近節段再骨折的核心關鍵：
    </P>

    <FigureFrame
      number="圖 4-3"
      title="脊椎骨折與微創術後：「先穿再坐、先躺再脫」＋圓滾木上下床四部曲"
      source="台灣各大醫學中心（中國醫大體系、臺大、北榮、長庚）脊椎骨折護理指導共識"
      caption="起床時必須在平躺狀態下先穿妥背架，再以圓滾木翻身法（肩與臀同一直線）轉為側躺，雙腿垂出床沿同時用雙手推床面將軀幹直立撐起；嚴禁直接仰臥起坐或扭腰翻身。"
    >
      <PostOpLogRollAndBraceFigure />
    </FigureFrame>

    <ShareableSpineCareGuide defaultScenario="fracture" />
  </div>
);

// ── 5. Minimally Invasive Spine Surgery (MISS) ──────────────────────────

export const SurgeryChapter: React.FC = () => (
  <div className="space-y-6">
    <P>
      當脊椎神經受壓迫引起嚴重麻痛、間歇性跛行，或保守治療無效時，手術減壓是重要的選項。近年脊椎外科最重要的革命就是<strong>微創脊椎手術（Minimally Invasive Spine Surgery, MISS）</strong>、<strong>全脊椎內視鏡（UBE / PELD）</strong>與<strong>3D 電腦導航（O-arm GPS）</strong>的結合，徹底改寫了過去「脊椎開刀傷口大、恢復慢、容易傷神經」的傳統印象。
    </P>

    <FigureFrame
      number="圖 5-1"
      title="傳統開放手術 vs 雙通道內視鏡微創手術 (UBE) 組織創傷比較"
      source="Kim JE 2023 Neurosurg Clin N Am；AO Spine 脊椎微創手術指引"
      caption="傳統開刀必須自骨骼大範圍剝離多裂肌並強烈牽引拉扯；微創內視鏡透過肌纖維天然間隙穿透，在 30 倍高畫質視野與生理食鹽水連續灌注下精準減壓，肌肉損傷趨近於零。"
    >
      <MissVsOpenFigure />
    </FigureFrame>

    <div className="grid gap-4 lg:grid-cols-2 items-start">
      <div className="space-y-3">
        <H3>微創手術的核心哲學：最大化保留天然穩定構造</H3>
        <P>
          傳統脊椎手術傷口大、背部多裂肌（Multifidus）被迫廣泛剝離與電燒，術後肌肉常產生永久性缺血、神經去支配與纖維化萎縮，這就是許多人開完刀後一輩子感到「背部緊繃痠痛、站不久」的「開刀後綜合症（Failed Back Surgery Syndrome）」。
        </P>
        <P>
          微創手術透過<strong>逐級擴張管（Serial Dilators）</strong>撐開肌肉纖維，或透過雙微孔置入內視鏡，在完全不切斷肌肉附著點的前提下直達骨窗，<strong>保留脊椎後方張力帶、棘上韌帶與對側小面關節</strong>，維持脊椎天然活動穩定度。
        </P>
      </div>

      <DataTable
        title="表 5-1　傳統開放式手術 vs 微創內視鏡手術臨床數據比對"
        source="多中心臨床試驗綜合數據；微創脊椎中心 ERAS 快速康復指標"
        columns={[
          { key: 'item', header: '評估指標', className: 'min-w-[110px]' },
          { key: 'traditional_open', header: '傳統開放式大開刀', className: 'min-w-[150px]' },
          { key: 'miss_endoscopic', header: '微創／雙通道內視鏡 (UBE)', className: 'min-w-[160px]' },
          { key: 'clinical_benefit', header: '臨床優勢分析', className: 'min-w-[180px]' },
        ]}
        rows={MISS_METRICS_COMPARISON}
        rowKey={(r) => r.item}
      />
    </div>

    <H3 id="miss-techniques">主流微創脊椎手術術式與 3D 電腦導航體系</H3>
    <P>
      從單純椎間盤切除、椎管擴大減壓，到需要打骨釘固定與墊片的融合手術、甚至高難度的脊椎側彎駝背矯形與二次翻修手術，現代<strong>微創脊椎中心（如臺中市立老人復健綜合醫院／中國醫大經營 骨科部張建鈞副院長團隊，榮獲 2023、2024 年 SNQ 國家品質標章）</strong>已建立完整的 3D 電腦導航與內視鏡微創醫療網：
    </P>

    <FigureFrame
      number="圖 5-2"
      title="微創脊椎中心三大精準核心：3D 電腦導航 (O-arm) × OLIF 側開融合 × UBE 內視鏡"
      source="臺中市立老人復健綜合醫院骨科部／微創脊椎中心（張建鈞、林琮凱、毛睿廷醫師團隊）臨床技術指引"
      caption="O-arm 3D 電腦導航提供術中即時 3D 立體影像定位，避免牽拉神經並大幅降低輻射；OLIF 經側腹部天然間隙置入大面積融合支架達成間接減壓；脊椎內視鏡以 < 1 cm 微孔精準除骨刺。"
    >
      <NavigationOlifAndEndoscopyFigure />
    </FigureFrame>

    <DataTable
      title="表 5-2　常見微創脊椎手術術式、傷口尺寸與適應症"
      source="台灣神經脊椎外科醫學會；AO Spine 臨床指引；微創脊椎中心臨床規範"
      columns={[
        { key: 'name_zh', header: '術式名稱', className: 'min-w-[140px]' },
        { key: 'incision_size', header: '切口大小' },
        { key: 'mechanism_zh', header: '手術原理與操作路徑', className: 'min-w-[200px]' },
        { key: 'advantages', header: '核心優勢', className: 'min-w-[180px]' },
        { key: 'indications', header: '主要適應症', className: 'min-w-[160px]' },
      ]}
      rows={MISS_TECHNIQUES_TABLE}
      rowKey={(r) => r.name_zh}
    />

    <DataTable
      title="表 5-3　特色醫療標竿：微創脊椎中心七大進階臨床技術與照護效益"
      source="臺中市立老人復健綜合醫院（委託中國醫藥大學興建經營）骨科部／微創脊椎中心（張建鈞副院長團隊）"
      columns={[
        { key: 'code', header: '編號', className: 'w-14' },
        { key: 'title_zh', header: '核心技術項目', className: 'min-w-[160px]' },
        { key: 'clinical_focus_zh', header: '微創精準醫療重點', className: 'min-w-[220px]' },
        { key: 'patient_benefit_zh', header: '對病患與術後恢復之效益', className: 'min-w-[200px]' },
      ]}
      rows={TMGRGH_SPINE_CENTER_SERVICES}
      rowKey={(r) => r.code}
    />

    <Callout kind="tip" title="客觀看待微創手術：它不是萬靈丹，術後保養決定長期成敗">
      <ul className="list-disc pl-5 space-y-1 text-[13px]">
        <li><strong>神經減壓的本質相同</strong>：微創手術改變的是「進入路徑」，神經孔減壓與椎間盤移除的徹底程度與傳統手術一致；若壓迫時間較久，術後神經髓鞘仍需數週至數月逐步消腫修復。</li>
        <li><strong>微創傷口小 ≠ 裡面已經完全長好</strong>：雖然皮膚傷口僅 0.5–1.5 公分、術後當天即可下床，但深層椎間盤纖維環破口或植骨融合區仍需 <strong>6–12 週以上</strong>才能牢固癒合；術後過早彎腰搬重物仍有 5–10% 復發風險！</li>
        <li><strong>專責微創與導航團隊經驗</strong>：內視鏡與 3D 電腦導航手術對術者的三維空間感、手眼協調與團隊配合要求極高，選擇具備豐富微創與導航經驗的專科團隊是安全與療效的關鍵。</li>
      </ul>
    </Callout>

    <H3 id="surgery-postop-care">脊椎手術後恢復、傷口照護、背架穿戴與日常禁忌全攻略</H3>
    <P>
      手術成功只是康復的一半，另一半取決於<strong>術後黃金 3 個月的正確居家照護</strong>。以下整合台灣各大醫學中心與微創脊椎中心之正式出院衛教單張，提供可一鍵複製分享給家人與照護者的完整指南：
    </P>

    <FigureFrame
      number="圖 5-3"
      title="術後安全上下床標準流程：「先穿再坐、先躺再脫」與圓滾木翻身"
      source="台灣各大醫學中心脊椎外科術後護理指導單張"
      caption="無論是內視鏡減壓、OLIF 側開或導航骨釘融合，上下床皆須維持脊椎一直線，利用手肘與手掌推床坐起，避免腰部屈曲與扭轉。"
    >
      <PostOpLogRollAndBraceFigure />
    </FigureFrame>

    <ShareableSpineCareGuide defaultScenario="miss" />
  </div>
);

// ── 6. Numbness ─────────────────────────────────────────────────────────

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

      <H3 id="mcgill-rehab">脊椎穩定黃金標準：麥吉爾護脊三大動作 (McGill Big 3)</H3>
      <P>
        加拿大滑鐵盧大學脊椎生物力學權威 Stuart McGill 教授經數十年實驗室量測證實：<strong>傳統仰臥起坐與俯臥超人式會對腰椎產生超過 3300 至 6000 牛頓的極度危險剪切力</strong>。McGill Big 3 能夠在「零腰椎彎曲、零剪切力」下最大化活化腹橫肌、腰方肌與多裂肌，是全球運動醫學與脊椎復健公認的黃金動作。
      </P>

      <FigureFrame
        number="圖 8-1"
        title="麥吉爾護脊黃金三大動作（McGill Big 3）生物力學"
        source="McGill SM 2010 Strength Cond J；臨床脊椎運動生物力學"
        caption="改良式捲腹保護腰椎前凸弧度；側棒式強化腰方肌側向防護纜繩；鳥狗式深度喚醒多裂肌抗旋轉耐力。動作重點為脊椎完全維持中立平坦。"
      >
        <McgillBigThreeFigure />
      </FigureFrame>

      <DataTable
        title="表 8-1　McGill Big 3 動作規格、肌群啟動與操作指南"
        source="McGill 脊椎生物力學實驗室"
        columns={[
          { key: 'name_zh', header: '動作名稱', className: 'min-w-[110px]' },
          { key: 'target_muscles', header: '目標核心肌群', className: 'min-w-[140px]' },
          { key: 'spinal_load_biomechanics', header: '脊椎力學優勢', className: 'min-w-[200px]' },
          { key: 'key_cue_zh', header: '關鍵操作口訣', className: 'min-w-[200px]' },
          { key: 'reps_and_sets', header: '建議處方組數', className: 'min-w-[150px]' },
        ]}
        rows={MCGILL_BIG_THREE}
        rowKey={(r) => r.name_zh}
      />

      <H3 id="rehab-phases">脊椎損傷與骨折三階段全方位復健進程</H3>
      <P>
        無論是急性閃腰、椎間盤突出，還是骨質疏鬆壓迫性骨折或微創術後，復健都必須遵循循序漸進的組織癒合時間表：
      </P>

      <DataTable
        title="表 8-2　脊椎與骨折三階段復健進程：目標、許可動作與嚴格禁忌"
        source="脊椎外科學；物理治療指引；Lancet WalkBack 2024"
        columns={[
          { key: 'phase', header: '復健階段', className: 'min-w-[130px]' },
          { key: 'timeframe', header: '時程', className: 'min-w-[80px]' },
          { key: 'core_goals_zh', header: '核心復健目標', className: 'min-w-[180px]' },
          {
            key: 'allowed_exercises_zh',
            header: '許可與推薦訓練',
            className: 'min-w-[220px]',
            render: (r) => (
              <ul className="list-disc pl-4 space-y-0.5 text-[12px]">
                {r.allowed_exercises_zh.map((ex: string) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
            ),
          },
          {
            key: 'strict_contraindications_zh',
            header: '嚴格禁忌動作',
            className: 'min-w-[200px]',
            render: (r) => (
              <ul className="list-disc pl-4 space-y-0.5 text-[12px] text-rose-700 dark:text-rose-400 font-semibold">
                {r.strict_contraindications_zh.map((ci: string) => (
                  <li key={ci}>{ci}</li>
                ))}
              </ul>
            ),
          },
        ]}
        rows={REHAB_PHASES_TABLE}
        rowKey={(r) => r.phase}
      />

      <Callout kind="redflag" title="骨質疏鬆與壓迫性骨折患者的「終生禁忌動作」">
        <p>
          對於已知骨質疏鬆（T ≤ -2.5）或曾發生脊椎壓迫骨折的長者，<strong>終生嚴禁任何「負重向前彎腰」動作（如站立彎腰摸腳趾、仰臥起坐、直腿彎腰抱重物）與爆發性強烈扭轉（如高爾夫揮桿）</strong>！這些動作會將數倍的剪力與壓縮應力集中在脆弱的胸腰椎前壁，是引發新發楔形骨折的頭號兇手。日常拾物應採用「髖鉸鏈（Hip Hinge）」屈膝下蹲！
        </p>
      </Callout>

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

      <ShareableSpineCareGuide defaultScenario="all" />
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
  OVERVIEW: ['ISNCSCI', 'GBD2023', 'WILKE1999'],
  SPURS: ['BRINJIKJI2015', 'AOSPINE2017'],
  OSTEOPOROSIS: ['KANIS2019', 'AACE2020', 'USPSTF2025', 'TOA2023', 'OSTA2001', 'HERNANDEZ2003', 'FREEDOM2009', 'HORIZON2007', 'NEER2001', 'ARCH2017', 'ECTS2017', 'ASBMR2016', 'BLACK2020', 'ENDO2024D', 'VITAL2022', 'BOLLAND2015', 'SANDERS2010', 'TW_DRI', 'LIFTMOR2018', 'TOOFIT2014', 'SHERRINGTON2019', 'IOF2023'],
  FRACTURE: ['GENANT1993', 'BUCHBINDER2018', 'VAPOUR2016', 'FREE2009', 'TMGRGH261', 'TW_SPINE_CARE'],
  SURGERY: ['UBE2023', 'PEUL2007', 'NASS2014', 'TMGRGH261', 'TMGRGH_FEATURE', 'TW_SPINE_CARE'],
  NUMBNESS: ['ISNCSCI', 'AOSPINE2017', 'ADA2025', 'NASS2014'],
  POSTURE: ['WILKE1999', 'HANSRAJ2014', 'KOVACS2003', 'WALKBACK2024', 'TW_SPINE_CARE'],
  EXERCISE: ['WHO2023', 'BASSON2017', 'WALKBACK2024', 'LANCET2018'],
  REHAB: ['MCGILL2010', 'WHO2023', 'NICE59', 'ACP2017', 'WALKBACK2024', 'LIFTMOR2018', 'TMGRGH261', 'TW_SPINE_CARE'],
  TREATMENT: ['STEFFENS2016', 'WALKBACK2024', 'CHIU2015', 'PEUL2007', 'NASS2014', 'AOSPINE2017', 'NICE59'],
  MEDS: ['ACP2017', 'WHO2023', 'PACE2014', 'PRECISE2017', 'CASHIN2021', 'GOLDBERG2015', 'EFSA2023B6', 'ADA2025'],
  TRIAGE: ['NICE59', 'ACP2017', 'AOSPINE2017', 'LANCET2018', 'TMGRGH261'],
};

