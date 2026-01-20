# Suggested Issues for DocuGen

This document contains detailed issue proposals for the DocuGen project. These can be used to create GitHub issues to track work and improvements.

---

## 🚀 Feature Requests

### Issue #1: Add Dark/Light Mode Toggle

**Title:** Add dark/light mode toggle to the navigation bar

**Labels:** `enhancement`, `ui`, `good first issue`

**Description:**
Currently, DocuGen defaults to dark mode. While the dark theme is visually appealing, some users prefer light mode, especially during daytime use or for accessibility reasons.

**Acceptance Criteria:**
- [ ] Add a theme toggle button (sun/moon icon) to the Navbar component
- [ ] Implement theme state management using React context or local state
- [ ] Persist theme preference in localStorage
- [ ] Update Tailwind configuration to support both themes
- [ ] Ensure all components render correctly in both modes
- [ ] Add smooth transition animation when switching themes

**Technical Notes:**
- Tailwind CSS supports dark mode via the `dark:` prefix
- Consider using `prefers-color-scheme` media query for system preference detection
- Store preference in localStorage with key like `docugen-theme`

**Files to Modify:**
- `src/components/Navbar.tsx`
- `tailwind.config.js`
- `src/App.tsx`
- `index.html` (for initial dark class)

---

### Issue #2: Implement Mobile Navigation Menu (Hamburger Menu)

**Title:** Add responsive mobile navigation menu

**Labels:** `enhancement`, `ui`, `responsive`, `priority: high`

**Description:**
The current navigation bar doesn't have a mobile-friendly hamburger menu. On smaller screens, the navigation links may overflow or become difficult to access.

**Acceptance Criteria:**
- [ ] Create a hamburger menu icon that appears on mobile breakpoints (< 768px)
- [ ] Implement a slide-out or dropdown menu for mobile navigation
- [ ] Add smooth open/close animations using Framer Motion
- [ ] Ensure menu closes when clicking outside or on a link
- [ ] Maintain keyboard accessibility (escape to close, focus trap)

**Technical Notes:**
- Use Framer Motion's `AnimatePresence` for enter/exit animations
- Consider a full-screen overlay on mobile for better UX
- Hide desktop nav links and show hamburger icon using Tailwind responsive prefixes

**Files to Modify:**
- `src/components/Navbar.tsx`
- Potentially create `src/components/MobileMenu.tsx`

---

### Issue #3: Add Scroll-to-Top Button

**Title:** Implement floating scroll-to-top button

**Labels:** `enhancement`, `ui`, `good first issue`

**Description:**
When users scroll down the landing page, it would be helpful to have a floating button that smoothly scrolls them back to the top.

**Acceptance Criteria:**
- [ ] Create a floating button that appears after scrolling 300px down
- [ ] Button should fade in/out smoothly
- [ ] Implement smooth scroll to top on click
- [ ] Position fixed at bottom-right corner
- [ ] Match existing design system (teal accent color, dark background)

**Technical Notes:**
- Use `window.scrollY` in a scroll event listener or Intersection Observer
- Use `window.scrollTo({ top: 0, behavior: 'smooth' })` for scrolling
- Add entrance/exit animations with Framer Motion

**Files to Create:**
- `src/components/ScrollToTop.tsx`

**Files to Modify:**
- `src/App.tsx`

---

### Issue #4: Add Testimonials Section

**Title:** Create testimonials/social proof section

**Labels:** `enhancement`, `content`, `priority: medium`

**Description:**
Adding a testimonials section would increase trust and social proof for potential users. This section should display quotes from developers who have used DocuGen.

**Acceptance Criteria:**
- [ ] Create a new `Testimonials.tsx` component
- [ ] Design cards that display quote, author name, role, and company/avatar
- [ ] Add responsive grid layout (1 column mobile, 2-3 columns desktop)
- [ ] Include Framer Motion entrance animations consistent with other sections
- [ ] Add testimonial content to `src/data/content.ts`

