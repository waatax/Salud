import { EvidenceGrade } from '../types';
import type { SpineTab } from '../config/routes';

export type { SpineTab };

/**
 * spineData.ts — 脊椎・骨刺・手腳麻專區 (v4.4)
 *
 * One data file for the whole spine & nerve zone, so the hub, the learning track,
 * the search index and the tests all read the same facts.
 *
 * Editorial rules for this file
 *  - Every number carries the study it came from (SPINE_SOURCES id) — no orphan figures.
 *  - Treatments carry an evidence grade (A–E, see EvidenceBadge) and a plain verdict.
 *  - Medicines are described by class and generic name for education only: no doses
 *    beyond published safety ceilings, and every class lists who must be careful.
 *  - Anything that should send a reader to a clinician is phrased as a red flag with
 *    an urgency tier, never buried in prose.
 */

// ── Sources ───────────────────────────────────────────────────────────────────

export interface SpineSource {
  id: string;
  label: string;
  url: string;
}

export const SPINE_SOURCES: Record<string, SpineSource> = {
  WHO2023: {
    id: 'WHO2023',
    label: 'WHO 2023 慢性原發性下背痛非手術治療指引',
    url: 'https://www.who.int/publications/i/item/9789240081789',
  },
  NICE59: {
    id: 'NICE59',
    label: 'NICE NG59 下背痛與坐骨神經痛（2016，2020 更新）',
    url: 'https://www.nice.org.uk/guidance/ng59',
  },
  ACP2017: {
    id: 'ACP2017',
    label: 'Qaseem A, et al. ACP 下背痛非侵入治療指引. Ann Intern Med 2017;166:514-530',
    url: 'https://doi.org/10.7326/M16-2367',
  },
  LANCET2018: {
    id: 'LANCET2018',
    label: 'Foster NE, et al. Lancet 下背痛系列：預防與治療. Lancet 2018;391:2368-83',
    url: 'https://doi.org/10.1016/S0140-6736(18)30489-6',
  },
  GBD2023: {
    id: 'GBD2023',
    label: 'GBD 2021 Low Back Pain Collaborators. Lancet Rheumatol 2023;5:e316-29',
    url: 'https://doi.org/10.1016/S2665-9913(23)00098-X',
  },
  BRINJIKJI2015: {
    id: 'BRINJIKJI2015',
    label: 'Brinjikji W, et al. 無症狀者的脊椎退化影像系統性回顧. AJNR 2015;36:811-816',
    url: 'https://doi.org/10.3174/ajnr.A4173',
  },
  CHIU2015: {
    id: 'CHIU2015',
    label: 'Chiu CC, et al. 腰椎間盤突出自行吸收機率系統性回顧. Clin Rehabil 2015;29:184-195',
    url: 'https://doi.org/10.1177/0269215514540919',
  },
  WILKE1999: {
    id: 'WILKE1999',
    label: 'Wilke HJ, et al. 日常生活椎間盤內壓活體量測. Spine 1999;24:755-762',
    url: 'https://doi.org/10.1097/00007632-199904150-00005',
  },
  HANSRAJ2014: {
    id: 'HANSRAJ2014',
    label: 'Hansraj KK. 低頭角度與頸椎負荷模型. Surg Technol Int 2014;25:277-279',
    url: 'https://pubmed.ncbi.nlm.nih.gov/25393825/',
  },
  STEFFENS2016: {
    id: 'STEFFENS2016',
    label: 'Steffens D, et al. 下背痛預防統合分析. JAMA Intern Med 2016;176:199-208',
    url: 'https://doi.org/10.1001/jamainternmed.2015.7431',
  },
  WALKBACK2024: {
    id: 'WALKBACK2024',
    label: 'Pocovi NC, et al. WalkBack 走路預防下背痛復發隨機試驗. Lancet 2024;404:134-144',
    url: 'https://doi.org/10.1016/S0140-6736(24)00755-4',
  },
  RESTORE2023: {
    id: 'RESTORE2023',
    label: 'Kent P, et al. RESTORE 認知功能治療試驗. Lancet 2023;401:1866-1877',
    url: 'https://doi.org/10.1016/S0140-6736(23)00441-5',
  },
  PRECISE2017: {
    id: 'PRECISE2017',
    label: 'Mathieson S, et al. Pregabalin 治療坐骨神經痛試驗. N Engl J Med 2017;376:1111-1120',
    url: 'https://doi.org/10.1056/NEJMoa1614292',
  },
  PACE2014: {
    id: 'PACE2014',
    label: 'Williams CM, et al. PACE 乙醯胺酚治療急性下背痛試驗. Lancet 2014;384:1586-96',
    url: 'https://doi.org/10.1016/S0140-6736(14)60805-9',
  },
  GOLDBERG2015: {
    id: 'GOLDBERG2015',
    label: 'Goldberg H, et al. 口服類固醇治療腰椎神經根病變. JAMA 2015;313:1915-1923',
    url: 'https://doi.org/10.1001/jama.2015.4468',
  },
  CASHIN2021: {
    id: 'CASHIN2021',
    label: 'Cashin AG, et al. 肌肉鬆弛劑治療下背痛統合分析. BMJ 2021;374:n1446',
    url: 'https://doi.org/10.1136/bmj.n1446',
  },
  PEUL2007: {
    id: 'PEUL2007',
    label: 'Peul WC, et al. 坐骨神經痛早期手術 vs 延長保守治療. N Engl J Med 2007;356:2245-56',
    url: 'https://doi.org/10.1056/NEJMoa064039',
  },
  KUIJPER2009: {
    id: 'KUIJPER2009',
    label: 'Kuijper B, et al. 頸圈或物理治療 vs 觀察：新發頸神經根病變. BMJ 2009;339:b3883',
    url: 'https://doi.org/10.1136/bmj.b3883',
  },
  AOSPINE2017: {
    id: 'AOSPINE2017',
    label: 'Fehlings MG, et al. 退化性頸椎脊髓病變臨床指引. Global Spine J 2017;7:70S-83S',
    url: 'https://doi.org/10.1177/2192568217701914',
  },
  KOVACS2003: {
    id: 'KOVACS2003',
    label: 'Kovacs FM, et al. 床墊軟硬度與慢性下背痛隨機試驗. Lancet 2003;362:1599-1604',
    url: 'https://doi.org/10.1016/S0140-6736(03)14792-7',
  },
  BASSON2017: {
    id: 'BASSON2017',
    label: 'Basson A, et al. 神經鬆動術統合分析. J Orthop Sports Phys Ther 2017;47:593-615',
    url: 'https://doi.org/10.2519/jospt.2017.7117',
  },
  TRACTION2013: {
    id: 'TRACTION2013',
    label: 'Wegner I, et al. 牽引治療下背痛 Cochrane 回顧 2013',
    url: 'https://doi.org/10.1002/14651858.CD003010.pub5',
  },
  HEAT2006: {
    id: 'HEAT2006',
    label: 'French SD, et al. 表淺熱敷與冷敷治療下背痛 Cochrane 回顧 2006',
    url: 'https://doi.org/10.1002/14651858.CD004750.pub2',
  },
  EFSA2023B6: {
    id: 'EFSA2023B6',
    label: 'EFSA 2023 維生素 B6 每日上限攝取量（成人 12 mg）',
    url: 'https://doi.org/10.2903/j.efsa.2023.8006',
  },
  ADA2025: {
    id: 'ADA2025',
    label: 'ADA 糖尿病照護標準 2025：神經病變篩檢與 metformin 使用者 B12 監測',
    url: 'https://diabetesjournals.org/care/issue/48/Supplement_1',
  },
  ISNCSCI: {
    id: 'ISNCSCI',
    label: 'ASIA/ISCoS 國際脊髓損傷神經學分類標準（ISNCSCI 2019）關鍵感覺點',
    url: 'https://asia-spinalinjury.org/international-standards-neurological-classification-sci-isncsci-worksheet/',
  },
  NASS2014: {
    id: 'NASS2014',
    label: 'Kreiner DS, et al. NASS 腰椎間盤突出合併神經根病變指引. Spine J 2014;14:180-191',
    url: 'https://doi.org/10.1016/j.spinee.2013.08.003',
  },
};

// ── Chapters ──────────────────────────────────────────────────────────────────

export interface SpineChapter {
  id: SpineTab;
  label_zh: string;
  title_zh: string;
  goal_zh: string;
  learn_zh: [string, string, string];
  minutes: number;
  takeaways_zh: string[];
}

