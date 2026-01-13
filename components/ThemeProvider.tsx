'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Contrast = 'normal' | 'high';
type FontSize = 'base' | 'large' | 'xl';

interface ThemeContextType {
  theme: Theme;
  contrast: Contrast;
  fontSize: FontSize;
  toggleTheme: () => void;
  toggleContrast: () => void;
  setFontSize: (size: FontSize) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [fontSize, setFontSizeState] = useState<FontSize>('base');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load preferences from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedContrast = localStorage.getItem('contrast') as Contrast | null;
    const savedFontSize = localStorage.getItem('fontSize') as FontSize | null;

    if (savedTheme) setTheme(savedTheme);
    if (savedContrast) setContrast(savedContrast);
    if (savedFontSize) setFontSizeState(savedFontSize);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    
    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply contrast
    if (contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply font size
    root.classList.remove('text-base-size', 'text-large-size', 'text-xl-size');
    root.classList.add(`text-${fontSize}-size`);
  }, [theme, contrast, fontSize, mounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleContrast = () => {
    const newContrast = contrast === 'normal' ? 'high' : 'normal';
    setContrast(newContrast);
    localStorage.setItem('contrast', newContrast);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size);
  };

  // Always provide the context, even before mounting
  return (
    <ThemeContext.Provider
      value={{
        theme,
        contrast,
        fontSize,
        toggleTheme,
        toggleContrast,
        setFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
