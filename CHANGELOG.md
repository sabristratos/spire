# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2025-11-20

### Fixed
- **Checkbox/Radio Group Orientation Bug**: Fixed horizontal orientation displaying as vertical by making item width conditional based on `data-spire-orientation` attribute. Items now default to `w-max` and only use `w-full` in vertical orientation.
- **Radio Group Spacing**: Fixed spacing inconsistencies in radio-group to match checkbox-group alignment (label wrapper, description, helper, and error spacing).

### Added
- **Automatic Active State Detection**: Added `spire_is_active()` helper function that automatically detects active navigation items based on current URL or route.
- **Sidebar Active State**: Sidebar items now auto-detect active state with support for named routes, wildcard patterns, and automatic parent detection.
- **Header Active State**: Header navigation items now auto-detect active state with same capabilities as sidebar items.
- **Active State Props**: Added `route`, `activeWhen`, `activeRoute`, `activeMatch`, and `autoActive` props to sidebar and header items for fine-grained control.

### Changed
- **Badge Component**: Removed non-functional `dot` prop. Use `variant="dot"` instead for minimal dot indicators.
- **Header Item Prop**: Deprecated `current` prop in favor of `active` (backward compatible).

### Documentation
- Added comprehensive active state detection examples to sidebar.md and header.md
- Updated badge.md to clarify `variant="dot"` usage and remove `dot` prop references
- Added migration guides for transitioning from manual active state management

## [1.0.0] - 2025-11-20

### Added

#### Core Infrastructure
- Fluent `ComponentClass` API for building component classes with BEM-like naming
- `ComponentStyles` utility class for static style mappings
- 3-layer theming system (Base Colors → Shades → Semantic Tokens)
- OKLCH color space support for perceptually uniform colors
- Automatic light/dark mode support via `light-dark()` CSS function
- Service provider with auto-discovery support
- Comprehensive configuration system with component defaults
- Multi-language support (English, French, Arabic)

#### Form Input Components (14)
- **Input** - Flexible text input with icons, clearable, password toggle, copy functionality
- **Textarea** - Multi-line text input with auto-resize and character counting
- **Select** - Dropdown selection with search, multiple selection, keyboard navigation
- **Autocomplete** - Search component with suggestions and async data loading
- **Checkbox** - Checkbox input with indeterminate state
- **Radio** - Radio buttons with card-style layouts
- **Switch** - Toggle switch for binary states
- **Slider** - Range slider with single/dual handles
- **File Upload** - Drag-and-drop file upload with previews and Livewire integration
- **Phone Input** - International phone number input with country selector
- **Datepicker** - Date selection with calendar popup and range selection
- **Timepicker** - Time selection with scrollable columns (12/24 hour format)
- **Editor** - Rich text WYSIWYG editor powered by Tiptap
- **Rating** - Star rating component with half-star support

#### Form Layout Components (2)
- **Field** - Form field wrapper with label, helper text, and error handling
- **Form Primitives** - Standalone Label, Error, and Helper components

#### Button Components (1)
- **Button** - Interactive button with multiple variants, colors, icons, and loading states

#### Navigation Components (6)
- **Tabs** - Tabbed interface with keyboard navigation
- **Breadcrumbs** - Navigation breadcrumbs for site hierarchy
- **Pagination** - Pagination controls for large datasets with Livewire integration
- **Sidebar** - Collapsible sidebar navigation with responsive behavior
- **Header** - Application header with logo, navigation, and search
- **Dropdown** - Dropdown menu with keyboard navigation and nested menus

#### Data Display Components (8)
- **Table** - Data table with sorting, row selection, sticky headers, and pagination
- **Data List** - Vertical list for displaying structured data
- **Card** - Container component for grouping related content
- **Badge** - Chips/tags and notification badge system
- **Avatar** - User profile pictures with fallbacks and group layouts
- **Text** - Semantic text component with responsive sizing
- **Icon** - SVG icon component with Lucide icon set (1800+ icons)
- **Separator** - Visual divider for content sections

#### Feedback & Overlay Components (7)
- **Alert** - Temporary notifications with color variants
- **Toast** - Non-blocking notification system with auto-dismiss
- **Modal** - Dialog and flyout panel system built on native `<dialog>`
- **Spinner** - Loading spinner indicators
- **Progress** - Progress bars (linear and circular variants)
- **Tooltip** - Contextual information overlay
- **Popover** - Interactive overlay for rich content

#### Media & Content Components (5)
- **Carousel** - Image/content carousel with autoplay and touch support
- **Lightbox** - Full-screen image viewer with zoom and gallery support
- **Chart** - Data visualization powered by Chart.js
- **Accordion** - Expandable collapsible panels
- **Calendar** - Full calendar with date selection and navigation

#### JavaScript Architecture
- `overlay.js` - Reusable base component for popover-based overlays
- `keyboard.js` - Unified keyboard navigation patterns (activedescendant & roving-tabindex)
- `events.js` - Standardized custom event system
- Component-specific Alpine.js modules co-located with Blade templates
- Polyfills for Popover API and CSS Anchor Positioning

#### Documentation
- Comprehensive Docsify documentation site
- 43 component documentation pages (91% coverage)
- Getting Started guide
- Configuration guide
- Theming system guide
- Forms integration guide
- Navigation components guide

#### Developer Experience
- Helper functions (`spire_default`, `spire_phone_countries`)
- Livewire synthesizers for custom types (DateRange, DateRangePreset)
- WithSpirePagination trait for Livewire components
- BEM-like CSS class naming convention (`spire-component--modifier`)
- Data attribute convention (`data-spire-*`)
- Comprehensive PHPDoc and JSDoc documentation

### Requirements
- PHP 8.2+
- Laravel 11.x or 12.x
- Livewire 3.x
- Tailwind CSS 4.x
- Alpine.js 3.x

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

[Unreleased]: https://github.com/sabristratos/spire/compare/v1.0.3...HEAD
[1.0.3]: https://github.com/sabristratos/spire/compare/v1.0.0...v1.0.3
[1.0.0]: https://github.com/sabristratos/spire/releases/tag/v1.0.0
