import React, { useState } from 'react';
import { DIETARY_NUTRIENTS } from '../../data/dietaryNutrientsData';
import { DietaryNutrient, DietaryNutrientId } from '../../types';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import {
  Wheat,
  Leaf,
  Egg,
  Sun,
  Zap,
  Flame,
  Droplets,
  Pill,
  Wine,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  AlertOctagon,
  BookOpen,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';

export const DietaryNutrientsView: React.FC = () => {
  const nav = useNavigation();
  const modal = useModal();
  const [selectedNutrient, setSelectedNutrient] = useState<DietaryNutrient | null>(null);

  const getNutrientIcon = (id: DietaryNutrientId) => {
    switch (id) {
      case 'carbohydrates': return Wheat;
      case 'fiber': return Leaf;
      case 'protein': return Egg;
      case 'vitamins': return Sun;
      case 'minerals': return Zap;
      case 'fats': return Flame;
      case 'hydration': return Droplets;
      case 'supplements': return Pill;
      case 'alcohol': return Wine;
    }
  };

  const handleLinkAction = (nutrient: DietaryNutrient) => {
    if (!nutrient.linked_chapter_or_tool) return;
    const { type, id } = nutrient.linked_chapter_or_tool;
    if (type === 'chapter') {
      nav.selectChapter(id);
    } else if (type === 'hub') {
      if (id === 'supplements') {
        nav.selectPillar('supplements');
      }
    } else if (type === 'modal') {
      modal.openModal(id as any);
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-display font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Wheat className="w-5 h-5 text-nature-amber-600 dark:text-nature-amber-400" />
            <span>各式飲食核心重點與營養深研矩陣 (Dietary Components Spectrum)</span>
          </h3>
          <p className="text-xs font-mono text-slate-500 dark:text-slate-400">
            從巨量物質到微量催化輔酶，嚴謹取材自《The Lancet》、《NEJM》、《Cell》等權威醫學期刊
          </p>
        </div>
        <span className="self-start sm:self-auto px-2.5 py-1 rounded-full font-mono text-[10px] font-bold bg-nature-amber-100 dark:bg-nature-amber-950/60 text-nature-amber-800 dark:text-nature-amber-300 border border-nature-amber-200 dark:border-nature-amber-800/60">
          9 大板塊（酒精排至末端）
        </span>
      </div>

      {/* Nutrients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DIETARY_NUTRIENTS.map((item) => {
          const Icon = getNutrientIcon(item.id);
          const isAlcohol = item.id === 'alcohol';
          const isSupplements = item.id === 'supplements';
          return (
            <div
              key={item.id}
              onClick={() => setSelectedNutrient(item)}
              className={`btn-tactile p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 group ${
                isAlcohol
                  ? 'border-purple-200 dark:border-purple-900/60 bg-gradient-to-br from-purple-50/40 via-white to-purple-50/20 dark:from-purple-950/20 dark:via-salud-dark-card dark:to-slate-950 hover:border-purple-400'
                  : isSupplements
                  ? 'border-nature-green-200 dark:border-nature-green-900/60 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/20 dark:from-emerald-950/20 dark:via-salud-dark-card dark:to-slate-950 hover:border-nature-green-400'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-nature-amber-400 dark:hover:border-nature-amber-500 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      isAlcohol
                        ? 'bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300'
                        : isSupplements
                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300'
                        : 'bg-nature-amber-100 dark:bg-nature-amber-950/60 text-nature-amber-700 dark:text-nature-amber-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      isAlcohol
                        ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 mb-0.5">
                    <span>Part 0{item.order_index}</span>
                    <span>•</span>
                    <span className="truncate">{item.name_en}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-white group-hover:text-nature-amber-600 dark:group-hover:text-nature-amber-300 transition-colors">
                    {item.name_zh}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-sans leading-relaxed pt-1.5 line-clamp-2">
                    {item.tagline_zh}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-[11px]">
                <span className="text-slate-400">點擊閱讀完整深研</span>
                <span className="text-nature-amber-700 dark:text-nature-amber-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  進入專頁 →
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-depth Nutrient Modal / Full Screen Dossier */}
      {selectedNutrient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-nature-amber-100 dark:bg-nature-amber-950/60 text-nature-amber-700 dark:text-nature-amber-300 flex items-center justify-center">
                  {React.createElement(getNutrientIcon(selectedNutrient.id), { className: 'w-5 h-5' })}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-nature-amber-600 dark:text-nature-amber-400 font-bold uppercase">
                      Part 0{selectedNutrient.order_index} · {selectedNutrient.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-slate-900 dark:text-white">
                    {selectedNutrient.name_zh}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{selectedNutrient.name_en}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedNutrient(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="關閉視窗"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scrollable Area */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto font-sans text-xs">
              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 leading-relaxed text-sm text-slate-700 dark:text-slate-300 font-sans">
                {selectedNutrient.summary_zh}
              </div>

              {/* Biochemical Mechanisms */}
              <div className="space-y-2.5">
                <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-nature-amber-600 dark:text-nature-amber-400" />
                  <span>微觀生理生化機制 (Biochemical Cascades)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedNutrient.biochemical_mechanisms_zh.map((mech, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-1"
                    >
                      <div className="w-5 h-5 rounded-full bg-nature-amber-100 dark:bg-nature-amber-950 font-mono text-[10px] text-nature-amber-800 dark:text-nature-amber-300 font-bold flex items-center justify-center">
                        {mIdx + 1}
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                        {mech}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Targets & Rich Food Sources */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 space-y-2">
                  <h5 className="font-display font-bold text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>每日建議攝取目標 (DRIs Target)</span>
                  </h5>
                  <p className="font-bold text-xs text-slate-800 dark:text-slate-200">
                    {selectedNutrient.daily_intake_targets.target_zh}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {selectedNutrient.daily_intake_targets.note_zh}
                  </p>
                  {selectedNutrient.daily_intake_targets.upper_limit_zh && (
                    <p className="text-[11px] font-mono text-red-600 dark:text-red-400 pt-1 border-t border-emerald-200/50 dark:border-emerald-900/30">
                      ⚠️ 安全攝取上限：{selectedNutrient.daily_intake_targets.upper_limit_zh}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                  <h5 className="font-display font-bold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Leaf className="w-4 h-4 text-nature-green-600" />
                    <span>原態食材推薦來源 (Rich Sources)</span>
                  </h5>
                  <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {selectedNutrient.rich_food_sources_zh.map((src, sIdx) => (
                      <li key={sIdx} className="flex items-start gap-1.5">
                        <span className="text-nature-amber-600">•</span>
                        <span>{src}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Myths & Truth */}
              {selectedNutrient.common_myths_zh.length > 0 && (
                <div className="space-y-2.5">
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    常見迷思與實證破除 (Myths vs Evidence)
                  </h4>
                  <div className="space-y-2">
                    {selectedNutrient.common_myths_zh.map((myth, myIdx) => (
                      <div key={myIdx} className="p-3.5 rounded-2xl bg-red-50/20 dark:bg-red-950/10 border border-red-200/60 dark:border-red-900/40 space-y-1">
                        <div className="text-red-700 dark:text-red-300 font-bold flex items-center gap-1.5">
                          <span>❌ 迷思：</span>
                          <span>{myth.myth}</span>
                        </div>
                        <div className="text-emerald-700 dark:text-emerald-300 pt-1 text-[11px] leading-relaxed">
                          <strong className="font-bold font-mono">✅ 醫學實證真理：</strong>
                          {myth.reality}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Best Practices */}
              <div className="p-4 rounded-2xl bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
                <h5 className="font-display font-bold text-xs text-amber-900 dark:text-amber-200">
                  日常飲食實踐最佳準則 (Best Practices)
                </h5>
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {selectedNutrient.best_practices_zh.map((bp, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold font-mono">{bIdx + 1}.</span>
                      <span>{bp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research Citations */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <h5 className="font-display font-bold text-xs text-slate-500 font-mono uppercase">
                  最新研究論文引用 (Peer-Reviewed Literature)
                </h5>
                <div className="space-y-2">
                  {selectedNutrient.research_citations.map((cite, cIdx) => (
                    <div key={cIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between font-mono text-salud-cyan">
                        <span>{cite.journal} ({cite.year})</span>
                        {cite.doi && <span>DOI: {cite.doi}</span>}
                      </div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{cite.title}</p>
                      <p className="text-slate-400 font-mono text-[10px]">{cite.authors}</p>
                      <p className="text-slate-600 dark:text-slate-400 pt-1">
                        <strong>核心發現：</strong>{cite.key_takeaway_zh}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer with Direct Link Jump */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 flex items-center justify-between">
              {selectedNutrient.linked_chapter_or_tool ? (
                <button
                  onClick={() => {
                    handleLinkAction(selectedNutrient);
                    setSelectedNutrient(null);
                  }}
                  className="btn-tactile px-5 py-2.5 rounded-2xl bg-nature-amber-500 hover:bg-nature-amber-600 text-black font-bold font-mono text-xs shadow-sm flex items-center gap-1.5"
                >
                  <span>{selectedNutrient.linked_chapter_or_tool.label_zh}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-xs text-slate-400 font-mono">
                  已完整呈現在本深研頁面
                </span>
              )}

              <button
                onClick={() => setSelectedNutrient(null)}
                className="btn-tactile px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 text-xs font-mono"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
