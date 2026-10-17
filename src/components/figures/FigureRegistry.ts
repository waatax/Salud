import React from 'react';
import type { FigureType } from '../../types';
import { FIGURES_CATALOG } from '../../data/figuresMeta';

/**
 * FigureRegistry — WP6: Centralized figure component lookup.
 *
 * Replaces the if/else chain in KnowledgePage.tsx with a declarative
 * type-based registry. All figure components are lazily loaded so
 * they are only fetched when actually rendered.
 */

const UniversalFigureLazy = React.lazy(() =>
  import('./UniversalEvidenceFigure').then((m) => ({ default: m.UniversalEvidenceFigure }))
);

// Lazy-loaded figure components keyed by FigureType
const FIGURE_COMPONENTS: Record<FigureType, React.LazyExoticComponent<React.ComponentType<any>>> = {
  T1: React.lazy(() => import('./T1Mechanism').then(m => ({ default: m.T1Mechanism }))),
  T2: React.lazy(() => import('./T2Anatomy').then(m => ({ default: m.T2Anatomy }))),
  T3: React.lazy(() => import('./T3Molecular').then(m => ({ default: m.T3Molecular }))),
  T4: UniversalFigureLazy,
  T5: React.lazy(() => import('./T5ScaleSpectrum').then(m => ({ default: m.T5ScaleSpectrum }))),
  T6: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))),
  T7: UniversalFigureLazy,
  T8: React.lazy(() => import('./T8PortionVisual').then(m => ({ default: m.T8PortionVisual }))),
  T9: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))),
  T10: React.lazy(() => import('./T10MythCard').then(m => ({ default: m.T10MythCard }))),
};

// Default fallback component type
const DEFAULT_TYPE: FigureType = 'T6';

/**
 * Resolve the correct React component for a given FigureType & FigureId.
 * If the figureId is dynamically synthesized (not one of the bespoke catalog entries),
 * uses UniversalEvidenceFigure for tailored page-specific rendering.
 */
export function getFigureComponent(
  figureType: FigureType,
  figureId?: string
): React.LazyExoticComponent<React.ComponentType<any>> {
  if (figureId && !FIGURES_CATALOG[figureId]) {
    return UniversalFigureLazy;
  }
  return FIGURE_COMPONENTS[figureType] || FIGURE_COMPONENTS[DEFAULT_TYPE];
}

/**
 * Determine what props to pass to the resolved figure component
 * based on the figure ID and type.
 */
export function getFigureProps(
  figureId: string,
  _figureType: FigureType,
  extraProps?: Record<string, any>
): Record<string, any> {
  return { figureId, ...extraProps };
}

