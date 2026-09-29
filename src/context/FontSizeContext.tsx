import React, { createContext, useContext, useState, useEffect } from 'react';

export type FontSize = 'compact' | 'standard' | 'comfort' | 'large' | 'xlarge';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  cycleFontSize: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  fontSizeLabel: string;
  scalePercent: number;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

const STORAGE_KEY = 'salud-font-size';

const FONT_SIZES: FontSize[] = ['compact', 'standard', 'comfort', 'large', 'xlarge'];

const FONT_METRICS: Record<FontSize, { label: string; percent: number }> = {
  compact: { label: '精簡 90%', percent: 90 },
  standard: { label: '標準 100%', percent: 100 },
  comfort: { label: '舒適 112%', percent: 112 },
  large: { label: '放大 125%', percent: 125 },
  xlarge: { label: '特大 138%', percent: 138 },
};

export const FontSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as FontSize;
      if (FONT_SIZES.includes(saved)) {
        return saved;
      }
    }
    return 'standard';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-font-size', fontSize);
      document.documentElement.classList.remove(
        'font-scale-compact',
        'font-scale-standard',
        'font-scale-comfort',
        'font-scale-large',
        'font-scale-xlarge'
      );
      document.documentElement.classList.add(`font-scale-${fontSize}`);
      try {
        localStorage.setItem(STORAGE_KEY, fontSize);
      } catch {
        /* storage unavailable */
      }
    }
  }, [fontSize]);

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
  };

  const cycleFontSize = () => {
    setFontSizeState((prev) => {
      const idx = FONT_SIZES.indexOf(prev);
      const nextIdx = (idx + 1) % FONT_SIZES.length;
      return FONT_SIZES[nextIdx];
    });
  };

  const increaseFontSize = () => {
    setFontSizeState((prev) => {
      const idx = FONT_SIZES.indexOf(prev);
      return idx < FONT_SIZES.length - 1 ? FONT_SIZES[idx + 1] : prev;
    });
  };

  const decreaseFontSize = () => {
    setFontSizeState((prev) => {
      const idx = FONT_SIZES.indexOf(prev);
      return idx > 0 ? FONT_SIZES[idx - 1] : prev;
    });
  };

  const currentMetric = FONT_METRICS[fontSize] || FONT_METRICS.standard;
  const fontSizeLabel = currentMetric.label;
  const scalePercent = currentMetric.percent;

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
        cycleFontSize,
        increaseFontSize,
        decreaseFontSize,
        fontSizeLabel,
        scalePercent,
      }}
    >
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
