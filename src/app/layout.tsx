import "./globals.scss";
import { Metadata } from 'next';
import RootPreloader from '@/components/Preloader/RootPreloader';
import Providers from '@/components/Providers/Providers';

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
        <Providers>
          <RootPreloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
