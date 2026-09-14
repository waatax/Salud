export interface RpdcaStep {
  phase: 'R' | 'P' | 'D' | 'C' | 'A';
  name_zh: string;
  tagline_zh: string;
  core_actions: string[];
  clinical_standard_zh: string;
}

export const GRAND_COUNCIL_MANIFESTO = {
  version: 'v1.0.0 Official Release (Gold Master)',
  release_date: '2026-09-14',
  title_zh: 'Salud v1.0 全人健康長壽大憲章 (Salud v1.0 Unified Health & Longevity Charter)',
  title_en: 'Salud v1.0 Unified Health & Longevity Charter',
  proclamation_zh:
    '我們，Salud 40 席跨領域專家理事會全體成員，在此鄭重宣告：人體不是孤立運作的零件集合，而是一個由生化受體、神經迴路、晝夜節律、代謝流與表觀遺傳交織構成的高階複雜系統。我們堅決拒絕片面零碎的偏方與商業炒作，以嚴謹的分子機轉、人體 RCT 臨床試驗數據、個人化動態模擬器與實證安全防火牆，為全人類打造最可信賴的現代健康長壽數位基建。',
  three_councils: [
    {
      id: 'COUNCIL_SYSTEMS',
      title_zh: '一、基礎人體系統與超健康專門委員會',
      seats: 'EC-01 ~ EC-12, EC-25 ~ EC-27 (共 15 席)',
      focus_zh: '消化、心血管、神經、內分泌、呼吸、免疫、肌肉骨骼、腎臟八大人體系統解剖生理，以及個人超健康 (Ultra-Health) 整合工程。',
    },
    {
      id: 'COUNCIL_METABOLIC',
      title_zh: '二、代謝醫學與肥胖專科專門委員會',
      seats: 'EC-28 ~ EC-33 (共 6 席)',
      focus_zh: '愛德蒙頓肥胖分級 (EOSS)、下視丘食慾神經調控、GLP-1/GIP 雙/三重促效劑三期臨床試驗、8 大飲食法雷達對比與減重代謝外科。',
    },
    {
      id: 'COUNCIL_LONGEVITY',
      title_zh: '三、長壽醫學與衰老生物學專門委員會',
      seats: 'EC-34 ~ EC-40 (共 7 席)',
      focus_zh: 'López-Otín 12 大衰老分子標誌 (Cell 2023)、DNA 甲基化表觀時鐘 (DunedinPACE)、ITP 長壽化合物、殭屍細胞清除與激效適應醫學。',
    },
    {
      id: 'COUNCIL_PERFORMANCE',
      title_zh: '四、運動科研、睡眠修復與心理韌性專門委員會',
      seats: 'EC-13 ~ EC-24 (共 12 席)',
      focus_zh: '心肺耐力 (VO2 Max)、Zone 2 粒線體密度、專項球類運動、深層慢波睡眠膠淋巴清運、TFDA 保健食品法規防火牆與 0.1Hz 自主神經呼吸。',
    },
  ],
};

