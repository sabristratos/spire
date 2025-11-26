# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.24] - 2025-11-26

### Fixed
- Fixed button group styling to work with wrapped buttons (tooltips, links) by moving child selectors to button component using data attribute descendant selectors
- Fixed tooltip component structure to keep content inside trigger span for better button group compatibility
- Fixed vertical separator removing unnecessary `self-stretch` class

## [1.1.23] - 2025-11-26

### Fixed
- Fixed button group border-radius and border styling using Tailwind child selectors instead of CSS pseudo-selectors

## [1.1.22] - 2025-11-26

### Added
- Added Alpine.js `x-model` usage examples to component documentation

### Fixed
- Fixed checkbox and radio components passing `x-model` attribute to label element instead of input
- Fixed slider component initialization causing unnecessary reactive updates

## [1.1.21] - 2025-11-25

### Added
- Added `x-modelable="value"` support to form components for Alpine.js `x-model` binding without Livewire
- Components updated: autocomplete, calendar, color-picker, datepicker, editor, icon-picker, phone-input, rating, select, slider, timepicker

### Fixed
- Fixed form components missing default value initialization when used without `wire:model`

## [1.1.20] - 2025-11-25

### Fixed
- Fixed muted text color contrast in light mode (changed from neutral-700 to neutral-600)
- Fixed `--color-muted` CSS variable to reference `--color-text-muted` for consistency
- Fixed timepicker scroll centering using `scrollTo` with calculated position instead of `scrollIntoView`
- Fixed textarea missing `placeholder:text-placeholder` class for consistent placeholder styling
- Fixed toast text vertical alignment with `self-center`
- Fixed datepicker and timepicker segment widths from `2ch` to `3ch` for better readability
- Fixed overlay `resolveElements()` to check if root element itself has the x-ref attribute

## [1.1.19] - 2025-11-25

### Fixed
- Fixed nested overlay components (tooltip inside dropdown, etc.) interfering with each other's anchor positioning by using direct element references instead of Alpine `$refs`
- Fixed overlay components using unique instance counters for truly unique anchor IDs across all instances
- Fixed tooltip component property naming conflicts with parent overlay by renaming `trigger`/`triggerEl` to `tooltipTrigger`/`tooltipTriggerEl`
- Fixed autocomplete component using same direct element resolution pattern for nested component support
- Fixed breadcrumbs component missing `resolveElements()` call and `x-id` directive for proper scoping
- Fixed select component `isSelected()` incorrectly returning true when value is empty string or null

## [1.1.18] - 2025-11-25

### Fixed
- Fixed overlay-based components losing anchor positioning during Livewire morphs by using stable anchor IDs and morph lifecycle hooks
- Fixed tooltip anchor stability during Livewire morphs
- Fixed autocomplete anchor stability during Livewire morphs
- Fixed breadcrumbs component missing Livewire compatibility setup
- Fixed select component value comparison failing when comparing numeric values to string option values (type coercion)
- Fixed datepicker segment inputs using fixed widths that caused layout issues in different locales (now uses flexible `min-width`)
- Fixed timepicker segment inputs using fixed widths that caused layout issues (now uses flexible `min-width`)

## [1.1.17] - 2025-11-25

### Added
- Added event-calendar component with month, week, and day views
- Added tabs component support for global size configuration via `spire_default()`

### Changed
- Rebuilt assets with latest component updates

## [1.1.16] - 2025-11-24

### Changed
- Rebuilt assets with latest changes

## [1.1.15] - 2025-11-24

### Added
- Added dropdown bounce animation to popover content
- Added x-cloak directive to popover content to prevent flash of unstyled content

## [1.1.14] - 2025-11-24

### Fixed
- Fixed popover nested x-data scope conflict by removing Alpine directive from content wrapper (event handling moved to JavaScript)
- Fixed radio component to support Alpine bindings (x-bind:checked, x-bind:disabled) for all variants (regular, pill, card)
- Fixed switch component to support Alpine bindings (x-bind:checked, x-bind:disabled) with proper attribute pass-through