export const SPINE_CHAPTERS: SpineChapter[] = [
  {
    id: 'OVERVIEW',
    label_zh: '認識脊椎',
    title_zh: '一根會彎的柱子：脊椎、椎間盤與神經的分工',
    goal_zh: '先認識脊椎的零件，後面讀到「骨刺壓到神經」「椎間盤突出」時，你就能在腦中畫出到底是哪裡出問題。',
    learn_zh: ['脊椎分成哪幾段、各有幾節', '椎間盤、小面關節、神經孔各做什麼', '為什麼脖子的問題會麻到手、腰的問題會麻到腳'],
    minutes: 6,
    takeaways_zh: [
      '成人脊椎由 7 節頸椎、12 節胸椎、5 節腰椎與薦骨、尾骨組成，三段彎曲像彈簧一樣分散衝擊。',
      '脊髓在第 1–2 腰椎附近就結束，以下是一束「馬尾」神經；所以頸椎問題可能影響手腳，腰椎問題主要影響下肢與大小便。',
      '每對神經根從「神經孔」出來，負責一塊固定的皮膚與肌肉，所以「麻在哪裡」能反推「哪一節出問題」。',
    ],
  },
  {
    id: 'SPURS',
    label_zh: '骨刺與退化',
    title_zh: '骨刺是什麼？為什麼「長骨刺」常常不是痛的原因',
    goal_zh: '骨刺是脊椎隨年齡退化時，骨頭在承受壓力的邊緣「長出來加固」的骨質。它很常見，大多數人一輩子都不會因此痛或麻。',
    learn_zh: ['骨刺怎麼形成（退化連鎖反應）', '無症狀的人 MRI 也常看到退化', '什麼情況骨刺才真的會壓到神經'],
    minutes: 7,
    takeaways_zh: [
      '骨刺（骨贅）是退化的「結果」而非「病」：椎間盤變薄、關節負擔變大，身體在邊緣加骨頭來穩定。',
      '80 歲無症狀的人，96% MRI 有椎間盤退化、84% 有椎間盤膨出——影像報告要搭配症狀與神經學檢查一起看。',
      '只有當骨刺、膨出的椎間盤與增厚的韌帶一起讓「神經孔」或「椎管」變窄，並出現對應的症狀時，才需要針對它治療。',
      '沒有任何藥物或食物能「溶掉骨刺」；治療目標是改善症狀與功能，而不是讓影像變漂亮。',
    ],
  },
  {
    id: 'NUMBNESS',
    label_zh: '手麻腳麻',
    title_zh: '手麻腳麻：從「麻在哪裡」找出是哪條神經',
    goal_zh: '手腳麻不一定是脊椎問題。腕隧道症候群、糖尿病或維生素 B12 不足造成的神經病變，甚至中風，都會麻。學會看「麻的分布」，就能更快找到對的科別。',
    learn_zh: ['頸椎、腰椎每條神經根管哪一塊', '腕隧道、周邊神經病變和脊椎問題怎麼分', '哪些麻是急症，要立刻就醫'],
    minutes: 8,
    takeaways_zh: [
      '單側、沿著手臂或腿「一條帶狀」往下麻，加上脖子或腰痛，較像神經根被壓迫（頸椎最常見 C7、C6；腰椎最常見 L5、S1）。',
      '拇指到無名指半邊、夜裡麻醒、甩甩手會好，較像腕隧道症候群；從雙腳腳趾開始、左右對稱往上，較像糖尿病或 B12 不足造成的周邊神經病變。',
      '雙手變笨拙＋走路不穩要懷疑頸椎脊髓病變；鞍區麻木或大小便異常是馬尾症候群；突然單側臉手腳麻是中風——這三種都要盡快就醫。',
    ],
  },
  {
    id: 'POSTURE',
    label_zh: '躺坐站走',
    title_zh: '躺・坐・站・走：保護脊椎的日常姿勢與動作',
    goal_zh: '沒有一個「完美姿勢」可以維持一整天。真正傷脊椎的是「同一個姿勢太久」與「彎腰＋扭轉＋負重」同時發生。這一章用實際測量的椎間盤壓力，告訴你哪些動作值得調整。',
    learn_zh: ['不同姿勢下椎間盤壓力差多少', '睡覺、辦公、做家事的具體擺位', '搬重物、起床、上下車的安全動作'],
    minutes: 8,
    takeaways_zh: [
      '躺著時椎間盤壓力最低；放鬆坐著和站著差不多；彎腰向前與「彎腰駝背提重物」最高——圓背提 20 公斤約是站立的 4.6 倍。',
      '最好的姿勢是「下一個姿勢」：每 30–60 分鐘起身動 1–2 分鐘，比坐得筆直更重要。',
      '仰睡在膝下墊枕、側睡在兩膝間夾枕、起床先側身再用手撐起；提重物讓東西貼近身體、用腳轉身不扭腰。',
    ],
  },
  {
    id: 'EXERCISE',
    label_zh: '居家運動',
    title_zh: '居家運動處方：每天 10–15 分鐘照顧脖子與腰',
    goal_zh: '運動是所有國際指引中，預防與治療頸腰痛證據最強的方法。這一章挑選物理治療常用、居家可做的動作，附上次數與「什麼情況要停」。',
    learn_zh: ['頸部、腰部、神經滑動各要做哪些', '運動時的「紅綠燈」疼痛原則', '症狀「集中化」與「周邊化」代表什麼'],
    minutes: 7,
    takeaways_zh: [
      '運動時疼痛在 0–10 分中的 2 分以內是綠燈、3–5 分且隔天回到原本是黃燈、超過 5 分或麻往手腳末端擴散是紅燈（停止）。',
      '症狀從腿往腰「收回來」（集中化）是好方向；往腳底「跑出去」（周邊化）代表這個動作暫時不適合你。',
      '最簡單有效的處方：每天走路累積 30 分鐘＋10 分鐘核心與頸部運動，持續數週到數月。',
    ],
  },
  {
    id: 'TREATMENT',
    label_zh: '預防與治療',
    title_zh: '預防與治療階梯：多數人不需要開刀',
    goal_zh: '頸腰痛與神經根痛多數會在數週到數月內明顯改善，椎間盤突出甚至可能自己被身體吸收。治療像爬樓梯：先做低風險、有效的事，沒改善再往上一階。',
    learn_zh: ['哪些預防方法有證據、哪些沒有', '從自我照護到手術的五階治療', '什麼情況才需要考慮手術'],
    minutes: 7,
    takeaways_zh: [
      '運動＋衛教能讓下背痛發作風險下降約 45%；護腰帶與鞋墊沒有預防效果。',
      '椎間盤突出越大塊反而越容易被吸收：游離型約 96%、脫出型約 70% 會自行縮小。',
      '大小便異常、進行性無力、脊髓病變要儘早手術評估；單純疼痛則先完整保守治療 6–12 週。',
    ],
  },
  {
    id: 'MEDS',
    label_zh: '常見藥物',
    title_zh: '醫師常開的藥：效果、副作用與誰要小心',
    goal_zh: '藥物的角色是「讓你能動起來」，而不是取代運動。了解每類藥在做什麼、效果有多大、哪些組合危險，才能和醫師、藥師好好討論。',
    learn_zh: ['止痛藥、肌肉鬆弛劑、神經痛藥物的差別', '哪些藥對坐骨神經痛的效果其實有限', '藥物交互作用與長者用藥安全'],
    minutes: 8,
    takeaways_zh: [
      '「痠痛發炎」與「神經燒灼電擊痛」是不同的痛，用藥方向也不同；神經痛藥物對糖尿病神經痛有效，但對坐骨神經痛的大型試驗並不比安慰劑好。',
      '消炎止痛藥（NSAIDs）用最低有效劑量、最短時間；有腎病、胃潰瘍、心血管病或吃抗凝血劑者要先問醫師。',
      '維生素 B12 對「缺乏的人」有效；B6 長期過量反而會造成手腳麻。來路不明的「骨刺藥」可能摻有類固醇。',
    ],
  },
  {
    id: 'REHAB',
    label_zh: '物理治療',
    title_zh: '復健科在做什麼？熱敷、電療、牽引與運動治療的實證',
    goal_zh: '台灣復健科常見的熱敷、電療、牽引屬於「被動治療」，可以短暫舒緩；真正改變長期結果的是「主動治療」——運動、動作再教育與疼痛衛教。',
    learn_zh: ['各種儀器治療在做什麼、證據多強', '徒手治療、神經鬆動、McKenzie 是什麼', '去復健時該問治療師的 5 個問題'],
    minutes: 7,
    takeaways_zh: [
      '熱敷對急性下背痛有短期幫助；TENS、超音波、干擾波、腰椎牽引在 WHO 2023 與 NICE 指引中都不建議作為常規治療。',
      '個別化運動治療、徒手治療搭配運動、認知功能治療（CFT）是證據最好的物理治療方式。',
      '把被動治療當成「讓你能做運動的暖身」，並請治療師給你一份可以帶回家的運動處方。',
    ],
  },
  {
    id: 'TRIAGE',
    label_zh: '何時就醫',
    title_zh: '何時該就醫？看哪一科？要做哪些檢查？',
    goal_zh: '大多數頸腰痛可以先自我照護，但有少數警訊代表神經正在受損或有嚴重疾病。這一章把警訊分成四個等級，並說明各科別與檢查的用途。',
    learn_zh: ['立即急診、24–72 小時、1–2 週與自我照護的分界', '家醫、復健、骨科、神經外科、神經內科的分工', 'X 光、MRI、神經傳導檢查各看什麼'],
    minutes: 6,
    takeaways_zh: [
      '大小便失禁或解不出、會陰部麻木、雙腿快速無力、突然單側臉手腳麻——立即撥 119 或到急診。',
      '沒有警訊的急性腰痛，前 4–6 週通常不需要影像檢查；過早做 MRI 不會讓你好得更快。',
      '就醫前記下：麻痛的位置（可畫圖）、何時開始、什麼姿勢加重或減輕、有沒有無力或大小便改變。',
    ],
  },
];

// ── 1. Overview ───────────────────────────────────────────────────────────────

export interface SpineRegion {
  region: string;
  count: string;
  curve: string;
  job: string;
  nerves: string;
  problems: string;
}

export const SPINE_REGIONS: SpineRegion[] = [
  {
    region: '頸椎 Cervical',
    count: '7 節（C1–C7）',
    curve: '前凸（向前彎）',
    job: '支撐約 4.5–5.5 公斤的頭部，活動度最大：點頭、轉頭',
    nerves: 'C5–T1 組成臂神經叢，管肩膀、手臂、手',
    problems: '頸椎退化與骨刺、神經根病變（手麻）、脊髓病變（雙手笨拙、走路不穩）',
  },
  {
    region: '胸椎 Thoracic',
    count: '12 節（T1–T12）',
    curve: '後凸（向後彎）',
    job: '與肋骨相連保護心肺，穩定度高、活動度小',
    nerves: '肋間神經，管胸腹壁皮膚與肌肉',
    problems: '骨質疏鬆壓迫性骨折、圓背（駝背）；椎間盤突出較少見',
  },
  {
    region: '腰椎 Lumbar',
    count: '5 節（L1–L5）',
    curve: '前凸（向前彎）',
    job: '承受上半身重量最多，負責彎腰、後仰',
    nerves: 'L2–S1 神經根管大腿、小腿、腳；馬尾神經在此',
    problems: '下背痛、椎間盤突出（坐骨神經痛）、椎管狹窄、退化性滑脫',
  },
  {
    region: '薦骨 Sacrum',
    count: '5 節癒合成 1 塊',
    curve: '後凸',
    job: '與骨盆組成薦髂關節，把上半身重量傳到雙腿',
    nerves: 'S1–S5 管腳底、小腿後側、會陰與膀胱直腸',
    problems: '薦髂關節痛；S2–S4 受壓會影響大小便（馬尾症候群）',
  },
  {
    region: '尾骨 Coccyx',
    count: '3–5 節癒合',
    curve: '後凸',
    job: '坐姿時的支點之一、骨盆底肌附著點',
    nerves: '尾神經',
    problems: '跌坐後尾骨痛',
  },
];

export interface SpinePart {
  part: string;
  plain: string;
  analogy: string;
  when_hurt: string;
}

export const SPINE_PARTS: SpinePart[] = [
  {
    part: '椎體',
    plain: '每節脊椎前方圓柱狀的骨頭，承受大部分垂直重量。',
    analogy: '大樓的樓板與柱子',
    when_hurt: '骨質疏鬆時可能被壓扁（壓迫性骨折），常見於長者輕微跌倒或彎腰搬物後。',
  },
  {
    part: '椎間盤',
    plain: '夾在兩節椎體間的軟墊：外圈是一層層纖維環，中心是含水的髓核。成人共 23 個。',
    analogy: '果凍夾心的避震墊',
    when_hurt: '纖維環破裂、髓核往後跑出來就是「椎間盤突出」，可能壓到神經根。',
  },
  {
    part: '小面關節',
    plain: '脊椎後方左右各一的小關節，引導並限制活動方向。',
    analogy: '門的鉸鏈',
    when_hurt: '退化時會長骨刺、關節肥厚，後仰或轉身時局部痠痛，也可能讓神經孔變窄。',
  },
  {
    part: '神經孔（椎間孔）',
    plain: '上下兩節脊椎之間、左右兩側的通道，神經根從這裡離開脊椎。',
    analogy: '電線穿出牆壁的孔',
    when_hurt: '椎間盤變薄、骨刺、關節肥厚會讓孔變窄（椎間孔狹窄），壓到神經造成單側手麻或腳麻。',
  },
  {
    part: '椎管與脊髓',
    plain: '椎體後方的長通道，裡面是脊髓（腦往下延伸的主幹線），成人約在第 1–2 腰椎結束。',
    analogy: '大樓的電纜管道間',
    when_hurt: '頸椎椎管變窄壓到脊髓會造成雙手笨拙、走路不穩（脊髓病變）；腰椎椎管狹窄則走路時雙腿痠麻。',
  },
  {
    part: '馬尾神經',
    plain: '脊髓末端以下，一束像馬尾巴的神經根，負責雙腿、會陰與膀胱直腸。',
    analogy: '主電纜末端分出的一束電線',
    when_hurt: '被大量壓迫時出現鞍區麻木、大小便失禁或解不出——馬尾症候群，屬外科急症。',
  },
  {
    part: '黃韌帶',
    plain: '椎管後方連接上下椎弓的彈性韌帶。',
    analogy: '管道後牆的彈力布',
    when_hurt: '隨年紀增厚、皺摺，從後方擠壓椎管，是腰椎管狹窄的重要原因。',
  },
  {
    part: '核心深層肌（多裂肌、腹橫肌）',
    plain: '緊貼脊椎的小肌肉與包住腹腔的深層肌，動作前先收縮穩定脊椎。',
    analogy: '固定電線桿的鋼索',
    when_hurt: '腰痛後常變得延遲、無力，是運動治療要重新訓練的重點。',
  },
];

export const SPINE_KEY_NUMBERS = [
  { value: '26', unit: '塊', label: '成人脊椎骨（24 塊可動＋薦骨＋尾骨）' },
  { value: '23', unit: '個', label: '椎間盤，約佔脊柱高度四分之一' },
  { value: '31', unit: '對', label: '脊神經（頸 8、胸 12、腰 5、薦 5、尾 1）' },
  { value: '6.19', unit: '億人', label: '2020 年全球下背痛人數，失能年數排名第一', source: 'GBD2023' },
];

// ── 2. Spurs & degeneration ───────────────────────────────────────────────────

export const DEGEN_CASCADE = [
  { step: '椎間盤脫水', detail: '20–30 歲起髓核含水量逐漸下降，椎間盤彈性變差。', tone: 'neutral' as const },
  { step: '椎間盤變薄、膨出', detail: '高度下降，纖維環向四周膨出，可能出現裂縫。', tone: 'neutral' as const },
  { step: '小面關節負擔增加', detail: '原本由椎間盤承擔的壓力轉移到後方小關節，關節軟骨磨損。', tone: 'warn' as const },
  { step: '骨刺與韌帶增厚', detail: '身體在受力邊緣增生骨質（骨刺）、黃韌帶增厚，試圖重新穩定這一節。', tone: 'warn' as const },
  { step: '神經通道變窄', detail: '神經孔或椎管空間被擠壓；多數人仍沒有症狀。', tone: 'warn' as const },
  { step: '神經受壓出現症狀', detail: '少數人出現單側手腳麻痛（神經根）或雙手笨拙、走路不穩（脊髓）。', tone: 'bad' as const },
];

