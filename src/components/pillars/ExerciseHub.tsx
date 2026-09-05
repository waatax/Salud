import React, { useState } from 'react';
import { EXERCISE_TOPICS } from '../../data/exerciseData';
import { RUNNING_TOPICS, MOUNTAINEERING_TOPICS } from '../../data/sportsScienceData';
import { CYCLING_TOPICS } from '../../data/cyclingData';
import { STRENGTH_TOPICS } from '../../data/strengthData';
import { MOBILITY_TOPICS } from '../../data/mobilityData';
import { BADMINTON_TOPICS } from '../../data/badmintonData';
import { TABLE_TENNIS_TOPICS } from '../../data/tableTennisData';
import { PICKLEBALL_TOPICS } from '../../data/pickleballData';
import { SimExerciseZones } from '../simulators/SimExerciseZones';
import { SimRunningCalculator } from '../simulators/SimRunningCalculator';
import { SimMountaineeringAltitude } from '../simulators/SimMountaineeringAltitude';
import { SimCyclingPower } from '../simulators/SimCyclingPower';
import { SimStrength1RM } from '../simulators/SimStrength1RM';
import { SimMobilityScreen } from '../simulators/SimMobilityScreen';
import { SimBadmintonSmash } from '../simulators/SimBadmintonSmash';
import { SimTableTennisSpin } from '../simulators/SimTableTennisSpin';
import { SimPickleballKitchen } from '../simulators/SimPickleballKitchen';
import { BadmintonInfographics } from '../sports/BadmintonInfographics';
import { TableTennisInfographics } from '../sports/TableTennisInfographics';
import { PickleballInfographics } from '../sports/PickleballInfographics';
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
  Scale,
  RotateCw,
  Shield,
  Target
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
  const [expandedBadmintonTopic, setExpandedBadmintonTopic] = useState<string | null>('BAD-01');
  const [expandedTableTennisTopic, setExpandedTableTennisTopic] = useState<string | null>('TT-01');
  const [expandedPickleballTopic, setExpandedPickleballTopic] = useState<string | null>('PB-01');

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-nature-sky-200/90 dark:border-nature-sky-800/40 bg-gradient-to-br from-nature-sky-100/70 via-white to-nature-green-50/50 dark:from-nature-sky-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 shadow-sm relative overflow-hidden">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-cyan/40 bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300">
            Health Pillar 02 · 運動與專項運動科學總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '運動生理學與專項運動科學' : 'Exercise Physiology & Specialized Sports Science'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            運動是人體最強大的多靶點生理藥物。本支柱橫跨 9 大核心專項：基礎生理心率、跑步、自行車、登山、重訓、伸展筋骨，以及羽毛球、乒乓球與匹克球專項力學與教學 Infor Graph。
          </p>
        </div>
      </div>

      {/* ── Sub-category Switcher (9大專項運動科學欄位分頁) ── */}
      <div className="space-y-2">
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

        {/* 持拍與球槳運動專區 (Racket & Paddle Sports) */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-xs font-mono">
          {/* 7. Badminton */}
          <button
            onClick={() => setActiveTab('BADMINTON')}
            className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
              activeTab === 'BADMINTON'
                ? 'bg-nature-amber-500 text-white dark:text-black shadow-warm-glow'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <span>🏸</span>
            <span className="truncate">{language === 'zh-TW' ? '羽毛球 (Badminton)' : 'Badminton'}</span>
          </button>

          {/* 8. Table Tennis */}
          <button
            onClick={() => setActiveTab('TABLE_TENNIS')}
            className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
              activeTab === 'TABLE_TENNIS'
                ? 'bg-rose-500 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <span>🏓</span>
            <span className="truncate">{language === 'zh-TW' ? '乒乓球 (Table Tennis)' : 'Table Tennis'}</span>
          </button>

          {/* 9. Pickleball */}
          <button
            onClick={() => setActiveTab('PICKLEBALL')}
            className={`py-2 px-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-center font-bold ${
              activeTab === 'PICKLEBALL'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <span>🎾</span>
            <span className="truncate">{language === 'zh-TW' ? '匹克球 (Pickleball)' : 'Pickleball'}</span>
          </button>
        </div>
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-salud-cyan/60"
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
                        <p className="text-xs text-nature-sky-700 dark:text-nature-sky-400 font-medium">
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
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-nature-sky-800 dark:text-nature-sky-300 font-bold block">
                            核心生理機制 (Physiological Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.key_mechanisms_zh : topic.key_mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-cyan font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-nature-amber-800 dark:text-nature-amber-300 font-bold block">
                            行動處方指引 (Action Guidelines)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-salud-amber/60"
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
                        <div className="p-3.5 rounded-xl bg-nature-amber-50/90 dark:bg-nature-amber-950/30 border border-nature-amber-200 dark:border-nature-amber-800/60 space-y-1.5">
                          <strong className="text-nature-amber-800 dark:text-nature-amber-300 font-bold block">
                            核心生理與生物力學原理 (Biomechanical Principles)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.key_principles_zh : topic.key_principles_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-amber font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-nature-sky-800 dark:text-nature-sky-300 font-bold block">
                            量化力學與耐力生理數據 (Quantitative Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_data_zh : topic.biomechanical_data_en).map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-salud-cyan font-bold">📊</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰課表與防傷守則 (Protocols & Guardrails)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-blue-500/60"
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
                        <div className="p-3.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 space-y-1.5">
                          <strong className="text-blue-300 font-bold block">
                            核心力學與代謝生理原理 (Principles & Energetics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.principles_zh : topic.principles_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-blue-400 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            量化設定與工程力學數據 (Quantitative Metrics & Angles)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_data_zh : topic.biomechanical_data_en).map((d, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">⚙</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Guidelines */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰操作與防禦指引 (Action Guidelines)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-purple-500/60"
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
                        <div className="p-3.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 space-y-1.5">
                          <strong className="text-purple-300 font-bold block">
                            病理生理機轉 (Pathophysiological Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.pathophysiology_zh : topic.pathophysiology_en).map((p, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-purple-400 font-bold">•</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            臨床診斷指標與力學數據 (Clinical Criteria & Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? (topic.clinical_criteria_zh || (topic as any).biomechanical_data_zh || []) : (topic.clinical_criteria_en || (topic as any).biomechanical_data_en || [])).map((c: string, i: number) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🩺</span>
                                <span>{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 rounded-xl bg-red-50/90 dark:bg-red-950/30 border border-red-200 dark:border-red-800/60 space-y-1.5">
                          <strong className="text-red-300 font-bold block">
                            高山生存守則與緊急處置 (Survival & Action Protocols)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-emerald-500/60"
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
                        <div className="p-3.5 rounded-xl bg-nature-green-50/90 dark:bg-nature-green-950/30 border border-nature-green-200 dark:border-nature-green-800/60 space-y-1.5">
                          <strong className="text-emerald-300 font-bold block">
                            肌肥大與神經生理機轉 (Molecular & Neuromuscular Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Movement Analysis */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            動作力學解剖與肌電整合 (Kinematics & EMG Analysis)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.movement_analysis_zh : topic.movement_analysis_en).map((a, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🏋️</span>
                                <span>{a}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-amber-400 font-bold block">
                            週期化課表與實戰處方 (Action Protocols & Periodization)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-teal-500/60"
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
                        <div className="p-3.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-1.5">
                          <strong className="text-teal-300 font-bold block">
                            神經肌肉反射與筋膜整合機制 (Neurological & Biotensegrity Mechanisms)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.neuro_mechanisms_zh : topic.neuro_mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Alignment */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            關節力線對齊與防傷力學 (Biomechanical Joint Alignment)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanical_alignment_zh : topic.biomechanical_alignment_en).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">📐</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Routines */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            每日活動度與神經矯正日常 (Action Routines & Corrective Drills)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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

      {/* ══════════════════════════════════════════════════════════════════════════════════
          TAB 7: 羽毛球運動科學 (Badminton Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'BADMINTON' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Badminton Smash & Deceleration Simulator */}
          <section className="space-y-3">
            <SimBadmintonSmash />
          </section>

          {/* Sub-module 2: Badminton 4 Infor Graphs */}
          <section className="space-y-3">
            <BadmintonInfographics />
          </section>

          {/* Sub-module 3: Badminton Scientific Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                羽毛球專項運動科學五大核心支柱 (Badminton Science Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                16羽毛錐形流阻、殺球動力鏈 2,500°/s 肩內旋、啟動步 3.0x GRF 煞車、六大落點幾何角平分線與傷害防線
              </p>
            </div>

            <div className="space-y-3.5">
              {BADMINTON_TOPICS.map((topic) => {
                const isExpanded = expandedBadmintonTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-amber-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-amber-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedBadmintonTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-nature-amber-50/90 dark:bg-nature-amber-950/30 border border-nature-amber-200 dark:border-nature-amber-800/60 space-y-1.5">
                          <strong className="text-amber-300 font-bold block">
                            核心空氣動力與生理機制 (Mechanisms & Physics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            生物力學與量化指標 (Biomechanical Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanics_zh : topic.biomechanics_en).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🏸</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰步伐與防禦守則 (Action Protocols & Guardrails)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
          TAB 8: 乒乓球運動科學 (Table Tennis Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'TABLE_TENNIS' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Table Tennis Magnus Spin Simulator */}
          <section className="space-y-3">
            <SimTableTennisSpin />
          </section>

          {/* Sub-module 2: Table Tennis 4 Infor Graphs */}
          <section className="space-y-3">
            <TableTennisInfographics />
          </section>

          {/* Sub-module 3: Table Tennis Scientific Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-rose-400" />
                乒乓球專項運動科學五大核心支柱 (Table Tennis Science Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                9,000 rpm 馬格努斯旋轉流阻、2.74m &lt;0.3s 感知反應鏈、前臂快收力鏈、膠皮海綿微結構與腰肩防護
              </p>
            </div>

            <div className="space-y-3.5">
              {TABLE_TENNIS_TOPICS.map((topic) => {
                const isExpanded = expandedTableTennisTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-rose-500/60"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold text-rose-400">{topic.id}</span>
                          <EvidenceBadge grade={topic.evidence_grade} />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                          {language === 'zh-TW' ? topic.title_zh : topic.title_en}
                        </h4>
                        <p className="text-xs text-rose-400 font-medium">
                          💡 {language === 'zh-TW' ? topic.one_liner_zh : topic.one_liner_en}
                        </p>
                      </div>

                      <button
                        onClick={() => setExpandedTableTennisTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 space-y-1.5">
                          <strong className="text-rose-300 font-bold block">
                            馬格努斯力與神經感知機制 (Mechanisms & Physics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            生物力學與量化指標 (Biomechanical Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanics_zh : topic.biomechanics_en).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🏓</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            實戰步法與防傷處方 (Action Protocols & Guardrails)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
          TAB 9: 匹克球運動科學 (Pickleball Science)
         ══════════════════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'PICKLEBALL' && (
        <div className="space-y-8 animate-fade-in">
          {/* Sub-module 1: Pickleball Kitchen Simulator */}
          <section className="space-y-3">
            <SimPickleballKitchen />
          </section>

          {/* Sub-module 2: Pickleball 4 Infor Graphs */}
          <section className="space-y-3">
            <PickleballInfographics />
          </section>

          {/* Sub-module 3: Pickleball Scientific Topics List */}
          <section className="space-y-4">
            <div className="border-b border-salud-light-border/60 dark:border-salud-dark-border/60 pb-2">
              <h3 className="text-base font-display font-bold text-salud-light-text dark:text-salud-dark-text flex items-center gap-2">
                <Shield className="w-4 h-4 text-teal-400" />
                匹克球專項運動科學五大核心支柱 (Pickleball Science Pillars)
              </h3>
              <p className="text-xs font-mono text-slate-500">
                廚房區 7ft 頂點幾何、14ft 網前推壓截擊、穿孔球氣動蜂巢芯、樂齡防摔交叉步與長壽 9.7 年醫學
              </p>
            </div>

            <div className="space-y-3.5">
              {PICKLEBALL_TOPICS.map((topic) => {
                const isExpanded = expandedPickleballTopic === topic.id;
                return (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-teal-500/60"
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
                        onClick={() => setExpandedPickleballTopic(isExpanded ? null : topic.id)}
                        className="p-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs">
                        {/* Mechanisms */}
                        <div className="p-3.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 space-y-1.5">
                          <strong className="text-teal-300 font-bold block">
                            廚房幾何與生物力學機制 (Mechanisms & Physics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-teal-400 font-bold">•</span>
                                <span>{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Biomechanical Data */}
                        <div className="p-3.5 rounded-xl bg-nature-sky-50/90 dark:bg-nature-sky-950/30 border border-nature-sky-200 dark:border-nature-sky-800/60 space-y-1.5">
                          <strong className="text-cyan-300 font-bold block">
                            生物力學與量化指標 (Biomechanical Metrics)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                            {(language === 'zh-TW' ? topic.biomechanics_zh : topic.biomechanics_en).map((b, i) => (
                              <li key={i} className="flex items-start gap-1.5">
                                <span className="text-cyan-400 font-bold">🎾</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Protocols */}
                        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 space-y-1.5">
                          <strong className="text-emerald-400 font-bold block">
                            第三板戰術與防摔守則 (Action Protocols & Safety Rules)：
                          </strong>
                          <ul className="space-y-1 text-slate-700 dark:text-slate-300">
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
    </div>
  );
};
