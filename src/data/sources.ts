export interface SourceItem {
  id: string;
  title: string;
  publisher: string;
  year: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'E';
  url: string;
  description: string;
}

export const SOURCES_CATALOG: Record<string, SourceItem> = {
  'SRC-IOM-2005': {
    id: 'SRC-IOM-2005',
    title: 'Dietary Reference Intakes for Water, Potassium, Sodium, Chloride, and Sulfate',
    publisher: 'National Academies of Sciences, Engineering, and Medicine (IOM)',
    year: 2005,
    grade: 'A',
    url: 'https://nap.nationalacademies.org/catalog/10925/',
    description: '定義健康成年人總水分適當攝取量（Adequate Intake, AI）：男性 3.7 L/日、女性 2.7 L/日（含食物與所有飲品）。',
  },
  'SRC-EFSA-2010': {
    id: 'SRC-EFSA-2010',
    title: 'Scientific Opinion on Dietary Reference Values for Water',
    publisher: 'European Food Safety Authority (EFSA)',
    year: 2010,
    grade: 'A',
    url: 'https://www.efsa.europa.eu/en/efsajournal/pub/1459',
    description: '歐洲食品安全局建議溫和氣候中度活動下，男性每日總水 2.5 L、女性 2.0 L。',
  },
  'SRC-ACSM-2007': {
    id: 'SRC-ACSM-2007',
    title: 'Exercise and Fluid Replacement: American College of Sports Medicine Position Stand',
    publisher: 'American College of Sports Medicine (ACSM)',
    year: 2007,
    grade: 'A',
    url: 'https://journals.lww.com/acsm-msse/Fulltext/2007/02000/Exercise_and_Fluid_Replacement.22.aspx',
    description: '運動員水合指引，指出失水超過 2% 體重將削弱有氧表現，並規範低血鈉預防策略。',
  },
  'SRC-EAH-CONSENSUS': {
    id: 'SRC-EAH-CONSENSUS',
    title: 'Statement of the 3rd International Exercise-Associated Hyponatremia Consensus Development Conference',
    publisher: 'British Journal of Sports Medicine',
    year: 2015,
    grade: 'A',
    url: 'https://bjsm.bmj.com/content/49/22/1432',
    description: '運動相關低血鈉（EAH）最高層級國際共識：倡導依口渴感飲水（Drink to thirst），嚴禁超量強灌低張液體。',
  },
  'SRC-WHO-SFA-2023': {
    id: 'SRC-WHO-SFA-2023',
    title: 'Saturated Fatty Acid and Trans-Fatty Acid Intake for Adults and Children: WHO Guideline',
    publisher: 'World Health Organization (WHO)',
    year: 2023,
    grade: 'A',
    url: 'https://www.who.int/publications/i/item/9789240073630',
    description: 'WHO 2023 權威指引：飽和脂肪酸攝取應低於總熱量 10%E，反式脂肪 <1%E，並明確指出應以多元不飽和脂肪（PUFA）等熱量取代。',
  },
  'SRC-TFDA-PHO-2018': {
    id: 'SRC-TFDA-PHO-2018',
    title: '食品中不得使用不完全氫化油（部分氫化植物油）公告',
    publisher: '台灣衛生福利部食品藥物管理署 (TFDA)',
    year: 2018,
    grade: 'A',
    url: 'https://www.fda.gov.tw/',
    description: '自 2018 年 7 月 1 日起全面禁用部分氫化油，切斷加工食品人工反式脂肪的主要來源。',
  },
  'SRC-USDA-FDC-2026': {
    id: 'SRC-USDA-FDC-2026',
    title: 'FoodData Central: Foundation Foods Lipid Profile Release',
    publisher: 'U.S. Department of Agriculture (USDA)',
    year: 2026,
    grade: 'A',
    url: 'https://fdc.nal.usda.gov/',
    description: '權威食用油與堅果脂肪酸色譜分析基準資料庫。',
  },
  'SRC-TWFDA-FOODDB': {
    id: 'SRC-TWFDA-FOODDB',
    title: '台灣食品成分資料庫 (最新修訂版)',
    publisher: '衛生福利部食品藥物管理署',
    year: 2025,
    grade: 'A',
    url: 'https://consumer.fda.gov.tw/Food/TFND.aspx',
    description: '提供苦茶油、黑麻油、滷肉飯、鹽酥雞等在地食材之熱量與脂肪酸光譜。',
  }
};
