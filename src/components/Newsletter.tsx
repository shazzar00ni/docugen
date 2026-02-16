import { Container } from './ui/Container';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { NEWSLETTER_COPY } from '../data/content';
import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Validates whether a given string is a properly formatted email address.
 * Uses a regular expression to check for standard email format requirements.
 *
 * @param email - The email string to validate
 * @returns True if the email is valid, false otherwise
 *
 * @example
 * ```tsx
 * isValidEmail('user@example.com'); // true
 * isValidEmail('invalid-email');    // false
 * ```
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Newsletter component that provides an email subscription form with validation.
 * Features real-time email validation, error handling, and success state management.
 * Includes form validation on blur and submit with user-friendly error messages.
 *
 * @example
 * ```tsx
 * import { Newsletter } from '@/components/Newsletter';
 *
 * function Footer() {
 *   return <Newsletter />;
 * }
 * ```
 *
 * @returns A JSX element representing the newsletter subscription form
 */
export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);

  /**
   * Handles the blur event for the email input field.
   * Marks the field as touched and validates the email if a value is present.
   * Sets appropriate error messages based on validation results.
   */
  const handleBlur = () => {
    setTouched(true);
    if (email && !isValidEmail(email)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };

  /**
   * Handles form submission for the newsletter subscription.
   * Prevents default form behavior, validates the email, and updates the UI state accordingly.
   * Shows success state if email is valid, otherwise displays appropriate error messages.
   *
   * @param e - The form event object
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (email && isValidEmail(email)) {
      setSubmitted(true);
      setError('');
    } else if (!email) {
      setError('Email is required');
    } else {
      setError('Please enter a valid email address');
    }
  };

  const showError = touched && error;

  return (
    <section className="py-20 bg-slate-900/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-50 mb-4">
            {NEWSLETTER_COPY.title}
          </h2>
          <p className="text-lg text-slate-400 mb-8">{NEWSLETTER_COPY.description}</p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1 text-left">
                <Input
                  type="email"
                  placeholder={NEWSLETTER_COPY.placeholder}
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    if (touched && e.target.value && !isValidEmail(e.target.value)) {
                      setError('Please enter a valid email address');
                    } else if (touched && !e.target.value) {
                      setError('Email is required');
                    } else {
                      setError('');
                    }
                  }}
                  onBlur={handleBlur}
                  className={`${showError ? 'border-red-500! focus:ring-red-500!' : ''}`}
                  {...(showError
                    ? { 'aria-invalid': true, 'aria-describedby': 'email-error' }
                    : {})}
                />
                {showError && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {error}
                  </p>
                )}
              </div>
              <Button type="submit">{NEWSLETTER_COPY.button}</Button>
            </form>
          ) : (
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 inline-flex items-center space-x-3">
              <svg
                className="w-5 h-5 text-teal-400"
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
              <span className="text-teal-400">You're on the list! We'll be in touch soon.</span>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}
