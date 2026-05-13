# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server at http://localhost:3000
npm run build        # Production build → dist/
npm run preview      # Serve the production build locally
npm run lint         # ESLint, fails on any warning (--max-warnings 0)
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run typecheck    # tsc --noEmit (TypeScript check without emitting)
npm run test         # Vitest in watch mode
npm run test:run     # Vitest single run (use before committing)
npm run e2e          # Playwright end-to-end tests (requires a running dev server)
```

To run a single unit test file: `npx vitest run src/components/FAQ.test.tsx`

Pre-commit hook runs `lint-staged`: ESLint --fix + Prettier --write on staged `.ts`/`.tsx`/`.js`/`.jsx` files.

## Architecture

DocuGen is a **single-page marketing/landing site** (no client-side router). Navigation is anchor-based (`#features`, `#pricing`, etc.). The app has no backend; all content is static.

### Application entry

`main.tsx` → wraps `<App>` in `<ThemeProvider>` → `App.tsx` renders the full page as a vertical stack of sections.

Above-fold sections (`Hero`, `HowItWorks`, `FAQ`) are eagerly imported. Below-fold sections (`Features`, `Testimonials`, `Preview`, `Pricing`, `Newsletter`) use `React.lazy` + `<Suspense>` for code splitting.

### Content layer

Copy should live in `src/data/content.ts`, which exports named constants (`HERO_COPY`, `FEATURES`, `FAQS`, `PRICING_COPY`, etc.) consumed directly in components. Some components (e.g. `Navbar`) still contain inline strings not yet migrated to `content.ts`; new copy should go in `content.ts`.

### Theme system

`src/lib/ThemeContext.tsx` provides a React Context with `theme`, `toggleTheme`, and `setTheme`. Initial theme is read from `localStorage` (`docugen-theme`) and falls back to `prefers-color-scheme`. Theme is applied by toggling the `dark` class on `<html>`. Tailwind is configured with `darkMode: 'class'`.

Consume theme in components via the `useTheme` hook from `src/lib/useTheme.ts`.

### Design tokens

Custom Tailwind palette defined in `tailwind.config.js`:
- `teal-*` — primary accent color (e.g. `text-teal-400`, `bg-teal-600`)
- `dark-*` / `light-*` — semantic scale for text/backgrounds
- Fonts: `font-sans` → Inter, `font-mono` → JetBrains Mono

Avoid arbitrary Tailwind values (`[...]`); extend the theme instead.

### Animations

Use Framer Motion only for entrance animations (`motion.div` with `initial`/`animate`/`whileInView`). Always set `viewport={{ once: true }}`. Duration: `0.5s` standard, `0.6s` complex. Stagger children with `delay: index * 0.1`. No spring or bounce effects.

## Code Conventions

- **Named exports only** — no default exports for components.
- **Relative imports** — `tsconfig.json` uses `moduleResolution: "bundler"` but has no `baseUrl`/`paths` and `vite.config.ts` has no aliases, so use `./` or `../` paths throughout.
- **Import order**: React → external packages → internal components/utils.
- **No `any` types** — ESLint enforces `@typescript-eslint/no-explicit-any: error`. Use `unknown` with type guards.
- **Unused variables/params** cause build errors (`noUnusedLocals`, `noUnusedParameters` in `tsconfig.json`). Prefix with `_` to suppress if intentional.
- **Component file order**: imports → types/interfaces → constants → helper functions → main component → exports.
- **Component naming**: PascalCase for files and components; camelCase for utilities.

## Testing

Unit tests use Vitest + React Testing Library. Test files live **next to** the component they test with a `.test.tsx` extension (e.g. `FAQ.tsx` → `FAQ.test.tsx`).

`src/test/setup.ts` provides global mocks for every test:
- `localStorage` — vi.fn() mock (reset `beforeEach`)
- `IntersectionObserver` — stubbed no-op class

E2E tests are in `e2e/` using Playwright. They require the dev server to already be running (`npm run dev` in a separate terminal).

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_PLAUSIBLE_DOMAIN` | Enables Plausible analytics (optional; no analytics if unset) |

Prefix all client-side env vars with `VITE_` (Vite requirement).
