import type { CourseChapter, CourseQuiz, CourseSource, CourseUnit } from '../components/common/pro/CourseShell';

/**
 * gastroData.ts — 肝膽腸胃科全方位臨床專區 (v5.2)
 *
 * 5 個單元、12 個深度知識章節：
 *   單元一：解剖生理與腦腸軸（OVERVIEW, GERD_ULCER, HP_GASTRIC）
 *   單元二：下消化道與腸道機能（IBS_FODMAP, IBD_CARE, CRC_POLYPS）
 *   單元三：肝臟疾病與病毒性肝炎（MASLD_FATTY, HEPATITIS_BC, CIRRHOSIS_PORTAL）
 *   單元四：膽道與胰臟急慢性病（GALLBLADDER_BILE, PANCREAS_CARE）
 *   單元五：內視鏡檢查與急症分流（ENDOSCOPY_TRIAGE）
 *
 * 實證依據：ACG 2022–2024、AGA、EASL-EASD-EASO 2024 MASLD、AASLD 2023、Maastricht VI/Florence、
 * Tokyo Guidelines 2018 (TG18)、台灣消化系醫學會 (GEST)、國健署公費篩檢規範。
 */

export type GastroTab =
  | 'OVERVIEW'
  | 'GERD_ULCER'
  | 'HP_GASTRIC'
  | 'IBS_FODMAP'
  | 'IBD_CARE'
  | 'CRC_POLYPS'
  | 'MASLD_FATTY'
  | 'HEPATITIS_BC'
  | 'CIRRHOSIS_PORTAL'
  | 'GALLBLADDER_BILE'
  | 'PANCREAS_CARE'
  | 'ENDOSCOPY_TRIAGE';

export const GASTRO_TABS: readonly GastroTab[] = [
  'OVERVIEW',
  'GERD_ULCER',
  'HP_GASTRIC',
  'IBS_FODMAP',
  'IBD_CARE',
  'CRC_POLYPS',
  'MASLD_FATTY',
  'HEPATITIS_BC',
  'CIRRHOSIS_PORTAL',
  'GALLBLADDER_BILE',
  'PANCREAS_CARE',
  'ENDOSCOPY_TRIAGE',
];

export type GastroPathIcon = 'reflux' | 'gut' | 'liver' | 'biliary' | 'scope' | 'redflag';

export interface GastroPath {
  key: GastroPathIcon;
  label: string;
  hint: string;
  chapters: GastroTab[];
}

export const GASTRO_PATHS: GastroPath[] = [
  {
    key: 'reflux',
    label: '火燒心、胃痛、驗出幽門螺旋桿菌',
    hint: '胃食道逆流、消化性潰瘍與除菌防胃癌',
    chapters: ['OVERVIEW', 'GERD_ULCER', 'HP_GASTRIC', 'ENDOSCOPY_TRIAGE'],
  },
  {
    key: 'gut',
    label: '常腹脹拉肚子、便秘或血便',
    hint: '腸躁症低 FODMAP、發炎性腸道疾病與大腸鏡息肉',
    chapters: ['IBS_FODMAP', 'IBD_CARE', 'CRC_POLYPS', 'ENDOSCOPY_TRIAGE'],
  },
  {
    key: 'liver',
    label: '健檢有脂肪肝、肝指數高或 B/C 肝',
    hint: 'FIB-4 纖維化評估、減重逆轉脂肪肝、B/C 肝與肝硬化追蹤',
    chapters: ['MASLD_FATTY', 'HEPATITIS_BC', 'CIRRHOSIS_PORTAL'],
  },
  {
    key: 'biliary',
    label: '右上腹劇痛、膽結石或胰臟發炎',
    hint: '膽結石、急性膽囊炎、膽管炎三聯徵與急性胰臟炎照護',
    chapters: ['GALLBLADDER_BILE', 'PANCREAS_CARE', 'ENDOSCOPY_TRIAGE'],
  },
  {
    key: 'scope',
    label: '準備做無痛胃鏡或大腸鏡檢查',
    hint: '低渣飲食、分次清腸瀉藥 SOP、布里斯托便型與檢查判讀',
    chapters: ['CRC_POLYPS', 'ENDOSCOPY_TRIAGE', 'HP_GASTRIC'],
  },
];

export const GASTRO_UNITS: CourseUnit<GastroTab>[] = [
  {
    title: '食道、胃與上消化道',
    blurb: '消化系統全景、腦腸軸、胃食道逆流、潰瘍與幽門螺旋桿菌除菌',
    chapters: ['OVERVIEW', 'GERD_ULCER', 'HP_GASTRIC'],
  },
  {
    title: '小腸、大腸與腸道微生態',
    blurb: '腸躁症低 FODMAP 飲食、克隆氏症／潰瘍性結腸炎、大腸息肉與癌篩',
    chapters: ['IBS_FODMAP', 'IBD_CARE', 'CRC_POLYPS'],
  },
  {
    title: '肝臟代謝、肝炎與肝硬化',
    blurb: 'MASLD 代謝性脂肪肝、B/C 型肝炎根治與追蹤、肝硬化門脈高壓照護',
    chapters: ['MASLD_FATTY', 'HEPATITIS_BC', 'CIRRHOSIS_PORTAL'],
  },
  {
    title: '膽道系統與胰臟疾病',
    blurb: '膽結石、膽囊炎、膽管炎 Charcot 三聯徵、急慢性胰臟炎與胰液機能',
    chapters: ['GALLBLADDER_BILE', 'PANCREAS_CARE'],
  },
  {
    title: '內視鏡實戰與急症分流',
    blurb: '胃鏡大腸鏡清腸準備、大便分類、腹痛九宮格與消化道出血紅旗',
    chapters: ['ENDOSCOPY_TRIAGE'],
  },
];

