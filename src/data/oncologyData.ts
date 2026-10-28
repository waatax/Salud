import type { CourseChapter, CourseQuiz, CourseSource, CourseUnit } from '../components/common/pro/CourseShell';

/**
 * oncologyData.ts — 所有主要癌症防治與精準醫療專區 (v5.2)
 *
 * 涵蓋 5 大單元、12 個深度知識章節：
 *   單元一：癌症生物學、TNM 分期與台灣公費六癌篩檢（OVERVIEW, SCREENING_TW）
 *   單元二：台灣最高發四大實體癌（LUNG_CANCER, COLORECTAL_CANCER, BREAST_CANCER, LIVER_BILIARY_PANCREAS）
 *   單元三：上消化道頭頸癌、泌尿婦科癌與甲狀腺血液腫瘤（GASTRIC_ESOPHAGEAL_HEADNECK, GYN_URO_CANCERS, THYROID_HEME_CANCERS）
 *   單元四：現代抗癌五大精準武器與基因檢測（PRECISION_THERAPY）
 *   單元五：化放療營養副作用管理、防復發追蹤與緩和醫療（NUTRITION_SIDE_EFFECTS, SURVIVORSHIP_PALLIATIVE）
 *
 * 實證依據：NCCN Clinical Practice Guidelines 2024–2025、ESMO Guidelines、ASCO Guidelines、
 * ESPEN Cancer Nutrition Guideline、衛生福利部國民健康署癌症登記報告與公費篩檢規範。
 */

export type OncologyTab =
  | 'OVERVIEW'
  | 'SCREENING_TW'
  | 'LUNG_CANCER'
  | 'COLORECTAL_CANCER'
  | 'BREAST_CANCER'
  | 'LIVER_BILIARY_PANCREAS'
  | 'GASTRIC_ESOPHAGEAL_HEADNECK'
  | 'GYN_URO_CANCERS'
  | 'THYROID_HEME_CANCERS'
  | 'PRECISION_THERAPY'
  | 'NUTRITION_SIDE_EFFECTS'
  | 'SURVIVORSHIP_PALLIATIVE';

export const ONCOLOGY_TABS: readonly OncologyTab[] = [
  'OVERVIEW',
  'SCREENING_TW',
  'LUNG_CANCER',
  'COLORECTAL_CANCER',
  'BREAST_CANCER',
  'LIVER_BILIARY_PANCREAS',
  'GASTRIC_ESOPHAGEAL_HEADNECK',
  'GYN_URO_CANCERS',
  'THYROID_HEME_CANCERS',
  'PRECISION_THERAPY',
  'NUTRITION_SIDE_EFFECTS',
  'SURVIVORSHIP_PALLIATIVE',
];

export type OncologyPathIcon = 'screen' | 'lung_breast' | 'gi_cancer' | 'therapy' | 'care';

export interface OncologyPath {
  key: OncologyPathIcon;
  label: string;
  hint: string;
  chapters: OncologyTab[];
}

export const ONCOLOGY_PATHS: OncologyPath[] = [
  {
    key: 'screen',
    label: '我想做癌症篩檢，或健檢腫瘤標記紅字',
    hint: '台灣公費六大癌篩資格試算、腫瘤標記迷思破解與十大警訊',
    chapters: ['OVERVIEW', 'SCREENING_TW', 'LUNG_CANCER', 'COLORECTAL_CANCER'],
  },
  {
    key: 'lung_breast',
    label: '肺部毛玻璃結節 (GGO) 或乳房攝影 BI-RADS 異常',
    hint: '肺癌 EGFR 基因標靶、乳癌四大分子亞型與微創保乳治療',
    chapters: ['LUNG_CANCER', 'BREAST_CANCER', 'PRECISION_THERAPY'],
  },
  {
    key: 'gi_cancer',
    label: '消化系癌症（大腸癌、肝癌、胰臟癌、胃食道頭頸癌）',
    hint: '微創保肛手術、BCLC 肝癌電燒栓塞雙免疫與早期內視鏡切除',
    chapters: ['COLORECTAL_CANCER', 'LIVER_BILIARY_PANCREAS', 'GASTRIC_ESOPHAGEAL_HEADNECK'],
  },
  {
    key: 'therapy',
    label: '剛確診癌症，想了解次世代基因定序 (NGS)、標靶與免疫治療',
    hint: 'TNM 分期、達文西手術、質子放療、標靶、PD-1 免疫與 ADC 生物導彈',
    chapters: ['OVERVIEW', 'PRECISION_THERAPY', 'GYN_URO_CANCERS', 'THYROID_HEME_CANCERS'],
  },
  {
    key: 'care',
    label: '正在化放療或陪伴罹癌家人，想知道怎麼吃與減輕副作用',
    hint: '高蛋白防惡病質、白血球低下安全飲食、止吐止痛與康復追蹤',
    chapters: ['NUTRITION_SIDE_EFFECTS', 'SURVIVORSHIP_PALLIATIVE', 'PRECISION_THERAPY'],
  },
];

export const ONCOLOGY_UNITS: CourseUnit<OncologyTab>[] = [
  {
    title: '癌症本質、分期與公費篩檢',
    blurb: '致癌基因機轉、TNM 第 I–IV 期意義、台灣公費六癌篩檢與腫瘤標記真相',
    chapters: ['OVERVIEW', 'SCREENING_TW'],
  },
  {
    title: '台灣四大高發癌症深度解析',
    blurb: '肺癌（含不吸菸肺腺癌）、大腸直腸癌、乳癌、肝膽胰臟癌',
    chapters: ['LUNG_CANCER', 'COLORECTAL_CANCER', 'BREAST_CANCER', 'LIVER_BILIARY_PANCREAS'],
  },
  {
    title: '消化頭頸、泌尿婦科與血液甲狀腺癌',
    blurb: '胃癌／食道癌／口腔癌、攝護腺癌／婦科三癌、甲狀腺癌與淋巴白血病骨髓瘤',
    chapters: ['GASTRIC_ESOPHAGEAL_HEADNECK', 'GYN_URO_CANCERS', 'THYROID_HEME_CANCERS'],
  },
  {
    title: '精準醫療與抗癌五大武器',
    blurb: '微創達文西、質子放療、NGS 基因定序標靶、免疫檢查點抑制劑、ADC 與 CAR-T',
    chapters: ['PRECISION_THERAPY'],
  },
  {
    title: '化放療營養照護、康復防復發與安寧緩和',
    blurb: '高蛋白防惡病質、白血球低下飲食、副作用處置、破除抗癌偏方與疼痛控制',
    chapters: ['NUTRITION_SIDE_EFFECTS', 'SURVIVORSHIP_PALLIATIVE'],
  },
];

