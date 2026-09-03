import React, { useState } from 'react';
import { FigureMeta } from '../../types';
import { EvidenceBadge } from '../common/EvidenceBadge';
import { Maximize2, Table, ChevronDown, ChevronUp, FileText, CheckCircle } from 'lucide-react';
import { Modal } from '../common/Modal';

interface Props {
  meta: FigureMeta;
  children: React.ReactNode;
  className?: string;
}

export const FigureContainer: React.FC<Props> = ({ meta, children, className = '' }) => {
  const [showTable, setShowTable] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  return (
    <figure
      className={`group relative rounded-2xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-surface dark:bg-salud-dark-surface overflow-hidden transition-all duration-200 hover:border-salud-light-borderHover dark:hover:border-salud-dark-borderHover shadow-sm ${className}`}
    >
      {/* Figure Top Bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-salud-light-border/60 dark:border-salud-dark-border/60 bg-salud-light-card/50 dark:bg-salud-dark-card/30">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-salud-amber/15 text-salud-amber-700 dark:text-salud-amber-400 border border-salud-amber/30">
            {meta.id}
          </span>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-salud-cyan/15 text-salud-cyan-700 dark:text-salud-cyan-400 border border-salud-cyan/30 hidden sm:inline">
            Type {meta.type}
          </span>
        </div>

        {/* Interactive action buttons */}
        <div className="flex items-center gap-1.5">
          {meta.data_table && (
            <button
              onClick={() => setShowTable(!showTable)}
              className={`flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg border transition-all ${
                showTable
                  ? 'bg-salud-cyan/20 border-salud-cyan/50 text-salud-cyan-700 dark:text-salud-cyan-300 font-bold'
                  : 'border-salud-light-border dark:border-salud-dark-border text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600'
              }`}
              title="切換無障礙等價資料表"
              aria-expanded={showTable}
            >
              <Table className="w-3.5 h-3.5" />
              <span>資料表</span>
              {showTable ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}

          <button
            onClick={() => setShowDesc(!showDesc)}
            className={`p-1.5 rounded-lg border transition-all ${
              showDesc
                ? 'bg-salud-amber/20 border-salud-amber/50 text-salud-amber-700 dark:text-salud-amber-300'
                : 'border-salud-light-border dark:border-salud-dark-border text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600'
            }`}
            title="查看完整科學文字長描述 (Long Description)"
            aria-expanded={showDesc}
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(true)}
            className="p-1.5 rounded-lg border border-salud-light-border dark:border-salud-dark-border text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-all"
            title="全螢幕檢視放大圖解"
            aria-label="全螢幕檢視圖解"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main SVG Render Area (CLS = 0 with min-height & responsive layout) */}
      <div className="p-4 sm:p-6 flex items-center justify-center min-h-[300px] sm:min-h-[380px] overflow-hidden bg-slate-100/60 dark:bg-salud-dark-bg/40">
        <div className="w-full max-w-full overflow-x-auto flex justify-center">
          {children}
        </div>
      </div>

      {/* Screen Reader accessible alt text */}
      <div className="sr-only">
        {meta.alt_text}
      </div>

      {/* Expandable Equivalent Accessible Data Table (Spec §4.6) */}
      {meta.data_table && showTable && (
        <div className="border-t border-salud-light-border/80 dark:border-salud-dark-border/80 bg-slate-100/90 dark:bg-slate-900/90 p-4 sm:p-5 overflow-x-auto animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <h5 className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5">
              <Table className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              無障礙等價資料表 (TBL-{meta.id.replace('FIG-', '')})
            </h5>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
              與圖解數值完全同步
            </span>
          </div>
          <table className="w-full text-left text-xs border-collapse font-sans">
            <caption className="sr-only">{meta.title} 等價資料表</caption>
            <thead>
              <tr className="border-b border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono">
                {meta.data_table.headers.map((h, idx) => (
                  <th key={idx} scope="col" className="py-2 px-3 font-semibold text-slate-800 dark:text-slate-200 bg-slate-200/80 dark:bg-slate-800/60 first:rounded-l-lg last:rounded-r-lg">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {meta.data_table.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-200/50 dark:hover:bg-slate-800/40 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="py-2.5 px-3 tabular-nums">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expandable Long Description (Spec §4.6) */}
      {showDesc && (
        <div className="border-t border-salud-light-border/80 dark:border-salud-dark-border/80 bg-salud-light-card/90 dark:bg-salud-dark-card/90 p-4 sm:p-5 text-xs text-slate-700 dark:text-slate-300 space-y-2 animate-fade-in">
          <div className="font-bold text-salud-amber-700 dark:text-salud-amber-300 font-mono flex items-center gap-1.5">
            <FileText className="w-4 h-4" /> 結構化長描述 (Long Description for Screen Readers)
          </div>
          <pre className="whitespace-pre-wrap font-sans text-xs text-slate-700 dark:text-slate-300/90 leading-relaxed bg-slate-100 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            {meta.long_description}
          </pre>
        </div>
      )}

      {/* Caption & Metadata Footer (Spec §10.3) */}
      <figcaption className="p-4 sm:p-6 border-t border-salud-light-border/60 dark:border-salud-dark-border/60 space-y-2.5 bg-salud-light-card/40 dark:bg-salud-dark-card/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-sm sm:text-base font-bold font-display text-salud-light-text dark:text-salud-dark-text">
            {meta.title}
          </h4>
          <EvidenceBadge grade={meta.evidence_grade} />
        </div>

        <p className="text-xs sm:text-sm text-salud-light-muted dark:text-salud-dark-muted leading-relaxed">
          {meta.caption}
        </p>

        {meta.scale_disclaimer && (
          <div className="text-[11px] text-salud-amber-700 dark:text-salud-amber-400/90 font-mono bg-salud-amber-500/10 px-2.5 py-1 rounded inline-block">
            ⚠ 示意圖，非真實細胞等比例縮放
          </div>
        )}

        {/* Source and Review Governance Badge */}
        <div className="pt-2 border-t border-salud-light-border/60 dark:border-salud-dark-border/40 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span>來源：{meta.data_source_ids.join(', ')}</span>
            <span>·</span>
            <span className="text-slate-700 dark:text-slate-300">版本：{meta.source_version}</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>審查簽核：{meta.accuracy_reviewed_by.join(', ')}</span>
          </div>
        </div>
      </figcaption>

      {/* Fullscreen Modal View */}
      <Modal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        title={`${meta.id} · ${meta.title}`}
        subtitle={meta.caption}
        maxWidth="full"
      >
        <div className="flex flex-col items-center justify-center p-4 bg-salud-dark-bg min-h-[60vh] rounded-xl">
          <div className="w-full max-w-5xl flex justify-center">
            {children}
          </div>
          <p className="mt-4 text-xs font-mono text-slate-400">
            按 Esc 鍵或點擊右上角關閉全螢幕檢視
          </p>
        </div>
      </Modal>
    </figure>
  );
};