export const GASTRO_CHAPTERS: CourseChapter<GastroTab>[] = [
  {
    id: 'OVERVIEW',
    label_zh: '消化全景與腦腸軸',
    title_zh: '肝膽腸胃全景：從食道到肛門的 9 公尺消化道與肝膽胰協同工廠',
    goal_zh: '理解消化道各器官與肝、膽、胰的生理分工，認識「第二大腦」腸道神經系統（ENS）與腦腸微生態軸。',
    learn_zh: [
      '消化管（食道、胃、小腸、大腸）與附屬腺體（肝、膽、胰）的協同機制',
      '腦腸軸（Gut-Brain Axis）：迷走神經、90% 血清素與短鏈脂肪酸（SCFA）',
      '肝膽腸胃四大常見症狀群的初步對應器官',
    ],
    minutes: 8,
    takeaways_zh: [
      '消化系統不只是吸收營養的管子，更是人體最大的免疫器官（70% 免疫細胞在腸道）與神經內分泌中心（90% 血清素在腸道合成）。',
      '肝臟負責製造膽汁、膽囊負責濃縮儲存、胰臟分泌消化酵素與重碳酸鹽，三者在十二指腸乳頭（壺腹）匯合分解脂肪與蛋白質。',
      '壓力會透過迷走神經與皮質醇直接改變胃酸分泌、腸道蠕動與黏膜通透性，因此腸胃病必須「身心並治」。',
    ],
  },
  {
    id: 'GERD_ULCER',
    label_zh: '胃食道逆流與潰瘍',
    title_zh: '胃食道逆流（GERD）、巴瑞特氏食道與消化性潰瘍的階梯治療',
    goal_zh: '分辨典型火燒心與非典型咽喉逆流，掌握洛杉磯食道炎分級、PPI／P-CAB 最佳服藥時機與生活減壓處方。',
    learn_zh: [
      '下食道括約肌（LES）鬆弛機轉、洛杉磯 A–D 分級與巴瑞特氏食道癌變風險',
      '胃潰瘍（飽痛）vs 十二指腸潰瘍（餓痛／半夜痛）的鑑別與 NSAID 止痛藥傷害',
      '氫離子幫浦抑制劑（PPI，飯前 30 分鐘）與鉀離子競爭性酸阻斷劑（P-CAB）用法',
    ],
    minutes: 9,
    takeaways_zh: [
      '生活三大最有效減逆流槓桿：睡前 3 小時不進食、床頭墊高 15–20 公分＋左側臥、體重減輕 5–10%。',
      '傳統 PPI（如耐適恩、百抑潰）必須在「早餐前 30 分鐘空腹」吃，才能在進食活化質子幫浦時精準封鎖；新型 P-CAB（วอนoprazan）則不受進食影響。',
      '若出現吞嚥困難或卡住感、不明原因體重減輕、黑便或貧血，屬於「警示症狀」，必須立即安排胃鏡排除食道癌或胃癌。',
    ],
  },
  {
    id: 'HP_GASTRIC',
    label_zh: '幽門桿菌與胃癌預防',
    title_zh: '幽門螺旋桿菌（H. pylori）：Correa 胃癌演進瀑布與除菌根治處方',
    goal_zh: '認識一級致癌物幽門螺旋桿菌如何引發慢性萎縮性胃炎、腸化生到胃癌，看懂吹氣與糞便檢查，掌握四合一除菌成功關鍵。',
    learn_zh: [
      'Correa 胃癌演進瀑布：正常黏膜 → 慢性胃炎 → 萎縮性胃炎 → 腸上皮化生 → 異生 → 胃腺癌',
      '碳 13 尿素呼氣試驗（UBT）與糞便抗原檢測的準確度，以及檢驗前停藥鐵律（PPI 停 2 週、抗生素停 4 週）',
      '含鉍劑四合一與非鉍劑四合一（10–14 天）除菌療法，以及同住家人「公筷母匙」防再感染',
    ],
    minutes: 8,
    takeaways_zh: [
      '根除幽門螺旋桿菌可將胃癌發生風險降低約 40–50%，且在「萎縮性胃炎與腸化生發生前」越早除菌，保護效益越大。',
      '做碳 13 吹氣或糞便抗原檢查前，必須停用 PPI 制酸劑至少 2 週、停用抗生素與鉍劑至少 4 週，否則容易出現「偽陰性」。',
      '已經出現中重度「萎縮性胃炎」或「腸上皮化生」者，即使成功除菌，仍須每 1–3 年定期接受窄頻影像（NBI）放大胃鏡追蹤。',
    ],
  },
  {
    id: 'IBS_FODMAP',
    label_zh: '腸躁症與低FODMAP',
    title_zh: '大腸激躁症（IBS）：Rome IV 診斷標準与三階段低 FODMAP 飲食實戰',
    goal_zh: '了解腸躁症的內臟過度敏感機轉，學會辨識高 FODMAP 產氣滲透食物，安全執行排除、重新引入與個人化三階段飲食。',
    learn_zh: [
      'Rome IV 診斷標準：腹痛與排便頻率／型態改變相關，分為腹瀉型（IBS-D）、便秘型（IBS-C）與混合型（IBS-M）',
      'FODMAP（可發酵寡醣、雙醣、單醣及多元醇）如何在小腸吸水、在大腸快速發酵產氣',
      '台灣常見高／低 FODMAP 食材替換表與三階段飲食流程（嚴格期僅限 2–6 週）',
    ],
    minutes: 9,
    takeaways_zh: [
      '腸躁症不是「心理作用」，而是腦腸軸訊號異常、內臟痛覺閾值降低與腸道微發炎共同造成的真實生理疾病。',
      '低 FODMAP 飲食第一階段「嚴格排除期」只做 2–6 週，症狀改善後必須逐一「重新引入測試」，找出真正誘發自己不適的特定糖類，切勿終生過度忌口導致菌相失衡。',
      '50 歲後才新發生的排便習慣改變、夜間痛醒腹瀉、血便、貧血或體重減輕，絕不可直接當成腸躁症，必須先做大腸鏡排除器質性病變。',
    ],
  },
  {
    id: 'IBD_CARE',
    label_zh: '發炎性腸道疾病 IBD',
    title_zh: '發炎性腸道疾病（IBD）：潰瘍性結腸炎（UC）與克隆氏症（CD）全期照護',
    goal_zh: '區分自體免疫腸炎（IBD）與功能性腸躁症（IBS），看懂 UC 與 CD 的病灶分布差異、糞便鈣衛蛋白與生物製劑「黏膜癒合」目標。',
    learn_zh: [
      '潰瘍性結腸炎（由直腸往上連續表淺發炎、黏液血便）vs 克隆氏症（全消化道跳躍式全層發炎、廔管狹窄）',
      '非侵入性發炎指標：糞便鈣衛蛋白（Fecal Calprotectin）如何監測腸道復發',
      '治療目標演進（STRIDE-II）：從「症狀緩解」走向「內視鏡黏膜癒合」，5-ASA、生物製劑與小分子藥物定位',
    ],
    minutes: 8,
    takeaways_zh: [
      '年輕人若持續腹瀉超過 4 週、大便帶血或黏液、半夜因腹痛腹瀉醒來、伴隨體重下降或肛門反覆廔管膿瘍，應高度懷疑 IBD。',
      'IBD 是需要長期穩定控制的慢性免疫疾病；症狀不痛不拉不代表腸黏膜沒發炎，切勿自行停用 5-ASA 或生物製劑，以免誘發急性穿孔或大出血。',
      '罹患廣泛性潰瘍性結腸炎或結腸型克隆氏症滿 8–10 年後，大腸癌風險上升，需每 1–2 年接受染色或 NBI 內視鏡監測。',
    ],
  },
  {
    id: 'CRC_POLYPS',
    label_zh: '大腸息肉與癌篩追蹤',
    title_zh: '大腸直腸息肉分類、腺瘤-癌序列與大腸鏡切息肉後追蹤時間表',
    goal_zh: '認識增生性息肉、管狀／絨毛狀腺瘤與鋸齒狀息肉的癌變潛力，掌握台灣公費糞便潛血篩檢與切除息肉後的最新國際追蹤間隔。',
    learn_zh: [
      '兩大癌變路徑：傳統「腺瘤-癌序列（APC/KRAS/p53，歷時 5–10 年）」與「無柄鋸齒狀病變（SSL）路徑」',
      '看懂病理報告：增生性息肉（良性）vs 管狀腺瘤 vs 絨毛狀腺瘤／高度異生（高風險）',
      'USMSTF 2020 大腸鏡息肉切除後追蹤間隔：1–2 顆小腺瘤（7–10 年）vs 高風險腺瘤（3 年）',
    ],
    minutes: 9,
    takeaways_zh: [
      '大腸癌是最能「靠篩檢直接預防」的癌症：在大腸鏡下把尚未癌變的「腺瘤性息肉」切除，就能直接降低 70–90% 大腸癌發生率。',
      '免疫法糞便潛血檢查（iFOBT）一旦呈現「陽性」，約每 2 人就有 1 人有腺瘤息肉、每 20 人有 1 人是大腸癌；務必在 3 個月內做大腸鏡，絕對不能「再驗一次大便看有沒有變陰性」。',
      '大腸鏡的品質取決於「清腸乾淨度（BBPS ≥ 6）」與「腺瘤偵測率（ADR ≥ 25%）」；清腸不乾淨最容易漏掉扁平的右側大腸鋸齒狀息肉。',
    ],
  },
  {
    id: 'MASLD_FATTY',
    label_zh: '代謝性脂肪肝 MASLD',
    title_zh: '代謝功能障礙相關脂肪性肝病（MASLD）：FIB-4 分流與減重逆轉階梯',
    goal_zh: '掌握 2023–2024 全球新命名 MASLD 診斷標準，使用 FIB-4 計算機自我篩檢肝纖維化，執行「減重 5–7–10%」與 Resmetirom 實證療法。',
    learn_zh: [
      '為什麼從 NAFLD 改名為 MASLD：肝脂肪變性 ＋ 至少 1 項心血管代謝危險因子（BMI、血糖、血壓、TG、HDL）',
      '決定預後的關鍵不是「脂肪多少」而是「肝纖維化第幾期（F0–F4）」：FIB-4 指數（< 1.3 排除、≥ 2.67 高風險）與肝纖維化掃描（VCTE）',
      '體重減輕劑量效應：減 5% 降肝脂肪、減 7% 消退 MASH 發炎、減 ≥10% 逆轉肝纖維化；GLP-1/GIP 與 THR-β 促效劑（Resmetirom）',
    ],
    minutes: 10,
    takeaways_zh: [
      '台灣成人約每 3 人就有 1 人有脂肪肝，且約 15–20% 屬於「瘦子脂肪肝（Lean MASLD）」——體重正常但內臟脂肪高、帶 PNPLA3 基因變異或愛喝含糖手搖飲。',
      'ALT（GPT）正常不代表肝臟沒事！建議 40 歲以上或有糖尿病、肥胖者，用年齡、AST、ALT 與血小板算出 FIB-4；若 ≥ 1.3 應進一步做彈性超音波（FibroScan）。',
      '戒除游離果糖（手搖飲、含糖飲料）、每週 150 分鐘有氧加阻力運動，即使體重還沒大降，也能減少 20–30% 的肝內脂肪；黑咖啡（每日 2–3 杯無糖）具 A 級護肝抗纖維化實證。',
    ],
  },
  {
    id: 'HEPATITIS_BC',
    label_zh: 'B/C 型病毒性肝炎',
    title_zh: 'B 型與 C 型病毒性肝炎：C 肝全口服藥 DAA 98% 治癒與 B 肝長期抑毒',
    goal_zh: '比較 B 肝（cccDNA 潛伏、口服藥長期壓制）與 C 肝（RNA 病毒、全口服 DAA 8–12 週根治）的本質差異，落實「治癒後仍須追蹤超音波」鐵律。',
    learn_zh: [
      'C 型肝炎革命：健保給付泛基因型全口服抗病毒藥（DAA，如夏奉寧、艾百樂、宜譜莎），8–12 週治癒率（SVR12）高達 98–99%',
      'B 型肝炎與 C 型肝炎的雙向比較，以及免疫抑制／化療前「預防性抗病毒投藥」防止猛爆性復發',
      '為什麼 C 肝病毒清光後，若有 F3 重度纖維化或 F4 肝硬化，仍必須每 6 個月終生照超音波？',
    ],
    minutes: 8,
    takeaways_zh: [
      '驗出 C 肝抗體（Anti-HCV）陽性後，下一步是驗「HCV RNA 病毒量」；只要測得到病毒，健保全額給付口服新藥，吃 2–3 個月幾乎無副作用即可徹底根治。',
      'B 肝帶原者若因癌症需要化療、標靶、免疫治療，或因自體免疫疾病使用生物製劑／高劑量類固醇，務必先會診肝膽科給予預防性抗病毒藥，防止致命性病毒再活化。',
      'C 肝根治（SVR）可減少 70% 以上肝癌風險，但若治療前已達重度纖維化（F3）或肝硬化（F4），肝癌風險不會歸零，仍須每 6 個月做腹部超音波＋AFP。',
    ],
  },
  {
    id: 'CIRRHOSIS_PORTAL',
    label_zh: '肝硬化與門脈高壓',
    title_zh: '肝硬化代償期與失代償期：門脈高壓四大併發症、Child-Pugh 與護肝營養',
    goal_zh: '看懂肝硬化從無症狀「代償期」跨入「失代償期」的轉折，認識食道靜脈曲張出血、腹水、肝腦病變與睡前點心防肌少症。',
    learn_zh: [
      '門脈高壓（Portal Hypertension）血流受阻機轉與四大併發症：食道胃靜脈曲張、腹水與自發性細菌性腹膜炎（SBP）、肝性腦病變、肝腎症候群',
      'Child-Pugh 分級（A/B/C）與 MELD 評分的臨床意義',
      '破除「肝硬化不能吃蛋白質」的舊迷思：高蛋白＋睡前碳水蛋白點心（Late Evening Snack）逆轉肌少症與高血氨',
    ],
    minutes: 9,
    takeaways_zh: [
      '肝硬化患者絕對不要因為怕「肝昏迷（高血氨）」而長期限制蛋白質！肌肉才是肝臟以外最重要的「排氨工廠」，蛋白質吃不夠導致肌少症，反而讓肝腦病變更容易發作。',
      '肝硬化肝醣儲存能力差，禁食一晚（10 小時）相當於健康人飢餓 3 天，身體會拆解肌肉當燃料；「睡前吃一份約 200 大卡的複合碳水＋蛋白質點心」能顯著保護肌肉。',
      '肝硬化患者應保持每天排軟便 2–3 次（必要時規律服用 Lactulose 杜化液），並絕對禁用 NSAID 止痛藥、來路不明草藥與生食海鮮（防海洋創傷弧菌敗血症）。',
    ],
  },
  {
    id: 'GALLBLADDER_BILE',
    label_zh: '膽結石與膽道急症',
    title_zh: '膽結石、急性膽囊炎與急性膽管炎：從無症狀追蹤到腹腔鏡與 ERCP 時機',
    goal_zh: '分辨無症狀膽結石、膽絞痛、急性膽囊炎與致命的急性膽管炎（Charcot 三聯徵），理解何時該開刀、何時做內視鏡取石。',
    learn_zh: [
      '膽結石成因（膽固醇結石 vs 色素結石）與「5F」高風險群（Female, Forty, Fat, Fertile, Fast weight loss 快速減重）',
      '膽絞痛（飯後右上腹悶痛，數小時內緩解）vs 急性膽囊炎（痛超過 6 小時＋發燒＋Murphy sign 陽性）vs 總膽管結石膽管炎（痛＋黃疸＋高燒寒顫）',
      '無症狀膽結石的例外手術指徵（瓷化膽囊、結石 > 3 cm、合併膽囊息肉 ≥ 1 cm）與膽囊切除術後飲食適應',
    ],
    minutes: 8,
    takeaways_zh: [
      '高達 70–80% 的膽結石終生不會痛，不需預防性切膽囊；但若合併「膽囊息肉 ≥ 1 公分」、「膽囊壁鈣化（瓷化膽囊）」或「結石 > 3 公分」，因膽囊癌風險上升，建議預防性腹腔鏡切除。',
      '一旦出現「右上腹痛 ＋ 黃疸（眼白變黃、茶色尿） ＋ 發燒畏寒（Charcot 三聯徵）」，代表石頭卡在總膽管引發急性膽管炎，隨時會演變成敗血性休克，必須立即掛急診做 ERCP 引流！',
      '膽囊只是膽汁的「水庫」而非「工廠」（膽汁是肝臟做的）；切除膽囊後初期 1–3 個月少數人吃太油會輕微腹瀉，只要採低脂少量多餐，總膽管會逐漸代償適應。',
    ],
  },
  {
    id: 'PANCREAS_CARE',
    label_zh: '急慢性胰臟炎照護',
    title_zh: '急性與慢性胰臟炎：膽源性、酒精性與高三酸甘油酯三大元兇與內外分泌保護',
    goal_zh: '認識急性胰臟炎「上腹劇痛鑽到背後」的典型表現與診斷標準，守住三酸甘油酯 < 500 mg/dL 紅線，了解慢性胰臟炎消化酶補充。',
    learn_zh: [
      'Revised Atlanta 急性胰臟炎診斷三要素（符合 2 項）：典型上腹貫穿背痛、血中澱粉酶／解脂酶（Lipase）> 正常上限 3 倍、典型影像表現',
      '台灣急性胰臟炎三大原因：膽結石卡住壺腹（約 40%）、酒精（約 30%）、高三酸甘油酯血症（TG > 500–1,000 mg/dL，約 15–20%）',
      '破除「急性胰臟炎一定要餓好幾天」舊觀念：輕中度患者在疼痛緩解後 24–48 小時內盡早由口低脂進食，更能保護腸道屏障防感染',
    ],
    minutes: 8,
    takeaways_zh: [
      '上腹劇烈持續刀割痛、痛感往背後穿透、身體往前彎曲抱膝時稍微減輕、平躺更痛，是急性胰臟炎最經典的警訊，請立即空腹就醫。',
      '空腹三酸甘油酯（TG）一旦超過 500 mg/dL（尤其 > 1,000 mg/dL），血液呈現乳糜狀，隨時可能誘發急性壞死性胰臟炎；必須嚴格戒酒、戒糖、低脂並服用 Fibrate 類降脂藥。',
      '慢性胰臟炎會同時摧毀「外分泌（脂肪瀉、營養不良，需隨餐補充胰消化酶 PERT）」與「內分泌（胰島受損引發第 3c 型胰源性糖尿病）」，且為胰臟癌高風險群。',
    ],
  },
  {
    id: 'ENDOSCOPY_TRIAGE',
    label_zh: '內視鏡準備與急症分流',
    title_zh: '胃鏡大腸鏡實戰準備、布里斯托便型解碼、腹痛九宮格與消化道急症分流',
    goal_zh: '掌握大腸鏡「低渣飲食＋分次喝瀉藥」滿分清腸攻略，學會用布里斯托 1–7 型與便色看健康，並對腹痛位置與出血警訊做出正確分流。',
    learn_zh: [
      '大腸鏡成功第一關鍵：檢查前 2–3 天低渣飲食 ＋「分次清腸（Split-dose，前一晚一半、檢查當天早上 4–6 小時前另一半）」讓大腸黏膜一目了然',
      '布里斯托大便分類法（Bristol Stool Chart 1–7 型）與五種危險便色（黑便、鮮血便、暗紅便、灰白便、油滴浮便）',
      '腹部九宮格疼痛地圖與必須立刻掛急診的肝膽腸胃紅旗警訊',
    ],
    minutes: 9,
    takeaways_zh: [
      '大腸鏡清腸口訣：「分次喝瀉藥（Split-dose）」比前一晚一次喝完乾淨度高出 2 倍以上！最後排出的水便必須像「清澈淡黃色尿液、看得到馬桶底」才算及格。',
      '服用抗血小板藥（阿斯匹靈、保栓通）、抗凝血劑或 GLP-1 瘦瘦針（延緩胃排空增加麻醉嗆咳風險）者，務必在內視鏡檢查前 1–2 週與開藥醫師及內視鏡團隊確認停藥天數。',
      '吐血或咖啡色嘔吐物、解瀝青狀發亮黑便、大量鮮血便伴頭暈冒冷汗、劇烈腹痛肚子硬如木板（腹膜炎）、灰白色陶土便伴茶色尿黃疸，請立即前往急診！',
    ],
  },
];

