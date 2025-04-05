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
    <AnimatedBackground variant="tertiary" className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Titel kolom */}
            <div className="lg:w-1/3 flex-shrink-0">
              <h2 className="text-5xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
                {t('faq.title')}
              </h2>
              <div className="mt-4">
                <p className="text-lg text-[var(--color-text-primary)]">
                  {t('faq.subtitle.text')}{' '}
                  <Link 
                    href="/contact" 
                    className="text-[var(--color-link)] hover:underline"
                  >
                    {t('faq.subtitle.link')}
                  </Link>
                </p>
              </div>
            </div>
            
            {/* FAQ kolom */}
            <div className="lg:w-2/3">
              <motion.div
                ref={sectionRef}
                className="w-full"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <FAQ faqs={faqs} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedBackground>
  );
};

export default FAQSection; 