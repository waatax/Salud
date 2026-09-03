import React, { useState } from 'react';
import { EXERCISE_TOPICS } from '../../data/exerciseData';
import { SimExerciseZones } from '../simulators/SimExerciseZones';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { Activity, Dumbbell, HeartPulse, ShieldAlert, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export const ExerciseHub: React.FC = () => {
  const { t, language } = useLanguage();
  const [expandedTopic, setExpandedTopic] = useState<string | null>('EX-01');

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-salud-cyan/40 bg-gradient-to-br from-cyan-100/70 via-salud-light-card/80 to-slate-100 dark:from-cyan-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-salud-cyan/40 bg-salud-cyan/20 text-salud-cyan-700 dark:text-salud-cyan-300">
            Health Pillar 02 · 運動與活力總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-salud-light-text dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '運動生理學與長壽體能處方' : 'Exercise Physiology & Longevity Prescriptions'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            運動是人類最強大的多靶點生理藥物。深層涵蓋 Zone 2 慢速有氧之粒線體擴增、Zone 5 HIIT 與最大攝氧量 (VO2 max)、骨骼肌抗肌少症阻抗鍛鍊、以及日常微活動 (NEAT) 久坐打斷防禦。
          </p>
        </div>
      </div>

      {/* ── Sub-module 1: Karvonen Heart Rate Reserve & Metabolic Calculator ── */}
      <section className="space-y-3">
        <SimExerciseZones />
      </section>

      {/* ── Sub-module 2: Core Exercise Topics ── */}
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
  );
};
