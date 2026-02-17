# API Documentation

API reference for DocuGen data structures, configuration, and content management.

## Table of Contents

- [Overview](#overview)
- [Content API](#content-api)
- [Component APIs](#component-apis)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)
- [Theme API](#theme-api)

## Overview

DocuGen uses a centralized content management approach. All text, configuration, and data are stored in `src/data/content.ts`, making the application highly maintainable and easy to customize.

### Architecture

```text
Content (content.ts) → Components → UI
```

This approach provides:

- Single source of truth for all copy
- Easy A/B testing and experimentation
- Simple internationalization path
- No prop drilling for static content

## Content API

### SITE Configuration

Global site configuration and metadata.

**Location**: `src/data/content.ts`

**Export**: `SITE`

**Type**:

```typescript
interface SiteConfig {
  name: string; // Site name
  tagline: string; // Short tagline
  description: string; // SEO/meta description
  url: string; // Production URL
}
```

**Usage**:

```typescript
import { SITE } from '@/data/content';

// Access site info
console.log(SITE.name); // 'DocuGen'
console.log(SITE.tagline); // 'Documentation Made Beautiful'
console.log(SITE.url); // 'https://docugen.com'
```

---

### Navigation Links

Site navigation structure.

**Export**: `NAV_LINKS`

**Type**:

```typescript
interface NavLink {
  label: string; // Display text
  href: string; // Anchor link or URL
}
```

**Value**:

```typescript
[
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];
```

**Usage**:

```typescript
import { NAV_LINKS } from '@/data/content';

// Render navigation
<nav>
  {NAV_LINKS.map((link) => (
    <a key={link.href} href={link.href}>
      {link.label}
    </a>
  ))}
</nav>
```

---

### Hero Content

Hero section copy and call-to-actions.

**Export**: `HERO_COPY`

**Type**:

```typescript
interface HeroCopy {
  headline: string; // Main headline
  subheadline: string; // Supporting text
  primaryCTA: string; // Primary button text
  secondaryCTA: string; // Secondary button text
}
```

**Usage**:

```typescript
import { HERO_COPY } from '@/data/content';

<Hero>
  <h1>{HERO_COPY.headline}</h1>
  <p>{HERO_COPY.subheadline}</p>
  <Button>{HERO_COPY.primaryCTA}</Button>
</Hero>
```

---

### How It Works

Step-by-step process content.

**Export**: `HOW_IT_WORKS`

**Type**:

```typescript
interface HowItWorksStep {
  step: string; // Step number (e.g., "01")
  title: string; // Step title
  description: string; // Step description
}
```

**Value**:

```typescript
[
  {
    step: '01',
    title: 'Upload your docs',
    description: 'Drag and drop Markdown files...',
  },
  // ... more steps
];
```

**Usage**:

```typescript
import { HOW_IT_WORKS } from '@/data/content';

{HOW_IT_WORKS.map((step) => (
  <StepCard
    key={step.step}
    number={step.step}
    title={step.title}
    description={step.description}
  />
))}
```

---

### Features

Product features list.

**Export**: `FEATURES`

**Type**:

```typescript
interface Feature {
  icon: string; // Icon identifier
  title: string; // Feature title
  description: string; // Feature description
}
```

**Value**:

```typescript
[
  {
    icon: 'document',
    title: 'Markdown & MDX Support',
    description: 'Full support for GitHub-flavored Markdown...',
  },
  // ... more features
];
```

**Available Icons**:

- `document` - Document icon
- `globe` - Globe/web icon
- `bolt` - Lightning/fast icon
- `search` - Search icon
- `code` - Code brackets icon
- `cube` - Cube/box icon

**Usage**:

```typescript
import { FEATURES } from '@/data/content';
import { iconMap } from '@/lib/icons';

{FEATURES.map((feature) => (
  <FeatureCard
    key={feature.title}
    icon={iconMap[feature.icon]}
    title={feature.title}
    description={feature.description}
  />
))}
```

---

### Pricing

Pricing section content.

**Export**: `PRICING_COPY`

**Type**:

```typescript
interface PricingCopy {
  title: string; // Section title
  description: string; // Section description
  badge: string; // Badge text (e.g., "Beta")
  price: string; // Price display
  period: string; // Billing period
  features: string[]; // Feature list
}
```

**Usage**:

```typescript
import { PRICING_COPY } from '@/data/content';

<PricingCard
  title={PRICING_COPY.title}
  price={PRICING_COPY.price}
  period={PRICING_COPY.period}
  features={PRICING_COPY.features}
/>
```

---

### Testimonials

Customer testimonials.

**Export**: `TESTIMONIALS`

**Type**:

```typescript
interface Testimonial {
  quote: string; // Customer quote
  author: string; // Author name
  role: string; // Author role
  company: string; // Company name
}
```

**Value**:

```typescript
[
  {
    quote: 'DocuGen saved me hours of work...',
    author: 'Sarah Chen',
    role: 'Maintainer',
    company: 'Vercel',
  },
  // ... more testimonials
];
```

**Usage**:

```typescript
import { TESTIMONIALS } from '@/data/content';

{TESTIMONIALS.map((testimonial) => (
  <TestimonialCard
    key={testimonial.author}
    quote={testimonial.quote}
    author={testimonial.author}
    role={testimonial.role}
    company={testimonial.company}
  />
))}
```

---

### FAQ

Frequently asked questions.

**Export**: `FAQ_COPY`, `FAQS`

**Types**:

```typescript
interface FAQCopy {
  title: string; // Section title
  description: string; // Section description
}

interface FAQ {
  question: string; // Question text
  answer: string; // Answer text
}
```

**Usage**:

```typescript
import { FAQ_COPY, FAQS } from '@/data/content';

<FAQSection>
  <h2>{FAQ_COPY.title}</h2>
  <p>{FAQ_COPY.description}</p>

  {FAQS.map((faq, index) => (
    <FAQItem
      key={index}
      question={faq.question}
      answer={faq.answer}
    />
  ))}
</FAQSection>
```

---

### Newsletter

Newsletter signup content.

**Export**: `NEWSLETTER_COPY`

**Type**:

```typescript
interface NewsletterCopy {
  title: string; // Section title
  description: string; // Section description
  placeholder: string; // Input placeholder
  button: string; // Submit button text
}
```

**Usage**:

```typescript
import { NEWSLETTER_COPY } from '@/data/content';

<Newsletter>
  <h2>{NEWSLETTER_COPY.title}</h2>
  <p>{NEWSLETTER_COPY.description}</p>
  <Input placeholder={NEWSLETTER_COPY.placeholder} />
  <Button>{NEWSLETTER_COPY.button}</Button>
</Newsletter>
```

---

### Footer

Footer content and links.

**Export**: `FOOTER_LINKS`, `FOOTER_COPY`

**Types**:

```typescript
interface FooterLink {
  label: string; // Link text
  href: string; // Link URL
}

interface FooterCopy {
  tagline: string; // Footer tagline
  copyright: string; // Copyright notice
}
```

**Usage**:

```typescript
import { FOOTER_LINKS, FOOTER_COPY } from '@/data/content';

<Footer>
  <p>{FOOTER_COPY.tagline}</p>
  <nav>
    {FOOTER_LINKS.map((link) => (
      <a key={link.href} href={link.href}>
        {link.label}
      </a>
    ))}
  </nav>
  <p>{FOOTER_COPY.copyright}</p>
</Footer>
```

---

## Component APIs

### Button Props

**Location**: `src/components/ui/Button.tsx`

```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  onClick?: () => void;
  className?: string;
}
```

**Defaults**:

- `variant`: 'primary'
- `size`: 'md'
- `type`: 'button'

---

### Input Props

**Location**: `src/components/ui/Input.tsx`

```typescript
interface InputProps {
  placeholder?: string;
  type?: 'text' | 'email';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  disabled?: boolean;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}
```

**Defaults**:

- `type`: 'text'
- `disabled`: false

---

### Container Props

**Location**: `src/components/ui/Container.tsx`

```typescript
interface ContainerProps {
  children: ReactNode;
  className?: string;
}
```

**Specifications**:

- Max width: 1280px (`max-w-7xl`)
- Horizontal padding: 16px mobile, 24px tablet, 32px desktop
- Auto margins for centering

---

### Skeleton Props

**Location**: `src/components/ui/Skeleton.tsx`

```typescript
interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  className?: string;
}
```

**Defaults**:

- `variant`: 'text'
- `width`: '100%' (text) or 'auto' (others)
- `height`: '1em' (text) or 'auto' (others)

**Pre-built Components**:

- `SkeletonCard` - Card layout with avatar and text
- `SkeletonButton` - Button-sized skeleton
- `SkeletonInput` - Input-sized skeleton
- `SkeletonFeature` - Feature card layout
- `SkeletonTestimonial` - Testimonial card layout

---

### MobileMenu Props

**Location**: `src/components/MobileMenu.tsx`

```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

---

### ShareButtons Props

**Location**: `src/components/ShareButtons.tsx`

```typescript
interface ShareButtonsProps {
  url: string;
  title: string;
}
```

---

### ErrorBoundary Props

**Location**: `src/components/ErrorBoundary.tsx`

```typescript
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}
```

---

## Utility Functions

### cn() - Class Name Merger

**Location**: `src/lib/utils.ts`

Merges Tailwind CSS classes with proper precedence.

**Signature**:

```typescript
function cn(...classes: Array<string | undefined | false>): string;
```

**Usage**:

```typescript
import { cn } from '@/lib/utils';

// Merge classes
const className = cn('base-class', condition && 'conditional-class', overrideClass);
// Result: 'base-class conditional-class override-class'

// Handle falsy values
const className = cn(
  'btn',
  isActive && 'btn-active', // false, omitted
  undefined, // omitted
  'btn-large'
);
// Result: 'btn btn-large'
```

**Features**:

- Filters out falsy values
- Handles conditional classes
- Preserves Tailwind class order

---

## Type Definitions

### Theme Type

**Location**: `src/lib/ThemeContext.tsx`

```typescript
type Theme = 'dark' | 'light';
```

---

### ThemeContextType

**Location**: `src/lib/ThemeContext.tsx`

```typescript
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}
```

---

## Theme API

### ThemeProvider

Provides theme context to the application.

**Location**: `src/lib/ThemeContext.tsx`

**Usage**:

```tsx
import { ThemeProvider } from '@/lib/ThemeContext';

// In App.tsx - ThemeProvider wraps the app content
function App() {
  return (
    <ThemeProvider>
      <div className="app">{/* App content */}</div>
    </ThemeProvider>
  );
}
```

**Features**:

- Automatic system preference detection
- localStorage persistence
- CSS class-based theming
- SSR-safe initial state

---

### useTheme Hook

Access theme state and controls.

**Location**: `src/lib/useTheme.ts`

**Usage**:

```tsx
import { useTheme } from '@/lib/useTheme';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark</button>
    </div>
  );
}
```

**Returns**:

- `theme`: Current theme ('dark' | 'light')
- `toggleTheme`: Toggle between dark/light
- `setTheme`: Set specific theme

**Error Handling**:
Throws error if used outside `ThemeProvider`:

```
useTheme must be used within a ThemeProvider
```

---

## Usage Patterns

### Content-Driven Components

All section components consume content from `content.ts`:

```typescript
// Pattern: Component reads its own content
import { FEATURES } from '@/data/content';

