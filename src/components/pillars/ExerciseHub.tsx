/**
 * ExerciseHub — Backward-compatible forwarder
 *
 * The monolithic 1,168-line / 70KB ExerciseHub has been decomposed into:
 *   - src/components/pillars/exercise/ExerciseHub.tsx (Hub Shell)
 *   - src/components/pillars/exercise/ExerciseHeroHeader.tsx
 *   - src/components/pillars/exercise/DisciplineTabBar.tsx
 *   - src/components/pillars/exercise/shared/TopicAccordion.tsx
 *   - src/components/pillars/exercise/disciplines/ (9 lazy-loaded panels)
 *
 * This file re-exports the modular ExerciseHub component.
 */
export { ExerciseHub } from './exercise/ExerciseHub';
