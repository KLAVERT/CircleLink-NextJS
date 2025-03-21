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
  // Gemeenschappelijke animatie-eigenschappen
  const animationProps = {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 }
  };

  if (external) {
    return (
      <motion.a 
        href={href}
        aria-label={alt}
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-colors duration-200 inline-block"
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
        className="text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)] transition-colors duration-200"
      >
        {children}
      </Link>
    </motion.div>
  );
};

// Speciale component voor links in de footer kolommen
const FooterColumnLink: React.FC<FooterLinkProps> = ({ href, alt, children, external = false }) => {
  return (
    <motion.li
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <FooterLink href={href} alt={alt || (typeof children === 'string' ? children : undefined)} external={external}>
        {children}
      </FooterLink>
    </motion.li>
  );
};

const Footer = () => {
  const t = useTranslations();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const socialIconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10
      }
    }
  };
  
  return (
    <footer className="bg-[var(--color-tertiary)]">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16 pb-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <FooterColumnLink href="https://discord.gg/circlelink" alt="Join Circlelink Discord server" external>
                Discord
              </FooterColumnLink>
              <FooterColumnLink href="/status" alt="Check Circlelink online status">
                {t('footer.onlineStatus')}
              </FooterColumnLink>
            </ul>
          </motion.div>
          
          {/* Shopping */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">{t('footer.shopping')}</h3>
            <ul className="space-y-2">
              <FooterColumnLink href="/game-hosting" alt="Learn about our game hosting services">
                {t('footer.gameHosting')}
              </FooterColumnLink>
              <FooterColumnLink href="/website-hosting" alt="Learn about our website hosting services">
                {t('footer.websiteHosting')}
              </FooterColumnLink>
              <FooterColumnLink href="/discord-hosting" alt="Learn about our Discord hosting services">
                {t('footer.discordHosting')}
              </FooterColumnLink>
            </ul>
          </motion.div>
          
          {/* Panels */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">{t('footer.panels')}</h3>
            <ul className="space-y-2">
              <FooterColumnLink href="https://panel.circlelink.eu" alt="Access Circlelink gaming panel" external>
                {t('footer.gamingPanel')}
              </FooterColumnLink>
              <FooterColumnLink href="https://webpanel.circlelink.eu" alt="Access Circlelink web panel" external>
                {t('footer.webPanel')}
              </FooterColumnLink>
              <FooterColumnLink href="https://billing.circlelink.eu" alt="Access Circlelink billing panel" external>
                {t('footer.billingPanel')}
              </FooterColumnLink>
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">{t('footer.contact')}</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[var(--color-text-primary)]" />
                <FooterLink href="mailto:support@circlelink.eu" alt="Email Circlelink support">
                  support@circlelink.eu
                </FooterLink>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[var(--color-text-primary)]" />
                <FooterLink href="mailto:info@circlelink.eu" alt="Email Circlelink information">
                  info@circlelink.eu
                </FooterLink>
              </li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FaPhone className="text-[var(--color-text-primary)]" />
                <span className="text-[var(--color-text-primary)]">KvK: 94372594</span>
              </motion.li>
              <motion.li 
                className="flex items-center gap-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <FaBuilding className="text-[var(--color-text-primary)]" />
                <span className="text-[var(--color-text-primary)]">VAT: NL866753795B01</span>
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Compact bottom section */}
      <motion.div 
        className="border-t border-[var(--color-border)] bg-[var(--color-tertiary)]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-row justify-between items-center">
            {/* Logo */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" className="flex items-center">
                <span className="text-xl font-bold text-[var(--color-text-primary)]">
                  <span className="text-blue-500">Circle</span>
                  <span>link</span>
                </span>
              </Link>
            </motion.div>
            
            {/* Center copyright */}
            <motion.div 
              className="text-center text-sm text-[var(--color-text-primary)]"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p>© {new Date().getFullYear()} Circlelink. {t('footer.allRightsReserved')}</p>
            </motion.div>
            
            {/* Social icons */}
            <motion.div 
              className="flex space-x-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={socialIconVariants}>
                <FooterLink href="https://discord.gg/circlelink" alt="Join Circlelink Discord server" external>
                  <SiDiscord className="text-2xl hover:text-[#5865F2] transition-colors duration-200" />
                </FooterLink>
              </motion.div>
              <motion.div variants={socialIconVariants}>
                <FooterLink href="https://youtube.com/circlelink" alt="Visit Circlelink YouTube channel" external>
                  <FaYoutube className="text-2xl hover:text-[#FF0000] transition-colors duration-200" />
                </FooterLink>
              </motion.div>
              <motion.div variants={socialIconVariants}>
                <FooterLink href="https://twitter.com/circlelink" alt="Follow Circlelink on Twitter" external>
                  <FaXTwitter className="text-2xl hover:text-[#000000] transition-colors duration-200" />
                </FooterLink>
              </motion.div>
              <motion.div variants={socialIconVariants}>
                <FooterLink href="https://instagram.com/circlelink" alt="Follow Circlelink on Instagram" external>
                  <FaInstagram className="text-2xl hover:text-[#E1306C] transition-colors duration-200" />
                </FooterLink>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer; 