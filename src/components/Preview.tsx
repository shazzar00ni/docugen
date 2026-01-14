import { Container } from './ui/Container'
import { motion } from 'framer-motion'

export function Preview() {
  return (
    <section className="py-20 bg-dark-900/30">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-dark-50 mb-4">
            What your docs could look like
          </h2>
          <p className="text-lg text-dark-400">
            Clean, modern, and blazing fast. Just like this.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-dark-900 rounded-xl border border-dark-700 overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center px-4 py-3 bg-dark-800 border-b border-dark-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center px-3 py-1 bg-dark-900 rounded-md text-xs text-dark-400 font-mono">
                  docs.yourdomain.com
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-64 bg-dark-900 border-r border-dark-800 p-4 hidden md:block">
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Getting Started</div>
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-teal-400 bg-teal-500/10 rounded-md cursor-pointer">Introduction</div>
                    <div className="px-3 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-800 rounded-md cursor-pointer transition-colors">Quick Start</div>
                    <div className="px-3 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-800 rounded-md cursor-pointer transition-colors">Installation</div>
                  </div>
                  <div className="text-xs font-semibold text-dark-500 uppercase tracking-wider mt-4">Core Concepts</div>
                  <div className="space-y-1">
                    <div className="px-3 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-800 rounded-md cursor-pointer transition-colors">Architecture</div>
                    <div className="px-3 py-2 text-sm text-dark-300 hover:text-dark-100 hover:bg-dark-800 rounded-md cursor-pointer transition-colors">Configuration</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-8">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-dark-50 mb-2">Introduction</h1>
                  <div className="flex items-center space-x-4 text-sm text-dark-500">
                    <span>Last updated: January 15, 2026</span>
                    <span>5 min read</span>
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-dark-300 leading-relaxed mb-4">
                    Welcome to DocuGen, the fastest way to turn your documentation into a beautiful, production-ready static website.
                  </p>

                  <h3 className="text-lg font-semibold text-dark-100 mt-8 mb-3">Why DocuGen?</h3>
                  <p className="text-dark-300 leading-relaxed mb-4">
                    Most documentation tools are either too simple or too complex. We built DocuGen to hit the sweet spot: powerful enough for serious projects, simple enough to use in minutes.
                  </p>

                  <div className="bg-dark-800 rounded-lg p-4 my-6 border border-dark-700">
                    <div className="flex items-start space-x-3">
                      <svg className="w-5 h-5 text-teal-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium text-dark-200">Pro tip</div>
                        <div className="text-sm text-dark-400 mt-1">Upload your existing README.md and get a full documentation site instantly.</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-dark-100 mt-8 mb-3">Getting Started</h3>
                  <p className="text-dark-300 leading-relaxed mb-3">
                    Ready to transform your docs? Here's how:
                  </p>

                  <div className="bg-dark-900 rounded-lg p-4 border border-dark-700 font-mono text-sm">
                    <div className="text-dark-400"># Install the CLI</div>
                    <div className="text-teal-400">npm install -g docugen</div>
                    <div className="text-dark-400 mt-2"># Deploy your docs</div>
                    <div className="text-teal-400">docugen deploy ./docs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
