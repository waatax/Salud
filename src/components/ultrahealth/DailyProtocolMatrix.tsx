import React, { useState } from 'react';
import { DAILY_PROTOCOL_SLOTS } from '../../data/ultraHealthData';
import {
  Sun,
  Coffee,
  Activity,
  Utensils,
  Clock,
  Dumbbell,
  Moon,
  Bed,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sun: <Sun className="w-5 h-5 text-amber-500" />,
  Coffee: <Coffee className="w-5 h-5 text-amber-600" />,
  Activity: <Activity className="w-5 h-5 text-cyan-500" />,
  Utensils: <Utensils className="w-5 h-5 text-emerald-500" />,
  Clock: <Clock className="w-5 h-5 text-blue-500" />,
  Dumbbell: <Dumbbell className="w-5 h-5 text-rose-500" />,
  Moon: <Moon className="w-5 h-5 text-indigo-400" />,
  Bed: <Bed className="w-5 h-5 text-purple-400" />
};

export const DailyProtocolMatrix: React.FC = () => {
  const [activeSlotId, setActiveSlotId] = useState<string>(DAILY_PROTOCOL_SLOTS[0].id);

  const activeSlot = DAILY_PROTOCOL_SLOTS.find((s) => s.id === activeSlotId) || DAILY_PROTOCOL_SLOTS[0];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-salud-dark-surface to-blue-500/10 p-6 sm:p-8 backdrop-blur-md">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 text-xs font-mono font-bold mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>晝夜節律 × 臨床機轉 · 24H 動態全人作息守則</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
            健康生活 24 小時時序動態生活協議
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
            健康不是隨機的善意，而是精準對齊地球 24 小時自轉週期的生化交響樂。
            由晝夜節律權威、腎臟專科、心臟科、新陳代謝科與體能教練聯合制定，助你掌控全天活力與深度修復。
          </p>
        </div>
      </div>

      {/* 24-Hour Timeline Bar */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-[700px]">
          {DAILY_PROTOCOL_SLOTS.map((slot) => {
            const isSelected = slot.id === activeSlotId;
            return (
              <button
                key={slot.id}
                onClick={() => setActiveSlotId(slot.id)}
                className={`flex-1 min-w-[130px] p-3 rounded-2xl border text-left transition-all relative ${
                  isSelected
                    ? 'bg-cyan-500/20 dark:bg-cyan-500/25 border-cyan-500 shadow-md ring-2 ring-cyan-500/30'
                    : 'bg-white/60 dark:bg-salud-dark-surface/60 border-slate-200 dark:border-slate-800 hover:border-cyan-400/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400">
                    {slot.time_range}
                  </span>
                  <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {ICON_MAP[slot.icon_name] || <Clock className="w-3.5 h-3.5" />}
                  </div>
                </div>
                <div className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-1">
                  {slot.title_zh.split('：')[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Slot Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Mechanism & Action Checklist */}
        <div className="lg:col-span-2 bg-white/90 dark:bg-salud-dark-surface rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wide">
                時段：{activeSlot.time_range} · {activeSlot.period_label}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {activeSlot.title_zh}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeSlot.target_systems.map((sys, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-xl bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-mono text-[11px] font-semibold"
                >
                  {sys}
                </span>
              ))}
            </div>
          </div>

          {/* Physiological Mechanism */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-xs uppercase tracking-wide">
              <Lightbulb className="w-4 h-4" />
              <span>人體生理化學機轉 (Underlying Physiology)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {activeSlot.physiological_mechanism_zh}
            </p>
          </div>

          {/* Action Checklist */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
              📋 實踐清單 (Daily Action Checklist)
            </h4>
            <div className="space-y-2.5">
              {activeSlot.action_checklist_zh.map((act, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/80 text-xs sm:text-sm text-slate-800 dark:text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contraindication Alert if any */}
          {activeSlot.contraindication_warning_zh && (
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-800 dark:text-rose-300 text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">臨床安全禁忌警報：</span>
                <span className="ml-1 leading-relaxed">{activeSlot.contraindication_warning_zh}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right 1 Col: Expert Quote & Quick Nav */}
        <div className="space-y-6">
          {/* Expert Advice Quote */}
          <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">
              <span>專家理事會叮嚀</span>
            </div>
            <blockquote className="text-xs sm:text-sm font-medium leading-relaxed italic">
              {activeSlot.expert_advice_zh}
            </blockquote>
          </div>

          {/* Summary Checklist of All 5 Periods */}
          <div className="p-5 rounded-3xl bg-white/80 dark:bg-salud-dark-surface border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <h5 className="font-bold text-slate-900 dark:text-white font-mono">全天 5 大時序核心口訣</h5>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li className="flex items-center justify-between">
                <span>🌅 晨起：水合 350ml + 晨光 10 分鐘</span>
                <span className="text-emerald-500 font-mono font-bold">喚醒</span>
              </li>
              <li className="flex items-center justify-between">
                <span>🥗 午間：菜肉飯順序 + 散步 10 分鐘</span>
                <span className="text-cyan-500 font-mono font-bold">平糖</span>
              </li>
              <li className="flex items-center justify-between">
                <span>☕ 14:00 後：咖啡因門禁 + 慢速補水</span>
                <span className="text-blue-500 font-mono font-bold">保眠</span>
              </li>
              <li className="flex items-center justify-between">
                <span>🏋️ 傍晚：體溫最高峰 30 分鐘阻力</span>
                <span className="text-rose-500 font-mono font-bold">增肌</span>
              </li>
              <li className="flex items-center justify-between">
                <span>🌙 睡前：暗光 21:00 + 離手機 2 公尺</span>
                <span className="text-purple-500 font-mono font-bold">排毒</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