// ── Key numbers & reference tables ──────────────────────────────────────────

export const GASTRO_KEY_NUMBERS = [
  { value: '70%', unit: '免疫細胞', label: '集中在腸道黏膜相關淋巴組織（GALT）' },
  { value: '90%', unit: '血清素', label: '由腸道嗜鉻細胞合成，調控蠕動與情緒' },
  { value: '1/3', unit: '台灣成人', label: '患有代謝性脂肪肝（MASLD），最常見慢性肝病' },
  { value: '45–74', unit: '歲公費篩檢', label: '大腸癌糞便潛血（每2年）與幽門桿菌胃癌篩檢' },
];

export const GI_ORGANS_OVERVIEW = [
  {
    organ: '食道與下食道括約肌 (LES)',
    role: '蠕動運送食物入胃；LES 如單向閥門防止胃酸逆流',
    common_diseases: '胃食道逆流 (GERD)、巴瑞特氏食道、食道靜脈曲張、食道癌',
    key_test: '上消化道內視鏡（胃鏡）、24 小時食道酸鹼阻抗監測',
  },
  {
    organ: '胃與十二指腸',
    role: '分泌胃酸（pH 1.5–2）殺菌並啟動胃蛋白酶；幽門控管胃排空',
    common_diseases: '幽門螺旋桿菌胃炎、萎縮性胃炎／腸化生、胃潰瘍、十二指腸潰瘍、胃癌',
    key_test: '胃鏡＋切片、碳 13 尿素呼氣試驗（UBT）、糞便抗原',
  },
  {
    organ: '小腸（十二指腸、空腸、迴腸）',
    role: '長約 5–6 公尺，絨毛表面積如網球場，吸收 90% 營養素、鐵、鈣、B12 與膽鹽回收',
    common_diseases: '小腸細菌過度生長 (SIBO)、克隆氏症、乳糜瀉、血管異生出血',
    key_test: '膠囊內視鏡、雙氣囊小腸鏡、CT/MR 小腸造影 (CTE/MRE)',
  },
  {
    organ: '大腸（盲腸、結腸、直腸、肛門）',
    role: '吸收水分與電解質，數十兆腸道菌發酵膳食纖維產生丁酸（Butyrate）滋養腸上皮',
    common_diseases: '大腸激躁症 (IBS)、潰瘍性結腸炎 (UC)、大腸腺瘤息肉、大腸直腸癌、憩室炎、痔瘡',
    key_test: '免疫法糞便潛血 (iFOBT)、糞便鈣衛蛋白、全大腸鏡',
  },
  {
    organ: '肝臟',
    role: '人體最大代謝化工場：合成白蛋白與凝血因子、解毒藥物酒精、儲存肝醣、每日分泌 800 mL 膽汁',
    common_diseases: '代謝性脂肪肝 (MASLD)、B/C 型病毒性肝炎、藥物／酒精性肝炎、肝硬化、肝細胞癌 (HCC)',
    key_test: 'AST/ALT、血小板、FIB-4、白蛋白/膽紅素/INR、腹部超音波、FibroScan',
  },
  {
    organ: '膽囊與膽道系統',
    role: '濃縮並儲存膽汁；進食油脂時收縮（CCK 荷爾蒙刺激），經總膽管排入十二指腸乳頭乳化脂肪',
    common_diseases: '膽結石、膽囊息肉、急性膽囊炎、總膽管結石、急性膽管炎、膽道癌',
    key_test: '腹部超音波、ALP/γ-GT/直接膽紅素、MRCP 磁振膽胰管造影、ERCP、EUS',
  },
  {
    organ: '胰臟（外分泌＋內分泌）',
    role: '外分泌：分泌解脂酶、蛋白酶、澱粉酶與重碳酸鹽中和胃酸；內分泌：胰島分泌胰島素與升糖素',
    common_diseases: '急性胰臟炎、慢性胰臟炎（胰外分泌功能不全 PEI）、胰臟囊腫 (IPMN)、胰管腺癌 (PDAC)',
    key_test: '血清解脂酶 (Lipase)、澱粉酶、糞便彈性蛋白酶、增強型胰臟 CT/MRI、內視鏡超音波 (EUS)',
  },
];

