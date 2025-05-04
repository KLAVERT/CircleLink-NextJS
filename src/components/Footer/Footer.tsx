'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FaYoutube, FaEnvelope, FaPhone, FaBuilding, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiDiscord } from 'react-icons/si';
import { motion } from 'framer-motion';

interface FooterLinkProps {
  href: string;
  alt?: string;
  children: React.ReactNode;
  external?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, alt, children, external = false }) => {
  const animationProps = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  if (external) {
    return (
      <motion.a 
        href={href}
        aria-label={alt}
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[var(--color-text-primary)] hover:text-blue-500 transition-colors duration-200 inline-block"
        {...animationProps}
      >
        {children}
      </motion.a>
    );
  }
  
  return (
    <motion.div 
      className="inline-block"
      {...animationProps}
    >
      <Link 
        href={href}
        aria-label={alt}
        className="text-[var(--color-text-primary)] hover:text-blue-500 transition-colors duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
};

const Footer = () => {
  const t = useTranslations();
  
  return (
    <>
      {/* Witte lijn bovenaan de footer */}
      <div className="border-t border-white w-full" />
      <footer className="bg-[var(--color-tertiary)]">
        <div className="max-w-7xl mx-auto">
          {/* Main content */}
          <div className="px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-[repeat(3,1fr)_auto] gap-8">
              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('footer.quickLinks')}</h3>
                <ul className="space-y-3">
                  <li>
                    <FooterLink href="https://discord.gg/circlelink" alt="Join Circlelink Discord server" external>
                      Discord
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/status" alt="Check Circlelink online status">
                      {t('footer.onlineStatus')}
                    </FooterLink>
                  </li>
                </ul>
              </div>

              {/* Shopping */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('footer.shopping')}</h3>
                <ul className="space-y-3">
                  <li>
                    <FooterLink href="/game-hosting" alt="Learn about our game hosting services">
                      {t('footer.gameHosting')}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/website-hosting" alt="Learn about our website hosting services">
                      {t('footer.websiteHosting')}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="/discord-hosting" alt="Learn about our Discord hosting services">
                      {t('footer.discordHosting')}
                    </FooterLink>
                  </li>
                </ul>
              </div>

              {/* Panels */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('footer.panels')}</h3>
                <ul className="space-y-3">
                  <li>
                    <FooterLink href="https://panel.circlelink.eu" alt="Access Circlelink gaming panel" external>
                      {t('footer.gamingPanel')}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="https://webpanel.circlelink.eu" alt="Access Circlelink web panel" external>
                      {t('footer.webPanel')}
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink href="https://billing.circlelink.eu" alt="Access Circlelink billing panel" external>
                      {t('footer.billingPanel')}
                    </FooterLink>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('footer.contact')}</h3>
                <ul className="space-y-2">
                  <li className="grid grid-cols-[1.5rem_1fr] items-start gap-x-2">
                    <FaEnvelope className="text-[var(--color-text-primary)] w-5 h-5 mt-0.5" />
                    <motion.a
                      href="mailto:support@circlelink.eu"
                      className="break-all text-left hover:text-blue-500 outline-none inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      support@circlelink.eu
                    </motion.a>
                  </li>
                  <li className="grid grid-cols-[1.5rem_1fr] items-start gap-x-2">
                    <FaEnvelope className="text-[var(--color-text-primary)] w-5 h-5 mt-0.5" />
                    <motion.a
                      href="mailto:info@circlelink.eu"
                      className="break-all text-left hover:text-blue-500 outline-none inline-block"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      info@circlelink.eu
                    </motion.a>
                  </li>
                  <li className="grid grid-cols-[1.5rem_1fr] items-start gap-x-2">
                    <FaPhone className="text-[var(--color-text-primary)] w-5 h-5 mt-0.5" />
                    <span className="text-left">KvK: 94372594</span>
                  </li>
                  <li className="grid grid-cols-[1.5rem_1fr] items-start gap-x-2">
                    <FaBuilding className="text-[var(--color-text-primary)] w-5 h-5 mt-0.5" />
                    <span className="text-left">VAT: NL866753795B01</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Full-width white border */}
        <div className="border-t border-white w-full" />
        <div className="max-w-7xl mx-auto">
          <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Logo */}
              <div className="flex justify-center md:justify-start">
                <Link href="/" className="flex items-center">
                  <span className="text-xl font-bold text-[var(--color-text-primary)]">
                    <span className="text-blue-500">Circle</span>
                    <span>link</span>
                  </span>
                </Link>
              </div>

              {/* Copyright */}
              <div className="text-center text-sm text-[var(--color-text-primary)]">
                <p>© {new Date().getFullYear()} Circlelink. {t('footer.allRightsReserved')}</p>
              </div>

              {/* Social icons */}
              <div className="flex justify-center md:justify-end space-x-6">
                <FooterLink href="https://discord.gg/circlelink" alt="Join Circlelink Discord server" external>
                  <SiDiscord className="text-2xl hover:text-[#5865F2] transition-colors duration-200" />
                </FooterLink>
                <FooterLink href="https://youtube.com/circlelink" alt="Visit Circlelink YouTube channel" external>
                  <FaYoutube className="text-2xl hover:text-[#FF0000] transition-colors duration-200" />
                </FooterLink>
                <FooterLink href="https://twitter.com/circlelink" alt="Follow Circlelink on Twitter" external>
                  <FaXTwitter className="text-2xl hover:text-[#000000] transition-colors duration-200" />
                </FooterLink>
                <FooterLink href="https://instagram.com/circlelink" alt="Follow Circlelink on Instagram" external>
                  <FaInstagram className="text-2xl hover:text-[#E1306C] transition-colors duration-200" />
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
        {/* Blauwe lijn onderaan de footer */}
        <div className="border-b border-white w-full" />
      </footer>
    </>
  );
};

export default Footer; 