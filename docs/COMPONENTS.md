# Component Library Documentation

Complete guide to all components, design system, and usage patterns in DocuGen.

## Table of Contents

- [Design System](#design-system)
- [UI Components](#ui-components)
- [Section Components](#section-components)
- [Layout Components](#layout-components)
- [Utility Components](#utility-components)
- [Hooks](#hooks)
- [Best Practices](#best-practices)

## Design System

### Colors

The design system uses semantic color names with dark mode as default:

| Token             | Dark Mode | Light Mode | Usage             |
| ----------------- | --------- | ---------- | ----------------- |
| `bg-dark-950`     | #020617   | #ffffff    | Page background   |
| `bg-dark-900`     | #0f172a   | #f8fafc    | Card backgrounds  |
| `bg-dark-800`     | #1e293b   | #f1f5f9    | Elevated surfaces |
| `text-dark-100`   | #f1f5f9   | #0f172a    | Primary text      |
| `text-dark-300`   | #cbd5e1   | #475569    | Secondary text    |
| `text-dark-500`   | #64748b   | #64748b    | Muted text        |
| `text-teal-400`   | #2dd4bf   | #0d9488    | Accent/links      |
| `bg-teal-600`     | #0d9488   | #14b8a6    | Primary buttons   |
| `border-dark-700` | #334155   | #e2e8f0    | Borders           |

### Typography

| Element | Font           | Size                             | Weight        | Line Height     |
| ------- | -------------- | -------------------------------- | ------------- | --------------- |
| H1      | Inter          | text-4xl md:text-5xl lg:text-6xl | font-bold     | leading-tight   |
| H2      | Inter          | text-3xl md:text-4xl             | font-bold     | leading-tight   |
| H3      | Inter          | text-xl md:text-2xl              | font-semibold | leading-snug    |
| Body    | Inter          | text-base                        | font-normal   | leading-relaxed |
| Small   | Inter          | text-sm                          | font-normal   | leading-relaxed |
| Code    | JetBrains Mono | text-sm                          | font-normal   | leading-relaxed |

### Spacing Scale

Consistent spacing using Tailwind's default scale:

```
1  = 0.25rem  (4px)
2  = 0.5rem   (8px)
3  = 0.75rem  (12px)
4  = 1rem     (16px)
6  = 1.5rem   (24px)
8  = 2rem     (32px)
12 = 3rem     (48px)
16 = 4rem     (64px)
```

### Border Radius

| Token          | Value   | Usage           |
| -------------- | ------- | --------------- |
| `rounded`      | 0.25rem | Small elements  |
| `rounded-lg`   | 0.5rem  | Buttons, inputs |
| `rounded-xl`   | 0.75rem | Cards           |
| `rounded-2xl`  | 1rem    | Large cards     |
| `rounded-full` | 9999px  | Avatars, pills  |

### Shadows

```css
/* Card shadow */
shadow-lg shadow-dark-950/50

/* Button glow */
shadow-lg shadow-teal-500/25

/* Hover elevation */
hover:shadow-xl hover:shadow-teal-500/20
```

## UI Components

### Button

Multi-variant button component for actions.

**Location**: `src/components/ui/Button.tsx`

**Props**:

| Prop        | Type                                  | Default     | Description            |
| ----------- | ------------------------------------- | ----------- | ---------------------- |
| `children`  | `ReactNode`                           | required    | Button content         |
| `variant`   | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style           |
| `size`      | `'sm' \| 'md' \| 'lg'`                | `'md'`      | Button size            |
| `type`      | `'button' \| 'submit'`                | `'button'`  | HTML button type       |
| `onClick`   | `() => void`                          | undefined   | Click handler          |
| `className` | `string`                              | `''`        | Additional CSS classes |

**Usage Examples**:

```tsx
import { Button } from '@/components/ui/Button';

// Primary button (default)
<Button onClick={handleClick}>Get Started</Button>

// Secondary button
<Button variant="secondary" onClick={handleCancel}>
  Cancel
</Button>

// Ghost button
<Button variant="ghost" onClick={handleLearnMore}>
  Learn More
</Button>

// Different sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Submit button
<Button type="submit" variant="primary">
  Submit
</Button>

// With custom classes
<Button className="w-full mt-4">
  Custom Styled
</Button>
```

**Visual Styles**:

- **Primary**: Teal background, white text, shadow glow
- **Secondary**: Dark background, light text, subtle border
- **Ghost**: Transparent, muted text, hover highlight

**Accessibility**:

- Keyboard focusable
- Focus ring visible
- `aria-pressed` support via state

---

### Input

Form input component with validation support.

**Location**: `src/components/ui/Input.tsx`

**Props**:

| Prop               | Type                       | Default   | Description        |
| ------------------ | -------------------------- | --------- | ------------------ |
| `type`             | `'text' \| 'email'`        | `'text'`  | Input type         |
| `placeholder`      | `string`                   | undefined | Placeholder text   |
| `value`            | `string`                   | undefined | Controlled value   |
| `onChange`         | `(e: ChangeEvent) => void` | undefined | Change handler     |
| `onBlur`           | `() => void`               | undefined | Blur handler       |
| `disabled`         | `boolean`                  | `false`   | Disable input      |
| `className`        | `string`                   | `''`      | Additional classes |
| `aria-invalid`     | `boolean`                  | undefined | Invalid state      |
| `aria-describedby` | `string`                   | undefined | Error message ID   |

**Usage Examples**:

```tsx
import { Input } from '@/components/ui/Input';
import { useState } from 'react';

// Basic input
<Input
  placeholder="Enter your name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

// Email input with validation
const [email, setEmail] = useState('');
const [error, setError] = useState('');

<Input
  type="email"
  placeholder="your@email.com"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  onBlur={() => validateEmail(email)}
  aria-invalid={!!error}
  aria-describedby={error ? 'email-error' : undefined}
/>
{error && <span id="email-error" className="text-red-500">{error}</span>}

// Disabled state
<Input
  disabled
  placeholder="Loading..."
  value={value}
/>

// With custom styling
<Input
  className="bg-transparent border-teal-500"
  placeholder="Custom styled input"
/>
```

**States**:

- **Default**: Dark background, subtle border
- **Focus**: Teal ring, transparent border
- **Disabled**: Reduced opacity, no pointer events
- **Invalid**: Red border (via aria-invalid)

**Accessibility**:

- Full keyboard support
- Screen reader compatible
- Error state announced
- Proper labeling support

---

### Container

Responsive layout wrapper with max-width constraints.

**Location**: `src/components/ui/Container.tsx`

**Props**:

| Prop        | Type        | Default  | Description        |
| ----------- | ----------- | -------- | ------------------ |
| `children`  | `ReactNode` | required | Content to wrap    |
| `className` | `string`    | `''`     | Additional classes |

**Usage Examples**:

```tsx
import { Container } from '@/components/ui/Container';

// Standard container
<Container>
  <h1>Page Content</h1>
</Container>

// With custom classes
<Container className="py-12">
  <section>Section content</section>
</Container>

// Full-width with padding override
<Container className="max-w-none px-0">
  Full-width content
</Container>
```

**Specifications**:

- Max width: `max-w-7xl` (1280px)
- Padding: `px-4 sm:px-6 lg:px-8`
- Centered: `mx-auto`

**Responsive Behavior**:

| Breakpoint   | Padding     |
| ------------ | ----------- |
| Default      | 16px (px-4) |
| sm (640px+)  | 24px (px-6) |
| lg (1024px+) | 32px (px-8) |

---

### Skeleton

Loading placeholder component with multiple variants.

**Location**: `src/components/ui/Skeleton.tsx`

**Props**:

| Prop        | Type                                    | Default  | Description               |
| ----------- | --------------------------------------- | -------- | ------------------------- |
| `variant`   | `'text' \| 'circular' \| 'rectangular'` | `'text'` | Shape variant             |
| `width`     | `number \| string`                      | varies   | Width in px or CSS value  |
| `height`    | `number \| string`                      | varies   | Height in px or CSS value |
| `className` | `string`                                | `''`     | Additional classes        |

**Usage Examples**:

```tsx
import { Skeleton, SkeletonCard, SkeletonButton } from '@/components/ui/Skeleton';

// Text skeleton (default)
<Skeleton />

// Circular skeleton (avatar)
<Skeleton variant="circular" width={40} height={40} />

// Rectangular skeleton (button)
<Skeleton variant="rectangular" width={120} height={40} />

// Custom dimensions
<Skeleton width="75%" height={20} />

// Pre-built patterns
<SkeletonCard />      // Card with avatar and text lines
<SkeletonButton />    // Button-sized rectangle
<SkeletonInput />     // Input-sized rectangle
<SkeletonFeature />   // Feature card layout
<SkeletonTestimonial /> // Testimonial card layout
```

**Variants**:

- **Text**: Rounded rectangle, 100% width, 1em height
- **Circular**: Circle shape, equal width/height
- **Rectangular**: Larger border radius, customizable dimensions

**Animation**:

- Pulse animation (`animate-pulse`)
- Dark background color
- Subtle and unobtrusive

---

## Section Components

### Hero

Main landing section with headline, description, and CTA.

**Location**: `src/components/Hero.tsx`

**Features**:

- Animated entrance with Framer Motion
- Responsive typography
- UploadDemo integration
- Gradient background effects

**Content Source**: `src/data/content.ts` → `hero`

**Usage**:

```tsx
// In App.tsx
import { Hero } from '@/components/Hero';

<Hero />;
```

**Structure**:

```tsx
<Hero>
  ├── Container
  │   ├── Animated headline (h1)
  │   ├── Animated description (p)
  │   ├── CTA Buttons
  │   └── <UploadDemo /> (interactive demo)
```

**Animation Details**:

- Duration: 0.6s
- Delay: staggered (0.1s between elements)
- Effect: fade-in + slide-up
- Trigger: on viewport enter

---

### Features

Grid display of product features with icons.

**Location**: `src/components/Features.tsx`

**Features**:

- Responsive grid layout
- Icon mapping from content
- Hover animations
- Lazy loaded

**Content Source**: `src/data/content.ts` → `features`

**Usage**:

```tsx
// Lazy loaded in App.tsx
const Features = lazy(() => import('@/components/Features'));

<Suspense fallback={<SkeletonFeature />}>
  <Features />
</Suspense>;
```

**Structure**:

```tsx
<Features>
  ├── Section header (animated)
  ├── Feature grid (3 columns on desktop)
  │   └── FeatureCard[]
  │       ├── Icon (from Heroicons)
  │       ├── Title (h3)
  │       └── Description (p)
```

---

### HowItWorks

Step-by-step process explanation section.

**Location**: `src/components/HowItWorks.tsx`

**Features**:

- Numbered steps
- Alternating layout
- Animated illustrations
- Progress indicator

**Content Source**: `src/data/content.ts` → `howItWorks`

**Usage**:

```tsx
import { HowItWorks } from '@/components/HowItWorks';

<HowItWorks />;
```

---

### Pricing

Pricing plans comparison section.

**Location**: `src/components/Pricing.tsx`

**Features**:

- Plan cards with feature lists
- Popular plan highlighting
- Toggle (monthly/yearly)
- CTA buttons

**Content Source**: `src/data/content.ts` → `pricing`

**Usage**:

```tsx
// Lazy loaded
const Pricing = lazy(() => import('@/components/Pricing'));

<Suspense fallback={<div>Loading...</div>}>
  <Pricing />
</Suspense>;
```

---

### FAQ

Accordion-style frequently asked questions.

**Location**: `src/components/FAQ.tsx`

**Features**:

- Expandable/collapsible items
- Smooth height animations
- Plus/minus icons
- Lazy loaded

**Content Source**: `src/data/content.ts` → `faq`

**Usage**:

```tsx
import { FAQ } from '@/components/FAQ';

<FAQ />;
```

---

### Testimonials

Customer testimonial carousel/grid.

**Location**: `src/components/Testimonials.tsx`

**Features**:

- Customer quotes
- Avatar display
- Company/role info
- Lazy loaded

**Content Source**: `src/data/content.ts` → `testimonials`

**Usage**:

```tsx
// Lazy loaded
const Testimonials = lazy(() => import('@/components/Testimonials'));

<Suspense fallback={<SkeletonTestimonial />}>
  <Testimonials />
</Suspense>;
```

---

### Newsletter

Email subscription form.

**Location**: `src/components/Newsletter.tsx`

**Features**:

- Email validation
- Submit handling
- Success/error states
- Loading indicators

**Content Source**: `src/data/content.ts` → `newsletter`

**Usage**:

```tsx
import { Newsletter } from '@/components/Newsletter';

<Newsletter />;
```

**Validation**:

```typescript
// Email validation logic
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
```

---

### Preview

Documentation preview section.

**Location**: `src/components/Preview.tsx`

**Features**:

- Live preview demonstration
- Code/output comparison
- Syntax highlighting preview

**Content Source**: `src/data/content.ts` → `preview`

**Usage**:

```tsx
// Lazy loaded
const Preview = lazy(() => import('@/components/Preview'));

<Suspense fallback={<SkeletonCard />}>
  <Preview />
</Suspense>;
```

---

## Layout Components

### Navbar

Site navigation with mobile responsiveness.

**Location**: `src/components/Navbar.tsx`

**Features**:

- Responsive design
- Mobile menu toggle
- Theme toggle
- Smooth scroll navigation

**Props**: None (uses content from `content.ts`)

**Usage**:

```tsx
import { Navbar } from '@/components/Navbar';

<Navbar />;
```

**Structure**:

```tsx
<Navbar>
  ├── Logo/Brand
  ├── Desktop Navigation
  │   └── NavLink[]
  ├── ThemeToggle
  └── MobileMenuButton
```

---

### MobileMenu

Mobile navigation overlay.

**Location**: `src/components/MobileMenu.tsx`

**Features**:

- Slide-in animation
- Backdrop blur
- Focus trap
- Close on outside click

**Props**:

| Prop      | Type         | Description           |
| --------- | ------------ | --------------------- |
| `isOpen`  | `boolean`    | Menu visibility state |
| `onClose` | `() => void` | Close handler         |

**Usage**:

```tsx
import { MobileMenu } from '@/components/MobileMenu';
import { useState } from 'react';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button onClick={() => setMobileMenuOpen(true)}>Open Menu</button>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
```

---

### Footer

Site footer with links and copyright.

**Location**: `src/components/Footer.tsx`

**Features**:

- Multi-column layout
- Social links
- Copyright notice
- Responsive grid

**Content Source**: `src/data/content.ts` → `footer`

**Usage**:

```tsx
import { Footer } from '@/components/Footer';

<Footer />;
```

---

### ScrollToTop

Floating button to scroll to page top.

**Location**: `src/components/ScrollToTop.tsx`

**Features**:

- Appears after scrolling
- Smooth scroll animation
- Accessibility label

**Usage**:

```tsx
import { ScrollToTop } from '@/components/ScrollToTop';

<ScrollToTop />;
```

---

## Utility Components

### ErrorBoundary

Error handling wrapper for React components.

**Location**: `src/components/ErrorBoundary.tsx`

**Features**:

- Catches JavaScript errors
- Displays fallback UI
- Logs errors for debugging

**Props**:

| Prop       | Type        | Description         |
| ---------- | ----------- | ------------------- |
| `children` | `ReactNode` | Components to wrap  |
| `fallback` | `ReactNode` | UI to show on error |

**Usage**:

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

<ErrorBoundary fallback={<ErrorMessage />}>
  <RiskyComponent />
</ErrorBoundary>;
```

---

### CookieConsent

GDPR-compliant cookie consent banner.

**Location**: `src/components/CookieConsent.tsx`

**Features**:

- Persistent preference storage
- Accept/Reject options
- Privacy policy link
- Non-intrusive design

**Usage**:

```tsx
import { CookieConsent } from '@/components/CookieConsent';

<CookieConsent />;
```

---

### Analytics

Analytics tracking integration.

**Location**: `src/components/Analytics.tsx`

**Features**:

- Page view tracking
- Custom event support
- Privacy-compliant

**Usage**:

```tsx
import { Analytics } from '@/components/Analytics';

<Analytics />;
```

---

### ShareButtons

Social media sharing buttons.

**Location**: `src/components/ShareButtons.tsx`

**Features**:

- Multiple platform support
- URL generation
- Copy to clipboard

**Props**:

| Prop    | Type     | Description  |
| ------- | -------- | ------------ |
| `url`   | `string` | URL to share |
| `title` | `string` | Share title  |

**Usage**:

```tsx
import { ShareButtons } from '@/components/ShareButtons';

<ShareButtons url="https://docugen.app" title="Check out DocuGen!" />;
```

---

## Hooks

### useTheme

Custom hook for accessing theme context.

**Location**: `src/lib/useTheme.ts`

**Returns**:

```typescript
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;
}
```

**Usage**:

```tsx
import { useTheme } from '@/lib/useTheme';

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

**Error Handling**:

Throws error if used outside `ThemeProvider`:

```
useTheme must be used within a ThemeProvider
```

---

## Best Practices

### Component Composition

Build complex UIs from simple components:

```tsx
// Good - Composable
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardBody>
    <Button>Action</Button>
  </CardBody>
</Card>

// Bad - Monolithic
<ComplexCard
  title="Title"
  buttonText="Action"
  onButtonClick={handleClick}
/>
```

### Props Design

- Use optional props with sensible defaults
- Keep props focused and minimal
- Use composition for flexibility

```tsx
// Good - Minimal props
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

// Bad - Too many props
interface ButtonProps {
  text: string;
  color: string;
  backgroundColor: string;
  fontSize: number;
  // ... too many
}
```

### Styling Patterns

- Use Tailwind utility classes
- Follow design system tokens
- Avoid arbitrary values

```tsx
// Good - Design tokens
<div className="bg-dark-900 p-6 rounded-xl">

// Bad - Arbitrary values
<div className="bg-[#0f172a] p-[25px] rounded-[12px]">
```

### Accessibility

- Include proper ARIA labels
- Support keyboard navigation
- Maintain focus management
- Test with screen readers

```tsx
// Good - Accessible
<button
  onClick={handleClick}
  aria-label="Close dialog"
  aria-pressed={isOpen}
>
  <CloseIcon />
</button>

// Bad - Inaccessible
<div onClick={handleClick}>
  <CloseIcon />
</div>
```

### Performance

- Use `React.memo()` for expensive renders
- Lazy load non-critical components
- Optimize images
- Measure before optimizing

```tsx
// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

<Suspense fallback={<Skeleton />}>
  <HeavyComponent />
</Suspense>;
```

### Testing

- Test component behavior, not implementation
- Use Testing Library queries
- Mock external dependencies

```tsx
// Good - Test behavior
test('button calls onClick when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  fireEvent.click(screen.getByText('Click me'));
  expect(handleClick).toHaveBeenCalled();
});
```

---

## Related Documentation

- [Architecture Guide](./ARCHITECTURE.md) - System design
- [Development Guide](./DEVELOPMENT.md) - Development workflow
- [Testing Guide](./TESTING.md) - Testing patterns
- [API Documentation](./API.md) - API endpoints and data structures