**Design Considerations:**
- Consider a carousel/slider for mobile to save vertical space
- Use subtle quote icons or decorative elements
- Maintain dark theme consistency

**Files to Create:**
- `src/components/Testimonials.tsx`

**Files to Modify:**
- `src/data/content.ts`
- `src/App.tsx`

---

### Issue #5: Add FAQ Section

**Title:** Create an FAQ (Frequently Asked Questions) section

**Labels:** `enhancement`, `content`, `good first issue`

**Description:**
An FAQ section would help answer common questions potential users might have about DocuGen, reducing support inquiries and improving conversion.

**Acceptance Criteria:**
- [ ] Create expandable/collapsible FAQ items with accordion behavior
- [ ] Only one item should be expanded at a time (optional: allow multiple)
- [ ] Add smooth expand/collapse animations
- [ ] Include at least 5-7 relevant questions and answers
- [ ] Ensure keyboard accessibility (Enter/Space to toggle)

**Suggested FAQ Topics:**
1. What file formats does DocuGen support?
2. Is there a free tier?
3. Can I use my own domain?
4. How does the AI structuring work?
5. Can I export my documentation site?
6. Is there version control integration?
7. How is my data stored and protected?

**Files to Create:**
- `src/components/FAQ.tsx`

**Files to Modify:**
- `src/data/content.ts`
- `src/App.tsx`

---

### Issue #6: Add File Upload Drag-and-Drop Demo

**Title:** Create interactive drag-and-drop file upload demo in Hero section

**Labels:** `enhancement`, `interactive`, `priority: medium`

**Description:**
To showcase DocuGen's core functionality, add an interactive demo area where users can drag and drop Markdown files to see a preview of the documentation generation process.

**Acceptance Criteria:**
- [ ] Create a drop zone UI component with dashed border and upload icon
- [ ] Implement drag-and-drop file handling (HTML5 Drag and Drop API)
- [ ] Accept `.md`, `.mdx` file types only
- [ ] Show visual feedback when dragging files over the drop zone
- [ ] Display a mock preview or success message after file drop (no actual processing needed)
- [ ] Add "or click to browse" fallback for clicking

**Technical Notes:**
- Use `onDragOver`, `onDragEnter`, `onDragLeave`, `onDrop` events
- Consider using `react-dropzone` library for robust implementation
- This is a demo only—no backend processing required

**Files to Create:**
- `src/components/UploadDemo.tsx`

**Files to Modify:**
- `src/components/Hero.tsx` or `src/components/Preview.tsx`

---

### Issue #7: Add Loading/Skeleton States

**Title:** Implement loading skeletons for smoother perceived performance

**Labels:** `enhancement`, `ux`, `good first issue`

**Description:**
Add skeleton loading states for components to improve perceived performance, especially if real data fetching is added in the future.

**Acceptance Criteria:**
- [ ] Create reusable `Skeleton` component with pulse animation
- [ ] Implement skeleton variants: text line, card, image
- [ ] Match dark theme colors (dark-800/dark-700 gradient animation)

**Files to Create:**
- `src/components/ui/Skeleton.tsx`

---

### Issue #8: Add Cookie Consent Banner

**Title:** Implement cookie consent banner for GDPR compliance

**Labels:** `enhancement`, `legal`, `priority: low`

**Description:**
For legal compliance (GDPR, CCPA), the landing page should include a cookie consent banner that allows users to accept or manage cookie preferences.

**Acceptance Criteria:**
- [ ] Create a cookie consent banner that appears on first visit
- [ ] Include options to accept all cookies or manage preferences
- [ ] Store consent preference in localStorage
- [ ] Banner should appear at bottom of screen and be dismissible
- [ ] Include link to Privacy Policy

**Files to Create:**
- `src/components/CookieConsent.tsx`

**Files to Modify:**
- `src/App.tsx`

---

## 🐛 Bug Fixes / Improvements

### Issue #9: Fix Anchor Link Smooth Scrolling with Navbar Offset

**Title:** Fix smooth scroll offset for anchor links to account for fixed navbar

**Labels:** `bug`, `ui`, `good first issue`