export const ONCOLOGY_COURSE_CHAPTERS: CourseChapter<OncologyTab>[] = [
  {
    id: 'OVERVIEW',
    label_zh: '癌症全景與分期',
    title_zh: '認識癌症生物學：致癌基因、TNM 分期與 40% 可預防的真相',
    goal_zh: '用油門（致癌基因）與煞車（抑癌基因）比喻看懂癌症形成，理解國際 TNM 分期系統與早期發現的高治癒率。',
    learn_zh: [
      '細胞叛變雙重打擊：油門卡死（致癌基因 Oncogenes，如 EGFR、KRAS、HER2）＋ 煞車失靈（抑癌基因如 TP53、BRCA1/2、APC）',
      '國際 TNM 分期系統：T（原發腫瘤大小與深度）、N（區域淋巴結轉移）、M（遠端器官轉移）與第 0–IV 期的臨床意義',
      'WHO 實證：高達 40–50% 的癌症可透過戒菸酒檳榔、控制肥胖、疫苗接種（HPV、B肝）與除菌（幽門桿菌）預防',
    ],
    minutes: 7,
    takeaways_zh: [
      '癌症不是絕症！第 0 期（原位癌）與第 I 期癌症的 5 年存活率多數高達 85–95% 以上，早期篩檢是改寫命運最關鍵的一步。',
      '「切片檢查（Biopsy）」不會讓癌細胞擴散！相反地，唯有取得組織做病理與基因分子檢測，才能精準選對標靶與免疫藥物。',
      '台灣菸、酒、檳榔三合一會讓食道癌與頭頸口腔癌風險暴增 123 倍；加上國人約半數有 ALDH2 酒精不耐基因（喝酒臉紅），更需戒酒防癌。',
    ],
  },
  {
    id: 'SCREENING_TW',
    label_zh: '公費篩檢與腫瘤標記',
    title_zh: '台灣公費六大癌症篩檢全攻略 ＆ 抽血「腫瘤標記」迷思大破解',
    goal_zh: '掌握最新國健署擴大公費篩檢資格，並看懂抽血腫瘤標記紅字背後的良性干擾與正確臨床用途。',
    learn_zh: [
      '國健署最新公費篩檢：肺癌 LDCT（重度吸菸或家族史）、大腸癌 iFOBT（45–74歲/家族史40歲）、乳癌攝影（40–74歲）、子宮頸抹片＋HPV（25歲起）、口腔癌、胃癌幽門桿菌',
      '抽血腫瘤標記（CEA、AFP、CA19-9、CA125、PSA、SCC）的真相：早期癌症常正常（偽陰性），良性發炎卻常紅字（偽陽性）',
      '腫瘤標記真正的三大臨床用途：治療前後療效評估、術後復發監測、搭配影像輔助高危族群（如 AFP + 超音波篩肝癌）',
    ],
    minutes: 8,
    takeaways_zh: [
      '千萬別以為「健檢抽血驗全套癌症指數正常＝沒有得癌症」！早期肺癌、早期乳癌、早期大腸癌與早期胃癌的抽血指數 80% 以上完全正常。',
      '看到 CEA、CA19-9 或 CA125 微幅紅字先別恐慌！吸菸、胃炎、膽結石、子宮內膜異位或生理期都會讓指數升高，請找專科醫師針對器官做標準影像或內視鏡確認。',
      '善用國健署免費篩檢：LDCT 低劑量電腦斷層、乳房 X 光攝影、糞便潛血與子宮頸抹片／HPV 檢測，才是國際實證真正能降低癌症死亡率的黃金工具。',
    ],
  },
  {
    id: 'LUNG_CANCER',
    label_zh: '肺癌與肺結節',
    title_zh: '肺癌（台灣發生與死亡雙冠王）：毛玻璃結節 (GGO)、LDCT 與基因標靶革命',
    goal_zh: '區分肺腺癌與鱗狀細胞癌，讀懂 LDCT 報告上的毛玻璃結節（GGO）處理原則，以及第三代標靶與免疫治療進展。',
    learn_zh: [
      '台灣肺癌特色：超過 60% 患者（尤其女性近 90%）從不吸菸，多為周邊型「肺腺癌」，與基因易感性、空污 PM2.5、石棉、油煙及家族史相關',
      'LDCT 發現肺結節怎麼辦？純毛玻璃結節（Pure GGO）、部分實心結節（Part-solid）與實心結節的大小分界（6 mm / 8 mm）與追蹤開刀時機',
      '晚期肺腺癌不是末日：台灣高達 50–55% 肺腺癌帶有 EGFR 基因突變，另有 ALK、ROS1、BRAF、MET、RET、KRAS G12C 等標靶藥與 PD-1/PD-L1 免疫療法',
    ],
    minutes: 9,
    takeaways_zh: [
      'LDCT 報告看到「毛玻璃結節（GGO）< 6 mm」不代表馬上要開刀！超過九成是良性發炎疤痕或極緩慢的癌前病變，依醫囑定期追蹤看有無變大或出現「實心成分」即可。',
      '早期肺癌（第 I 期）透過單孔胸腔鏡微創肺葉或肺節切除術，術後幾天即可出院，5 年存活率高達 90% 以上！',
      '若確診晚期非小細胞肺癌，第一件事不是急著打傳統化療，而是做「次世代基因定序（NGS）」找出驅動突變（如 EGFR、ALK），精準口服標靶藥控制率遠勝化療。',
    ],
  },
  {
    id: 'COLORECTAL_CANCER',
    label_zh: '大腸直腸癌',
    title_zh: '大腸直腸癌：左右側大腸癌症狀差異、保肛微創手術與 RAS/MSI 精準治療',
    goal_zh: '分辨升結腸（右側）與降結腸／直腸（左側）腫瘤的臨床表徵，認識全直腸繫膜切除、術前放化療保肛技術與基因檢測。',
    learn_zh: [
      '解剖決定症狀：右側大腸（盲腸、升結腸）管腔寬、糞便呈液態，腫瘤常慢性滲血導致「不明原因缺鐵性貧血、疲倦」；左側大腸管腔窄、糞便成形，常表現為「排便習慣改變、大便變細、黏液血便、腸阻塞」',
      '中低位直腸癌「保肛」新標準：全前導性治療（TNT，先做放化療或免疫治療縮小腫瘤）搭配達文西機械手臂微創手術，超過 85–90% 患者不需做永久人工肛門！',
      '第四期轉移性大腸癌也有機會根治：檢測 KRAS / NRAS、BRAF V600E、HER2 與 MSI-H / dMMR；若肝肺轉移灶經標靶化療縮小後能手術或電燒切除，5 年存活率可翻倍至 40–50%',
    ],
    minutes: 8,
    takeaways_zh: [
      '成年男性或停經後女性只要驗出「缺鐵性貧血（血紅素與鐵蛋白偏低）」，就算完全沒有肚子痛，也必須做胃鏡＋大腸鏡排除右側大腸癌或胃癌！',
      '直腸癌不等於一輩子背便袋！現代術前同步放化療加上達文西微創低前位切除術，絕大多數患者都能保留肛門括約肌（僅少數需暫時性保護造口，數月後即可關閉）。',
      '約 4–5% 大腸癌屬於「微衛星不穩定高（MSI-H / dMMR）」，對 PD-1 免疫檢查點抑制劑反應極為驚人，甚至有機會達到病理完全緩解。',
    ],
  },
  {
    id: 'BREAST_CANCER',
    label_zh: '乳癌與分子分型',
    title_zh: '乳癌（台灣女性第一大癌）：BI-RADS 判讀、四大分子亞型與 ADC 抗體藥物複合體',
    goal_zh: '理解台灣女性乳癌好發年齡與篩檢策略，讀懂 BI-RADS 0–6 分級，以及管腔型、HER2 陽性型與三陰性乳癌的個人化治療。',
    learn_zh: [
      '台灣女性乳癌高峰在 45–69 歲（比歐美年輕約 10 歲）：「乳房 X 光攝影」最擅長抓出無症狀原位癌的「微鈣化點」；「乳房超音波」則適合台灣女性致密型乳房偵測囊腫與實心腫塊，兩者相輔相成',
      'BI-RADS 分級解讀：0 級（需加做超音波或放大攝影）、1–2 級（良性定期篩檢）、3 級（可能良性，6 個月追蹤）、4A/4B/4C 級（疑似惡性，需粗針切片）、5 級（高度惡性）',
      '乳癌四大分子亞型：管腔 A 型（荷爾蒙藥為主）、管腔 B 型（荷爾蒙＋CDK4/6 抑制劑或化療）、HER2 陽性（雙標靶＋ADC 藥物）、三陰性 TNBC（免疫治療＋化療＋BRCA PARP 抑制劑）',
    ],
    minutes: 9,
    takeaways_zh: [
      '摸到乳房硬塊「千萬不要只做細針抽吸（FNA）或直接要求開刀挖掉」！標準做法是門診局部麻醉做「粗針穿刺切片（Core Needle Biopsy）」，才能同時取得組織檢測 ER、PR、HER2 與 Ki-67，決定是否先做術前藥物縮小腫瘤再行微創保乳手術。',
      '新一代「抗體藥物複合體（ADC，如 Enhertu T-DXd、Trodelvy）」像長了眼睛的生物導彈，不僅徹底改寫 HER2 陽性乳癌預後，連過往無標靶可用的「HER2 弱陽性（HER2-low）」患者都能大幅受惠！',
      '具有早發乳癌、雙側乳癌、三陰性乳癌或卵巢癌／男性乳癌家族史者，應檢測遺傳性 BRCA1 / BRCA2 基因突變。',
    ],
  },
  {
    id: 'LIVER_BILIARY_PANCREAS',
    label_zh: '肝癌・膽道・胰臟癌',
    title_zh: '肝細胞癌 (HCC)、膽道癌與「癌王」胰臟癌：早期警訊、BCLC 分期與突破性療法',
    goal_zh: '掌握肝癌 BCLC 分期對應的消融、栓塞與雙免疫標靶治療，以及胰臟癌與膽道癌的高危警訊與手術化療進展。',
    learn_zh: [
      '肝細胞癌（HCC）：在肝硬化或慢性 B/C 肝背景下，動態電腦斷層／MRI 呈現典型「動脈期亮起、門脈延遲期洗出（Washout）」即可確診；依 BCLC 分期選擇手術／移植、射頻或微波消融（RFA/MWA）、動脈栓塞（TACE/Y90）或第一線雙免疫／免疫加抗血管新生標靶（Atezolizumab + Bevacizumab）',
      '「癌王」胰管腺癌（PDAC）：早期深藏後腹腔難發現；注意四大早期蛛絲馬跡：① 50 歲後無家族史卻突然新發糖尿病或血糖失控、② 上腹悶痛往背後放射、③ 無痛性阻塞性黃疸（灰白便＋茶色尿）、④ 不明原因體重驟降與脂肪瀉',
      '膽道癌（膽管癌與膽囊癌）與胰臟癌精準醫療：術前新輔助 FOLFIRINOX / Gem-Nab 化療提高 Whipple 手術切除率，並檢測 BRCA1/2、FGFR2 融合、IDH1、HER2 與 MSI-H 尋找標靶與免疫機會',
    ],
    minutes: 9,
    takeaways_zh: [
      '小型肝癌（≤ 3 公分，單顆或 ≤ 3 顆）透過超音波導引「射頻消融（RFA）或微波消融（MWA）」隔皮燒灼，傷口僅針孔大，根治效果直逼外科手術！',
      '過去晚期肝癌無藥可用，如今健保已給付「免疫檢查點抑制劑＋抗血管新生標靶（或雙免疫療法）」，部分患者腫瘤甚至能顯著縮小至可轉化手術切除（Conversion Surgery）。',
      '50 歲以上若突然得糖尿病且體重不增反減，千萬別只吃血糖藥，務必請胃腸肝膽科安排增強型胰臟 CT/MRI 或內視鏡超音波（EUS）檢查胰臟！',
    ],
  },
  {
    id: 'GASTRIC_ESOPHAGEAL_HEADNECK',
    label_zh: '胃・食道・頭頸口腔癌',
    title_zh: '胃癌、食道癌與頭頸口腔癌：菸酒檳榔致癌鏈、早期內視鏡剝離術 (ESD) 與免疫治療',
    goal_zh: '識別上消化道與頭頸部癌症的早期警訊，了解早期癌「內視鏡黏膜下剝離術（ESD）」免切器官的優勢，以及免疫與標靶新進展。',
    learn_zh: [
      '口腔癌與頭頸癌（含鼻咽癌）：口腔潰瘍同位置超過 2 週未癒、紅斑白斑、口腔黏膜變硬張口困難、頸部無痛硬塊、單側鼻塞流血絲或單側中耳積水（鼻咽癌 EB 病毒相關）',
      '食道癌（台灣 90% 為鱗狀細胞癌）：與菸、酒（ALDH2 喝酒臉紅乙醛堆積）、檳榔及滾燙熱湯（> 65°C）高度相關；進行性吞嚥困難（先乾飯卡、後稀飯也卡）為典型症狀',
      '早期胃癌與早期食道癌的救星——內視鏡黏膜下剝離術（ESD）：只要癌細胞侷限在黏膜層尚未侵犯深層淋巴，可直接用胃鏡把病灶完整片下，保住整個胃與食道！晚期則可檢測 HER2、Claudin 18.2、PD-L1 CPS 搭配免疫與標靶治療',
    ],
    minutes: 8,
    takeaways_zh: [
      '嘴巴破皮或舌頭邊緣潰瘍若超過「2 週（14 天）」還沒好，或者摸起來邊緣硬硬的、甚至不痛，請立刻掛耳鼻喉頭頸外科或口腔顎面外科切片檢查！',
      '喝酒容易臉紅的人，體內缺乏代謝乙醛（一級致癌物）的 ALDH2 酵素，每天喝兩杯酒得食道癌與頭頸癌的風險是不臉紅者的 40–50 倍！',
      '高危族群（抽菸喝酒吃檳榔、巴瑞特氏食道、萎縮性胃炎）定期做窄頻影像（NBI）放大內視鏡，抓出第 0–Ia 期病灶即可用 ESD 免開刀根治。',
    ],
  },
  {
    id: 'GYN_URO_CANCERS',
    label_zh: '攝護腺・婦科三大癌',
    title_zh: '泌尿與婦科癌症：攝護腺癌、子宮頸癌、子宮內膜癌與卵巢癌的精準防線',
    goal_zh: '掌握男性攝護腺癌 PSA 與多參數 MRI 診斷、達文西手術與荷爾蒙治療，以及女性婦科三癌（頸、體、卵）的警訊與預防。',
    learn_zh: [
      '攝護腺癌（台灣男性發生率第三名）：早期與良性肥大症狀相似（頻尿、夜尿）或無症狀；透過 PSA 抽血 ＋「多參數磁振造影（mpMRI）融合切片」精準抓出有意義腫瘤；治療涵蓋主動監測、達文西根除手術、精準放療、新型荷爾蒙藥（ARPI）與 PSMA 核醫標靶（Lu-177）',
      '子宮頸癌與子宮內膜癌：九價 HPV 疫苗（男女皆可打）＋ 定期抹片/HPV 檢測可消滅 90% 子宮頸癌；而發生率已超越子宮頸癌的「子宮內膜癌」最關鍵早期警訊就是「停經後陰道出血」或「非經期異常出血」，90% 可在第一期發現治癒！',
      '「沉默殺手」卵巢癌：常以不明原因腹脹、食慾快飽、頻尿或骨盆痛表現；所有上皮性卵巢癌患者皆應檢測 BRCA1/2 與同源重組修復缺失（HRD），使用口服「PARP 抑制劑」維持治療可大幅延長無復發存活期',
    ],
    minutes: 9,
    takeaways_zh: [
      '女性停經後只要出現任何一滴陰道出血（或咖啡色分泌物），就算子宮頸抹片正常，也必須立刻到婦產科做陰道超音波檢查「子宮內膜厚度」與內膜採樣！因為抹片篩檢的是子宮頸，抓不到子宮內膜癌。',
      '抽血 PSA > 4.0 ng/mL 先別慌（攝護腺肥大、發炎或騎腳踏車也會升高），現在可先安排「攝護腺多參數 MRI（mpMRI）」，看清楚疑似病灶再做靶向融合切片，減少冤枉挨針與感染。',
      'HPV 人類乳突病毒不只引起子宮頸癌，還會導致口咽癌、肛門癌與菜花；國健署已全面公費補助國中男女生接種 HPV 疫苗。',
    ],
  },
  {
    id: 'THYROID_HEME_CANCERS',
    label_zh: '甲狀腺・血液腫瘤',
    title_zh: '甲狀腺癌與血液三大惡性腫瘤（淋巴癌、白血病、多發性骨髓瘤）：預後與 CAR-T 突破',
    goal_zh: '消弭對甲狀腺結節與乳突癌的恐懼，並學會辨識淋巴癌、白血病與多發性骨髓瘤（常偽裝成骨科腰痛與腎病）的早期警訊。',
    learn_zh: [
      '甲狀腺結節與甲狀腺癌：成人超音波約 30–50% 有結節，但 90% 以上為良性！依超音波 TI-RADS 分級決定是否細針穿刺（FNA）；最常見的「甲狀腺乳突癌（佔 85%+）」生長極慢，手術加必要時放射性碘-131 治療，10 年存活率高達 95–98%！',
      '惡性淋巴瘤（何杰金氏與非何杰金氏淋巴癌）：警訊為頸部／腋下／鼠蹊部出現「無痛性、摸起來像橡皮擦有彈性且持續變大 > 2 公分的淋巴結」，合併「B 症狀（不明發燒 > 38°C、夜間盜汗濕透睡衣、半年體重減輕 > 10%）」',
      '多發性骨髓瘤（MM）與白血病：長者若同時出現「CRAB 四大症狀：高血鈣（Calcium）、腎功能惡化蛋白尿（Renal）、不明原因貧血（Anemia）、頑固背痛或病理性骨折（Bone）」，務必抽血驗免疫球蛋白電泳！血液腫瘤透過標靶、雙特異性抗體與「CAR-T 細胞免疫治療」已實現高比例深度緩解',
    ],
    minutes: 8,
    takeaways_zh: [
      '感染感冒或牙痛引起的淋巴結腫大通常「會痛、偏軟、2 週內會縮小」；若摸到「完全不痛、越來越硬大、推不動且超過 2–4 週不消」的頸部或鎖骨上淋巴結，請務必就醫檢查！',
      '長輩如果「腰背骨頭劇痛＋貧血＋腎功能突然變差＋泡泡尿」，千萬別只當成一般老人骨刺退化，請掛血液腫瘤科排除「多發性骨髓瘤」！',
      '小於 1 公分且無淋巴轉移或外侵的低風險微小甲狀腺乳突癌，國際指引現已認可在密切超音波監測下採取「主動監測（Active Surveillance）」或微創消融，未必需要馬上全切甲狀腺。',
    ],
  },
  {
    id: 'PRECISION_THERAPY',
    label_zh: '五大抗癌精準武器',
    title_zh: '現代抗癌五大精準武器：微創達文西、質子放療、NGS 標靶、免疫治療與 ADC 生物導彈',
    goal_zh: '一次搞懂現代腫瘤醫學如何透過多專科團隊（MDT）與次世代基因定序（NGS），量身組合局部與全身抗癌武器。',
    learn_zh: [
      '局部根治雙星：① 微創內視鏡／達文西機械手臂手術（3D 放大 10 倍視野，精準保留神經與括約肌、出血極少）；② 現代精準放射治療（IMRT/VMAT、立體定位放射手術 SBRT、質子與重粒子治療利用「布拉格峰 Bragg peak」精準爆破腫瘤、保護後方心肺正常組織）',
      '全身精準武器三巨頭：① 小分子標靶與單株抗體（針對特定基因突變，如 EGFR、ALK、BRAF、PARP）；② 免疫檢查點抑制劑（PD-1 / PD-L1 / CTLA-4，鬆開自身 T 細胞的煞車去消滅癌細胞）；③ 抗體藥物複合體（ADC，用標靶導航頭載著高濃度化療彈頭鑽入癌細胞引爆，並產生旁觀者效應）',
      '健保次世代基因定序（NGS）給付與液態切片（ctDNA）：一次檢測數十至數百個癌症基因，找出罕見標靶與臨床試驗機會',
    ],
    minutes: 9,
    takeaways_zh: [
      '現代抗癌講求「先知敵情再出兵（先切片與基因分型，再決定先開刀或先用藥）」。許多第 II–III 期乳癌、直腸癌、食道癌與肺癌，先做「術前前導治療（Neoadjuvant）」把腫瘤縮小再開刀，不僅能保留器官，更能消滅微轉移、大幅降低復發率！',
      '免疫治療（PD-1/PD-L1）雖然不會像傳統化療那樣掉髮或嚴重嘔吐，但因為把免疫系統煞車鬆開，可能引起「免疫相關副作用（irAEs，如免疫性肺炎、甲狀腺炎、腸炎、肝炎）」，治療期間若出現新發氣喘乾咳、嚴重腹瀉或黃疸，必須立即回報醫療團隊用類固醇調控！',
      '台灣健保已正式將 BRCA1/2 及多種實體腫瘤與血液腫瘤的「次世代基因定序（NGS）」納入定額給付，確診晚期或特定癌別時請主動與主治醫師討論。',
    ],
  },
  {
    id: 'NUTRITION_SIDE_EFFECTS',
    label_zh: '化放療營養與副作用',
    title_zh: '化放療期間怎麼吃？高蛋白防惡病質、白血球低下安全飲食與副作用照護實戰',
    goal_zh: '學會計算癌症治療期間的高熱量高蛋白需求，掌握白血球低下（Neutropenia）的食品安全紅線，以及嘔吐、嘴破與疲憊的處置。',
    learn_zh: [
      '癌症惡病質（Cachexia）是高達 20–30% 癌友治療中斷甚至死亡的主因！ESPEN 國際腫瘤營養指引強調：治療期間每日熱量需達 25–30 kcal/kg，蛋白質更需拉高至 1.2–1.5 g/kg（是一般人的 1.5 倍！）',
      '化療後第 7–14 天「白血球／嗜中性球低下谷底期（Nadir）」安全飲食鐵律：徹底煮熟（中心溫度 > 70°C）、禁吃生菜沙拉／生魚片／半熟蛋／未殺菌蜂蜜起司、水果選「可剝皮或削皮（香蕉、橘子、蘋果削皮）」、勿喝隔夜飲品與自助餐冷盤',
      '四大常見副作用對策：① 噁心嘔吐（依醫囑預防性使用 5-HT3 + NK1 + 類固醇三合一止吐、少量多餐乾濕分離）；② 口腔黏膜炎嘴破（無酒精生理食鹽水／小蘇打水漱口、左旋麩醯胺酸、冷涼滑溜高蛋白食物）；③ 手足症候群與周邊神經麻木；④ 癌因性疲憊（CRF，實證最有效處方不是一直躺床，而是每週 150 分鐘溫和有氧加阻力運動！）',
    ],
    minutes: 9,
    takeaways_zh: [
      '千萬不要相信「餓死癌細胞、斷食抗癌、全生機蔬果斷絕肉類」！癌細胞不管你吃不吃都會搶奪身體養分，不吃蛋白質餓死的是你自己的免疫白血球與肌肉，導致化療被迫停藥！',
      '化療期間若出現「發燒體溫 ≥ 38.0°C（或畏寒發抖）」，極可能是致命的「嗜中性白血球低下合併發燒（Febrile Neutropenia）」，請千萬不要自己吃退燒藥睡覺，必須在 1–2 小時內立刻掛急診抽血打廣效抗生素！',
      '食慾極差吃不下肉時，不必勉強喝一大鍋只有鹽水沒有蛋白質的清雞湯；請改用「高熱量高蛋白濃縮腫瘤專用營養品（含魚油 EPA）」、「蒸蛋／豆花加乳清蛋白粉」或少量多餐冰涼奶昔。',
    ],
  },
  {
    id: 'SURVIVORSHIP_PALLIATIVE',
    label_zh: '康復追蹤與緩和醫療',
    title_zh: '癌症康復者防復發生活處方、破除抗癌偏方迷思與「早期整合緩和醫療」',
    goal_zh: '建立治療結束後的防復發運動飲食習慣與定期追蹤計畫，識破坊間昂貴抗癌偏方，並正確認識早期緩和醫療與三階梯疼痛控制。',
    learn_zh: [
      '治療後黃金 5 年追蹤（Survivorship Care Plan）：前 2–3 年每 3–6 個月回診抽血與影像檢查、第 4–5 年每 6–12 個月、滿 5 年後每年定期追蹤；同時監測治療遠期副作用（如蒽環類／標靶心臟毒性、荷爾蒙藥骨質疏鬆、淋巴水腫）',
      '實證防復發生活三大支柱：① 運動處方（每週 150 分鐘中強度有氧＋2 次肌力訓練，實證可降低乳癌、大腸癌與攝護腺癌 30–40% 復發與死亡風險！）；② 地中海原型飲食（回到高纖蔬果全穀、戒除紅肉加工肉與酒精）；③ 睡眠與心理韌性（正念減壓改善害怕復發焦慮 FCR）',
      '早期整合緩和醫療（Early Palliative Care）與 WHO 癌症疼痛三階梯：緩和醫療不是「放棄治療等死」，而是從確診晚期起就與抗癌治療同步介入，精準控制疼痛與不適；醫療級鴉片類止痛藥（如嗎啡、吩坦尼貼片）在醫師依疼痛調整劑量下「極少成癮」，忍痛不吃藥反而會摧毀睡眠與免疫力！',
    ],
    minutes: 8,
    takeaways_zh: [
      '完成化放療進入「康復期」後，飲食方向要從治療期的「低渣高熱量」切換回「高纖彩虹蔬果、全穀豆類、優質魚肉與限制紅肉酒精」的防癌飲食。',
      '破除三大常見抗癌騙局：①「喝鹼性離子水／吃鹼性食物改變體質抗癌」（人體血液 pH 恆定在 7.35–7.45，靠喝水根本無法改變血液酸鹼度）；②「高價來路不明牛樟芝／中草藥秘方」（常導致猛爆性藥物性肝腎衰竭而被迫中斷正規標靶免疫治療）；③「完全戒斷澱粉生酮餓死癌細胞」（缺乏大型臨床實證且易加重惡病質）。',
      '新英格蘭醫學期刊（NEJM）經典研究證實：晚期肺癌患者在開始抗癌治療時就「同步納入早期緩和醫療團隊」控制疼痛、呼吸喘與情緒，不僅生活品質大幅提升，連整體存活期都比單純抗癌組活得更久！',
    ],
  },
];

