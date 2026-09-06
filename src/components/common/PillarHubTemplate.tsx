import React from 'react';

export interface PillarHubTemplateProps {
  pillarTag: string;
  title: string;
  description: string;
  gradientClass: string;
  tagClass: string;
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
 *   1. Hero Header Banner (Domain-semantic color gradients & typography)
 *   2. Quick Overview Dashboard (Summary stats & at-a-glance cards)
 *   3. Flagship Interactive Simulator / Sandbox
 *   4. Deep Topic Accordion / Structured Medical Content
 *   5. Sub-module Navigation / Chapter Deep Links
 */
export const PillarHubTemplate: React.FC<PillarHubTemplateProps> = ({
  pillarTag,
  title,
  description,
  gradientClass,
  tagClass,
  overviewSection,
  simulatorSection,
  topicsSection,
  submodulesSection,
  children,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans text-xs pb-16">
      {/* ── ① Hero Header Banner ── */}
      <header
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm relative overflow-hidden transition-colors ${gradientClass}`}
      >
        <div className="relative space-y-3 max-w-2xl">
          <span
            className={`inline-block px-2.5 py-1 rounded-full font-mono text-xs font-bold border ${tagClass}`}
          >
            {pillarTag}
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-salud-dark-text tracking-tight">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
            {description}
          </p>
        </div>
      </header>

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
