# DocuGen Documentation

Welcome to the DocuGen documentation. This is your central hub for understanding, developing, and using DocuGen.

## 📚 Documentation Index

### Getting Started

- **[Development Guide](./DEVELOPMENT.md)** - Complete setup instructions, development workflow, and coding standards
- **[Architecture Overview](./ARCHITECTURE.md)** - System design, technical decisions, and project structure

### Technical Documentation

- **[Component Library](./COMPONENTS.md)** - Complete guide to UI components, props, usage examples, and design system
- **[API Reference](./API.md)** - API endpoints, data structures, and integration guides
- **[Testing Guide](./TESTING.md)** - Testing strategy, patterns, and best practices

### Project Information

- **Product Roadmap** - See [../.planning/ROADMAP.md](../.planning/ROADMAP.md) for development phases and milestones
- **Contributing Guidelines** - See [../CONTRIBUTING.md](../CONTRIBUTING.md) for contribution standards
- **Security Policy** - See [../SECURITY.md](../SECURITY.md) for security reporting

## 🚀 Quick Links

### Development

```bash
# Start development
npm run dev

# Run tests
npm run test:run

# Build for production
npm run build

# Run linting
npm run lint
```

### Project Structure

```text
docugen/
├── docs/                  # This documentation
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # Reusable base components
│   │   └── sections/     # Page sections
│   ├── data/             # Content and configuration
│   ├── lib/              # Utilities and hooks
│   └── test/             # Test setup
├── public/               # Static assets
└── ...config files
```

## 📖 Documentation Conventions

### Code Examples

All code examples in this documentation use TypeScript and follow the project's coding standards. Components are shown with their props and usage patterns.

### File References

- **Relative paths**: Referenced from project root (e.g., `src/components/Button.tsx`)
- **Code snippets**: Always include complete, runnable examples
- **Line numbers**: Referenced when discussing specific implementations

### Versioning

This documentation is versioned with the project. Check the [ROADMAP](../.planning/ROADMAP.md) to understand which features are available in each phase.

## 🆘 Need Help?

- **Found a bug?** Open an issue following our [ISSUES](../ISSUES.md) guidelines
- **Want to contribute?** See [CONTRIBUTING](../CONTRIBUTING.md)
- **Security concern?** Review [SECURITY](../SECURITY.md)

## 📊 Documentation Status

| Document          | Status         | Last Updated |
| ----------------- | -------------- | ------------ |
| Development Guide | ✅ Complete    | Phase 1      |
| Architecture      | ✅ Complete    | Phase 1      |
| Component Library | ✅ Complete    | Phase 1      |
| API Reference     | 🚧 In Progress | Phase 1      |
| Testing Guide     | ✅ Complete    | Phase 1      |
| User Guide        | ⏳ Planned     | Phase 3      |
| Theming Guide     | ⏳ Planned     | Phase 3      |
| Deployment Guide  | ⏳ Planned     | Phase 4      |

_Status: ✅ Complete | 🚧 In Progress | ⏳ Planned_

---

**Note**: DocuGen is currently in active development. See the [roadmap](../.planning/ROADMAP.md) for feature availability and upcoming phases.

For the high-level project overview, see the [root README](../README.md).

## Build Contract

Use `npm run ci:verify` as the single verification command. It runs `npm run lint`, `npm run test:run`, and `npm run build` (which itself runs typecheck + Vite build).
