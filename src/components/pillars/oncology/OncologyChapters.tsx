import React from 'react';
import {
  ONCOLOGY_KEY_NUMBERS,
  TAIWAN_CANCER_SCREENING_TABLE,
  TUMOR_MARKERS_GUIDE,
  LUNG_NODULE_MANAGEMENT,
  BREAST_SUBTYPES_TABLE,
  FIVE_THERAPY_PILLARS,
  CHEMO_SIDE_EFFECT_SOLUTIONS,
} from '../../../data/oncologyData';
import { DataTable } from '../../common/pro/DataTable';
import { FigureFrame, Callout } from '../../common/pro/Blocks';
import {
  TnmStagingAndOncogeneFigure,
  TaiwanScreeningVsMarkersFigure,
  LungGgoAndDriverMutationFigure,
  ColorectalLeftVsRightFigure,
  BreastBiradsAndSubtypesFigure,
  LiverBclcAndPancreasRedFlagFigure,
  EsdAndHeadNeckAlcoholFigure,
  ProstateMriAndGynThreeCancersFigure,
  ThyroidTiradsAndMyelomaCrabFigure,
  FivePrecisionWeaponsFigure,
  CancerNutritionAndNeutropeniaFigure,
  SurvivorshipAndPainLadderFigure,
} from './OncologyFigures';
import { TaiwanCancerScreeningChecker, CancerRedFlagChecker } from './OncologyTools';

const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-lg font-display font-bold text-slate-900 dark:text-white pt-2">{children}</h3>
);

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[15px] leading-7 text-slate-700 dark:text-slate-300 max-w-3xl">{children}</p>
);

// ── 1. OVERVIEW ──────────────────────────────────────────────────────────────
export const OncologyOverviewChapter: React.FC = () => (
  <div className="space-y-6">
    <dl className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      {ONCOLOGY_KEY_NUMBERS.map((n) => (
        <div
          key={n.label}
          className="flex flex-col-reverse rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-3.5"
        >
          <dt className="text-[12px] leading-snug text-slate-600 dark:text-slate-400">{n.label}</dt>
          <dd className="text-2xl font-display font-bold text-rose-700 dark:text-rose-400">
            {n.value}
            <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 ml-1">{n.unit}</span>
          </dd>
        </div>
      ))}
    </dl>

    <FigureFrame
      number="圖 1-1"
      title="國際 TNM 分期系統（第 0 期原位癌至第 IV 期遠端轉移）解剖深度與 5 年存活率對照"
      source="AJCC Cancer Staging Manual 8th/9th Ed.；NCCN Guidelines"
      caption="癌症分期取決於三個字母：T（原發腫瘤大小與侵犯深度）、N（區域淋巴結有無轉移）、M（遠端器官有無轉移）。第 0 期與第 I 期發現時，絕大多數實體癌透過微創手術或局部治療即可獲得 85–95% 以上的根治率！"
    >
      <TnmStagingAndOncogeneFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>為什麼好好的細胞會變成癌細胞？油門與煞車的雙重失靈</H3>
      <P>
        人體每天有數百億個細胞進行分裂更新，偶爾會出現 DNA 複製錯誤。正常情況下，細胞有精密的修復系統：<strong>「致癌基因（Proto-oncogenes，如 EGFR、KRAS、HER2）」</strong>就像汽車的油門，適時推動細胞生長；而<strong>「抑癌基因（Tumor Suppressor Genes，如 TP53、BRCA1/2、APC）」</strong>則像煞車與修車師傅，一旦發現 DNA 受損就踩煞車修補，修不好就啟動細胞自毀（凋亡）。當長期接觸菸酒檳榔、慢性病毒發炎（B/C肝、HPV、幽門桿菌）或老化累積，導致<strong>「油門卡死＋煞車失靈」</strong>，細胞就會無限制分裂並學會製造新血管、逃避免疫軍隊追殺，最終形成惡性腫瘤。
      </P>
    </div>

    <CancerRedFlagChecker />
  </div>
);

