# Getting Started

Learn how to install and configure Spire UI in your Laravel application.

## Requirements

Spire UI has the following requirements:

- **PHP**: 8.3 or higher
- **Laravel**: 12.0 or higher
- **Livewire**: 3.0 or higher
- **Node.js**: 18.0 or higher (for asset compilation)
- **NPM**: 9.0 or higher

## Installation

### Step 1: Install via Composer

In a monorepo setup, Spire UI is already installed as a local package. For standalone installation in a new Laravel project:

```bash
composer require stratos/spire-ui
```

The service provider will be automatically discovered and registered by Laravel.

> **⚠️ Critical: Install JavaScript Dependencies**
>
> Spire UI requires JavaScript packages (Alpine.js, Tailwind CSS, polyfills, icons) that are **not** installed by Composer. You must run:
>
> ```bash
> npm install
> ```
>
> Without this step, interactive components (Select, Autocomplete, Datepicker, Modal, Timepicker, etc.) will not work. This is required because Composer only installs PHP packages, not JavaScript dependencies.

### Step 2: Publish Configuration (Optional)

Publish the configuration file to customize component defaults, theme settings, and more:

```bash
php artisan vendor:publish --tag=spire-ui-config
```

This creates `config/spire-ui.php` where you can set global defaults for component sizes, radius, colors, and other options.

[View Configuration Guide](configuration.md)

### Step 3: Set Up Assets

Spire UI requires CSS and JavaScript assets to be included in your application.

#### CSS Setup

Add Spire UI's CSS to your main stylesheet. In `resources/css/app.css`:

```css
@import "tailwindcss";
@import '../../packages/spire-ui/resources/css/index.css';

/* Or if installed via Composer: */
@import '../../vendor/spire-ui/spire-ui/resources/css/index.css';
```

**Note**: Spire UI uses Tailwind CSS v4 with CSS-first configuration via `@theme` directives. No `tailwind.config.js` is required.

#### JavaScript Setup

Initialize Spire UI's Alpine.js components in your main JavaScript file. In `resources/js/app.js`:

```javascript
import './bootstrap';
import { initializeSpireUI } from '../../packages/spire-ui/resources/js/index';

// Or if installed via Composer:
// import { initializeSpireUI } from '../../vendor/spire-ui/spire-ui/resources/js/index';

// Initialize Spire UI components
initializeSpireUI();
```

#### Build Assets

Compile your assets using Vite:

```bash
npm install
npm run build

# Or for development with hot reload:
npm run dev
```

### Step 4: Include Assets in Layout

Make sure your Blade layout includes the compiled assets:

```blade
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Your App</title>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @livewireStyles
</head>
<body>
    {{ $slot }}

    @livewireScripts
</body>
</html>
```

## Your First Component

Once installed, you can start using Spire UI components immediately. Here's a simple button example:

```blade
<x-spire::button>
    Click me
</x-spire::button>
```

### With Props

All components support extensive customization via props:

```blade
<x-spire::button
    color="primary"
    variant="solid"
    size="lg"
>
    Large Primary Button
</x-spire::button>
```

### With Icons

Many components support icon slots using Lucide icons:

```blade
<x-spire::button>
    <x-slot:leading>
        <x-spire::icon name="plus" />
    </x-slot:leading>
    Add Item
</x-spire::button>
```

## Livewire Integration

Spire UI is built for seamless Livewire integration. Use `wire:model` for two-way data binding:

### Form Input Example

```blade
<div>
    <x-spire::field label="Name" name="name">
        <x-spire::input wire:model="name" />
    </x-spire::field>

    <x-spire::field label="Email" name="email">
        <x-spire::input type="email" wire:model="email" />
    </x-spire::field>

    <x-spire::button wire:click="save">
        Save
    </x-spire::button>
</div>
```

### Select with Livewire

```blade
<x-spire::select wire:model="selectedCountry" placeholder="Select a country">
    <x-spire::select.option value="us" label="United States" />
    <x-spire::select.option value="uk" label="United Kingdom" />
    <x-spire::select.option value="ca" label="Canada" />
</x-spire::select>
```

### Using Entangle

For more complex Alpine.js interactions with Livewire:

```blade
<div x-data="{ open: @entangle('showModal') }">
    <x-spire::button @click="open = true">
        Open Modal
    </x-spire::button>

    <x-spire::modal :open="$wire.showModal">
        <x-spire::modal.header>
            <x-spire::modal.title>Modal Title</x-spire::modal.title>
        </x-spire::modal.header>

        Modal content goes here
    </x-spire::modal>
</div>
```

## Complete Form Example

Here's a complete form using multiple Spire UI components:

```blade
<form wire:submit="save">
    <div class="space-y-4">
        <x-spire::field label="Full Name" name="name" required>
            <x-spire::input wire:model="name" placeholder="John Doe" />
        </x-spire::field>

        <x-spire::field label="Email" name="email" required>
            <x-spire::input type="email" wire:model="email" placeholder="john@example.com" />
        </x-spire::field>

        <x-spire::field label="Country" name="country">
            <x-spire::select wire:model="country" placeholder="Select your country">
                <x-spire::select.option value="us" label="United States" />
                <x-spire::select.option value="uk" label="United Kingdom" />
                <x-spire::select.option value="ca" label="Canada" />
            </x-spire::select>
        </x-spire::field>

        <x-spire::field label="Bio" name="bio">
            <x-spire::textarea wire:model="bio" rows="4" placeholder="Tell us about yourself..." />
        </x-spire::field>

        <x-spire::field label="Newsletter" name="newsletter">
            <x-spire::checkbox wire:model="newsletter">
                Subscribe to our newsletter
            </x-spire::checkbox>
        </x-spire::field>

        <div class="flex gap-2">
            <x-spire::button type="submit" color="primary">
                Save Changes
            </x-spire::button>

            <x-spire::button type="button" variant="ghost" wire:click="cancel">
                Cancel
            </x-spire::button>
        </div>
    </div>
</form>
```

## Component Naming Convention

All Spire UI components use the `x-spire::` prefix (configurable via `config/spire-ui.php`):

- **Parent components**: `<x-spire::button />`, `<x-spire::card />`
- **Child components**: `<x-spire::card.header />`, `<x-spire::select.option />`

## Customizing the Prefix

You can change the component prefix in `config/spire-ui.php`:

```php
'prefix' => env('SPIRE_UI_PREFIX', 'spire'),
```

Or via environment variable in `.env`:

```env
SPIRE_UI_PREFIX=ui
```

Now use components as `<x-ui::button />`, `<x-ui::card />`, etc.

## Dark Mode

Spire UI includes automatic dark mode support using Tailwind's `dark:` variant system. Configure dark mode in your `config/spire-ui.php`:

```php
'theme' => [
    'dark_mode' => env('SPIRE_UI_DARK_MODE', 'class'),
],
```

Options:
- `'class'` - Toggle dark mode with a `.dark` class on the `<html>` element
- `'media'` - Automatic dark mode based on system preferences

Add the `dark` class to your HTML element to enable dark mode:

```blade
<html class="dark">
```

[View Theming Guide](theming.md) for more customization options.

## Publishing Views (Advanced)

If you need to customize component templates, publish the views:

```bash
php artisan vendor:publish --tag=spire-ui-views
```

This copies all component templates to `resources/views/vendor/spire-ui/` where you can modify them.

**Warning**: Publishing views means you won't receive component updates automatically. Only publish what you need to customize.

## Publishing Translations

Spire UI includes translations for English, French, and Arabic. To customize translations:

```bash
php artisan vendor:publish --tag=spire-ui-lang
```

This copies language files to `lang/vendor/spire-ui/` where you can modify or add translations.

## Next Steps

Now that you have Spire UI installed, explore the documentation:

1. **[Configuration](configuration.md)** - Set global defaults for all components
2. **[Theming](theming.md)** - Customize colors, spacing, and design tokens
3. **[Forms Guide](forms.md)** - Learn form component patterns and validation
4. **[Components](index.md#components)** - Explore all 45+ available components

### Popular Components to Start With

- **[Button](components/button.md)** - Interactive buttons with variants and icons
- **[Input](components/input.md)** - Text inputs with enhanced features
- **[Field](components/field.md)** - Form field wrapper with labels and errors
- **[Select](components/select.md)** - Dropdown selection with search
- **[Modal](components/modal.md)** - Dialogs and flyout panels
- **[Card](components/card.md)** - Content containers
- **[Alert](components/alert.md)** - User notifications

## Troubleshooting

### Components Not Rendering

1. Ensure assets are compiled: `npm run build`
2. Check that `@vite()` directive includes both CSS and JS
3. Verify `@livewireStyles` and `@livewireScripts` are in your layout

### Alpine.js Not Working

1. Ensure `initializeSpireUI()` is called in your JavaScript
2. Check browser console for JavaScript errors
3. Verify Alpine.js is loaded (Livewire includes Alpine.js)

### Styles Not Applied

1. Ensure Spire UI CSS is imported in your `app.css`
2. Run `npm run build` to compile assets
3. Clear browser cache and reload

### Icons Not Showing

1. Ensure you're using valid Lucide icon names
2. Check the [Lucide icon list](https://lucide.dev/icons/)
3. Verify the icon component is correctly used: `<x-spire::icon name="check" />`

## Getting Help

- **Documentation**: [Browse all component docs](index.md)
- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions

## What's Next?

Ready to build? Start with these resources:

- [Configuration Guide](configuration.md) - Set up global defaults
- [Theming Guide](theming.md) - Customize your design system
- [Forms Guide](forms.md) - Build forms with validation
- [All Components](index.md#components) - Explore the full component library
