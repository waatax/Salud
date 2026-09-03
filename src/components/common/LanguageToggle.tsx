import React from 'react';
import { useLanguage } from '../../i18n';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-salud-light-border dark:border-salud-dark-border bg-salud-light-card/80 dark:bg-salud-dark-card/60 hover:border-salud-amber/60 hover:text-salud-amber-600 dark:hover:text-salud-amber-300 transition-all font-mono text-xs shadow-sm"
      title={language === 'zh-TW' ? 'Switch to English' : '切換為繁體中文'}
      aria-label="Toggle language"
    >
      <Languages className="w-3.5 h-3.5 text-salud-amber-500" />
      <span className="font-bold">
        {language === 'zh-TW' ? 'EN' : '繁中'}
      </span>
    </button>
  );
};
