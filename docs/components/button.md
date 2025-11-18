# Button Component

Interactive button component with multiple variants, colors, sizes, and states. Fully accessible with keyboard navigation support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'solid'` | Button style variant: `solid`, `bordered`, `ghost`, `soft`, `link` |
| `color` | string | `'default'` | Color theme: `default`, `primary`, `secondary`, `success`, `error`, `warning`, `info` |
| `size` | string | `'md'` | Button size: `sm`, `md`, `lg` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |
| `disabled` | boolean | `false` | Disables the button |
| `loading` | boolean | `false` | Shows loading spinner and disables interaction |
| `iconOnly` | boolean | `false` | Optimizes sizing for icon-only buttons (square shape) |
| `type` | string | `'button'` | HTML button type: `button`, `submit`, `reset` |
| `href` | string | `null` | If provided, renders as a link (`<a>`) instead of button |
| `ariaLabel` | string | `null` | Accessible label for screen readers (required for icon-only buttons) |
| `pressed` | boolean | `false` | Indicates pressed/active state (for toggle buttons) |
| `tooltip` | string | `null` | Tooltip text to display on hover |
| `tooltipPlacement` | string | `'top'` | Tooltip position: `top`, `bottom`, `left`, `right` |
| `tooltipDelay` | number | `300` | Hover delay before showing tooltip (in milliseconds) |

## Slots

| Slot | Description |
|------|-------------|
| Default | Button content (text, icons, etc.) |
| `leading` | Content before the main slot (typically icons) |
| `trailing` | Content after the main slot (typically icons) |
| `spinner` | Custom loading spinner (overrides default) |

## Examples

### Basic Button Variants

```blade
{{-- Solid variant (default) --}}
<x-spire::button color="primary">
    Save Changes
</x-spire::button>

{{-- Bordered variant --}}
<x-spire::button variant="bordered" color="primary">
    Cancel
</x-spire::button>

{{-- Ghost variant --}}
<x-spire::button variant="ghost" color="error">
    Delete
</x-spire::button>

{{-- Link variant --}}
<x-spire::button variant="link" color="primary">
    Learn More
</x-spire::button>
```

### Buttons with Icons

```blade
{{-- Icon before text --}}
<x-spire::button color="success">
    <x-slot:leading>
        <x-spire::icon name="check" size="sm" />
    </x-slot:leading>
    Approve
</x-spire::button>

{{-- Icon after text --}}
<x-spire::button color="primary">
    Next
    <x-slot:trailing>
        <x-spire::icon name="arrow-right" size="sm" />
    </x-slot:trailing>
</x-spire::button>

{{-- Icon-only button (requires ariaLabel) --}}
<x-spire::button
    icon-only
    color="error"
    aria-label="Delete item">
    <x-spire::icon name="trash" />
</x-spire::button>
```

### States and Sizes

```blade
{{-- Loading state --}}
<x-spire::button loading color="primary">
    Processing...
</x-spire::button>

{{-- Disabled state --}}
<x-spire::button disabled>
    Unavailable
</x-spire::button>

{{-- Different sizes --}}
<x-spire::button size="sm">Small</x-spire::button>
<x-spire::button size="md">Medium</x-spire::button>
<x-spire::button size="lg">Large</x-spire::button>

{{-- Link button --}}
<x-spire::button href="/dashboard" color="primary">
    Go to Dashboard
</x-spire::button>
```

### Buttons with Tooltips

```blade
{{-- Basic button with tooltip --}}
<x-spire::button
    color="primary"
    tooltip="Click to save your changes">
    Save
</x-spire::button>

{{-- Icon-only button with tooltip (recommended) --}}
<x-spire::button
    icon-only
    color="default"
    tooltip="Settings"
    aria-label="Open settings">
    <x-spire::icon name="settings" class="w-5 h-5" />
</x-spire::button>

{{-- Tooltip with custom placement --}}
<x-spire::button
    variant="ghost"
    tooltip="Delete this item permanently"
    tooltip-placement="bottom">
    <x-slot:leading>
        <x-spire::icon name="trash" class="w-4 h-4" />
    </x-slot:leading>
    Delete
