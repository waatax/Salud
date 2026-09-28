import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HealthPillar, SportsDiscipline } from '../types';
import { CHAPTERS } from '../data/chapters';
import { CHAPTER_W_PAGES } from '../data/chapterW';
import { CHAPTER_O_PAGES } from '../data/chapterO';
import { CHAPTER_A_PAGES } from '../data/chapterA';
import { parseHash, Route } from '../config/routes';

export type MetaView = 'about' | 'evidence' | 'explore' | null;

export interface NavigationContextProps {
  activePillar: HealthPillar;
  setActivePillar: (pillar: HealthPillar) => void;
  dietView: 'patterns' | 'chapter';
  setDietView: (view: 'patterns' | 'chapter') => void;
  currentChapterId: string;
  setCurrentChapterId: (id: string) => void;
  viewMode: 'landing' | 'page';
  setViewMode: (mode: 'landing' | 'page') => void;
  activePageId: string;
  setActivePageId: (id: string) => void;
  isCouncilEvidenceView: boolean;
  setIsCouncilEvidenceView: (isCouncil: boolean) => void;
  isSynergyView: boolean;
  setIsSynergyView: (isSynergy: boolean) => void;
  /** Secondary, non-health pages (project governance & evidence method). Null = a health pillar is showing. */
  metaView: MetaView;
  setMetaView: (view: MetaView) => void;
  selectedCouncilExpertId: string;
  setSelectedCouncilExpertId: (id: string) => void;
  exerciseSubTab: SportsDiscipline;
  setExerciseSubTab: (tab: SportsDiscipline) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  /** Learning track / lesson currently open under `#learn/...`. */
  learnTrackId?: string;
  learnLessonId?: string;

  selectPillar: (pillar: HealthPillar) => void;
  selectChapter: (chapterId: string) => void;
  selectPage: (pageId: string) => void;
  openCouncilEvidence: (expertId?: string) => void;
  openSynergy: () => void;
  openMeta: (view: Exclude<MetaView, null>) => void;
  backToPatterns: () => void;
  toggleMobileSidebar: () => void;
  /** Navigate to any in-app hash route and scroll to top. */
  go: (hash: string) => void;

  /**
   * The pillar navigation surfaces should mark as current. Null while a secondary view
   * (about, evidence, synergy, best-practice library) is showing, so the chrome does not
   * claim the reader is inside a health topic they have navigated away from.
   */
  highlightedPillar: HealthPillar | null;

