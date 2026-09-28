import React from 'react';
import { ChevronRight, House } from 'lucide-react';
import { useNavigation } from '../../context/NavigationContext';
import { useLanguage } from '../../i18n';
import { getPillarNav } from '../../config/navigation';

/**
 * Breadcrumb — v4.0. "Home" is the learning home, not the body-systems hub, and each
 * crumb is a real link. Learner pages render their own headings and skip this bar.
 */
export function Breadcrumb() {
  const { language } = useLanguage();
  const zh = language === 'zh-TW';
  const { activePillar, dietView, viewMode, currentChapter, currentPage, isCouncilEvidenceView, isSynergyView, metaView, go, selectPillar } =
    useNavigation();

  if (metaView) return null;

  const crumbs: { label: string; onClick?: () => void }[] = [];

  if (isSynergyView) {
    crumbs.push({ label: zh ? '跨主題交互作用' : 'Cross-topic interactions' });
  } else if (isCouncilEvidenceView) {
    crumbs.push({ label: zh ? '分科實證庫' : 'Specialty evidence library' });
  } else {
    const pillarKey = activePillar === 'supplements' ? 'diet' : activePillar;
    const item = getPillarNav(pillarKey);
    if (item) {
      crumbs.push({ label: zh ? item.label_zh : item.label_en, onClick: () => selectPillar(pillarKey) });
    }
    if (activePillar === 'supplements') {
      crumbs.push({ label: zh ? '營養補充品' : 'Supplements' });
    }
    if (activePillar === 'diet' && dietView === 'chapter' && currentChapter) {
      crumbs.push({ label: `${zh ? '第' : 'Chapter'} ${currentChapter.id} ${zh ? '章' : ''} ${zh ? currentChapter.title_zh : currentChapter.title_en}`, onClick: () => go(currentChapter.id) });
      if (viewMode === 'page' && currentPage) {
        crumbs.push({ label: zh ? currentPage.title_zh : currentPage.title_en });
      }
    }
  }

  return (
    <nav aria-label={zh ? '目前位置' : 'Breadcrumb'} className="mb-5 text-sm text-slate-500 dark:text-slate-400">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <button onClick={() => selectPillar('home')} className="inline-flex items-center gap-1 hover:text-emerald-700 dark:hover:text-emerald-400">
            <House className="w-3.5 h-3.5" aria-hidden="true" />
            {zh ? '首頁' : 'Home'}
          </button>
        </li>
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={i} className="inline-flex items-center gap-1 min-w-0">
              <ChevronRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {c.onClick && !last ? (
                <button onClick={c.onClick} className="hover:text-emerald-700 dark:hover:text-emerald-400 truncate max-w-[16rem]">
                  {c.label}
                </button>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={`truncate max-w-[20rem] ${last ? 'text-slate-800 dark:text-slate-200 font-semibold' : ''}`}>
                  {c.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
