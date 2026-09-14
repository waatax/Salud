import React, { useState } from 'react';
import { BREATHWORK_PROTOCOLS, MENTAL_TOPICS, STRESS_MYTH_BUSTERS } from '../../data/mentalHealthData';
import { SimBreathwork } from '../simulators/SimBreathwork';
import {
  FigAlveolarSigh,
  FigAutonomicBalance,
  FigResonanceCoherence,
  FigBohrEffectLoop,
  FigPanicTriageTree
} from '../figures/MentalFigures';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Brain,
  Wind,
  Heart,
  Activity,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  BookOpen,
  HelpCircle,
  Clock,
  Compass,
  Zap,
  CheckCircle2,
  FileText
} from 'lucide-react';

export type MentalTab = 'SIMULATOR' | 'NEUROBIOLOGY' | 'PROTOCOLS' | 'VAGUS_HRV' | 'CAPNOMETRY' | 'TRIAGE';

export const MentalHealthHub: React.FC = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<MentalTab>('SIMULATOR');
  const [expandedTopic, setExpandedTopic] = useState<string | null>('MT-01');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* ── Grand Hero Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-slate-900/90 to-purple-500/15 p-6 sm:p-10 shadow-xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Salud 旗艦支柱 · 心理健康、情緒壓力與實證呼吸總樞紐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
              {language === 'zh-TW'
                ? '身心神經調控、迷走神經張力與呼吸科學'
                : 'Mental Health, Autonomic Vagal Dynamics & Respiration Science'}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              拒絕「你想太多」的空泛說教，回歸神經生理與生物化學本質。由{' '}
              <span className="font-semibold text-cyan-400">EC-25 臨床心理學家</span>、
              <span className="font-semibold text-purple-400">EC-26 胸腔神經生理權威</span> 與{' '}
              <span className="font-semibold text-emerald-400">EC-27 生理回饋教練</span> 具名審定。整合史丹佛大學 2023 年{' '}
              <span className="font-mono text-cyan-300">Cell Reports Medicine</span> 循環生理嘆氣臨床試驗、0.1 Hz 自律神經共振與波耳效應，
              為你的自律神經系統提供秒級啟動的「迷走神經煞車」！
            </p>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-cyan-400">5 大</div>
              <div className="text-[10px] text-slate-400">實證呼吸協定</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-400">0.1 Hz</div>
              <div className="text-[10px] text-slate-400">黃金共振頻率</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-purple-400">100%</div>
              <div className="text-[10px] text-slate-400">同行評審文獻</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-amber-400">Grade A</div>
              <div className="text-[10px] text-slate-400">最高臨床推薦</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'SIMULATOR'
              ? 'bg-cyan-500 text-white font-bold border-cyan-600 shadow-md ring-2 ring-cyan-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-cyan-400'
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>呼吸引導儀 (Simulator)</span>
        </button>

        <button
          onClick={() => setActiveTab('PROTOCOLS')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PROTOCOLS'
              ? 'bg-emerald-500 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-emerald-400'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>五大實證呼吸手冊</span>
        </button>

        <button
          onClick={() => setActiveTab('NEUROBIOLOGY')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'NEUROBIOLOGY'
              ? 'bg-purple-500 text-white font-bold border-purple-600 shadow-md ring-2 ring-purple-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-purple-400'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>HPA 軸與壓力機轉</span>
        </button>

        <button
          onClick={() => setActiveTab('VAGUS_HRV')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'VAGUS_HRV'
              ? 'bg-indigo-500 text-white font-bold border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-400'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>迷走神經與 HRV 共振</span>
        </button>

        <button
          onClick={() => setActiveTab('CAPNOMETRY')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'CAPNOMETRY'
              ? 'bg-pink-500 text-white font-bold border-pink-600 shadow-md ring-2 ring-pink-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-pink-400'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>波耳效應與血氣平衡</span>
        </button>

        <button
          onClick={() => setActiveTab('TRIAGE')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'TRIAGE'
              ? 'bg-red-500 text-white font-bold border-red-600 shadow-md ring-2 ring-red-500/20'
              : 'bg-white/80 dark:bg-salud-dark-surface border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-red-400'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span>恐慌分流與紅旗安全閘</span>
        </button>
      </div>

      {/* ── TAB 1: SIMULATOR (呼吸互動引導儀) ── */}
      {activeTab === 'SIMULATOR' && (
        <div className="space-y-6 animate-fade-in">
          <SimBreathwork />
          <FigAlveolarSigh />
        </div>
      )}

      {/* ── TAB 2: PROTOCOLS (五大呼吸手冊) ── */}
      {activeTab === 'PROTOCOLS' && (
        <div className="space-y-6 animate-fade-in">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span>五大實證呼吸處方完全手冊 (Clinical Respiration Protocols)</span>
              </h3>
              <p className="text-xs font-mono text-slate-500">
                每一項協定皆標註精確時間參數、微觀生化受體、臨床適應症與反向安全邊界
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {BREATHWORK_PROTOCOLS.map((protocol) => (
              <div
                key={protocol.id}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                        {protocol.id}
                      </span>
                      <EvidenceBadge grade={protocol.evidence_grade} />
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-600 dark:text-slate-300">
                        循環時間：{protocol.total_cycle_sec} 秒
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {protocol.name_zh}
                    </h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                      💡 {protocol.tagline_zh}
                    </p>
                  </div>

                  {/* Timing Pill Badges */}
                  <div className="flex items-center gap-1.5 font-mono text-xs shrink-0">
                    <span className="px-2 py-1 rounded-lg bg-cyan-50 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                      吸 {protocol.timing_sec.inhale_1}s {protocol.timing_sec.inhale_2 ? `+ 補 ${protocol.timing_sec.inhale_2}s` : ''}
                    </span>
                    {protocol.timing_sec.hold_inhale ? (
                      <span className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        閉 {protocol.timing_sec.hold_inhale}s
                      </span>
                    ) : null}
                    <span className="px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      呼 {protocol.timing_sec.exhale}s
                    </span>
                    {protocol.timing_sec.hold_exhale ? (
                      <span className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        空 {protocol.timing_sec.hold_exhale}s
                      </span>
                    ) : null}
                  </div>
                </div>

                {/* Primary mechanism description */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-200 font-display">
                    🔬 微觀生理與生化機轉：
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {protocol.primary_mechanism_zh}
                  </p>
                </div>

                {/* Biomolecules tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-slate-500 font-bold">調控靶點：</span>
                  {protocol.biochemical_targets.map((tgt, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 font-mono text-[10px] text-slate-700 dark:text-slate-300"
                    >
                      {tgt}
                    </span>
                  ))}
                </div>

                {/* Grid: Indications vs Contraindications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                    <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>臨床適應時機</span>
                    </span>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                      {protocol.clinical_indications_zh.map((ind, idx) => (
                        <li key={idx}>{ind}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 space-y-1">
                    <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span>適用邊界與禁忌</span>
                    </span>
                    <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 list-disc list-inside">
                      {protocol.contraindications_zh.map((c, idx) => (
                        <li key={idx}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Expert Pearl & Citation */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-700 dark:text-slate-300 italic">
                    {protocol.clinical_pearl_zh}
                  </div>
                  <span className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 shrink-0">
                    📜 {protocol.research_citation.journal} ({protocol.research_citation.year})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: NEUROBIOLOGY (HPA 軸與壓力機轉) ── */}
      {activeTab === 'NEUROBIOLOGY' && (
        <div className="space-y-6 animate-fade-in">
          <FigAutonomicBalance />

          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span>神經壓力生物學深度專題</span>
            </h3>

            {MENTAL_TOPICS.filter((t) => t.category === 'NEUROBIOLOGY_HPA' || t.category === 'AMYGDALA_DOWNREG').map(
              (topic) => (
                <div
                  key={topic.id}
                  className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-purple-600">{topic.id}</span>
                    <EvidenceBadge grade={topic.evidence_grade} />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                    {topic.title_zh}
                  </h4>
                  <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">
                    💡 {topic.one_liner_zh}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-900 dark:text-white">生理路徑解構：</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                      {topic.key_mechanisms_zh.map((m, idx) => (
                        <li key={idx}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/40 text-xs space-y-1">
                    <span className="font-bold text-purple-800 dark:text-purple-300">實證生活處方：</span>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                      {topic.actionable_rules_zh.map((r, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* ── TAB 4: VAGUS_HRV (迷走神經與 0.1Hz 共振) ── */}
      {activeTab === 'VAGUS_HRV' && (
        <div className="space-y-6 animate-fade-in">
          <FigResonanceCoherence />

          {MENTAL_TOPICS.filter((t) => t.category === 'VAGAL_BRAKE_HRV').map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-600">{topic.id}</span>
                <EvidenceBadge grade={topic.evidence_grade} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {topic.title_zh}
              </h4>
              <p className="text-xs text-indigo-700 dark:text-indigo-300 font-medium">
                💡 {topic.one_liner_zh}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">感壓反射與迷走煞車機轉：</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {topic.key_mechanisms_zh.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/40 text-xs space-y-1">
                <span className="font-bold text-indigo-800 dark:text-indigo-300">HRV 量化訓練指引：</span>
                <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                  {topic.actionable_rules_zh.map((r, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold">•</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 5: CAPNOMETRY (波耳效應與血氣平衡) ── */}
      {activeTab === 'CAPNOMETRY' && (
        <div className="space-y-6 animate-fade-in">
          <FigBohrEffectLoop />

          {MENTAL_TOPICS.filter((t) => t.category === 'BOHR_CAPNOMETRY').map((topic) => (
            <div
              key={topic.id}
              className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-rose-600">{topic.id}</span>
                <EvidenceBadge grade={topic.evidence_grade} />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {topic.title_zh}
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">
                💡 {topic.one_liner_zh}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="font-bold text-slate-900 dark:text-white">氣體動力學生理機轉：</span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
                  {topic.key_mechanisms_zh.map((m, idx) => (
                    <li key={idx}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── TAB 6: TRIAGE (驚恐分流與紅旗安全閘) ── */}
      {activeTab === 'TRIAGE' && (
        <div className="space-y-6 animate-fade-in">
          <FigPanicTriageTree />

          {/* Myths Busting Grid */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-500" />
              <span>常見情緒壓力與呼吸偏方迷思粉碎 (Myth Busters)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {STRESS_MYTH_BUSTERS.map((m) => (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-red-500 font-bold text-sm shrink-0">❌ 迷思：</span>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-200">{m.myth}</span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                    <span className="text-emerald-500 font-bold shrink-0">✓ 真相：</span>
                    <span>{m.reality}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 text-[11px] text-cyan-800 dark:text-cyan-300">
                    <strong>正確應對：</strong> {m.solution}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
