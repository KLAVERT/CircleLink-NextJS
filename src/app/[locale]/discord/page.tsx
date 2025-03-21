'use client';

import InfoSection from './_components/InfoSection';
import PackagesSection from './_components/PackagesSection';
import FAQSection from './_components/FAQSection';

export default function DiscordPage() {
  return (
    <main className="min-h-screen">
      <InfoSection />
      <PackagesSection />
      <FAQSection />
    </main>
  );
} 