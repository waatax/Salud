export interface LongevityIterationRound {
  round: number;
  title_zh: string;
  theme_zh: string;
  lead_experts: string[];
  key_debate_zh: string;
  major_revision_zh: string;
  infograph_paired: string;
  readability_enhancement_zh: string;
  knowledge_depth_zh: string;
  consensus_statement_zh: string;
}

export const LONGEVITY_ITERATION_ROUNDS: LongevityIterationRound[] = [
  {
    round: 1,
    title_zh: 'Round 1：12 大衰老分子標誌拓撲圖建構',
    theme_zh: '從 2013 九大標誌升級至 2023 十二大標誌體系 (López-Otín Cell)',
    lead_experts: ['EC-34 分子老年學權威', 'EC-37 粒線體自噬專家'],
    key_debate_zh: '舊版標誌常將自噬失能歸類於蛋白質穩態中，理事會爭辯是否應將「巨自噬失能 (Disabled Macroautophagy)」與「腸道菌群失衡 (Dysbiosis)」獨立為一級標誌。',
    major_revision_zh: '採納 Cell 2023 最新共識，嚴格將 12 大標誌分類為三大層級：損傷起因型 (Primary)、代償拮抗型 (Antagonistic) 與綜合表型型 (Integrative)，確立因果鏈路。',
    infograph_paired: 'InfographHallmarksWheel (12 大標誌動態三環拓撲圖)',
    readability_enhancement_zh: '設計三層色彩輪環，點擊任一標誌即時展開分子級聯路徑 (Molecular Cascade) 與代表性生物標記。',
    knowledge_depth_zh: '深入 ATM/ATR 激酶、$\\gamma$-H2AX 焦點計數、Shelterin 複合體崩解與 LINE-1 反轉錄轉座子活化機制。',
    consensus_statement_zh: '抗老不能只頭痛醫頭，必須從原始原因層（基因、端粒、表觀、自噬）切斷損傷，防範代償性拮抗層失控。',
  },
  {
    round: 2,
    title_zh: 'Round 2：三代表觀遺傳時鐘與 DunedinPACE 實時老化步速儀',
    theme_zh: '歷法年齡 vs 生物學年齡之多代算法與 9 大血液常規生物標記',
    lead_experts: ['EC-35 表觀遺傳學家', 'EC-40 系統生物學家'],
    key_debate_zh: '第一代 Horvath 時鐘測量的是日曆歲數，無法反應生活方式介入的短期改善；如何讓一般民眾在不花費高昂 DNA 測序費用下量化自身衰老？',
    major_revision_zh: '同時納入第三代 DunedinPACE 速率時鐘概念，並整合 Morgan Levine 的 9 項血液常規生化指標算法 (PhenoAge)，讓用戶持一般健康檢查報告即可評估生物年齡。',
    infograph_paired: 'InfographEpigeneticClocks (DunedinPACE 儀表盤 + 9 大生化標記計算法)',
    readability_enhancement_zh: '提供指針式儀表視覺，以 0.8x（慢速老化）、1.0x（平均）、1.2x（加速老化）直觀呈現衰老速率。',
    knowledge_depth_zh: '深入解析 RDW（紅血球分佈寬度）、hs-CRP、白蛋白在表觀遺傳年齡加速模型中的統計迴歸權重。',
    consensus_statement_zh: '生物年齡是可以逆轉的動態指標；DunedinPACE 每降低 0.1，相當於早死風險降低 15% 以上。',
  },
  {
    round: 3,
    title_zh: 'Round 3：ITP 長壽化合物與藥物實證雷達評估',
    theme_zh: 'NIH 老年幹預測試計劃 (ITP) 嚴謹數據與人體臨床安全門檻',
    lead_experts: ['EC-36 抗衰藥物學家', 'EC-38 臨床長壽專科醫師'],
    key_debate_zh: '民間熱炒 NMN、雷帕黴素與二甲雙胍，但存在過度神化與忽視人體副作用（如雷帕黴素高血糖、二甲雙胍鈍化肌肥大）之亂象。',
    major_revision_zh: '引進 NIH ITP 金標準小鼠重現性數據，並建立「人體臨床實證、壽命潛力、安全性、可及性、生物標記影響」五維度雷達圖，嚴格標註禁忌與脈衝給藥法。',
    infograph_paired: 'InfographLongevityCompounds (ITP 化合物五維雷達與臨床熱力圖)',
    readability_enhancement_zh: '直觀標示化合物臨床分期（已上市/II期臨床/動物實驗）與 ITP 壽命延長比例標籤。',
    knowledge_depth_zh: '詳述雷帕黴素「每週單次脈衝 (Pulse Dosing, 3~6mg/wk)」避免抑制 mTORC2 的藥理學機制。',
    consensus_statement_zh: '長壽藥物必須遵循「最低有效劑量」與「間歇脈衝」原則，嚴禁無醫療監控下自行大劑量連續濫用。',
  },
  {
    round: 4,
    title_zh: 'Round 4：殭屍細胞清除與 SASP 旁分泌毒性阻斷',
    theme_zh: '細胞衰老微環境淨化與 Senolytics / Senomorphics 靶向作劑',
    lead_experts: ['EC-36 抗衰藥物學家', 'EC-34 分子老年學權威'],
    key_debate_zh: '衰老細胞具有抗凋亡促存活通路 (SCAP)，直接使用腫瘤化療藥達沙替尼具有骨髓抑制風險，如何設定臨床適用邊界？',
    major_revision_zh: '明確區分 Senolytics（誘導凋亡）與天然 Senomorphics（如非瑟酮 Fisetin、槲皮素抑制 SASP），推廣 Mayo Clinic 的「Hit-and-Run (打帶跑)」連續 2 天即停藥安全協議。',
    infograph_paired: 'InfographSenescenceSASP (殭屍細胞旁分泌感染與清除示意圖)',
    readability_enhancement_zh: '用生動的「殭屍傳染 vs 靶向消滅」圖解，直觀呈現衰老細胞釋放 IL-6/TNF-$\\alpha$ 破壞周邊組織的過程。',
    knowledge_depth_zh: '解碼 $p16^{INK4a}$ / $p21^{CIP1}$ 細胞週期制動點與 BCL-2 / BCL-xL 抗凋亡結點的生化干預途徑。',
    consensus_statement_zh: '內臟脂肪是人體最大的殭屍細胞蓄積庫！減重降脂本質上就是最強大的內源性 Senolytic 療法。',
  },
  {
    round: 5,
    title_zh: 'Round 5：激效反應 (Hormesis) 與極端環境適應醫學',
    theme_zh: '桑拿熱休克蛋白、低溫冷休克蛋白、斷食自噬與 Zone 2 粒線體基石',
    lead_experts: ['EC-39 激效生理學家', 'EC-33 運動生理學權威'],
    key_debate_zh: '冷水澡與高溫桑拿是否越冷、越熱、越久越好？過度壓力是否會轉化為有害氧化損傷？',
    major_revision_zh: '繪製「激效壓力 U 型劑量曲線」，確立精確的臨床有效劑量（芬蘭桑拿 80~90°C 每週 4~7 次、每次 15~20 分鐘；冷暴露 10~14°C 每週累積 $\\ge 11$ 分鐘）。',
    infograph_paired: 'InfographHormesisProtocol (激效 U 型曲線與 24 小時抗老作息指南)',
    readability_enhancement_zh: '提供視覺化 24 小時抗老日程排程卡片，標記早晨冷水、午後 Zone 2、傍晚桑拿的最佳時序。',
    knowledge_depth_zh: '詳述冷休克蛋白 RBM3 重構大腦神經元突觸棘之神經保護機制，以及 Kuopio 桑拿研究降低 66% 失智風險之內皮一氧化氮 (eNOS) 調控。',
    consensus_statement_zh: '舒適是長壽的毒藥；微小且規律的環境物理壓力才能喚醒人體深藏的百萬年抗逆修復基因。',
  },
  {
    round: 6,
    title_zh: 'Round 6：動態生理年齡與壽命軌跡模擬器 (SimLongevityTrajectory)',
    theme_zh: 'James Fries 疾病壓縮理論 (Morbidity Compression) 與健康壽命模擬',
    lead_experts: ['EC-40 系統生物學家', 'EC-38 臨床長壽專科醫師'],
    key_debate_zh: '大眾常將長壽誤解為「多活幾年臥床失能的日子」，缺乏對「健康壽命 (Healthspan)」與「平均壽命 (Lifespan)」落差的直觀認知。',
    major_revision_zh: '研發動態 SVG 壽命軌跡模擬器，讓用戶自由調節運動、睡眠、桑拿、飲食熱量限制與體脂率，動態觀察「失能期壓縮」與生物年齡逆轉。',
    infograph_paired: 'SimLongevityTrajectory (互動式健康壽命動態軌跡模擬器)',
    readability_enhancement_zh: '視覺化陰影區呈現「疾病壓縮帶 (Morbidity Compression Zone)」，並以紅綠雙線對比自然衰老 vs 積極長壽干預。',
    knowledge_depth_zh: '演算法整合 DunedinPACE 衰老速率修正係數、VO2 Max 死亡風險乘數與 BMI 內臟脂肪表觀遺傳加速懲罰。',
    consensus_statement_zh: '長壽醫學的終極榮耀，是讓人在 90 歲高齡時依然能自主登高健行，並在生命終點以最短時間安詳謝幕。',
  },
  {
    round: 7,
    title_zh: 'Round 7：長壽精熟測驗與跨支柱聯防大一統矩陣',
    theme_zh: '肥胖、睡眠、運動、心理、營養與抗老化之六維立體整合',
    lead_experts: ['EC-34 分子老年學權威', 'EC-28 肥胖專科醫師', 'EC-32 行為心理學家'],
    key_debate_zh: '如何防範抗老化專區成為一座孤立的學術象牙塔，確保其與既有的肥胖、運動、睡眠專區無縫協同？',
    major_revision_zh: '編制 14 道臨床案例精熟測驗題（答對全螢幕彩帶慶祝、答錯一鍵導流複習），並架構「長壽跨支柱聯防矩陣」，明確指出內臟脂肪為 SASP 毒源、慢波睡眠為大腦膠淋巴排毒窗。',
    infograph_paired: 'InfographLongevitySynergy (全人長壽跨支柱雷達 + LongevityMasteryQuiz)',
    readability_enhancement_zh: '全螢幕慶祝彩帶 (canvas-confetti)、診斷式反饋、單鍵跨專區跳轉導航。',
    knowledge_depth_zh: '打通膠淋巴系統 A$\\beta$ 清除、骨骼肌 Irisin/BDNF 釋放、皮質醇端粒侵蝕與脂毒性表觀遺傳時鐘的跨學科因果網絡。',
    consensus_statement_zh: '抗老化是 Salud 全部健康支柱的交匯總終點；維持健康體組成、優質睡眠、規律阻抗與心理韌性，就是最好的長壽處方。',
  },
];
