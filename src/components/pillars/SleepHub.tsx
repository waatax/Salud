import React, { useState } from 'react';
import {
  SLEEP_STAGES,
  SLEEP_TOPICS,
  COMMON_CAFFEINE_SOURCES,
  CYP1A2_METABOLIC_PROFILES,
  CBTI_TITRATION_RULES,
  STOP_BANG_QUESTIONS,
} from '../../data/sleepData';
import { SleepSubTab } from '../../types';
import { SimCircadian } from '../simulators/SimCircadian';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Brain,
  Moon,
  Clock,
  Coffee,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Activity,
  Calculator,
  ShieldCheck,
  AlertOctagon,
  HelpCircle,
  Stethoscope,
  ArrowRight,
  Droplets,
  Eye,
} from 'lucide-react';

export const SleepHub: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<SleepSubTab>('OVERVIEW');
  const [expandedTopic, setExpandedTopic] = useState<string | null>('SL-02');

  // ── Caffeine Pharmacokinetics Simulator State ──
  const [caffeineDose, setCaffeineDose] = useState<number>(150);
  const [intakeHour, setIntakeHour] = useState<number>(14); // 14:00
  const [bedHour, setBedHour] = useState<number>(23); // 23:00
  const [cyp1a2Type, setCyp1a2Type] = useState<'FAST' | 'AVERAGE' | 'SLOW'>('AVERAGE');

  // Calculate elapsed hours
  let hoursElapsed = bedHour - intakeHour;
  if (hoursElapsed < 0) hoursElapsed += 24;

  const halfLife = CYP1A2_METABOLIC_PROFILES[cyp1a2Type].halfLifeHours;
  const residualCaffeine = Number((caffeineDose * Math.pow(0.5, hoursElapsed / halfLife)).toFixed(1));
  const receptorOccupancy = Math.min(
    95,
    Math.round((residualCaffeine / (residualCaffeine + 45)) * 100)
  );
  const swsDeficitMinutes = Math.min(45, Math.round(residualCaffeine * 0.25));
  const latencyDelayMinutes = Math.min(40, Math.round(residualCaffeine * 0.2));

  // ── CBT-I Sleep Efficiency Calculator State ──
  const [bedtimeHour, setBedtimeHour] = useState<number>(23);
  const [bedtimeMin, setBedtimeMin] = useState<number>(0);
  const [wakeHour, setWakeHour] = useState<number>(7);
  const [wakeMin, setWakeMin] = useState<number>(0);
  const [sleepOnsetLatency, setSleepOnsetLatency] = useState<number>(35); // minutes
  const [wasoMinutes, setWasoMinutes] = useState<number>(40); // wake after sleep onset

  let timeInBedMins = (wakeHour * 60 + wakeMin) - (bedtimeHour * 60 + bedtimeMin);
  if (timeInBedMins < 0) timeInBedMins += 24 * 60;
  const totalSleepMins = Math.max(0, timeInBedMins - sleepOnsetLatency - wasoMinutes);
  const sleepEfficiency = timeInBedMins > 0 ? Math.round((totalSleepMins / timeInBedMins) * 100) : 0;

  // ── STOP-BANG Screening State ──
  const [stopBangAnswers, setStopBangAnswers] = useState<Record<string, boolean>>({});
  const toggleStopBang = (id: string) => {
    setStopBangAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };
  const stopBangScore = Object.values(stopBangAnswers).filter(Boolean).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* ── Grand Hero Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-300/80 dark:border-purple-800/60 bg-gradient-to-br from-purple-50 via-white to-nature-sky-50/50 dark:from-purple-950/80 dark:via-slate-900/95 dark:to-slate-950 p-6 sm:p-10 shadow-sm dark:shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100/90 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-700/60 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>Salud 旗艦支柱 · 睡眠神經修復專科總樞紐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
              <span>睡眠神經生理、超晝夜架構、膠淋巴大腦沖刷與 CBT-I</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              睡眠不是關機，而是一場大腦唯二進行結構性排毒與突觸重組的高代謝交響樂！全面整合{' '}
              <span className="text-purple-800 dark:text-purple-300 font-bold">多導睡眠圖 (PSG) 4 階段超晝夜週期</span>、
              <span className="text-teal-800 dark:text-cyan-400 font-bold">慢波深睡期 AQP4 膠淋巴腦排毒</span>、
              <span className="text-amber-800 dark:text-amber-400 font-bold">腺苷-咖啡因受體競爭動態試算</span>、
              <span className="text-indigo-800 dark:text-indigo-400 font-bold">第一線失眠 CBT-I 睡眠效率試算</span> 與{' '}
              <span className="text-rose-800 dark:text-rose-400 font-bold">STOP-BANG 睡眠呼吸中止症篩檢</span>！
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-purple-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-purple-700 dark:text-purple-400">90 min</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">超晝夜週期循環</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-purple-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-teal-700 dark:text-teal-400">+60%</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">深睡細胞間隙擴張</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-purple-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-amber-700 dark:text-amber-400">5.5h</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">咖啡因平均半衰期</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/80 border border-purple-200 dark:border-white/10 shadow-xs text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-700 dark:text-emerald-400">&gt;85%</div>
              <div className="text-[10px] text-slate-600 dark:text-slate-400 font-medium">CBT-I 最佳睡眠效率</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-purple-200/80 dark:border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-purple-600 text-white font-extrabold border-purple-500 shadow-md ring-2 ring-purple-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-purple-400 hover:bg-purple-50/40'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>專區綜覽與 PSG 臨床分期</span>
        </button>

        <button
          onClick={() => setActiveTab('GLYMPHATIC')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'GLYMPHATIC'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/40'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>膠淋巴系統大腦自潔</span>
        </button>

        <button
          onClick={() => setActiveTab('CAFFEINE_SIM')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'CAFFEINE_SIM'
              ? 'bg-amber-600 text-white font-bold border-amber-500 shadow-md ring-2 ring-amber-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-amber-400 hover:bg-amber-50/40'
          }`}
        >
          <Coffee className="w-4 h-4" />
          <span>腺苷-咖啡因清除模擬器</span>
        </button>

        <button
          onClick={() => setActiveTab('CBTI_CALC')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'CBTI_CALC'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/40'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>CBT-I 睡眠效率試算器</span>
        </button>

        <button
          onClick={() => setActiveTab('OSA_SCREEN')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OSA_SCREEN'
              ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md ring-2 ring-rose-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-rose-400 hover:bg-rose-50/40'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          <span>STOP-BANG 呼吸中止症快篩</span>
        </button>

        <button
          onClick={() => setActiveTab('CIRCADIAN')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'CIRCADIAN'
              ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/90 dark:bg-slate-900 border-purple-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-indigo-400 hover:bg-indigo-50/40'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>晝夜節律生物鐘模擬</span>
        </button>
      </div>

      {/* ── Sub-Tab 1: OVERVIEW & PSG STAGES ── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white font-display">
              <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>多導睡眠圖 (Polysomnography, PSG) 四階段臨床分期金標準</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              整夜睡眠並非均勻恆定，而是由 4–6 個約 90–110 分鐘的超晝夜週期（Ultradian Cycles）精密交織而成。前半夜是慢波深睡（N3 SWS）重兵部署期，主導骨骼肌生長激素合成與大腦排毒；後半夜則轉向快速動眼期（REM）主導，負責情緒去敏化與複雜記憶突觸重組。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              {SLEEP_STAGES.map((st) => (
                <div
                  key={st.stage}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-purple-50/40 dark:bg-slate-950/60 shadow-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400">
                      {st.stage.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono text-[10px] font-bold border border-purple-200 dark:border-purple-800/50">
                      {st.pct_of_night}
                    </span>
                  </div>
                  <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                    {language === 'zh-TW' ? st.name_zh.split(' · ')[1] : st.name_en.split(' · ')[1]}
                  </strong>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {language === 'zh-TW' ? st.physiological_function_zh : st.physiological_function_en}
                  </p>
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-500 font-mono">
                    腦波特徵：{st.brain_wave_pattern}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Sleep Topics */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <Stethoscope className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span>睡眠神經醫學五大核心專題與實證機制</span>
            </h3>

            <div className="space-y-3">
              {SLEEP_TOPICS.map((topic) => {
                const isExpanded = expandedTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-3 transition-all hover:border-purple-300"
                  >
                    <div
                      className="flex items-start justify-between gap-3 cursor-pointer"
                      onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs font-sans animate-fade-in">
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
                          <strong className="text-slate-800 dark:text-slate-200 block font-mono">🔬 生理與分子機轉：</strong>
                          <ul className="space-y-1 text-slate-600 dark:text-slate-300 list-disc pl-4 leading-relaxed">
                            {topic.mechanisms_zh.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 space-y-1.5">
                          <strong className="text-purple-900 dark:text-purple-300 block font-mono">📋 臨床生活型態行動準則：</strong>
                          <ul className="space-y-1 text-purple-950 dark:text-purple-200 list-disc pl-4 leading-relaxed">
                            {topic.actionable_rules_zh.map((r, i) => (
                              <li key={i}>{r}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 2: GLYMPHATIC ── */}
      {activeTab === 'GLYMPHATIC' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-3">
            <h3 className="text-lg font-bold text-teal-900 dark:text-teal-200 font-display flex items-center gap-2">
              <Droplets className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>膠淋巴系統 (Glymphatic System)：大腦慢波深睡期專屬「生化洗碗機」</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              大腦是全身代謝最旺盛的器官，卻因「血腦屏障 (BBB)」阻隔而完全缺乏外周常規淋巴管道。2012 年羅徹斯特大學 Maiken
              Nedergaard 教授團隊重大發現：大腦在慢波深睡（N3 SWS）時，星狀膠質細胞體積收縮，細胞間質體積劇增 60%，使得腦脊髓液 (CSF) 能沿動脈周隙湧入，強力洗刷 β-類澱粉蛋白與過度磷酸化 Tau 蛋白！
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <span className="text-3xl font-display font-extrabold text-teal-600 dark:text-teal-400 block">+60%</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">間隙體積劇增</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                只有在 Delta 慢波深睡時，膠質細胞去極化收縮，組織水流阻力驟降，允許液體貫穿實質流動。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <span className="text-3xl font-display font-extrabold text-cyan-600 dark:text-cyan-400 block">AQP4</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">水通道蛋白極化</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                聚集在星狀膠質細胞血管終足 (Endfeet) 上，扮演促進 CSF-ISF 高速對流交換的分子閘門。
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-200 dark:border-slate-800 text-center space-y-2 shadow-xs">
              <span className="text-3xl font-display font-extrabold text-indigo-600 dark:text-indigo-400 block">右側臥</span>
              <strong className="text-sm font-bold text-slate-900 dark:text-white block">姿勢動力學優勢</strong>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                臨床核磁共振動態造影顯示：側臥位（尤其是右側臥）相較於仰臥或俯臥，能最大化靜脈回流與腦液對流效率。
              </p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-3 font-sans text-xs">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-display">
              保護大腦膠淋巴排毒功能的三大黃金生活法則
            </h4>
            <div className="space-y-2 text-slate-700 dark:text-slate-300 leading-relaxed">
              <p><strong>① 睡前 3 小時嚴格禁食：</strong>進食後的高胰島素血症與腸胃蠕動會強烈延遲下視丘 N3 慢波深睡的啟動，使膠淋巴清洗窗口大幅縮水。</p>
              <p><strong>② 杜絕睡前飲酒（Chapter A）：</strong>酒精雖具鎮靜助眠假象，但其代謝產物乙醛會嚴重碎裂後續睡眠架構，抑制 AQP4 蛋白活性，隔晨大腦代謝毒素反而倍增。</p>
              <p><strong>③ 日間 Zone 2 規律有氧訓練：</strong>長期規律心肺耐力訓練能促進腦血管搏動增強，提升星狀膠質細胞終足 AQP4 的定向分佈極化率。</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 3: CAFFEINE_SIM ── */}
      {activeTab === 'CAFFEINE_SIM' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-amber-300/80 dark:border-amber-700/60 shadow-lg space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Coffee className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <span>腺苷-咖啡因受體競爭與清除動態模擬器 (Adenosine-Caffeine Engine)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              基於一級消除藥物動力學與 CYP1A2 肝臟代謝表型，精確推算就寢時大腦腺苷 A1/A2A 受體佔據率與深睡損失
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">常見飲品快速預設</label>
              <select
                onChange={(e) => setCaffeineDose(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              >
                {COMMON_CAFFEINE_SOURCES.map((src) => (
                  <option key={src.name_zh} value={src.doseMg}>
                    {src.name_zh} ({src.doseMg}mg)
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">攝取劑量 (Caffeine Dose, mg)</label>
              <input
                type="number"
                value={caffeineDose}
                onChange={(e) => setCaffeineDose(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">攝取時間 vs 就寢時間</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={intakeHour}
                  onChange={(e) => setIntakeHour(Number(e.target.value))}
                  className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                >
                  {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((h) => (
                    <option key={h} value={h}>{h}:00</option>
                  ))}
                </select>
                <select
                  value={bedHour}
                  onChange={(e) => setBedHour(Number(e.target.value))}
                  className="p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950"
                >
                  {[21, 22, 23, 24, 1, 2].map((h) => (
                    <option key={h} value={h}>{h}:00 就寢</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">CYP1A2 肝臟代謝基因型</label>
              <select
                value={cyp1a2Type}
                onChange={(e) => setCyp1a2Type(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white"
              >
                <option value="FAST">快代謝型 (半衰期 3.5h)</option>
                <option value="AVERAGE">一般常人型 (半衰期 5.5h)</option>
                <option value="SLOW">慢代謝型 (半衰期 8.5h)</option>
              </select>
            </div>
          </div>

          {/* Simulation Output Dashboard */}
          <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-4 font-sans text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">就寢時血液殘留量</span>
                <strong className={`text-base font-extrabold ${residualCaffeine > 50 ? 'text-rose-600' : 'text-amber-600'}`}>
                  {residualCaffeine} mg
                </strong>
                <span className="text-[10px] text-slate-500 block">經過 {hoursElapsed} 小時消除</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">腺苷 A1/A2A 阻斷率</span>
                <strong className={`text-base font-extrabold ${receptorOccupancy > 40 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {receptorOccupancy}%
                </strong>
                <span className="text-[10px] text-slate-500 block">睡意神經訊號被遮蔽</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">N3 慢波深睡預估縮減</span>
                <strong className={`text-base font-extrabold ${swsDeficitMinutes > 15 ? 'text-rose-600' : 'text-slate-700 dark:text-slate-200'}`}>
                  約 -{swsDeficitMinutes} 分鐘
                </strong>
                <span className="text-[10px] text-slate-500 block">大腦排毒時間被剪除</span>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">入睡延遲懲罰</span>
                <strong className="text-base font-extrabold text-amber-700 dark:text-amber-400">
                  +{latencyDelayMinutes} 分鐘
                </strong>
                <span className="text-[10px] text-slate-500 block">腦波 Beta 頻段延長</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-sm text-amber-900 dark:text-amber-200">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>臨床藥理學結論與防護指引</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                即使你自覺「睡前喝咖啡照樣睡得著」，多導睡眠圖（PSG）仍證實殘留咖啡因會使中樞神經處於微亢奮狀態，破壞慢波深睡（N3 SWS）的同步化 Delta 腦波振幅達 20%–30%，導致隔日晨起依然感到疲憊。建議每日咖啡因最後攝取時點務必維持在{' '}
                <strong className="text-amber-800 dark:text-amber-300">就寢前 9–10 小時以上（如午後 14:00 前）</strong>。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 4: CBTI_CALC ── */}
      {activeTab === 'CBTI_CALC' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-emerald-300/80 dark:border-emerald-700/60 shadow-lg space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>失眠第一線治療：CBT-I 睡眠效率與限睡時長試算器 (CBT-I Engine)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              依據美國睡眠醫學會 (AASM) 臨床指引，透過「睡眠限制療法 (Sleep Restriction)」重構大腦對床鋪的條件反射
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">就寢時間 (上床躺平)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={bedtimeHour}
                  onChange={(e) => setBedtimeHour(Number(e.target.value))}
                  className="w-1/2 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-center"
                />
                <span className="self-center font-bold">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={bedtimeMin}
                  onChange={(e) => setBedtimeMin(Number(e.target.value))}
                  className="w-1/2 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-center"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">起床時間 (完全下床)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  min="0"
                  max="23"
                  value={wakeHour}
                  onChange={(e) => setWakeHour(Number(e.target.value))}
                  className="w-1/2 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-center"
                />
                <span className="self-center font-bold">:</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={wakeMin}
                  onChange={(e) => setWakeMin(Number(e.target.value))}
                  className="w-1/2 p-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-center"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">入睡延遲時間 (分鐘)</label>
              <input
                type="number"
                value={sleepOnsetLatency}
                onChange={(e) => setSleepOnsetLatency(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-700 dark:text-slate-300 font-bold">中途醒來總時長 (WASO, 分鐘)</label>
              <input
                type="number"
                value={wasoMinutes}
                onChange={(e) => setWasoMinutes(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Results Display */}
          <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 space-y-4 font-sans text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-center">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">臥床總時長 (TIB)</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-white">
                  {(timeInBedMins / 60).toFixed(1)} 小時 ({timeInBedMins}分)
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800">
                <span className="text-slate-400 text-[10px] block">實際入睡時長 (TST)</span>
                <strong className="text-base font-extrabold text-slate-900 dark:text-white">
                  {(totalSleepMins / 60).toFixed(1)} 小時 ({totalSleepMins}分)
                </strong>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 text-[10px] block">睡眠效率 (Sleep Efficiency)</span>
                <strong className={`text-xl font-extrabold ${sleepEfficiency >= 85 ? 'text-emerald-600' : sleepEfficiency >= 80 ? 'text-amber-600' : 'text-rose-600'}`}>
                  {sleepEfficiency}%
                </strong>
                <span className="text-[10px] text-slate-500 block">黃金目標 ≥ 85%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-emerald-300 dark:border-emerald-700/60 space-y-2">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-900 dark:text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>CBT-I 下週臥床時間動態微調指針</span>
              </div>

              {sleepEfficiency >= 85 ? (
                <p className="text-emerald-900 dark:text-emerald-200 font-bold">
                  ✓ 睡眠效率極佳（≥85%）！大腦已建立良好的「床鋪與快速入睡」連結。下週可將每晚臥床窗口提早 15–30 分鐘，逐步增加有效睡眠總量。
                </p>
              ) : sleepEfficiency >= 80 ? (
                <p className="text-amber-900 dark:text-amber-200 font-bold">
                  ⏳ 睡眠效率中等（80%–84%）。請繼續維持目前的臥床時間不變，鞏固睡眠驅動力。
                </p>
              ) : (
                <p className="text-rose-900 dark:text-rose-200 font-bold">
                  ⚠️ 睡眠效率偏低（&lt;80%）！你在床上清醒痛苦的時間過長，強化了焦慮條件反射。建議下週將臥床時間「限縮 15–30 分鐘」（推遲 15 分鐘上床），透過累積足夠的腺苷睡眠壓力來提升深睡緊湊度（最低臥床時間不可低於 5 小時安全底線）。
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 5: OSA_SCREEN ── */}
      {activeTab === 'OSA_SCREEN' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900/90 border border-rose-300/80 dark:border-rose-700/60 shadow-lg space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>STOP-BANG 阻塞型睡眠呼吸中止症 (OSA) 臨床篩檢量表</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
              由多倫多大學附設醫院開發、全球麻醉醫學會與胸腔睡眠專科廣泛採納的黃金篩檢工具
            </p>
          </div>

          <div className="space-y-2.5">
            {STOP_BANG_QUESTIONS.map((q) => {
              const isChecked = Boolean(stopBangAnswers[q.id]);
              return (
                <div
                  key={q.id}
                  onClick={() => toggleStopBang(q.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? 'bg-rose-50/90 dark:bg-rose-950/40 border-rose-400 dark:border-rose-600 text-slate-900 dark:text-white'
                      : 'bg-slate-50/70 dark:bg-slate-950/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {q.letter}
                    </span>
                    <div>
                      <strong className="text-xs sm:text-sm font-bold block">{q.title_zh}</strong>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">{q.description_zh}</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 rounded text-rose-600 shrink-0"
                  />
                </div>
              );
            })}
          </div>

          {/* STOP-BANG Score Output */}
          <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 space-y-3 font-sans text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200">
                總得分：<strong className="text-xl font-mono text-rose-700 dark:text-rose-400">{stopBangScore} / 8 分</strong>
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700 text-rose-800 dark:text-rose-300">
                {stopBangScore >= 5
                  ? '高度高危險群 (High Risk)'
                  : stopBangScore >= 3
                  ? '中度風險群 (Intermediate Risk)'
                  : '低風險群 (Low Risk)'}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-rose-300 dark:border-rose-700/60 space-y-1">
              <strong className="text-rose-900 dark:text-rose-200 block font-mono">🩺 睡眠專科就醫指引：</strong>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {stopBangScore >= 5 ? (
                  '您的得分 ≥ 5 分，患有中重度睡眠呼吸中止症（AHI ≥ 15）之機率超過 80%！長期夜間反覆缺氧是頑固性高血壓、心房顫動、胰島素阻抗與腦血管病變的頭號元兇。強烈建議即刻掛號胸腔內科或睡眠醫學中心，進行整夜多導睡眠檢查 (PSG)，並評估陽壓呼吸器 (CPAP) 或止鼾牙套治療。'
                ) : stopBangScore >= 3 ? (
                  '您的得分介於 3–4 分，屬於中度風險。若合併早晨頭痛、白天注意力渙散或心血管疾病，建議諮詢專科醫師安排居家睡眠檢查 (HST)。'
                ) : (
                  '您的得分為 0–2 分，阻塞型睡眠呼吸中止症風險較低。請持續維持正常體重與規律側臥睡眠。'
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Sub-Tab 6: CIRCADIAN ── */}
      {activeTab === 'CIRCADIAN' && (
        <div className="space-y-6">
          <SimCircadian />
        </div>
      )}
    </div>
  );
};
