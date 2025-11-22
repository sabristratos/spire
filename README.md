# Spire UI

A modern TALL stack component library built with Tailwind CSS v4, Livewire 3, and Alpine.js.

## Features

- **Modern Stack**: Built on the TALL stack (Tailwind v4, Alpine.js, Laravel 12, Livewire 3)
- **Zero Config**: Pre-built assets served via Blade directives - no build step required
- **Accessible**: Full keyboard navigation, ARIA attributes, and semantic HTML
- **Themeable**: Semantic color tokens with built-in light/dark mode support
- **Localized**: i18n support for English, French, and Arabic
- **Composable**: Highly flexible components using Blade slots and attributes

## Installation

Install the package via Composer:

```bash
composer require stratos/spire-ui
```

## Quick Start (Zero Config)

Add the Blade directives to your layout file:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    @spireStyles
    @livewireStyles
</head>
<body>
    {{ $slot }}

    @spireScripts
    @livewireScripts
</body>
</html>
```

That's it! No npm install, no build step required. Start using components immediately:

```blade
<x-spire::button>Click me</x-spire::button>
```

### Using the Pre-built Layout

Publish the admin layout for a complete starting point:

```bash
php artisan vendor:publish --tag=spire-ui-layouts
```

This creates `resources/views/components/layouts/admin.blade.php` with a full sidebar + header layout.

## Advanced Setup (Custom Bundling)

For projects that need to customize or bundle Spire UI with their own assets:

### 1. Import CSS

In your `resources/css/app.css`:

```css
@import 'tailwindcss';
@import '../../vendor/stratos/spire-ui/resources/css/index.css';
```

### 2. Import JavaScript

In your `resources/js/app.js`:

```javascript
import { initializeSpireUI } from '../../vendor/stratos/spire-ui/resources/js/index';

initializeSpireUI();
```

### 3. Build Assets

```bash
npm run build
```

### 4. Use Vite in Layout

```blade
<head>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>
<body>
    {{ $slot }}
    @livewireScripts
</body>
```

## Blade Directives

| Directive | Description |
|-----------|-------------|
| `@spireStyles` | Outputs CSS link tag for all Spire UI styles |
| `@spireScripts` | Outputs JS script tags and initializes Alpine components |

## Configuration

Publish the configuration file to customize component defaults:

```bash
php artisan vendor:publish --tag=spire-ui-config
```

This creates `config/spire-ui.php` where you can customize:

- `prefix` - Component prefix (default: `spire`)
- `asset_route` - Route path for serving assets (default: `spire-ui`)
- `theme.dark_mode` - Dark mode strategy
- `defaults` - Global component defaults (size, radius, placement)
- Component-specific settings

### Environment Variables

```env
SPIRE_UI_PREFIX=spire
SPIRE_UI_ASSET_ROUTE=spire-ui
SPIRE_UI_DARK_MODE=class
```

## Usage

Components use the configured prefix (default: `spire`):

```blade
<x-spire::button>Click me</x-spire::button>
<x-spire::input label="Name" />
<x-spire::select :options="$options" />
```

### Component Naming Convention

Spire UI uses folder-based components with dot notation:

- Parent component: `<x-spire::dropdown />`
- Child component: `<x-spire::dropdown.item />`

## Theming

Spire UI uses semantic color tokens with automatic light/dark mode support.

### Available Tokens

- **Primary**: `primary`, `primary-hover`, `primary-active`, `primary-foreground`
- **Secondary**: `secondary`, `secondary-hover`, `secondary-active`, `secondary-foreground`
- **Surfaces**: `body`, `surface`, `overlay` (elevation hierarchy)
- **Text**: `text`, `text-muted`, `text-disabled`
- **Borders**: `border`, `border-hover`, `border-focus`
- **States**: `success`, `error`, `warning`, `info` (each with `-hover`, `-bg`, `-foreground`)

### Surface Elevation Hierarchy

Three-layer elevation system:

| Layer | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `body` | neutral-50 | neutral-950 | Page background |
| `surface` | white | neutral-900 | Cards, panels |
| `overlay` | neutral-100 | neutral-800 | Modals, dialogs |

```blade
<body class="bg-body text-text">
    <div class="bg-surface border border-border rounded-lg p-6">
        Card content
    </div>
</body>
```

### Customizing Theme

Publish the theme CSS file:

```bash
php artisan vendor:publish --tag=spire-ui-css
```

Edit `resources/css/spire-ui-theme.css` to customize colors.

## Localization

Spire UI supports English, French, and Arabic. Set your application locale:

```php
// config/app.php
'locale' => 'en', // or 'fr', 'ar'
```

Publish translations for customization:

```bash
php artisan vendor:publish --tag=spire-ui-lang
```

## Publishing Assets

| Tag | Description |
|-----|-------------|
| `spire-ui-config` | Configuration file |
| `spire-ui-views` | All component views |
| `spire-ui-lang` | Translation files |
| `spire-ui-css` | Theme CSS file |
| `spire-ui-layouts` | Layout components |

```bash
php artisan vendor:publish --tag=spire-ui-config
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

## License

MIT License
