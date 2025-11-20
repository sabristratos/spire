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
