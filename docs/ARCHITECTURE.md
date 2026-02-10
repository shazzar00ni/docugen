# Architecture Overview

This document describes the technical architecture, design decisions, and system structure of DocuGen.

## Table of Contents

- [High-Level Overview](#high-level-overview)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [State Management](#state-management)
- [Component Architecture](#component-architecture)
- [Performance Optimizations](#performance-optimizations)
- [Data Flow](#data-flow)
- [Build & Deployment](#build--deployment)

## High-Level Overview

DocuGen is a modern landing page built with React 19 and TypeScript. The application follows a component-based architecture with clear separation of concerns:

- **Presentation Layer**: React components with Tailwind CSS styling
- **State Layer**: React Context for theme management, local state for UI
- **Data Layer**: Centralized content management in `src/data/content.ts`
- **Build Layer**: Vite for development and production builds

## Technology Stack

### Core Technologies

| Technology    | Version | Purpose                               |
| ------------- | ------- | ------------------------------------- |
| React         | 19.2.3  | UI framework with concurrent features |
| TypeScript    | 5.2.0   | Type safety and developer experience  |
| Vite          | 7.3.1   | Build tool and development server     |
| Tailwind CSS  | 4.1.18  | Utility-first styling                 |
| Framer Motion | 12.29.2 | Animation library                     |

### Development Tools

| Tool     | Purpose                                 |
| -------- | --------------------------------------- |
| Vitest   | Unit testing with React Testing Library |
| ESLint   | Code linting with strict rules          |
| Prettier | Code formatting                         |
| Husky    | Git hooks for pre-commit checks         |

### Why This Stack?

1. **React 19**: Latest React features including improved concurrent rendering and automatic batching
2. **Vite**: Fast HMR, optimized builds, excellent TypeScript support
3. **Tailwind CSS**: Consistent design system, minimal CSS overhead, responsive utilities
4. **TypeScript**: Compile-time error checking, better IDE support, self-documenting code
5. **Framer Motion**: Declarative animations, performance optimized, viewport-based triggers

## Application Architecture

### Directory Structure

```
src/
├── components/           # React components
│   ├── ui/              # Base UI primitives (Button, Input, Container, Skeleton)
│   ├── sections/        # Page sections (Hero, Features, Pricing, etc.)
│   ├── Analytics.tsx    # Analytics integration
│   ├── CookieConsent.tsx
│   ├── ErrorBoundary.tsx
│   ├── FAQ.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HowItWorks.tsx
│   ├── MobileMenu.tsx
│   ├── Navbar.tsx
│   ├── Newsletter.tsx
│   ├── Preview.tsx
│   ├── Pricing.tsx
│   ├── ScrollToTop.tsx
│   ├── ShareButtons.tsx
│   ├── Testimonials.tsx
│   └── UploadDemo.tsx   # Interactive upload demonstration
├── data/
│   └── content.ts       # Centralized content & configuration
├── lib/
│   ├── ThemeContext.tsx # Theme management context
│   ├── useTheme.ts      # Theme hook
│   └── utils.ts         # Utility functions
├── test/
│   └── setup.ts         # Test configuration
├── App.tsx              # Root component
├── AppAnalyticsBridge.tsx # Analytics initialization
├── index.css            # Global styles
└── main.tsx             # Application entry point
```

### Design Principles

1. **Single Responsibility**: Each component does one thing well
2. **Composition Over Inheritance**: Build complex UIs from simple components
3. **Separation of Concerns**: UI logic separate from business logic
4. **Centralized Content**: All text/copy in one location for easy maintenance
5. **Type Safety**: Comprehensive TypeScript coverage, no `any` types

## State Management

### Theme State

The application uses React Context for theme management:

```typescript
// lib/ThemeContext.tsx
interface ThemeContextType {
  theme: Theme; // 'dark' | 'light'
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

**Features**:

- Automatic system preference detection
- localStorage persistence
- CSS class-based theming
- SSR-safe initial state

**Implementation Pattern**:

```typescript
// Provider wraps the app in main.tsx
<ThemeProvider>
  <App />
</ThemeProvider>

// Hook usage in components
const { theme, toggleTheme } = useTheme();
```

### Local Component State

- Form state managed with `useState` and controlled inputs
- Modal/sidebar visibility with boolean state
- Animation states with Framer Motion
- No external state management library needed for current scope

### Why No Redux/Zustand?

The application is a landing page with minimal shared state:

- Theme is the only global state
- Form states are localized
- No complex data fetching or caching needs
- React Context + useState is sufficient and simpler

## Component Architecture

### Component Hierarchy

```
App.tsx
├── ThemeProvider (Context)
├── ErrorBoundary
├── Navbar
│   ├── Theme toggle
│   └── Mobile menu trigger
├── Main Content (lazy loaded sections)
│   ├── Hero
│   │   └── UploadDemo
│   ├── Features
│   ├── HowItWorks
│   ├── Preview
│   ├── Pricing
│   ├── Testimonials
│   ├── FAQ
│   └── Newsletter
├── Footer
├── ScrollToTop
└── CookieConsent
```

### Component Categories

#### 1. UI Primitives (`components/ui/`)

Low-level, reusable components with minimal logic:

- **Button**: Multi-variant (primary/secondary/ghost), multi-size
- **Input**: Form inputs with validation support
- **Container**: Responsive layout wrapper
- **Skeleton**: Loading state placeholders

**Design Pattern**:

```typescript
// Composable props with sensible defaults
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  // ... other props
}
```

#### 2. Section Components (`components/`)

High-level page sections with business logic:

- Self-contained with minimal props
- Data from `content.ts`
- May contain interactive elements
- Wrapped in lazy loading where appropriate

#### 3. Layout Components

Structural components:

- **Navbar**: Navigation with mobile responsiveness
- **Footer**: Site footer
- **Container**: Max-width wrapper
- **ErrorBoundary**: Error handling wrapper

### Component Communication

1. **Props Down**: Parent → Child via props
2. **Events Up**: Child → Parent via callbacks
3. **Shared State**: React Context for theme
4. **Content**: Centralized in `content.ts`

## Performance Optimizations

### 1. Code Splitting

Sections are lazy loaded to reduce initial bundle size:

```typescript
// App.tsx
const Features = lazy(() => import('./components/Features'));
const Pricing = lazy(() => import('./components/Pricing'));
// ... other sections
```

**Impact**: Reduces initial JS payload by ~40%

### 2. Animation Optimization

- Framer Motion with `viewport={{ once: true }}` - animations run once
- GPU-accelerated transforms only
- No layout-triggering animations
- Lazy loading of animation libraries

### 3. Image Optimization

- WebP/AVIF formats for better compression
- Responsive images with srcset
- Lazy loading for below-fold images

### 4. CSS Optimization

- Tailwind's JIT compiler - only used classes in bundle
- Minimal custom CSS
- No unused styles

### 5. Bundle Analysis

Production build output:

```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle (~150KB gzipped)
│   ├── vendor-[hash].js     # Dependencies (~200KB gzipped)
│   └── index-[hash].css     # Styles (~15KB gzipped)
└── index.html
```

## Data Flow

### Content Management

All content centralized in `src/data/content.ts`:

```typescript
// data/content.ts
export const siteConfig = {
  name: 'DocuGen',
  tagline: 'Beautiful documentation made simple',
  // ...
};

export const features = [
  { title: '...', description: '...', icon: '...' },
  // ...
];
```

**Benefits**:

- Single source of truth for copy
- Easy A/B testing
- Simple internationalization path
- No prop drilling for static content

### User Input Flow

```
User Action → Component State → Validation → Feedback
     ↓              ↓              ↓           ↓
  Click/Type    useState      Logic/UI     Visual/Toast
```

Example: Newsletter Form

1. User types email → Input component state
2. User submits → Validation logic
3. Valid → Success message display
4. Invalid → Error state with feedback

## Build & Deployment

### Build Process

```mermaid
TypeScript → ESLint → Vite Build → Static Files
    ↓           ↓           ↓            ↓
  Compile    Lint      Bundle/Minify   dist/
```

**Steps**:

1. `tsc` - TypeScript compilation and type checking
2. `eslint` - Code quality checks
3. `vite build` - Production bundle
4. Output to `dist/` directory

### Environment Configuration

**Development**:

- Port: 3000
- HMR: Enabled
- Source maps: Full
- Linting: Strict (fails on warnings)

**Production**:

- Minification: Enabled
- Tree shaking: Enabled
- Code splitting: Automatic
- Asset optimization: Enabled

### Deployment Targets

1. **Vercel** (Recommended)
   - Zero-config deployment
   - Automatic HTTPS
   - Branch previews
   - Edge network

2. **Static Hosting**
   - Netlify, GitHub Pages, AWS S3
   - Just upload `dist/` folder
   - No server-side requirements

### CI/CD Pipeline

Pre-commit hooks (Husky):

```bash
lint-staged → ESLint --fix → Prettier --write
```

Recommended CI workflow:

```yaml
# .github/workflows/ci.yml
1. Checkout code
2. Install dependencies
3. Run linting
4. Run tests
5. Build project
6. Deploy to staging/production
```

## Security Considerations

### XSS Prevention

- React's automatic escaping
- No `dangerouslySetInnerHTML` usage
- Input validation on forms
- CSP headers in production

### Dependencies

- Regular `npm audit` runs
- Minimal dependency footprint
- Only well-maintained libraries
- Automated dependency updates

### Build Security

- No secrets in client-side code
- Environment variables properly handled
- Secure headers in production

## Future Architecture Considerations

### Phase 2-5 Evolution

As the project moves through its roadmap, architecture will evolve:

**Phase 2: AI Structuring Engine**

- Add state management for file parsing
- Web Workers for heavy processing
- Local storage for draft documents

**Phase 3: Preview & Theming**

- Expand theme system with design tokens
- Real-time preview state management
- Theme configuration persistence

**Phase 4: Export & Deploy**

- File system API integration
- Static site generation pipeline
- Deployment API integrations

**Phase 5: Search & Polish**

- Search index management
- Service Worker for offline capabilities
- Advanced caching strategies

### Scalability Path

Current architecture supports scaling through:

1. **Code Splitting**: Already implemented
2. **State Management**: Easy to add Redux/Zustand if needed
3. **API Layer**: Can add React Query/SWR for server state
4. **Routing**: Can add React Router for multi-page support
5. **I18n**: Content already centralized, easy to add translation layer

## Conclusion

DocuGen follows modern React best practices with a focus on:

- **Simplicity**: Minimal abstractions, clear code
- **Performance**: Lazy loading, optimized builds
- **Maintainability**: TypeScript, centralized content
- **Developer Experience**: Fast builds, hot reloading, clear architecture

The architecture is designed to grow with the project while maintaining simplicity and performance as core values.

---

**Related Documents**:

- [Development Guide](./DEVELOPMENT.md) - Setup and workflow
- [Component Library](./COMPONENTS.md) - Component documentation
- [Testing Guide](./TESTING.md) - Testing patterns
