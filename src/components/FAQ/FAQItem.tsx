import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-[var(--color-border)] last:border-b-0">
      <button
        onClick={onToggle}
        className={`w-full text-left py-4 px-6 flex justify-between items-center transition-colors duration-300 hover:bg-[var(--color-bg-surface)] focus:outline-none focus:bg-[var(--color-bg-surface)]`}
      >
        <span className="text-[var(--color-text-primary)] font-medium">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          className="text-[var(--color-text-subtle)]"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="overflow-hidden"
          >
            <p className="p-6 text-[var(--color-text-subtle)] bg-[var(--color-bg-surface)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem; 