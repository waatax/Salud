/**
 * KnowledgeExplorerPage.tsx — Salud vNext.8 Knowledge Explorer (/explore)
 *
 * Atom-level structured knowledge retrieval interface.
 * Implements 8 facets (topic, risk_class, assertion_kind, certainty, population,
 * region, provenance_level, last_reviewed) and 3-Layer transparent views
 * (Summary, Algorithmic Evidence Derivation, Safety & Policy Boundaries).
 */

import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ShieldAlert,
  FileText,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Database,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CANONICAL_KNOWLEDGE_PACK_82 } from '../../knowledge/atoms/pack82';
import { CANONICAL_QUANTITATIVE_CLAIMS } from '../../knowledge/claims/claims';
import { CANONICAL_TAIWAN_POLICIES } from '../../knowledge/policies/taiwanPolicies';
import { CANONICAL_SAFETY_PREDICATES } from '../../compose/safety';
import { deriveCertainty } from '../../compose/certainty';
import { KnowledgeAtom, CertaintyLevel, RiskClass, AssertionKind, ProvenanceLevel } from '../../types/knowledge';

type ViewMode = 'summary' | 'evidence' | 'safety';

export const KnowledgeExplorerPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedKind, setSelectedKind] = useState<string>('all');
  const [selectedCertainty, setSelectedCertainty] = useState<string>('all');
  const [selectedProvenance, setSelectedProvenance] = useState<string>('all');
  const [activeViewMode, setActiveViewMode] = useState<ViewMode>('summary');
  const [selectedAtomId, setSelectedAtomId] = useState<string | null>(null);

  // Extract unique facet values
  const topics = useMemo(() => {
    const set = new Set(CANONICAL_KNOWLEDGE_PACK_82.map((a) => a.topic));
    return Array.from(set);
  }, []);

  const filteredAtoms = useMemo(() => {
    return CANONICAL_KNOWLEDGE_PACK_82.filter((atom) => {
      if (selectedTopic !== 'all' && atom.topic !== selectedTopic) return false;
      if (selectedRisk !== 'all' && atom.risk_class !== selectedRisk) return false;
      if (selectedKind !== 'all' && atom.assertion_kind !== selectedKind) return false;
      if (selectedCertainty !== 'all' && atom.derived_certainty !== selectedCertainty) return false;

      if (selectedProvenance !== 'all') {
        const prov = atom.evidence_records[0]?.provenance_level;
        if (prov !== selectedProvenance) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inStatement = atom.statement_zh.toLowerCase().includes(q);
        const inId = atom.id.toLowerCase().includes(q);
        const inGuard = atom.misuse_guard.toLowerCase().includes(q);
        const inPop = atom.applies_to.population.toLowerCase().includes(q);
        return inStatement || inId || inGuard || inPop;
      }

      return true;
    });
  }, [searchQuery, selectedTopic, selectedRisk, selectedKind, selectedCertainty, selectedProvenance]);

  const selectedAtom = useMemo(() => {
    if (!selectedAtomId) return filteredAtoms[0] || null;
    return CANONICAL_KNOWLEDGE_PACK_82.find((a) => a.id === selectedAtomId) || filteredAtoms[0] || null;
  }, [selectedAtomId, filteredAtoms]);

  // Derive audit steps dynamically using Layer 2 pure function
  const derivationAudit = useMemo(() => {
    if (!selectedAtom) return null;
    return deriveCertainty(selectedAtom.evidence_records, selectedAtom.certainty_override);
  }, [selectedAtom]);

  return (
    <div className="w-full space-y-6 animate-fade-in font-sans pb-16">
      {/* Page Header */}
      <div className="rounded-3xl border border-salud-cyan/30 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-salud-cyan/20 border border-salud-cyan/40 text-salud-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5" />
              Serving Layer · Explore v8.0
            </span>
            <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold">
              82 條規範知識點 (Canonical Pack)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
            規範知識點資料庫 (Knowledge Explorer)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            以原子化知識點（KnowledgeAtom）為最小引用單位的結構化醫學知識庫。每一條皆具備適用族群、演算法確定度推導、防誤用警示（Misuse Guard）與管轄政策來源，並支援機器可讀匯出。
          </p>

          {/* Machine Readable Export Links */}
          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
            <a
              href="./data/knowledge-graph.json"
              download="knowledge-graph.json"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-salud-cyan text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-salud-cyan" />
              <span>knowledge-graph.json</span>
            </a>
            <a
              href="./data/claims.jsonl"
              download="claims.jsonl"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 border border-slate-700 hover:border-salud-amber text-slate-200 hover:text-white transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-salud-amber" />
              <span>claims.jsonl (AI / RAG)</span>
            </a>
            <span className="text-slate-500 text-[11px] self-center">
              CI 規則已通過：VAL-001 ~ VAL-024
            </span>
          </div>
        </div>
      </div>

      {/* ── Facet Filtering Bar ── */}
      <div className="p-4 sm:p-5 rounded-2xl border border-slate-300 dark:border-slate-800 bg-salud-light-surface dark:bg-salud-dark-surface space-y-4 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜尋知識點陳述、ID、防誤用守則、族群關鍵字..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:border-salud-cyan transition-colors"
          />
        </div>

        {/* Facet Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* Topic Facet */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">主題 (Topic)</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none"
            >
              <option value="all">全部主題 ({CANONICAL_KNOWLEDGE_PACK_82.length})</option>
              {topics.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Class Facet */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">風險分級 (Risk)</label>
            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none"
            >
              <option value="all">全部風險 (All)</option>
              <option value="R3">R3 · 臨床診斷/安全閘</option>
              <option value="R2">R2 · 定量與生活型態建議</option>
              <option value="R1">R1 · 基礎生理機制</option>
            </select>
          </div>

          {/* Assertion Kind Facet */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">斷言類型 (Kind)</label>
            <select
              value={selectedKind}
              onChange={(e) => setSelectedKind(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none"
            >
              <option value="all">全部類型</option>
              <option value="diagnostic_boundary">diagnostic_boundary</option>
              <option value="policy">policy</option>
              <option value="quantitative">quantitative</option>
              <option value="bound">bound</option>
              <option value="range">range</option>
              <option value="heuristic">heuristic</option>
              <option value="procedural">procedural</option>
              <option value="comparative">comparative</option>
              <option value="qualitative">qualitative</option>
            </select>
          </div>

          {/* Certainty Facet */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">確定度 (Certainty)</label>
            <select
              value={selectedCertainty}
              onChange={(e) => setSelectedCertainty(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none"
            >
              <option value="all">全部確定度</option>
              <option value="high">High · 高確定度</option>
              <option value="moderate">Moderate · 中等</option>
              <option value="low">Low · 低確定度</option>
            </select>
          </div>

          {/* Provenance Facet */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">出處審核 (Provenance)</label>
            <select
              value={selectedProvenance}
              onChange={(e) => setSelectedProvenance(e.target.value)}
              className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-xs focus:outline-none"
            >
              <option value="all">全量審查狀態</option>
              <option value="verified-primary">verified-primary (一級實證)</option>
              <option value="regulatory-statute">regulatory-statute (法規政策)</option>
              <option value="expert-consensus">expert-consensus (專家共識)</option>
              <option value="needs-provenance-review">needs-provenance-review (⚑ 待查核)</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Main Content Split View ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[750px] overflow-y-auto pr-1">
          <div className="flex justify-between items-center text-xs font-mono text-slate-500 dark:text-slate-400 px-1">
            <span>篩選結果：{filteredAtoms.length} 條知識點</span>
            <span>點擊展開三層視圖</span>
          </div>

          {filteredAtoms.map((atom) => {
            const isSelected = selectedAtom?.id === atom.id;
            return (
              <div
                key={atom.id}
                onClick={() => setSelectedAtomId(atom.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-salud-cyan bg-cyan-50/80 dark:bg-cyan-950/30 shadow-md ring-1 ring-salud-cyan/50'
                    : 'border-slate-200 dark:border-slate-800 bg-salud-light-surface dark:bg-salud-dark-surface hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 font-mono text-[10px]">
                  <span className="font-bold text-salud-cyan-700 dark:text-salud-cyan">{atom.id}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        atom.risk_class === 'R3'
                          ? 'bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30'
                          : atom.risk_class === 'R2'
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {atom.risk_class}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {atom.assertion_kind}
                    </span>
                    <span
                      className={`px-1.5 py-0.2 rounded font-bold ${
                        atom.derived_certainty === 'high'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                          : atom.derived_certainty === 'moderate'
                          ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300'
                          : 'bg-slate-500/20 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {atom.derived_certainty}
                    </span>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-800 dark:text-slate-200 line-clamp-2 leading-relaxed">
                  {atom.statement_zh}
                </p>

                {atom.status === 'needs-provenance-review' && (
                  <div className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 font-mono flex items-center gap-1">
                    <span>⚑ 待原始出處查核 (VAL-016 阻擋上線中)</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 sticky top-6">
          {selectedAtom ? (
            <div className="rounded-3xl border border-slate-300 dark:border-slate-800 bg-salud-light-surface dark:bg-salud-dark-surface p-5 sm:p-7 space-y-6 shadow-xl">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="font-extrabold text-base text-salud-cyan-700 dark:text-salud-cyan">
                      {selectedAtom.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      主題：{selectedAtom.topic}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {selectedAtom.assertion_kind}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                    適用族群：{selectedAtom.applies_to.population}（{selectedAtom.applies_to.region}）· 審查日：{selectedAtom.last_reviewed}
                  </span>
                </div>

                {/* View Switcher */}
                <div className="flex rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                  <button
                    onClick={() => setActiveViewMode('summary')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeViewMode === 'summary'
                        ? 'bg-white dark:bg-slate-800 text-salud-cyan shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    簡要視圖
                  </button>
                  <button
                    onClick={() => setActiveViewMode('evidence')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeViewMode === 'evidence'
                        ? 'bg-white dark:bg-slate-800 text-salud-cyan shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    實證推導
                  </button>
                  <button
                    onClick={() => setActiveViewMode('safety')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeViewMode === 'safety'
                        ? 'bg-white dark:bg-slate-800 text-salud-cyan shadow-sm font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    防誤用與邊界
                  </button>
                </div>
              </div>

              {/* View 1: Summary View */}
              {activeViewMode === 'summary' && (
                <div className="space-y-5 animate-fade-in">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      核心陳述 (Statement)
                    </span>
                    <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-100 leading-relaxed">
                      {selectedAtom.statement_zh}
                    </p>
                  </div>

                  {/* Misuse Guard Box */}
                  <div className="p-4 rounded-2xl border border-amber-400/50 bg-amber-50/70 dark:bg-amber-950/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-xs font-mono">
                      <ShieldAlert className="w-4 h-4 text-amber-500" />
                      <span>防誤用守則 (Misuse Guard · E5 剛性防線)</span>
                    </div>
                    <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                      {selectedAtom.misuse_guard}
                    </p>
                  </div>

                  {/* Primary Source Meta */}
                  <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 text-xs font-mono space-y-1">
                    <span className="text-slate-500 block">主要實證出處 (Primary Source)：</span>
                    <strong className="text-slate-800 dark:text-slate-200 block">
                      {selectedAtom.primary_source}
                    </strong>
                  </div>
                </div>
              )}

              {/* View 2: Evidence Derivation View */}
              {activeViewMode === 'evidence' && (
                <div className="space-y-5 animate-fade-in text-xs">
                  <div className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-50/60 dark:bg-cyan-950/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-salud-cyan-800 dark:text-salud-cyan-300 font-mono">
                        純函數 deriveCertainty() 推導結果：[{derivationAudit?.level.toUpperCase()}]
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-200 dark:bg-cyan-900/60 text-cyan-900 dark:text-cyan-200">
                        積分分值：{derivationAudit?.score.toFixed(1)} / 4.0
                      </span>
                    </div>

                    <div className="space-y-1 pt-2 border-t border-cyan-500/20 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                      {derivationAudit?.rationaleSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-salud-cyan-600 dark:text-salud-cyan font-bold">{idx + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Evidence Records List */}
                  <div className="space-y-3">
                    <span className="font-mono text-[11px] text-slate-500 block font-bold">
                      登錄之實證紀錄 (Evidence Records)：
                    </span>
                    {selectedAtom.evidence_records.map((ev) => (
                      <div
                        key={ev.id}
                        className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-2 font-mono text-xs"
                      >
                        <div className="flex justify-between items-center text-[11px]">
                          <strong className="text-salud-cyan-700 dark:text-salud-cyan">{ev.id}</strong>
                          <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                            設計：{ev.design}
                          </span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 font-sans">{ev.citation}</p>
                        {ev.effect && (
                          <div className="p-2 rounded bg-slate-200/60 dark:bg-slate-800/80 text-[11px] space-y-1">
                            <div>
                              效應值：<strong>{ev.effect.measure} = {ev.effect.estimate}</strong>
                            </div>
                            <div>比較基準 (Comparator)：{ev.effect.comparator}</div>
                            {ev.effect.exposure_definition && (
                              <div>暴露定義：{ev.effect.exposure_definition}</div>
                            )}
                          </div>
                        )}
                        <div className="flex gap-3 text-[10px] text-slate-500">
                          <span>偏差風險：{ev.risk_of_bias}</span>
                          <span>直接性：{ev.directness}</span>
                          <span>出處層級：{ev.provenance_level}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View 3: Safety & Policy View */}
              {activeViewMode === 'safety' && (
                <div className="space-y-5 animate-fade-in text-xs">
                  {/* Safety Predicates */}
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] text-slate-500 block font-bold">
                      安全圖譜關聯謂詞 (Safety Predicates)：
                    </span>
                    {selectedAtom.safety_predicate_ids && selectedAtom.safety_predicate_ids.length > 0 ? (
                      <div className="space-y-2">
                        {selectedAtom.safety_predicate_ids.map((pid) => {
                          const pred = CANONICAL_SAFETY_PREDICATES[pid];
                          return (
                            <div
                              key={pid}
                              className="p-3.5 rounded-xl border border-red-300 dark:border-red-900/60 bg-red-50/50 dark:bg-red-950/20 space-y-1"
                            >
                              <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-bold font-mono">
                                <ShieldAlert className="w-3.5 h-3.5" />
                                <span>{pred ? pred.name : pid}</span>
                              </div>
                              <p className="text-slate-700 dark:text-slate-300 text-xs font-sans">
                                {pred ? pred.boundary_explanation_zh : '關聯安全謂詞防護'}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 font-mono">
                        本知識點無特定疾病排除謂詞，適用於宣告族群常態健康實踐。
                      </div>
                    )}
                  </div>

                  {/* Policy Ref if applicable */}
                  {selectedAtom.policy_ref_id && (
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] text-slate-500 block font-bold">
                        關聯公衛法規政策 (Taiwan Policy Object)：
                      </span>
                      {(() => {
                        const pol = CANONICAL_TAIWAN_POLICIES[selectedAtom.policy_ref_id!];
                        if (!pol) return null;
                        return (
                          <div className="p-3.5 rounded-xl border border-blue-300 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/20 space-y-2 font-mono text-xs">
                            <div className="flex justify-between items-center">
                              <strong className="text-blue-700 dark:text-blue-300 font-sans">{pol.title_zh}</strong>
                              <span className="px-1.5 py-0.5 rounded bg-blue-200 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-[10px]">
                                生效日：{pol.effective_from}
                              </span>
                            </div>
                            <div className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                              <div>篩檢模式：{pol.modality_zh}</div>
                              <div>週期：{pol.screening_interval_zh}</div>
                              <div>版本：{pol.policy_version}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center font-mono text-xs text-slate-500">
              請從左側清單選取知識點檢視詳情
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
