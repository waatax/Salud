import React, { useState, useEffect } from 'react';
import { HealthPillar } from '../../types';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { useModal } from '../../context/ModalContext';
import { FontSizeToggle } from '../common/FontSizeToggle';
import { LanguageToggle } from '../common/LanguageToggle';
import { useLearningProgress } from '../../hooks/useLearningProgress';
import { ALL_LESSONS } from '../../data/learning/tracks';
import {
  PILLAR_NAV,
  PILLAR_GROUPS,
  GROUP_ORDER,
  DIET_SUB_NAV,
  EXERCISE_SUB_NAV,
  PillarNavItem,
} from '../../config/navigation';
import { DISCIPLINE_HASH } from '../../config/routes';
import {
  ChevronDown,
  ChevronRight,
  HeartPulse,
  AlertOctagon,
  PanelLeftClose,
  PanelLeft,
  Check,
  Utensils,
  Pill,
  Droplets,
  Flame,
  Wine,
  Activity,
  Footprints,
  Bike,
  Mountain,
  Dumbbell,
  Maximize2,
  Trophy,
  Sparkles,
  Calculator,
  Bookmark,
} from 'lucide-react';

const CHAPTER_IDS = [
  { id: 'W', label_zh: '水分與水合', label_en: 'Water & hydration', icon: Droplets, tone: 'text-sky-600 dark:text-sky-400' },
  { id: 'O', label_zh: '油脂與烹調', label_en: 'Fats & cooking', icon: Flame, tone: 'text-amber-600 dark:text-amber-400' },
  { id: 'A', label_zh: '酒精與代謝', label_en: 'Alcohol & metabolism', icon: Wine, tone: 'text-rose-600 dark:text-rose-400' },
];

const DIET_SUB_ICONS: Record<string, any> = {
  'diet/patterns': Utensils,
  supplements: Pill,
};

const EXERCISE_SUB_ICONS: Record<string, any> = {
  exercise: Activity,
  'exercise/running': Footprints,
  'exercise/cycling': Bike,
  'exercise/mountaineering': Mountain,
  'exercise/strength': Dumbbell,
  'exercise/mobility': Maximize2,
  'exercise/badminton': Trophy,
  'exercise/table-tennis': Activity,
  'exercise/pickleball': Sparkles,
};

/**
 * Sidebar — the full topic tree plus the reader-facing self-check tools.
 *
 * v4.0 groups the tree by the learner's journey (開始學習 → 認識身體 → 吃動睡心 →
 * 預防與目標), shows reading progress, and drops the monospace labels that rendered
 * Chinese in a fallback serif on Windows.
 */
