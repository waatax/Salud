import React, { useState, useEffect } from 'react';
import { CHAPTERS } from './data/chapters';
import { CHAPTER_W_PAGES } from './data/chapterW';
import { CHAPTER_O_PAGES } from './data/chapterO';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ContextInspector } from './components/layout/ContextInspector';
import { MobileNav } from './components/layout/MobileNav';
import { ChapterLanding } from './components/knowledge/ChapterLanding';
import { KnowledgePage } from './components/knowledge/KnowledgePage';
import { ExpertCouncilModal } from './components/council/ExpertCouncilModal';
import { EmergencyModal } from './components/common/EmergencyModal';
import { Modal } from './components/common/Modal';
import { KnowledgeGraph } from './components/knowledge/KnowledgeGraph';

export const App: React.FC = () => {
  // Theme state: default to localStorage or dark
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salud-theme');
      if (saved) return saved === 'dark';
    }
    return true;
  });

  // Chapter state: 'W' or 'O'
  const [currentChapterId, setCurrentChapterId] = useState<string>('W');

  // View state: 'landing' or 'page'
  const [viewMode, setViewMode] = useState<'landing' | 'page'>('landing');
  const [activePageId, setActivePageId] = useState<string>('PAGE-W-01');

  // Modals state
  const [isCouncilOpen, setIsCouncilOpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);
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

  // Handle URL Hash navigation on mount
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        if (hash.startsWith('O')) {
          setCurrentChapterId('O');
          if (hash.includes('/')) {
            const pId = hash.split('/')[1];
            setActivePageId(pId);
            setViewMode('page');
          } else {
            setViewMode('landing');
          }
        } else if (hash.startsWith('W')) {
          setCurrentChapterId('W');
          if (hash.includes('/')) {
            const pId = hash.split('/')[1];
            setActivePageId(pId);
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

  // Sync hash when user navigates
  const handleSelectChapter = (chId: string) => {
    setCurrentChapterId(chId);
    setViewMode('landing');
    if (chId === 'W') {
      setActivePageId('PAGE-W-01');
      window.location.hash = 'W';
    } else if (chId === 'O') {
      setActivePageId('PAGE-O-01');
      window.location.hash = 'O';
    }
    setIsMobileSidebarOpen(false);
  };

  const handleSelectPage = (pageId: string) => {
    setActivePageId(pageId);
    setViewMode('page');
    window.location.hash = `${currentChapterId}/${pageId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileSidebarOpen(false);
    setIsGraphModalOpen(false);
  };

  const currentChapter = CHAPTERS.find((c) => c.id === currentChapterId) || CHAPTERS[0];
  const pagesForCurrent = currentChapterId === 'W' ? CHAPTER_W_PAGES : currentChapterId === 'O' ? CHAPTER_O_PAGES : [];
  const currentPage = pagesForCurrent.find((p) => p.id === activePageId) || pagesForCurrent[0];

  return (
    <div className="min-h-screen flex flex-col bg-salud-light-bg dark:bg-salud-dark-bg text-salud-light-text dark:text-salud-dark-text bg-tech-grid transition-colors">
      {/* ── Top Header ── */}
      <Header
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenCouncil={() => setIsCouncilOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      />

      {/* ── Main Layout: Sidebar (240px) + Main Content (880px) + Inspector (280px) ── */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        {/* Desktop Sidebar (Spec §10.1: 240px) */}
        <div className="hidden lg:block">
          <Sidebar
            currentChapterId={currentChapterId}
            activePageId={activePageId}
            onSelectChapter={handleSelectChapter}
            onSelectPage={handleSelectPage}
            chapterWPages={CHAPTER_W_PAGES}
            chapterOPages={CHAPTER_O_PAGES}
          />
        </div>

        {/* Mobile Slide-out Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-72 h-full bg-salud-light-surface dark:bg-salud-dark-surface p-4 overflow-y-auto border-r border-salud-light-border dark:border-salud-dark-border">
              <div className="flex justify-between items-center pb-3 border-b border-salud-light-border dark:border-salud-dark-border mb-4">
                <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">Salud 導航目錄</span>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>
              <Sidebar
                currentChapterId={currentChapterId}
                activePageId={activePageId}
                onSelectChapter={handleSelectChapter}
                onSelectPage={handleSelectPage}
                chapterWPages={CHAPTER_W_PAGES}
                chapterOPages={CHAPTER_O_PAGES}
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
                onClick={() => setViewMode('landing')}
                className="hover:text-salud-amber transition-colors font-bold"
              >
                Chapter {currentChapter.id} · {currentChapter.title_zh}
              </button>
              {viewMode === 'page' && (
                <>
                  <span>/</span>
                  <span className="text-salud-cyan font-bold">{currentPage?.id}</span>
                </>
              )}
            </div>

            {viewMode === 'page' && (
              <button
                onClick={() => setViewMode('landing')}
                className="text-[11px] text-salud-amber-400 hover:underline flex items-center gap-1"
              >
                ⟵ 返回篇章地圖全景
              </button>
            )}
          </nav>

          {/* Render Chapter Landing or Knowledge Page */}
          {viewMode === 'landing' ? (
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
        </main>

        {/* Desktop Context Inspector (Spec §10.1: 280px) */}
        {viewMode === 'page' && currentPage && (
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

      {/* ── Mobile Bottom Navigation Bar (Spec §10.4) ── */}
      <MobileNav
        currentChapterId={currentChapterId}
        onSelectChapter={handleSelectChapter}
        onOpenGraph={() => setIsGraphModalOpen(true)}
        onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
        onOpenCouncil={() => setIsCouncilOpen(true)}
      />

      {/* ── Expert Council Governance Modal (22 seats) ── */}
      <ExpertCouncilModal
        isOpen={isCouncilOpen}
        onClose={() => setIsCouncilOpen(false)}
      />

      {/* ── Emergency Red Flag Modal ── */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
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
