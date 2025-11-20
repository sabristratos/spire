# Badge Component

The Badge system includes two components:
1. **Badge** - Standalone chip/tag for displaying labels and information
2. **Badge.Container** - Wrapper component for positioning notification badges on other elements

---

## Props

### Badge (Standalone Chip)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'solid' \| 'bordered' \| 'soft' \| 'dot'` | `'solid'` | Visual style: `solid` (filled), `bordered` (outline), `soft` (subtle), `dot` (minimal dot indicator) |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'featured'` | `'default'` | Color scheme |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius |
| `disabled` | `boolean` | `false` | Disabled state |

### Badge.Container (Positioned Badge Wrapper)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| number \| null` | `null` | Badge content (number or text) |
| `placement` | `'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left'` | `'top-right'` | Position relative to wrapped content |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'featured'` | `'error'` | Badge color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `isDot` | `boolean` | `false` | Show as small dot without content |
| `isInvisible` | `boolean` | `false` | Hide badge completely |
| `showOutline` | `boolean` | `true` | White ring around badge for contrast |

---

## Slots

### Badge Slots

| Slot | Description |
|------|-------------|
| `default` | Main badge content |
| `startContent` | Leading icon or avatar |
| `endContent` | Trailing icon or close button |

### Badge.Container Slots

| Slot | Description |
|------|-------------|
| `default` | Content to wrap (avatar, icon, button, etc.) |

---

## Examples

### Basic Badge (Standalone)

```blade
<x-spire::badge>Default</x-spire::badge>
<x-spire::badge color="primary">Primary</x-spire::badge>
<x-spire::badge color="success">Success</x-spire::badge>
```

### Badge Sizes

```blade
<x-spire::badge size="sm">Small</x-spire::badge>
<x-spire::badge size="md">Medium</x-spire::badge>
<x-spire::badge size="lg">Large</x-spire::badge>
```

### Badge Variants

```blade
{{-- Solid variant (filled background) --}}
<x-spire::badge variant="solid" color="primary">Solid</x-spire::badge>

{{-- Bordered variant (outline only) --}}
<x-spire::badge variant="bordered" color="primary">Bordered</x-spire::badge>

{{-- Soft variant (subtle background) --}}
<x-spire::badge variant="soft" color="primary">Soft</x-spire::badge>

{{-- Dot variant (small indicator only, no text background) --}}
<x-spire::badge variant="dot" color="primary">Dot Indicator</x-spire::badge>
```

### Badge with Icons

```blade
<x-spire::badge color="primary">
    <x-slot:startContent>
        <x-spire::icon name="user" class="w-3.5 h-3.5" />
    </x-slot:startContent>
    User Badge
</x-spire::badge>

<x-spire::badge color="success">
    <x-slot:startContent>
        <x-spire::icon name="check" class="w-3.5 h-3.5" />
    </x-slot:startContent>
    Verified
    <x-slot:endContent>
        <x-spire::icon name="x-close" class="w-3.5 h-3.5 cursor-pointer" wire:click="removeBadge" />
    </x-slot:endContent>
</x-spire::badge>
```

### Dot Variant (Minimal Status Indicator)

The `variant="dot"` shows a minimal colored dot indicator with text, useful for subtle status displays:

```blade
{{-- Minimal dot indicator without badge background --}}
<x-spire::badge variant="dot" color="success">Online</x-spire::badge>
<x-spire::badge variant="dot" color="error">Offline</x-spire::badge>
<x-spire::badge variant="dot" color="warning">Away</x-spire::badge>
```

### Positioned Badge (Notification)

```blade
<x-spire::badge.container content="5">
    <x-spire::button icon-only>
        <x-spire::icon name="bell" class="w-5 h-5" />
    </x-spire::button>
</x-spire::badge.container>
```

### Badge on Avatar

```blade
<x-spire::badge.container content="99+" color="error">
    <div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
        JD
    </div>
</x-spire::badge.container>
```

### Dot Badge (Online Status)

```blade
<x-spire::badge.container is-dot color="success" placement="bottom-right">
    <div class="w-10 h-10 rounded-full bg-neutral-200"></div>
</x-spire::badge.container>
```

### All Placements

```blade
<div class="flex gap-8">
    <x-spire::badge.container content="1" placement="top-right">
        <div class="w-12 h-12 rounded-lg bg-neutral-200"></div>
    </x-spire::badge.container>

    <x-spire::badge.container content="2" placement="top-left">
        <div class="w-12 h-12 rounded-lg bg-neutral-200"></div>
    </x-spire::badge.container>

    <x-spire::badge.container content="3" placement="bottom-right">
        <div class="w-12 h-12 rounded-lg bg-neutral-200"></div>
    </x-spire::badge.container>

    <x-spire::badge.container content="4" placement="bottom-left">
        <div class="w-12 h-12 rounded-lg bg-neutral-200"></div>
    </x-spire::badge.container>
</div>
```

### Invisible Badge (Toggle)

```blade
<x-spire::badge.container
    content="3"
    :is-invisible="$hideNotifications"
>
    <x-spire::button icon-only>
        <x-spire::icon name="mail" class="w-5 h-5" />
    </x-spire::button>
</x-spire::badge.container>
```

### Without Outline

```blade
<x-spire::badge.container content="5" :show-outline="false">
    <x-spire::icon name="bell" class="w-6 h-6" />
</x-spire::badge.container>
```

### List of Badges

```blade
<div class="flex flex-wrap gap-2">
    @foreach(['Apple', 'Banana', 'Cherry', 'Watermelon', 'Orange'] as $fruit)
        <x-spire::badge variant="soft" color="primary">
            {{ $fruit }}
            <x-slot:endContent>
                <x-spire::icon
                    name="x-close"
                    class="w-3 h-3 cursor-pointer hover:opacity-70"
                    wire:click="removeFruit('{{ $fruit }}')"
                />
            </x-slot:endContent>
        </x-spire::badge>
    @endforeach
</div>
```

---

## Best Practices

### Do

- Use standalone `Badge` for tags, labels, and status indicators
- Use `Badge.Container` for notification counts and status dots on avatars/icons
- Use color semantically (error for alerts, success for positive states, etc.)
- Use `variant="dot"` for minimal status indicators (Online/Offline/Away)
- Use `Badge.Container` with `isDot` for subtle online/offline indicators on avatars
- Keep badge content short (1-3 characters for numbers, single word for text)
- Use `isInvisible` to toggle badge visibility dynamically
- Use `showOutline` when badge is over images for better contrast

### Don't

- Don't use long text in positioned badges (use standalone Badge instead)
- Don't nest Badge.Container inside another Badge.Container
- Don't use positioned badges without wrapping content
- Don't forget to handle close button clicks (use `wire:click` on endContent icon)
- Don't use badges as primary navigation elements
- Don't use positioned badges on very small elements (minimum 24x24px recommended)
