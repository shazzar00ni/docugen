# Contributing to DocuGen

Thank you for your interest in contributing to DocuGen! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/docugen.git
   cd docugen
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser

## Development Workflow

### 1. Create a Branch

Create a new branch for your feature or bugfix:

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Make your changes following the code style guidelines in [AGENTS.md](./AGENTS.md).

### 3. Test Your Changes

Run the test suite to ensure your changes don't break existing functionality:

```bash
npm run test:run
```

### 4. Lint and Format

Ensure your code passes linting and formatting checks:

```bash
npm run lint      # Check for issues
npm run format    # Auto-format code
```

### 5. Build

Verify the project builds successfully:

```bash
npm run build
```

### 6. Commit Your Changes

Commit your changes with a clear commit message:

```bash
git add .
git commit -m "Add feature: your feature description"
```

### 7. Push and Create PR

Push your branch and create a Pull Request:

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

## Code Style Guidelines

Please follow the guidelines in [AGENTS.md](./AGENTS.md) for:

- TypeScript conventions
- Component structure
- Tailwind CSS usage
- Testing practices
- Git commit messages

## Reporting Issues

When reporting issues, please include:

1. A clear description of the problem
2. Steps to reproduce the issue
3. Expected behavior vs actual behavior
4. Screenshots (if applicable)
5. Browser/OS information

## Code of Conduct

This project follows our [Code of Conduct](./CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## Questions?

If you have questions, feel free to open an issue for discussion.
