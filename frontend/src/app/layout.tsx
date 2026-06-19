import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ULTRON',
  description: 'AI-Driven Crime Analytics Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-[#0a0e1a]">
      <body className={`${inter.className} bg-[#0a0e1a] text-[#f1f5f9]`}>
        {children}
      </body>
    </html>
  );
}
