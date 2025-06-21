'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import GamePackageSection, { Package } from '@/components/gamesComponents/GamePackageSection';
import GameReviewSection from '@/components/gamesComponents/GameReviewSection';
import GameFAQSection from '@/components/gamesComponents/GameFAQSection';
import PelicanPanelSection from './_components/PelicanPanelSection';
import { FaCheck, FaServer, FaClock, FaShieldAlt } from 'react-icons/fa';
import GameHostingHero from '@/components/gamesComponents/GameHostingHero';
import { useTranslations } from 'next-intl';

const packagesDDR4: Package[] = [
  {
    name: "Wood",
    price: "€10.00",
    ddr3Price: "€7.50",
    description: { key: "packages.wood.description" },
    features: [
        { text: { key: "packages.wood.features.8gbddr4" }, included: true },
        { text: { key: "packages.wood.features.3cores" }, included: true },
        { text: { key: "packages.wood.features.fullssd" }, included: true },
        { text: { key: "packages.wood.features.pelican" }, included: true },
        { text: { key: "packages.wood.features.support" }, included: true },
        { text: { key: "packages.wood.features.2databases" }, included: true },
        { text: { key: "packages.wood.features.2backup" }, included: true },
    ],
    href: "#ddr4",
    ddr3Href: "#ddr3",
  },
  {
    name: "Stone",
    price: "€17.50",
    ddr3Price: "€13.50",
    description: { key: "packages.stone.description" },
    features: [
        { text: { key: "packages.stone.features.10gbddr4" }, included: true },
        { text: { key: "packages.stone.features.4cores" }, included: true },
        { text: { key: "packages.stone.features.fullssd" }, included: true },
        { text: { key: "packages.stone.features.pelican" }, included: true },
        { text: { key: "packages.stone.features.support" }, included: true },
        { text: { key: "packages.stone.features.2databases" }, included: true },
        { text: { key: "packages.stone.features.2backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "Recommended" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Metal",
    price: "€22.50",
    ddr3Price: "€17.50",
    description: { key: "packages.metal.description" },
    features: [
        { text: { key: "packages.metal.features.12gbddr4" }, included: true },
        { text: { key: "packages.metal.features.4cores" }, included: true },
        { text: { key: "packages.metal.features.fullssd" }, included: true },
        { text: { key: "packages.metal.features.pelican" }, included: true },
        { text: { key: "packages.metal.features.support" }, included: true },
        { text: { key: "packages.metal.features.2databases" }, included: true },
        { text: { key: "packages.metal.features.2backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Sulfer",
    price: "€30.00",
    ddr3Price: "€22.50",
    description: { key: "packages.sulfer.description" },
    features: [
        { text: { key: "packages.sulfer.features.16gbddr4" }, included: true },
        { text: { key: "packages.sulfer.features.6cores" }, included: true },
        { text: { key: "packages.sulfer.features.fullssd" }, included: true },
        { text: { key: "packages.sulfer.features.pelican" }, included: true },
        { text: { key: "packages.sulfer.features.support" }, included: true },
        { text: { key: "packages.sulfer.features.2databases" }, included: true },
        { text: { key: "packages.sulfer.features.2backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "Most Chosen" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "HQM",
    price: "€37.50",
    ddr3Price: "€27.50",
    description: { key: "packages.hqm.description" },
    features: [
        { text: { key: "packages.hqm.features.20gbddr4" }, included: true },
        { text: { key: "packages.hqm.features.6cores" }, included: true },
        { text: { key: "packages.hqm.features.fullssd" }, included: true },
        { text: { key: "packages.hqm.features.pelican" }, included: true },
        { text: { key: "packages.hqm.features.support" }, included: true },
        { text: { key: "packages.hqm.features.2databases" }, included: true },
        { text: { key: "packages.hqm.features.2backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Tech",
    price: "€45.00",
    ddr3Price: "€32.50",
    description: { key: "packages.tech.description" },
    features: [
        { text: { key: "packages.tech.features.24gbddr4" }, included: true },
        { text: { key: "packages.tech.features.8cores" }, included: true },
        { text: { key: "packages.tech.features.fullssd" }, included: true },
        { text: { key: "packages.tech.features.pelican" }, included: true },
        { text: { key: "packages.tech.features.support" }, included: true },
        { text: { key: "packages.tech.features.2databases" }, included: true },
        { text: { key: "packages.tech.features.2backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Enterprise",
    price: "???",
    ddr3Price: "???",
    description: { key: "packages.enterprise.description" },
    features: [
        { text: { key: "packages.enterprise.features.ram" }, included: true },
        { text: { key: "packages.enterprise.features.cores" }, included: true },
        { text: { key: "packages.enterprise.features.ssd" }, included: true },
        { text: { key: "packages.enterprise.features.pelican" }, included: true },
        { text: { key: "packages.enterprise.features.support" }, included: true },
        { text: { key: "packages.enterprise.features.databases" }, included: true },
        { text: { key: "packages.enterprise.features.backups" }, included: true },
    ],
    href: "#contact",
    ddr3Href: "#contact",
  },
];

export default function RustPage() {
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('rust.hero');

  useEffect(() => {
    // Wait until the page is fully loaded
    const handleLoad = () => {
      // Extra timeout for a smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // If the page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const faqs = [
    {
      question: { key: 'faq.ddr3.question' },
      answer: { key: 'faq.ddr3.answer' }
    }
  ];

  return (
    <main className="min-h-screen">
      {isLoading && <Preloader />}
      <div className={`w-full transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <GameHostingHero
          badge={{ key: 'badge' }}
          title={{ key: 'title' }}
          subtitle={{ key: 'subtitle' }}
          description={{ key: 'description' }}
          features={[
            { key: 'features.dedicatedServers' },
            { key: 'features.modInstallation' },
            { key: 'features.uptime' },
            { key: 'features.ddosProtection' }
          ]}
          buttons={[
            { label: { key: 'buttons.getStarted' }, href: '#get-started', variant: 'white' },
            { label: { key: 'buttons.viewPlans' }, href: '#view-plans', variant: 'outline' }
          ]}
          bottomFeatures={[
            { icon: <FaShieldAlt className="text-blue-400 text-xl" />, label: { key: 'bottomFeatures.ddosProtection' } },
            { icon: <FaServer className="text-blue-400 text-xl" />, label: { key: 'bottomFeatures.premiumHardware' } },
            { icon: <FaClock className="text-blue-400 text-xl" />, label: { key: 'bottomFeatures.online' } },
            { icon: <FaCheck className="text-blue-400 text-xl" />, label: { key: 'bottomFeatures.instantDelivery' } }
          ]}
          backgroundImage="/images/webp/games/wallpapers/rust-background.webp"
          translationNamespace="rust.hero"
        />
        <GamePackageSection
          title={{ key: 'packages.title' }}
          subtitle={{ key: 'packages.subtitle' }}
          packages={packagesDDR4}
          gameLogo="/images/webp/games/logos/rust.webp"
          gameLogoAlt="Official Rust Logo from the game"
          enableBTWToggle={true}
          enableDDRToggle={true}
          translationNamespace="rust"
        />
        <GameReviewSection
          title={{ key: 'title' }}
          subtitle={{ key: 'poweredBy' }}
          translationNamespace="Reviews"
        />
        <PelicanPanelSection />
        <GameFAQSection
          title={{ key: 'faq.title' }}
          subtitle={{
            text: { key: 'faq.subtitle.text' },
            link: { key: 'faq.subtitle.link' },
            linkHref: '/contact'
          }}
          faqs={faqs}
          translationNamespace="rust"
        />
      </div>
    </main>
  );
} 