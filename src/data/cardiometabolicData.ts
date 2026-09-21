import {
  AtherosclerosisStage,
  LipidBiomarkerProfile,
  CacStratification,
  CkmStageInfo,
} from '../types';

export interface BloodPressureProtocol {
  days: number;
  timesPerDay: number;
  readingsPerTime: number;
  intervalMinutes: number;
  normalSystolicMax: number;
  normalDiastolicMax: number;
  guidelineVersion: string;
}

export const BP_722_PROTOCOL: BloodPressureProtocol = {
  days: 7, // 連續 7 天
  timesPerDay: 2, // 每天 2 個時段：晨起後 1 小時內與就寢前 1 小時內
  readingsPerTime: 2, // 每次量 2 遍
  intervalMinutes: 1, // 間隔 1 分鐘取平均
  normalSystolicMax: 120, // < 120 mmHg
  normalDiastolicMax: 80, // < 80 mmHg
  guidelineVersion: '2022 Taiwan Society of Cardiology (TSOC) / THS Guidelines',
};

export interface BloodPressureCategoryInfo {
  category: 'OPTIMAL' | 'ELEVATED' | 'STAGE_1' | 'STAGE_2';
  name_zh: string;
  name_en: string;
  systolic_range: string;
  diastolic_range: string;
  color_class: string;
  clinical_directive_zh: string;
}

export const TSOC_BP_CATEGORIES: BloodPressureCategoryInfo[] = [
  {
    category: 'OPTIMAL',
    name_zh: '理想血壓 (Optimal)',
    name_en: 'Optimal Blood Pressure',
    systolic_range: '< 120 mmHg',
    diastolic_range: '且 < 80 mmHg',
    color_class: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-300',
    clinical_directive_zh: '血管內皮健康且彈性良好。建議維持規律運動、低鈉高鉀飲食（DASH）與每週 1–2 次監測。',
  },
  {
    category: 'ELEVATED',
    name_zh: '血壓偏高 (Elevated)',
    name_en: 'Elevated Blood Pressure',
    systolic_range: '120 – 129 mmHg',
    diastolic_range: '且 < 80 mmHg',
    color_class: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-300',
    clinical_directive_zh: '大動脈彈性可能開始出現早期微退化。強制啟動生活型態介入：減重、限制酒精攝取、改善睡眠呼吸。',
  },
  {
    category: 'STAGE_1',
    name_zh: '第一期高血壓 (Stage 1 HTN)',
    name_en: 'Stage 1 Hypertension',
    systolic_range: '130 – 139 mmHg',
    diastolic_range: '或 80 – 89 mmHg',
    color_class: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 border-orange-300',
    clinical_directive_zh: '依據 2022 TSOC 新指引已達高血壓診斷標準。若合併心血管疾病、糖尿病或 CKD，應即刻啟動第一線降血壓藥物治療。',
  },
  {
    category: 'STAGE_2',
    name_zh: '第二期高血壓 (Stage 2 HTN)',
    name_en: 'Stage 2 Hypertension',
    systolic_range: '≥ 140 mmHg',
    diastolic_range: '或 ≥ 90 mmHg',
    color_class: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-300',
    clinical_directive_zh: '中風與心肌梗塞風險急遽攀升！需立即由心臟專科醫師評估，通常需雙合劑（如 CCB + ARB）處方積極控制。',
  },
];

export interface MetSynCriterion {
  id: string;
  name_zh: string;
  name_en: string;
  threshold_zh: string;
  threshold_en: string;
  unit: string;
  biological_link_zh: string;
  biological_link_en: string;
}

