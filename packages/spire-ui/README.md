# Spire UI

A modern TALL stack component library built with Tailwind CSS v4, Livewire 3, and Alpine.js.

## Features

- **Modern Stack**: Built on the TALL stack (Tailwind v4, Alpine.js, Laravel 12, Livewire 3)
- **Accessible**: Full keyboard navigation, ARIA attributes, and semantic HTML
- **Themeable**: Semantic color tokens with built-in light/dark mode support
- **Localized**: i18n support for English, French, and Arabic
- **Composable**: Highly flexible components using Blade slots and attributes
- **Testable**: Designed with testing in mind using Pest v4

## Installation

### Development Setup

This package is currently in development. To use it:

1. The package is located in `packages/spire-ui/`
2. Install dependencies:

```bash
composer install
npm install
```

3. Publish package assets (optional):

```bash
php artisan vendor:publish --tag=spire-ui-config
php artisan vendor:publish --tag=spire-ui-views
php artisan vendor:publish --tag=spire-ui-lang
php artisan vendor:publish --tag=spire-ui-css
```

### CSS Setup

Import the Spire UI theme in your `resources/css/app.css`:

```css
@import 'tailwindcss';
@import '../../packages/spire-ui/resources/css/theme.css';
```

Or if published:

```css
@import 'tailwindcss';
@import 'spire-ui-theme.css';
```

## Usage

Components will be available using the `spire-ui` prefix:

```blade
<x-spire-ui::button>Click me</x-spire-ui::button>
```

### Component Naming Convention

Spire UI uses folder-based components with dot notation:

- Parent component: `<x-spire-ui::dropdown />`
- Child component: `<x-spire-ui::dropdown.item />`

## Development Guidelines

See [CLAUDE.md](../../CLAUDE.md) in the root directory for comprehensive development guidelines including:

- Core philosophy and technology stack priority
- Project structure and naming conventions
- Theming with Tailwind v4 semantic tokens
- Accessibility requirements
- Key development patterns
- Localization support
- Testing guidelines

## Testing

### Feature Tests

```bash
php artisan test
```

### Browser Tests

```bash
php artisan test tests/Browser/
```

## Theming

Spire UI uses semantic color tokens defined in `resources/css/theme.css`. All tokens support light/dark mode automatically.

### Available Tokens

- **Primary**: `primary`, `primary-hover`, `primary-active`, `primary-foreground`
- **Secondary**: `secondary`, `secondary-hover`, `secondary-active`, `secondary-foreground`
- **Surfaces**: `body`, `surface`, `overlay` (elevation hierarchy from base to top)
- **Text**: `text`, `text-muted`, `text-disabled`
- **Borders**: `border`, `border-hover`, `border-focus`
- **States**: `success`, `error`, `warning`, `info` (each with `-hover`, `-bg`, `-foreground` variants)

### Surface Elevation Hierarchy

Spire UI uses a three-layer elevation system that creates depth through color contrast:

**Light Mode:**
1. `body` - neutral-50 (subtle gray background)
2. `surface` - white (cards, panels appear elevated/lighter)
3. `overlay` - neutral-100 (modals, dialogs on top)

**Dark Mode:**
1. `body` - neutral-950 (darkest background)
2. `surface` - neutral-900 (cards, panels slightly lighter)
3. `overlay` - neutral-800 (modals, dialogs even lighter)

```blade
<!-- Page background -->
<body class="bg-body text-text">
    <!-- Elevated card -->
    <div class="bg-surface border border-border rounded-lg p-6">
        <h2>Card content appears elevated</h2>
    </div>

    <!-- Modal overlay (highest elevation) -->
    <div class="bg-overlay/95 backdrop-blur">
        <div class="bg-surface rounded-lg p-6">
            Modal content
        </div>
    </div>
</body>
```

### Color System Architecture

Spire UI uses a three-layer color system:

1. **Base Colors** (7 colors): `primary-base`, `secondary-base`, `neutral-base`, `success-base`, `error-base`, `warning-base`, `info-base`
2. **Shade Scale** (50-950): Each base generates 11 shades using relative color syntax
3. **Semantic Tokens**: User-friendly names with automatic light/dark mode support

### Foreground Colors

Each semantic color has an adaptive `-foreground` variant that ensures WCAG-compliant contrast:

```blade
<!-- Automatically adapts text color for optimal contrast -->
<button class="bg-primary text-primary-foreground">
    Click me
</button>

<div class="bg-success text-success-foreground p-4">
    Success message with perfect contrast
</div>

<span class="bg-error text-error-foreground px-2 py-1">
    Error badge
</span>
```

### Usage Examples

```blade
<!-- Using semantic tokens -->
<button class="bg-primary hover:bg-primary-hover text-primary-foreground">
    Primary Button
</button>

<!-- Using specific shades -->
<div class="bg-primary-50 text-primary-900 dark:bg-primary-950 dark:text-primary-100">
    Custom styled element
</div>

<!-- State colors with foreground -->
<div class="bg-warning text-warning-foreground border border-warning rounded-md p-4">
    Warning message
</div>
```

## Localization

Spire UI supports multiple languages out of the box. Set your application locale:

```php
// config/app.php
'locale' => 'en', // or 'fr', 'ar'
```

Translation files are located in `resources/lang/{locale}/spire-ui.php`.

## Contributing

This is a development package. See CLAUDE.md for contribution guidelines.

## License

MIT License
