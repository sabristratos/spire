# Icon Component

SVG icon component with size and color customization. Includes the complete Lucide icon set with 1800+ beautifully crafted open source icons.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | *required* | Icon name from the icon set (e.g., `'check'`, `'arrow-right'`) |
| `set` | string | `'lucide'` | Icon set to use (currently only `lucide` is available) |

Additionally, all standard HTML attributes are supported (`class`, `style`, `width`, `height`, etc.).

## Styling

Icons inherit the text color by default. Use Tailwind classes to customize:

- **Size**: `w-4 h-4`, `w-6 h-6`, `w-8 h-8`, or custom sizes
- **Color**: `text-primary`, `text-error`, `text-gray-500`, etc.
- **Stroke width**: Icons use `currentColor` and stroke-width can be customized via CSS

## Examples

### Basic Icons

```blade
{{-- Default icon (inherits text color and size) --}}
<x-spire::icon name="check" />

{{-- Icon with size --}}
<x-spire::icon name="arrow-right" class="w-6 h-6" />

{{-- Icon with custom color --}}
<x-spire::icon name="heart" class="w-5 h-5 text-error" />
```

### Icons in Buttons

```blade
<x-spire::button color="success">
    <x-slot:leading>
        <x-spire::icon name="check" class="w-4 h-4" />
    </x-slot:leading>
    Approve
</x-spire::button>

<x-spire::button icon-only color="primary" aria-label="Settings">
    <x-spire::icon name="settings" class="w-5 h-5" />
</x-spire::button>
```

### Icon Sizes

```blade
{{-- Small (16x16) --}}
<x-spire::icon name="star" class="w-4 h-4" />

{{-- Medium (20x20) --}}
<x-spire::icon name="star" class="w-5 h-5" />

{{-- Large (24x24) --}}
<x-spire::icon name="star" class="w-6 h-6" />

{{-- Extra Large (32x32) --}}
<x-spire::icon name="star" class="w-8 h-8" />
```

## Custom Icons

You can add your own custom icons that will be available alongside (or override) the built-in Lucide icons.

### Setup

Create your custom icon files in your application's resources folder:

```
resources/views/components/icons/custom/
├── my-logo.blade.php
├── custom-badge.blade.php
└── check.blade.php  {{-- Overrides Lucide's check icon --}}
```

### Creating a Custom Icon

Each custom icon is a Blade file containing an SVG. Use the `$attributes` variable to support styling:

```blade
{{-- resources/views/components/icons/custom/my-logo.blade.php --}}
<svg {{ $attributes->merge(['class' => 'inline-block']) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
    <path d="M2 17l10 5 10-5"/>
    <path d="M2 12l10 5 10-5"/>
</svg>
```

### Using Custom Icons

```blade
{{-- Use your custom icon --}}
<x-spire::icon name="my-logo" class="w-6 h-6" />

{{-- Custom icons override built-in icons with the same name --}}
<x-spire::icon name="check" />  {{-- Uses your custom check.blade.php --}}
```

### Resolution Order

Icons are resolved in this order (first match wins):

1. **Custom icons**: `resources/views/components/icons/custom/{name}.blade.php`
2. **Published vendor**: `resources/views/vendor/spire/icon/icons/{set}/{name}.blade.php`
3. **Package icons**: Built-in Lucide icons from the package

This means custom icons always take priority over built-in icons with the same name.

## Available Icons

The icon component uses the **Lucide** icon set, which includes 1800+ beautifully crafted open source icons covering:

- UI actions (check, x, edit, trash, etc.)
- Navigation (arrows, chevrons, menu, etc.)
- Communication (mail, message, phone, etc.)
- Media (play, pause, image, video, etc.)
- Files & folders
- E-commerce & shopping
- Weather & time
- And many more...

Browse available icons: [Lucide Icons](https://lucide.dev/icons/)

## Icon Not Found Behavior

- **Debug mode**: Shows a warning triangle with the missing icon name
- **Production mode**: Shows a generic circle icon as fallback
- Check the console or verify the icon name exists in the set

## Best Practices

### Do

- Use consistent icon sizes within the same context
- Set appropriate `aria-label` when icons are used without text
- Use semantic icon colors (`text-error` for destructive actions, `text-success` for positive actions)
- Use `w-{size} h-{size}` classes to maintain square aspect ratios
- Test icon visibility in both light and dark modes

### Don't

- Don't use icons alone without labels for critical actions (except with proper `aria-label`)
- Don't make icons too small (below 16x16 can be hard to see)
- Don't override the default `currentColor` fill unless necessary
- Don't use decorative icons for functional buttons without text alternatives
- Don't mix icon sets (stick to one set for consistency)