**Description:**
When clicking navigation links (Features, How it Works, Pricing), the page scrolls but the section header might be hidden behind the fixed navbar.

**Acceptance Criteria:**
- [ ] Add appropriate scroll-padding-top to account for navbar height
- [ ] Or implement JavaScript smooth scroll with offset calculation
- [ ] Test on all anchor links in navigation

**Solution Options:**
1. CSS: Add `scroll-padding-top` to the `<html>` element
2. JS: Use `scrollIntoView` with offset calculation

**Files to Modify:**
- `src/index.css` or `index.html`

---

### Issue #10: Add Proper Email Validation to Newsletter Form

**Title:** Implement comprehensive email validation for newsletter signup

**Labels:** `bug`, `forms`, `priority: medium`

**Description:**
The current newsletter form only checks if the email field is not empty. It should validate that the input is a properly formatted email address.

**Acceptance Criteria:**
- [ ] Add regex-based email validation
- [ ] Show inline error message for invalid emails
- [ ] Prevent form submission if email is invalid
- [ ] Add visual feedback (border color change) for validation state
- [ ] Consider adding rate limiting or debounce for validation

**Technical Notes:**
- Consider using the HTML5 `email` input type's built-in validation as a first layer
- For more robust validation, consider using a library like `validator.js` or `email-validator`
- Basic regex example (note: no regex can perfectly validate emails per RFC 5322):
```typescript
// Simple validation - catches most common issues
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};
```
- For production, recommend using `email.includes('@') && email.split('@')[1]?.includes('.')` combined with HTML5 validation

**Files to Modify:**
- `src/components/Newsletter.tsx`

---

### Issue #11: Add Aria Labels and Improve Accessibility

**Title:** Improve accessibility with ARIA labels and semantic HTML

**Labels:** `accessibility`, `a11y`, `priority: high`

**Description:**
Ensure the landing page is fully accessible to users with screen readers and keyboard navigation.

**Acceptance Criteria:**
- [ ] Add `aria-label` attributes to icon-only buttons
- [ ] Ensure all interactive elements are keyboard accessible
- [ ] Add proper heading hierarchy (h1, h2, h3 in order)
- [ ] Add `role` attributes where appropriate
- [ ] Test with screen reader (VoiceOver, NVDA)
- [ ] Ensure sufficient color contrast ratios (WCAG AA)
- [ ] Add skip-to-content link

**Files to Modify:**
- `src/components/Navbar.tsx`
- `src/components/Hero.tsx`
- `src/components/Features.tsx`
- `src/components/ui/Button.tsx`

---

### Issue #12: Optimize Bundle Size and Performance

**Title:** Audit and optimize bundle size for faster loading

**Labels:** `performance`, `optimization`, `priority: medium`

**Description:**
Review the current bundle size and implement optimizations to improve initial load time and Lighthouse performance score.

**Acceptance Criteria:**
- [ ] Run `npm run build` and analyze bundle size
- [ ] Implement code splitting for non-critical components
- [ ] Lazy load below-the-fold sections
- [ ] Optimize Framer Motion imports (tree-shake unused features)
- [ ] Add font-display: swap for web fonts
- [ ] Consider preloading critical assets

**Technical Notes:**
```typescript
// Lazy loading example (in src/App.tsx)
import { lazy, Suspense } from 'react';

// Lazy load below-the-fold components
const Features = lazy(() => import('./components/Features'));
const Pricing = lazy(() => import('./components/Pricing'));

// Wrap lazy components in Suspense
<Suspense fallback={<div className="h-96" />}>
  <Features />
</Suspense>
```

**Files to Modify:**
- `src/App.tsx`
- `src/main.tsx`
- `index.html`

---

### Issue #13: Add Proper Meta Tags and SEO Optimization

**Title:** Implement comprehensive SEO meta tags and Open Graph data

**Labels:** `seo`, `marketing`, `priority: high`

**Description:**
Add proper meta tags for search engine optimization and social media sharing.

