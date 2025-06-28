'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaRocket, FaDiscord, FaCode } from 'react-icons/fa';
import Button from '@/components/Button/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  skills: string[];
  experience: string;
  avatar: string;
  color: string;
  social?: {
    discord?: string;
    github?: string;
    mail?: string;
  };
}

// Subtle modern cloud SVG background (2 static + 2 animated vlekken)
const CloudBg = () => (
  <>
    {/* Cloud 1 */}
    <motion.svg
      className="pointer-events-none absolute z-0"
      width="420" height="220" viewBox="0 0 420 220" fill="none"
      style={{ filter: 'blur(32px)', opacity: 0.18 }}
      initial={{ top: '2%', left: '60%', scale: 1 }}
      animate={{
        top: ['2%', '8%', '2%'],
        left: ['60%', '70%', '55%', '60%'],
        scale: [1, 1.08, 1]
      }}
      transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="320" cy="80" rx="120" ry="60" fill="#7dd3fc" />
      <ellipse cx="200" cy="120" rx="80" ry="40" fill="#bae6fd" />
    </motion.svg>
    {/* Cloud 2 */}
    <motion.svg
      className="pointer-events-none absolute z-0"
      width="340" height="180" viewBox="0 0 340 180" fill="none"
      style={{ filter: 'blur(28px)', opacity: 0.13 }}
      initial={{ bottom: '0%', left: '0%', scale: 1 }}
      animate={{
        bottom: ['0%', '6%', '0%'],
        left: ['0%', '8%', '0%'],
        scale: [1, 1.05, 1]
      }}
      transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ellipse cx="120" cy="100" rx="90" ry="40" fill="#7dd3fc" />
      <ellipse cx="220" cy="60" rx="60" ry="30" fill="#bae6fd" />
    </motion.svg>
    {/* Cloud 3 */}
    <motion.svg
      className="pointer-events-none absolute z-0"
      width="260" height="120" viewBox="0 0 260 120" fill="none"
      style={{ filter: 'blur(36px)', opacity: 0.13 }}
      initial={{ top: '30%', left: '60%', scale: 1 }}
      animate={{
        top: ["30%", "55%", "40%", "30%"],
        left: ["60%", "70%", "50%", "60%"],
        scale: [1, 1.07, 1]
      }}
      transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
    >
      <ellipse cx="130" cy="60" rx="90" ry="40" fill="#38bdf8" />
    </motion.svg>
    {/* Cloud 4 */}
    <motion.svg
      className="pointer-events-none absolute z-0"
      width="180" height="90" viewBox="0 0 180 90" fill="none"
      style={{ filter: 'blur(24px)', opacity: 0.10 }}
      initial={{ top: '60%', left: '20%', scale: 1 }}
      animate={{
        top: ["60%", "40%", "70%", "60%"],
        left: ["20%", "35%", "10%", "20%"],
        scale: [1, 1.04, 1]
      }}
      transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
    >
      <ellipse cx="90" cy="45" rx="60" ry="30" fill="#bae6fd" />
    </motion.svg>
  </>
);

