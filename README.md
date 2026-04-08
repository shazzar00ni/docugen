# DocuGen

Beautiful documentation made simple. Upload your Markdown, MDX, or README files and deploy a stunning static documentation website in seconds.

## What is DocuGen?

DocuGen is a developer tool that automatically transforms your documentation into fast, static websites. No configuration, no git dependencies, no hassle—just upload your files and get a production-ready docs site.

## Features

- **Markdown & MDX Support** - Full GitHub-flavored Markdown plus MDX for embedded React components
- **AI-Powered Structuring** - Automatic navigation and table of contents generation
- **Blazing Fast** - Static HTML with minimal JavaScript for instant page loads
- **Custom Domains** - Deploy to your own domain with automatic SSL
- **Built-in Search** - Client-side search that's fast and offline-capable
- **Syntax Highlighting** - Beautiful code blocks with Shiki support
- **Exportable Output** - Download your site as static files—no vendor lock-in

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/shazzar00ni/docugen.git
cd docugen
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **React 19** - UI framework with latest features
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety with strict mode
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Subtle animations
- **Heroicons** - Clean SVG icons

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Getting Started](./docs/DEVELOPMENT.md)** - Development setup and workflow
- **[Architecture](./docs/ARCHITECTURE.md)** - System design and technical decisions
- **[Component Library](./docs/COMPONENTS.md)** - UI components, props, and usage examples
- **[API Reference](./docs/API.md)** - Data structures, content API, and type definitions
- **[Testing Guide](./docs/TESTING.md)** - Testing strategy, patterns, and best practices
- **[Roadmap](./.planning/ROADMAP.md)** - Development phases and milestones

## Project Structure

```
docugen/
├── src/
│   ├── components/
│   │   ├── ui/              # Reusable base components
│   │   ├── sections/        # Page sections
│   │   └── Navbar.tsx
│   ├── data/
│   │   └── content.ts       # All text copy and site content
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

## Customization

All site content is centralized in `src/data/content.ts`. Edit this file to change:

- Headlines and subheadlines
- Feature descriptions
- Pricing information
- Navigation links
- Footer content

The design system is configured in `tailwind.config.js`:

- **Colors**: Dark mode first with teal (#14b8a6) accent
- **Fonts**: Inter for body text, JetBrains Mono for code
- **Animations**: Subtle fade and slide effects

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions including:

- Security headers configuration
- Analytics setup
- Platform-specific deployment guides

### Quick Deploy

#### Vercel (Recommended)

1. Import your repository at [vercel.com](https://vercel.com)
2. Vercel automatically detects Vite and configures the build
3. Security headers are automatically configured via `vercel.json`
4. Add environment variables for analytics (optional):
   ```
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com
   ```
5. Custom domains can be added in the Vercel dashboard

#### Netlify

1. Import your repository at [netlify.com](https://netlify.com)
2. Use `_headers` file for security headers configuration
3. Add environment variables in site settings
4. Deploy

#### Static Hosting

Since this is a static site, you can deploy anywhere:

- GitHub Pages: Enable in repository settings
- AWS S3 + CloudFront
- Any static hosting service

### Security Headers

DocuGen includes pre-configured security headers:

- Content-Security-Policy (CSP)
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Permissions-Policy

Headers are configured in:

- `vercel.json` for Vercel deployments
- `_headers` for Netlify deployments

### Analytics (Optional)

DocuGen supports privacy-respecting analytics via Plausible:

1. Sign up at [plausible.io](https://plausible.io)
2. Add your domain to Plausible
3. Set environment variable:
   ```
   VITE_PLAUSIBLE_DOMAIN=yourdomain.com
   ```
4. Analytics script loads automatically on page load

No analytics code is loaded if the environment variable is not set.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

For development setup and workflow, check the [Development Guide](./docs/DEVELOPMENT.md).

Quick start:

1. Fork the repository
2. Read the [Development Guide](./docs/DEVELOPMENT.md)
3. Create a feature branch
4. Make your changes
5. Run tests: `npm run test:run`
6. Submit a pull request

## License

MIT License - feel free to use this template for your own projects.

---

Built with ❤️ for developers who love great documentation.
