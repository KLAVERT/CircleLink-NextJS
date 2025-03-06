import FAQ from '@/components/FAQ/FAQ';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Link from 'next/link';

const FAQSection = () => {
  const t = useTranslations();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const faqs = [
    {
      question: t('faq.ddr3.question'),
      answer: t('faq.ddr3.answer')
    },
    {
      question: t('faq.palican.question'),
      answer: t('faq.palican.answer')
    },
    {
      question: t('faq.webhosting.question'),
      answer: t('faq.webhosting.answer')
    },
    {
      question: t('faq.locations.question'),
      answer: t('faq.locations.answer')
    },
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    }
  ];

  return (
    <AnimatedBackground variant="tertiary" className="min-h-[100vh] md:h-screen flex items-center justify-center py-16 md:py-0">
      <div className="container mx-auto px-4 py-8 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <motion.div 
            className="lg:col-span-5 px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="sticky top-24">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t('faq.title')}
              </motion.h2>
              <motion.p 
                className="text-[var(--color-text-primary)]"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t('faq.subtitle.text')}{' '}
                <Link 
                  href="/contact" 
                  className="text-[var(--color-link)] hover:underline"
                >
                  {t('faq.subtitle.link')}
                </Link>
              </motion.p>
            </div>
          </motion.div>
          
          {/* Right Column - Restored subtle horizontal animation */}
          <motion.div 
            className="lg:col-span-7 overflow-hidden"
            ref={sectionRef}
          >
            <motion.div
              className="w-full"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <FAQ faqs={faqs} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default FAQSection; 