export function Features() {
  return (
    <section>
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </section>
  );
}
```

### Dynamic Content Updates

Update content without touching components:

```typescript
// Before
export const HERO_COPY = {
  headline: 'Old Headline',
};

// After - Just change the value
export const HERO_COPY = {
  headline: 'New Headline',
};
```

### A/B Testing

Easily swap content for experiments:

```typescript
// content.ts
const isExperiment = Boolean(import.meta.env.VITE_EXPERIMENT);

export const HERO_COPY = isExperiment ? { headline: 'Variant A' } : { headline: 'Variant B' };
```

---

## Future APIs

As DocuGen evolves through its roadmap, additional APIs will be added:

### Phase 2: File Processing API

- File upload handlers
- Markdown/MDX parsing
- Content structure generation

### Phase 3: Theme Customization API

- Design token configuration
- Custom color schemes
- Typography options

### Phase 4: Export API

- Static site generation
- Build configuration
- Deployment hooks

### Phase 5: Search API

- Search index management
- Query handling
- Result formatting

---

## Best Practices

1. **Centralize Content**: Keep all text in `content.ts`
2. **Type Safety**: Use TypeScript interfaces for all data structures
3. **Consistent Naming**: Follow established naming conventions
4. **Documentation**: Document complex data transformations
5. **Validation**: Validate external data at boundaries

---

**Related Documents**:

- [Component Library](./COMPONENTS.md) - Component usage examples
- [Architecture Guide](./ARCHITECTURE.md) - System design
- [Development Guide](./DEVELOPMENT.md) - Development workflow
