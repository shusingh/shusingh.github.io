import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const storageKey = 'theme';
const fallbackTheme: Theme = 'dark';

function isTheme(value: string | null): value is Theme {
  return value === 'dark' || value === 'light';
}

function readDocumentTheme(): Theme {
  if (typeof document === 'undefined') {
    return fallbackTheme;
  }

  const current = document.documentElement.getAttribute('data-theme');
  return isTheme(current) ? current : fallbackTheme;
}

function writeDocumentTheme(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(readDocumentTheme);

  useEffect(() => {
    writeDocumentTheme(theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // Storage can be unavailable in private browsing or locked-down contexts.
    }
  }, [theme]);

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
  };

  const toggleTheme = () => {
    setThemeState((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return { theme, setTheme, toggleTheme };
}
