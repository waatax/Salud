import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { HealthPillar, SportsDiscipline } from '../types';
import { CHAPTERS } from '../data/chapters';
import { CHAPTER_W_PAGES } from '../data/chapterW';
import { CHAPTER_O_PAGES } from '../data/chapterO';
import { CHAPTER_A_PAGES } from '../data/chapterA';

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
  selectedCouncilExpertId: string;
  setSelectedCouncilExpertId: (id: string) => void;
  exerciseSubTab: SportsDiscipline;
  setExerciseSubTab: (tab: SportsDiscipline) => void;
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;

  selectPillar: (pillar: HealthPillar) => void;
  selectChapter: (chapterId: string) => void;
  selectPage: (pageId: string) => void;
  openCouncilEvidence: (expertId?: string) => void;
  backToPatterns: () => void;
  toggleMobileSidebar: () => void;

  currentChapter: typeof CHAPTERS[number];
  pagesForCurrent: any[];
  currentPage: any;
}

const NavigationContext = createContext<NavigationContextProps | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activePillar, setActivePillar] = useState<HealthPillar>('diet');
  const [dietView, setDietView] = useState<'patterns' | 'chapter'>('patterns');
  const [currentChapterId, setCurrentChapterId] = useState<string>('W');
  const [viewMode, setViewMode] = useState<'landing' | 'page'>('landing');
  const [activePageId, setActivePageId] = useState<string>('PAGE-W-01');
  const [isCouncilEvidenceView, setIsCouncilEvidenceView] = useState<boolean>(false);
  const [selectedCouncilExpertId, setSelectedCouncilExpertId] = useState<string>('EC-03');
  const [exerciseSubTab, setExerciseSubTab] = useState<SportsDiscipline>('PHYSIOLOGY');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash === 'council-evidence' || hash.startsWith('council-evidence/')) {
          setIsCouncilEvidenceView(true);
          if (hash.includes('/')) {
            setSelectedCouncilExpertId(hash.split('/')[1]);
          }
        } else if (hash === 'exercise' || hash === 'exercise/physiology') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('PHYSIOLOGY');
        } else if (hash === 'exercise/running' || hash === 'running') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('RUNNING');
        } else if (hash === 'exercise/cycling' || hash === 'cycling') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('CYCLING');
        } else if (hash === 'exercise/mountaineering' || hash === 'mountaineering' || hash === 'hiking') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('MOUNTAINEERING');
        } else if (hash === 'exercise/strength' || hash === 'strength' || hash === 'resistance') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('STRENGTH_TRAINING');
        } else if (hash === 'exercise/mobility' || hash === 'mobility' || hash === 'fascia' || hash === 'stretching') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('MOBILITY_FASCIA');
        } else if (hash === 'exercise/badminton' || hash === 'badminton') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('BADMINTON');
        } else if (hash === 'exercise/table-tennis' || hash === 'table-tennis' || hash === 'tabletennis' || hash === 'pingpong') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('TABLE_TENNIS');
        } else if (hash === 'exercise/pickleball' || hash === 'pickleball') {
          setIsCouncilEvidenceView(false);
          setActivePillar('exercise');
          setExerciseSubTab('PICKLEBALL');
        } else if (hash === 'sleep') {
          setIsCouncilEvidenceView(false);
          setActivePillar('sleep');
        } else if (hash === 'supplements') {
          setIsCouncilEvidenceView(false);
          setActivePillar('supplements');
        } else if (hash === 'diet' || hash === 'diet/patterns') {
          setIsCouncilEvidenceView(false);
          setActivePillar('diet');
          setDietView('patterns');
        } else if (hash.startsWith('A')) {
          setIsCouncilEvidenceView(false);
          setActivePillar('diet');
          setDietView('chapter');
          setCurrentChapterId('A');
          if (hash.includes('/')) {
            setActivePageId(hash.split('/')[1]);
            setViewMode('page');
          } else {
            setViewMode('landing');
          }
        } else if (hash.startsWith('O')) {
          setIsCouncilEvidenceView(false);
          setActivePillar('diet');
          setDietView('chapter');
          setCurrentChapterId('O');
          if (hash.includes('/')) {
            setActivePageId(hash.split('/')[1]);
            setViewMode('page');
          } else {
            setViewMode('landing');
          }
        } else if (hash.startsWith('W')) {
          setIsCouncilEvidenceView(false);
          setActivePillar('diet');
          setDietView('chapter');
          setCurrentChapterId('W');
          if (hash.includes('/')) {
            setActivePageId(hash.split('/')[1]);
            setViewMode('page');
          } else {
            setViewMode('landing');
          }
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const openCouncilEvidence = (expertId?: string) => {
    if (expertId) {
      setSelectedCouncilExpertId(expertId);
      window.location.hash = `council-evidence/${expertId}`;
    } else {
      window.location.hash = 'council-evidence';
    }
    setIsCouncilEvidenceView(true);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectPillar = (pillar: HealthPillar) => {
    setIsCouncilEvidenceView(false);
    setActivePillar(pillar);
    if (pillar === 'diet') {
      window.location.hash = 'diet';
    } else {
      window.location.hash = pillar;
    }
    setIsMobileSidebarOpen(false);
  };

  const selectChapter = (chId: string) => {
    setIsCouncilEvidenceView(false);
    setActivePillar('diet');
    setDietView('chapter');
    setCurrentChapterId(chId);
    setViewMode('landing');
    if (chId === 'W') {
      setActivePageId('PAGE-W-01');
      window.location.hash = 'W';
    } else if (chId === 'O') {
      setActivePageId('PAGE-O-01');
      window.location.hash = 'O';
    } else if (chId === 'A') {
      setActivePageId('PAGE-A-01');
      window.location.hash = 'A';
    }
    setIsMobileSidebarOpen(false);
  };

  const selectPage = (pageId: string) => {
    setActivePillar('diet');
    setDietView('chapter');
    setActivePageId(pageId);
    setViewMode('page');
    window.location.hash = `${currentChapterId}/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileSidebarOpen(false);
  };

  const backToPatterns = () => {
    setIsCouncilEvidenceView(false);
    setActivePillar('diet');
    setDietView('patterns');
    window.location.hash = 'diet/patterns';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileSidebarOpen(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(prev => !prev);
  };

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
    selectedCouncilExpertId,
    setSelectedCouncilExpertId,
    exerciseSubTab,
    setExerciseSubTab,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,

    selectPillar,
    selectChapter,
    selectPage,
    openCouncilEvidence,
    backToPatterns,
    toggleMobileSidebar,

    currentChapter,
    pagesForCurrent,
    currentPage,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
