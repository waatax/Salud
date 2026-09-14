import React, { useState } from 'react';
import {
  CLINICAL_TRIALS_DATABASE,
  DRUG_INTERACTIONS_FIREWALL,
  ClinicalTrialRecord,
  DrugInteractionItem,
} from '../../../data/obesityIterationsData';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  Pill,
  Activity,
  Heart,
  ExternalLink,
} from 'lucide-react';

export const DrugInteractionMatrix: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeSubTab, setActiveSubTab] = useState<'TRIALS' | 'INTERACTIONS'>('TRIALS');
  const [filterDrug, setFilterDrug] = useState<string>('ALL');

  const filteredTrials = CLINICAL_TRIALS_DATABASE.filter((t) => {
    const matchesSearch =
      t.trial_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.drug_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.population_description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDrug =
      filterDrug === 'ALL' ||
      (filterDrug === 'SEMA' && t.drug_name.includes('Semaglutide')) ||
      (filterDrug === 'TIRZ' && t.drug_name.includes('Tirzepatide'));
    return matchesSearch && matchesDrug;
  });

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-mono font-bold mb-1.5">
            <Pill className="w-3.5 h-3.5" />
            <span>臨床三期全系列試驗 × 交互禁忌防火牆</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 dark:text-white">
            抗肥胖處方試驗全景檢索與用藥防火牆
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            由 EC-28 肥胖專科醫師與 EC-01 醫療總監核准，收錄 STEP 1-8、SURMOUNT、SELECT 等指標 RCT 數據及藥物交互禁忌。
          </p>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setActiveSubTab('TRIALS')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'TRIALS'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            RCT 臨床試驗庫
          </button>
          <button
            onClick={() => setActiveSubTab('INTERACTIONS')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeSubTab === 'INTERACTIONS'
                ? 'bg-rose-500 text-white font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            藥物交互作用防火牆
          </button>
        </div>
      </div>

      {/* VIEW 1: CLINICAL TRIALS DATABASE */}
      {activeSubTab === 'TRIALS' && (
        <div className="space-y-4 animate-fade-in text-xs">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="搜尋試驗代號 (如 STEP-1, SELECT, SURMOUNT) 或族群..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-1.5 font-mono text-xs">
              <button
                onClick={() => setFilterDrug('ALL')}
                className={`px-2.5 py-1.5 rounded-lg border ${
                  filterDrug === 'ALL'
                    ? 'border-amber-400 bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400'
                }`}
              >
                全部試驗
              </button>
              <button
                onClick={() => setFilterDrug('SEMA')}
                className={`px-2.5 py-1.5 rounded-lg border ${
                  filterDrug === 'SEMA'
                    ? 'border-amber-400 bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400'
                }`}
              >
                Semaglutide
              </button>
              <button
                onClick={() => setFilterDrug('TIRZ')}
                className={`px-2.5 py-1.5 rounded-lg border ${
                  filterDrug === 'TIRZ'
                    ? 'border-amber-400 bg-amber-400/20 text-amber-700 dark:text-amber-300 font-bold'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400'
                }`}
              >
                Tirzepatide
              </button>
            </div>
          </div>

          {/* Trials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTrials.map((tr) => (
              <div
                key={tr.trial_code}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-3 hover:border-amber-400 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40">
                    {tr.trial_code}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {tr.sample_size.toLocaleString()} 位受試者 · {tr.duration_weeks} 週
                  </span>
                </div>

                <div>
                  <div className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {tr.drug_name}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {tr.population_description}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center font-mono">
                  <div>
                    <div className="text-[9px] text-slate-400">用藥組平均減重</div>
                    <div className="text-base font-extrabold text-amber-600 dark:text-amber-400">
                      -{tr.mean_weight_loss_pct}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-400">安慰劑對照組</div>
                    <div className="text-base font-extrabold text-slate-500">
                      -{tr.placebo_loss_pct}%
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>主要終點成效：</strong> {tr.primary_endpoints}
                </p>

                <div className="text-[10px] text-emerald-700 dark:text-emerald-400/90 font-mono bg-emerald-500/10 p-2 rounded-lg">
                  {tr.cardiovascular_metabolic_notes}
                </div>

                <div className="text-[9px] font-mono text-slate-400 truncate pt-1 border-t border-slate-100 dark:border-slate-800">
                  引用文獻: {tr.source_citation}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: DRUG INTERACTION FIREWALL */}
      {activeSubTab === 'INTERACTIONS' && (
        <div className="space-y-4 animate-fade-in text-xs">
          <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="font-bold">臨床紅旗警告 · 處方交互作用防禦網</div>
              <p className="text-[11px] leading-relaxed">
                抗肥胖藥物對消化道排空速率及中樞神經系統具高度影響，開立前務必主動檢視患者現行慢性病處方，嚴格阻絕低血糖與藥物中毒。
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {DRUG_INTERACTIONS_FIREWALL.map((item, idx) => (
              <div
                key={`inter-${idx}`}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    {item.risk_level === 'HIGH_RISK' ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 animate-pulse" />
                    ) : item.risk_level === 'CAUTION' ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                    ) : (
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
                    )}
                    <span>{item.drug_combination}</span>
                  </div>

                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold self-start sm:self-auto ${
                      item.risk_level === 'HIGH_RISK'
                        ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/40'
                        : item.risk_level === 'CAUTION'
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/40'
                        : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40'
                    }`}
                  >
                    {item.risk_level === 'HIGH_RISK' ? '高危禁忌' : item.risk_level === 'CAUTION' ? '臨床注意' : '高度協同獲益'}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-rose-700 dark:text-rose-400">
                  {item.clinical_consequence_zh}
                </div>

                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>藥理學機轉：</strong> {item.pharmacological_mechanism_zh}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300">
                  <strong>處方管理指引：</strong> {item.management_protocol_zh}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
