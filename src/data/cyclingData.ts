import { CyclingTopic } from '../types';

export interface CogganPowerZone {
  zone: string;
  name_zh: string;
  name_en: string;
  ftp_pct_range: string;
  physiological_adaptation_zh: string;
  physiological_adaptation_en: string;
  target_metabolic_system: string;
}

export const COGGAN_POWER_ZONES: CogganPowerZone[] = [
  {
    zone: 'Z1',
    name_zh: 'Zone 1 · 動態恢復 (Active Recovery)',
    name_en: 'Zone 1 · Active Recovery',
    ftp_pct_range: '< 55% FTP',
    physiological_adaptation_zh: '微血管血流灌注沖刷肌肉代謝廢物、加速組織修復、神經肌肉低張力舒緩。',
    physiological_adaptation_en: 'Capillary perfusion to flush metabolic byproducts, tissue recovery, and neuromuscular calming.',
    target_metabolic_system: '游離脂肪酸低耗能氧化',
  },
  {
    zone: 'Z2',
    name_zh: 'Zone 2 · 基礎耐力 (Endurance Base)',
    name_en: 'Zone 2 · Endurance Base',
    ftp_pct_range: '56% – 75% FTP',
    physiological_adaptation_zh: '粒線體生物合成 (PGC-1α)、增生微血管密度、提高脂肪氧化率 (FatMax)、擴大血漿容量。',
    physiological_adaptation_en: 'Mitochondrial biogenesis (PGC-1a), capillary angiogenesis, elevated FatMax, and plasma volume expansion.',
    target_metabolic_system: '第一型慢肌脂肪酸氧化主導',
  },
  {
    zone: 'Z3',
    name_zh: 'Zone 3 · 節奏騎行 (Tempo)',
    name_en: 'Zone 3 · Tempo',
    ftp_pct_range: '76% – 90% FTP',
    physiological_adaptation_zh: '提升肌醣原儲存量、增進有氧心輸出量、強化巡航速度維持心智耐力。',
    physiological_adaptation_en: 'Elevates muscular glycogen storage, cardiac stroke volume, and mental stamina for sustained pace.',
    target_metabolic_system: '醣類與脂肪各半混合氧化',
  },
  {
    zone: 'Z4',
    name_zh: 'Zone 4 · 乳酸閾值 (Lactate Threshold / Sweet Spot)',
    name_en: 'Zone 4 · Lactate Threshold / Sweet Spot',
    ftp_pct_range: '91% – 105% FTP (甜蜜點為 88–94% FTP)',
    physiological_adaptation_zh: '大幅提升單羧酸轉運蛋白 (MCT1/4)、增強骨骼肌氫離子緩衝、推升 FTP 功率天花板。',
    physiological_adaptation_en: 'Upregulates MCT1/4 transporters, expands muscular H+ buffering, and pushes FTP threshold ceiling.',
    target_metabolic_system: '有氧酵解極限與乳酸清除平衡',
  },
  {
    zone: 'Z5',
    name_zh: 'Zone 5 · 最大攝氧量 (VO2 max)',
    name_en: 'Zone 5 · VO2 max Intervals',
    ftp_pct_range: '106% – 120% FTP',
    physiological_adaptation_zh: '最大心肌每搏輸出量、肺泡微血管血流極大化擴張、徵召高階 IIa 型肌纖維。',
    physiological_adaptation_en: 'Maximal cardiac stroke volume, pulmonary capillary expansion, and recruitment of fast-twitch Type IIa fibers.',
    target_metabolic_system: '極限有氧無氧混合超負荷',
  },
  {
    zone: 'Z6',
    name_zh: 'Zone 6 · 無氧容量 (Anaerobic Capacity)',
    name_en: 'Zone 6 · Anaerobic Capacity',
    ftp_pct_range: '121% – 150% FTP',
    physiological_adaptation_zh: '骨骼肌磷酸肌酸 (ATP-CP) 快速重組、無氧糖酵解酵素活化、陡坡進攻爆發力。',
    physiological_adaptation_en: 'ATP-CP rapid resynthesis, glycolytic enzyme upregulation, and explosive steep climb attacking power.',
    target_metabolic_system: '快速無氧糖酵解',
  },
  {
    zone: 'Z7',
    name_zh: 'Zone 7 · 神經肌肉衝刺爆發 (Neuromuscular Power)',
    name_en: 'Zone 7 · Neuromuscular Power',
    ftp_pct_range: '> 150% FTP (全力全力衝刺)',
    physiological_adaptation_zh: '高閾值運動單位瞬間同步徵召 (Motor Unit Synchronization)、終點衝刺極限瓦數。',
    physiological_adaptation_en: 'Instant high-threshold motor unit synchronization and absolute sprint peak wattage.',
    target_metabolic_system: '高能磷酸原系統 (ATP-CP)',
  },
];

