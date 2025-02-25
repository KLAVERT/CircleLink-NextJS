import "./globals.scss";
import { ThemeProvider } from 'next-themes';
import { Metadata } from 'next';
import RootPreloader from '@/components/Preloader/RootPreloader';
import '@/lib/fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

// Tell Font Awesome to skip adding CSS automatically since we imported it above
config.autoAddCss = false;

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RootPreloader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