export const LA_CLASSIFICATION = [
  { grade: 'Grade A（輕度）', endoscopic: '1 處以上黏膜破損，長度 ≤ 5 mm，未跨過兩條黏膜皺摺頂端', meaning: '輕微糜爛性食道炎，生活調整＋短期 4–8 週 PPI 治癒率 > 90%', tone: 'good' as const },
  { grade: 'Grade B（中度）', endoscopic: '至少 1 處黏膜破損長度 > 5 mm，但未跨過兩條黏膜皺摺之間', meaning: '標準 8 週 PPI 治療，需積極減重與改善睡前飲食習慣', tone: 'neutral' as const },
  { grade: 'Grade C（重度）', endoscopic: '黏膜破損跨過兩條以上皺摺，但少於食道圓周的 75%', meaning: '重度食道炎，易合併狹窄或巴瑞特氏食道，8 週治療後需複查胃鏡並常需維持治療', tone: 'warn' as const },
  { grade: 'Grade D（極重度）', endoscopic: '廣泛黏膜破損涵蓋食道圓周 ≥ 75%', meaning: '高併發症風險（潰瘍出血、食道狹窄、巴瑞特氏食道），需長期 PPI/P-CAB 控制與胃鏡監測', tone: 'bad' as const },
];

export const ULCER_COMPARISON = [
  { feature: '好發部位與年齡', gu: '胃竇部與胃小彎為主，中老年（50–65 歲）較多', du: '十二指腸球部為主，青壯年（30–50 歲）較多' },
  { feature: '疼痛與進食關係', gu: '「吃飽痛」：餐後 30–60 分鐘胃酸分泌加劇潰瘍刺激，常因怕痛不敢吃而體重減輕', du: '「飢餓痛、半夜痛」：空腹時未中和的胃酸流入十二指腸，吃點東西或喝奶反而暫時緩解' },
  { feature: '主要致病元兇', gu: '幽門螺旋桿菌（約 70%）、NSAID 消炎止痛藥／阿斯匹靈（約 25%）', du: '幽門螺旋桿菌（高達 90% 以上）、NSAID 止痛藥' },
  { feature: '惡性癌變風險', gu: '約 2–5%「看似胃潰瘍」實為早期潰瘍型胃癌！必須切片並於治療 8–12 週後複查胃鏡確認癒合', du: '幾乎皆為良性，極少癌變；除菌治療後一般不需常規複查胃鏡（除非症狀持續）' },
];

export const HP_TESTS_TABLE = [
  {
    method: '碳 13 尿素呼氣試驗 (C13-UBT)',
    invasive: '非侵入性（首選）',
    sensitivity: '95–98%',
    pros: '無放射性、老少孕婦皆宜；能反映全胃是否有「現症活動性感染」，是除菌後確認是否根治的黃金標準',
    prep: '空腹 4 小時；檢查前必須停用 PPI/P-CAB 至少 2 週、停用抗生素與鉍劑至少 4 週（不停藥會出現偽陰性！）',
  },
  {
    method: '糞便幽門桿菌抗原檢測 (SAT)',
    invasive: '非侵入性',
    sensitivity: '92–95%',
    pros: '採集少許糞便即可，可與大腸癌公費糞便潛血一起做；同樣能檢測現症感染與除菌後確認',
    prep: '同樣需停用 PPI 至少 2 週、抗生素與鉍劑至少 4 週；水瀉便可能稀釋抗原影響準確度',
  },
  {
    method: '血清幽門桿菌抗體 (IgG)',
    invasive: '抽血',
    sensitivity: '80–85%',
    pros: '不受近期服用胃藥或抗生素影響，但抗體在除菌成功後仍會殘留數個月至數年',
    prep: '無法區分「現在正在感染」還是「以前感染過已經治好」，絕對不能用來評估除菌有沒有成功！',
  },
  {
    method: '胃鏡快速尿素酶試驗 (CLO test) ＋ 病理切片',
    invasive: '侵入性（胃鏡）',
    sensitivity: '90–95%',
    pros: '有警示症狀或 ≥ 45–50 歲時首選，可同時檢查有無潰瘍、萎縮性胃炎、腸上皮化生或早期胃癌',
    prep: '空腹 8 小時；若有吃 PPI 建議取胃竇與胃體多處檢體減少偽陰性，抗凝血藥需依醫囑調整',
  },
];

export const HP_REGIMENS_TABLE = [
  {
    regimen: '標準三合一療法 (Clarithromycin Triple)',
    drugs: 'PPI ＋ Amoxicillin ＋ Clarithromycin',
    days: '14 天',
    rate: '台灣約 80–85%（視抗藥性）',
    note: '台灣 Clarithromycin 抗藥性約 15–20%；若地區抗藥性 > 15% 或曾用過巨環類抗生素，國際指引建議改用四合一',
  },
  {
    regimen: '含鉍劑四合一療法 (Bismuth Quadruple)',
    drugs: 'PPI ＋ 鉍劑 (Bismuth) ＋ Tetracycline ＋ Metronidazole',
    days: '10–14 天',
    rate: '> 90%',
    note: '國際 Maastricht VI 與 ACG 首選第一線／救援處方；青黴素（Penicillin）過敏者的首選！服藥期間大便與舌苔會變黑屬正常現象，且嚴禁飲酒',
  },
  {
    regimen: '非鉍劑四合一：伴同療法 (Concomitant) 或混合療法 (Hybrid)',
    drugs: 'PPI ＋ Amoxicillin ＋ Clarithromycin ＋ Metronidazole',
    days: '10–14 天',
    rate: '90–94%',
    note: '台灣消化系醫學會實證推薦第一線處方，克服單一抗藥性；服藥顆數較多，務必按時吃完不可自行停藥',
  },
  {
    regimen: '高劑量二合一療法 (High-dose Dual / P-CAB Dual)',
    drugs: '高頻率 PPI 或 Vonoprazan (P-CAB) ＋ 高劑量 Amoxicillin（每日 3g 分 3–4 次）',
    days: '14 天',
    rate: '88–92%',
    note: '利用強力抑酸維持胃內 pH > 6 讓細菌進入分裂期被 Amoxicillin 殺滅；副作用最少、交互作用極低，適合年長多重用藥或二線救援',
  },
];

export const FODMAP_GUIDE_ROWS = [
  {
    group: 'O — 寡醣（果聚醣、半乳寡醣）',
    high_avoid: '小麥製品（白吐司、麵條、水餃皮）、洋蔥、大蒜、青蔥白色部位、黃豆、腰果、開心果',
    low_eat: '白米飯、糙米、米粉、河粉、燕麥、青蔥綠色葉段、蒜油（過濾掉蒜頭）、硬板豆腐、毛豆、核桃、花生',
  },
  {
    group: 'D — 雙醣（乳糖）',
    high_avoid: '一般鮮奶、奶粉、煉乳、冰淇淋、軟質奶油起司、含乳清蛋白粉',
    low_eat: '無乳糖鮮奶、植物奶（杏仁奶、燕麥奶）、硬質陳年起司（切達、帕瑪森）、分離乳清蛋白',
  },
  {
    group: 'M — 單醣（過量游離果糖）',
    high_avoid: '蘋果、水梨、芒果、西瓜、蜂蜜、高果糖玉米糖漿（手搖飲、汽水）',
    low_eat: '奇異果、木瓜、藍莓、草莓、柑橘、柳丁、偏綠未熟透的香蕉、火龍果、楓糖漿',
  },
  {
    group: 'P — 多元醇（山梨醇、甘露醇、木糖醇）',
    high_avoid: '無糖口香糖／薄荷糖、水蜜桃、李子、櫻桃、酪梨（大量）、白花椰菜、蘑菇、杏鮑菇',
    low_eat: '青江菜、菠菜、地瓜葉、空心菜、高麗菜（半碗內）、紅蘿蔔、小黃瓜、茄子、袖珍菇（少量）',
  },
];

export const IBD_VS_IBS_COMPARE = [
  { item: '疾病本質', ibs: '功能性腦腸互動障礙（腸黏膜外觀正常，無結構性潰瘍）', uc: '慢性免疫發炎，從「直腸」開始往上連續侵犯大腸「黏膜表層」', cd: '慢性免疫發炎，從口腔到肛門皆可發生，「跳躍式」侵犯腸壁「全層」' },
  { item: '典型症狀', ibs: '腹痛在排便後緩解、腹脹，便秘或腹瀉交替，夜間熟睡後極少拉肚子', uc: '持續腹瀉、明顯「黏液血便」、里急後重（一直想大卻大不出），常半夜拉醒', cd: '右下腹痛、慢性腹瀉（未必有血）、發燒、體重減輕、口腔潰瘍、肛門廔管膿瘍' },
  { item: '糞便鈣衛蛋白 (Calprotectin)', ibs: '正常（< 50 μg/g）', uc: '顯著升高（常 > 150–250 μg/g，反映嗜中性球腸道浸潤）', cd: '顯著升高（常 > 150–250 μg/g）' },
  { item: '嚴重併發症', ibs: '影響生活品質，但不會腸穿孔、不會大出血、不會增加大腸癌風險', uc: '毒性巨結腸症、大出血、罹病 8–10 年後大腸癌風險上升', cd: '腸道纖維化狹窄阻塞、腸穿孔、腹腔膿瘍、腸皮／肛門複雜廔管、營養不良' },
];

