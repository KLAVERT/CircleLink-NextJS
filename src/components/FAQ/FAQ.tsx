import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQProps {
  faqs: {
    question: string;
    answer: string;
  }[];
}

const FAQ = ({ faqs }: FAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    
    // Scroll naar het geopende item met een vloeiende animatie
    if (openIndex !== index && itemRefs.current[index]) {
      const yOffset = -100; // Offset zodat er wat ruimte boven het item blijft
      const element = itemRefs.current[index];
      const y = element?.getBoundingClientRect().top ?? 0;
      const scrollTarget = y + window.pageYOffset + yOffset;

      window.scrollTo({
        top: scrollTarget,
        behavior: 'smooth'
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          ref={el => {
            itemRefs.current[index] = el;
          }}
          variants={itemVariants}
          className="bg-[var(--color-tertiary)] rounded-lg shadow-sm relative overflow-hidden hover:shadow-md transition-all duration-300"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-text-primary)]"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.3 }}
          />
          <button
            onClick={() => handleToggle(index)}
            className="w-full text-left p-4 pl-6 focus:outline-none focus:bg-[var(--color-tertiary)] transition-colors duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-[var(--color-text-primary)] font-medium">{faq.question}</span>
              <motion.span
                animate={{ 
                  rotate: openIndex === index ? 180 : 0,
                  color: openIndex === index ? 'var(--color-accent-cool)' : 'var(--color-text-subtle)'
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="p-4 pt-0 pl-6"
                >
                  <p className="text-[var(--color-text-primary)]">{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FAQ; 