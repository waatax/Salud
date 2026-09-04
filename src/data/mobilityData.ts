import { MobilityTopic } from '../types';

export interface MobilityScreenTest {
  id: string;
  name_zh: string;
  name_en: string;
  target_joint: string;
  passing_standard_zh: string;
  passing_standard_en: string;
  clinical_rationale_zh: string;
  clinical_rationale_en: string;
  corrective_action_zh: string;
  corrective_action_en: string;
}

export const MOBILITY_SCREEN_TESTS: MobilityScreenTest[] = [
  {
    id: 'ANKLE_DORSIFLEXION',
    name_zh: '膝貼牆踝關節背屈測試 (Weight-Bearing Lunge Test)',
    name_en: 'Knee-to-Wall Ankle Dorsiflexion Screen',
    target_joint: '距骨踝關節 (Talocrural Joint) & 比目魚肌/阿基里斯腱',
    passing_standard_zh: '腳大拇趾距離牆面 10–12 cm，腳跟完全不離地、膝蓋朝向第二腳趾直直觸碰牆壁無痛。',
    passing_standard_en: 'Big toe 10-12 cm from wall; knee touches wall straight over 2nd toe without heel lift or pain.',
    clinical_rationale_zh: '踝背屈角度不足 (<35° 或 <10cm) 是導致深蹲下背拱起（臀部眨眼）、跑步足底筋膜炎與跳躍膝 (Patellar Tendinopathy) 的頭號元兇。',
    clinical_rationale_en: 'Restricted dorsiflexion (<10cm) causes pelvic butt wink in squats, plantar fasciitis, and patellar tendinopathy.',
    corrective_action_zh: '彈力帶距骨向後滑動關節鬆動術 (Banded Ankle Mobilization) + 比目魚肌加壓拉伸 (膝屈伸展)。',
    corrective_action_en: 'Banded talus posterior glide mobilization + bent-knee soleus deficit stretches.',
  },
  {
    id: 'THOMAS_HIP_TEST',
    name_zh: '改良式湯瑪斯髖伸展測試 (Modified Thomas Test)',
    name_en: 'Modified Thomas Hip Mobility Screen',
    target_joint: '髖關節 (Iliofemoral Joint) & 髂腰肌、股直肌、闊筋膜張肌',
    passing_standard_zh: '仰臥床緣抱單膝至胸，測試腿大腿能完全平貼床面 (髖伸展 0°~10°)，膝關節自然下垂彎曲 ≥80°。',
    passing_standard_en: 'Supine thigh rests flat parallel to bench (0-10° extension) with tested knee hanging down at ≥80° flexion.',
    clinical_rationale_zh: '現代久坐導致髂腰肌攣縮與股直肌僵硬，引發骨盆前傾 (Anterior Pelvic Tilt) 與下交叉症候群，是慢性腰痛與臀肌失憶的根源。',
    clinical_rationale_en: 'Prolonged sitting shortens psoas and rectus femoris, driving anterior pelvic tilt and chronic lumbar shear.',
    corrective_action_zh: '半跪姿骨盆後傾髖屈肌伸展 (Couch Stretch with Posterior Pelvic Tilt) + 臀大肌末端等長收縮。',
    corrective_action_en: 'Couch stretch with active glute contraction and posterior pelvic tuck.',
  },
  {
    id: 'THORACIC_ROTATION',
    name_zh: '跪姿鎖定胸椎旋轉測試 (Lumbar-Locked Thoracic Rotation)',
    name_en: 'Lumbar-Locked Thoracic Rotation Screen',
    target_joint: '胸椎 (T1–T12) & 肋椎關節 (Costovertebral Joints)',
    passing_standard_zh: '臀部坐死於腳跟（鎖定腰椎），單手置於後頸，軀幹旋轉視線向天花板，胸椎旋轉角度達到 45°–50° 以上。',
    passing_standard_en: 'Sitting on heels to lock lumbar spine, hand behind head, trunk actively rotates ≥45°-50° with ease.',
    clinical_rationale_zh: '腰椎天生只有 5°–10° 旋轉度，若胸椎旋轉受限，所有旋轉動能（揮拍、投擲、跑步擺臂、騎車空力趴姿）全由腰椎與肩頸代償，引發椎間盤突出與肩夾擠。',
    clinical_rationale_en: 'Lumbar spine has only 5-10° rotation capacity; thoracic restriction forces compensatory lumbar twisting and disc hernia.',
    corrective_action_zh: '側臥開書式伸展 (Open Book)、四足跪姿貓牛式 (Cat-Cow) 與泡棉滾筒胸椎伸展伸展。',
    corrective_action_en: 'Side-lying open books, quadruped thread-the-needle, and foam roller thoracic extensions.',
  },
  {
    id: 'OVERHEAD_WALL_SLIDE',
    name_zh: '貼牆高舉過頭活動度測試 (Back-to-Wall Shoulder Flexion)',
    name_en: 'Back-to-Wall Shoulder Overhead Screen',
    target_joint: '盂肱關節 (Glenohumeral) & 肩胛胸廓關節 (Scapulothoracic)',
    passing_standard_zh: '背部靠牆（下背不代償反弓、肋骨不外翻），雙臂伸直上舉 180°，手背與手腕能輕鬆貼平牆面。',
    passing_standard_en: 'Standing against wall without lower back arching; arms reach 180° flexion touching wall smoothly.',
    clinical_rationale_zh: '肩關節過頭活動度受限常見於背闊肌與胸小肌攣縮，重訓做肩推或抓舉時極易造成肩峰下旋轉肌袖夾擠 (Subacromial Impingement)。',
    clinical_rationale_en: 'Restricted overhead reach causes subacromial rotator cuff impingement during overhead presses and pull-ups.',
    corrective_action_zh: '背闊肌滾筒放鬆 + 滑輪胸小肌拉伸 + 俯臥 Y-Raise 強化下斜方肌。',
    corrective_action_en: 'Lat myofascial release, pec minor doorway stretch, and prone Y-raises for lower trap activation.',
  },
];

