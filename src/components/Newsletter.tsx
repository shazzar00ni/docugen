import { Container } from './ui/Container'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { NEWSLETTER_COPY } from '../data/content'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

  return (
    <section className="py-20 bg-dark-900/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-50 mb-4">
            {NEWSLETTER_COPY.title}
          </h2>
          <p className="text-lg text-dark-400 mb-8">
            {NEWSLETTER_COPY.description}
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={NEWSLETTER_COPY.placeholder}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                {NEWSLETTER_COPY.button}
              </Button>
            </form>
          ) : (
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 inline-flex items-center space-x-3">
              <svg className="w-5 h-5 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-teal-400">You're on the list! We'll be in touch soon.</span>
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  )
}
