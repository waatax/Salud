import { StrengthTopic } from '../types';

export interface MuscleGroupInfo {
  id: string;
  name_zh: string;
  name_en: string;
  primary_movement_zh: string;
  primary_movement_en: string;
  key_exercises: string[];
  antagonist_muscle: string;
  emg_activation_tip_zh: string;
  emg_activation_tip_en: string;
  weekly_effective_sets: string;
}

export const MAJOR_MUSCLE_GROUPS: MuscleGroupInfo[] = [
  {
    id: 'CHEST',
    name_zh: '胸部肌群 (胸大肌胸肋部/鎖骨部)',
    name_en: 'Chest (Pectoralis Major)',
    primary_movement_zh: '上肢水平推、肩關節水平內收',
    primary_movement_en: 'Horizontal push, shoulder horizontal adduction',
    key_exercises: ['槓鈴平板臥推 (Barbell Bench Press)', '啞鈴上斜推舉 (Incline DB Press)', '雙槓臂屈伸 (Dips)', '滑輪夾胸 (Cable Flyes)'],
    antagonist_muscle: '背闊肌、菱形肌 (Lats & Rhomboids)',
    emg_activation_tip_zh: '推起時專注於「雙手大臂向胸骨中線靠攏壓榨」，而非單純用手掌向上推直。',
    emg_activation_tip_en: 'Focus on adducting upper arms toward the sternum rather than merely pushing hands upward.',
    weekly_effective_sets: '每週 10–20 組高質量接近力竭組',
  },
  {
    id: 'BACK',
    name_zh: '背部肌群 (背闊肌、斜方肌、菱形肌)',
    name_en: 'Back (Latissimus Dorsi, Trapezius, Rhomboids)',
    primary_movement_zh: '上肢垂直拉、水平拉、肩關節伸展與內收',
    primary_movement_en: 'Vertical pull, horizontal row, shoulder adduction',
    key_exercises: ['引體向上 (Pull-ups)', '槓鈴俯身划船 (Barbell Row)', '滑輪下拉 (Lat Pulldown)', '胸部支撐啞鈴划船 (Chest-Supported Row)'],
    antagonist_muscle: '胸大肌、三角肌前束 (Chest & Anterior Delt)',
    emg_activation_tip_zh: '發力起始時先做「肩胛骨下沉後收 (Scapular Retraction)」，引導手肘貼近軀幹後拉，避免二頭肌搶力代償。',
    emg_activation_tip_en: 'Initiate with scapular depression and retraction; drive elbows backward close to the torso.',
    weekly_effective_sets: '每週 12–22 組 (背闊肌垂直拉 + 上背水平拉)',
  },
  {
    id: 'QUADS',
    name_zh: '下肢前側 (股四頭肌：股直肌、股內/外/中間肌)',
    name_en: 'Quadriceps (Rectus Femoris & Vasti)',
    primary_movement_zh: '膝關節伸展、下肢雙腿推',
    primary_movement_en: 'Knee extension, bilateral lower push',
    key_exercises: ['槓鈴頸後/頸前深蹲 (Barbell Back/Front Squat)', '哈克深蹲 (Hack Squat)', '保加利亞分腿蹲 (Bulgarian Split Squat)', '腿伸展機 (Leg Extension)'],
    antagonist_muscle: '膕繩肌 (Hamstrings)',
    emg_activation_tip_zh: '下蹲至大腿水平或更低深度，維持脊柱中立，上升時以全腳掌（腳跟與第一蹠骨）均衡下蹬推地。',
    emg_activation_tip_en: 'Squat to at least parallel depth with neutral spine; drive through tripod foot contact.',
    weekly_effective_sets: '每週 10–18 組',
  },
  {
    id: 'GLUTES_HAMS',
    name_zh: '下肢後側鏈 (臀大肌、膕繩肌群、豎脊肌)',
    name_en: 'Posterior Chain (Gluteus Maximus & Hamstrings)',
    primary_movement_zh: '髖關節伸展 (Hip Hinge)、膝關節屈曲',
    primary_movement_en: 'Hip extension, hip hinge, knee flexion',
    key_exercises: ['傳統硬舉/羅馬尼亞硬舉 (Conventional/Romanian Deadlift)', '槓鈴臀推 (Barbell Hip Thrust)', '俯臥/坐姿腿彎舉 (Hamstring Curl)', '壺鈴擺盪 (Kettlebell Swing)'],
    antagonist_muscle: '股四頭肌、髂腰肌 (Quads & Iliopsoas)',
    emg_activation_tip_zh: '專注於髖鉸鏈 (Hip Hinge)「屁股向後推牆」使膕繩肌深度拉伸，拉起時頂峰用力夾緊臀大肌。',
    emg_activation_tip_en: 'Hinge hips backward as if touching a wall behind you to load hamstrings; squeeze glutes at lockout.',
    weekly_effective_sets: '每週 10–18 組',
  },
  {
    id: 'SHOULDERS',
    name_zh: '肩部肌群 (三角肌前中後束、旋轉肌袖)',
    name_en: 'Shoulders (Deltoids & Rotator Cuff)',
    primary_movement_zh: '上肢垂直推、肩外展、水平外展',
    primary_movement_en: 'Vertical overhead press, shoulder abduction',
    key_exercises: ['站姿槓鈴肩推 (Overhead Press)', '啞鈴側平舉 (Lateral Raise)', '啞鈴俯身飛鳥/滑輪反向飛鳥 (Rear Delt Flye)', '面拉 (Face Pulls)'],
    antagonist_muscle: '背闊肌下束 (Lower Lats)',
    emg_activation_tip_zh: '側平舉時手臂在肩胛平面 (Scapular Plane，前方 30 度) 上抬，小指不宜過度翻高，保護肩峰下空間。',
    emg_activation_tip_en: 'Raise dumbbells within the scapular plane (30 deg forward of coronal plane) to eliminate subacromial impingement.',
    weekly_effective_sets: '側中束 14–22 組；後束 12–18 組',
  },
  {
    id: 'CORE',
    name_zh: '深層核心與軀幹 (腹橫肌、腹直肌、腹內外斜肌)',
    name_en: 'Deep Core & Torso (Transverse Abdominis, Obliques)',
    primary_movement_zh: '抗伸展 (Anti-Extension)、抗旋轉 (Anti-Rotation)、抗側屈 (Anti-Lateral Flexion)',
    primary_movement_en: 'Anti-extension, anti-rotation, anti-lateral flexion',
    key_exercises: ['滾輪健腹 (Ab Wheel Rollout)', '帕洛夫推舉 (Pallof Press)', '雙手重裝農夫走路 (Farmer\'s Walk)', '懸垂舉腿 (Hanging Leg Raise)'],
    antagonist_muscle: '豎脊肌群 (Erector Spinae)',
    emg_activation_tip_zh: '核心主要功能為「抵抗脊柱形變」而非過度彎曲脊椎；發力時執行腹內壓瓦氏閉氣 (Bracing)，肋骨下沉鎖定盆骨。',
    emg_activation_tip_en: 'Core musculature is built for resisting deformation; execute intra-abdominal bracing and lock ribs down.',
    weekly_effective_sets: '每週 8–14 組高張力抗阻組',
  },
];

