import React, { useState } from 'react';
import { EXPERT_MONOGRAPHS, ExpertMonographData, MonographReference } from '../../data/expertMonographs';
import { EXPERT_COUNCIL } from '../../data/expertCouncil';
import { EXPERT_BEST_PRACTICES } from '../../data/expertBestPractices';
import { ExpertSeatIllustration } from './ExpertSeatIllustration';
import { ExpertInfoGraph } from './ExpertInfoGraph';
import {
  BookOpen,
  FileText,
  CheckCircle2,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Stethoscope,
  Activity,
  Layers,
  Quote,
  ChevronRight,
  X,
  Printer,
  Search
} from 'lucide-react';

interface Props {
  expertId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelectExpert?: (expertId: string) => void;
}

export const ExpertMonographModal: React.FC<Props> = ({
  expertId,
  isOpen,
  onClose,
  onSelectExpert,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'mechanism' | 'trials' | 'metrics' | 'sop' | 'references' | 'graphics'>('overview');
  const [copiedRefId, setCopiedRefId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [refSearch, setRefSearch] = useState('');

  if (!isOpen) return null;

  // Find monograph data
  const monograph: ExpertMonographData =
    EXPERT_MONOGRAPHS.find((m) => m.expertId === expertId) || EXPERT_MONOGRAPHS[0];

  const councilMember = EXPERT_COUNCIL.find((c) => c.id === monograph.expertId);
  const bestPractice = EXPERT_BEST_PRACTICES.find((e) => e.expertId === monograph.expertId);

  const handleCopyCitation = (ref: MonographReference) => {
    const text = `[${ref.id}] ${ref.citation} (${ref.pmidOrDoi || ''}) - ${ref.keyFinding}`;
    navigator.clipboard.writeText(text);
    setCopiedRefId(ref.id);
    setTimeout(() => setCopiedRefId(null), 2000);
  };

  const handleCopyAllCitations = () => {
    const header = `【Salud 臨床醫學專論學術文獻庫】${monograph.expertId} ${monograph.title_zh}\n\n`;
    const body = monograph.references
      .map((r) => `[${r.id}] ${r.citation}\n    類型: ${r.studyType} | 識別: ${r.pmidOrDoi || 'N/A'}\n    關鍵實證: ${r.keyFinding}\n`)
      .join('\n');
    navigator.clipboard.writeText(header + body);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredRefs = monograph.references.filter(
    (r) =>
      r.citation.toLowerCase().includes(refSearch.toLowerCase()) ||
      r.keyFinding.toLowerCase().includes(refSearch.toLowerCase()) ||
      (r.pmidOrDoi && r.pmidOrDoi.toLowerCase().includes(refSearch.toLowerCase())) ||
      r.studyType.toLowerCase().includes(refSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in print:p-0 print:bg-white">
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Main Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="monograph-title"
        className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-3xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-salud-dark-surface shadow-2xl overflow-hidden z-10 print:border-none print:shadow-none print:max-h-none print:h-auto print:rounded-none"
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-5 sm:px-8 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-slate-50 via-nature-amber-50/40 to-purple-50/30 dark:from-slate-900/90 dark:via-nature-amber-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-xl bg-nature-amber-500 text-black font-mono text-xs font-black shadow-xs">
              {monograph.expertId}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800/50">
                  50+ 篇同行評審深度專論 (Peer-Reviewed Monograph)
                </span>
                <span className="hidden sm:inline-flex text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> 臨床嚴謹簽核
                </span>
              </div>
              <h2 id="monograph-title" className="text-base sm:text-xl font-display font-black text-slate-900 dark:text-white mt-0.5 leading-snug">
                {monograph.title_zh}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <button
              onClick={handlePrint}
              title="列印 / 輸出 PDF 專論"
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 text-xs font-mono"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden md:inline">列印專論</span>
            </button>
            <button
              onClick={handleCopyAllCitations}
              className="p-2 rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors flex items-center gap-1.5 text-xs font-mono font-bold"
            >
              {copiedAll ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copiedAll ? '已複製全部引文' : '複製專論引文'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="關閉專論"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Expert Quick Switch Ribbon */}
        {onSelectExpert && (
          <div className="px-5 sm:px-8 py-2 bg-slate-100/80 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-thin text-xs print:hidden">
            <span className="text-[10px] font-mono text-slate-500 font-bold shrink-0">切換席位：</span>
            {EXPERT_MONOGRAPHS.map((m) => (
              <button
                key={m.expertId}
                onClick={() => onSelectExpert(m.expertId)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold shrink-0 transition-colors ${
                  m.expertId === monograph.expertId
                    ? 'bg-nature-amber-500 text-black shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {m.expertId}
              </button>
            ))}
          </div>
        )}

        {/* Section Navigation Tabs */}
        <div className="px-5 sm:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex gap-2 overflow-x-auto scrollbar-thin text-xs font-mono font-bold print:hidden">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'overview'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            1. 專論綜述 (Overview)
          </button>
          <button
            onClick={() => setActiveTab('mechanism')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'mechanism'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            2. 分子病理機轉 (Mechanism)
          </button>
          <button
            onClick={() => setActiveTab('trials')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'trials'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5" />
            3. 臨床試驗統合 (Trials & Meta)
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'metrics'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            4. 量化生理指標矩陣 (Metrics)
          </button>
          <button
            onClick={() => setActiveTab('sop')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'sop'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            5. 臨床 SOP 與紅線 (SOP & Safety)
          </button>
          <button
            onClick={() => setActiveTab('references')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'references'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Quote className="w-3.5 h-3.5" />
            6. 完整學術文獻庫 ({monograph.references.length} 篇)
          </button>
          <button
            onClick={() => setActiveTab('graphics')}
            className={`py-3 px-3 border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === 'graphics'
                ? 'border-nature-amber-500 text-nature-amber-800 dark:text-nature-amber-400 bg-nature-amber-50/50 dark:bg-nature-amber-950/20'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            🎨 專屬醫學插圖與機制圖
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200 font-sans text-xs sm:text-sm">
          {/* Subtitle & Governance Anchor */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <p className="font-mono text-xs text-slate-500 dark:text-slate-400 italic">
                {monograph.title_en}
              </p>
              <p className="font-sans text-xs font-bold text-slate-700 dark:text-slate-300">
                {monograph.subtitle_zh}
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                {monograph.governancePillar_zh}
              </span>
            </div>
          </div>

          {/* TAB 1: 專論綜述 */}
          {(activeTab === 'overview' || activeTab === 'graphics') && (
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-nature-amber-500 text-black font-bold text-xs">
                  01
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  執行摘要與臨床治理背景 (Executive Summary)
                </h3>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 space-y-3">
                <p>{monograph.executiveSummary_zh}</p>
                <div className="p-3.5 rounded-xl bg-nature-amber-50/80 dark:bg-nature-amber-950/30 border border-nature-amber-200 dark:border-nature-amber-800/60 flex items-start gap-3">
                  <Quote className="w-5 h-5 text-nature-amber-600 dark:text-nature-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs font-mono text-nature-amber-900 dark:text-nature-amber-300 block mb-0.5">
                      民眾白話轉譯核心觀念 (Public Health Translation)：
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {monograph.publicHealthTakeaway_zh}
                    </p>
                  </div>
                </div>
              </div>

              {/* Monograph Visual Graphic Card */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-500 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-nature-amber-500" />
                    專屬醫學視覺插圖 (Seat Bespoke Illustration)
                  </span>
                </div>
                <ExpertSeatIllustration expertId={monograph.expertId} />
              </div>
            </section>
          )}

          {/* TAB 2: 分子與細胞病理機轉 */}
          {(activeTab === 'mechanism' || activeTab === 'overview') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-purple-500 text-white font-bold text-xs">
                  02
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  細胞與分子病理機轉解構 (Cellular & Molecular Pathophysiology)
                </h3>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300 space-y-3">
                <p>{monograph.pathophysiologyDeepDive_zh}</p>
                {bestPractice?.infograph && (
                  <div className="pt-2">
                    <span className="font-mono text-[11px] font-bold text-purple-700 dark:text-purple-400 block mb-2">
                      生化機制向量與決策路徑 (Infographic Mechanism)：
                    </span>
                    <ExpertInfoGraph
                      title={bestPractice.infograph.title_zh}
                      type={bestPractice.infograph.type}
                      steps={bestPractice.infograph.steps}
                      keyTakeaway={bestPractice.infograph.keyTakeaway_zh}
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* TAB 3: 臨床試驗與統合分析實證 */}
          {(activeTab === 'trials' || activeTab === 'overview') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-500 text-white font-bold text-xs">
                  03
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                  大型臨床試驗與統合分析實證 (Clinical Trials & Meta-Analytic Synthesis)
                </h3>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 leading-relaxed text-slate-700 dark:text-slate-300">
                <p>{monograph.clinicalTrialSynthesis_zh}</p>
              </div>
            </section>
          )}

          {/* TAB 4: 量化指標與危急值安全矩陣 */}
          {(activeTab === 'metrics' || activeTab === 'overview') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-sky-500 text-white font-bold text-xs">
                    04
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    量化生理指標與安全閾值矩陣 (Quantitative Biomarker & Safety Thresholds)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-500">
                  共 {monograph.quantitativeMetrics.length} 項核心監控變因
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/90 dark:bg-slate-900 font-mono text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3">監控生化/生理指標</th>
                      <th className="p-3">臨床最佳標竿範圍 (Optimal)</th>
                      <th className="p-3">危急異常/紅線門檻 (Critical)</th>
                      <th className="p-3">臨床重要性與風險機轉 (Significance)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950">
                    {monograph.quantitativeMetrics.map((qm, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 font-bold text-slate-900 dark:text-white font-mono">
                          {qm.metric}
                        </td>
                        <td className="p-3 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {qm.optimalRange}
                        </td>
                        <td className="p-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                          {qm.criticalThreshold}
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          {qm.clinicalSignificance}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* TAB 5: 臨床標準作業程序 (SOP) 與絕對禁忌紅線 */}
          {(activeTab === 'sop' || activeTab === 'overview') && (
            <section className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500 text-white font-bold text-xs">
                    05
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    臨床介入標準作業程序與禁忌紅線 (Clinical Protocol SOP & Contraindications)
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  嚴禁越界
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/90 dark:bg-slate-900 font-mono text-slate-600 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-3">階段與步驟</th>
                      <th className="p-3">臨床處置行動 (Clinical Action)</th>
                      <th className="p-3">生理控制目標 (Target)</th>
                      <th className="p-3 text-rose-600 dark:text-rose-400">絕對禁忌與安全紅線 (Contraindications)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-950">
                    {monograph.protocolSOP.map((sop, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="p-3 font-bold font-mono text-nature-amber-800 dark:text-nature-amber-300">
                          {sop.stage}
                        </td>
                        <td className="p-3 text-slate-800 dark:text-slate-200">
                          {sop.action}
                        </td>
                        <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {sop.target}
                        </td>
                        <td className="p-3 font-semibold text-rose-700 dark:text-rose-300 bg-rose-50/40 dark:bg-rose-950/20">
                          {sop.contraindication}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* TAB 6: 完整學術文獻庫與 DOI / PMID */}
          {(activeTab === 'references' || activeTab === 'overview') && (
            <section className="space-y-4 pt-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-600 text-white font-bold text-xs">
                    06
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white">
                    完整同行評審參考文獻庫 (Peer-Reviewed References & Citations)
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 font-mono text-[10px] font-bold">
                    共 {monograph.references.length} 篇權威文獻
                  </span>
                </div>

                <div className="relative w-full sm:w-60">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="搜尋文獻作者、DOI、期刊..."
                    value={refSearch}
                    onChange={(e) => setRefSearch(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-hidden focus:border-nature-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                {filteredRefs.map((ref) => (
                  <div
                    key={ref.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/50 hover:border-purple-300 dark:hover:border-purple-700/60 transition-colors space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md font-mono text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          [{ref.id}]
                        </span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/50">
                          {ref.studyType}
                        </span>
                        {ref.pmidOrDoi && (
                          <span className="font-mono text-[11px] font-bold text-sky-600 dark:text-sky-400">
                            {ref.pmidOrDoi}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleCopyCitation(ref)}
                        className="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-[10px] font-mono text-slate-600 dark:text-slate-300 flex items-center gap-1 transition-colors"
                      >
                        {copiedRefId === ref.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span className="text-emerald-500 font-bold">已複製引文</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>複製此條引文</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="font-serif text-xs text-slate-900 dark:text-slate-100 leading-relaxed font-semibold">
                      {ref.citation}
                    </p>

                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                      <span className="font-mono font-bold text-slate-400 shrink-0">實證焦點：</span>
                      <span>{ref.keyFinding}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Bottom Dossier Verification Footer */}
          <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>本臨床專論由 Salud 醫學治理委員會審核簽核，嚴格恪遵 GRADE 實證體系與醫學倫理法規。</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-200 text-white dark:text-black font-bold hover:opacity-90 transition-opacity"
            >
              完成研讀並返回總覽
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
