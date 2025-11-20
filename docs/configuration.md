# Configuration

Spire UI can be configured through the `config/spire-ui.php` configuration file.

## Publishing the Config

If you haven't already published the config file, run:

```bash
php artisan vendor:publish --tag=spire-ui-config
```

## Component Defaults

You can set global defaults for component properties. These defaults apply to form components and UI elements throughout your application.

### Global Defaults

Set defaults that apply to all components:

```php
'defaults' => [
    'size' => 'sm',              // sm, md, lg
    'radius' => 'lg',            // none, sm, md, lg, full
    'placement' => 'bottom-start', // Dropdown/popover placement
],
```

### Toast Notifications

Configure default toast behavior:

```php
'defaults' => [
    'toast' => [
        'duration' => 5000,       // Auto-dismiss time in ms
        'position' => 'bottom-right', // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
    ],
],
```

### Tooltip

Configure tooltip timing:

```php
'defaults' => [
    'tooltip' => [
        'delay' => 300,  // Show delay in ms
    ],
],
```

### Autocomplete

Configure search behavior:

```php
'defaults' => [
    'autocomplete' => [
        'debounce' => 300,  // Input debounce in ms
    ],
],
```

### Datepicker & Calendar

Configure date formatting and week start:

```php
'defaults' => [
    'datepicker' => [
        'format' => 'auto',        // 'auto', 'YYYY-MM-DD', 'DD/MM/YYYY', etc.
        'firstDayOfWeek' => null,  // null (locale), 0 (Sunday), 1 (Monday)
    ],
],
```

**Before** (without config):
```blade
<x-spire::input size="sm" radius="lg" />
<x-spire::button size="sm" radius="lg">Submit</x-spire::button>
<x-spire::select size="sm" radius="lg">...</x-spire::select>
```

**After** (with config defaults):
```blade
<x-spire::input />
<x-spire::button>Submit</x-spire::button>
<x-spire::select>...</x-spire::select>
```

### Per-Component Overrides

Override global defaults for specific components:

```php
'defaults' => [
    // Global defaults
    'size' => 'sm',
    'radius' => 'md',

    // Component-specific overrides
    'button' => [
        'size' => 'md',      // Buttons stay medium
        'radius' => 'full',  // Buttons get pill shape
    ],
    'input' => [
        'radius' => 'lg',    // Inputs get larger radius
    ],
],
```

### Supported Components

The following components support configurable defaults:

| Component | Supports `size` | Supports `radius` |
|-----------|-----------------|-------------------|
| `input` | Yes | Yes |
| `textarea` | Yes | Yes |
| `button` | Yes | Yes |
| `select` | Yes | Yes |
| `autocomplete` | Yes | Yes |
| `datepicker` | Yes | Yes |
| `timepicker` | Yes | Yes |
| `slider` | Yes | No |
| `field` | Yes | No |
| `checkbox` | Yes | No |
| `radio` | Yes | No |

### Priority Order

When determining a component's property value, Spire UI checks in this order:

1. **Explicit prop value** - Always takes precedence
2. **Component-specific config** - e.g., `defaults.button.size`
3. **Global config** - e.g., `defaults.size`
4. **Built-in fallback** - `'md'` for size and radius

**Example:**
```php
// Config
'defaults' => [
    'size' => 'sm',           // Global default
    'button' => [
        'size' => 'lg',       // Button-specific override
    ],
],
```

```blade
{{-- Uses explicit prop: 'md' --}}
<x-spire::button size="md">Medium</x-spire::button>

{{-- Uses button-specific config: 'lg' --}}
<x-spire::button>Large</x-spire::button>

{{-- Uses global config: 'sm' --}}
<x-spire::input />
```

## Full Configuration Reference

```php
<?php

return [
    // Component prefix (default: 'spire')
    // Usage: <x-spire::button />
    'prefix' => env('SPIRE_UI_PREFIX', 'spire'),

    'theme' => [
        // Dark mode strategy: 'class' or 'media'
        'dark_mode' => env('SPIRE_UI_DARK_MODE', 'class'),
    ],

    'components' => [
        'enabled' => true,
    ],

    'cdn' => [
        'enabled' => env('SPIRE_UI_CDN', false),
    ],

    'spinner' => [
        // Default spinner variant: 'ring', 'dots', 'pulse'
        'default_variant' => env('SPIRE_UI_SPINNER_VARIANT', 'ring'),
    ],

    'pagination' => [
        // Register Spire UI as default Laravel pagination view
        'register_default' => env('SPIRE_UI_PAGINATION_DEFAULT', true),
    ],

    'defaults' => [
        // Global defaults
        'size' => 'md',
        'radius' => 'md',
        'placement' => 'bottom-start',

        // Toast notifications
        'toast' => [
            'duration' => 5000,
            'position' => 'bottom-right',
        ],

        // Tooltip
        'tooltip' => [
            'delay' => 300,
        ],

        // Autocomplete
        'autocomplete' => [
            'debounce' => 300,
        ],

        // Datepicker & Calendar
        'datepicker' => [
            'format' => 'auto',
            'firstDayOfWeek' => null,
        ],

        // Per-component overrides (uncomment to customize)
        // 'button' => [
        //     'size' => 'sm',
        //     'radius' => 'lg',
        // ],
    ],
];
```
