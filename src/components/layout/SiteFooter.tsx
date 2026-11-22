import { AlertTriangle, ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n';
import { useModal } from '../../context/ModalContext';
import { APP_VERSION } from '../../config/version';

const groups = [
  {
    title: ['學習與練習', 'Learn and practice'],
    links: [
      ['#learn', '學習路徑', 'Learning tracks'],
      ['#learn/practice', '情境練習與閃卡', 'Scenarios and flashcards'],
      ['#learn/academy', '醫學學科導覽', 'Medical disciplines'],
      ['#glossary', '健康小辭典', 'Health glossary'],
    ],
  },
  {
    title: ['健康主題', 'Health topics'],
    links: [
      ['#home/topics', '全部健康主題', 'All health topics'],
      ['#exercise', '運動與體能', 'Exercise and fitness'],
      ['#checkup', '健檢與公費篩檢', 'Check-ups and screening'],
      ['#clinic/by/symptom', '症狀與就醫導引', 'Symptoms and care'],
    ],
  },
  {
    title: ['來源與網站資訊', 'Sources and site information'],
    links: [
      ['#about', '內容與實證原則', 'Editorial principles'],
      ['#evidence', '實證來源庫', 'Evidence library'],
      ['#updates', '實證摘要', 'Evidence updates'],
      ['#synergy', '跨主題健康知識', 'Connections across topics'],
    ],
  },
] as const;

const footerLink = 'inline-flex min-h-10 items-center gap-1.5 text-sm text-slate-600 hover:text-emerald-800 hover:underline dark:text-slate-300 dark:hover:text-emerald-300';

export function SiteFooter() {
  const { language } = useLanguage();
  const { openModal } = useModal();
  const zh = language === 'zh-TW';

  return (
    <footer className="mx-auto mt-12 max-w-[72rem] border-t border-slate-200 pt-7 dark:border-slate-800 sm:mt-16">
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div className="space-y-2">
          <p className="font-serif text-2xl font-bold text-emerald-900 dark:text-emerald-200">Salud</p>
          <p className="max-w-xs text-sm leading-7 text-slate-600 dark:text-slate-300">
            {zh ? '健康、醫學與運動的公開學習資源。個人診斷、用藥與治療請與醫療人員討論。' : 'Open learning for health, medicine and exercise. Discuss individual diagnosis, medication and treatment with a health professional.'}
          </p>
          <button type="button" onClick={() => openModal('emergency')} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rose-800 hover:underline dark:text-rose-300">
            <AlertTriangle size={18} aria-hidden="true" />{zh ? '需要立即就醫的警訊' : 'Emergency warning signs'}
          </button>
        </div>
        {groups.map(group => (
          <nav key={group.title[1]} aria-label={group.title[zh ? 0 : 1]}>
            <p className="mb-1 font-semibold text-slate-900 dark:text-white">{group.title[zh ? 0 : 1]}</p>
            <ul>
              {group.links.map(([href, labelZh, labelEn]) => (
                <li key={href}><a href={href} className={footerLink}>{zh ? labelZh : labelEn}</a></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-x-5 border-t border-slate-200 pt-2 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300">
        <span>Salud · v{APP_VERSION}</span>
        <a href="https://github.com/waatax/Salud" target="_blank" rel="noopener noreferrer" className={footerLink}>
          {zh ? 'GitHub 原始碼' : 'GitHub source code'}
          <ExternalLink size={14} aria-hidden="true" />
          <span className="sr-only">{zh ? '（另開視窗）' : ' (new window)'}</span>
        </a>
      </div>
    </footer>
  );
}