**Acceptance Criteria:**
- [ ] Add meta description tag
- [ ] Add Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] Add Twitter Card meta tags
- [ ] Add canonical URL
- [ ] Add structured data (JSON-LD) for organization/product
- [ ] Create social media preview image (og:image)
- [ ] Add favicon in multiple sizes

**Files to Modify:**
- `index.html`
- `public/` (add social images, favicon)

---

### Issue #14: Add Error Boundary for Graceful Error Handling

**Title:** Implement React Error Boundary for production error handling

**Labels:** `enhancement`, `reliability`, `good first issue`

**Description:**
Add an Error Boundary component to catch JavaScript errors anywhere in the component tree and display a fallback UI instead of crashing the entire app.

**Acceptance Criteria:**
- [ ] Create ErrorBoundary class component
- [ ] Design a friendly fallback UI with retry option
- [ ] Log errors for debugging (console in dev, could integrate with service in prod)
- [ ] Wrap main App content with ErrorBoundary

**Files to Create:**
- `src/components/ErrorBoundary.tsx`

**Files to Modify:**
- `src/App.tsx`

---

## 📚 Documentation

### Issue #15: Add Contributing Guidelines

**Title:** Create CONTRIBUTING.md with contribution guidelines

**Labels:** `documentation`, `community`, `good first issue`

**Description:**
Create a contributing guide to help new contributors understand how to contribute to the project.

**Acceptance Criteria:**
- [ ] Create `CONTRIBUTING.md` file
- [ ] Include sections on:
  - How to set up the development environment
  - Code style guidelines (reference AGENTS.md)
  - How to submit a pull request
  - Issue reporting guidelines
  - Code of conduct reference

**Files to Create:**
- `CONTRIBUTING.md`

---

### Issue #16: Add Code of Conduct

**Title:** Add CODE_OF_CONDUCT.md for community guidelines

**Labels:** `documentation`, `community`, `good first issue`

**Description:**
Add a code of conduct to establish community standards and expectations for contributor behavior.

**Acceptance Criteria:**
- [ ] Create `CODE_OF_CONDUCT.md`
- [ ] Consider adopting Contributor Covenant
- [ ] Include enforcement guidelines and contact information

**Files to Create:**
- `CODE_OF_CONDUCT.md`

---

### Issue #17: Add Storybook for Component Documentation

**Title:** Set up Storybook for component documentation and testing

**Labels:** `documentation`, `tooling`, `priority: low`

**Description:**
Set up Storybook to document and showcase UI components in isolation, making it easier for developers to understand and use the design system.

**Acceptance Criteria:**
- [ ] Install and configure Storybook for React/Vite
- [ ] Create stories for all UI components (Button, Input, Container)
- [ ] Document component props and variants
- [ ] Add usage examples

**Dependencies to Add:**
- `@storybook/react`
- `@storybook/builder-vite`

---

## 🧪 Testing

### Issue #18: Set Up Testing Infrastructure with Vitest

**Title:** Configure Vitest for unit and component testing

**Labels:** `testing`, `infrastructure`, `priority: high`

**Description:**
Currently, the project has no testing framework configured. Set up Vitest (which integrates well with Vite) for unit and component testing.

**Acceptance Criteria:**
- [ ] Install Vitest and testing libraries
- [ ] Configure Vitest in `vite.config.ts`
- [ ] Add test scripts to `package.json`
- [ ] Create initial tests for utility functions
- [ ] Set up React Testing Library for component tests
- [ ] Add a sample component test

**Dependencies to Add:**
- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `jsdom`

**Files to Create:**
- `src/lib/utils.test.ts`
- `src/components/ui/Button.test.tsx`

**Files to Modify:**
- `package.json`
- `vite.config.ts`

---

### Issue #19: Add End-to-End Tests with Playwright

**Title:** Set up Playwright for E2E testing

**Labels:** `testing`, `e2e`, `priority: medium`

**Description:**
Add end-to-end tests using Playwright to ensure the landing page works correctly across different browsers.

