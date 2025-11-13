# Button Group Component

Groups multiple buttons together horizontally or vertically with seamless styling. Automatically handles border collapsing and proper edge rounding.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | boolean | `false` | Stacks buttons vertically instead of horizontally |
| `ariaLabel` | string | `null` | Accessible label describing the button group's purpose |

## Slots

| Slot | Description |
|------|-------------|
| Default | Button components to group together |

## Examples

### Horizontal Button Group

```blade
<x-spire::button.group aria-label="Text alignment">
    <x-spire::button color="primary">Left</x-spire::button>
    <x-spire::button color="primary">Center</x-spire::button>
    <x-spire::button color="primary">Right</x-spire::button>
</x-spire::button.group>
```

### Vertical Button Group

```blade
<x-spire::button.group vertical aria-label="View options">
    <x-spire::button color="primary">Top</x-spire::button>
    <x-spire::button color="primary">Middle</x-spire::button>
    <x-spire::button color="primary">Bottom</x-spire::button>
</x-spire::button.group>
```

### Button Group with Different Variants

```blade
{{-- Bordered buttons --}}
<x-spire::button.group aria-label="Document actions">
    <x-spire::button variant="bordered">Edit</x-spire::button>
    <x-spire::button variant="bordered">Share</x-spire::button>
    <x-spire::button variant="bordered">Delete</x-spire::button>
</x-spire::button.group>

{{-- Icon-only buttons --}}
<x-spire::button.group aria-label="Text formatting">
    <x-spire::button icon-only aria-label="Bold">
        <x-spire::icon name="bold" />
    </x-spire::button>
    <x-spire::button icon-only aria-label="Italic">
        <x-spire::icon name="italic" />
    </x-spire::button>
    <x-spire::button icon-only aria-label="Underline">
        <x-spire::icon name="underline" />
    </x-spire::button>
</x-spire::button.group>
```

## Best Practices

### Do

- Always provide `ariaLabel` describing the group's purpose
- Use the same `variant`, `color`, and `size` for all buttons in a group
- Keep button groups to 2-5 buttons for optimal UX
- Use icon-only buttons for compact toolbars
- Use vertical groups for navigation sidebars or mobile layouts

### Don't

- Don't mix different button variants within the same group
- Don't mix different sizes - keep all buttons uniform
- Don't put too many buttons in one group (6+ becomes overwhelming)
- Don't nest button groups inside each other
- Don't use button groups for unrelated actions - group semantically related buttons only
