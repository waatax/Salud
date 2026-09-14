import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Flame,
  Award,
  Trophy,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight,
  HelpCircle,
  Droplets,
  RotateCcw,
  Sliders,
  ShieldAlert,
  ChevronRight
} from 'lucide-react';

interface Props {
  completedPages: string[];
  onSelectPage: (pageId: string) => void;
}

// 快問快答題庫
const RAPID_QUIZZES = [
  {
    id: 'Q1',
    question: '「感到口渴才找水喝」在生理學上有什麼致命破綻？',
    options: [
      { text: '大腦滲透壓受器需濃度上升 2–3% 才敲警鐘，此時身體早已實質失水且 ADH 已把腎臟水閘關緊', isCorrect: true },
      { text: '口渴代表體內水分過多，即將造成低血鈉水中毒', isCorrect: false },
      { text: '完全沒有破綻，口渴是 100% 即時無延遲的完美水合警報器', isCorrect: false }
    ],
    explanation: '血漿滲透壓上升僅 1% 時下視丘就會刺激 ADH 減少排尿，口渴中樞需要 2–3% 變化才觸發。感到口渴代表身體早已進入保護性代償！',
    targetPage: 'PAGE-W-03',
    rewardXP: 50
  },
  {
    id: 'Q2',
    question: '馬拉松或高強度運動時只狂灌「大量純水」，最危險的致命急症是什麼？',
    options: [
      { text: '運動型低血鈉 (EAH)：血鈉被過度稀釋，水分逆流湧入腦細胞造成急性腦水腫', isCorrect: true },
      { text: '急性腎結石瞬間結晶沉澱', isCorrect: false },
      { text: '胃酸過度稀釋導致永久性消化衰竭', isCorrect: false }
    ],
    explanation: '只補純水不補鈉，血鈉濃度急遽下降（<135 mmol/L），水分子會因滲透壓差湧向腦細胞導致致命腦水腫，切忌強迫過量飲水！',
    targetPage: 'PAGE-W-08',
    rewardXP: 50
  },
  {
    id: 'Q3',
    question: '腸道如果想以「坐高鐵」的最高速吸收水分，需要哪對魔法搭檔？',
    options: [
      { text: '鈉離子 + 葡萄糖（透過 SGLT1 載體雙人搭檔，順便大量拖帶水分子入血）', isCorrect: true },
      { text: '高濃度冰塊 + 氣泡純水', isCorrect: false },
      { text: '大量純咖啡因 + 檸檬酸', isCorrect: false }
    ],
    explanation: '小腸 SGLT1 轉運蛋白必須「1 鈉 + 1 葡萄糖」同時結合才會啟動，帶動數百個水分子快速穿透腸黏膜，這正是 WHO 口服補液鹽 (ORS) 的核心原理！',
    targetPage: 'PAGE-W-09',
    rewardXP: 50
  },
  {
    id: 'Q4',
    question: '流傳已久的「每人每天必須喝滿 8 大杯純水」在現代營養學的真相是？',
    options: [
      { text: '三餐米飯、蔬菜水果自帶豐富水分（占每日 20–30%），補水應依體重與活動量動態換算', isCorrect: true },
      { text: '所有成年人無論體重 45kg 還是 95kg，每日水分需求都完全固定是 8 杯', isCorrect: false },
      { text: '8 杯純水必須一口氣在清晨喝完才有效', isCorrect: false }
    ],
    explanation: '飯菜水果與湯品已提供近 1 公升水分；健康人基礎公式約為「體重(kg) × 30~35 mL」，切勿盲目迷信 8 杯純水教條！',
    targetPage: 'PAGE-W-05',
    rewardXP: 50
  }
];

// 六大醫學成就勳章
const MEDALS = [
  {
    id: 'MEDAL-01',
    title: '八杯水終結者',
    desc: '精讀 W05，破除盲目 8 杯水都市傳說',
    icon: '💧',
    requiredPage: 'PAGE-W-05',
    color: 'from-amber-400 to-amber-600'
  },
  {
    id: 'MEDAL-02',
    title: '大腦水腫守門員',
    desc: '精讀 W08，掌握低血鈉 (EAH) 防護生化機轉',
    icon: '🛡️',
    requiredPage: 'PAGE-W-08',
    color: 'from-rose-500 to-red-600'
  },
  {
    id: 'MEDAL-03',
    title: '尿色三段式偵探',
    desc: '精讀 W06，掌握 WUT 脫水自我評估黃金法則',
    icon: '🔍',
    requiredPage: 'PAGE-W-06',
    color: 'from-emerald-400 to-emerald-600'
  },
  {
    id: 'MEDAL-04',
    title: '電解質調校宗師',
    desc: '精讀 W09，解鎖 SGLT1 鈉糖共轉運救命配比',
    icon: '⚡',
    requiredPage: 'PAGE-W-09',
    color: 'from-sky-400 to-blue-600'
  },
  {
    id: 'MEDAL-05',
    title: '心腎安全守護者',
    desc: '精讀 W11，嚴格遵循心衰竭與透析限水安全閘',
    icon: '🚨',
    requiredPage: 'PAGE-W-11',
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'MEDAL-06',
    title: '體液平衡大滿貫',
    desc: '完成全章 12 篇臨床文庫全部精讀',
    icon: '🏆',
    requiredCount: 12,
    color: 'from-yellow-400 to-amber-500'
  }
];

