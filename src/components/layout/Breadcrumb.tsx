import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../i18n';

export function Breadcrumb() {
  const { t } = useLanguage();
  const {
    activePillar,
    dietView,
    viewMode,
    currentChapter,
    currentPage,
    isCouncilEvidenceView,
    isSynergyView,
    setDietView,
    setViewMode,
    setIsCouncilEvidenceView,
    setIsSynergyView,
    selectPillar,
  } = useNavigation();

  return (
    <nav className="mb-5 flex items-center justify-between font-mono text-xs text-slate-500 dark:text-slate-400 border-b border-salud-light-border/60 dark:border-salud-dark-border/40 pb-2">
      {isSynergyView ? (
        <div className="flex items-center gap-1.5">
          <button onClick={() => selectPillar('systems')} className="hover:text-salud-cyan transition-colors font-bold">
            首頁
          </button>
          <span>/</span>
          <span className="font-bold text-slate-800 dark:text-slate-100">四大健康支柱全人醫療</span>
          <span>/</span>
          <span className="text-salud-cyan font-bold">跨領域處方協同引擎 (Holistic Synergy)</span>
        </div>
      ) : isCouncilEvidenceView ? (
        <div className="flex items-center gap-1.5">
          <button onClick={() => selectPillar('systems')} className="hover:text-nature-amber-600 dark:hover:text-nature-amber-400 transition-colors font-bold">
            首頁
          </button>
          <span>/</span>
          <span className="font-bold text-slate-800 dark:text-slate-100">24 席專家治理架構</span>
          <span>/</span>
          <span className="text-nature-amber-600 dark:text-nature-amber-400 font-bold">50+ 篇期刊實證與 Best Practice</span>
        </div>
      ) : activePillar === 'systems' ? (
        <div className="flex items-center gap-1.5">
          <button onClick={() => selectPillar('systems')} className="hover:text-salud-cyan transition-colors font-bold flex items-center gap-1">
            <span>🏠</span>
            <span className="text-slate-800 dark:text-slate-100">首頁 / {t('pillar.systems')}</span>
          </button>
          <span>/</span>
          <span className="text-salud-cyan font-bold">8 大生理系統高解晰圖式與實證醫學總覽</span>
        </div>
      ) : (
        <div className="flex items-center gap-1.5">
          <button onClick={() => selectPillar('systems')} className="hover:text-salud-cyan transition-colors font-bold">
            首頁
          </button>
          <span>/</span>
          <button onClick={() => { if (activePillar === 'diet') setDietView('patterns'); }} className="hover:text-salud-amber transition-colors font-bold flex items-center gap-1">
            <span>支柱:</span>
            <span className="text-slate-800 dark:text-slate-100">{t(`pillar.${activePillar}`)}</span>
          </button>
          {activePillar === 'diet' && dietView === 'chapter' && currentChapter && (
            <>
              <span>/</span>
              <button onClick={() => setViewMode('landing')} className="hover:text-salud-amber font-bold text-salud-amber-600 dark:text-salud-amber">
                Chapter {currentChapter.id}
              </button>
              {viewMode === 'page' && currentPage && (
                <>
                  <span>/</span>
                  <span className="text-salud-cyan font-bold">{currentPage.id}</span>
                </>
              )}
            </>
          )}
        </div>
      )}
      {isSynergyView ? (
        <button onClick={() => { setIsSynergyView(false); selectPillar('systems'); }} className="text-[11px] text-salud-cyan hover:underline flex items-center gap-1 font-bold">
          ⇵ 返回首頁人體系統
        </button>
      ) : isCouncilEvidenceView ? (
        <button onClick={() => { setIsCouncilEvidenceView(false); selectPillar('systems'); }} className="text-[11px] text-nature-amber-600 dark:text-nature-amber-400 hover:underline flex items-center gap-1 font-bold">
          ⇵ 返回首頁人體系統
        </button>
      ) : activePillar === 'diet' && dietView === 'chapter' ? (
        <button onClick={() => setDietView('patterns')} className="text-[11px] text-salud-cyan hover:underline flex items-center gap-1">
          ⇵ 返回飲食模式與營養要素
        </button>
      ) : activePillar !== 'systems' ? (
        <button onClick={() => selectPillar('systems')} className="text-[11px] text-salud-cyan hover:underline flex items-center gap-1">
          🏠 返回人體系統
        </button>
      ) : null}
    </nav>
  );
}
