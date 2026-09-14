import React, { useState, useEffect } from 'react';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  HeartPulse,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Coffee,
  Footprints,
  Droplets,
  Wind,
  Smile,
} from 'lucide-react';

export const UrgeSurfingTimer: React.FC = () => {
  // Timer State (15 minutes = 900 seconds)
  const initialSeconds = 900;
  const [timeLeft, setTimeLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [breathPhase, setBreathPhase] = useState<'INHALE' | 'HOLD' | 'EXHALE'>('INHALE');
  const [breathCount, setBreathCount] = useState<number>(4);

  // Hunger Triage State (1 to 5)
  const [hungerScore, setHungerScore] = useState<number>(3);

  // Micro-action checks
  const [completedActions, setCompletedActions] = useState<string[]>([]);

  // 15-minute timer countdown
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  // 4-7-8 breathing loop when running
  useEffect(() => {
    let breathTimer: NodeJS.Timeout | null = null;
    if (isRunning) {
      breathTimer = setInterval(() => {
        setBreathCount((prev) => {
          if (prev <= 1) {
            // Switch phase
            setBreathPhase((current) => {
              if (current === 'INHALE') return 'HOLD';
              if (current === 'HOLD') return 'EXHALE';
              return 'INHALE';
            });
            return breathPhase === 'INHALE' ? 7 : breathPhase === 'HOLD' ? 8 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (breathTimer) clearInterval(breathTimer);
    };
  }, [isRunning, breathPhase]);

  const toggleAction = (id: string) => {
    setCompletedActions((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  return (
    <div className="rounded-3xl border border-blue-500/30 bg-slate-900/90 text-slate-100 p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/40 text-xs font-mono font-bold mb-1.5">
            <Brain className="w-3.5 h-3.5" />
            <span>神經衝動阻斷技術 · URGE SURFING PROTOCOL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-white flex items-center gap-2">
            <span>暴食與糖癮 15 分鐘冷靜急救儀</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            神經科學研究證實：多巴胺引起的暴食渴望就像海浪，平均在 12~15 分鐘達到峰值後自然退去。啟動計時器，透過 4-7-8 呼吸與多巴胺替代行為，安度渴望峰值！
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`btn-tactile flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? '暫停衝浪' : '開始 15 分鐘衝浪'}</span>
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(initialSeconds);
              setBreathPhase('INHALE');
              setBreathCount(4);
            }}
            className="p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
            title="重設計時器"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* Left: Dynamic Visual Countdown & 4-7-8 Breathing Circle */}
        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
          <div className="relative flex items-center justify-center">
            {/* Animated Pulsing Ring */}
            <div
              className={`w-44 h-44 rounded-full flex flex-col items-center justify-center border-4 transition-all duration-1000 ${
                !isRunning
                  ? 'border-slate-700 bg-slate-900/50'
                  : breathPhase === 'INHALE'
                  ? 'border-cyan-400 bg-cyan-500/20 scale-105 ring-8 ring-cyan-400/20'
                  : breathPhase === 'HOLD'
                  ? 'border-purple-400 bg-purple-500/20 scale-100 ring-8 ring-purple-400/20'
                  : 'border-emerald-400 bg-emerald-500/20 scale-95 ring-8 ring-emerald-400/20'
              }`}
            >
              <div className="text-3xl font-mono font-extrabold text-white tracking-wider">
                {formatTime(timeLeft)}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-1">
                {isRunning ? (
                  <span className="font-bold text-salud-cyan">
                    {breathPhase === 'INHALE' ? '吸氣 (Inhale)' : breathPhase === 'HOLD' ? '閉氣 (Hold)' : '吐氣 (Exhale)'} · {breathCount}s
                  </span>
                ) : (
                  <span>點擊開始啟動急救</span>
                )}
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-400 max-w-xs leading-relaxed">
            {isRunning ? (
              <span className="text-emerald-300 animate-pulse">
                🌿 副交感神經迷走煞車啟動中，皮質醇下降，食慾正在消退...
              </span>
            ) : (
              <span>當你很想吃高糖高油零食時，請先給自己 15 分鐘的緩衝窗口。</span>
            )}
          </div>
        </div>

        {/* Right: 5-Level Hunger Triage & Dopamine Alternative Checklist */}
        <div className="space-y-4 text-xs">
          {/* Hunger Triage Slider */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center font-bold">
              <span className="flex items-center gap-1.5 text-amber-400">
                <HeartPulse className="w-4 h-4" />
                <span>生理性 vs 心理性飢餓鑑別量表</span>
              </span>
              <span className="font-mono text-slate-300">等級 {hungerScore} / 5</span>
            </div>

            <input
              type="range"
              min={1}
              max={5}
              value={hungerScore}
              onChange={(e) => setHungerScore(parseInt(e.target.value, 10))}
              className="w-full accent-amber-400 cursor-pointer"
            />

            <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-300">
              {hungerScore === 1 && (
                <span>Level 1 · 完全心理誘發：剛吃飽不久，純粹看到甜點或聞到香味產生多巴胺渴望。<strong>【喝水即可解決】</strong></span>
              )}
              {hungerScore === 2 && (
                <span>Level 2 · 壓力誘發渴望：工作焦慮或深夜無聊，想透過咀嚼咀嚼感釋放壓力。<strong>【建議做 4-7-8 呼吸】</strong></span>
              )}
              {hungerScore === 3 && (
                <span>Level 3 · 輕度能量需求：距離上一餐 3~4 小時，胃部輕微咕嚕聲，可接受吃水煮蛋或生菜。</span>
              )}
              {hungerScore === 4 && (
                <span>Level 4 · 明顯生理飢餓：距離上一餐 5+ 小時，精力下降，需正餐補充優質蛋白質與纖維。</span>
              )}
              {hungerScore === 5 && (
                <span>Level 5 · 重度飢餓低血糖：手抖、心慌、頭暈，需立即補充複合碳水與水分！</span>
              )}
            </div>
          </div>

          {/* Dopamine Replacement Actions */}
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5">
            <div className="font-bold text-slate-200 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-salud-cyan">
                <Sparkles className="w-4 h-4" />
                <span>15 分鐘多巴胺替代微行動 (打勾執行)</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                已完成 {completedActions.length} / 4
              </span>
            </div>

            <div className="space-y-1.5">
              {[
                { id: 'water', label: '慢飲 300 mL 溫開水或氣泡水 (填補胃牽張受器)', icon: Droplets },
                { id: 'walk', label: '站起來離開廚房/沙發，快走動 3 分鐘 (打破環境刺激錨點)', icon: Footprints },
                { id: 'tea', label: '泡一杯無糖薄荷茶或黑咖啡 (利用苦味與香氣阻斷糖渴求)', icon: Coffee },
                { id: 'breathe', label: '跟隨左側圓圈完成 3 回合 4-7-8 呼吸 (降皮質醇)', icon: Wind },
              ].map((act) => {
                const isChecked = completedActions.includes(act.id);
                const Icon = act.icon;
                return (
                  <button
                    key={act.id}
                    onClick={() => toggleAction(act.id)}
                    className={`w-full p-2 rounded-xl text-left border transition-all flex items-center gap-2.5 text-[11px] ${
                      isChecked
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'border-slate-700 bg-slate-900/60 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                        isChecked ? 'border-emerald-400 bg-emerald-400 text-slate-950 font-bold' : 'border-slate-600'
                      }`}
                    >
                      {isChecked && '✓'}
                    </div>
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