export const MOBILITY_TOPICS: MobilityTopic[] = [
  {
    id: 'MOB-01',
    title_zh: '神經伸展生理學：高爾基腱器官 (GTO) vs 肌梭與 PNF 本體感覺神經肌肉促進術',
    title_en: 'Neurophysiology of Stretching: Golgi Tendon Organs, Muscle Spindles & PNF Mechanics',
    category: 'NEURO_STRETCHING',
    one_liner_zh: '伸展不是單純物理性拉長肌肉橡皮筋，而是透過神經系統調控「牽張反射」與「自生抑制」的痛覺耐受度閥值重設。',
    one_liner_en: 'Stretching is neurological recalibration of stretch reflexes rather than mechanical tissue elongation.',
    evidence_grade: 'A',
    neuro_mechanisms_zh: [
      '肌梭 (Muscle Spindles) 與牽張反射 (Myotatic Reflex)：肌梭平行排列於肌纖維間，感受長度變化與拉長速率。當肌肉被急速被動拉扯時，Ia 傳入神經引發同側運動神經元瞬間收縮防禦，防止撕裂。',
      '高爾基腱器官 (Golgi Tendon Organ, GTO) 與自生抑制 (Autogenic Inhibition)：GTO 串聯於肌腱與肌肉交界處，感受張力變化。當維持持續高張力伸展 15–30 秒以上，Ib 神經纖維抑制α運動神經元，促使肌肉產生反射性放鬆。',
      '交互抑制 (Reciprocal Inhibition)：當主動肌（如股四頭肌）強力收縮時，神經衝動透過脊髓中間神經元自動抑制拮抗肌（如膕繩肌），使拮抗肌張力降低，利於關節順暢運動。',
      'PNF 攣縮-放鬆術 (Hold-Relax / Contract-Relax)：利用目標肌群等長收縮 6–10 秒強烈刺激 GTO，隨後立即進行被動深層伸展，能突破傳統靜態拉伸的角度天花板。',
      '熱身與收操的神經生理分工：訓練前嚴禁長時間靜態拉伸 (>60秒會降低運動神經元徵召與爆發力輸出達 5–8%)，應採用動態活動度 (Dynamic Warmup)；靜態深層拉伸與 PNF 應保留在訓練後或睡前。',
    ],
    neuro_mechanisms_en: [
      'Muscle Spindles & Myotatic Reflex: Spindles detect stretch velocity and trigger protective contraction via Ia afferents.',
      'Golgi Tendon Organs (GTO) & Autogenic Inhibition: GTO senses tension; sustained tension for >15-30s fires Ib fibers to reflexively relax muscle.',
      'Reciprocal Inhibition: Agonist contraction sends inhibitory signals through interneurons to relax the antagonist muscle.',
      'PNF (Proprioceptive Neuromuscular Facilitation): 6-10s isometric contraction overloads GTO, enabling immediate range of motion breakthrough.',
      'Temporal Specialization: Avoid static stretching >60s pre-workout (decreases motor unit output by 5-8%); reserve static/PNF for post-session.',
    ],
    biomechanical_alignment_zh: [
      '靜態拉伸保留期：單次靜態伸展維持 20–30 秒為最佳神經抑制窗口，多於 60 秒無額外急性獲益。',
      '呼吸中樞連動：伸展至極限時配合長吐氣 (Parasympathetic Vagal Tone)，能進一步降低運動皮質興奮度與肌肉肌張力。',
      '神經滑動 (Neurodynamics)：伸展時若出現麻木、電擊刺痛，為周邊神經（坐骨神經、正中神經）受牽拉而非肌肉，必須立即減低幅度。',
    ],
    biomechanical_alignment_en: [
      'Static Hold Duration: 20-30s per bout provides optimal neurological inhibition; >60s offers diminishing acute gains.',
      'Breath Coupling: Prolonged exhalation triggers vagal parasympathetic tone, reducing motor cortex hyperarousal.',
      'Neurodynamics: Tingling or shooting sensations indicate peripheral nerve tension rather than muscle stretch; back off immediately.',
    ],
    action_routines_zh: [
      '運動前 (5–8分鐘動態拉伸)：深蹲行走、腿部前後左右擺動 (Leg Swings)、世界最好伸展 (World\'s Greatest Stretch) 每邊 6–8 下。',
      '運動後 (8–12分鐘自生抑制靜態拉伸)：針對胸大肌、闊背肌、股四頭肌、髖屈肌、比目魚肌各伸展 30 秒 x 2 組。',
      '活動度改善專項 (PNF 法)：膕繩肌仰臥毛巾拉伸：拉到阻力點 -> 腳跟向下踩毛巾等長發力 8 秒 (40%力量) -> 吐氣再向上推進 3–5 公分，重複 3 次。',
    ],
    action_routines_en: [
      'Pre-workout Dynamic Routine: Leg swings, inchworms, World\'s Greatest Stretch (6-8 reps/side) to elevate spindle sensitivity.',
      'Post-workout Static Protocol: Target lats, pecs, quads, psoas, soleus with 30s holds x 2 sets coupled with deep diaphragmatic breaths.',
      'Targeted PNF Mobility: Lie supine, stretch hamstring to tension limit -> resist downward 8s at 40% -> exhale and deepen stretch.',
    ],
  },
  {
    id: 'MOB-02',
    title_zh: '肌筋膜張力整合體 (Biotensegrity) 與滾筒放鬆科學：破除「按開筋結」迷思',
    title_en: 'Myofascial Biotensegrity & Foam Rolling: Debunking Fascial Adhesion Myths',
    category: 'FASCIA_TENSEGRITY',
    one_liner_zh: '滾筒與筋膜槍並非物理上「碾碎或拉長筋膜沾黏」，而是透過高密度機械受器向下調節神經系統張力與促進玻尿酸水合潤滑。',
    one_liner_en: 'Foam rolling modulates central nervous tone and hyaluronic hydration rather than breaking adhesions.',
    evidence_grade: 'A',
    neuro_mechanisms_zh: [
      '張力整合結構 (Biotensegrity)：人體不是疊積木的連續受壓柱，而是連續張力網絡（肌筋膜、肌腱、韌帶）懸浮不連續受壓元件（骨骼）。足底筋膜緊繃可直接透過後側淺表線 (Superficial Back Line) 傳導導致頸部頭痛。',
      '物理迷思破除：人體深層筋膜（如髂脛束 ITB、胸腰筋膜）抗拉強度媲美鋼索，研究證實改變其長度 1% 需超過 900 公斤的剪切力；滾筒與按摩滾輪不可能在物理上「壓散鈣化或撕開筋膜沾黏」。',
      '神經降調機制 (Descending Pain Modulation)：滾筒施加的深層壓力刺激了肌筋膜內豐富的魯菲尼氏小體 (Ruffini endings) 與巴齊尼氏小體 (Pacini corpuscles)，將感覺訊號送達大腦皮質，觸發中樞下行抑制，降低周邊交感神經肌緊張度。',
      '觸變性與玻尿酸水合 (Thixotropy & Hyaluronic Acid Hydration)：筋膜層間充斥玻尿酸潤滑液。久坐缺乏活動時玻尿酸黏度上升變得膠黏 (Dense/Viscous)；機械滾動與發熱使玻尿酸轉為流動態（觸變效應），促進組織液灌流刷新。',
    ],
    neuro_mechanisms_en: [
      'Biotensegrity Model: Skeletal structures are islands of compression held in equilibrium by a continuous tensile myofascial net.',
      'Debunking the Adhesion Myth: ITB and thoracolumbar fascia require >900kg of force to deform 1%; foam rollers cannot mechanically break tissue.',
      'Descending Neuromuscular Modulation: Deep pressure stimulates Ruffini and Pacini mechanoreceptors, downregulating sympathetic muscle tone.',
      'Thixotropy & Hyaluronan Rehydration: Static sedentary states cause viscous fascial densification; rolling induces shearing fluid exchange.',
    ],
    biomechanical_alignment_zh: [
      '禁止暴力滾壓髂脛束 (ITB)：髂脛束下層密布無髓鞘痛覺神經纖維，滾筒直接硬壓 ITB 只會引發嚴重的神經發炎與保護性痙攣；正確做法是放鬆連接 ITB 的「闊筋膜張肌 (TFL)」與「臀大肌」。',
      '施壓節奏與速度：每秒移動 1–2 公分，於激痛點 (Trigger point) 停留 30–60 秒配合腹式深呼吸，直到鈍痛感由 7/10 降至 3/10 以下。',
      '避免骨突與頸椎腰椎：嚴禁在肋骨懸空處、腰椎後突、大轉子骨凸處高速硬壓。',
    ],
    biomechanical_alignment_en: [
      'Never Roll the IT Band Directly: Rich in nociceptors, direct pressure inflames tissue; mobilize the attached TFL and gluteus maximus instead.',
      'Slow Pacing & Pausing: Roll 1-2 cm per second; pause on trigger points for 30-60s with diaphragmatic breathing until pain drops from 7/10 to 3/10.',
      'Avoid Bony Prominences: Do not roll unprotected lumbar spines or sharp femoral trochanters.',
    ],
    action_routines_zh: [
      '臀中肌與闊筋膜張肌 (TFL) 筋膜球放鬆：側躺將網球或筋膜球置於骨盆髂骨側下方，緩慢微幅滾動尋找激痛點，按壓 45 秒。',
      '足底筋膜與阿基里斯腱：站姿使用硬式高爾夫球或按摩球由腳跟向腳趾慢速碾壓，每次 60 秒，重啟淺背線張力彈性。',
      '胸椎後側淺層滾筒伸展：滾筒橫置於肩胛下緣，雙手抱頭托住頸部，吐氣時胸腔向後伸展展開，維持 5 次深呼吸。',
    ],
    action_routines_en: [
      'Glute Medius & TFL Release: Side-lying lacrosse ball mobilization beneath iliac crest for 45s on tender points.',
      'Plantar Fascia Decompression: Standing slow rolling with golf ball along arch and heel for 60s.',
      'Thoracic Extension Over Roller: Position roller under mid-thoracic spine, cradle neck, breathe out into 5 thoracic extensions.',
    ],
  },
  {
    id: 'MOB-03',
    title_zh: '主動關節活動度 (Active Mobility / CARs) vs 被動柔軟度：末端力量決定受傷防護力',
    title_en: 'Active Mobility (CARs) vs Passive Flexibility: End-Range Strength Prevents Joint Rupture',
    category: 'ACTIVE_MOBILITY_CARS',
    one_liner_zh: '沒有力量控制的柔軟度就是關節鬆弛 (Hypermobility) 與韌帶代償的定時炸彈；真正的活動度是你能主動支配控制的極限活動範圍。',
    one_liner_en: 'Flexibility without muscular control is joint instability; true mobility is usable strength at end range.',
    evidence_grade: 'A',
    neuro_mechanisms_zh: [
      '被動活動度 (PROM) vs 主動活動度 (AROM)：PROM 是外力（如教練推、重力壓）能達到的角度；AROM 是僅靠自身神經肌力能主動抵達並控制的角度。兩者的差值稱為「關節功能失調緩衝區 (Control Gap)」，差距越大，運動中韌帶撕裂機率激增。',
      '關節受控旋轉 (Controlled Articular Rotations, CARs)：由 Andreo Spina (FRC) 提出，透過最大限度的主動旋轉，刺激關節囊內的力學受器 (Mechanoreceptors)，向中樞神經系統「更新關節邊界地圖」。',
      '關節囊營養與軟骨健康：滑膜關節內部無直接血管分布，關節軟骨靠 CARs 進行「全角度的關節囊擠壓與減壓 (Fluid Imbibition)」，才能獲取養分並代謝磨損產物。',
      '輻射定律 (Sherrington\'s Law of Irradiation)：進行局部關節末端控制時，全身其他肌肉同步建立高張力收縮（軀幹核心鎖死），能大幅增強中樞神經對末端薄弱肌群的運動神經驅動電流。',
    ],
    neuro_mechanisms_en: [
      'PROM vs AROM Gap: Difference between passive range and active muscular control creates an injury-prone vulnerability zone.',
      'Controlled Articular Rotations (CARs): Maximal active rotational movements that map joint capsules and nourish synovial tissue.',
      'Cartilage Nutrition via Imbibition: Avascular articular cartilage relies on cyclic capsular pressure gradients to absorb nutrients.',
      'Law of Irradiation: Creating high intra-abdominal tension radiates neural drive to weak end-range motor units.',
    ],
    biomechanical_alignment_zh: [
      '旋轉原則：動作必須極致緩慢（旋轉一圈耗時 10–15 秒），禁止借助任何慣性甩動。',
      '隔離原則：旋轉肩關節時軀幹絕對不扭轉、頭部不晃動；旋轉髖關節時骨盆絕對不翻轉代償。',
      '無痛原則：繞過關節內的「刺痛夾擠點 (Closing Angle Impingement)」，絕不可硬頂骨質碰撞疼痛。',
    ],
    biomechanical_alignment_en: [
      'Slow Velocity Principle: Complete one full CAR revolution in 10-15 seconds without relying on momentum.',
      'Strict Joint Isolation: When performing hip CARs, pelvis stays pinned; when shoulder CARs, spine remains rigid.',
      'Avoid Closing-Angle Pinch: Never force through sharp osseous pinching or impingement.',
    ],
    action_routines_zh: [
      '每日晨起關節 CARs 晨操 (5分鐘)：頸椎 CARs (左右各3圈) -> 盂肱關節 CARs (雙側各3圈) -> 骨盆鎖定胸椎 CARs -> 站姿/四足跪姿髖關節 CARs (各3圈)。',
      '末端等長加強 (PAILs/RAILs)：深蹲到底部停留，雙腳向外推膝蓋維持 10 秒等長收縮 (PAILs)，再主動使用臀肌向外拉開 10 秒 (RAILs)。',
      '腳踝主動背屈末端提拉：坐姿伸直雙腿，小腿不動，純靠脛前肌將腳尖向膝蓋死命勾緊並維持 10 秒 x 3 組。',
    ],
    action_routines_en: [
      'Daily 5-Min Morning CARs Routine: Neck CARs (3 reps) -> Shoulder CARs (3 reps) -> Thoracic CARs -> Quadruped Hip CARs (3 reps/side).',
      'PAILs/RAILs End-Range Isometrics: In deep squat, press knees inward against resistance (PAILs 10s) followed by active outward glute drive (RAILs 10s).',
      'Tibialis Anterior End-Range Pulls: Seated dorsiflexion isometric holds for 10s x 3 sets to build shin braking strength.',
    ],
  },
  {
    id: 'MOB-04',
    title_zh: '下交叉症候群 (Lower Crossed Syndrome) 與骨盆力學：破除久坐腰椎剪力',
    title_en: 'Lower Crossed Syndrome & Pelvic Mechanics: Eliminating Lumbar Shear from Sedentary Life',
    category: 'PELVIC_POSTURE',
    one_liner_zh: '骨盆是人體力量傳遞的中樞底盤；下交叉的緊繃與無力對角線若不解除，任何深蹲與跑步都會轉化為腰椎 L4–S1 的毀滅性剪力。',
    one_liner_en: 'Pelvic tilt dictates spinal safety; uncorrected lower crossed syndrome turns squats into lumbar destructive shear.',
    evidence_grade: 'A',
    neuro_mechanisms_zh: [
      '弗拉基米爾·揚達 (Vladimir Janda) 下交叉模型：過度緊繃的「髂腰肌與豎脊肌」形成一條線，受到神經抑制而失憶無力的「腹直肌/腹橫肌與臀大肌」形成交叉線。',
      '骨盆前傾 (Anterior Pelvic Tilt) 骨科力學：骨盆向前傾斜超過 10°–15°，使腰椎前凸 (Lordosis) 極度加大，小面關節 (Facet Joints) 互相擠壓，椎間盤承受巨大的前方張力與後方應力集中。',
      '臀肌失憶症 (Glute Amnesia)：由於髂腰肌長期處於短縮緊繃狀態，神經交互抑制強迫對側的臀大肌運動神經元休眠；在站立或蹬地時改由腰部豎脊肌與膕繩肌過度代償。',
      '核心圓柱體腹內壓 (IAP) 崩塌：骨盆前傾伴隨肋骨外翻 (Rib Flare)，使橫膈膜與骨盆底肌失去平行同軸對齊，無法建立均勻的 360° 腹內壓，腰椎失去液壓支撐柱。',
    ],
    neuro_mechanisms_en: [
      'Janda Lower Crossed Syndrome: Hyperactive psoas and lumbar erectors cross with neurologically inhibited rectus abdominis and gluteus maximus.',
      'Biomechanical Shear of Anterior Pelvic Tilt: Pelvic tilt >15° hyperextends lumbar lordosis, jamming facet joints and compressing posterior discs.',
      'Gluteal Amnesia via Reciprocal Inhibition: Shortened hip flexors downregulate gluteus maximus drive, overloading hamstrings and lower back.',
      'Collapse of Intra-Abdominal Pressure (IAP): Rib flaring decouples diaphragm from pelvic floor, destroying the hydraulic spinal brace.',
    ],
    biomechanical_alignment_zh: [
      '中立骨盆自檢：雙手食指摸髂前上棘 (ASIS)，手掌根摸恥骨聯合 (Pubic Symphysis)；正常站立時此三點形成的三角形平面應垂直於地面。',
      '避免站姿骨盆假中立：嚴禁透過過度夾屁股將骨盆推向前方的「搖擺背 (Swayback)」體態，此舉會加劇髖關節前側關節囊磨損。',
      '深蹲肋骨與骨盆鎖定：下蹲全程將肋骨下緣向下收緊（想像肋骨與骨盆拉鏈拉上），維持圓柱形腹壓。',
    ],
    biomechanical_alignment_en: [
      'Pelvic Neutral Self-Check: Plane connecting ASIS and pubic symphysis should be strictly vertical in standing posture.',
      'Avoid Swayback Compensation: Do not shove pelvis forward in false posterior tilt, which impinges anterior hip capsules.',
      'Ribcage-Pelvic Cylinder Lock: Keep lower ribs pinned down to pelvis ("zipper locked") during entire squat descent.',
    ],
    action_routines_zh: [
      '沙發深層髖屈肌拉伸 (Couch Stretch)：後腳小腿貼牆或沙發，前腳成弓箭步，臀部收緊用力推向骨盆後傾，維持 60 秒深呼吸。',
      '死蟲式 (Dead Bug) 腹內壓對稱啟動：仰臥下背緊貼地板（嚴禁拱起縫隙），緩慢對角伸展手腳，每邊 8 次 x 3 組。',
      '單腿臀橋與彈力帶蚌殼式：啟動深層臀中肌與臀大肌，頂點用力夾緊 3 秒，徹底喚醒休眠運動神經元。',
    ],
    action_routines_en: [
      'Couch Stretch with Posterior Pelvic Tuck: Rear shin against wall, tuck pelvis posteriorly and squeeze glute for 60s.',
      'Dead Bug with Diaphragmatic Cylinder: Keep lumbar spine completely flat against ground, alternate diagonal limbs for 8 reps x 3 sets.',
      'Single-Leg Glute Bridges & Banded Clamshells: Isometric glute hold at apex for 3 seconds to re-awaken inhibited motor units.',
    ],
  },
  {
    id: 'MOB-05',
    title_zh: '關節軟骨營養、滑液潤滑動力學與骨質疏鬆防禦：骨骼力學重塑 (Wolff 定律)',
    title_en: 'Cartilage Synovial Dynamics & Osteoporosis Prevention: Wolff\'s Law Bone Remodeling',
    category: 'JOINT_DEGENERATION',
    one_liner_zh: '關節不是汽車輪胎「用久了必然磨光」，骨骼與軟骨是有活性的生物組織；適度的軸向週期性負載是軟骨營養灌注與骨密度倍增的唯一途徑。',
    one_liner_en: 'Joints are living biological tissues; cyclical axial loading is essential for cartilage imbibition and bone remodeling.',
    evidence_grade: 'A',
    neuro_mechanisms_zh: [
      '軟骨無血管特性與海綿效應 (Cartilage Imbibition)：關節軟骨沒有血管與淋巴供應，完全依靠關節受壓時排出代謝廢物、減壓時吸收周圍滑液 (Synovial Fluid) 中的葡萄糖與玻尿酸。久坐不動會使軟骨加速乾枯萎縮。',
      '沃爾夫定律 (Wolff\'s Law) 與機械訊號轉導 (Mechanotransduction)：骨骼會根據承受的外力機械應變進行內部結構重塑。當骨細胞 (Osteocytes) 感受到軸向壓縮剪力時，前列腺素與一氧化氮訊號激發造骨細胞 (Osteoblasts)，合成羥基磷灰石晶體提升骨小樑密度。',
      '游泳與騎車對骨密度的盲點：雖然游泳與自行車心肺效益卓越，但因無衝擊力或低軸向骨應變，長期純騎車或游泳運動員的脊椎骨密度 (BMD) 常顯著低於跑步與阻力訓練者，甚至落入骨質缺乏 (Osteopenia)。',
      '軟骨退化 (Osteoarthritis) 的真正成因：主要並非「過度使用」，而是「關節不穩定」、「肌力不足導致衝擊未被肌肉吸收」或「局部力線偏斜異常應力集中」。強大的周邊肌力能為關節吸收 60–80% 的著地衝擊峰值。',
    ],
    neuro_mechanisms_en: [
      'Avascular Cartilage & Sponge Imbibition: Articular cartilage lacks blood vessels; it absorbs glucose and synovial fluid exclusively via cyclical loading cycles.',
      'Wolff\'s Law & Mechanotransduction: Fluid shear in osteocyte canaliculi triggers osteoblasts to lay down hydroxyapatite matrix under axial strain.',
      'Non-Impact Sport Blindspot: Swimmers and cyclists often present lower bone mineral density due to absence of ground impact shock.',
      'True Etiology of Osteoarthritis: Instability, muscular deficits, and malalignment cause degenerative wear, not loading volume alone.',
    ],
    biomechanical_alignment_zh: [
      '軸向抗重力刺激要求：要刺激下肢與腰椎骨密度增生，負載強度需達到 1.5–3 倍體重（如負重深蹲、硬舉、跳躍落地）。',
      '下坡走路力學：登山或下樓梯時，股四頭肌離心收縮，著地瞬間維持膝微屈 (15°–20°)，利用肌肉彈性緩衝，嚴禁鎖死關節傳遞硬衝擊。',
      '補水與軟骨潤滑：軟骨基質 70–80% 為水分，若長期處於脫水狀態，滑液黏彈性急遽惡化，磨損速率加倍。',
    ],
    biomechanical_alignment_en: [
      'Axial Loading Threshold: Bone density stimulus requires axial compressive loads of 1.5-3x bodyweight (squats, deadlifts, hops).',
      'Downhill Braking Mechanics: Land with slight knee flexion (15-20°) to engage eccentric quad shock absorption; never lock knees.',
      'Hydration & Cartilage Viscoelasticity: Cartilage is 70-80% water; dehydration compromises synovial fluid friction coefficients.',
    ],
    action_routines_zh: [
      '預防骨質疏鬆阻力處方：每週 2–3 次大肌群多關節負重訓練（硬舉、深蹲、立姿肩推），強度維持在 70–85% 1RM。',
      '骨小樑三維多向衝擊訓練：每週 2 次跳繩 100 下、雙腳階梯跳 (Box Step Jump) 或多方向敏捷橫向跳躍，給予骨骼多角度應變刺激。',
      '關節軟骨營養灌流活動：每天進行深蹲全範圍等長支撐 (Isometric Wall Sit 45秒) + 踝/膝/髖關節 CARs 各關節輕柔活動 20 次。',
    ],
    action_routines_en: [
      'Osteoporosis Resistance Prescription: 2-3 weekly multi-joint sessions (deadlifts, squats, standing press) at 70-85% 1RM.',
      'Multi-Directional Bone Impact Jumps: 2x weekly jump roping (100 skips) or multidirectional hops to stimulate multidimensional trabeculae.',
      'Synovial Imbibition Routine: Wall sits (45s holds) + full range gentle CARs 20 reps to circulate synovial nutrients.',
    ],
  },
];
