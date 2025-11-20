# Welcome to Spire UI

A modern TALL stack component library built with Laravel, Livewire, Alpine.js, and Tailwind CSS v4. Spire UI provides **47 production-ready components** with consistent design, full accessibility, and seamless Livewire integration.

## Why Spire UI?

✨ **Beautiful by Default** - Modern, polished components that work out of the box
⚡ **Zero Configuration** - Install via Composer and start building immediately
🎨 **Fully Themeable** - Tailwind v4 integration with OKLCH color system
📱 **Responsive Design** - Mobile-first approach for all components
♿ **Accessibility First** - ARIA-compliant with full keyboard navigation
🧪 **Well-Tested** - Comprehensive test suite with browser tests
🔧 **Livewire Native** - Deep integration with Livewire 3.x

---

## Quick Start

### 1. Installation

```bash
composer require stratos/spire-ui
php artisan spire:install
```

The install command automatically:
- Detects your package manager (npm/pnpm/yarn)
- Installs JavaScript dependencies (Alpine.js, Tailwind CSS, polyfills)
- Builds your assets
- Shows you the next steps

### 2. Import Assets

```css
/* resources/css/app.css */
@import "tailwindcss";
@import '../../packages/spire-ui/resources/css/index.css';
```

```javascript
// resources/js/app.js
import { initializeSpireUI } from '../../packages/spire-ui/resources/js/index';

initializeSpireUI();
```

### 3. Use Components

```blade
<x-spire::button color="primary" variant="solid">
    Click Me
</x-spire::button>

<x-spire::input
    wire:model="name"
    label="Your Name"
    placeholder="John Doe"
/>
```

[Read the Full Installation Guide →](getting-started.md)

---

## Documentation

### Essential Guides

- **[Installation & Setup](getting-started.md)** - Get Spire UI running in your Laravel app
- **[Configuration](configuration.md)** - Customize component defaults and behavior
- **[Theming System](theming.md)** - Master the color system, light/dark mode, and customization
- **[Forms Integration](forms.md)** - Complete guide to building forms with Livewire

### Browse by Category

#### 📝 Form Inputs
Build beautiful, accessible forms with **14 input components**: Input, Textarea, Select, Autocomplete, Checkbox, Radio, Switch, Slider, File Upload, Phone Input, Datepicker, Timepicker, Editor, and Rating.

[Explore Form Components →](components/input.md)

#### 🧭 Navigation
Guide users through your app with **6 navigation components**: Tabs, Breadcrumbs, Pagination, Sidebar, Header, and Dropdown menus.

[Explore Navigation →](components/tabs.md)

#### 📊 Data Display
Present information clearly with **8 display components**: Table, Data List, Card, Badge, Avatar, Text, Icon, and Separator.

[Explore Data Display →](components/table.md)

#### 💬 Feedback & Overlays
Communicate with users through **7 feedback components**: Alert, Toast, Modal, Spinner, Progress, Tooltip, and Popover.

[Explore Feedback Components →](components/alert.md)

#### 🎨 Media & Content
Enhance content with **5 rich components**: Carousel, Lightbox, Chart, Accordion, and Calendar.

[Explore Media Components →](components/carousel.md)

---

## Component Reference

### Form Inputs

| Component | Description |
|-----------|-------------|
| [Input](components/input.md) | Flexible text input with icons, clearable, password toggle, copy functionality |
| [Textarea](components/textarea.md) | Multi-line text input with auto-resize and character counting |
| [Select](components/select.md) | Dropdown selection with search, multiple selection, keyboard navigation |
| [Autocomplete](components/autocomplete.md) | Search component with suggestions, async data loading |
| [Checkbox](components/checkbox.md) | Checkbox input with indeterminate state, custom colors |
| [Radio](components/radio.md) | Radio buttons with card-style layouts |
| [Switch](components/switch.md) | Toggle switch for binary on/off states |
| [Slider](components/slider.md) | Range slider with single/dual handles |
| [File Upload](components/file-upload.md) | Drag-and-drop file upload with previews |
| [Phone Input](components/phone-input.md) | International phone number with country selector |
| [Datepicker](components/datepicker.md) | Date selection with calendar popup |
| [Timepicker](components/timepicker.md) | Time selection with scrollable columns |
| [Editor](components/editor.md) | Rich text WYSIWYG editor (Tiptap) |
| [Rating](components/rating.md) | Star rating with half-star support |

### Form Layout

| Component | Description |
|-----------|-------------|
| [Field](components/field.md) | Wrapper for form inputs with label, helper text, errors |
| [Form Primitives](components/form-primitives.md) | Standalone Label, Error, Helper components |

### Buttons & Actions

| Component | Description |
|-----------|-------------|
| [Button](components/button.md) | Interactive button with variants, colors, icons, loading states |