export const STRENGTH_TOPICS: StrengthTopic[] = [
  {
    id: 'STR-01',
    title_zh: '肌肥大三大核心生化驅動力：機械張力、代謝壓力與肌纖維微創修復',
    title_en: 'Hypertrophy Drivers: Mechanical Tension, Metabolic Stress & Muscle Protein Synthesis',
    category: 'HYPERTROPHY_MECHANISMS',
    one_liner_zh: '機械張力是肌纖維增粗的第一因；離心收縮的極限拉伸直接啟動 mTORC1 蛋白質合成訊號。',
    one_liner_en: 'Mechanical tension is the primary stimulus; eccentric stretching under load directly ignites mTORC1 protein synthesis.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '機械張力 (Mechanical Tension)：骨骼肌細胞膜上的機械感應器（如 Integrin 整合素與 Titin 肌巨蛋白）感知高張力牽拉，將物理力學訊號轉化為生化級聯反應，強效活化雷帕黴素靶蛋白複合物 1 (mTORC1)。',
      '代謝壓力 (Metabolic Stress)：持續肌收縮阻斷局部動脈血流（缺血低氧），使乳酸、無機磷酸鹽 (Pi) 與氫離子大量蓄積，刺激同化荷爾蒙脈衝式分泌並促使肌纖維細胞水合充血膨脹 (Cell Swelling)。',
      '肌纖維微創與衛星細胞 (Satellite Cells)：離心收縮造成的肌節 (Sarcomere) 微小撕裂，活化並驅動骨骼肌幹細胞——衛星細胞增殖分化，向肌纖維提供新的細胞核 (Myonuclei)，永久提升轉錄蛋白質容量。',
    ],
    mechanisms_en: [
      'Mechanical tension: Costameric mechanosensors (integrins and titin kinase) transduce physical strain into biochemical cascades, robustly upregulating mTORC1 signaling.',
      'Metabolic stress: Intramuscular ischemia pools lactate, inorganic phosphate (Pi), and H+, driving acute cellular swelling and autocrine anabolic cascades.',
      'Satellite cell proliferation: Eccentric sarcomeric microtrauma activates skeletal muscle stem cells (satellite cells), donating myonuclei to permanently expand protein transcription capacity.',
    ],
    movement_analysis_zh: [
      '肌原纖維肥大 (Myofibrillar Hypertrophy) vs 肌漿肥大 (Sarcoplasmic Hypertrophy)：高強度大重量 (80–85% 1RM) 偏向促進收縮性肌動蛋白與肌球蛋白平行增生；中高反覆 (65–75% 1RM) 偏向擴大肌漿液與肝醣基質儲量。',
      '全關節活動度 (Full ROM) 優勢：在被動拉伸位（如深蹲底部、啞鈴飛鳥底部）承受高機械張力，能觸發肌節縱向串聯增加 (Sarcomerogenesis in series)，肌肥大效益比半程動作高出 30%！',
    ],
    movement_analysis_en: [
      'Myofibrillar vs Sarcoplasmic hypertrophy: Heavy loads (>80% 1RM) prioritize functional actin-myosin contractile expansion; moderate loads (65-75% 1RM) augment sarcoplasmic glycogen reserves.',
      'Full ROM superiority: Loading at long muscle lengths (deep squat hole, deep chest fly stretch) triggers longitudinal sarcomerogenesis in series, yielding ~30% superior hypertrophy over partial reps.',
    ],
    action_protocols_zh: [
      '每週肌群有效容量：每個大肌群每週應累積 10–20 組接近力竭之高品質有效組 (Hard Sets)。',
      '次數區間分佈：80% 訓練容量落在 6–12 下區間（張力與代謝壓力黃金交會點），20% 落在 3–5 下（純神經肌力）或 15–20 下（代謝充血）。',
      '離心慢放控制：向心爆發用力推起（1秒），離心收縮有控制地緩慢下放（2–3秒），最大化機械牽張張力。',
    ],
    action_protocols_en: [
      'Weekly volume target: Accumulate 10-20 hard sets per major muscle group weekly taken to within 1-3 reps of failure.',
      'Repetition spectrum: Anchor 80% of volume within the 6-12 rep hypertrophy sweet spot, complementing with 3-5 reps (neural strength) and 15-20 reps (metabolic burn).',
      'Eccentric tempo control: Explosive concentric contraction (1s) coupled with controlled, deliberate eccentric lowering (2-3s) to maximize stretch-mediated tension.',
    ],
  },
  {
    id: 'STR-02',
    title_zh: '漸進性超負荷 (Progressive Overload) 與 RPE / RIR 自覺保留次數處方',
    title_en: 'Progressive Overload Principles & RPE / RIR Autoregulation Framework',
    category: 'PROGRESSIVE_OVERLOAD',
    one_liner_zh: '肌肉只會對「超越既有適應範圍的刺激」做出增長回應；每組保留 1–2 下是防受傷與刺激生長的最完美平衡點。',
    one_liner_en: 'Muscle adapts exclusively to demands exceeding its current capacity; stopping 1-2 reps shy of failure optimizes growth while sparing tendons.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '人體骨骼肌遵循恆定生理適應性法則：若訓練負重、組數或動作控制未定期突破，肌肉蛋白質合成 (MPS) 速率將於數週內衰減至基準線。',
      '完全力竭 (Failure, 0 RIR) 的生化代價：每組均硬頂至動作徹底變形力竭，會劇烈榨乾中樞神經系統 (CNS) 神經遞質，血清皮質醇飆升，造成後續組數功率崩跌 40% 且大幅激增肌腱拉傷風險。',
      'RIR (Reps in Reserve, 自覺保留次數)：保留 1–2 下 (RIR 1–2, 等同 RPE 8–9) 能夠完整徵召全部高閾值運動單位，同時將中樞疲勞壓至最低，確保總體積訓練容量極大化。',
    ],
    mechanisms_en: [
      'Homeostatic adaptation law: Without systematic progressive overload, muscle protein synthesis (MPS) cascades plateau to maintenance baselines within weeks.',
      'The systemic cost of absolute failure (0 RIR): Grinding to breakdown exhausts central nervous system (CNS) reserves, spiking cortisol and degrading subsequent set volume by 40%.',
      'Reps in Reserve (RIR): Training at 1-2 RIR (RPE 8-9) captures >98% of high-threshold motor unit recruitment while sparing systemic recovery capacity.',
    ],
    movement_analysis_zh: [
      '超負荷的五大實踐途徑：',
      '1. 增加外在負重 (Increase Weight, 如臥推由 60kg 提升至 62.5kg)',
      '2. 增加相同負重下的次數 (Increase Reps, 如深蹲 100kg 由 8 下進步至 10 下)',
      '3. 增加相同時間下的組數 (Increase Sets / Total Volume)',
      '4. 改善動作控制與行程 (Improved Form & Range of Motion)',
      '5. 縮短組間休息或增加離心下放時間 (Density & Time Under Tension)',
    ],
    movement_analysis_en: [
      'Five pathways of progressive overload:',
      '1. Load escalation (Adding absolute weight, e.g. 60kg to 62.5kg)',
      '2. Repetition expansion at fixed load (e.g. 8 reps to 10 reps at 100kg squat)',
      '3. Set volume progression',
      '4. Enhanced execution quality & range of motion (ROM)',
      '5. Density elevation (Reducing rest periods or increasing eccentric time under tension)',
    ],
    action_protocols_zh: [
      '雙重進階法則 (Double Progression Method)：設定目標次數區間（如 8–12 下）。當某重量所有組數皆能做到 12 下 (RIR 1) 時，下一週增加 2.5–5% 重量，次數降回 8 下重新累積。',
      '訓練日誌強制記錄：每次進健身房前必須清晰知道今日每組的目標重量與次數，嚴禁盲目憑當下感覺隨機抓重量。',
      '減量週 (Deload Week) 週期編排：每連續高強度訓練 5–7 週，安排 1 週減量期（負重降 10%，組數砍半），讓結締組織、肌腱與中樞神經完全充電重塑。',
    ],
    action_protocols_en: [
      'Double progression method: Fix a rep target window (e.g. 8-12 reps). Once you achieve 12 reps across all sets at RIR 1, advance load by 2.5-5% and reset to 8 reps.',
      'Mandatory training log: Know your previous set weights and reps before stepping onto the platform; eliminate guesswork.',
      'Planned deload weeks: Every 5-7 weeks of hard loading, schedule a 1-week deload (reduce volume by 50%, loads by 10%) to allow connective tissue remodeling.',
    ],
  },
  {
    id: 'STR-03',
    title_zh: '全身六大基礎動作模式 (Movement Patterns) 與多關節動力鏈力學',
    title_en: 'The 6 Foundational Movement Patterns & Multi-Joint Kinetic Chain Biomechanics',
    category: 'MOVEMENT_PATTERNS',
    one_liner_zh: '不要只練孤立單一肌肉，要鍛鍊整合全身力量的六大動作模式：推、拉、蹲、鉸鏈、分腿與負重行走。',
    one_liner_en: 'Train movement patterns, not isolated parts: master the push, pull, squat, hinge, lunge, and loaded carry.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '多關節複合動作 (Compound Movements) 能同時跨越多個關節運動，徵召數十個協同肌群與穩定肌，引發全身性生長激素與睪固酮的神經內分泌脈衝。',
      '動力鏈傳導 (Kinetic Chain Transmission)：力量由足底與地面接觸點發力，經由足踝、膝關節、髖關節旋轉，並由強韌的深層腹橫肌與豎脊肌核心傳導至上肢。',
      '單關節孤立動作（如啞鈴彎舉、三頭下壓）應作為輔助微調，全身 75% 的訓練時間與能量應投入至大動作模式。',
    ],
    mechanisms_en: [
      'Multi-joint compound movements recruit dozens of synergistic muscles across kinetic links, eliciting superior neuromuscular drive.',
      'Kinetic chain force transmission: Force originates at ground contact, channelled through the ankles, knees, and hips, stabilized through the core cylinder, and expressed through extremities.',
      'Single-joint isolation lifts (curls, pushdowns) serve as accessory finishers; 75% of training time and adaptive energy must belong to foundational compound movements.',
    ],
    movement_analysis_zh: [
      '六大動作模式矩陣：',
      '1. 下肢推 (Squat): 雙腿深蹲、前蹲舉（主導：股四頭肌、臀大肌）',
      '2. 髖鉸鏈 (Hinge): 硬舉、羅馬尼亞硬舉、早安式（主導：膕繩肌、臀大肌、下背後側鏈）',
      '3. 上肢推 (Push): 平板臥推、伏地挺身、站姿過頂肩推（主導：胸肌、三角肌、三頭肌）',
      '4. 上肢拉 (Pull): 引體向上、俯身划船、滑輪下拉（主導：背闊肌、上背菱形肌、二頭肌）',
      '5. 單腿分腿 (Lunge): 保加利亞分腿蹲、跨步弓箭步（主導：單腳平衡、臀中肌穩定、內收肌）',
      '6. 核心與負重行走 (Carry): 農夫走路、手提手箱行走（主導：握力、斜方肌、抗旋轉抗側屈）',
    ],
    movement_analysis_en: [
      'Six movement pattern matrix:',
      '1. Squat (Lower Push): Back squat, front squat (Quadriceps, glutes dominant)',
      '2. Hinge (Lower Pull): Conventional deadlift, Romanian deadlift (Posterior chain, hamstrings, glutes dominant)',
      '3. Upper Push: Bench press, push-ups, overhead press (Pectorals, anterior deltoids, triceps)',
      '4. Upper Pull: Pull-ups, barbell rows, lat pulldowns (Lats, rhomboids, biceps)',
      '5. Lunge / Unilateral: Bulgarian split squats, walking lunges (Hip stability, glute medius, adductors)',
      '6. Carry / Core: Heavy farmer\'s walks, suitcase carries (Grip endurance, anti-lateral flexion, trap stability)',
    ],
    action_protocols_zh: [
      '課表結構設計 (推拉腿 PPL 或 上下肢分割 Upper/Lower)：確保每週六大動作模式至少各被高強度刺激 2 次。',
      '單腳不對稱平衡防護：每週必練單腳動作（如保加利亞分腿蹲），排查並消除左右腿力量落差大於 10% 之代償失衡。',
      '腹內壓瓦氏呼吸 (Valsalva Bracing)：深蹲與硬舉起步前，用鼻子深吸氣灌滿腹腔（如吸氣進皮帶四周），收緊腹肌創造 360 度堅硬氣體液壓柱支撐腰椎。',
    ],
    action_protocols_en: [
      'Split template (Push/Pull/Legs or Upper/Lower): Ensure all 6 fundamental patterns are loaded at high intensity at least 2x weekly.',
      'Unilateral symmetry: Integrate unilateral lifts (Bulgarian split squats) to identify and correct bilateral force asymmetries >10%.',
      'Intra-abdominal bracing (Valsalva): Prior to heavy descent, inhale diaphragmatically 360 degrees into a weight belt, creating an incompressible fluid-gas cylinder protecting lumbar discs.',
    ],
  },
  {
    id: 'STR-04',
    title_zh: '尺寸原則 (Henneman\'s Size Principle) 與神經徵召效率：大重量肌力與爆發力',
    title_en: 'Henneman\'s Size Principle & Neuromuscular Drive: Heavy Strength vs Power',
    category: 'NEURAL_ADAPTATION',
    one_liner_zh: '大腦是個吝嗇的電工：只有在面對極大阻力或極快速度時，才會解鎖最強大的高閾值快肌運動單位。',
    one_liner_en: 'The brain is a frugal electrician: it only unleashes high-threshold Type IIx motor units under massive loads or explosive acceleration.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '漢尼曼尺寸原則 (Henneman\'s Size Principle)：運動神經元徵召嚴格依據軸突體積大小由小至大進行——輕重量先徵召耐疲勞的小型慢肌纖維 (Type I)；只有在重量大於 80% 1RM 或接近力竭時，才會徵召肥大潛力最大的大型快肌纖維 (Type IIa / IIx)。',
      '神經適應 (Neural Adaptations)：新手重訓前 4–8 週的肌力暴增，肌肉體積尚未明顯肥大，其本質是中樞神經徵召率 (Rate Coding)、運動單位同步化 (Synchronization) 與拮抗肌協同放鬆效率的躍升！',
      '高頻放電率 (Rate Coding)：大腦運動皮質向下傳遞的神經脈衝頻率由 20 Hz 飆升至 60–100 Hz，使肌纖維產生強直收縮 (Tetanic Contraction)，爆發出人體極限絕對肌力。',
    ],
    mechanisms_en: [
      'Henneman\'s size principle: Motor units are recruited systematically in order of size—small fatigue-resistant Type I units first, scaling up to high-threshold Type IIa/IIx units only under >80% 1RM loads or deep fatigue.',
      'Early neural adaptations: Strength gains in the first 4-8 weeks occur before structural hypertrophy, driven by enhanced motor unit synchronization, rate coding, and reduced antagonist co-activation.',
      'Rate coding frequency: Motor cortex discharge rates climb from 20 Hz to 60-100 Hz, transitioning twitch contractions into maximal fused tetanic output.',
    ],
    movement_analysis_zh: [
      '絕對肌力 (Absolute Strength) vs 爆發力 (Power / RFD)：絕對肌力是金字塔底部地基，力發展率 (Rate of Force Development, RFD) 是在 100–200 毫秒內瞬間引爆最大力量的神經能力。',
      '速度基礎訓練 (Velocity Based Training, VBT)：槓鈴移動速度低於 0.3 m/s 代表極限 1RM 力量；槓鈴速度在 0.75–1.0 m/s 代表最大功率輸出區間。',
    ],
    movement_analysis_en: [
      'Absolute strength vs Power (RFD): Maximal force production underpins the athletic pyramid; Rate of Force Development (RFD) governs how fast force is expressed within 100-200 milliseconds.',
      'Velocity Based Training (VBT): Barbell mean concentric velocities below 0.3 m/s denote maximal 1RM limit; velocities of 0.75-1.0 m/s represent peak mechanical power output.',
    ],
    action_protocols_zh: [
      '5×5 力量基石課表：每週針對大動作（深蹲、臥推、硬舉、肩推）執行 5 組 5 下（約 80–85% 1RM），組間休息 3–5 分鐘，確保中樞神經完全恢復。',
      '動能速度引爆：即便使用 85% 負重槓鈴下壓緩慢，在向心上升階段大腦依然必須下達「用最快速度全速推動」的意志指令，最大化神經放電率。',
      '握力與旋轉肌神經輻射 (Sherrington\'s Irradiation)：雙手死命握緊槓鈴，神經訊號會「輻射」至前臂、二頭、肩袖與背部，使全身緊繃度上升 25%。',
    ],
    action_protocols_en: [
      'Classic 5x5 protocol: 5 sets of 5 reps on core compound lifts at 80-85% 1RM, with 3-5 minutes rest between sets to ensure full ATP-CP and CNS replenishment.',
      'Compensatory acceleration: Even when heavy loads move slowly, mentally drive the concentric phase with maximal intended velocity to maximize neural rate coding.',
      'Sherrington\'s irradiation: Crushing the barbell grip radiates neural drive into forearms, rotator cuff, and upper back, increasing total stiffness by 25%.',
    ],
  },
  {
    id: 'STR-05',
    title_zh: '肌少症 (Sarcopenia) 逆轉生化與肌力素 (Myokines)：肌肉是人體抗衰老的內分泌器官',
    title_en: 'Sarcopenia Reversal & Myokine Endocrinology: Skeletal Muscle as the Fountain of Youth',
    category: 'SARCOPENIA_MYOKINES',
    one_liner_zh: '肌肉萎縮不只是外型衰退，更是代謝系統全面崩壞；骨骼肌收縮分泌的肌力素能穿透血腦屏障逆轉老化。',
    one_liner_en: 'Muscle wasting is metabolic collapse; contracting skeletal muscle secretes myokines that cross the blood-brain barrier to reverse aging.',
    evidence_grade: 'A',
    mechanisms_zh: [
      '肌少症病理：40 歲後人體骨骼肌每十年自然流失 8%，70 歲後流失加速至每十年 15%；主要流失的是負責反應速度與防跌倒的 II 型快肌纖維。',
      '葡萄糖最大代謝池：人體餐後循環中 80% 的葡萄糖由骨骼肌負責攝取清除。肌肉量萎縮直接等同胰島素阻抗、第二型糖尿病與脂肪肝的發病溫床。',
      '肌力素內分泌風暴 (Myokines Cascade)：阻力訓練中骨骼肌強烈收縮，脈衝式釋放數百種內分泌胜肽：',
      '• 鳶尾素 (Irisin)：促使白色脂肪轉化為產熱棕色脂肪，降低全身系統性慢性發炎。',
      '• 介白素-6 (Muscular IL-6)：由健康肌肉收縮分泌的 IL-6 具有強大的抗發炎特性（與免疫發炎的 IL-6 作用截然相反），大幅促進脂肪分解與胰島素敏感度。',
      '• 腦源性神經滋養因子 (BDNF)：穿透血腦屏障，刺激大腦海馬迴新生神經元與突觸，延緩阿茲海默症與認知衰退。',
    ],
    mechanisms_en: [
      'Sarcopenia pathology: Adults lose 8% muscle mass per decade past 40, accelerating to 15%/decade past 70; selective atrophy targets fast-twitch Type II fibers critical for fall arrest.',
      'Primary glucose sink: Skeletal muscle clears >80% of postprandial circulating glucose; muscular atrophy is the direct architectural driver of insulin resistance and NAFLD.',
      'Myokine endocrinology: Contracting muscles pulse hundreds of bioactive peptides:',
      '• Irisin: Drives browning of white adipose tissue and suppresses systemic inflammation.',
      '• Muscular IL-6: Exerts potent anti-inflammatory effects (distinct from macrophage IL-6), spurring peripheral lipolysis and glucose uptake.',
      '• BDNF: Crosses blood-brain barrier, triggering hippocampal neurogenesis and shielding against Alzheimer\'s cognitive degeneration.',
    ],
    movement_analysis_zh: [
      '握力與深蹲肌力全因死亡率關聯：醫學頂級期刊《Lancet》數十萬人大規模隊列研究證實，握力每下降 5 kg，全因死亡風險激增 16%，預測效能強於收縮壓！',
      '骨質密度壓電效應 (Piezoelectric Effect)：大重量深蹲與硬舉直接對股骨頸與腰椎椎體施加縱向機械應力，刺激成骨細胞礦化，徹底逆轉骨質疏鬆 (Osteoporosis)。',
    ],
    movement_analysis_en: [
      'Grip strength and survival: The Lancet PURE study proves every 5 kg decrement in grip strength correlates with a 16% jump in all-cause mortality, outperforming systolic blood pressure.',
      'Piezoelectric bone mineral density: Heavy compressive loads on the femoral neck and lumbar spine induce piezoelectric currents that stimulate osteoblastic mineralization, reversing osteoporosis.',
    ],
    action_protocols_zh: [
      '全年齡每週阻抗處方：健康成年人與中老年人每週至少 2–3 次全身阻力訓練，以深蹲、坐姿推胸、硬舉或腿推機為核心。',
      '白胺酸 (Leucine) 觸發點：中老年人存在「同化阻抗 (Anabolic Resistance)」，每餐需確保攝取 2.5–3.0g 游離白胺酸（相當於 30–40g 優質乳清或牛肉雞胸）方能突破 mTOR 閾值啟動肌蛋白合成。',
      '防跌下肢爆發力練習：每週加入快速起立坐下 (Sit-to-stand explosively)、階梯快速登階，專注鍛鍊神經反射與防摔倒急煞制動力。',
    ],
    action_protocols_en: [
      'Lifelong prescription: At least 2-3 resistance training bouts weekly focusing on multi-joint compound movement patterns.',
      'Leucine trigger threshold: Aging provokes anabolic resistance; older adults require 2.5-3.0g leucine per meal (30-40g complete protein) to surpass the mTOR synthesis trigger.',
      'Power for fall prevention: Train explosive sit-to-stand chair rises and rapid stair ascents to preserve Type II motor velocity for emergency tripping arrest.',
    ],
  },
];
