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

  // Validation functions for localStorage values
  const validateTheme = (value: string | null): Theme | null => {
    if (value === 'light' || value === 'dark') return value as Theme;
    return null;
  };

  const validateContrast = (value: string | null): Contrast | null => {
    if (value === 'normal' || value === 'high') return value as Contrast;
    return null;
  };

  const validateFontSize = (value: string | null): FontSize | null => {
    if (value === 'base' || value === 'large' || value === 'xl') return value as FontSize;
    return null;
  };

  useEffect(() => {
    setMounted(true);
    // Load preferences from localStorage with validation
    const savedTheme = validateTheme(localStorage.getItem('theme'));
    const savedContrast = validateContrast(localStorage.getItem('contrast'));
    const savedFontSize = validateFontSize(localStorage.getItem('fontSize'));

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
