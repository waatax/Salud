import React, { useState } from 'react';
import { SLEEP_STAGES, SLEEP_TOPICS } from '../../data/sleepData';
import { SimCircadian } from '../simulators/SimCircadian';
import { useLanguage } from '../../i18n';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { Moon, Brain, Sun, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';

export const SleepHub: React.FC = () => {
  const { t, language } = useLanguage();
  const [expandedTopic, setExpandedTopic] = useState<string | null>('SL-02');

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-purple-200 dark:border-purple-800/40 bg-gradient-to-br from-purple-100/70 via-white to-nature-sky-50/40 dark:from-purple-950/40 dark:via-salud-dark-card/60 dark:to-slate-950 relative overflow-hidden shadow-sm transition-colors">
        <div className="relative space-y-3 max-w-2xl">
          <span className="px-2.5 py-1 rounded-full font-mono text-xs font-bold border border-purple-300/80 bg-purple-100/80 text-purple-800 dark:border-purple-700/60 dark:bg-purple-950/60 dark:text-purple-300">
            Health Pillar 03 · 睡眠與修復總樞紐
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight">
            {language === 'zh-TW' ? '睡眠神經生理與大腦排毒修復' : 'Sleep Neurobiology & Glymphatic Brain Recovery'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            睡眠是大腦唯二進行結構性排毒與突觸重組的時刻。本支柱涵蓋 90 分鐘超晝夜睡眠架構、慢波深睡期的膠淋巴系統（Glymphatic System 沖刷 β-類澱粉蛋白）、視交叉上核 (SCN) 晝夜光照生物鐘、以及第一線臨床失眠治療 CBT-I 行為處方。
          </p>
        </div>
      </div>

      {/* ── Sub-module 1: Four Stages of Sleep Architecture ── */}
      <section className="space-y-3">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            {t('sleep.stages_title')}
          </h3>
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
            多導睡眠圖 (PSG) 臨床分期金標準
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SLEEP_STAGES.map((st) => (
            <div
              key={st.stage}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-700 dark:text-purple-400">
                  {st.stage.replace('_', ' ')}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 font-mono text-[10px] font-bold border border-purple-200 dark:border-purple-800/50">
                  {st.pct_of_night}
                </span>
              </div>
              <strong className="text-xs font-bold text-slate-900 dark:text-white block">
                {language === 'zh-TW' ? st.name_zh.split(' · ')[1] : st.name_en.split(' · ')[1]}
              </strong>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {language === 'zh-TW' ? st.physiological_function_zh : st.physiological_function_en}
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 text-[10px] text-slate-500 font-mono">
                腦波：{st.brain_wave_pattern}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sub-module 2: Dynamic 24-Hour Circadian Simulator ── */}
      <section className="space-y-3">
        <SimCircadian />
      </section>

      {/* ── Sub-module 3: Core Sleep Topics ── */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-2">
          <h3 className="text-base font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            睡眠神經醫學四大核心專題 (Core Sleep Topics)
          </h3>
        </div>

        <div className="space-y-3.5">
          {SLEEP_TOPICS.map((topic) => {
            const isExpanded = expandedTopic === topic.id;
            return (
              <div
                key={topic.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-sm space-y-3 transition-all hover:border-purple-300 dark:hover:border-purple-700"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
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

                  <button
                    onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                    className="btn-tactile p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                    aria-label="展開或收合詳細內容"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>

                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3 text-xs">
                    {/* Key Mechanisms */}
                    <div className="p-3.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 space-y-1.5">
                      <strong className="text-purple-800 dark:text-purple-300 font-bold block">
                        深層神經生理機制 (Neurobiological Mechanisms)：
                      </strong>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {(language === 'zh-TW' ? topic.mechanisms_zh : topic.mechanisms_en).map((m, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-purple-600 dark:text-purple-400 font-bold">•</span>
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actionable Rules */}
                    <div className="p-3.5 rounded-xl bg-nature-green-50/90 dark:bg-nature-green-950/20 border border-nature-green-200 dark:border-nature-green-800/60 space-y-1.5">
                      <strong className="text-nature-green-800 dark:text-nature-green-300 font-bold block">
                        實證行為介入處方 (Actionable Behavioral Rules)：
                      </strong>
                      <ul className="space-y-1 text-slate-700 dark:text-slate-300">
                        {(language === 'zh-TW' ? topic.actionable_rules_zh : topic.actionable_rules_en).map((a, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-nature-green-600 dark:text-nature-green-400 font-bold">✓</span>
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
