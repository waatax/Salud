import React from 'react';
import { useHashTab } from '../../hooks/useHashTab';
import { ULTRAHEALTH_TABS, type UltrahealthTab } from '../../config/routes';
import { PersonalHealthBlueprint } from './PersonalHealthBlueprint';
import { DailyProtocolMatrix } from './DailyProtocolMatrix';
import { AtomicHabitTracker } from './AtomicHabitTracker';
import { MobilityPhysioGuide } from './MobilityPhysioGuide';
import { MasterySkillTree } from './MasterySkillTree';
import { HubHero } from '../common/HubHero';
import { HubTabBar, type HubTabGroup } from '../common/HubTabBar';
import { HUB_PRIMERS } from '../../data/hubPrimers';
import {
  Clock,
  Zap,
  Activity,
  Award,
  Compass,
} from 'lucide-react';

export type UltraHealthTab = UltrahealthTab;

const ULTRAHEALTH_TAB_GROUPS: HubTabGroup<UltraHealthTab>[] = [
  {
    label: '日常實踐',
    tabs: [
      { id: 'BLUEPRINT', label: '我的健康藍圖', icon: Compass, featured: true },
      { id: 'PROTOCOL', label: '一天作息怎麼排', icon: Clock },
      { id: 'HABITS', label: '14 天小習慣', icon: Zap },
    ],
  },
  {
    label: '動作與進度',
    tabs: [
      { id: 'PHYSIO', label: '居家伸展與肌力動作', icon: Activity },
      { id: 'SKILL_TREE', label: '學習進度地圖', icon: Award },
    ],
  },
];

export const UltraHealthHub: React.FC = () => {
  const [activeTab, setActiveTab] = useHashTab<UltraHealthTab>('ultrahealth', ULTRAHEALTH_TABS, 'BLUEPRINT');

  return (
    <div className="space-y-8 max-w-5xl mx-auto font-sans pb-20 animate-fade-in">
      <HubHero primer={HUB_PRIMERS.ultrahealth} compact={activeTab !== 'BLUEPRINT'} />

      <HubTabBar
        groups={ULTRAHEALTH_TAB_GROUPS}
        active={activeTab}
        onChange={setActiveTab}
        ariaLabel="日常健康藍圖分頁"
      />

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
