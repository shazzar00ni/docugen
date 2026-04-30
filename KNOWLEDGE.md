# Knowledge: DocuGen Patterns & Conventions

This document captures architectural decisions, patterns, and conventions that are implemented in the codebase but not formally documented elsewhere.

---

## 1. Centralized Content Management

All site copy lives in a single file: **`src/data/content.ts`**

- Components import content from this central source rather than containing inline text
- Export naming convention: uppercase constants (`SITE`, `NAV_LINKS`, `HERO_COPY`, `FEATURES`, `FAQS`, etc.)
- Content is organized by feature/section

```typescript
// Example structure
export const SITE = { name: 'DocuGen', tagline: '...', ... };
export const HERO_COPY = { headline: '...', subheadline: '...', ... };
export const FEATURES = [{ icon: '...', title: '...', ... }, ...];
export const FAQS = [{ question: '...', answer: '...', ... }];
```

**Rationale:** Enables copy updates without touching component logic. Supports i18n migration.

---

## 2. CSS Class Utility (`cn()`)

**Location:** `src/lib/utils.ts`

```typescript
cn(...classes: (string | undefined | null | false)[]): string
```

Filters falsy values and joins class names with spaces.

```tsx
<button className={cn('base-class', isActive && 'active-class', className)}>
```

**Used throughout:** All components use this pattern for conditional styling.

---

## 3. Lazy Loading Strategy

**Location:** `src/App.tsx`

- Page-critical sections use static imports: `Hero`, `HowItWorks`, `FAQ`, `Navbar`, `Footer`
- Heavy sections are lazy-loaded: `Features`, `Testimonials`, `Preview`, `Pricing`, `Newsletter`

```typescript
const Features = lazy(() =>
  import('./components/Features').then(module => ({ default: module.Features }))
);
```

- Each lazy component wrapped in `<Suspense fallback={<Loading />} />`
- Custom `Loading` spinner component for consistent loading UI

**Rationale:** Improves initial bundle load time. Critical path content renders immediately.

---

## 4. UI Component Library

**Location:** `src/components/ui/`

### Button

- Variants: `primary` (teal), `secondary` (dark), `ghost` (text)
- Sizes: `sm`, `md`, `lg`
- Props: `children`, `variant?`, `size?`, `className?`, `onClick?`, `type?`

### Input

- Dark theme styling with teal focus ring
- Supports `text` and `email` types
- Props: `placeholder?`, `type?`, `className?`, `disabled?`, `value?`, `onChange?`, `onBlur?`
- Supports all standard HTML input attributes via spread

### Container

- Responsive max-width wrapper (`max-w-7xl`)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Props: `children`, `className?`

### Skeleton

- Base component with variants: `text`, `circular`, `rectangular`
- Pre-built composite components:
  - `SkeletonCard` - user card with avatar
  - `SkeletonButton` - standard button dimensions
  - `SkeletonInput` - form input height
  - `SkeletonFeature` - icon + title + description
  - `SkeletonTestimonial` - quote + author info

---

## 5. Theme System Architecture

**Location:** `src/lib/ThemeContext.tsx`

### Components

- `ThemeProvider` - wraps app, manages state
- `useTheme()` - hook for components (throws if used outside provider)
- Types: `Theme = 'dark' | 'light'`

### Behavior

- Initial theme from `localStorage` key `docugen-theme`, fallback to `prefers-color-scheme`
- Tailwind dark mode via `document.documentElement.classList.add('dark')` / `remove('dark')`
- Theme persistence wrapped in try-catch (non-critical)

```typescript
// In components
const { theme, toggleTheme } = useTheme();
```

---

## 6. Testing Patterns

### Test Location

- Tests co-located: `Component.test.tsx` next to `Component.tsx`
- Glob pattern: `src/**/*.test.{ts,tsx}`

### Test Setup (`src/test/setup.ts`)

- Global mocks:
  - `IntersectionObserver` - stub implementation
  - `localStorage` - mocked with `vi.fn()` for `getItem`, `setItem`, `clear`, `removeItem`
- Reset between tests: `localStorageMock.clear.mockClear()` and `mockReturnValue(null)`
- Uses `afterEach(cleanup())` from RTL

### Mock Pattern

```typescript
beforeEach(() => {
  localStorageMock.clear.mockClear();
  localStorageMock.getItem.mockClear();
  localStorageMock.setItem.mockClear();
  localStorageMock.getItem.mockReturnValue(null);
});
```

---

## 7. Analytics Integration

**Location:** `src/components/Analytics.tsx`

- Conditionally injects Plausible analytics
- Reads domain from `import.meta.env.VITE_PLAUSIBLE_DOMAIN`
- Script attributes: `defer`, `data-domain`
- Cleanup: removes script on unmount

```typescript
// Environment variable
VITE_PLAUSIBLE_DOMAIN = your - domain.com;
```

---

## 8. Custom Color Palette

**Location:** `tailwind.config.js`

### Extended Colors

- `light/*` - Light theme palette (50-950)
- `teal/*` - Brand accent color (50-950)
- `dark/*` - Dark theme palette (50-950)

### Custom Animations

- `fade-in` - opacity 0→1 over 0.5s
- `slide-up` - translateY(20px)→0 + fade over 0.6s
- `slide-up-delayed` - same with 0.2s delay

### Fonts

- Sans: `Inter` + system fallbacks
- Mono: `JetBrains Mono` + `Fira Code` fallbacks

---

## 9. Environment Variable Conventions

- Uses Vite `import.meta.env` (not `process.env`)
- Prefix: `VITE_` required for client-side variables
- Example: `VITE_PLAUSIBLE_DOMAIN`

---

## 10. Error & State Patterns

### ErrorBoundary

- Class component using `getDerivedStateFromError` + `componentDidCatch`
- Console logs errors with component stack
- Supports custom `fallback` prop
- Default fallback includes retry button

### Accordion (FAQ pattern)

- Single-item-open pattern (`openIndex: number | null`)
- Toggle handler: `setOpenIndex(prev === index ? null : index)`
- Animations via Framer Motion `AnimatePresence` + `height: auto`

---

## 11. Accessibility Patterns

- `aria-expanded` on collapsible buttons
- `aria-label` on icon-only buttons
- `role="dialog"` + `aria-label` + `aria-describedby` on modals
- `aria-invalid` on form inputs
- Focus ring styles on all interactive elements

---

## 12. Dev Server

- Vite dev server runs on **port 3000** (configured in `vite.config.ts`)
- Preview command serves production build on same port
- E2E tests target `http://localhost:5173` (Playwright default)

---

_Last updated: 2026-04-24_
