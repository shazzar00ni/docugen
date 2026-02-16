# Development Guide

Complete guide for setting up the DocuGen development environment, understanding the workflow, and contributing effectively.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Code Style & Standards](#code-style--standards)
- [Git Workflow](#git-workflow)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js**: Version 18 or higher
  ```bash
  node --version  # Should show v18.x.x or higher
  ```
- **npm**: Version 8 or higher (comes with Node.js)

  ```bash
  npm --version  # Should show 8.x.x or higher
  ```

- **Git**: For version control
  ```bash
  git --version
  ```

### Recommended Tools

- **VS Code**: With recommended extensions (see [Editor Setup](#editor-setup))
- **Node Version Manager (nvm)**: For managing Node.js versions

### Verify Prerequisites

Run this command to check all prerequisites:

```bash
node --version && npm --version && git --version
```

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/shazzar00ni/docugen.git
cd docugen
```

### 2. Install Dependencies

```bash
npm install
```

This installs all required dependencies including:

- React 19 and React DOM
- TypeScript and build tools
- Development utilities (ESLint, Prettier, Vitest)
- UI libraries (Framer Motion, Tailwind CSS)

### 3. Verify Setup

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser. You should see the DocuGen landing page.

### 4. Run Tests

Verify everything is working:

```bash
npm run test:run
```

All tests should pass.

## Development Workflow

### Daily Development Cycle

1. **Start Development Server**

   ```bash
   npm run dev
   ```

   Keep this running in a terminal window.

2. **Make Changes**
   - Edit files in `src/`
   - See changes instantly with HMR (Hot Module Replacement)
   - Check browser console for errors

3. **Run Tests**

   ```bash
   npm run test
   ```

   Run in watch mode during development.

4. **Check Code Quality**

   ```bash
   npm run lint
   ```

   Fix any linting errors before committing.

5. **Format Code**
   ```bash
   npm run format
   ```
   Or let pre-commit hooks handle this automatically.

### Feature Development Process

1. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Implement Feature**
   - Write code following [Code Style](#code-style--standards)
   - Add tests for new functionality
   - Update documentation if needed

3. **Verify Changes**

   ```bash
   npm run lint
   npm run test:run
   npm run build
   ```

4. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Pre-commit hooks will run automatically.

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Project Structure

Understanding the project layout is crucial for effective development.

```
docugen/
├── docs/                    # Documentation files
│   ├── README.md           # Documentation index
│   ├── ARCHITECTURE.md     # System architecture
│   ├── COMPONENTS.md       # Component documentation
│   ├── DEVELOPMENT.md      # This file
│   ├── API.md              # API documentation
│   └── TESTING.md          # Testing guide
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Base UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Container.tsx
│   │   │   ├── Container.test.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Input.test.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Skeleton.test.tsx
│   │   ├── Analytics.tsx
│   │   ├── CookieConsent.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── FAQ.tsx
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── Navbar.tsx
│   │   ├── Newsletter.tsx
│   │   ├── Preview.tsx
│   │   ├── Pricing.tsx
│   │   ├── ScrollToTop.tsx
│   │   ├── ShareButtons.tsx
│   │   ├── Testimonials.tsx
│   │   └── UploadDemo.tsx
│   ├── data/
│   │   └── content.ts      # All site content
│   ├── lib/
│   │   ├── ThemeContext.tsx
│   │   ├── useTheme.ts
│   │   └── utils.ts
│   ├── test/
│   │   └── setup.ts        # Test configuration
│   ├── App.tsx            # Root component
│   ├── index.css          # Global styles
│   └── main.tsx           # Entry point
├── public/                # Static assets
├── .planning/             # Planning documents
│   └── ROADMAP.md
├── .vscode/              # VS Code settings
├── .husky/               # Git hooks
├── index.html
├── package.json
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
├── eslint.config.js      # ESLint configuration
└── prettier.config.js    # Prettier configuration
```

### Key Directories

#### `src/components/ui/`

Reusable base components. Each component has:

- Main component file (e.g., `Button.tsx`)
- Test file (e.g., `Button.test.tsx`)
- Props interface with documentation

#### `src/data/content.ts`

Centralized content management:

- All text/copy for the site
- Site configuration
- Feature lists, pricing, FAQ data
- Easy to modify without touching components

#### `src/lib/`

Utility functions and hooks:

- `ThemeContext.tsx`: Global theme state
- `useTheme.ts`: Theme hook
- `utils.ts`: Helper functions

## Available Scripts

### Development

| Command           | Description              | Usage                         |
| ----------------- | ------------------------ | ----------------------------- |
| `npm run dev`     | Start development server | Daily development             |
| `npm run build`   | Build for production     | Before deploying              |
| `npm run preview` | Preview production build | Test production build locally |

### Code Quality

| Command                | Description                     | Usage                |
| ---------------------- | ------------------------------- | -------------------- |
| `npm run lint`         | Run ESLint                      | Before committing    |
| `npm run lint:fix`     | Fix ESLint errors automatically | When linting fails   |
| `npm run format`       | Format code with Prettier       | Keep code consistent |
| `npm run format:check` | Check formatting                | CI/CD pipelines      |

### Testing

| Command            | Description             | Usage              |
| ------------------ | ----------------------- | ------------------ |
| `npm run test`     | Run tests in watch mode | During development |
| `npm run test:run` | Run tests once          | Before committing  |

### Complete Workflow

Before committing, always run:

```bash
npm run lint && npm run test:run && npm run build
```

This ensures:

1. No linting errors
2. All tests pass
3. Production build succeeds

## Code Style & Standards

### TypeScript Standards

#### Strict Mode

The project uses TypeScript strict mode. This means:

- No implicit `any` types
- Strict null checks enabled
- All functions must have return types
- All props must be typed

```typescript
// Good
interface UserProps {
  name: string;
  email: string;
  age?: number;  // Optional, but still typed
}

export function UserCard({ name, email, age }: UserProps): JSX.Element {
  return <div>{name}</div>;
}

// Bad - Missing types
function UserCard(props) {
  return <div>{props.name}</div>;
}
```

#### Interface vs Type

- Use `interface` for object shapes
- Use `type` for unions, primitives, or complex types

```typescript
// Interface for objects
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
}

// Type for unions
type Theme = 'dark' | 'light';
type ButtonVariant = 'primary' | 'secondary' | 'ghost';
```

### Naming Conventions

| Element             | Convention            | Example                         |
| ------------------- | --------------------- | ------------------------------- |
| Components          | PascalCase            | `HeroSection`, `PricingCard`    |
| Files (components)  | PascalCase            | `Button.tsx`, `UserProfile.tsx` |
| Files (utilities)   | camelCase             | `utils.ts`, `formatDate.ts`     |
| Variables/Functions | camelCase             | `handleSubmit`, `isLoading`     |
| Constants           | SCREAMING_SNAKE_CASE  | `SITE_CONFIG`, `API_BASE_URL`   |
| CSS Classes         | kebab-case (Tailwind) | `bg-teal-600`, `text-dark-100`  |
| Interfaces/Types    | PascalCase            | `UserProps`, `ThemeContextType` |

### Component Structure

Every component should follow this structure:

```typescript
// 1. Imports (React first, then external, then internal)
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

// 2. Types/Interfaces
interface ExampleProps {
  title: string;
  description?: string;
  onAction: () => void;
}

// 3. Constants
const ANIMATION_DURATION = 0.5;

// 4. Helper functions (if needed)
function formatTitle(title: string): string {
  return title.trim().toUpperCase();
}

// 5. Main component
export function Example({ title, description, onAction }: ExampleProps): JSX.Element {
  // State hooks
  const [isOpen, setIsOpen] = useState(false);

  // Event handlers
  const handleClick = (): void => {
    setIsOpen(true);
    onAction();
  };

  // Render
  return (
    <div>
      <h1>{formatTitle(title)}</h1>
      {description && <p>{description}</p>}
      <Button onClick={handleClick}>Action</Button>
    </div>
  );
}

// 6. Named export (already done above)
```

### Import Order

Organize imports in this order:

1. React imports
2. External library imports
3. Internal component imports (absolute paths)
4. Internal utility imports
5. Type imports
6. Style imports (if any)

```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/lib/useTheme';
import { formatDate } from '@/lib/utils';
import type { User } from '@/types';
import './styles.css';
```

### Tailwind CSS Standards

#### Use Design System Colors

```typescript
// Good - Use design tokens
<div className="bg-teal-600 text-dark-100">

// Bad - Arbitrary values
<div className="bg-[#14b8a6] text-[#f1f5f9]">
```

#### Dark Mode First

The project uses dark mode as default:

```typescript
// Good - Dark mode default
<div className="bg-dark-900 text-dark-100">
  Light mode override
  <span className="dark:text-dark-300">
</div>

// Bad - Light mode default
<div className="bg-white text-gray-900 dark:bg-gray-900">
```

#### Responsive Classes

Use mobile-first responsive prefixes:

```typescript
// Good - Mobile first
<div className="text-sm md:text-base lg:text-lg">

// Bad - Desktop first
<div className="text-lg md:text-base sm:text-sm">
```

#### Spacing Scale

Use consistent spacing:

```typescript
// Good - Consistent scale
<div className="p-4 md:p-6 lg:p-8">
<div className="space-y-4">
<div className="gap-4">

// Bad - Inconsistent values
<div className="p-[17px] md:p-[25px]">
```

### Error Handling

#### TypeScript for Compile-Time Errors

```typescript
// Use strict types to prevent errors
function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}
```

#### Runtime Error Boundaries

```typescript
// Use ErrorBoundary component for critical errors
<ErrorBoundary fallback={<ErrorFallback />}>
  <RiskyComponent />
</ErrorBoundary>
```

#### Form Validation

```typescript
// Inline validation with clear error messages
const [error, setError] = useState<string | null>(null);

const handleSubmit = (email: string): void => {
  if (!email.includes('@')) {
    setError('Please enter a valid email address');
    return;
  }
  setError(null);
  // Submit...
};
```

## Git Workflow

### Branch Naming

Format: `type/description`

| Type        | Use Case         | Example                    |
| ----------- | ---------------- | -------------------------- |
| `feature/`  | New features     | `feature/upload-component` |
| `fix/`      | Bug fixes        | `fix/mobile-menu-scroll`   |
| `docs/`     | Documentation    | `docs/api-guide`           |
| `refactor/` | Code refactoring | `refactor/theme-system`    |
| `test/`     | Test additions   | `test/newsletter-form`     |

### Commit Message Format

Use conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples**:

```bash
feat(hero): add drag-and-drop upload area
fix(navbar): resolve mobile menu scroll issue
docs(readme): update installation instructions
refactor(button): simplify variant logic
test(newsletter): add validation tests
```

### Pre-Commit Hooks

The project uses Husky and lint-staged for automated checks:

```bash
# Automatically runs on git commit
1. ESLint --fix
2. Prettier --write
```

If hooks fail:

1. Fix the reported issues
2. Stage the fixed files
3. Commit again

## Editor Setup

### VS Code Extensions

Install these extensions for the best development experience:

- **ESLint** - Real-time linting
- **Prettier** - Code formatting
- **TypeScript Importer** - Auto-imports
- **Tailwind CSS IntelliSense** - Tailwind autocomplete
- **Error Lens** - Inline error display
- **GitLens** - Git integration

### VS Code Settings

The project includes recommended settings in `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### TypeScript Path Mapping

The project uses non-relative imports via `tsconfig.json`:

```typescript
// Good - Absolute import
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/lib/useTheme';

// Bad - Relative import
import { Button } from '../../components/ui/Button';
```

## Troubleshooting

### Common Issues

#### Port 3000 Already in Use

```bash
# Kill process on port 3000 (macOS/Linux)
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- --port 3001
```

#### Node Modules Issues

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### TypeScript Errors

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

#### ESLint Errors

```bash
# Fix auto-fixable issues
npm run lint:fix

# Check specific file
npx eslint src/components/Button.tsx
```

#### Test Failures

```bash
# Run tests with verbose output
npm run test:run -- --reporter=verbose

# Run specific test file
npm run test:run -- src/components/ui/Button.test.tsx

# Debug mode
npm run test -- --reporter=verbose
```

#### Build Failures

```bash
# Check for TypeScript errors first
npx tsc --noEmit

# Check for linting errors
npm run lint

# Clean build
rm -rf dist
npm run build
```

### Getting Help

1. **Check Documentation**: Review this guide and [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Search Issues**: Look for similar issues in the project
3. **Ask Questions**: Open a discussion or ask the team
4. **Report Bugs**: Follow [ISSUES.md](../ISSUES.md) guidelines

## Next Steps

Now that your environment is set up:

1. Read the [Architecture Guide](./ARCHITECTURE.md) to understand the system
2. Explore the [Component Library](./COMPONENTS.md) to see available components
3. Check out [Testing Guide](./TESTING.md) to learn testing patterns
4. Review open issues to find something to work on

Happy coding! 🚀

---

**Related Documents**:

- [Architecture Guide](./ARCHITECTURE.md) - System design
- [Component Library](./COMPONENTS.md) - Component documentation
- [Testing Guide](./TESTING.md) - Testing patterns
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