// ── 2. SCREENING_TW ──────────────────────────────────────────────────────────
export const ScreeningTwChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 2-1"
      title="台灣公費六大癌症「器官標準篩檢」vs 健檢抽血「腫瘤標記」雙重盲區對照"
      source="衛生福利部國民健康署；ASCO / NCCN 篩檢共識"
      caption="真正能降低癌症死亡率的是針對器官的影像、內視鏡與抹片篩檢；單靠抽血驗 CEA、CA19-9、CA125 不僅漏掉 70–80% 的第一期早期癌症，更常因良性發炎紅字造成不必要恐慌。"
    >
      <TaiwanScreeningVsMarkersFigure />
    </FigureFrame>

    <TaiwanCancerScreeningChecker />

    <DataTable
      title="表 2-1　台灣國健署擴大公費六大癌症篩檢資格、頻率與實證效益總表"
      source="衛生福利部國民健康署（2025 最新擴大方案）"
      columns={[
        { key: 'cancer', header: '篩檢癌別', className: 'font-bold min-w-[115px]' },
        { key: 'tool', header: '公費標準工具', className: 'font-bold text-rose-700 dark:text-rose-400 min-w-[150px]' },
        { key: 'target', header: '公費補助對象與資格' },
        { key: 'freq', header: '補助頻率', className: 'min-w-[110px]' },
        { key: 'benefit', header: '臨床關鍵價值' },
      ]}
      rows={TAIWAN_CANCER_SCREENING_TABLE}
      rowKey={(_, idx) => String(idx)}
    />

    <DataTable
      title="表 2-2　健檢常見抽血「腫瘤標記（癌症指數）」紅字原因與正確臨床用途解析"
      source="NCCN / ESMO Clinical Practice Guidelines"
      columns={[
        { key: 'marker', header: '腫瘤標記', className: 'font-bold min-w-[130px]' },
        { key: 'associated_cancers', header: '相關癌症' },
        { key: 'benign_false_positive', header: '常見良性升高原因（偽陽性！）' },
        { key: 'clinical_truth', header: '早期篩檢盲區與真正正確用途' },
      ]}
      rows={TUMOR_MARKERS_GUIDE}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 3. LUNG_CANCER ───────────────────────────────────────────────────────────
export const LungCancerChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 3-1"
      title="LDCT 肺部結節三大形態（純毛玻璃、部分實心、純實心）與台灣肺腺癌驅動基因分布"
      source="Fleischner Society Guideline；台灣 TALEM 不吸菸肺癌篩檢研究"
      caption="肺部結節不是看「幾顆」，而是看「長相與大小」！純毛玻璃結節（Pure GGO）生長極慢；一旦中間長出不透明的白色「實心核心（Part-solid）」，惡性侵犯風險即大幅攀升。"
    >
      <LungGgoAndDriverMutationFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>為什麼台灣「不抽菸女性」這麼容易得肺腺癌？</H3>
      <P>
        肺癌已成為台灣發生人數與死亡人數雙冠王。與歐美不同，台灣高達 <strong>60% 以上的肺癌患者（女性更接近 90%）從不吸菸</strong>，且絕大多數屬於長在肺部外圍小支氣管與肺泡的<strong>「肺腺癌（Adenocarcinoma）」</strong>。中研院與台大團隊發表於《Cell》與《Lancet》的台灣本土研究證實：東亞不吸菸肺腺癌與先天基因易感性（如 <em>APOBEC</em> 突變特徵）、二三手菸、PM2.5 細懸浮微粒、廚房高溫油煙及<strong>一等親肺癌家族史</strong>高度相關。
      </P>
      <Callout kind="evidence" title="晚期肺腺癌的精準革命：先驗 NGS 九大基因，別急著打化療！">
        <p>
          台灣肺腺癌患者是全球最幸運能受惠於標靶藥物的族群之一，因為超過 <strong>70% 帶有可標靶的驅動基因突變</strong>：<br />
          • <strong>EGFR 基因突變（佔台灣肺腺癌 50–55%）</strong>：第三代口服標靶藥（如 Osimertinib 泰格莎、Lazertinib）不僅全身控制率極高，更能穿過血腦障壁有效控制腦轉移，且已推進至早期術後輔助治療。<br />
          • <strong>罕見但救命的標靶基因</strong>：包括 <strong>ALK 融合（約 5%，被稱為鑽石突變，使用 Alectinib / Lorlatinib 存活期常逾 5–7 年以上！）</strong>、<strong>ROS1、BRAF V600E、MET 外顯子 14 跳躍、RET 融合、KRAS G12C、HER2、NTRK</strong> 皆已有專屬口服標靶或 ADC 藥物。<br />
          • <strong>無驅動突變者</strong>：則可檢測 <strong>PD-L1 表現量（TPS）</strong>，單用或合併使用 PD-1/PD-L1 免疫檢查點抑制劑與抗血管新生／化學治療。
        </p>
      </Callout>
    </div>

    <DataTable
      title="表 3-1　低劑量電腦斷層（LDCT）發現「肺部結節」的型態判讀與追蹤手術準則"
      source="Fleischner Society；NCCN Lung Cancer Screening Guideline；台灣肺癌學會共識"
      columns={[
        { key: 'type', header: '肺結節型態', className: 'font-bold min-w-[150px]' },
        { key: 'imaging', header: '電腦斷層 (CT) 影像特徵' },
        { key: 'pathology', header: '對應病理與生長特性' },
        { key: 'action', header: '國際指引標準追蹤與開刀時機' },
      ]}
      rows={LUNG_NODULE_MANAGEMENT}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 4. COLORECTAL_CANCER ─────────────────────────────────────────────────────
