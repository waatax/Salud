import { DietaryNutrient } from '../types';

export const DIETARY_NUTRIENTS: DietaryNutrient[] = [
  {
    id: 'carbohydrates',
    order_index: 1,
    name_zh: '碳水化合物與升糖動力學',
    name_en: 'Carbohydrates & Glycemic Dynamics',
    tagline_zh: '細胞即時 ATP 能量基質、肝醣儲存極限與升糖指數 (GI/GL) 平緩化',
    category_type: 'MACRO',
    badge: '4 kcal/g · 能量主力',
    summary_zh: '碳水化合物是紅血球唯一能利用的能量源，也是中樞神經系統的主要燃料。人體肝臟（約 100g）與骨骼肌（約 400-500g）具備有限的肝醣儲存空間，超額精緻糖將被肝臟新生脂肪生成 (DNL) 轉化為三酸甘油脂囤積。',
    biomolecules: ['Glucose', 'Glycogen', 'GLUT4', 'Amylase', 'Insulin'],
    biochemical_mechanisms_zh: [
      '單醣經 SGLT1 主動運輸與 GLUT2 易化擴散進入門靜脈，刺激胰島 β 細胞釋放胰島素。',
      '胰島素促使骨骼肌與脂肪細胞膜上的 GLUT4 轉位，將血糖自血液轉運至細胞內合成肝醣 (Glycogenesis)。',
      '精緻高升糖指數 (GI) 澱粉引發急劇血糖振幅，誘發血管內皮細胞粒線體過量產生活性氧自由基 (ROS)，損害 eNOS 一氧化氮生成。',
      '抗性澱粉 (RS1-RS4) 能抵禦小腸酵素水解，直達大腸被菌群發酵產生丁酸等有益短鏈脂肪酸。'
    ],
    daily_intake_targets: {
      target_zh: '占每日總熱量 45–55%（極端 <20% 或 >70% 均呈現 U 型全因死亡風險上升）',
      note_zh: '以原態全穀雜糧、根莖類為主要來源，避免游離添加糖。',
      upper_limit_zh: 'WHO 建議精緻添加糖嚴格限制於總熱量 5–10% 以下（約每日 <25–50g）。'
    },
    rich_food_sources_zh: [
      '全穀雜糧：帶殼糙米、燕麥粒、藜麥、黑米、大麥',
      '富含抗性澱粉原態根莖：蒸熟冷卻地瓜、南瓜、芋頭、馬鈴薯',
      '高纖豆類：鷹嘴豆、黑豆、扁豆、紅豆',
      '原態水果：芭樂、蘋果、奇異果、藍莓（含完整果膠與多酚）'
    ],
    deficiency_and_excess_zh: {
      deficiency: '極端生酮或斷碳可能引起反應性酮酸堆積、運動高強度爆發力衰退、甲狀腺素 T3 生成下降與月經週期混亂。',
      excess: '長期過量精緻糖引發高胰島素血症、內臟脂肪堆積、代謝相關脂肪肝 (MASLD) 與動脈硬化加速。'
    },
    clinical_red_flags: [
      '空腹血糖 ≥ 126 mg/dL 或糖化血色素 (HbA1c) ≥ 6.5%（糖尿病診斷閾值）',
      '餐後 2 小時血糖常態性 > 140-200 mg/dL',
      '嚴重反應性低血糖發作（餐後 2-3 小時突發手抖、心悸、冷汗飢餓感）'
    ],
    common_myths_zh: [
      {
        myth: '減重必須完全戒除所有碳水化合物？',
        reality: '《Lancet Public Health》大規模長期追蹤證實，將精緻澱粉替換為植物性全穀與蔬果碳水化合物的族群壽命最長，完全零碳水反增加全因死亡風險。'
      },
      {
        myth: '果糖是天然糖所以比蔗糖更健康？',
        reality: '游離果糖不經由胰島素調控，100% 進入肝臟直接進入脂肪合成路徑，是誘發高三酸甘油脂血症與脂肪肝的最強推手。'
      }
    ],
    best_practices_zh: [
      '主食採用「1/3 全穀雜糧 + 1/3 地瓜/南瓜 + 1/3 豆類」多元複合配比。',
      '進食順序恪守「水 → 菜/肉 → 飯」，平緩餐後血糖高峰達 30-40%。',
      '主食澱粉煮熟後冷藏隔夜再回溫，可大幅增加抗性澱粉含量降低升糖指數。'
    ],
    research_citations: [
      {
        authors: 'Seidelmann SB, et al.',
        year: 2018,
        title: 'Dietary carbohydrate intake and mortality: a prospective cohort study and meta-analysis',
        journal: 'The Lancet Public Health',
        doi: '10.1016/S2468-2667(18)30135-X',
        key_takeaway_zh: '碳水化合物攝取比例呈現明確 U 型死亡率曲線，50-55% 能量占比且源自全穀蔬果者壽命最長。'
      },
      {
        authors: 'Ludwig DS, et al.',
        year: 2021,
        title: 'The carbohydrate-insulin model: a physiological perspective on the obesity pandemic',
        journal: 'The American Journal of Clinical Nutrition',
        doi: '10.1093/ajcn/nqab270',
        key_takeaway_zh: '高升糖指數碳水化合物促發高胰島素血症，將能量優先分配至脂肪組織導致代謝性飢餓。'
      }
    ]
  },
  {
    id: 'fiber',
    order_index: 2,
    name_zh: '膳食纖維與腸道微生態',
    name_en: 'Dietary Fiber & Gut Microbiome',
    tagline_zh: '非消化性益生元、短鏈脂肪酸 (SCFA) 免疫屏障與 GLP-1 天然促泌劑',
    category_type: 'MACRO',
    badge: '每日 25–35g · 腸黏膜守護盾',
    summary_zh: '膳食纖維是無法被人類小腸消化酵素分解的多醣類與木質素。分為水溶性與非水溶性兩大類，是大腸共生菌群發酵產生短鏈脂肪酸（丁酸、丙酸、乙酸）的唯一底物，直接調控腸道黏膜厚度、抑制結直腸癌並延緩膽固醇吸收。',
    biomolecules: ['Butyrate', 'Beta-Glucan', 'Inulin', 'Pectin', 'Mucin-2'],
    biochemical_mechanisms_zh: [
      '水溶性纖維（果膠、β-葡聚醣、洋車前子）在小腸形成高黏性凝膠網孔，阻滯消化酵素與葡萄糖接觸，顯著削平餐後血糖尖峰。',
      '纖維膠質在迴腸物理結合膽酸（Bile Acids）隨糞便排出，強迫肝臟動用血液中的 LDL 膽固醇重新合成膽酸，達成自然降血脂效應。',
      '結腸厭氧菌群發酵產生丁酸（Butyrate），直接為結腸上皮細胞提供 70% ATP 能量來源，並下調發炎因子 NF-κB。',
      '纖維代謝物刺激腸道內分泌 L 細胞釋放 GLP-1 (升糖素樣胜肽-1) 與 PYY，向大腦下視丘傳遞長效飽足感信號。'
    ],
    daily_intake_targets: {
      target_zh: '成年女性每日至少 25g，成年男性每日至少 35g（或每 1000 kcal 攝取 14g）',
      note_zh: '台灣國民營養健康調查顯示，超過 85% 成年人每日纖維攝取不足 15g。',
      upper_limit_zh: '健康成人無嚴格上限，但單日 >60-70g 若未搭配充足飲水可能引發腹脹或微量礦物質螯合。'
    },
    rich_food_sources_zh: [
      '水溶性纖維冠軍：燕麥麩皮 (β-葡聚醣)、秋葵、黑木耳、奇亞籽、海帶',
      '非水溶性纖維主力：深綠色花椰菜、竹筍、牛蒡、豆類外皮、糙米麩皮',
      '益生元果聚醣：洋蔥、大蒜、蘆筍、菊苣根 (菊糖 Inulin)'
    ],
    deficiency_and_excess_zh: {
      deficiency: '結腸菌群飢餓轉而侵蝕結腸自身 MUC2 黏液蛋白層，導致腸道黏膜變薄穿孔（腸漏）、慢性便秘與憩室炎。',
      excess: '若在數日內突然激增纖維攝取而未同步增加飲水，可能誘發急性腹脹、排氣頻繁或糞石性腸阻塞。'
    },
    clinical_red_flags: [
      '持續便秘排便困難超過 2 週伴隨糞便直徑變細（鉛筆便）',
      '排便習慣突發無理由交替（便秘與腹瀉輪番出現）',
      '血便或大便潛血陽性（需即時排除大腸息肉與腺癌）'
    ],
    common_myths_zh: [
      {
        myth: '喝過濾蔬果汁能補充和吃原態蔬菜一樣的纖維？',
        reality: '過濾蔬果汁將珍貴的非水溶性纖維渣全部濾除，僅留下高濃度游離果糖，升糖指數劇增且無腸道菌群發酵保護效益。'
      },
      {
        myth: '吃纖維一定要吃粗糙難嚥的口感才有效果？',
        reality: '燕麥、奇亞籽、秋葵等黏滑口感含有極高比例的可溶性纖維，對降低膽固醇與平穩血糖的實證效果甚至高於粗纖維。'
      }
    ],
    best_practices_zh: [
      '「纖維遞增階梯」：每週逐步增加 5g 纖維，讓腸道菌相有 1-2 週時間調適，避免脹氣。',
      '纖維與水分必須同盟：每增加 10g 膳食纖維，額外多喝 300-500 mL 純水以利膠體膨脹潤滑。',
      '實踐「彩虹蔬果盤」：每日至少 3 份蔬菜 + 2 份低糖水果，顏色涵蓋紅綠橘紫白。'
    ],
    research_citations: [
      {
        authors: 'Reynolds A, et al.',
        year: 2019,
        title: 'Carbohydrate quality and human health: a series of systematic reviews and meta-analyses',
        journal: 'The Lancet',
        doi: '10.1016/S0140-6736(18)31809-9',
        key_takeaway_zh: '每日膳食纖維攝取 25-29g 者，全因死亡率、冠心病、第 2 型糖尿病與結直腸癌風險降低 15-30%。'
      },
      {
        authors: 'Earle KA, et al.',
        year: 2015,
        title: 'Quantitative Imaging of Gut Microbiota in Spatial Relation to Host and Dietary Components',
        journal: 'Cell Host & Microbe',
        doi: '10.1016/j.chom.2015.10.009',
        key_takeaway_zh: '低纖維飲食迫使共生菌降解宿主腸道黏液層，造成病原菌直接貼附上皮誘發結腸炎。'
      }
    ]
  },
  {
    id: 'protein',
    order_index: 3,
    name_zh: '蛋白質、胺基酸與肌肉合成',
    name_en: 'Proteins, Amino Acids & Muscle Synthesis',
    tagline_zh: '人體結構基本建材、白胺酸閾值 (mTORC1) 與 DIAAS 優質消化率評分',
    category_type: 'MACRO',
    badge: '4 kcal/g · 肌肉骨骼防線',
    summary_zh: '蛋白質由 20 種胺基酸組成（其中 9 種為人體無法自行合成的必需胺基酸 EAA）。掌管酵素催化、抗體防禦、胜肽荷爾蒙與全身肌肉骨骼膠原蛋白的更新修復。年長者對肌肉蛋白質合成常存在「同化阻抗」，需提高單餐優質蛋白密度。',
    biomolecules: ['Leucine', 'EAA', 'mTORC1', 'Albumin', 'Glutathione'],
    biochemical_mechanisms_zh: [
      '必需胺基酸（尤其是支鏈胺基酸中的白胺酸 Leucine）結合 Sestrin2 感應蛋白，釋放 Rag GTPases 募集 mTORC1 至溶酶體膜活化。',
      '單餐白胺酸達到 2.5–3.0g 門檻（白胺酸閾值 Leucine Trigger），肌肉蛋白質合成 (MPS) 速率即可達到飽和峰值。',
      '消化率可校正胺基酸評分 (DIAAS) 評估迴腸末端真實吸收率，乳清蛋白、雞蛋、牛肉高達 1.15-1.30，大豆分離蛋白約 0.95。',
      '過量未被利用的胺基酸在肝臟脫氨基，轉化為尿素經由腎臟排泄，碳骨架則進入檸檬酸循環氧化供能或轉化儲存。'
    ],
    daily_intake_targets: {
      target_zh: '一般久坐成人 1.0–1.2 g/kg；活躍運動者與銀髮抗肌少族群 1.2–1.6 g/kg；重力訓練增肌期 1.6–2.0 g/kg',
      note_zh: '60 公斤長者每日建議 72–96g，平均分配於早、中、晚三餐（每餐 25–30g）。',
      upper_limit_zh: '健康腎功能人群高達 2.2 g/kg 仍具高度安全性；重度慢性腎臟病 (CKD 第 3b-5 期非透析) 需依醫囑限制於 0.6–0.8 g/kg。'
    },
    rich_food_sources_zh: [
      '動物性完整蛋白（高 DIAAS）：放牧雞蛋（含卵磷脂與膽鹼）、深海魚、去皮禽肉、低脂乳清',
      '優質植物蛋白互補組合：黃豆及其製品（天貝、毛豆、無糖豆漿）、扁豆配糙米（甲硫胺酸與離胺酸互補）',
      '高白胺酸食材：帕馬森乳酪、火雞肉、大豆分離蛋白、鮪魚'
    ],
    deficiency_and_excess_zh: {
      deficiency: '低白蛋白血症水腫、骨骼肌進行性萎縮（肌少症 Sarcopenia）、傷口癒合延遲、免疫抗體合成不足。',
      excess: '在重度慢性腎衰竭且未透析患者中，過高蛋白質會加速腎絲球入球小動脈擴張、加劇腎內高壓濾過硬化。'
    },
    clinical_red_flags: [
      '老年人無意間握力快速衰退（男性 <28kg，女性 <18kg，肌少症臨界點）',
      '雙下肢凹陷性水腫伴隨血清白蛋白 (Albumin) < 3.5 g/dL',
      '骨折術後或臥床 1 週以上肌肉萎縮急速加速'
    ],
    common_myths_zh: [
      {
        myth: '吃高蛋白飲食會把健康人的腎臟「吃壞」？',
        reality: '《JAMA》與多項腎臟權威薈萃分析證實：在基線腎功能正常 (eGFR > 90) 的成年人中，高蛋白攝取並不會誘發腎臟損傷，其血流灌流增強屬正常生理代償適應。'
      },
      {
        myth: '植物性蛋白質完全無法幫助增肌？',
        reality: '透過「穀物（富含蛋胺酸）+ 豆類（富含離胺酸）」互補配對，或適度提高 10-20% 植物蛋白總攝取量以達到白胺酸閾值，增肌效果與動物蛋白無統計顯著差異。'
      }
    ],
    best_practices_zh: [
      '打破「早餐吃得少、晚餐集中吃肉」的習慣，將蛋白質「均勻三分」到早中晚三餐。',
      '阻抗訓練後 2 小時內補充 20-30g 優質蛋白質，促進骨骼肌超量補償修復。',
      '茹素者每餐確保豆類與全穀搭配，並適度補充維生素 B12 與鐵質。'
    ],
    research_citations: [
      {
        authors: 'Phillips SM, et al.',
        year: 2016,
        title: 'Protein “requirements” beyond the RDA: implications for optimizing health',
        journal: 'Applied Physiology, Nutrition, and Metabolism',
        doi: '10.1139/apnm-2015-0550',
        key_takeaway_zh: '傳統 RDA 0.8 g/kg 僅為防範缺乏症的最低標準，促進骨骼肌健康與代謝優化的最佳劑量為 1.2-1.6 g/kg。'
      },
      {
        authors: 'Morton RW, et al.',
        year: 2018,
        title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains',
        journal: 'Br J Sports Med',
        doi: '10.1136/bjsports-2017-097608',
        key_takeaway_zh: '攝取達 1.6 g/kg/day 結合阻力運動，能達成肌肥大與最大肌力增長的最佳效益平台期。'
      }
    ]
  },
  {
    id: 'vitamins',
    order_index: 4,
    name_zh: '維生素全譜（脂溶性與水溶性）',
    name_en: 'Comprehensive Vitamins Spectrum',
    tagline_zh: '人體必需微量催化輔酶、D3+K2 鈣質定向沉積與 B 群甲基化循環',
    category_type: 'MICRO',
    badge: '13 種必需微量維生素',
    summary_zh: '維生素是人體無法自行合成（或合成量不足）但不可或缺的有機化合物。分為脂溶性（A, D, E, K）與水溶性（B群 8 種 + 維生素 C）。扮演酵素輔酶、抗氧化防禦網與基因轉錄因子的開關角色。',
    biomolecules: ['25(OH)D3', 'Menaquinone-7 (K2)', 'Methylcobalamin (B12)', 'Ascorbic Acid (C)', 'Folate (5-MTHF)'],
    biochemical_mechanisms_zh: [
      '維生素 D3 活化後結合核受體 VDR，促進十二指腸上皮細胞合成鈣結合蛋白 (Calbindin)，提升腸道鈣質吸收率 3-4 倍。',
      '維生素 K2 (MK-7) 為 γ-穀胺醯羧化酶 (GGCX) 的輔因子，活化骨鈣素 (Osteocalcin) 將鈣質鎖入骨質，並活化基質 Gla 蛋白 (MGP) 防止血管平滑肌鈣化。',
      '活性維生素 B6、葉酸 (5-MTHF) 與 B12 (甲基鈷胺素) 共同驅動「單碳甲基化循環 (One-Carbon Metabolism)」，將心血管毒性分子同半胱胺酸 (Homocysteine) 轉化回甲硫胺酸。',
      '維生素 C 作為脯胺醯羥化酶輔因子，催化三股螺旋前膠原蛋白的交聯成熟，維持血管與結締組織堅韌。'
    ],
    daily_intake_targets: {
      target_zh: '依衛福部國人膳食營養素參考攝取量 (DRIs)：Vit D 1000–2000 IU/天；Vit C 100–500 mg/天；Vit B12 2.4–100 μg/天',
      note_zh: '現代人因高達 90% 時間處於室內且塗抹防曬乳，維生素 D 不足率在台灣高達 60-70%。',
      upper_limit_zh: '脂溶性維生素具體內蓄積性：Vit A 上限 3000 μg RAE/天；Vit D 上限 4000 IU/天（日常補充安全上限）。'
    },
    rich_food_sources_zh: [
      '脂溶性維生素：野生鮭魚、蛋黃、牛肝、納豆 (含高濃度 K2 MK-7)、特級初榨橄欖油 (Vit E)',
      '水溶性 B 群：營養酵母、全穀胚芽、深綠色蔬菜 (天然葉酸)、瘦肉、牡蠣 (極高 B12)',
      '維生素 C 冠亞軍：紅心芭樂、甜椒、黃金奇異果、柑橘類、花椰菜'
    ],
    deficiency_and_excess_zh: {
      deficiency: '維生素 D 缺乏導致骨軟化症與肌無力；B12 缺乏引發巨球性貧血與不可逆脊髓亞急性聯合變性 (SCD)；維生素 C 缺乏引發壞血病出血。',
      excess: '水溶性過量一般隨尿液排出（但高劑量 Vit C >2000mg/天可增加草酸鈣結石風險）；脂溶性 Vit A 極端過量可能誘發肝毒性與顱內高壓。'
    },
    clinical_red_flags: [
      '手腳末梢對稱性麻木、刺痛、步態不穩（需緊急檢驗血清 Vit B12 與甲基丙二酸 MMA）',
      '血清 25-羥基維生素 D [25(OH)D] < 20 ng/mL（嚴重不足）',
      '皮下不明原因點狀紫斑或牙齦易自發性滲血（排除維生素 C 或 K 缺乏之凝血障礙）'
    ],
    common_myths_zh: [
      {
        myth: '隔著窗戶玻璃曬太陽就能合成足量維生素 D？',
        reality: '玻璃能阻擋 99% 以上可刺激皮膚合成維生素 D 的紫外線 B 光 (UVB)，隔著玻璃曬太陽只會接受會造成皮膚老化的 UVA，無法合成任何維生素 D。'
      },
      {
        myth: '吃高劑量綜合維他命就能抵消不健康飲食？',
        reality: '多項百萬人前瞻性世代研究證實：單純服用綜合維他命藥錠無法取代原態天然食物中的植化素、類黃酮與微量纖維基質的協同綜效。'
      }
    ],
    best_practices_zh: [
      '脂溶性維生素（A、D、E、K）務必隨含有油脂之正餐一同服用，生物利用度可提升 300%。',
      '長期純素食者（Vegan）必須終身規律補充活性型維生素 B12（甲基鈷胺素）。',
      '每年健檢自費追蹤「血清 25(OH)D 濃度」，以維持在 30–50 ng/mL 為最佳長壽免疫靶標。'
    ],
    research_citations: [
      {
        authors: 'Manson JE, et al. (VITAL Research Group)',
        year: 2019,
        title: 'Vitamin D Supplements and Prevention of Cancer and Cardiovascular Disease',
        journal: 'New England Journal of Medicine (NEJM)',
        doi: '10.1056/NEJMoa1809944',
        key_takeaway_zh: '大型隨機對照試驗顯示，補充維生素 D3 顯著降低進行性惡性腫瘤死亡率達 17-25%。'
      },
      {
        authors: 'Theuwissen E, et al.',
        year: 2012,
        title: 'The role of vitamin K in soft-tissue calcification',
        journal: 'Advances in Nutrition',
        doi: '10.3945/an.111.001628',
        key_takeaway_zh: '維生素 K2 活化基質 Gla 蛋白 (MGP)，是防止動脈彈性中層鈣化硬化的關鍵分子閥門。'
      }
    ]
  },
  {
    id: 'minerals',
    order_index: 5,
    name_zh: '微量元素與關鍵礦物質',
    name_en: 'Trace Minerals & Essential Elements',
    tagline_zh: '鎂-300酵素輔酶、鋅免疫修復、鐵氧轉運與鈉鉀血壓平衡閥',
    category_type: 'MICRO',
    badge: '無機元素 · 離子電位穩定器',
    summary_zh: '礦物質佔人體重量約 4%，但掌管神經膜電位傳導、肌肉興奮收縮偶聯、骨骼無機晶體支撐與抗氧化酵素核心。鎂、鋅、鐵、硒以及鈉鉀平衡，是臨床實證醫學最常發現邊緣性缺乏的微量板塊。',
    biomolecules: ['Magnesium (Mg2+)', 'Zinc (Zn2+)', 'Ferritin (Fe)', 'Selenium (Se)', 'Na+/K+ ATPase'],
    biochemical_mechanisms_zh: [
      '鎂離子 (Mg2+) 螯合於 ATP 分子結構中，是體內 300+ 種消耗能量的酵素不可或缺的輔因子；在中樞神經扮演 NMDA 受體的電位依賴型天然離子通道阻斷劑（預防神經興奮毒性）。',
      '鋅離子 (Zn2+) 構成超氧化物歧化酶 (Cu/Zn SOD) 活性中心，並作為 DNA 轉錄因子「鋅指 (Zinc Fingers)」結構維護基因表達穩定。',
      '鐵離子 (Fe2+) 為血紅素的核心螯合金屬，攜帶氧氣分子至全身；鐵過載會透過芬頓反應 (Fenton Reaction) 生成劇毒羥自由基 (•OH) 引發脂質過氧化。',
      '鈉鉀泵 (Na+/K+ ATPase) 消耗 1 分子 ATP 泵出 3 個 Na+ 同時泵入 2 個 K+，建立維持心肌電氣生理與周邊血管平滑肌張力所必需的膜靜息電位。'
    ],
    daily_intake_targets: {
      target_zh: '鎂：男 380mg/天、女 320mg/天；鋅：男 15mg/天、女 12mg/天；鉀：3500–4700 mg/天；鈉：<2000–2300 mg/天（約 5g 食鹽）',
      note_zh: '台灣人普遍鈉攝取超標 1.5–2 倍（達 3500-4000mg/天），但鉀攝取僅達建議量的 60%，鈉鉀比失衡是高血壓原發驅動力。',
      upper_limit_zh: '鎂補充劑上限 350 mg/天（食物來源無上限）；鋅補充上限 40 mg/天（避免長期競爭阻礙銅吸收造成缺銅性貧血）。'
    },
    rich_food_sources_zh: [
      '高鎂原態食材：黑巧克力 (>85%)、南瓜子、杏仁、深綠菠菜、熟黑豆、酪梨',
      '高生物利用度鋅：生蠔、蛤蜊、草飼牛肉、南瓜子、小麥胚芽',
      '高鉀降血壓食物：香蕉、馬鈴薯（連皮）、深綠莧菜、椰子水、番茄泥',
      '有機硒冠軍：巴西堅果（每日只需 1-2 顆即可滿足 100% 硒需求）'
    ],
    deficiency_and_excess_zh: {
      deficiency: '鎂缺乏引發小腿抽筋、偏頭痛、心悸焦慮與胰島素敏感度下降；鋅缺乏引發味覺遲鈍、傷口不癒、掉髮與睪固酮低下；缺鐵引發缺鐵性貧血與極度疲勞。',
      excess: '鐵過量（如血鐵沉積症）破壞肝臟與心肌組織；氧化鎂單次劑量過高引發滲透性腹瀉。'
    },
    clinical_red_flags: [
      '嚴重低血鉀 (<3.0 mEq/L) 誘發心電圖 U 波出現與致死性室性心律不整',
      '血清鐵蛋白 (Ferritin) < 15-30 ng/mL（隱形缺鐵，甚至早於血紅素下降前出現）',
      '慢性不明原因難以控制的高血壓且對多種降壓藥反應遲鈍（評估鈉鉀比與原發性醛固酮症）'
    ],
    common_myths_zh: [
      {
        myth: '高血壓降壓只需要「少吃鹽」就足夠？',
        reality: '《DASH》與《NEJM》臨床試驗證實，「提高鉀攝取」促使腎小管主動排出鈉並放鬆血管平滑肌的效果，往往遠勝過單純極端限制低鈉。'
      },
      {
        myth: '所有的鎂補充劑吸收效果都差不多？',
        reality: '市售便宜的「氧化鎂 (Magnesium Oxide)」生物吸收率僅約 4%，大部分滯留腸道引發腹瀉；而「甘胺酸鎂 (Magnesium Glycinate)」或「牛磺酸鎂」吸收率高且具鎮靜神經放鬆效益。'
      }
    ],
    best_practices_zh: [
      '家庭廚房可將一般精製鈉鹽替換為「減鈉鉀鹽（50% NaCl + 50% KCl）」，烹調直接自然補鉀排鈉（嚴重腎功能不全者需遵醫囑）。',
      '有夜間磨牙、小腿肌肉痙攣或焦慮失眠者，可於睡前補充 200-300mg 高生物利用度的甘胺酸鎂。',
      '補充高劑量鋅（>30mg/天）連續超過 2 個月時，應併同補充 1-2mg 銅，以防微量元素競爭失衡。'
    ],
    research_citations: [
      {
        authors: 'Neal B, et al. (SSaSS Collaborative Group)',
        year: 2021,
        title: 'Effect of Salt Substitution on Cardiovascular Events and Death',
        journal: 'New England Journal of Medicine (NEJM)',
        doi: '10.1056/NEJMoa2105675',
        key_takeaway_zh: '兩萬人大型隨機對照試驗證實：以鉀替代鹽取代一般鹽，顯著降低腦中風風險 14% 及全因死亡率 12%。'
      },
      {
        authors: 'DiNicolantonio JJ, et al.',
        year: 2018,
        title: 'Subclinical magnesium deficiency: a principal driver of cardiovascular disease and a public health crisis',
        journal: 'Open Heart / BMJ',
        doi: '10.1136/openhrt-2017-000668',
        key_takeaway_zh: '現代農業精緻化使得食物含鎂量流失，亞臨床缺鎂是心血管內皮硬化與高血壓的核心隱形驅動力。'
      }
    ]
  },
  {
    id: 'fats',
    order_index: 6,
    name_zh: '脂肪、食用油與脂質代謝',
    name_en: 'Fats, Edible Oils & Lipid Metabolism',
    tagline_zh: '高能量密度載體、細胞膜流動性與 Omega-3/6 比例抗炎平衡',
    category_type: 'MACRO',
    badge: '9 kcal/g · 細胞膜結構核心',
    summary_zh: '膳食脂肪是細胞膜雙層磷脂質的基石，也是脂溶性維生素吸收與固醇類荷爾蒙（睪固酮、雌激素、皮質醇）的前驅原料。依照碳鏈雙鍵分為飽和 (SFA)、單元不飽和 (MUFA) 與多元不飽和 (PUFA)，不同烹調油品之發煙點決定高溫熱穩定性。',
    biomolecules: ['Omega-3 (EPA/DHA)', 'Oleic Acid (Omega-9)', 'Linoleic Acid (Omega-6)', 'SFA', 'Cholesterol'],
    biochemical_mechanisms_zh: [
      '多元不飽和脂肪酸具備多個順式雙折角雙鍵，賦予細胞膜高度流動性，促進膜受體轉運與胰島素敏銳度。',
      'Omega-6 花生四烯酸 (AA) 經由 COX 酵素代謝為促炎前列腺素 PGE2；Omega-3 (EPA) 競爭性結合同一酵素生成弱炎 PGE3 並合成抗炎消退素 (Resolvins)。',
      '高飽和脂肪酸（尤其是月桂酸、肉豆蔻酸、棕櫚酸）下調肝臟 LDL 受體表達，延緩血液中 LDL 顆粒清除，拉高循環 ApoB 濃度。',
      '高溫超過食用油發煙點會誘發三酸甘油脂熱裂解、聚合反應與總極性物質 (TPM) 累積，釋放丙烯醛等致癌揮發物。'
    ],
    daily_intake_targets: {
      target_zh: '占每日總熱量 20–35%；其中飽和脂肪 (SFA) 應限制於總熱量 <7–10% 以下',
      note_zh: '現代加工飲食 Omega-6 與 Omega-3 比例常失衡高達 15:1 甚至 20:1，健康理想目標應拉回至 2:1 到 4:1。',
      upper_limit_zh: '工業反式脂肪 (Trans Fats) 攝取量應為嚴格「0 克」（人造氫化油可大幅增加冠心病與全因死亡風險）。'
    },
    rich_food_sources_zh: [
      '特級初榨橄欖油 (EVOO)：富含高純度單元不飽和油酸 (Oleic Acid) 與橄欖苦苷多酚',
      '富含 Omega-3 海洋脂質：野生鯖魚、秋刀魚、鮭魚、沙丁魚',
      '植物 Omega-3 (ALA)：亞麻仁油、印加果油、核桃、奇亞籽',
      '高飽和脂肪（需適量節制）：牛油、豬油、棕櫚油、椰子油'
    ],
    deficiency_and_excess_zh: {
      deficiency: '極端極低脂飲食 (<10% 熱量) 會導致脂溶性維生素缺乏、皮膚乾裂角化、性荷爾蒙合成低下與膽汁淤積。',
      excess: '過量飽和脂肪與反式脂肪促使血液 LDL-C 與 ApoB 飆升，沉積血管內皮誘發冠狀動脈硬化狹窄。'
    },
    clinical_red_flags: [
      '血中空腹三酸甘油脂 (TG) > 150 mg/dL（嚴重超標 >500 mg/dL 具急性胰臟炎致命危險）',
      'LDL-C > 190 mg/dL（高度懷疑家族性高膽固醇血症 FH）',
      'TG / HDL-C 比值 > 3.0（強力反映小而緻密 LDL-C 與全身胰島素阻抗）'
    ],
    common_myths_zh: [
      {
        myth: '特級初榨橄欖油完全不能拿來熱炒？',
        reality: '優質特級初榨橄欖油發煙點約 190-210°C，且富含強效抗氧化多酚，能保護脂肪酸免於高溫氧化，在一般家庭常規 160-180°C 熱炒中極具穩定性。'
      },
      {
        myth: '動物性豬油天然無添加，多吃比植物油更護心？',
        reality: '豬油含有約 40% 飽和脂肪，多項大型世代研究證實：將飽和脂肪等熱量替換為多元不飽和脂肪植物油（如大豆油、芥花油、橄欖油），心血管事件風險下降 25-30%。'
      }
    ],
    best_practices_zh: [
      '涼拌與中低溫烹調選用特級初榨橄欖油、苦茶油或酪梨油。',
      '家庭高溫煎炸避免使用易氧化的大豆沙拉油，嚴禁重複使用回鍋油。',
      '點擊進入 Salud 旗艦【Chapter O · 脂肪與食用油專章】，使用互動模擬器評估 16 種食用油脂肪酸配比。'
    ],
    linked_chapter_or_tool: {
      type: 'chapter',
      id: 'O',
      label_zh: '前往 Chapter O · 脂肪與油旗艦專章 (12 知識頁 + 16 種油品換油模擬器)'
    },
    research_citations: [
      {
        authors: 'Mensink RP, et al. (WHO Systematic Review)',
        year: 2016,
        title: 'Effects of saturated fatty acids on serum lipids and lipoproteins: a systematic review and regression analysis',
        journal: 'World Health Organization (WHO)',
        doi: '10.1161/ATVBAHA.116.307400',
        key_takeaway_zh: '以多元或單元不飽和脂肪酸取代飽和脂肪，可顯著改善總膽固醇、LDL-C 與 ApoB 指標。'
      },
      {
        authors: 'Guasch-Ferré M, et al.',
        year: 2020,
        title: 'Consumption of Olive Oil and Risk of Total and Cause-Specific Mortality',
        journal: 'Journal of the American College of Cardiology (JACC)',
        doi: '10.1016/j.jacc.2021.10.041',
        key_takeaway_zh: '每日食用 >7g 橄欖油的個體，心血管死亡風險降低 19%，神經退化死亡降低 29%。'
      }
    ]
  },
  {
    id: 'hydration',
    order_index: 7,
    name_zh: '水分與電解質體液平衡',
    name_en: 'Hydration & Fluid Balance',
    tagline_zh: '細胞內外液三個房間、下視丘滲透壓警報與 Aquaporin 水通道',
    category_type: 'FLUID',
    badge: '占體重 60% · 生命溶劑',
    summary_zh: '水是人體含量最豐富的化學分子，在細胞內液 (67%)、組織間液 (25%) 與血漿 (8%) 三個房間動態平衡。下視丘滲透壓受器只要感應到血漿滲透壓上升 1-2%，便立即觸發口渴中樞並釋放 ADH 保水，守護有效血容量與體溫散熱。',
    biomolecules: ['Aquaporin-2 (AQP2)', 'ADH / Vasopressin', 'Serum Osmolality', 'Electrolytes (Na/K/Cl)'],
    biochemical_mechanisms_zh: [
      '滲透壓由細胞外液主要陽離子鈉離子 (Na+) 決定：血漿滲透壓正常嚴格維持於 275–295 mOsm/kg。',
      '血漿高滲時刺激下視丘視上核與室旁核分泌抗利尿激素 (ADH)，迅速使腎臟集尿管嵌合 Aquaporin-2 水通道重吸收水分。',
      '脫水達到體重 2% 即可引發認知專注力下降、心搏代償性加快；超過 4% 顯著削弱有氧耐力與肌力；達 7-10% 誘發循環衰竭中暑。',
      '運動大量流汗若僅補充純水而不補充鈉鹽，會引發低滲透壓性稀釋性「運動相關低血鈉症 (EAH)」，可引發腦水腫昏迷。'
    ],
    daily_intake_targets: {
      target_zh: '健康成人基礎需求約 30–35 mL/kg/天（60 公斤成人約 1800–2100 mL/天）',
      note_zh: '高溫戶外或劇烈流汗運動每小時額外增加 500–1000 mL 電解質水分。',
      upper_limit_zh: '心衰竭、晚期慢性腎病 (CKD) 或肝硬化合併腹水患者，需依醫師處方嚴格限水（每日 <1000–1500 mL）。'
    },
    rich_food_sources_zh: [
      '純淨飲用水：溫開水、無糖綠茶、黑咖啡（適量算入總液體攝取）',
      '高水分原態蔬菜：小黃瓜 (96%)、番茄 (94%)、冬瓜、生菜',
      '天然電解質水：天然無糖椰子水（富含鉀離子）'
    ],
    deficiency_and_excess_zh: {
      deficiency: '慢性邊緣性脫水引發腎結石、尿道感染、血液黏稠度增加（血栓易感）與急性疲倦頭痛。',
      excess: '短時間過量暴飲純水 (>1 公升/小時) 超過腎臟最大稀釋排泄極限 (約 800-1000 mL/hr)，引發致命性「水中毒（急性低血鈉）」。'
    },
    clinical_red_flags: [
      '尿液呈現深褐色、烏龍茶色或可樂色（Armstrong 尿色尺規 6-8 級，嚴重脫水或橫紋肌溶解）',
      '劇烈運動長跑後出現頭痛、劇烈嘔吐、步態蹣跚與意識混亂（高度警惕 EAH 運動低血鈉腦水腫）',
      '24 小時尿量少於 400 mL 且皮膚彈性顯著消失'
    ],
    common_myths_zh: [
      {
        myth: '「口渴了才需要喝水」是人體最自然的信號？',
        reality: '當下視丘口渴中樞發出強烈信號時，身體通常已經脫水 1.5-2.0%，且年長者口渴中樞敏感度顯著衰退，應維持定時定量主動補水。'
      },
      {
        myth: '每天「一定要喝滿 3000cc」才是健康排毒？',
        reality: '水分攝取需個人化評估體重、工作流汗量與飲食型態，盲目過量灌水對心腎功能不全者可能誘發急性心衰竭肺水腫。'
      }
    ],
    best_practices_zh: [
      '晨起第一杯水：空腹飲用 300-400 mL 溫水，補充夜間呼吸與出汗流失的有效血容量。',
      '以「尿液顏色」作為每日最直觀的水合儀表板，維持在清澈淡黃色（第 1-3 級）。',
      '點擊進入 Salud 旗艦【Chapter W · 水與體液平衡專章】，閱讀 12 個完整知識頁與動態收支模擬器。'
    ],
    linked_chapter_or_tool: {
      type: 'chapter',
      id: 'W',
      label_zh: '前往 Chapter W · 水與體液專章 (12 知識頁 + 24小時水分收支模擬器)'
    },
    research_citations: [
      {
        authors: 'Armstrong LE, et al.',
        year: 2012,
        title: 'Mild dehydration affects mood in healthy young women',
        journal: 'The Journal of Nutrition',
        doi: '10.3945/jn.111.142000',
        key_takeaway_zh: '輕微 1.36% 體液流失即對警覺性、工作記憶、注意力與頭痛頻率產生顯著負面損害。'
      },
      {
        authors: 'Rosner MH, et al.',
        year: 2015,
        title: 'Exercise-Associated Hyponatremia: 2015 Consensus Statement',
        journal: 'Clinical Journal of Sport Medicine',
        doi: '10.1097/JSM.0000000000000221',
        key_takeaway_zh: '確立耐力運動中過量補充低滲液體為運動低血鈉 (EAH) 的首要致死成因。'
      }
    ]
  },
  {
    id: 'supplements',
    order_index: 8,
    name_zh: '營養保健品與實證矩陣',
    name_en: 'Nutrition & Evidence Dietary Supplements',
    tagline_zh: '終結市售智商稅、GRADE 實證分級矩陣與處方西藥交互作用防火牆',
    category_type: 'SUPPLEMENT',
    badge: 'GRADE A–E · TFDA 四層法規',
    summary_zh: '原「實證保健品」專章，現完整整合納入飲食體系。保健品定位為「彌補日常原態飲食無法足量攝取之特定缺口」，而非取代健康生活型態。嚴格遵循牛津實證醫學中心 GRADE 標準（A級明確有效至 E級無效高風險），並建置處方西藥交互作用警示。',
    biomolecules: ['rTG Omega-3', 'Creatine Monohydrate', 'Magnesium Glycinate', 'CoQ10', 'Berberine'],
    biochemical_mechanisms_zh: [
      '肌酸 (Creatine Monohydrate) 提升骨骼肌磷酸肌酸 (PCr) 儲備，在 0-10 秒無氧高強度輸出中極速再合成 ATP。',
      '高純度魚油 EPA 抑制花生四烯酸代謝路徑，下調三酸甘油脂合成並抗血栓穩定粥狀硬化斑塊。',
      '輔酶 Q10 (CoQ10) 作為粒線體電子傳遞鏈複合物 I/II 至 III 的電子梭，服用 Statin 降脂藥會阻斷甲羥戊酸路徑連帶減少自身 CoQ10 合成。',
      '紅麴（Monacolin K，化學結構等同 Lovastatin）與處方 Statin 併用會產生劑量加成毒性，引發急性橫紋肌溶解症與肝損傷。'
    ],
    daily_intake_targets: {
      target_zh: '個別化評估：飲食缺什麼補什麼，拒絕「盲目一把吞」的大補帖心態',
      note_zh: '認明衛福部 TFDA「小綠人健康食品標章」，具特定保健功效科學審查許可證。',
      upper_limit_zh: '嚴格遵守各營養素 UL (Tolerable Upper Intake Level) 安全上限，避免重金屬與脂溶性蓄積。'
    },
    rich_food_sources_zh: [
      '原則第一條：90% 微量營養素應優先自「多樣化原態天然全食物」中獲得',
      '營養補充品僅為輔助工具：如高純度 rTG 魚油、甘胺酸鎂、活性維生素 D3+K2、一水肌酸'
    ],
    deficiency_and_excess_zh: {
      deficiency: '若生活型態極度特殊（如全素食者缺乏 B12、高緯度常年室內工作者缺乏 Vit D），未適時補充會誘發臨床疾病。',
      excess: '濫用來路不明地下電台保健品可能摻雜重金屬、未標示西藥或利尿劑，重度損害肝腎功能。'
    },
    clinical_red_flags: [
      '正在服用抗凝血劑（Warfarin / NOACs）卻併用銀杏、高劑量魚油、當歸（劇增腦出血風險）',
      '服用降血壓藥物同時服用高劑量輔酶 Q10 或精胺酸（血壓驟降引發休克）',
      '保健品宣稱可「逆轉晚期癌症、根治糖尿病、3天速效通血路」（百分之百違法詐欺）'
    ],
    common_myths_zh: [
      {
        myth: '「天然萃取」一定比「化學合成」更安全有效？',
        reality: '許多天然草本萃取物批次間活性成分濃度波動極大且可能殘留農藥重金屬；經良好 GMP 規範純化合成之成分在劑量精確性與安全性上往往更為穩定。'
      },
      {
        myth: '既然是健康食品，多吃幾顆效果更快更好？',
        reality: '營養素在體內受轉運載體與受體飽和度限制，過量攝取不僅白白隨尿液排出，脂溶性成分與微量元素更會在肝腎蓄積引發不可逆器官中毒。'
      }
    ],
    best_practices_zh: [
      '購買前必查「第三方安全檢驗認證」（如 NSF、USP、IFOS 五星魚油認證、重金屬無塑化劑檢驗）。',
      '慢性病用藥者在開始任何新保健品前，務必諮詢專科醫師或臨床藥師進行交互作用審查。',
      '點擊進入 Salud 內建【營養保健與藥物交互作用檢查器】，輸入正在使用的處方藥物一秒防呆。'
    ],
    linked_chapter_or_tool: {
      type: 'hub',
      id: 'supplements',
      label_zh: '前往 營養保健總樞紐 (GRADE 實證清單 + 西藥交互作用防火牆)'
    },
    research_citations: [
      {
        authors: 'Chowdhury R, et al.',
        year: 2014,
        title: 'Vitamin D and risk of cause specific death: systematic review and meta-analysis of observational cohort and randomised intervention studies',
        journal: 'The BMJ',
        doi: '10.1136/bmj.g1903',
        key_takeaway_zh: '隨機對照試驗證實維生素 D3 補充顯著降低全因死亡率，而維生素 D2 則無顯著效果。'
      },
      {
        authors: 'Kreider RB, et al. (ISSN)',
        year: 2017,
        title: 'International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine',
        journal: 'Journal of the International Society of Sports Nutrition',
        doi: '10.1186/s12970-017-0173-z',
        key_takeaway_zh: '一水肌酸是目前實證最充足 (GRADE A)、安全性最高之運動力量表現與神經保護補充劑。'
      }
    ]
  },
  {
    id: 'alcohol',
    order_index: 9,
    name_zh: '酒精、乙醇代謝與風險控管',
    name_en: 'Alcohol, Ethanol Metabolism & Risk Mitigation',
    tagline_zh: '一級致癌物乙醛蓄積、台灣 ALDH2 基因突變缺陷與 BAC 清除生理學',
    category_type: 'METABOLIC_RESTRICTED',
    badge: '7 kcal/g · 嚴格排在最後 · 代謝毒物',
    summary_zh: '酒精（乙醇）是中樞神經抑制劑，熱量高達 7 kcal/g，但為毫無營養價值的「空熱量」。WHO 國際癌症研究機構 (IARC) 將酒精列為 Group 1 一級致癌物。台灣近 47% 人口存在 ALDH2 乙醛去氫酶基因缺陷，喝酒臉紅即代表劇毒乙醛在體內大量蓄積。',
    biomolecules: ['Ethanol', 'Acetaldehyde (乙醛)', 'ADH (醇去氫酶)', 'ALDH2 (醛去氫酶)', 'Acetate (乙酸)'],
    biochemical_mechanisms_zh: [
      '乙醇進入肝臟經由乙醇去氫酶 (ADH) 氧化為劇毒性「乙醛 (Acetaldehyde)」，乙醛具強烈親電性，直接與 DNA 共價結合形成致癌加合物 (DNA Adducts)。',
      '正常人由 ALDH2 迅速將乙醛代謝為無害的乙酸 (Acetate)；ALDH2 缺乏基因突變者 (Glu504Lys) 酵素活性僅剩不到 10%，血中乙醛濃度飆升數十倍。',
      '酒精代謝消耗大量 NAD+ 轉為 NADH，使肝臟 NADH/NAD+ 比值劇增，全面阻斷檸檬酸循環與脂肪酸 β-氧化，迫使脂肪在肝臟堆積（酒精性脂肪肝）。',
      '酒精抑制抗利尿激素 (ADH) 造成強迫性脫水；並強烈阻斷後半夜 REM 快速動眼期睡眠，造成神經記憶鞏固中斷。'
    ],
    daily_intake_targets: {
      target_zh: '2023 WHO 最新官方聲明：「就癌症風險而言，沒有任何酒精攝取量是安全的 (No safe level of alcohol consumption)。」',
      note_zh: '若飲酒，每日純酒精攝取男性不宜超過 20g（約 2 個標準飲酒單位），女性不宜超過 10g。',
      upper_limit_zh: '孕婦、青少年、ALDH2 嚴重缺乏者、肝病心律不整患者攝取上限為「絕對 0 克」。'
    },
    rich_food_sources_zh: [
      '注意：酒精並非營養素，而是人體必須積極代謝解毒的親脂性外源物',
      '標準飲酒單位對照（1 Standard Drink = 10g 純酒精）：啤酒 5% 250mL、紅白酒 12% 100mL、威士忌 40% 30mL'
    ],
    deficiency_and_excess_zh: {
      deficiency: '完全不飲酒對人體生理機能有百利而無一害。',
      excess: '慢性過量飲酒引發酒精性肝硬化、擴張型心肌病變、消化道癌症（食道癌風險飆升 50 倍）、Wernicke 腦病變與失智。'
    },
    clinical_red_flags: [
      '一喝酒即迅速臉紅、心悸、頭痛（典型 ALDH2 基因缺陷，強烈警告應完全戒酒）',
      '清晨醒來需喝一杯酒才能止住手抖、焦慮或冷汗（嚴重酒精依賴與戒斷症候群警訊）',
      '大量酗酒後劇烈乾嘔繼之吐鮮血（馬洛里-韋斯症候群 Mallory-Weiss 食道黏膜撕裂出血）'
    ],
    common_myths_zh: [
      {
        myth: '「每天喝一杯紅酒能抗氧化軟化血管」？',
        reality: '《The Lancet》全球疾病負擔 (GBD) 大型研究徹底推翻「適度飲酒有益健康」的偽命題；紅酒中微量白藜蘆醇的抗氧化效益，遠遠不抵乙醛帶來的高血壓、心房顫動與致癌破壞。'
      },
      {
        myth: '「常常練喝酒，酒量就會變好」代表身體解毒變強？',
        reality: '所謂酒量變好只是大腦中樞神經對酒精耐受性提高，ALDH2 基因決定的肝臟代謝酵素活性終生無法改變，多喝只會讓更多乙醛在體內無聲破壞器官。'
      }
    ],
    best_practices_zh: [
      '嚴格遵循「不以健康之名主動開始飲酒」原則，有飲酒習慣者逐步減量。',
      '社交飲酒三部曲：「絕不空腹 + 每一口酒搭配一杯純水 + 睡前 4 小時完全停酒」。',
      '點擊進入 Salud 旗艦【Chapter A · 酒精專章】，使用 BAC 動態血醇模擬器與 AUDIT-C 臨床篩檢評估自身風險。'
    ],
    linked_chapter_or_tool: {
      type: 'chapter',
      id: 'A',
      label_zh: '前往 Chapter A · 酒精專章 (完整乙醛致癌機轉 + BAC 血液酒精模擬器 + AUDIT-C 篩檢)'
    },
    research_citations: [
      {
        authors: 'Wood AM, et al. (Emerging Risk Factors Collaboration)',
        year: 2018,
        title: 'Risk thresholds for alcohol consumption: combined analysis of individual-participant data for 599,912 current drinkers',
        journal: 'The Lancet',
        doi: '10.1016/S0140-6736(18)30134-X',
        key_takeaway_zh: '每週純酒精攝取超過 100g 即顯著拉高全因死亡率，確立酒精攝取安全門檻遠低於過往指引。'
      },
      {
        authors: 'Chang JS, et al.',
        year: 2017,
        title: 'ALDH2 deficiency and alcohol-related cancer risks in East Asian populations',
        journal: 'Lancet Oncology',
        doi: '10.1016/S1470-2045(17)30403-X',
        key_takeaway_zh: 'ALDH2 缺乏的東亞人群若每日飲酒，其罹患食道鱗狀細胞癌之風險較正常基因者高出數十倍。'
      }
    ]
  }
];
