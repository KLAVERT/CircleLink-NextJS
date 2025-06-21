import FAQ from '@/components/FAQ/FAQ';
import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import AnimatedBackground from '@/components/AnimatedBackground/AnimatedBackground';
import Link from 'next/link';
import Grid, { GridItem } from '@/components/Grid';

export interface FAQItem {
  question: string | { key: string };
  answer: string | { key: string };
}

export interface GameFAQSectionProps {
  title: string | { key: string };
  subtitle: {
    text: string | { key: string };
    link: string | { key: string };
    linkHref: string;
  };
  faqs: FAQItem[];
  translationNamespace?: string;
}

function resolveText(t: (k: string) => string, value: string | { key: string }) {
  if (typeof value === 'string') return value;
  return t(value.key);
}

const GameFAQSection: React.FC<GameFAQSectionProps> = ({
  title,
  subtitle,
  faqs,
  translationNamespace
}) => {
  const t = useTranslations(translationNamespace || undefined);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  const resolvedFaqs = faqs.map(faq => ({
    question: resolveText(t, faq.question),
    answer: resolveText(t, faq.answer)
  }));

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
                      {resolveText(t, title)}
                    </motion.h2>
                    <motion.p 
                      className="text-[var(--color-text-primary)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {resolveText(t, subtitle.text)}{' '}
                      <Link 
                        href={subtitle.linkHref} 
                        className="text-[var(--color-link)] hover:underline"
                      >
                        {resolveText(t, subtitle.link)}
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
                  <FAQ faqs={resolvedFaqs} />
                </motion.div>
              </GridItem>
            </Grid>
          </div>
        </div>
      </Grid>
    </AnimatedBackground>
  );
};

export default GameFAQSection; 