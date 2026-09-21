import React from 'react';
import { useLanguage } from '../../i18n';
import { useNavigation } from '../../context/NavigationContext';
import { APP_VERSION } from '../../config/version';
import { AlertTriangle } from 'lucide-react';

/**
 * SiteFooter — the one place project metadata is reachable.
 *
 * Everything here (evidence method, expert review panel, revision history, version) tells
 * the reader how the content was made. That belongs at the end of a page, after the health
 * information, not in the navigation chrome that competes with it.
 */
export const SiteFooter: React.FC = () => {
  const { language } = useLanguage();
  const { openMeta, openSynergy } = useNavigation();
  const zh = language === 'zh-TW';

  const linkClass =
    'text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors';

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 pb-24 lg:pb-8 pt-8">
      <div className="space-y-6">
        <div className="flex items-start gap-2.5 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 max-w-3xl">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
          <p>
            {zh
              ? 'Salud 提供健康衛教資訊，不構成醫療診斷或個人化處方。用藥、檢驗與治療決定請與你的主治醫師討論；出現紅旗警訊請立即就醫。'
              : 'Salud provides health education, not diagnosis or personalised prescription. Discuss medication, testing and treatment with your own clinician, and seek care immediately for any red-flag symptom.'}
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <button onClick={() => openMeta('evidence')} className={linkClass}>
            {zh ? '實證來源與分級' : 'Evidence & grading'}
          </button>
          <button onClick={() => openMeta('about')} className={linkClass}>
            {zh ? '關於 Salud 與專家審核' : 'About & expert review'}
          </button>
          <button onClick={openSynergy} className={linkClass}>
            {zh ? '跨主題交互作用' : 'Cross-topic interactions'}
          </button>
          <a
            href="https://github.com/waatax/Salud"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {zh ? '原始碼' : 'Source code'}
          </a>
          <span className="text-xs font-mono text-slate-400 dark:text-slate-600 ml-auto">
            Salud v{APP_VERSION}
          </span>
        </nav>
      </div>
    </footer>
  );
};
