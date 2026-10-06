import React, { useState } from 'react';
import {
  X,
  Search,
  Droplets,
  Flame,
  Wine,
  Activity,
  Footprints,
  Dumbbell,
  Maximize2,
  Bike,
  Mountain,
  Wind,
  Moon,
  Scale,
  Hourglass,
  Pill,
  Sparkles,
  Gauge,
  AlertOctagon,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';

interface SimulatorItem {
  id: string;
  category: 'diet' | 'exercise' | 'sleep_mind' | 'cardio_metabolism';
  title_zh: string;
  desc_zh: string;
  hash: string;
  icon: any;
  tone: string;
  badges: string[];
  isModalTrigger?: 'emergency' | 'auditC';
}

const ALL_SIMULATORS: SimulatorItem[] = [
  {
    id: 'sim-hydration',
    category: 'diet',
    title_zh: '日常補水與水合需求計算機',
    desc_zh: '輸入體重與當日運動流汗量，試算全日水分與電解質補充基準，預防運動低血鈉。',
    hash: 'W',
    icon: Droplets,
    tone: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
    badges: ['Chapter W', '滲透壓生理', '個人化公式'],
  },
  {
    id: 'sim-oil-swap',
    category: 'diet',
    title_zh: '食用油等熱量置換與發煙點',
    desc_zh: '對比 16 種食用油飽和/單元/多元不飽和脂肪酸比例，提供高低溫發煙點安全烹飪建議。',
    hash: 'O',
    icon: Flame,
    tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    badges: ['Chapter O', '脂肪酸置換', '發煙點指引'],
  },
  {
    id: 'sim-bac',
    category: 'diet',
    title_zh: '血液酒精濃度 (BAC) 與退酒時間估算',
    desc_zh: '依酒種、飲酒量與體重，動態推估體內乙醇清除速度、安全退酒時間與神經抑制狀態。',
    hash: 'A',
    icon: Wine,
    tone: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800',
    badges: ['Chapter A', '代謝速率', '退酒生理學'],
  },
  {
    id: 'sim-aldh2',
    category: 'diet',
    title_zh: '亞洲臉紅 ALDH2 基因型乙醛毒性模擬',
    desc_zh: '模擬 rs671 變異對乙醛去氫酶活性的折損，視覺化呈現一級致癌物乙醛在體內的堆積曲線。',
    hash: 'A',
    icon: Wine,
    tone: 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',
    badges: ['Chapter A', '基因突變', '致癌毒性阻斷'],
  },
  {
    id: 'sim-supplements',
    category: 'diet',
    title_zh: '營養保健品 GRADE 實證評級',
    desc_zh: '魚油、維生素 D、肌酸、益生菌等常見成分之臨床 GRADE 分級與安全性交互作用速查。',
    hash: 'supplements',
    icon: Pill,
    tone: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    badges: ['GRADE 評級', '人體試驗', '避開無效補充'],
  },
  {
    id: 'sim-zones',
    category: 'exercise',
    title_zh: 'Zone 1–5 心率區間與運動強度推算',
    desc_zh: '以靜止心率與最大心率計算儲備心率 (Karvonen)，精準鎖定 Zone 2 粒線體有氧燃脂區間。',
    hash: 'exercise',
    icon: Activity,
    tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    badges: ['運動生理', 'Zone 2 心率', '粒線體生合成'],
  },
  {
    id: 'sim-running',
    category: 'exercise',
    title_zh: '慢跑配速、步頻與乳酸閾值試算',
    desc_zh: '換算公里配速、最佳 180 步頻節奏，依乳酸閾值推算 5K/10K/半馬的合理目標速度。',
    hash: 'exercise/running',
    icon: Footprints,
    tone: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
    badges: ['配速轉換', '防傷步頻', '乳酸閾值'],
  },
  {
    id: 'sim-1rm',
    category: 'exercise',
    title_zh: '重訓 1RM 最大肌力與訓練重量矩陣',
    desc_zh: '輸入多次反覆次數與重量，依 Brzycki/Epley 公式推估單次極限 (1RM) 及肌肥大 75% 負荷。',
    hash: 'exercise/strength',
    icon: Dumbbell,
    tone: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800',
    badges: ['1RM 公式', '漸進性超負荷', '肌肥大科學'],
  },
  {
    id: 'sim-mobility',
    category: 'exercise',
    title_zh: '全身關節活動度與動力鏈篩檢',
    desc_zh: '踝關節、髖關節、胸椎與肩關節 4 大關鍵節點活動度自測，找出代償性痠痛根源。',
    hash: 'exercise/mobility',
    icon: Maximize2,
    tone: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    badges: ['活動度篩檢', '動力鏈檢測', '筋膜調節'],
  },
  {
    id: 'sim-cycling',
    category: 'exercise',
    title_zh: '自行車功率體重比 (W/kg) 與 FTP 評估',
    desc_zh: '依體重與功能性閾值功率 (FTP) 換算功率區間，規劃耐力巡航與爬坡踩踏節奏。',
    hash: 'exercise/cycling',
    icon: Bike,
    tone: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800',
    badges: ['W/kg 換算', '功率區間', '心肺效率'],
  },
  {
    id: 'sim-mountaineering',
    category: 'exercise',
    title_zh: '登山高海拔血氧與急性高山症評估',
    desc_zh: '模擬海拔上升對大氣氧分壓的衝擊，評估適應階梯與急性高山症 (AMS) 早期徵兆。',
    hash: 'exercise/mountaineering',
    icon: Mountain,
    tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    badges: ['高海拔氧分壓', 'AMS 篩檢', '爬升速率'],
  },
  {
    id: 'sim-caffeine',
    category: 'sleep_mind',
    title_zh: '咖啡因體內半衰期與入睡倒數試算',
    desc_zh: '輸入飲用咖啡或茶之時間與毫克數，視覺化推估就寢時腦內腺苷受體殘存阻斷率。',
    hash: 'sleep',
    icon: Moon,
    tone: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800',
    badges: ['半衰期曲線', '深睡保護', '腺苷壓力'],
  },
  {
    id: 'sim-breathwork',
    category: 'sleep_mind',
    title_zh: '史丹佛生理嘆氣與 0.1Hz 迷走神經呼吸器',
    desc_zh: '互動式視覺化導引雙吸一吐 (Physiological Sigh)，即時啟動副交感神經，降低心率與焦慮。',
    hash: 'mental',
    icon: Wind,
    tone: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800',
    badges: ['生理嘆氣導引', 'HRV 共振', '即刻放鬆'],
  },
  {
    id: 'sim-weight',
    category: 'cardio_metabolism',
    title_zh: '動態能量赤字與真實體重旅程模擬',
    desc_zh: '跳脫傳統 7700 大卡線性誤區，考量適應性生熱 (Adaptive Thermogenesis) 與肌肉保留。',
    hash: 'obesity',
    icon: Scale,
    tone: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    badges: ['適應性生熱', '肌肉保留', '非線性體重'],
  },
  {
    id: 'sim-longevity',
    category: 'cardio_metabolism',
    title_zh: '健康壽命軌跡與細胞抗老模擬器',
    desc_zh: '以 12 大衰老標誌為核心，模擬生活型態介入對發病壓縮 (Compression of Morbidity) 的效益。',
    hash: 'longevity',
    icon: Hourglass,
    tone: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    badges: ['12 衰老標誌', '健康餘命', '激效反應'],
  },
  {
    id: 'sim-bp-722',
    category: 'cardio_metabolism',
    title_zh: '居家 722 連續血壓標準協定',
    desc_zh: '連續 7 天、早晚 2 遍、每次 2 回平均值，排除白袍高血壓，評估心腎保護血管健康。',
    hash: 'cardiometabolic/BP_722',
    icon: Gauge,
    tone: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800',
    badges: ['TSOC 台灣指引', '連續 7 天', '血壓判讀'],
  },
  {
    id: 'sim-audit-c',
    category: 'cardio_metabolism',
    title_zh: 'AUDIT-C 飲酒行為風險快篩',
    desc_zh: 'WHO 推薦 3 題標準快篩量表，快速掌握飲酒頻率與成癮風險等級。',
    hash: 'A',
    icon: Wine,
    tone: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800',
    badges: ['WHO 標準量表', '3 題自評', '風險分級'],
    isModalTrigger: 'auditC',
  },
  {
    id: 'sim-emergency',
    category: 'cardio_metabolism',
    title_zh: '危險警訊急診分流自檢 (Red Flags)',
    desc_zh: '胸痛、急性神經學缺損、突發劇烈頭痛等何時應立即撥打 119 就醫指南。',
    hash: 'home',
    icon: AlertOctagon,
    tone: 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800',
    badges: ['生命警訊', '119 急診分流', '安全性第一'],
    isModalTrigger: 'emergency',
  },
];

type CategoryFilter = 'all' | 'diet' | 'exercise' | 'sleep_mind' | 'cardio_metabolism';

export const SimulatorsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { go } = useNavigation();
  const { openModal } = useModal();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filtered = ALL_SIMULATORS.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchQuery =
      !searchQuery.trim() ||
      item.title_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc_zh.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.badges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchQuery;
  });

  const handleSelect = (item: SimulatorItem) => {
    onClose();
    if (item.isModalTrigger) {
      openModal(item.isModalTrigger);
    } else {
      go(item.hash);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="sim-modal-title">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white dark:bg-salud-dark-surface border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-900/40">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
              <Calculator className="w-5 h-5" />
            </span>
            <div>
              <h2 id="sim-modal-title" className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                互動健康試算工具箱
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                18+ 款醫學試算與生理模擬器，幫助你精確掌握自己的身體數據
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 sm:px-6 border-b border-slate-100 dark:border-slate-800 space-y-3 bg-white dark:bg-salud-dark-surface">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜尋模擬器（例如：補水、Zone 2、咖啡因、1RM、退酒、發煙點）..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
            {[
              { id: 'all', label: '全部工具' },
              { id: 'diet', label: '🥗 水分與飲食' },
              { id: 'exercise', label: '🏃 運動體能' },
              { id: 'sleep_mind', label: '🌙 睡眠身心' },
              { id: 'cardio_metabolism', label: '🫀 心血代謝延壽' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as CategoryFilter)}
                className={`btn-tactile px-3 py-1.5 rounded-xl border whitespace-nowrap transition-all ${
                  activeCategory === tab.id
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-emerald-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid list of simulators */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="group flex flex-col justify-between p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-md transition-all text-left space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`w-9 h-9 rounded-xl flex items-center justify-center border ${item.tone} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <div className="flex items-center gap-1 flex-wrap justify-end">
                        {item.badges.slice(0, 2).map((b) => (
                          <span key={b} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {item.title_zh}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                      {item.desc_zh}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span>立即試算</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
              沒有找到符合條件的工具，請嘗試更換關鍵字或類別。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