export const GamifiedLearningHub: React.FC<Props> = ({ completedPages, onSelectPage }) => {
  // 累積經驗值 (XP) 狀態
  const [userXP, setUserXP] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('salud_user_xp');
      return saved ? parseInt(saved, 10) : 120 + completedPages.length * 30;
    } catch {
      return 120;
    }
  });

  // 連續學習天數
  const [streakDays, setStreakDays] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('salud_streak_days');
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  // 快問快答狀態
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean>(false);
  const [quizStreak, setQuizStreak] = useState<number>(0);

  // 動態水合計算機狀態
  const [weightKg, setWeightKg] = useState<number>(65);
  const [intakeMl, setIntakeMl] = useState<number>(1800);
  const [sweatIntensity, setSweatIntensity] = useState<'low' | 'med' | 'high'>('med');
  const [caffeineAlcoholCups, setCaffeineAlcoholCups] = useState<number>(1);

  // 當完成新頁面時獎勵 XP
  useEffect(() => {
    const calculatedXP = 120 + completedPages.length * 40;
    if (calculatedXP > userXP) {
      setUserXP(calculatedXP);
      try {
        localStorage.setItem('salud_user_xp', calculatedXP.toString());
      } catch {}
    }
  }, [completedPages]);

  // 段位體系計算
  const currentTier = useMemo(() => {
    if (userXP >= 1000) return { title: '人體體液宗師', level: 5, nextXP: 1500, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-950/70 border-amber-300' };
    if (userXP >= 600) return { title: '臨床水合專家', level: 4, nextXP: 1000, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-950/70 border-purple-300' };
    if (userXP >= 350) return { title: '體液平衡守門員', level: 3, nextXP: 600, color: 'text-sky-600 dark:text-salud-cyan', bg: 'bg-sky-100 dark:bg-sky-950/70 border-sky-300' };
    if (userXP >= 150) return { title: '滲透壓探險者', level: 2, nextXP: 350, color: 'text-emerald-600 dark:text-nature-green-400', bg: 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-300' };
    return { title: '水合菜鳥', level: 1, nextXP: 150, color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-800 border-slate-300' };
  }, [userXP]);

  const progressToNext = Math.min(100, Math.round((userXP / currentTier.nextXP) * 100));

  // 快問快答回答處理
  const handleAnswerQuiz = (optIdx: number) => {
    if (answered) return;
    setSelectedOption(optIdx);
    setAnswered(true);

    const currentQ = RAPID_QUIZZES[quizIndex];
    if (currentQ.options[optIdx].isCorrect) {
      // 答對噴灑紙花
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#06B6D4', '#10B981', '#F59E0B']
      });

      const nextXP = userXP + currentQ.rewardXP;
      setUserXP(nextXP);
      setQuizStreak((s) => s + 1);
      try {
        localStorage.setItem('salud_user_xp', nextXP.toString());
      } catch {}
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setAnswered(false);
    setQuizIndex((idx) => (idx + 1) % RAPID_QUIZZES.length);
  };

  // 個人化水分收支動態計算
  const hydrationVibe = useMemo(() => {
    // 基礎代謝水分需求 = 體重 × 32
    let baseDemand = weightKg * 32;
    // 流汗補償
    if (sweatIntensity === 'med') baseDemand += 500;
    if (sweatIntensity === 'high') baseDemand += 1000;
    // 咖啡/酒精利尿因子 (+150ml 每杯代償)
    baseDemand += caffeineAlcoholCups * 150;

    const diff = intakeMl - baseDemand;
    const ratio = Math.round((intakeMl / baseDemand) * 100);

    let status = '良好平衡';
    let statusClass = 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/70';
    let advice = '水分收支健康恆定，體內滲透壓處於理想生理區間！';

    if (ratio < 65) {
      status = '缺水警戒';
      statusClass = 'text-amber-600 bg-amber-100 dark:bg-amber-950/70';
      advice = '體液短缺，血液可能濃縮，建議分次慢飲 300–500 mL 水分。';
    } else if (ratio < 85) {
      status = '輕度乾渴';
      statusClass = 'text-sky-600 bg-sky-100 dark:bg-sky-950/70';
      advice = '稍微偏少，辦公室冷氣房中請記得每小時小口啜飲 150 mL。';
    } else if (ratio > 170) {
      status = '補水過多';
      statusClass = 'text-rose-600 bg-rose-100 dark:bg-rose-950/70';
      advice = '短時間灌水過量有低血鈉稀釋風險，若無劇烈暴汗請適度節制純水量。';
    }

    return { baseDemand, diff, ratio, status, statusClass, advice };
  }, [weightKg, intakeMl, sweatIntensity, caffeineAlcoholCups]);

  return (
    <div className="space-y-6 font-sans">
      {/* ── 頂部經驗值與段位卡 (XP & Mastery Tier Card) ── */}
      <div className="p-5 sm:p-6 rounded-3xl border border-amber-200/90 dark:border-amber-900/60 bg-gradient-to-r from-amber-50/80 via-white to-sky-50/70 dark:from-slate-900 dark:via-salud-dark-card dark:to-slate-950 shadow-sm relative overflow-hidden backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* 左側：段位頭銜與進度 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border shadow-xs flex items-center gap-1.5 ${currentTier.bg}`}>
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span>Level {currentTier.level} · {currentTier.title}</span>
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
                <span>連續學習 {streakDays} 天</span>
              </span>

              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-purple-500" />
                <span>總經驗值: {userXP} XP</span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                <span>升級至下一階：{currentTier.level < 5 ? `Level ${currentTier.level + 1}` : '已達最高榮譽'}</span>
                <span>{userXP} / {currentTier.nextXP} XP ({progressToNext}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-nature-sky-400 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          </div>

          {/* 右側：激勵提示 */}
          <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs space-y-1 shadow-xs shrink-0 max-w-sm">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-nature-sky-600 dark:text-salud-cyan" />
              <span>今日學習任務 (+120 XP 可領取)</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
              完成任 1 篇文庫精讀 (+40XP)、答對下方每日挑戰 (+50XP)、調整水合計算機 (+30XP) 即可升階！
            </p>
          </div>
        </div>
      </div>

      {/* ── 雙模塊：每日快問快答挑戰 vs 動態水合體檢儀 ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* 模塊 A：30秒每日直覺快問快答挑戰 (Daily Rapid Challenge) */}
        <div className="p-5 sm:p-6 rounded-3xl border border-sky-200 dark:border-sky-900/60 bg-white dark:bg-salud-dark-card shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-sky-500 text-white shadow-cyan-glow">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  30 秒直覺快問快答挑戰 · 題 {quizIndex + 1}/{RAPID_QUIZZES.length}
                </h3>
              </div>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                +50 XP 獎勵
              </span>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug">
              {RAPID_QUIZZES[quizIndex].question}
            </p>
          </div>

          {/* 選項清單 */}
          <div className="space-y-2">
            {RAPID_QUIZZES[quizIndex].options.map((opt, i) => {
              const isSelected = selectedOption === i;
              let btnStyle = 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 hover:border-sky-400';

              if (answered) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-100/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 line-through';
                }
              }

              return (
                <button
                  key={i}
                  disabled={answered}
                  onClick={() => handleAnswerQuiz(i)}
                  className={`btn-tactile w-full p-3 rounded-2xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                >
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* 回答後詳解與跳轉按鈕 */}
          {answered && (
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 space-y-2.5 animate-fadeIn">
              <div className="flex items-center gap-1.5 font-bold text-xs text-sky-900 dark:text-sky-200">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>臨床生化解密：</span>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                {RAPID_QUIZZES[quizIndex].explanation}
              </p>

              <div className="flex items-center justify-between pt-1 gap-2">
                <button
                  onClick={() => onSelectPage(RAPID_QUIZZES[quizIndex].targetPage)}
                  className="btn-tactile text-xs font-bold text-nature-sky-600 dark:text-salud-cyan hover:underline flex items-center gap-1"
                >
                  <span>深入研讀專章 ({RAPID_QUIZZES[quizIndex].targetPage})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNextQuiz}
                  className="btn-tactile px-3 py-1.5 rounded-xl bg-nature-sky-500 text-white font-mono text-xs font-bold shadow-cyan-glow flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>下一題挑戰</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 模塊 B：人體水合動態互動儀表 (Interactive Hydration Vibe Calculator) */}
        <div className="p-5 sm:p-6 rounded-3xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-salud-dark-card shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-emerald-500 text-white shadow-xs">
                  <Droplets className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                  個人動態水合收支體檢儀 (Hydration Vibe Meter)
                </h3>
              </div>
              <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${hydrationVibe.statusClass}`}>
                {hydrationVibe.status} ({hydrationVibe.ratio}%)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              拖動滑桿即刻動態計算每日水分需求與收支恆定狀態
            </p>
          </div>

          {/* 4 個互動滑桿與選項 */}
          <div className="space-y-3 font-mono text-xs">
            {/* 體重滑桿 */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-[11px]">
                <span>體重：<strong className="text-slate-900 dark:text-white font-sans">{weightKg} kg</strong></span>
                <span className="text-slate-400 font-sans">基礎需求 ~{Math.round(weightKg * 32)} mL</span>
              </div>
              <input
                type="range"
                min="40"
                max="110"
                value={weightKg}
                onChange={(e) => setWeightKg(parseInt(e.target.value, 10))}
                className="w-full accent-nature-sky-500 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            </div>

            {/* 今日飲水滑桿 */}
            <div className="space-y-1">
              <div className="flex justify-between text-slate-600 dark:text-slate-400 text-[11px]">
                <span>今日飲水量：<strong className="text-nature-sky-600 dark:text-salud-cyan font-sans">{intakeMl} mL</strong></span>
                <span className="text-slate-400 font-sans">約 {Math.round(intakeMl / 250)} 杯水</span>
              </div>
              <input
                type="range"
                min="500"
                max="4000"
                step="100"
                value={intakeMl}
                onChange={(e) => setIntakeMl(parseInt(e.target.value, 10))}
                className="w-full accent-nature-sky-500 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-700"
              />
            </div>

            {/* 戶外流汗度與咖啡杯數 */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 block">流汗強度：</span>
                <div className="flex gap-1">
                  {(['low', 'med', 'high'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setSweatIntensity(lvl)}
                      className={`btn-tactile flex-1 py-1 rounded-lg text-[10px] border transition-all ${
                        sweatIntensity === lvl
                          ? 'bg-emerald-500 text-white font-bold border-emerald-600'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {lvl === 'low' ? '微汗' : lvl === 'med' ? '中度' : '暴汗'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-slate-500 block">咖啡/茶/酒：</span>
                <div className="flex items-center justify-between p-1 px-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setCaffeineAlcoholCups(Math.max(0, caffeineAlcoholCups - 1))}
                    className="w-5 h-5 rounded bg-white dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200"
                  >
                    -
                  </button>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{caffeineAlcoholCups} 杯</span>
                  <button
                    onClick={() => setCaffeineAlcoholCups(Math.min(6, caffeineAlcoholCups + 1))}
                    className="w-5 h-5 rounded bg-white dark:bg-slate-700 flex items-center justify-center font-bold text-slate-600 dark:text-slate-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 計算回饋與臨床指引 */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900 dark:text-emerald-300">
                目標需水量：~{hydrationVibe.baseDemand} mL
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                收支差額：{hydrationVibe.diff >= 0 ? `+${hydrationVibe.diff}` : hydrationVibe.diff} mL
              </span>
            </div>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-200 leading-relaxed font-sans">
              💡 {hydrationVibe.advice}
            </p>
          </div>
        </div>
      </div>

      {/* ── 六大醫學解鎖勳章牆 (Achievement Medals Wall) ── */}
      <div className="p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/60 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <h4 className="font-display font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
              水與體液平衡 · 六大醫學成就勳章 (Achievement Showcase)
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            已解鎖 {MEDALS.filter((m) => m.requiredPage ? completedPages.includes(m.requiredPage) : completedPages.length >= (m.requiredCount || 12)).length} / 6 枚
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {MEDALS.map((medal) => {
            const isUnlocked = medal.requiredPage
              ? completedPages.includes(medal.requiredPage)
              : completedPages.length >= (medal.requiredCount || 12);

            return (
              <div
                key={medal.id}
                onClick={() => medal.requiredPage && onSelectPage(medal.requiredPage)}
                className={`p-3 rounded-2xl border transition-all text-center space-y-1.5 cursor-pointer ${
                  isUnlocked
                    ? 'border-amber-300 dark:border-amber-700 bg-amber-50/70 dark:bg-amber-950/40 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-60 hover:opacity-80'
                }`}
                title={isUnlocked ? `已解鎖勳章：${medal.title}` : `點擊前往解鎖：${medal.desc}`}
              >
                <div className="text-2xl filter drop-shadow-sm">{medal.icon}</div>
                <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
                  {medal.title}
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-tight font-sans">
                  {medal.desc}
                </p>
                <div className="pt-1">
                  <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${
                    isUnlocked ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isUnlocked ? '✓ 已解鎖' : '🔒 待挑戰'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
