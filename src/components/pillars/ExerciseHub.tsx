import React, { useState } from 'react';
import { EXERCISE_TOPICS } from '../../data/exerciseData';
import { RUNNING_TOPICS, MOUNTAINEERING_TOPICS } from '../../data/sportsScienceData';
import { CYCLING_TOPICS } from '../../data/cyclingData';
import { STRENGTH_TOPICS } from '../../data/strengthData';
import { MOBILITY_TOPICS } from '../../data/mobilityData';
import { SimExerciseZones } from '../simulators/SimExerciseZones';
import { SimRunningCalculator } from '../simulators/SimRunningCalculator';
import { SimMountaineeringAltitude } from '../simulators/SimMountaineeringAltitude';
import { SimCyclingPower } from '../simulators/SimCyclingPower';
import { SimStrength1RM } from '../simulators/SimStrength1RM';
import { SimMobilityScreen } from '../simulators/SimMobilityScreen';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { SportsDiscipline } from '../../types';
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
  Bike,
  Compass,
  Gauge,
  Flame,
  Scale
} from 'lucide-react';

interface Props {
  initialSubTab?: SportsDiscipline;
}

export const ExerciseHub: React.FC<Props> = ({ initialSubTab = 'PHYSIOLOGY' }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<SportsDiscipline>(initialSubTab);

  const [expandedTopic, setExpandedTopic] = useState<string | null>('EX-01');
  const [expandedRunningTopic, setExpandedRunningTopic] = useState<string | null>('RUN-01');
  const [expandedCyclingTopic, setExpandedCyclingTopic] = useState<string | null>('CYC-01');
  const [expandedMntTopic, setExpandedMntTopic] = useState<string | null>('MNT-01');
  const [expandedStrengthTopic, setExpandedStrengthTopic] = useState<string | null>('STR-01');
  const [expandedMobilityTopic, setExpandedMobilityTopic] = useState<string | null>('MOB-01');

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
            運動是人體最強大的多靶點生理藥物。本支柱橫跨 6 大核心領域：基礎生理心率儲備、跑步運動力學、自行車功率科學、登山高海拔醫學、肌肉抗阻重力訓練，以及神經伸展與筋骨筋膜力學。
          </p>
        </div>
      </div>

      {/* ── Sub-category Switcher (6大專項運動科學欄位分頁) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-slate-900/80 border border-slate-300/80 dark:border-slate-800 text-xs font-mono">
        {/* 1. Physiology */}
        <button
          onClick={() => setActiveTab('PHYSIOLOGY')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'PHYSIOLOGY'
              ? 'bg-salud-cyan text-black font-bold shadow-cyan-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <HeartPulse className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '運動生理' : 'Physiology'}</span>
        </button>

        {/* 2. Running */}
        <button
          onClick={() => setActiveTab('RUNNING')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'RUNNING'
              ? 'bg-salud-amber text-black font-bold shadow-warm-glow'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '跑步科學' : 'Running'}</span>
        </button>

        {/* 3. Cycling */}
        <button
          onClick={() => setActiveTab('CYCLING')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'CYCLING'
              ? 'bg-blue-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bike className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '自行車' : 'Cycling'}</span>
        </button>

        {/* 4. Mountaineering */}
        <button
          onClick={() => setActiveTab('MOUNTAINEERING')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'MOUNTAINEERING'
              ? 'bg-purple-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Mountain className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '登山科學' : 'Mountaineer'}</span>
        </button>

        {/* 5. Strength Training */}
        <button
          onClick={() => setActiveTab('STRENGTH_TRAINING')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'STRENGTH_TRAINING'
              ? 'bg-emerald-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Dumbbell className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '肌肉重訓' : 'Strength'}</span>
        </button>

        {/* 6. Mobility & Fascia */}
        <button
          onClick={() => setActiveTab('MOBILITY_FASCIA')}
          className={`py-2 px-2.5 rounded-xl transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 text-center ${
            activeTab === 'MOBILITY_FASCIA'
              ? 'bg-teal-600 text-white font-bold shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4 shrink-0" />
          <span className="truncate">{language === 'zh-TW' ? '伸展筋骨' : 'Mobility'}</span>
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

          {/* Sub-module 2: Exercise Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-salud-cyan" />
                運動生理學關鍵機制 (Key Physiological Mechanisms)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                心肺最大攝氧量 (VO2 max)、肌少症阻力訓練逆轉、NEAT 非運動性產熱與安全運動處方
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
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-salud-cyan font-bold block">
                            核心生理機制 (Physiological Mechanisms)：
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

                        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                          <strong className="text-salud-amber font-bold block">
                            行動處方指引 (Action Guidelines)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.action_guidelines_zh : topic.action_guidelines_en).map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-amber font-bold">✓</span>
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
          <section className="space-y-3">
            <SimRunningCalculator />
          </section>

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

                        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰課表與防傷守則 (Protocols & Guardrails)：
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
          TAB 3: 自行車科學 (Cycling Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'CYCLING' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Cycling Power, FTP & VAM Calculator */}
          <section className="space-y-3">
            <SimCyclingPower />
          </section>

          {/* Sub-module 2: Cycling Science Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Bike className="w-4 h-4 text-blue-400" />
                自行車運動科學五大核心支柱 (Cycling Science Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                85–95 rpm 迴轉速生理學、Coggan 7區功率訓練、CdA 空氣力學阻力、Bike Fitting 關節生物力學、高山爬坡功重比與 90g/hr 補給
              </p>
            </div>

            <div className="space-y-3.5">
              {CYCLING_TOPICS.map((topic) => {
                const isExpanded = expandedCyclingTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-blue-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-blue-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedCyclingTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Principles */}
                        <div className="p-3.5 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-1.5">
                          <strong className="text-blue-300 font-bold block">
                            核心力學與代謝生理原理 (Principles & Energetics)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.principles_zh : topic.principles_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            量化設定與工程力學數據 (Quantitative Metrics & Angles)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_data_zh : topic.biomechanical_data_en).map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">⚙</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Guidelines */}
                        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰操作與防禦指引 (Action Guidelines)：
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
          TAB 4: 登山與高海拔科學 (Mountaineering Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'MOUNTAINEERING' && (
        <div className="space-y-8 animate-fade-in">
          <section className="space-y-3">
            <SimMountaineeringAltitude />
          </section>

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

      {/* ══════════════════════════════════════════════════════════════════════════════════
          TAB 5: 肌肉重力訓練與抗阻力科學 (Strength & Hypertrophy Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'STRENGTH_TRAINING' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: 1RM & Effective Volume Calculator */}
          <section className="space-y-3">
            <SimStrength1RM />
          </section>

          {/* Sub-module 2: Strength Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-emerald-400" />
                所有肌肉重力訓練五大生理支柱 (Strength & Hypertrophy Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                mTORC1 與衛星細胞肌肥大機轉、漸進式超負荷與 RIR、六大基礎動作模式、漢尼曼大小定律神經編碼、肌少症逆轉與肌動蛋白內分泌
              </p>
            </div>

            <div className="space-y-3.5">
              {STRENGTH_TOPICS.map((topic) => {
                const isExpanded = expandedStrengthTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-emerald-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-emerald-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-emerald-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedStrengthTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-1.5">
                          <strong className="text-emerald-300 font-bold block">
                            肌肥大與神經生理機轉 (Molecular & Neuromuscular Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Movement Analysis */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            動作力學解剖與肌電整合 (Kinematics & EMG Analysis)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.movement_analysis_zh : topic.movement_analysis_en).map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🏋️</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                          <strong className="text-amber-400 font-bold block">
                            週期化課表與實戰處方 (Action Protocols & Periodization)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.action_protocols_zh : topic.action_protocols_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-400 font-bold">✓</span>
                                <span>{p}</span>
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
          TAB 6: 伸展、柔軟度與筋骨筋膜力學 (Mobility, Flexibility & Fascia)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'MOBILITY_FASCIA' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: 4-Point Mobility Screen & Correctives */}
          <section className="space-y-3">
            <SimMobilityScreen />
          </section>

          {/* Sub-module 2: Mobility Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Scale className="w-4 h-4 text-teal-400" />
                伸展柔軟度與筋骨筋膜力學五大科學防線 (Mobility & Fascia Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                GTO 自生抑制與神經伸展、筋膜張力整合體與滾筒迷思破除、主動關節受控旋轉 CARs、下交叉症候群骨盆力學、軟骨滑液灌注與 Wolff 骨骼定律
              </p>
            </div>

            <div className="space-y-3.5">
              {MOBILITY_TOPICS.map((topic) => {
                const isExpanded = expandedMobilityTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/70 space-y-3 transition-all hover:border-teal-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-teal-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-teal-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedMobilityTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Neuro Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-teal-950/20 border border-teal-500/30 space-y-1.5">
                          <strong className="text-teal-300 font-bold block">
                            神經肌肉反射與筋膜整合機制 (Neurological & Biotensegrity Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.neuro_mechanisms_zh : topic.neuro_mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Alignment */}
                        <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            關節力線對齊與防傷力學 (Biomechanical Joint Alignment)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_alignment_zh : topic.biomechanical_alignment_en).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">📐</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Routines */}
                        <div className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            每日活動度與神經矯正日常 (Action Routines & Corrective Drills)：
                          </strong>
                          <ul className="space-y-1 text-slate-300">
                            {(language === 'zh-TW' ? topic.action_routines_zh : topic.action_routines_en).map((r, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">✓</span>
                                <span>{r}</span>
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
