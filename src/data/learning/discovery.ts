/** Reader-facing topic directory. Routes are checked against the real curriculum. */
export const DISCOVERY_CATEGORIES = [
  { id: 'all', label: '全部主題' },
  { id: 'daily', label: '吃・動・睡・心' },
  { id: 'prevention', label: '預防與健檢' },
  { id: 'care', label: '疾病與照護' },
  { id: 'body', label: '認識身體' },
] as const;

export type DiscoveryCategory = typeof DISCOVERY_CATEGORIES[number]['id'];
export interface DiscoveryTopic {
  id: string;
  category: Exclude<DiscoveryCategory, 'all'>;
  title: string;
  description: string;
  hash: string;
  icon: 'food' | 'move' | 'moon' | 'brain' | 'report' | 'heart' | 'shield' | 'body' | 'scale' | 'spine' | 'pill' | 'droplets' | 'hourglass';
  tone: 'emerald' | 'sky' | 'amber' | 'rose' | 'violet' | 'teal';
}

export const DISCOVERY_TOPICS: DiscoveryTopic[] = [
  { id: 'diet', category: 'daily', title: '吃得自在，也吃得健康', description: '餐盤、營養素與飲食模式，從每一餐開始。', hash: 'diet/patterns', icon: 'food', tone: 'emerald' },
  { id: 'exercise', category: 'daily', title: '找到喜歡的運動', description: '從快走到肌力訓練，理解強度與恢復。', hash: 'exercise', icon: 'move', tone: 'sky' },
  { id: 'sleep', category: 'daily', title: '睡好，讓身體休息', description: '生理時鐘、咖啡因、失眠與打呼的線索。', hash: 'sleep', icon: 'moon', tone: 'violet' },
  { id: 'checkup', category: 'prevention', title: '看懂健檢上的紅字', description: '先懂數字的意思，再知道該問什麼。', hash: 'checkup', icon: 'report', tone: 'rose' },
  { id: 'cardio', category: 'prevention', title: '一起認識血壓、血糖、血脂', description: '量測、生活調整與醫療追蹤，一步步理解。', hash: 'cardiometabolic/THREE_HIGHS', icon: 'heart', tone: 'rose' },
  { id: 'weight', category: 'prevention', title: '體重以外的健康', description: '肌肉、體脂、飲食與減重治療的利弊。', hash: 'obesity', icon: 'scale', tone: 'amber' },
  { id: 'mental', category: 'daily', title: '照顧壓力與心情', description: '認識情緒、練習呼吸，也知道何時求助。', hash: 'mental', icon: 'brain', tone: 'teal' },
  { id: 'systems', category: 'body', title: '身體是怎麼運作的？', description: '用圖解認識八大人體系統與器官合作。', hash: 'systems', icon: 'body', tone: 'sky' },
  { id: 'clinic', category: 'care', title: '不舒服，該看哪一科？', description: '從症狀了解就醫方向，準備看診問題。', hash: 'clinic/by/symptom', icon: 'shield', tone: 'teal' },
  { id: 'spine', category: 'care', title: '脊椎、關節與手腳麻', description: '讀懂疼痛與神經訊號，學習安全照護。', hash: 'spine', icon: 'spine', tone: 'amber' },
  { id: 'gastro', category: 'care', title: '胃腸與肝膽的日常', description: '逆流、腸躁、脂肪肝與常見檢查。', hash: 'gastro', icon: 'body', tone: 'emerald' },
  { id: 'oncology', category: 'care', title: '癌症預防、篩檢與治療', description: '分清篩檢與診斷，認識照護與治療選擇。', hash: 'oncology', icon: 'shield', tone: 'rose' },
  { id: 'ltc', category: 'care', title: '陪家人走過照護', description: '失能、長照資源與照顧者的實用指南。', hash: 'ltc', icon: 'heart', tone: 'teal' },
  { id: 'hepb', category: 'care', title: 'B 型肝炎追蹤與照護', description: '篩檢、傳染迷思與治療追蹤重點。', hash: 'hepb', icon: 'shield', tone: 'emerald' },
  { id: 'supplements', category: 'daily', title: '保健品值得吃嗎？', description: '一起看研究結果、限制與交互作用。', hash: 'supplements', icon: 'pill', tone: 'teal' },
  { id: 'water', category: 'daily', title: '喝水與電解質', description: '理解口渴、補水與需要個別調整的情況。', hash: 'W', icon: 'droplets', tone: 'sky' },
  { id: 'oil', category: 'daily', title: '選油與烹調', description: '認識脂肪酸，用對照圖理解換油。', hash: 'O', icon: 'food', tone: 'amber' },
  { id: 'alcohol', category: 'prevention', title: '酒精與健康風險', description: '酒精代謝、風險與減少飲酒的選擇。', hash: 'A', icon: 'shield', tone: 'rose' },
  { id: 'longevity', category: 'body', title: '健康老化的科學', description: '分清已知、未知與還在研究的可能性。', hash: 'longevity', icon: 'hourglass', tone: 'emerald' },
  { id: 'mindbody', category: 'daily', title: '正念、呼吸與身心練習', description: '在可行的小練習裡，找回生活節奏。', hash: 'mindbody', icon: 'brain', tone: 'violet' },
  { id: 'running', category: 'daily', title: '跑步與配速', description: '認識訓練節奏、恢復與常見傷害。', hash: 'exercise/running', icon: 'move', tone: 'sky' },
  { id: 'strength', category: 'daily', title: '肌力與重量訓練', description: '從動作、負荷到進步，打好訓練基礎。', hash: 'exercise/strength', icon: 'move', tone: 'violet' },
  { id: 'mobility', category: 'daily', title: '伸展與活動度', description: '認識熱身、活動範圍與身體的限制。', hash: 'exercise/mobility', icon: 'spine', tone: 'teal' },
  { id: 'living', category: 'daily', title: '把健康放進一天', description: '作息、微習慣與可以持續的生活選擇。', hash: 'ultrahealth', icon: 'heart', tone: 'emerald' },
];

export function filterDiscoveryTopics(category: DiscoveryCategory, expanded: boolean) {
  const topics = DISCOVERY_TOPICS.filter(t => category === 'all' || t.category === category);
  return { total: topics.length, topics: expanded ? topics : topics.slice(0, 6) };
}
