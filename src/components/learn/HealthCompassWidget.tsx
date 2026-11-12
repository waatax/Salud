import React, { useState } from 'react';
import {
  Compass,
  BatteryCharging,
  Moon,
  Activity,
  Dumbbell,
  Salad,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useActionPlan } from '../../hooks/useActionPlan';

export interface CompassTopic {
  id: string;
  badge_zh: string;
  title_zh: string;
  icon: React.ElementType;
  color_tone: string;
  bg_gradient: string;
  border_color: string;
  pain_point_zh: string;
  core_insight_zh: string;
  today_action: {
    id: string;
    title_zh: string;
    how_zh: string;
    minutes: number;
  };
  medical_mechanism_zh: string;
  evidence_tag_zh: string;
  recommended_links: {
    label_zh: string;
    hash: string;
    is_tool?: boolean;
  }[];
}

const COMPASS_TOPICS: CompassTopic[] = [
  {
    id: 'fatigue',
    badge_zh: '能量與活力',
    title_zh: '常年疲倦與午後昏沉',
    icon: BatteryCharging,
    color_tone: 'text-amber-600 dark:text-amber-400',
    bg_gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
    border_color: 'border-amber-200 dark:border-amber-900/60',
    pain_point_zh: '每天睡醒還是累、吃完午餐開會眼皮沉重、下午四點狂灌咖啡卻只換來心悸？',
    core_insight_zh:
      '慢性疲勞多半不是意志力問題，而是「晝夜節律脫鉤」加「餐後血糖雲霄飛車」的生化反應。只要在早上固定給大腦校時、午餐改順序，體能就能快速回穩。',
    today_action: {
      id: 'TIP-COMPASS-FATIGUE',
      title_zh: '晨起 30 分鐘內走到戶外接觸自然光 10 分鐘，午餐先吃菜肉後吃飯',
      how_zh: '拉開窗簾走到陽台或戶外走動 10 分鐘（不戴太陽眼鏡），中午便當先夾半盤蔬菜與掌心蛋白質，白飯留到最後吃。',
      minutes: 10,
    },
    medical_mechanism_zh:
      '晨間 10,000+ Lux 自然光穿透視網膜，重設下視丘視交叉核（SCN）並抑制褪黑激素；「菜➔肉➔飯」進食順序則延緩胃排空並平伏葡萄糖吸收，消滅反應性低血糖引起的腦霧。',
    evidence_tag_zh: '哈佛醫學院 & 晝夜神經生物學指引',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：睡眠與精力管理', hash: 'learn/rest/L-REST-01' },
      { label_zh: '體檢：咖啡因代謝曲線試算', hash: 'sleep/CAFFEINE_SIM', is_tool: true },
    ],
  },
  {
    id: 'sleep',
    badge_zh: '深睡修復',
    title_zh: '夜晚難入睡、半夜早醒',
    icon: Moon,
    color_tone: 'text-violet-600 dark:text-violet-400',
    bg_gradient: 'from-violet-500/10 via-violet-500/5 to-transparent',
    border_color: 'border-violet-200 dark:border-violet-900/60',
    pain_point_zh: '躺在床上翻來覆去 40 分鐘睡不著、越看時鐘越焦慮，或是半夜 3 點醒來腦袋開始狂轉？',
    core_insight_zh:
      '「床鋪只用來睡覺」，千萬別在床上滑手機焦慮數羊！運用國際第一線 CBT-I（失眠認知行為治療）刺激控制法，打破大腦對床鋪的壓力反射。',
    today_action: {
      id: 'TIP-COMPASS-SLEEP',
      title_zh: '上床後做 6 輪「生理性嘆氣」，躺超過 20 分鐘醒著立刻離床',
      how_zh: '鼻子深吸滿、快速補吸一小口，噘嘴超慢長吐氣到底；若輾轉難眠超過 20 分鐘，移至微光客廳看紙本書，有睡意才回床。',
      minutes: 5,
    },
    medical_mechanism_zh:
      '生理性嘆氣（雙吸一長吐）藉由擴大肺泡表面積，直接活化迷走神經使心率下降；離床避免大腦將「床」與「清醒焦慮」形成制約神經迴路。',
    evidence_tag_zh: '美國睡眠醫學會（AASM）第一線指引',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：不靠安眠藥的失眠自救', hash: 'learn/rest/L-REST-02' },
      { label_zh: '工具：7天睡眠效率與作息計算', hash: 'sleep', is_tool: true },
    ],
  },
  {
    id: 'cardiometabolic',
    badge_zh: '三高預防',
    title_zh: '健檢看到紅字與心血代謝',
    icon: Activity,
    color_tone: 'text-rose-600 dark:text-rose-400',
    bg_gradient: 'from-rose-500/10 via-rose-500/5 to-transparent',
    border_color: 'border-rose-200 dark:border-rose-900/60',
    pain_point_zh: '收到報告血壓 138/88、三酸甘油酯或血糖微超標，被紅字嚇到不知所措？',
    core_insight_zh:
      '單次診間紅字常受緊張干擾（白袍效應）。看清代謝指標的「連續 3 年趨勢」與「整體心血管風險分級」，比單看單一數值更有用，從飯後走動開始最快見效。',
    today_action: {
      id: 'TIP-COMPASS-CARDIO',
      title_zh: '落實居家「722 血壓量測」並在午晚餐後快走 10 分鐘',
      how_zh: '早晚各量 2 遍間隔 1 分鐘，連續記錄 7 天；每餐吃完不癱坐，出門或走廊走動 10 分鐘。',
      minutes: 10,
    },
    medical_mechanism_zh:
      '居家 722 消除交感白袍偏差；餐後肌肉收縮透過非胰島素依賴型 GLUT4 轉位直接把血糖拉進肌細胞，可壓平 25–30% 餐後血糖峰值並降低三酸甘油酯。',
    evidence_tag_zh: '台灣高血壓學會 & AHA/ACC 實證指引',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：搞懂代謝症候群五指標', hash: 'learn/prevent/L-PRE-01' },
      { label_zh: '工具：三高風險與代謝年齡評估', hash: 'cardiometabolic', is_tool: true },
    ],
  },
  {
    id: 'strength',
    badge_zh: '肌力抗老',
    title_zh: '想增肌防老、又怕傷膝腰背',
    icon: Dumbbell,
    color_tone: 'text-emerald-600 dark:text-emerald-400',
    bg_gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
    border_color: 'border-emerald-200 dark:border-emerald-900/60',
    pain_point_zh: '知道要練肌肉防骨鬆，但怕重量太重腰扭到、膝蓋磨損，只敢去公園甩手散步？',
    core_insight_zh:
      '「保護關節最強的天然護具，就是肌肉本身！」遵循先求最大肌力、再求肌耐力原則，用自體體重椅子坐站入門，每組保留 2–3 下餘力，安全不力竭。',
    today_action: {
      id: 'TIP-COMPASS-STR',
      title_zh: '客廳練習「椅子坐站」10 下 × 2 輪，下放維持 3 秒慢速離心',
      how_zh: '雙手抱胸挺胸，雙腳踩穩站起，坐下時屁股往後推、花 3 秒慢慢沾椅面。動作品質優先，不閉氣。',
      minutes: 6,
    },
    medical_mechanism_zh:
      '慢速離心收縮（Eccentric load）刺激肌腱纖維母細胞合成第 I 型膠原蛋白並提升剛性；依漢尼曼大小原則，阻力負荷才能徵召隨年齡流失最快的 II 型快肌。',
    evidence_tag_zh: 'ACSM 2026 運動處方 & 怪獸訓練科學',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：最大肌力與日常肌耐力', hash: 'learn/move/L-MOVE-08' },
      { label_zh: '專題：肌耐力天梯與 1RM 試算', hash: 'exercise/strength', is_tool: true },
    ],
  },
  {
    id: 'nutrition',
    badge_zh: '腸道與體態',
    title_zh: '外食脹氣腹脹與體重卡關',
    icon: Salad,
    color_tone: 'text-teal-600 dark:text-teal-400',
    bg_gradient: 'from-teal-500/10 via-teal-500/5 to-transparent',
    border_color: 'border-teal-200 dark:border-teal-900/60',
    pain_point_zh: '外食吃完肚子常鼓鼓脹脹、換過好幾種減肥法總是餓到破功、體重上下擺盪？',
    core_insight_zh:
      '不必挨餓或算卡路里！善用「我的餐盤 2:1:1」高體積低密度原則，並把手搖飲換成無糖茶，給腸道菌多樣多酚，體重與腸道自然輕盈。',
    today_action: {
      id: 'TIP-COMPASS-NUTRI',
      title_zh: '下一餐便當落實「半盤蔬菜＋一掌心蛋白質」，戒掉含糖飲料',
      how_zh: '打開便當先吃蔬菜與肉蛋豆腐，白飯留三分之一。下午若口渴以無糖麥茶或大麥水取代手搖飲。',
      minutes: 5,
    },
    medical_mechanism_zh:
      '原型膳食纖維在大腸被短鏈脂肪酸（SCFA）發酵菌利用，增強腸道屏障與抗發炎；排除液態果糖能切斷肝臟從頭脂肪生成（DNL）與內臟三酸甘油酯累積。',
    evidence_tag_zh: 'The Lancet 2025 肥胖醫學委員會共識',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：一餐怎麼配不發胖', hash: 'learn/eat/L-EAT-01' },
      { label_zh: '工具：飲食油脂置換與體重趨勢模擬', hash: 'diet/patterns', is_tool: true },
    ],
  },
  {
    id: 'spine',
    badge_zh: '骨骼脊椎',
    title_zh: '久坐腰痠背痛與肩頸僵硬',
    icon: Compass,
    color_tone: 'text-sky-600 dark:text-sky-400',
    bg_gradient: 'from-sky-500/10 via-sky-500/5 to-transparent',
    border_color: 'border-sky-200 dark:border-sky-900/60',
    pain_point_zh: '在辦公桌前坐滿一天，下午站起來腰直不起來、脖子緊繃甚至延伸到手指頭麻？',
    core_insight_zh:
      '沒有任何一個坐姿能坐整天不痛！久坐使髖屈肌縮短攣縮、臀大肌「失憶無力」，腰椎被迫過度代償。每小時打斷久坐 1 分鐘是最好的解方。',
    today_action: {
      id: 'TIP-COMPASS-SPINE',
      title_zh: '每坐 45 分鐘起身做 30 秒「站姿後仰＋夾臀伸展」',
      how_zh: '站起來雙手叉腰放在薦椎兩側，骨盆往前推、夾緊臀部、胸口朝天花板後仰 5 秒，重複 5 次。',
      minutes: 1,
    },
    medical_mechanism_zh:
      '後仰與夾臀能伸展緊繃的髂腰肌，同時讓腰椎椎間盤的髓核往前微幅移位（集中化現象 Centralization），減輕後側纖維環與神經根的機械壓迫。',
    evidence_tag_zh: 'WalkBack 脊椎復健試驗 & 物理治療指引',
    recommended_links: [
      { label_zh: '讀 6 分鐘小課：久坐族的脊椎自救', hash: 'learn/spine/L-SPN-01' },
      { label_zh: '專區：脊椎神經與手腳麻分類檢核', hash: 'spine', is_tool: true },
    ],
  },
];