export const POLYP_FOLLOWUP_TABLE = [
  { finding: '無息肉，或僅直腸／乙狀結腸 ≤ 10 mm 增生性息肉', risk: '正常／極低風險', next_scope: '10 年（或持續每 2 年糞便潛血）', note: '前提是清腸乾淨（BBPS ≥ 6）且完整做到盲腸底' },
  { finding: '1–2 顆小於 10 mm 的管狀腺瘤（Tubular adenoma）', risk: '低風險腺瘤', next_scope: '7–10 年（台灣臨床常設 5 年）', note: '切除後大腸癌風險已降至接近一般人' },
  { finding: '3–4 顆小於 10 mm 的管狀腺瘤，或 1–2 顆 < 10 mm 無柄鋸齒狀息肉 (SSL)', risk: '中度風險', next_scope: '3–5 年', note: '鋸齒狀息肉扁平透明，需有經驗醫師以 NBI 完整切除' },
  { finding: '≥ 5 顆腺瘤，或任一顆 ≥ 10 mm，或含絨毛狀成分 (Villous)，或高度異生 (HGD)', risk: '高風險進階腺瘤 (Advanced Adenoma)', next_scope: '3 年', note: '未來再長出高風險腺瘤機率較高，不可拖延' },
  { finding: '大於 20 mm 息肉經「分片切除 (Piecemeal EMR)」', risk: '局部殘留風險', next_scope: '6 個月內複查確認疤痕處無殘留', note: '確認無局部復發後，再依組織型態排 1–3 年追蹤' },
];

export const MASLD_WEIGHT_LOSS_TARGETS = [
  { target: '體重減輕 ≥ 3–5%', liver_benefit: '顯著改善「肝臟脂肪變性（Steatosis）」，超音波亮度減輕', how: '戒除含糖手搖飲與果糖、晚餐減半碗精製澱粉、飯後快走 15 分鐘' },
  { target: '體重減輕 ≥ 7%', liver_benefit: '高達 60–75% 患者達到「脂性肝炎（MASH）發炎消退」，ALT 恢復正常', how: '每日熱量赤字 500 大卡（地中海飲食法）＋ 每週 150 分鐘中強度有氧' },
  { target: '體重減輕 ≥ 10%', liver_benefit: '高達 45% 以上患者可「逆轉肝纖維化至少 1 期（Fibrosis regression）」', how: '飲食＋有氧＋每週 2–3 次阻力重訓；BMI 超標合併共病者可評估 GLP-1/GIP 藥物' },
];

export const HBV_VS_HCV_TABLE = [
  { feature: '病毒基因型態', hbv: 'DNA 病毒（會在肝細胞核內形成極頑固的共價閉合環狀 cccDNA 模板）', hcv: 'RNA 病毒（僅在細胞質內複製，不會嵌入人體細胞核 DNA）' },
  { feature: '疫苗預防', hbv: '有安全有效的疫苗（3 劑保護力 > 90%），台灣 1986 年起全面新生兒接種', hcv: '病毒突變極快，目前全球尚無 C 肝疫苗，只能靠避免血液接觸與治癒患者阻斷傳染' },
  { feature: '口服抗病毒藥目標', hbv: '長期抑制（Entecavir、TAF、TDF）：將血中病毒壓到測不到、逆轉纖維化，不可擅自停藥', hcv: '徹底根治（DAA 全口服新藥）：療程僅 8–12 週，98–99% 徹底清除病毒（SVR12）' },
  { feature: '健保篩檢與給付', hbv: '45–79 歲（原住民 40 歲）終身一次免費篩檢；符合病毒量與發炎／纖維化條件健保給付', hcv: '只要驗出 Anti-HCV 陽性且 HCV RNA 測得到病毒，健保不限肝纖維化程度 100% 全額給付新藥' },
];

export const CIRRHOSIS_COMPLICATIONS = [
  {
    comp: '食道與胃靜脈曲張出血 (Variceal Bleeding)',
    mechanism: '門靜脈血流進不了硬化的肝臟，改走食道下段與胃底的表淺靜脈，血管像吹氣球般鼓脹破裂',
    warning: '突發大量吐鮮血、解柏油般發亮黑便、頭暈冷汗休克（死亡率高達 15–20%）',
    prevention: '確診肝硬化時做胃鏡篩檢；中重度曲張者服用非選擇性乙型阻斷劑（Carvedilol / Propranolol）或預防性內視鏡結紮（EVL），吃飯細嚼慢嚥避開魚刺硬骨',
  },
  {
    comp: '腹水與自發性細菌性腹膜炎 (Ascites & SBP)',
    mechanism: '門脈高壓加上肝臟白蛋白合成不足，液體漏入腹腔；腸道細菌移位進入腹水引發感染',
    warning: '肚子越來越大、下肢水腫、體重一週暴增 > 2 kg；若腹水患者出現發燒、腹痛或意識變差，高度懷疑 SBP',
    prevention: '嚴格限鈉（每日食鹽 < 5g，約鈉 < 2,000 mg）、每日空腹量體重、依醫囑併用 Spironolactone 與 Furosemide 利尿劑',
  },
  {
    comp: '肝性腦病變／肝昏迷 (Hepatic Encephalopathy)',
    mechanism: '腸道細菌分解產生的氨（Ammonia）等毒素無法被肝臟代謝成尿素，直接穿過血腦障壁毒害大腦星狀細胞',
    warning: '第一期：日夜顛倒、睡眠反常、個性改變、算數變差；第二期：手抖（撲翼樣震顫 Asterixis）、嗜睡講話含糊；第三四期：昏迷不醒',
    prevention: '規律服用 Lactulose（杜化液）調整劑量至「每天解 2–3 次軟糊便」酸化腸道排氨，或併用腸道不吸收抗生素 Rifaximin；預防便秘、感染與脫水',
  },
  {
    comp: '肝細胞癌 (HCC) 與肌少症 (Sarcopenia)',
    mechanism: '硬化結節在慢性再生過程中累積基因突變；同時高代謝狀態與錯誤限蛋白飲食導致肌肉快速流失',
    warning: '早期肝癌完全不痛；四肢越來越細、肚子卻越來越大（肌少型腹水）',
    prevention: '每 3–6 個月雷打不動做腹部超音波＋AFP；每日攝取 1.2–1.5 g/kg 蛋白質（植物蛋白與乳製品耐受極佳）＋睡前點心',
  },
];

export const BILIARY_SPECTRUM_TABLE = [
  { condition: '無症狀膽結石', pain: '無疼痛（健檢超音波意外發現）', fever_jaundice: '無發燒、無黃疸', labs: '肝膽指數皆正常', action: '不需手術、不需吃溶石藥；維持正常三餐（勿過度空腹讓膽汁滯留），僅瓷化膽囊、結石 > 3cm 或合併 ≥ 1cm 息肉需預防性切除' },
  { condition: '單純膽絞痛 (Biliary Colic)', pain: '大餐或油膩宵夜後右上腹／上腹悶脹劇痛，常輻射到右肩胛骨，持續 30 分鐘至 4 小時後因石頭退回而緩解', fever_jaundice: '無發燒、無黃疸', labs: '多數正常或微幅波動', action: '低脂飲食；因 1–2 年內反覆發作或變成急性膽囊炎機率高，建議門診安排擇期「腹腔鏡膽囊切除術」' },
  { condition: '急性膽囊炎 (Acute Cholecystitis)', pain: '右上腹持續劇痛超過 6 小時不緩解，按壓右上腹吸氣時痛到停住（Murphy sign 陽性）', fever_jaundice: '發燒、畏寒，通常無明顯黃疸', labs: '白血球 (WBC) 與 CRP 升高；超音波見膽囊腫脹、壁厚 > 4mm、膽囊周圍積液', action: '急診住院禁食、點滴抗生素，黃金 72 小時內行早期腹腔鏡膽囊切除（或高危患者先做經皮穿肝膽囊引流 PTGBD）' },
  { condition: '總膽管結石合併急性膽管炎 (Acute Cholangitis)', pain: '右上腹劇痛（石頭掉進總膽管卡住膽汁排出）', fever_jaundice: '高燒寒顫 ＋ 明顯黃疸、茶色尿（Charcot 三聯徵）；若再加休克與意識混亂稱 Reynolds 五聯徵', labs: '直接膽紅素、ALP、γ-GT、AST/ALT 與白血球全面飆高，易併發革蘭氏陰性菌敗血症', action: '🚨 致命急症！立即急診靜脈抗生素＋緊急內視鏡逆行性膽胰管攝影（ERCP）取石或置放支架引流' },
];