  currentChapter: typeof CHAPTERS[number];
  pagesForCurrent: any[];
  currentPage: any;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePillar, setActivePillar] = useState<HealthPillar>('home');
  const [dietView, setDietView] = useState<'patterns' | 'chapter'>('patterns');
  const [currentChapterId, setCurrentChapterId] = useState<string>('W');
  const [viewMode, setViewMode] = useState<'landing' | 'page'>('landing');
  const [activePageId, setActivePageId] = useState<string>('PAGE-W-01');
  const [isCouncilEvidenceView, setIsCouncilEvidenceView] = useState<boolean>(false);
  const [isSynergyView, setIsSynergyView] = useState<boolean>(false);
  const [metaView, setMetaView] = useState<MetaView>(null);
  const [selectedCouncilExpertId, setSelectedCouncilExpertId] = useState<string>('EC-03');
  const [exerciseSubTab, setExerciseSubTab] = useState<SportsDiscipline>('PHYSIOLOGY');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [learnTrackId, setLearnTrackId] = useState<string | undefined>();
  const [learnLessonId, setLearnLessonId] = useState<string | undefined>();

  /** Apply a parsed route to view state. Unknown hashes leave the current view untouched. */
  const applyRoute = (route: Route | null) => {
    if (!route) return;
    setIsMobileSidebarOpen(false);

    if (route.kind === 'meta') {
      setMetaView(route.view);
      setIsSynergyView(false);
      setIsCouncilEvidenceView(false);
      return;
    }

    setMetaView(null);
    setIsSynergyView(route.kind === 'synergy');
    setIsCouncilEvidenceView(route.kind === 'council');

    switch (route.kind) {
      case 'council':
        if (route.expertId) setSelectedCouncilExpertId(route.expertId);
        return;
      case 'synergy':
        return;
      case 'learn':
        setActivePillar('learn');
        setLearnTrackId(route.trackId);
        setLearnLessonId(route.lessonId);
        return;
      case 'exercise':
        setActivePillar('exercise');
        setExerciseSubTab(route.discipline);
        return;
      case 'chapter':
        setActivePillar('diet');
        setDietView('chapter');
        setCurrentChapterId(route.chapterId);
        if (route.pageId) {
          setActivePageId(route.pageId);
          setViewMode('page');
        } else {
          setActivePageId(`PAGE-${route.chapterId}-01`);
          setViewMode('landing');
        }
        return;
      case 'pillar':
        setActivePillar(route.pillar);
        if (route.pillar === 'diet') setDietView('patterns');
        return;
    }
  };

  useEffect(() => {
    const handleHash = () => applyRoute(parseHash(window.location.hash));
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (hash: string) => {
    const target = hash.replace(/^#/, '');
    if (window.location.hash.replace(/^#/, '') === target) {
      // Same hash: no hashchange event will fire, so apply directly.
      applyRoute(parseHash(target));
    } else {
      window.location.hash = target;
    }
  };

  const openCouncilEvidence = (expertId?: string) => {
    if (expertId) setSelectedCouncilExpertId(expertId);
    go(expertId ? `council-evidence/${expertId}` : 'council-evidence');
  };

  const openMeta = (view: Exclude<MetaView, null>) => go(view);

  const openSynergy = () => go('synergy');

  const selectPillar = (pillar: HealthPillar) => {
    // Apply immediately so the click feels instant even before hashchange fires.
    applyRoute({ kind: 'pillar', pillar });
    go(pillar === 'home' ? 'home' : pillar);
  };

  const selectChapter = (chId: string) => {
    if (chId === 'W' || chId === 'O' || chId === 'A') {
      applyRoute({ kind: 'chapter', chapterId: chId });
      go(chId);
    }
  };

  const selectPage = (pageId: string) => {
    const chId = (pageId.match(/^PAGE-([WOA])-/)?.[1] ?? currentChapterId) as 'W' | 'O' | 'A';
    applyRoute({ kind: 'chapter', chapterId: chId, pageId });
    go(`${chId}/${pageId}`);
  };

  const backToPatterns = () => go('diet/patterns');

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  const highlightedPillar: HealthPillar | null =
    metaView || isSynergyView || isCouncilEvidenceView ? null : activePillar;

  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const pagesForCurrent =
    currentChapterId === 'W'
      ? CHAPTER_W_PAGES
      : currentChapterId === 'O'
      ? CHAPTER_O_PAGES
      : currentChapterId === 'A'
      ? CHAPTER_A_PAGES
      : [];
  const currentPage = pagesForCurrent.find((p) => p.id === activePageId) || pagesForCurrent[0];

  const value: NavigationContextProps = {
    activePillar,
    setActivePillar,
    dietView,
    setDietView,
    currentChapterId,
    setCurrentChapterId,
    viewMode,
    setViewMode,
    activePageId,
    setActivePageId,
    isCouncilEvidenceView,
    setIsCouncilEvidenceView,
    isSynergyView,
    setIsSynergyView,
    metaView,
    setMetaView,
    selectedCouncilExpertId,
    setSelectedCouncilExpertId,
    exerciseSubTab,
    setExerciseSubTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    learnTrackId,
    learnLessonId,

    selectPillar,
    selectChapter,
    selectPage,
    openCouncilEvidence,
    openSynergy,
    openMeta,
    backToPatterns,
    toggleMobileSidebar,
    go,

    highlightedPillar,
    currentChapter,
    pagesForCurrent,
    currentPage,
  };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