// ── Key Numbers & Clinical Reference Tables ──────────────────────────────────

export const ONCOLOGY_KEY_NUMBERS = [
  { value: '40–50%', unit: '癌症可預防', label: '透過戒菸酒檳榔、控體重、疫苗與篩檢可阻斷' },
  { value: '> 90%', unit: '第 I 期存活率', label: '早期肺癌、乳癌、大腸癌、子宮頸與攝護腺癌' },
  { value: '6 項', unit: '台灣公費癌篩', label: '肺癌LDCT、大腸、乳癌、子宮頸、口腔與胃癌' },
  { value: '1.2–1.5', unit: 'g/kg 蛋白質', label: '化放療期間每日蛋白質需求，嚴防惡病質掉肌' },
];

export const TAIWAN_CANCER_SCREENING_TABLE = [
  {
    cancer: '肺癌篩檢',
    tool: '低劑量胸部電腦斷層 (LDCT)',
    target: '① 具肺癌家族史（父母、子女或兄弟姊妹曾罹肺癌）：男性 45–74 歲、女性 40–74 歲；② 重度吸菸者：50–74 歲且吸菸史 ≥ 20 包-年（仍在吸或戒菸未滿 15 年）',
    freq: '每 2 年 1 次（公費）',
    benefit: '唯一實證能揪出 < 1 公分早期肺腺癌（毛玻璃結節），台灣高達 85% 篩出個案為第 0–I 期！',
  },
  {
    cancer: '大腸直腸癌篩檢',
    tool: '定量免疫法糞便潛血檢查 (iFOBT)',
    target: '① 45–74 歲一般民眾；② 40–44 歲且父母、子女或兄弟姊妹曾罹大腸癌者',
    freq: '每 2 年 1 次（公費）',
    benefit: '不需限制飲食；陽性者務必於 3 個月內做全大腸鏡切除腺瘤息肉，可降 35% 大腸癌死亡率',
  },
  {
    cancer: '女性乳癌篩檢',
    tool: '乳房 X 光攝影檢查 (Mammography)',
    target: '40–74 歲全體女性民眾',
    freq: '每 2 年 1 次（公費）',
    benefit: '唯一能偵測無症狀第 0 期原位癌「微鈣化點」的工具；致密型乳房建議平時自費加做乳房超音波互補',
  },
  {
    cancer: '子宮頸癌篩檢',
    tool: '子宮頸抹片檢查 ＋ 人類乳突病毒 (HPV) 檢測',
    target: '① 抹片：25–29 歲每 3 年 1 次、30 歲以上每年 1 次；② 公費 HPV 檢測：35 歲、45 歲、65 歲女性當年度 1 次',
    freq: '每年 / 每 3 年（公費）',
    benefit: '搭配國中男女生公費九價 HPV 疫苗接種，可預防 70–90% 以上子宮頸癌與癌前病變 (CIN)',
  },
  {
    cancer: '口腔癌篩檢',
    tool: '口腔黏膜視診與觸診檢查',
    target: '30 歲以上有嚼檳榔（含已戒檳榔）或吸菸者；18–29 歲有嚼檳榔（含已戒）之原住民',
    freq: '每 2 年 1 次（公費）',
    benefit: '3 分鐘無痛檢查紅斑、白斑、疣狀增生與黏膜下纖維化，阻斷口腔癌變',
  },
  {
    cancer: '胃癌防治篩檢',
    tool: '糞便幽門螺旋桿菌抗原檢測 / 碳 13 吹氣試驗',
    target: '45–74 歲民眾（國健署逐步擴大公費幽門螺旋桿菌篩檢與除菌計畫）',
    freq: '終身篩檢與除菌確認',
    benefit: '根除第一類致癌物幽門桿菌，直接大幅降低 50% 以上胃癌與消化性潰瘍發生率',
  },
];

