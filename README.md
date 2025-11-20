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

Install the package via Composer:

```bash
composer require stratos/spire-ui
```

> **⚠️ Important: JavaScript Dependencies Required**
>
> After installing via Composer, you **must** install JavaScript dependencies to make interactive components work:
>
> ```bash
> npm install
> npm run build
> ```
>
> Spire UI requires Alpine.js, Tailwind CSS, and other JavaScript packages that are not installed by Composer. Without running `npm install`, components like Select, Datepicker, Modal, and others will not function properly.

### Asset Setup

1. **Import CSS** in your `resources/css/app.css`:

```css
@import 'tailwindcss';
@import '../../vendor/stratos/spire-ui/resources/css/index.css';
```

2. **Import JavaScript** in your `resources/js/app.js`:

```javascript
import { initializeSpireUI } from '../../vendor/stratos/spire-ui/resources/js/index';

initializeSpireUI();
```

3. **Build assets**:

```bash
npm run build
```

### Configuration (Optional)

Publish the configuration file to customize component defaults:

```bash
php artisan vendor:publish --tag=spire-ui-config
```

This will create `config/spire-ui.php` where you can customize:
- Component prefix
- Dark mode settings
- Global component defaults (size, radius, placement)
- Component-specific settings

## Usage

Components will be available using the `spire` prefix:

```blade
<x-spire::button>Click me</x-spire::button>
```

### Component Naming Convention

Spire UI uses folder-based components with dot notation:

- Parent component: `<x-spire::dropdown />`
- Child component: `<x-spire::dropdown.item />`

## Theming

Spire UI uses semantic color tokens defined in `vendor/stratos/spire-ui/resources/css/base/theme.css`. All tokens support light/dark mode automatically.

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

Translation files are located in `vendor/stratos/spire-ui/resources/lang/{locale}/spire-ui.php`.

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md) before submitting pull requests.

## License

MIT License