export const HealthCompassWidget: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(COMPASS_TOPICS[0].id);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const { add, inPlan } = useActionPlan();

  const currentTopic = COMPASS_TOPICS.find((t) => t.id === selectedId) || COMPASS_TOPICS[0];
  const isDoneToday = completedActions.includes(currentTopic.today_action.id);
  const isInBackpack = inPlan(currentTopic.today_action.id);

  const handleMarkAction = () => {
    const actionId = currentTopic.today_action.id;
    if (!completedActions.includes(actionId)) {
      setCompletedActions((prev) => [...prev, actionId]);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10B981', '#06B6D4', '#F59E0B', '#6366F1'],
        });
      } catch {
        // Safe in environments without canvas
      }
    }
  };

  const handleAddToPlan = () => {
    add(currentTopic.today_action.id);
  };

  return (
    <section
      aria-labelledby="compass-widget-heading"
      className="rounded-3xl border border-emerald-200/80 bg-white dark:bg-slate-900/90 shadow-sm dark:border-emerald-900/50 overflow-hidden transition-all"
    >
      {/* Widget Header */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-sky-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-sky-950/30 px-6 py-5 sm:px-8 sm:py-6 border-b border-emerald-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Compass className="w-4 h-4 animate-spin-slow" aria-hidden="true" />
            </span>
            <span className="text-xs font-bold tracking-widest text-emerald-800 dark:text-emerald-300 uppercase">
              30-SECOND HEALTH COMPASS
            </span>
          </div>
          <h2
            id="compass-widget-heading"
            className="text-lg sm:text-2xl font-display font-bold text-slate-900 dark:text-white"
          >
            身心探索羅盤：選一個你現在在意的困擾
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
            從小白到醫學知識者：先讀懂 30 秒核心原理，再做一件做得到的小事。
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xs px-3 py-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60 text-xs font-medium text-slate-600 dark:text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          <span>權威指引與臨床生理學雙重認證</span>
        </div>
      </div>

      {/* Persona Tabs Picker */}
      <div className="px-4 sm:px-8 pt-5 pb-2 overflow-x-auto no-scrollbar">
        <div
          className="flex items-center gap-2 sm:gap-2.5 min-w-max pb-2"
          role="tablist"
          aria-label="身心主題探索標籤"
        >
          {COMPASS_TOPICS.map((topic) => {
            const isSelected = topic.id === selectedId;
            const Icon = topic.icon;
            return (
              <button
                key={topic.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`compass-panel-${topic.id}`}
                onClick={() => setSelectedId(topic.id)}
                className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all select-none border ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-emerald-400 dark:text-slate-950 border-slate-900 dark:border-emerald-400 shadow-md shadow-emerald-900/10'
                    : 'bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-emerald-400 dark:text-slate-950' : topic.color_tone
                  }`}
                  aria-hidden="true"
                />
                <span>{topic.title_zh}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Topic Dynamic Stage */}
      <div
        id={`compass-panel-${currentTopic.id}`}
        role="tabpanel"
        className="p-5 sm:p-8 animate-fade-in"
      >
        <div
          className={`rounded-2xl border p-5 sm:p-7 bg-gradient-to-br ${currentTopic.bg_gradient} ${currentTopic.border_color} space-y-6`}
        >
          {/* Top Title & Dilemma */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-slate-200/60 dark:border-slate-800 pb-5">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                {currentTopic.badge_zh}・真實困擾剖析
              </span>
              <p className="text-base sm:text-lg font-medium text-slate-800 dark:text-slate-100 leading-relaxed italic">
                「{currentTopic.pain_point_zh}」
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-200/40 dark:border-slate-800 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {currentTopic.evidence_tag_zh}
            </span>
          </div>

          {/* Grid: 30s Core Insight + 1-Minute Micro Action */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Core Insight Card */}
            <div className="rounded-xl bg-white/90 dark:bg-slate-800/80 p-5 border border-slate-200/70 dark:border-slate-700/80 shadow-2xs flex flex-col justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
                  30 秒白話觀念（打破迷思）
                </h3>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                  {currentTopic.core_insight_zh}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" aria-hidden="true" />
                <span>背後生理機轉：{currentTopic.medical_mechanism_zh}</span>
              </div>
            </div>

            {/* Micro-Action Card */}
            <div className="rounded-xl bg-white/90 dark:bg-slate-800/80 p-5 border border-slate-200/70 dark:border-slate-700/80 shadow-2xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                    今天就能跨出的 1 個小行動
                  </h3>
                  <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                    {currentTopic.today_action.minutes} 分鐘
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
                  {currentTopic.today_action.title_zh}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentTopic.today_action.how_zh}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleMarkAction}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    isDoneToday
                      ? 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isDoneToday ? '今日已完成！太棒了' : '打勾記下：今天做這件事'}</span>
                </button>

                {!isInBackpack && (
                  <button
                    type="button"
                    onClick={handleAddToPlan}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-emerald-700 dark:text-slate-400 dark:hover:text-emerald-300"
                  >
                    <span>存入健康背包</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Recommended Fast Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              想深入探索？精選直達小課與互動工具：
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {currentTopic.recommended_links.map((link) => (
                <a
                  key={link.hash}
                  href={`#${link.hash}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors shadow-2xs"
                >
                  {link.is_tool ? (
                    <Compass className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  )}
                  <span>{link.label_zh}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
