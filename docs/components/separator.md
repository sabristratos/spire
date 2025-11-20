# Separator

A visual divider that separates content with an optional label in the middle.

## Basic Usage

```blade
<x-spire::separator />
```

## With Content

Add text or any content inside the separator:

```blade
<x-spire::separator>OR</x-spire::separator>

<x-spire::separator>
    <x-spire::icon name="star" class="w-4 h-4" />
</x-spire::separator>

<x-spire::separator>Continue reading</x-spire::separator>
```

## Orientation

Use `orientation` to create horizontal (default) or vertical separators:

```blade
{{-- Horizontal (default) --}}
<x-spire::separator />

{{-- Vertical --}}
<div class="flex items-center h-8">
    <span>Left</span>
    <x-spire::separator orientation="vertical" />
    <span>Right</span>
</div>
```

## Colors

Use the `color` prop to change the separator color:

```blade
<x-spire::separator color="default" />
<x-spire::separator color="primary" />
<x-spire::separator color="secondary" />
<x-spire::separator color="muted" />
```

## Size (Thickness)

Control the line thickness with the `size` prop:

```blade
<x-spire::separator size="sm" />  {{-- 1px --}}
<x-spire::separator size="md" />  {{-- 2px (default) --}}
<x-spire::separator size="lg" />  {{-- 4px --}}
```

## Spacing

Control the margin around the separator with the `spacing` prop:

```blade
<x-spire::separator spacing="sm" />  {{-- 8px margin --}}
<x-spire::separator spacing="md" />  {{-- 16px margin (default) --}}
<x-spire::separator spacing="lg" />  {{-- 24px margin --}}
```

## Label Position

When content is provided, control its position with `labelPosition`:

```blade
<x-spire::separator labelPosition="start">Section</x-spire::separator>
<x-spire::separator labelPosition="center">Section</x-spire::separator>
<x-spire::separator labelPosition="end">Section</x-spire::separator>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `string` | `'horizontal'` | Orientation of the separator (`horizontal`, `vertical`) |
| `color` | `string` | `'default'` | Color variant (`default`, `primary`, `secondary`, `muted`) |
| `size` | `string` | `'md'` | Line thickness (`sm`, `md`, `lg`) |
| `spacing` | `string` | `'md'` | Margin around the separator (`sm`, `md`, `lg`) |
| `labelPosition` | `string` | `'center'` | Position of the label content (`start`, `center`, `end`) |

## Accessibility

- Uses `role="separator"` for semantic meaning
- Includes `aria-orientation` attribute

## Examples

### Login Form Divider

```blade
<form>
    <x-spire::button class="w-full">Continue with Google</x-spire::button>

    <x-spire::separator spacing="lg">or continue with email</x-spire::separator>

    <x-spire::input type="email" placeholder="Email" />
    <x-spire::button class="w-full" color="primary">Sign In</x-spire::button>
</form>
```

### Section Header

```blade
<x-spire::separator labelPosition="start" color="primary" size="lg">
    <span class="font-semibold text-primary">Featured Products</span>
</x-spire::separator>
```

### Inline Vertical Separator

```blade
<div class="flex items-center gap-2">
    <span>Home</span>
    <x-spire::separator orientation="vertical" spacing="sm" />
    <span>Products</span>
    <x-spire::separator orientation="vertical" spacing="sm" />
    <span>Contact</span>
</div>
```