export const TUMOR_MARKERS_GUIDE = [
  {
    marker: 'CEA（癌胚抗原）',
    associated_cancers: '大腸直腸癌、肺腺癌、胃癌、乳癌、胰臟癌',
    benign_false_positive: '吸菸者（最常見！常落在 5–10 ng/mL）、慢性支氣管炎、胃炎潰瘍、腸道發炎、肝硬化、甲狀腺功能低下',
    clinical_truth: '早期大腸癌與早期肺癌超過 70% CEA 完全正常！不能用來當早期篩檢，主要用於確診後「評估化療標靶療效與監測術後復發」',
  },
  {
    marker: 'AFP（甲型胎兒蛋白）',
    associated_cancers: '肝細胞癌 (HCC)、生殖細胞腫瘤（睪丸癌／卵巢生殖細胞瘤）',
    benign_false_positive: '懷孕婦女、慢性 B/C 型肝炎急性發作期（肝細胞再生時 AFP 也會升高）、肝硬化活動期',
    clinical_truth: '約 30–40% 的小型肝癌 AFP 完全正常！因此 B/C 肝與肝硬化患者「絕對不能只抽 AFP，必須每 6 個月同時做腹部超音波」',
  },
  {
    marker: 'CA 19-9',
    associated_cancers: '胰臟癌、膽管癌、膽囊癌、胃癌、大腸癌',
    benign_false_positive: '膽結石、急性膽管炎、阻塞性黃疸（只要膽汁塞住 CA19-9 就會狂飆！）、急慢性胰臟炎、卵巢巧克力囊腫、支氣管擴張症',
    clinical_truth: '約 5–10% 人口天生缺乏 Lewis 抗原基因，就算得晚期胰臟癌 CA19-9 也永遠是 0；主要用於胰膽腫瘤輔助診斷與療效追蹤',
  },
  {
    marker: 'CA 125',
    associated_cancers: '上皮性卵巢癌、輸卵管癌、腹膜癌、子宮內膜癌',
    benign_false_positive: '女性生理期（月經期間）、懷孕初期、子宮內膜異位症（巧克力囊腫、子宮肌腺症最常讓 CA125 飆高！）、骨盆腔發炎、肝硬化腹水、肋膜積水',
    clinical_truth: '年輕女性 CA125 紅字絕大多數是良性的子宮肌腺症或巧克力囊腫；建議避開生理期抽血，並搭配婦科陰道超音波與 HE4（ROMA 指數）綜合判讀',
  },
  {
    marker: 'PSA（攝護腺特定抗原）',
    associated_cancers: '攝護腺癌（少數器官專一性極高的指標）',
    benign_false_positive: '良性攝護腺肥大 (BPH)、急慢性攝護腺炎、泌尿道感染、近期放置導尿管、膀胱鏡檢查或長途騎腳踏車',
    clinical_truth: '50 歲以上男性（有家族史 45 歲）建議定期檢測 PSA；若在 4–10 ng/mL 灰色地帶，可看游離型比例 (free/total PSA)、PSA 密度與安排「攝護腺多參數 MRI」',
  },
  {
    marker: 'SCC / CYFRA 21-1 / EBV DNA',
    associated_cancers: 'SCC：子宮頸鱗狀細胞癌、食道癌、頭頸癌、肺鱗癌；EBV DNA：鼻咽癌',
    benign_false_positive: 'SCC 在濕疹、乾癬、天皰瘡等「皮膚發炎疾病」或腎功能不全時極易偽陽性升高！',
    clinical_truth: '血漿 EB 病毒 DNA 定量對台灣高發的「鼻咽癌」篩檢與復發監測極具參考價值，若有異常應請耳鼻喉科做鼻咽內視鏡檢查',
  },
];