/** Brinjikji 2015 (AJNR): pooled prevalence (%) in ASYMPTOMATIC people, ages 20–80. */
export const IMAGING_AGES = [20, 30, 40, 50, 60, 70, 80];
export const IMAGING_PREVALENCE: { finding_zh: string; finding_en: string; values: number[] }[] = [
  { finding_zh: '椎間盤退化', finding_en: 'Disc degeneration', values: [37, 52, 68, 80, 88, 93, 96] },
  { finding_zh: '椎間盤膨出', finding_en: 'Disc bulge', values: [30, 40, 50, 60, 69, 77, 84] },
  { finding_zh: '小面關節退化', finding_en: 'Facet degeneration', values: [4, 9, 18, 32, 50, 69, 83] },
  { finding_zh: '椎間盤突出', finding_en: 'Disc protrusion', values: [29, 31, 33, 36, 38, 40, 43] },
  { finding_zh: '脊椎滑脫', finding_en: 'Spondylolisthesis', values: [3, 5, 8, 14, 23, 35, 50] },
  { finding_zh: '纖維環裂縫', finding_en: 'Annular fissure', values: [19, 20, 22, 23, 25, 27, 29] },
];

export interface SpurCondition {
  name: string;
  where: string;
  what: string;
  symptoms: string;
  clue: string;
}

export const SPUR_CONDITIONS: SpurCondition[] = [
  {
    name: '頸椎退化（頸椎病）',
    where: '頸椎，最常見 C5–C6、C6–C7',
    what: '椎間盤變薄、骨刺、小面關節退化的總稱',
    symptoms: '脖子僵硬痠痛、轉頭卡卡；多數沒有神經症狀',
    clue: '早上僵硬、活動後改善；影像所見與疼痛程度常不成比例',
  },
  {
    name: '頸椎神經根病變',
    where: '頸椎神經孔',
    what: '骨刺或突出的椎間盤壓到離開脊椎的神經根',
    symptoms: '單側脖子、肩胛痛＋沿手臂往下的麻痛，可能無力',
    clue: '頭往後仰或轉向痛側加重；把手放到頭頂反而舒服',
  },
  {
    name: '退化性頸椎脊髓病變',
    where: '頸椎椎管',
    what: '骨刺、椎間盤、增厚韌帶從前後擠壓脊髓本身',
    symptoms: '雙手麻且笨拙（扣釦子、拿筷子、寫字變差）、走路不穩',
    clue: '可能完全沒有脖子痛；症狀緩慢進行，常被誤以為是老化',
  },
  {
    name: '後縱韌帶骨化症（OPLL）',
    where: '頸椎椎管前方',
    what: '椎體後方的韌帶逐漸變成骨頭，從前方壓迫脊髓',
    symptoms: '與脊髓病變相同；跌倒時頸部過度後仰容易造成脊髓損傷',
    clue: '在東亞族群較常見（約 2–4%），X 光或 CT 可見',
  },
  {
    name: '腰椎椎管狹窄',
    where: '腰椎，最常見 L4–L5',
    what: '椎間盤膨出、小面關節肥厚、黃韌帶增厚使椎管與側凹變窄',
    symptoms: '走路或久站後臀部、雙腿痠麻沉重（神經性間歇性跛行）',
    clue: '坐下或彎腰（推購物車、騎腳踏車）就緩解，下坡比上坡難受',
  },
  {
    name: '退化性脊椎滑脫',
    where: '腰椎，最常見 L4–L5',
    what: '小面關節退化後，上一節椎體相對下一節往前滑',
    symptoms: '下背痛、久站加重，常合併椎管狹窄症狀',
    clue: '中年以後女性較常見；動態 X 光可評估穩定度',
  },
  {
    name: '瀰漫性特發性骨質增生症（DISH）',
    where: '胸椎為主，可至頸腰椎',
    what: '脊椎前方韌帶大範圍骨化，像「蠟燭滴下的蠟」',
    symptoms: '背部僵硬、活動度下降，頸椎前方大骨刺偶爾造成吞嚥卡卡',
    clue: '與糖尿病、肥胖、年長男性相關；跌倒後骨折風險較高',
  },
];

/** Neurogenic (spinal stenosis) vs vascular (peripheral artery disease) claudication. */
export const CLAUDICATION_COMPARE = [
  { feature: '不舒服的感覺', neuro: '痠、麻、沉重、無力，可從臀部往下', vascular: '小腿肌肉抽緊、絞痛' },
  { feature: '什麼情況出現', neuro: '走路，也會在「久站不動」時出現', vascular: '走路或爬坡，固定距離後出現' },
  { feature: '怎樣會緩解', neuro: '坐下或彎腰（推購物車、扶欄杆）', vascular: '停下來站著休息就好，不必坐' },
  { feature: '騎腳踏車', neuro: '通常可以騎比較久（身體前傾）', vascular: '一樣會痛' },
  { feature: '腳背脈搏', neuro: '正常', vascular: '變弱或摸不到，腳冰冷、傷口難癒合' },
  { feature: '該看哪一科', neuro: '復健科、骨科或神經外科', vascular: '心臟內科或心臟血管外科（量踝臂指數 ABI）' },
];

// ── 3. Numbness ───────────────────────────────────────────────────────────────

export interface NerveRoot {
  root: string;
  disc: string;
  sensory: string;
  weakness: string;
  reflex: string;
  test: string;
  note?: string;
}

export const CERVICAL_ROOTS: NerveRoot[] = [
  {
    root: 'C5',
    disc: 'C4–C5',
    sensory: '肩膀外側、上臂外側',
    weakness: '手臂往側面抬（三角肌）、屈肘',
    reflex: '二頭肌反射減弱',
    test: '手臂側舉對抗阻力',
  },
  {
    root: 'C6',
    disc: 'C5–C6',
    sensory: '前臂外側、拇指與食指',
    weakness: '屈肘、手腕往上翹',
    reflex: '肱橈肌反射減弱',
    test: '手腕上翹對抗阻力',
    note: '第二常見',
  },
  {
    root: 'C7',
    disc: 'C6–C7',
    sensory: '中指（可含食指、手背中段）',
    weakness: '伸直手肘（三頭肌）、屈腕、伸手指',
    reflex: '三頭肌反射減弱',
    test: '推牆或伏地挺身變無力',
    note: '最常見',
  },
  {
    root: 'C8',
    disc: 'C7–T1',
    sensory: '無名指、小指、前臂內側',
    weakness: '握力、手指精細動作（手內在肌）',
    reflex: '無可靠反射',
    test: '用力握拳、夾紙測試',
    note: '需與尺神經（肘隧道）區分',
  },
];

export const LUMBAR_ROOTS: NerveRoot[] = [
  {
    root: 'L3',
    disc: 'L2–L3',
    sensory: '大腿前側到膝蓋內側',
    weakness: '伸直膝蓋、大腿內收',
    reflex: '膝反射可能減弱',
    test: '股神經牽拉測試（趴著屈膝）',
  },
  {
    root: 'L4',
    disc: 'L3–L4',
    sensory: '小腿內側、內踝',
    weakness: '伸直膝蓋（上樓梯、從椅子起身吃力）、腳踝上翹',
    reflex: '膝反射減弱',
    test: '單腳蹲起、股神經牽拉測試',
  },
  {
    root: 'L5',
    disc: 'L4–L5',
    sensory: '小腿外側、腳背、大腳趾',
    weakness: '大腳趾上翹、腳踝上翹（用腳跟走路困難）、髖外展',
    reflex: '無可靠反射',
    test: '直膝抬腿測試、腳跟走路',
    note: '最常見之一；需與腓神經麻痺區分',
  },
  {
    root: 'S1',
    disc: 'L5–S1',
    sensory: '小腿後側、腳底、腳外側與小趾',
    weakness: '腳踝往下踩（踮腳尖困難）',
    reflex: '跟腱反射減弱',
    test: '直膝抬腿測試、單腳踮腳尖 10 下',
    note: '最常見之一',
  },
];

export type Urgency = 'now' | 'soon' | 'clinic' | 'self';

export const URGENCY_META: Record<Urgency, { label: string; short: string; tone: 'bad' | 'warn' | 'neutral' | 'good' }> = {
  now: { label: '立即撥 119 或到急診', short: '立即急診', tone: 'bad' },
  soon: { label: '24–72 小時內就醫', short: '盡快就醫', tone: 'warn' },
  clinic: { label: '1–2 週內門診評估', short: '安排門診', tone: 'neutral' },
  self: { label: '先自我照護、觀察 2–6 週', short: '自我照護', tone: 'good' },
};

export interface NumbCause {
  id: string;
  condition: string;
  pattern: string;
  clues: string;
  tests: string;
  dept: string;
  urgency: Urgency;
}

export const NUMB_CAUSES: NumbCause[] = [
  {
    id: 'stroke',
    condition: '中風／暫時性腦缺血',
    pattern: '「突然」單側臉＋手＋腳麻或無力',
    clues: '嘴歪、說話不清、單側視力模糊、走路不穩（BE-FAST）',
    tests: '急診腦部 CT／MRI',
    dept: '急診（119）',
    urgency: 'now',
  },
  {
    id: 'cauda',
    condition: '馬尾症候群',
    pattern: '鞍區（會陰、肛門周圍、大腿內側）麻＋雙腿麻痛無力',
    clues: '尿解不出、失禁、排便失控，常合併嚴重下背痛',
    tests: '急診腰椎 MRI，需 48 小時內減壓',
    dept: '急診 → 神經外科／骨科',
    urgency: 'now',
  },
  {
    id: 'myelopathy',
    condition: '頸椎脊髓病變',
    pattern: '雙手麻、手套狀，合併手變笨拙與走路不穩',
    clues: '扣釦子、拿筷子、寫字變差；像踩在棉花上；反射變強',
    tests: '頸椎 MRI、神經學檢查',
    dept: '神經外科／骨科脊椎',
    urgency: 'soon',
  },
  {
    id: 'cervical-radic',
    condition: '頸椎神經根病變',
    pattern: '單側、沿手臂一條帶狀往下麻痛',
    clues: '合併脖子、肩胛痛；仰頭或轉向痛側加重',
    tests: '神經學檢查、Spurling 測試；持續或無力時做 MRI、肌電圖',
    dept: '復健科／骨科／神經外科',
    urgency: 'clinic',
  },
  {
    id: 'lumbar-radic',
    condition: '腰椎神經根病變（坐骨神經痛）',
    pattern: '單側從臀部往下延伸過膝的麻痛',
    clues: '咳嗽、久坐、彎腰加重；直膝抬腿誘發腿痛',
    tests: '神經學檢查；6 週無改善或無力時 MRI',
    dept: '復健科／骨科／神經外科',
    urgency: 'clinic',
  },
  {
    id: 'stenosis',
    condition: '腰椎椎管狹窄',
    pattern: '走路或久站後雙腿（或單腿）痠麻沉重',
    clues: '坐下或彎腰就緩解，推購物車可以走比較遠',
    tests: '腰椎 MRI；需與周邊動脈疾病區分（量 ABI）',
    dept: '復健科／骨科／神經外科',
    urgency: 'clinic',
  },
  {
    id: 'cts',
    condition: '腕隧道症候群',
    pattern: '拇指到無名指半邊（手掌側），不含小指',
    clues: '夜裡麻醒、騎車滑手機時加重、甩手會好；嚴重時拇指根部肌肉萎縮',
    tests: 'Phalen／Tinel 測試、神經傳導檢查',
    dept: '復健科／骨科（手外科）／神經內科',
    urgency: 'clinic',
  },
  {
    id: 'ulnar',
    condition: '肘隧道症候群（尺神經）',
    pattern: '小指與無名指半邊，可到手肘內側',
    clues: '講手機、長時間彎肘或手肘靠桌面加重；手指張合無力',
    tests: '神經傳導檢查',
    dept: '復健科／骨科／神經內科',
    urgency: 'clinic',
  },
  {
    id: 'polyneuropathy',
    condition: '多發性周邊神經病變',
    pattern: '雙腳腳趾開始、左右對稱「襪套狀」，慢慢往上，之後雙手「手套狀」',
    clues: '糖尿病、長期 metformin、胃切除、全素、長期制酸劑（B12 不足）、飲酒、甲狀腺低下、腎病、化療、B6 過量',
    tests: '血糖與糖化血色素、B12、甲狀腺、腎功能；足部單股纖維篩檢；神經傳導',
    dept: '神經內科／新陳代謝科／家醫科',
    urgency: 'clinic',
  },
  {
    id: 'peroneal',
    condition: '腓神經麻痺',
    pattern: '小腿外側＋腳背麻，腳板抬不起（垂足）',
    clues: '常因長時間蹺腳、蹲跪、快速減重或石膏壓迫膝外側；通常沒有腰痛',
    tests: '神經傳導檢查（用來和 L5 神經根區分）',
    dept: '復健科／神經內科',
    urgency: 'soon',
  },
  {
    id: 'meralgia',
    condition: '股外側皮神經病變',
    pattern: '大腿前外側一塊灼熱、刺麻、摸起來怪怪的',
    clues: '褲腰或腰帶太緊、體重增加、懷孕、久站；肌力不受影響',
    tests: '臨床診斷為主',
    dept: '家醫科／復健科',
    urgency: 'self',
  },
  {
    id: 'hyperventilation',
    condition: '過度換氣',
    pattern: '嘴唇周圍＋雙手指尖同時麻',
    clues: '伴隨焦慮、呼吸急促、胸悶；放慢呼吸數分鐘後改善',
    tests: '第一次發生需排除心肺與代謝問題',
    dept: '家醫科／急診（首次或伴胸痛）',
    urgency: 'clinic',
  },
  {
    id: 'compression',
    condition: '睡姿或姿勢壓迫（暫時性）',
    pattern: '手臂被壓著睡醒後發麻、蹺腳後腳麻',
    clues: '換姿勢幾分鐘內完全恢復',
    tests: '不需檢查；若手腕抬不起（垂腕）或數小時不恢復要就醫',
    dept: '—',
    urgency: 'self',
  },
];

