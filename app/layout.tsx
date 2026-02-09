import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ChallengeProvider } from '@/context/ChallengeContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Forge - Learn to Code by Thinking',
  description: 'AI coding mentor that helps you learn through collaborative problem-solving',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChallengeProvider>
          {children}
        </ChallengeProvider>
      </body>
    </html>
  );
}
