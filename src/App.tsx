import React from 'react';
import { LanguageProvider } from './i18n';
import { FontSizeProvider } from './context/FontSizeContext';
import { ThemeProvider } from './context/ThemeContext';
import { ModalProvider } from './context/ModalContext';
import { NavigationProvider } from './context/NavigationContext';
import { AppShell } from './components/layout/AppShell';

/**
 * App — Root component (v0.5 refactored)
 *
 * Slimmed from 520 lines / 14 useState to a clean Provider hierarchy.
 * All navigation, theme, and modal state is now managed by dedicated Contexts.
 * Layout is handled by AppShell. Content routing is inside AppShell.
 */
export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <FontSizeProvider>
        <ThemeProvider>
          <NavigationProvider>
            <ModalProvider>
              <AppShell />
            </ModalProvider>
          </NavigationProvider>
        </ThemeProvider>
      </FontSizeProvider>
    </LanguageProvider>
  );
};
