'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './ThemeProvider';
import Navigation from './Navigation';
import AccessibilityControls from './AccessibilityControls';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <Navigation />
        {children}
        <AccessibilityControls />
      </ThemeProvider>
    </SessionProvider>
  );
}