export const METSYN_CRITERIA: MetSynCriterion[] = [
  {
    id: 'MET-01',
    name_zh: '腹部肥胖 (腰圍)',
    name_en: 'Abdominal Obesity (Waist Circumference)',
    threshold_zh: '男性 ≥ 90 cm，女性 ≥ 80 cm',
    threshold_en: 'Male ≥ 90 cm, Female ≥ 80 cm',
    unit: 'cm',
    biological_link_zh: '反映網膜與腸繫膜內臟脂肪（Visceral Fat）嚴重超載，游離脂肪酸 (FFA) 直接灌流肝門靜脈，誘發嚴重肝臟脂肪浸潤與全身性全身微發炎。',
    biological_link_en: 'Reflects visceral adiposity delivering excess free fatty acids directly to the portal vein.',
  },
  {
    id: 'MET-02',
    name_zh: '血壓偏高 (Elevated Blood Pressure)',
    name_en: 'Elevated Blood Pressure',
    threshold_zh: '收縮壓 ≥ 130 mmHg 或舒張壓 ≥ 85 mmHg，或正服用降血壓藥物',
    threshold_en: 'Systolic ≥ 130 mmHg or Diastolic ≥ 85 mmHg, or taking antihypertensives',
    unit: 'mmHg',
    biological_link_zh: '高胰島素血症刺激腎小管鈉離子重吸收，同時交感神經過度興奮、血管內皮 NO 生成酶（eNOS）受抑，周邊血管阻力增加。',
    biological_link_en: 'Endothelial dysfunction and sympathetic hyperactivation; linked to sodium retention and alcohol.',
  },
  {
    id: 'MET-03',
    name_zh: '空腹血糖偏高 (Fasting Glucose)',
    name_en: 'Elevated Fasting Plasma Glucose',
    threshold_zh: '空腹血糖 ≥ 100 mg/dL，或正服用降血糖藥物',
    threshold_en: 'Fasting glucose ≥ 100 mg/dL, or taking antidiabetic medication',
    unit: 'mg/dL',
    biological_link_zh: '肝臟胰島素阻抗导致糖質新生（Gluconeogenesis）失去煞車，同時骨骼肌 GLUT4 葡萄糖轉運蛋白轉移效率顯著衰退。',
    biological_link_en: 'Hepatic insulin resistance and dysregulated gluconeogenesis with impaired muscle GLUT4 translocation.',
  },
  {
    id: 'MET-04',
    name_zh: '空腹三酸甘油酯偏高 (Triglycerides)',
    name_en: 'Elevated Fasting Triglycerides',
    threshold_zh: 'TG ≥ 150 mg/dL，或正服用降三酸甘油酯藥物',
    threshold_en: 'Triglycerides ≥ 150 mg/dL, or on lipid-lowering pharmacotherapy',
    unit: 'mg/dL',
    biological_link_zh: '肝臟過量合成大顆粒 VLDL，且脂蛋白脂肪酶 (LPL) 活性受抑清除延遲，直接驅動小而緻密 LDL (sdLDL) 顆粒暴增。',
    biological_link_en: 'Hepatic VLDL overproduction and impaired lipolysis from ethanol/fructose NADH overload.',
  },
  {
    id: 'MET-05',
    name_zh: '高密度脂蛋白膽固醇偏低 (HDL-C)',
    name_en: 'Reduced HDL Cholesterol',
    threshold_zh: '男性 < 40 mg/dL，女性 < 50 mg/dL',
    threshold_en: 'Male < 40 mg/dL, Female < 50 mg/dL',
    unit: 'mg/dL',
    biological_link_zh: 'CETP 膽固醇酯轉運蛋白過度交換膽固醇至富含 TG 的顆粒中，導致 HDL 顆粒迅速被腎臟降解，全身逆向膽固醇轉運（RCT）防護傘崩潰。',
    biological_link_en: 'Attenuated reverse cholesterol transport capacity; accelerated by trans fats, smoking, and sedentary habit.',
  },
];

