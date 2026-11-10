import React from 'react';
import { SportsDiscipline } from '../../../types';
import { HubTabBar, type HubTabGroup } from '../../common/HubTabBar';
import {
  HeartPulse,
  Zap,
  Bike,
  Mountain,
  Dumbbell,
  Scale,
  Award,
  Target,
  Sparkles,
} from 'lucide-react';

interface Props {
  activeTab: SportsDiscipline;
  onSelectTab: (tab: SportsDiscipline) => void;
}

export const EXERCISE_TAB_GROUPS: HubTabGroup<SportsDiscipline>[] = [
  {
    label: '基礎與日常',
    tabs: [
      { id: 'PHYSIOLOGY', label: '運動生理與心率', icon: HeartPulse },
      { id: 'STRENGTH_TRAINING', label: '肌力與肌耐力', icon: Dumbbell, featured: true },
      { id: 'MOBILITY_FASCIA', label: '伸展與活動度', icon: Scale },
    ],
  },
  {
    label: '戶外有氧',
    tabs: [
      { id: 'RUNNING', label: '跑步與快走', icon: Zap },
      { id: 'CYCLING', label: '自行車', icon: Bike },
      { id: 'MOUNTAINEERING', label: '登山健行', icon: Mountain },
    ],
  },
  {
    label: '球拍運動',
    tabs: [
      { id: 'BADMINTON', label: '羽球', icon: Sparkles },
      { id: 'TABLE_TENNIS', label: '桌球', icon: Target },
      { id: 'PICKLEBALL', label: '匹克球', icon: Award },
    ],
  },
];

export const DisciplineTabBar: React.FC<Props> = ({ activeTab, onSelectTab }) => {
  return (
    <HubTabBar
      groups={EXERCISE_TAB_GROUPS}
      active={activeTab}
      onChange={onSelectTab}
      ariaLabel="運動專項分頁"
    />
  );
};