export const COLONOSCOPY_PREP_TIMELINE = [
  {
    day: '檢查前 3 天～前 2 天',
    title: '啟動「低渣飲食（Low-Residue Diet）」',
    eat: '白稀飯、白吐司、白麵條、去皮魚肉、蒸蛋、嫩豆腐、澄清無渣雞湯／運動飲料',
    avoid: '✕ 任何蔬菜水果（尤其奇異果、火龍果、百香果、番茄籽會卡大腸鏡吸水孔！）、✕ 全穀雜糧燕麥堅果、✕ 牛奶與乳製品、✕ 紅紫深色飲料',
  },
  {
    day: '檢查前 1 天（午、晚餐）',
    title: '改為「無渣流質飲食」＋ 第 1 劑清腸瀉藥',
    eat: '中午可吃白稀飯配蒸蛋；下午 5 點後僅能喝清湯、無渣運動飲料、蜂蜜水或白開水',
    avoid: '依醫囑於傍晚或睡前服用「第 1 劑清腸藥」，分次補充足夠水分（約 1,500–2,000 mL），走動按摩腹部幫助排空',
  },
  {
    day: '檢查當天（檢查前 4–6 小時）',
    title: '黃金關鍵：「第 2 劑分次清腸藥（Split-dose）」',
    eat: '於檢查前 4–6 小時起來喝完第 2 劑清腸藥與規定水量；因為小腸在半夜仍會持續分泌膽汁與黏液糊在右側大腸，早上這劑才能把它徹底沖刷乾淨！',
    avoid: '若做「無痛（舒眠）內視鏡」，檢查前 2–4 小時（依各院麻醉科規定）必須完全禁水；高血壓藥可於清晨配一小口水服下，降血糖藥／胰島素當天早上暫停以免低血糖',
  },
];

export const BRISTOL_STOOL_DATA = [
  { type: '第 1 型', shape: '一顆顆硬球（如羊便、堅果）', transit: '腸道停留過久（> 100 小時）', meaning: '嚴重便秘：水分被大腸吸乾，缺乏纖維與水分，或慢傳輸型便秘', tone: 'warn' as const },
  { type: '第 2 型', shape: '表面凹凸不平的硬香腸狀', transit: '腸道蠕動偏慢', meaning: '輕度便秘：排便需用力，易造成肛門裂傷或痔瘡出血', tone: 'warn' as const },
  { type: '第 3 型', shape: '表面有裂痕的香腸狀', transit: '正常（約 24–48 小時）', meaning: '理想正常便型：水分稍少但排便順暢', tone: 'good' as const },
  { type: '第 4 型', shape: '表面光滑柔軟的香蕉／香腸狀', transit: '黃金標準（約 24–36 小時）', meaning: '最完美健康便型：膳食纖維、水分與腸道菌相平衡，一氣呵成不沾馬桶', tone: 'good' as const },
  { type: '第 5 型', shape: '邊緣清楚的柔軟小塊（一夾就斷）', transit: '蠕動稍快', meaning: '偏向軟便：可能飲食纖維略少，或飯後胃結腸反射較強', tone: 'neutral' as const },
  { type: '第 6 型', shape: '邊緣糊狀、蓬鬆不成形的泥狀便', transit: '蠕動過快', meaning: '輕度腹瀉：大腸來不及吸收水分，常見於腸躁症、乳糖不耐或緊張壓力', tone: 'warn' as const },
  { type: '第 7 型', shape: '完全液態水便，無固體塊', transit: '極快（< 10 小時）', meaning: '重度腹瀉：急性病毒／細菌性腸胃炎、發炎性腸病發作（也是大腸鏡清腸達標的狀態）', tone: 'bad' as const },
];

export const STOOL_COLOR_ALERTS = [
  { color: '金黃／黃褐色', badge: '健康正常', cause: '膽汁中的膽紅素經腸道細菌還原為糞膽素（Stercobilin）的自然顏色', action: '繼續維持均衡飲食與飲水', tone: 'good' as const },
  { color: '瀝青黑便（又黑又亮、腥臭）', badge: '🚨 上消化道出血', cause: '胃或十二指腸潰瘍出血、食道靜脈曲張或胃腫瘤，血液被胃酸氧化成黑褐色正鐵血紅素', action: '先排除是否剛吃過鐵劑、鉍劑胃藥、竹炭、豬血鴨血；若無或伴隨頭暈心悸，立即急診！', tone: 'bad' as const },
  { color: '鮮紅血便／滴血／衛生紙染血', badge: '⚠️ 下消化道或肛門出血', cause: '內外痔瘡、肛裂最常見，但直腸癌與乙狀結腸息肉／腫瘤或潰瘍性結腸炎也會解鮮血便', action: '切勿自行當成「只是痔瘡」！年滿 40 歲或持續反覆出血，務必安排大腸鏡檢查', tone: 'warn' as const },
  { color: '暗紅色果醬便／黏液血便', badge: '🚨 大腸出血或腸炎', cause: '右側或橫結腸腫瘤、憩室出血、缺血性腸炎、發炎性腸道疾病（IBD）', action: '盡速至胃腸肝膽科門診或急診安排大腸鏡與抽血檢查血紅素', tone: 'bad' as const },
  { color: '灰白色／陶土色便', badge: '🚨 膽道完全阻塞', cause: '總膽管結石、膽管癌或胰頭癌壓迫膽管，膽汁完全無法排入十二指腸，常伴隨深茶色尿與眼白變黃', action: '屬於肝膽科急症，請立即就醫安排超音波、抽血膽紅素與 CT/MRCP', tone: 'bad' as const },
  { color: '浮油便（馬桶浮一層油滴、惡臭難沖）', badge: '⚠️ 脂肪吸收不良', cause: '慢性胰臟炎、胰臟腫瘤阻塞胰管導致解脂酶（Lipase）不足，或膽汁嚴重缺乏（脂肪瀉 Steatorrhea）', action: '至胃腸肝膽科檢查胰臟外分泌功能與胰膽影像', tone: 'warn' as const },
];

// ── Myths & Quizzes ──────────────────────────────────────────────────────────

export const GASTRO_MYTHS: { chapter: GastroTab; myth: string; fact: string }[] = [
  {
    chapter: 'OVERVIEW',
    myth: '胃不舒服就去藥局買胃散、胃乳吃，有病治病、沒病顧胃？',
    fact: '長期自行吃制酸劑會掩蓋潰瘍與早期胃癌警訊；且含鋁制酸劑易便秘、含鎂易腹瀉（腎病患者更可能鎂鋁中毒），碳酸氫鈉（小蘇打）則會引起反彈性胃酸分泌與鈉攝取過量。',
  },
  {
    chapter: 'GERD_ULCER',
    myth: '胃食道逆流就是「胃酸太多」，所以絕對不能吃檸檬、奇異果等酸的水果？',
    fact: '多數胃食道逆流患者胃酸分泌量是正常的，問題出在「下食道括約肌（LES）太鬆弛」讓胃酸跑錯地方。真正讓括約肌變鬆的是高油脂食物、甜食、巧克力、薄荷、咖啡因、酒精與吃太飽平躺。',
  },
  {
    chapter: 'GERD_ULCER',
    myth: '胃痛的時候喝熱牛奶可以中和胃酸、保護胃壁？',
    fact: '牛奶剛喝下去確實能短暫稀釋胃酸，但牛奶中的蛋白質與鈣離子在 20–30 分鐘後反而會強烈刺激胃泌素（Gastrin）分泌更多胃酸，讓半夜潰瘍痛得更厲害！',
  },
  {
    chapter: 'HP_GASTRIC',
    myth: '驗出幽門螺旋桿菌，但完全沒有胃痛，就不需要吃抗生素除菌？',
    fact: '約 80% 感染者沒有症狀，但幽門桿菌仍會在胃壁持續引發慢性發炎，逐步走向萎縮性胃炎與胃癌。國際《京都共識》與《Maastricht VI 指引》明確確立：只要驗出活動性感染，無論有無症狀都應除菌！',
  },
  {
    chapter: 'IBS_FODMAP',
    myth: '腸躁症患者應該一輩子嚴格執行「低 FODMAP 飲食」，所有高 FODMAP 蔬果永遠不能碰？',
    fact: '錯誤！高 FODMAP 食物同時也是腸道好菌最重要的「益生元（Prebiotics）」。嚴格限制期只能做 2–6 週，之後必須逐項加回來測試耐受量，否則長期嚴格限制會導致雙歧桿菌減少、菌相枯竭。',
  },
  {
    chapter: 'IBD_CARE',
    myth: '潰瘍性結腸炎或克隆氏症只要不拉肚子、沒有血便，就可以把藥停掉？',
    fact: 'IBD 是慢性自體免疫發炎，症狀消失往往只是「表面緩解」，腸壁深層可能仍在發炎。擅自停藥 1 年內復發率超過 50–70%，必須由醫師透過糞便鈣衛蛋白與內視鏡確認「黏膜癒合」來調藥。',
  },
  {
    chapter: 'CRC_POLYPS',
    myth: '糞便潛血檢查陽性，一定是前兩天刷牙流血或痔瘡破皮，再重驗一次變成陰性就不用做大腸鏡了？',
    fact: '這是臨床上最常耽誤早期大腸癌的致命迷思！現代公費篩檢使用的是「定量免疫法（iFOBT）」，只對人血紅素反應且不受食物或上消化道少量出血影響；因為腫瘤或大息肉出血是「間歇性」的，第二次驗陰性完全不能排除大腸癌，只要一次陽性就必須做大腸鏡。',
  },
  {
    chapter: 'MASLD_FATTY',
    myth: '我體重很標準、四肢瘦瘦的，不可能得脂肪肝？',
    fact: '亞洲人約有 15–20% 的脂肪肝屬於「非肥胖型／瘦子脂肪肝（Lean MASLD）」，與 PNPLA3 基因多型性、肌少症、內臟脂肪偏高及手搖飲果糖攝取密切相關，其惡化成肝纖維化的風險不亞於肥胖者。',
  },
  {
    chapter: 'HEPATITIS_BC',
    myth: 'C 型肝炎用口服新藥治好之後，抽血還是「C 肝抗體陽性」，代表沒治好或又復發了？',
    fact: 'C 肝抗體（Anti-HCV）只是免疫系統留下的「歷史疤痕記號」，沒有保護力也不會因為治癒而消失。判斷 C 肝有沒有治好，看的是停藥 12 週後抽血「C 肝病毒量（HCV RNA）測不到」！',
  },
  {
    chapter: 'CIRRHOSIS_PORTAL',
    myth: '肝硬化的人為了預防肝昏迷（血氨升高），應該少吃肉、魚、豆、蛋等蛋白質？',
    fact: '這是已被現代實證推翻的舊觀念！骨骼肌是肝臟以外清除血氨最重要的器官，限制蛋白質會加速肝硬化患者肌肉萎縮（肌少症），反而讓高血氨與肝昏迷更嚴重。指引建議每日攝取 1.2–1.5 g/kg 蛋白質（多選植物性蛋白與乳酪），並加上睡前點心。',
  },
  {
    chapter: 'GALLBLADDER_BILE',
    myth: '健檢超音波發現膽結石，就算沒痛過也應該趕快吃藥把石頭「化石」排出來，或趕快切掉膽囊？',
    fact: '腎結石可以多喝水排出，但膽結石若掉進細小的總膽管反而會卡死引發致命的「急性膽管炎與胰臟炎」！無症狀膽結石 80% 終生相安無事，除少數高癌變風險特徵外，只需定期追蹤即可。',
  },
  {
    chapter: 'PANCREAS_CARE',
    myth: '三酸甘油酯（TG）高一點只會血管硬化，不會馬上要命？',
    fact: '當三酸甘油酯飆破 500–1,000 mg/dL 時，高濃度的乳糜微粒會塞住胰臟微血管，被胰解脂酶分解出大量游離脂肪酸直接燒灼胰臟細胞，隨時可能引爆重症急性壞死性胰臟炎！',
  },
  {
    chapter: 'ENDOSCOPY_TRIAGE',
    myth: '做大腸鏡前兩天「只吃燙青菜和水果」最清淡、最能把腸子清乾淨？',
    fact: '完全相反！蔬菜葉梗與水果籽（如奇異果、百香果、火龍果）是不溶於水的粗纖維，會像糊牆壁一樣黏在大腸壁上並堵住大腸鏡抽吸孔。大腸鏡前 2–3 天反而要吃「白飯、白吐司、蒸蛋、去皮魚肉」等低渣飲食！',
  },
];