// ── 動脈粥狀硬化 5 階段病理機轉 (Atherosclerosis Pathogenesis Cascade) ──
export const ATHEROSCLEROSIS_STAGES: AtherosclerosisStage[] = [
  {
    stage_number: 1,
    name_zh: '第 1 階段：內皮剪切力損傷與通透性增加',
    name_en: 'Stage 1: Endothelial Shear Stress Injury & Permeability',
    pathophysiological_mechanism_zh:
      '血流分支處或分岔處低壁剪切力 (Low Shear Stress)、長期高血壓、吸菸毒素或高血糖糖化終產物 (AGEs)，破壞血管內皮糖萼層 (Glycocalyx)。內皮細胞間隙擴大，細胞黏附分子（VCAM-1, ICAM-1）高表達。',
    clinical_manifestation_zh: '無自覺症狀。血管舒張功能（FMD）微幅受損，微白蛋白尿可能是全身微血管內皮損傷的早期信號。',
    biomarkers_zh: ['高敏感 C-反應蛋白 (hs-CRP) 輕微上升', '內皮素-1 (Endothelin-1) 升高', '微白蛋白尿 (UACR 30-300 mg/g)'],
    imaging_features: '常規超音波與電腦斷層無法察覺，屬於分子層級功能性病變。',
    oxford_level_1a_interventions_zh: [
      '戒菸（徹底阻斷自由基對內皮 eNOS 之直接破壞）',
      '嚴格將血壓控制在 < 120/80 mmHg（TSOC 2022 目標）',
      '地中海飲食：特級初榨橄欖油多酚與富含硝酸鹽之深綠蔬菜，活化內皮 NO 合成',
    ],
  },
  {
    stage_number: 2,
    name_zh: '第 2 階段：ApoB 顆粒次內皮滯留與蛋白聚醣嵌合',
    name_en: 'Stage 2: Subendothelial ApoB Entrapment & Proteoglycan Binding',
    pathophysiological_mechanism_zh:
      '所有攜帶 ApoB 的致病脂蛋白顆粒（主要為 LDL、殘餘 VLDL 與 Lp(a)），直徑均小於 70 nm，可穿過受損內皮。ApoB-100 上帶正電的鹼性胺基酸殘基與血管內膜基質帶負電的硫酸蛋白聚醣（Proteoglycans）發生靜電親和結合，產生「滯留反應 (Response-to-Retention)」。',
    clinical_manifestation_zh: '完全無症狀。此時血液中若 ApoB 顆粒濃度過高，滯留速率將呈幾何級數暴增。',
    biomarkers_zh: ['載脂蛋白 ApoB > 80 mg/dL', '非高密度脂蛋白膽固醇 (non-HDL-C) > 100 mg/dL', 'Lp(a) > 50 mg/dL'],
    imaging_features: '高解析度血管內超音波 (IVUS) 偶可見極早期內膜增厚（Intima-Media Thickness, IMT > 0.9 mm）。',
    oxford_level_1a_interventions_zh: [
      'Statin（他汀類藥物）處方：上調肝細胞表面 LDL 受體，強力清除循環中過多 ApoB 顆粒',
      '限制飽和脂肪酸（SFA）至總熱量 < 6-7%，解除飽和脂肪對肝臟 LDL 受體之降解抑制',
      '水溶性膳食纖維（燕麥 β-葡聚糖、洋車前子每日 10g+）：螯合膽酸加速膽固醇代謝排泄',
    ],
  },
  {
    stage_number: 3,
    name_zh: '第 3 階段：oxLDL 氧化誘發與巨噬細胞泡沫化形成脂質條紋',
    name_en: 'Stage 3: oxLDL DAMP Cascade & Scavenger Receptor Foam Cells',
    pathophysiological_mechanism_zh:
      '滯留在次內皮空間的脂蛋白失去血液抗氧化劑保護，被活性氧（ROS）與脂氧化酶氧化修飾為 oxLDL。oxLDL 扮演損害相關分子模式 (DAMP)，刺激內皮釋放 MCP-1 招募單核球。單核球分化為巨噬細胞，透過清道夫受體（CD36, SR-A）無限制吞噬 oxLDL，細胞內充斥膽固醇酯，轉化為「泡沫細胞 (Foam Cells)」並沉積為脂質條紋 (Fatty Streak)。',
    clinical_manifestation_zh: '依然大多無自覺症狀，但病變已在主動脈根部與冠狀動脈分叉處廣泛成形。青年期即可出現。',
    biomarkers_zh: ['氧化型低密度脂蛋白 (oxLDL)', 'hs-CRP 1.0 – 3.0 mg/L', '骨髓過氧化物酶 (MPO) 偏高'],
    imaging_features: '頸動脈超音波可見內膜明顯增厚或微小軟斑塊；冠狀動脈血管攝影可能仍呈陰性。',
    oxford_level_1a_interventions_zh: [
      'Ezetimibe（依折麥布）併用 Statin：雙重路徑阻斷腸道吸收與肝臟合成，減少循環促發炎致密顆粒',
      '有氧運動 Zone 2（每週 150–300 分鐘）：提高粒線體抗氧化酵素 SOD 與過氧化氫酶活性',
      '絕對戒絕反式脂肪酸：反式脂肪直接加劇巨噬細胞清道夫受體對 oxLDL 的異常吞噬與泡沫化',
    ],
  },
  {
    stage_number: 4,
    name_zh: '第 4 階段：平滑肌細胞遷移、纖維帽生成與壞死核心擴大',
    name_en: 'Stage 4: Fibrous Cap Proliferation & Necrotic Core Expansion',
    pathophysiological_mechanism_zh:
      '中膜平滑肌細胞 (VSMC) 受到血小板源生長因子 (PDGF) 刺激，表型轉化並遷移至內膜，分泌膠原蛋白與彈性纖維，在脂質池上方編織出一層「纖維帽 (Fibrous Cap)」。同時，深層泡沫細胞因膽固醇過載大量凋亡壞死（Necroptosis），釋放結晶狀膽固醇與發炎因子，形成不穩定的壞死脂質核心 (Necrotic Core)。此時動脈壁開始向外代償性重塑（Glagov Remodeling），管腔尚未狹窄。',
    clinical_manifestation_zh: '早期依然可能無症狀；晚期運動時可能出現穩定型心絞痛（胸口壓榨感、放射至左肩或下頷，休息 5 分鐘緩解）。',
    biomarkers_zh: ['hs-CRP > 3.0 mg/L (高度全身血管發炎)', '脂蛋白相關磷脂酶 A2 (Lp-PLA2) 升高'],
    imaging_features: '冠狀動脈鈣化掃描 (CAC Scan) 呈現陽性 (Agatston Score 1–399)；冠狀動脈電腦斷層血管造影 (CCTA) 可清晰觀察纖維斑塊與脂質核心厚度。',
    oxford_level_1a_interventions_zh: [
      '高強度 Statin（如 Atorvastatin 40-80mg 或 Rosuvastatin 20-40mg）：強力穩定纖維帽結構',
      'PCSK9 抑制劑（單株抗體 Evolocumab / Alirocumab）：將 LDL-C 強效壓制至 < 55 mg/dL，促使動脈粥狀硬化斑塊體積逆轉退縮（Plaque Regression）',
      '抗發炎介入：控制同半胱胺酸 (Homocysteine < 10 μmol/L)，補充活性葉酸 B9 與甲基 B12',
    ],
  },
  {
    stage_number: 5,
    name_zh: '第 5 階段：基質金屬蛋白酶降解、纖維帽破裂與急性動脈血栓',
    name_en: 'Stage 5: Matrix Metalloproteinase Thinning, Plaque Rupture & Acute Thrombosis',
    pathophysiological_mechanism_zh:
      '發炎巨噬細胞大量分泌基質金屬蛋白酶（MMP-1, MMP-9），持續消化膠原蛋白，導致纖維帽變得菲薄脆弱（薄帽纖維性斑塊 TCFA < 65 μm）。在血壓驟升、交感神經劇烈波動或斑塊內出血時，纖維帽撕裂！壞死核心中高促凝血活性的「組織因子 (Tissue Factor)」瞬間暴露於血流，秒級啟動外源性凝血瀑布，血小板聚集交織纖維蛋白，數分鐘內形成閉塞性急性血栓。',
    clinical_manifestation_zh: '急性冠心症 (ACS)！急性 ST 段上升型心肌梗塞 (STEMI)、非 ST 段上升心肌梗塞 (NSTEMI)、猝死或急性缺血性中風。突發劇烈胸痛持續 > 20 分鐘、冒冷汗、瀕死感。',
    biomarkers_zh: ['高敏感心肌肌鈣蛋白 (hs-cTnI / hs-cTnT) 急遽飆升', '肌酸激酶同工酶 (CK-MB) 異常', 'D-Dimer 陽性'],
    imaging_features: '心導管血管造影 (Coronary Angiography) 顯示冠狀動脈急性閉塞（TIMI 0–1 級血流）；光學同調斷層掃描 (OCT) 可見纖維帽破裂口與附壁紅/白血栓。',
    oxford_level_1a_interventions_zh: [
      '緊急心導管再灌流術 (Primary PCI)：90 分鐘黃金門口-氣球擴張時間 (Door-to-Balloon Time)',
      '雙重抗血小板治療 (DAPT)：Aspirin ＋ P2Y12 抑制劑（Ticagrelor / Prasugrel）',
      '長期次級預防：LDL-C 嚴格維持 < 40–55 mg/dL，合併 SGLT2i 或 GLP-1RA 降低後續全因死亡率',
    ],
  },
];

