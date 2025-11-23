# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.6] - 2025-11-24

### Fixed
- Fixed checkbox component with empty `value` attribute causing Livewire to treat array-bound checkboxes as boolean toggles

## [1.1.5] - 2025-11-23

### Fixed
- Fixed checkbox component outputting duplicate `wire:model` attributes when using Livewire binding

## [1.1.4] - 2025-11-23

### Fixed
- Fixed vertical tabs underline cursor not anchoring to the active tab item
- Fixed overlay-based components (Select, Datepicker, Icon Picker, Dropdown) not closing when clicking the trigger again

## [1.1.3] - 2025-11-23

### Fixed
- Fixed Tabs fill variants (default, pills, bordered, soft) not showing cursor indicator
- Fixed Tabs underline variant cursor height now properly controlled via CSS instead of JS inline styles

## [1.1.2] - 2025-11-23

### Fixed
- Fixed Tabs underline variant showing pill-shaped cursor instead of thin underline

## [1.1.1] - 2025-11-22

### Fixed
- Fixed Alpine component registration timing issue with Livewire 3
- Components now register immediately when script loads instead of waiting for `initializeSpireUI()` call
- Added guard to prevent duplicate component registration

## [1.1.0] - 2025-11-22

### Added

#### Zero-Config Asset Distribution
- Pre-built CSS and JS bundles in `dist/` folder for zero-config installation
- `@spireStyles` Blade directive for including CSS
- `@spireScripts` Blade directive for including JS and initializing Alpine components
- Route-based asset serving from vendor directory (no publish step required)
- `AssetController` for serving pre-built assets with proper caching headers

#### Build System
- Vite configuration for building distributable assets (`vite.config.js`)
- ES module (`spire-ui.esm.js`) and IIFE (`spire-ui.iife.js`) JavaScript bundles
- Compiled CSS bundle with all Tailwind utilities (`spire-ui.css`)
- New entry points: `resources/js/spire-ui.js` and `resources/css/spire-ui.css`

### Changed
- Updated publishable admin layout to use `@spireStyles` and `@spireScripts` directives
- README rewritten with zero-config as primary installation method
- Added `asset_route` configuration option for customizing asset URL path

### Removed
- Removed `spire-ui-assets` publish tag (assets now served via routes)

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

[Unreleased]: https://github.com/sabristratos/spire/compare/v1.1.6...HEAD
[1.1.6]: https://github.com/sabristratos/spire/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/sabristratos/spire/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/sabristratos/spire/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/sabristratos/spire/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/sabristratos/spire/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/sabristratos/spire/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sabristratos/spire/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sabristratos/spire/releases/tag/v1.0.0