</x-spire::button>

{{-- Tooltip with custom delay --}}
<x-spire::button
    tooltip="This tooltip appears after 500ms"
    tooltip-delay="500"
    color="secondary">
    Hover Me
</x-spire::button>

{{-- Multiple icon buttons with tooltips (toolbar pattern) --}}
<div class="flex gap-1">
    <x-spire::button icon-only variant="ghost" tooltip="Bold" aria-label="Bold">
        <x-spire::icon name="bold" class="w-4 h-4" />
    </x-spire::button>
    <x-spire::button icon-only variant="ghost" tooltip="Italic" aria-label="Italic">
        <x-spire::icon name="italic" class="w-4 h-4" />
    </x-spire::button>
    <x-spire::button icon-only variant="ghost" tooltip="Underline" aria-label="Underline">
        <x-spire::icon name="underline" class="w-4 h-4" />
    </x-spire::button>
</div>
```

## Best Practices

### Do

- Use `icon-only` prop for buttons with only an icon
- Always provide `ariaLabel` for icon-only buttons
- Use `loading` state during async operations
- Choose appropriate `variant` for visual hierarchy (solid for primary actions, ghost/link for secondary)
- Use semantic colors (`error` for destructive actions, `success` for confirmations)
- Add tooltips to icon-only buttons to clarify their purpose
- Use tooltips for buttons with abbreviated text or icons that need explanation
- Use appropriate `tooltipPlacement` to ensure tooltips don't overflow the viewport

### Don't

- Don't use icon-only buttons without `ariaLabel`
- Don't mix too many button variants on the same page
- Don't use `pressed` state for loading - use `loading` prop instead
- Don't forget to set `type="submit"` for form submission buttons
- Don't use `href` for actions - use it only for navigation
- Don't add tooltips with redundant information (e.g., "Click" on a clickable button)
- Don't use overly long tooltip text - keep it concise (1-5 words ideal)

---

## Button Group

Groups multiple buttons together horizontally or vertically with seamless styling. Automatically handles border collapsing and proper edge rounding.

### Button.group Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `vertical` | boolean | `false` | Stacks buttons vertically instead of horizontally |
| `ariaLabel` | string | `null` | Accessible label describing the button group's purpose |

### Button.group Slots

| Slot | Description |
|------|-------------|
| Default | Button components to group together |

### Button Group Examples

#### Horizontal Button Group

```blade
<x-spire::button.group aria-label="Text alignment">
    <x-spire::button color="primary">Left</x-spire::button>
    <x-spire::button color="primary">Center</x-spire::button>
    <x-spire::button color="primary">Right</x-spire::button>
</x-spire::button.group>
```

#### Vertical Button Group

```blade
<x-spire::button.group vertical aria-label="View options">
    <x-spire::button color="primary">Top</x-spire::button>
    <x-spire::button color="primary">Middle</x-spire::button>
    <x-spire::button color="primary">Bottom</x-spire::button>
</x-spire::button.group>
```

#### Icon-Only Button Group (Toolbar)

```blade
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

#### Bordered Button Group

```blade
<x-spire::button.group aria-label="Document actions">
    <x-spire::button variant="bordered">Edit</x-spire::button>
    <x-spire::button variant="bordered">Share</x-spire::button>
    <x-spire::button variant="bordered">Delete</x-spire::button>
</x-spire::button.group>
```

### Button Group Best Practices

#### Do

- Always provide `ariaLabel` describing the group's purpose
- Use the same `variant`, `color`, and `size` for all buttons in a group
- Keep button groups to 2-5 buttons for optimal UX
- Use icon-only buttons for compact toolbars
- Use vertical groups for navigation sidebars or mobile layouts

#### Don't

- Don't mix different button variants within the same group
- Don't mix different sizes - keep all buttons uniform
- Don't put too many buttons in one group (6+ becomes overwhelming)
- Don't nest button groups inside each other
- Don't use button groups for unrelated actions - group semantically related buttons only