// ── 現代脂質學核心指標檔 (Modern Lipidology Biomarkers) ──
export const MODERN_LIPID_PROFILES: LipidBiomarkerProfile[] = [
  {
    id: 'LIP-01',
    name_zh: '載脂蛋白 B (ApoB-100)',
    name_en: 'Apolipoprotein B (ApoB)',
    optimal_target_zh: '< 65 – 80 mg/dL (極高風險患者目標 < 55 mg/dL)',
    high_risk_threshold_zh: '> 100 mg/dL',
    unit: 'mg/dL',
    atherogenic_role_zh:
      '現代動脈硬化醫學真正的「致病顆粒總數身分證」。每個 LDL、VLDL、IDL 與 Lp(a) 顆粒表面「恰好只鑲嵌 1 個 ApoB 分子」。ApoB 才是決定多少致病顆粒能穿透內皮的最根本物理變因。',
    clinical_superiority_zh:
      '完全超越 LDL-C！在代謝症候群、糖尿病或高三酸甘油酯患者中，LDL 顆粒往往萎縮變小（sdLDL），膽固醇含量減少，導致 LDL-C 數值看起來正常（假象安全），但 ApoB 顆粒計數卻極高（嚴重漏診）。',
    evidence_grade: 'A',
  },
  {
    id: 'LIP-02',
    name_zh: '低密度脂蛋白膽固醇 (LDL-C)',
    name_en: 'Low-Density Lipoprotein Cholesterol',
    optimal_target_zh: '一般健康者 < 100 mg/dL，高風險 < 70 mg/dL，極高風險/已確診 CAD < 55 mg/dL',
    high_risk_threshold_zh: '≥ 160 – 190 mg/dL (≥ 190 需高度懷疑家族性高膽固醇血症 FH)',
    unit: 'mg/dL',
    atherogenic_role_zh:
      '傳統臨床最常用指標。反映的是包在 LDL 顆粒內部「膽固醇的總質量/重量」，而非致病顆粒的物理個數。',
    clinical_superiority_zh:
      '仍為各大國際指引（ACC/AHA/ESC/TSOC）的一線治療達標依據；但必須理解其在三酸甘油酯偏高時存在嚴重「顆粒濃度不一致 (Discordance)」盲區。',
    evidence_grade: 'A',
  },
  {
    id: 'LIP-03',
    name_zh: '非高密度脂蛋白膽固醇 (non-HDL-C)',
    name_en: 'Non-High-Density Lipoprotein Cholesterol',
    optimal_target_zh: '< 100 mg/dL (極高風險 < 85 mg/dL)',
    high_risk_threshold_zh: '> 130 mg/dL',
    unit: 'mg/dL',
    atherogenic_role_zh:
      '計算公式：總膽固醇 (TC) 減去保護性 HDL-C。囊括了所有致動脈粥狀硬化顆粒（LDL + VLDL + IDL + Lp(a)）中承載的所有膽固醇質量。',
    clinical_superiority_zh:
      '不需額外花費即可計算之優質指標。比 LDL-C 更能反映殘餘脂蛋白（Remnants）所帶來的致病風險；在無法檢驗 ApoB 的醫療院所，non-HDL-C 是最佳替代指針。',
    evidence_grade: 'A',
  },
  {
    id: 'LIP-04',
    name_zh: '三酸甘油酯 / HDL-C 比值 (TG/HDL Ratio)',
    name_en: 'Triglyceride-to-HDL Ratio',
    optimal_target_zh: '< 2.0 (以 mg/dL 計)',
    high_risk_threshold_zh: '> 3.0 (強烈提示胰島素阻抗與小緻密 LDL 暴增)',
    unit: '比值無單位',
    atherogenic_role_zh:
      '反映肝臟代謝健康、脂蛋白脂肪酶 (LPL) 活力以及膽固醇酯轉運蛋白 (CETP) 異常交換的動態綜合指標。',
    clinical_superiority_zh:
      '臨床上最靈敏、成本最低的「小而緻密低密度脂蛋白 (sdLDL)」與「全身胰島素阻抗」代用預測標記。比值高於 3.0 者，其發生心血管事件的風險比低比值者高出 2–3 倍。',
    evidence_grade: 'B',
  },
  {
    id: 'LIP-05',
    name_zh: '脂蛋白 (a) [Lp(a)]',
    name_en: 'Lipoprotein(a)',
    optimal_target_zh: '< 30 mg/dL (或 < 75 nmol/L)',
    high_risk_threshold_zh: '> 50 mg/dL (或 > 125 nmol/L)',
    unit: 'mg/dL 或 nmol/L',
    atherogenic_role_zh:
      '由一個 LDL 顆粒外側透過二硫鍵結合一個特殊的「載脂蛋白(a) [Apo(a)]」。Apo(a) 結構與纖維蛋白溶酶原高度同源，兼具：① 滲透動脈壁致動脈粥狀硬化、② 攜帶大量氧化磷脂促血管發炎、③ 競爭性抑制血栓溶解導致急性心梗猝死的三合一毒性。',
    clinical_superiority_zh:
      '80%–90% 由 LPA 基因完全決定，飲食生活型態與常規 Statin 均無法降低（Statin 甚至可能使其輕微上升 10%）。終身只需檢測一次即可確認先天遺傳風險！新一代反義寡核苷酸 (ASO) 靶向藥物正在三期臨床階段。',
    evidence_grade: 'A',
  },
  {
    id: 'LIP-06',
    name_zh: '殘餘膽固醇 (Remnant Cholesterol)',
    name_en: 'Remnant Lipoprotein Cholesterol',
    optimal_target_zh: '< 20 – 24 mg/dL',
    high_risk_threshold_zh: '> 30 mg/dL',
    unit: 'mg/dL',
    atherogenic_role_zh:
      '計算公式：總膽固醇 (TC) 減去 HDL-C 減去 LDL-C。代表乳糜微粒殘餘物與 VLDL 殘餘物所攜帶的膽固醇。',
    clinical_superiority_zh:
      '丹麥哥本哈根大學大規模前瞻性世代研究證實：殘餘膽固醇每上升 1 mmol/L，缺血性心臟病風險上升 2.8 倍。殘餘脂蛋白無需經過氧化修飾即可直接被巨噬細胞吞噬！',
    evidence_grade: 'A',
  },
];

