import './globals.css';
import { Inter } from 'next/font/google';
import { NotificationProvider } from '@/context/NotificationContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import DarkModeProvider from '@/components/DarkModeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HR Pulse – HR & Payroll Management',
  description: 'Modern HR and Payroll Management System with AI/ML Features',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <NotificationProvider>
            <DarkModeProvider>
              {children}
            </DarkModeProvider>
          </NotificationProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
