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
  IOF2023: {
    id: 'IOF2023',
    label: '國際骨質疏鬆症基金會 (IOF) 骨鬆防治與脆性骨折臨床指引 2023',
    url: 'https://www.osteoporosis.foundation/',
  },
  AACE2020: {
    id: 'AACE2020',
    label: 'Camacho PM, et al. AACE/ACE 停經後骨質疏鬆症臨床實務指引. Endocr Pract 2020;26:1-46',
    url: 'https://doi.org/10.4158/GL-2020-0524',
  },
  GENANT1993: {
    id: 'GENANT1993',
    label: 'Genant HK, et al. 脊椎骨折半定量評估分類法 (Genant SQ). J Bone Miner Res 1993;8:1137-48',
    url: 'https://doi.org/10.1002/jbmr.5650080915',
  },
  BUCHBINDER2018: {
    id: 'BUCHBINDER2018',
    label: 'Buchbinder R, et al. 經皮椎體成形術治療骨質疏鬆性脊椎骨折 Cochrane 系統性回顧 2018',
    url: 'https://doi.org/10.1002/14651858.CD006349.pub3',
  },
  VAPOUR2016: {
    id: 'VAPOUR2016',
    label: 'Clark W, et al. 骨泥椎體成形術治療急性疼痛骨折隨機試驗 (VAPOUR). Lancet 2016;388:1408-16',
    url: 'https://doi.org/10.1016/S0140-6736(16)31341-1',
  },
  FREE2009: {
    id: 'FREE2009',
    label: 'Wardlaw D, et al. 氣球擴張椎體成形術治療急性脊椎骨折隨機試驗 (FREE trial). Lancet 2009;373:1016-24',
    url: 'https://doi.org/10.1016/S0140-6736(09)60010-6',
  },
  UBE2023: {
    id: 'UBE2023',
    label: 'Kim JE, Choi DJ. 雙通道脊椎內視鏡 (UBE) 減壓術臨床指引. Neurosurg Clin N Am 2023;34:495-508',
    url: 'https://doi.org/10.1016/j.nec.2023.02.008',
  },
  LIFTMOR2018: {
    id: 'LIFTMOR2018',
    label: 'Watson SL, et al. 高強度阻力與衝擊訓練改善骨質疏鬆 (LIFTMOR 試驗). J Bone Miner Res 2018;33:211-220',
    url: 'https://doi.org/10.1002/jbmr.3284',
  },
  MCGILL2010: {
    id: 'MCGILL2010',
    label: 'McGill SM. 核心訓練：改善表現與預防脊椎傷害的實證依據. Strength Cond J 2010;32:33-46',
    url: 'https://doi.org/10.1519/SSC.0b013e3181df4521',
  },
  TMGRGH261: {
    id: 'TMGRGH261',
    label: '臺中市立老人復健綜合醫院（委託中國醫藥大學興建經營）骨科部／微創脊椎中心：張建鈞副院長團隊臨床照護指引 (SNQ 國家品質標章)',
    url: 'https://www.tmgrgh.org.tw/Department/Detail?depid=261',
  },
  TMGRGH_FEATURE: {
    id: 'TMGRGH_FEATURE',
    label: '微創脊椎中心八大核心技術：3D電腦導航脊椎微創、內視鏡、OLIF側開與側彎駝背翻修矯形 (張建鈞、林琮凱、毛睿廷醫師團隊)',
    url: 'https://www.tmgrgh.org.tw/Department/Feature?depid=261',
  },
  TW_SPINE_CARE: {
    id: 'TW_SPINE_CARE',
    label: '台灣各大醫學中心（中國醫大體系、臺大、北榮、長庚、慈濟）脊椎骨折與手術術後護理指導共識（圓滾木翻身、背架穿戴與居家照護）',
    url: 'https://www.tmgrgh.org.tw/HealthEdus?type=1',
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
    title_zh: '一根會彎的彈簧柱：脊椎、生理曲線與神經分工',
    goal_zh: '先認識脊椎的零件與整體生物力學，後面讀到「骨刺壓到神經」「椎間盤突出」時，你就能在腦中畫出到底是哪裡出問題。',
    learn_zh: ['脊椎分成哪幾段、各有幾節', '四段生理曲線（頸前凸、胸後凸、腰前凸、薦椎）如何像彈簧般吸震', '為什麼脖子的問題會麻到手、腰的問題會麻到腳'],
    minutes: 6,
    takeaways_zh: [
      '成人脊椎由 7 節頸椎、12 節胸椎、5 節腰椎與薦骨、尾骨組成，三段彎曲像彈簧一樣分散走路與運動衝擊。',
      '脊柱矢狀位平衡（Sagittal Balance）：重力鉛垂線自 C7 穿過 S1 上後緣；生理曲線平坦化或過度駝背都會造成局部應力飆升。',
      '脊髓在第 1–2 腰椎附近就結束，以下是一束「馬尾」神經；所以頸椎問題可能影響手腳，腰椎問題主要影響下肢與大小便。',
      '每對神經根從「神經孔」出來，負責一塊固定的皮膚與肌肉，所以「麻在哪裡」能反推「哪一節出問題」。',
    ],
  },
  {
    id: 'SPURS',
    label_zh: '骨刺與退化',
    title_zh: '骨刺是什麼？為什麼「長骨刺」常常不是痛的原因',
    goal_zh: '骨刺是脊椎隨年齡退化時，骨頭在承受壓力的邊緣「長出來加固」的骨贅。它非常常見，大多數人一輩子都不會因此痛或麻。',
    learn_zh: ['骨刺怎麼形成（沃爾夫定律與退化連鎖反應）', '無症狀的人 MRI 也常看到退化與骨贅', '什麼情況骨刺才真的會壓到神經（孔狹窄 vs 椎管狹窄）'],
    minutes: 7,
    takeaways_zh: [
      '骨刺（骨贅）是退化的「結果」而非「病」：椎間盤脫水變薄、關節負擔變大，身體在受力邊緣增生骨頭以求穩定。',
      '80 歲無症狀的人，96% MRI 有椎間盤退化、84% 有椎間盤膨出——影像報告必須嚴格對照神經學臨床檢查。',
      '只有當骨刺、膨出的椎間盤與肥厚黃韌帶一同壓迫「神經根」或「椎管」，且產生對應皮節症狀時，才需針對其治療。',
      '沒有任何藥物或食物能「溶掉骨刺」；治療目標是消除神經根水腫、恢復肌肉功能，而不是抹平 X 光影像。',
    ],
  },
  {
    id: 'OSTEOPOROSIS',
    label_zh: '骨骼疏鬆',
    title_zh: '骨質疏鬆症：無聲的骨質流失、DXA T值與抗骨折新療法',
    goal_zh: '骨質疏鬆是「無聲的健康殺手」，平常完全不痛不癢，第一次有症狀往往就是突發性骨折。認識骨密度檢測、FRAX 風險評估與各類新一代促骨生成與抗骨吸收藥物。',
    learn_zh: ['DXA 骨密度 T 值與 FRAX 骨折風險評估門檻', '停經後雌激素驟降與骨重塑失衡機轉（RANKL/OPG 軸）', '抗吸收劑（雙磷酸鹽、保骼麗）與促生成劑（骨穩、益穩挺）的階梯策略'],
    minutes: 8,
    takeaways_zh: [
      '骨密度 T 值 ≤ -2.5 為骨質疏鬆；若已發生過站立高度脆性骨折，即定義為「嚴重骨質疏鬆症」，未來 1 年內再骨折風險暴增 5 倍。',
      'FRAX 評估工具預估未來十年骨折機率：主要骨鬆骨折 ≥ 20% 或髖部骨折 ≥ 3% 者，即便 T 值尚未達 -2.5 也強烈建議開始藥物保護。',
      '促進骨生成藥物（益穩挺 Romosozumab、骨穩 Teriparatide）能直接刺激造骨細胞造新骨；極高風險者應「先促生成、後抗吸收」。',
      '保骼麗（Denosumab）每半年皮下注射一次，停藥會誘發「骨吸收反彈與脊椎多重骨折風險」，絕對不可擅自停藥，必須銜接雙磷酸鹽類。',
    ],
  },
  {
    id: 'FRACTURE',
    label_zh: '壓迫性骨折與骨泥',
    title_zh: '脊椎壓迫性骨折與骨泥手術：急性背痛、微創灌漿與骨折後全方位照護',
    goal_zh: '長者彎腰提重物或輕微摔跌後突發嚴重背痛、翻身困難，極可能是脊椎壓迫性骨折。深入掌握 Genant 塌陷分級、MRI 骨髓水腫判讀、微創氣球骨泥手術（PKP/PVP），以及台灣醫學中心標準「圓滾木翻身法」與「背架穿戴黃金口訣」。',
    learn_zh: ['壓迫性骨折臨床表現、Genant 分級與 MRI STIR 辨別新舊急性骨折', '經皮椎體成形術（PVP）與氣球擴張椎體成形術（PKP 骨泥）比較與鄰近節段再骨折預防', '骨折與術後居家照護核心：圓滾木翻身上下床四步驟、背架「先穿再坐、先躺再脫」與三不禁忌'],
    minutes: 10,
    takeaways_zh: [
      '壓迫性骨折最常發生於胸腰椎交界處（T12–L1），典型表現為翻身坐起劇痛、身高變矮超過 3 公分或駝背；MRI STIR 高訊號代表新鮮急性水腫骨折。',
      '氣球擴張椎體成形術（PKP）先以氣球撐開塌陷椎體創造低壓空腔，再注入高黏度骨泥，能恢復高度並大幅降低骨泥外漏風險；術後務必銜接抗骨鬆藥物防範鄰近節段再骨折（15–20%）。',
      '背架穿戴黃金口訣：「先穿再坐、先躺再脫；下床必穿、平躺可脫」，內穿吸汗棉質衫、內褲穿在背架外方便如廁，依醫囑穿戴 3–6 個月。',
      '上下床嚴禁直接仰臥起坐！必須採用「圓滾木翻身法」保持肩臀一直線同步側轉，以雙手推床撐起上半身，並嚴守「不彎腰、不扭轉、不坐矮軟沙發」原則。',
    ],
  },
  {
    id: 'SURGERY',
    label_zh: '微創手術與術後照護',
    title_zh: '微創脊椎手術（MISS）與術後恢復全攻略：3D電腦導航、內視鏡與居家照護',
    goal_zh: '結合臺中市立老人復健綜合醫院（中國醫大經營）微創脊椎中心張建鈞副院長團隊之 SNQ 國家品質標章臨床經驗與台灣醫學中心照護規範，解析 3D 電腦導航（O-arm）、雙通道內視鏡（UBE）、OLIF 側開微創融合，以及術後傷口、翻身、背架與恢復期完整注意事項。',
    learn_zh: ['微創脊椎中心八大先進技術：脊椎內視鏡 (UBE/PELD)、3D 電腦導航 (O-arm)、OLIF 側開融合與微創側彎駝背翻修', '傳統開放大開刀 vs 微創內視鏡的組織保留哲學與 ERAS 快速康復指標（當天下床、隔天出院）', '脊椎手術後五大照護核心：傷口防水與拆線時程、圓滾木翻身、背架穿戴、飲食排便防腹壓與回診紅旗警訊'],
    minutes: 10,
    takeaways_zh: [
      '微創手術核心在於保留多裂肌（Multifidus）與後方張力帶；結合 O-arm 3D 電腦導航如同手術 GPS，精準置釘不牽拉神經，亦可安全完成 OLIF 側開融合、脊椎翻修與側彎駝背矯正。',
      '雙通道內視鏡（UBE）僅需兩個 0.5–0.7 cm 微孔，在 30 倍高解析視野與連續水流灌注下減壓，失血量極少（< 50 ml），多數患者術後當天或隔天即可穿護腰下床。',
      '術後傷口未拆線前（約 7–14 天）嚴禁碰生水，拆線後 24–48 小時確認乾燥方可淋浴（輕按壓乾勿搓結痂）；若出現紅腫熱痛、清澈水樣滲液伴劇烈頭痛或發燒 > 38°C 須立即回診。',
      '術後黃金恢復期（1–3 個月）嚴禁彎腰搬重物（> 3–5 kg）、嚴禁久坐超過 30–40 分鐘、絕對戒菸（防植骨不癒合），並攝取高纖高蛋白飲食預防便秘閉氣用力。',
    ],
  },
  {
    id: 'NUMBNESS',
    label_zh: '手麻腳麻',
    title_zh: '手麻腳麻：從「麻在哪裡」找出是哪條神經',
    goal_zh: '手腳麻不一定是脊椎問題。腕隧道症候群、糖尿病或維生素 B12 不足造成的神經病變，甚至中風，都會麻。學會看「麻的分布」，就能更快找到對的科別。',
    learn_zh: ['頸椎、腰椎每條神經根管哪一塊（皮節分布地圖）', '腕隧道、周邊神經病變和脊椎問題怎麼分', '哪些麻是急症，要立刻就醫'],
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
    title_zh: '躺・坐・站・走：日常脊柱健康與人體工學姿勢',
    goal_zh: '沒有一個「完美姿勢」可以維持一整天。真正傷脊椎的是「同一個姿勢太久」與「彎腰＋扭轉＋負重」同時發生。這一章用活體量測的椎間盤壓力，告訴你哪些動作值得調整。',
    learn_zh: ['不同姿勢下椎間盤壓力差多少（Wilke 活體量測數據 0.1–2.3 MPa）', '低頭滑手機的頸椎等效負荷（Hansraj 模型高達 27 公斤）', '搬重物、起床、睡眠擺位與工作站人體工學指引'],
    minutes: 8,
    takeaways_zh: [
      '仰躺時椎間盤壓力最低（0.1 MPa）；靠椅背放鬆坐（0.3 MPa）比刻意挺直坐（0.55 MPa）壓力低；彎腰駝背提 20 公斤飆升至 2.3 MPa。',
      '低頭 60 度看手機時，頸椎等效負荷高達 27 公斤（如同掛著一個小學生的重量）；務必將手機舉至水平視線。',
      '最好的姿勢是「下一個姿勢」：每 30–45 分鐘起身動 1–2 分鐘，比坐得筆直更重要。',
      '仰睡在膝下墊枕、側睡在兩膝間夾枕、起床先側身再用手撐起；提重物讓物品貼近身體、用腳轉身不扭腰。',
    ],
  },
  {
    id: 'EXERCISE',
    label_zh: '居家運動',
    title_zh: '居家核心運動處方：每天 10–15 分鐘照顧脖子與腰',
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
    id: 'REHAB',
    label_zh: '復健與物理治療',
    title_zh: '全方位復健處方：主動訓練、階段處方與禁忌動作',
    goal_zh: '熱敷、電療屬於「被動治療」，能短暫舒緩；真正改變長期結果的是「主動運動治療」——McGill 護脊黃金三大動作、髖鉸鏈動作再教育與骨質疏鬆防骨折運動指引。',
    learn_zh: ['三階段復健進程（急性保護、亞急性動作控制、功能性肌力重塑）', '麥吉爾護脊黃金三大動作（McGill Big 3：改良捲腹、側棒式、鳥狗式）的生物力學', '骨質疏鬆與壓迫性骨折者的嚴格禁忌動作（彎腰屈曲、捲腹）與安全運動'],
    minutes: 8,
    takeaways_zh: [
      '骨質疏鬆與壓迫性骨折患者「終生嚴禁負重向前彎腰與仰臥起坐」，向前屈曲會對前柱施加巨大剪力，誘發新的楔形塌陷！',
      'McGill Big 3 在維持脊柱中立位的「零剪切力」下最大化活化腹橫肌、腰方肌與多裂肌，是脊椎穩定運動黃金標準。',
      '急性期嚴格限制臥床 < 48 小時，起床必須採滾木翻身技巧（Log-Rolling）；亞急性期依循 Lancet WalkBack 每日健走 30 分鐘降低 45% 復發率。',
      '熱敷短暫止痛有效；TENS、超音波、干擾波與牽引在 WHO 2023 指引中不建議作為常規治療，應以運動治療為主體。',
    ],
  },
  {
    id: 'TREATMENT',
    label_zh: '預防與治療',
    title_zh: '預防與治療階梯：多數人不需要開刀',
    goal_zh: '頸腰痛與神經根痛多數會在數週到數月內明顯改善，椎間盤突出甚至可能自己被身體吸收。治療像爬樓梯：先做低風險、有效的事，沒改善再往上一階。',
    learn_zh: ['哪些預防方法有證據、哪些沒有', '從自我照護到手術的五階治療階梯', '什麼情況才需要考慮手術介入'],
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

// ── Clinical Datasets: Osteoporosis, VCF, Bone Cement, MISS, Rehab & Biomechanics ──

export interface DxaThreshold {
  t_score: string;
  category: string;
  definition: string;
  fracture_risk: string;
  action_zh: string;
  tone: 'good' | 'warn' | 'bad' | 'bad';
}

export const OSTEO_DXA_LEVELS: DxaThreshold[] = [
  { t_score: '≥ -1.0', category: '正常骨質', definition: '骨密度在健康年輕成年人的 1 個標準差之內', fracture_risk: '基準風險', action_zh: '維持均衡飲食（鈣 1000mg/日、維生素 D3 800IU）、負重與阻力運動、健康作息。', tone: 'good' },
  { t_score: '-1.0 至 -2.5', category: '骨質缺乏 (Osteopenia)', definition: '骨密度低於正常值，骨小梁微結構已開始變薄', fracture_risk: '骨折風險為正常的 1.5–2 倍', action_zh: '計算 FRAX 風險；若 10 年主要骨鬆骨折 ≥ 20% 或髖部骨折 ≥ 3%，或有類固醇史，需考慮藥物治療。', tone: 'warn' },
  { t_score: '≤ -2.5', category: '骨質疏鬆症 (Osteoporosis)', definition: '骨量顯著流失，骨小梁穿孔斷裂，微結構嚴重脆化', fracture_risk: '高骨折風險（每下降 1 個標準差，骨折風險翻倍）', action_zh: '強烈建議啟動處方藥物（抗吸收劑或促生成劑）治療，並全面進行居家防跌改裝。', tone: 'bad' },
  { t_score: '≤ -2.5 合併脆性骨折', category: '嚴重骨質疏鬆症', definition: '輕微外力或日常動作（彎腰、咳嗽、摔跌）即發生脊椎、髖部或腕部骨折', fracture_risk: '極高骨折風險（1 年內再骨折風險增加 5 倍）', action_zh: '建議優先使用「促進骨生成藥物」（如 Romosozumab 或 Teriparatide），再銜接抗吸收劑。', tone: 'bad' },
];

export interface OsteoMed {
  category: '抗骨吸收劑' | '促骨生成劑' | '雙重作用劑';
  generic_name: string;
  brand_examples: string;
  method: string;
  mechanism_zh: string;
  vertebral_risk_reduction: string;
  key_precautions: string;
}

export const OSTEO_MEDS_TABLE: OsteoMed[] = [
  {
    category: '抗骨吸收劑',
    generic_name: '雙磷酸鹽類 (Bisphosphonates)',
    brand_examples: 'Alendronate (福善美 weekly 口服), Zoledronic acid (骨力強 annual 靜脈注射)',
    method: '每週口服一次（需空腹 200ml 水、坐立 30 分鐘）或每年靜脈滴注一次',
    mechanism_zh: '附著於骨礦物質表面，當蝕骨細胞吞噬骨質時誘導其凋亡，強效壓制骨吸收。',
    vertebral_risk_reduction: '脊椎骨折風險降低約 40–70%，髖部骨折降低約 40%',
    key_precautions: '用藥前須檢查腎功能（eGFR > 30–35 ml/min）與完成牙科處置；口服藥須預防食道炎；長期使用 (> 3–5 年) 需評估非典型股骨骨折 (AFF) 與顎骨壞死 (ONJ) 風險，評估藥物假期 (Drug Holiday)。',
  },
  {
    category: '抗骨吸收劑',
    generic_name: 'Denosumab (RANKL 單株抗體)',
    brand_examples: 'Prolia (保骼麗)',
    method: '每 6 個月皮下注射一次',
    mechanism_zh: '精準結合並中和 RANKL，完全切斷蝕骨細胞的成熟與活化訊號。',
    vertebral_risk_reduction: '脊椎骨折風險降低約 68%，髖部骨折降低約 40%',
    key_precautions: '【重大警訊】停藥後骨吸收會產生劇烈反彈（Rebound phenomenon），骨密度於 1 年內迅速暴跌並顯著增加多發性脊椎壓迫骨折風險！絕對不可自行停藥；若需停用必須立即在第 6 個月銜接雙磷酸鹽類藥物。腎功能不全者可用，但注射前必須確保血鈣正常。',
  },
  {
    category: '促骨生成劑',
    generic_name: 'Teriparatide (重組副甲狀腺素 PTH 1-34)',
    brand_examples: 'Forteo (骨穩)',
    method: '每日一次皮下注射（療程上限通常為 24 個月）',
    mechanism_zh: '間歇性活化副甲狀腺素第一型受體，直接刺激造骨細胞增殖與骨膠原基質沉積，真正長出新骨。',
    vertebral_risk_reduction: '脊椎骨折風險降低約 65–80%',
    key_precautions: '高鈣血症、Paget 氏骨病、曾接受骨骼放射線治療者禁用。療程結束後必須立刻銜接抗吸收劑（雙磷酸鹽或 Denosumab）鎖住新生骨質，否則骨量會快速消退。',
  },
  {
    category: '雙重作用劑',
    generic_name: 'Romosozumab (骨硬化蛋白 Sclerostin 單株抗體)',
    brand_examples: 'Evenity (益穩挺)',
    method: '每月一次皮下注射（兩劑合打，療程固定 12 個月）',
    mechanism_zh: '阻斷 Wnt 訊息傳遞路徑的抑制因子 Sclerostin，達成「同時大幅促進骨合成＋微幅抑制骨吸收」的強效雙重作用。',
    vertebral_risk_reduction: '脊椎骨折風險降低約 73%，臨床骨折降低約 50%',
    key_precautions: '目前極高骨折風險長者的第一線首選之一。過去 1 年內曾發生心肌梗塞或中風者禁用。12 個月療程結束後，同樣必須銜接抗吸收劑維持骨密度成果。',
  },
  {
    category: '抗骨吸收劑',
    generic_name: '選擇性雌激素受體調節劑 (SERM: Raloxifene)',
    brand_examples: 'Evista (鈣穩)',
    method: '每日口服一次',
    mechanism_zh: '在骨骼表現雌激素激動劑效應（抑制蝕骨），在乳房與子宮表現拮抗劑效應（不增加子宮內膜癌或乳癌風險）。',
    vertebral_risk_reduction: '脊椎骨折風險降低約 30–50%（對非脊椎或髖部骨折無顯著證據）',
    key_precautions: '適合停經後初期且脊椎骨折風險為主的女性。可能增加靜脈血栓栓塞 (VTE) 風險及潮熱不適。',
  },
];

export interface VcfGrade {
  grade: string;
  name: string;
  collapse_pct: string;
  features_zh: string;
  treatment_approach: string;
}

export const VCF_GENANT_GRADES: VcfGrade[] = [
  { grade: 'Grade 0', name: '正常脊椎體', collapse_pct: '< 20%', features_zh: '椎體前緣、中段與後緣高度對稱完整，無微結構壓迫。', treatment_approach: '常規骨質疏鬆防跌與骨本管理。' },
  { grade: 'Grade 1', name: '輕度壓迫性骨折', collapse_pct: '20% – 25%', features_zh: '楔形（前緣塌陷）、雙凹形（中段凹陷）或擠壓形，通常無神經症狀。', treatment_approach: '嚴格限制臥床 < 48 小時，穿戴背架（TLSO）、降鈣素止痛、密切追蹤 X 光與骨鬆藥物。' },
  { grade: 'Grade 2', name: '中度壓迫性骨折', collapse_pct: '25% – 40%', features_zh: '椎體前壁塌陷明顯，脊柱後凸（駝背）角度增大，軀幹前傾，疼痛劇烈。', treatment_approach: '評估保守治療 2–3 週；若疼痛頑固無法下床翻身或塌陷持續加劇，考慮氣球擴張椎體成形術 (PKP)。' },
  { grade: 'Grade 3', name: '重度壓迫性骨折', collapse_pct: '> 40%', features_zh: '椎體嚴重扁平粉碎，可能併發骨壞死（Kümmell 氏病）或後壁凸入椎管壓迫神經。', treatment_approach: '需精細評估後壁完整度；若無神經壓迫可評估椎體成形術或支架，若有神經壓迫則需微創或減壓固定手術。' },
];

export interface BoneCementProcedure {
  method_name: string;
  principle_zh: string;
  height_restoration: string;
  leakage_risk: string;
  suitable_patients: string;
  evidence_summary: string;
}

export const BONE_CEMENT_TABLE: BoneCementProcedure[] = [
  {
    method_name: '經皮椎體成形術 (PVP, Vertebroplasty)',
    principle_zh: '在局部麻醉與 X 光透視引導下，經皮穿刺骨穿刺針穿透椎弓根進入椎體，直接以較高壓力推注半流體骨泥填充微裂隙。',
    height_restoration: '高度復原能力較有限（主要著重於骨小梁微動微裂之快速力學黏合）。',
    leakage_risk: '較高（骨泥在液態加壓注入未被封閉的鬆質骨孔隙中，外漏率約 30–60%，多數為無症狀小漏，但少數恐壓迫神經或進入靜脈引起肺栓塞）。',
    suitable_patients: '椎體塌陷較平整、後壁完整、病程較短、經濟考量者。',
    evidence_summary: 'VAPOUR 2016 隨機試驗顯示對急性疼痛骨折（< 6 週）止痛效果顯著優於假手術對照組。',
  },
  {
    method_name: '經皮氣球擴張椎體成形術 (PKP, Kyphoplasty)',
    principle_zh: '經皮穿刺建立工作管道後，先置入可擴張氣球（Balloon Tamp），打入造影劑充氣撐開塌陷椎體、復原椎體高度並擠壓四周海綿骨形成封閉人工空腔；取出氣球後，在極低壓力下推注高黏度（牙膏狀）骨泥。',
    height_restoration: '高度復原與後凸角度矯正顯著優於 PVP，能有效改善矢狀位平衡與駝背。',
    leakage_risk: '極低（預先創造了低壓空腔，骨泥黏稠度高且注入阻力小，外漏率約 5–15%，安全性極佳）。',
    suitable_patients: '椎體前緣顯著楔形塌陷、急性劇痛、長者駝背加重、希望最大限度降低神經與靜脈外漏風險者。',
    evidence_summary: 'FREE 2009 Lancet 多中心隨機對照試驗證實：PKP 在 1 個月與 1 年的生活品質、止痛與行動力改善皆顯著優於保守治療。',
  },
  {
    method_name: '椎體內金屬支架成形術 (SpineJack / Stentoplasty)',
    principle_zh: '在椎體內植入具備力學千斤頂原理之鈦合金可擴展機械支架，直向撐開並精準鎖定維持椎體解剖高度，支架永久留置體內，隨後在低壓下注入骨泥包裹加固。',
    height_restoration: '高度維持能力最強且無氣球洩氣時的高度的次發性回縮。',
    leakage_risk: '極低，安全性媲美 PKP。',
    suitable_patients: '年輕活動量較大患者、外傷型或骨質尚可之急性塌陷、需要精確力學高度重建者。',
    evidence_summary: '近年多項前瞻性臨床試驗顯示其高度復原與長期後凸矯正效果略優於單純 PKP。',
  },
];

export interface CementMaterial {
  material: string;
  composition: string;
  curing_temp: string;
  mechanical_strength: string;
  biodegradability: string;
  clinical_tradeoffs: string;
}

export const CEMENT_MATERIALS_TABLE: CementMaterial[] = [
  {
    material: '聚甲基丙烯酸甲酯 (PMMA, 壓克力骨泥)',
    composition: '粉劑（PMMA 聚合物聚苯乙烯顆粒、硫酸鋇顯影劑）＋ 液劑（MMA 單體、促進劑）',
    curing_temp: '聚合反應釋放高熱，固化時核心溫度可達 60°C – 80°C。',
    mechanical_strength: '抗壓強度極高（約 80–100 MPa），遠高於人體正常胸腰椎骨鬆骨質（約 5–10 MPa）。',
    biodegradability: '完全不可吸收、不降解，終生留置。',
    clinical_tradeoffs: '【優點】數分鐘內凝固、力學支撐立竿見影；產熱反應可熱消融骨折周圍的感覺痛覺神經末梢，術後止痛極為迅速。缺點為彈性模數過硬，注入椎體後會造成應力集中，若未妥善治療骨質疏鬆，相鄰未灌注節段在 1 年內發生應力性骨折的風險達 15–20%。',
  },
  {
    material: '磷酸鈣骨泥 (CPC, 生物活性骨泥)',
    composition: '磷酸三鈣、羥基磷灰石結晶粉末與水性磷酸鹽液調配而成。',
    curing_temp: '等溫固化，無顯著產熱反應（與體溫相近，< 40°C）。',
    mechanical_strength: '初期抗壓強度中等（約 20–40 MPa），抗剪切與抗彎折能力較弱。',
    biodegradability: '具骨傳導性，隨時間由蝕骨/造骨細胞逐步被自體新骨爬行取代吸收。',
    clinical_tradeoffs: '【優點】生物相容性極佳、無組織熱損傷、能被自體骨置換。缺點為凝固時間較長、早期抗壓強度低於 PMMA，且缺乏熱凝止痛效果，在急性重度骨鬆壓迫性骨折的應用受限，多用於非重度承重區或良性骨缺損填充。',
  },
];

export interface MissTechnique {
  name_zh: string;
  name_en: string;
  incision_size: string;
  mechanism_zh: string;
  advantages: string;
  indications: string;
}

export const MISS_TECHNIQUES_TABLE: MissTechnique[] = [
  {
    name_zh: '單孔雙通道內視鏡脊椎手術',
    name_en: 'UBE (Unilateral Biportal Endoscopy)',
    incision_size: '約 0.5–0.7 cm 兩個微創小孔',
    mechanism_zh: '利用兩個獨立微孔：一孔放入 30 倍高畫質 0 度或 30 度關節內視鏡（視野通道），另一孔自由放入常規微創脊椎器械、高速磨鑽與電波止血刀（操作通道），在無菌生理食鹽水持續高流量水壓灌注下進行神經減壓。',
    advantages: '器械操作角度不受管徑拘束、視野極其開闊清晰；水流持續沖刷維持清澈視野並壓迫小靜脈止血；完全不剝離多裂肌、不破壞後方骨韌帶複合體。術後傷口極少疼痛，通常術後當天即可下床。',
    indications: '腰椎椎管狹窄症、黃韌帶肥厚壓迫、高度脫出型椎間盤突出、頸椎後方神經孔狹窄減壓。',
  },
  {
    name_zh: '經皮全脊椎內視鏡手術',
    name_en: 'PELD / Full-Endoscopic Spine Surgery',
    incision_size: '約 0.7–0.8 cm 單一極微切口',
    mechanism_zh: '將光學鏡頭與工作管道整合於同一支同軸內視鏡管鞘內，經由椎間孔途徑（Transforaminal）或椎板間隙途徑（Interlaminar）直達病灶。',
    advantages: '局部麻醉下可進行（病患術中可回饋神經感覺避免誤傷）、經椎間孔途徑完全不需切除椎板骨質即可切除椎間盤、對背脊組織破壞度最低。',
    indications: '極外側型椎間盤突出（Far-lateral disc herniation）、單純腰椎間盤突出症。',
  },
  {
    name_zh: '微創管狀牽引器顯微減壓術',
    name_en: 'Tubular Microscopic Decompression',
    incision_size: '約 1.5–2.0 cm 微創切口',
    mechanism_zh: '透過逐級擴張管（Serial Dilators）穿過背肌纖維間隙，撐開多裂肌而「完全不切斷肌肉附著點」，架設固定管狀牽引器（Tubular Retractor），在手術顯微鏡 3D 立體放大照明下進行椎板切除與黃韌帶切除。',
    advantages: '保留背肌血供與神經支配，避免傳統開放手術的大面積肌肉缺血壞死與長期萎縮；適用於需要骨性結構重塑之病例。',
    indications: '多節段椎管狹窄、合併微小滑脫之神經根壓迫。',
  },
  {
    name_zh: '微創經椎間孔腰椎椎體間融合術',
    name_en: 'MIS-TLIF (Minimally Invasive TLIF)',
    incision_size: '數個 1.5–2.0 cm 穿刺孔',
    mechanism_zh: '在管狀牽引器下完成單側小面關節切除與椎間盤掏空植骨融合，並在 X 光透視或導航下經皮置入椎弓根骨釘與連接桿（Percutaneous Pedicle Screws）。',
    advantages: '失血量大幅減少（< 100 ml vs 開放手術 500–1000 ml），免除廣泛背肌剝離，大幅縮短住院天數與術後止痛劑需求。',
    indications: '退化性脊椎滑脫症、伴隨脊柱不穩定之椎管狹窄、椎間盤源性頑固性下背痛。',
  },
  {
    name_zh: '3D 電腦導航 OLIF 側開式腰椎微創融合術',
    name_en: '3D Navigation OLIF (Oblique Lumbar Interbody Fusion)',
    incision_size: '腹部側前方約 3–4 cm 微小切口',
    mechanism_zh: '透過腹部側前方腰大肌與主動脈之間的天然腹膜後肌間隙進入椎間盤，搭配 3D 電腦導航定位，置入超大面積椎間融合支架撐開椎間高度與神經孔，達成「間接神經減壓（Indirect Decompression）」。',
    advantages: '完全不進入後方椎管、不破壞多裂肌與椎板骨質、不牽拉硬脊膜與神經根；矯正腰椎前凸弧度與滑脫力學效果極佳，術後恢復極快。',
    indications: '多節段退化性腰椎滑脫、退化性腰椎側彎、鄰近節段退化翻修、椎間高度嚴重塌陷之神經孔狹窄。',
  },
  {
    name_zh: '3D 電腦導航脊椎微創手術（含側彎／駝背矯正與翻修）',
    name_en: 'O-arm 3D Navigation MISS / Revision & Deformity Correction',
    incision_size: '依節段採微創多點或小切口',
    mechanism_zh: '結合術中即時 O-arm 3D 電腦斷層掃描與光學 GPS 衛星定位導航系統，即時顯示脊椎三維立體解剖結構，精準引導椎弓根骨釘置入與截骨矯形，無須大範圍剝離肌肉顯露骨標記。',
    advantages: '置釘精準度高達 99% 以上，徹底避免誤傷脊髓、神經根、大血管與胸膜（防範氣胸／血胸），並大幅降低術中醫療人員與病患之輻射暴露量；讓高難度脊椎翻修、頸椎微創與重度駝背側彎矯正安全微創化。',
    indications: '退化性與青少年脊椎側彎矯正、骨鬆骨折後重度駝背畸形矯正、初次手術後疼痛復發或植入物鬆動之微創脊椎翻修手術、高精密度頸椎微創減壓固定。',
  },
];

export interface SpineCenterHighlight {
  code: string;
  title_zh: string;
  clinical_focus_zh: string;
  patient_benefit_zh: string;
}

/**
 * 參考來源：臺中市立老人復健綜合醫院（委託財團法人中國醫藥大學興建經營）
 * 骨科部／微創脊椎中心（張建鈞副院長、林琮凱、毛睿廷醫師團隊）臨床特色與衛教規範
 * https://www.tmgrgh.org.tw/Department/Detail?depid=261 & Feature?depid=261
 */
export const TMGRGH_SPINE_CENTER_SERVICES: SpineCenterHighlight[] = [
  {
    code: '01',
    title_zh: '全脊椎內視鏡微創手術 (UBE / PELD)',
    clinical_focus_zh: '透過 < 1 cm 微孔與 30 倍高解析光學視野，在生理食鹽水持續灌注下精準移除壓迫神經之骨刺、黃韌帶與突出椎間盤。',
    patient_benefit_zh: '減「小」傷口、減「少」神經與多裂肌損傷；實踐 ERAS 快速康復（多數術後當天下床、隔天出院）。',
  },
  {
    code: '02',
    title_zh: '3D 電腦導航脊椎微創手術 (O-arm GPS)',
    clinical_focus_zh: '術中即時 3D 立體影像導航定位，手術中不須過度牽拉神經即可精準置入微創骨釘與融合支架。',
    patient_benefit_zh: '避免傷及脊椎周邊神經血管，大幅提升高齡與複雜脊椎手術安全性，並降低術中輻射劑量。',
  },
  {
    code: '03',
    title_zh: '3D 導航 OLIF 側開式腰椎微創手術',
    clinical_focus_zh: '由側腹部天然肌間隙置入大面積融合支架，撐開椎間盤與神經孔高度，不破壞背後肌肉與椎板結構。',
    patient_benefit_zh: '幾乎不傷及背後脊椎結構與神經，出血極少、腰背不緊繃，大幅縮短融合手術恢復期。',
  },
  {
    code: '04',
    title_zh: '3D 導航脊椎微創翻修手術',
    clinical_focus_zh: '針對初次他院或傳統脊椎手術後持續疼痛、鄰近節段退化、骨釘鬆動或再度神經壓迫進行精準導航修復。',
    patient_benefit_zh: '利用 3D 導航避開前次手術疤痕沾黏與變異解剖，降低硬脊膜破損風險，重獲生活品質。',
  },
  {
    code: '05',
    title_zh: '3D 導航脊椎側彎與駝背畸形微創矯正',
    clinical_focus_zh: '首創多主治偕同微創前開＋後開導航矯形技術，減少大範圍組織剝離，精準完成多節段鋼釘植入與曲度重建。',
    patient_benefit_zh: '有效降低神經損傷、氣胸或血胸等傳統大開刀風險，改善慢性背痛、心肺壓迫與呼吸受限。',
  },
  {
    code: '06',
    title_zh: '3D 導航頸椎微創減壓與翻修手術',
    clinical_focus_zh: '於密布重要神經與椎動脈之頸椎區域，採電腦導航結合顯微／內視鏡技術進行最小創傷減壓與駝頸矯形。',
    patient_benefit_zh: '兼顧頸椎高精密度安全性與最小組織破壞，迅速改善雙手麻木笨拙與步態不穩。',
  },
  {
    code: '07',
    title_zh: '快速骨折微創智能處理照護網',
    clinical_focus_zh: '整合急診／門診 MRI 水腫判讀、微創氣球擴張骨泥成形術（PKP）、神經阻斷止痛與抗骨質疏鬆藥物無縫銜接。',
    patient_benefit_zh: '迅速解除高齡壓迫性骨折翻身劇痛，預防長期臥床失能與鄰近節段連鎖再骨折。',
  },
];

export interface PostOpCareModule {
  id: string;
  badge_zh: string;
  title_zh: string;
  golden_mantra_zh: string;
  why_it_matters_zh: string;
  do_steps_zh: string[];
  dont_taboos_zh: string[];
  applicable_to: ('fracture' | 'miss' | 'fusion')[];
}

export const SPINE_POSTOP_CARE_MODULES: PostOpCareModule[] = [
  {
    id: 'log-roll-bed',
    badge_zh: '核心照護 1・翻身與上下床',
    title_zh: '圓滾木翻身法（Log-Rolling）與標準上下床四部曲',
    golden_mantra_zh: '口訣：「肩臀一直線、側躺手推床、絕對不捲腹」',
    why_it_matters_zh: '無論是脊椎壓迫性骨折、骨泥灌注或微創脊椎減壓／融合術後，腰背扭轉（Twisting）與仰臥起坐（Flexion）都會在骨折處、骨釘介面或椎間盤破口產生超過 2–3 倍的破壞性剪力！',
    do_steps_zh: [
      '【圓滾木翻身】平躺雙膝微彎，收緊小腹，使「肩膀、胸廓、骨盆、雙膝」保持同一直線（如滾動圓木般）同步轉向側臥；側睡時背後塞枕頭支托，雙膝間夾一顆軟枕防骨盆歪斜。',
      '【起床步驟 1】在平躺狀態下先穿妥背架／護腰（切勿坐起才穿）。',
      '【起床步驟 2】以圓滾木翻身法轉為側躺並移至床緣。',
      '【起床步驟 3】將雙小腿緩緩垂出床沿，同時用下方手肘與上方手掌「推壓床面」將上半身直立推起（脊椎全程保持平直）。',
      '【起床步驟 4】在床沿靜坐 3–5 分鐘，做深呼吸並活動雙腳踝，確認無姿勢性低血壓頭暈後，雙手扶穩助行器或固定物站立。',
      '【躺下步驟】背對床緣先坐下 → 雙手支撐床面慢慢側躺下、同時雙腿抬上床面 → 圓滾木同步轉回平躺 → 最後才解開脫下背架。',
    ],
    dont_taboos_zh: [
      '嚴禁從平躺直接「仰臥起坐」挺腰起身！',
      '嚴禁上半身先轉、下半身後轉的「麻花式扭腰翻身」！',
      '嚴禁剛坐起未等頭暈消退就猛然站立行走（易跌倒二次骨折）！',
    ],
    applicable_to: ['fracture', 'miss', 'fusion'],
  },
  {
    id: 'brace-protocol',
    badge_zh: '核心照護 2・背架與護腰穿戴',
    title_zh: '背架／護腰（TLSO・三點式背架・軟護腰）穿戴規範',
    golden_mantra_zh: '口訣：「先穿再坐、先躺再脫；下床必穿、平躺可脫」',
    why_it_matters_zh: '背架的作用是分擔脊椎前柱負荷、限制危險的前彎與扭轉，保護新生骨痂與融合器穩定癒合；若坐起來才穿背架，坐起瞬間的高壓早已壓迫脊椎！',
    do_steps_zh: [
      '【正確穿脫時機】只要下床活動、站立、走路、坐著吃飯或如廁，皆須全程穿戴背架；平躺於床上休息、睡覺或沐浴時可依醫囑取下。',
      '【貼身穿搭技巧】背架內層請穿一件合身吸汗的薄棉質汗衫（避免背架直接摩擦皮膚起疹破皮）；「內褲請穿在背架外面」，如此如廁時無須穿脫背架！',
      '【對齊與鬆緊度】平躺側身將背架置於背後，脊椎中線對準背架中央，下緣需包覆至骨盆上緣（恥骨聯合上方），魔鬼氈由下往上依序拉緊，鬆緊度以能平順塞入 1–2 指幅為準。',
      '【穿戴總期限】單純微創內視鏡減壓約穿戴軟式護腰 4–6 週；壓迫性骨折（保守或骨泥術後）及微創融合固定術後，須依醫囑穿戴硬式背架約 3–6 個月，經門診 X 光確認骨癒合後逐步戒除。',
    ],
    dont_taboos_zh: [
      '嚴禁「先坐到床邊才開始穿背架」或「還坐在床邊就把背架脫掉」！',
      '嚴禁覺得不痛了就自行提早丟棄背架（骨痂與植骨融合需 3–6 個月才牢固）！',
      '嚴禁超過醫囑期限後仍整年依賴護腰不練核心（過度長期穿戴超過半年會導致多裂肌與腹橫肌廢用性萎縮）！',
    ],
    applicable_to: ['fracture', 'miss', 'fusion'],
  },
  {
    id: 'wound-care',
    badge_zh: '核心照護 3・傷口護理與回診警訊',
    title_zh: '微創／傳統手術傷口防水、拆線時程與感染紅旗警訊',
    golden_mantra_zh: '口訣：「未拆線不碰水、洗後輕壓勿搓痂、紅腫滲液速回診」',
    why_it_matters_zh: '微創內視鏡與骨泥手術傷口雖僅 0.5–1.5 公分，但深部直通椎管與骨髓腔；保持傷口乾燥無菌是杜絕深部椎間盤炎、骨髓炎與硬脊膜外感染的第一道防線。',
    do_steps_zh: [
      '【未拆線前（術後第 1–14 天）】傷口絕對不可沾染生水！洗澡請採「擦澡」，或使用醫療級防水透明敷料緊密覆蓋後快速淋浴。',
      '【換藥原則】保持敷料清潔乾燥；若紗布被汗水、組織液弄濕或鬆脫，請洗淨雙手，以無菌棉棒沾無菌生理食鹽水由傷口中心向外環狀清潔，擦乾後覆蓋無菌敷料（遵照出院換藥衛教）。',
      '【拆線與淋浴時機】微創骨泥或美容膠傷口依醫囑約 7–10 天檢視，一般縫線約 10–14 天門診拆線；拆線後滿 24–48 小時且無滲液方可沖水淋浴，洗畢用乾淨毛巾「輕輕按壓吸乾」，並可貼美容膠帶 3–6 個月減少疤痕。',
      '【引流管照護（若有留置）】翻身下床時請將引流球固定於衣服低於傷口位置，避免拉扯或管路折彎，紀錄每日引流液顏色與量。',
    ],
    dont_taboos_zh: [
      '術後 3 個月內嚴禁泡澡、泡溫泉、游泳或前往公共SPA池！',
      '嚴禁手摳結痂、用力搓洗傷口，或自行塗抹雙氧水、紅藥水、來路不明草藥膏與精油！',
      '【立即返院紅旗】若傷口出現「紅、腫、熱、痛加劇」、「流出黃綠色膿液或惡臭滲液」、「持續流出清澈水樣液體且站立時劇烈頭痛（疑似腦脊髓液滲漏）」、「不明發燒 > 38°C」或「雙腳麻痛無力突然惡化、大小便解不出」，請立即返院急診或門診！',
    ],
    applicable_to: ['fracture', 'miss', 'fusion'],
  },
  {
    id: 'daily-posture-home',
    badge_zh: '核心照護 4・日常姿勢與居家環境',
    title_zh: '日常生活「三不三要」姿勢管理與防跌無障礙改造',
    golden_mantra_zh: '口訣：「不彎腰、不扭轉、不坐矮軟椅；屈膝蹲、定時走、浴室全防滑」',
    why_it_matters_zh: '研究實測「坐姿前傾彎腰」與「彎腰提重」時腰椎椎間盤壓力高達站立的 1.8 至 2.3 倍；術後前 3 個月是纖維環癒合與骨泥／骨釘穩定的黃金脆弱期。',
    do_steps_zh: [
      '【拾物與穿鞋】撿拾地上物品必須「腰背挺直、屈膝蹲下（髖鉸鏈）」讓物品貼近身體，或善用「長柄取物夾」；穿鞋請坐在高椅上搭配「長柄鞋拔」，穿襪子時將腳踝跨到對側膝蓋上，絕不彎腰低頭。',
      '【正確坐姿與時限】選擇有硬挺椅背、扶手且高度讓膝蓋呈 90 度的座椅，腰後加墊小靠枕；每坐 30–40 分鐘務必起身走動 5 分鐘。',
      '【洗漱與家務】刷牙洗臉時請「微屈雙膝、腰桿保持挺直」，勿彎腰低頭湊近洗手台；術後前 6 週洗頭建議給髮廊仰躺洗或站立淋浴仰頭洗。',
      '【居家環境防跌改造】浴室必裝「馬桶增高器」（避免蹲廁或過低馬桶）與L型安全扶手、擺放防滑淋浴椅與防滑墊；清除臥室至廁所走道雜物電線，加裝夜間感應夜燈，長者全面穿防滑包覆鞋（禁穿鬆垮拖鞋）。',
    ],
    dont_taboos_zh: [
      '術後 3 個月內嚴禁提舉超過 3–5 公斤重物（如抱孫子、提滿水桶、搬花盆、推重型購物車）！',
      '嚴禁坐「矮板凳、軟陷沙發、懶骨頭、無靠背圓凳、地板」及使用蹲式馬桶！',
      '術後前 4–6 週嚴禁自行騎乘機車、腳踏車或長途顛簸開車（路面坑洞震動會直接衝擊脊椎）；乘車請坐汽車前座並調微後傾加腰靠。',
    ],
    applicable_to: ['fracture', 'miss', 'fusion'],
  },
  {
    id: 'nutrition-bowel-bone',
    badge_zh: '核心照護 5・飲食排便與防再骨折',
    title_zh: '組織造骨營養、防便秘閉氣用力（Valsalva）與抗骨鬆銜接',
    golden_mantra_zh: '口訣：「高蛋白補鈣D、高纖多水防便秘、絕對戒菸續治骨鬆」',
    why_it_matters_zh: '術後止痛藥與活動量減少極易引發便秘，而排便時「憋氣用力（Valsalva 動作）」會使腹內壓與椎管硬膜外靜脈壓瞬間暴增，誘發劇烈背痛或術區出血；同時骨骼癒合亟需原料與抗骨鬆藥物保護。',
    do_steps_zh: [
      '【高蛋白促傷口與肌肉修復】每餐攝取一掌心優質蛋白質（魚類、去皮雞肉、雞蛋、板豆腐、無糖豆漿、毛豆），每日達每公斤體重 1.2–1.5 克。',
      '【高鈣＋維生素 D3＋維生素 C】每日攝取 1,000–1,200 mg 鈣質（牛奶、優格、黑芝麻、小魚乾、深綠色蔬菜）與 800–1,000 IU 維生素 D3，搭配芭樂、奇異果等高維生素 C 水果促進膠原蛋白骨基質合成。',
      '【預防便秘與減壓排便】每日飲水 1,500–2,000 ml，多吃木瓜、火龍果、燕麥與蔬菜；順應便意切勿憋氣用力，必要時請醫師開立溫和軟便劑（MgO 等）。咳嗽或打噴嚏時，請雙手扶腰或微屈膝以減緩衝擊。',
      '【無縫銜接抗骨鬆藥物】壓迫性骨折或骨鬆患者接受骨泥／微創手術後，務必依醫囑定期施打或服用抗骨質疏鬆藥物（如保骼麗 Denosumab 每半年一針、骨穩或益穩挺等），並完成牙科檢查與鈣D補充。',
    ],
    dont_taboos_zh: [
      '【絕對戒菸（含二手菸、電子煙）】尼古丁會嚴重收縮脊椎微血管、抑制造骨細胞，使脊椎融合手術「植骨不癒合率（假性關節）」暴增 2–3 倍，並加速椎間盤退化！',
      '嚴禁排便時長時間蹲坐用力憋氣！',
      '嚴禁聽信偏方狂喝熬煮數小時的豬大骨湯補鈣（大骨湯鈣含量極微卻含大量普林與飽和脂肪，應喝牛奶、吃板豆腐與黑芝麻）！',
    ],
    applicable_to: ['fracture', 'miss', 'fusion'],
  },
];

export interface PostOpTimelineRow {
  stage: string;
  period: string;
  miss_endoscopic_goal: string;
  fracture_or_fusion_goal: string;
  key_precautions: string;
}

export const SPINE_POSTOP_TIMELINE: PostOpTimelineRow[] = [
  {
    stage: '住院急性期 (ERAS 快速康復)',
    period: '術後第 0 – 3 天',
    miss_endoscopic_goal: '雙通道／單孔內視鏡（UBE/PELD）患者多數於術後當日或隔日穿戴軟護腰下床走動，1–2 天即可出院。',
    fracture_or_fusion_goal: '微創骨泥（PKP）術後平躺休息 4–6 小時即可穿硬式背架下床；3D 導航微創融合／OLIF 約術後 1–2 天穿背架下床，3–5 天出院。',
    key_precautions: '嚴格執行「先穿再坐、先躺再脫」與圓滾木翻身；初次下床必須有人攙扶並於床緣靜坐 5 分鐘防頭暈跌倒；傷口絕對保持乾燥。',
  },
  {
    stage: '居家傷口癒合期',
    period: '術後第 1 – 2 週',
    miss_endoscopic_goal: '每日於室內外平坦路面分次散步（每次 10–15 分鐘，每日 3–4 次）；約第 10–14 天門診拆線。',
    fracture_or_fusion_goal: '下床全程穿戴硬式背架，少量多次慢走促進下肢循環防血栓；床上可做腳踝幫浦運動（Ankle Pumping）與深呼吸擴胸。',
    key_precautions: '未拆線前嚴禁碰水；每坐 30 分鐘必起身；觀察傷口有無紅腫滲液；保持排便順暢勿用力閉氣。',
  },
  {
    stage: '神經消腫與組織修復期',
    period: '術後第 2 – 6 週',
    miss_endoscopic_goal: '多數輕度辦公室工作者可於術後 2–3 週返回工作崗位；神經根水腫逐步消退（殘留微麻屬正常修復過程），開始溫和腹橫肌呼吸與神經滑動。',
    fracture_or_fusion_goal: '骨折裂隙與植骨區初步纖維骨痂形成；每日累積步行 30 分鐘（Lancet WalkBack 護脊步行處方），練習標準「髖鉸鏈」屈膝不彎腰動作。',
    key_precautions: '仍嚴禁彎腰、扭腰、提重物（> 3 kg）與自行騎乘機車；勿因疼痛減輕而擅自停戴背架。',
  },
  {
    stage: '骨痂鞏固與核心重建期',
    period: '術後第 6 – 12 週 (1.5–3 個月)',
    miss_endoscopic_goal: '經醫師評估可逐步脫除軟式護腰，全面展開 McGill 護脊黃金三大動作（改良捲腹、側棒式、鳥狗式）強化多裂肌與腹橫肌。',
    fracture_or_fusion_goal: '門診追蹤 X 光評估椎體高度與骨釘融合穩定度；在物理治療師指導下開始等長核心穩定訓練與上肢／下肢漸進阻力訓練（如靠牆微深蹲、臀橋）。',
    key_precautions: '逐步戒除背架時採「漸進式減少穿戴時數」，同時加強核心肌力接手保護；仍避免劇烈碰撞與爆發性扭轉運動。',
  },
  {
    stage: '功能重塑與終生防復發期',
    period: '術後 3 – 6 個月以上',
    miss_endoscopic_goal: '恢復正常運動與有氧訓練（游泳、快走、固定式單車、核心重訓），維持理想體重與工作站人體工學。',
    fracture_or_fusion_goal: '壓迫性骨折與融合術骨質達成堅固整合，依醫囑完全卸下硬式背架；持續規律抗骨質疏鬆藥物（如每半年保骼麗注射）與防跌平衡負重訓練。',
    key_precautions: '骨質疏鬆與曾發生壓迫性骨折者，「終生嚴禁負重向前彎腰（如直腿搬重物、仰臥起坐）」；每年定期追蹤骨密度 DXA。',
  },
];

export interface MissMetric {
  item: string;
  traditional_open: string;
  miss_endoscopic: string;
  clinical_benefit: string;
}

export const MISS_METRICS_COMPARISON: MissMetric[] = [
  { item: '手術傷口長度', traditional_open: '約 8–15 公分（若多節段融合可達 20 公分以上）', miss_endoscopic: '約 0.7–1.5 公分（UBE 為兩個 0.5–0.7 cm 微孔）', clinical_benefit: '外觀微創、皮下感染率顯著降低（< 0.5% vs 2–4%）' },
  { item: '背部肌肉傷害', traditional_open: '自骨膜大範圍電刀剝離多裂肌、持續牽引壓迫導致肌肉缺血纖維化', miss_endoscopic: '經自然肌纖維間隙穿透分離，幾乎零剝離，完整保留多裂肌與運動神經分支', clinical_benefit: '徹底擺脫傳統開刀後「慢性肌筋膜緊繃疼痛與肌肉萎縮」' },
  { item: '術中失血量', traditional_open: '約 300–800 ml，多節段甚至需要術中或術後輸血', miss_endoscopic: '約 10–50 ml（極少，水壓灌注能自然壓迫微血管止血）', clinical_benefit: '極少需輸血，心血管疾病與高齡長者耐受度極佳' },
  { item: '下床與住院天數', traditional_open: '需平躺 2–3 天待引流管拔除，平均住院 5–7 天', miss_endoscopic: '術後當日或隔日即可佩戴軟護腰下床走動，多數 1–2 天內出院', clinical_benefit: '避免長期臥床併發症（深部靜脈血栓、肺炎、肌少衰弱）' },
  { item: '返回輕度工作', traditional_open: '約 6–12 週', miss_endoscopic: '約 1–3 週', clinical_benefit: '大幅降低生產力損失與照護者負擔' },
];

export interface RehabPhase {
  phase: string;
  timeframe: string;
  core_goals_zh: string;
  allowed_exercises_zh: string[];
  strict_contraindications_zh: string[];
  milestones_zh: string;
}

export const REHAB_PHASES_TABLE: RehabPhase[] = [
  {
    phase: '第一階段：急性保護與疼痛調節',
    timeframe: '0 至 2 週',
    core_goals_zh: '減輕急性發炎與神經水腫、維持脊柱中立位、避免臥床過久引起肌肉萎縮與骨質加速流失。',
    allowed_exercises_zh: [
      '床邊滾木翻身技巧（Log-Rolling）：肩與骨盆同步旋轉，絕不扭轉腰椎',
      '腹橫肌等長收縮（ADIM 肚臍微向內收，維持均勻腹式呼吸）',
      '仰臥屈膝骨盆後傾微動（Pelvic Tilts 在無痛範圍內進行）',
      '定時下床慢走 5–10 分鐘（若為壓迫性骨折下床時必須穿戴 TLSO 硬背架）',
    ],
    strict_contraindications_zh: [
      '嚴禁長時間臥床 > 48 小時',
      '嚴禁任何彎腰前屈動作（如彎腰摸腳趾、仰臥起坐、直膝拾物）',
      '嚴禁脊椎負重旋轉（扭身拿後座物品、高爾夫揮桿動作）',
    ],
    milestones_zh: '能在翻身與坐起時疼痛控制在 VAS ≤ 3 分，能獨立完成安全下床與如廁。',
  },
  {
    phase: '第二階段：亞急性動作控制與神經活動度',
    timeframe: '2 至 6 週',
    core_goals_zh: '重建「髖鉸鏈（Hip Hinge）」動作模式、改善胸椎活動度、漸進性步行耐力與神經滑動。',
    allowed_exercises_zh: [
      'Lancet WalkBack 走路處方：每日累積 30–45 分鐘中度速度行走',
      '髖鉸鏈（Hip Hinge）訓練：雙手持棍貼合後腦、胸椎與薦骨，屈髖練習',
      '坐姿仰頭伸展與胸椎伸展（雙手抱頭靠椅背輕柔後仰）',
      '神經滑動技術（坐姿輕柔伸膝＋腳踝背屈，改善坐骨神經滑動性）',
    ],
    strict_contraindications_zh: [
      '避免坐過軟或過低的沙發（沙發會迫使腰椎進入駝背後凸弧度）',
      '避免單手提重物超過 5 公斤',
      '避免突然跳躍或劇烈震動運動',
    ],
    milestones_zh: '能維持 30 分鐘連續行走無神經牽拉痛，日常起坐時能主動維持脊椎中立位。',
  },
  {
    phase: '第三階段：功能性肌力與骨質負重重塑',
    timeframe: '6 週以上',
    core_goals_zh: '打造「肌肉鋼筋支架」保護脊柱；透過漸進阻力與衝擊負荷刺激骨質生成，防範未來的骨折與退化。',
    allowed_exercises_zh: [
      '麥吉爾護脊黃金三大動作（McGill Big 3：改良捲腹、側棒式、鳥狗式）',
      '阻力訓練深蹲與臀橋（加強臀大肌與大腿前側，以髖關節發力取代腰椎發力）',
      '農夫走路（Farmer\'s Walk 雙手各持適度啞鈴中立位負重行走，鍛鍊全身抗旋轉核心）',
      '單腳站立平衡與太極拳（強化本體感覺，研究證實可降低 40% 跌倒風險）',
    ],
    strict_contraindications_zh: [
      '骨質疏鬆或曾壓迫性骨折者，終生避免負重大重量早安式屈體（Good Mornings）與負重體操下壓',
      '避免任何在疲勞失控狀態下的動作訓練',
    ],
    milestones_zh: '能完成 McGill Big 3 各動作標準維持 10 秒 × 5 組，平衡能力達閉眼單腳站立 > 15 秒。',
  },
];

export interface McgillExercise {
  name_zh: string;
  name_en: string;
  target_muscles: string;
  spinal_load_biomechanics: string;
  key_cue_zh: string;
  reps_and_sets: string;
}

export const MCGILL_BIG_THREE: McgillExercise[] = [
  {
    name_zh: '改良式捲腹',
    name_en: 'Modified Curl-Up',
    target_muscles: '腹直肌、腹橫肌、腹內外斜肌',
    spinal_load_biomechanics: '雙手墊在腰椎下方維持生理前凸，一膝彎曲一膝打直以鎖定骨盆；捲起時僅微幅抬起頭與胸椎（約 2–3 公分），腰椎完全「零彎曲、零剪切力」，椎間盤壓力極低。',
    key_cue_zh: '想像後腦杓直接朝天花板抬升 2 公分，下巴收緊像夾一顆橘子，不要用脖子出力，不要把整個背部彎起。',
    reps_and_sets: '維持頂峰收縮 7–8 秒，每側屈膝做 4–5 次，採金字塔遞減組數（如 5-3-1 組）。',
  },
  {
    name_zh: '側棒式',
    name_en: 'Side Bridge / Side Plank',
    target_muscles: '腰方肌（Quadratus Lumborum）、腹斜肌、臀中肌',
    spinal_load_biomechanics: '腰方肌是腰椎最重要的「側向穩定纜繩」。側棒式能在最低的脊柱軸向壓縮負荷下，最大化啟動腰方肌與斜肌，強化脊椎側向抗側屈穩定度。',
    key_cue_zh: '肩膀、骨盆、膝蓋呈一直線；初學者可採屈膝側棒式，手肘置於肩膀正下方，臀部向上推起時收緊臀部與腹部。',
    reps_and_sets: '每側維持 8–10 秒，兩側輪流進行 3–4 組。',
  },
  {
    name_zh: '四足跪姿鳥狗式',
    name_en: 'Bird-Dog',
    target_muscles: '多裂肌（Multifidus）、豎脊肌、臀大肌、肩背闊肌',
    spinal_load_biomechanics: '以四足跪姿對角線伸展一臂與對側腿。能深度活化脊椎深層最重要的抗旋轉肌肉「多裂肌」，且脊椎壓縮力遠低於俯臥超人式（Superman 伸展會造成高達 6000 N 的危險腰椎關節擠壓）。',
    key_cue_zh: '手腕在肩下、膝在髖下；手腳向遠處「延伸」而非「向上挑」，保持背部平坦如一張桌面，放一杯水也不會灑出。',
    reps_and_sets: '對角維持 8 秒，每側 5 次，換邊重複 3 組。',
  },
];

export interface SpineBiomechanicCurve {
  segment: string;
  normal_angle: string;
  mechanical_function: string;
  common_distortion: string;
  correction_focus: string;
}

export const SPINE_HEALTH_CURVES: SpineBiomechanicCurve[] = [
  {
    segment: '頸椎前凸 (Cervical Lordosis)',
    normal_angle: '約 20° – 40°',
    mechanical_function: '支撐 4–5 公斤的頭顱重量，藉由前凸弧度分散行走、奔跑時的地心引力向上反作用力。',
    common_distortion: '頸椎變直、甚至反向後凸（烏龜頸、低頭族 Text Neck）。',
    correction_focus: '下巴後收（Chin Tuck）、電腦螢幕墊高至視線水平、避免低頭滑手機。',
  },
  {
    segment: '胸椎後凸 (Thoracic Kyphosis)',
    normal_angle: '約 20° – 40°',
    mechanical_function: '與肋骨架構成胸廓保護心肺器官；後凸弧度提供背部肌肉強大的力臂附著空間。',
    common_distortion: '過度後凸（駝背、長者骨鬆楔形塌陷導致的道格氏駝背）。',
    correction_focus: '胸椎伸展滾筒放鬆、強化背部伸肌與肩胛菱形肌、防範骨質疏鬆壓迫性骨折。',
  },
  {
    segment: '腰椎前凸 (Lumbar Lordosis)',
    normal_angle: '約 30° – 50°',
    mechanical_function: '人體主要承重彈簧樞紐；與骨盆薦骨傾斜角（Sacral Slope）協同達成直立行走的矢狀位平衡（Sagittal Balance）。',
    common_distortion: '腰椎前凸過度（骨盆前傾）或腰椎弧度消失變平（Flat Back，大幅增加椎間盤突出壓力）。',
    correction_focus: '髖關節屈肌放鬆、強化臀肌與核心腹橫肌、坐姿加裝腰靠支撐弧度。',
  },
  {
    segment: '薦椎後凸 (Sacral Kyphosis)',
    normal_angle: '固定融合',
    mechanical_function: '骨盆環的基石，將脊柱上半身的重力均勻傳導至雙側髖關節與雙下肢。',
    common_distortion: '薦髂關節微錯位、骨盆左右扭轉。',
    correction_focus: '避免長時間蹺二郎腿、單腳站立三七步，維持骨盆水平。',
  },
];

// ── Myths & quiz ──────────────────────────────────────────────────────────────

export const SPINE_MYTHS: { chapter: SpineTab; myth: string; fact: string }[] = [
  { chapter: 'SPURS', myth: '長骨刺一定要開刀拿掉。', fact: '多數骨刺沒有症狀，手術只用在神經被壓迫且出現對應症狀、保守治療無效或有警訊的人，而且手術目的是「減壓」而不是把骨刺清乾淨。' },
  { chapter: 'SPURS', myth: '有些食物或藥可以把骨刺消掉。', fact: '骨刺是骨頭，沒有任何食物、保健品或藥物能溶掉它。治療目標是改善症狀與功能。' },
  { chapter: 'SPURS', myth: 'MRI 報告寫「椎間盤突出」，痛一定是它造成的。', fact: '40 歲無症狀的人約三分之一有椎間盤突出，醫師需要把影像、症狀與神經學檢查三者對起來才能判斷。' },
  { chapter: 'OSTEOPOROSIS', myth: '只要多喝牛奶、吃鈣片，就能治好骨質疏鬆。', fact: '鈣質與維生素 D 只是骨骼健康的「建材與基底」；對於已確診骨質疏鬆或發生骨折者，單靠補鈣無法逆轉骨量流失，必須接受處方藥物（抗吸收劑或促生成劑）治療。' },
  { chapter: 'OSTEOPOROSIS', myth: '骨質疏鬆平常沒感覺，代表骨頭還很勇。', fact: '骨質疏鬆被稱為「無聲殺手」，它在骨折前完全沒有疼痛症狀；第一次發作往往就是彎腰搬花盆或輕微跌倒就骨折。定期 DXA 檢測是唯一能及早發現的手段。' },
  { chapter: 'FRACTURE', myth: '脊椎壓迫性骨折一定要灌骨泥，灌完就一勞永逸。', fact: '多數輕微壓迫性骨折經由短期止痛、硬背架保護與防跌，能在數週內癒合；骨泥主要用於急性劇痛無法下床或進展性塌陷者。更重要的是：骨泥只黏住了碎骨，若沒積極治療全身骨鬆，一年內鄰近節段再骨折率達 15–20%！' },
  { chapter: 'FRACTURE', myth: '脊椎骨折就應該絕對臥床躺一個月不動。', fact: '長者臥床 7 天就足以流失相當於老化 10 年的肌肉量與大量骨鈣；除了前 24–48 小時相對休息外，應盡早佩戴硬背架下床活動，並嚴禁彎腰前屈。' },
  { chapter: 'SURGERY', myth: '微創手術傷口很小，所以完全沒有風險、術後可以馬上搬重物。', fact: '微創手術雖大幅減少肌肉與周邊組織損傷，但神經減壓的本質與傳統手術一樣精細；術後神經孔仍需數週修復消腫，切除椎間盤的纖維環破口仍有 5–10% 的復發機率，術後數週仍需遵循動作保護原則。' },
  { chapter: 'SURGERY', myth: '脊椎只要開過刀，以後一定會「廢掉」或癱瘓。', fact: '現代顯微與內視鏡手術在 30 倍高解析放大、水流灌注及術中神經監測下，癱瘓風險低於 0.1%；對於馬尾症候群或進展性無力者，及時減壓才是挽救神經功能的關鍵。' },
  { chapter: 'NUMBNESS', myth: '手麻就是頸椎壓到神經。', fact: '腕隧道症候群、肘隧道症候群、糖尿病或 B12 不足造成的神經病變都很常見；麻的分布與伴隨症狀能幫忙區分。' },
  { chapter: 'POSTURE', myth: '坐著一定要挺得筆直才不傷腰。', fact: '研究量到刻意挺直坐的椎間盤壓力反而比放鬆坐高；靠著椅背、常常換姿勢才是重點。' },
  { chapter: 'POSTURE', myth: '腰痛就應該躺在床上休息。', fact: '維持可忍受的日常活動比臥床恢復更快；長時間臥床反而讓肌肉無力、更容易轉為慢性。' },
  { chapter: 'EXERCISE', myth: '多做仰臥起坐可以鍛鍊核心保護腰椎。', fact: '傳統仰臥起坐會對腰椎產生超過 3300 牛頓的巨大壓縮力與彎曲剪力，加速椎間盤磨損與纖維環破裂；應改做改良式捲腹（Curl-up）等 McGill 護脊運動。' },
  { chapter: 'REHAB', myth: '每天去復健科做電療、拉腰就會好。', fact: '電療與牽引屬於被動治療，證據有限；真正改善長期結果的是運動與動作再教育。' },
  { chapter: 'REHAB', myth: '骨質疏鬆的人只要多散步就好，不能碰重量訓練。', fact: '散步對骨密度的刺激非常有限；LIFTMOR 等大型臨床試驗證實，在專業監督下進行漸進式阻力訓練與衝擊負重，才能真正刺激骨質生成並強化防跌肌力。' },
  { chapter: 'TREATMENT', myth: '椎間盤突出不會自己好，一定要手術。', fact: '多數會隨時間改善，越大塊的脫出或游離型反而越容易被身體吸收縮小。' },
  { chapter: 'TREATMENT', myth: '戴護腰可以預防閃到腰。', fact: '統合分析顯示護腰帶沒有預防效果；規律運動才有。' },
  { chapter: 'MEDS', myth: '維生素 B 群吃越多，神經修復越快。', fact: 'B12 只對缺乏的人有明確效果；B6 長期過量反而會造成周邊神經病變。' },
  { chapter: 'MEDS', myth: '神經痛藥物對所有「神經痛」都有效。', fact: 'pregabalin 對糖尿病神經痛有效，但大型試驗顯示對坐骨神經痛的效果並不比安慰劑好，副作用卻比較多。' },
  { chapter: 'TRIAGE', myth: '腰痛越早照 MRI 越好。', fact: '沒有警訊時，前 4–6 週做影像不會讓你好得更快，反而可能因為看到常見的退化而增加焦慮與不必要的治療。' },
];

export const SPINE_QUIZ: Partial<Record<SpineTab, { question: string; options: string[]; answer: number; explain: string }>> = {
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
  OSTEOPOROSIS: {
    question: '使用保骼麗（Denosumab）治療骨質疏鬆症，最重大的用藥警訊是什麼？',
    options: ['容易引起低血壓', '絕對不可擅自停藥，停藥會引起骨質反彈流失與多發脊椎骨折', '只能吃素的人使用', '必須每天早起空腹注射'],
    answer: 1,
    explain: 'Denosumab 停藥後 RANKL 抑制解除，蝕骨細胞會爆發性活化造成反彈性骨流失；若要停藥，必須在第 6 個月銜接雙磷酸鹽類藥物以保護骨骼。',
  },
  FRACTURE: {
    question: '骨質疏鬆性脊椎壓迫性骨折，在急性期（前 2 週）的最核心原則是什麼？',
    options: ['一定要絕對臥床休養一個月不動', '嚴格限制臥床不超過 48 小時，下床穿戴適當背架（如 TLSO），避免向前彎腰', '立刻做大重量硬舉訓練', '大力推拿整脊把塌陷的骨頭推回去'],
    answer: 1,
    explain: '長者臥床 7 天就足以流失相當於老化 10 年的肌力與大量骨質；除了最初劇痛的 24–48 小時內相對休息外，應盡早在背架保護下下床活動，並嚴禁整脊與彎腰。',
  },
  SURGERY: {
    question: '雙通道內視鏡脊椎手術（UBE）相較於傳統大開刀，最大的優勢是什麼？',
    options: ['費用完全免費', '不用打麻醉', '完整保留背部多裂肌與張力帶韌帶，失血極少且傷口疼痛輕微', '術後當天就可以參加馬拉松'],
    answer: 2,
    explain: 'UBE 透過兩個小於 1 公分的微孔，經由自然肌肉間隙進入病灶，不需剝離多裂肌與破壞穩定韌帶，術中在連續水流灌注下操作，失血量少且恢復極快。',
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
  REHAB: {
    question: '依據 McGill 脊椎生物力學研究與國際指引，骨質疏鬆與壓迫性骨折患者應「嚴格避免」哪類動作？',
    options: ['漸進式健走', '負重向前彎腰屈體與仰臥起坐', '散步與太極拳', '深呼吸訓練'],
    answer: 1,
    explain: '負重向前彎腰與仰臥起坐會對脊椎前柱造成極大的壓縮與剪切負荷，是誘發與加劇楔形壓迫骨折的頭號禁忌！',
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
  TRIAGE: {
    question: '下背痛合併哪一個症狀，應該立即到急診？',
    options: ['久坐後痠痛', '小便解不出來、會陰部麻木', '早上起床僵硬', '彎腰時拉扯痛'],
    answer: 1,
    explain: '尿滯留、會陰部（鞍區）麻木是馬尾症候群的警訊，需要緊急 MRI 與減壓手術，延誤可能造成永久失禁。',
  },
};
