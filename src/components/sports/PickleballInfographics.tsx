import React, { useState } from 'react';
import { useLanguage } from '../../i18n';
import { PICKLEBALL_INFOGRAPHICS } from '../../data/pickleballData';
import { Shield, ShieldAlert, Zap, Layers, HeartPulse, Activity, CheckCircle2, AlertTriangle } from 'lucide-react';

export const PickleballInfographics: React.FC = () => {
  const { language } = useLanguage();
  const [dinkQuality, setDinkQuality] = useState<'PERFECT' | 'HIGH_FLOAT'>('PERFECT');

  return (
    <div className="space-y-6">
      <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/20 text-teal-400 border border-teal-500/30">
            Pedagogical Infographics
          </span>
          <h3 className="text-base sm:text-lg font-display font-extrabold text-salud-light-text dark:text-salud-dark-text">
            {language === 'zh-TW' ? '匹克球運動科學四大圖解教學 Infor Graph' : 'Pickleball 4 Scientific Visual Infor Graphs'}
          </h3>
        </div>
        <p className="text-xs text-slate-500 font-mono mt-1">
          Kitchen 7ft Geometry & Dink Apex, 14ft Firefight Volleys, Perforated Aerodynamics, Longevity & Fall Prevention
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* ── Infographic 1: Kitchen Geometry & Dink Apex ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-teal-400 font-bold block">
                {PICKLEBALL_INFOGRAPHICS[0].id} · {PICKLEBALL_INFOGRAPHICS[0].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[0].title_zh : PICKLEBALL_INFOGRAPHICS[0].title_en}
              </h4>
            </div>
            <Shield className="w-5 h-5 text-teal-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[0].subtitle_zh : PICKLEBALL_INFOGRAPHICS[0].subtitle_en}
          </p>

          {/* Interactive Toggle: Perfect Dink vs High Float */}
          <div className="flex gap-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold">
            <button
              onClick={() => setDinkQuality('PERFECT')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                dinkQuality === 'PERFECT' ? 'bg-teal-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✓ 完美軟球 (頂點在己方半場)
            </button>
            <button
              onClick={() => setDinkQuality('HIGH_FLOAT')}
              className={`flex-1 py-1.5 rounded-lg transition-all ${
                dinkQuality === 'HIGH_FLOAT' ? 'bg-rose-600 text-white shadow' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              ✕ 危險高拋 (過網漂浮給對手殺)
            </button>
          </div>

          {/* SVG Diagram: Kitchen Profile View */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800">
            <div className="h-44 w-full">
              <svg viewBox="0 0 360 170" className="w-full h-full">
                {/* Court Floor */}
                <line x1="20" y1="140" x2="340" y2="140" stroke="#475569" strokeWidth="2" />

                {/* Kitchen Area (Left 7ft & Right 7ft) */}
                <rect x="100" y="136" width="80" height="8" fill="#14b8a6" fillOpacity="0.2" />
                <rect x="180" y="136" width="80" height="8" fill="#14b8a6" fillOpacity="0.2" />
                <line x1="100" y1="130" x2="100" y2="145" stroke="#14b8a6" strokeWidth="2" />
                <line x1="260" y1="130" x2="260" y2="145" stroke="#14b8a6" strokeWidth="2" />
                <text x="100" y="156" fill="#14b8a6" fontSize="8" textAnchor="middle" fontFamily="monospace">廚房線 (7ft)</text>
                <text x="260" y="156" fill="#14b8a6" fontSize="8" textAnchor="middle" fontFamily="monospace">廚房線 (7ft)</text>

                {/* Net (34 inches at center = ~60px height) */}
                <line x1="180" y1="75" x2="180" y2="140" stroke="#ffffff" strokeWidth="3" />
                <line x1="175" y1="75" x2="185" y2="75" stroke="#f59e0b" strokeWidth="2" />
                <text x="180" y="68" fill="#f59e0b" fontSize="8" textAnchor="middle" fontFamily="monospace">網帶 34" (86.4cm)</text>

                {dinkQuality === 'PERFECT' ? (
                  <g>
                    {/* Perfect arc: Apex on left side, drops below 34" on right */}
                    <path d="M 85 110 Q 155 60 215 140" fill="none" stroke="#2dd4bf" strokeWidth="3" />
                    <circle cx="155" cy="72" r="5" fill="#f59e0b" />
                    <text x="155" y="55" fill="#f59e0b" fontSize="8" fontWeight="bold" textAnchor="middle">弧線頂點 (Apex)</text>
                    <text x="220" y="125" fill="#2dd4bf" fontSize="9" fontWeight="bold">過網下墜</text>
                    <text x="240" y="95" fill="#94a3b8" fontSize="8">迫使對手由下向上推</text>
                  </g>
                ) : (
                  <g>
                    {/* High float arc: Apex high over opponent court */}
                    <path d="M 85 110 Q 180 30 255 90" fill="none" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 3" />
                    <circle cx="210" cy="45" r="7" fill="#f43f5e" />
                    <text x="210" y="32" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">危險高球頂點</text>
                    <line x1="210" y1="45" x2="250" y2="140" stroke="#f43f5e" strokeWidth="2" />
                    <text x="265" y="65" fill="#f43f5e" fontSize="9" fontWeight="bold">對手高空暴扣 (Smash)!</text>
                  </g>
                )}
              </svg>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {PICKLEBALL_INFOGRAPHICS[0].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-teal-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 2: 14ft Firefight Volleys ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 font-bold block">
                {PICKLEBALL_INFOGRAPHICS[1].id} · {PICKLEBALL_INFOGRAPHICS[1].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[1].title_zh : PICKLEBALL_INFOGRAPHICS[1].title_en}
              </h4>
            </div>
            <Zap className="w-5 h-5 text-cyan-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[1].subtitle_zh : PICKLEBALL_INFOGRAPHICS[1].subtitle_en}
          </p>

          {/* 14ft Firefight Comparison Card */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-xl bg-nature-sky-50 dark:bg-cyan-950/30 border border-nature-sky-200 dark:border-cyan-500/40 text-nature-sky-950 dark:text-cyan-200 space-y-1.5">
              <strong className="text-cyan-300 block font-bold">✓ 推壓截擊 (Punch Volley)</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                拍面固定在胸前 30cm，零後擺引拍。像出短拳般向前平推 10cm，鎖死手腕，0.25 秒內即時借力彈擊。
              </p>
            </div>

            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/40 text-rose-950 dark:text-rose-200 space-y-1.5">
              <strong className="text-rose-300 block font-bold">✕ 傳統大引拍 (Big Wind-up)</strong>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                手肘向後拉開蓄力需耗時 0.22 秒，在 14ft 近身對峙中必然揮拍遲到，打在拍框或直接遭追身球擊中。
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs flex items-center justify-between font-mono">
            <span className="text-slate-400">網前拍頭黃金高度 (Ready Position)：</span>
            <span className="text-amber-400 font-bold">10:00–11:00 胸口位 (Paddle Up)</span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {PICKLEBALL_INFOGRAPHICS[1].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-cyan-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 3: Perforated Ball & Honeycomb Core ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block">
                {PICKLEBALL_INFOGRAPHICS[2].id} · {PICKLEBALL_INFOGRAPHICS[2].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[2].title_zh : PICKLEBALL_INFOGRAPHICS[2].title_en}
              </h4>
            </div>
            <Layers className="w-5 h-5 text-amber-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[2].subtitle_zh : PICKLEBALL_INFOGRAPHICS[2].subtitle_en}
          </p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-amber-400 block font-bold">40 孔室外球 vs 26 孔室內球</strong>
              <p className="text-[11px] text-slate-400">
                40 孔微孔抗風、飛行速度快；26 孔大孔氣阻高、飛行慢。穿孔使內部產生微亂流，阻力高於實心球 40%。
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <strong className="text-teal-400 block font-bold">16mm 聚丙烯蜂巢厚芯 (PP Core)</strong>
              <p className="text-[11px] text-slate-400">
                六角蜂巢結構吸收 100–300 Hz 有害共振，持球時間達 2.8ms，保護手腕與網球肘。
              </p>
            </div>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {PICKLEBALL_INFOGRAPHICS[2].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Infographic 4: Fall Prevention & Longevity ── */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 text-slate-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">
                {PICKLEBALL_INFOGRAPHICS[3].id} · {PICKLEBALL_INFOGRAPHICS[3].metrics_badge}
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">
                {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[3].title_zh : PICKLEBALL_INFOGRAPHICS[3].title_en}
              </h4>
            </div>
            <HeartPulse className="w-5 h-5 text-emerald-400 shrink-0" />
          </div>

          <p className="text-xs text-slate-400">
            {language === 'zh-TW' ? PICKLEBALL_INFOGRAPHICS[3].subtitle_zh : PICKLEBALL_INFOGRAPHICS[3].subtitle_en}
          </p>

          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/50 text-rose-950 dark:text-rose-200 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 text-rose-400 font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>致命跌倒防範鐵律：嚴禁「臉朝前倒退跑 (Backpedaling)」</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              對手打出後場高挑球時，仰面後退會使重心落於腳後跟後方，極易失衡仰摔（撞擊力 80–120 G）或斷裂阿基里斯腱。
              <strong className="text-emerald-300 block mt-1">
                唯一正確生還動作：持拍腳向後側向轉身 90° (Drop Step)，改以「側身交叉步」追球！寧可失球，絕不仰摔。
              </strong>
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">哥本哈根心臟研究 (CCHS 25年追蹤)：</span>
            <span className="text-emerald-400 font-bold">+9.7 年預期壽命提升</span>
          </div>

          <ul className="space-y-1.5 text-xs text-slate-300">
            {PICKLEBALL_INFOGRAPHICS[3].core_takeaways_zh.map((point, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
