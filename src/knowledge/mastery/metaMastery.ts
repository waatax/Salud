/**
 * metaMastery.ts — Medical Informatics & Architecture Clinical Mastery Profiles
 *
 * 6-Dimensional mastery bridging general public intuition with clinical informatics,
 * data provenance, and medical software reliability engineering depth.
 */

import { ClinicalMasteryProfile } from '../../types/knowledge';

export const META_CLINICAL_MASTERY: Record<string, ClinicalMasteryProfile> = {
  'KA-META-001': {
    plain_core_zh:
      '在一本醫學手冊或軟體裡，如果同一個醫學數字在不同的頁面寫法不一樣（例如某一頁寫血壓標準 130，另一頁又寫 140），使用者和醫生就會精神分裂、不知道該相信誰。因此 Salud 系統建立了一條鐵律：同一個醫學數字只允許有一個「唯一的身份證字號」（定量斷言 Claim ID）。改一次，全系統所有地方自動同步更新，絕不鬧雙胞！',
    biochemical_mechanism_zh:
      '醫療資訊學之單一事實來源 (Single Source of Truth, SSOT) 原則：醫學數值在不同生理子系統間具有連鎖關聯性（例如收縮壓 130 mmHg 同時作為高血壓分級閾值、CKD 降壓目標與 SPRINT 評估基準）。若數值在程式碼中以硬編碼字面量 (Hardcoded Literals) 散落分佈，極易因局部分歧修改引發軟體內部語意漂移 (Semantic Drift) 與跨系統醫學矛盾。透過建立專屬的 QuantitativeClaim 實體，將數值、單位、比較運算子及不確定度範圍結構化封裝，提供不可變且具唯一雜湊標識的領域驅動實體。',
    diagnostic_cutoffs_zh:
      'CI 靜態治理規則 VAL-001 檢驗切點：建置自動化掃描腳本，確保儲存庫內所有 QuantitativeClaim ID 在全域範圍內唯一無重複；凡在程式碼中引用之醫學數值若重複出現 ≥2 次，必須百分之百強制綁定至唯一之 QuantitativeClaim 宣告，違者於建置期強制阻斷 (Blocking)。',
    nutritional_protocol_zh:
      '資料驅動之精準生活處方架構：當臨床營養處方（如每日膳食纖維 ≥30g、每日鈉 <2000mg）綁定至唯一 QuantitativeClaim 時，前端無論是計算機工具、衛教卡片或進度追蹤模組，皆自同一個中央資料包進行動態數據水合 (Hydration)，確保使用者在任何頁面所見之飲食數值處方絕對精準一致。',
    drug_interactions_red_flags_zh:
      '在臨床決策支援系統 (CDSS) 中，數值不一致會引發致命性醫療疏失！例如同一款藥物在門診系統與住院系統的腎功能肌酸酐廓清率 (CrCl) 減量切點若有微小出入，可能導致病患服用過量藥物引發急性中毒。SSOT 數值架構從根本上杜絕了軟體邏輯分裂引發的用藥邊界破口。',
    clinical_pearls_myths_zh:
      '【工程師與醫師的協同珍珠】醫學軟體最害怕「工程師自己手動在畫面上改數字」。Salud 將醫學數字獨立提升為一等公民實體，任何數值的修訂必須附帶同儕審查文獻出處，並由醫學專門委員會審核後方可合入主幹。',
  },

  'KA-META-002': {
    plain_core_zh:
      '醫學世界裡充滿了大量的「英文縮寫」，但同一個縮寫在不同科別常常代表完全相反的意思！比如「MS」在心臟科可能代表「二尖瓣狹窄 (Mitral Stenosis)」，在神經科卻代表「多發性硬化症 (Multiple Sclerosis)」。如果不標註清楚，電腦和病人就會張冠李戴、搞出人命。因此系統必須建立「醫學術語字典」，精準消滅一切模稜兩可的歧義！',
    biochemical_mechanism_zh:
      '生物醫學自然語言處理 (BioNLP) 與本體論 (Ontology) 的多義性消除 (Disambiguation)：縮寫詞 (Acronyms) 是臨床溝通的高效載體，但其高熵性與語境依賴性是機器可讀知識圖譜的最大隱患。透過引入國際標準臨床術語集（如 UMLS 統一醫學語言系統、SNOMED CT 概念代碼及 MeSH 主題詞表），為每一個可能產生歧義的縮寫建立專屬的 TerminologyRegistry 映射，確保在序列化為 JSON-LD 或知識圖譜三元組時，其語意概念邊界得到零模糊精準錨定。',
    diagnostic_cutoffs_zh:
      'CI 靜態治理規則 VAL-002 檢驗標準：在系統所有知識陣列中，凡同一個縮寫英文字串可能對應 2 種以上不同臨床展開含義者，必須在 TerminologyRegistry 中完成雙向註冊，且知識點陳述中必須提供完整的中英文全名或透過術語標記進行上下文強綁定，違者觸發 VAL-002 錯誤。',
    nutritional_protocol_zh:
      '大眾科普溝通消歧生活處方：向一般大眾衛教時，系統規定在同一篇文章或卡片中「第一次出現專業醫學縮寫時，必須同時並列通俗中文字詞與英文全稱」（例如：不可直接單寫 CVD，必須寫為「心血管疾病 (Cardiovascular Disease, CVD)」），以大眾能秒懂的日常語言搭建認知橋樑。',
    drug_interactions_red_flags_zh:
      '手寫處方或電子處方縮寫錯誤是全球前三大常見醫療疏失原因！例如將「QD（每日一次）」誤看為「QID（每日四次）」，使心臟病毛地黃類強心藥 (Digoxin) 劑量翻了 4 倍引發致死性心律不整。嚴格的術語驗證系統是保護病患生命安全的數位防火牆。',
    clinical_pearls_myths_zh:
      '【術語治理經驗談】縮寫消歧不僅僅是程式碼檢查，更是跨學科對話的基石。建立清晰的術語消歧字典，能讓跨科會診、健保申報與國際醫學期刊投稿無縫銜接。',
  },

  'KA-META-003': {
    plain_core_zh:
      '看醫學新聞常常看到「吃某種食物讓心臟病風險降低 30%！」「某個習慣讓死亡率暴增 2 倍！」如果沒有問清楚「到底跟誰比？比的是什麼條件？」，這種數字通常全是在耍流氓！醫學研究裡的任何危險倍數（如相對風險 RR 或風險比 HR），必須清清楚楚寫明白「比較基準是什麼（對照組是完全不吃還是吃很少）」以及「吃了多少劑量」，才是真正負責任的科學證據！',
    biochemical_mechanism_zh:
      '流行病學因果推斷 (Causal Inference) 與反事實架構 (Counterfactual Framework)：任何關聯強度指標（相對危險度 RR、勝算比 OR、危險比 HR）在數學本質上皆為兩個特定暴露條件下的條件機率或瞬時危險率比值。若未明確定義暴露變數的邊界（Exposure Definition，如「每日飲酒 ≥48g」vs「偶爾微量飲酒」）以及對照比較基準（Comparator，如「完全終生不吸菸者」vs「已戒菸者」），該效應量將喪失外推性 (External Validity) 並引發嚴重的不可比性偏誤 (Confounding Bias)。',
    diagnostic_cutoffs_zh:
      'CI 靜態治理規則 VAL-003 驗證切點：在所有 EvidenceRecord 與 KnowledgeAtom 實體中，凡聲明特定數值效應量 (Effect Size) 者，其資料結構中必須強制攜帶 `comparator`（明確定義對照組基準）與 `exposure_definition`（明確定義實驗暴露組之量化劑量與時長），缺一不可，否則於 CI 建置階段立即阻斷。',
    nutritional_protocol_zh:
      '解讀飲食營養研究之透鏡心法：教導大眾解讀營養學「有效」宣告：看到「地中海飲食降低 30% 心血管事件」，必須同時告知「對照組是常規一般低脂飲食，且實驗組每天補充了足足 50 mL 初榨橄欖油」，讓大眾了解實際要吃到什麼量、替代了什麼食物，才能複製科學試驗中的健康效益。',
    drug_interactions_red_flags_zh:
      '臨床試驗中新藥宣稱「死亡率相對下降 50%（RR = 0.50）」，往往隱藏了絕對風險 (Absolute Risk Reduction, ARR) 僅僅是從 2% 降到 1%（絕對好處僅 1%，需要治療 100 個人才能拯救 1 個人，NNT = 100）。若缺乏精確的比較基準與絕對數據，病患與醫師極易被誇大的宣傳誤導，承受昂貴藥價與潛在副作用。',
    clinical_pearls_myths_zh:
      '【實證醫學珍珠】沒有對照組的醫學宣稱，就如同沒有度量衡的測量。一個嚴謹的 KnowledgeAtom，其背後的每一條效應量數字都必須經得起方法學的推敲與同儕檢視。',
  },

  'KA-META-004': {
    plain_core_zh:
      '有些網站會在首頁掛上「本站符合最高無障礙標準、所有內容 100% 專家親自審閱」，但後台其實從來沒有任何電腦驗證，全憑小編自己隨手敲字宣傳。在 Salud 系統裡，任何對外的自我宣稱（例如通過 WCAG 2.2 AA 無障礙等級、包含多少條知識點、出處驗證率），都必須由後台全自動的「電腦機器人」即時掃描、產生客觀的 JSON 證明報告，絕不容許半句空口說白話！',
    biochemical_mechanism_zh:
      '「治理即程式碼 (Governance-as-Code)」與持續驗證原則：醫療健康資訊平台的信譽建立在嚴格的客觀可驗證性之上。將軟體工程中的靜態程式碼分析 (AST Parsing)、無障礙樹遍歷 (Accessibility Tree Traversal) 及單元測試框架，整合進 CI/CD 自動化建置管線。平台所宣稱的任何品質屬性，必須直接對應於編譯期間生成的實體機器可讀產出物（如 `a11y-audit.json`、`knowledge-graph.json`），使系統元資料具備防篡改與自動對帳能力。',
    diagnostic_cutoffs_zh:
      'CI 靜態治理規則 VAL-004 規範標準：儲存庫中任何面向使用者展示之自述性統計數據（如全系統知識點總數、WCAG 2.2 AA 無障礙遵循率 100%、出處審核狀態），必須直接由建置腳本自原始資料陣列中動態運算得出，嚴禁於前端 UI 或文檔中以靜態字串手動硬編碼宣稱；驗證不符即判定 CI 失敗。',
    nutritional_protocol_zh:
      '無障礙包容性健康資訊普及原則：為了讓視障長輩、色盲色弱讀者以及使用螢幕報讀器的身心障礙朋友能夠毫無障礙地吸收救命醫學知識，所有營養數據卡片、食物圖片與圖表，皆由自動化無障礙引擎掃描確保 100% 具備符合 WCAG 2.2 AA 規範之顏色對比度 (≥4.5:1) 與完整無誤的替代文字 (Alt text)。',
    drug_interactions_red_flags_zh:
      '若醫療軟體的自我功能宣告與實際系統邏輯脫節（例如宣稱支援藥物交互作用即時警報，但底層資料庫早已過期斷鏈），在臨床現場將直接導致致命漏診與給藥疏失。以機器代碼進行強制合規驗證，是醫療級軟體工程不可妥協的底線。',
    clinical_pearls_myths_zh:
      '【系統工程珍珠】最好的誠信不是自我標榜，而是把自動化測試報告與驗證儀表板直接透明公開。讓每一位使用者與審查委員都能一鍵檢驗系統的真實合規狀態。',
  },

  'KA-META-005': {
    plain_core_zh:
      '醫學知識有兩種完全不同的性質：第一種是「人體的生理鐵律」（例如血壓過高會中風、人每天需要喝水），這在全世界、任何時代都不會變；第二種是「政府的公衛補助政策」（例如台灣 45 歲免費驗大便、今年擴大 40 歲免費照乳房 X 光），這會隨著不同國家和預算法規隨時修改！把這兩者在畫面上分得一清二楚，並標註清楚政策生效年份，才不會讓民眾把政府補助規定誤當成人體生理界線！',
    biochemical_mechanism_zh:
      '知識工程 (Knowledge Engineering) 中的「自然本體 (Natural Ontology)」與「制度本體 (Institutional Ontology)」分離原則：生理生化機制（如 LDL 氧化、心肌缺血、腎小球過濾）屬於客觀自然科學實體，其真值獨立於人為法律體系；而篩檢給付年齡、公費補助門檻、法定傳染病通報標準等則屬於特定管轄區（Jurisdiction）與特定法律體系下的實定政策物件。將二者在領域模型中進行結構化解耦，避免因法規給付政策的週期性修訂而污染底層通用的生理知識圖譜拓撲。',
    diagnostic_cutoffs_zh:
      'CI 靜態治理規則 VAL-005 檢查切點：所有 AssertionKind 標記為 `policy` 之政策類知識點物件，在資料模型中必須硬性包含 `policy_ref_id` 或指向特定 TaiwanPolicy 物件，且政策物件必須具備明確的 `effective_from`（法定生效實施日期）與 `modality_zh`（執行模式）；在 UI 前端渲染時，政策知識點必須使用獨立的政策標籤與色彩主題呈現，與生理知識點形成鮮明視覺隔離。',
    nutritional_protocol_zh:
      '民眾就醫篩檢權益之精準衛教指引：明確引導國人區分「自己的健康檢查需求」與「國家健保公費補助門檻」：例如公費大腸癌篩檢補助起始年齡為 45 歲，但若民眾已有血便或大腸癌一親等家族史，其生理風險早已爆發，絕不可死守著等 45 歲才做檢查，應提前在 40 歲即依生理指引自費或門診就醫排檢。',
    drug_interactions_red_flags_zh:
      '健保藥物給付規定（如特定新藥 PCSK9 抑制劑或 SGLT2i 之健保審查給付適應症）通常比國際醫學指引更為嚴格保守。臨床醫師若將健保給付規定與醫療臨床指南混淆，可能延誤最適合病患的二級預防黃金治療時機。解耦呈現能確保醫患雙方清楚知曉「最佳醫療標準」與「現行給付邊界」之差異。',
    clinical_pearls_myths_zh:
      '【政策認知啟蒙】公衛法規是隨著國家財政與最新實證動態演進的。例如台灣在民國 114 年（2025）正式將公費乳癌篩檢年齡放寬至 40–74 歲，系統明確標註 `effective_from: "2025-01-01"`，即時反映最新制度紅利，確保全民掌握最新醫療權益。',
  },
};