export interface NumbLocatorOption {
  id: string;
  label: string;
  area: 'hand' | 'arm' | 'leg' | 'foot' | 'whole';
  likely: string[];
  ask: string[];
  next: string;
  urgency: Urgency;
}

/** Interactive "where is it numb?" helper. Ordered roughly head-to-toe. */
export const NUMB_LOCATOR: NumbLocatorOption[] = [
  {
    id: 'one-side-sudden',
    label: '突然單側臉＋手＋腳都麻或無力',
    area: 'whole',
    likely: ['中風或暫時性腦缺血'],
    ask: ['是否嘴歪、說話不清、視力模糊？', '症狀是幾點開始的？（記下時間給急診）'],
    next: '立即撥 119，不要自己開車、不要等症狀消失。',
    urgency: 'now',
  },
  {
    id: 'saddle',
    label: '屁股／會陰「坐的地方」麻，或大小便異常',
    area: 'whole',
    likely: ['馬尾症候群', '嚴重中央型腰椎椎間盤突出'],
    ask: ['小便是否解不出來、需要很用力，或漏尿？', '雙腿是否越來越無力？'],
    next: '立即到急診，需要緊急 MRI 與手術評估。',
    urgency: 'now',
  },
  {
    id: 'both-hands-clumsy',
    label: '雙手麻，而且變笨拙、走路不穩',
    area: 'hand',
    likely: ['頸椎脊髓病變', '後縱韌帶骨化症', '周邊神經病變（較少合併走路不穩）'],
    ask: ['扣釦子、拿筷子、寫字是否變困難？', '走路是否像踩在棉花上、需要扶牆？'],
    next: '數日內就醫（神經外科或骨科脊椎），安排頸椎 MRI。',
    urgency: 'soon',
  },
  {
    id: 'thumb-index',
    label: '拇指＋食指（可延伸到前臂外側）',
    area: 'hand',
    likely: ['C6 神經根病變', '腕隧道症候群（若只在手掌、夜間麻醒）'],
    ask: ['麻是否從脖子、肩膀一路往下？', '是否夜裡麻醒、甩手就好？', '前臂是否也麻？（腕隧道通常不會）'],
    next: '安排門診：復健科或骨科；持續或無力時做神經傳導檢查。',
    urgency: 'clinic',
  },
  {
    id: 'middle',
    label: '中指（可含食指、手背）',
    area: 'hand',
    likely: ['C7 神經根病變（頸椎最常見）', '腕隧道症候群'],
    ask: ['伸直手肘或推門是否變無力？', '仰頭時手麻是否加重？'],
    next: '安排門診；若推牆無力持續加重，盡快就醫。',
    urgency: 'clinic',
  },
  {
    id: 'cts-pattern',
    label: '拇指到無名指半邊（手掌側），晚上麻醒',
    area: 'hand',
    likely: ['腕隧道症候群（正中神經）'],
    ask: ['騎車、滑手機、拿吹風機時是否加重？', '拇指根部的肉是否變扁？'],
    next: '夜間戴護腕讓手腕保持平直；門診做神經傳導檢查。拇指肌肉萎縮要盡快處理。',
    urgency: 'clinic',
  },
  {
    id: 'ring-little',
    label: '無名指＋小指',
    area: 'hand',
    likely: ['肘隧道症候群（尺神經）', 'C8 神經根病變'],
    ask: ['講手機或彎肘時間長時是否加重？', '手肘內側敲一下是否麻到小指？', '是否合併脖子痛？'],
    next: '避免長時間彎肘與手肘壓桌面；門診做神經傳導檢查區分。',
    urgency: 'clinic',
  },
  {
    id: 'arm-stripe',
    label: '單側從脖子／肩胛沿手臂一條往下',
    area: 'arm',
    likely: ['頸椎神經根病變'],
    ask: ['頭往後仰或轉向痛側是否加重？', '把手放到頭頂是否變舒服？', '有沒有哪個動作變無力？'],
    next: '先避免長時間低頭與仰頭，做收下巴運動；2 週未改善或出現無力，安排門診。',
    urgency: 'clinic',
  },
  {
    id: 'lateral-thigh',
    label: '大腿前外側一塊灼熱、刺麻',
    area: 'leg',
    likely: ['股外側皮神經病變'],
    ask: ['最近體重增加、褲腰變緊，或懷孕？', '腿的力氣是否正常？'],
    next: '鬆開腰帶、避免緊身褲、控制體重，多數數月內改善；有無力再就醫。',
    urgency: 'self',
  },
  {
    id: 'leg-l5',
    label: '小腿外側＋腳背＋大腳趾',
    area: 'foot',
    likely: ['L5 神經根病變（L4–L5 椎間盤）', '腓神經麻痺（常蹺腳、久蹲）'],
    ask: ['痛是否從腰臀一路往下？', '用腳跟走路是否困難、腳板會拍地？', '最近常蹺腳或體重快速下降？'],
    next: '若腳板抬不起（垂足），2–3 天內就醫；否則安排門診並維持活動。',
    urgency: 'clinic',
  },
  {
    id: 'leg-s1',
    label: '小腿後側＋腳底＋腳外側＋小趾',
    area: 'foot',
    likely: ['S1 神經根病變（L5–S1 椎間盤）'],
    ask: ['咳嗽、打噴嚏、久坐是否讓腿痛加重？', '單腳踮腳尖是否做不到 10 下？'],
    next: '維持日常活動、避免久坐；2–6 週未改善或無力加重，安排門診。',
    urgency: 'clinic',
  },
  {
    id: 'leg-l4',
    label: '小腿內側、內踝',
    area: 'leg',
    likely: ['L4 神經根病變（L3–L4 椎間盤）'],
    ask: ['上樓梯或從椅子起身時膝蓋是否發軟？', '大腿前側是否也痛？'],
    next: '安排門診；膝蓋無力持續加重則盡快就醫。',
    urgency: 'clinic',
  },
  {
    id: 'walk-legs',
    label: '走路或久站後雙腿痠麻，坐下就好',
    area: 'leg',
    likely: ['腰椎椎管狹窄（神經性間歇性跛行）', '周邊動脈疾病（站著休息就好、腳冰冷）'],
    ask: ['需要坐下或彎腰才會緩解，還是站著停一下就好？', '推購物車時是否能走比較遠？'],
    next: '安排門診；醫師可能會量踝臂指數（ABI）排除血管問題。',
    urgency: 'clinic',
  },
  {
    id: 'stocking',
    label: '雙腳腳趾開始、對稱的襪套狀麻',
    area: 'foot',
    likely: ['糖尿病周邊神經病變', '維生素 B12 不足（長期 metformin、胃切除、全素）', '酒精、甲狀腺低下、腎病、化療、B6 過量'],
    ask: ['有沒有糖尿病？最近一次糖化血色素多少？', '是否長期吃 metformin 或制酸劑、吃全素？', '是否長期吃高劑量 B 群？'],
    next: '安排門診抽血（血糖、B12、甲狀腺、腎功能）；每天檢查腳底有無傷口。',
    urgency: 'clinic',
  },
];

export const MYELOPATHY_SIGNS = [
  '扣釦子、拿筷子、寫字、用手機打字變得不靈活',
  '走路不穩、像踩在棉花上，需要看地面或扶東西',
  '雙手麻木呈手套狀，不按照單一神經分布',
  '低頭時一股電流從脖子竄到背或四肢（Lhermitte 徵象）',
  '頻尿、急尿或解尿困難（較晚期）',
];

// ── 4. Posture ────────────────────────────────────────────────────────────────

export type PostureGroup = '躺' | '坐' | '站' | '動';

/** Wilke 1999 (Spine), L4–L5 in vivo intradiscal pressure, one healthy volunteer. */
export const DISC_PRESSURE: { label: string; mpa: number; group: PostureGroup; note?: string }[] = [
  { label: '仰躺', mpa: 0.1, group: '躺' },
  { label: '側躺', mpa: 0.12, group: '躺' },
  { label: '靠在沙發椅背上放鬆坐', mpa: 0.3, group: '坐', note: '有椅背支撐、身體後靠' },
  { label: '坐在椅凳上放鬆坐', mpa: 0.46, group: '坐' },
  { label: '自然站立', mpa: 0.5, group: '站', note: '作為 100% 基準' },
  { label: '刻意挺直坐', mpa: 0.55, group: '坐', note: '比放鬆坐還高' },
  { label: '坐著彎腰到底（像綁鞋帶）', mpa: 0.83, group: '坐' },
  { label: '站著彎腰向前', mpa: 1.1, group: '站' },
  { label: '從椅子站起來', mpa: 1.1, group: '動' },
  { label: '20 公斤貼近身體拿著', mpa: 1.1, group: '動' },
  { label: '屈膝蹲下提 20 公斤', mpa: 1.7, group: '動' },
  { label: '彎腰駝背提 20 公斤', mpa: 2.3, group: '動' },
];

/** Hansraj 2014 computer model: effective load on the cervical spine by head flexion. */
export const NECK_LOAD = [
  { angle: 0, kg: 5, label: '頭在正中' },
  { angle: 15, kg: 12, label: '低頭 15°' },
  { angle: 30, kg: 18, label: '低頭 30°' },
  { angle: 45, kg: 22, label: '低頭 45°' },
  { angle: 60, kg: 27, label: '低頭 60°' },
];

export interface PostureItem {
  title: string;
  how: string;
  why: string;
  avoid?: string;
  figure?: string;
}

