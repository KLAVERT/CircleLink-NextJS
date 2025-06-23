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
    name: "satisfactory1",
    price: "€10.00",
    ddr3Price: "€7.50",
    description: { key: "packages.satisfactory1.description" },
    features: [
        { text: { key: "packages.satisfactory1.features.ram" }, included: true },
        { text: { key: "packages.satisfactory1.features.cores" }, included: true },
        { text: { key: "packages.satisfactory1.features.storage" }, included: true },
        { text: { key: "packages.satisfactory1.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory1.features.support" }, included: true },
        { text: { key: "packages.satisfactory1.features.databases" }, included: true },
        { text: { key: "packages.satisfactory1.features.backup" }, included: true },
    ],
    href: "#ddr4",
    ddr3Href: "#ddr3",
  },
  {
    name: "satisfactory2",
    price: "€17.50",
    ddr3Price: "€13.50",
    description: { key: "packages.satisfactory2.description" },
    features: [
        { text: { key: "packages.satisfactory2.features.ram" }, included: true },
        { text: { key: "packages.satisfactory2.features.storage" }, included: true },
        { text: { key: "packages.satisfactory2.features.storage" }, included: true },
        { text: { key: "packages.satisfactory2.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory2.features.support" }, included: true },
        { text: { key: "packages.satisfactory2.features.databases" }, included: true },
        { text: { key: "packages.satisfactory2.features.backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "recommended" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "satisfactory3",
    price: "€22.50",
    ddr3Price: "€17.50",
    description: { key: "packages.satisfactory3.description" },
    features: [
        { text: { key: "packages.satisfactory3.features.ram" }, included: true },
        { text: { key: "packages.satisfactory3.features.cores" }, included: true },
        { text: { key: "packages.satisfactory3.features.storage" }, included: true },
        { text: { key: "packages.satisfactory3.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory3.features.support" }, included: true },
        { text: { key: "packages.satisfactory3.features.databases" }, included: true },
        { text: { key: "packages.satisfactory3.features.backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "satisfactory4",
    price: "€30.00",
    ddr3Price: "€22.50",
    description: { key: "packages.satisfactory4.description" },
    features: [
        { text: { key: "packages.satisfactory4.features.ram" }, included: true },
        { text: { key: "packages.satisfactory4.features.cores" }, included: true },
        { text: { key: "packages.satisfactory4.features.storage" }, included: true },
        { text: { key: "packages.satisfactory4.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory4.features.support" }, included: true },
        { text: { key: "packages.satisfactory4.features.databases" }, included: true },
        { text: { key: "packages.satisfactory4.features.backup" }, included: true },
    ],
    sub: true,
    subtext: { key: "mostChosen" },
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "satisfactory5",
    price: "€37.50",
    ddr3Price: "€27.50",
    description: { key: "packages.satisfactory5.description" },
    features: [
        { text: { key: "packages.satisfactory5.features.ram" }, included: true },
        { text: { key: "packages.satisfactory5.features.cores" }, included: true },
        { text: { key: "packages.satisfactory5.features.storage" }, included: true },
        { text: { key: "packages.satisfactory5.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory5.features.support" }, included: true },
        { text: { key: "packages.satisfactory5.features.databases" }, included: true },
        { text: { key: "packages.satisfactory5.features.backup" }, included: true },
    ],
    href: "#",
    ddr3Href: "#",
  },
  {
    name: "satisfactory6",
    price: "€45.00",
    ddr3Price: "€32.50",
    description: { key: "packages.satisfactory6.description" },
    features: [
        { text: { key: "packages.satisfactory6.features.ram" }, included: true },
        { text: { key: "packages.satisfactory6.features.cores" }, included: true },
        { text: { key: "packages.satisfactory6.features.storage" }, included: true },
        { text: { key: "packages.satisfactory6.features.pelican" }, included: true },
        { text: { key: "packages.satisfactory6.features.support" }, included: true },
        { text: { key: "packages.satisfactory6.features.databases" }, included: true },
        { text: { key: "packages.satisfactory6.features.backup" }, included: true },
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

export default function SatisfactoryPage() {
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
          backgroundImage="/images/webp/games/wallpapers/satisfactory-background.webp"
          translationNamespace="satisfactory.hero"
        />
        <GamePackageSection
          title={{ key: 'packages.title' }}
          subtitle={{ key: 'packages.subtitle' }}
          packages={packagesDDR4}
          gameLogo="/images/webp/games/logos/satisfactory.webp"
          gameLogoAlt="Official Satisfactory Logo from the game"
          enableBTWToggle={true}
          enableDDRToggle={true}
          translationNamespace="satisfactory"
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