export const GASTRO_QUIZ: Partial<Record<GastroTab, CourseQuiz>> = {
  OVERVIEW: {
    question: '關於人體消化道與「腦腸軸（Gut-Brain Axis）」的生理特性，下列何者正確？',
    options: [
      '人體約 90% 的血清素（Serotonin）是由大腦皮質合成，再傳送到腸道',
      '人體約 70% 的免疫細胞與 90% 的血清素位於腸道，腸道菌發酵膳食纖維產生的短鏈脂肪酸（SCFA）可滋養腸壁並調節發炎',
      '膽汁是由膽囊製造的，所以切除膽囊後身體就完全沒有膽汁可以消化脂肪',
      '小腸主要負責吸收水分成形糞便，大腸才負責吸收 90% 的蛋白質與維生素',
    ],
    answer: 1,
    explain: '腸道擁有獨立的腸道神經系統（ENS）與 70% 免疫細胞，合成全身約 90% 的血清素；膽汁由肝臟製造、膽囊僅負責儲存濃縮；90% 營養素在小腸吸收，大腸主要吸收水分並由腸道菌發酵纖維產生丁酸等短鏈脂肪酸。',
  },
  GERD_ULCER: {
    question: '服用傳統氫離子幫浦抑制劑（PPI，如耐適恩 Esomeprazole、百抑潰 Pantoprazole）治療胃食道逆流或潰瘍時，最佳服藥時間為何？',
    options: [
      '三餐飯後立刻吃，以免傷胃',
      '睡前配牛奶一起吃，中和半夜胃酸',
      '早餐（或一天第一餐）飯前 30–60 分鐘空腹服用，讓藥物在進食活化胃壁質子幫浦時正好發揮最大封鎖效果',
      '只有覺得火燒心痛起來的時候才吃一顆',
    ],
    answer: 2,
    explain: '傳統 PPI 需要先被小腸吸收進入血液，當進食刺激胃壁細胞上的氫離子幫浦（質子幫浦）大量活化時才能與之結合封鎖；因此「早餐前 30 分鐘空腹吃」效果比飯後或睡前好得多。',
  },
  HP_GASTRIC: {
    question: '做完幽門螺旋桿菌除菌治療後，想確認細菌有沒有徹底清光，下列哪一項做法最正確？',
    options: [
      '吃完抗生素隔天立刻去抽血驗「幽門桿菌抗體（IgG）」',
      '吃完藥隔天立刻吹氣做「碳 13 尿素呼氣試驗」',
      '停用抗生素至少 4 週、停用 PPI 制酸劑至少 2 週後，接受「碳 13 尿素呼氣試驗（UBT）」或「糞便抗原檢測」',
      '只要胃不痛了就代表 100% 除菌成功，不必再檢查',
    ],
    answer: 2,
    explain: '抽血抗體在除菌後仍會陽性數月到數年，不能用來確認除菌結果；而剛吃完抗生素或 PPI 時菌量暫時被壓低，立刻吹氣會產生「偽陰性」，必須停用抗生素滿 4 週且停用 PPI 滿 2 週再做碳 13 吹氣或糞便抗原。',
  },
  IBS_FODMAP: {
    question: '大腸激躁症（IBS）患者在執行「低 FODMAP 飲食」時，下列哪個食材替換與原則是正確的？',
    options: [
      '第一階段嚴格排除期越久越好，最好一輩子都不要再吃任何高 FODMAP 食物',
      '把容易產氣的小麥麵條、蘋果、鮮奶，替換成白米飯／米粉、奇異果／木瓜、無乳糖鮮奶，且嚴格排除期僅做 2–6 週即進入重新引入測試',
      '蜂蜜與高果糖糖漿屬於低 FODMAP，可以無限量飲用',
      '如果 55 歲才第一次出現嚴重腹瀉合併血便與體重減輕，也應該先自己吃低 FODMAP 飲食觀察半年',
    ],
    answer: 1,
    explain: '小麥、蘋果、鮮奶與蜂蜜皆為高 FODMAP；白米、奇異果、木瓜與無乳糖奶為低 FODMAP。嚴格期僅限 2–6 週以免傷及腸道好菌；50 歲以上新發症狀或有血便、體重減輕屬紅旗警訊，必須先做大腸鏡。',
  },
  IBD_CARE: {
    question: '28 歲的林先生近兩個月每天腹瀉 5–6 次、大便帶有黏液與暗紅血絲、常在半夜痛醒跑廁所，體重掉了 4 公斤。檢驗發現「糞便鈣衛蛋白（Fecal Calprotectin）」高達 680 μg/g。最可能的判讀與處置為何？',
    options: [
      '只是單純的工作壓力型腸躁症（IBS），多休息吃益生菌即可',
      '高度懷疑發炎性腸道疾病（IBD，如潰瘍性結腸炎或克隆氏症），應盡速至胃腸科安排大腸鏡與切片檢查',
      '鈣衛蛋白高代表缺鈣，多喝牛奶補鈣就會好',
      '吃止瀉藥把大便完全止住就沒事了',
    ],
    answer: 1,
    explain: '慢性腹瀉 > 4 週、黏液血便、夜間症狀、體重減輕，加上糞便鈣衛蛋白顯著升高（代表腸道有明顯嗜中性白血球發炎浸潤，非單純腸躁症），是發炎性腸道疾病（IBD）的典型表現，且急性期亂吃強效止瀉藥可能誘發毒性巨結腸症。',
  },
  CRC_POLYPS: {
    question: '52 歲的陳女士參加國健署公費「定量免疫法糞便潛血檢查（iFOBT）」結果為陽性。她覺得自己最近沒有大便流血，也沒有肚子痛，下一步該怎麼做？',
    options: [
      '可能是前天吃了豬血湯或刷牙流血，去診所再重驗一次糞便潛血，如果變陰性就不用管它',
      '沒有症狀就不用理會，等兩年後再篩檢',
      '盡速在 3 個月內至胃腸肝膽科或大腸直腸外科安排「全大腸鏡檢查」，找出是否有腺瘤息肉或早期大腸癌',
      '直接安排腹部 X 光檢查即可取代大腸鏡',
    ],
    answer: 2,
    explain: '免疫法糞便潛血（iFOBT）專一性針對人類下消化道血紅素，不受豬血、鐵劑或食物干擾；且息肉與腫瘤出血是間歇性的，重驗陰性絕不能排除病灶。陽性者超過 6 個月才做大腸鏡，大腸癌進階風險顯著上升！',
  },
  MASLD_FATTY: {
    question: '關於代謝性脂肪性肝病（MASLD）的逆轉與追蹤，臨床實證指出體重減輕多少比例，有機會連「肝纖維化（Fibrosis）」都獲得逆轉？',
    options: [
      '脂肪肝一旦形成就完全不可逆，減重沒有任何幫助',
      '體重減輕 3–5% 可改善肝脂肪、減輕 ≥ 7% 可消除脂性肝炎發炎、減輕 ≥ 10% 有機會逆轉肝纖維化',
      '越快瘦越好，一週斷食狂瘦 5 公斤對肝臟最好',
      '只要吃保肝丸就可以不用管血糖與體重',
    ],
    answer: 1,
    explain: 'EASL 與 AASLD 指引實證確立了清晰的減重劑量反應階梯：3–5% 降肝脂、7% 消退 MASH 發炎、≥ 10% 逆轉纖維化；但應以每週減 0.5–1 公斤溫和進行，極端斷食快速暴瘦反而會加速游離脂肪酸湧入肝臟並誘發膽結石。',
  },
  HEPATITIS_BC: {
    question: '關於台灣 B 型肝炎與 C 型肝炎的治療現況，下列敘述何者正確？',
    options: [
      'C 型肝炎目前已有健保全額給付的泛基因型全口服抗病毒藥（DAA），療程 8–12 週，治癒率高達 98% 以上',
      'C 型肝炎治好之後，就算原本已經有肝硬化，也永遠不會再得肝癌，不必再照超音波',
      'B 型肝炎帶原者吃口服抗病毒藥只要抽血 ALT 正常，就可以自己停藥',
      '已經打過 B 肝疫苗的人，同時也對 C 型肝炎有終生免疫力',
    ],
    answer: 0,
    explain: '全口服 DAA 可在 8–12 週根治 98–99% 的 C 肝；但若治療前已有重度纖維化（F3）或肝硬化（F4），治癒後仍須每 6 個月做超音波篩檢肝癌；B 肝口服藥擅自停藥易引發致命肝炎反彈；B 肝疫苗無法預防 C 肝。',
  },
  CIRRHOSIS_PORTAL: {
    question: '肝硬化患者在日常飲食與用藥照護上，下列哪一項做法是實證醫學最推薦的？',
    options: [
      '為了怕血氨高引起肝昏迷，應該完全禁止吃肉、魚、豆腐與蛋',
      '痛風或關節痛時，自己去藥房買消炎止痛藥（NSAIDs，如 Ibuprofen）吃最方便',
      '攝取足夠優質蛋白質（1.2–1.5 g/kg/日，可多用植物蛋白與乳製品），並在「睡前補充一份碳水＋蛋白質點心」預防夜間肌肉分解，同時保持每天解 2–3 次軟便',
      '夏天可以放心生吃生蠔與生魚片補充營養',
    ],
    answer: 2,
    explain: '肝硬化患者禁食一晚相當於常人飢餓 3 天，睡前點心（Late Evening Snack）與充足蛋白質能保住肌肉幫助代謝血氨；NSAID 止痛藥會引發肝硬化患者急性腎衰竭（肝腎症候群）與胃潰瘍大出血；生食海鮮則有致命海洋創傷弧菌風險。',
  },
  GALLBLADDER_BILE: {
    question: '65 歲的王伯伯有膽結石病史，今晚突然出現「右上腹劇痛、高燒畏寒 39°C、眼白變黃且尿液呈深茶色」。這在醫學上稱為什麼？應如何處置？',
    options: [
      '單純胃痙攣，吃顆胃藥熱敷睡一覺就好',
      'Charcot 三聯徵（急性膽管炎警訊），代表結石卡住總膽管引發膽道感染，隨時會敗血性休克，需立即急診給予抗生素並安排 ERCP 內視鏡引流取石',
      '慢性肝炎發作，下個月門診再抽血即可',
      '先喝大量橄欖油加檸檬汁自己「排膽石」',
    ],
    answer: 1,
    explain: '右上腹痛＋發燒寒顫＋黃疸為經典的「Charcot 三聯徵」，代表總膽管阻塞合併急性化膿性膽管炎，是死亡率極高的肝膽科急症，必須分秒必爭送急診引流膽汁。',
  },
  PANCREAS_CARE: {
    question: '除了膽結石與飲酒之外，台灣門診最常見的第三大「急性胰臟炎」誘發原因為何？其警戒門檻是多少？',
    options: [
      '低密度膽固醇（LDL-C）超過 130 mg/dL',
      '高三酸甘油酯血症（空腹 TG > 500 mg/dL，尤其 > 1,000 mg/dL 時風險極高）',
      '尿酸超過 7.0 mg/dL',
      '多喝無糖黑咖啡',
    ],
    answer: 1,
    explain: '空腹三酸甘油酯（TG）> 500–1,000 mg/dL 是引發急性胰臟炎的第三大元兇（在妊娠或未控制糖尿病合併暴飲暴食後尤易爆發），將 TG 嚴格控制在 < 500 mg/dL（理想 < 150 mg/dL）是預防復發的鐵律。',
  },
  ENDOSCOPY_TRIAGE: {
    question: '為了讓大腸鏡檢查看得最清楚、不漏掉扁平息肉，檢查前飲食與清腸瀉藥的最佳做法為何？',
    options: [
      '檢查前兩天大量吃奇異果、火龍果、竹筍和生菜沙拉幫助排便',
      '把兩包清腸瀉藥全部在前一天下午 5 點一次喝光，檢查當天早上什麼都不要喝',
      '檢查前 2–3 天採「低渣飲食（白飯、白吐司、蒸蛋、去皮魚肉）」，並採用「分次清腸（Split-dose：前一晚喝第一劑、檢查當天前 4–6 小時喝第二劑）」，直到排出清澈淡黃色水便',
      '只要有拉肚子就好，就算排出來還是混濁泥水也不用跟醫護人員說',
    ],
    answer: 2,
    explain: '低渣飲食（避開蔬果纖維與帶籽水果）搭配「分次清腸（Split-dose）」是國際公認提升大腸鏡清腸品質（BBPS ≥ 6）與腺瘤偵測率（ADR）的第一黃金準則。',
  },
};