export const POSTURE_GUIDE: { group: PostureGroup; title: string; intro: string; items: PostureItem[] }[] = [
  {
    group: '躺',
    title: '躺：睡覺與起床',
    intro: '人一天約三分之一的時間在床上。躺著是椎間盤壓力最低的姿勢，重點是讓頸椎與腰椎維持自然曲線，以及安全地起床。',
    items: [
      {
        title: '仰睡：膝下墊一個枕頭',
        how: '在膝蓋下方墊枕頭或捲起的被子，讓膝蓋微彎；頸枕填滿脖子後方的空隙，額頭與下巴大約同高。',
        why: '膝蓋微彎時腰椎放鬆，研究量到的椎間盤壓力比雙腿伸直再低一些；頸部有支撐，頭不會被推向前。',
        avoid: '枕頭太高讓下巴貼胸、只墊在後腦勺而脖子懸空。',
        figure: 'sleep-supine',
      },
      {
        title: '側睡：枕頭高度＝肩膀寬度，兩膝間夾枕',
        how: '枕頭壓下去後的高度約等於耳朵到肩膀外緣的距離，讓鼻子、胸骨、肚臍在一直線；雙膝微彎、中間夾一個枕頭，手可抱一個抱枕。',
        why: '頭不會往下歪或往上翹，頸椎側邊的神經孔不會被擠壓；夾枕讓骨盆不扭轉、腰椎不側彎。',
        avoid: '枕頭太低（頭往床歪）或太高（頭往上翹）。',
        figure: 'sleep-side',
      },
      {
        title: '盡量避免趴睡',
        how: '真的習慣趴睡時，用很薄的枕頭或不用枕頭，並在肚子下墊一個薄枕。',
        why: '趴睡時頭必須轉向一側一整晚，頸椎長時間旋轉，對頸椎退化或手麻的人特別不利。',
        avoid: '趴著撐手肘滑手機——研究量到腰椎壓力約是平躺的 2.5 倍，脖子也同時後仰。',
      },
      {
        title: '床墊選「中等偏硬」',
        how: '躺下時肩膀與臀部能稍微陷入，但腰部不會塌陷；不需要睡木板床。',
        why: '西班牙的隨機試驗發現，慢性下背痛患者睡中等硬度床墊，比睡硬床墊的疼痛與失能改善更多。',
        avoid: '太軟像吊床、或太硬只有肩臀接觸的床墊。',
      },
      {
        title: '起床用「滾木式」三步驟',
        how: '① 仰躺屈膝 ② 整個身體像一根木頭一起翻成側躺 ③ 雙腳移出床緣的同時，用下方手肘與上方手掌把上半身撐起坐好。',
        why: '在床上翻身扭轉時椎間盤壓力會瞬間升高到 0.7–0.8 MPa；側身撐起可避免直接仰臥起坐式的彎腰扭轉。',
        avoid: '直接從仰躺像仰臥起坐般挺身起床，或邊扭身邊起來。',
        figure: 'logroll',
      },
      {
        title: '急性期不要長時間臥床',
        how: '劇痛時可以短暫休息找舒服姿勢，但盡快恢復可忍受的日常活動與走路。',
        why: '研究顯示，維持可忍受活動的人比臥床休息的人恢復稍快；長時間臥床則會讓肌肉無力、心情低落。',
      },
    ],
  },
  {
    group: '坐',
    title: '坐：辦公、滑手機與開車',
    intro: '研究量到「放鬆坐」與「站著」的椎間盤壓力差不多，真正的問題是身體前傾靠近螢幕、低頭看手機，以及一坐就是好幾個小時。',
    items: [
      {
        title: '螢幕上緣與眼睛同高、距離約一個手臂',
        how: '筆電請加外接鍵盤並把螢幕墊高；雙螢幕放在正前方，主要螢幕在鼻子正前方。',
        why: '視線自然微微往下看時，頭的重量落在頸椎正上方；螢幕太低會讓頭不知不覺往前、往下。',
        avoid: '筆電直接放桌上、低頭打一整天。',
        figure: 'desk-good',
      },
      {
        title: '坐滿椅子、讓椅背撐住腰',
        how: '臀部坐到椅子最深處，腰後放一個小靠墊或捲起的毛巾（約皮帶高度），椅背角度約 100–110 度。',
        why: '研究發現身體靠在椅背上時椎間盤壓力最低；刻意挺直坐反而比放鬆坐還高。',
        avoid: '坐在椅子前緣、身體往前探向螢幕。',
      },
      {
        title: '雙腳平放、膝蓋約與髖同高',
        how: '腳踩不到地就加腳踏墊；手肘約 90–100 度放在桌面或扶手上，肩膀放鬆。',
        why: '穩定的腳與手臂支撐能讓肩頸與下背肌肉不用一直出力。',
        avoid: '長時間蹺腳——會壓迫膝蓋外側的腓神經，造成腳背麻、腳板無力。',
      },
      {
        title: '手機舉到眼睛前方',
        how: '用手肘靠在身體或桌面上把手機舉高；看影片時架在支架上。',
        why: '電腦模型估算，低頭 60 度時頸椎承受的等效重量約 27 公斤，是頭在正中時的 5 倍以上。',
        avoid: '長時間低頭追劇、躺在床上仰頭看手機。',
        figure: 'phone',
      },
      {
        title: '每 30–60 分鐘起身 1–2 分鐘',
        how: '設定手機或手錶提醒：站起來倒水、走一趟、做幾下收下巴與後仰伸展。',
        why: '脊椎靠「動」來交換養分；改變姿勢比維持任何一個「標準姿勢」更重要。',
      },
      {
        title: '開車：座椅靠近、椅背 100–110 度、每 1–2 小時休息',
        how: '座位調到膝蓋微彎踩到底、手腕可搭到方向盤頂端；頭枕上緣約與頭頂同高。上車時先坐下再把雙腿一起轉進車內。',
        why: '長時間開車同時有久坐與振動；頭枕位置正確可減少追撞時的頸部揮鞭傷。',
        avoid: '單腳先跨進車內再扭轉坐下。',
      },
    ],
  },
  {
    group: '站',
    title: '站：久站、做家事與等車',
    intro: '久站時肌肉疲勞、身體容易「掛在韌帶上」——腰往前挺、肚子往前推。小小的支撐與輪替就能明顯減輕負擔。',
    items: [
      {
        title: '久站時一腳踩在小凳子上，左右輪替',
        how: '煮飯、洗碗、燙衣服時，在腳邊放一個 10–15 公分高的小凳或箱子，兩腳每隔幾分鐘交換。',
        why: '抬起一腳讓骨盆微微後傾，減少腰椎過度前凸與小面關節的壓力。',
        figure: 'stand-stool',
      },
      {
        title: '工作檯高度約在手肘下方 10–15 公分',
        how: '太低時把砧板墊高、太高時腳下墊踏板；洗碗時身體貼近水槽。',
        why: '工作面太低會讓你整段時間彎腰，前彎時椎間盤壓力是站直的 2 倍以上。',
      },
      {
        title: '雙腳平均承重、膝蓋不要鎖死',
        how: '雙腳與肩同寬、膝蓋微彎、輕收小腹；等車時可以靠牆或倚著欄杆。',
        why: '長時間把重心掛在單腳或把膝蓋往後鎖，會讓骨盆歪斜、腰椎側邊受力不均。',
      },
      {
        title: '腰椎狹窄的人：微微前傾或扶著東西',
        how: '排隊或逛街時扶著購物車、欄杆，讓身體稍微前傾；需要時找地方坐一下。',
        why: '後仰會讓腰椎管變窄，前傾則讓空間變大，所以狹窄的人「彎腰推車」會比較舒服。',
      },
      {
        title: '選擇有緩衝、低跟的鞋子',
        how: '久站工作選鞋底有彈性、腳跟穩定的鞋；地面很硬時可加防疲勞地墊。',
        why: '減少足部疲勞，讓你能維持較放鬆的站姿。注意：一般鞋墊並沒有預防下背痛的證據。',
      },
    ],
  },
  {
    group: '動',
    title: '動：彎腰、提重、搬運與運動',
    intro: '研究量到最高的壓力出現在「彎腰駝背提重物」。好消息是只要讓東西貼近身體、用髖和膝一起蹲，就能明顯降低。',
    items: [
      {
        title: '提重物：貼近身體、屈膝屈髖、不扭轉',
        how: '先試重量 → 雙腳站在物品兩側 → 屈膝屈髖蹲下、背保持自然直線 → 收緊腹部、物品貼近肚子 → 用腿站起 → 要轉向時移動雙腳。',
        why: '同樣 20 公斤，彎腰駝背提起時椎間盤壓力 2.3 MPa，屈膝提 1.7 MPa，貼近身體拿著 1.1 MPa。',
        avoid: '膝蓋打直彎腰撿重物、提著重物同時扭腰。',
        figure: 'lift',
      },
      {
        title: '撿輕的東西：用「高爾夫撿球式」',
        how: '一手扶著桌子或椅背，另一腳往後抬起，像蹺蹺板一樣以髖關節為軸前傾。',
        why: '軀幹與後腳形成一直線，腰椎不需要深度彎曲。',
      },
      {
        title: '分兩手提、背包用雙肩',
        how: '購物袋分成兩袋左右手各一；背包兩條肩帶都背上、重量控制在體重 10–15% 內。',
        why: '單側負重會讓脊椎側彎、單邊肌肉過度出力。',
      },
      {
        title: '打噴嚏、咳嗽前先「準備好」',
        how: '急性腰痛時，打噴嚏前先扶住桌子、微彎膝、收緊腹部。',
        why: '研究量到打噴嚏時椎間盤壓力瞬間升高；預先支撐可減少突然的拉扯痛。',
      },
      {
        title: '做低處的家事：跪或蹲，不要彎腰',
        how: '幫小孩洗澡、拔草、擦地板時單膝跪地或坐小板凳；吸塵器選長桿、拖把用長柄。',
        why: '把長時間的前彎改成膝髖彎曲，腰椎維持在中間位置。',
      },
      {
        title: '每天走路，是對脊椎最友善的運動',
        how: '從每天 10 分鐘開始，每週增加 5 分鐘，目標每天累積 30 分鐘、一週 5 天。',
        why: '走路時椎間盤壓力和站立差不多；2024 年 WalkBack 試驗顯示，漸進走路計畫讓下背痛復發前的無痛期中位數多了約 3 個月（208 vs 112 天）。',
      },
    ],
  },
];

export const DAILY_CHECKLIST = [
  '每 30–60 分鐘站起來動 1–2 分鐘',
  '螢幕上緣與眼同高、手機舉到眼前',
  '今天走路累積 30 分鐘（可分 3 次）',
  '做 10 分鐘居家運動（收下巴、鳥狗式、臀橋）',
  '提東西貼近身體、用腳轉身不扭腰',
  '睡前不趴著滑手機',
  '仰睡膝下墊枕／側睡兩膝夾枕',
  '記錄麻痛位置與加重的動作',
];

// ── 5. Exercise ───────────────────────────────────────────────────────────────

export type ExerciseTarget = 'neck' | 'back' | 'nerve' | 'general';

export interface SpineExercise {
  id: string;
  name: string;
  target: ExerciseTarget;
  for_zh: string;
  steps: string[];
  dose: string;
  stop: string;
  grade: EvidenceGrade;
  figure: string;
}

export const EXERCISE_TARGET_META: Record<ExerciseTarget, string> = {
  neck: '頸部',
  back: '腰背',
  nerve: '神經滑動',
  general: '全身',
};

export const SPINE_EXERCISES: SpineExercise[] = [
  {
    id: 'chin-tuck',
    name: '收下巴（頸部深層屈肌）',
    target: 'neck',
    for_zh: '頭往前伸、久坐低頭、頸因性頭痛、頸部痠痛',
    steps: ['坐直，眼睛平視前方', '下巴水平往後收，像做出「雙下巴」，後腦勺往上延伸', '停 5 秒後放鬆，不要低頭'],
    dose: '10 下 × 每天 2–3 次',
    stop: '手臂麻痛變嚴重或往手指擴散',
    grade: 'B',
    figure: 'ex-chin-tuck',
  },
  {
    id: 'scap-squeeze',
    name: '肩胛後收下壓',
    target: 'neck',
    for_zh: '圓肩、肩頸緊繃、久坐辦公',
    steps: ['坐或站，手臂自然垂放', '把兩側肩胛骨往後、往下夾，像要夾住一支筆', '胸口自然打開，停 5 秒'],
    dose: '10 下 × 每天 2–3 次',
    stop: '肩膀前方刺痛',
    grade: 'B',
    figure: 'ex-scap',
  },
  {
    id: 'cat-camel',
    name: '貓牛式（脊椎活動度）',
    target: 'back',
    for_zh: '早上腰背僵硬、久坐後活動脊椎',
    steps: ['四足跪姿：手在肩膀正下方、膝蓋在髖正下方', '吐氣時背部往上拱、低頭（貓）', '吸氣時腹部放鬆往下、微微抬頭（牛），在不痛的範圍內慢慢來回'],
    dose: '慢慢做 8–10 個來回',
    stop: '腿麻往下擴散',
    grade: 'C',
    figure: 'ex-cat-camel',
  },
  {
    id: 'bird-dog',
    name: '鳥狗式（核心穩定）',
    target: 'back',
    for_zh: '下背痛復發預防、核心控制不佳',
    steps: ['四足跪姿，背部維持自然平直', '慢慢伸出右手與左腳，伸到與身體成一直線', '骨盆不歪、不塌腰，停 5–10 秒後換邊'],
    dose: '每邊 6–8 下 × 1–2 組',
    stop: '腰部刺痛或無法維持骨盆水平',
    grade: 'B',
    figure: 'ex-bird-dog',
  },
  {
    id: 'dead-bug',
    name: '死蟲式（深層腹肌）',
    target: 'back',
    for_zh: '核心無力、仰臥時腰部懸空',
    steps: ['仰躺，雙手朝天花板、雙膝 90 度抬起', '腰輕輕貼地，吐氣時把右手往頭上、左腳往前伸', '回到原位換邊，全程腰不離地'],
    dose: '每邊 6–8 下 × 1–2 組',
    stop: '腰部拱起離地或疼痛',
    grade: 'B',
    figure: 'ex-dead-bug',
  },
  {
    id: 'bridge',
    name: '臀橋（臀肌強化）',
    target: 'back',
    for_zh: '久坐臀肌無力、下背痛、上下樓梯不穩',
    steps: ['仰躺屈膝，雙腳踩地與髖同寬', '收緊臀部，把骨盆往上推到膝蓋、髖、肩成一直線', '停 3 秒後慢慢放下'],
    dose: '10–15 下 × 2–3 組',
    stop: '腰部（而不是臀部）在出力或疼痛',
    grade: 'B',
    figure: 'ex-bridge',
  },
  {
    id: 'press-up',
    name: '俯臥撐起（McKenzie 後仰）',
    target: 'back',
    for_zh: '前彎與久坐會加重、後仰比較舒服的腰痛或腿痛（常見於椎間盤問題）',
    steps: ['趴下，雙手放在肩膀旁', '骨盆貼地、腰部放鬆，用手把上半身慢慢撐起', '停 1–2 秒後放下，在不痛範圍內逐漸撐高'],
    dose: '10 下 × 每天 3–5 次（找到方向偏好時）',
    stop: '腿麻或痛往腳底「跑出去」（周邊化）；腰椎狹窄者通常不適合',
    grade: 'B',
    figure: 'ex-press-up',
  },
  {
    id: 'knee-chest',
    name: '單／雙膝抱胸（前彎舒緩）',
    target: 'back',
    for_zh: '後仰與久站會加重、坐下彎腰比較舒服的腰痛（常見於腰椎狹窄）',
    steps: ['仰躺屈膝', '雙手抱住一側或兩側膝蓋，慢慢拉向胸口', '腰背感覺被拉開，停 20–30 秒'],
    dose: '3 次 × 每天 2 次',
    stop: '腿麻加重；剛發生的椎間盤突出急性期先避免',
    grade: 'C',
    figure: 'ex-knee-chest',
  },
  {
    id: 'sciatic-slider',
    name: '坐骨神經滑動',
    target: 'nerve',
    for_zh: '腿部麻痛、直膝抬腿會拉到腿後',
    steps: ['坐在椅子前緣，雙手扶椅', '把一側膝蓋伸直、腳踝往上勾的同時，抬頭看天花板', '膝蓋彎回、腳放下的同時低頭，兩個動作交替、像拉鋸一樣流暢'],
    dose: '10–15 下 × 每天 2–3 次',
    stop: '麻感在做完後持續超過 30 分鐘或加重',
    grade: 'B',
    figure: 'ex-sciatic',
  },
  {
    id: 'median-slider',
    name: '正中神經滑動',
    target: 'nerve',
    for_zh: '腕隧道症候群、頸椎 C6–C7 神經根症狀',
    steps: ['手臂往側面打開約 90 度，手肘伸直、手掌朝上', '手腕往上翹（手指朝地）的同時，頭往同側歪', '手腕放鬆的同時，頭往對側歪，交替進行'],
    dose: '10 下 × 每天 2–3 次',
    stop: '麻感明顯加重或持續不退',
    grade: 'C',
    figure: 'ex-median',
  },
  {
    id: 'walking',
    name: '漸進式走路',
    target: 'general',
    for_zh: '所有沒有急性警訊的頸腰痛、預防復發',
    steps: ['從可輕鬆完成的時間開始（例如 10 分鐘）', '每週增加約 5 分鐘，速度到「能說話但唱不了歌」', '目標每天累積 30 分鐘、每週 5 天'],
    dose: '每週約 150 分鐘',
    stop: '走路誘發的腿麻需要坐下才緩解時，改成分段走並就醫評估',
    grade: 'B',
    figure: 'ex-walk',
  },
];

