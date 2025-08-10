import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import "@/app/globals.css";
import clsx from 'clsx';
import { ThemeProvider } from "next-themes";
import NextAuthSessionProvider from '@/providers/next-session.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Track Tasks - Home',
};

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx("antialiased", geistMono.variable, geistSans.variable)} suppressHydrationWarning
      >
        <NextAuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
