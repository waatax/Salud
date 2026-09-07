import { HumanSystem } from '../types';

export const HUMAN_SYSTEMS: HumanSystem[] = [
  {
    id: 'digestive',
    name_zh: '消化與腸道菌群系統',
    name_en: 'Digestive & Gastrointestinal System',
    tagline_zh: '人體能量轉換引擎、70% 免疫防線與「第二大腦」腸腦軸線',
    tagline_en: 'Energy transformation engine, 70% immune barrier & gut-brain axis',
    description_zh: '消化系統由長達 9 公尺的消化管與肝、膽、胰腺組成。不僅負責巨量營養素的化學裂解與吸收，更透過 38 兆腸道菌群代謝產生短鏈脂肪酸（SCFA）調控全身代謝、免疫耐受與血腦屏障通透性。',
    icon_name: 'Utensils',
    theme_color: '#F59E0B',
    accent_gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '胃 (Stomach)',
        name_en: 'Stomach',
        role_zh: '分泌胃酸 (pH 1.5-2.0) 活化胃蛋白酶、殺滅外源病原體，並分泌內在因子 (Intrinsic Factor) 供維生素 B12 吸收。',
        clinical_note_zh: '長期過量使用質子泵阻斷劑 (PPI) 可能導致低胃酸症，影響鈣、鎂、鐵與 B12 吸收。'
      },
      {
        name_zh: '小腸 (Small Intestine)',
        name_en: 'Small Intestine (Duodenum, Jejunum, Ileum)',
        role_zh: '長約 6 公尺，透過微絨毛構成約 30 平方公尺表面積，完成 90% 以上營養素吸收與膽鹽腸肝循環。',
        clinical_note_zh: '緊密連接蛋白 (Tight Junctions) 受慢性酒精或發炎破壞時會引發「腸漏 (Intestinal Hyperpermeability)」。'
      },
      {
        name_zh: '大腸與結腸 (Large Intestine & Colon)',
        name_en: 'Colon & Microbiome Hub',
        role_zh: '水分電解質重吸收，主導 1000+ 種腸道共生菌發酵不可消化多醣（膳食纖維），生成丁酸等短鏈脂肪酸。',
        clinical_note_zh: '結直腸息肉腺瘤為大腸癌癌前病變，定期糞便潛血與大腸鏡為 Grade A 預防指引。'
      },
      {
        name_zh: '肝臟與膽囊 (Liver & Gallbladder)',
        name_en: 'Liver & Biliary System',
        role_zh: '人體最大代謝化學工廠，負責糖質新生、白蛋白合成、第一/二相解毒作用與膽汁酸乳化脂肪。',
        clinical_note_zh: '代謝相關脂肪性肝病 (MASLD) 為現代肝纖維化與動脈粥狀硬化的核心發動機。'
      },
      {
        name_zh: '胰臟 (Pancreas)',
        name_en: 'Pancreas (Exocrine & Endocrine)',
        role_zh: '外分泌胰蛋白酶、脂肪酶與碳酸氫鈉中和胃酸；內分泌胰島 α/β 細胞精準調控升糖素與胰島素。',
        clinical_note_zh: '高三酸甘油脂血症 (>500 mg/dL) 或膽結石嵌頓是急性壞死性胰臟炎的兩大急症導火線。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '腸上皮黏膜屏障與緊密連接 (Tight Junctions)',
        detail_zh: '由 Claudin、Occludin 與 ZO-1 構成極度緻密的分子篩，僅允許小於 600 Da 的水溶性物質通過，阻絕細菌內毒素 (LPS) 滲漏進入門靜脈引發全身性慢性發炎。',
        biomolecules: ['Claudin-1', 'Occludin', 'Zonula Occludens-1 (ZO-1)', 'Mucin-2 (MUC2)']
      },
      {
        title_zh: '微生物短鏈脂肪酸 (SCFA) 免疫代謝訊號',
        detail_zh: '擬桿菌門與厚壁菌門發酵可溶性膳食纖維產出乙酸、丙酸與丁酸。丁酸為結腸上皮細胞提供 70% 能量，並結合 GPR41/43 受體抑制 HDAC，誘導 Foxp3+ 調節型 T 細胞 (Treg) 抑制自體免疫。',
        biomolecules: ['Butyrate (丁酸)', 'Propionate (丙酸)', 'GPR41/43 (FFAR3/2)', 'Foxp3+ Treg']
      },
      {
        title_zh: '迷走神經與腸腦軸線 (Gut-Brain Axis)',
        detail_zh: '腸道嗜鉻細胞合成人體 90% 以上血清素 (5-HT)。腸道菌代謝產物透過迷走神經傳入纖維即時傳送神經信號至孤立束核，直接調控焦慮、飽足感與情緒調節。',
        biomolecules: ['Serotonin (5-HT)', 'Vagus Nerve', 'Glucagon-like Peptide-1 (GLP-1)', 'Ghrelin']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-DIG-01',
        title_zh: '植物多樣性每週 30 種法則',
        statement_zh: '每週攝取超過 30 種不同植物性食材（全穀、豆類、蔬菜、堅果），腸道菌相 α 多樣性顯著高於每週少於 10 種者，且抗藥性基因庫減少。',
        evidence_grade: 'A',
        why_matters_zh: '菌相多樣性是預防第 2 型糖尿病與結直腸癌的實證最強生物標記。'
      },
      {
        id: 'SYS-DIG-02',
        title_zh: '胃黏膜保護前列腺素與 NSAIDs 禁忌',
        statement_zh: '胃黏膜上皮依賴 COX-1 酵素合成前列腺素 E2 (PGE2) 刺激黏液與碳酸氫鹽屏障；長期空腹服用非類固醇消炎藥 (NSAIDs) 會阻斷 PGE2 引發潰瘍出血。',
        evidence_grade: 'A',
        why_matters_zh: '避免無保護下長期服用止痛藥引發穿孔性潰瘍急症。'
      },
      {
        id: 'SYS-DIG-03',
        title_zh: '超加工食品 (UPF) 對腸黏膜黏液層的破壞',
        statement_zh: '食品乳化劑（如羧甲基纖維素 CMC、聚山梨酯 80）可直接溶解結腸 MUC2 黏液層保護層，使細菌直接貼附上皮細胞誘發結腸炎。',
        evidence_grade: 'B',
        why_matters_zh: '減少超加工食品可迅速修復黏膜厚度。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '胃食道逆流病 (GERD) 與巴瑞特食道 (Barrett Esophagus)',
        mechanism_zh: '下食道括約肌 (LES) 鬆弛或腹壓過高，酸性胃液逆流灼傷無角質化鱗狀上皮，反覆慢性發炎可誘發腸化生形成巴瑞特食道腺癌風險。',
        risk_factors_zh: ['腹部肥胖', '睡前 3 小時進食', '高脂肪低纖維飲食', '抽菸與高酒精'],
        prevention_zh: '床頭抬高 15-20cm、避免暴飲暴食、維持餐後直立 2 小時。'
      },
      {
        name_zh: '代謝相關脂肪性肝病 (MASLD / NAFLD)',
        mechanism_zh: '過量果糖與精緻糖在肝臟加速新生脂肪生成 (DNL)，肝細胞三酸甘油脂蓄積誘發粒線體脂毒性與纖維化。',
        risk_factors_zh: ['高果糖玉米糖漿', '胰島素阻抗', '腹部內臟脂肪', '久坐'],
        prevention_zh: '地中海飲食替代精緻糖、每週 150 分鐘中高強度運動減少肝臟脂肪 30% 以上。'
      },
      {
        name_zh: '大腸激躁症 (IBS) 與小腸細菌過度增生 (SIBO)',
        mechanism_zh: '內臟高敏感性結合胃腸蠕動異常，發酵性寡糖、雙糖、單糖及多元醇 (FODMAP) 於消化道異常快速發酵產氣引發劇烈脹痛。',
        risk_factors_zh: ['腸道感染病史', '長期心理高壓', '不規律作息', '抗生素濫用'],
        prevention_zh: '短期低 FODMAP 飲食引導、腹式呼吸調節迷走神經張力。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '解黑便（瀝青便 Melena）或嘔吐咖啡色液體',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑上消化道急性大量出血（潰瘍或靜脈瘤），立即送急診。'
      },
      {
        flag_zh: '非刻意性 6 個月內體重減輕 >5-10%',
        urgency: 'URGENT',
        action_zh: '伴隨排便習慣改變，需排除消化道惡性腫瘤，儘速掛胃腸肝膽科檢查。'
      },
      {
        flag_zh: '漸進性吞嚥困難（固體食物卡住逐漸惡化為流質卡住）',
        urgency: 'URGENT',
        action_zh: '需緊急安排上消化道內視鏡檢查排除食道癌或賁門失弛緩症。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'NUTRITION',
        rule_zh: '每餐「蛋白質與膳食纖維」先於精緻澱粉進食',
        mechanism_zh: '先行進入十二指腸的纖維與蛋白刺激 L 細胞分泌 GLP-1 與 PYY，延緩胃排空並平抑餐後血糖振幅達 40%。',
        practical_action_zh: '每餐先吃一碗深綠色蔬菜與豆魚蛋肉類，咀嚼至少 20 秒，最後才吃澱粉主食。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '餐後 15 分鐘進行 10-20 分鐘低強度散步',
        mechanism_zh: '溫和骨骼肌收縮透過非胰島素途徑吸收血液葡萄糖，並透過輕度腹內壓節律促進胃腸正常蠕動排氣。',
        practical_action_zh: '午餐或晚餐後避免立刻平躺，起身散步 1500-2000 步。'
      },
      {
        category: 'SLEEP',
        rule_zh: '睡前 3 小時恪守斷食邊界',
        mechanism_zh: '使胃部在進入睡眠平躺前完成大部分排空，防止夜間平臥胃酸逆流，並啟動消化道移行性複合運動 (MMC) 清除殘渣。',
        practical_action_zh: '晚上 8 點後不再攝取熱量固體食物，只補充少量溫開水。'
      }
    ],
    expert_council_reviewers: ['EC-14', 'EC-15', 'EC-01', 'EC-21'],
    research_citations: [
      {
        authors: 'McDonald D, et al. (American Gut Consortium)',
        year: 2018,
        title: 'American Gut: an Open Platform for Citizen Science Microbiome Research',
        journal: 'mSystems / Cell Press',
        doi: '10.1128/mSystems.00031-18',
        key_takeaway_zh: '攝取 >30 種不同植物的個體擁有更健康的菌相代謝型態與較低的發炎標記。'
      },
      {
        authors: 'Rinella ME, et al.',
        year: 2023,
        title: 'A multi-society Delphi consensus statement on new fatty liver disease nomenclature',
        journal: 'Hepatology / Lancet Gastroenterol Hepatol',
        doi: '10.1097/HEP.0000000000000520',
        key_takeaway_zh: '正名代謝相關脂肪肝 (MASLD)，強調心血管與代謝共病之核心機轉防治。'
      }
    ]
  },
  {
    id: 'respiratory',
    name_zh: '呼吸與氣體交換系統',
    name_en: 'Respiratory & Gas Exchange System',
    tagline_zh: '細胞有氧呼吸門戶、肺泡 70 平方米微毛細血管網與酸鹼調節中樞',
    tagline_en: 'Cellular aerobic gateway, 70m² alveolar capillary mesh & pH homeostasis',
    description_zh: '呼吸系統掌管全身組織細胞的氧氣（O2）輸送與二氧化碳（CO2）清除。由鼻咽氣管樹與 3 億顆肺泡微囊構成，每分鐘通氣約 6-8 公升，更是人體在秒級別調節血漿 pH 值的最即時生理機制。',
    icon_name: 'Wind',
    theme_color: '#06B6D4',
    accent_gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '氣管與支氣管樹 (Tracheobronchial Tree)',
        name_en: 'Conducting Zone & Cilia Elevator',
        role_zh: '管壁軟骨維持通暢，纖毛柱狀上皮構成「黏液纖毛電梯 (Mucociliary Escalator)」，以每分鐘 1 公分速度將外來吸入微粒向喉部推進咳出。',
        clinical_note_zh: '香菸煙霧與高濃度 PM2.5 會直接麻痺纖毛擺動，導致分泌物滯留與反覆感染。'
      },
      {
        name_zh: '肺泡與微毛細血管膜 (Alveoli & Blood-Air Barrier)',
        name_en: 'Respiratory Zone (Gas Exchange)',
        role_zh: '約 3-5 億個微囊，總表面積達 70 平方公尺。氣血屏障極薄（僅 0.2-0.5 微米），O2 與 CO2 透過純物理被動擴散完成平衡。',
        clinical_note_zh: '第二型肺泡細胞分泌表面活性劑 (Surfactant) 降低表面張力，防止呼氣末期肺泡萎縮塌陷。'
      },
      {
        name_zh: '橫膈膜與肋間肌 (Diaphragm & Intercostal Muscles)',
        name_en: 'Primary Respiratory Pump',
        role_zh: '人體主要吸氣肌。橫膈下移 1 公分產生負壓吸入約 500 mL 空氣；深吸氣可下移 5-10 公分。',
        clinical_note_zh: '淺快胸式呼吸常伴隨副交感低落與慢性焦慮，膈肌訓練可改善通氣效率並刺激迷走神經。'
      },
      {
        name_zh: '腦幹延腦化學受器 (Medullary Chemoreceptors)',
        name_en: 'Central Respiratory Drive Controller',
        role_zh: '偵測腦脊液中氫離子 (H+) 濃度（由動脈 PaCO2 擴散形成），PaCO2 微升 2-3 mmHg 即能使呼吸驅動力倍增。',
        clinical_note_zh: '慢阻肺 (COPD) 晚期因長期高碳酸血症，呼吸驅動常轉為依賴周邊頸動脈竇之低氧驅動。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '氧合血紅素解離曲線與波耳效應 (Bohr Effect)',
        detail_zh: '在活躍代謝組織中，局部溫度上升、PCO2 升高與 pH 降低（酸性），使血紅素對氧氣的親和力下降，曲線右移，促使氧氣大量釋放至缺氧細胞供粒線體產生 ATP。',
        biomolecules: ['Hemoglobin (Hb)', '2,3-BPG', 'PaO2 / PaCO2', 'Carbonic Anhydrase']
      },
      {
        title_zh: '碳酸-碳酸氫根秒級血漿緩衝平衡',
        detail_zh: 'CO2 + H2O ⇌ H2CO3 ⇌ H+ + HCO3-。當體內代謝產酸增加時，延腦立即刺激過度通氣排出 CO2，在數秒至數分鐘內拉回血液 pH 至 7.35-7.45 的嚴密安全窗口。',
        biomolecules: ['Bicarbonate (HCO3-)', 'Carbon Dioxide (CO2)', 'Hydrogen ion (H+)']
      },
      {
        title_zh: 'VO2 max 最大攝氧量與粒線體氧利用極限',
        detail_zh: '由心輸出量（心血管供氧能力）與動靜脈氧分壓差（骨骼肌粒線體攝取能力）共同決定。VO2 max 是全因死亡率預測力最強的生理指標。',
        biomolecules: ['VO2 max', 'Mitochondrial Density', 'Capillary Density', 'Myoglobin']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-RESP-01',
        title_zh: '最大攝氧量 (VO2 Max) 與壽命長度的高度正相關',
        statement_zh: '心肺適能處於前 2.5% 的群體，全因死亡風險較後 25% 者降低近 80%，其保護效果超越戒菸、降血壓藥物或降膽固醇治療。',
        evidence_grade: 'A',
        why_matters_zh: '每週安排 Zone 2 與少量 Zone 5 HIIT 是提升 VO2 Max 最實證之道。'
      },
      {
        id: 'SYS-RESP-02',
        title_zh: '鼻子呼吸 vs 口呼吸的生理差異',
        statement_zh: '鼻腔副鼻竇自然生成一氧化氮 (NO)，鼻吸氣將高濃度 NO 送入肺部可舒張肺血管、改善通氣灌流比 (V/Q ratio) 並過濾微粒加溫濕潤。',
        evidence_grade: 'B',
        why_matters_zh: '日間與夜間維持鼻呼吸能顯著減少氣道發炎與睡眠呼吸中止。'
      },
      {
        id: 'SYS-RESP-03',
        title_zh: '肺泡表面活性劑與深呼吸擴張效應',
        statement_zh: '長期淺呼吸導致肺底部肺泡微萎陷；定時進行「深長吸氣-維持2秒-緩慢吐氣」可刺激第二型肺泡分泌表面活性劑，維持肺順應性。',
        evidence_grade: 'B',
        why_matters_zh: '久坐族每日 5 分鐘腹式深呼吸防範肺擴張不全。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '慢性阻塞性肺疾病 (COPD / 肺氣腫與慢性支氣管炎)',
        mechanism_zh: '菸霧與有害微粒誘發巨噬細胞與嗜中性球釋放蛋白酶（彈性蛋白酶），破壞肺泡彈性回縮力，造成氣道塌陷與不可逆氣流受限。',
        risk_factors_zh: ['長期吸菸 (包括二/三手菸)', '燃煤與烹飪油煙', 'PM2.5 空氣污染', 'α1-抗胰蛋白酶缺乏'],
        prevention_zh: '全面戒菸、改善室內油煙通風、規律耐力運動減緩 FEV1 每年生理流失速率。'
      },
      {
        name_zh: '支氣管氣喘 (Bronchial Asthma)',
        mechanism_zh: '氣道高反應性與 Th2/嗜酸性球發炎反應，支氣管平滑肌痙攣、黏膜水腫與大量黏稠分泌物，造成可逆性呼氣性呼吸困難與喘鳴。',
        risk_factors_zh: ['塵蟎與黴菌過敏原', '溫差劇變', '呼吸道病毒感染', '劇烈運動冷空氣吸入'],
        prevention_zh: '維持室內濕度 50%、運動前充分暖身與鼻呼吸加溫。'
      },
      {
        name_zh: '阻塞型睡眠呼吸中止症 (OSA)',
        mechanism_zh: '睡眠時咽喉軟組織塌陷阻塞上呼吸道，引發反覆夜間間歇性低氧 (Intermittent Hypoxia) 與微覺醒，大幅刺激交感神經導致頑固性高血壓與心律不整。',
        risk_factors_zh: ['頸圍過粗 (>40cm)', '肥胖 BMI>27', '下顎後縮', '睡前飲酒'],
        prevention_zh: '體重控制減脂、側睡姿勢治療、重度患者使用正壓呼吸器 (CPAP)。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '咳血（Hemoptysis）或痰中大量帶鮮血',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑肺結核、支氣管擴張症破裂或肺部腫瘤，需立刻急診胸部 CT 評估。'
      },
      {
        flag_zh: '突發性單側劇烈胸痛伴隨嚴重呼吸困難',
        urgency: 'EMERGENT',
        action_zh: '懷疑自發性氣胸 (Pneumothorax) 或急性肺栓塞 (PE)，具生命危險，立即叫救護車送醫。'
      },
      {
        flag_zh: '靜息狀態下指氧飽和度 (SpO2) < 92% 或嘴唇指甲發紺',
        urgency: 'URGENT',
        action_zh: '嚴重呼吸衰竭警訊，需立即吸氧治療並探查原發病因。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'EXERCISE',
        rule_zh: '每週累計 150-300 分鐘 Zone 2 低強度有氧訓練',
        mechanism_zh: '刺激毛細血管網新生、增加肺泡通氣灌流匹配度，並大幅擴增骨骼肌粒線體密度與利用氧氣效率。',
        practical_action_zh: '維持「可以講完整句子但無法唱歌」的運動強度（如快走、定速單車），每週 3-4 次每次 45 分鐘。'
      },
      {
        category: 'STRESS',
        rule_zh: '生理性嘆氣 (Physiological Sigh) 急性減壓法',
        mechanism_zh: '連續兩次深鼻吸氣使塌陷肺泡重新充分擴張，再經由口長吐氣排出最大量 CO2，直接啟動迷走神經傳遞緩慢心律訊號。',
        practical_action_zh: '感到緊繃焦慮時，做 3 次「快速兩次鼻吸氣 + 一次慢速長吐氣」。'
      },
      {
        category: 'NUTRITION',
        rule_zh: '高抗氧化與植化素保護肺黏膜上皮',
        mechanism_zh: '維生素 C、N-乙醯半胱胺酸 (NAC) 補充前驅物與十字花科蘿蔔硫素 (Sulforaphane)，活化 Nrf2 路徑抵抗空污氧化壓力。',
        practical_action_zh: '每日食用西蘭花芽菜或花椰菜，攝取柑橘類與深色莓果。'
      }
    ],
    expert_council_reviewers: ['EC-16', 'EC-03', 'EC-01', 'EC-17'],
    research_citations: [
      {
        authors: 'Mandsager K, et al.',
        year: 2018,
        title: 'Association of Cardiorespiratory Fitness With Long-term Mortality Among Adults Undergoing Exercise Treadmill Testing',
        journal: 'JAMA Network Open',
        doi: '10.1001/jamanetworkopen.2018.3605',
        key_takeaway_zh: '超過 12 萬人的世代研究證實：極高心肺適能 (VO2 max) 帶來無上限的長期存活獲益。'
      },
      {
        authors: 'Balban MY, et al.',
        year: 2023,
        title: 'Brief structured respiration practices enhance mood and reduce physiological arousal',
        journal: 'Cell Reports Medicine',
        doi: '10.1016/j.xcrm.2022.100895',
        key_takeaway_zh: '每日 5 分鐘生理性嘆氣呼吸顯著降低生理自主神經激發並改善負向情緒。'
      }
    ]
  },
  {
    id: 'nervous',
    name_zh: '神經與大腦認知系統',
    name_en: 'Nervous & Brain Cognitive System',
    tagline_zh: '全身神經網絡總指揮、膠淋巴慢波夜間排毒與神經可塑性 (BDNF)',
    tagline_en: 'Master command center, glymphatic slow-wave clearance & neuroplasticity',
    description_zh: '神經系統包含大腦 860 億個神經元與脊髓、周邊自主神經網絡。大腦重量僅占體重 2%，卻耗用全身 20% 氧氣與葡萄糖。透過突觸遞質、腦血屏障與慢波睡眠時獨特開啟的「膠淋巴系統 (Glymphatic System)」，守護終生認知儲備與神經可塑性。',
    icon_name: 'Brain',
    theme_color: '#8B5CF6',
    accent_gradient: 'from-purple-500/20 via-violet-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '大腦皮質與海馬迴 (Cerebral Cortex & Hippocampus)',
        name_en: 'Cerebral Cortex & Hippocampal Formation',
        role_zh: '額葉主導執行功能與決策，海馬迴主導短期記憶向長期記憶鞏固；終生具備神經新生 (Neurogenesis) 潛能。',
        clinical_note_zh: '海馬迴對慢性皮質醇（壓力）與高胰島素阻抗極端敏感，萎縮為失智症早期徵兆。'
      },
      {
        name_zh: '膠淋巴系統 (Glymphatic System / 星狀膠細胞)',
        name_en: 'Glymphatic Brain Detox Hub',
        role_zh: '在 NREM 第 3 階段慢波深睡眠期，腦間質空間擴大 60%，腦脊液 (CSF) 經由 AQP4 水通道快速沖刷清除 β 類澱粉蛋白與 Tau 蛋白。',
        clinical_note_zh: '慢性睡眠剝奪會直接阻斷膠淋巴排毒，導致神經退化蛋白質加速沉積。'
      },
      {
        name_zh: '下視丘與腦下垂體 (Hypothalamus & Pituitary)',
        name_en: 'Central Neuroendocrine Axis',
        role_zh: '視交叉上核 (SCN) 為晝夜節律主時鐘；統籌體溫、飢餓、口渴滲透壓與 HPA 壓力反應軸。',
        clinical_note_zh: '夜間藍光曝露會強烈抑制褪黑激素合成，打亂下視丘節律信號。'
      },
      {
        name_zh: '迷走神經與自主神經系 (Vagus Nerve & Autonomic Nervous System)',
        name_en: 'Parasympathetic Brake & Vagal Tone',
        role_zh: '第十對腦神經貫穿胸腹臟器，心率變異度 (HRV) 的主要生理驅動力，抗發炎反射神經迴路。',
        clinical_note_zh: '迷走神經張力高代表自主神經抗壓恢復力佳，心血管事件風險較低。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '腦源性神經營養因子 (BDNF) 與神經可塑性',
        detail_zh: '運動時骨骼肌分泌鳶尾素 (Irisin) 與乳酸，穿透血腦屏障誘導海馬迴大量合成 BDNF，促進樹突棘生長與新突觸形成，強化學習記憶。',
        biomolecules: ['BDNF', 'TrkB Receptor', 'Irisin', 'L-Lactate']
      },
      {
        title_zh: '血腦屏障 (Blood-Brain Barrier, BBB) 的嚴格選擇性',
        detail_zh: '由腦微血管內皮細胞、周細胞與星狀膠細胞足突共同構成，阻絕外源毒素與周邊發炎細胞因子進入中樞神經，僅特異性轉運葡萄糖 (GLUT1) 與必需胺基酸。',
        biomolecules: ['Tight Junctions', 'Astrocytic Endfeet', 'GLUT1', 'P-glycoprotein']
      },
      {
        title_zh: '突觸神經傳導物質平衡 (GABA vs Glutamate)',
        detail_zh: '麩胺酸 (Glutamate) 為中樞主要興奮性遞質，過度累積會誘發 NMDA 受體介導之「興奮性毒性 (Excitotoxicity)」導致細胞死亡；GABA 則為主要抑制性煞車，維護神經安寧。',
        biomolecules: ['GABA', 'Glutamate', 'NMDA Receptor', 'Magnesium (Mg2+)']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-NERV-01',
        title_zh: '慢波睡眠清除 β-類澱粉蛋白的膠淋巴機制',
        statement_zh: '整夜腦部排毒高達 80% 發生於前半夜的 NREM 慢波深睡期，睡眠時腦細胞間隙擴展 60% 加速流動清除代謝廢物。',
        evidence_grade: 'A',
        why_matters_zh: '保障 7-8 小時優質睡眠是預防阿茲海默症最有效的行為干預。'
      },
      {
        id: 'SYS-NERV-02',
        title_zh: '第 3 型糖尿病：大腦胰島素阻抗',
        statement_zh: '阿茲海默症病理與大腦葡萄糖代謝障礙緊密相連，海馬迴胰島素受體脫敏直接導致神經元能量危機與突觸萎縮。',
        evidence_grade: 'A',
        why_matters_zh: '控制全身胰島素敏感度即是在保護大腦免於退化。'
      },
      {
        id: 'SYS-NERV-03',
        title_zh: '心率變異度 (HRV) 作為神經壓力疲勞量尺',
        statement_zh: 'HRV 的 RMSSD 指標直接反映副交感神經迷走神經張力；連續數日偏低代表中樞神經系統處於慢性交感亢奮或過度訓練。',
        evidence_grade: 'B',
        why_matters_zh: '根據 HRV 調整運動與工作強度可防範神經衰竭。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '阿茲海默型失智症 (Alzheimer Disease)',
        mechanism_zh: 'β 類澱粉蛋白 (Aβ42) 細胞外斑塊沉積與過度磷酸化 Tau 蛋白細胞內神經纖維纏結，導致膽鹼能神經元廣泛凋亡。',
        risk_factors_zh: ['APOE-ε4 等位基因', '中年高血壓與糖尿病', '慢性睡眠缺乏', '缺乏認知活動與社交隔離'],
        prevention_zh: 'MIND 飲食（綠葉蔬菜、莓果、橄欖油）、規律有氧運動促進 BDNF、治療中年聽力受損。'
      },
      {
        name_zh: '急性腦中風 (Acute Stroke / 缺血性與出血性)',
        mechanism_zh: '腦動脈動脈粥狀硬化血栓形成或心因性栓子（如心房顫動）阻塞腦血流，缺血核心區神經元在數分鐘內因缺氧不可逆壞死。',
        risk_factors_zh: ['高血壓', '心房顫動 (AFib)', '高低密度膽固醇 (LDL-C)', '吸菸'],
        prevention_zh: '定期心電圖篩檢房顫、嚴格血壓控制 (<130/80 mmHg)、低鹽飲食。'
      },
      {
        name_zh: '自律神經失調 (Autonomic Dysregulation)',
        mechanism_zh: '長期慢性心理壓力導致下視丘-腦下垂體-腎上腺 (HPA) 軸過度激發，皮質醇節律失常，交感神經長期無法切換回副交感修復模式。',
        risk_factors_zh: ['長期心理壓力', '輪班工作', '咖啡因過量', '長期缺乏運動'],
        prevention_zh: '正念冥想、晨間戶外光照、冷水臉部刺激活化潛水反射。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: 'FAST 中風口訣：臉部下垂 (Face)、單側肢體無力 (Arm)、言語不清 (Speech)',
        urgency: 'EMERGENT',
        action_zh: '黃金治療時間 4.5 小時（靜脈溶栓），記下發病時間立即撥打 119 急救。'
      },
      {
        flag_zh: '突發性一生從未有過的劇烈爆炸性頭痛（霹靂性頭痛 Thunderclap Headache）',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑動脈瘤破裂引起的蜘蛛網膜下腔出血 (SAH)，立即急診。'
      },
      {
        flag_zh: '突發單側無痛性視力模糊或單眼黑朦 (Amaurosis Fugax)',
        urgency: 'URGENT',
        action_zh: '同側頸動脈狹窄與微栓塞之暫時性腦缺血 (TIA) 警訊，24 小時內極易轉為大中風。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'SLEEP',
        rule_zh: '固定就寢時間與睡前 60 分鐘無螢幕藍光',
        mechanism_zh: '維持下視丘視交叉上核 (SCN) 晝夜節律振幅，確保褪黑激素足量分泌，順利進入第 3 階段慢波膠淋巴排毒。',
        practical_action_zh: '臥室溫度維持 18-20°C，使用暖色低照度光源，固定時間起床。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '結合協調與敏捷性的技巧型運動',
        mechanism_zh: '羽球、桌球、匹克球等高速揮拍運動同時要求動態視力、小腦軌跡預測與前額葉決策，神經網絡活化幅度遠超單純跑步。',
        practical_action_zh: '每週安排 1-2 次揮拍球類運動，享受神經認知與肌肉雙重刺激。'
      },
      {
        category: 'NUTRITION',
        rule_zh: 'MIND 飲食與高生物利用度抗發炎營養素',
        mechanism_zh: '富含花青素深色莓果、核桃 ALA、綠葉蔬菜葉黃素與深海魚高純度 DHA，提供神經突觸細胞膜流動性。',
        practical_action_zh: '每週至少吃 2 次藍莓、2 次高脂魚類（鮭魚、鯖魚），烹調使用特級初榨橄欖油。'
      }
    ],
    expert_council_reviewers: ['EC-07', 'EC-08', 'EC-01', 'EC-19'],
    research_citations: [
      {
        authors: 'Livingston G, et al. (Lancet Commission)',
        year: 2024,
        title: 'Dementia prevention, intervention, and care: 2024 report of the Lancet standing Commission',
        journal: 'The Lancet',
        doi: '10.1016/S0140-6736(24)01296-0',
        key_takeaway_zh: '全球 45% 的失智症可透過干預 14 個可改變危險因子（含高血壓、聽損、憂鬱、缺乏運動、糖尿病等）加以預防或延緩。'
      },
      {
        authors: 'Xie L, et al.',
        year: 2013,
        title: 'Sleep drives metabolite clearance from the adult brain',
        journal: 'Science',
        doi: '10.1126/science.1241224',
        key_takeaway_zh: '發現腦部膠淋巴系統在自然睡眠時將間質隙擴張 60% 以清除類澱粉蛋白。'
      }
    ]
  },
  {
    id: 'cardiovascular',
    name_zh: '心血管與循環流體動力系統',
    name_en: 'Cardiovascular & Hemodynamic System',
    tagline_zh: '人體 10 萬公里血流管網、內皮一氧化氮 (NO) 調控與冠狀動脈維護',
    tagline_en: '100,000 km vessel network, endothelial nitric oxide & coronary defense',
    description_zh: '心臟作為 24 小時不間斷的肌力泵，每日跳動約 10 萬次，推動 7500 公升血液流經全身微血管網。血管內皮細胞透過分泌一氧化氮（NO）即時調節外周阻力與血壓，其彈性衰退與動脈硬化斑塊是全球第一大死因之源。',
    icon_name: 'HeartPulse',
    theme_color: '#EF4444',
    accent_gradient: 'from-rose-500/20 via-red-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '心臟肌肉與心包膜 (Heart & Myocardium)',
        name_en: 'Cardiac Muscle & Coronary Perfusion',
        role_zh: '由左心室高壓泵血至主動脈；本身仰賴左右冠狀動脈在心臟舒張期進行微血管灌流供氧。',
        clinical_note_zh: '舒張壓過低 (<60 mmHg) 或心跳過快可能導致冠狀動脈灌流時間不足，誘發心肌缺血。'
      },
      {
        name_zh: '血管內皮單層細胞 (Vascular Endothelium)',
        name_en: 'Endothelial Master Regulator',
        role_zh: '面積達 4000 平方公尺的全身最大內分泌器官，透過內皮型一氧化氮合酶 (eNOS) 釋放 NO，維持血管擴張與抗血栓表面。',
        clinical_note_zh: '抽菸、高血糖與氧化修飾 LDL 直接損害 eNOS，是動脈粥狀硬化的起點。'
      },
      {
        name_zh: '彈性主動脈與阻力小動脈 (Arterial Tree)',
        name_en: 'Windkessel Effect & Peripheral Resistance',
        role_zh: '主動脈弓在心臟收縮時彈性擴張吸收衝擊波（Windkessel 效應），舒張時回縮維持平穩血流；微小動脈調控全身總外周阻力 (TPR)。',
        clinical_note_zh: '動脈硬化導致脈搏波傳遞速度 (PWV) 加快，造成收縮壓劇升與脈壓差拉大。'
      },
      {
        name_zh: '靜脈瓣膜與肌肉泵 (Venous System & Muscle Pump)',
        name_en: 'Venous Return & Muscle Skeletal Pump',
        role_zh: '下肢深層靜脈具備單向半月瓣，依靠小腿比目魚肌與腓腸肌收縮（人體第二心臟）將血液逆重力泵回心臟。',
        clinical_note_zh: '久坐不動易引發深層靜脈血栓 (DVT)，脫落隨血流可致致命性急性肺栓塞。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '動脈粥狀硬化斑塊演進機轉 (Atherogenesis)',
        detail_zh: '載脂蛋白 B (ApoB) 穿透受損內皮滯留於內皮下層，經活性氧 (ROS) 氧化為 oxLDL；巨噬細胞過度吞噬轉化為泡沫細胞 (Foam Cells)，伴隨平滑肌細胞增生形成纖維帽與鈣化壞死核心。',
        biomolecules: ['ApoB', 'oxLDL', 'Scavenger Receptors', 'MMP-9 (基質金屬蛋白酶)']
      },
      {
        title_zh: '一氧化氮 (NO) 平滑肌舒張與血流剪切力 (Shear Stress)',
        detail_zh: '層流血流剪切力刺激內皮細胞磷酸化 eNOS，將 L-精胺酸轉化為 NO。NO 擴散至鄰近血管平滑肌細胞活化可溶性鳥苷酸環化酶 (sGC)，使 cGMP 濃度升高、細胞內鈣離子排出，引發平滑肌完全舒張。',
        biomolecules: ['eNOS', 'Nitric Oxide (NO)', 'sGC', 'cGMP', 'L-Arginine']
      },
      {
        title_zh: '心臟後負荷與心肌肥厚重塑 (Cardiac Remodeling)',
        detail_zh: '長期控制不良的高血壓使左心室持續克服高後負荷工作，誘發心肌細胞向心性肥厚，初期維持射血分數 (HFpEF)，後期纖維化發展為收縮性心臟衰竭 (HFrEF)。',
        biomolecules: ['ANP / BNP', 'Angiotensin II', 'Aldosterone', 'Collagen I/III']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-CV-01',
        title_zh: 'ApoB 比單純 LDL-C 更精準預測心血管風險',
        statement_zh: '每一個致動脈粥狀硬化顆粒（LDL、VLDL、IDL、Lp(a)）表面皆正好攜帶 1 個 ApoB 分子；顆粒總數比膽固醇重量更能真實反映血管內皮滲入沉積率。',
        evidence_grade: 'A',
        why_matters_zh: '心血管高風險族群應將 ApoB 降至 <65-80 mg/dL。'
      },
      {
        id: 'SYS-CV-02',
        title_zh: '收縮壓每降低 10 mmHg 帶來重大臨床效益',
        statement_zh: '大規模 SPRINT 與 STEP 臨床試驗證實：收縮壓每下降 10 mmHg，主要心血管不良事件 (MACE) 風險下降 20%，心衰竭下降近 30%。',
        evidence_grade: 'A',
        why_matters_zh: '居家量測 722 原則守護血壓穩態。'
      },
      {
        id: 'SYS-CV-03',
        title_zh: '冠狀動脈鈣化積分 (CAC Score) 的直接洞察',
        statement_zh: '低劑量胸部 CT 量測之 CAC 積分能直接反映冠狀動脈粥狀硬化斑塊總負擔；CAC=0 代表未來 5-10 年心臟病發作機率極低。',
        evidence_grade: 'A',
        why_matters_zh: '中度風險者評估是否需終身服用 Statin 的最佳決策工具。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '冠狀動脈粥狀硬化心臟病 (CAD / 心肌梗塞)',
        mechanism_zh: '不穩定粥狀硬化斑塊薄纖維帽破裂，促發血小板聚集形成急性閉塞性血栓，阻斷冠狀動脈血流導致心肌急性壞死。',
        risk_factors_zh: ['高 ApoB / LDL-C', '糖尿病', '吸菸', '高敏 C-反應蛋白 (hs-CRP) 發炎'],
        prevention_zh: '嚴格調脂治療、規律運動、地中海飲食減少飽和脂肪。'
      },
      {
        name_zh: '心房顫動 (Atrial Fibrillation, AFib)',
        mechanism_zh: '肺靜脈開口異常快速電氣放電導致心房失去協調收縮（350-600 bpm 顫動），左心耳血流瘀滯極易生成血栓脫落引發中風。',
        risk_factors_zh: ['高血壓心房擴大', '睡眠呼吸中止症 (OSA)', '重度酒精攝取 (假日心臟症候群)', '高齡'],
        prevention_zh: '控制酒精攝取、使用智慧手錶 ECG 監測、早期抗凝血評估。'
      },
      {
        name_zh: '心臟衰竭 (Heart Failure / 射血分數保留型 HFpEF)',
        mechanism_zh: '全身性微血管內皮慢性發炎伴隨心肌細胞間質纖維化，左心室僵硬舒張功能不全，肺靜脈壓升高引發肺水腫。',
        risk_factors_zh: ['代謝症候群與肥胖', '長期高血壓', '慢性腎病', '久坐老化'],
        prevention_zh: 'SGLT2 抑制劑藥物、DASH 低鈉高鉀飲食、規律耐力運動。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '胸骨後持續壓榨感、重石壓迫感，輻射至左肩、下巴或背部',
        urgency: 'EMERGENT',
        action_zh: '急性冠心症 (ACS / 心肌梗塞) 典型警訊，伴隨冷汗或噁心，立即撥打 119 急救，切勿自行開車。'
      },
      {
        flag_zh: '靜息平躺時突發劇烈呼吸困難，需坐起才能呼吸（端坐呼吸 Orthopnea）',
        urgency: 'EMERGENT',
        action_zh: '急性肺水腫或急性心臟衰竭失代償，立即送急診給予利尿與氧氣支持。'
      },
      {
        flag_zh: '突發心悸伴隨頭暈、黑朦或短暫昏厥 (Syncope)',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑惡性心律不整（室性心搏過速 VT 或高度房室傳導阻滯），需立即心電圖監測。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'NUTRITION',
        rule_zh: '嚴格踐行 DASH 高鉀低鈉飲食與 Omega-3 EPA 補充',
        mechanism_zh: '高鉀攝取刺激腎小管排鈉並促使血管平滑肌細胞超極化舒張；高純度 EPA 穩定斑塊細胞膜降低氧化。',
        practical_action_zh: '以低鈉鉀鹽替代一般精鹽，每日吃兩大碗深綠蔬菜，每週 2-3 次深海魚。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '規律進行促進血管剪切力之有氧運動',
        mechanism_zh: '血流加速產生高剪切力直接刺激血管內皮 eNOS 生成大量 NO，改善動脈順應性與血管擴張儲備。',
        practical_action_zh: '每週至少 150 分鐘中等強度運動，運動後可測得短暫血壓降低 5-8 mmHg（運動後低血壓效應）。'
      },
      {
        category: 'STRESS',
        rule_zh: '居家落實「722」量血壓原則',
        mechanism_zh: '排除白袍高血壓與隱形高血壓干擾，捕捉早晨醒來時與睡前的真实基礎血管壓力。',
        practical_action_zh: '連續 7 天、早晚各量 2 遍取平均值，靜坐 5 分鐘後再量測。'
      }
    ],
    expert_council_reviewers: ['EC-03', 'EC-02', 'EC-01', 'EC-13'],
    research_citations: [
      {
        authors: 'Grundy SM, et al. (AHA/ACC Multi-Society)',
        year: 2019,
        title: '2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol',
        journal: 'Circulation / J Am Coll Cardiol',
        doi: '10.1161/CIR.0000000000000625',
        key_takeaway_zh: '終身累積之 ApoB 與 LDL 顆粒暴露量直接決定動脈硬化負擔，強調早期積極干預。'
      },
      {
        authors: 'Bhatt DL, et al. (REDUCE-IT Investigators)',
        year: 2019,
        title: 'Cardiovascular Risk Reduction with Icosapent Ethyl for Hypertriglyceridemia',
        journal: 'New England Journal of Medicine (NEJM)',
        doi: '10.1056/NEJMoa1812792',
        key_takeaway_zh: '高純度 EPA (4g/天) 顯著降低已使用 Statin 患者之主要心血管事件 25%。'
      }
    ]
  },
  {
    id: 'endocrine',
    name_zh: '內分泌與荷爾蒙代謝系統',
    name_en: 'Endocrine & Hormonal Metabolic System',
    tagline_zh: '分子化學信使網絡、胰島素恆定軸與皮質醇晝夜甦醒校準',
    tagline_en: 'Chemical messenger network, insulin homeostasis & cortisol awakening axis',
    description_zh: '內分泌系統由下視丘-腦下垂體軸（HPA/HPT/HPG）與胰島、甲狀腺、腎上腺等腺體構成。以微克（μg）級別的荷爾蒙分子透過血液循環，精準調控全身 37 兆細胞的能量底物分配、體溫生長與應激生存反應。',
    icon_name: 'Activity',
    theme_color: '#10B981',
    accent_gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '胰島組織 (Pancreatic Islets of Langerhans)',
        name_en: 'Endocrine Pancreas (Alpha & Beta Cells)',
        role_zh: 'β 細胞合成胰島素促進葡萄糖進入肌肉與脂肪，抑制脂肪分解；α 細胞分泌升糖素防範低血糖。',
        clinical_note_zh: '長期高糖刺激造成 β 細胞內質網應激與澱粉樣沉積，最終引發 β 細胞凋亡失代償。'
      },
      {
        name_zh: '甲狀腺 (Thyroid Gland)',
        name_en: 'Thyroid Metabolism Governor',
        role_zh: '利用碘合成甲狀腺素 (T4/T3)，調控細胞基礎代謝率 (BMR)、粒線體耗氧量與心肌收縮力。',
        clinical_note_zh: '自體免疫橋本氏甲狀腺炎 (Hashimoto) 為甲狀腺功能減退的最常見病因。'
      },
      {
        name_zh: '腎上腺皮質與髓質 (Adrenal Glands)',
        name_en: 'Adrenal Cortex & Medulla',
        role_zh: '皮質束狀帶分泌皮質醇（抗壓力與調節糖質新生），球狀帶分泌醛固酮保鈉排鉀；髓質分泌腎上腺素。',
        clinical_note_zh: '皮質醇早晨達高峰（CAR 甦醒反應）提供活力，夜間應降至谷底以利入睡與組織修復。'
      },
      {
        name_zh: '骨骼肌作為內分泌器官 (Skeletal Muscle as Endocrine Organ)',
        name_en: 'Myokine Secretory Network',
        role_zh: '收縮時分泌肌肉激素（如 IL-6、Irisin、BDNF 刺激因子），逆向改善肝臟胰島素敏感性並促成白色脂肪棕色化。',
        clinical_note_zh: '肌少症不僅代表力量衰退，更直接意味著人體最大葡萄糖吸收匯流槽與內分泌屏障的崩潰。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '胰島素受體後傳導與 GLUT4 轉位機制',
        detail_zh: '胰島素結合酪胺酸激酶受體，活化 IRS-1 / PI3K / Akt 路徑，促使細胞內囊泡包覆的葡萄糖轉運蛋白 4 (GLUT4) 轉位至骨骼肌細胞膜表面進行葡萄糖攝入。骨骼肌收縮透過 AMPK 途徑可完全不依賴胰島素直接誘發 GLUT4 轉位。',
        biomolecules: ['Insulin Receptor', 'IRS-1', 'Akt / PKB', 'GLUT4', 'AMPK']
      },
      {
        title_zh: 'HPA 軸負回饋與慢性壓力皮質醇阻抗',
        detail_zh: '壓力刺激下視丘 CRH → 腦下垂體 ACTH → 腎上腺皮質釋放皮質醇。皮質醇反向抑制 CRH 與 ACTH。長期慢性心理壓力導致糖皮質激素受體 (GR) 脫敏，引發全身慢性發炎與腹部脂肪囤積。',
        biomolecules: ['CRH', 'ACTH', 'Cortisol', 'Glucocorticoid Receptor (GR)']
      },
      {
        title_zh: '甲狀腺素 T4 轉化 T3 與去碘酶活性',
        detail_zh: '甲狀腺分泌的 80% 為低活性 T4，主要依賴肝臟與周邊組織中富含硒的「第 1/2 型去碘酶 (DIO1/2)」脫碘為高活性 T3。極端節食或慢性重度全身發炎會使 T4 轉向無活性的反轉 T3 (rT3)。',
        biomolecules: ['Thyroxine (T4)', 'Triiodothyronine (T3)', 'Reverse T3 (rT3)', 'Deiodinase 1/2']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-ENDO-01',
        title_zh: '胰島素阻抗早於血糖異常 10-15 年出現',
        statement_zh: '在空腹血糖超標前十多年，人體胰島 β 細胞已代償性過度分泌大量胰島素；高胰島素血症 (HOMA-IR) 是評估代謝症候群的黃金早期窗口。',
        evidence_grade: 'A',
        why_matters_zh: '及早檢測空腹胰島素可防患糖尿病於未然。'
      },
      {
        id: 'SYS-ENDO-02',
        title_zh: '肌力訓練為非胰島素降血糖的終極手段',
        statement_zh: '肌肉收縮產生的能量消耗直接活化 AMPK，不經由胰島素即可促使 GLUT4 轉位至肌纖維細胞膜，快速清除血液中多餘葡萄糖。',
        evidence_grade: 'A',
        why_matters_zh: '阻力訓練是逆轉糖尿病前期最直接有力的處方。'
      },
      {
        id: 'SYS-ENDO-03',
        title_zh: '早晨晨光對皮質醇甦醒反應 (CAR) 的校準',
        statement_zh: '醒來後 30-60 分鐘內接受 10,000 lux 戶外自然陽光照射 10-15 分鐘，能強化健康的高峰皮質醇甦醒曲線，並精準定時 14-16 小時後的褪黑激素釋放。',
        evidence_grade: 'B',
        why_matters_zh: '晨光是最佳的天然無毒荷爾蒙時鐘校準器。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '第 2 型糖尿病與代謝症候群 (Type 2 Diabetes & MetS)',
        mechanism_zh: '骨骼肌與肝臟周邊胰島素受體後傳導障礙，葡萄糖無法有效利用；肝臟持續糖質新生，高血糖伴隨胰島 β 細胞進行性耗竭。',
        risk_factors_zh: ['腹部內臟脂肪過多 (腰圍男>90cm 女>80cm)', '精緻碳水化合物濫觴', '家族遺傳', '久坐'],
        prevention_zh: '低精緻糖高纖維飲食、餐後散步、每週 2 次肌力訓練擴充肌肉糖原庫存。'
      },
      {
        name_zh: '甲狀腺功能低下症 (Hypothyroidism)',
        mechanism_zh: '甲狀腺素生成不足造成全身體溫低下、心搏過緩、疲憊無力、水腫便秘與膽固醇代謝清除減慢。',
        risk_factors_zh: ['自體免疫橋本氏甲狀腺炎', '碘攝取極端過多或不足', '產後甲狀腺炎'],
        prevention_zh: '均衡碘與硒攝取、定期檢查 TSH 與 Free T4、遵醫囑補充左旋甲狀腺素。'
      },
      {
        name_zh: '多囊性卵巢症候群 (PCOS)',
        mechanism_zh: '高胰島素血症刺激卵巢濾泡膜細胞過量合成雄性素 (Androgens)，抑制正常排卵並誘發多毛、痤瘡與月經週期不規則。',
        risk_factors_zh: ['高胰島素阻抗', '肥胖', '慢性低度發炎'],
        prevention_zh: '低 GI 飲食改善胰島素阻抗、補充肌醇 (Inositol)、減重 5-10% 恢復自然排卵。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '多吃、多喝、多尿伴隨 1-2 週內體重急遽消瘦 3-5 公斤',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑重度高血糖高滲透壓狀態 (HHS) 或糖尿病酮酸中毒 (DKA)，需立即急診驗血。'
      },
      {
        flag_zh: '心悸、高燒、躁動不安、嚴重嘔吐腹瀉伴隨意識模糊',
        urgency: 'EMERGENT',
        action_zh: '甲狀腺風暴 (Thyroid Storm) 具極高致死率急症，需立即加護病房救治。'
      },
      {
        flag_zh: '嚴重飢餓感、冷汗、心悸、手抖、視線模糊並陷入嗜睡',
        urgency: 'EMERGENT',
        action_zh: '急性嚴重低血糖（血糖 <55 mg/dL），立即攝取 15-20g 純糖水或葡萄糖膠，若無法吞嚥立即送醫。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'NUTRITION',
        rule_zh: '穩定每餐血糖波幅（Glycemic Variability）',
        mechanism_zh: '血糖急升驟降誘發劇烈胰島素尖峰，使細胞迅速轉入儲脂模式並觸發反應性低血糖與暴食渴望。',
        practical_action_zh: '澱粉主食選擇帶殼糙米、燕麥粒、地瓜，避開精緻白麵包與含糖手搖飲。'
      },
      {
        category: 'SLEEP',
        rule_zh: '避免深夜就寢打亂皮質醇節律',
        mechanism_zh: '半夜 12 點後仍清醒會迫使腎上腺二次分泌皮質醇維持清醒，造成隔日晨間皮質醇遲鈍與夜間焦慮失眠惡性循環。',
        practical_action_zh: '固定於晚間 11 點前入睡，確保在慢波期迎接生長激素 (GH) 脈衝釋放。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '大肌群多關節阻力訓練提升全身代謝率',
        mechanism_zh: '深蹲、硬舉等複合動作活化大量第 II 型快肌纖維，釋放肌肉激素顯著提升全身胰島素敏感度。',
        practical_action_zh: '每週進行 2-3 次阻力訓練，重視腿臀等占全身 70% 肌肉量部位。'
      }
    ],
    expert_council_reviewers: ['EC-05', 'EC-06', 'EC-01', 'EC-13'],
    research_citations: [
      {
        authors: 'American Diabetes Association (ADA)',
        year: 2024,
        title: 'Standards of Care in Diabetes—2024',
        journal: 'Diabetes Care',
        doi: '10.2337/dc24-Srev',
        key_takeaway_zh: '將生活型態介入（飲食模式與阻力訓練）列為所有第 2 型糖尿病與糖尿病前期的一線基石。'
      },
      {
        authors: 'Pedersen BK, Febbraio MA.',
        year: 2012,
        title: 'Muscles, exercise and obesity: skeletal muscle as a secretory organ',
        journal: 'Nature Reviews Endocrinology',
        doi: '10.1038/nrendo.2012.49',
        key_takeaway_zh: '確立骨骼肌為分泌性內分泌器官，透過釋放多種肌肉激素 (Myokines) 與全身臟器跨界溝通。'
      }
    ]
  },
  {
    id: 'immune',
    name_zh: '免疫與淋巴防禦系統',
    name_en: 'Immune & Lymphatic Defense System',
    tagline_zh: '70% 腸道相關淋巴組織 (GALT)、先天與後天防線與抗慢性低度發炎',
    tagline_en: '70% GALT defense, innate/adaptive synergy & chronic inflammation resolution',
    description_zh: '免疫系統是保護人體免受細菌、病毒、寄生蟲與體內癌變細胞侵害的精密防衛網。由骨髓、胸腺、脾臟、淋巴管網與腸道派氏斑構成。能在數秒內發動先天免疫吞噬反應，並在數日內打造專屬後天適應性抗體武器庫。',
    icon_name: 'ShieldCheck',
    theme_color: '#14B8A6',
    accent_gradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '骨髓與胸腺 (Bone Marrow & Thymus)',
        name_en: 'Primary Lymphoid Organs',
        role_zh: '骨髓生成所有白血球前驅細胞與 B 細胞成熟；胸腺負責 T 淋巴細胞的嚴格正向與負向篩選（淘汰自體反應性 T 細胞）。',
        clinical_note_zh: '胸腺隨年齡退化萎縮（胸腺退縮 Thymic Involution），導致老年人天真 T 細胞庫儲備減少。'
      },
      {
        name_zh: '淋巴結與淋巴管網 (Lymph Nodes & Vessels)',
        name_en: 'Secondary Lymphoid Filter Network',
        role_zh: '全身 500-600 顆淋巴結過濾組織液中的病原體與抗原，提供樹突細胞向 T/B 細胞呈遞抗原並克隆擴增的實體反應戰場。',
        clinical_note_zh: '無痛性、堅硬固定且進行性腫大的淋巴結需高度警惕淋巴瘤或轉移癌。'
      },
      {
        name_zh: '脾臟 (Spleen)',
        name_en: 'Blood Spleen Filter & B Cell Reservoir',
        role_zh: '人體最大淋巴器官，紅髓清除老化紅血球與網狀內皮系統吞噬；白髓富含 B 細胞製造對抗莢膜細菌之抗體。',
        clinical_note_zh: '脾切除患者對肺炎鏈球菌等莢膜菌感染具極高致死風險，需施打專屬疫苗。'
      },
      {
        name_zh: '腸道相關淋巴組織 (GALT / Peyer Patches)',
        name_en: 'Gut-Associated Lymphoid Tissue',
        role_zh: '容納人體 70% 以上免疫細胞，由 M 細胞取樣腸道腔內抗原，誘導漿細胞分泌分泌型 IgA (sIgA) 中和病原體。',
        clinical_note_zh: '腸道菌相失衡直接削弱 GALT 免疫耐受性，誘發全身性慢性自體免疫與過敏。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '先天免疫 vs 後天適應性免疫的無縫接力',
        detail_zh: '嗜中性球與巨噬細胞透過類鐸受體 (TLRs) 識別病原體相關分子模式 (PAMPs) 發動秒級吞噬與發炎反應；樹突細胞攜帶抗原遷移至淋巴結活化 CD4+ 輔助 T 與 CD8+ 毒殺 T 細胞，提供長期免疫記憶。',
        biomolecules: ['TLR-4', 'Interleukin-1β (IL-1β)', 'TNF-α', 'CD4+ / CD8+ T Cells', 'sIgA']
      },
      {
        title_zh: '慢性低度全身性發炎 (Inflammaging)',
        detail_zh: '衰老細胞累積與過度擴張的內臟脂肪釋放持續性發炎因子 (SASP: IL-6, TNF-α, CRP)，導致全身血管內皮受損、胰島素阻抗與神經退化，被證實為諸多慢性非傳染性疾病的共同病因土壤。',
        biomolecules: ['C-Reactive Protein (hs-CRP)', 'IL-6', 'NLRP3 Inflammasome', 'NF-κB']
      },
      {
        title_zh: '發炎消退調解物 (SPMs) 與主動抗炎終止',
        detail_zh: '發炎並非被動停止，而是由 Omega-3 脂肪酸 (EPA/DHA) 在局部酵素作用下轉化為消退素 (Resolvins)、保護素 (Protectins) 與瑪瑞素 (Maresins)，主動引導巨噬細胞清除凋亡碎片並修復組織。',
        biomolecules: ['Resolvins (RvE1, RvD1)', 'Protectins', 'Maresins', 'Lipoxins']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-IMM-01',
        title_zh: '維生素 D3 在 T 細胞分化與自體免疫平衡中的核心作用',
        statement_zh: '活化型維生素 D3 結合樹突細胞與 T 細胞的 VDR 受體，抑制過度亢奮的 Th1/Th17 發炎反應，同時促進保護性的 Foxp3+ Treg 細胞生長。',
        evidence_grade: 'A',
        why_matters_zh: '維持血清 25(OH)D 在 30-50 ng/mL 是免疫機能健全的關鍵防線。'
      },
      {
        id: 'SYS-IMM-02',
        title_zh: '睡眠剝奪對自然殺手細胞 (NK Cells) 的打擊',
        statement_zh: '僅僅一整夜睡眠限制在 4 小時，人體自然殺手細胞活性驟降達 70%，大幅削弱人體對病毒感染與突變癌細胞的第一時間巡檢清除能力。',
        evidence_grade: 'A',
        why_matters_zh: '優質充足睡眠是不可替代的天然免疫加強劑。'
      },
      {
        id: 'SYS-IMM-03',
        title_zh: '微量元素鋅 (Zinc) 對胸腺激素與黏膜防禦的不可或缺性',
        statement_zh: '鋅為 300 多種酵素與轉錄因子鋅指蛋白 (Zinc Fingers) 的輔因子；鋅缺乏會導致胸腺萎縮、T 細胞增殖受阻與黏膜上皮屏障破損。',
        evidence_grade: 'B',
        why_matters_zh: '感冒初期 24 小時內補充電離鋅錠可顯著縮短病程。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '自體免疫疾病 (Autoimmune Disorders / 如紅斑性狼瘡、類風濕關節炎)',
        mechanism_zh: '中樞或周邊免疫耐受性破裂，活化的自體反應性 T/B 細胞產生抗核抗體 (ANA) 或類風濕因子 (RF)，形成免疫複合物沉積破壞關節與器官。',
        risk_factors_zh: ['遺傳 HLA 基因型', '腸道菌相嚴重失衡 (腸漏)', 'EB 病毒感染史', '維生素 D 長期嚴重缺乏'],
        prevention_zh: '抗發炎飲食消除食物敏感源、規律低衝擊運動、監測發炎指標。'
      },
      {
        name_zh: '慢性發炎與代謝性發炎 (Metaflammation)',
        mechanism_zh: '肥大增生的內臟脂肪細胞發生缺氧壞死，招募促炎 M1 巨噬細胞浸潤並活化 NLRP3 發炎小體，持續向血液循環傾倒 TNF-α 與 IL-6。',
        risk_factors_zh: ['超加工食品過多', '腹部內臟脂肪率高', '缺乏運動', '長期心理高壓'],
        prevention_zh: '地中海飲食、減輕 5-10% 體重、補充 Omega-3 脂肪酸。'
      },
      {
        name_zh: '過敏性疾病 (Allergic Rhinitis & Eczema)',
        mechanism_zh: '免疫系統對無害外源物質（花粉、塵蟎、食物蛋白）發生過度反應，Th2 偏向驅動漿細胞大量分泌 IgE 結合肥大細胞釋放組織胺。',
        risk_factors_zh: ['過度殺菌清潔環境 (衛生假說)', '幼年廣效抗生素使用', '皮膚表皮屏障破損'],
        prevention_zh: '避免過度使用含化學香精洗劑、補充益生菌維持腸道菌群平衡。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '無痛性、固定不移、質地堅硬如石之進行性腫大淋巴結（特別是鎖骨上窩）',
        urgency: 'URGENT',
        action_zh: '高度懷疑惡性腫瘤轉移（如魏氏淋巴結 Virchow node）或淋巴瘤，儘速專科穿刺切片。'
      },
      {
        flag_zh: '突發急性喉頭水腫、喘鳴、呼吸道阻塞伴隨全身廣泛紅疹低血壓',
        urgency: 'EMERGENT',
        action_zh: '過敏性休克 (Anaphylaxis) 急症，立即肌肉注射腎上腺素 (EpiPen) 並撥打 119。'
      },
      {
        flag_zh: '不明原因持續低燒 > 2-3 週伴隨夜間大量盜汗與顯著消瘦',
        urgency: 'URGENT',
        action_zh: '需排除肺結核、感染性心內膜炎或血液淋巴系統惡性病變。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'NUTRITION',
        rule_zh: '攝取足量抗氧化多酚與 Omega-3 長鏈多元不飽和脂肪酸',
        mechanism_zh: 'EPA/DHA 競爭性抑制花生四烯酸 (AA) 代謝，減少促發炎前列腺素 PGE2 生成，並提供合成 SPM 抗炎消退素原料。',
        practical_action_zh: '每週食用 2 次中小型深海魚（沙丁魚、鯖魚），多攝取綠茶 EGCG、薑黃與多酚蔬果。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '進行中等強度規律運動，避免無恢復的極限過度訓練',
        mechanism_zh: '每次 45-60 分鐘中度運動可促進淋巴循環並暫時調動 NK 細胞與細胞毒性 T 細胞至血液巡檢；極端疲勞則會造成 3-72 小時「免疫開窗 (Open Window)」易感期。',
        practical_action_zh: '每週維持 3-5 次規律運動，若感冒發燒時恪守「頸部以下原則」休養。'
      },
      {
        category: 'SLEEP',
        rule_zh: '維持固定晝夜作息，保障免疫細胞週期修復',
        mechanism_zh: '夜間生長激素與泌乳素促進天真 T 細胞增殖與抗原辨識記憶形成，降低促發炎單核球過激比例。',
        practical_action_zh: '每晚睡滿 7-8 小時，生病期間多臥床休息以利免疫能量集中調配。'
      }
    ],
    expert_council_reviewers: ['EC-09', 'EC-10', 'EC-01', 'EC-14'],
    research_citations: [
      {
        authors: 'Calder PC.',
        year: 2021,
        title: 'Nutrition and immunity: perspectives for practice',
        journal: 'European Journal of Clinical Nutrition',
        doi: '10.1038/s41430-021-00949-8',
        key_takeaway_zh: '微量營養素（維生素 A, C, D, 鋅, 硒）與 Omega-3 脂肪酸構成協同免疫支持之核心基礎。'
      },
      {
        authors: 'Furman D, et al.',
        year: 2019,
        title: 'Chronic inflammation in the etiology of disease across the life span',
        journal: 'Nature Medicine',
        doi: '10.1038/s41591-019-0675-0',
        key_takeaway_zh: '慢性發炎為心血管、癌症、糖尿病、慢性腎病與非酒精性脂肪肝之共同首要致病成因。'
      }
    ]
  },
  {
    id: 'musculoskeletal',
    name_zh: '肌肉骨骼與力學支撐系統',
    name_en: 'Musculoskeletal & Movement System',
    tagline_zh: '人體 206 塊骨骼、600+ 條肌肉、骨小樑應力重塑與終生抗肌少防護',
    tagline_en: '206 bones, 600+ muscles, trabecular piezoelectric remodeling & sarcopenia defense',
    description_zh: '肌肉骨骼系統是人體對抗地心引力、執行日常動作與運動專項的力學基石。骨骼透過沃爾夫定律（Wolff Law）在負重應力下動態重塑骨質密度；骨骼肌則透過機械張力活化 mTORC1 促進蛋白質合成，更是全身最大的葡萄糖清除水庫與代謝緩衝槽。',
    icon_name: 'Dumbbell',
    theme_color: '#3B82F6',
    accent_gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '骨骼架構與骨髓腔 (Bones & Bone Mineral Matrix)',
        name_en: 'Skeletal Framework (Cortical & Trabecular)',
        role_zh: '206 塊骨骼儲存人體 99% 鈣與 85% 磷；破骨細胞與造骨細胞協同重塑，骨小樑隨日常機械應力方向排列增厚。',
        clinical_note_zh: '缺乏重力刺激（如長期臥床或太空無重力）會引發破骨細胞劇烈活化，每月流失 1-2% 骨質。'
      },
      {
        name_zh: '骨骼肌纖維 (Skeletal Muscle Fibers)',
        name_en: 'Type I & Type II Muscle Fibers',
        role_zh: 'Type I 慢肌富含粒線體專職耐力抗疲勞；Type II 快肌具備強大瞬發力與高糖解能力，為日常預防跌倒骨折的第一道剎車。',
        clinical_note_zh: '肌少症 (Sarcopenia) 優先萎縮 Type II 快肌纖維，使得爆發反應力與步態平衡顯著退化。'
      },
      {
        name_zh: '關節軟骨與滑液囊 (Articular Cartilage & Synovium)',
        name_en: 'Avascular Cartilage & Synovial Lubrication',
        role_zh: '透明軟骨無血管與神經分佈，完全仰賴關節屈伸活動時的機械海綿效應（擠壓與回彈）吸收滑液營養素與排出廢物。',
        clinical_note_zh: '長期完全不動會使關節液無法流動滋養軟骨，適度規律承重活動才是維持軟骨厚度的關鍵。'
      },
      {
        name_zh: '肌腱、韌帶與筋膜網 (Tendons, Ligaments & Fascia)',
        name_en: 'Dense Connective Tissue & Tensegrity Network',
        role_zh: '由高強度 I 型膠原纖維構成張力整體結構 (Tensegrity)，儲存與釋放彈性能量（如阿基里斯腱跳躍儲能）。',
        clinical_note_zh: '膠原蛋白交聯需要維生素 C 與適度牽張刺激，修復週期較肌肉長 3-5 倍。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '機械張力與肌蛋白質合成 (mTORC1 路徑)',
        detail_zh: '肌纖維受到漸進式超負荷機械張力牽拉，活化黏著斑激酶 (FAK) 與磷脂酸 (PA)，觸發 mTORC1 複合體磷酸化 p70S6K 與 4E-BP1，啟動核糖體轉譯合成新肌原纖維蛋白。配合白胺酸 (Leucine) 攝取可達成協同最大化。',
        biomolecules: ['mTORC1', 'Mechanosensors', 'Leucine', 'p70S6K', 'Myofibrillar Protein']
      },
      {
        title_zh: '沃爾夫定律 (Wolff Law) 與骨細胞壓電重塑',
        detail_zh: '負重骨骼受到應力微彎曲時，骨微晶產生微弱壓電信號，骨細胞 (Osteocytes) 感應流體剪切力後下調硬骨素 (Sclerostin) 表達，解放 Wnt/β-catenin 訊息路徑，指揮造骨細胞大量沉積羥基磷灰石晶體強化骨骼結構。',
        biomolecules: ['Sclerostin', 'Wnt / β-catenin', 'Osteocalcin', 'RANKL / OPG']
      },
      {
        title_zh: '肌動蛋白-肌球蛋白交叉橋滑動學說 (Sliding Filament)',
        detail_zh: '運動神經元動作電位傳遞至神經肌肉接頭，誘發肌漿網釋放高濃度 Ca2+ 結合肌鈣蛋白 C，移開原肌球蛋白，肌球蛋白頭部消耗 ATP 水解能量向肌小節中央拉動，產生宏觀肌肉收縮力量。',
        biomolecules: ['Actin', 'Myosin', 'Troponin-Tropomyosin', 'Calcium (Ca2+)', 'ATP']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-MSK-01',
        title_zh: '肌少症與衰弱症的隱形致死風險',
        statement_zh: '30 歲後若不進行阻抗運動，肌肉量每 10 年生理性流失 3-8%；65 歲後加速。跌倒引發之髖關節骨折患者，一年內死亡率高達 20-25%。',
        evidence_grade: 'A',
        why_matters_zh: '重訓阻抗運動是預防長者失能失智的最強非藥物處方。'
      },
      {
        id: 'SYS-MSK-02',
        title_zh: '蛋白質攝取的「白胺酸閾值 (Leucine Trigger)」',
        statement_zh: '單餐必需含有約 2.5-3.0g 白胺酸（相當於 25-30g 優質蛋白質，如 3-4 顆雞蛋或 1 塊雞胸肉），才能完全打開骨骼肌 mTORC1 蛋白質合成開關。',
        evidence_grade: 'A',
        why_matters_zh: '年長者應確保三餐均勻分配高質量蛋白質而非僅集中於晚餐。'
      },
      {
        id: 'SYS-MSK-03',
        title_zh: '維生素 D3 + K2 與鈣質定向沉積導航',
        statement_zh: '維生素 D3 促進腸道吸收鈣質進入血液，維生素 K2 則負責活化骨鈣素 (Osteocalcin) 與基質 Gla 蛋白 (MGP)，引導鈣質沉積於骨質中並防止血管內壁鈣化硬化。',
        evidence_grade: 'B',
        why_matters_zh: '補鈣同時搭配 D3 與 K2 能兼顧骨質強度與心血管軟彈。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '骨質疏鬆症 (Osteoporosis)',
        mechanism_zh: '造骨細胞活性低於破骨細胞，骨小樑變薄穿孔，骨礦物質密度 (T-score ≤ -2.5) 顯著下降，輕微跌倒即可引發脆性骨折。',
        risk_factors_zh: ['停經後雌激素驟降', '長期缺乏負重運動', '長期抽菸酗酒', '長期使用類固醇'],
        prevention_zh: '定期 DXA 骨密度檢查、阻抗負重訓練、充足蛋白質與維生素 D3+K2。'
      },
      {
        name_zh: '退化性退行性骨關節炎 (Osteoarthritis, OA)',
        mechanism_zh: '關節軟骨基質降解酵素 (MMPs) 活性過高，軟骨磨損變薄、骨刺增生與軟骨下骨硬化，引發活動時劇烈疼痛與關節僵硬。',
        risk_factors_zh: ['體重過重 (BMI>25 每增加 1kg 膝關節受壓增 4kg)', '關節舊傷', '下肢力線不正', '股四頭肌無力'],
        prevention_zh: '減重減輕膝蓋負擔、強化股四頭肌與臀中肌力量維持關節穩定。'
      },
      {
        name_zh: '肌筋膜疼痛症候群 (Myofascial Pain Syndrome)',
        mechanism_zh: '肌肉長時間處於靜態縮短姿勢，肌小節局部過度收縮形成激痛點 (Trigger Points)，局部缺血缺氧釋放致痛物質形成惡性循環。',
        risk_factors_zh: ['久坐駝背低頭族', '工作姿勢不良', '缺乏動態伸展', '慢性精神緊繃'],
        prevention_zh: '定時起身活動、使用滾筒按摩球深層放鬆肌筋膜、改善人體工學坐姿。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '跌倒後無法起立站立，患肢出現縮短且向外旋轉異常姿態',
        urgency: 'EMERGENT',
        action_zh: '高機率為老年髖關節（股骨頸或轉子間）骨折，保持原地不動立即撥打 119 送醫手術固定。'
      },
      {
        flag_zh: '下肢進行性麻木無力、鞍部（會陰部）感覺喪失伴隨排尿排便困難失禁',
        urgency: 'EMERGENT',
        action_zh: '馬尾症候群 (Cauda Equina Syndrome) 骨科神經急症，需在 24-48 小時內緊急減壓手術以防終生癱瘓。'
      },
      {
        flag_zh: '關節突發紅、腫、熱、極度劇烈觸痛伴隨發燒',
        urgency: 'EMERGENT',
        action_zh: '需緊急抽取關節液鑑別診斷化膿性細菌性關節炎 (Septic Arthritis) 與急性痛風發作。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'EXERCISE',
        rule_zh: '每週至少進行 2-3 次漸進式阻力超負荷訓練 (Progressive Overload)',
        mechanism_zh: '為骨骼與肌肉施加超越日常水平的機械張力，刺激骨小樑增生與快肌纖維直徑擴大。',
        practical_action_zh: '涵蓋人體六大基本動作模式：蹲、鉸鏈、推、拉、單腿負重與核心抗旋轉。'
      },
      {
        category: 'NUTRITION',
        rule_zh: '每日攝取每公斤體重 1.2-1.6g 優質蛋白質',
        mechanism_zh: '提供充足必需胺基酸克服年長者常見的「同化阻抗 (Anabolic Resistance)」，全天維持淨蛋白質合成正平衡。',
        practical_action_zh: '60 公斤成年人每日攝取約 72-96g 蛋白質，均勻分配至早中晚三餐。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '融入衝擊性或跳躍性骨重塑刺激',
        mechanism_zh: '垂直地面反作用力 (Ground Reaction Force) 產生高應變率 (Strain Rate)，引發最強造骨訊號。',
        practical_action_zh: '健康成人在暖身時可加入跳繩、開合跳或羽球網前踏步跳躍，骨質脆弱者則以快走與台階登梯為主。'
      }
    ],
    expert_council_reviewers: ['EC-04', 'EC-11', 'EC-12', 'EC-01'],
    research_citations: [
      {
        authors: 'Morton RW, et al.',
        year: 2018,
        title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults',
        journal: 'British Journal of Sports Medicine (BJSM)',
        doi: '10.1136/bjsports-2017-097608',
        key_takeaway_zh: '結合阻力訓練，每日總蛋白攝取達 1.6 g/kg 可最大化肌肉量與肌力增長獲益。'
      },
      {
        authors: 'Cruz-Jentoft AJ, et al. (EWGSOP2)',
        year: 2019,
        title: 'Sarcopenia: revised European consensus on definition and diagnosis',
        journal: 'Age and Ageing',
        doi: '10.1093/ageing/afy169',
        key_takeaway_zh: '將「肌肉力量低下」定義為肌少症的首要核心表徵，強調早期篩檢握力與椅子起立測試。'
      }
    ]
  },
  {
    id: 'renal',
    name_zh: '泌尿與腎臟體液平衡系統',
    name_en: 'Renal & Urinary Homeostasis System',
    tagline_zh: '200 萬顆腎元透析濾過膜、RAAS 血壓調控中樞與 Aquaporin-2 水分子通道',
    tagline_en: '2 million nephron filtration units, RAAS blood pressure hub & Aquaporin-2 channels',
    description_zh: '兩顆腎臟每天過濾約 180 公升血液（每 4-5 分鐘濾遍全身血漿一次），精準重吸收 99% 以上的水分與電解質，將多餘尿素、尿酸、藥物代謝物與酸根離子濃縮為 1-2 公升尿液排出。同時主導紅血球生成素 (EPO) 與活性維生素 D 的最終活化。',
    icon_name: 'Droplets',
    theme_color: '#0284C7',
    accent_gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
    major_organs: [
      {
        name_zh: '腎絲球濾過膜 (Glomerular Filtration Barrier)',
        name_en: 'Glomerulus & Podocyte Mesh',
        role_zh: '由有孔內皮細胞、基底膜 (GBM) 與足細胞足突裂隙隔膜構成三層分子與電荷篩，阻止白蛋白與血球漏出。',
        clinical_note_zh: '微量白蛋白尿 (UACR > 30 mg/g) 是早期腎絲球內皮受損與全身心血管微血管病變的第一信號。'
      },
      {
        name_zh: '腎小管與亨利氏環 (Renal Tubules & Loop of Henle)',
        name_en: 'Tubular Transport & Countercurrent Multiplier',
        role_zh: '近曲小管重吸收 65% 鈉與水及 100% 葡萄糖與胺基酸；亨利氏環建立髓質高滲梯度，為尿液濃縮提供物理基礎。',
        clinical_note_zh: '糖尿病患者 SGLT2 蛋白過度活化吸收糖鈉，引發腎絲球入球小動脈舒張與腎內高壓。'
      },
      {
        name_zh: '集尿管與 Aquaporin-2 (Collecting Duct & AQP2)',
        name_en: 'ADH Osmoregulation Terminal',
        role_zh: '抗利尿激素 (ADH) 結合 V2 受體促使 Aquaporin-2 水通道蛋白嵌合至管腔膜，快速回收純水；缺水時尿液濃縮達 1200 mOsm/kg。',
        clinical_note_zh: '飲酒直接抑制下視丘 ADH 釋放，導致集尿管無法回收水分引發大量低滲脫水性利尿。'
      },
      {
        name_zh: '近腎絲球複合體 (Juxtaglomerular Apparatus, JGA)',
        name_en: 'Renin Secretion & Hemodynamic Sensor',
        role_zh: '緻密斑感應遠曲小管鈉氯濃度，入球小動脈顆粒細胞分泌「腎素 (Renin)」，啟動 RAAS 系統調控全身血壓。',
        clinical_note_zh: '腎動脈狹窄會釋放過量腎素導致嚴重頑固性腎血管性高血壓。'
      }
    ],
    physiological_mechanisms: [
      {
        title_zh: '腎素-血管張力素-醛固酮系統 (RAAS)',
        detail_zh: '腎灌流壓下降或交感神經刺激時，腎素水解血管張力素原為 Ang I，再經肺血管內皮 ACE 轉化為高活性 Ang II。Ang II 強烈收縮全身出球小動脈並刺激腎上腺皮質釋放醛固酮，促進遠端小管保鈉排鉀增容量。',
        biomolecules: ['Renin', 'Angiotensin II', 'Aldosterone', 'ACE', 'AT1 Receptor']
      },
      {
        title_zh: '腎絲球高濾過與入/出球小動脈壓力調節',
        detail_zh: '入球小動脈前列腺素 (PGE2) 舒張擴張灌流，出球小動脈 Ang II 收縮維持過濾壓。高血糖使入球小動脈擴張引發「高濾過 (Hyperfiltration)」，長期導致繫膜基質增生與腎絲球硬化。',
        biomolecules: ['PGE2', 'Angiotensin II', 'Glomerular Capillary Pressure (Pgc)', 'eGFR']
      },
      {
        title_zh: '酸鹼平衡與重碳酸鹽 (HCO3-) 回收',
        detail_zh: '近曲小管碳酸酐酶 (CA) 催化管腔重吸收 85-90% 的濾過 HCO3-；遠端集尿管 α-插入細胞消耗 ATP 主動分泌 H+ 至尿液中，維持血漿 pH 穩定於 7.40。',
        biomolecules: ['Carbonic Anhydrase-II/IV', 'H+-ATPase', 'Bicarbonate (HCO3-)', 'Ammonia (NH3/NH4+)']
      }
    ],
    high_yield_kps: [
      {
        id: 'SYS-REN-01',
        title_zh: '腎元損傷的不可逆性與「沉默器官」特質',
        statement_zh: '成人每側腎臟約 100 萬顆腎元，損壞後無法再生。腎功能 (eGFR) 往往需流失超過 50% 以上，血中肌酸酐 (Creatinine) 才會明顯上升。',
        evidence_grade: 'A',
        why_matters_zh: '健檢務必結合 eGFR 與尿液微量白蛋白 (UACR) 進行早期雙向篩檢。'
      },
      {
        id: 'SYS-REN-02',
        title_zh: '止痛藥 NSAIDs 與感冒成藥的腎毒性陷阱',
        statement_zh: '非類固醇消炎止痛藥 (NSAIDs) 阻斷前列腺素合成，導致腎入球小動脈強烈痙攣收縮、急性缺血；脫水狀態下併用 ACEI/ARB 與利尿劑（三重打擊 Triple Whammy）極易誘發急性腎損傷 (AKI)。',
        evidence_grade: 'A',
        why_matters_zh: '脫水或慢性腎病者應嚴禁未經醫囑隨意服用高劑量 NSAIDs。'
      },
      {
        id: 'SYS-REN-03',
        title_zh: '充足純水攝取對預防草酸鈣結石與高尿酸的功效',
        statement_zh: '維持每日尿量 > 2.0-2.5 公升可將尿液中草酸鈣、磷酸鈣與尿酸的飽和度稀釋在過飽和晶化閾值以下，結石復發風險直接降低 50% 以上。',
        evidence_grade: 'A',
        why_matters_zh: '依體重每日補充足夠水分（約 30-35 mL/kg）是護腎最低成本良方。'
      }
    ],
    common_pathologies: [
      {
        name_zh: '慢性腎臟病 (Chronic Kidney Disease, CKD)',
        mechanism_zh: '糖尿病高血糖與高血壓長期破壞腎絲球濾過膜，足細胞脫落融合，伴隨間質纖維化，eGFR 持續下降超過 3 個月。',
        risk_factors_zh: ['糖尿病 (佔洗腎首因 45%)', '未控制的高血壓', 'NSAIDs 濫用', '重金屬與含馬兜鈴酸中草藥'],
        prevention_zh: '低鈉飲食、控制糖化血色素 <7.0%、血壓 <130/80 mmHg、避免濫用止痛藥。'
      },
      {
        name_zh: '泌尿系統結石 (Urolithiasis / 腎結石、輸尿管結石)',
        mechanism_zh: '水分攝取不足導致尿液高度濃縮，草酸與鈣離子在腎乳頭表面形成藍道斑 (Randall Plaque) 晶核沉積脫落，嵌頓輸尿管引發劇烈痙攣性絞痛。',
        risk_factors_zh: ['高草酸飲食 (濃茶、菠菜、巧克力過量)', '動物性蛋白過多 (尿液酸化)', '低水分攝取', '高鈉飲食'],
        prevention_zh: '每日飲水 2500-3000 mL、充足飲食鈣質（於腸道結合草酸隨糞便排出）、減少過量鹽分。'
      },
      {
        name_zh: '高尿酸血症與痛風性腎病變 (Gouty Nephropathy)',
        mechanism_zh: '嘌呤代謝終產物尿酸生成過多或腎小管排泄不足，尿酸鈉晶體沉積於腎髓質間質，引發慢性異物巨細胞肉芽腫發炎與纖維化。',
        risk_factors_zh: ['高果糖玉米糖漿', '酒精 (尤其啤酒含大量鳥嘌呤且乙醇代謝產乳酸競爭排泄)', '內臟海鮮紅肉過量'],
        prevention_zh: '完全戒絕高果糖手搖飲、節制酒精、多喝水維持尿液鹼化 (pH 6.2-6.8)。'
      }
    ],
    clinical_red_flags: [
      {
        flag_zh: '無痛性肉眼可見血尿（尿液呈現可樂色、洗肉水色或鮮紅色）',
        urgency: 'EMERGENT',
        action_zh: '高度懷疑泌尿道上皮惡性腫瘤（膀胱癌、腎細胞癌），需立即安排膀胱鏡與顯影檢查。'
      },
      {
        flag_zh: '雙下肢嚴重對稱性凹陷性水腫伴隨尿液綿密持久不散的泡沫（蛋白尿）',
        urgency: 'URGENT',
        action_zh: '懷疑腎病症候群 (Nephrotic Syndrome) 或快速進展性腎絲球腎炎，需立即定量 24 小時尿蛋白。'
      },
      {
        flag_zh: '24 小時內尿量 < 400 mL（少尿）或完全無尿伴隨嚴重呼吸急促',
        urgency: 'EMERGENT',
        action_zh: '急性腎衰竭 (AKI) 伴隨高血鉀或肺水腫，具心律不整心跳停止致死風險，立即送急診。'
      }
    ],
    lifestyle_best_practices: [
      {
        category: 'NUTRITION',
        rule_zh: '落實低鈉護腎飲食與足量水分節奏',
        mechanism_zh: '高鈉攝取促進入球小動脈舒張加劇腎內高壓與蛋白尿排泄；規律分次補水維持腎血流平穩灌流。',
        practical_action_zh: '每日食鹽攝取量控制於 5g 以下（鈉 2000mg），晨起空腹先喝 300-500 mL 溫水補充夜間不顯性失水。'
      },
      {
        category: 'NUTRITION',
        rule_zh: '警惕高果糖漿對腎臟尿酸排泄的阻斷',
        mechanism_zh: '果糖在肝臟代謝消耗大量 ATP 轉化為 AMP 激增尿酸合成，並競爭抑制近曲小管 URAT1 排泄尿酸。',
        practical_action_zh: '戒絕含高果糖糖漿 (HFCS) 之手搖飲與加工果汁，改以無糖茶、黑咖啡或純檸檬水代之。'
      },
      {
        category: 'EXERCISE',
        rule_zh: '炎熱環境運動必須提前與動態補充電解質水分',
        mechanism_zh: '劇烈運動大量出汗若未及時補水，會造成有效循環血容量驟降、腎缺血灌流不足，嚴重橫紋肌溶解症肌紅蛋白沉積更可致急性腎衰竭。',
        practical_action_zh: '長時間戶外高溫運動每 15-20 分鐘補充 150-200 mL 含微量鈉鹽的運動水分。'
      }
    ],
    expert_council_reviewers: ['EC-13', 'EC-01', 'EC-16', 'EC-22'],
    research_citations: [
      {
        authors: 'KDIGO Work Group',
        year: 2024,
        title: 'KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease',
        journal: 'Kidney International',
        doi: '10.1016/j.kint.2023.10.018',
        key_takeaway_zh: '確立 SGLT2 抑制劑與非類固醇鹽皮質激素受體拮抗劑為保護腎元結構的最新一線臨床基石。'
      },
      {
        authors: 'Clark WF, et al.',
        year: 2013,
        title: 'Urine volume and change in estimated GFR in a community-based cohort study',
        journal: 'Clinical Journal of the American Society of Nephrology (CJASN)',
        doi: '10.2215/CJN.10041012',
        key_takeaway_zh: '較高每日尿量 (>2.0-2.5 L) 顯著延緩一般人群與腎病族群之長期 eGFR 生理衰退速度。'
      }
    ]
  }
];