export const Sidebar: React.FC<{ variant?: 'desktop' | 'drawer' }> = ({ variant = 'desktop' }) => {
  const { t, language } = useLanguage();
  const nav = useNavigation();
  const modal = useModal();
  const { progress } = useLearningProgress();
  const zh = language === 'zh-TW';
  const inDrawer = variant === 'drawer';

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState<HealthPillar | null>(null);
  const [completedPages, setCompletedPages] = useState<string[]>(() => {
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
        if (saved) setCompletedPages(JSON.parse(saved));
      } catch {
        /* storage unavailable */
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Auto-expand the pillar the reader is in, so its sub-pages are visible.
  useEffect(() => {
    if (nav.activePillar === 'diet' || nav.activePillar === 'exercise') setExpandedPillar(nav.activePillar);
  }, [nav.activePillar]);

  const collapsed = isCollapsed && !inDrawer;
  const activePillar = nav.highlightedPillar;
  const lessonsDone = progress.completed.filter((id) => ALL_LESSONS.some((l) => l.id === id)).length;

  const isPillarActive = (item: PillarNavItem) =>
    activePillar === item.id || (item.id === 'diet' && activePillar === 'supplements');

  const hasSubNav = (id: HealthPillar) => id === 'diet' || id === 'exercise';

  const subLink = (active: boolean) =>
    `w-full px-2 py-1.5 rounded-lg text-left text-[13px] flex items-center gap-2 transition-colors ${
      active
        ? 'text-emerald-800 dark:text-emerald-300 font-semibold bg-emerald-50/80 dark:bg-emerald-950/30'
        : 'text-slate-600 dark:text-slate-400 hover:text-emerald-800 dark:hover:text-emerald-300'
    }`;

  const renderPillar = (item: PillarNavItem) => {
    const Icon = item.icon;
    const isActive = isPillarActive(item);
    const isExpanded = expandedPillar === item.id;

    return (
      <li key={item.id}>
        <div
          className={`w-full rounded-xl flex items-center transition-colors ${
            isActive
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200'
              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <button
            onClick={() => nav.selectPillar(item.id)}
            className={`flex-1 min-w-0 px-2.5 py-2 text-left flex items-center gap-2.5 rounded-xl ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? (zh ? item.label_zh : item.label_en) : undefined}
            aria-current={isActive ? 'page' : undefined}
          >
            <Icon
              className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}
              aria-hidden="true"
            />
            {!collapsed && (
              <span className={`truncate text-sm ${isActive ? 'font-semibold' : ''}`}>{zh ? item.label_zh : item.label_en}</span>
            )}
            {!collapsed && !hasSubNav(item.id) && (
              <span className="ml-auto pl-1 text-[11px] text-slate-400 dark:text-slate-500 shrink-0">
                {item.id === 'learn' && lessonsDone > 0 ? `${lessonsDone}/${ALL_LESSONS.length}` : zh ? item.blurb_zh : item.blurb_en}
              </span>
            )}
          </button>

          {!collapsed && hasSubNav(item.id) && (
            <button
              onClick={() => setExpandedPillar(isExpanded ? null : item.id)}
              className="p-2 text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-lg shrink-0"
              aria-label={zh ? `${isExpanded ? '收合' : '展開'}${item.label_zh}子項目` : 'Toggle sub-topics'}
              aria-expanded={isExpanded}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          )}
        </div>

        {!collapsed && isExpanded && item.id === 'diet' && (
          <ul className="ml-5 pl-3 border-l border-slate-200 dark:border-slate-800 py-1 space-y-0.5">
            {DIET_SUB_NAV.map((sub) => {
              const SubIcon = DIET_SUB_ICONS[sub.hash] || Utensils;
              const isActive = sub.hash === 'supplements' ? nav.activePillar === 'supplements' : nav.activePillar === 'diet' && nav.dietView === 'patterns';
              return (
                <li key={sub.hash}>
                  <button
                    onClick={() => nav.go(sub.hash)}
                    className={subLink(isActive)}
                  >
                    <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`} aria-hidden="true" />
                    <span className="truncate">{zh ? sub.label_zh : sub.label_en}</span>
                  </button>
                </li>
              );
            })}
            {CHAPTER_IDS.map((ch) => {
              const ChIcon = ch.icon;
              const isActive = nav.activePillar === 'diet' && nav.dietView === 'chapter' && nav.currentChapterId === ch.id;
              return (
                <li key={ch.id}>
                  <button
                    onClick={() => nav.selectChapter(ch.id)}
                    className={subLink(isActive)}
                  >
                    <ChIcon className={`w-3.5 h-3.5 shrink-0 ${ch.tone}`} aria-hidden="true" />
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400 w-3">{ch.id}</span>
                    <span className="truncate">{zh ? ch.label_zh : ch.label_en}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {!collapsed && isExpanded && item.id === 'exercise' && (
          <ul className="ml-5 pl-3 border-l border-slate-200 dark:border-slate-800 py-1 space-y-0.5">
            {EXERCISE_SUB_NAV.map((sub) => {
              const SubIcon = EXERCISE_SUB_ICONS[sub.hash] || Activity;
              const isActive = nav.activePillar === 'exercise' && DISCIPLINE_HASH[nav.exerciseSubTab] === sub.hash;
              return (
                <li key={sub.hash}>
                  <button
                    onClick={() => nav.go(sub.hash)}
                    className={subLink(isActive)}
                  >
                    <SubIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-400'}`} aria-hidden="true" />
                    <span className="truncate">{zh ? sub.label_zh : sub.label_en}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside
      className={`shrink-0 ${
        inDrawer
          ? 'w-full'
          : `sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-salud-dark-surface/50 ${
              collapsed ? 'w-16 px-2' : 'w-64 px-3'
            }`
      } py-4 space-y-5 overflow-y-auto transition-all duration-300`}
      aria-label={zh ? '主題導覽' : 'Topic navigation'}
    >
      {!inDrawer && (
        <div className="flex items-center justify-end">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
              collapsed ? 'mx-auto' : ''
            }`}
            aria-label={collapsed ? (zh ? '展開側邊欄' : 'Expand sidebar') : zh ? '收合側邊欄' : 'Collapse sidebar'}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>
      )}

      {GROUP_ORDER.map((group) => {
        const items = PILLAR_NAV.filter((p) => p.group === group);
        if (!items.length) return null;
        return (
          <nav key={group} aria-label={zh ? PILLAR_GROUPS[group].title_zh : PILLAR_GROUPS[group].title_en}>
            {!collapsed && (
              <p className="px-2.5 mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                {zh ? PILLAR_GROUPS[group].title_zh : PILLAR_GROUPS[group].title_en}
              </p>
            )}
            <ul className="space-y-0.5">{items.map(renderPillar)}</ul>
          </nav>
        );
      })}

      {/* Page list for the chapter currently being read */}
      {!collapsed && nav.activePillar === 'diet' && nav.dietView === 'chapter' && nav.pagesForCurrent.length > 0 && (
        <nav className="pt-3 border-t border-slate-200 dark:border-slate-800" aria-label={zh ? '本章頁面' : 'Chapter pages'}>
          <p className="px-2.5 mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {zh ? `第 ${nav.currentChapterId} 章內容` : `Chapter ${nav.currentChapterId}`}
          </p>
          <ul className="space-y-0.5">
            {nav.pagesForCurrent.map((p) => {
              const isPageActive = nav.activePageId === p.id && nav.viewMode === 'page';
              return (
                <li key={p.id}>
                  <button
                    onClick={() => nav.selectPage(p.id)}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left flex items-center justify-between gap-1.5 ${
                      isPageActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span className="truncate text-[13px]">{zh ? p.title_zh : p.title_en}</span>
                    <span className="flex items-center gap-1 shrink-0">
                      {completedPages.includes(p.id) && <Check className="w-3 h-3 text-emerald-600" aria-label="已讀" />}
                      {p.safety_gated && <AlertOctagon className="w-3 h-3 text-red-500" aria-label="安全提醒" />}
                      <span className="text-[11px] text-slate-400">{p.estimated_minutes}′</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      )}

      {/* Reader-facing self-check tools */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-1.5">
        {!collapsed && <p className="px-2.5 mb-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{zh ? '自我檢測工具' : 'Self-check tools'}</p>}
        {[
          {
            key: 'simulators',
            onClick: () => {
              nav.setIsMobileSidebarOpen(false);
              modal.openModal('simulators');
            },
            icon: Calculator,
            label: zh ? '試算工具箱 (18+ 模擬器)' : 'Health Calculators',
            cls: 'text-emerald-800 dark:text-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/30',
          },
          {
            key: 'backpack',
            onClick: () => {
              nav.setIsMobileSidebarOpen(false);
              modal.openModal('backpack');
            },
            icon: Bookmark,
            label: zh ? '健康背包與收藏' : 'My Backpack & Saved',
            cls: 'text-amber-800 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 hover:bg-amber-100 dark:hover:bg-amber-900/30',
          },
          {
            key: 'emergency',
            onClick: () => {
              nav.setIsMobileSidebarOpen(false);
              modal.openModal('emergency');
            },
            icon: AlertOctagon,
            label: t('nav.red_flags'),
            cls: 'text-red-800 dark:text-red-300 bg-red-50/80 dark:bg-red-950/20 border-red-200 dark:border-red-900/60 hover:bg-red-100 dark:hover:bg-red-900/30',
          },
          {
            key: 'auditC',
            onClick: () => {
              nav.setIsMobileSidebarOpen(false);
              modal.openModal('auditC');
            },
            icon: Wine,
            label: t('nav.audit_c'),
            cls: 'text-violet-800 dark:text-violet-300 bg-violet-50/80 dark:bg-violet-950/20 border-violet-200 dark:border-violet-900/60 hover:bg-violet-100 dark:hover:bg-violet-900/30',
          },
          {
            key: 'cardio',
            onClick: () => {
              nav.setIsMobileSidebarOpen(false);
              modal.openModal('cardioHub');
            },
            icon: HeartPulse,
            label: t('nav.cardio_hub'),
            cls: 'text-sky-800 dark:text-sky-300 bg-sky-50/80 dark:bg-sky-950/20 border-sky-200 dark:border-sky-900/60 hover:bg-sky-100 dark:hover:bg-sky-900/30',
          },
        ].map((tool) => (
          <button
            key={tool.key}
            onClick={tool.onClick}
            className={`w-full px-2.5 py-2 rounded-xl border text-sm flex items-center gap-2 transition-colors ${tool.cls} ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? tool.label : undefined}
          >
            <tool.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
            {!collapsed && <span className="truncate">{tool.label}</span>}
          </button>
        ))}
      </div>

      {!collapsed && (
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <p className="px-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">{zh ? '閱讀設定' : 'Reading'}</p>
          <FontSizeToggle variant="full" />
          {inDrawer && (
            <div className="px-1">
              <LanguageToggle />
            </div>
          )}
        </div>
      )}
    </aside>
  );
};
