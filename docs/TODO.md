# Documentation TODO

This file tracks remaining documentation tasks for Spire UI.

## Status Overview

- **Total Components**: 47
- **Documented**: 43 (91%)
- **Remaining**: 4 (9%)

---

## Missing Component Documentation

### Priority: Medium

These components exist in the codebase but lack individual documentation pages. They are briefly mentioned in related component docs.

#### 1. Checkbox Group

**Component Path**: `packages/spire-ui/resources/views/components/checkbox-group/`

**Status**: Component exists, used in examples in [checkbox.md](components/checkbox.md) and [forms.md](forms.md)

**Why Needed**: Provides consistent layout and ARIA grouping for multiple checkboxes

**What to Document**:
- Props: `label`, `error`, `orientation`, `size`
- Usage with multiple checkboxes
- Validation error display
- Accessibility features (fieldset/legend)
- Examples: vertical/horizontal layouts, validation

**Estimated Time**: 2-3 hours

---

#### 2. Radio Group

**Component Path**: `packages/spire-ui/resources/views/components/radio-group/`

**Status**: Component exists, used in examples in [radio.md](components/radio.md) and [forms.md](forms.md)

**Why Needed**: Provides consistent layout and ARIA grouping for radio buttons

**What to Document**:
- Props: `label`, `error`, `orientation`, `size`
- Usage with radio buttons
- Validation error display
- Accessibility features (fieldset/legend, role="radiogroup")
- Examples: vertical/horizontal layouts, card variants

**Estimated Time**: 2-3 hours

---

#### 3. Empty State

**Component Path**: `packages/spire-ui/resources/views/components/empty-state/`

**Status**: Component exists but not documented anywhere

**Why Needed**: Common pattern for displaying "no results" or "no data" states

**What to Document**:
- Props: `icon`, `title`, `description`, `action` slots
- Visual variants (different sizes, colors)
- Usage in tables, lists, search results
- Integration with loading states
- Call-to-action button patterns
- Examples: no search results, empty list, no data yet, error states

**Estimated Time**: 3-4 hours

---

#### 4. Form Component

**Component Path**: Need to verify if this component exists or is just a wrapper concept

**Status**: Referenced in CLAUDE.md and forms guide but no individual component

**Next Steps**:
1. Check if `<x-spire::form>` component exists in codebase
2. If it exists, document its props and usage
3. If it doesn't exist, remove from component count

**Estimated Time**: 1 hour (investigation) + 2-3 hours (documentation if exists)

---

## Documentation Improvements

### Enhance Existing Docs

#### Add "Overview" Sections Consistently

**Current State**: Some components (autocomplete, datepicker, timepicker) have "Overview" sections before Props, others don't

**Recommendation**:
- **Option A**: Add "Overview" to all component docs for consistency
- **Option B**: Remove from the few that have it

**Decision Needed**: Choose option A or B

**Estimated Time**: 2-3 hours for all components

---

#### Add Visual Examples / Screenshots

**Status**: All docs have code examples but no visual screenshots

**Why Beneficial**:
- Users can quickly see what components look like
- Reduces need to spin up demo environment
- Better for documentation browsing

**What to Add**:
- Screenshot of each component in default state
- Screenshot of different variants
- Interactive demo links (if available)

**Estimated Time**: 6-8 hours (capture screenshots for all 43 components)

**Priority**: Low (documentation is functional without this)

---

#### Component Relationships / "See Also"

**Current State**: Most docs have "Related Components" sections, but could be enhanced

**Improvements**:
- Add more cross-references between related components
- Create a components matrix showing relationships
- Add "Commonly Used With" sections

**Estimated Time**: 3-4 hours

**Priority**: Low

---

## GitHub Pages Setup

### Required for Publishing

#### 1. Choose Documentation Generator

**Options**:
- VuePress
- Docusaurus
- Just Jekyll (native GitHub Pages)
- MkDocs
- Docsify

**Next Steps**:
1. Evaluate options based on:
   - Ease of setup
   - Markdown compatibility
   - Search functionality
   - Dark mode support
   - Customization options

**Estimated Time**: 2-3 hours research + 3-4 hours setup

---

#### 2. Add Search Functionality

**Recommendation**: Algolia DocSearch (free for open source)

**Requires**:
- Application to Algolia
- Add search integration
- Configure indexing

**Estimated Time**: 2-3 hours

---

#### 3. Create Demo/Playground

**Optional but Valuable**: Interactive component playground

**Options**:
- Laravel Live Playground
- Embed CodePen/CodeSandbox examples
- Custom preview environment

**Estimated Time**: 8-12 hours

**Priority**: Low (nice-to-have)

---

## Content Enhancements

### Installation Guide Improvements

**Add to getting-started.md**:
- Standalone package installation (outside monorepo)
- Troubleshooting common issues
- Environment requirements verification checklist
- Video walkthrough (optional)

**Estimated Time**: 2-3 hours

---

### Migration Guides

**Future Need**: When breaking changes occur

**Create**:
- Migration guides for major version updates
- Component API change documentation
- Deprecation warnings

**Estimated Time**: N/A (as needed basis)

---

### Advanced Patterns Guide

**New Documentation File**: `advanced-patterns.md`

**Cover**:
- Custom component creation
- Extending existing components
- Theming advanced techniques
- Performance optimization
- Testing strategies

**Estimated Time**: 6-8 hours

**Priority**: Low

---

### Contributing Guide

**New Documentation File**: `contributing.md`

**Cover**:
- How to contribute new components
- Component development guidelines
- Documentation standards
- PR submission process
- Code style guide

**Estimated Time**: 3-4 hours

**Priority**: Medium

---

## Priority Summary

### High Priority (Complete Before Publishing)
1. ✅ Update index.md with all components
2. ✅ Add getting-started.md
3. ✅ Create navigation.md
4. ✅ Document critical missing components (tooltip, textarea, switch, spinner)
5. ✅ Update CLAUDE.md
6. ✅ Update forms.md references
7. ⏳ Document remaining 4 components (checkbox-group, radio-group, empty-state, form) - **8-12 hours**
8. ⏳ Choose and setup documentation generator - **5-7 hours**

### Medium Priority (Nice to Have for Launch)
1. Add Overview sections consistently - **2-3 hours**
2. Add search functionality - **2-3 hours**
3. Create contributing guide - **3-4 hours**
4. Enhance installation guide - **2-3 hours**

### Low Priority (Post-Launch)
1. Add visual examples/screenshots - **6-8 hours**
2. Create demo playground - **8-12 hours**
3. Advanced patterns guide - **6-8 hours**
4. Enhanced component relationships - **3-4 hours**

---

## Total Time Estimates

**To GitHub Pages Ready**: 13-19 hours

**To Fully Enhanced**: 43-63 hours

---

## Notes

- All 43 currently documented components follow consistent structure
- Documentation uses clear, practical examples
- Code examples are accurate and tested
- Accessibility sections are comprehensive
- All components have "Best Practices" sections

Last Updated: 2025-11-20
