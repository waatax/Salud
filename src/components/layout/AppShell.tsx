import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { X, AlertOctagon } from 'lucide-react';
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
import { LearnHome } from '../learn/LearnHome';
import { QuickTips } from '../learn/QuickTips';
import { TrackView } from '../learn/TrackView';
import { SearchPalette } from '../learn/SearchPalette';
import { SiteFooter } from './SiteFooter';
import { CHAPTERS } from '../../data/chapters';

// v4.0: every topic hub is lazy-loaded. The learning home is the entry point, so a
// first visit should not download all nine specialist hubs and their data up front.
const DietaryPatternsHub = lazy(() => import('../pillars/DietaryPatternsHub').then((m) => ({ default: m.DietaryPatternsHub })));
const ExerciseHub = lazy(() => import('../pillars/ExerciseHub').then((m) => ({ default: m.ExerciseHub })));
const SleepHub = lazy(() => import('../pillars/SleepHub').then((m) => ({ default: m.SleepHub })));
const SupplementsHub = lazy(() => import('../pillars/SupplementsHub').then((m) => ({ default: m.SupplementsHub })));
const MentalHealthHub = lazy(() => import('../pillars/MentalHealthHub').then((m) => ({ default: m.MentalHealthHub })));
const ChapterLanding = lazy(() => import('../knowledge/ChapterLanding').then((m) => ({ default: m.ChapterLanding })));
const KnowledgePage = lazy(() => import('../knowledge/KnowledgePage').then((m) => ({ default: m.KnowledgePage })));
const HumanSystemsHub = lazy(() => import('../systems/HumanSystemsHub').then((m) => ({ default: m.HumanSystemsHub })));
const UltraHealthHub = lazy(() => import('../ultrahealth/UltraHealthHub').then((m) => ({ default: m.UltraHealthHub })));
const ObesityHub = lazy(() => import('../pillars/ObesityHub').then((m) => ({ default: m.ObesityHub })));
const LongevityHub = lazy(() => import('../pillars/LongevityHub').then((m) => ({ default: m.LongevityHub })));
const CardiometabolicHub = lazy(() => import('../pillars/CardiometabolicHub').then((m) => ({ default: m.CardiometabolicHub })));

// Lazy-loaded secondary pages and dialogs
const EmergencyModal = lazy(() => import('../common/EmergencyModal').then((m) => ({ default: m.EmergencyModal })));
const AuditCModal = lazy(() => import('../common/AuditCModal').then((m) => ({ default: m.AuditCModal })));
const CardiometabolicHubModal = lazy(() =>
  import('../hub/CardiometabolicHubModal').then((m) => ({ default: m.CardiometabolicHubModal }))
);
const KnowledgeGraph = lazy(() => import('../knowledge/KnowledgeGraph').then((m) => ({ default: m.KnowledgeGraph })));
const CrossPillarSynergy = lazy(() => import('../hub/CrossPillarSynergy').then((m) => ({ default: m.CrossPillarSynergy })));
const AboutGovernancePage = lazy(() => import('../meta/AboutGovernancePage').then((m) => ({ default: m.AboutGovernancePage })));
const EvidenceLibraryPage = lazy(() => import('../meta/EvidenceLibraryPage').then((m) => ({ default: m.EvidenceLibraryPage })));
const KnowledgeExplorerPage = lazy(() =>
  import('../knowledge/KnowledgeExplorerPage').then((m) => ({ default: m.KnowledgeExplorerPage }))
);
const EvidenceUpdatesPage = lazy(() => import('../learn/EvidenceUpdatesPage').then((m) => ({ default: m.EvidenceUpdatesPage })));
const CheckupGuide = lazy(() => import('../learn/CheckupGuide').then((m) => ({ default: m.CheckupGuide })));
const StarterPlanPage = lazy(() => import('../learn/StarterPlanPage').then((m) => ({ default: m.StarterPlanPage })));
const GlossaryPage = lazy(() => import('../learn/GlossaryPage').then((m) => ({ default: m.GlossaryPage })));
const SimulatorsModal = lazy(() => import('../common/SimulatorsModal').then((m) => ({ default: m.SimulatorsModal })));
const LearningBackpackModal = lazy(() => import('../common/LearningBackpackModal').then((m) => ({ default: m.LearningBackpackModal })));

