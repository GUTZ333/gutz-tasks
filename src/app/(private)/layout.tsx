import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import "@/app/globals.css";
import clsx from 'clsx';
import { ThemeProvider } from 'next-themes';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSideBar from '@/components/app-sidebar';
import NextAuthSessionProvider from '@/providers/next-session.provider';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import SelectTheme from '@/components/button-theme';
import ReactQueryProvider from '@/providers/react-query.provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Track Tasks'
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(geistSans.variable, geistMono.variable, "antialiased")} suppressHydrationWarning
      >
        <NextAuthSessionProvider>
          <ReactQueryProvider>
            <SidebarProvider>
              <ThemeProvider attribute="class" enableSystem defaultTheme='system'>
                <AppSideBar />
                <main className="min-h-screen p-3 w-full">
                  <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                      <SidebarTrigger />
                      <Separator orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4" />
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                              Building Your Application
                            </BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator className="hidden md:block" />
                          <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                      <SelectTheme className="ml-auto" />
                    </header>
                    {children}
                  </SidebarInset>
                </main>
              </ThemeProvider>
            </SidebarProvider>
          </ReactQueryProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
