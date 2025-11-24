# Popover Component

Floating content panel that appears relative to a trigger element. Uses native Popover API with CSS anchor positioning for reliable placement.

## Overview

The Popover component provides:

- Click, hover, or manual trigger modes
- Flexible placement options
- Light dismiss behavior
- Customizable size and padding
- Native Popover API benefits

---

## Components

- `popover` - Container with Alpine context
- `popover.trigger` - Element that triggers the popover
- `popover.content` - Floating content panel

---

## Props

### Popover (Container)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | string | `'bottom-start'` | Position relative to trigger |
| `type` | string | `'auto'` | Popover type: `auto` (light dismiss), `manual` |
| `trigger` | string | `'click'` | Trigger mode: `click`, `hover`, `both`, `manual` |

### Popover.content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Max-width: `sm`, `md`, `lg`, `xl` |
| `padding` | string | `'normal'` | Padding: `none`, `sm`, `normal`, `lg` |

---

## Placement Options

- `top`, `top-start`, `top-end`
- `bottom`, `bottom-start`, `bottom-end`
- `left`, `left-start`, `left-end`
- `right`, `right-start`, `right-end`

---

## Examples

### Basic Click Popover

```blade
<x-spire::popover>
    <x-spire::popover.trigger>
        <x-spire::button>Open Menu</x-spire::button>
    </x-spire::popover.trigger>

    <x-spire::popover.content>
        <p>Popover content goes here</p>
    </x-spire::popover.content>
</x-spire::popover>
```

### Hover Triggered

Ideal for tooltips and help text:

```blade
<x-spire::popover trigger="hover" placement="top">
    <x-spire::popover.trigger>
        <span class="underline cursor-help">Hover me</span>
    </x-spire::popover.trigger>

    <x-spire::popover.content size="sm" padding="sm">
        <p class="text-sm">Helpful information</p>
    </x-spire::popover.content>
</x-spire::popover>
```

### Both Click and Hover

Shows on hover, pins on click:

```blade
<x-spire::popover trigger="both" placement="right">
    <x-spire::popover.trigger>
        <x-spire::button variant="ghost" size="sm" iconOnly>
            <x-spire::icon name="info" class="w-4 h-4" />
        </x-spire::button>
    </x-spire::popover.trigger>

    <x-spire::popover.content size="lg" padding="lg">
        <h3 class="font-semibold mb-2">Details</h3>
        <p>Content appears on hover and stays pinned on click.</p>
    </x-spire::popover.content>
</x-spire::popover>
```

### Different Placements

```blade
{{-- Top --}}
<x-spire::popover placement="top">
    <x-spire::popover.trigger>
        <x-spire::button>Top</x-spire::button>
    </x-spire::popover.trigger>
    <x-spire::popover.content>
        Content above trigger
    </x-spire::popover.content>
</x-spire::popover>

{{-- Right --}}
<x-spire::popover placement="right">
    <x-spire::popover.trigger>
        <x-spire::button>Right</x-spire::button>
    </x-spire::popover.trigger>
    <x-spire::popover.content>
        Content to the right
    </x-spire::popover.content>
</x-spire::popover>
```

### Size Variants

```blade
{{-- Small --}}
<x-spire::popover>
    <x-spire::popover.trigger>
        <x-spire::button>Small</x-spire::button>
    </x-spire::popover.trigger>
    <x-spire::popover.content size="sm">
        Compact content
    </x-spire::popover.content>
</x-spire::popover>

{{-- Extra Large --}}
<x-spire::popover>
    <x-spire::popover.trigger>
        <x-spire::button>Large</x-spire::button>
    </x-spire::popover.trigger>
    <x-spire::popover.content size="xl" padding="lg">
        Extended content with more space
    </x-spire::popover.content>
</x-spire::popover>
```

### Programmatic Control

Manual trigger mode for full control:

```blade
<x-spire::popover trigger="manual">
    <x-spire::popover.trigger>
        <x-spire::button @click="toggle()">Toggle</x-spire::button>
    </x-spire::popover.trigger>

    <x-spire::popover.content>
        <p class="mb-3">Manually controlled popover</p>
        <x-spire::button @click="hide()" size="sm">
            Close
        </x-spire::button>
    </x-spire::popover.content>
</x-spire::popover>
```

### With Rich Content

```blade
<x-spire::popover placement="bottom-start">
    <x-spire::popover.trigger>
        <x-spire::button variant="bordered">
            User Menu
            <x-spire::icon name="chevron-down" class="w-4 h-4 ml-1" />
        </x-spire::button>
    </x-spire::popover.trigger>

    <x-spire::popover.content size="md" padding="none">
        <div class="p-3 border-b border-border">
            <p class="font-medium">John Doe</p>
            <p class="text-sm text-muted">john@example.com</p>
        </div>
        <div class="p-2">
            <a href="#" class="block px-3 py-2 rounded hover:bg-hover">Profile</a>
            <a href="#" class="block px-3 py-2 rounded hover:bg-hover">Settings</a>
            <a href="#" class="block px-3 py-2 rounded hover:bg-hover text-error">
                Sign out
            </a>
        </div>
    </x-spire::popover.content>
</x-spire::popover>
```

### Info Popover

```blade
<div class="flex items-center gap-2">
    <span>Total Price</span>
    <x-spire::popover trigger="hover" placement="top">
        <x-spire::popover.trigger>
            <x-spire::icon name="info" class="w-4 h-4 text-muted cursor-help" />
        </x-spire::popover.trigger>
        <x-spire::popover.content size="sm" padding="sm">
            <p class="text-sm">Includes tax and shipping fees</p>
        </x-spire::popover.content>
    </x-spire::popover>
</div>
```

### Confirmation Popover

```blade
<x-spire::popover placement="top">
    <x-spire::popover.trigger>
        <x-spire::button color="error" variant="ghost" size="sm">
            Delete
        </x-spire::button>
    </x-spire::popover.trigger>

    <x-spire::popover.content size="sm">
        <p class="font-medium mb-2">Are you sure?</p>
        <p class="text-sm text-muted mb-3">This action cannot be undone.</p>
        <div class="flex gap-2">
            <x-spire::button size="sm" variant="ghost" @click="hide()">
                Cancel
            </x-spire::button>
            <x-spire::button size="sm" color="error" wire:click="delete">
                Delete
            </x-spire::button>
        </div>
    </x-spire::popover.content>
</x-spire::popover>
```

---

## Alpine.js API

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `open` | boolean | Whether popover is visible |
| `isPinned` | boolean | Whether popover is pinned (both mode) |

### Methods

| Method | Description |
|--------|-------------|
| `toggle()` | Toggle visibility |
| `show()` | Open popover |
| `hide()` | Close popover |

---

## Trigger Modes

| Mode | Behavior |
|------|----------|
| `click` | Toggle on click (default) |
| `hover` | Show on mouseenter, hide on mouseleave |
| `both` | Show on hover, click to pin open |
| `manual` | No automatic behavior, use `toggle()`/`show()`/`hide()` |

---

## Accessibility

- Uses native Popover API for proper focus management
- Light dismiss with `type="auto"` (Escape key, click outside)
- Content moved to top-layer for proper stacking
- Auto-generated IDs for ARIA relationships

---

## Best Practices

### Do

- Use `click` for menus and actions
- Use `hover` for tooltips and brief info
- Use `both` for content users may want to interact with
- Use `manual` for complex programmatic control
- Choose placement to avoid viewport clipping
- Keep content focused and concise

### Don't

- Don't nest popovers inside other popovers
- Don't use for complex multi-step interactions (use modal)
- Don't forget about mobile (hover doesn't work on touch)
- Don't put critical actions only in popovers

---

## Technical Notes

- Uses shared `spireOverlay` Alpine component
- CSS anchor positioning for placement
- 300ms delay before hiding on mouseleave
- Implements `destroy()` for cleanup
- Animations use `@starting-style` for smooth open/close