const Loading: React.FC = () => (
  <div className="py-16 text-center text-sm text-slate-500" role="status">
    <div className="w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin mx-auto mb-2" aria-hidden="true" />
    載入中…
  </div>
);

export function AppShell() {
  const {
    activePillar,
    learnTrackId,
    learnLessonId,
    dietView,
    viewMode,
    activePageId,
    currentChapterId,
    isCouncilEvidenceView,
    isSynergyView,
    metaView,
    highlightedPillar,
    selectedCouncilExpertId,
    exerciseSubTab,
    isMobileSidebarOpen,
    currentChapter,
    pagesForCurrent,
    currentPage,
    selectPillar,
    selectChapter,
    selectPage,
    toggleMobileSidebar,
    setIsMobileSidebarOpen,
    setIsCouncilEvidenceView,
  } = useNavigation();

  const { isDark, toggleTheme } = useTheme();
  const { openModal, closeModal, isOpen } = useModal();
  const mainRef = useRef<HTMLElement>(null);

  // 「立即上手」tips for the section on screen. Body systems render their own card
  // (it follows the selected system); learner pages place it inside their layout.
  const onHealthPage = !metaView && !isSynergyView && !isCouncilEvidenceView;
  const tipKey: string | null = !onHealthPage
    ? null
    : activePillar === 'diet'
    ? dietView === 'chapter'
      ? `diet:${currentChapterId}`
      : 'diet'
    : activePillar === 'exercise'
    ? `exercise:${exerciseSubTab}`
    : (['sleep', 'mental', 'cardiometabolic', 'obesity', 'longevity', 'ultrahealth', 'supplements'] as string[]).includes(activePillar)
    ? activePillar
    : null;

  // Every page change starts at the top — including Back/Forward — so a lesson never
  // opens halfway down because the previous page was scrolled.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [activePillar, learnTrackId, learnLessonId, dietView, viewMode, activePageId, metaView, isSynergyView, isCouncilEvidenceView, exerciseSubTab]);

  // Close the drawer with Escape and lock background scroll while it is open.
  useEffect(() => {
    if (!isMobileSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsMobileSidebarOpen(false);
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isMobileSidebarOpen, setIsMobileSidebarOpen]);

  const learnerPage = activePillar === 'home' || activePillar === 'start' || activePillar === 'learn' || activePillar === 'updates' || activePillar === 'checkup' || activePillar === 'glossary';

  return (
    <div className="min-h-screen flex flex-col bg-salud-light-bg dark:bg-salud-dark-bg text-salud-light-text dark:text-salud-dark-text transition-colors">
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[70] focus:rounded-xl focus:bg-emerald-700 focus:text-white focus:px-4 focus:py-2"
      >
        跳到主要內容
      </a>
      <ReadingProgressBar />

      <Header
        activePillar={highlightedPillar}
        onSelectPillar={selectPillar}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onToggleMobileSidebar={toggleMobileSidebar}
      />

      <div className="flex-1 max-w-7xl w-full mx-auto flex overflow-x-clip">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden" role="dialog" aria-modal="true" aria-label="全部主題">
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={() => toggleMobileSidebar()} />
            <div className="relative w-[85vw] max-w-xs h-full bg-white dark:bg-salud-dark-surface overflow-y-auto border-r border-slate-200 dark:border-slate-800 px-3 pb-8 animate-slide-in-left">
              <div className="sticky top-0 z-10 -mx-3 px-4 py-3 flex justify-between items-center bg-white/95 dark:bg-salud-dark-surface/95 backdrop-blur border-b border-slate-200 dark:border-slate-800">
                <span className="font-display font-bold text-slate-900 dark:text-white">全部主題</span>
                <button
                  onClick={() => toggleMobileSidebar()}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  aria-label="關閉選單"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  openModal('emergency');
                }}
                className="mt-3 w-full flex items-center gap-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-3 py-2.5 text-sm font-semibold text-red-800 dark:text-red-300"
              >
                <AlertOctagon className="w-4 h-4" aria-hidden="true" />
                危險警訊：何時要立刻就醫
              </button>
              <Sidebar variant="drawer" />
            </div>
          </div>
        )}

        {/* Main content */}
        <main
          id="main-content"
          ref={mainRef}
          tabIndex={-1}
          className="flex-1 min-w-0 px-3.5 sm:px-8 pt-4 pb-28 sm:py-6 lg:pb-12 focus:outline-none"
        >
          {!learnerPage && <Breadcrumb />}
          {tipKey && <QuickTips key={tipKey} sectionKey={tipKey} className="mb-6" />}

          <div className={learnerPage ? 'max-w-5xl mx-auto' : undefined}>
            {metaView ? (
              <Suspense fallback={<Loading />}>
                {metaView === 'about' ? <AboutGovernancePage /> : metaView === 'explore' ? <KnowledgeExplorerPage /> : <EvidenceLibraryPage />}
              </Suspense>
            ) : isSynergyView ? (
              <Suspense fallback={<Loading />}>
                <CrossPillarSynergy />
              </Suspense>
            ) : isCouncilEvidenceView ? (
              <Suspense fallback={<Loading />}>
                <EvidenceLibraryPage />
              </Suspense>
            ) : (
              <Suspense fallback={<Loading />}>
                {activePillar === 'home' && <LearnHome />}
                {activePillar === 'start' && <StarterPlanPage />}
                {activePillar === 'learn' && <TrackView />}
                {activePillar === 'updates' && <EvidenceUpdatesPage />}
                {activePillar === 'checkup' && <CheckupGuide />}
                {activePillar === 'glossary' && <GlossaryPage />}
                {activePillar === 'systems' && <HumanSystemsHub />}
                {activePillar === 'ultrahealth' && <UltraHealthHub />}
                {activePillar === 'obesity' && <ObesityHub />}
                {activePillar === 'longevity' && <LongevityHub />}
                {activePillar === 'cardiometabolic' && <CardiometabolicHub />}
                {activePillar === 'diet' && (
                  <>
                    {dietView === 'patterns' ? (
                      <DietaryPatternsHub chapters={CHAPTERS} onSelectChapter={selectChapter} />
                    ) : viewMode === 'landing' && currentChapter ? (
                      <ChapterLanding chapter={currentChapter} pages={pagesForCurrent} onStartReading={selectPage} onSelectPage={selectPage} />
                    ) : currentPage ? (
                      <KnowledgePage page={currentPage} onNavigatePage={selectPage} />
                    ) : null}
                  </>
                )}
                {activePillar === 'exercise' && <ExerciseHub key={exerciseSubTab} initialSubTab={exerciseSubTab} />}
                {activePillar === 'sleep' && <SleepHub />}
                {activePillar === 'supplements' && <SupplementsHub />}
                {activePillar === 'mental' && <MentalHealthHub />}
              </Suspense>
            )}
          </div>
          <SiteFooter />
        </main>

        {/* Desktop Context Inspector */}
        {!metaView && !isCouncilEvidenceView && !isSynergyView && activePillar === 'diet' && dietView === 'chapter' && viewMode === 'page' && currentPage && (
          <div className="hidden xl:block">
            <ContextInspector page={currentPage} onSelectKP={() => undefined} />
          </div>
        )}
      </div>

      <MobileNav activePillar={highlightedPillar} onSelectPillar={selectPillar} onOpenMenu={toggleMobileSidebar} />

      <SearchPalette />

      <Suspense fallback={null}>
        {isOpen('emergency') && <EmergencyModal isOpen={true} onClose={() => closeModal('emergency')} />}
        {isOpen('auditC') && <AuditCModal isOpen={true} onClose={() => closeModal('auditC')} />}
        {isOpen('cardioHub') && <CardiometabolicHubModal isOpen={true} onClose={() => closeModal('cardioHub')} />}
        {isOpen('simulators') && <SimulatorsModal isOpen={true} onClose={() => closeModal('simulators')} />}
        {isOpen('backpack') && <LearningBackpackModal isOpen={true} onClose={() => closeModal('backpack')} />}
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