// ── 冠狀動脈鈣化積分 (CAC Agatston Score) 臨床路徑 ──
export const CAC_STRATIFICATIONS: CacStratification[] = [
  {
    agatston_score_range: 'CAC = 0 分 (Power of Zero)',
    risk_category_zh: '極低心血管風險 (Very Low Risk)',
    ten_year_ascvd_risk_zh: '< 1% – 2% (未來 10 年心臟事件發生率極罕見，約 0.1%/年)',
    statin_recommendation_zh: '除非有明確家族早發 CAD、現正吸菸或重度糖尿病，否則可安全暫緩 Statin 藥物處方。',
    lifestyle_and_followup_zh: '維持健康生活型態、低飽和脂肪飲食與規律運動，建議 3–5 年後再行追蹤。',
    clinical_pearl_zh: '「零鈣化積分的治癒力」：在多項大規模臨床試驗中，CAC 0 分患者即便 LDL-C 偏高，短期心梗死亡率依然極低。',
  },
  {
    agatston_score_range: 'CAC = 1 – 99 分',
    risk_category_zh: '輕度動脈硬化斑塊負荷 (Mild Plaque Burden)',
    ten_year_ascvd_risk_zh: '約 2% – 5% (證實體內已存在明確的亞臨床硬化病灶)',
    statin_recommendation_zh: '強烈建議啟動 Statin 介入（至少中度強度），目標將 LDL-C 壓制至 < 70–100 mg/dL。',
    lifestyle_and_followup_zh: '啟動生活型態防護：嚴格控制血壓 < 120/80 mmHg，戒菸，維持每週 150 分鐘 Zone 2 訓練。',
    clinical_pearl_zh: '鈣化本身是身體修復斑塊的「傷痕疤痕組織」；Statin 治療後鈣化積分可能上升（因為 Statin 會促進斑塊緻密鈣化穩定防止破裂），追蹤應看非鈣化軟斑塊體積而非僅看 CAC 總分。',
  },
  {
    agatston_score_range: 'CAC = 100 – 399 分',
    risk_category_zh: '中度顯著動脈硬化負荷 (Moderate Plaque Burden)',
    ten_year_ascvd_risk_zh: '約 6% – 12% (心血管疾病高風險族群)',
    statin_recommendation_zh: '無庸置疑之 Statin 強適應症！建議中至高強度 Statin，若 LDL-C 未達 < 70 mg/dL 應併用 Ezetimibe。',
    lifestyle_and_followup_zh: '考慮常規併用低劑量 Aspirin (100mg/day) 次級/初級預防（需排除胃腸道出血風險）。',
    clinical_pearl_zh: '此階段冠狀動脈往往存在多處動脈粥狀硬化病灶，心肌缺血閾值降低，運動時應配合心率監測避免突發超負荷。',
  },
  {
    agatston_score_range: 'CAC ≥ 400 分 (或年齡性別百分位 > 75%)',
    risk_category_zh: '重度廣泛動脈硬化負荷 (Extensive Plaque Burden)',
    ten_year_ascvd_risk_zh: '> 15% – 25%+ (心血管事件極高危險群，相當於已罹患心臟病患者)',
    statin_recommendation_zh: '全力以赴的最高強度藥物療法：Atorvastatin 40-80mg 或 Rosuvastatin 20-40mg ＋ Ezetimibe 10mg，必要時加用 PCSK9 抑制劑，強效將 LDL-C 降至 < 55 mg/dL。',
    lifestyle_and_followup_zh: '強烈建議轉診心臟內科專科醫師，安排運動心電圖或心肌灌注核醫掃描 (MPI) 評估是否存在無症狀心肌缺血。',
    clinical_pearl_zh: 'CAC ≥ 400 分代表血管壁廣泛硬化，此類患者年心血管事件率達 2%–3%，絕不可單純依賴「食療降膽固醇」，現代藥物治療是拯救生命的基石。',
  },
];