export const ColorectalCancerChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 4-1"
      title="右側大腸癌（管腔寬・慢性貧血）vs 左側大腸直腸癌（管腔窄・血便阻塞）臨床差異"
      source="NCCN Colon & Rectal Cancer Guidelines 2024"
      caption="同一個大腸，長在右邊跟長在左邊症狀截然不同！右側升結腸癌最常以「不明原因缺鐵性貧血、頭暈疲倦」表現；左側降結腸與直腸癌則以「排便習慣改變、大便變細、黏液血便」為主。"
    >
      <ColorectalLeftVsRightFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>中低位直腸癌「保肛」新時代：全前導治療（TNT）＋ 達文西微創手術</H3>
      <P>
        許多患者聽到腫瘤長在離肛門口不到 5–7 公分的「中低位直腸」，第一反應就是害怕一輩子要掛人工肛門（便袋）。事實上，現代直腸癌標準治療已進入<strong>「全前導性治療（Total Neoadjuvant Therapy, TNT）」</strong>：不急著馬上開刀，而是<strong>先做術前放射治療合併化學治療（若為 dMMR/MSI-H 型甚至單用免疫治療），讓腫瘤大幅縮小甚至完全消失（約 25–30% 可達臨床完全緩解 cCR）</strong>，接著再以達文西機械手臂或 3D 腹腔鏡在狹窄骨盆腔內進行「全直腸繫膜切除與括約肌間分離術（ISR）」，<strong>超過 85–90% 的患者都能成功保住自己的肛門！</strong>
      </P>
      <Callout kind="evidence" title="轉移性（第四期）大腸直腸癌必驗的 4 組基因標記">
        <p>
          1. <strong>MSI-H / dMMR（微衛星不穩定高，約佔 4–5%）</strong>：第一線直接使用 PD-1 免疫檢查點抑制劑（如 Pembrolizumab 或 Nivolumab + Ipilimumab），控制率與長期存活遠勝傳統化療！<br />
          2. <strong>KRAS / NRAS 全野生型（Wild-type，無突變）</strong>：尤其長在「左側大腸」者，使用抗表皮生長因子標靶（Cetuximab 爾必得舒 / Panitumumab）合併化療，可快速將肝轉移腫瘤縮小以利手術切除。<br />
          3. <strong>BRAF V600E 突變</strong>：病程較兇猛，現有專屬雙標靶組合（Encorafenib + Cetuximab）可精準阻斷。<br />
          4. <strong>HER2 過表現</strong>：可使用雙 HER2 標靶或 ADC 抗體藥物複合體。
        </p>
      </Callout>
    </div>
  </div>
);

