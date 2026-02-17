# AGENTS.md

This document provides guidelines for AI agents working in the DocuGen codebase.

## Build Commands

```bash
npm run dev          # Start development server on port 3000
npm run build        # TypeScript check + Vite build (run before committing)
npm run preview      # Preview production build locally
npm run lint         # Run ESLint with strict rules (fails on warnings)
npm run test         # Run Vitest in watch mode
npm run test:run     # Run Vitest once (CI mode)
```

## Project Overview

DocuGen is a modern landing page for a developer tool that converts documentation into static websites. Built with React 19 + Vite + TypeScript + Tailwind CSS.

## Code Style Guidelines

### Imports

- Use absolute imports from `src/` (configured in `tsconfig.json`)
- Organize imports in this order: React → external dependencies → internal components/utils
- No default exports for components (use named exports only)

### TypeScript

- Enable strict mode: `strict: true` in `tsconfig.json`
- No `any` types - use explicit types or `unknown` with type guards
- Use interface for object types, type for unions/primitives
- Generics: use descriptive letter names (`T`, `K`, `V`) or descriptive names (`Item`, `Key`)

### Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection`, `PricingCard`)
- **Files**: PascalCase for components, camelCase for utilities (e.g., `utils.ts`)
- **Variables/functions**: camelCase (e.g., `handleSubmit`, `isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `SITE_CONFIG`)
- **CSS Classes**: Use meaningful names, avoid abbreviations

### Component Structure

```typescript
// 1. Imports (React, then external, then internal)
// 2. Types/interfaces
// 3. Constants
// 4. Helper functions
// 5. Main component
// 6. Named exports
```

### Tailwind CSS

- Use design system colors from `tailwind.config.js` (e.g., `text-dark-100`, `bg-teal-600`)
- Dark mode first: The app defaults to dark mode. Use `dark:` prefix to activate styles when dark mode is active.
- If implementing light mode, configure `darkMode: 'class'` in `tailwind.config.js` and use `.light` class strategy, or use a plugin that provides `light:` utilities.
- Avoid arbitrary values (`[...]`) - extend theme instead
- Use semantic color names: `text-dark-300` for secondary text, `text-teal-400` for accents
- Consistent spacing: use `4`, `6`, `8`, `12`, `16` scale
- Responsive: `sm:`, `md:`, `lg:` prefixes

### Framer Motion Animations

- Use for entrance animations only (fade-in, slide-up)
- Keep duration: `0.5s` for most, `0.6s` for complex
- Stagger children: `delay: index * 0.1`
- Viewport options: `viewport={{ once: true }}` for landing pages
- No complex gesture animations on landing page

### Error Handling

- Handle runtime errors properly — avoid empty `catch` blocks; always log the error or re-throw to preserve stack traces
- Form validation: inline or with simple state, no external libraries
- Network errors: display user-friendly messages

### File Organization

```text
src/
├── components/
│   ├── ui/              # Reusable base components (Button, Input, Container, Skeleton)
│   ├── sections/        # Page sections (Hero, Features, Pricing, etc.)
│   └── *.tsx            # Standalone components (Navbar, Footer, etc.)
├── data/
│   └── content.ts       # All text copy, site config, constants
├── lib/
│   ├── ThemeContext.tsx # Theme management context
│   ├── useTheme.ts      # Theme hook
│   └── utils.ts         # Helper functions
├── test/
│   └── setup.ts         # Test configuration and global mocks
├── App.tsx              # Root component with lazy loading
└── main.tsx             # Entry point

docs/                    # Documentation files
├── README.md           # Documentation index
├── ARCHITECTURE.md     # System design
├── DEVELOPMENT.md      # Development guide
├── COMPONENTS.md       # Component library
├── API.md              # API reference
└── TESTING.md          # Testing guide
```

### Copy & Content

- All text in `src/data/content.ts` - never hardcode in components
- Developer-focused tone: confident, technical, no marketing fluff
- No lorem ipsum - use realistic placeholder text
- Use "you/your" for direct address

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`
- Test on: iPhone SE, iPad, laptop, desktop

### Performance

- Use `React.memo()` for expensive components (none currently)
- Lazy load sections: Features, Pricing, Testimonials, Preview, Newsletter wrapped in `React.lazy()`
- Optimize images with WebP/AVIF formats
- Code splitting via Vite for optimal bundle size

## Testing

Vitest + React Testing Library configured. Tests live alongside components with `.test.tsx` extension.

```bash
npm run test         # Watch mode
npm run test:run     # Run once (CI mode)
```

Test Configuration:

- Setup file: `src/test/setup.ts` - Global mocks and configuration
- Mocks provided: `localStorage`, `IntersectionObserver`
- Environment: jsdom

Writing tests:

- Place test files next to components: `src/components/ui/Button.test.tsx`
- Use `render()` and `screen` from `@testing-library/react`
- Mock external dependencies only
- Run `npm run test:run` before committing

Verify manually:

1. All navigation links anchor correctly
2. Forms show success state (mocked)
3. Animations trigger on scroll (viewport)
4. Responsive breakpoints work
5. Run `npm run test:run` to verify all tests pass

See [docs/TESTING.md](./docs/TESTING.md) for comprehensive testing guide.

## Deployment

- Deploy to Vercel: zero-config with `vite.config.ts`
- Static output: `npm run build` generates `dist/` folder
- Custom domain: configure in Vercel dashboard

## Editor Setup

Recommended VS Code settings in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## Documentation

Comprehensive documentation is available in the `docs/` directory:

- [docs/README.md](./docs/README.md) - Documentation index and navigation
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - System architecture and design decisions
- [docs/DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Development setup and workflow
- [docs/COMPONENTS.md](./docs/COMPONENTS.md) - Component library documentation
- [docs/API.md](./docs/API.md) - API reference and data structures
- [docs/TESTING.md](./docs/TESTING.md) - Testing strategy and patterns

## Additional Notes

- Design system: Teal (#14b8a6) accent color
- Default font: Inter (sans-serif), JetBrains Mono for code
- Dark mode default: `class="dark"` on `<html>` element
- Animations: Subtle and professional, no bouncing or spring effects
- Commit hook: `npm run lint` and `npm run build` run pre-commit