**Acceptance Criteria:**
- [ ] Install and configure Playwright
- [ ] Create tests for:
  - Page loads correctly
  - Navigation links work
  - Newsletter form submission
  - Responsive behavior
- [ ] Add E2E test scripts to package.json
- [ ] Configure CI to run E2E tests

**Dependencies to Add:**
- `@playwright/test`

**Files to Create:**
- `playwright.config.ts`
- `e2e/landing.spec.ts`

---

## 🔧 DevOps & Tooling

### Issue #20: Add GitHub Actions CI/CD Pipeline

**Title:** Set up GitHub Actions for continuous integration

**Labels:** `devops`, `ci/cd`, `priority: high`

**Description:**
Implement a GitHub Actions workflow to automatically lint, build, and test the project on every pull request.

**Acceptance Criteria:**
- [ ] Create `.github/workflows/ci.yml`
- [ ] Run linting on PRs
- [ ] Run TypeScript type checking
- [ ] Run build to ensure no compilation errors
- [ ] Run tests (when testing is set up)
- [ ] Cache node_modules for faster CI runs

**Files to Create:**
- `.github/workflows/ci.yml`

---

### Issue #21: Add Prettier for Code Formatting

**Title:** Configure Prettier for consistent code formatting

**Labels:** `tooling`, `dx`, `good first issue`

**Description:**
Add Prettier to enforce consistent code formatting across the project.

**Acceptance Criteria:**
- [ ] Install Prettier
- [ ] Create `.prettierrc` configuration file
- [ ] Create `.prettierignore` file
- [ ] Add format scripts to package.json
- [ ] Configure ESLint to work with Prettier (avoid conflicts)
- [ ] Format existing codebase

**Dependencies to Add:**
- `prettier`
- `eslint-config-prettier`

**Files to Create:**
- `.prettierrc`
- `.prettierignore`

**Files to Modify:**
- `package.json`
- `.eslintrc.cjs`

---

### Issue #22: Add Husky and lint-staged for Pre-commit Hooks

**Title:** Set up pre-commit hooks with Husky and lint-staged

**Labels:** `tooling`, `dx`, `priority: medium`

**Description:**
Implement pre-commit hooks to automatically lint and format code before commits, ensuring code quality.

**Acceptance Criteria:**
- [ ] Install Husky and lint-staged
- [ ] Configure pre-commit hook to run lint-staged
- [ ] Run ESLint on staged `.ts` and `.tsx` files
- [ ] Run Prettier on staged files
- [ ] Document setup in README

**Dependencies to Add:**
- `husky`
- `lint-staged`

**Files to Create:**
- `.husky/pre-commit`
- `.lintstagedrc`

**Files to Modify:**
- `package.json`

---

### Issue #23: Add Dependabot Configuration

**Title:** Configure Dependabot for automated dependency updates

**Labels:** `devops`, `security`, `good first issue`

**Description:**
Set up Dependabot to automatically create PRs for dependency updates, keeping the project secure and up-to-date.

**Acceptance Criteria:**
- [ ] Create `.github/dependabot.yml`
- [ ] Configure weekly npm dependency updates
- [ ] Set appropriate reviewers and labels
- [ ] Consider grouping minor/patch updates

**Files to Create:**
- `.github/dependabot.yml`

---

## 🎨 Design & UX

### Issue #24: Add Animated Gradient Background to Hero Section

**Title:** Enhance Hero section with animated gradient background

**Labels:** `enhancement`, `design`, `priority: low`

**Description:**
Add a subtle animated gradient background to the hero section to create more visual interest and depth.

**Acceptance Criteria:**
- [ ] Create animated gradient using CSS or Framer Motion
- [ ] Ensure animation is subtle and not distracting
- [ ] Optimize for performance (use GPU-accelerated properties)
- [ ] Consider reduced-motion preference for accessibility

**Technical Notes:**
- Use CSS `@keyframes` with `background-position` animation
- Or use Framer Motion for more complex animations
- Respect `prefers-reduced-motion` media query

**Files to Modify:**
- `src/components/Hero.tsx`
- `src/index.css`

---