// ── 5. BREAST_CANCER ─────────────────────────────────────────────────────────
export const BreastCancerChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 5-1"
      title="乳房影像 BI-RADS 0–6 級處置光譜與 ADC 抗體藥物複合體（生物導彈）機轉"
      source="ACR BI-RADS Atlas；ESMO / NCCN Breast Cancer Guidelines 2024"
      caption="拿到乳房攝影報告先看 BI-RADS 數字：0 級代表「需加做超音波完成評估」，千萬別以為 0 是沒事！4 級以上則需在門診做局部麻醉「粗針穿刺切片」確認病理與四大分子分型。"
    >
      <BreastBiradsAndSubtypesFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>乳癌不是單一疾病！看懂病理報告的 4 個關鍵指標（ER、PR、HER2、Ki-67）</H3>
      <P>
        台灣女性乳癌發生率高居第一，但只要早期發現並根據「分子亞型」精準用藥，整體 5 年存活率高達 90% 以上（第 0–I 期更超過 96–99%）。粗針切片病理報告出爐時，醫師會看癌細胞表面有沒有三個接收器：<strong>雌激素受體（ER）</strong>、<strong>黃體素受體（PR）</strong>、<strong>第二型人類表皮生長因子受體（HER2）</strong>，以及代表細胞分裂速度的 <strong>Ki-67 指數</strong>，將乳癌分為四大分子亞型。
      </P>
    </div>

    <DataTable
      title="表 5-1　乳癌四大分子亞型特徵、預後與現代精準治療策略（含 CDK4/6 與 ADC 新藥）"
      source="NCCN Breast Cancer Guideline 2024；ESMO Guidelines"
      columns={[
        { key: 'subtype', header: '分子亞型', className: 'font-bold min-w-[140px]' },
        { key: 'markers', header: '免疫組織化學標記 (IHC)', className: 'min-w-[150px]' },
        { key: 'share', header: '佔比', className: 'min-w-[90px]' },
        { key: 'behavior', header: '生物學特性' },
        { key: 'therapy', header: '標準治療武器組合' },
      ]}
      rows={BREAST_SUBTYPES_TABLE}
      rowKey={(_, idx) => String(idx)}
    />

    <Callout kind="tip" title="整形式保乳手術（Oncoplastic Surgery）與前哨淋巴結切片">
      <p>
        現代早期乳癌手術早已不再「一律全切乳房＋全掏空腋下淋巴結」！透過<strong>乳房保留手術搭配術後放療</strong>，存活率與全切除完全相同；且術中僅需先取 1–3 顆<strong>「前哨淋巴結（Sentinel Lymph Node）」</strong>化驗，若無轉移就不必廓清腋下淋巴，大幅減少術後手臂水腫機率！
      </p>
    </Callout>
  </div>
);

