import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as FaIcons from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  icon: string;
  isOpen: boolean;
  toggleFAQ: (id: string) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ id, question, answer, icon, isOpen, toggleFAQ }) => {
  const IconComponent = (FaIcons as any)[icon];

  return (
    <motion.div
      className={`
        mb-6
        rounded-[var(--radius-xl)]
        shadow-lg
        border border-border
        bg-card/80
        backdrop-blur
        transition-all duration-300
        hover:shadow-xl
        hover:-translate-y-1
        group
      `}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
    >
      <motion.button
        className={`
          flex w-full items-center justify-between
          px-6 py-5
          rounded-[var(--radius-xl)]
          bg-transparent
          outline-none
          transition-all duration-200
          focus-visible:ring-2 focus-visible:ring-primary
          active:scale-95
        `}
        onClick={() => toggleFAQ(id)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        type="button"
      >
        <div className="flex items-center">
          {/* Bubbly Icon */}
          <span
            className={`
              mr-4 flex items-center justify-center
              w-12 h-12
              rounded-full
              bg-primary/10
              border border-primary/20
              shadow-inner
              group-hover:scale-110 group-hover:rotate-3
              transition-all duration-300
            `}
          >
            <IconComponent className="h-6 w-6 text-primary" aria-hidden="true" />
          </span>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">
            {question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, type: "spring", bounce: 0.4 }}
        >
          <FaChevronDown
            className="h-6 w-6 text-primary/70 group-hover:text-primary"
            aria-hidden="true"
          />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
          >
            <div className="px-6 pb-6 pt-0 text-base text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
