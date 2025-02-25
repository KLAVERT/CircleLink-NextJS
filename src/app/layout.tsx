import "./globals.scss";
import { ThemeProvider } from '@/components/ThemeProvider/ThemeProvider';
import { Metadata } from 'next';
import RootPreloader from '@/components/Preloader/RootPreloader';

export const metadata: Metadata = {
  title: 'Portfolio - Klavertjuh',
  description: 'Personal portfolio of Klavertjuh',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="nl" className="dark">
      <body>
        <ThemeProvider>
          <RootPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