export const LUNG_NODULE_MANAGEMENT = [
  {
    type: '純毛玻璃結節 (Pure GGO / GGN)',
    imaging: 'CT 上像一層薄霧，完全看得到穿過結節的血管與支氣管影，無實心硬塊成分',
    pathology: '多為良性局部發炎、非典型腺瘤樣增生 (AAH) 或原位肺腺癌 (AIS)，倍增時間極慢（常需 3–5 年以上才長大一點點）',
    action: '< 6 mm 通常不需密集追蹤（高危者可 1–2 年低劑量 CT）；≥ 6 mm 建議先於 6–12 個月複查 LDCT，只要沒變大、沒長出實心成分，多可安全持續追蹤不必急著挨刀',
  },
  {
    type: '部分實心／混合型結節 (Part-solid Nodule)',
    imaging: '外圍一圈毛玻璃，但中心出現一顆不透明的白色「實心核心（Solid component）」',
    pathology: '惡性機率最高！常對應微侵犯性肺腺癌 (MIA) 或侵犯性肺腺癌，實心部分往往代表已有間質侵犯',
    action: '≥ 6 mm 時於 3–6 個月內複查 CT；若持續存在且「實心成分 ≥ 6 mm」或實心部分逐漸變大，應轉介胸腔外科評估微創胸腔鏡切除（VATS）',
  },
  {
    type: '純實心結節 (Solid Nodule)',
    imaging: '整顆均勻不透明的白色圓點，遮蔽內部血管影',
    pathology: '小顆者常見為以前感染留下的肉芽腫鈣化疤痕或肺內淋巴結；大顆或邊緣呈毛刺狀（Spiculated）、胸膜拉扯者則需高度懷疑惡性腫瘤',
    action: '< 6 mm 良性率 > 99%（1 年後追蹤即可）；6–8 mm 於 6–12 個月追蹤；> 8 mm 或具惡性毛刺特徵者，應評估正子攝影 (PET-CT)、切片或微創手術',
  },
];

export const BREAST_SUBTYPES_TABLE = [
  {
    subtype: '管腔 A 型 (Luminal A)',
    markers: 'ER(+) 和/或 PR(+)，HER2(-)，且細胞分裂指標 Ki-67 低 (< 14–20%)',
    share: '約 50–60%（最常見）',
    behavior: '生長最緩慢、分化良好、預後最佳，對抗荷爾蒙治療反應極好，對傳統化療較不敏感',
    therapy: '手術＋抗荷爾蒙治療（停經前 Tamoxifen ± 停經針；停經後芳香環酶抑制劑 AI 吃 5–10 年）；若淋巴結轉移高風險可加口服 CDK4/6 抑制劑，多數可免除化療（或以 21 基因檢測決定）',
  },
  {
    subtype: '管腔 B 型 (Luminal B)',
    markers: 'ER(+) 和/或 PR(+)，但 Ki-67 高 (≥ 20%) 或同時合併 HER2(+)',
    share: '約 15–20%',
    behavior: '生長速度較管腔 A 型快，復發風險中高度',
    therapy: '抗荷爾蒙治療 ＋ 標靶 CDK4/6 抑制劑（如 Abemaciclib / Ribociclib）＋ 視期別搭配化療（若 HER2 陽性則加雙標靶）',
  },
  {
    subtype: 'HER2 過表現型 (HER2-Enriched)',
    markers: 'HER2 強陽性 (IHC 3+ 或 FISH 放大)，ER/PR 陰性或陽性',
    share: '約 15–20%',
    behavior: '過去生長快易轉移，但自從標靶與 ADC 藥物問世後，預後已大逆轉成為最有機會精準擊破的亞型！',
    therapy: '腫瘤 > 2 cm 或有淋巴轉移者，首選「術前雙標靶（賀癌平 Trastuzumab + 賀疾妥 Pertuzumab）＋化療」，超過 60% 開刀時癌細胞已完全消失（pCR）！若有殘留或晚期則有神藥 T-DM1 與 Enhertu (T-DXd)',
  },
  {
    subtype: '三陰性乳癌 (Triple-Negative, TNBC)',
    markers: 'ER(-)、PR(-)、HER2(-) 三者皆陰性',
    share: '約 10–15%（年輕女性與 BRCA1 突變較常見）',
    behavior: '生長較快、早期較易復發，過去僅能靠化療，現已進入免疫與 ADC 新時代',
    therapy: '第 II–III 期首選「術前 PD-1 免疫治療（Pembrolizumab）＋化療」大幅提高病理完全緩解率；具 BRCA1/2 突變者可用口服 PARP 抑制劑（Olaparib）；晚期更有 Trop-2 ADC 藥物（Trodelvy）與 HER2-low ADC',
  },
];

export const FIVE_THERAPY_PILLARS = [
  {
    pillar: '1. 微創與達文西機械手臂手術',
    scope: '局部根治',
    mechanism: '透過 3D 立體放大 10 倍高畫質視野與可 540 度旋轉的仿真手腕器械，在狹窄骨盆腔或胸腹腔內精準剝離腫瘤與廓清淋巴結',
    pros_note: '傷口僅數個 1 公分小孔、出血量減少 70–80%，能最大化保留直腸肛門括約肌與攝護腺性功能／控尿神經，加速術後康復 (ERAS)',
  },
  {
    pillar: '2. 現代精準放療與質子／重粒子治療',
    scope: '局部無創根治／輔助',
    mechanism: '影像導引弧形刀 (IGRT/VMAT)、立體定位放射手術 (SBRT/電腦刀)；質子與重粒子更利用物理「布拉格峰（Bragg Peak）」在到達腫瘤深度時瞬間釋放最大能量，腫瘤後方劑量驟降為 0',
    pros_note: '早期肺癌無法開刀者用 SBRT 照射 3–5 次控制率達 90%；質子治療對肝癌、頭頸鼻咽癌、兒童腫瘤與左側乳癌能極大化保護正常肝臟與心肺',
  },
  {
    pillar: '3. 小分子標靶與單株抗體 (Targeted Therapy)',
    scope: '全身精準阻斷',
    mechanism: '透過 NGS 基因定序找出癌細胞專屬的「驅動基因突變（Driver Mutation）」或血管新生訊號，像鑰匙鎖死鎖頭一樣精準切斷癌細胞生長指令',
    pros_note: '多為每日口服藥（如肺癌 EGFR/ALK 標靶、乳癌 CDK4/6 與 PARP 抑制劑、血癌標靶），不傷及多數正常分裂細胞，常見副作用為皮疹、甲溝炎或輕微腹瀉',
  },
  {
    pillar: '4. 免疫檢查點抑制劑與 CAR-T 細胞治療',
    scope: '全身免疫喚醒',
    mechanism: '癌細胞會偽裝踩住 T 細胞的煞車（PD-1 / PD-L1 / CTLA-4）；免疫藥物負責「把煞車皮拆掉」，讓病人自己的免疫 T 細胞重新認出並圍剿癌細胞',
    pros_note: '一旦奏效常具有獨特的「長尾效應（Long-tail effect）」，讓部分第四期黑色素瘤、肺癌、肝癌、MSI-H 大腸癌與腎癌患者獲得長達數年以上的無病存活！',
  },
  {
    pillar: '5. 抗體藥物複合體 (ADC 生物導彈) 與核醫標靶',
    scope: '全身導航爆破',
    mechanism: '將「高專一性標靶抗體（導航頭）」透過特殊連接子綁上「超高毒性化療小分子（彈頭）」，精準停靠癌細胞表面後鑽入內部引爆，並透過「旁觀者效應」順便炸死周圍無抗原的癌細胞',
    pros_note: '近年腫瘤醫學最大革命（如 Enhertu、Trodelvy、Padcev 與攝護腺癌 Lu-177 PSMA），大幅降低全身傳統化療副作用並突破抗藥性瓶頸',
  },
];