### Navigation

| Component | Description |
|-----------|-------------|
| [Tabs](components/tabs.md) | Tabbed interface with keyboard navigation |
| [Breadcrumbs](components/breadcrumbs.md) | Navigation breadcrumbs for site hierarchy |
| [Pagination](components/pagination.md) | Pagination controls for large datasets |
| [Sidebar](components/sidebar.md) | Collapsible sidebar navigation |
| [Header](components/header.md) | Application header with logo, nav, search |
| [Dropdown](components/dropdown.md) | Dropdown menu with keyboard navigation |

### Data Display

| Component | Description |
|-----------|-------------|
| [Table](components/table.md) | Data table with sorting, selection, pagination |
| [Data List](components/data-list.md) | Vertical list for structured data |
| [Card](components/card.md) | Container for grouping related content |
| [Badge](components/badge.md) | Chips/tags and notification badges |
| [Avatar](components/avatar.md) | User profile pictures with fallbacks |
| [Text](components/text.md) | Semantic text with responsive sizing |
| [Icon](components/icon.md) | SVG icons (Lucide icon set, 1800+ icons) |
| [Separator](components/separator.md) | Visual divider for content sections |

### Feedback & Overlays

| Component | Description |
|-----------|-------------|
| [Alert](components/alert.md) | Temporary notifications with color variants |
| [Toast](components/toast.md) | Non-blocking notification system |
| [Modal](components/modal.md) | Dialog and flyout panel system |
| [Spinner](components/spinner.md) | Loading spinner indicators |
| [Progress](components/progress.md) | Progress bars (linear and circular) |
| [Tooltip](components/tooltip.md) | Contextual information overlay |
| [Popover](components/popover.md) | Interactive overlay for rich content |

### Media & Content

| Component | Description |
|-----------|-------------|
| [Carousel](components/carousel.md) | Image/content carousel with autoplay |
| [Lightbox](components/lightbox.md) | Full-screen image viewer with zoom |
| [Chart](components/chart.md) | Data visualization (Chart.js) |
| [Accordion](components/accordion.md) | Expandable collapsible panels |
| [Calendar](components/calendar.md) | Full calendar with date selection |

---

## Component Status

- **Total Components**: 47
- **Documented**: 43
- **In Progress**: 4 (empty-state, checkbox-group, radio-group, form)
- **Coverage**: 91%

---

## Features

### 🎨 Theming System
- **OKLCH Color Space** - Perceptually uniform colors
- **Semantic Tokens** - Automatic light/dark mode support
- **3-Layer Architecture** - Base colors → Shades → Semantic tokens
- **Surface Elevation** - body → surface → overlay hierarchy
- **Custom Theme** - Easily customize all colors via CSS variables

[Learn About Theming →](theming.md)

### 🔧 Developer Experience
- **ComponentClass API** - Fluent builder for component classes
- **ComponentStyles** - Static utilities for style mappings
- **Helper Functions** - Global helpers for common tasks
- **Livewire Synthesizers** - Custom type serialization
- **BEM-like Naming** - Consistent class naming (spire-component--modifier)

### ♿ Accessibility
- **ARIA-Compliant** - Proper roles, labels, and attributes
- **Keyboard Navigation** - Full keyboard support for all interactive components
- **Focus Management** - Proper focus trapping and restoration
- **Screen Reader Support** - Descriptive labels and announcements
- **Color Contrast** - WCAG AA compliant color combinations

### 🧪 Testing
- **Unit Tests** - ComponentClass, ComponentStyles, helpers
- **Feature Tests** - Livewire component integration
- **Browser Tests** - Alpine.js interactivity with Pest v4
- **Accessibility Tests** - ARIA compliance validation

---

## Browser Support

Spire UI supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note**: Internet Explorer is not supported.

---

## Requirements

- PHP 8.2+
- Laravel 11.x or 12.x
- Livewire 3.x
- Tailwind CSS 4.x
- Alpine.js 3.x

---

## Contributing

Found a bug or want to contribute? We welcome contributions!

- [Report Issues](https://github.com/sabristratos/spire/issues)
- [Submit Pull Requests](https://github.com/sabristratos/spire/pulls)
- [Discussions](https://github.com/sabristratos/spire/discussions)

---

## License

Spire UI is open-source software licensed under the [MIT license](https://github.com/sabristratos/spire/blob/main/LICENSE).

---

## Credits

Built with ❤️ by the Spire UI Team

- **Laravel** - The PHP framework for web artisans
- **Livewire** - A full-stack framework for Laravel
- **Alpine.js** - Your new, lightweight, JavaScript framework
- **Tailwind CSS** - A utility-first CSS framework
- **Lucide Icons** - Beautiful & consistent icon set
