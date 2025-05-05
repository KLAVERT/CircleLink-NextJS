import FAQ from '@/components/FAQ/FAQ';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Link from 'next/link';
import Grid, { GridItem } from '@/components/Grid';

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
    <AnimatedBackground variant="tertiary" className="min-h-screen w-full py-16 md:py-32">
      <Grid container maxWidth="xl" className="flex flex-col items-center h-full">
        <div className="w-full flex flex-col items-center">
          <div className="w-full max-w-7xl mx-auto">
            <Grid columns={1} lgColumns={12} spacing="lg" className="items-start px-4 sm:px-6 lg:px-8">
              {/* Left Column */}
              <GridItem lgColSpan={5} className="px-4 md:px-0">
                <motion.div
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
              </GridItem>
              
              {/* Right Column - Restored subtle horizontal animation */}
              <GridItem lgColSpan={7} className="overflow-hidden">
                <motion.div
                  ref={sectionRef}
                  className="w-full"
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <FAQ faqs={faqs} />
                </motion.div>
              </GridItem>
            </Grid>
          </div>
        </div>
      </Grid>
    </AnimatedBackground>
  );
};

export default FAQSection; 