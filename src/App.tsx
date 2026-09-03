import React, { useState, useEffect } from 'react';
import { CHAPTERS } from './data/chapters';
import { CHAPTER_W_PAGES } from './data/chapterW';
import { CHAPTER_O_PAGES } from './data/chapterO';
import { CHAPTER_A_PAGES } from './data/chapterA';
import { LanguageProvider, useLanguage } from './i18n';
import { HealthPillar } from './types';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ContextInspector } from './components/layout/ContextInspector';
import { MobileNav } from './components/layout/MobileNav';
import { ChapterLanding } from './components/knowledge/ChapterLanding';
import { KnowledgePage } from './components/knowledge/KnowledgePage';
import { DietaryPatternsHub } from './components/pillars/DietaryPatternsHub';
import { ExerciseHub } from './components/pillars/ExerciseHub';
import { SleepHub } from './components/pillars/SleepHub';
import { SupplementsHub } from './components/pillars/SupplementsHub';
import { ExpertCouncilModal } from './components/council/ExpertCouncilModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { AuditCModal } from './components/common/AuditCModal';
import { CardiometabolicHubModal } from './components/hub/CardiometabolicHubModal';
import { Modal } from './components/common/Modal';
import { KnowledgeGraph } from './components/knowledge/KnowledgeGraph';

