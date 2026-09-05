import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSize = 'standard' | 'comfort' | 'large';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
  fontSizeLabel: string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const STORAGE_KEY = 'salud-font-size';

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as FontSize;
      if (saved === 'standard' || saved === 'comfort' || saved === 'large') {
        return saved;
      }
    }
    return 'standard';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font-size', fontSize);
      document.documentElement.classList.remove('font-scale-standard', 'font-scale-comfort', 'font-scale-large');
      document.documentElement.classList.add(`font-scale-${fontSize}`);
      localStorage.setItem(STORAGE_KEY, fontSize);
    }
  }, [fontSize]);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
  };

  const cycleFontSize = () => {
    setFontSizeState((prev) => {
      if (prev === 'standard') return 'comfort';
      if (prev === 'comfort') return 'large';
      return 'standard';
    });
  };

  const fontSizeLabel =
    fontSize === 'standard' ? '標準 100%' : fontSize === 'comfort' ? '舒適 115%' : '大字 130%';

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize, cycleFontSize, fontSizeLabel }}>
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (!context) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
