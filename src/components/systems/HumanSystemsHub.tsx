import React, { useState } from 'react';
import { HUMAN_SYSTEMS } from '../../data/humanSystemsData';
import { HumanSystemId, HumanSystem } from '../../types';
import { SystemSchematicFigure } from './SystemSchematicFigure';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import {
  Utensils,
  Wind,
  Brain,
  HeartPulse,
  Activity,
  ShieldCheck,
  Dumbbell,
  Droplets,
  BookOpen,
  AlertOctagon,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Stethoscope,
  FileText
} from 'lucide-react';

interface Props {
  initialSystemId?: HumanSystemId;
}

export const HumanSystemsHub: React.FC<Props> = ({ initialSystemId = 'digestive' }) => {
  const { language } = useLanguage();
  const nav = useNavigation();
  const [selectedSystemId, setSelectedSystemId] = useState<HumanSystemId>(initialSystemId);
  const [activeTab, setActiveTab] = useState<'mechanisms' | 'kps' | 'pathologies' | 'red_flags' | 'best_practices' | 'citations'>('mechanisms');

  const currentSystem = HUMAN_SYSTEMS.find((s) => s.id === selectedSystemId) || HUMAN_SYSTEMS[0];

  const getSystemIcon = (id: HumanSystemId) => {
    switch (id) {
      case 'digestive': return Utensils;
      case 'respiratory': return Wind;
      case 'nervous': return Brain;
      case 'cardiovascular': return HeartPulse;
      case 'endocrine': return Activity;
      case 'immune': return ShieldCheck;
      case 'musculoskeletal': return Dumbbell;
      case 'renal': return Droplets;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* ── Top Hero Banner: Human Organ Systems Overview ── */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-white via-slate-50 to-blue-50/30 dark:from-slate-900/90 dark:via-salud-dark-card/70 dark:to-slate-950 shadow-sm relative overflow-hidden">
        <div className="max-w-3xl space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full font-mono text-xs font-bold bg-salud-cyan/15 text-salud-cyan-800 dark:text-salud-cyan-300 border border-salud-cyan/40">
              Salud 旗艦首頁 · 8 大全人人體器官系統探索樞紐
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              24 席專家治理背書
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            {language === 'zh-TW' ? '人體生理系統與微觀機制總覽' : 'Human Organ Systems & Physiological Dynamics'}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            身體不是孤立零件的堆疊，而是 8 大器官系統在微觀分子與神經內分泌層級的動態交響。點擊任一系統探索高精度向量解剖圖解、細胞機制、臨床紅旗與奠基於《The Lancet》、《NEJM》與《Cell》頂級文獻的實證養生處方。
          </p>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-[-20px] bottom-[-20px] opacity-5 pointer-events-none">
          <Stethoscope className="w-64 h-64 text-slate-900 dark:text-white" />
        </div>
      </div>

      {/* ── 8 Systems Quick Switcher Grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
        {HUMAN_SYSTEMS.map((sys) => {
          const Icon = getSystemIcon(sys.id);
          const isSelected = sys.id === selectedSystemId;
          return (
            <button
              key={sys.id}
              onClick={() => {
                setSelectedSystemId(sys.id);
                window.location.hash = `systems/${sys.id}`;
              }}
              className={`btn-tactile p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'border-salud-cyan dark:border-salud-cyan bg-salud-cyan/10 dark:bg-salud-cyan/15 text-slate-900 dark:text-white shadow-sm ring-1 ring-salud-cyan/50'
                  : 'border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center transition-transform"
                  style={{
                    backgroundColor: isSelected ? sys.theme_color : undefined,
                    color: isSelected ? '#FFFFFF' : sys.theme_color,
                    border: `1px solid ${sys.theme_color}40`
                  }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-salud-cyan animate-pulse" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs leading-snug line-clamp-1">
                  {sys.name_zh.replace('系統', '')}
                </h4>
                <span className="text-[9px] font-mono text-slate-400 block truncate">
                  {sys.name_en.split(' ')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── System Detail Stage (Split 2-Column Responsive Layout) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Vector Schematic Figure */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: currentSystem.theme_color }}
                  />
                  <span>{currentSystem.name_zh}</span>
                </h3>
                <p className="text-xs font-mono text-slate-400">{currentSystem.name_en}</p>
              </div>
              <span className="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentSystem.major_organs.length} 大核心器官
              </span>
            </div>

            {/* Visual Vector SVG Figure */}
            <SystemSchematicFigure system={currentSystem} />

            {/* Organs Quick Peek Chips */}
            <div className="space-y-2 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                主要解剖結構 (Major Anatomical Organs)
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentSystem.major_organs.map((org, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
                  >
                    {org.name_zh.split(' ')[0]}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Expert Governance Callout */}
          <div className="p-4 rounded-2xl border border-nature-amber-200/80 dark:border-nature-amber-800/40 bg-nature-amber-50/60 dark:bg-nature-amber-950/20 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-nature-amber-700 dark:text-nature-amber-400 font-bold block">
                專科委員會治理審核 (Clinical Reviewers)
              </span>
              <div className="flex items-center gap-1.5 pt-0.5">
                {currentSystem.expert_council_reviewers.map((expId) => (
                  <span
                    key={expId}
                    onClick={() => nav.openCouncilEvidence(expId)}
                    className="cursor-pointer hover:underline font-mono text-xs font-bold text-slate-800 dark:text-slate-200"
                  >
                    {expId}
                  </span>
                ))}
                <span className="text-xs text-slate-500">共同終審背書</span>
              </div>
            </div>
            <button
              onClick={() => nav.openCouncilEvidence(currentSystem.expert_council_reviewers[0])}
              className="btn-tactile px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-white dark:bg-slate-900 border border-nature-amber-300 dark:border-nature-amber-700 text-nature-amber-800 dark:text-nature-amber-300 flex items-center gap-1"
            >
              <span>查看證書</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: In-depth Tabbed Dossier */}
        <div className="lg:col-span-7 space-y-4">
          {/* Dossier Tabs Navigation */}
          <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-slate-100/90 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            {[
              { id: 'mechanisms', label: '深層生理機制' },
              { id: 'kps', label: '核心實證知識點' },
              { id: 'pathologies', label: '常見疾病與病理' },
              { id: 'red_flags', label: '臨床紅旗警訊' },
              { id: 'best_practices', label: '實證養生處方' },
              { id: 'citations', label: '權威文獻' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`btn-tactile px-3 py-1.5 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Deep Physiological Mechanisms & Organs */}
          {activeTab === 'mechanisms' && (
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 animate-fade-in shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-salud-cyan font-bold block">
                  Physiological Mechanisms & Biochemical Cascades
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  細胞與分子層級運作因果鏈
                </h3>
                <p className="text-xs text-slate-500 font-sans leading-relaxed">
                  {currentSystem.tagline_zh}
                </p>
              </div>

              <div className="space-y-4">
                {currentSystem.physiological_mechanisms.map((mech, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 font-mono text-xs flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold">
                          {idx + 1}
                        </span>
                        <span>{mech.title_zh}</span>
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {mech.detail_zh}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-400">關鍵生化分子：</span>
                      {mech.biomolecules.map((bio, bIdx) => (
                        <span
                          key={bIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {bio}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Organs Deep Dive */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                  器官機能與臨床重要性指引
                </h4>
                <div className="space-y-2.5">
                  {currentSystem.major_organs.map((org, oIdx) => (
                    <div key={oIdx} className="p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-white dark:bg-slate-950 text-xs space-y-1">
                      <div className="flex items-center justify-between font-mono">
                        <strong className="text-slate-800 dark:text-slate-200 font-bold text-xs">{org.name_zh}</strong>
                        <span className="text-[10px] text-slate-400">{org.name_en}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed">{org.role_zh}</p>
                      <p className="text-nature-amber-700 dark:text-nature-amber-400 font-mono text-[11px] bg-nature-amber-50/50 dark:bg-nature-amber-950/20 p-1.5 rounded-lg border border-nature-amber-200/40 dark:border-nature-amber-800/30">
                        ※ 臨床洞察：{org.clinical_note_zh}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: High-yield KPs */}
          {activeTab === 'kps' && (
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4 animate-fade-in shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-nature-amber-600 dark:text-nature-amber-400 font-bold block">
                  High-Yield Evidence Knowledge Points
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  核心高階實證知識點
                </h3>
              </div>

              <div className="space-y-3">
                {currentSystem.high_yield_kps.map((kp) => (
                  <div
                    key={kp.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-salud-cyan">{kp.id}</span>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{kp.title_zh}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                        Grade {kp.evidence_grade} 實證
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                      {kp.statement_zh}
                    </p>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      <strong className="text-salud-cyan font-mono font-bold">為什麼重要：</strong>
                      {kp.why_matters_zh}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Pathologies & Diseases */}
          {activeTab === 'pathologies' && (
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4 animate-fade-in shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-red-600 dark:text-red-400 font-bold block">
                  Pathologies, Risk Factors & Prevention
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  常見疾病與病理致病因
                </h3>
              </div>

              <div className="space-y-3.5">
                {currentSystem.common_pathologies.map((path, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-red-100 dark:border-red-950/60 bg-red-50/30 dark:bg-red-950/10 space-y-2.5"
                  >
                    <h4 className="font-bold text-sm text-red-900 dark:text-red-300 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      <span>{path.name_zh}</span>
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      <strong className="font-mono text-slate-700 dark:text-slate-200">致病機轉：</strong>
                      {path.mechanism_zh}
                    </p>
                    <div className="flex flex-wrap items-center gap-1 text-[11px] font-mono">
                      <span className="text-slate-400">危險因子：</span>
                      {path.risk_factors_zh.map((rf, rIdx) => (
                        <span
                          key={rIdx}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
                        >
                          {rf}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] font-sans text-emerald-700 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20 p-2 rounded-xl border border-emerald-200/50 dark:border-emerald-800/40">
                      <strong>實證預防：</strong>{path.prevention_zh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Red Flags & Clinical Cautions */}
          {activeTab === 'red_flags' && (
            <div className="p-6 rounded-3xl border border-red-200 dark:border-red-900/60 bg-red-50/30 dark:bg-red-950/20 space-y-4 animate-fade-in shadow-sm">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-600 dark:text-red-400 animate-pulse" />
                <div>
                  <h3 className="font-display font-bold text-base text-red-900 dark:text-red-200">
                    臨床紅旗警訊與緊急應變 (Critical Red Flags)
                  </h3>
                  <p className="text-xs text-red-700 dark:text-red-400 font-mono">
                    出現下列任何徵兆切勿拖延，應立即採取相應行動
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {currentSystem.clinical_red_flags.map((rf, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-red-200 dark:border-red-900/80 space-y-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-red-800 dark:text-red-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600" />
                        <span>{rf.flag_zh}</span>
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                          rf.urgency === 'EMERGENT'
                            ? 'bg-red-600 text-white animate-pulse'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300'
                        }`}
                      >
                        {rf.urgency === 'EMERGENT' ? '立即急診 (119)' : '儘速專科排檢'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
                      <strong>應變處置：</strong>{rf.action_zh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 5: Lifestyle Best Practices */}
          {activeTab === 'best_practices' && (
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4 animate-fade-in shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold block">
                  Evidence-Based Lifestyle Protocols
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  實證養生與日常介入處方
                </h3>
              </div>

              <div className="space-y-3.5">
                {currentSystem.lifestyle_best_practices.map((bp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-emerald-200/80 dark:bg-emerald-900/80 text-emerald-900 dark:text-emerald-200">
                        {bp.category}
                      </span>
                      <strong className="text-xs font-bold text-slate-800 dark:text-slate-200 font-display">
                        {bp.rule_zh}
                      </strong>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                      <strong className="text-emerald-700 dark:text-emerald-400 font-mono">作用機轉：</strong>
                      {bp.mechanism_zh}
                    </p>
                    <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200/50 dark:border-emerald-900/40 text-xs font-sans text-slate-700 dark:text-slate-200">
                      <strong className="text-slate-900 dark:text-white font-mono font-bold">執行動作：</strong>
                      {bp.practical_action_zh}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 6: Peer-reviewed Research Citations */}
          {activeTab === 'citations' && (
            <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-4 animate-fade-in shadow-sm">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-wider text-salud-cyan font-bold block">
                  Peer-Reviewed Citations & High-Impact Literature
                </span>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  權威期刊與醫學指引文獻
                </h3>
              </div>

              <div className="space-y-3">
                {currentSystem.research_citations.map((cite, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-salud-cyan">{cite.journal} ({cite.year})</span>
                      {cite.doi && (
                        <a
                          href={`https://doi.org/${cite.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-slate-400 flex items-center gap-1"
                        >
                          <span>DOI: {cite.doi}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white font-sans">
                      {cite.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {cite.authors}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-sans pt-1 border-t border-slate-100 dark:border-slate-800">
                      <strong className="text-salud-cyan font-mono font-bold">核心實證結論：</strong>
                      {cite.key_takeaway_zh}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Action Footprint: Link into Diet, Exercise & Synergy ── */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-100 via-white to-salud-cyan/10 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 max-w-xl">
          <span className="font-mono text-[10px] uppercase tracking-wider text-salud-cyan font-bold block">
            Integrated Lifestyle Medicine
          </span>
          <h4 className="font-display font-bold text-sm sm:text-base text-slate-900 dark:text-white">
            透過四大健康支柱為這套系統提供生活型態處方？
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            前往【飲食與營養】深入探討各營養素與營養保健，或啟動【全人跨領域處方協同引擎】查看多靶點聯動。
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => nav.selectPillar('diet')}
            className="btn-tactile px-4 py-2.5 rounded-2xl bg-nature-amber-500 hover:bg-nature-amber-600 text-black font-bold font-mono text-xs shadow-sm flex items-center gap-1.5"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>探索飲食與營養</span>
          </button>
          <button
            onClick={() => nav.openSynergy()}
            className="btn-tactile px-4 py-2.5 rounded-2xl bg-salud-cyan hover:bg-salud-cyan/90 text-black font-bold font-mono text-xs shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>跨領域處方協同</span>
          </button>
        </div>
      </div>
    </div>
  );
};
