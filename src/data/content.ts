export const SITE = {
  name: 'DocuGen',
  tagline: 'Documentation Made Beautiful',
  description: 'Turn your documentation into beautiful static websites instantly. Upload Markdown, MDX, or README files and deploy in seconds.',
  url: 'https://docugen.com',
}

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

export const FOOTER_LINKS = [
  { label: 'Documentation', href: '#' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'GitHub', href: '#' },
]

export const HERO_COPY = {
  headline: 'Your docs, deployed in seconds.',
  subheadline: 'Drop your Markdown, MDX, or README files. Our AI analyzes, structures, and styles them into a blazing-fast static site. No config, no git, no hassle.',
  primaryCTA: 'Get Early Access',
  secondaryCTA: 'View Example Docs',
}

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Upload your docs',
    description: 'Drag and drop Markdown files, MDX components, or entire documentation folders. We accept single files or structured projects.',
  },
  {
    step: '02',
    title: 'AI does the heavy lifting',
    description: 'Our engine automatically generates navigation, table of contents, and applies a clean, consistent design system to your content.',
  },
  {
    step: '03',
    title: 'Deploy instantly',
    description: 'Get a production-ready static site with custom domains, auto-generated sitemaps, and GitHub Pages-compatible output.',
  },
]

export const FEATURES = [
  {
    icon: 'document',
    title: 'Markdown & MDX Support',
    description: 'Full support for GitHub-flavored Markdown plus MDX for embedding React components in your documentation.',
  },
  {
    icon: 'globe',
    title: 'Custom Domains',
    description: 'Deploy to your own domain. SSL certificates are provisioned automatically and renewed for free.',
  },
  {
    icon: 'bolt',
    title: 'Lightning Fast',
    description: 'Static HTML with minimal JS. Your docs load instantly, even on slow connections. Built for performance.',
  },
  {
    icon: 'search',
    title: 'Built-in Search',
    description: 'Client-side search powered by FlexSearch. Fast, offline-capable, and zero configuration required.',
  },
  {
    icon: 'code',
    title: 'Syntax Highlighting',
    description: 'Beautiful code blocks powered by Shiki. Support for 20+ languages with line numbers and copy buttons.',
  },
  {
    icon: 'cube',
    title: 'Exportable Output',
    description: 'Your site is just static files. Download the build and host anywhere. No lock-in, ever.',
  },
]

export const PRICING_COPY = {
  title: 'Simple, transparent pricing',
  description: 'Free during beta. No credit card required. Early adopters get lifetime access to their plan.',
  badge: 'Beta',
  price: '$0',
  period: '/month',
  features: [
    'Unlimited documentation projects',
    'AI-powered structuring',
    'Custom domains with SSL',
    'Static export',
    'Community support',
  ],
}

export const NEWSLETTER_COPY = {
  title: 'Stay in the loop',
  description: 'Get updates on new features, documentation tips, and early access invites.',
  placeholder: 'Enter your email',
  button: 'Subscribe',
}

export const TESTIMONIALS = [
  {
    quote: "DocuGen saved me hours of work setting up documentation for my open source project. The AI structuring is incredible.",
    author: 'Sarah Chen',
    role: 'Maintainer',
    company: 'Vercel',
  },
  {
    quote: "Finally, a docs tool that doesn't feel like fighting with configuration. Just drop your files and you're done.",
    author: 'Marcus Johnson',
    role: 'Senior Developer',
    company: 'Stripe',
  },
  {
    quote: "The output quality is professional enough that our enterprise customers are impressed. Best decision we made this year.",
    author: 'Elena Rodriguez',
    role: 'CTO',
    company: 'Linear',
  },
]

export const FOOTER_COPY = {
  tagline: 'Documentation made beautiful, fast, and simple.',
  copyright: `© ${new Date().getFullYear()} DocuGen. All rights reserved.`,
}

export const FAQ_COPY = {
  title: 'Frequently Asked Questions',
  description: 'Everything you need to know about DocuGen.',
}

export const FAQS = [
  {
    question: 'What file formats does DocuGen support?',
    answer: 'DocuGen supports Markdown (.md) and MDX (.mdx) files. MDX allows you to embed React components directly in your documentation for interactive examples.',
  },
  {
    question: 'Is there a free tier?',
    answer: 'Yes! DocuGen is completely free during the beta period. No credit card required. Early adopters will get lifetime access to their plan when we launch.',
  },
  {
    question: 'Can I use my own domain?',
    answer: 'Absolutely. You can deploy your documentation to any custom domain. SSL certificates are automatically provisioned and renewed at no extra cost.',
  },
  {
    question: 'How does the AI structuring work?',
    answer: 'Our AI analyzes your markdown files and automatically generates a logical navigation structure, table of contents, and cross-references between pages. It learns from your file organization and heading hierarchy.',
  },
  {
    question: 'Can I export my documentation site?',
    answer: 'Yes. DocuGen generates standard static HTML/CSS/JS files that you can download and host anywhere - GitHub Pages, Netlify, Vercel, or your own server. No lock-in.',
  },
  {
    question: 'Is there version control integration?',
    answer: 'DocuGen works great with Git. Since it generates static files, you can commit the output to your repository or use it as part of your CI/CD pipeline.',
  },
  {
    question: 'How is my data stored and protected?',
    answer: 'Your documentation files are processed in memory and never stored on our servers. Everything happens locally or in ephemeral cloud functions that are deleted immediately after processing.',
  },
]