// ── 2023 AHA CKM (心血管-腎臟-代謝) 症候群分期 ──
export const CKM_STAGES_DATA: CkmStageInfo[] = [
  {
    stage: 0,
    title_zh: 'Stage 0 · 無危險因子 (No Risk Factors)',
    subtitle_zh: '健康基準態：正常體重、正常血壓、正常血糖血脂、正常腎功能',
    criteria_zh: ['BMI < 24 kg/m²（亞洲標準）且腰圍正常', '血壓 < 120/80 mmHg', '空腹血糖正常且無糖化血色素偏高', 'eGFR ≥ 90 mL/min/1.73m² 且無蛋白尿'],
    primary_goals_zh: ['維持終身良好生活型態', '每 3–5 年定期健康檢查', '充足睡眠與適當運動維持血管內皮彈性'],
    pharmacological_options_zh: ['無需藥物介入'],
  },
  {
    stage: 1,
    title_zh: 'Stage 1 · 超重與糖耐量異常 (Excess Adiposity / Prediabetes)',
    subtitle_zh: '代謝紊亂萌芽期：腹部脂肪增加、空腹血糖異常或葡萄糖耐受不良',
    criteria_zh: ['BMI ≥ 24 kg/m² 或腰圍超標（男 ≥90cm, 女 ≥80cm）', '空腹血糖 100–125 mg/dL 或 HbA1c 5.7%–6.4%', '三酸甘油酯 ≥ 135–150 mg/dL'],
    primary_goals_zh: ['體重減輕 5%–10% 逆轉早期胰島素阻抗', '啟動肌力抗阻訓練以擴大肌肉葡萄糖儲存池', '限制精緻糖、果糖與超加工食品'],
    pharmacological_options_zh: ['生活型態為主', '高度胰島素阻抗者可考慮 Metformin 介入'],
  },
  {
    stage: 2,
    title_zh: 'Stage 2 · 代謝危險因子或腎臟病變 (Metabolic Factors / CKD)',
    subtitle_zh: '全身器官受累期：確診第 2 型糖尿病、臨床高血壓、高三酸甘油酯或慢性腎病',
    criteria_zh: ['確診高血壓（BP ≥ 130/80 mmHg）', '確診第 2 型糖尿病（HbA1c ≥ 6.5%）', '中至重度慢性腎病（eGFR 30–59 或微白蛋白尿 UACR 30–300 mg/g）', '重度高三酸甘油酯（TG ≥ 200–500 mg/dL）'],
    primary_goals_zh: ['血壓嚴格達標 < 130/80 mmHg', 'LDL-C 降至目標區間（至少 < 70–100 mg/dL）', '保護腎絲球微血管過濾障壁防止腎功能惡化'],
    pharmacological_options_zh: ['ACEi / ARB 類藥物（降血壓兼具腎臟保護）', 'SGLT2 抑制劑（排糖、排鈉、強效心腎保護）', 'GLP-1 受體促效劑（保護血管、減重、降心血管事件）', 'Statin 降血脂一線治療'],
  },
  {
    stage: 3,
    title_zh: 'Stage 3 · 亞臨床心血管疾病 (Subclinical CVD in CKM)',
    subtitle_zh: '隱匿性心臟病變期：尚未有胸痛氣喘症狀，但精密檢查已發現心臟結構受損或嚴重動脈硬化',
    criteria_zh: ['冠狀動脈鈣化積分 CAC ≥ 100 分', '高敏感心肌肌鈣蛋白 (hs-cTn) 或 BNP / NT-proBNP 持續微幅上升', '心臟超音波可見左心室肥厚 (LVH) 或左心室舒張功能異常', '高危險性慢性腎病（eGFR < 30 或大量蛋白尿 UACR > 300 mg/g）'],
    primary_goals_zh: ['防止亞臨床病灶進一步發展為心肌梗塞或心臟衰竭', '積極抗發炎與動脈硬化斑塊穩定化', '延緩進入透析末期腎病時程'],
    pharmacological_options_zh: ['全面強化高強度 Statin ＋ Ezetimibe ＋ PCSK9i', 'SGLT2i ＋ 非類固醇型鹽類皮質素受體拮抗劑 (Finerenone)', '積極心臟專科共照追蹤'],
  },
  {
    stage: 4,
    title_zh: 'Stage 4 · 臨床心血管疾病 (Clinical CVD with CKM Syndrome)',
    subtitle_zh: '終末器官衰竭期：已發生心肌梗塞、心絞痛、中風、周邊動脈阻塞 (PAD) 或心臟衰竭 (HFpEF/HFrEF)',
    criteria_zh: ['已確診冠狀動脈心臟病 (CAD) 或曾接受支架置放 / 冠狀動脈繞道手術', '確診心臟衰竭（射出分率保留型 HFpEF 或射出分率降低型 HFrEF）', '確診缺血性中風或暫時性腦缺血 (TIA)', '合併末期腎臟病 (ESRD)'],
    primary_goals_zh: ['次級預防：降低猝死率與心衰竭再住院率', '全方位跨科多專科團隊 (MDT) 聯合照護', '心臟復健與體能安全重塑'],
    pharmacological_options_zh: ['心衰四巨頭（SGLT2i ＋ ARNI/ACEi ＋ 乙型阻斷劑 Beta-Blocker ＋ MRA）', '雙聯/單聯抗血小板藥物', 'LDL-C 嚴格控制至 < 55 mg/dL（甚至 < 40 mg/dL）'],
  },
];

