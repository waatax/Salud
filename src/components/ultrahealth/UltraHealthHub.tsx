import React, { useState } from 'react';
import { PersonalHealthBlueprint } from './PersonalHealthBlueprint';
import { DailyProtocolMatrix } from './DailyProtocolMatrix';
import { AtomicHabitTracker } from './AtomicHabitTracker';
import { MobilityPhysioGuide } from './MobilityPhysioGuide';
import { MasterySkillTree } from './MasterySkillTree';
import { HubHero } from '../common/HubHero';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import {
  Sparkles,
  Clock,
  Zap,
  Activity,
  Award,
  Compass,
  CheckCircle2,
  HeartPulse
} from 'lucide-react';

export type UltraHealthTab = 'BLUEPRINT' | 'PROTOCOL' | 'HABITS' | 'PHYSIO' | 'SKILL_TREE';

export const UltraHealthHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UltraHealthTab>('BLUEPRINT');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      <HubHero primer={HUB_PRIMERS.ultrahealth} compact={activeTab !== 'BLUEPRINT'} />

      {/* Flagship Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-sm">
        <button
          onClick={() => setActiveTab('BLUEPRINT')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'BLUEPRINT'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>我的健康藍圖</span>
        </button>

        <button
          onClick={() => setActiveTab('PROTOCOL')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PROTOCOL'
              ? 'bg-teal-600 text-white font-bold border-teal-500 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/50'
          }`}
        >
          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>一天作息怎麼排</span>
        </button>

        <button
          onClick={() => setActiveTab('HABITS')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'HABITS'
              ? 'bg-emerald-600 text-white font-bold border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>14 天小習慣</span>
        </button>

        <button
          onClick={() => setActiveTab('PHYSIO')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'PHYSIO'
              ? 'bg-emerald-700 text-white font-bold border-emerald-600 shadow-md ring-2 ring-emerald-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-emerald-400 hover:bg-emerald-50/50'
          }`}
        >
          <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>伸展與肌力動作</span>
        </button>

        <button
          onClick={() => setActiveTab('SKILL_TREE')}
          className={`btn-tactile flex items-center gap-1.5 px-4 py-2.5 rounded-2xl border transition-all ${
            activeTab === 'SKILL_TREE'
              ? 'bg-teal-700 text-white font-bold border-teal-600 shadow-md ring-2 ring-teal-500/20'
              : 'bg-white/90 dark:bg-salud-dark-surface border-emerald-200/70 dark:border-slate-800 text-slate-700 dark:text-slate-400 hover:border-teal-400 hover:bg-teal-50/50'
          }`}
        >
          <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>學習進度地圖</span>
        </button>
      </div>

      {/* Sub-view Content */}
      <div className="pt-2">
        {activeTab === 'BLUEPRINT' && <PersonalHealthBlueprint />}
        {activeTab === 'PROTOCOL' && <DailyProtocolMatrix />}
        {activeTab === 'HABITS' && <AtomicHabitTracker />}
        {activeTab === 'PHYSIO' && <MobilityPhysioGuide />}
        {activeTab === 'SKILL_TREE' && <MasterySkillTree />}
      </div>
    </div>
  );
};