const AppInner: React.FC = () => {
  const { t, language } = useLanguage();

  // Theme state: default to localStorage or dark
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salud-theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  // 4 Pillars state: 'diet' | 'exercise' | 'sleep' | 'supplements'
  const [activePillar, setActivePillar] = useState<HealthPillar>('diet');

  // Diet Sub-view state: 'patterns' (5 major diets hub) or 'chapter' (W, O, A)
  const [dietView, setDietView] = useState<'patterns' | 'chapter'>('patterns');
  const [currentChapterId, setCurrentChapterId] = useState<string>('W');

  // Chapter View state: 'landing' or 'page'
  const [viewMode, setViewMode] = useState<'landing' | 'page'>('landing');
  const [activePageId, setActivePageId] = useState<string>('PAGE-W-01');

  // Modals state
  const [isCouncilOpen, setIsCouncilOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
  const [isAuditCOpen, setIsAuditCOpen] = useState<boolean>(false);
  const [isCardioHubOpen, setIsCardioHubOpen] = useState<boolean>(false);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState<boolean>(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  // Sync dark/light class on document element and save to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('salud-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('salud-theme', 'light');
    }
  }, [isDark]);

  // Handle URL Hash navigation on mount and changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash === 'exercise') {
          setActivePillar('exercise');
        } else if (hash === 'sleep') {
          setActivePillar('sleep');
        } else if (hash === 'supplements') {
          setActivePillar('supplements');
        } else if (hash === 'diet' || hash === 'diet/patterns') {
          setActivePillar('diet');
          setDietView('patterns');
        } else if (hash.startsWith('A')) {
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

  // Pillar Selector
  const handleSelectPillar = (pillar: HealthPillar) => {
    setActivePillar(pillar);
    if (pillar === 'diet') {
      window.location.hash = 'diet';
    } else {
      window.location.hash = pillar;
    }
    setIsMobileSidebarOpen(false);
  };

  // Chapter Selector (under Diet)
  const handleSelectChapter = (chId: string) => {
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

  const handleSelectPage = (pageId: string) => {
    setActivePillar('diet');
    setDietView('chapter');
    setActivePageId(pageId);
    setViewMode('page');
    window.location.hash = `${currentChapterId}/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileSidebarOpen(false);
    setIsGraphModalOpen(false);
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

  return (
    <div className="min-h-screen flex flex-col bg-salud-light-bg dark:bg-salud-dark-bg text-salud-light-text dark:text-salud-dark-text bg-tech-grid transition-colors">
      {/* ── Top Header with 4 Pillars Switcher ── */}
      <Header
        activePillar={activePillar}
        onSelectPillar={handleSelectPillar}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenCouncil={() => setIsCouncilOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onOpenAuditC={() => setIsAuditCOpen(true)}
        onOpenCardioHub={() => setIsCardioHubOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* ── Main Layout: Sidebar + Center Content + Context Inspector ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            activePillar={activePillar}
            onSelectPillar={handleSelectPillar}
            currentChapterId={currentChapterId}
            activePageId={activePageId}
            onSelectChapter={handleSelectChapter}
            onSelectPage={handleSelectPage}
            chapterWPages={CHAPTER_W_PAGES}
            chapterOPages={CHAPTER_O_PAGES}
            chapterAPages={CHAPTER_A_PAGES}
            onOpenAuditC={() => setIsAuditCOpen(true)}
            onOpenCardioHub={() => setIsCardioHubOpen(true)}
            onOpenCouncil={() => setIsCouncilOpen(true)}
          />
        </div>

        {/* Mobile Slide-out Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-72 h-full bg-salud-light-surface dark:bg-salud-dark-surface p-4 overflow-y-auto border-r border-salud-light-border dark:border-salud-dark-border">
              <div className="flex justify-between items-center pb-3 border-b border-salud-light-border dark:border-salud-dark-border mb-4">
                <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">
                  Salud 四大支柱導航
                </span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>
              <Sidebar
                activePillar={activePillar}
                onSelectPillar={handleSelectPillar}
                currentChapterId={currentChapterId}
                activePageId={activePageId}
                onSelectChapter={handleSelectChapter}
                onSelectPage={handleSelectPage}
                chapterWPages={CHAPTER_W_PAGES}
                chapterOPages={CHAPTER_O_PAGES}
                chapterAPages={CHAPTER_A_PAGES}
                onOpenAuditC={() => setIsAuditCOpen(true)}
                onOpenCardioHub={() => setIsCardioHubOpen(true)}
                onOpenCouncil={() => setIsCouncilOpen(true)}
              />
            </div>
            <div className="flex-1" onClick={() => setIsMobileSidebarOpen(false)} />
          </div>
        )}

        {/* ── Center Content Area ── */}
        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
          {/* Breadcrumb Navigation */}
          <nav className="mb-5 flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400 border-b border-salud-light-border/60 dark:border-salud-dark-border/40 pb-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (activePillar === 'diet') setDietView('patterns');
                }}
                className="hover:text-salud-amber transition-colors font-bold flex items-center gap-1"
              >
                <span>Pillar:</span>
                <span className="text-slate-800 dark:text-slate-100">
                  {t(`pillar.${activePillar}`)}
                </span>
              </button>

              {activePillar === 'diet' && dietView === 'chapter' && (
                <>
                  <span>/</span>
                  <button
                    onClick={() => setViewMode('landing')}
                    className="hover:text-salud-amber font-bold text-salud-amber-600 dark:text-salud-amber"
                  >
                    Chapter {currentChapter.id}
                  </button>
                  {viewMode === 'page' && (
                    <>
                      <span>/</span>
                      <span className="text-salud-cyan font-bold">{currentPage?.id}</span>
                    </>
                  )}
                </>
              )}
            </div>

            {activePillar === 'diet' && dietView === 'chapter' && (
              <button
                onClick={() => setDietView('patterns')}
                className="text-[11px] text-salud-cyan hover:underline flex items-center gap-1"
              >
                ⟵ 返回飲食模式全景
              </button>
            )}
          </nav>

          {/* ── Render Content based on Active Pillar ── */}

          {/* 1. Diet & Nutrition Pillar */}
          {activePillar === 'diet' && (
            <>
              {dietView === 'patterns' ? (
                <DietaryPatternsHub
                  chapters={CHAPTERS}
                  onSelectChapter={handleSelectChapter}
                />
              ) : viewMode === 'landing' ? (
                <ChapterLanding
                  chapter={currentChapter}
                  pages={pagesForCurrent}
                  onStartReading={handleSelectPage}
                  onSelectPage={handleSelectPage}
                />
              ) : (
                <KnowledgePage
                  page={currentPage}
                  onNavigatePage={handleSelectPage}
                />
              )}
            </>
          )}

          {/* 2. Exercise & Movement Pillar */}
          {activePillar === 'exercise' && <ExerciseHub />}

          {/* 3. Sleep & Recovery Pillar */}
          {activePillar === 'sleep' && <SleepHub />}

          {/* 4. Deep Supplements & Nutraceuticals Pillar */}
          {activePillar === 'supplements' && <SupplementsHub />}
        </main>

        {/* Desktop Context Inspector (Visible when reading a specific Knowledge Page in Chapter) */}
        {activePillar === 'diet' && dietView === 'chapter' && viewMode === 'page' && currentPage && (
          <div className="hidden xl:block">
            <ContextInspector
              page={currentPage}
              onSelectKP={(kpId) => {
                console.log('Jump to KP:', kpId);
              }}
            />
          </div>
        )}
      </div>

      {/* ── Mobile Bottom Navigation Bar (4 Pillars) ── */}
      <MobileNav
        activePillar={activePillar}
        onSelectPillar={handleSelectPillar}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onOpenCouncil={() => setIsCouncilOpen(true)}
      />

      {/* ── Expert Council Governance Modal (24 seats) ── */}
      <ExpertCouncilModal
        isOpen={isCouncilOpen}
        onClose={() => setIsCouncilOpen(false)}
      />

      {/* ── Emergency Red Flag Modal ── */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* ── AUDIT-C Screening Modal ── */}
      <AuditCModal
        isOpen={isAuditCOpen}
        onClose={() => setIsAuditCOpen(false)}
      />

      {/* ── Cardiometabolic Hub Modal ── */}
      <CardiometabolicHubModal
        isOpen={isCardioHubOpen}
        onClose={() => setIsCardioHubOpen(false)}
      />

      {/* ── Mobile Knowledge Graph Modal ── */}
      <Modal
        isOpen={isGraphModalOpen}
        onClose={() => setIsGraphModalOpen(false)}
        title={`Chapter ${currentChapter.id} 知識路徑探索圖`}
        subtitle="點擊任一知識節點直接跳轉閱讀"
        maxWidth="4xl"
      >
        <KnowledgeGraph
          pages={pagesForCurrent}
          activePageId={activePageId}
          onSelectPage={handleSelectPage}
        />
      </Modal>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
};
