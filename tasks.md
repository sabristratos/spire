# Spire UI Improvement Tasks

This document contains a comprehensive list of improvements, fixes, and enhancements for the Spire UI component library. Tasks are organized by category and priority.

**Legend**: `[ ]` = To Do | `[x]` = Completed

---

## 1. Critical Fixes (Must Fix Immediately)

### Code Quality Issues
- [x] Remove inline JavaScript (`onerror` attribute) from Avatar component
- [x] Remove inline styles from Avatar component (use Tailwind classes)
- [x] Fix undefined `--color-neutral-850` CSS variable referenced in theme.css
- [x] Replace all hardcoded English strings with translation keys in components

### Architecture Issues
- [x] Refactor Avatar.Group regex parsing to use safer DOM parsing
- [x] Simplify Avatar.Group max display logic (currently fragile)

### Testing Infrastructure
- [ ] Create `packages/spire-ui/tests/Feature/` directory
- [ ] Create `packages/spire-ui/tests/Unit/` directory
- [ ] Create `packages/spire-ui/tests/Browser/` directory
- [ ] Add `phpunit.xml` or `pest.php` configuration for package tests

---

## 2. Design System & Theming

### Missing Semantic Color Tokens
- [x] Add `--color-focus` token (for focus rings) - Already exists as `--color-border-focus`
- [x] Add `--color-disabled` token (for disabled states) - Already exists as `--color-text-disabled`
- [x] Add `--color-error` token (validation errors) - Already exists
- [x] Add `--color-success` token (validation success) - Already exists
- [x] Add `--color-warning` token (warnings) - Already exists
- [x] Add `--color-info` token (informational messages) - Already exists

### Design Tokens (Already Complete)
- [x] Border radius tokens (sm, md, lg, xl, full) - Already defined as `--radius-*`
- [x] Shadow tokens (sm, md, lg, xl) - Already defined as `--shadow-*`
- [x] Transition/animation tokens (duration, easing) - Already defined as `--transition-*`
- [x] Typography scale - Using Tailwind defaults (no custom scale needed)
- [x] Spacing scale - Using Tailwind defaults (no custom scale needed)

### Color System Improvements
- [x] Document all color tokens and their purpose in `docs/theming.md`
- [x] Create color palette visual reference in documentation
- [x] Add utility classes documentation for generated tokens
- [x] Define hover/active state colors for all interactive elements

### WCAG AA Compliance
- [x] Document contrast ratios for all color combinations
- [x] Verify text-primary on bg-body meets WCAG AA (4.5:1 for normal text)
- [x] Verify text-secondary on bg-body meets WCAG AA
- [x] Verify all button variants meet contrast requirements
- [x] Verify badge variants meet contrast requirements
- [x] Verify alert variants meet contrast requirements
- [x] Create contrast testing documentation/script

---

## 3. Accessibility (WCAG AA Compliance)

### Keyboard Navigation
- [ ] Document keyboard navigation patterns for all interactive components
- [ ] Add keyboard shortcuts documentation (where applicable)
- [ ] Test all components with keyboard-only navigation
- [ ] Ensure logical tab order in complex components
- [ ] Add escape key handling for dismissible components

### Focus Management
- [ ] Ensure all interactive elements have visible focus states
- [ ] Document focus management patterns in documentation
- [ ] Add focus trap for modal components (when created)
- [ ] Test focus indicators with Windows High Contrast mode

### ARIA Attributes
- [ ] Audit all components for proper ARIA usage
- [ ] Add `aria-live` regions for dynamic content (alerts, toasts)
- [ ] Add `aria-describedby` for form validation errors
- [ ] Ensure all buttons have accessible labels (text or aria-label)
- [ ] Add `role` attributes where semantic HTML isn't sufficient

### Screen Reader Support
- [ ] Test all components with NVDA (Windows)
- [ ] Test all components with JAWS (Windows)
- [ ] Test all components with VoiceOver (macOS)
- [ ] Ensure all images have alt text or aria-hidden
- [ ] Add visually-hidden text for icon-only buttons

### Component-Specific Accessibility
- [ ] Alert: Improve close button keyboard support (Enter and Space)
- [ ] Avatar: Add alt text generation pattern documentation
- [ ] Badge: Ensure decorative badges use `aria-hidden`
- [ ] Button: Document when to use button vs link
- [ ] Card: Use semantic HTML5 elements (article, section)

---

## 4. Component Architecture & Code Quality

### Reduce Code Duplication
- [x] Extract color variant mappings to shared configuration file
- [x] Create centralized variant resolver utility
- [x] Extract size variant mappings to shared configuration
- [x] Create reusable class merger utility for $attributes

### Alpine.js Optimization
- [ ] Create Alpine.data() module for alert dismissal logic
- [ ] Create Alpine.data() module for dropdown/menu (when created)
- [ ] Create Alpine.data() module for modal (when created)
- [ ] Create Alpine.data() module for tabs (when created)
- [ ] Document Alpine module creation patterns

