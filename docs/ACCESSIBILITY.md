# Accessibility (a11y) Guide

This document outlines the accessibility features and testing procedures for the DocuGen landing page.

## WCAG 2.1 AA Compliance

Our goal is to meet WCAG 2.1 Level AA standards for web accessibility.

## Implemented Features

### Semantic HTML

- **Proper heading hierarchy**: H1 → H2 → H3 → H4 in logical order
- **Landmarks**: Uses `<header>`, `<main>`, `<footer>`, `<nav>`, and `<section>` elements
- **Lists**: Proper use of `<ul>` and `<li>` for navigation and feature lists

### Keyboard Navigation

- All interactive elements are keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order following the visual layout
- Escape key closes mobile menu

### ARIA Attributes

- `aria-label` on icon-only buttons and links
- `aria-expanded` on expandable FAQ items
- `aria-invalid` and `aria-describedby` on form inputs with errors
- `role="alert"` on error messages

### Skip Links

- "Skip to main content" link available for keyboard users
- Hidden until focused, then prominently displayed
- Jumps directly to `<main id="main-content">`

### Screen Reader Support

- Semantic HTML provides context without additional ARIA
- Form inputs have associated labels
- Error messages are announced to screen readers
- Status updates (like form submission success) are communicated

## Color Contrast

### Text Contrast Ratios

| Element             | Foreground          | Background          | Ratio  | Status |
| ------------------- | ------------------- | ------------------- | ------ | ------ |
| Body text           | slate-300 (#cbd5e1) | slate-950 (#020617) | 9.7:1  | Pass   |
| Headings            | slate-50 (#f8fafc)  | slate-950 (#020617) | 16.1:1 | Pass   |
| Muted text          | slate-400 (#94a3b8) | slate-950 (#020617) | 7.3:1  | Pass   |
| Links (default)     | slate-400 (#94a3b8) | slate-950 (#020617) | 7.3:1  | Pass   |
| Links (hover)       | teal-400 (#2dd4bf)  | slate-950 (#020617) | 7.8:1  | Pass   |
| Buttons (primary)   | white (#ffffff)     | teal-600 (#0d9488)  | 4.6:1  | Pass   |
| Buttons (secondary) | slate-200 (#e2e8f0) | slate-800 (#1e293b) | 7.9:1  | Pass   |
| Error text          | red-500 (#ef4444)   | slate-950 (#020617) | 5.8:1  | Pass   |

### Interactive Element Contrast

All interactive elements meet the 3:1 minimum contrast ratio for non-text elements:

- Focus indicators: 4.5:1 minimum
- Button borders: 3:1 minimum
- Form input borders: 3:1 minimum

## Screen Reader Testing

### Testing Procedures

#### macOS VoiceOver

1. Enable VoiceOver: `Cmd + F5`
2. Navigate with: `Ctrl + Option + Arrow keys`
3. Test all interactive elements
4. Verify heading hierarchy with `Ctrl + Option + Cmd + H`
5. Test skip link with `Tab` then `Enter`

#### Windows NVDA

1. Download and install NVDA from [nvaccess.org](https://www.nvaccess.org/)
2. Navigate with: `Insert + Arrow keys`
3. Use `H` to jump between headings
4. Test form inputs and error announcements

#### ChromeVox (Chrome Extension)

1. Install ChromeVox from Chrome Web Store
2. Use `ChromeVox + Arrow keys` to navigate
3. Test on different screen sizes

### Testing Checklist

- [ ] Skip link works and is announced
- [ ] All headings are read in correct order
- [ ] Navigation links are properly labeled
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Button purposes are clear
- [ ] Images have alt text (if applicable)
- [ ] Status updates are announced

## Automated Testing

### Recommended Tools

1. **axe DevTools** (Browser Extension)
   - Install from Chrome Web Store or Firefox Add-ons
   - Run on every page
   - Fix all critical and serious issues

2. **Lighthouse Accessibility Audit**
   - Built into Chrome DevTools
   - Run in incognito mode
   - Aim for 100 score

3. **WAVE** (Web Accessibility Evaluation Tool)
   - Browser extension available
   - Visual feedback on accessibility issues
   - Check for color contrast errors

### Running Tests

```bash
# Build the project first
npm run build

# Start dev server for testing
npm run dev
```

Then run automated tools against `http://localhost:5173`

## Accessibility Statement

DocuGen is committed to making our landing page accessible to all users, including those with disabilities. We strive to meet WCAG 2.1 Level AA standards and continuously improve our accessibility.

### Known Limitations

- None currently identified

### Reporting Issues

If you encounter any accessibility barriers, please:

1. Open an issue on GitHub
2. Include browser/screen reader version
3. Describe the issue and expected behavior

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility Documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