export const PAIN_TRAFFIC_LIGHT = [
  { light: '綠燈', range: '0–2 分', meaning: '可以照計畫進行，也可以逐步增加次數。', tone: 'good' as const },
  { light: '黃燈', range: '3–5 分', meaning: '可接受，但隔天早上要回到原本程度；否則下次減量。', tone: 'warn' as const },
  { light: '紅燈', range: '>5 分，或麻往手腳末端擴散', meaning: '停止這個動作，改做其他舒服的動作；持續則就醫。', tone: 'bad' as const },
];

// ── 6. Prevention & treatment ─────────────────────────────────────────────────

export interface PreventionItem {
  action: string;
  effect: string;
  grade: EvidenceGrade;
  verdict: '推薦' | '可考慮' | '無效';
  source?: string;
}

export const PREVENTION: PreventionItem[] = [
  { action: '運動＋衛教', effect: '下背痛發作風險約下降 45%（RR 0.55）', grade: 'A', verdict: '推薦', source: 'STEFFENS2016' },
  { action: '單純運動', effect: '發作風險約下降 35%（RR 0.65），停止運動後效果會消退', grade: 'B', verdict: '推薦', source: 'STEFFENS2016' },
  { action: '個別化漸進走路計畫', effect: '復發前的無痛期中位數 208 天 vs 112 天', grade: 'B', verdict: '推薦', source: 'WALKBACK2024' },
  { action: '維持健康體重、戒菸', effect: '觀察性研究顯示肥胖與吸菸者下背痛與坐骨神經痛較多', grade: 'C', verdict: '可考慮' },
  { action: '改善睡眠與壓力', effect: '睡眠不足與心理壓力會放大疼痛、增加轉為慢性的風險', grade: 'C', verdict: '可考慮' },
  { action: '單純衛教（只發手冊）', effect: '沒有預防效果（RR 1.03）', grade: 'B', verdict: '無效', source: 'STEFFENS2016' },
  { action: '護腰帶', effect: '沒有預防效果（RR 1.01）；WHO 不建議常規使用', grade: 'B', verdict: '無效', source: 'STEFFENS2016' },
  { action: '鞋墊', effect: '沒有預防效果（RR 1.01）', grade: 'B', verdict: '無效', source: 'STEFFENS2016' },
];

export interface LadderStep {
  step: number;
  title: string;
  who: string;
  items: string[];
  grade: EvidenceGrade;
}

export const TREATMENT_LADDER: LadderStep[] = [
  {
    step: 1,
    title: '自我照護與衛教',
    who: '每一個人都從這裡開始',
    items: ['維持日常活動、不臥床', '熱敷舒緩肌肉', '了解自然病程，降低對疼痛的恐懼', '調整工作與睡眠姿勢'],
    grade: 'A',
  },
  {
    step: 2,
    title: '運動治療與物理治療',
    who: '大多數人在這一階明顯改善',
    items: ['個別化運動處方', '徒手治療搭配運動', '神經鬆動術', '認知功能治療（CFT）'],
    grade: 'A',
  },
  {
    step: 3,
    title: '短期藥物輔助',
    who: '疼痛影響活動與睡眠時',
    items: ['外用或口服消炎止痛藥', '短期肌肉鬆弛劑', '慢性期可考慮 duloxetine', '依病因治療神經病變'],
    grade: 'B',
  },
  {
    step: 4,
    title: '介入性注射',
    who: '神經根痛嚴重、保守治療數週仍難以忍受',
    items: ['硬脊膜外類固醇注射', '選擇性神經根阻斷', '小面關節射頻（特定族群）'],
    grade: 'C',
  },
  {
    step: 5,
    title: '手術',
    who: '少數：有明確神經壓迫且符合手術適應症',
    items: ['椎間盤切除（顯微／內視鏡）', '減壓手術', '頸椎前路減壓融合或人工椎間盤', '必要時融合固定'],
    grade: 'B',
  },
];

/** Chiu 2015: probability of spontaneous regression by herniation type. */
export const HERNIATION_REGRESSION = [
  { type: '膨出', en: 'Bulging', pct: 13, plain: '纖維環整圈往外鼓' },
  { type: '突出', en: 'Protrusion', pct: 41, plain: '局部往外凸、底部寬' },
  { type: '脫出', en: 'Extrusion', pct: 70, plain: '髓核穿出、頭比底部大' },
  { type: '游離', en: 'Sequestration', pct: 96, plain: '碎片與椎間盤分離' },
];

export const NATURAL_COURSE = [
  { when: '0–2 週', what: '急性期：疼痛最明顯，找舒服姿勢、短暫用藥、盡量維持活動。' },
  { when: '2–6 週', what: '多數急性下背痛在這段期間明顯改善。' },
  { when: '6–12 週', what: '多數神經根痛逐漸緩解；仍嚴重或出現無力時，重新評估（含影像）。' },
  { when: '> 12 週', what: '轉為慢性：重點改為運動、睡眠、壓力與疼痛衛教的整合治療。' },
];

export const SURGERY_INDICATIONS = [
  { level: 'now' as Urgency, text: '馬尾症候群（大小便異常、鞍區麻木）——緊急減壓' },
  { level: 'soon' as Urgency, text: '進行性肌肉無力（例如垂足逐漸惡化）' },
  { level: 'soon' as Urgency, text: '中重度或持續惡化的頸椎脊髓病變' },
  { level: 'clinic' as Urgency, text: '影像與症狀相符的神經根痛，完整保守治療 6–12 週仍嚴重影響生活' },
  { level: 'clinic' as Urgency, text: '腰椎狹窄使行走距離明顯受限、保守治療無效' },
];

export interface SurgeryRow {
  name: string;
  for_zh: string;
  how: string;
  recovery: string;
  note: string;
}

export const SURGERY_TABLE: SurgeryRow[] = [
  {
    name: '腰椎椎間盤切除術（顯微／內視鏡）',
    for_zh: '椎間盤突出造成的坐骨神經痛',
    how: '只移除壓到神經的椎間盤碎片',
    recovery: '多數數天內下床，數週回到輕度工作',
    note: '早期手術腿痛緩解較快，但 1 年後結果與延長保守治療相近（Peul 2007）；同節段再突出約 5–15%',
  },
  {
    name: '腰椎減壓椎板切除術',
    for_zh: '腰椎椎管狹窄、行走距離受限',
    how: '切除部分椎板、增厚的黃韌帶與骨刺，擴大椎管',
    recovery: '數天至數週',
    note: '目標是改善腿部症狀與行走距離；下背痛不一定改善',
  },
  {
    name: '減壓＋融合固定術',
    for_zh: '合併不穩定的滑脫或變形',
    how: '減壓後用骨釘與植骨讓該節段長成一塊',
    recovery: '數週至數月',
    note: '單純退化性下背痛不建議融合；可能增加相鄰節段退化',
  },
  {
    name: '頸椎前路椎間盤切除融合術（ACDF）',
    for_zh: '頸椎神經根病變或脊髓病變',
    how: '從脖子前方移除椎間盤與骨刺，置入支架融合',
    recovery: '多數 1–2 天出院，數週恢復',
    note: '暫時吞嚥卡卡、聲音沙啞是常見短期副作用',
  },
  {
    name: '人工頸椎間盤置換',
    for_zh: '經篩選的 1–2 節頸椎病變',
    how: '移除椎間盤後置入可活動的人工椎間盤',
    recovery: '與 ACDF 相近',
    note: '保留活動度；嚴重小面關節退化或不穩定者不適合',
  },
  {
    name: '頸椎椎板成形術',
    for_zh: '多節段脊髓病變、後縱韌帶骨化症',
    how: '從後方把椎板像開門一樣撐開擴大椎管',
    recovery: '數週',
    note: '術後部分人有頸部痠痛或 C5 神經麻痺',
  },
  {
    name: '腕隧道鬆解術',
    for_zh: '保守治療無效或已有肌肉萎縮的腕隧道症候群',
    how: '切開手腕掌側的橫腕韌帶，讓正中神經減壓',
    recovery: '數週恢復握力',
    note: '若手麻其實來自頸椎，這個手術不會改善——術前神經傳導檢查很重要',
  },
];

// ── 7. Medications ────────────────────────────────────────────────────────────

export interface SpineMed {
  id: string;
  klass: string;
  examples: string;
  pain: string;
  evidence: string;
  grade: EvidenceGrade;
  side_effects: string;
  caution: string;
  tip: string;
}