### Component Structure
- [ ] Ensure all components follow index.blade.php pattern
- [ ] Ensure all child components use dot notation correctly
- [ ] Audit $attributes usage (merge, class, filter) for consistency
- [ ] Ensure all components support both light and dark modes
- [ ] Verify all components use data-spire-* prefix for custom attributes

### Props & Slots
- [ ] Document all props in component DocBlocks
- [ ] Ensure sensible defaults for all props
- [ ] Add prop validation where appropriate
- [ ] Document all slots (default and named) in component DocBlocks

---

## 5. Documentation

### Component Documentation (Missing)
- [ ] Create `docs/components/avatar-group.md` for Avatar.Group sub-component
- [ ] Create `docs/components/badge-container.md` for Badge.Container
- [ ] Create `docs/components/button-group.md` for Button.Group
- [ ] Create `docs/components/card-header.md` for Card.Header
- [ ] Create `docs/components/card-body.md` for Card.Body
- [ ] Create `docs/components/card-footer.md` for Card.Footer
- [ ] Update master `docs/index.md` with all sub-component summaries

### Guide Documentation (Missing)
- [ ] Create `docs/theming.md` - Complete theming guide
- [ ] Create `docs/accessibility.md` - Accessibility guidelines
- [ ] Create `docs/testing.md` - Testing guide for components
- [ ] Create `docs/installation.md` - Package installation guide
- [ ] Create `docs/configuration.md` - Configuration options
- [ ] Create `docs/localization.md` - i18n/RTL guide
- [ ] Create `docs/migration.md` - Version upgrade guide

### Examples & Best Practices
- [ ] Add "Common Patterns" section to each component doc
- [ ] Add "Accessibility Checklist" to each component doc
- [ ] Create real-world example compositions
- [ ] Add "Do's and Don'ts" visual examples

### Master Index Improvements
- [ ] Add "Getting Started" section to docs/index.md
- [ ] Add "Accessibility" section to docs/index.md
- [ ] Add "Theming" section to docs/index.md
- [ ] Add "Testing" section to docs/index.md
- [ ] Add component categories (Forms, Feedback, Layout, etc.)

---

## 6. Missing Core Components (High Priority)

### Form Components (Critical)
- [ ] Create Input component (text, email, password, number, etc.)
- [ ] Create Textarea component
- [ ] Create Select component (native and custom)
- [ ] Create Checkbox component
- [ ] Create Radio component
- [ ] Create Switch/Toggle component
- [ ] Create Label component
- [ ] Create FormGroup/Field component (label + input + error)
- [ ] Create FieldError component (validation error display)
- [ ] Create FieldHint component (help text)

### Overlay Components (Critical)
- [ ] Create Modal/Dialog component
- [ ] Create Dropdown/Menu component
- [ ] Create Popover component
- [ ] Create Tooltip component
- [ ] Create Drawer/Sidebar component

### Navigation Components (High Priority)
- [ ] Create Tabs component
- [ ] Create Breadcrumbs component
- [ ] Create Pagination component
- [ ] Create Navigation/Menu component

### Feedback Components (High Priority)
- [ ] Create Toast/Notification component
- [ ] Create Progress component (bar and circular)
- [ ] Create Spinner component (standalone, not just in Button)
- [ ] Create Skeleton component (loading placeholders)
- [ ] Create EmptyState component

### Data Display Components (Medium Priority)
- [ ] Create Table component (with sorting, filtering support)
- [ ] Create List component
- [ ] Create DescriptionList component
- [ ] Create Timeline component
- [ ] Create Stat/Metric component

### Layout Components (Medium Priority)
- [ ] Create Container component
- [ ] Create Grid component (responsive grid system)
- [ ] Create Stack component (vertical/horizontal spacing)
- [ ] Create Divider component
- [ ] Create Spacer component

---

## 7. Internationalization (i18n) & Localization

### Translation Implementation
- [ ] Replace hardcoded "Close" in Alert with `__('spire-ui::alert.close')`
- [ ] Replace hardcoded "Loading" in Button with `__('spire-ui::button.loading')`
- [ ] Add translation keys to all user-facing strings in components
- [ ] Verify all translation files have complete key coverage

### RTL Support
- [ ] Add RTL layout support using Tailwind's `rtl:` variant
- [ ] Test all components in RTL mode
- [ ] Flip directional properties (padding, margin) for RTL
- [ ] Flip icons/arrows for RTL
- [ ] Document RTL testing process

### Locale Testing
- [ ] Test all components in English locale
- [ ] Test all components in French locale
- [ ] Test all components in Arabic locale (with RTL)
- [ ] Create locale switching demo/preview page

---

## 8. Testing Infrastructure

### PEST Feature Tests
- [ ] Create feature test for Alert component
- [ ] Create feature test for Avatar component
- [ ] Create feature test for Avatar.Group component
- [ ] Create feature test for Badge component
- [ ] Create feature test for Button component
- [ ] Create feature test for Button.Group component
- [ ] Create feature test for Card component
- [ ] Create feature test for Icon component

### PEST Unit Tests
- [ ] Create unit tests for color variant resolver
- [ ] Create unit tests for size variant resolver
- [ ] Create unit tests for class merger utility
- [ ] Create unit tests for translation key generation

