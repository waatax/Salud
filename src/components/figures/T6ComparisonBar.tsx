import React, { useState, useMemo } from 'react';
import { EDIBLE_OILS } from '../../data/oilsData';
import { ArrowUpDown, Flame, Search } from 'lucide-react';

export const T6ComparisonBar: React.FC = () => {
  const [sortBy, setSortBy] = useState<'mufa' | 'pufa' | 'sfa' | 'smoke_point'>('mufa');
  const [filterTaiwan, setFilterTaiwan] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const sortedOils = useMemo(() => {
    return [...EDIBLE_OILS]
      .filter((oil) => {
        if (filterTaiwan && !oil.is_local_tw) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          return oil.name_zh.toLowerCase().includes(q) || oil.name_en.toLowerCase().includes(q);
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'mufa') return b.mufa_pct - a.mufa_pct;
        if (sortBy === 'pufa') return b.pufa_pct - a.pufa_pct;
        if (sortBy === 'sfa') return b.sfa_pct - a.sfa_pct;
        if (sortBy === 'smoke_point') return b.smoke_point_c - a.smoke_point_c;
        return 0;
      });
  }, [sortBy, filterTaiwan, searchQuery]);

  return (
    <div className="w-full max-w-3xl space-y-4 font-sans text-xs">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-slate-800">
        {/* Search input */}
        <div className="relative min-w-[160px] flex-1">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋食用油品（如苦茶油、橄欖油）..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-salud-amber text-xs"
          />
        </div>

        {/* Sort select */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400 font-mono hidden sm:inline">排序：</span>
          <div className="flex gap-1">
            <button
              onClick={() => setSortBy('mufa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'mufa'
                  ? 'bg-salud-cyan text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              單元 MUFA
            </button>
            <button
              onClick={() => setSortBy('pufa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'pufa'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              多元 PUFA
            </button>
            <button
              onClick={() => setSortBy('sfa')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                sortBy === 'sfa'
                  ? 'bg-salud-amber text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              飽和 SFA
            </button>
            <button
              onClick={() => setSortBy('smoke_point')}
              className={`px-2.5 py-1 rounded-md font-medium flex items-center gap-1 transition-all ${
                sortBy === 'smoke_point'
                  ? 'bg-orange-500 text-black font-bold'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Flame className="w-3 h-3" /> 發煙點
            </button>
          </div>
        </div>

        {/* Taiwan Local Toggle */}
        <button
          onClick={() => setFilterTaiwan(!filterTaiwan)}
          className={`px-2.5 py-1 rounded-md border font-mono transition-all ${
            filterTaiwan
              ? 'bg-salud-amber-500/20 border-salud-amber-400 text-salud-amber-300'
              : 'border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
        >
          {filterTaiwan ? '✓ 只看台灣在地油' : '顯示台灣常見油品'}
        </button>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between px-2 text-slate-300 font-mono text-[11px]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-salud-cyan shadow-cyan-glow" />
            單元不飽和 (MUFA)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-emerald-500" />
            多元不飽和 (PUFA)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-salud-amber" />
            飽和脂肪酸 (SFA)
          </span>
        </div>
        <span className="text-slate-400 hidden sm:inline">100% 堆疊佔總脂肪酸比例</span>
      </div>

      {/* Stacked Bars List */}
      <div className="space-y-2.5">
        {sortedOils.map((oil) => (
          <div
            key={oil.id}
            className="p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            {/* Oil title & tags */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-100">{oil.name_zh}</span>
                <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                  {oil.name_en}
                </span>
                {oil.is_local_tw && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-salud-amber/20 text-salud-amber-300 border border-salud-amber/40">
                    在地
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="flex items-center gap-1 text-orange-400">
                  <Flame className="w-3 h-3" />
                  發煙點 ~{oil.smoke_point_c}°C
                </span>
              </div>
            </div>

            {/* Proportional Stacked Bar */}
            <div className="h-5 w-full flex rounded-lg overflow-hidden bg-slate-800 border border-slate-700/50">
              {/* MUFA Segment */}
              <div
                style={{ width: `${oil.mufa_pct}%` }}
                className="bg-salud-cyan hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`單元不飽和 MUFA: ${oil.mufa_pct}%`}
              >
                {oil.mufa_pct >= 14 ? `${oil.mufa_pct}%` : ''}
              </div>

              {/* PUFA Segment */}
              <div
                style={{ width: `${oil.pufa_pct}%` }}
                className="bg-emerald-500 hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`多元不飽和 PUFA: ${oil.pufa_pct}%`}
              >
                {oil.pufa_pct >= 14 ? `${oil.pufa_pct}%` : ''}
              </div>

              {/* SFA Segment */}
              <div
                style={{ width: `${oil.sfa_pct}%` }}
                className="bg-salud-amber hover:opacity-90 flex items-center justify-center text-[10px] font-bold text-black transition-all"
                title={`飽和脂肪酸 SFA: ${oil.sfa_pct}%`}
              >
                {oil.sfa_pct >= 12 ? `${oil.sfa_pct}%` : ''}
              </div>
            </div>

            {/* Sub description */}
            <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
              <span>{oil.recommended_uses}</span>
              <span className="font-mono text-slate-500 hidden sm:inline">{oil.main_fa}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
