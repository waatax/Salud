import React from 'react';
import { HubHero } from '../../common/HubHero';
import { HUB_PRIMERS } from '../../../data/hubPrimers';

/**
 * ExerciseHeroHeader — plain-language opening of the exercise hub (v6.4: shared HubHero).
 * The three takeaways show on the hub's first page only; a discipline page keeps just the heading.
 */
export const ExerciseHeroHeader: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <HubHero primer={HUB_PRIMERS.exercise} compact={compact} />
);
