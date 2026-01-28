# Roadmap: DocuGen

## Overview

DocuGen is a developer tool that automatically transforms Markdown, MDX, and README files into fast, static documentation websites. The journey spans from core file parsing and rendering to AI-powered structuring, live preview with customization, and seamless deployment options—delivering a complete docs-as-code solution that requires zero configuration.

## Phases

- [ ] **Phase 1: Core Upload & Parsing** - File upload system and Markdown rendering engine
- [ ] **Phase 2: AI Structuring Engine** - Automatic navigation, TOC, and content organization
- [ ] **Phase 3: Preview & Theming** - Live preview with real-time customization
- [ ] **Phase 4: Export & Deploy** - Static generation and deployment integrations
- [ ] **Phase 5: Search & Polish** - Client-side search and performance optimization

## Phase Details

### Phase 1: Core Upload & Parsing

**Goal**: File upload system and Markdown rendering engine
**Depends on**: Nothing (first phase)
**Requirements**: REQ-01, REQ-02, REQ-03
**Success Criteria** (what must be TRUE):

1. User can drag and drop Markdown/MDX files or folders
2. Files parse correctly with syntax highlighting
3. Basic rendered output displays in browser
4. File tree navigation shows uploaded structure
   **Plans**: 4 plans

Plans:

- [ ] 01-01: File upload component with drag-and-drop
- [ ] 01-02: MDX/Markdown parser integration (unified/remark/rehiki)
- [ ] 01-03: File tree sidebar with navigation
- [ ] 01-04: Basic layout with header, sidebar, content area

### Phase 2: AI Structuring Engine

**Goal**: Automatic navigation, table of contents, and content organization
**Depends on**: Phase 1
**Requirements**: REQ-04, REQ-05
**Success Criteria** (what must be TRUE):

1. Navigation structure generates automatically from content
2. Table of contents builds from headings
3. Cross-references between pages work correctly
4. Active page highlighting in sidebar
   **Plans**: 3 plans

Plans:

- [ ] 02-01: Auto-generate navigation from file structure and headings
- [ ] 02-02: Table of contents with anchor links and scroll spy
- [ ] 02-03: Breadcrumbs and page hierarchy display

### Phase 3: Preview & Theming

**Goal**: Live preview with real-time customization options
**Depends on**: Phase 2
**Requirements**: REQ-06, REQ-07
**Success Criteria** (what must be TRUE):

1. Preview updates instantly when files change
2. Theme switcher works (light/dark/custom)
3. User can customize colors and branding
4. Responsive layout works on mobile
   **Plans**: 4 plans

Plans:

- [ ] 03-01: Hot reload for file changes in preview
- [ ] 03-02: Theme system with design tokens
- [ ] 03-03: Customization panel (colors, logo, site title)
- [ ] 03-04: Mobile responsive sidebar and navigation

### Phase 4: Export & Deploy

**Goal**: Static site generation and deployment integrations
**Depends on**: Phase 3
**Requirements**: REQ-08, REQ-09
**Success Criteria** (what must be TRUE):

1. Static export generates production-ready HTML/CSS/JS
2. Download works as ZIP file
3. GitHub Pages deployment integration functions
4. Custom domain configuration works
   **Plans**: 4 plans

Plans:

- [ ] 04-01: Static site generator (build to dist folder)
- [ ] 04-02: Download as ZIP functionality
- [ ] 04-03: GitHub Pages deploy button
- [ ] 04-04: Custom domain with SSL (Vercel/Netlify integration)

### Phase 5: Search & Polish

**Goal**: Client-side search and performance optimization
**Depends on**: Phase 4
**Requirements**: REQ-10, REQ-11
**Success Criteria** (what must be TRUE):

1. Search indexes all content and returns results
2. Search works offline
3. Page load under 1 second
4. All animations are smooth (60fps)
   **Plans**: 3 plans

Plans:

- [ ] 05-01: FlexSearch client-side search integration
- [ ] 05-02: Performance optimization (bundle splitting, lazy loading)
- [ ] 05-03: Framer Motion polish and accessibility audit

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase                    | Plans Complete | Status      | Completed |
| ------------------------ | -------------- | ----------- | --------- |
| 1. Core Upload & Parsing | 0/4            | Not started | -         |
| 2. AI Structuring Engine | 0/3            | Not started | -         |
| 3. Preview & Theming     | 0/4            | Not started | -         |
| 4. Export & Deploy       | 0/4            | Not started | -         |
| 5. Search & Polish       | 0/3            | Not started | -         |