## [1.1.13] - 2025-11-24

### Fixed
- Fixed badge container attribute merging to use cleaner ComponentAttributeBag approach instead of manual array spreading
- Fixed badge indicator CSS positioning to use true edge positioning (top-0, bottom-0) instead of inset positioning (top-1, bottom-1)
- Added missing badge indicator color variant CSS classes for all semantic colors (primary, secondary, success, error, warning, info, featured)
- Fixed button ghost variant text colors to use correct semantic colors (text-muted for default, semantic text colors for colored variants)
- Fixed toast icon alignment by removing unnecessary margin offset when no title is present

## [1.1.12] - 2025-11-24

### Fixed
- Fixed tabs cursor position becoming stale after Livewire morphing by querying fresh DOM elements and listening for `livewire:morphed` event

## [1.1.11] - 2025-11-24

### Fixed
- Fixed composer.json version not being updated, causing Packagist to not detect new releases

## [1.1.10] - 2025-11-24

### Changed
- Rebuilt assets

## [1.1.9] - 2025-11-24

### Fixed
- Fixed tabs component cursor not following active tab after Livewire morphing by using `wire:ignore.self` and `wire:key` directives

## [1.1.8] - 2025-11-24

### Fixed
- Fixed checkbox `wire:model` being output on label element causing Livewire array binding to fail

## [1.1.7] - 2025-11-24

### Fixed
- Removed panel transition animations from tabs component to prevent issues with Livewire morphing

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

[Unreleased]: https://github.com/sabristratos/spire/compare/v1.1.24...HEAD
[1.1.24]: https://github.com/sabristratos/spire/compare/v1.1.23...v1.1.24
[1.1.23]: https://github.com/sabristratos/spire/compare/v1.1.22...v1.1.23
[1.1.22]: https://github.com/sabristratos/spire/compare/v1.1.21...v1.1.22
[1.1.21]: https://github.com/sabristratos/spire/compare/v1.1.20...v1.1.21
[1.1.20]: https://github.com/sabristratos/spire/compare/v1.1.19...v1.1.20
[1.1.19]: https://github.com/sabristratos/spire/compare/v1.1.18...v1.1.19
[1.1.18]: https://github.com/sabristratos/spire/compare/v1.1.17...v1.1.18
[1.1.17]: https://github.com/sabristratos/spire/compare/v1.1.16...v1.1.17
[1.1.16]: https://github.com/sabristratos/spire/compare/v1.1.15...v1.1.16
[1.1.15]: https://github.com/sabristratos/spire/compare/v1.1.14...v1.1.15
[1.1.14]: https://github.com/sabristratos/spire/compare/v1.1.13...v1.1.14
[1.1.13]: https://github.com/sabristratos/spire/compare/v1.1.12...v1.1.13
[1.1.12]: https://github.com/sabristratos/spire/compare/v1.1.11...v1.1.12
[1.1.11]: https://github.com/sabristratos/spire/compare/v1.1.10...v1.1.11
[1.1.10]: https://github.com/sabristratos/spire/compare/v1.1.9...v1.1.10
[1.1.9]: https://github.com/sabristratos/spire/compare/v1.1.8...v1.1.9
[1.1.8]: https://github.com/sabristratos/spire/compare/v1.1.7...v1.1.8
[1.1.7]: https://github.com/sabristratos/spire/compare/v1.1.6...v1.1.7
[1.1.6]: https://github.com/sabristratos/spire/compare/v1.1.5...v1.1.6
[1.1.5]: https://github.com/sabristratos/spire/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/sabristratos/spire/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/sabristratos/spire/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/sabristratos/spire/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/sabristratos/spire/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/sabristratos/spire/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/sabristratos/spire/releases/tag/v1.0.0