### Issue #25: Add Social Media Share Buttons

**Title:** Add social sharing buttons to the page

**Labels:** `enhancement`, `marketing`, `good first issue`

**Description:**
Add social media sharing buttons to allow users to easily share DocuGen with their networks.

**Acceptance Criteria:**
- [ ] Create ShareButtons component with Twitter, LinkedIn, and copy link options
- [ ] Position in footer or as floating sidebar
- [ ] Include appropriate sharing URLs and pre-filled text
- [ ] Add hover effects consistent with design system

**Files to Create:**
- `src/components/ShareButtons.tsx`

**Files to Modify:**
- `src/components/Footer.tsx` or `src/App.tsx`

---

## 🔐 Security

### Issue #26: Add Security Headers Configuration

**Title:** Document and implement security headers for production deployment

**Labels:** `security`, `documentation`, `priority: medium`

**Description:**
Document the recommended security headers for production deployment and provide configuration examples.

**Acceptance Criteria:**
- [ ] Document recommended headers in README or deployment docs:
  - Content-Security-Policy
  - X-Frame-Options
  - X-Content-Type-Options
  - Referrer-Policy
  - Permissions-Policy
- [ ] Provide Vercel configuration example (`vercel.json`)
- [ ] Provide Netlify configuration example (`_headers`)

**Files to Create:**
- `vercel.json` (or document in README)

---

### Issue #27: Add Security Policy

**Title:** Create SECURITY.md for vulnerability reporting

**Labels:** `security`, `documentation`, `good first issue`

**Description:**
Add a security policy document to provide guidelines for reporting security vulnerabilities.

**Acceptance Criteria:**
- [ ] Create `SECURITY.md`
- [ ] Include supported versions
- [ ] Provide clear instructions for reporting vulnerabilities
- [ ] Define expected response time and disclosure policy

**Files to Create:**
- `SECURITY.md`

---

## 📊 Analytics & Monitoring

### Issue #28: Add Analytics Integration Support

**Title:** Add optional analytics integration (privacy-respecting)

**Labels:** `enhancement`, `analytics`, `priority: low`

**Description:**
Add support for privacy-respecting analytics to track page views and user interactions without compromising user privacy.

**Acceptance Criteria:**
- [ ] Create optional analytics wrapper component
- [ ] Support for popular privacy-focused options:
  - Plausible Analytics
  - Fathom Analytics
  - Simple Analytics
- [ ] Document how to enable and configure analytics
- [ ] Ensure analytics are not loaded if not configured

**Files to Create:**
- `src/components/Analytics.tsx`

**Files to Modify:**
- `src/App.tsx`
- `README.md`

---

## Summary

| Category | Issue Count |
|----------|-------------|
| Feature Requests | 8 |
| Bug Fixes/Improvements | 6 |
| Documentation | 3 |
| Testing | 2 |
| DevOps & Tooling | 4 |
| Design & UX | 2 |
| Security | 2 |
| Analytics | 1 |
| **Total** | **28** |

### Priority Matrix

**High Priority:**
- Issue #2: Mobile Navigation Menu
- Issue #11: Accessibility Improvements
- Issue #13: SEO Optimization
- Issue #18: Testing Infrastructure
- Issue #20: CI/CD Pipeline

**Medium Priority:**
- Issue #4: Testimonials Section
- Issue #6: File Upload Demo
- Issue #10: Email Validation
- Issue #12: Performance Optimization
- Issue #22: Pre-commit Hooks
- Issue #26: Security Headers

**Good First Issues (for new contributors):**
- Issue #1: Dark/Light Mode Toggle
- Issue #3: Scroll-to-Top Button
- Issue #5: FAQ Section
- Issue #7: Loading Skeletons
- Issue #9: Smooth Scroll Offset
- Issue #14: Error Boundary
- Issue #15: Contributing Guidelines
- Issue #16: Code of Conduct
- Issue #21: Prettier Configuration
- Issue #23: Dependabot Configuration
- Issue #25: Social Share Buttons
- Issue #27: Security Policy
