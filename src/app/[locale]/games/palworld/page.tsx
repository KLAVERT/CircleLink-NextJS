'use client';

import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader/Preloader';
import GamePackageSection, { Package } from '@/components/gamesComponents/GamePackageSection';
import GameReviewSection from '@/components/gamesComponents/GameReviewSection';
import GameFAQSection from '@/components/gamesComponents/GameFAQSection';
import GamePelicanPanelSection from '@/components/gamesComponents/GamePelicanPanelSection';
import { FaCheck, FaServer, FaClock, FaShieldAlt } from 'react-icons/fa';
import GameHostingHero from '@/components/gamesComponents/GameHostingHero';

const packagesDDR4: Package[] = [
  {
    name: "Tatch",
    price: "€10.00",
    description: { key: "packages.tatch.description" },
    features: [
        { text: { key: "packages.tatch.features.ram" }, included: true },
        { text: { key: "packages.tatch.features.cores" }, included: true },
        { text: { key: "packages.tatch.features.storage" }, included: true },
        { text: { key: "packages.tatch.features.pelican" }, included: true },
        { text: { key: "packages.tatch.features.support" }, included: true },
        { text: { key: "packages.tatch.features.databases" }, included: true },
        { text: { key: "packages.tatch.features.backup" }, included: true },
    ],
    href: "#ddr4",
    ddr3Href: "#ddr3",
  },
  {
    name: "Wood",
    price: "€17.50",
    description: { key: "packages.wood.description" },
    features: [
        { text: { key: "packages.wood.features.ram" }, included: true },
        { text: { key: "packages.wood.features.cores" }, included: true },
        { text: { key: "packages.wood.features.storage" }, included: true },
        { text: { key: "packages.wood.features.pelican" }, included: true },
        { text: { key: "packages.wood.features.support" }, included: true },
        { text: { key: "packages.wood.features.databases" }, included: true },
        { text: { key: "packages.wood.features.backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "recommended" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Stone",
    price: "€22.50",
    description: { key: "packages.stone.description" },
    features: [
        { text: { key: "packages.stone.features.ram" }, included: true },
        { text: { key: "packages.stone.features.cores" }, included: true },
        { text: { key: "packages.stone.features.storage" }, included: true },
        { text: { key: "packages.stone.features.pelican" }, included: true },
        { text: { key: "packages.stone.features.support" }, included: true },
        { text: { key: "packages.stone.features.databases" }, included: true },
        { text: { key: "packages.stone.features.backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Sulfer",
    price: "€30.00",
    description: { key: "packages.sulfer.description" },
    features: [
        { text: { key: "packages.sulfer.features.ram" }, included: true },
        { text: { key: "packages.sulfer.features.cores" }, included: true },
        { text: { key: "packages.sulfer.features.storage" }, included: true },
        { text: { key: "packages.sulfer.features.pelican" }, included: true },
        { text: { key: "packages.sulfer.features.support" }, included: true },
        { text: { key: "packages.sulfer.features.databases" }, included: true },
        { text: { key: "packages.sulfer.features.backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "mostChosen" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Metal",
    price: "€37.50",
    description: { key: "packages.metal.description" },
    features: [
        { text: { key: "packages.metal.features.ram" }, included: true },
        { text: { key: "packages.metal.features.cores" }, included: true },
        { text: { key: "packages.metal.features.storage" }, included: true },
        { text: { key: "packages.metal.features.pelican" }, included: true },
        { text: { key: "packages.metal.features.support" }, included: true },
        { text: { key: "packages.metal.features.databases" }, included: true },
        { text: { key: "packages.metal.features.backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "Tek",
    price: "€45.00",
    description: { key: "packages.tek.description" },
    features: [
        { text: { key: "packages.tek.features.ram" }, included: true },
        { text: { key: "packages.tek.features.cores" }, included: true },
        { text: { key: "packages.tek.features.storage" }, included: true },
        { text: { key: "packages.tek.features.pelican" }, included: true },
        { text: { key: "packages.tek.features.support" }, included: true },
        { text: { key: "packages.tek.features.databases" }, included: true },
        { text: { key: "packages.tek.features.backup" }, included: true },
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
        { text: { key: "packages.enterprise.features.storage" }, included: true },
        { text: { key: "packages.enterprise.features.pelican" }, included: true },
        { text: { key: "packages.enterprise.features.support" }, included: true },
        { text: { key: "packages.enterprise.features.databases" }, included: true },
        { text: { key: "packages.enterprise.features.backups" }, included: true },
    ],
    href: "#contact",
    ddr3Href: "#contact",
  },
];

export default function PalworldPage() {
  const [isLoading, setIsLoading] = useState(true);

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
      question: { key: 'ddr3.question' },
      answer: { key: 'ddr3.answer' }
    },
    {
      question: { key: 'webhosting.question' },
      answer: { key: 'webhosting.answer' }
    },
    {
      question: { key: 'palican.question' },
      answer: { key: 'palican.answer' }
    },
    {
      question: { key: 'locations.question' },
      answer: { key: 'locations.answer' }
    },
    {
      question: { key: 'payment.question' },
      answer: { key: 'payment.answer' }
    }
  ];

  const pelicanFeatures = [
    { key: 'features.ftpLogin' },
    { key: 'features.browserFileManagement' },
    { key: 'features.subuserLogin' },
    { key: 'features.createDatabases' },
    { key: 'features.serverBackups' },
    { key: 'features.consoleInput' },
    { key: 'features.restartServer' },
    { key: 'features.scheduledCommand' },
    { key: 'features.scheduledPowerAction' },
    { key: 'features.databaseManagement' }
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
          backgroundImage="/images/webp/games/wallpapers/palworld-background.webp"
          translationNamespace="palworld.hero"
        />
        <GamePackageSection
          title={{ key: 'packages.title' }}
          subtitle={{ key: 'packages.subtitle' }}
          packages={packagesDDR4}
          gameLogo="/images/webp/games/logos/palworld.webp"
          gameLogoAlt="Official Palworld Logo from the game"
          enableBTWToggle={true}
          enableDDRToggle={false}
          translationNamespace="palworld"
        />
        <GameReviewSection
          title={{ key: 'title' }}
          subtitle={{ key: 'poweredBy' }}
          translationNamespace="reviews"
        />
        <GamePelicanPanelSection
          title={{ key: 'title' }}
          subtitle={{ key: 'subtitle' }}
          featuresTitle={{ key: 'featuresTitle' }}
          features={pelicanFeatures}
          buttonText={{ key: 'buttonText' }}
          buttonHref="/#panel"
          imageSrc="/images/jpg/mainpage/dashboard.jpg"
          imageAlt="Control Panel"
          translationNamespace="pelicanPanelGameHosting"
        />
        <GameFAQSection
          title={{ key: 'title' }}
          subtitle={{
            text: { key: 'subtitle.text' },
            link: { key: 'subtitle.link' },
            linkHref: '/contact'
          }}
          faqs={faqs}
          translationNamespace="faq"
        />
      </div>
    </main>
  );
} 