import React, { useState, useEffect } from 'react';
import { KnowledgePage, HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { FontSizeToggle } from '../common/FontSizeToggle';
import {
  PILLAR_NAV,
  PILLAR_GROUPS,
  DIET_SUB_NAV,
  EXERCISE_SUB_NAV,
  PillarNavItem,
} from '../../config/navigation';
import {
  ChevronDown,
  ChevronRight,
  HeartPulse,
  ClipboardCheck,
  AlertOctagon,
  PanelLeftClose,
  PanelLeft,
  Check,
} from 'lucide-react';

interface Props {
  activePillar?: HealthPillar | null;
  onSelectPillar?: (pillar: HealthPillar) => void;
  currentChapterId?: string;
  activePageId?: string;
  onSelectChapter?: (chapterId: string) => void;
  onSelectPage?: (pageId: string) => void;
  chapterWPages?: KnowledgePage[];
  chapterOPages?: KnowledgePage[];
  chapterAPages?: KnowledgePage[];
  onOpenAuditC?: () => void;
  onOpenCardioHub?: () => void;
  onOpenEmergencyModal?: () => void;
}

const CHAPTER_IDS = [
  { id: 'W', label_zh: '水分與水合', label_en: 'Water & hydration' },
  { id: 'O', label_zh: '油脂與烹調', label_en: 'Fats & cooking' },
  { id: 'A', label_zh: '酒精與代謝', label_en: 'Alcohol & metabolism' },
];

/**
 * Sidebar — secondary navigation: the topic tree plus the reader-facing clinical tools.
 *
 * v2.0 renders the pillar list from config/navigation.ts instead of nine hand-written
 * blocks, and no longer carries the four expert-council entries. Those described who
 * reviewed the content, not what the reader can read, so they moved to the footer.
 */
export const Sidebar: React.FC<Props> = (props) => {
  const { t, language } = useLanguage();
  const nav = useNavigation();
  const modal = useModal();
  const zh = language === 'zh-TW';

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<HealthPillar | null>('diet');
  const [completedList, setCompletedList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('salud_completed_pages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem('salud_completed_pages');
        if (saved) setCompletedList(JSON.parse(saved));
      } catch {}
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Fall back to context when props are omitted
  const activePillar = props.activePillar ?? nav.highlightedPillar;
  const onSelectPillar = props.onSelectPillar ?? nav.selectPillar;
  const currentChapterId = props.currentChapterId ?? nav.currentChapterId;
  const activePageId = props.activePageId ?? nav.activePageId;
  const onSelectChapter = props.onSelectChapter ?? nav.selectChapter;
  const onSelectPage = props.onSelectPage ?? nav.selectPage;
  const onOpenAuditC = props.onOpenAuditC ?? (() => modal.openModal('auditC'));
  const onOpenCardioHub = props.onOpenCardioHub ?? (() => modal.openModal('cardioHub'));
  const onOpenEmergencyModal = props.onOpenEmergencyModal ?? (() => modal.openModal('emergency'));

  const pagesForCurrent =
    props.chapterWPages && props.chapterOPages && props.chapterAPages
      ? currentChapterId === 'W'
        ? props.chapterWPages
        : currentChapterId === 'O'
        ? props.chapterOPages
        : currentChapterId === 'A'
        ? props.chapterAPages
        : []
      : nav.pagesForCurrent;

  const isPillarActive = (item: PillarNavItem) =>
    activePillar === item.id || (item.id === 'diet' && activePillar === 'supplements');

  const hasSubNav = (id: HealthPillar) => id === 'diet' || id === 'exercise';

  const renderPillar = (item: PillarNavItem) => {
    const Icon = item.icon;
    const isActive = isPillarActive(item);
    const isExpanded = expandedPillar === item.id;

    return (
      <div key={item.id} className="space-y-1">
        <div
          className={`btn-tactile w-full rounded-xl border transition-all flex items-center ${
            isActive
              ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold shadow-xs'
              : 'border-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <button
            onClick={() => onSelectPillar(item.id)}
            className={`flex-1 min-w-0 p-2.5 text-left flex items-center gap-2 ${
              isCollapsed ? 'justify-center px-2' : ''
            }`}
            title={zh ? item.label_zh : item.label_en}
          >
            <Icon
              className={`w-4 h-4 shrink-0 ${
                isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'
              }`}
            />
            {!isCollapsed && (
              <span className="truncate text-xs">{zh ? item.label_zh : item.label_en}</span>
            )}
          </button>

          {!isCollapsed &&
            (hasSubNav(item.id) ? (
              <button
                onClick={() => setExpandedPillar(isExpanded ? null : item.id)}
                className="p-2 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-300 rounded-lg shrink-0"
                aria-label={zh ? '展開子項目' : 'Expand sub-topics'}
              >
                {isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5" />
                )}
              </button>
            ) : (
              <span className="pr-2.5 text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                {zh ? item.blurb_zh : item.blurb_en}
              </span>
            ))}
        </div>

        {/* Sub-navigation */}
        {!isCollapsed && isExpanded && item.id === 'diet' && (
          <div className="pl-4 space-y-0.5 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 py-1">
            {DIET_SUB_NAV.map((sub) => (
              <button
                key={sub.hash}
                onClick={() => {
                  if (sub.hash === 'supplements') {
                    onSelectPillar('supplements');
                  } else {
                    onSelectPillar('diet');
                    window.location.hash = sub.hash;
                  }
                }}
                className="btn-tactile w-full p-1.5 rounded-lg text-left text-[11px] flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <span className="text-emerald-500 font-bold">·</span>
                <span className="truncate">{zh ? sub.label_zh : sub.label_en}</span>
              </button>
            ))}
            {CHAPTER_IDS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(ch.id)}
                className={`btn-tactile w-full p-1.5 rounded-lg text-left text-[11px] flex items-center gap-2 ${
                  currentChapterId === ch.id && nav.dietView === 'chapter'
                    ? 'text-emerald-700 dark:text-emerald-300 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300'
                }`}
              >
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {ch.id}
                </span>
                <span className="truncate">{zh ? ch.label_zh : ch.label_en}</span>
              </button>
            ))}
          </div>
        )}

        {!isCollapsed && isExpanded && item.id === 'exercise' && (
          <div className="pl-4 space-y-0.5 border-l-2 border-slate-200 dark:border-slate-800 ml-3.5 py-1">
            {EXERCISE_SUB_NAV.map((sub) => (
              <button
                key={sub.hash}
                onClick={() => {
                  window.location.hash = sub.hash;
                }}
                className="btn-tactile w-full p-1.5 rounded-lg text-left text-[11px] flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                <span className="text-emerald-500 font-bold">·</span>
                <span className="truncate">{zh ? sub.label_zh : sub.label_en}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const groupOrder: PillarNavItem['group'][] = ['foundation', 'goals', 'daily'];

  return (
    <aside
      className={`shrink-0 border-r border-salud-light-border/80 dark:border-salud-dark-border/80 bg-white/70 dark:bg-salud-dark-surface/50 p-4 space-y-5 overflow-y-auto text-xs font-sans transition-all duration-300 ${
        isCollapsed ? 'w-16 items-center px-2' : 'w-64'
      }`}
    >
      {/* Collapse toggle (desktop) */}
      <div className="hidden lg:flex items-center justify-between pb-1 border-b border-slate-200/60 dark:border-slate-800/60">
        {!isCollapsed && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
            {zh ? '健康主題' : 'Topics'}
          </span>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
            isCollapsed ? 'mx-auto' : ''
          }`}
          title={isCollapsed ? (zh ? '展開側邊欄' : 'Expand') : zh ? '收合側邊欄' : 'Collapse'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* Grouped topic tree */}
      {groupOrder.map((group) => {
        const items = PILLAR_NAV.filter((p) => p.group === group);
        if (!items.length) return null;
        return (
          <div key={group} className="space-y-1.5">
            {!isCollapsed && (
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider px-1 block font-bold">
                {zh ? PILLAR_GROUPS[group].title_zh : PILLAR_GROUPS[group].title_en}
              </span>
            )}
            {items.map(renderPillar)}
          </div>
        );
      })}

      {/* Page list for the chapter currently being read */}
      {!isCollapsed && activePillar === 'diet' && nav.dietView === 'chapter' && pagesForCurrent.length > 0 && (
        <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
            {zh ? `第 ${currentChapterId} 章內容` : `Chapter ${currentChapterId}`}
          </span>
          <div className="space-y-0.5">
            {pagesForCurrent.map((p) => {
              const isPageActive = activePageId === p.id && nav.viewMode === 'page';
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPage(p.id)}
                  title={`${p.id}: ${p.title_zh}`}
                  className={`btn-tactile w-full p-2 rounded-xl text-left transition-all flex items-center justify-between gap-1.5 ${
                    isPageActive
                      ? 'bg-emerald-50 dark:bg-slate-800/95 text-emerald-900 dark:text-emerald-200 font-bold border border-emerald-300 dark:border-emerald-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <span className="truncate text-xs">{zh ? p.title_zh : p.title_en}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {completedList.includes(p.id) && (
                      <Check className="w-3 h-3 text-emerald-500" />
                    )}
                    {p.safety_gated && (
                      <AlertOctagon className="w-3 h-3 text-red-500 animate-pulse" />
                    )}
                    <span className="text-[10px] text-slate-400 font-mono">
                      {p.estimated_minutes}m
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Reader-facing clinical tools — these answer a health question, so they stay */}
      <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-slate-800">
        {!isCollapsed && (
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
            {zh ? '自我檢測工具' : 'Self-check tools'}
          </span>
        )}

        <button
          onClick={onOpenEmergencyModal}
          className={`btn-tactile w-full p-2 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-800 dark:text-red-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={t('nav.red_flags_title')}
        >
          <AlertOctagon className="w-3.5 h-3.5 shrink-0 animate-pulse" />
          {!isCollapsed && <span>{t('nav.red_flags')}</span>}
        </button>

        <button
          onClick={onOpenAuditC}
          className={`btn-tactile w-full p-2 rounded-xl border border-purple-200 dark:border-purple-800/60 bg-purple-50/80 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-800 dark:text-purple-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? t('nav.audit_c') : undefined}
        >
          <ClipboardCheck className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>{t('nav.audit_c')}</span>}
        </button>

        <button
          onClick={onOpenCardioHub}
          className={`btn-tactile w-full p-2 rounded-xl border border-nature-sky-200 dark:border-nature-sky-800/60 bg-nature-sky-50/80 dark:bg-nature-sky-950/20 hover:bg-nature-sky-100 dark:hover:bg-nature-sky-900/30 text-nature-sky-800 dark:text-nature-sky-300 font-mono text-xs flex items-center gap-2 transition-all ${
            isCollapsed ? 'justify-center px-2' : ''
          }`}
          title={isCollapsed ? t('nav.cardio_hub') : undefined}
        >
          <HeartPulse className="w-3.5 h-3.5 shrink-0" />
          {!isCollapsed && <span>{t('nav.cardio_hub')}</span>}
        </button>
      </div>

      {!isCollapsed && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block px-1 font-bold">
            {zh ? '閱讀字級' : 'Font size'}
          </span>
          <FontSizeToggle variant="full" />
        </div>
      )}
    </aside>
  );
};