export const RPDCA_METHODOLOGY_MATRIX: RpdcaStep[] = [
  {
    phase: 'R',
    name_zh: 'Research (深度文獻綜述與醫學證據萃取)',
    tagline_zh: '以 NEJM、Lancet、Cell、JAMA、Nature Medicine 頂尖期刊為底座',
    core_actions: [
      '全面梳理 STEP 1~8、SURMOUNT 1~5 與 SELECT 數萬人抗肥胖三期臨床試驗原始數據',
      '引進 NIH Interventions Testing Program (ITP) 小鼠壽命延長金標準重現性資料庫',
      '匯總芬蘭 Kuopio 20 年桑拿世代研究、PREDIMED 地中海試驗與 Morgan Levine 9 生化標記 PhenoAge 算法',
      '嚴格審核 TFDA 與 FDA 藥物警戒黑框標籤，排查一切未經驗證的偽科學宣稱',
    ],
    clinical_standard_zh: '全站知識點嚴格標註 Grade A~E 實證等級，無對照試驗之論述一律標示警示。',
  },
  {
    phase: 'P',
    name_zh: 'Plan (內容架構編排與本體論統一規劃)',
    tagline_zh: '劃分 9 大核心健康支柱與 40 席專家治理架構',
    core_actions: [
      '建立跨支柱統一資料型別 (TypeScript 0-Error 嚴格型別架構)',
      '規劃「3 大動態生理模擬器 + 7 大互動 INFOGRAPH + 適應性診斷測驗」之資訊層次',
      '設計支援暗黑/亮色主題與觸覺反饋 (btn-tactile) 之 WCAG 2.2 AA 高對比度 UI/UX 系統',
      '梳理「肥胖內臟脂肪 SASP ➔ 長壽表觀加速」之雙向病理聯防路徑',
    ],
    clinical_standard_zh: '打破各專科單打獨鬥之壁壘，確保用戶在任一專區均能一鍵跳轉關聯支柱。',
  },
  {
    phase: 'D',
    name_zh: 'Do (互動工具與臨床知識模組敏捷開發)',
    tagline_zh: '將冰冷教科書轉化為可拖曳、可操作之互動工具',
    core_actions: [
      '開發 52 週動態體重軌跡模擬器 (SimWeightTrajectory)：動態演算去脂肌肉防禦與停藥反彈',
      '開發健康壽命與疾病壓縮雙曲線模擬器 (SimLongevityTrajectory)：即時演算生物年齡逆轉',
      '開發 0.1Hz 共振呼吸動效儀 (SimBreathwork) 與 15 分鐘衝動衝浪倒數計時器 (UrgeSurfingTimer)',
      '編繪 12 大衰老標誌全景拓撲輪環、三代表觀時鐘速度計與台灣外食紅黃綠燈指南',
    ],
    clinical_standard_zh: '所有計算引擎皆具備不確定性頻寬 (Uncertainty Band)，坦誠揭示生理個體差異。',
  },
  {
    phase: 'C',
    name_zh: 'Check (交互作用防火牆與禁忌症安全查核)',
    tagline_zh: '安全第一！絕不給出可能危害用戶生命的偏激建議',
    core_actions: [
      '建立用藥交互作用防火牆：示警 GLP-1 延遲胃排空對口服避孕藥吸收峰值之衝擊',
      '排查降血糖藥物（胰島素、SU）併用 GLP-1 時之致死性低血糖級聯風險',
      '標註雷帕黴素對活動性感染者禁用、二甲雙胍肌酐清除率 eGFR < 30 乳酸中毒警訊',
      '標記冷水浴對嚴重心律不整、桑拿對不穩定心絞痛與主動脈狹窄之嚴格禁忌',
    ],
    clinical_standard_zh: '高風險項目均配備紅色警示徽章與「先諮詢主治醫師」法定安全提示閘。',
  },
  {
    phase: 'A',
    name_zh: 'Act / Adjust (適應性回饋、測驗補強與部署閉環)',
    tagline_zh: '形成測驗診斷 ➔ 一鍵專區複習 ➔ 終身習慣維持之完整學習閉環',
    core_actions: [
      '編制 12 題肥胖精熟測驗與 14 題長壽精熟測驗，答對全螢幕彩帶祝賀，答錯即刻導流複習',
      '打造 7 輪肥胖與 7 輪長壽專家會議紀要，完整公開理事會爭辯焦點與裁決理由',
      '部署 GitHub Actions 自動化 CI/CD 流水線，即時更新發布至 GitHub Pages',
      '建立版本迭代歷史記錄與全體專家簽署大憲章，接受全球讀者與醫學同行檢驗',
    ],
    clinical_standard_zh: '落實持續改善精神，根據最新大型臨床試驗發表即時動態滾動修正。',
  },
];
