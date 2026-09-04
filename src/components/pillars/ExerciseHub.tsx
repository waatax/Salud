import React, { useState } from 'react';
import { EXERCISE_TOPICS } from '../../data/exerciseData';
import { RUNNING_TOPICS, MOUNTAINEERING_TOPICS } from '../../data/sportsScienceData';
import { SimExerciseZones } from '../simulators/SimExerciseZones';
import { SimRunningCalculator } from '../simulators/SimRunningCalculator';
import { SimMountaineeringAltitude } from '../simulators/SimMountaineeringAltitude';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import {
  Activity,
  Dumbbell,
  HeartPulse,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Mountain,
  Zap,
  Compass,
  Gauge
} from 'lucide-react';

interface Props {
  initialSubTab?: 'PHYSIOLOGY' | 'RUNNING' | 'MOUNTAINEERING';
}

export const ExerciseHub: React.FC<Props> = ({ initialSubTab = 'PHYSIOLOGY' }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'PHYSIOLOGY' | 'RUNNING' | 'MOUNTAINEERING'>(initialSubTab);

  const [expandedTopic, setExpandedTopic] = useState<string | null>('EX-01');
  const [expandedRunningTopic, setExpandedRunningTopic] = useState<string | null>('RUN-01');
  const [expandedMntTopic, setExpandedMntTopic] = useState<string | null>('MNT-01');

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-salud-cyan/40 bg-gradient-to-br from-cyan-100/70 via-salud-light-card/80 to-slate-100 dark:from-cyan-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-cyan/40 bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300">
            Health Pillar 02 · 運動與運動科學總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '運動生理學與專項運動科學' : 'Exercise Physiology & Specialized Sports Science'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            運動是人體最強大的多靶點生理藥物。本支柱整合「基礎心肺與骨骼肌適應」、以及專項運動科學欄位：「跑步運動科學 (步頻、配速、雙通道補給)」與「登山高海拔科學 (低氧生理、AMS/HAPE/HACE 急症、負重卸力與失溫防線)」。
          </p>
        </div>
      </div>

      {/* ── Sub-category Switcher (運動科學欄位分頁) ── */}
      <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 text-xs font-mono">
        <button
          onClick={() => setActiveTab('PHYSIOLOGY')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'PHYSIOLOGY'
              ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4" />
          <span>{language === 'zh-TW' ? '基礎運動生理學' : 'General Physiology'}</span>
        </button>

        <button
          onClick={() => setActiveTab('RUNNING')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'RUNNING'
              ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{language === 'zh-TW' ? '跑步運動科學 (Running)' : 'Running Science'}</span>
        </button>

        <button
          onClick={() => setActiveTab('MOUNTAINEERING')}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === 'MOUNTAINEERING'
              ? 'bg-purple-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mountain className="w-4 h-4" />
          <span>{language === 'zh-TW' ? '登山與高海拔科學 (Hiking)' : 'Mountaineering Science'}</span>
        </button>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════════════════
          TAB 1: 基礎運動生理學 (General Exercise Physiology)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'PHYSIOLOGY' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Karvonen Heart Rate Reserve & Metabolic Calculator */}
          <section className="space-y-3">
            <SimExerciseZones />
          </section>

          {/* Sub-module 2: Core Exercise Topics */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-salud-cyan" />
                運動醫學與體能處方五大核心領域 (Core Exercise Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                基於美國運動醫學會 (ACSM) 與最新人體運動生理學實證
              </p>
            </div>

            <div className="space-y-3.5">
              {EXERCISE_TOPICS.map((topic) => {
                const isExpanded = expandedTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-salud-cyan/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-salud-cyan">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-salud-cyan font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Key Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-salud-cyan font-bold block">
                            深層生理生化適應機轉 (Biochemical Adaptations)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.key_mechanisms_zh : topic.key_mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-cyan font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Guidelines */}
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實踐課表與安全執行指引 (Action Guidelines)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.action_guidelines_zh : topic.action_guidelines_en).map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════════════
          TAB 2: 跑步運動科學 (Running Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'RUNNING' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Running Biomechanics & Pacing Calculator */}
          <section className="space-y-3">
            <SimRunningCalculator />
          </section>

          {/* Sub-module 2: Running Science Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Zap className="w-4 h-4 text-salud-amber" />
                跑步運動科學五大關鍵維度 (Running Science Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                生物力學步頻減震、乳酸門檻配速、跑步經濟性、雙通道果膠補給與運動傷害防護
              </p>
            </div>

            <div className="space-y-3.5">
              {RUNNING_TOPICS.map((topic) => {
                const isExpanded = expandedRunningTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-salud-amber/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-salud-amber">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-salud-amber font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedRunningTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Key Principles */}
                        <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                          <strong className="text-salud-amber font-bold block">
                            核心生理與生物力學原理 (Biomechanical Principles)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.key_principles_zh : topic.key_principles_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-amber font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Quantitative Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-salud-cyan font-bold block">
                            量化力學與耐力生理數據 (Quantitative Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_data_zh : topic.biomechanical_data_en).map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-cyan font-bold">📊</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰訓練課表與處方 (Action Protocols)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.action_protocols_zh : topic.action_protocols_en).map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════════════════
          TAB 3: 登山與高海拔科學 (Mountaineering & High Altitude Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'MOUNTAINEERING' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: High Altitude Hypoxia & LLS Simulator */}
          <section className="space-y-3">
            <SimMountaineeringAltitude />
          </section>

          {/* Sub-module 2: Mountaineering Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Mountain className="w-4 h-4 text-purple-400" />
                登山與高海拔醫學五大生存防線 (Mountaineering Medicine Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                氣壓低氧生理、AMS/HAPE/HACE 急症辨識、預防用藥機轉、雙杖負重力學與失溫防線
              </p>
            </div>

            <div className="space-y-3.5">
              {MOUNTAINEERING_TOPICS.map((topic) => {
                const isExpanded = expandedMntTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-purple-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-purple-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-purple-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedMntTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Pathophysiology */}
                        <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1.5">
                          <strong className="text-purple-300 font-bold block">
                            病理生理機轉 (Pathophysiological Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.pathophysiology_zh : topic.pathophysiology_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-purple-400 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Clinical Criteria / Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            臨床診斷指標與力學數據 (Clinical Criteria & Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? (topic.clinical_criteria_zh || (topic as any).biomechanical_data_zh || []) : (topic.clinical_criteria_en || (topic as any).biomechanical_data_en || [])).map((c: string, i: number) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🩺</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Survival & Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-1.5">
                          <strong className="text-red-300 font-bold block">
                            高山生存守則與緊急處置 (Survival & Action Protocols)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? (topic.survival_protocols_zh || (topic as any).action_protocols_zh || []) : (topic.survival_protocols_en || (topic as any).action_protocols_en || [])).map((s: string, i: number) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-red-400 font-bold">⚠</span>
                                <span>{s}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