// ── 6. LIVER_BILIARY_PANCREAS ────────────────────────────────────────────────
export const LiverBiliaryPancreasChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 6-1"
      title="肝細胞癌（HCC）BCLC 分期多元武器庫 ＆「癌王」胰臟癌四大早期蛛絲馬跡"
      source="BCLC Strategy 2022 Update；NCCN Hepatobiliary & Pancreatic Guidelines 2024"
      caption="肝癌可依 BCLC 分期靈活運用微創手術、射頻/微波消融（RFA/MWA）、動脈栓塞（TACE/Y-90）與第一線雙免疫標靶；而深藏後腹腔的胰臟癌則需高度警覺「50 歲後新發糖尿病＋消瘦背痛」。"
    >
      <LiverBclcAndPancreasRedFlagFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>肝癌獨特之處：唯一可憑「動態影像動脈期亮起、門脈期洗出」免切片確診的實體癌</H3>
      <P>
        正常肝臟 75% 血流來自門靜脈，但<strong>肝細胞癌（HCC）幾乎 100% 由肝動脈供血</strong>。因此在有 B 肝、C 肝或肝硬化的高危患者身上，只要大於 1 公分的結節在動態增強電腦斷層（CT）或磁振造影（MRI）呈現典型的<strong>「動脈期快速顯影亮起（Arterial hyperenhancement），門脈期或延遲期快速退去變暗（Washout）」</strong>，即可直接確診肝癌並立即安排微創切除或局部消融，不需冒出血風險做穿刺！
      </P>
      <H3>如何攔截「癌王」胰臟癌（PDAC）與膽道癌？</H3>
      <P>
        胰臟深藏在胃與十二指腸後方的「後腹腔」，一般健檢做腹部超音波常被胃腸空氣擋住而看不清楚胰臟尾部。臨床上要提早抓出可開刀的早期胰臟癌，請牢記三大高危線索：
      </P>
      <Callout kind="redflag" title="胰臟癌與膽道癌的 3 大保命篩檢與基因檢測重點">
        <p>
          1. <strong>警覺「50 歲後新發生糖尿病」伴體重減輕</strong>：約有 1% 的 50 歲以上新發糖尿病患者，其實是因為潛伏的早期胰臟癌分泌因子導致血糖失控！若剛診斷糖尿病卻發現體重不增反減、上腹悶痛刺向後背，請務必安排<strong>增強型胰臟薄切 CT / MRI 或內視鏡超音波（EUS）</strong>。<br />
          2. <strong>認識「胰臟水泡（黏液性囊腫 IPMN）」</strong>：健檢 MRI 意外發現的胰管內乳突狀黏液性腫瘤（IPMN）如同胰臟的「息肉」，需定期追蹤主胰管有無擴張或壁結節。<br />
          3. <strong>確診胰臟癌或膽道癌必驗基因</strong>：胰臟癌應檢測遺傳性 <code>BRCA1/2</code>、<code>PALB2</code>（可用鉑金類化療與口服 PARP 抑制劑維持）；膽管癌則應檢測 <code>FGFR2</code> 融合、<code>IDH1</code> 突變、<code>HER2</code> 與 <code>MSI-H</code>，且第一線標準治療已進入<strong>「免疫檢查點抑制劑（Durvalumab / Pembrolizumab）＋ GC 化療」</strong>時代。
        </p>
      </Callout>
    </div>
  </div>
);

// ── 7. GASTRIC_ESOPHAGEAL_HEADNECK ───────────────────────────────────────────
export const GastricEsophagealHeadNeckChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 7-1"
      title="早期胃癌／食道癌「內視鏡黏膜下剝離術（ESD）」免切器官根治 ＆ 菸酒檳榔 123 倍致癌鏈"
      source="日本胃癌／食道癌學會 ESD 指引；NCCN Guidelines"
      caption="只要在癌細胞尚未穿入黏膜下深層前透過高畫質 NBI 胃鏡揪出，就能用內視鏡電刀直接把病灶「片下來（ESD）」，肚皮完全沒傷口且 100% 保留胃與食道！"
    >
      <EsdAndHeadNeckAlcoholFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>台灣男性青壯年殺手：口腔癌、食道癌與鼻咽癌</H3>
      <P>
        口腔癌與食道癌在台灣男性癌症死亡率名列前茅，平均發病年齡比其他癌症早了將近 10 歲，正值家庭經濟支柱期。除了戒除菸、酒、檳榔與避免喝超過 65°C 的滾燙熱湯外，針對晚期胃癌與食道癌，現代醫學也有重大突破：<strong>晚期胃腺癌</strong>現在除了檢測 <code>HER2</code>（可用抗體或 Enhertu ADC）、<code>MSI-H</code> 與 <code>PD-L1 CPS</code>（併用 Nivolumab / Pembrolizumab 免疫治療）外，最新更有針對胃黏膜緊密連接蛋白 <strong>Claudin 18.2 的專屬標靶單株抗體（Zolbetuximab）</strong>！
      </P>
      <Callout kind="tip" title="台灣特色的「鼻咽癌（NPC）」：與 EB 病毒相關，留意單側症狀！">
        <p>
          鼻咽位於鼻子最深處與喉嚨交界，與吸菸較無關，而是與遺傳、醃漬鹹魚及 <strong>EB 病毒（Epstein-Barr Virus）感染</strong>高度相關。早期四大「單側」警訊：① <strong>單側耳朵悶塞感、耳鳴或中耳積水（成人單側中耳積水必看鼻咽！）</strong>、② <strong>清晨第一口回吸鼻涕帶有暗紅血絲</strong>、③ <strong>上頸部摸到無痛性腫大淋巴結（最常見！）</strong>、④ <strong>單側頭痛或複視（看東西兩個影子）</strong>。鼻咽癌對放射治療（特別是強度調控放療與質子治療）合併化療／免疫治療極度敏感，早期治癒率超過 90%！
        </p>
      </Callout>
    </div>
  </div>
);