export const CHEMO_SIDE_EFFECT_SOLUTIONS = [
  {
    symptom: '白血球／嗜中性球低下 (Neutropenia)',
    timing: '化療後第 7–14 天達最低谷 (Nadir)，第 3 週逐漸回升',
    do_actions: '徹底實施「熟食低菌飲食（肉蛋全熟、水果削皮、飲水煮沸）」、出入醫院戴口罩勤洗手；高風險處方醫師會預防性施打長效或短效「白血球生成素（G-CSF 保血針）」',
    red_flag: '🚨 體溫 ≥ 38.0°C 或畏寒發抖、排尿灼熱、劇烈咳嗽或肛門周圍紅腫痛，請勿吃退燒藥掩蓋，必須在 1 小時內掛急診！',
  },
  {
    symptom: '噁心嘔吐與食慾不振',
    timing: '急性期（24小時內）、延遲期（第2–5天）',
    do_actions: '按時服用醫師開立的預防性三合一止吐藥（5-HT3 + NK1 + Dexamethasone，不要等吐了才吃！）；採少量多餐（一天 6–8 餐）、固體與湯水間隔 30 分鐘分開吃、選微酸或冰涼無油煙食物、晨起先吃蘇打餅乾、含薑片',
    red_flag: '超過 24 小時完全無法進食喝水、尿量極少深黃、嚴重頭暈站不穩（脫水與電解質失衡）需回診打點滴止吐。',
  },
  {
    symptom: '口腔黏膜炎（嘴破、吞嚥痛）與味覺改變',
    timing: '化療後第 5–10 天，或頭頸部放療第 2–3 週起',
    do_actions: '治療前先看牙醫處理蛀牙；每 2–4 小時用「溫生理食鹽水或小蘇打水」溫和漱口（禁含酒精漱口水）；補充左旋麩醯胺酸（L-Glutamine）；吃冰涼布丁、蒸蛋、豆花、酪梨奶昔；若覺得金屬苦味，改用陶瓷或塑膠餐具並用檸檬汁、迷迭香提味',
    red_flag: '痛到連吞口水或喝水都無法進行、口腔出現大面積白色偽膜（念珠菌感染）或高燒。',
  },
  {
    symptom: '手足症候群與周邊神經病變（手腳麻木刺痛）',
    timing: '使用鉑金類（Oxaliplatin/Cisplatin）、紫杉醇或口服截瘤達 (Xeloda)、標靶藥期間累積發生',
    do_actions: '打 Oxaliplatin 期間 3–5 天避開冰水與冷氣直吹（防喉頭痙攣與冷誘發刺麻）；每天厚塗含尿素（Urea 10%）乳液保濕手腳、穿厚棉襪與寬楦軟底鞋減少摩擦；補充維生素 B 群並預防跌倒',
    red_flag: '手腳出現大水泡、脫皮潰爛流湯，或手指麻木到無法扣鈕扣、走路像踩棉花常跌倒，請告知醫師調整劑量。',
  },
];

// ── Myths & Quizzes ──────────────────────────────────────────────────────────

export const ONCOLOGY_MYTHS: { chapter: OncologyTab; myth: string; fact: string }[] = [
  {
    chapter: 'OVERVIEW',
    myth: '懷疑長腫瘤千萬不能做「穿刺切片（Biopsy）」，一戳破腫瘤就會刺激癌細胞到處擴散？',
    fact: '這是耽誤無數早期癌症治療的錯誤謠言！現代影像導引同軸套管（Coaxial needle）穿刺技術極為安全，針道轉移機率低於萬分之幾；相反地，不做切片就無法得知病理型態與基因突變（如 EGFR、HER2、PD-L1），根本無法用對救命的標靶與免疫藥！',
  },
  {
    chapter: 'SCREENING_TW',
    myth: '我每年都去檢驗所抽血驗「全套癌症腫瘤標記（CEA、AFP、CA19-9、CA125）」，全部正常就代表絕對沒有得癌症？',
    fact: '完全錯誤！抽血腫瘤標記對「早期癌症」的敏感度極低，超過 70–80% 的第一期肺癌、乳癌、大腸癌與胃癌患者，抽血指數完全正常！真正能揪出早期癌症的是器官專屬篩檢：肺癌做 LDCT、大腸癌做糞便潛血與大腸鏡、乳癌做乳房攝影與超音波。',
  },
  {
    chapter: 'LUNG_CANCER',
    myth: '我一輩子從來不抽菸，家裡也沒有人抽菸，所以絕對不可能得肺癌？',
    fact: '在台灣，超過 50–60% 的肺癌患者（女性更高達 90%！）從不吸菸，主要罹患的是長在肺部外圍的「肺腺癌」，與先天基因易感性、空氣污染 PM2.5 與肺癌家族史密切相關；因此不抽菸但有家族史者更應善用公費 LDCT 篩檢。',
  },
  {
    chapter: 'COLORECTAL_CANCER',
    myth: '得直腸癌只要開刀，就一定會被挖掉肛門、一輩子在肚皮上掛人工肛門（便袋）？',
    fact: '現代醫療早已改寫這個宿命！針對中低位直腸癌，透過「術前同步放化療或免疫治療（TNT）」先把腫瘤縮小，再搭配「達文西機械手臂或內視鏡微創保肛手術」，高達 85–90% 以上的患者都能成功保留原本的肛門！',
  },
  {
    chapter: 'BREAST_CANCER',
    myth: '乳房 X 光攝影夾起來很痛，我只要做「乳房超音波」就夠了，不用做乳房攝影？',
    fact: '兩者絕對不能互相取代！第 0 期原位乳癌最常以極細小的「微鈣化點（Microcalcifications）」表現，這在超音波下幾乎看不到，唯有「乳房 X 光攝影」能清楚拍出來；而超音波則擅長在亞洲女性致密乳腺中區分水泡與實心腫塊，40 歲以上女性應兩者搭配。',
  },
  {
    chapter: 'LIVER_BILIARY_PANCREAS',
    myth: '肝臟沒有痛覺，只要抽血驗「GOT / GPT（AST / ALT）正常」，肝臟就一定很健康、沒有長肝癌？',
    fact: 'GOT/GPT 只代表抽血當下肝細胞有沒有正在破裂發炎，已經形成肝硬化或長出 3 公分早期肝癌的患者，高達一半以上 GOT/GPT 完全正常！B/C 肝帶原與肝硬化患者必須靠「每 6 個月腹部超音波＋AFP」才能保命。',
  },
  {
    chapter: 'GASTRIC_ESOPHAGEAL_HEADNECK',
    myth: '喝酒會臉紅代表血液循環好、肝功能強、代謝快？',
    fact: '恰恰相反！喝酒臉紅稱為「酒精不耐症（Asian Flush）」，是因為體內缺乏 ALDH2 酵素（台灣人高達 47% 有此基因缺失，全球最高！），導致酒精轉化出的劇毒一級致癌物「乙醛」無法代謝而全身血管擴張；這類人每天喝酒，罹患食道癌與頭頸口腔癌的風險暴增 40–50 倍！',
  },
  {
    chapter: 'GYN_URO_CANCERS',
    myth: '我每年都有乖乖做「子宮頸抹片檢查」而且都正常，所以停經後就算有一點點陰道出血也不用擔心？',
    fact: '子宮頸抹片只能刮取「子宮頸外口」的細胞，對於長在子宮腔裡面的「子宮內膜癌」與深處的「卵巢癌」幾乎完全抓不到！停經後只要有任何一點陰道出血或褐色分泌物，90% 的早期子宮內膜癌都是這樣被發現的，請務必立刻做婦科超音波與內膜檢查。',
  },
  {
    chapter: 'THYROID_HEME_CANCERS',
    myth: '健檢超音波發現「甲狀腺結節」，就代表得了甲狀腺癌，一定要馬上開刀把甲狀腺全切掉？',
    fact: '高解析超音波下高達 30–50% 的成年人都有甲狀腺結節，其中超過 90–95% 都是良性的！醫師會依超音波特徵（TI-RADS）判斷是否需要細針穿刺，絕大多數良性結節只需定期追蹤即可。',
  },
  {
    chapter: 'PRECISION_THERAPY',
    myth: '第四期（晚期轉移）癌症就代表所有的治療都沒效了，只能等死？',
    fact: '在次世代基因定序（NGS）、第三代標靶藥物、PD-1/PD-L1 免疫治療與 ADC 抗體藥物複合體問世後，許多第四期肺癌、HER2 乳癌、MSI-H 大腸癌、肝癌與腎癌已能像「慢性病」一樣長期控制數年甚至更久，部分肝轉移大腸癌更能轉化手術達到根治！',
  },
  {
    chapter: 'NUTRITION_SIDE_EFFECTS',
    myth: '癌細胞最愛吃糖和蛋白質，所以化療期間不能吃肉、不能吃飯，要靠斷食或生機蔬果汁「餓死癌細胞」？',
    fact: '這是腫瘤科門診最致命的飲食迷思！即使你完全不吃東西，癌細胞仍會分泌發炎因子強行分解你的骨骼肌與內臟蛋白質來奪取養分（導致癌症惡病質）。斷食餓不死癌細胞，卻會先餓死你自己的白血球與肌肉，導致敗血症與化療被迫中斷！化療期必須攝取「高蛋白（1.2–1.5 g/kg）、充足熱量」才能打贏仗。',
  },
  {
    chapter: 'SURVIVORSHIP_PALLIATIVE',
    myth: '癌症骨轉移或內臟劇痛時千萬不能用「嗎啡（鴉片類止痛藥）」，一用就會吸毒上癮，而且代表沒救了？',
    fact: '以「緩解癌症疼痛」為目的，在專科醫師精準計算劑量下使用醫療級嗎啡或吩坦尼貼片，大腦不會產生欣快感，成癮率低於千分之一！長期忍受劇痛反而會讓人徹夜失眠、食慾崩潰、免疫系統瓦解；好好止痛才能吃得下、睡得著、有體力繼續抗癌。',
  },
];

