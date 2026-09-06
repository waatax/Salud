import React, { useState, Suspense, lazy } from 'react';
import { SportsDiscipline } from '../../../types';
import { ExerciseHeroHeader } from './ExerciseHeroHeader';
import { DisciplineTabBar } from './DisciplineTabBar';

// Lazy load all 9 discipline panels for optimal performance (WP8)
const PhysiologyPanel = lazy(() => import('./disciplines/PhysiologyPanel').then(m => ({ default: m.PhysiologyPanel })));
const RunningPanel = lazy(() => import('./disciplines/RunningPanel').then(m => ({ default: m.RunningPanel })));
const CyclingPanel = lazy(() => import('./disciplines/CyclingPanel').then(m => ({ default: m.CyclingPanel })));
const MountaineeringPanel = lazy(() => import('./disciplines/MountaineeringPanel').then(m => ({ default: m.MountaineeringPanel })));
const StrengthPanel = lazy(() => import('./disciplines/StrengthPanel').then(m => ({ default: m.StrengthPanel })));
const MobilityPanel = lazy(() => import('./disciplines/MobilityPanel').then(m => ({ default: m.MobilityPanel })));
const BadmintonPanel = lazy(() => import('./disciplines/BadmintonPanel').then(m => ({ default: m.BadmintonPanel })));
const TableTennisPanel = lazy(() => import('./disciplines/TableTennisPanel').then(m => ({ default: m.TableTennisPanel })));
const PickleballPanel = lazy(() => import('./disciplines/PickleballPanel').then(m => ({ default: m.PickleballPanel })));

interface Props {
  initialSubTab?: SportsDiscipline;
}

const PanelLoadingFallback: React.FC = () => (
  <div className="py-12 flex flex-col items-center justify-center space-y-3">
    <div className="w-8 h-8 rounded-full border-2 border-salud-cyan border-t-transparent animate-spin" />
    <span className="text-xs font-mono text-slate-500">載入專項運動科學模組...</span>
  </div>
);

/**
 * ExerciseHub — WP3: Modular Sports Science Hub Shell
 *
 * Slimmed from 1,168 lines / 70KB to a clean ~80-line hub shell.
 * Coordinates the 9 discipline sub-panels with lazy loading and tab switching.
 */
export const ExerciseHub: React.FC<Props> = ({ initialSubTab = 'PHYSIOLOGY' }) => {
  const [activeTab, setActiveTab] = useState<SportsDiscipline>(initialSubTab);

  const handleSelectTab = (tab: SportsDiscipline) => {
    setActiveTab(tab);
    window.location.hash = tab === 'PHYSIOLOGY' ? 'exercise' : `exercise/${tab.toLowerCase().replace('_', '-')}`;
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* Hero Header */}
      <ExerciseHeroHeader />

      {/* 9-Discipline Tab Switcher */}
      <DisciplineTabBar activeTab={activeTab} onSelectTab={handleSelectTab} />

      {/* Active Discipline Panel with Lazy Suspense */}
      <Suspense fallback={<PanelLoadingFallback />}>
        {activeTab === 'PHYSIOLOGY' && <PhysiologyPanel />}
        {activeTab === 'RUNNING' && <RunningPanel />}
        {activeTab === 'CYCLING' && <CyclingPanel />}
        {activeTab === 'MOUNTAINEERING' && <MountaineeringPanel />}
        {activeTab === 'STRENGTH_TRAINING' && <StrengthPanel />}
        {activeTab === 'MOBILITY_FASCIA' && <MobilityPanel />}
        {activeTab === 'BADMINTON' && <BadmintonPanel />}
        {activeTab === 'TABLE_TENNIS' && <TableTennisPanel />}
        {activeTab === 'PICKLEBALL' && <PickleballPanel />}
      </Suspense>
    </div>
  );
};
