import React, { useState } from 'react';
import { EPIGENETIC_CLOCKS, PHENOAGE_BLOOD_BIOMARKERS } from '../../../data/longevityData';
import { EvidenceBadge } from '../../common/EvidenceBadge';
import {
  Clock,
  Gauge,
  Activity,
  Dna,
  Zap,
  Info,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  FileSpreadsheet,
} from 'lucide-react';

export const InfographEpigeneticClocks: React.FC = () => {
  const [dunedinPace, setDunedinPace] = useState<number>(0.88);
  const [activeClockId, setActiveClockId] = useState<string>('CLOCK-05');

  // Interactive DunedinPACE calculation
  // Base: 1.0 = average rate. < 1.0 = slower aging. > 1.0 = accelerated aging.
  const pacePercentage = Math.round((1 - dunedinPace) * 100);
  const mortalityDelta = Math.round((dunedinPace - 1.0) * 10 * 15); // ~15% per 0.1 delta

  const selectedClock = EPIGENETIC_CLOCKS.find((c) => c.id === activeClockId) || EPIGENETIC_CLOCKS[4];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl border border-emerald-300/80 dark:border-indigo-500/30 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 dark:from-slate-900 dark:via-indigo-950/40 dark:to-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-indigo-400 uppercase tracking-wider">
            <Gauge className="w-4 h-4 text-emerald-600 dark:text-indigo-400" />
            <span>INFOGRAPH 2 · 表觀遺傳時鐘與生理年齡量化</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white mt-1">
            從「日曆年齡」走向「生物真實老化速率」
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl font-medium">
            前兩代時鐘記錄人體累積磨損，第三代 DunedinPACE 則是實時「車速表」，精準捕捉近 3~6 個月抗衰介入效益。
          </p>
        </div>

        <div className="px-3.5 py-2 rounded-xl bg-white/90 dark:bg-indigo-500/10 border border-emerald-200 dark:border-indigo-500/30 text-center shrink-0 shadow-xs">
          <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-bold">當前黃金標準</div>
          <div className="text-sm font-mono font-bold text-emerald-700 dark:text-indigo-300">DunedinPACE 3.0</div>
        </div>
      </div>

      {/* Interactive DunedinPACE Speedometer Visualizer */}
      <div className="rounded-3xl border border-emerald-300/80 dark:border-indigo-500/30 bg-white/95 dark:bg-slate-900/80 p-6 sm:p-8 space-y-6 shadow-sm dark:shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-indigo-400">
              <Clock className="w-4 h-4 text-emerald-600 dark:text-indigo-400" />
              <span>第三代時鐘動態模擬：DunedinPACE 即時老化速率</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              拖曳下方滑桿模擬您的衰老速度（1.0 代表平均速率，消耗 1 生理年 / 日曆年）
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">當前速率:</span>
            <span className={`text-2xl font-mono font-extrabold px-3 py-1 rounded-xl border ${
              dunedinPace < 0.95
                ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-100/70 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30'
                : dunedinPace <= 1.05
                ? 'text-teal-700 dark:text-indigo-400 bg-teal-100/70 dark:bg-indigo-500/10 border-teal-300 dark:border-indigo-500/30'
                : 'text-rose-700 dark:text-rose-400 bg-rose-100/70 dark:bg-rose-500/10 border-rose-300 dark:border-rose-500/30'
            }`}>
              {dunedinPace.toFixed(2)}x
            </span>
          </div>
        </div>

        {/* Speedometer Gauge Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">0.60x (長壽超級個體)</span>
            <span className="text-teal-700 dark:text-indigo-300 font-bold">1.00x (同齡基準均值)</span>
            <span className="text-rose-700 dark:text-rose-400 font-bold">1.40x (極速衰老高危)</span>
          </div>

          <input
            type="range"
            min="0.60"
            max="1.40"
            step="0.01"
            value={dunedinPace}
            onChange={(e) => setDunedinPace(parseFloat(e.target.value))}
            className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        {/* Real-time Biological Impact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950/80 border border-emerald-200/80 dark:border-slate-800 space-y-1 text-center shadow-xs">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">每歷經 1 日曆年</div>
            <div className="text-xl font-mono font-bold text-slate-900 dark:text-white">
              相當於生理消耗 <span className="text-emerald-700 dark:text-indigo-400">{dunedinPace.toFixed(2)}</span> 歲
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">
              {pacePercentage > 0 ? `慢速老化 ${pacePercentage}%` : `加速老化 ${Math.abs(pacePercentage)}%`}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950/80 border border-emerald-200/80 dark:border-slate-800 space-y-1 text-center shadow-xs">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">全因死亡率相對風險</div>
            <div className={`text-xl font-mono font-bold ${mortalityDelta <= 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
              {mortalityDelta <= 0 ? `${mortalityDelta}%` : `+${mortalityDelta}%`}
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">相較於人口標準值 1.0x</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-slate-950/80 border border-emerald-200/80 dark:border-slate-800 space-y-1 text-center shadow-xs">
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">20 年健康壽命差距預期</div>
            <div className="text-xl font-mono font-bold text-emerald-700 dark:text-salud-cyan">
              {dunedinPace < 1.0 ? `+${((1 - dunedinPace) * 20).toFixed(1)} 年` : `-${((dunedinPace - 1) * 20).toFixed(1)} 年`}
            </div>
            <div className="text-[10px] text-slate-600 dark:text-slate-400">免於重大失能之健康年限</div>
          </div>
        </div>
      </div>

      {/* 3 Generations Clocks Comparison Matrix */}
      <div className="rounded-3xl border border-emerald-300/80 dark:border-slate-800 bg-white/95 dark:bg-slate-900/60 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 dark:text-salud-cyan">
            <Activity className="w-4 h-4 text-emerald-600 dark:text-salud-cyan" />
            <span>三代 DNA 甲基化表觀遺傳時鐘演進對比</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-bold">CEBM Level 1a 實證標準</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {EPIGENETIC_CLOCKS.map((clock) => (
            <button
              key={clock.id}
              onClick={() => setActiveClockId(clock.id)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeClockId === clock.id
                  ? 'border-emerald-500 bg-emerald-100/90 dark:bg-indigo-500/20 text-slate-900 dark:text-white shadow-md ring-2 ring-emerald-500/20'
                  : 'border-emerald-200/70 dark:border-slate-800 bg-white/80 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 hover:border-emerald-400'
              }`}
            >
              <div className="text-[9px] font-mono font-bold text-emerald-800 dark:text-indigo-400">
                {clock.generation === '1ST_GEN' ? '第一代' : clock.generation === '2ND_GEN' ? '第二代' : '第三代'}
              </div>
              <div className="font-bold text-xs truncate mt-0.5 text-slate-900 dark:text-white">
                {clock.name_zh.split(' ')[0]}
              </div>
              <div className="text-[10px] font-mono text-slate-500 mt-1">
                {clock.developer} ({clock.year})
              </div>
            </button>
          ))}
        </div>

        {/* Selected Clock Details */}
        <div className="p-5 rounded-2xl bg-emerald-50/40 dark:bg-slate-950/80 border border-emerald-200/80 dark:border-slate-800 space-y-3 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200/60 dark:border-slate-850 pb-2.5">
            <div>
              <div className="font-bold text-base text-slate-900 dark:text-white">{selectedClock.name_zh}</div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                訓練目標：{selectedClock.training_target} · CpG 點位數：{selectedClock.cpg_sites_count}
              </div>
            </div>
            <EvidenceBadge grade={selectedClock.evidence_grade} />
          </div>

          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
            {selectedClock.clinical_utility_zh}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {selectedClock.key_biomarkers.map((bm, idx) => (
              <span key={`bm-${idx}`} className="px-2 py-0.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-[10px] font-mono text-indigo-300">
                {bm}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Morgan Levine PhenoAge 9-Biomarker Blood Calculator Reference */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
          <FileSpreadsheet className="w-4 h-4" />
          <span>免測 DNA 甲基化！Morgan Levine 9 項常規健檢血液生化 PhenoAge 算法對照</span>
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          長壽醫學里程碑：利用日常 15 分鐘常規抽血報告（健保多數已有給付），即可透過多變量死亡回歸模型精準預估表型年齡。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {PHENOAGE_BLOOD_BIOMARKERS.map((item, idx) => (
            <div key={`pheno-${idx}`} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{item.name}</span>
                <span className="text-[10px] font-mono text-slate-400">{item.unit}</span>
              </div>
              <div className="text-[11px] font-mono text-emerald-400">
                黃金長壽區間: {item.optimal_range}
              </div>
              <div className="text-[10px] text-amber-400/90 font-mono">
                {item.aging_direction}
              </div>
              <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-850 leading-relaxed">
                {item.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
