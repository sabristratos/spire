# Card Component

A versatile container component for grouping related content, including text, images, and actions.

---

## Props

### Card (Main Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shadow` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Shadow depth for elevation effect (only applies to `elevated` variant) |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| 'full'` | `'lg'` | Border radius of the card |
| `variant` | `'elevated' \| 'bordered' \| 'flat'` | `'elevated'` | Visual style of the card |
| `fullWidth` | `boolean` | `false` | Makes the card take full width of its container |
| `isHoverable` | `boolean` | `false` | Adds hover effect with scale and shadow increase |
| `isPressable` | `boolean` | `false` | Makes the card clickable with press effect |
| `isBlurred` | `boolean` | `false` | Applies blur effect to the entire card background |
| `isFooterBlurred` | `boolean` | `false` | Applies blur effect only to the footer |
| `href` | `string \| null` | `null` | If provided, renders card as a link |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding of the card |

### Card.Media

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aspectRatio` | `'auto' \| 'square' \| 'video' \| 'portrait'` | `'video'` | Aspect ratio for the media container |
| `src` | `string \| null` | `null` | Image source URL (optional if using slot) |
| `alt` | `string` | `''` | Alt text for the image |

**Note**: Media is full-bleed by default (touches card edges) for a modern look.

### Card.Header, Card.Body, Card.Footer

These child components have no specific props and accept all standard HTML attributes.

---

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main content area of the card or child component |

---

## Examples

### Basic Card

```blade
<x-spire::card>
    <x-spire::card.header>
        <h3 class="text-lg font-semibold text-text">Card Title</h3>
        <p class="text-sm text-muted">Subtitle or description</p>
    </x-spire::card.header>

    <x-spire::card.body>
        <p class="text-muted">
            Make beautiful websites regardless of your design experience.
        </p>
    </x-spire::card.body>
</x-spire::card>
```

### Card with Image

```blade
<x-spire::card class="max-w-sm">
    <x-spire::card.media
        src="https://example.com/image.jpg"
        alt="Daily Mix"
        aspect-ratio="video"
    />

    <x-spire::card.body>
        <h4 class="font-semibold text-text">Daily Mix</h4>
        <p class="text-sm text-muted">12 Tracks</p>
    </x-spire::card.body>

    <x-spire::card.footer>
        <x-spire::button variant="ghost" size="sm">Play</x-spire::button>
    </x-spire::card.footer>
</x-spire::card>
```

### Blurred Footer Card

```blade
<x-spire::card is-footer-blurred class="max-w-sm">
    <x-spire::card.media
        src="https://example.com/album-cover.jpg"
        alt="Album Cover"
    />

    <x-spire::card.footer>
        <div>
            <p class="font-semibold text-text">Woman listing to music</p>
            <p class="text-xs text-muted">Available soon.</p>
        </div>
    </x-spire::card.footer>
</x-spire::card>
```

### Pressable Card (Interactive)

```blade
<x-spire::card
    is-pressable
    is-hoverable
    class="max-w-xs"
    wire:click="selectFruit('orange')"
>
    <x-spire::card.body class="text-center">
        <div class="text-4xl mb-2">🍊</div>
        <h4 class="font-semibold text-text">Orange</h4>
        <p class="text-sm text-muted">$5.50</p>
    </x-spire::card.body>
</x-spire::card>
```

### Card as Link

```blade
<x-spire::card
    href="/products/123"
    is-hoverable
    class="max-w-md"
>
    <x-spire::card.media
        src="https://example.com/product.jpg"
        alt="Product Image"
    />

    <x-spire::card.body>
        <h3 class="font-semibold text-text">Product Name</h3>
        <p class="text-sm text-muted">$99.00</p>
    </x-spire::card.body>
</x-spire::card>
```

### Bordered Variant

```blade
<x-spire::card variant="bordered" shadow="none">
    <x-spire::card.header>
        <h3 class="text-lg font-semibold text-text">Settings</h3>
    </x-spire::card.header>

    <x-spire::card.body>
        <p class="text-muted">Configure your preferences.</p>
    </x-spire::card.body>

    <x-spire::card.footer>
        <x-spire::button variant="ghost">Cancel</x-spire::button>
        <x-spire::button>Save</x-spire::button>
    </x-spire::card.footer>
</x-spire::card>
```

### Custom Styling with Gradients

```blade
<x-spire::card
    variant="flat"
    is-blurred
    class="bg-gradient-to-br from-primary to-secondary max-w-md"
>
    <x-spire::card.body class="text-white">
        <h2 class="text-2xl font-bold mb-2">Premium Features</h2>
        <p class="opacity-90">Unlock all features with our premium plan.</p>
    </x-spire::card.body>

    <x-spire::card.footer>
        <x-spire::button class="bg-white text-primary">
            Upgrade Now
        </x-spire::button>
    </x-spire::card.footer>
</x-spire::card>
```

---

## Best Practices

### Do

- Use `isHoverable` for cards that are clickable or lead somewhere
- Use `isPressable` with `wire:click` for interactive cards
- Combine `isFooterBlurred` with media components for modern overlays
- Use `variant="bordered"` with `shadow="none"` for subtle containers
- Apply custom backgrounds and gradients via class merging
- Use `Card.Media` for full-bleed hero images (default behavior)
- Add `fullWidth` for cards in grid layouts

### Don't

- Don't nest cards inside other cards (creates visual confusion)
- Don't use both `href` and `wire:click` (choose one interaction pattern)
- Don't forget alt text for images in `Card.Media`
- Don't use `isHoverable` without making the card interactive
- Don't override padding on child components (let them manage spacing)
- Don't use `isBlurred` without a suitable background (blur needs context)
- Don't make cards too wide without content justification (max 600px typical)
