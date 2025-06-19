import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/utils/cn';
import { Provider as TooltipProvider } from '@/components/ui/tooltip';
import { NotificationProvider } from '@/components/ui/notification-provider';
import Header from '@/components/header';
import { Toaster } from 'sonner';

const inter = Inter({
  display: 'swap',
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = localFont({
  src: './fonts/GeistMono[wght].woff2',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Fullstack Go + Next.js',
  description: 'Aplicação fullstack com Go API e Next.js frontend',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='pt-BR'
      suppressHydrationWarning
      className={cn(inter.variable, geistMono.variable, 'antialiased')}
    >
      <body className='bg-bg-weak-50 font-sans text-text-primary'>
        <ThemeProvider attribute='class' defaultTheme='light'>
          <TooltipProvider>
            <div className='flex min-h-screen flex-col'>
              <Header />
              <main className='flex-1'>{children}</main>
            </div>
          </TooltipProvider>
          <Toaster position='top-right' />
        </ThemeProvider>
        <NotificationProvider />
      </body>
    </html>
  );
}
