import './globals.css';
import { Inter } from 'next/font/google';
import { NotificationProvider } from '@/context/NotificationContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import React, { createContext, useContext, useEffect, useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const DarkModeContext = createContext({
  dark: false,
  toggle: () => {},
});

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export const metadata = {
  title: 'HR Pulse - HR & Payroll Management',
  description: 'Modern HR and Payroll Management System with AI/ML Features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') setDark(true);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', dark ? 'true' : 'false');
  }, [dark]);

  return (
    <html lang="en">
      <body className={dark ? 'dark bg-gray-900 text-white' : inter.className}>
        <ErrorBoundary>
          <NotificationProvider>
            <DarkModeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
              {children}
            </DarkModeContext.Provider>
          </NotificationProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
