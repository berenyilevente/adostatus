import { Inter } from 'next/font/google';
import { getSEOTags } from '@/lib/seo/seo';
import { Analytics } from '@vercel/analytics/react';

import MainProvider from './MainProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainProvider>{children}</MainProvider>
        <Analytics />
      </body>
    </html>
  );
}
