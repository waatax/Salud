import { EvidenceUpdate, UpdateCategory } from '../../types/learning';

/**
 * Practice-changing guidelines and trials, 2024-2026, each translated into
 * "what changed" and "what it means for you".
 *
 * Inclusion rule: a major guideline body, a government programme, or a large RCT /
 * meta-analysis in a top journal. Every entry carries a caveat when the finding is
 * easy to over-apply. Retrieved and checked 2026-09.
 */
export const EVIDENCE_UPDATES: EvidenceUpdate[] = [
  // ── Heart & circulation ──────────────────────────────────────────────
  {
    id: 'UPD-2026-LIPID',
    date: '2026-03',
    category: 'heart',
    org: 'ACC/AHA 多學會 2026 血脂異常指引',
    title_zh: '美國新血脂指引：LDL 有了分級目標，每個成人一生至少驗一次 Lp(a)',
    what_changed_zh:
      '睽違 8 年改版。重新設定 LDL-C 目標：一般族群 <100 mg/dL、高風險或曾有心血管事件 <70 mg/dL、極高風險 <55 mg/dL；建議所有成人一生至少檢測一次脂蛋白(a)，≥125 nmol/L（約 50 mg/dL）視為風險增強因子；風險評估改用 PREVENT 計算器；兒童在 9–11 歲做一次普遍性血脂篩檢。',
    what_it_means_zh:
      '健檢報告上的 LDL 不再只有「正常/異常」，而是要看「你屬於哪個風險層級、目標是多少」。Lp(a) 幾乎由基因決定、生活型態改不太動，驗一次就知道自己是否需要更積極控制 LDL 與血壓。',
    numbers: [
      { label_zh: '極高風險 LDL 目標', value: '<55 mg/dL' },
      { label_zh: 'Lp(a) 風險增強門檻', value: '≥125 nmol/L' },
      { label_zh: '兒童普篩年齡', value: '9–11 歲' },
    ],
    caveat_zh: '指引也明確表示：不建議用保健食品（紅麴、魚油膠囊等）取代降 LDL 藥物；常規檢測顆粒大小等進階血脂檢驗也不被建議。',
    url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000001423',
    related_hash: 'cardiometabolic/LIPIDS_APOB',
  },
  {
    id: 'UPD-2025-TW-LIPID',
    date: '2025-01',
    category: 'heart',
    org: '台灣 2025 血脂管理臨床路徑共識',
    title_zh: '台灣版 LDL 目標：依風險分五級，從 <130 到 <55 mg/dL',
    what_changed_zh:
      '台灣內科醫學會與健保署共同提出臨床路徑：低風險（1 項危險因子）<130、中風險（≥2 項）<115、高風險（糖尿病、慢性腎臟病、LDL ≥190 或冠狀動脈鈣化分數 ≥400）<100、非常高風險（已有冠心病、中風、周邊動脈疾病）<70、極高風險（近期心肌梗塞、多次事件等）<55 mg/dL。',
    what_it_means_zh:
      '拿到報告先問醫師三件事：我是哪一級風險？我的 LDL 目標是多少？差距要怎麼補？低到中風險者可先做 3–6 個月生活調整再複查；高風險以上通常需要藥物。',
    numbers: [
      { label_zh: '低風險', value: '<130' },
      { label_zh: '高風險（含糖尿病、CKD）', value: '<100' },
      { label_zh: '已有心血管疾病', value: '<70' },
    ],
    url: 'https://www.tsim.org.tw/ehc-tsim/s/viewFile?documentId=cfbd43c6ce2945d3bbab029c1607ddbd',
    related_hash: 'checkup',
  },
  {
    id: 'UPD-2025-ESC-LIPID',
    date: '2025-08',
    category: 'heart',
    org: 'ESC/EAS 2025 血脂指引焦點更新',
    title_zh: '歐洲指引同步：Lp(a) >50 mg/dL 屬心血管危險因子，所有成人至少驗一次',
    what_changed_zh:
      '歐洲心臟學會把 Lp(a) >50 mg/dL（105 nmol/L）明列為危險因子，並建議每位成人至少檢測一次；風險評估改用 SCORE2 / SCORE2-OP；新增 bempedoic acid 等非 statin 降脂選項。',
    what_it_means_zh:
      '歐美兩大指引在 2025–2026 年對 Lp(a) 達成共識：這是一項「一輩子驗一次就夠」的遺傳指標。家族有早發心臟病者更應主動詢問。',
    url: 'https://academic.oup.com/eurheartj/article/46/42/4359/8234482',
    related_hash: 'cardiometabolic/LIPIDS_APOB',
  },
  {
    id: 'UPD-2025-HTN',
    date: '2025-08',
    category: 'heart',
    org: 'AHA/ACC 2025 高血壓指引',
    title_zh: '美國新版高血壓指引：130/80 就要處理，並把失智預防納入理由',
    what_changed_zh:
      '分級不變：正常 <120/<80、偏高 120–129/<80、第 1 期 130–139 或 80–89、第 2 期 ≥140 或 ≥90 mmHg。新重點：以 PREVENT 計算器估 10 年風險；第 1 期且風險 <7.5% 者先做 3–6 個月生活調整，無效就用藥；≥140/90 建議直接以雙藥合併起始；所有高血壓患者都應驗尿液白蛋白/肌酸酐比值（UACR）；鈉攝取目標 <2,300 mg，理想 1,500 mg/天。',
    what_it_means_zh:
      '「130 多一點還好吧」的觀念要改。收縮壓控制在 <130 mmHg 也被認為有助降低輕度認知障礙與失智風險。居家血壓（台灣 722 量法）比診間單次數字更能代表你的真實血壓。',
    numbers: [
      { label_zh: '第 1 期高血壓', value: '≥130/80' },
      { label_zh: '雙藥起始門檻', value: '≥140/90' },
      { label_zh: '理想鈉攝取', value: '1,500 mg/天' },
    ],
    caveat_zh: '減重至少 5%、每週 75–150 分鐘運動、DASH 飲食與限酒（男 ≤2、女 ≤1 份/天）仍是所有人的第一線處方。',
    url: 'https://newsroom.heart.org/news/new-high-blood-pressure-guideline-emphasizes-prevention-early-treatment-to-reduce-cvd-risk',
    related_hash: 'cardiometabolic/BP_722',
  },
  {
    id: 'UPD-2025-CPR',
    date: '2025-10',
    category: 'emergency',
    org: 'AHA 2025 心肺復甦術指引',
    title_zh: '成人異物哽塞新做法：背部拍擊 5 下與腹部推擠 5 下交替',
    what_changed_zh:
      '2020 年後首次全面改版。清醒的成人或兒童哽塞時，建議交替進行 5 次背部拍擊與 5 次腹部推擠（哈姆立克法），直到異物排出或患者失去反應；失去反應就立即開始 CPR。生存之鏈整合為一條；新增疑似鴉片類藥物過量的處置流程；12 歲以上兒童即可學會有效的 CPR 與 AED 操作。',
    what_it_means_zh:
      '看到有人倒下：確認無反應、無正常呼吸 → 大聲求救、打 119、請人拿 AED → 立即胸外按壓（每分鐘 100–120 下、深度約 5 公分）。按壓不能等。',
    url: 'https://newsroom.heart.org/news/updated-cpr-guidelines-tackle-choking-response-opioid-related-emergencies-and-a-revised-chain-of-survival',
    related_hash: 'systems/cardiovascular/flags',
  },

  // ── Metabolism, weight & liver ───────────────────────────────────────
  {
    id: 'UPD-2025-OBESITY-DEF',
    date: '2025-01',
    category: 'metabolic',
    org: 'Lancet 糖尿病與內分泌期刊 全球委員會',
    title_zh: '肥胖重新定義：不再只看 BMI，區分「臨床肥胖」與「臨床前肥胖」',
    what_changed_zh:
      '由 58 位專家提出：BMI 只能當初篩，必須再加上至少一項體型指標（腰圍、腰臀比，或腰圍身高比 >0.5）或直接測量體脂，才能確認脂肪過多。脂肪過多且已造成器官功能異常或日常活動受限者稱為「臨床肥胖」（一種疾病，需治療）；尚未造成器官損害者為「臨床前肥胖」（風險狀態，需預防）。',
    what_it_means_zh:
      '肌肉多的人 BMI 高不一定是肥胖；BMI 正常但腰圍過粗，反而可能有問題。在家就能做的檢查：腰圍 ÷ 身高，超過 0.5 就值得注意。',
    numbers: [{ label_zh: '腰圍身高比警戒值', value: '>0.5' }],
    url: 'https://www.thelancet.com/journals/landia/article/PIIS2213-8587(24)00316-4/fulltext',
    related_hash: 'obesity',
  },
  {
    id: 'UPD-2025-WHO-GLP1',
    date: '2025-12',
    category: 'metabolic',
    org: '世界衛生組織 WHO',
    title_zh: 'WHO 首部 GLP-1 肥胖用藥指引：可長期使用，但要搭配生活型態治療',
    what_changed_zh:
      'WHO 對 liraglutide、semaglutide 與 tirzepatide 提出「有條件建議」：成人（孕婦除外）肥胖可長期（至少 6 個月以上）使用；並建議搭配密集行為治療，在慢性病照護模式中提供。證據等級為中等，原因是長期效果、停藥後復胖與費用仍不確定。',
    what_it_means_zh:
      '世界衛生組織正式把肥胖視為需要長期管理的慢性病。這類藥物不是短期「減肥針」——多數人停藥後體重會回升，必須與醫師討論長期計畫，並同時做肌力訓練與攝取足夠蛋白質以保住肌肉。',
    caveat_zh: '孕婦、備孕者、有甲狀腺髓質癌或多發性內分泌腫瘤第二型家族史者不適用；使用前需醫師評估。',
    url: 'https://www.who.int/news/item/01-12-2025-who-issues-global-guideline-on-the-use-of-glp-1-medicines-in-treating-obesity',
    related_hash: 'obesity/PHARMACOTHERAPY',
  },
  {
    id: 'UPD-2025-SURMOUNT5',
    date: '2025-05',
    category: 'metabolic',
    org: 'NEJM：SURMOUNT-5 頭對頭試驗',
    title_zh: '減重藥正面對決：tirzepatide 72 週減 20.2%，semaglutide 減 13.7%',
    what_changed_zh:
      '751 位無糖尿病的肥胖成人，隨機分配每週注射 tirzepatide（GIP/GLP-1 雙重促效劑）或 semaglutide（GLP-1 促效劑）72 週。平均體重下降 20.2% 對 13.7%；體重下降至少 30% 的比例為 19.7% 對 6.9%，腰圍減少也較多。',
    what_it_means_zh:
      '兩種藥都有效，差別在幅度、副作用耐受度、價格與取得性。選藥應與醫師依共病（心臟病、睡眠呼吸中止、脂肪肝）與預算共同決定。',
    url: 'https://www.nejm.org/doi/abs/10.1056/NEJMoa2416394',
    related_hash: 'obesity/PHARMACOTHERAPY',
  },
  {
    id: 'UPD-2026-ORAL-GLP1',
    date: '2026-04',
    category: 'metabolic',
    org: '美國 FDA',
    title_zh: '口服減重藥上市：semaglutide 錠劑（2025/12）與 orforglipron（2026/4）',
    what_changed_zh:
      'FDA 於 2025 年 12 月核准每日一次口服 semaglutide 用於肥胖（OASIS 4 試驗 64 週平均減重約 14–17%，視是否持續服藥而定）；2026 年 4 月再核准 Lilly 的小分子口服 GLP-1 藥物 orforglipron，可在一天任何時間服用、不受進食與喝水限制。',
    what_it_means_zh:
      '怕打針的人多了選擇。但口服 semaglutide 需空腹、配少量水、服藥後 30 分鐘內不能進食；各國核准與健保給付時程不同，台灣上市與價格請以食藥署公告為準。',
    url: 'https://www.healio.com/news/endocrinology/20260401/fda-approves-orforglipron-an-oral-glp1-for-adults-with-obesity',
    related_hash: 'obesity/PHARMACOTHERAPY',
  },
  {
    id: 'UPD-2025-MASH',
    date: '2025-08',
    category: 'metabolic',
    org: '美國 FDA／ESSENCE 試驗',
    title_zh: '脂肪肝炎有藥了：semaglutide 核准用於中重度纖維化的 MASH',
    what_changed_zh:
      '脂肪肝已改名為「代謝功能障礙相關脂肪性肝病」（MASLD），發炎者稱 MASH。ESSENCE 試驗 72 週肝切片顯示：約 63% 患者 MASH 緩解（安慰劑 34%）、37% 纖維化改善（安慰劑 22%）。FDA 據此核准用於 F2–F3 纖維化、非肝硬化的成人。',
    what_it_means_zh:
      '脂肪肝不是「很普遍所以沒關係」。先用 FIB-4（年齡、AST、ALT、血小板算出）篩纖維化風險；減重 7–10% 仍是最有效的第一線治療，藥物是給已有明顯纖維化的人。',
    url: 'https://www.ajmc.com/view/fda-approves-semaglutide-for-mash-with-fibrosis',
    related_hash: 'systems/digestive/conditions',
  },
  {
    id: 'UPD-2026-ADA',
    date: '2025-12',
    category: 'metabolic',
    org: '美國糖尿病學會 ADA 2026 照護標準',
    title_zh: '糖尿病照護 2026：確診時就可考慮連續血糖監測，肥胖篩檢要加體脂指標',
    what_changed_zh:
      '建議從確診起即可考慮使用連續血糖監測（CGM）；每年篩檢過重與肥胖時，除了 BMI 還要加一項體脂指標；以減重 5–7% 改善血糖與心血管代謝風險；首次支持第 1 型糖尿病合併肥胖者使用 GLP-1 類藥物。',
    what_it_means_zh:
      '「糖化血色素 5.7–6.4% 的糖尿病前期」是最值得投資的窗口：減重 5–7% 加上每週 150 分鐘運動，可大幅延後或避免進展成糖尿病。',
    url: 'https://diabetesjournals.org/care/article/49/Supplement_1/S6/163930/Summary-of-Revisions-Standards-of-Care-in-Diabetes',
    related_hash: 'systems/endocrine/conditions',
  },

  // ── Diet ─────────────────────────────────────────────────────────────
  {
    id: 'UPD-2026-DGA',
    date: '2026-01',
    category: 'diet',
    org: '美國飲食指南 2025–2030',
    title_zh: '美國新飲食指南：吃「真食物」、蛋白質提高到每公斤 1.2–1.6 克',
    what_changed_zh:
      '首次給出以體重計算的蛋白質建議：每天每公斤體重 1.2–1.6 公克（舊建議量 0.8 的 1.5–2 倍）；明確表示健康飲食不需要任何添加糖；飽和脂肪上限維持總熱量 10%；強調避開高度加工食品與精製碳水。',
    what_it_means_zh:
      '對台灣讀者，重點是「每餐有一掌心蛋白質、少吃加工品」。60 公斤成人約需 72–96 克蛋白質，最好分散在三餐。',
    caveat_zh:
      '哈佛公衛學院等批評：新版圖像大量呈現紅肉、奶油與全脂乳品，與「飽和脂肪 ≤10%」互相矛盾，且未區分植物性與紅肉蛋白質的健康差異。慢性腎臟病患者蛋白質需求不同，須遵醫囑。',
    url: 'https://nutritionsource.hsph.harvard.edu/2026/01/09/dietary-guidelines-for-americans-2025-2030/',
    related_hash: 'diet',
  },
  {
    id: 'UPD-2025-UPF',
    date: '2025-11',
    category: 'diet',
    org: 'The Lancet 超加工食品系列',
    title_zh: 'Lancet 三篇系列：超加工食品危害幾乎每個器官系統，應立即採取行動',
    what_changed_zh:
      '由 43 位國際學者撰寫。整合證據顯示，大量攝取超加工食品與早逝、心血管疾病、肥胖、第 2 型糖尿病、憂鬱等多種慢性病風險上升相關；機制包括能量密度高、過度美味導致吃過量、植化素減少與有害物質增加。作者認為證據已足以支持公共政策介入。',
    what_it_means_zh:
      '辨認超加工食品的簡單方法：成分表出現家裡廚房不會用的東西（乳化劑、香料、色素、改質澱粉、高果糖糖漿）。不必追求零，先把「最常吃的一樣」換成原型食物。',
    caveat_zh: '多數證據來自觀察性研究；個別產品差異大（例如無糖優格、全穀麵包也可能被歸類為超加工）。',
    url: 'https://www.thelancet.com/series-do/ultra-processed-food',
    related_hash: 'diet/patterns',
  },
  {
    id: 'UPD-2025-SALT',
    date: '2025-01',
    category: 'diet',
    org: '世界衛生組織 WHO',
    title_zh: 'WHO 建議用「低鈉鹽（含鉀鹽）」取代一般食鹽',
    what_changed_zh:
      '在「每日鈉攝取 <2 公克（約食鹽 5 公克）」的強建議之外，WHO 首次提出有條件建議：一般成人可改用以氯化鉀取代部分氯化鈉的低鈉鹽，同時降低鈉、增加鉀，雙重降血壓。',
    what_it_means_zh:
      '換鹽是最省力的降壓習慣之一，但「低鈉」不等於可以多加。台灣人鈉攝取主要來自外食與醬料，少用醬料、湯不喝完效果更大。',
    caveat_zh: '慢性腎臟病、服用保鉀利尿劑（如 spironolactone）、ACE 抑制劑或 ARB 且腎功能不佳者、以及孕婦與兒童，不適用含鉀低鈉鹽，可能導致高血鉀。',
    url: 'https://www.ncbi.nlm.nih.gov/books/NBK612035/',
    related_hash: 'W',
  },
  {
    id: 'UPD-2025-ALCOHOL',
    date: '2025-01',
    category: 'diet',
    org: '美國衛生總署署長 健康公告',
    title_zh: '酒精是第三大可預防致癌因子：每天一杯以內也會增加乳癌、口腔與咽喉癌風險',
    what_changed_zh:
      '公告整理證據指出，酒精與至少 7 種癌症有因果關係（乳癌、大腸直腸癌、食道癌、喉癌、肝癌、口腔癌、咽癌），僅次於菸草與肥胖；在美國每年約 10 萬例癌症與 2 萬例癌症死亡與飲酒有關；風險與酒的種類無關，喝越多風險越高。',
    what_it_means_zh:
      '「適量飲酒護心」的說法已被大幅修正。台灣近半數人帶有 ALDH2 缺乏基因（喝酒臉紅），乙醛累積使食道癌風險更高——臉紅就是身體的警報，不是酒量問題。',
    url: 'https://www.npr.org/2025/01/03/nx-s1-5245794/alcohol-cancer-risk-surgeon-general',
    related_hash: 'A',
  },

  // ── Movement ─────────────────────────────────────────────────────────
  {
    id: 'UPD-2025-STEPS',
    date: '2025-07',
    category: 'exercise',
    org: 'The Lancet Public Health 統合分析',
    title_zh: '每天 7,000 步就有顯著好處，不一定要一萬步',
    what_changed_zh:
      '整合 57 篇研究、超過 16 萬人。與每天 2,000 步相比，每天約 7,000 步者全因死亡風險低 47%、心血管疾病低 25%、失智低 38%、憂鬱症狀低 22%、跌倒低 28%、第 2 型糖尿病低 14%。超過 7,000 步後多數效益趨於平緩。',
    what_it_means_zh:
      '從現在的步數每天多走 1,000 步開始，逐步往 7,000 步推進。對久坐族，最大的好處發生在「從很少動到有動」這一段。',
    numbers: [
      { label_zh: '全因死亡', value: '−47%' },
      { label_zh: '失智', value: '−38%' },
      { label_zh: '跌倒', value: '−28%' },
    ],
    caveat_zh: '為觀察性研究的統合，步數高的人可能本來就較健康；不代表 10,000 步沒有額外益處。',
    url: 'https://www.thelancet.com/journals/lanpub/article/PIIS2468-2667(25)00164-1/fulltext',
    related_hash: 'exercise',
  },
  {
    id: 'UPD-2026-ACSM-RT',
    date: '2026-03',
    category: 'exercise',
    org: '美國運動醫學會 ACSM 2026 立場聲明',
    title_zh: '重訓新指引：不必練到力竭，每週 2 次、保留 2–3 下餘力就夠',
    what_changed_zh:
      '17 年來首次更新，彙整 137 篇系統性回顧、超過 3 萬名受試者。最大的效益來自「從不練到開始練」；每週至少 2 次訓練全身主要肌群；每組停在還能再做 2–3 下（RIR 2–3）即可達到與力竭相同的肌肥大與肌力效果；想增肌約每肌群每週 10 組；練最大肌力約用 1RM 的 80%、每動作 2–3 組；爆發力用 30–70% 1RM 並盡量快速推起。彈力帶、自體重量與居家訓練同樣有效。',
    what_it_means_zh:
      '沒時間、沒器材都不是理由：一條彈力帶、一張椅子就能開始。對 40 歲以上，肌力訓練是對抗肌少症與跌倒的核心處方。',
    numbers: [
      { label_zh: '頻率', value: '≥2 次/週' },
      { label_zh: '增肌量', value: '~10 組/肌群/週' },
      { label_zh: '努力程度', value: 'RIR 2–3' },
    ],
    url: 'https://acsm.org/resistance-training-guidelines-update-2026/',
    related_hash: 'exercise/strength',
  },
  {
    id: 'UPD-2025-CHALLENGE',
    date: '2025-06',
    category: 'exercise',
    org: 'NEJM：CHALLENGE 隨機試驗',
    title_zh: '運動也是抗癌處方：大腸癌術後規律運動，復發或死亡風險降 28%',
    what_changed_zh:
      '889 位完成手術與化療的第 2–3 期大腸癌患者，隨機分配 3 年結構化運動計畫或健康衛教。追蹤約 8 年：運動組無病存活風險比 0.72（5 年無病存活 80.3% 對 73.9%）、整體死亡風險比 0.63（8 年存活約 90% 對 83%）。',
    what_it_means_zh:
      '這是第一個證明「運動能延長癌症存活」的大型隨機試驗，效果與許多藥物相當。癌症治療後的運動應在醫療團隊指導下循序漸進，目標是逐步達到每週約 150 分鐘中強度有氧。',
    url: 'https://www.nejm.org/doi/abs/10.1056/NEJMoa2502760',
    related_hash: 'exercise',
  },
  {
    id: 'UPD-2024-DEPRESSION-EX',
    date: '2024-02',
    category: 'mind',
    org: 'BMJ 網絡統合分析',
    title_zh: '運動治療憂鬱：走路或慢跑、瑜伽、重訓效果最好，強度越高效果越大',
    what_changed_zh:
      '整合 218 篇隨機試驗、14,170 人。相較對照組，走路或慢跑（效應量 g = −0.62）、瑜伽（−0.55）、肌力訓練（−0.49）都有中等程度的改善；效果與運動強度呈正比，重訓與瑜伽的持續率最好。',
    what_it_means_zh:
      '運動可以作為憂鬱症的核心治療之一，與心理治療、藥物並用。中重度憂鬱或有自傷念頭時，請先就醫——運動是加法，不是取代。',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10870815/',
    related_hash: 'mental',
  },

  {
    id: 'UPD-2025-WHO-SOCIAL',
    date: '2025-06',
    category: 'mind',
    org: '世界衛生組織 社會連結委員會',
    title_zh: '孤獨是公共衛生問題：全球每 6 人就有 1 人感到孤獨',
    what_changed_zh:
      'WHO 社會連結委員會首份報告指出，孤獨每年與超過 87 萬人死亡相關（約每小時 100 人），並與心血管疾病、第 2 型糖尿病、憂鬱、認知退化與早逝有關；世界衛生大會同年首度通過社會連結決議。',
    what_it_means_zh:
      '人際連結和飲食、運動一樣是健康處方。固定的聚會、社團、志工與運動班，對長者與獨居者尤其重要；聽力不好造成的退縮也要處理。',
    caveat_zh: '孤獨與健康的關係多來自觀察性研究，彼此可能互為因果。',
    url: 'https://who.int/news/item/30-06-2025-social-connection-linked-to-improved-heath-and-reduced-risk-of-early-death',
    related_hash: 'mental',
  },

  // ── Screening (Taiwan) ───────────────────────────────────────────────
  {
    id: 'UPD-2025-TW-SCREEN',
    date: '2025-01',
    category: 'screening',
    org: '衛福部國民健康署',
    title_zh: '台灣公費癌篩擴大：乳癌 40 歲起、大腸癌 45 歲起、肺癌放寬吸菸條件',
    what_changed_zh:
      '2025 年 1 月起：乳房攝影擴大為 40–74 歲女性每 2 年 1 次；糞便潛血檢查擴大為 45–74 歲（有家族史者 40–44 歲）每 2 年 1 次；低劑量電腦斷層（LDCT）肺癌篩檢：有家族史的男性 45–74 歲、女性 40–74 歲，以及 50–74 歲吸菸達 20 包年以上（含戒菸 15 年內）者，每 2 年 1 次。女性 35、45、65 歲另有公費 HPV 檢測。',
    what_it_means_zh:
      '癌症篩檢的價值在「早期發現、可治癒」。糞便潛血陽性一定要做大腸鏡，不要只重驗一次；它不是「可能驗錯」，而是約每 2 位陽性就有 1 位有瘜肉或更嚴重的病灶。',
    url: 'https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=4809&pid=18712',
    related_hash: 'checkup',
  },
  {
    id: 'UPD-2026-TW-GASTRIC',
    date: '2026-01',
    category: 'screening',
    org: '衛福部國民健康署',
    title_zh: '第 6 項公費癌篩：45–74 歲終身一次幽門螺旋桿菌糞便抗原檢測',
    what_changed_zh:
      '2026 年 1 月起全面推動：45 歲至未滿 75 歲、未曾參加試辦計畫者，可在提供癌篩服務的醫療院所領取採檢管，以糞便抗原檢測幽門螺旋桿菌，一生一次；可與大腸癌糞便潛血一起採檢。陽性者經除菌治療可降低胃癌風險。',
    what_it_means_zh:
      '幽門螺旋桿菌是胃癌最重要的可去除危險因子。驗出陽性、完成除菌後要回診確認是否根除；家人共餐者也可一起評估。',
    url: 'https://www.hpa.gov.tw/Pages/Detail.aspx?nodeid=5020&pid=19802',
    related_hash: 'checkup',
  },

  // ── Brain, sleep, women's health, kidneys ────────────────────────────
  {
    id: 'UPD-2024-DEMENTIA',
    date: '2024-07',
    category: 'brain',
    org: 'Lancet 失智症委員會 2024',
    title_zh: '約 45% 失智可預防：14 項可改變因子，新增「未治療的視力喪失」與「高 LDL」',
    what_changed_zh:
      '14 項因子依生命階段排列——早年：教育程度低；中年：聽力喪失、高 LDL 膽固醇、憂鬱、腦外傷、缺乏運動、糖尿病、吸菸、高血壓、肥胖、過量飲酒；晚年：社交孤立、空氣污染、未治療的視力喪失。',
    what_it_means_zh:
      '「顧腦」其實就是顧血管與感官：量血壓、控 LDL、戴助聽器、做白內障手術、多與人互動。聽力喪失與中年高 LDL 各約可解釋 7% 的失智個案，是影響最大的兩項。',
    url: 'https://www.thelancet.com/commissions-do/dementia-prevention-intervention-and-care',
    related_hash: 'systems/nervous/prevent',
  },
  {
    id: 'UPD-2024-SLEEP-REG',
    date: '2024-01',
    category: 'sleep',
    org: 'SLEEP 期刊（UK Biobank 6 萬人）',
    title_zh: '睡得「規律」比睡得「久」更能預測壽命',
    what_changed_zh:
      '以手環記錄約 6 萬人、超過 1,000 萬小時睡眠資料計算「睡眠規律指數」。規律度較高者全因死亡風險明顯較低（研究估計低約 20–48%），且預測力優於單看睡眠時數；後續研究也發現規律睡眠與較低的憂鬱、焦慮風險相關。',
    what_it_means_zh:
      '週末補眠治標不治本。先固定「起床時間」（誤差 30 分鐘內），晚上的睡意會自然跟著穩定下來。',
    caveat_zh: '為觀察性研究，輪班工作者等族群需個別化調整。',
    url: 'https://academic.oup.com/sleep/article/47/1/zsad253/7280269',
    related_hash: 'sleep',
  },
  {
    id: 'UPD-2025-HRT',
    date: '2025-11',
    category: 'women',
    org: '美國 FDA',
    title_zh: '更年期荷爾蒙療法：FDA 移除心血管、乳癌、失智的黑框警語',
    what_changed_zh:
      '根據婦女健康倡議研究（WHI）長期追蹤與後續分析，FDA 要求移除更年期荷爾蒙療法關於心血管疾病、乳癌與可能失智的黑框警語，並在仿單中納入 50–59 歲女性的數據，說明在停經 10 年內開始治療中重度熱潮紅的絕對風險低。單獨使用雌激素（未合併黃體素）者的子宮內膜癌黑框警語保留。',
    what_it_means_zh:
      '嚴重熱潮紅、盜汗、睡不好的女性，不必因為舊警語而完全排斥治療。是否適合仍要與婦產科醫師評估血栓、乳癌與心血管病史。',
    caveat_zh: '學界對此決定仍有討論；有乳癌、血栓、中風病史者通常不適用全身性荷爾蒙療法。',
    url: 'https://www.health.harvard.edu/womens-health/fda-removes-menopause-hormone-therapy-black-box-warnings',
    related_hash: 'systems/endocrine/conditions',
  },
  {
    id: 'UPD-2024-VITD',
    date: '2024-06',
    category: 'diet',
    org: '美國內分泌學會 2024 指引',
    title_zh: '健康成人不需要常規驗維生素 D，75 歲以上建議補充',
    what_changed_zh:
      '75 歲以下健康成人補充高於每日建議量（RDA）的維生素 D 不太可能額外受益，也不建議常規檢測血中濃度；建議經驗性補充的族群為 75 歲以上（可能降低死亡風險）、孕婦、糖尿病前期高風險者，以及 1–18 歲兒童青少年。',
    what_it_means_zh:
      '不必為了「數字漂亮」自費驗維生素 D 或吞高劑量膠囊。長者、很少曬太陽、骨質疏鬆者再與醫師討論補充劑量。',
    url: 'https://www.endocrine.org/clinical-practice-guidelines/vitamin-d-for-prevention-of-disease',
    related_hash: 'supplements',
  },
  {
    id: 'UPD-2024-KDIGO',
    date: '2024-03',
    category: 'kidney',
    org: 'KDIGO 2024 慢性腎臟病指引',
    title_zh: '腎功能要看兩個數字：eGFR 加上尿白蛋白，SGLT2 抑制劑成腎臟保護主力',
    what_changed_zh:
      '慢性腎臟病的分期同時使用 eGFR（過濾能力）與尿液白蛋白/肌酸酐比值 UACR（漏蛋白程度）排成風險熱圖。第 2 型糖尿病合併 CKD 且 eGFR ≥20 者，建議使用 SGLT2 抑制劑（證據 1A）；非糖尿病 CKD 若 UACR ≥200 mg/g 或合併心衰竭也建議使用。',
    what_it_means_zh:
      '只看肌酸酐或 eGFR 會漏掉早期腎病。有高血壓、糖尿病的人，每年至少驗一次 UACR。台灣成人預防保健的抽血與驗尿已包含肌酸酐（可換算 eGFR）與尿蛋白，報告上這兩欄都要看。',
    url: 'https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf',
    related_hash: 'systems/renal/conditions',
  },
  {
    id: 'UPD-2026-GINA',
    date: '2026-05',
    category: 'lung',
    org: '全球氣喘創議組織 GINA 2026',
    title_zh: '氣喘 2026：基層照護新流程、血氧 <92% 才給氧，持續反對只用急救吸入劑',
    what_changed_zh:
      '新增基層醫療處理輕、中、重度急性氣喘的流程圖與「致死性氣喘高風險」紅旗；急性發作時血氧低於 92% 才補充氧氣；延續多年的核心原則：青少年與成人不應只用短效支氣管擴張劑（SABA）單獨治療，應使用含吸入型類固醇的方案（例如按需使用 ICS-formoterol）。',
    what_it_means_zh:
      '若你一週用急救吸入劑超過 2 次、或夜裡咳醒，代表氣喘沒控制好，需要回診調整「控制型」藥物，而不是多備幾支急救藥。',
    url: 'https://ginasthma.org/2026-gina-strategy-report/',
    related_hash: 'systems/respiratory/conditions',
  },
];

export const UPDATE_CATEGORY_META: Record<UpdateCategory, { label_zh: string; tone: string }> = {
  heart: { label_zh: '心血管', tone: 'rose' },
  metabolic: { label_zh: '代謝與體重', tone: 'amber' },
  diet: { label_zh: '飲食', tone: 'emerald' },
  exercise: { label_zh: '運動', tone: 'sky' },
  screening: { label_zh: '台灣篩檢', tone: 'violet' },
  sleep: { label_zh: '睡眠', tone: 'violet' },
  mind: { label_zh: '心理', tone: 'teal' },
  women: { label_zh: '女性健康', tone: 'rose' },
  emergency: { label_zh: '急救', tone: 'rose' },
  kidney: { label_zh: '腎臟', tone: 'sky' },
  lung: { label_zh: '呼吸', tone: 'teal' },
  brain: { label_zh: '大腦', tone: 'violet' },
};

export const getUpdate = (id: string) => EVIDENCE_UPDATES.find((u) => u.id === id);