export const SPINE_MEDS: SpineMed[] = [
  {
    id: 'nsaid-topical',
    klass: '外用消炎止痛（藥膏、貼布）',
    examples: 'diclofenac 凝膠、ketoprofen／loxoprofen 貼布',
    pain: '局部肌肉、關節痠痛',
    evidence: '局部痠痛有效，全身副作用比口服少很多',
    grade: 'B',
    side_effects: '皮膚紅癢、起疹',
    caution: 'ketoprofen 貼布會造成光過敏：使用期間與停用後約 4 週內，貼過的部位不要曬太陽',
    tip: '貼在痛點、避開傷口；不要同時貼好幾片或搭配大量口服止痛藥',
  },
  {
    id: 'nsaid-oral',
    klass: '口服非類固醇消炎止痛藥（NSAIDs）',
    examples: 'ibuprofen、naproxen、diclofenac、celecoxib、etoricoxib',
    pain: '急性下背痛、發炎性痠痛',
    evidence: '對急性與慢性下背痛有小到中等的止痛效果，是指引中藥物的首選',
    grade: 'B',
    side_effects: '胃痛、胃潰瘍出血、水腫、血壓上升、腎功能下降',
    caution: '慢性腎臟病、胃潰瘍病史、心血管疾病、長者，以及正在吃抗凝血劑或抗血小板藥的人，要先問醫師',
    tip: '最低有效劑量、最短時間；飯後吃；不要同時吃兩種 NSAIDs（感冒藥裡也可能有）',
  },
  {
    id: 'acetaminophen',
    klass: '乙醯胺酚',
    examples: 'acetaminophen（普拿疼 Panadol 等）',
    pain: '輕中度疼痛、不能用 NSAIDs 的人',
    evidence: '大型試驗顯示對急性下背痛的效果與安慰劑相近；對部分人仍可作為輔助',
    grade: 'C',
    side_effects: '依指示使用時很少',
    caution: '成人一天總量不超過 4,000 mg；肝病或每天飲酒者須依醫囑降低劑量',
    tip: '很多感冒藥、複方止痛藥（例如含 tramadol 的複方）也含乙醯胺酚，重複吃容易過量傷肝',
  },
  {
    id: 'muscle-relaxant',
    klass: '肌肉鬆弛劑',
    examples: 'tolperisone、eperisone、chlorzoxazone、baclofen、cyclobenzaprine',
    pain: '急性腰痛合併肌肉緊繃',
    evidence: '短期（≤2 週）可能小幅減輕疼痛，但效果小、副作用增加',
    grade: 'C',
    side_effects: '嗜睡、頭暈、口乾、無力',
    caution: '長者跌倒風險上升；不可與酒精、安眠藥併用；開車與操作機械要小心',
    tip: '只在急性期短期使用，不適合長期吃',
  },
  {
    id: 'gabapentinoid',
    klass: '神經痛藥物（加巴噴丁類）',
    examples: 'pregabalin（Lyrica）、gabapentin（Neurontin）',
    pain: '神經病變痛：灼熱、電擊、針刺感',
    evidence: '對糖尿病神經痛、帶狀疱疹後神經痛有效；對坐骨神經痛的大型試驗並不比安慰劑好',
    grade: 'C',
    side_effects: '頭暈、嗜睡、水腫、體重增加、視力模糊',
    caution: '腎功能不佳須調整劑量；與鴉片類、安眠藥、酒精併用可能抑制呼吸；不要突然停藥',
    tip: '從低劑量開始；若吃了 4–8 週沒有明顯幫助，和醫師討論是否停藥',
  },
  {
    id: 'snri',
    klass: '血清素與正腎上腺素再回收抑制劑（SNRI）',
    examples: 'duloxetine（Cymbalta）',
    pain: '慢性下背痛、退化性關節炎痛、糖尿病神經痛',
    evidence: '慢性下背痛有小到中等效果，屬第二線選擇',
    grade: 'B',
    side_effects: '噁心、口乾、便祕、失眠或嗜睡、出汗、血壓上升',
    caution: '與 tramadol、其他抗憂鬱藥併用可能引發血清素症候群；與 NSAIDs 併用出血風險增加；不可自行突然停藥',
    tip: '它不是只給憂鬱症的人吃——也能調節大腦的疼痛訊號，通常需要 2–4 週才看得出效果',
  },
  {
    id: 'tca',
    klass: '三環類抗憂鬱劑（低劑量）',
    examples: 'amitriptyline、nortriptyline',
    pain: '神經病變痛、合併失眠的慢性疼痛',
    evidence: '神經痛有一定效果；對下背痛證據有限',
    grade: 'C',
    side_effects: '口乾、便祕、嗜睡、姿勢性低血壓、排尿困難',
    caution: '長者、心律不整、青光眼、攝護腺肥大者應避免或謹慎使用',
    tip: '通常睡前低劑量服用',
  },
  {
    id: 'steroid-oral',
    klass: '口服類固醇（短期）',
    examples: 'prednisolone、methylprednisolone',
    pain: '急性神經根病變',
    evidence: '對腰椎神經根病變的功能有小幅改善，疼痛改善不明顯',
    grade: 'C',
    side_effects: '血糖升高、失眠、情緒起伏、胃部不適',
    caution: '糖尿病患者要密切監測血糖；與 NSAIDs 併用增加胃出血風險',
    tip: '只用數天的短療程，不可長期使用',
  },
  {
    id: 'tramadol',
    klass: '弱效鴉片類止痛藥',
    examples: 'tramadol、tramadol＋acetaminophen 複方（Ultracet）',
    pain: '其他藥物無效的嚴重疼痛',
    evidence: '短期止痛效果小；WHO 2023 不建議慢性下背痛常規使用鴉片類',
    grade: 'D',
    side_effects: '噁心、頭暈、便祕、嗜睡，長期有依賴風險',
    caution: '與 SNRI／SSRI 併用可能引發血清素症候群或癲癇；不可與酒精、安眠藥併用',
    tip: '只作短期最後選擇；複方已含乙醯胺酚，不要再另外吃普拿疼',
  },
  {
    id: 'b12',
    klass: '維生素 B12（甲鈷胺）',
    examples: 'mecobalamin（Methycobal）、cyanocobalamin',
    pain: '手腳麻木，特別是 B12 不足者',
    evidence: 'B12 不足造成的神經病變有效；對沒有缺乏的神經根壓迫，證據有限',
    grade: 'C',
    side_effects: '很少',
    caution: '長期吃 metformin、胃切除、全素、長期制酸劑的人，建議抽血確認 B12',
    tip: '「缺多少補多少」：先驗再補，比盲目長期吃更有意義',
  },
];

export const PAIN_TYPES = [
  {
    type: '傷害感受型疼痛',
    feel: '痠、脹、悶痛，按壓有痛點，動作時加重',
    examples: '肌肉拉傷、小面關節痛、急性非特異性下背痛',
    approach: '維持活動、熱敷、外用或口服 NSAIDs、運動治療',
  },
  {
    type: '神經病變型疼痛',
    feel: '灼熱、電擊、針刺、螞蟻爬、麻木，沿神經分布',
    examples: '神經根病變、腕隧道症候群、糖尿病神經病變',
    approach: '依病因治療；運動與神經滑動；神經痛藥物對周邊神經病變效果較好',
  },
  {
    type: '痛覺敏感化（慢性疼痛）',
    feel: '範圍廣、程度與組織受傷不成比例，壓力與失眠時更痛',
    examples: '超過 3 個月的慢性下背痛、合併多處疼痛',
    approach: '漸進運動、疼痛衛教、認知功能治療、改善睡眠，必要時 duloxetine',
  },
];

export const DRUG_INTERACTIONS = [
  { combo: 'NSAIDs ＋ 抗凝血劑／抗血小板藥（warfarin、新型抗凝血劑、aspirin、clopidogrel）', risk: '出血（尤其胃腸道）', tone: 'bad' as const },
  { combo: 'NSAIDs ＋ 降血壓藥（ACEI／ARB）＋ 利尿劑', risk: '急性腎損傷（俗稱「三重打擊」）', tone: 'bad' as const },
  { combo: 'Tramadol ＋ duloxetine 或其他抗憂鬱藥', risk: '血清素症候群（發燒、顫抖、躁動）、癲癇', tone: 'bad' as const },
  { combo: '神經痛藥物／肌肉鬆弛劑／鴉片類 ＋ 安眠藥或酒精', risk: '過度嗜睡、呼吸抑制、跌倒', tone: 'bad' as const },
  { combo: '複方止痛藥 ＋ 感冒藥 ＋ 普拿疼', risk: '乙醯胺酚重複、超量傷肝', tone: 'warn' as const },
  { combo: '口服類固醇 ＋ NSAIDs', risk: '胃潰瘍與出血風險增加', tone: 'warn' as const },
  { combo: '口服類固醇 ＋ 糖尿病', risk: '血糖明顯升高，需加強監測', tone: 'warn' as const },
];

export const MED_RED_LINES = [
  '長期使用鴉片類止痛藥：效果有限、依賴與過量風險明確。',
  '用鎮靜安眠藥（苯二氮平類）治療腰痛：沒有好處、增加跌倒與依賴。',
  '來路不明的「骨刺藥」「神經痛特效藥」：可能非法摻入類固醇或止痛藥，造成血糖、血壓與胃出血問題。',
  '自行長期吃高劑量維生素 B6：歐盟 2023 年把成人每日上限訂為 12 mg，過量反而會造成手腳麻。',
  '宣稱能「溶解骨刺」的食品或藥物：骨刺是骨頭，不會被吃掉。',
];

// ── 8. Physical therapy ───────────────────────────────────────────────────────

export interface PtModality {
  id: string;
  name: string;
  kind: '被動' | '主動' | '輔具';
  what: string;
  feel: string;
  grade: EvidenceGrade;
  verdict: string;
}

export const PT_MODALITIES: PtModality[] = [
  { id: 'exercise', name: '個別化運動治療', kind: '主動', what: '依你的問題設計肌力、穩定、柔軟度與有氧運動，並逐步加量', feel: '剛開始會痠，逐漸變輕鬆', grade: 'A', verdict: '所有指引的第一線核心治療' },
  { id: 'cft', name: '認知功能治療（CFT）與疼痛衛教', kind: '主動', what: '找出讓疼痛持續的動作習慣與擔心，透過再教育重新建立信心與動作', feel: '像一對一的教練課', grade: 'B', verdict: '2023 年 Lancet 試驗顯示可長期改善慢性下背痛失能' },
  { id: 'mdt', name: 'McKenzie 力學診斷治療（MDT）', kind: '主動', what: '用反覆動作找出能讓症狀集中化的「方向偏好」，再設計居家運動', feel: '反覆前彎或後仰的動作', grade: 'B', verdict: '對有方向偏好的人特別有幫助' },
  { id: 'neural', name: '神經鬆動術（神經滑動）', kind: '主動', what: '讓神經在周圍組織中來回滑動，減少敏感度', feel: '輕微拉扯、麻，不應該痛', grade: 'B', verdict: '對神經根痛與腕隧道症狀有中等證據' },
  { id: 'manual', name: '徒手治療／脊椎鬆動術', kind: '被動', what: '治療師用手推動關節與軟組織', feel: '被按壓、推動，有時聽到聲響', grade: 'B', verdict: '短期改善疼痛，搭配運動效果較好；頸部快速扭轉手法需由合格人員評估' },
  { id: 'heat', name: '熱敷（濕熱包、熱敷墊）', kind: '被動', what: '表淺加熱讓肌肉放鬆、暫時減痛', feel: '溫熱', grade: 'B', verdict: '急性下背痛短期有效，在家就能做' },
  { id: 'massage', name: '按摩', kind: '被動', what: '軟組織放鬆', feel: '舒服、放鬆', grade: 'C', verdict: '短期舒緩，可作為輔助' },
  { id: 'acupuncture', name: '針灸／乾針', kind: '被動', what: '以細針刺激肌肉與穴位', feel: '痠脹感', grade: 'C', verdict: '指引意見分歧：WHO、ACP 列為可考慮，NICE 不建議用於下背痛' },
  { id: 'cervical-traction', name: '頸椎牽引', kind: '被動', what: '機器沿頸椎方向輕拉，短暫增加神經孔空間', feel: '脖子被往上拉', grade: 'C', verdict: '部分頸神經根病變合併運動時可能有幫助，研究結果不一致' },
  { id: 'collar', name: '頸圈（短期）', kind: '輔具', what: '限制頸部活動讓發炎的神經休息', feel: '脖子被固定', grade: 'C', verdict: '新發頸神經根病變可短期（約 3 週內）使用，之後要逐步恢復活動' },
  { id: 'shortwave', name: '短波／微波深層熱療', kind: '被動', what: '電磁波加熱深層組織', feel: '溫熱', grade: 'D', verdict: '證據不足，效果大致與一般熱敷相當' },
  { id: 'tens', name: '經皮神經電刺激（TENS）', kind: '被動', what: '用電流刺激皮膚神經，暫時蓋過疼痛訊號', feel: '麻麻刺刺', grade: 'D', verdict: 'WHO 2023 與 NICE 不建議常規使用；可作短暫舒緩' },
  { id: 'ifc', name: '干擾波（中頻電療）', kind: '被動', what: '兩組中頻電流在深處交會刺激', feel: '震動、麻感', grade: 'D', verdict: 'NICE 不建議用於下背痛' },
  { id: 'ultrasound', name: '治療性超音波', kind: '被動', what: '高頻聲波加熱深層組織', feel: '幾乎沒有感覺或微溫', grade: 'D', verdict: 'WHO 2023 與 NICE 不建議' },
  { id: 'lumbar-traction', name: '腰椎牽引', kind: '被動', what: '機器拉開腰椎', feel: '腰被拉長', grade: 'D', verdict: 'Cochrane 回顧沒有證據顯示有效；WHO 2023 不建議' },
  { id: 'brace', name: '護腰（長期）', kind: '輔具', what: '外部支撐腰部', feel: '被包緊', grade: 'D', verdict: '沒有預防效果，長期使用可能讓核心更無力；WHO 不建議常規使用' },
];

