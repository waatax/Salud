import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SupportedLanguage } from '../types';
import { zhTW } from './locales/zh-TW';
import { enUS } from './locales/en-US';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  toggleLanguage: () => void;
  t: (key: string, ...args: (string | number)[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALES: Record<SupportedLanguage, Record<string, string>> = {
  'zh-TW': zhTW,
  'en-US': enUS,
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('salud-lang') as SupportedLanguage;
      if (saved && (saved === 'zh-TW' || saved === 'en-US')) {
        return saved;
      }
    }
    return 'zh-TW';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('salud-lang', lang);
      document.documentElement.lang = lang === 'zh-TW' ? 'zh-Hant-TW' : 'en';
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'zh-TW' ? 'en-US' : 'zh-TW');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = language === 'zh-TW' ? 'zh-Hant-TW' : 'en';
    }
  }, [language]);

  const t = (key: string, ...args: (string | number)[]): string => {
    const localeTable = LOCALES[language] || zhTW;
    let template = localeTable[key] || zhTW[key as keyof typeof zhTW] || key;
    if (args.length > 0) {
      args.forEach((arg, index) => {
        template = template.replace(new RegExp(`\\{${index}\\}`, 'g'), String(arg));
      });
    }
    return template;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
