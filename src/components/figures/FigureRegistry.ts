import React from 'react';
import type { FigureType } from '../../types';

/**
 * FigureRegistry — WP6: Centralized figure component lookup.
 *
 * Replaces the if/else chain in KnowledgePage.tsx with a declarative
 * type-based registry. All figure components are lazily loaded so
 * they are only fetched when actually rendered.
 *
 * Note: Components use named exports, so we wrap with the
 * { default: Module.ComponentName } pattern for React.lazy().
 */

// Lazy-loaded figure components keyed by FigureType
const FIGURE_COMPONENTS: Record<FigureType, React.LazyExoticComponent<React.ComponentType<any>>> = {
  T1: React.lazy(() => import('./T1Mechanism').then(m => ({ default: m.T1Mechanism }))),
  T2: React.lazy(() => import('./T2Anatomy').then(m => ({ default: m.T2Anatomy }))),
  T3: React.lazy(() => import('./T3Molecular').then(m => ({ default: m.T3Molecular }))),
  T4: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))), // Fallback until T4 exists
  T5: React.lazy(() => import('./T5ScaleSpectrum').then(m => ({ default: m.T5ScaleSpectrum }))),
  T6: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))),
  T7: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))), // Fallback until T7 exists
  T8: React.lazy(() => import('./T8PortionVisual').then(m => ({ default: m.T8PortionVisual }))),
  T9: React.lazy(() => import('./T6ComparisonBar').then(m => ({ default: m.T6ComparisonBar }))), // Fallback until T9 exists
  T10: React.lazy(() => import('./T10MythCard').then(m => ({ default: m.T10MythCard }))),
};

// Default fallback component type
const DEFAULT_TYPE: FigureType = 'T6';

/**
 * Resolve the correct React component for a given FigureType.
 * Returns a lazy-loaded component that should be wrapped in Suspense by the caller.
 */
export function getFigureComponent(figureType: FigureType): React.LazyExoticComponent<React.ComponentType<any>> {
  return FIGURE_COMPONENTS[figureType] || FIGURE_COMPONENTS[DEFAULT_TYPE];
}

/**
 * Determine what props to pass to the resolved figure component
 * based on the figure ID and type.
 */
export function getFigureProps(figureId: string, figureType: FigureType): Record<string, any> {
  if (figureType === 'T1') {
    return { figureId };
  }
  return {};
}
