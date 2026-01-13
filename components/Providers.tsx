'use client';

import { ThemeProvider } from './ThemeProvider';
import Navigation from './Navigation';
import AccessibilityControls from './AccessibilityControls';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Navigation />
      {children}
      <AccessibilityControls />
    </ThemeProvider>
  );
}