// ── 8. GYN_URO_CANCERS ───────────────────────────────────────────────────────
export const GynUroCancersChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 8-1"
      title="女性婦科三大癌（子宮頸、子宮內膜、卵巢）篩檢差異 ＆ 男性攝護腺癌 mpMRI 融合切片流程"
      source="NCCN Cervical, Uterine, Ovarian & Prostate Cancer Guidelines 2024"
      caption="婦科抹片只能篩檢「子宮頸癌」；若出現停經後出血要查「子宮內膜癌」，不明腹脹則要查「卵巢癌」。男性 PSA 升高時，先做多參數磁振造影（mpMRI）再行經會陰靶向融合切片，精準又安全。"
    >
      <ProstateMriAndGynThreeCancersFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>攝護腺癌：從「主動監測」、達文西手術到核醫標靶 Lu-177 PSMA</H3>
      <P>
        攝護腺癌進展相對溫和，但台灣仍有約三成患者確診時已骨轉移（常被當成老人腰椎退化骨刺痛）。50 歲以上男性（有家族史 45 歲起）定期抽血驗 <strong>PSA</strong> 至關重要：
      </P>
      <Callout kind="evidence" title="攝護腺癌與婦科卵巢癌的精準治療亮點">
        <p>
          • <strong>低風險局限性攝護腺癌</strong>：格里森分數（Gleason score）6 分且 PSA &lt; 10 的高齡長者，可採取<strong>「主動監測（Active Surveillance）」</strong>定期抽血與 MRI，免受手術副作用之苦。<br />
          • <strong>中高風險局部攝護腺癌</strong>：<strong>達文西機械手臂根除手術</strong>（精準保留控尿括約肌與性功能神經叢）或<strong>高精準放射治療合併荷爾蒙治療</strong>，10 年存活率超過 95%。<br />
          • <strong>轉移性攝護腺癌</strong>：除了傳統去勢療法（ADT），加上新一代荷爾蒙受體抑制劑（ARPI，如 Abiraterone、Enzalutamide、Darolutamide、Apalutamide）、<code>BRCA</code> 突變使用的 PARP 抑制劑，以及能精準尋找全身轉移灶進行放射爆破的<strong>「鎦-177（Lu-177 PSMA）核醫標靶同位素治療」</strong>，大幅延長存活與生活品質。<br />
          • <strong>卵巢癌的 PARP 抑制劑革命</strong>：上皮性卵巢癌患者在完成減積手術與含鉑化療後，若帶有 <code>BRCA1/2</code> 突變或同源重組修復缺失（HRD），接續口服 <strong>PARP 抑制劑（如 Olaparib、Niraparib）維持治療</strong>，可將無復發存活期延長數倍！
        </p>
      </Callout>
    </div>
  </div>
);