// ── 心血代謝常見迷思粉碎機 (Cardiometabolic Myth Busters) ──
export interface CardiometabolicMythItem {
  id: string;
  myth_claim: string;
  reality_truth: string;
  biochemical_mechanism: string;
  action_pearl: string;
}

export const CARDIOMETABOLIC_MYTHS: CardiometabolicMythItem[] = [
  {
    id: 'C-MYTH-01',
    myth_claim: '「我的總膽固醇數值在正常範圍內，所以我絕不可能發生心肌梗塞？」',
    reality_truth: '超過 50% 發生急性心肌梗塞送急診的患者，其 LDL-C 都在常規參考值正常範圍內！',
    biochemical_mechanism:
      '膽固醇數值 (mg/dL) 是指脂蛋白裡包裝的膽固醇重量，而非致病顆粒總數。在代謝症候群患者中，LDL 顆粒往往變小而緻密（sdLDL），總膽固醇不高，但顆粒數量（ApoB）卻高得驚人，且極易穿透內皮氧化形成血栓。',
    action_pearl: '務必額外自費抽血檢驗 ApoB（目標 < 80 mg/dL）或非高密度脂蛋白膽固醇 (non-HDL-C)，並搭配 CAC 冠狀動脈鈣化掃描以獲得真實血管硬化全景。',
  },
  {
    id: 'C-MYTH-02',
    myth_claim: '「去醫院量血壓 140/90 只是因為我在診間太緊張（白袍高血壓），回家量就正常，所以完全不需要管它？」',
    reality_truth: '「白袍高血壓」並非良性無害！大規模 10 年追蹤研究顯示，白袍高血壓患者的心血管死亡風險是正常血壓者的 1.8 倍。',
    biochemical_mechanism:
      '壓力環境下血壓驟升，反映大腦交感神經高反應性與血管平滑肌收縮代償彈性已開始變差。此外，還有更危險的「隱匿性高血壓（Masked HTN）」：在醫院正常，回家或上班時血壓飆高。',
    action_pearl: '落實台灣心臟學會推薦的「722 居家量測法則」（連續 7 天、早晚各 1 次、每次量 2 遍取平均），以晨起血壓為主要診斷基準。',
  },
  {
    id: 'C-MYTH-03',
    myth_claim: '「吃蛋黃會讓血液膽固醇暴增，所以心臟不好的人千萬不能吃雞蛋？」',
    reality_truth: '對 75% 的健康人而言，飲食中的膽固醇對血液 LDL-C 濃度的影響微乎其微。',
    biochemical_mechanism:
      '人體血液中 80% 以上的膽固醇是由肝臟自身經由 HMG-CoA 還原酶從頭合成。真正刺激肝臟 LDL 受體下調、導致血液 LDL 堆積的罪魁禍首是「飽和脂肪酸 (SFA)」和「反式脂肪」，而非雞蛋本身所含的膽固醇。',
    action_pearl: '一般健康成人每天吃 1–2 顆全蛋是完全安全的優質蛋白質與膽鹼來源；應優先戒除高飽和脂肪的酥皮、加工肉品與高溫反覆油炸物。',
  },
  {
    id: 'C-MYTH-04',
    myth_claim: '「每天喝一小杯紅酒可以活血化瘀、保護心血管？」',
    reality_truth: '牛津大學與刺胳針 (The Lancet) 大規模研究證實：酒精對心血管健康「沒有任何安全劑量」！所謂紅酒保護心臟是早期觀察性研究的混雜謬誤。',
    biochemical_mechanism:
      '酒精（乙醇）代謝為一級致癌物乙醛，會直接破壞心肌粒線體、誘發心房顫動 (Holiday Heart Syndrome)，並顯著促使次晨血壓反射性飆升（KP-A-029）。紅酒中所含的微量白藜蘆醇根本不足以抵消乙醇的生化心血管毒性。',
    action_pearl: '切勿為了「護心」而開始飲酒。護心應優先依靠地中海飲食、特級初榨橄欖油、規律 Zone 2 有氧運動與充足慢波睡眠。',
  },
];