const TeamSection = () => {
  const t = useTranslations('aboutUs');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: 'simon',
      name: 'Simon',
      role: t('team.members.simon.role') || 'Founder',
      description: t('team.members.simon.description') || 'Hoofd ontwikkelaar van de website en eigenaar van CircleLink',
      skills: ['scrum', "product owner", 'Gaming', 'Technology', 'Frontend', 'Backend'],
      experience: '3+ years',
      avatar: '/images/webp/mainpage/server-kast-guy.webp',
      color: 'var(--color-quinary)',
      social: {
        discord: 'klavert',
        github: 'klavertjuh',
        mail: 'simon@circlelink.eu'
      }
    },
    {
      id: 'quinten',
      name: 'Quinten',
      role: t('team.members.quinten.role') || 'Founder',
      description: t('team.members.quinten.description') || 'Hoofd in cyber security cloud & developer van de backend',
      skills: ['Development', 'Infrastructure', 'Security', 'Cloud', 'Backend'],
      experience: '5+ years',
      avatar: '/images/webp/mainpage/server-kast-guy.webp',
      color: 'var(--color-quaternary)',
      social: {
        discord: 'gamenhaadee',
        github: 'gamenhaadee',
        mail: 'quinten@circlelink.eu'
      }
    }
  ];

  return (
    <section id="team" className="relative w-full bg-[var(--color-primary)] py-24 overflow-hidden">
      <CloudBg />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-quaternary)]/10 text-[var(--color-quinary)] text-sm font-semibold mb-4">
            {t('team.badge') || 'ONS TEAM'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
            {t('team.title') || 'Ontmoet het'} <span className="text-[var(--color-quinary)]">{t('team.subtitle') || 'CircleLink Team'}</span>
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-subtle)] max-w-3xl mx-auto">
            {t('team.description') || 'Ons gepassioneerde team van experts staat klaar om jouw hosting ervaring naar het volgende niveau te tillen.'}
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => setSelectedMember(member)}
              >
                <motion.div
                  className="bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-primary)] rounded-2xl p-6 border-2 border-[var(--color-quaternary)]/20 backdrop-blur-sm relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Background Accent */}
                  <div 
                    className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-20 blur-xl"
                    style={{ backgroundColor: member.color }}
                  />
                  
                  {/* Avatar */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <div 
                        className="w-full h-full bg-gradient-to-br from-[var(--color-quinary)] to-[var(--color-quaternary)] flex items-center justify-center text-white text-2xl font-bold"
                      >
                        {member.name.charAt(0)}
                      </div>
                    </div>
                    <div 
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 border-white"
                      style={{ backgroundColor: member.color }}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[var(--color-quinary)] font-semibold mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {member.experience} ervaring
                    </p>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[var(--color-quaternary)]/10 text-[var(--color-quinary)] text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {member.skills.length > 3 && (
                      <span className="px-3 py-1 bg-[var(--color-quinary)]/10 text-[var(--color-quinary)] text-xs rounded-full">
                        +{member.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-quinary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-br from-[var(--color-quaternary)]/10 to-[var(--color-quinary)]/10 rounded-2xl p-8 border-2 border-[var(--color-quaternary)]/20">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
              {t('team.cta.title') || 'Klaar om te beginnen?'}
            </h3>
            <p className="text-[var(--color-text-secondary)] mb-6 max-w-2xl mx-auto">
              {t('team.cta.description') || 'Ons team staat klaar om je te helpen bij het opzetten van je perfecte hosting oplossing.'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" href="/games">
                <span className="flex items-center gap-2">
                  <FaRocket />
                  {t('team.cta.startHosting') || 'Start met Hosting'}
                </span>
              </Button>
              <Button variant="outline" href="/discord">
                <span className="flex items-center gap-2">
                  <FaDiscord />
                  {t('team.cta.joinDiscord') || 'Join onze Discord'}
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[var(--color-secondary)] rounded-2xl p-8 max-w-md w-full border-2 border-[var(--color-quaternary)]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
                  <div 
                    className="w-full h-full bg-gradient-to-br from-[var(--color-quinary)] to-[var(--color-quaternary)] flex items-center justify-center text-white text-3xl font-bold"
                  >
                    {selectedMember.name.charAt(0)}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                  {selectedMember.name}
                </h3>
                <p className="text-[var(--color-quinary)] font-semibold mb-2">
                  {selectedMember.role}
                </p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {selectedMember.experience} ervaring
                </p>
              </div>

              <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                {selectedMember.description}
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">
                  Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[var(--color-quaternary)]/10 text-[var(--color-quinary)] text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {selectedMember.social && (
                <div className="flex justify-center gap-4">
                  {selectedMember.social.discord && (
                    <div className="flex items-center gap-2 text-[var(--color-quinary)]">
                      <FaDiscord />
                      <span className="text-sm">{selectedMember.social.discord}</span>
                    </div>
                  )}
                  {selectedMember.social.github && (
                    <div className="flex items-center gap-2 text-[var(--color-quinary)]">
                      <FaCode />
                      <span className="text-sm">{selectedMember.social.github}</span>
                    </div>
                  )}
                {selectedMember.social.mail && (
                    <div className="flex items-center gap-2 text-[var(--color-quinary)]">
                      <FaEnvelope />
                      <span className="text-sm">{selectedMember.social.mail}</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedMember(null)}
                className="mt-6 w-full px-4 py-2 bg-[var(--color-quinary)] text-white rounded-lg hover:bg-[var(--color-quinary)]/90 transition-colors"
              >
                Sluiten
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TeamSection; 