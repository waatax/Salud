import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { Moon, Sun, Coffee, Sparkles, Brain, Clock, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const SimCircadian: React.FC = () => {
  const { t, language } = useLanguage();
  const [wakeHour, setWakeHour] = useState<number>(6.5); // 06:30
  const [sunlightDelayMinutes, setSunlightDelayMinutes] = useState<number>(30); // 30m after wake
  const [lastCaffeineHour, setLastCaffeineHour] = useState<number>(14); // 14:00 (2 PM)
  const [bedHour, setBedHour] = useState<number>(23); // 23:00 (11 PM)

  const sunlightTime = wakeHour + sunlightDelayMinutes / 60;
  const caffeineToBedHours = bedHour >= lastCaffeineHour ? bedHour - lastCaffeineHour : 24 - lastCaffeineHour + bedHour;
  const isCaffeineDisruptive = caffeineToBedHours < 9;
  const isSunlightOptimized = sunlightDelayMinutes <= 60;

  // Generate 24-hour hormone and clearance curves
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getCortisol = (h: number) => {
    const distFromPeak = (h - (wakeHour + 0.75) + 24) % 24;
    if (distFromPeak < 3) return 100 - distFromPeak * 10;
    if (distFromPeak < 14) return 70 - (distFromPeak - 3) * 4.5;
    return 15 + Math.sin(h) * 5;
  };

  const getMelatonin = (h: number) => {
    const timeToBed = (h - bedHour + 24) % 24;
    if (timeToBed >= 22 || timeToBed <= 8) {
      if (timeToBed >= 22) return (timeToBed - 22) * 25;
      if (timeToBed <= 4) return 50 + timeToBed * 12;
      return 98 - (timeToBed - 4) * 22;
    }
    return 5;
  };

  return (
    <div className="p-5 sm:p-7 rounded-3xl border border-purple-200/90 dark:border-purple-700/50 bg-white dark:bg-slate-900/85 shadow-lg space-y-6 text-slate-800 dark:text-slate-100 font-sans transition-colors">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-lg sm:text-xl font-display font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            {t('sleep.circadian_title')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
            Photoperiod SCN Synchronization, Melatonin Dynamics & Glymphatic Brain Washing
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-700 text-purple-800 dark:text-purple-300">
          神經生理節律模擬
        </span>
      </div>

      {/* Scenario Presets */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-500 dark:text-slate-400 text-[11px]">生活情境快選：</span>
        {[
          {
            name_zh: '☀️ 晨型生理鐘 (黃金標準)',
            name_en: '☀️ Circadian Gold Standard',
            wake: 6.5,
            sun: 20,
            caff: 13,
            bed: 22.5,
          },
          {
            name_zh: '🌙 晚睡晚起 (社交時差)',
            name_en: '🌙 Late Social Jetlag',
            wake: 9.5,
            sun: 90,
            caff: 17,
            bed: 25,
          },
          {
            name_zh: '💼 輪班高壓 (皮質醇紊亂)',
            name_en: '💼 Shift Work Disruption',
            wake: 14,
            sun: 120,
            caff: 20,
            bed: 28,
          },
        ].map((sc, i) => (
          <button
            key={i}
            onClick={() => {
              setWakeHour(sc.wake);
              setSunlightDelayMinutes(sc.sun);
              setLastCaffeineHour(sc.caff);
              setBedHour(sc.bed);
            }}
            className="btn-tactile px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all text-[11px]"
          >
            {language === 'zh-TW' ? sc.name_zh : sc.name_en}
          </button>
        ))}
      </div>

      {/* Control Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1 font-medium">
              <Sun className="w-3.5 h-3.5 text-nature-amber-600 dark:text-amber-400" />
              <span>{t('sleep.wake_time')}</span>
            </label>
            <strong className="text-nature-amber-700 dark:text-amber-400">
              {Math.floor(wakeHour).toString().padStart(2, '0')}:{(wakeHour % 1 * 60).toFixed(0).padStart(2, '0')}
            </strong>
          </div>
          <input
            type="range"
            min="4"
            max="11"
            step="0.5"
            value={wakeHour}
            onChange={(e) => setWakeHour(Number(e.target.value))}
            className="w-full accent-nature-amber-500 cursor-pointer"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1 font-medium">
              <Sun className="w-3.5 h-3.5 text-nature-sky-600 dark:text-salud-cyan" />
              <span>起床後戶外陽光延遲</span>
            </label>
            <strong className={isSunlightOptimized ? 'text-nature-sky-700 dark:text-salud-cyan' : 'text-nature-amber-700 dark:text-amber-400'}>
              {sunlightDelayMinutes} 分鐘
            </strong>
          </div>
          <input
            type="range"
            min="10"
            max="180"
            step="10"
            value={sunlightDelayMinutes}
            onChange={(e) => setSunlightDelayMinutes(Number(e.target.value))}
            className="w-full accent-nature-sky-500 cursor-pointer"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1 font-medium">
              <Coffee className="w-3.5 h-3.5 text-nature-amber-600 dark:text-salud-amber" />
              <span>最後一杯咖啡因</span>
            </label>
            <strong className={isCaffeineDisruptive ? 'text-red-600 dark:text-red-400' : 'text-nature-green-700 dark:text-emerald-400'}>
              {lastCaffeineHour}:00
            </strong>
          </div>
          <input
            type="range"
            min="8"
            max="21"
            value={lastCaffeineHour}
            onChange={(e) => setLastCaffeineHour(Number(e.target.value))}
            className="w-full accent-nature-amber-500 cursor-pointer"
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
          <div className="flex justify-between text-slate-700 dark:text-slate-300">
            <label className="flex items-center gap-1 font-medium">
              <Moon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>{t('sleep.bed_time')}</span>
            </label>
            <strong className="text-purple-700 dark:text-purple-300">{bedHour}:00</strong>
          </div>
          <input
            type="range"
            min="20"
            max="26"
            value={bedHour}
            onChange={(e) => setBedHour(Number(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
        </div>
      </div>

      {/* Dynamic 24-Hour Circadian SVG Curve */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between text-xs font-mono">
          <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-nature-sky-600 dark:text-salud-cyan" />
            24 小時晝夜激素時序與膠淋巴排毒高潮帶
          </span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1 text-nature-amber-700 dark:text-amber-400">
              <span className="w-3 h-0.5 bg-nature-amber-500" /> 皮質醇 (清醒)
            </span>
            <span className="flex items-center gap-1 text-purple-700 dark:text-purple-400">
              <span className="w-3 h-0.5 bg-purple-500" /> 褪黑激素 (睡意)
            </span>
            <span className="flex items-center gap-1 text-nature-sky-700 dark:text-cyan-400">
              <span className="w-3 h-2 bg-nature-sky-500/20 border border-nature-sky-500/40 rounded-sm" /> 膠淋巴 CSF 排毒帶
            </span>
          </div>
        </div>

        {/* SVG Curve */}
        <div className="h-44 w-full relative">
          <svg viewBox="0 0 480 150" className="w-full h-full overflow-visible">
            {/* Grid */}
            <line x1="30" y1="20" x2="470" y2="20" stroke="#cbd5e1" className="dark:stroke-slate-700" strokeDasharray="3,3" strokeWidth="0.8" />
            <line x1="30" y1="75" x2="470" y2="75" stroke="#cbd5e1" className="dark:stroke-slate-700" strokeDasharray="3,3" strokeWidth="0.8" />
            <line x1="30" y1="130" x2="470" y2="130" stroke="#94a3b8" className="dark:stroke-slate-600" strokeWidth="1.2" />

            {/* Cortisol curve */}
            <path
              d={hours
                .map((h, i) => {
                  const x = 30 + (h / 24) * 440;
                  const y = 130 - (getCortisol(h) / 100) * 110;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
            />

            {/* Melatonin curve */}
            <path
              d={hours
                .map((h, i) => {
                  const x = 30 + (h / 24) * 440;
                  const y = 130 - (getMelatonin(h) / 100) * 110;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#a855f7"
              strokeWidth="2.5"
            />
          </svg>
        </div>
      </div>

      {/* Real-time Physiological Feedback Alerts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Caffeine Feedback */}
        <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-sm ${
          isCaffeineDisruptive
            ? 'border-red-200 dark:border-red-500/60 bg-red-50/90 dark:bg-red-950/30 text-red-900 dark:text-red-200'
            : 'border-nature-green-200 dark:border-emerald-500/60 bg-nature-green-50/90 dark:bg-emerald-950/30 text-nature-green-900 dark:text-emerald-200'
        }`}>
          {isCaffeineDisruptive ? (
            <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-nature-green-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <strong className="block font-bold">
              {isCaffeineDisruptive ? '⚠ 咖啡因距離就寢不足 9 小時 (高干擾風險)' : '✓ 咖啡因截斷時間符合代謝標準'}
            </strong>
            <p className="text-[11px] opacity-90 leading-relaxed font-sans">
              {isCaffeineDisruptive
                ? `最後攝取距離就寢僅 ${caffeineToBedHours} 小時。殘存的腺苷受體阻斷效應會使前半夜 N3 慢波深睡減少 20%–40%，大腦膠淋巴排毒被大幅壓制！`
                : `距離就寢間隔 ${caffeineToBedHours} 小時，已渡過咖啡因四分之一衰期，腺苷 (Adenosine) 能自然與大腦受體結合引發沉重睡意。`}
            </p>
          </div>
        </div>

        {/* Sunlight Feedback */}
        <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-sm ${
          isSunlightOptimized
            ? 'border-nature-sky-200 dark:border-cyan-500/60 bg-nature-sky-50/90 dark:bg-cyan-950/30 text-nature-sky-900 dark:text-cyan-200'
            : 'border-nature-amber-200 dark:border-amber-500/60 bg-nature-amber-50/90 dark:bg-amber-950/30 text-nature-amber-900 dark:text-amber-200'
        }`}>
          {isSunlightOptimized ? (
            <Sparkles className="w-5 h-5 text-nature-sky-600 dark:text-cyan-400 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-nature-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="space-y-1">
            <strong className="block font-bold">
              {isSunlightOptimized ? '✓ 晨間藍綠光黃金錨定成功' : '⚠ 戶外光照延遲過久 (生物鐘漂移)'}
            </strong>
            <p className="text-[11px] opacity-90 leading-relaxed font-sans">
              {isSunlightOptimized
                ? `起床 ${sunlightDelayMinutes} 分鐘內接觸光線，成功激發皮質醇晨峰 (CAR)，並精準設定了今晚約 ${bedHour - 2}:00 開始分泌褪黑激素的生理鬧鐘。`
                : `光照延遲達 ${sunlightDelayMinutes} 分鐘，視交叉上核 (SCN) 主時鐘容易發生「相位延遲」，使今晚預期入睡時間往後推遲造成難以入眠。`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
