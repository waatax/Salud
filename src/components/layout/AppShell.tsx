import React, { Suspense, lazy } from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useTheme } from '../../context/ThemeContext';
import { useModal } from '../../context/ModalContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { ContextInspector } from './ContextInspector';
import { MobileNav } from './MobileNav';
import { Breadcrumb } from './Breadcrumb';
import { ReadingProgressBar } from '../common/ReadingProgressBar';
import { FloatingReadingDock } from '../common/FloatingReadingDock';
import { Modal } from '../common/Modal';
import { DietaryPatternsHub } from '../pillars/DietaryPatternsHub';
import { ExerciseHub } from '../pillars/ExerciseHub';
import { SleepHub } from '../pillars/SleepHub';
import { SupplementsHub } from '../pillars/SupplementsHub';
import { ChapterLanding } from '../knowledge/ChapterLanding';
import { KnowledgePage } from '../knowledge/KnowledgePage';
import { CHAPTERS } from '../../data/chapters';

// Lazy-loaded heavy council governance and screening modals (Round 3 optimization)
const ExpertCouncilModal = lazy(() =>
  import('../council/ExpertCouncilModal').then((m) => ({ default: m.ExpertCouncilModal }))
);
const ExpertBestPracticeView = lazy(() =>
  import('../council/ExpertBestPracticeView').then((m) => ({ default: m.ExpertBestPracticeView }))
);
const EmergencyModal = lazy(() =>
  import('../common/EmergencyModal').then((m) => ({ default: m.EmergencyModal }))
);
const AuditCModal = lazy(() =>
  import('../common/AuditCModal').then((m) => ({ default: m.AuditCModal }))
);
const CardiometabolicHubModal = lazy(() =>
  import('../hub/CardiometabolicHubModal').then((m) => ({ default: m.CardiometabolicHubModal }))
);
const KnowledgeGraph = lazy(() =>
  import('../knowledge/KnowledgeGraph').then((m) => ({ default: m.KnowledgeGraph }))
);

export function AppShell() {
  const {
    activePillar,
    dietView,
    viewMode,
    currentChapterId,
    activePageId,
    isCouncilEvidenceView,
    selectedCouncilExpertId,
    exerciseSubTab,
    isMobileSidebarOpen,
    currentChapter,
    pagesForCurrent,
    currentPage,
    selectPillar,
    selectChapter,
    selectPage,
    openCouncilEvidence,
    toggleMobileSidebar,
    setIsCouncilEvidenceView
  } = useNavigation();

  const { isDark, toggleTheme } = useTheme();
  const { openModal, closeModal, isOpen } = useModal();

  return (
    <div className="min-h-screen flex flex-col bg-salud-light-bg dark:bg-salud-dark-bg text-salud-light-text dark:text-salud-dark-text bg-tech-grid transition-colors">
      <ReadingProgressBar />
      
      <Header 
        activePillar={activePillar} 
        onSelectPillar={selectPillar} 
        isDark={isDark} 
        onToggleTheme={toggleTheme} 
        onOpenCardioHub={() => openModal('cardioHub')} 
        onToggleMobileSidebar={toggleMobileSidebar} 
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Slide-out Sidebar Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="w-72 h-full bg-salud-light-surface dark:bg-salud-dark-surface p-4 overflow-y-auto border-r border-salud-light-border dark:border-salud-dark-border">
              <div className="flex justify-between items-center pb-3 border-b border-salud-light-border dark:border-salud-dark-border mb-4">
                <span className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">Salud 四大支柱導航</span>
                <button onClick={() => toggleMobileSidebar()} className="p-1 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white">✕</button>
              </div>
              <Sidebar />
            </div>
            <div className="flex-1" onClick={() => toggleMobileSidebar()} />
          </div>
        )}

        {/* Center Content Area */}
        <main className="flex-1 px-4 sm:px-8 py-6 overflow-y-auto">
          <Breadcrumb />
          
          {/* Content routing */}
          {isCouncilEvidenceView ? (
            <Suspense
              fallback={
                <div className="py-16 text-center font-mono text-xs text-slate-500">
                  <div className="w-8 h-8 rounded-full border-2 border-nature-amber-500 border-t-transparent animate-spin mx-auto mb-2" />
                  <span>載入 24 席專家治理架構與實證庫...</span>
                </div>
              }
            >
              <ExpertBestPracticeView
                initialExpertId={selectedCouncilExpertId}
                onSelectPillar={(pillar) => {
                  setIsCouncilEvidenceView(false);
                  selectPillar(pillar);
                }}
                onBackToMain={() => {
                  setIsCouncilEvidenceView(false);
                  selectPillar('diet');
                }}
              />
            </Suspense>
          ) : (
            <>
              {activePillar === 'diet' && (
                <>
                  {dietView === 'patterns' ? (
                    <DietaryPatternsHub chapters={CHAPTERS} onSelectChapter={selectChapter} />
                  ) : viewMode === 'landing' && currentChapter ? (
                    <ChapterLanding
                      chapter={currentChapter}
                      pages={pagesForCurrent}
                      onStartReading={selectPage}
                      onSelectPage={selectPage}
                    />
                  ) : currentPage ? (
                    <KnowledgePage page={currentPage} onNavigatePage={selectPage} />
                  ) : null}
                </>
              )}
              {activePillar === 'exercise' && (
                <ExerciseHub key={exerciseSubTab} initialSubTab={exerciseSubTab} />
              )}
              {activePillar === 'sleep' && <SleepHub />}
              {activePillar === 'supplements' && <SupplementsHub />}
            </>
          )}
        </main>

        {/* Desktop Context Inspector */}
        {!isCouncilEvidenceView &&
          activePillar === 'diet' &&
          dietView === 'chapter' &&
          viewMode === 'page' &&
          currentPage && (
            <div className="hidden xl:block">
              <ContextInspector page={currentPage} onSelectKP={(kpId) => console.log('Jump to KP:', kpId)} />
            </div>
          )}
      </div>

      <MobileNav
        activePillar={activePillar}
        onSelectPillar={selectPillar}
        onOpenEmergencyModal={() => openModal('emergency')}
        onOpenCouncil={() => openModal('council')}
      />

      {/* All Lazy-loaded Modals wrapped in Suspense */}
      <Suspense fallback={null}>
        {isOpen('council') && (
          <ExpertCouncilModal
            isOpen={true}
            onClose={() => closeModal('council')}
            onOpenBestPractice={openCouncilEvidence}
          />
        )}
        {isOpen('emergency') && (
          <EmergencyModal isOpen={true} onClose={() => closeModal('emergency')} />
        )}
        {isOpen('auditC') && (
          <AuditCModal isOpen={true} onClose={() => closeModal('auditC')} />
        )}
        {isOpen('cardioHub') && (
          <CardiometabolicHubModal isOpen={true} onClose={() => closeModal('cardioHub')} />
        )}
        {isOpen('graph') && currentChapter && (
          <Modal
            isOpen={true}
            onClose={() => closeModal('graph')}
            title={`Chapter ${currentChapter.id} 知識路徑探索圖`}
            subtitle="點擊任一知識節點直接跳轉閱讀"
            maxWidth="4xl"
          >
            <KnowledgeGraph
              pages={pagesForCurrent}
              activePageId={activePageId}
              onSelectPage={(id) => {
                selectPage(id);
                closeModal('graph');
              }}
            />
          </Modal>
        )}
      </Suspense>

      <FloatingReadingDock isDark={isDark} onToggleTheme={toggleTheme} />
    </div>
  );
}
