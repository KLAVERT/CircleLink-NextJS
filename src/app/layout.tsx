import "./globals.scss";
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import RootPreloader from '@/components/Preloader/RootPreloader';

export const metadata: Metadata = {
  title: 'Circlelink - VOF',
  description: 'Official website of Circlelink - VOF',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <RootPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
