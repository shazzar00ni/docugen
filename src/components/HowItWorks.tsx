import { Container } from './ui/Container';
import { HOW_IT_WORKS } from '../data/content';
import { motion } from 'framer-motion';

const icons = {
  document: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  sparkles: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  rocket: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      />
    </svg>
  ),
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-900/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
            From chaos to deployed in 3 steps
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No configuration required. Just upload your docs and watch the magic happen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 h-full hover:border-teal-500/30 transition-colors duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-teal-400 group-hover:bg-teal-500/10 transition-colors">
                    {icons[index === 0 ? 'document' : index === 1 ? 'sparkles' : 'rocket']}
                  </div>
                  <span className="text-4xl font-bold text-slate-800 group-hover:text-teal-500/20 transition-colors">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-slate-100 mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>

              {index < HOW_IT_WORKS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-slate-700">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