export const PT_QUESTIONS = [
  '我的問題比較屬於哪一類？（肌肉關節、神經根、狹窄、敏感化）',
  '我回家該做哪些運動？每次幾下、一天幾次？',
  '哪些動作要暫時避免？什麼時候可以恢復？',
  '電療、熱敷要做多久？目標是什麼？什麼時候可以停？',
  '出現哪些情況要提早回診？',
];

// ── 9. Triage ─────────────────────────────────────────────────────────────────

export const RED_FLAG_TIERS: { level: Urgency; items: string[] }[] = [
  {
    level: 'now',
    items: [
      '小便解不出來、漏尿或大便失禁',
      '會陰部、肛門周圍、大腿內側（坐的地方）麻木',
      '雙腿在數小時到數天內快速變無力',
      '突然單側臉、手、腳麻或無力，嘴歪、說話不清',
      '車禍、跌倒等外傷後頸部或背部劇痛，或合併手腳麻',
      '突然撕裂般的胸背劇痛（需排除主動脈剝離）',
    ],
  },
  {
    level: 'soon',
    items: [
      '腳板抬不起（垂足）、踮不起腳尖，或無力逐漸加重',
      '雙手變笨拙、走路不穩（疑似脊髓病變）',
      '背痛合併發燒、畏寒，或免疫力低下、近期感染、注射藥物',
      '有癌症病史，出現新的背痛',
      '不明原因體重減輕、夜間痛醒、躺著休息也不會緩解',
      '50 歲以上新發背痛，或骨質疏鬆、長期吃類固醇者輕微受力後背痛（疑壓迫性骨折）',
    ],
  },
  {
    level: 'clinic',
    items: [
      '手腳麻痛超過 2 週沒有改善，或反覆發作',
      '疼痛影響睡眠、工作或日常生活',
      '夜間手麻常常醒來（疑似腕隧道症候群）',
      '有糖尿病且腳麻、腳底感覺變差（每年應做足部檢查）',
      '走路一段距離就腿麻需要坐下',
    ],
  },
  {
    level: 'self',
    items: [
      '沒有上述警訊的腰痠背痛、落枕',
      '換姿勢幾分鐘內就恢復的手腳麻',
      '久坐、搬東西後的肌肉痠痛',
    ],
  },
];

export const SPINE_DEPARTMENTS = [
  { dept: '急診', when: '任何「立即急診」等級警訊', does: '緊急影像、會診神經外科或神經內科' },
  { dept: '家醫科', when: '不確定看哪一科、需要整體評估與抽血', does: '初步評估、篩檢糖尿病與 B12 等原因、轉介' },
  { dept: '復健科', when: '頸腰痛、神經根痛、腕隧道症候群的非手術治療', does: '理學檢查、神經傳導與肌電圖、開立物理治療與運動處方、注射' },
  { dept: '骨科（脊椎）', when: '需要評估脊椎結構或手術', does: 'X 光與 MRI 判讀、保守治療、手術評估' },
  { dept: '神經外科', when: '脊髓或神經壓迫、考慮手術', does: '脊髓病變與神經根壓迫的手術評估與治療' },
  { dept: '神經內科', when: '雙側對稱麻、疑似周邊神經病變或中風', does: '神經學檢查、神經傳導與肌電圖、找出全身性原因' },
  { dept: '新陳代謝科', when: '糖尿病合併腳麻', does: '血糖控制、神經病變追蹤與足部照護' },
  { dept: '疼痛科／麻醉科', when: '嚴重神經根痛需要介入治療', does: '影像導引注射、神經阻斷、射頻' },
];

export const SPINE_TESTS = [
  {
    test: 'X 光（含前彎後仰動態片）',
    shows: '骨頭排列、骨刺、椎間隙變窄、滑脫與不穩定、骨折',
    not: '看不到神經、椎間盤與脊髓',
    when: '外傷、疑似骨折或滑脫；沒有警訊的急性腰痛前 4–6 週通常不需要',
  },
  {
    test: '磁振造影（MRI）',
    shows: '椎間盤、神經根、脊髓、韌帶，也能看感染與腫瘤',
    not: '無症狀的人也常有「異常」，需由醫師對照症狀判讀',
    when: '有警訊、神經學缺損，或保守治療 6–12 週無效而考慮注射或手術；健保給付依醫師判斷的適應症',
  },
  {
    test: '電腦斷層（CT）',
    shows: '骨頭細節：骨折、骨刺、後縱韌帶骨化',
    not: '軟組織與神經對比不如 MRI',
    when: '無法做 MRI（如部分心律調節器）或需要看骨頭細節時',
  },
  {
    test: '神經傳導檢查／肌電圖（NCS／EMG）',
    shows: '神經是否受損、在哪一段（神經根或周邊神經）、嚴重程度',
    not: '早期（2–3 週內）的神經根病變可能還測不出來',
    when: '區分頸椎問題與腕隧道、肘隧道、周邊神經病變；評估手術前的神經狀況',
  },
  {
    test: '抽血',
    shows: '血糖與糖化血色素、維生素 B12、甲狀腺、腎功能、發炎指數',
    not: '不能看出脊椎壓迫',
    when: '雙側對稱麻、疑似周邊神經病變，或懷疑感染時',
  },
  {
    test: '骨密度（DXA）',
    shows: '骨質疏鬆程度',
    not: '不能診斷疼痛原因',
    when: '停經後女性、長者、長期類固醇使用，或已有壓迫性骨折時',
  },
];

export const VISIT_PREP = [
  '麻痛的位置：在身體圖上畫出來，標示最痛與最麻的地方',
  '什麼時候開始？突然還是慢慢出現？有沒有受傷？',
  '什麼姿勢或動作會加重？什麼會減輕？（坐、站、走、彎腰、後仰、咳嗽）',
  '有沒有變無力？例如拿不穩東西、腳板拍地、上樓梯腳軟',
  '大小便是否有變化？',
  '目前吃的所有藥物與保健品（包含 B 群、止痛藥、中藥）',
  '過去的影像或檢查報告',
];

// ── Myths & quiz ──────────────────────────────────────────────────────────────

export const SPINE_MYTHS: { chapter: SpineTab; myth: string; fact: string }[] = [
  { chapter: 'SPURS', myth: '長骨刺一定要開刀拿掉。', fact: '多數骨刺沒有症狀，手術只用在神經被壓迫且出現對應症狀、保守治療無效或有警訊的人，而且手術目的是「減壓」而不是把骨刺清乾淨。' },
  { chapter: 'SPURS', myth: '有些食物或藥可以把骨刺消掉。', fact: '骨刺是骨頭，沒有任何食物、保健品或藥物能溶掉它。治療目標是改善症狀與功能。' },
  { chapter: 'SPURS', myth: 'MRI 報告寫「椎間盤突出」，痛一定是它造成的。', fact: '40 歲無症狀的人約三分之一有椎間盤突出，醫師需要把影像、症狀與神經學檢查三者對起來才能判斷。' },
  { chapter: 'NUMBNESS', myth: '手麻就是頸椎壓到神經。', fact: '腕隧道症候群、肘隧道症候群、糖尿病或 B12 不足造成的神經病變都很常見；麻的分布與伴隨症狀能幫忙區分。' },
  { chapter: 'POSTURE', myth: '坐著一定要挺得筆直才不傷腰。', fact: '研究量到刻意挺直坐的椎間盤壓力反而比放鬆坐高；靠著椅背、常常換姿勢才是重點。' },
  { chapter: 'POSTURE', myth: '腰痛就應該躺在床上休息。', fact: '維持可忍受的日常活動比臥床恢復更快；長時間臥床反而讓肌肉無力、更容易轉為慢性。' },
  { chapter: 'TREATMENT', myth: '椎間盤突出不會自己好，一定要手術。', fact: '多數會隨時間改善，越大塊的脫出或游離型反而越容易被身體吸收縮小。' },
  { chapter: 'TREATMENT', myth: '戴護腰可以預防閃到腰。', fact: '統合分析顯示護腰帶沒有預防效果；規律運動才有。' },
  { chapter: 'MEDS', myth: '維生素 B 群吃越多，神經修復越快。', fact: 'B12 只對缺乏的人有明確效果；B6 長期過量反而會造成周邊神經病變。' },
  { chapter: 'MEDS', myth: '神經痛藥物對所有「神經痛」都有效。', fact: 'pregabalin 對糖尿病神經痛有效，但大型試驗顯示對坐骨神經痛的效果並不比安慰劑好，副作用卻比較多。' },
  { chapter: 'REHAB', myth: '每天去復健科做電療、拉腰就會好。', fact: '電療與牽引屬於被動治療，證據有限；真正改善長期結果的是運動與動作再教育。' },
  { chapter: 'REHAB', myth: '拉腰、拉脖子可以把突出的椎間盤「拉回去」。', fact: '牽引無法把椎間盤推回原位；腰椎牽引在 Cochrane 回顧中沒有證據顯示有效。' },
  { chapter: 'TRIAGE', myth: '腰痛越早照 MRI 越好。', fact: '沒有警訊時，前 4–6 週做影像不會讓你好得更快，反而可能因為看到常見的退化而增加焦慮與不必要的治療。' },
];

export const SPINE_QUIZ: Record<SpineTab, { question: string; options: string[]; answer: number; explain: string }> = {
  OVERVIEW: {
    question: '成人的脊髓大約在哪裡結束？',
    options: ['第 7 頸椎', '第 12 胸椎上方', '第 1–2 腰椎附近', '尾骨'],
    answer: 2,
    explain: '脊髓在第 1–2 腰椎附近結束，以下是一束馬尾神經。所以腰椎問題壓到的是神經根或馬尾，而不是脊髓本身。',
  },
  SPURS: {
    question: '一位 60 歲、完全沒有腰痛的人做腰椎 MRI，最可能看到什麼？',
    options: ['完全正常', '大約九成有椎間盤退化', '一定有椎間盤游離', '腫瘤'],
    answer: 1,
    explain: '統合研究顯示 60 歲無症狀者約 88% 有椎間盤退化、69% 有椎間盤膨出。影像所見要和症狀一起解讀。',
  },
  NUMBNESS: {
    question: '晚上常麻醒、甩甩手就好，麻在拇指到無名指半邊、小指不麻，最可能是？',
    options: ['C8 神經根病變', '腕隧道症候群', '糖尿病神經病變', '中風'],
    answer: 1,
    explain: '正中神經負責拇指到無名指半邊的手掌側，夜間麻醒與甩手緩解是腕隧道症候群的典型特徵。',
  },
  POSTURE: {
    question: '同樣提起 20 公斤，哪一種方式椎間盤壓力最低？',
    options: ['膝蓋打直彎腰提', '屈膝蹲下提', '屈膝並讓物品貼近身體', '單手提起後轉身'],
    answer: 2,
    explain: 'Wilke 1999 量到：圓背提 2.3 MPa、屈膝提 1.7 MPa、貼近身體拿著 1.1 MPa。距離越近、力臂越短。',
  },
  EXERCISE: {
    question: '做俯臥撐起後，原本在小腿的麻感往上收到臀部，代表什麼？',
    options: ['神經受損加重，要立刻停止', '症狀集中化，是好方向', '沒有意義', '需要立刻開刀'],
    answer: 1,
    explain: '症狀從肢體末端往脊椎中心收回來稱為「集中化」，通常代表這個方向的動作適合你、預後較好。',
  },
  TREATMENT: {
    question: '哪一種腰椎間盤突出最容易自行吸收縮小？',
    options: ['膨出', '突出', '脫出', '游離'],
    answer: 3,
    explain: 'Chiu 2015 統合研究：游離型約 96%、脫出型約 70% 會自行縮小，膨出型只有約 13%。',
  },
  MEDS: {
    question: '正在吃抗凝血劑的人，自行買哪一類止痛藥風險最高？',
    options: ['乙醯胺酚', '口服 NSAIDs', '熱敷', '維生素 B12'],
    answer: 1,
    explain: 'NSAIDs 會影響血小板與胃黏膜，與抗凝血劑併用會明顯增加出血風險，使用前一定要問醫師或藥師。',
  },
  REHAB: {
    question: '依據 WHO 2023 指引，以下哪一項「被建議」用於慢性下背痛？',
    options: ['腰椎牽引', '治療性超音波', '結構化運動計畫', '長期護腰'],
    answer: 2,
    explain: 'WHO 2023 建議結構化運動、徒手治療、心理介入等；牽引、超音波、TENS 與護腰則不建議常規使用。',
  },
  TRIAGE: {
    question: '下背痛合併哪一個症狀，應該立即到急診？',
    options: ['久坐後痠痛', '小便解不出來、會陰部麻木', '早上起床僵硬', '彎腰時拉扯痛'],
    answer: 1,
    explain: '尿滯留、會陰部（鞍區）麻木是馬尾症候群的警訊，需要緊急 MRI 與減壓手術，延誤可能造成永久失禁。',
  },
};
