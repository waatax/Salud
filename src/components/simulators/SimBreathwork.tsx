import React, { useState, useEffect, useRef } from 'react';
import { BREATHWORK_PROTOCOLS } from '../../data/mentalHealthData';
import { BreathworkPatternId, BreathworkProtocol } from '../../types';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ShieldAlert,
  Sparkles,
  Heart,
  Wind,
  CheckCircle2,
  Info,
  Clock
} from 'lucide-react';

export const SimBreathwork: React.FC = () => {
  const [selectedId, setSelectedId] = useState<BreathworkPatternId>('PHYSIOLOGICAL_SIGH');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [sessionTargetMinutes, setSessionTargetMinutes] = useState<number>(3);
  
  // Respiration cycle state
  // Steps: 'inhale_1' | 'inhale_2' | 'hold_inhale' | 'exhale' | 'hold_exhale'
  const [currentPhase, setCurrentPhase] = useState<'inhale_1' | 'inhale_2' | 'hold_inhale' | 'exhale' | 'hold_exhale'>('inhale_1');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(2.5);
  const [completedCycles, setCompletedCycles] = useState<number>(0);
  const [totalElapsedSeconds, setTotalElapsedSeconds] = useState<number>(0);

  const currentProtocol: BreathworkProtocol =
    BREATHWORK_PROTOCOLS.find((p) => p.id === selectedId) || BREATHWORK_PROTOCOLS[0];

  // Web Audio Context for gentle acoustic bell / bowl sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playChime = (freq: number = 440, type: OscillatorType = 'sine') => {
    if (!isSoundOn) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (!audioCtxRef.current) return;

      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtxRef.current.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtxRef.current.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);

      osc.start();
      osc.stop(audioCtxRef.current.currentTime + 1.2);
    } catch {
      // Audio not supported or blocked by browser policy
    }
  };

  // Reset state on protocol change
  useEffect(() => {
    setIsRunning(false);
    setCurrentPhase('inhale_1');
    setPhaseSecondsLeft(currentProtocol.timing_sec.inhale_1);
    setCompletedCycles(0);
    setTotalElapsedSeconds(0);
  }, [selectedId]);

  // Main Timer Loop (100ms interval for smooth updates)
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTotalElapsedSeconds((prev) => prev + 0.1);

      setPhaseSecondsLeft((prev) => {
        if (prev <= 0.15) {
          // Transition to next phase
          let nextPhase: 'inhale_1' | 'inhale_2' | 'hold_inhale' | 'exhale' | 'hold_exhale' = 'inhale_1';
          let nextDuration = 4.0;

          if (currentPhase === 'inhale_1') {
            if (currentProtocol.timing_sec.inhale_2 && currentProtocol.timing_sec.inhale_2 > 0) {
              nextPhase = 'inhale_2';
              nextDuration = currentProtocol.timing_sec.inhale_2;
              playChime(660); // Higher tone for top-up
            } else if (currentProtocol.timing_sec.hold_inhale && currentProtocol.timing_sec.hold_inhale > 0) {
              nextPhase = 'hold_inhale';
              nextDuration = currentProtocol.timing_sec.hold_inhale;
              playChime(520);
            } else {
              nextPhase = 'exhale';
              nextDuration = currentProtocol.timing_sec.exhale;
              playChime(330); // Lower relaxing tone for exhale
            }
          } else if (currentPhase === 'inhale_2') {
            nextPhase = 'exhale';
            nextDuration = currentProtocol.timing_sec.exhale;
            playChime(330);
          } else if (currentPhase === 'hold_inhale') {
            nextPhase = 'exhale';
            nextDuration = currentProtocol.timing_sec.exhale;
            playChime(330);
          } else if (currentPhase === 'exhale') {
            if (currentProtocol.timing_sec.hold_exhale && currentProtocol.timing_sec.hold_exhale > 0) {
              nextPhase = 'hold_exhale';
              nextDuration = currentProtocol.timing_sec.hold_exhale;
              playChime(440);
            } else {
              // Cycle completed!
              setCompletedCycles((c) => c + 1);
              nextPhase = 'inhale_1';
              nextDuration = currentProtocol.timing_sec.inhale_1;
              playChime(440);
            }
          } else if (currentPhase === 'hold_exhale') {
            setCompletedCycles((c) => c + 1);
            nextPhase = 'inhale_1';
            nextDuration = currentProtocol.timing_sec.inhale_1;
            playChime(440);
          }

          setCurrentPhase(nextPhase);
          return nextDuration;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isRunning, currentPhase, currentProtocol]);

  // Phase Display Meta
  const getPhaseMeta = () => {
    switch (currentPhase) {
      case 'inhale_1':
        return {
          title: selectedId === 'PHYSIOLOGICAL_SIGH' ? '鼻腔深吸氣 (充盈80%)' : '鼻腔深吸氣',
          action: '經由鼻子深長吸氣，腹部自然微膨脹',
          mechanism: '交感暫放鬆、胸腔負壓回心血量上升',
          scale: 'scale-110 sm:scale-125',
          color: 'from-cyan-400 to-sky-500 text-cyan-700 dark:text-cyan-300',
          ringColor: 'border-cyan-400 dark:border-cyan-400',
          pulse: true
        };
      case 'inhale_2':
        return {
          title: '短促微補吸 (Top-Up 補滿)',
          action: '鼻腔迅速補吸一口氣到底！',
          mechanism: '高跨肺壓強行復張微塌肺泡，重整表面活性劑',
          scale: 'scale-125 sm:scale-140',
          color: 'from-emerald-400 to-teal-500 text-emerald-700 dark:text-emerald-300',
          ringColor: 'border-emerald-400 dark:border-emerald-400',
          pulse: true
        };
      case 'hold_inhale':
        return {
          title: '吸氣末閉氣 (留氣穩心)',
          action: '保持胸腔自然充盈，肩膀放鬆下沉',
          mechanism: '微毛細血管氣體擴散平衡，前額葉抑制杏仁核',
          scale: 'scale-110 sm:scale-120',
          color: 'from-indigo-400 to-violet-500 text-indigo-700 dark:text-indigo-300',
          ringColor: 'border-indigo-400 dark:border-indigo-400',
          pulse: false
        };
      case 'exhale':
        return {
          title: '緩慢長呼氣 (迷走神經煞車)',
          action: selectedId === 'BREATH_478' ? '微張嘴唇，發出「呼～」聲長吐' : '經由嘴唇或鼻腔極度緩慢吐氣',
          mechanism: '胸腔內壓升高激發感壓反射，迷走神經釋放乙醯膽鹼降溫心率',
          scale: 'scale-90 sm:scale-80',
          color: 'from-purple-500 to-pink-500 text-purple-700 dark:text-purple-300',
          ringColor: 'border-purple-400 dark:border-purple-400',
          pulse: false
        };
      case 'hold_exhale':
        return {
          title: '呼氣末屏息 (空腹安寧)',
          action: '肺部排空，保持平靜不吸氣',
          mechanism: '體內二氧化碳溫和累積，提高 CO2 耐受力防換氣過度',
          scale: 'scale-85 sm:scale-75',
          color: 'from-slate-400 to-slate-600 text-slate-700 dark:text-slate-300',
          ringColor: 'border-slate-400 dark:border-slate-500',
          pulse: false
        };
    }
  };

  const phaseMeta = getPhaseMeta();
  const progressPercent = Math.min(100, (totalElapsedSeconds / (sessionTargetMinutes * 60)) * 100);

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-cyan-50/20 dark:from-slate-900/90 dark:via-salud-dark-card/80 dark:to-slate-950 shadow-lg space-y-6 relative overflow-hidden">
      {/* Header & Protocol Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-cyan-100 dark:bg-cyan-950/80 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800">
              SIM-BREATHWORK · 生理回饋互動呼吸引導儀
            </span>
            <span className="text-xs font-mono text-slate-500">GRADE {currentProtocol.evidence_grade} 實證</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1 flex items-center gap-2">
            <Wind className="w-6 h-6 text-cyan-500" />
            <span>{currentProtocol.name_zh}</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 font-sans mt-0.5">
            {currentProtocol.tagline_zh}
          </p>
        </div>

        {/* Action controls & sound toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSoundOn(!isSoundOn)}
            className={`p-2 rounded-xl border transition-all ${
              isSoundOn
                ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 text-cyan-700 dark:text-cyan-300'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 text-slate-400'
            }`}
            title={isSoundOn ? '音效開啟 (柔和頌缽提示)' : '音效已靜音'}
          >
            {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Duration Selector */}
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-0.5 text-xs font-mono">
            {[1, 3, 5].map((mins) => (
              <button
                key={mins}
                onClick={() => setSessionTargetMinutes(mins)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  sessionTargetMinutes === mins
                    ? 'bg-cyan-500 text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {mins}分
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Protocol Quick Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {BREATHWORK_PROTOCOLS.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-1 ${
                isSelected
                  ? 'border-cyan-500 dark:border-cyan-500 bg-cyan-50/80 dark:bg-cyan-950/40 text-cyan-950 dark:text-cyan-200 ring-2 ring-cyan-500/20 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="font-bold text-xs truncate">{p.name_zh.split(' (')[0]}</div>
              <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                {p.total_cycle_sec}秒/循環
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Central Pulsing Breathing Orb ── */}
      <div className="relative w-full aspect-[1.3/1] max-h-96 flex flex-col items-center justify-center rounded-3xl bg-slate-100/60 dark:bg-slate-950/70 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-inner">
        {/* Outer ambient glow rings */}
        <div
          className={`absolute rounded-full border-2 transition-all duration-1000 ${phaseMeta.ringColor} ${phaseMeta.scale} opacity-30 w-64 h-64 sm:w-80 sm:h-80 pointer-events-none`}
        />
        <div
          className={`absolute rounded-full border border-dashed transition-all duration-1000 ${phaseMeta.ringColor} ${phaseMeta.scale} opacity-20 w-80 h-80 sm:w-96 sm:h-96 pointer-events-none`}
        />

        {/* Central Dynamic Circle */}
        <div
          className={`relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-tr ${phaseMeta.color} shadow-2xl flex flex-col items-center justify-center text-center p-4 transition-all duration-1000 transform ${phaseMeta.scale}`}
        >
          <span className="font-mono text-xs text-white/80 font-bold uppercase tracking-wider">
            {isRunning ? '正在進行' : '準備就緒'}
          </span>
          <div className="font-mono text-3xl sm:text-4xl font-extrabold text-white tracking-tight my-1">
            {phaseSecondsLeft.toFixed(1)}s
          </div>
          <span className="text-xs sm:text-sm font-bold text-white leading-tight">
            {phaseMeta.title}
          </span>
        </div>

        {/* Real-time Physiological Mechanism Live Banner */}
        <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
          <div className="inline-block px-4 py-2 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-sm max-w-xl mx-auto">
            <p className="text-xs text-slate-800 dark:text-slate-200 font-sans font-medium flex items-center justify-center gap-1.5">
              <span className="text-cyan-500 font-bold">💡 動作指引：</span>
              <span>{phaseMeta.action}</span>
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              微觀機轉：{phaseMeta.mechanism}
            </p>
          </div>
        </div>
      </div>

      {/* Control Buttons & Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-500" />
              已練習：{Math.floor(totalElapsedSeconds / 60)}分 {Math.floor(totalElapsedSeconds % 60)}秒
            </span>
            <span>已完成：{completedCycles} 個循環</span>
          </div>
          <span>目標：{sessionTargetMinutes} 分鐘</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Big tactile button controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => {
              if (!isRunning && totalElapsedSeconds === 0) {
                playChime(440);
              }
              setIsRunning(!isRunning);
            }}
            className={`btn-tactile px-8 py-3.5 rounded-2xl font-display font-bold text-sm sm:text-base flex items-center gap-2 shadow-md transition-all ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/20'
                : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white shadow-cyan-500/25 ring-2 ring-cyan-400/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5" />
                <span>暫停引導</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>開始 {currentProtocol.name_zh.split(' (')[0]}</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setCurrentPhase('inhale_1');
              setPhaseSecondsLeft(currentProtocol.timing_sec.inhale_1);
              setCompletedCycles(0);
              setTotalElapsedSeconds(0);
            }}
            className="btn-tactile p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
            title="重置"
            aria-label="重置"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Clinical Caution Footer */}
      <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300 font-sans">
        <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold">臨床安全警示 (Clinical Safety Gate)：</span>
          <p className="text-[11px] leading-relaxed">
            初學者或高感度體質者在長呼氣時若感覺輕微頭暈、手指尖發麻，為短暫二氧化碳波動現象。請隨時按下暫停，閉上嘴巴恢復輕鬆的自然鼻呼吸即可在 30 秒內復原。嚴禁在開車或操作重型機械時練習。
          </p>
        </div>
      </div>
    </div>
  );
};