// ── Reference Sources ────────────────────────────────────────────────────────

export const GASTRO_SOURCES: Record<string, CourseSource> = {
  acg_gerd_2022: {
    label: 'ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease (Katz PO, et al. Am J Gastroenterol 2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34807007/',
  },
  maastricht_vi_2022: {
    label: 'Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report (Malfertheiner P, et al. Gut 2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35944925/',
  },
  acg_hp_2024: {
    label: 'ACG Clinical Guideline: Treatment of Helicobacter pylori Infection (Chey WD, et al. Am J Gastroenterol 2024)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39626064/',
  },
  taiwan_hp_screening: {
    label: '衛生福利部國民健康署：幽門螺旋桿菌篩檢與胃癌防治指引（台灣消化系醫學會共識）',
    url: 'https://www.hpa.gov.tw/',
  },
  acg_ibs_2021: {
    label: 'ACG Clinical Guideline: Management of Irritable Bowel Syndrome (Lacy BE, et al. Am J Gastroenterol 2021)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33315591/',
  },
  stride_ii_ibd: {
    label: 'STRIDE-II: An Update on the Selecting Therapeutic Targets in Inflammatory Bowel Disease Initiative of IOIBD (Turner D, et al. Gastroenterology 2021)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33359090/',
  },
  usmstf_polyp_2020: {
    label: 'Recommendations for Follow-Up After Colonoscopy and Polypectomy: A Consensus Update by the US Multi-Society Task Force (Gupta S, et al. Gastroenterology 2020)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/32044092/',
  },
  easl_masld_2024: {
    label: 'EASL–EASD–EASO Clinical Practice Guidelines on the management of metabolic dysfunction-associated steatotic liver disease (MASLD) (J Hepatol 2024)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38851997/',
  },
  aasld_masld_2023: {
    label: 'AASLD Practice Guidance on the clinical assessment and management of nonalcoholic fatty liver disease / MASLD (Rinella ME, et al. Hepatology 2023)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36727674/',
  },
  who_hepb_2024: {
    label: 'WHO Guidelines for the prevention, diagnosis, care and treatment for people with chronic hepatitis B infection (2024)',
    url: 'https://www.who.int/publications/i/item/9789240090903',
  },
  aasld_hcv_2023: {
    label: 'AASLD-IDSA HCV Guidance: Recommendations for Testing, Managing, and Treating Hepatitis C',
    url: 'https://www.hcvguidelines.org/',
  },
  baveno_vii_2022: {
    label: 'Baveno VII – Renewing consensus in portal hypertension (de Franchis R, et al. J Hepatol 2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35120736/',
  },
  espen_liver_2020: {
    label: 'ESPEN practical guideline: Clinical nutrition in liver disease (Bischoff SC, et al. Clin Nutr 2020)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33268148/',
  },
  tokyo_tg18: {
    label: 'Tokyo Guidelines 2018 (TG18): diagnostic criteria and severity grading of acute cholecystitis and acute cholangitis (J Hepatobiliary Pancreat Sci 2018)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/29098784/',
  },
  acg_pancreatitis_2024: {
    label: 'ACG Guidelines: Management of Acute Pancreatitis (Tenner S, et al. Am J Gastroenterol 2024)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38857482/',
  },
  usmstf_bowel_prep: {
    label: 'Optimizing Adequacy of Bowel Cleansing for Colonoscopy: Recommendations From the US Multi-Society Task Force (Gastroenterology 2025)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/39954614/',
  },
};

export const GASTRO_CHAPTER_SOURCES: Record<GastroTab, string[]> = {
  OVERVIEW: ['acg_gerd_2022', 'acg_ibs_2021', 'easl_masld_2024'],
  GERD_ULCER: ['acg_gerd_2022', 'maastricht_vi_2022'],
  HP_GASTRIC: ['maastricht_vi_2022', 'acg_hp_2024', 'taiwan_hp_screening'],
  IBS_FODMAP: ['acg_ibs_2021', 'stride_ii_ibd'],
  IBD_CARE: ['stride_ii_ibd', 'acg_ibs_2021'],
  CRC_POLYPS: ['usmstf_polyp_2020', 'usmstf_bowel_prep'],
  MASLD_FATTY: ['easl_masld_2024', 'aasld_masld_2023'],
  HEPATITIS_BC: ['who_hepb_2024', 'aasld_hcv_2023'],
  CIRRHOSIS_PORTAL: ['baveno_vii_2022', 'espen_liver_2020'],
  GALLBLADDER_BILE: ['tokyo_tg18', 'acg_pancreatitis_2024'],
  PANCREAS_CARE: ['acg_pancreatitis_2024', 'tokyo_tg18'],
  ENDOSCOPY_TRIAGE: ['usmstf_bowel_prep', 'usmstf_polyp_2020', 'acg_gerd_2022'],
};