export const ONCOLOGY_QUIZ: Partial<Record<OncologyTab, CourseQuiz>> = {
  OVERVIEW: {
    question: '關於國際通用的癌症「TNM 分期系統」與切片檢查，下列敘述何者正確？',
    options: [
      'T 代表遠端轉移、N 代表腫瘤大小、M 代表淋巴結',
      'T 代表原發腫瘤大小與侵犯深度（Tumor）、N 代表區域淋巴結轉移（Node）、M 代表遠端器官轉移（Metastasis）；且組織切片是確認病理與基因突變的黃金標準，不會造成擴散',
      '只要有做抽血檢查就可以決定 TNM 分期，不需要做影像或切片',
      '第 I 期癌症代表已經轉移到全身器官',
    ],
    answer: 1,
    explain: 'TNM 分別代表原發腫瘤（T）、區域淋巴結（N）與遠端轉移（M）。第 0 期為原位癌，第 I–III 期為局部或區域淋巴侵犯，第 IV 期為遠端轉移（M1）。',
  },
  SCREENING_TW: {
    question: '55 歲的林先生不抽菸，但他的母親曾罹患肺腺癌。根據台灣國健署最新公費癌症篩檢政策，林先生符合哪一項免費篩檢資格？若想篩檢早期肺癌，應該做什麼檢查？',
    options: [
      '每 2 年 1 次公費「低劑量胸部電腦斷層（LDCT）」；因為一般胸部 X 光擋住死角且照不出 < 1 公分的早期毛玻璃肺腺癌',
      '只要每年拍一張普通胸部 X 光片加抽血驗 CEA 就 100% 足夠了',
      '不抽菸的人完全不需要做任何肺癌篩檢',
      '直接做正子攝影（PET）當作第一線常規篩檢',
    ],
    answer: 0,
    explain: '具肺癌一等親家族史之 45–74 歲男性及 40–74 歲女性（或 50–74 歲 ≥ 20 包-年重度吸菸者），每 2 年可享 1 次公費低劑量電腦斷層（LDCT），這是唯一實證能偵測早期微小肺腺癌並降低死亡率的工具。',
  },
  LUNG_CANCER: {
    question: '陳女士做 LDCT 健檢發現右肺有一顆 0.4 公分（4 mm）的「純毛玻璃結節（Pure GGO）」，或是確診為晚期肺腺癌時，下列臨床處置何者最符合國際指引？',
    options: [
      '0.4 公分的純毛玻璃結節明天就要立刻開刀把整片右肺切掉',
      '< 6 mm（0.6 公分）的純毛玻璃結節絕大多數為良性或極緩慢病灶，依醫囑定期追蹤 LDCT 觀察有無變大或出現實心成分即可；而若確診晚期肺腺癌，應先做 EGFR/ALK/ROS1 等基因檢測以選用精準標靶藥',
      '台灣女性肺腺癌 99% 都沒有基因突變，只能打傳統化療',
      '毛玻璃結節代表肺部裡有玻璃碎片，多咳嗽就會排出來',
    ],
    answer: 1,
    explain: '< 6 mm 的純毛玻璃結節（Pure GGO）惡性進展極慢，國際 Fleischner 與 NCCN 指引皆建議定期影像追蹤即可，避免過度手術；而台灣肺腺癌高達 50–55% 具有 EGFR 等可標靶基因突變。',
  },
  COLORECTAL_CANCER: {
    question: '為什麼「右側大腸癌（升結腸癌）」跟「左側大腸癌（降結腸／乙狀結腸／直腸癌）」的早期臨床症狀很不一樣？',
    options: [
      '右側大腸管腔較寬且糞便呈液態，腫瘤不易阻塞但常慢性滲血，故常以「不明原因缺鐵性貧血、頭暈疲倦」表現；左側大腸管腔較窄且糞便已成形，故常以「排便習慣改變、大便變細、血便或腸阻塞」表現',
      '右側大腸癌一定會解鮮紅血便，左側大腸癌完全不會流血',
      '只要沒有肚子痛就一定沒有大腸癌',
      '大腸癌只會發生在 80 歲以上的人',
    ],
    answer: 0,
    explain: '升結腸（右側）內徑寬、糞便稀水狀，因此早期極少造成腸阻塞，而是以慢性潛血流失導致「缺鐵性貧血」為主；降結腸與直腸（左側）管徑窄、糞便固態成形，故易出現排便習慣改變、大便變細與肉眼血便。',
  },
  BREAST_CANCER: {
    question: '關於乳癌篩檢報告「BI-RADS 分級」與乳癌分子亞型的治療，下列何者正確？',
    options: [
      '乳房攝影報告寫「BI-RADS 0 級」，代表是第 0 期原位癌，或是完全沒事不用管它',
      '「BI-RADS 0 級」代表單靠目前影像尚無法下定論（例如乳腺較致密），必須回門診「加做乳房超音波或局部放大攝影」完成評估；若為 BI-RADS 4 或 5 級則需做粗針穿刺切片檢查 ER/PR/HER2',
      '摸到乳房腫塊應該直接請醫師開刀割掉，千萬不要先做粗針切片',
      'HER2 陽性乳癌與三陰性乳癌目前完全沒有任何標靶或免疫藥物可用',
    ],
    answer: 1,
    explain: '許多民眾誤以為 BI-RADS 0 是「零分完全正常」而沒回診！其實 BI-RADS 0 代表「評估未完成（Incomplete）」，必須加做乳房超音波等輔助檢查；BI-RADS 1–2 才是良性。',
  },
  LIVER_BILIARY_PANCREAS: {
    question: '58 歲的張先生體型微胖，過去沒有糖尿病家族史，但近 3 個月突然被診斷出「新發生糖尿病（血糖飆高）」，同時體重莫名減輕了 5 公斤，上腹部偶爾悶痛並延伸到後背。除了控制血糖外，醫師最應該高度警覺並排除哪一種隱形癌症？',
    options: [
      '只要單純吃降血糖藥就好，體重減輕是減肥成功的好現象',
      '高度警覺「早期胰臟癌（胰管腺癌 PDAC）」！因為胰臟腫瘤常在出現其他症狀前 6–24 個月先破壞胰島或引發胰島素阻抗導致新發糖尿病，應盡速安排增強型胰臟 CT/MRI 或內視鏡超音波（EUS）',
      '這只是單純的五十肩背痛',
      '只做一般腹部 X 光片就可以看清楚胰臟小腫瘤',
    ],
    answer: 1,
    explain: '50 歲以上「新發生糖尿病（New-onset diabetes）合併非刻意體重減輕與上腹／背痛」是國際公認最重要的早期胰臟癌紅旗警訊！一般超音波常被胃腸空氣擋住胰臟，需靠增強型胰臟 CT/MRI 或 EUS。',
  },
  GASTRIC_ESOPHAGEAL_HEADNECK: {
    question: '關於台灣高發的口腔癌、食道癌與早期胃癌，下列哪一項防治觀念最正確？',
    options: [
      '嘴巴同一個地方破皮潰瘍超過 1 個月都不痛，代表只是火氣大，多擦口內膏就好',
      '口腔潰瘍超過 2 週未癒合或出現紅白斑硬塊必須立刻切片；而侷限在黏膜表層的「早期食道癌與早期胃癌」，可透過「內視鏡黏膜下剝離術（ESD）」免開刀完整切除並保留整個器官！',
      '喝滾燙的熱湯（> 65°C）與喝酒臉紅對食道黏膜有殺菌保護作用',
      '戒掉檳榔之後就永遠不會得口腔癌，不需要再做口腔黏膜檢查',
    ],
    answer: 1,
    explain: '口腔潰瘍 > 2 週不癒合是口腔癌首要警訊；曾嚼檳榔者即使戒除仍須每 2 年篩檢；而透過高畫質 NBI 內視鏡發現的早期黏膜內胃癌／食道癌，可用 ESD 內視鏡微創剝離根治，不必切除食道或胃。',
  },
  GYN_URO_CANCERS: {
    question: '62 歲的王媽媽已經停經 10 年，這兩天發現內褲上有少量淡粉紅色與咖啡色出血，但她去年做的子宮頸抹片報告是正常的。她現在該怎麼做？',
    options: [
      '既然去年子宮頸抹片正常，代表婦科完全沒問題，可能是更年期回春現象不用理會',
      '立刻至婦產科門診接受「陰道超音波（測量子宮內膜厚度）」與必要的子宮內膜採樣／子宮腔鏡檢查，因為「停經後出血」是子宮內膜癌最關鍵的早期警訊，而子宮頸抹片抓不到子宮內膜癌！',
      '自己去中藥行抓調經止血藥吃就好',
      '等明年做抹片時再順便問就好',
    ],
    answer: 1,
    explain: '高達 90% 的子宮內膜癌患者會出現「停經後陰道出血」或異常出血，因此多數能在第 I 期就被發現治癒；但千萬不能因為子宮頸抹片正常就掉以輕心！',
  },
  THYROID_HEME_CANCERS: {
    question: '70 歲的陳伯伯近兩個月覺得腰背骨頭劇痛、臉色蒼白容易喘（貧血）、小便有很多久久不散的泡泡（蛋白尿且抽血腎功能惡化）、抽血還發現血鈣偏高。除了看骨科與腎臟科外，這組「CRAB 症狀」最需要警覺哪一種血液腫瘤？',
    options: [
      '只是單純年紀大骨質疏鬆加感冒',
      '多發性骨髓瘤（Multiple Myeloma, MM）！高血鈣（C）、腎功能不全（R）、貧血（A）與蝕骨性骨痛骨折（B）為其經典的 CRAB 四大表現，應抽血檢查免疫球蛋白與游離輕鏈',
      '良性甲狀腺結節',
      '單純缺鐵性貧血，買鐵劑吃就會好',
    ],
    answer: 1,
    explain: '多發性骨髓瘤是漿細胞惡性增生並分泌單株球蛋白，常破壞脊椎骨頭並堵塞腎小管；許多長輩初期在骨科或腎臟科輾轉就醫，記住「CRAB（高鈣、腎病、貧血、骨痛）」口訣能幫助及早轉介血液腫瘤科，現已有標靶與免疫療法可大幅延長壽命。',
  },
  PRECISION_THERAPY: {
    question: '關於現代抗癌武器「免疫檢查點抑制劑（PD-1 / PD-L1）」與「抗體藥物複合體（ADC）」，下列敘述何者正確？',
    options: [
      '免疫治療就是去買靈芝、牛樟芝把免疫力補到越強越好',
      '免疫檢查點抑制劑是解除癌細胞對人體 T 細胞踩下的煞車；而 ADC（抗體藥物複合體）則是將標靶抗體連接高濃度化療彈頭，像生物導彈一樣精準鑽入癌細胞引爆',
      '打免疫治療完全不會有任何副作用，就算出現嚴重呼吸喘或一天拉肚子 8 次也不用跟醫師說',
      '所有癌症患者都不需要做基因或生物標記檢測，直接盲目自費打最貴的藥就對了',
    ],
    answer: 1,
    explain: 'PD-1/PD-L1 抑制劑透過鬆開 T 細胞煞車發揮持久抗癌力，但需留意免疫相關副作用（irAEs，如免疫性肺炎、腸炎、肝炎、內分泌炎）；ADC 則結合標靶導航與化療殺傷力。',
  },
  NUTRITION_SIDE_EFFECTS: {
    question: '正在接受化學治療的癌友，在第 10 天（白血球最低谷期）突然在家量到耳溫 38.3°C 且覺得微微發冷。請問此時家屬與病人最正確的做法是什麼？',
    options: [
      '先吃一顆家裡的普拿疼退燒藥，蓋厚棉被睡一覺流汗就好，等下週門診再跟醫師說',
      '這是「化療後嗜中性白血球低下合併發燒（Febrile Neutropenia）」的致命急症！切勿自行吃退燒藥掩蓋病情，應立即帶上化療紀錄卡在 1–2 小時內前往醫院急診抽血並施打經驗性廣效抗生素！',
      '趕快去吃生魚片、生菜沙拉補充天然維生素抵抗感冒',
      '把所有的營養品跟蛋白質停掉，只喝白開水餓死細菌',
    ],
    answer: 1,
    explain: '化療後第 7–14 天白血球最低時，身體幾乎沒有防禦細菌的能力，一旦發燒 ≥ 38.0°C，細菌可能在數小時內引發敗血性休克！分秒必爭送急診打抗生素是保命第一鐵律。',
  },
  SURVIVORSHIP_PALLIATIVE: {
    question: '癌症病人完成所有手術與化放療、進入「長期康復追蹤期」後，哪一項生活型態改變經過大型臨床研究證實，最能顯著降低 30–40% 的癌症復發率與死亡率，同時改善癌因性疲憊？',
    options: [
      '每天躺在床上絕對靜養，千萬不要運動以免耗損元氣',
      '規律運動處方（每週累計 150 分鐘中強度有氧運動 ＋ 每週 2 次肌力阻力訓練），搭配高纖彩虹蔬果全穀、足量優質蛋白質並戒除菸酒與加工紅肉',
      '花幾十萬元購買地下電台推銷的鹼性水機與神祕草藥丸',
      '從此完全不吃任何碳水化合物與蛋白質',
    ],
    answer: 1,
    explain: 'ASCO（美國臨床腫瘤學會）與 ACS（美國癌症協會）指引一致強調：規律有氧加阻力運動不僅是消除「癌因性疲憊（CRF）」最有效的非藥物處方，更能改善胰島素阻抗、降低全身慢性發炎並活化自然殺手細胞（NK cells），實證降低乳癌、大腸癌、攝護腺癌 30–40% 復發死亡率！',
  },
};

