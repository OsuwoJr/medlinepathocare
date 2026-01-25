'use client';

import { useTheme } from './ThemeProvider';
import { Moon, Sun, Contrast, Type } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AccessibilityControls() {
  const { theme, contrast, fontSize, toggleTheme, toggleContrast, setFontSize } = useTheme();
  const [isFontMenuOpen, setIsFontMenuOpen] = useState(false);
  const fontMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isFontMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!fontMenuRef.current?.contains(target)) {
        setIsFontMenuOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFontMenuOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isFontMenuOpen]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 flex flex-col gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 transition-colors"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        {/* Contrast Toggle */}
        <button
          onClick={toggleContrast}
          className={`p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 transition-colors ${
            contrast === 'high'
              ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
              : 'text-primary-600 dark:text-primary-400'
          }`}
          aria-label={`${contrast === 'normal' ? 'Enable' : 'Disable'} high contrast mode`}
          title={`${contrast === 'normal' ? 'Enable' : 'Disable'} high contrast`}
        >
          <Contrast size={20} />
        </button>

        {/* Font Size Controls */}
        <div className="relative" ref={fontMenuRef}>
          <button
            type="button"
            onClick={() => setIsFontMenuOpen((v) => !v)}
            className="p-2 rounded-md hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 transition-colors"
            aria-label="Font size options"
            title="Font size options"
            aria-expanded={isFontMenuOpen}
            aria-controls="font-size-menu"
          >
            <Type size={20} />
          </button>

          {isFontMenuOpen && (
            <div
              id="font-size-menu"
              role="menu"
              aria-label="Font size options"
              className="absolute bottom-full right-0 mb-2"
            >
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-2 flex flex-col gap-1 min-w-[120px]">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={fontSize === 'base'}
                  onClick={() => {
                    setFontSize('base');
                    setIsFontMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-left rounded text-sm transition-colors ${
                    fontSize === 'base'
                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={fontSize === 'large'}
                  onClick={() => {
                    setFontSize('large');
                    setIsFontMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-left rounded text-sm transition-colors ${
                    fontSize === 'large'
                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Large
                </button>
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={fontSize === 'xl'}
                  onClick={() => {
                    setFontSize('xl');
                    setIsFontMenuOpen(false);
                  }}
                  className={`px-3 py-1 text-left rounded text-sm transition-colors ${
                    fontSize === 'xl'
                      ? 'bg-primary-200 dark:bg-primary-800 text-primary-700 dark:text-primary-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  Extra Large
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
