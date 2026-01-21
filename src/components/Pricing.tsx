import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { PRICING_COPY } from '../data/content';
import { motion } from 'framer-motion';

export function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-3 py-1 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
              {PRICING_COPY.badge}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark-50 mb-4">
              {PRICING_COPY.title}
            </h2>
            <p className="text-lg text-dark-400">{PRICING_COPY.description}</p>
          </div>

          <div className="bg-dark-900 border border-dark-800 rounded-2xl p-8 max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-dark-50 mb-2">
                {PRICING_COPY.price}
                <span className="text-lg text-dark-400 font-normal">{PRICING_COPY.period}</span>
              </div>
              <p className="text-dark-400">During beta period</p>
            </div>

            <ul className="space-y-4 mb-8">
              {PRICING_COPY.features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <svg
                    className="w-5 h-5 text-teal-500 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-dark-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button className="w-full" size="lg">
              Start Free Beta
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