// ── 9. THYROID_HEME_CANCERS ──────────────────────────────────────────────────
export const ThyroidHemeCancersChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 9-1"
      title="惡性淋巴癌「無痛橡皮擦腫塊 ＋ B 症狀」＆ 多發性骨髓瘤「CRAB 四聯徵」早期辨識"
      source="NCCN Lymphoma, Multiple Myeloma & Thyroid Carcinoma Guidelines 2024"
      caption="血液腫瘤（淋巴癌、白血病、多發性骨髓瘤）沒辦法靠開刀切乾淨，卻是「最有機會靠全身藥物、標靶與 CAR-T 細胞免疫治療徹底根治或長期控制」的癌症！"
    >
      <ThyroidTiradsAndMyelomaCrabFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>甲狀腺癌：85% 以上是溫和的「乳突癌」，10 年存活率逾 95%</H3>
      <P>
        健檢甲狀腺超音波普及後，許多人看到報告寫「甲狀腺結節」就嚇得睡不著。其實超音波會根據結節的<strong>成分（實心或囊腫）、回音高低、形狀是否直立（Taller-than-wide）、邊緣是否規則及有無微鈣化點</strong>給出 <strong>TI-RADS 1–5 級評分</strong>。只有高度懷疑的結節才需在門診做簡單的細針穿刺細胞學檢查（FNA）。即使確診為最常見的<strong>甲狀腺乳突癌（Papillary Thyroid Carcinoma）</strong>或濾泡癌，因為癌細胞保留了吸收碘的特性，手術切除後視風險搭配口服<strong>「放射性碘-131（I-131）清甲治療」</strong>與甲狀腺素補充，絕大多數患者都能完全康復、壽命與常人無異！
      </P>
      <Callout kind="evidence" title="血液腫瘤的奇蹟：標靶、雙特異性抗體與「CAR-T 嵌合抗原受體 T 細胞治療」">
        <p>
          • <strong>慢性骨髓性白血病（CML）</strong>：過去必須骨髓移植，自從發明 BCR-ABL 口服標靶藥（Imatinib 基利克等 TKI）後，患者只要每天吃藥就像控制高血壓一樣，10 年存活率超過 90%！<br />
          • <strong>B 細胞淋巴癌與急性淋巴性白血病（ALL）</strong>：第一線有標靶單株抗體（Rituximab 莫須瘤、Polatuzumab）；若復發難治，台灣健保已給付革命性的<strong>「CAR-T 細胞免疫治療（Kymriah / Yescarta）」</strong>——抽出病人自己的 T 細胞，在實驗室植入能鎖定 CD19 的基因導航雷達後輸回體內，單次輸注就能讓許多原本無藥可醫的患者獲得長期完全緩解！
        </p>
      </Callout>
    </div>
  </div>
);

// ── 10. PRECISION_THERAPY ────────────────────────────────────────────────────
export const PrecisionTherapyChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 10-1"
      title="質子治療「布拉格峰（Bragg Peak）」物理優勢 ＆ PD-1 免疫檢查點抑制劑鬆開 T 細胞煞車機轉"
      source="ASCO / ESMO / NCCN Precision Oncology Guidelines"
      caption="質子射束在進入身體前段釋放能量極低，到達腫瘤深度時瞬間爆發出「布拉格峰」，而腫瘤後方劑量立刻歸零，完美保護後方正常心肺與肝臟；免疫檢查點抑制劑則拆掉癌細胞踩住的 PD-1 煞車。"
    >
      <FivePrecisionWeaponsFigure />
    </FigureFrame>

    <DataTable
      title="表 10-1　現代腫瘤醫學「抗癌五大精準武器」作用機轉與臨床優勢總整理"
      source="NCCN / ESMO / 台灣健保署 NGS 與標靶免疫給付規範"
      columns={[
        { key: 'pillar', header: '抗癌武器類別', className: 'font-bold min-w-[165px]' },
        { key: 'scope', header: '作用範圍', className: 'min-w-[110px]' },
        { key: 'mechanism', header: '核心科學機轉' },
        { key: 'pros_note', header: '代表突破與臨床價值' },
      ]}
      rows={FIVE_THERAPY_PILLARS}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 11. NUTRITION_SIDE_EFFECTS ───────────────────────────────────────────────
