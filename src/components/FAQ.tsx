import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from './ui/Container';
import { FAQ_COPY, FAQS } from '../data/content';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

/**
 * Render a single FAQ row with a question button and an animated, accessible answer panel.
 *
 * @param question - The FAQ question text
 * @param answer - The FAQ answer text shown when expanded
 * @param isOpen - Whether the item is expanded
 * @param onClick - Handler invoked when the question button is activated
 * @returns The rendered FAQ item as a JSX element
 */
function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-slate-800">
      <button
        type="button"
        onClick={onClick}
        className="w-full py-5 flex items-center justify-between text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-slate-100 pr-4">{question}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-slate-400 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-slate-400 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Render a FAQ accordion section that displays questions and answers, allowing only one item to be expanded at a time.
 *
 * The component renders a header and a list of expandable FAQ items driven by the FAQ data.
 *
 * @returns A JSX element containing the FAQ section with expandable items
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  /**
   * Handles the click event on FAQ items to toggle their expanded state.
   * Closes the currently open item if clicking the same item, otherwise opens the clicked item.
   *
   * @param index - The index of the FAQ item that was clicked
   */
  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-900/30">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">{FAQ_COPY.title}</h2>
            <p className="text-lg text-slate-400">{FAQ_COPY.description}</p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            {FAQS.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => handleClick(index)}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}