export const CYCLING_TOPICS: CyclingTopic[] = [
  {
    id: 'CYC-01',
    title_zh: '踩踏踏頻 (Cadence 85–95 rpm) 生物力學：心血管幫浦與肌肉負載的分流',
    title_en: 'Cadence Biomechanics (85–95 rpm): Shifting Load Between Cardiovascular & Muscular Systems',
    category: 'CADENCE_PEDALING',
    one_liner_zh: '重齒比慢踩（<70 rpm）耗損肌肉肝醣；高踏頻輕踩（85–95 rpm）將負擔轉移至耐疲勞的心肺血管系統。',
    one_liner_en: 'Grinding low cadence (<70 rpm) burns fast muscular glycogen; spinning (85-95 rpm) transfers metabolic load to the cardio engine.',
    evidence_grade: 'A',
    principles_zh: [
      '自行車踩踏功率公式：功率 (Watts) = 力矩 (Torque, N·m) × 角速度 (Cadence, rad/s)。同一功率輸出下，踏頻越低，踏板單次所受垂直下壓力矩越大。',
      '低踏頻重踩（<65 rpm）會大幅提高肌纖維張力，強行徵召易疲勞的快肌纖維 (Type II)，加速肌醣原消耗與乳酸堆積。',
      '維持 85–95 rpm 踏頻時，單次踩踏力矩下降 30%，依賴慢肌纖維 (Type I) 藉由「骨骼肌幫浦作用 (Skeletal Muscle Pump)」加速靜脈回流至心臟，提高耐力持久性。',
    ],
    principles_en: [
      'Power equation: Power (Watts) = Torque (N*m) * Angular Velocity (Cadence, rad/s). At equal power, a lower cadence demands dramatically higher pedal torque.',
      'Grinding high gears (<65 rpm) multiplies intramuscular pressure, forcing recruitment of fatigable Type II fibers and exhausting muscular glycogen.',
      'Spinning at 85-95 rpm reduces pedal peak torque by 30%, relying on Type I fibers and the skeletal muscle pump to promote venous return to the heart.',
    ],
    biomechanical_data_zh: [
      '踏板施力死點：踩踏時鐘 12 點鐘（上死點 TDC）與 6 點鐘（下死點 BDC）為有效力矩為零的死點。',
      '踩踏平順度 (Pedaling Smoothness)：業餘騎士主要在 1–4 點鐘產生下踩推力；精英車手在 11 點鐘提早向前推踩 (Kick over the top)，有效消除死點阻力。',
      '膝關節髕股關節面壓力：踩踏踏頻低於 60 rpm 且大齒盤爬坡時，髕骨下方壓力急遽增加 40%，為膝前疼痛 (Patellofemoral pain) 主因。',
    ],
    biomechanical_data_en: [
      'Dead spots: 12 o\'clock (Top Dead Center TDC) and 6 o\'clock (Bottom Dead Center BDC) produce zero effective tangential torque.',
      'Pedaling smoothness: Amateurs solely push down from 1-4 o\'clock; elites initiate pedal scraping forward at 11 o\'clock to eliminate dead spot resistance.',
      'Patellofemoral joint stress: Grinding up steep hills <60 rpm spikes knee contact pressures by >40%, the primary trigger of anterior knee pain.',
    ],
    action_guidelines_zh: [
      '齒比預判切換：遇到爬坡前 10–20 公尺即提早降檔變速，使進入坡道瞬間踏頻仍平順維持在 80 rpm 以上，嚴禁重齒死撐。',
      '單腳踩踏訓練 (Single-Leg Drills)：在訓練台進行單腳踩踏 60 秒（阻力調輕），感受提早由 11 點鐘向前刮雪推踏的平順神經肌肉感知。',
      '巡航踏頻靶區：平路定速巡航鎖定 88–94 rpm；長距離爬坡鎖定 75–85 rpm。',
    ],
    action_guidelines_en: [
      'Anticipatory shifting: Downshift 10-20 meters before reaching an incline to sustain cadence >80 rpm; avoid bogging down in heavy gears.',
      'Single-leg drill: On an indoor trainer, unclip one leg and pedal for 60 seconds with light resistance to master smooth 11 o\'clock pedal transitions.',
      'Target cadences: Flat cruising target 88-94 rpm; extended sustained climbing target 75-85 rpm.',
    ],
  },
  {
    id: 'CYC-02',
    title_zh: '功能性閾值功率 (FTP) 與 Coggan 7 大功率區間：精準耐力訓練的基石',
    title_en: 'Functional Threshold Power (FTP) & Coggan 7 Power Zones: The Precision Science of Cycling',
    category: 'FTP_POWER_ZONES',
    one_liner_zh: '心率會受氣溫與咖啡因飄移，功率瓦數 (Watts) 是測量騎士即時生理做功的唯一真理。',
    one_liner_en: 'Heart rate drifts with heat and caffeine; direct wattage output is the immutable metric of human cycling work.',
    evidence_grade: 'A',
    principles_zh: [
      '功能性閾值功率 (FTP) 定義為騎士在生理準穩態下，全力騎行 1 小時所能維持的最大平均功率 (Watts)。',
      '心率受氣溫、脫水、睡眠、交感神經刺激存在嚴重心率飄移 (Cardiac Drift)；功率計以應變片 (Strain Gauges) 直接測量踏板或曲柄形變，毫秒級反映做功。',
      'Coggan 7 大功率區間將所有訓練目標量化：Z2 建立粒線體底子、甜蜜點 (SST, 88–94% FTP) 高效率拉升閾值、Z5 間歇突破最大攝氧量。',
    ],
    principles_en: [
      'Functional Threshold Power (FTP) is the highest sustained mean power a cyclist can maintain in a quasi-steady physiological state for ~60 minutes.',
      'Heart rate is confounded by cardiac drift, hydration, ambient heat, and stimulants; power meters utilize strain gauges to calculate instantaneous mechanical work.',
      'Coggan\'s 7-zone framework quantifies training stimuli: Z2 for mitochondrial density, Sweet Spot (88-94% FTP) for time-crunched threshold growth, and Z5 for VO2 max expansion.',
    ],
    biomechanical_data_zh: [
      '20 分鐘 FTP 測試公式：FTP = 20 分鐘全力計時平均功率 × 0.95。',
      '正規化功率 (Normalized Power, NP)：透過四次方演算法加權高強度波動的生化代價，真實反映間歇騎行的生理疲勞度。',
      '體重功率比 (W/kg)：決定爬坡速度的終極指標（休閒騎士約 2.0–2.5 W/kg；進階業餘約 3.5–4.2 W/kg；職業環法車手高達 5.8–6.5 W/kg）。',
    ],
    biomechanical_data_en: [
      'Standard 20-min test formula: FTP = 20-minute all-out average power * 0.95.',
      'Normalized Power (NP): Mathematical 4th-power weighting algorithm that quantifies the true metabolic cost of non-steady power surges.',
      'Power-to-weight ratio (W/kg): The definitive physics metric for climbing (Recreational 2.0-2.5 W/kg; Elite Amateur 3.5-4.2 W/kg; Tour de France GC 5.8-6.5 W/kg).',
    ],
    action_guidelines_zh: [
      '週期性 FTP 重新測驗：每 6–8 週進行一次標準化 20 分鐘功率測試或 Ramp Test，動態校正 7 大功率區間。',
      '甜蜜點訓練 (Sweet Spot Training, SST)：每週 2 次執行 2 組 20 分鐘或 3 組 15 分鐘之 90% FTP 穩態騎行，以最低神經疲勞換取最大乳酸閾值提升。',
      '嚴禁垃圾區間 (No Man\'s Land)：長距離騎行避免無意識滯留在 Z3 中間不酸不痛的無效區間，嚴格執行 Z2 輕鬆騎或 Z4/Z5 高品質課表。',
    ],
    action_guidelines_en: [
      'Periodized FTP re-testing: Re-assess every 6-8 weeks via 20-min test or ramp protocol to recalibrate training targets.',
      'Sweet Spot intervals: Perform 2x20 min or 3x15 min at 88-94% FTP twice weekly to maximize threshold adaptations with manageable autonomic strain.',
      'Avoid junk miles: Stay out of mid-tempo Z3 purgatory; polarize cleanly into Zone 2 endurance base or targeted Z4/Z5 high-intensity bouts.',
    ],
  },
  {
    id: 'CYC-03',
    title_zh: '空氣動力學 (Aerodynamics / CdA) 與風阻力學：時速 30 km/h 以上的物理壁壘',
    title_en: 'Aerodynamics & CdA: The Exponential Physics Barrier Above 30 km/h',
    category: 'AERODYNAMICS_CDA',
    one_liner_zh: '當車速超過 30 km/h 時，高達 80%–90% 的輸出功率純粹在推開空氣；騎士身體迎風面佔總風阻 80%。',
    one_liner_en: 'Above 30 km/h, 80-90% of your power goes entirely to displacing air; the rider\'s body accounts for 80% of total drag.',
    evidence_grade: 'A',
    principles_zh: [
      '自行車平路阻力主要包含兩部分：滾動阻力 (Rolling Resistance, 與速度呈線性關係) 與 空氣阻力 (Aerodynamic Drag, 與速度的立方 $V^3$ 呈指數關係！)。',
      '風阻功率公式：$P_{aero} = \frac{1}{2} \rho \cdot CdA \cdot V^3$。速度每提升一倍，對抗風阻所需功率暴增 8 倍！',
      'CdA (風阻係數 × 迎風投影面積)：總風阻中，自行車器材（車架、輪組）僅佔 20%–25%，騎士自身的身體姿勢與軀幹迎風面積佔 75%–80%！',
    ],
    principles_en: [
      'Total cycling resistance comprises rolling resistance (linear with velocity) and aerodynamic drag (exponentially scaling with velocity cubed, V^3!).',
      'Aero power formula: P_aero = 0.5 * rho * CdA * V^3. Doubling your speed demands an eight-fold surge in aerodynamic power output!',
      'CdA (Drag coefficient * frontal area): The bike components account for just 20-25% of drag; the human rider\'s torso posture dictates 75-80% of air resistance.',
    ],
    biomechanical_data_zh: [
      '抓握姿勢風阻差異：上把位直立 (Hoods Upright, CdA ~0.38) vs 彎曲手肘水平抓握上把位 (Aero Hoods, CdA ~0.29) vs 計時賽延伸把 (TT Bars, CdA ~0.22)。',
      '姿勢效益：僅需彎曲手肘將小臂放平、背部與地面平行，在 40 km/h 下可瞬間省下 30–50 Watts 功率！效益遠超更換數十萬元的空力車架。',
      '破風跟車效應 (Drafting)：在集團或前車正後方 1 公尺內跟車，可減少 30%–40% 風阻與能量消耗。',
    ],
    biomechanical_data_en: [
      'Grip position aerodynamics: Upright on hoods (CdA ~0.38) vs bent elbows flat back (Aero hoods, CdA ~0.29) vs TT aero extensions (CdA ~0.22).',
      'Postural wattage savings: Bending elbows to 90 degrees with a flat torso saves 30-50 Watts at 40 km/h, surpassing the benefit of hyper-expensive frames.',
      'Drafting mechanics: Sheltering within 1 meter of a leading rider cuts frontal aerodynamic drag and energy cost by 30-40%.',
    ],
    action_guidelines_zh: [
      '平路巡航姿勢優化：練習「手肘彎曲 90 度、手腕輕搭握把前端套筒 (Aero Hoods Position)」，並保持頭部微低下收下巴，收窄肩膀寬度。',
      '緊身裝備優先：貼身低風阻空力連身服 (Aero Skinsuit) 與低風阻安全帽，是每投入一元邊際省瓦效益最高的器材升級。',
      '集團輪車默契：在順風或逆風側利用 45 度斜行陣列 (Echelon) 隱蔽於側風破風陰影區。',
    ],
    action_guidelines_en: [
      'Aero hoods posture: Train to ride comfortably with elbows at 90 degrees, wrists resting relaxed on the hood horns, and shoulders shrugged in.',
      'Skinsuit over gear: Form-fitting aero jerseys and aero road helmets deliver the highest watt-per-dollar aerodynamic dividend in cycling.',
      'Echelon paceline: In crosswinds, stagger at a 45-degree angle downwind to hide completely inside the wind shelter wake of the paceline.',
    ],
  },
  {
    id: 'CYC-04',
    title_zh: '專業 Bike Fitting 生物力學：下死點膝屈角、KOPS 與神經壓迫防線',
    title_en: 'Professional Bike Fitting: Knee Extension Angle, KOPS & Nerve Compression Defenses',
    category: 'BIKE_FITTING',
    one_liner_zh: '座墊太高傷阿基里斯腱與膝後膕肌；座墊太低傷髕骨髕腱；座艙太長壓迫尺神經引發手指麻痺。',
    one_liner_en: 'Saddle too high tears hamstrings; saddle too low destroys the patella; cockpit too long crushes the ulnar nerve.',
    evidence_grade: 'A',
    principles_zh: [
      '踏板在下死點 (BDC, 6點鐘) 時的膝關節屈曲角度，國際臨床黃金標準為 25°–35°（膝過伸伸直為 0°）。',
      '膝前垂直軸線 (KOPS, Knee Over Pedal Spindle)：曲柄水平前置於 3 點鐘位置時，脛骨粗隆或髕骨下緣的垂直鉛垂線應切齊踏板軸心，維持最佳力臂傳導。',
      '手部麻痺病理：騎乘時若座艙太長或座墊前傾，過多體重壓在握把上，會壓迫腕隧道正中神經與蓋氏管 (Guyon\'s canal) 尺神經，引發無名指與小指麻痺（車手麻痺 Cyclist\'s Palsy）。',
    ],
    principles_en: [
      'Knee flexion angle at bottom dead center (BDC) has a validated clinical window of 25-35 degrees (0 degrees being terminal knee lockout).',
      'Knee Over Pedal Spindle (KOPS): With cranks horizontal at 3 o\'clock, a plumb line from the tibial tubercle should intersect the pedal spindle.',
      'Neurological compression: Excess weight bearing on handlebars compresses the ulnar nerve in Guyon\'s canal, provoking Cyclist\'s Palsy (numb ring and pinky fingers).',
    ],
    biomechanical_data_zh: [
      '座墊高度過高警訊：骨盆在踩踏至下死點時左右大幅搖擺 (Pelvic Rocking)、足背過度下壓踮腳尖踩踏、膝蓋後側膕肌肌腱炎。',
      '座墊高度過低警訊：踩踏至上死點時髖膝屈角過小、髕股關節面壓力暴增、膝蓋前緣髕骨肌腱發炎。',
      '會陰會陰神經壓迫：傳統長鼻座墊壓迫會陰部陰部神經 (Pudendal Nerve) 與動脈，造成生殖器麻木；人體工學中空短鼻座墊可減低會陰峰值壓力達 65%。',
    ],
    biomechanical_data_en: [
      'Saddle too high indicators: Pelvic rocking over the saddle crown, excessive plantarflexion toe-pointing, and posterior biceps femoris tendinopathy.',
      'Saddle too low indicators: Deep knee flexion pinch at 12 o\'clock, exaggerated patellofemoral compression, and patellar tendinitis.',
      'Pudendal nerve ischemia: Traditional long nose saddles compress perineal pudendal neurovasculature; short-nose cut-out saddles decrease peak perineal pressures by 65%.',
    ],
    action_guidelines_zh: [
      '座高自我初篩法 (LeMond Formula)：跨下長 (Inseam) × 0.883 = 五通中線至座墊上緣距離。上車腳跟放踏板於 6 點鐘，膝蓋應恰好伸直而不顛臀。',
      '握把手套防護：佩戴掌心尺側具有吸震凝膠 (Gel Pad) 的自行車手套，騎乘中每 15 分鐘變換握把位置（煞變把頭、平把、下把位交替）。',
      '卡鞋鎖片 (Cleats) 微調：卡鞋鎖片前後位置應使大腳趾關節與小腳趾關節之間的中點切齊踏板軸心，避免過於靠前造成小腿跟腱過載。',
    ],
    action_guidelines_en: [
      'LeMond formula baseline: Inseam height * 0.883 = Center of bottom bracket to saddle top surface. Heel on pedal at 6 o\'clock should yield a straight leg without hip drop.',
      'Ulnar relief gloves: Wear padded cycling gloves with targeted Guyon\'s canal relief pads; alternate grip positions every 15 minutes.',
      'Cleat fore-aft alignment: Position cleats so the pedal axle aligns midway between the 1st and 5th metatarsal heads to spare the Achilles tendon.',
    ],
  },
  {
    id: 'CYC-05',
    title_zh: '長途騎乘補給與高強度爬坡：體重功率比與每小時 90g 碳水化合物',
    title_en: 'Endurance Nutrition & Alpine Climbing: Power-to-Weight Physics and 90g/hr Carbohydrate Fueling',
    category: 'CLIMBING_NUTRITION',
    one_liner_zh: '平路看絕對瓦數，爬坡看 W/kg；長距離百公里騎行本質上是一場「誰能在車上消化最多碳水化合物」的代謝競賽。',
    one_liner_en: 'Flat roads reward raw watts; steep climbs reward W/kg; ultra-distance cycling is ultimately an intestinal digestion competition.',
    evidence_grade: 'A',
    principles_zh: [
      '爬坡重力方程式：當坡度超過 7% 時，克服重力位能上升所需的功率佔總輸出的 80% 以上，風阻退居次要。此時決定登山速度的核心變數是體重功率比 (W/kg)。',
      '高強度長程騎乘（如 3–5 小時大山挑戰賽）每小時消耗可達 700–1,000 kcal，純依賴體內肝醣儲備（僅約 2,000 kcal）在 2 小時內即會耗竭面臨急性虛脫 (Bonking)。',
      '消化道雙通道水合補給：採用麥芽糊精與果糖複方（比例 1:0.8），在自行車低震盪體態下，每小時可安全耐受並吸收 80–90g 甚至 100g 碳水化合物。',
    ],
    principles_en: [
      'Alpine climbing physics: On grades >7%, gravitational potential work accounts for >80% of power demand; speed is dictated purely by W/kg.',
      'Caloric deficit: Sustained hard cycling expends 700-1,000 kcal/hr. Endogenous glycogen is exhausted within 2 hours, precipitating catastrophic bonking.',
      'Dual-transporter fueling: Formulations blending maltodextrin and fructose (1:0.8 ratio) leverage the stable seated cycling posture to absorb 80-100g carbs/hr without nausea.',
    ],
    biomechanical_data_zh: [
      '減輕 1 公斤體重 vs 增加 5 瓦功率：在武嶺 8% 坡度爬坡中，體重減輕 1 kg（健康體脂範圍內）所節省的時間，約等同於平路多輸出 5–6 Watts 功率。',
      '水份蒸發流失：自行車高速迎風使汗水快速蒸發，騎士往往「感覺不到流汗」而陷入隱形重度脫水。',
      '鈉離子補足：每小時補水 500–750 mL，水壺內必須調配等滲透壓電解質飲料（每公升含 500–800 mg 鈉）。',
    ],
    biomechanical_data_en: [
      '1 kg shed vs 5 watts gained: On an 8% gradient climb, dropping 1 kg of non-functional adipose mass equates to gaining ~5-6 Watts of sustained threshold output.',
      'Hidden evaporative dehydration: Rapid convective airflow evaporates sweat instantly, masking massive fluid loss until severe hypohydration sets in.',
      'Electrolyte density: Hydrate with 500-750 mL/hr containing 500-800 mg/L sodium to preserve plasma osmotic balance and prevent muscle cramping.',
    ],
    action_guidelines_zh: [
      '定時進食鬧鐘：手錶設置每 20 分鐘震動提醒，固定小口啜飲高碳水能量飲或吞服固體能量棒（避免一次大口暴飲引起胃下垂）。',
      '一水一電雙水壺配置：車架雙水壺架標準配置——一瓶裝高碳水等滲透壓電解質飲料，一瓶裝純水（用於口腔洗刷黏膩感與降溫）。',
      '爬坡齒比保護：長距離陡坡應換裝 34T 甚至 36T 飛輪，確保在 10% 以上大陡坡依然能維持 75 rpm 以上迴轉速，保護膝蓋與腰椎。',
    ],
    action_guidelines_en: [
      'Fueling timer: Set cycling computer alarms for 20-minute alerts to ingest small, measured sips of carb drink or energy chews continuously.',
      'Dual bottle protocol: One bottle filled with high-carb electrolyte fluid; second bottle filled with pure water to rinse sweetness and cool the face.',
      'Climbing gear ratios: Equip 34T or 36T cassette sprockets for Alpine climbs to guarantee cadence stays >75 rpm on 10%+ gradients.',
    ],
  },
];
