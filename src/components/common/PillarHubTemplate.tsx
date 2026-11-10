import React from 'react';
import { HubHero } from './HubHero';
import type { HubPrimer } from '../../data/hubPrimers';

export interface PillarHubTemplateProps {
  /** Plain-language title, lead and three takeaways — see src/data/hubPrimers.ts. */
  primer: HubPrimer;
  overviewSection?: React.ReactNode;
  simulatorSection?: React.ReactNode;
  topicsSection?: React.ReactNode;
  submodulesSection?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * PillarHubTemplate — WP5: Standardized Health Pillar Hub Page Layout
 *
 * Enforces visual and information-architecture consistency across
 * all 4 Health Pillars (Diet, Exercise, Sleep, Supplements):
 *   1. Plain-language opening: title, lead, three takeaways, an easy first lesson
 *   2. Quick Overview Dashboard (Summary stats & at-a-glance cards)
 *   3. Flagship Interactive Simulator / Sandbox
 *   4. Deep Topic Accordion / Structured Medical Content
 *   5. Sub-module Navigation / Chapter Deep Links
 */
export const PillarHubTemplate: React.FC<PillarHubTemplateProps> = ({
  primer,
  overviewSection,
  simulatorSection,
  topicsSection,
  submodulesSection,
  children,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-sm pb-16">
      {/* ── ① Plain-language opening (v6.4: shared HubHero) ── */}
      <HubHero primer={primer} />

      {/* ── ② Quick Overview Dashboard ── */}
      {overviewSection && (
        <section aria-label="Overview Dashboard" className="space-y-3">
          {overviewSection}
        </section>
      )}

      {/* ── ③ Flagship Interactive Simulator / Sandbox ── */}
      {simulatorSection && (
        <section aria-label="Interactive Simulator" className="space-y-3">
          {simulatorSection}
        </section>
      )}

      {/* ── ④ Deep Topic Accordion ── */}
      {topicsSection && (
        <section aria-label="Core Topics" className="space-y-4">
          {topicsSection}
        </section>
      )}

      {/* ── ⑤ Sub-module Navigation / Chapter Cards ── */}
      {submodulesSection && (
        <section aria-label="Submodules & Chapters" className="space-y-4">
          {submodulesSection}
        </section>
      )}

      {/* Additional arbitrary children */}
      {children}
    </div>
  );
};
