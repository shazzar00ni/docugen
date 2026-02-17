import { Container } from './ui/Container';
import { TESTIMONIALS } from '../data/content';
import { motion } from 'framer-motion';

/**
 * Testimonials component that displays customer reviews and feedback.
 * Renders testimonial cards in a responsive grid layout with entrance animations.
 * Each card includes a quote, author name, role, company, and stylized avatar.
 *
 * @example
 * ```tsx
 * import { Testimonials } from '@/components/Testimonials';
 *
 * function LandingPage() {
 *   return <Testimonials />;
 * }
 * ```
 *
 * @returns A JSX element representing the testimonials section with customer feedback
 */
export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-slate-900/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">Loved by developers</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            See what the community has to say about DocuGen.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
            >
              <svg
                className="w-8 h-8 text-teal-500/50 mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
              </svg>
              <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.quote}</p>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-700 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <p className="text-slate-100 font-medium text-sm">{testimonial.author}</p>
                  <p className="text-slate-500 text-xs">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