### PEST Browser Tests (Alpine Interactivity)
- [ ] Create browser test for Alert dismissal
- [ ] Create browser test for Alpine modules (when created)
- [ ] Create browser test for keyboard navigation
- [ ] Create browser test for dark mode switching

### Accessibility Testing
- [ ] Add automated a11y testing (axe-core or similar)
- [ ] Create accessibility audit script
- [ ] Add color contrast testing
- [ ] Document manual testing procedures

### Test Coverage
- [ ] Aim for 80%+ code coverage on components
- [ ] Add test coverage reporting
- [ ] Add CI/CD pipeline for automated testing

---

## 9. Tailwind v4 Optimization

### Class Organization
- [ ] Extract repeated class patterns into reusable Blade includes
- [ ] Review all components for class duplication
- [ ] Consider creating Tailwind plugins for custom utilities

### Performance
- [ ] Audit generated CSS bundle size
- [ ] Remove unused Tailwind utilities (if any)
- [ ] Optimize for production builds
- [ ] Document bundle size in documentation

### Modern Patterns
- [ ] Use container queries where appropriate (when Tailwind adds support)
- [ ] Use cascade layers (`@layer`) for better specificity control
- [ ] Use CSS nesting where it improves readability

---

## 10. Developer Experience

### Component Previews
- [ ] Create demo/preview page for all components
- [ ] Add interactive component playground
- [ ] Create component code generator
- [ ] Add copy-paste code snippets

### Development Tools
- [ ] Create VSCode snippets for Spire UI components
- [ ] Create PHPStorm/IntelliJ live templates
- [ ] Add autocomplete support for component props

### Starter Templates
- [ ] Create authentication pages template
- [ ] Create dashboard layout template
- [ ] Create landing page template
- [ ] Create form examples template

### Documentation Site
- [ ] Consider creating dedicated documentation site (VitePress/Vuepress)
- [ ] Add search functionality to documentation
- [ ] Add component API reference
- [ ] Add changelog/release notes

---

## 11. Performance Optimization

### JavaScript
- [ ] Lazy load Alpine modules (defer loading until needed)
- [ ] Minimize Alpine.js bundle size
- [ ] Review and remove unnecessary JavaScript

### CSS
- [ ] Optimize CSS bundle size (tree-shaking)
- [ ] Review critical CSS for above-the-fold content
- [ ] Add CSS purging for production

### Images
- [ ] Document image optimization best practices
- [ ] Add responsive image support (srcset) to Avatar
- [ ] Consider WebP/AVIF format support

### Loading Performance
- [ ] Add loading states to all async components
- [ ] Document lazy loading patterns
- [ ] Add performance budgets to CI/CD

---

## 12. Code Quality & Standards

### Laravel Pint
- [x] Run Pint on all Blade files: `vendor/bin/pint --dirty`
- [ ] Configure Pint rules for Blade formatting
- [ ] Add Pint to CI/CD pipeline

### PHPDoc
- [ ] Add PHPDoc blocks to all component classes (if using view composers)
- [ ] Document all props with @param tags
- [ ] Document all slots with @slot tags
- [ ] Add @example tags for common usage

### Naming Conventions
- [ ] Audit all variable names for descriptiveness
- [ ] Ensure all method names follow conventions
- [ ] Review all CSS class names for consistency
- [ ] Review all translation key names for consistency

### Code Organization
- [ ] Group related components in subdirectories if needed
- [ ] Organize utility files logically
- [ ] Create shared partials for repeated markup

---

## 13. Package Configuration & Setup

### Composer
- [ ] Review composer.json dependencies (ensure minimal required)
- [ ] Add package auto-discovery configuration
- [ ] Ensure proper package versioning (semver)
- [ ] Add package keywords for discoverability

### Configuration File
- [ ] Create `config/spire-ui.php` for customization
- [ ] Allow theme token overrides via config
- [ ] Allow component default customization via config
- [ ] Document configuration options

### Service Provider
- [ ] Ensure Blade components are properly registered
- [ ] Register translation files correctly
- [ ] Register views with proper namespace
- [ ] Add publishable assets (CSS, config)

### Installation Documentation
- [ ] Create step-by-step installation guide
- [ ] Document Tailwind v4 setup requirements
- [ ] Document Alpine.js requirements
- [ ] Add troubleshooting section

---

## Progress Summary

**Total Tasks**: 234
**Completed**: 33
**In Progress**: 0
**Remaining**: 201

---

## Priority Levels

- **Critical (Must Do First)**: Section 1, Section 6 (Form Components), Section 7 (Translation Implementation)
- **High Priority**: Section 2, Section 3, Section 5, Section 6 (Overlay & Navigation Components)
- **Medium Priority**: Section 4, Section 8, Section 10, Section 12
- **Low Priority (Nice to Have)**: Section 9, Section 11, Section 13

---

## Notes

- Tasks are designed to be independently completable
- Each task should be checked off as completed
- Re-prioritize based on actual user needs
- Avoid over-engineering - keep solutions simple and maintainable
- All components must maintain accessibility, i18n, and dark mode support
- Document as you build - don't leave documentation for later
