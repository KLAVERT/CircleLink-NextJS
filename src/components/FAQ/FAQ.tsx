import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

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
  };

  const containerVariants = {
    visible: { opacity: 1 }
  };

  return (
    <div className="w-full">
      <motion.div 
        className="flex flex-col space-y-6 w-full"
        variants={containerVariants}
        initial={{ opacity: 0 }}
        animate="visible"
        transition={{ duration: 0.9 }}
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="relative border-b border-[var(--color-border)] last:border-b-0 w-full"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-text-primary)]" />
            
            <button
              onClick={() => handleToggle(index)}
              className="w-full text-left p-4 pl-6 focus:outline-none transition-colors duration-300 flex justify-between items-center"
            >
              <span className="text-[var(--color-text-primary)] font-medium pr-4">{faq.question}</span>
              <span className="text-[var(--color-text-subtle)] flex-shrink-0">
                <svg 
                  style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.6s ease-in-out' }}
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    d="M6 9L12 15L18 9" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            
            <div 
              className="overflow-hidden transition-all duration-600 ease-in-out"
              style={{ 
                maxHeight: openIndex === index ? '1000px' : '0px',
                opacity: openIndex === index ? 1 : 0,
                transition: 'max-height 0.6s ease-in-out, opacity 0.6s ease-in-out'
              }}
            >
              <div className="p-4 pt-0 pl-6">
                <p className="text-[var(--color-text-primary)] break-words whitespace-normal">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default FAQ; 