// ── Reference Sources ────────────────────────────────────────────────────────

export const ONCOLOGY_SOURCES: Record<string, CourseSource> = {
  nccn_guidelines_2024: {
    label: 'NCCN Clinical Practice Guidelines in Oncology (NCCN Guidelines®) — Lung, Breast, Colon, Hepatobiliary, Pancreatic & Supportive Care (2024–2025)',
    url: 'https://www.nccn.org/guidelines/category_1',
  },
  hpa_taiwan_cancer_screening: {
    label: '衛生福利部國民健康署：台灣癌症登記年報與擴大公費癌症篩檢服務指引（2025）',
    url: 'https://www.hpa.gov.tw/',
  },
  who_cancer_prevention: {
    label: 'World Health Organization (WHO) — Cancer Prevention, Early Detection and Palliative Care Fact Sheet',
    url: 'https://www.who.int/news-room/fact-sheets/detail/cancer',
  },
  talem_ldct_taiwan: {
    label: 'National Taiwan University & TALEM Study: Low-Dose CT Screening for Lung Cancer in Never-Smokers with Risk Factors (Lancet Respir Med 2024)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/38042168/',
  },
  fleischner_nodule_2017: {
    label: 'Guidelines for Management of Incidental Pulmonary Nodules Detected on CT Images: From the Fleischner Society (Radiology 2017)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28240562/',
  },
  esmo_breast_crc_2024: {
    label: 'ESMO Clinical Practice Guidelines: Early and Metastatic Breast Cancer & Colorectal Cancer Management (Ann Oncol 2024)',
    url: 'https://www.esmo.org/guidelines',
  },
  bclc_hcc_2022: {
    label: 'BCLC strategy for prognosis prediction and treatment recommendation: The 2022 update (Reig M, et al. J Hepatol 2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34801630/',
  },
  espen_cancer_nutrition_2021: {
    label: 'ESPEN practical guideline: Clinical Nutrition in cancer (Muscaritoli M, et al. Clin Nutr 2021)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/33946039/',
  },
  asco_exercise_diet_2022: {
    label: 'Exercise, Diet, and Weight Management During Cancer Treatment: ASCO Guideline (Ligibel JA, et al. J Clin Oncol 2022)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/35576506/',
  },
  temel_early_palliative_nejm: {
    label: 'Early Palliative Care for Patients with Metastatic Non–Small-Cell Lung Cancer (Temel JS, et al. N Engl J Med 2010; ASCO Palliative Care Update 2024)',
    url: 'https://pubmed.ncbi.nlm.nih.gov/20818875/',
  },
};

export const ONCOLOGY_CHAPTER_SOURCES: Record<OncologyTab, string[]> = {
  OVERVIEW: ['who_cancer_prevention', 'nccn_guidelines_2024', 'hpa_taiwan_cancer_screening'],
  SCREENING_TW: ['hpa_taiwan_cancer_screening', 'talem_ldct_taiwan', 'nccn_guidelines_2024'],
  LUNG_CANCER: ['talem_ldct_taiwan', 'fleischner_nodule_2017', 'nccn_guidelines_2024'],
  COLORECTAL_CANCER: ['esmo_breast_crc_2024', 'nccn_guidelines_2024', 'hpa_taiwan_cancer_screening'],
  BREAST_CANCER: ['esmo_breast_crc_2024', 'nccn_guidelines_2024', 'hpa_taiwan_cancer_screening'],
  LIVER_BILIARY_PANCREAS: ['bclc_hcc_2022', 'nccn_guidelines_2024'],
  GASTRIC_ESOPHAGEAL_HEADNECK: ['nccn_guidelines_2024', 'who_cancer_prevention', 'hpa_taiwan_cancer_screening'],
  GYN_URO_CANCERS: ['nccn_guidelines_2024', 'esmo_breast_crc_2024'],
  THYROID_HEME_CANCERS: ['nccn_guidelines_2024', 'esmo_breast_crc_2024'],
  PRECISION_THERAPY: ['nccn_guidelines_2024', 'esmo_breast_crc_2024'],
  NUTRITION_SIDE_EFFECTS: ['espen_cancer_nutrition_2021', 'asco_exercise_diet_2022', 'nccn_guidelines_2024'],
  SURVIVORSHIP_PALLIATIVE: ['asco_exercise_diet_2022', 'temel_early_palliative_nejm', 'espen_cancer_nutrition_2021'],
};