export const NutritionSideEffectsChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 11-1"
      title="化放療期「抗惡病質高蛋白飲食（1.2–1.5 g/kg）」＆ 第 7–14 天白血球低下谷底期防護"
      source="ESPEN Practical Guideline: Clinical Nutrition in Cancer 2021"
      caption="癌症治療期間絕對不能減肥或斷食！保住體重與骨骼肌就是保住完成化放療的本錢；而在化療後第 7–14 天白血球最低谷時，則須嚴格落實全熟食與體溫監測。"
    >
      <CancerNutritionAndNeutropeniaFigure />
    </FigureFrame>

    <DataTable
      title="表 11-1　化學與放射治療 4 大常見副作用發生時間、自我照護與急診紅旗表"
      source="NCCN Antiemesis, Mucositis & Myeloid Growth Factors Guidelines；台灣癌症基金會"
      columns={[
        { key: 'symptom', header: '副作用項目', className: 'font-bold min-w-[150px]' },
        { key: 'timing', header: '好發時間點', className: 'min-w-[130px]' },
        { key: 'do_actions', header: '✅ 實證飲食與醫療照護對策' },
        { key: 'red_flag', header: '🚨 必須立即回診／急診的危險警訊' },
      ]}
      rows={CHEMO_SIDE_EFFECT_SOLUTIONS}
      rowKey={(_, idx) => String(idx)}
    />
  </div>
);

// ── 12. SURVIVORSHIP_PALLIATIVE ──────────────────────────────────────────────
export const SurvivorshipPalliativeChapter: React.FC = () => (
  <div className="space-y-6">
    <FigureFrame
      number="圖 12-1"
      title="世界衛生組織（WHO）癌症疼痛控制三階梯：按時給藥、不忍痛、醫療止痛不成癮"
      source="WHO Guidelines for the Pharmacological and Radiotherapeutic Management of Cancer Pain；ASCO Palliative Care Guideline"
      caption="癌症疼痛管理講求「按時給藥（By the clock，維持穩定血中濃度）＋ 突發痛救援藥物」，在專科醫師指導下使用醫療級嗎啡或吩坦尼貼片安全且不會成癮。"
    >
      <SurvivorshipAndPainLadderFigure />
    </FigureFrame>

    <div className="space-y-4">
      <H3>完成治療後的黃金 5 年：如何把復發風險降到最低？</H3>
      <P>
        走過手術、化療與放療的荊棘路後，許多癌友面對的最大心理壓力是<strong>「害怕癌症復發（Fear of Cancer Recurrence, FCR）」</strong>。把焦慮化為具體的科學行動，是給身體最好的禮物：
      </P>
      <Callout kind="tip" title="ASCO 美國臨床腫瘤學會實證：防復發 4 大黃金生活處方">
        <p>
          1. <strong>規律運動是「最強抗癌特效藥」</strong>：大型追蹤研究證實，每週累計 <strong>150 分鐘中強度有氧運動（快走、超慢跑、游泳、騎車）＋ 2 次肌力訓練</strong>，不僅是改善「癌因性疲憊（CRF）」第一名的方法，更能直接降低乳癌、大腸癌與攝護腺癌 <strong>30–40% 的復發與死亡風險</strong>！<br />
          2. <strong>飲食切換回「地中海原型防癌模式」</strong>：治療結束、白血球恢復正常後，請從治療期的低渣飲食切換回<strong>高纖全穀、每天彩虹蔬果、豆類堅果、深海魚與橄欖油</strong>，嚴格限制加工紅肉（香腸、培根、火腿）、含糖飲料與酒精。<br />
          3. <strong>維持健康體重與骨骼健康</strong>：肥胖會產生慢性發炎因子與過量雌激素刺激腫瘤復發；服用乳癌芳香環酶抑制劑（AI）或攝護腺癌荷爾蒙治療者，需定期檢測 DXA 骨密度並補充鈣與維生素 D3。<br />
          4. <strong>正確認識「早期整合緩和醫療（Early Palliative Care）」</strong>：緩和醫療<strong>絕對不等於放棄抗癌治療</strong>！從治療過程中就請疼痛科、緩和醫療科、營養師、心理師與復健科同步介入，控制疼痛、麻木與失眠，能讓抗癌之路走得更有尊嚴、活得更長久。
        </p>
      </Callout>
    </div>
  </div>
);
