import React, { useState } from 'react';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { LongevitySubTab } from '../../types';
import { InfographHallmarksWheel } from './longevity/InfographHallmarksWheel';
import { InfographEpigeneticClocks } from './longevity/InfographEpigeneticClocks';
import { InfographLongevityCompounds } from './longevity/InfographLongevityCompounds';
import { InfographSenescenceSASP } from './longevity/InfographSenescenceSASP';
import { InfographHormesisProtocol } from './longevity/InfographHormesisProtocol';
import { LongevityMasteryQuiz } from './longevity/LongevityMasteryQuiz';
import { SimLongevityTrajectory } from '../simulators/SimLongevityTrajectory';
import {
  Hourglass,
  Dna,
  Clock,
  Pill,
  Flame,
  Award,
  Sparkles,
  Layers,
  Sliders,
  ShieldCheck,
  Stethoscope,
  Heart,
  Brain,
  AlertTriangle,
  ArrowRight,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export const LongevityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LongevitySubTab>('OVERVIEW');

  // Filter longevity council members EC-34 to EC-40
  const longevityExperts = EXPERT_COUNCIL.filter((e) =>
    ['EC-34', 'EC-35', 'EC-36', 'EC-37', 'EC-38', 'EC-39', 'EC-40'].includes(e.id)
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      {/* ── Grand Hero Header ── */}
      <div className="relative overflow-hidden rounded-3xl border border-indigo-500/40 bg-gradient-to-br from-indigo-950/80 via-slate-900/95 to-cyan-950/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-mono font-bold">
              <Sparkles className="w-4 h-4 text-salud-cyan animate-pulse" />
              <span>Salud 旗艦支柱 · 長壽與抗老化醫學專科總樞紐</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight text-white flex items-center gap-3">
              <span>抗老化醫學、12大衰老標誌、表觀遺傳時鐘與疾病壓縮</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              破解「衰老是不可抗拒之宿命」的傳統認知，將衰老定義為一組可被測量、靶向並延緩的分子生物學病理進程。由{' '}
              <span className="font-semibold text-cyan-400">EC-34 分子老年學家</span>、
              <span className="font-semibold text-indigo-400">EC-35 表觀遺傳學家</span>、
              <span className="font-semibold text-rose-400">EC-36 抗衰藥物學家</span>、
              <span className="font-semibold text-amber-400">EC-37 粒線體自噬專家</span>、
              <span className="font-semibold text-emerald-400">EC-38 臨床長壽醫師</span>、
              <span className="font-semibold text-teal-400">EC-39 激效生理學家</span> 與{' '}
              <span className="font-semibold text-purple-400">EC-40 系統生物學家</span> 跨領域審定。
              深入 12 大衰老標誌、DunedinPACE 速率儀表、ITP 長壽化合物與健康壽命動態模擬！
            </p>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-salud-cyan">7 席</div>
              <div className="text-[10px] text-slate-400">長壽專科理事會</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-indigo-400">12 大</div>
              <div className="text-[10px] text-slate-400">Cell 衰老標誌</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-amber-400">ITP</div>
              <div className="text-[10px] text-slate-400">NIH 金標準實證</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/10 dark:bg-slate-900/80 border border-white/10 text-center">
              <div className="text-xl font-mono font-extrabold text-emerald-400">0.8x</div>
              <div className="text-[10px] text-slate-400">DunedinPACE 減速</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2 text-xs font-mono">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'OVERVIEW'
              ? 'bg-salud-cyan text-slate-950 font-extrabold border-salud-cyan shadow-md ring-2 ring-salud-cyan/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-salud-cyan'
          }`}
        >
          <Hourglass className="w-4 h-4" />
          <span>專區綜覽與長壽理事會</span>
        </button>

        <button
          onClick={() => setActiveTab('HALLMARKS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'HALLMARKS'
              ? 'bg-indigo-600 text-white font-bold border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-indigo-400'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>12大衰老標誌 (INFOGRAPH 1)</span>
        </button>

        <button
          onClick={() => setActiveTab('EPIGENETIC_CLOCKS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'EPIGENETIC_CLOCKS'
              ? 'bg-blue-600 text-white font-bold border-blue-500 shadow-md ring-2 ring-blue-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-blue-400'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>表觀時鐘與生物年齡 (INFOGRAPH 2)</span>
        </button>

        <button
          onClick={() => setActiveTab('PHARMACOTHERAPY')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'PHARMACOTHERAPY'
              ? 'bg-amber-500 text-slate-950 font-extrabold border-amber-400 shadow-md ring-2 ring-amber-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-amber-400'
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>ITP 長壽化合物與殭屍細胞 (INFOGRAPH 3+4)</span>
        </button>

        <button
          onClick={() => setActiveTab('HORMESIS')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'HORMESIS'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-teal-400'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>激效適應與桑拿冷水 (INFOGRAPH 5)</span>
        </button>

        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'SIMULATOR'
              ? 'bg-purple-600 text-white font-bold border-purple-500 shadow-md ring-2 ring-purple-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-purple-400'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>健康壽命模擬器 (INFOGRAPH 6)</span>
        </button>

        <button
          onClick={() => setActiveTab('BEHAVIOR_AND_QUIZ')}
          className={`btn-tactile flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border transition-all ${
            activeTab === 'BEHAVIOR_AND_QUIZ'
              ? 'bg-rose-600 text-white font-bold border-rose-500 shadow-md ring-2 ring-rose-500/20'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-rose-400'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>長壽精熟認知測驗 (14 題交互評量)</span>
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAB 1: OVERVIEW & EXPERT COUNCIL
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'OVERVIEW' && (
        <div className="space-y-8 animate-fade-in">
          {/* Core Philosophy Card */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 sm:p-8 space-y-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan uppercase">
              <Dna className="w-4 h-4" />
              <span>Geroscience Core Paradigm Shift</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-display font-bold text-white">
              老年學範式轉移：把「衰老本身」當作所有重大慢性病的共同根源
            </h2>

            <p className="text-xs sm:text-slate-300 text-slate-400 leading-relaxed">
              心血管硬化、阿茲海默症、第二型糖尿病與惡性腫瘤，並非孤立發生的偶發疾病，而是底層「12 大分子衰老標誌」長期侵蝕器官組織後的共同終端產物。
              若僅單一治療個別疾病，延長的往往只是患病失能的殘存歲月；唯有延緩細胞衰老速率，才能達成 James Fries 的「疾病壓縮 (Morbidity Compression)」——將失能臥床期壓縮至生命最後數月。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-indigo-400 text-xs">平均壽命 (Lifespan)</div>
                <div className="text-sm font-bold text-white">客觀生存總年數</div>
                <p className="text-[11px] text-slate-400">目前已開發國家平均約 80~84 歲</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="font-bold text-salud-cyan text-xs">健康壽命 (Healthspan)</div>
                <div className="text-sm font-bold text-white">無重大失能之自主歲月</div>
                <p className="text-[11px] text-slate-400">目前平均僅 66~68 歲（存在 14 年失能鴻溝）</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-1">
                <div className="font-bold text-emerald-400 text-xs">疾病壓縮 (Morbidity Compression)</div>
                <div className="text-sm font-bold text-white">長壽醫學終極追求</div>
                <p className="text-[11px] text-slate-300">活至 90+ 歲高齡，失能期壓縮至最後 1~2 年</p>
              </div>
            </div>
          </div>

          {/* Obesity & Aging Synergistic Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-rose-950/30 to-slate-900 border border-amber-500/40 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
              <AlertTriangle className="w-4 h-4" />
              <span>跨專區共病深度聯防：肥胖即是加速衰老之生理表型</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              為什麼減重專區與抗老專區互為因果基石？
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              肥胖患者腹腔內大量肥大的內臟脂肪細胞，是人體最大宗的「殭屍細胞」(p16 陽性) 與 SASP 發炎因子製造源。BMI 每增加 5，DNA 甲基化時鐘 (GrimAge) 加速 1.2 年！反之，積極維持健康體組成與去脂骨骼肌，是抗老化成本效益最高的干預手段。
            </p>
          </div>

          {/* Expert Council Seats (EC-34 ~ EC-40) */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-salud-cyan">
                <ShieldCheck className="w-4 h-4" />
                <span>長壽與抗衰老醫學專家委員會 (EC-34 ~ EC-40 專席)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">多學科共同治理</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {longevityExperts.map((exp) => (
                <div
                  key={exp.id}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 flex flex-col justify-between hover:border-salud-cyan/40 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-salud-cyan">{exp.id}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                        專科專席
                      </span>
                    </div>
                    <div className="font-bold text-sm text-white">{exp.title_zh}</div>
                    <div className="text-[10px] font-mono text-slate-400">{exp.name_en}</div>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed pt-2 border-t border-slate-850">
                    {exp.core_duty}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 2: 12 HALLMARKS OF AGING
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'HALLMARKS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographHallmarksWheel />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 3: EPIGENETIC CLOCKS & BIOMARKERS
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'EPIGENETIC_CLOCKS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographEpigeneticClocks />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 4: LONGEVITY COMPOUNDS & SASP CLEARANCE
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'PHARMACOTHERAPY' && (
        <div className="space-y-8 animate-fade-in">
          <InfographLongevityCompounds />
          <InfographSenescenceSASP />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 5: HORMESIS PROTOCOLS & ENVIRONMENTAL ADAPTATION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'HORMESIS' && (
        <div className="space-y-8 animate-fade-in">
          <InfographHormesisProtocol />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 6: SIMULATOR & MORBIDITY COMPRESSION
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'SIMULATOR' && (
        <div className="space-y-8 animate-fade-in">
          <SimLongevityTrajectory />
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TAB 7: MASTERY QUIZ & INTERACTIVE ASSESSMENT
      ───────────────────────────────────────────────────────────── */}
      {activeTab === 'BEHAVIOR_AND_QUIZ' && (
        <div className="space-y-8 animate-fade-in">
          <LongevityMasteryQuiz onNavigateToTab={(tab) => setActiveTab(tab)} />
        </div>
      )}
    </div>
  );
};
