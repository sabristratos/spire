# Tooltip Component

Contextual information overlay that appears on hover or focus. Features automatic positioning, delay controls, arrow indicators, and full accessibility support with ARIA attributes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | string | `''` | Tooltip text content |
| `placement` | string | `'top'` | Tooltip position: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`, `left-start`, `left-end`, `right-start`, `right-end` |
| `trigger` | string | `'hover'` | Trigger type: `hover` (default) or `click` |
| `delay` | number | `300` | Delay in milliseconds before showing tooltip (hover only) |
| `duration` | number | `null` | Auto-hide duration in milliseconds (null = manual hide) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger element that shows the tooltip on hover/click |

---

## Examples

### Basic Tooltip

Simple tooltip that appears on hover:

```blade
<x-spire::tooltip content="This is a helpful tooltip">
    <x-spire::button variant="ghost">
        Hover me
    </x-spire::button>
</x-spire::tooltip>
```

### Icon with Tooltip

Add contextual help to icons:

```blade
<x-spire::tooltip content="Additional information about this feature">
    <x-spire::icon name="info" class="cursor-help" />
</x-spire::tooltip>
```

### Different Placements

Control where the tooltip appears relative to the trigger:

```blade
{{-- Top (default) --}}
<x-spire::tooltip content="Tooltip on top" placement="top">
    <x-spire::button variant="bordered">Top</x-spire::button>
</x-spire::tooltip>

{{-- Bottom --}}
<x-spire::tooltip content="Tooltip on bottom" placement="bottom">
    <x-spire::button variant="bordered">Bottom</x-spire::button>
</x-spire::tooltip>

{{-- Left --}}
<x-spire::tooltip content="Tooltip on left" placement="left">
    <x-spire::button variant="bordered">Left</x-spire::button>
</x-spire::tooltip>

{{-- Right --}}
<x-spire::tooltip content="Tooltip on right" placement="right">
    <x-spire::button variant="bordered">Right</x-spire::button>
</x-spire::tooltip>
```

### Placement Variations

Fine-tune tooltip positioning with placement variants:

```blade
{{-- Top Start - aligned to left edge --}}
<x-spire::tooltip content="Aligned to start" placement="top-start">
    <x-spire::button variant="bordered">Top Start</x-spire::button>
</x-spire::tooltip>

{{-- Top End - aligned to right edge --}}
<x-spire::tooltip content="Aligned to end" placement="top-end">
    <x-spire::button variant="bordered">Top End</x-spire::button>
</x-spire::tooltip>

{{-- Bottom Start --}}
<x-spire::tooltip content="Aligned to start" placement="bottom-start">
    <x-spire::button variant="bordered">Bottom Start</x-spire::button>
</x-spire::tooltip>
```

### Click Trigger

Show tooltip on click instead of hover:

```blade
<x-spire::tooltip content="Click to see this tooltip" trigger="click">
    <x-spire::button variant="bordered">
        Click me
    </x-spire::button>
</x-spire::tooltip>
```

**Note**: Click tooltips can be dismissed by:
- Clicking the trigger again
- Pressing the Escape key
- Clicking outside the tooltip

### Custom Delay

Adjust hover delay before tooltip appears:

```blade
{{-- No delay - instant tooltip --}}
<x-spire::tooltip content="Appears immediately" :delay="0">
    <x-spire::button variant="bordered">No Delay</x-spire::button>
</x-spire::tooltip>

{{-- Default delay (300ms) --}}
<x-spire::tooltip content="Default delay">
    <x-spire::button variant="bordered">Default</x-spire::button>
</x-spire::tooltip>

{{-- Long delay - 1 second --}}
<x-spire::tooltip content="Takes a moment" :delay="1000">
    <x-spire::button variant="bordered">Long Delay</x-spire::button>
</x-spire::tooltip>
```

### Auto-Hide Duration

Automatically hide tooltip after a specified duration:

```blade
{{-- Auto-hide after 3 seconds --}}
<x-spire::tooltip
    content="This will disappear in 3 seconds"
    :duration="3000"
>
    <x-spire::button variant="bordered">
        Auto-hide Tooltip
    </x-spire::button>
</x-spire::tooltip>

{{-- Combined with click trigger --}}
<x-spire::tooltip
    content="Click to show - auto-hides in 5 seconds"
    trigger="click"
    :duration="5000"
>
    <x-spire::button variant="bordered">
        Click for Timed Tooltip
    </x-spire::button>
</x-spire::tooltip>
```

### Tooltip on Disabled Button

Show tooltips on disabled elements (requires wrapper):

```blade
{{-- Disabled buttons don't trigger hover events, wrap in a div --}}
<x-spire::tooltip content="This action is not available">
    <div class="inline-flex">
        <x-spire::button disabled>
            Disabled Button
        </x-spire::button>
    </div>
</x-spire::tooltip>
```

### Form Field Help

Add contextual help to form fields:

```blade
<x-spire::field label="Password" name="password">
    <div class="flex items-center gap-2">
        <x-spire::input type="password" wire:model="password" class="flex-1" />

        <x-spire::tooltip
            content="Password must be at least 8 characters with uppercase, lowercase, and numbers"
            placement="right"
        >
            <x-spire::icon name="help-circle" class="text-muted cursor-help" />
        </x-spire::tooltip>
    </div>
</x-spire::field>
```

### Table Cell Truncation

Show full content in tooltip for truncated text:

```blade
<table class="w-full">
    <tbody>
        @foreach($items as $item)
            <tr>
                <td class="truncate max-w-xs">
                    <x-spire::tooltip :content="$item->description">
                        <span class="cursor-default">
                            {{ Str::limit($item->description, 50) }}
                        </span>
                    </x-spire::tooltip>
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
```

### Action Descriptions

Explain button actions with tooltips:

```blade
<div class="flex gap-2">
    <x-spire::tooltip content="Save your changes">
        <x-spire::button color="primary" size="sm" icon-only>
            <x-spire::icon name="save" />
        </x-spire::button>
    </x-spire::tooltip>

    <x-spire::tooltip content="Discard changes">
        <x-spire::button color="error" variant="ghost" size="sm" icon-only>
            <x-spire::icon name="x" />
        </x-spire::button>
    </x-spire::tooltip>

    <x-spire::tooltip content="Download as PDF">
        <x-spire::button variant="bordered" size="sm" icon-only>
            <x-spire::icon name="download" />
        </x-spire::button>
    </x-spire::tooltip>
</div>
```

### Badge with Tooltip

Add explanations to status badges:

```blade
<div class="flex gap-2">
    <x-spire::tooltip content="Account is active and verified">
        <x-spire::badge color="success">Active</x-spire::badge>
    </x-spire::tooltip>

    <x-spire::tooltip content="Waiting for email verification">
        <x-spire::badge color="warning">Pending</x-spire::badge>
    </x-spire::tooltip>

    <x-spire::tooltip content="Account has been suspended">
        <x-spire::badge color="error">Suspended</x-spire::badge>
    </x-spire::tooltip>
</div>
```

---

## Best Practices

### Do

✅ **Keep content brief** - Tooltips are for short, supplementary information
```blade
<x-spire::tooltip content="Create a new document">
```

✅ **Use for icon buttons** - Explain actions when no text label is present
```blade
<x-spire::tooltip content="Settings">
    <x-spire::button icon-only>
        <x-spire::icon name="settings" />
    </x-spire::button>
</x-spire::tooltip>
```

✅ **Provide contextual help** - Add hints for form fields and actions
```blade
<x-spire::tooltip content="Choose a unique username" placement="right">
    <x-spire::icon name="info" />
</x-spire::tooltip>
```

✅ **Use appropriate delay** - Default 300ms works for most cases

✅ **Choose correct placement** - Position to avoid overlapping important content

### Don't

❌ **Don't use for critical information** - Tooltips are hidden by default
```blade
{{-- Bad: Critical validation message --}}
<x-spire::tooltip content="This field is required">
    <x-spire::input wire:model="name" />
</x-spire::tooltip>

{{-- Good: Use error message instead --}}
<x-spire::field label="Name" name="name" error="This field is required">
    <x-spire::input wire:model="name" />
</x-spire::field>
```

❌ **Don't overload with text** - Keep it concise
```blade
{{-- Bad: Too much text --}}
<x-spire::tooltip content="This button will save your changes to the database and send a confirmation email to all administrators...">
```

❌ **Don't add tooltips to every element** - Use sparingly where needed

❌ **Don't nest interactive elements** - Tooltips on tooltips create confusion

❌ **Don't rely on tooltips for mobile** - Hover doesn't exist on touch devices

---

## Accessibility

### ARIA Attributes

The Tooltip component implements proper ARIA attributes automatically:

- `role="tooltip"` - Identifies the tooltip element
- `aria-describedby` - Links trigger to tooltip content
- `popover="hint"` - Uses native popover API for proper layering

### Keyboard Navigation

**Hover Trigger** (default):
- **Focus**: Shows tooltip when trigger receives focus
- **Blur**: Hides tooltip when trigger loses focus

**Click Trigger**:
- **Enter/Space**: Opens tooltip
- **Escape**: Closes tooltip
- **Tab**: Normal focus navigation (tooltip remains open until dismissed)

### Screen Reader Support

- Tooltip content is announced when trigger is focused
- Native popover API ensures proper screen reader announcements
- `aria-describedby` provides semantic relationship between trigger and tooltip

### Best Practices

1. **Use meaningful trigger text** - Screen readers announce the trigger element
2. **Keep content concise** - Screen readers will read the entire tooltip
3. **Avoid complex HTML** - Tooltips should contain simple text only
4. **Provide alternative cues** - Don't rely solely on hover for important information

---

## Technical Notes

### Positioning

Tooltips use CSS anchor positioning with automatic collision detection:

- **Auto-positioning**: Flips to opposite side if there's no room
- **Auto-alignment**: Adjusts alignment to stay in viewport
- **Offset**: 8px default spacing from trigger element

### Performance

- **Hover delay**: Prevents tooltip flashing during quick mouse movements
- **Cleanup**: Automatically clears timers on component destroy
- **Memory efficient**: No event listener leaks

### Dark Mode

Tooltips automatically adapt to dark mode:
- Light mode: Dark background (`neutral-900`)
- Dark mode: Slightly lighter background (`neutral-800`)

### Browser Support

Requires modern browser support for:
- **Popover API**: Chrome 114+, Safari 17+, Firefox 125+
- **CSS Anchor Positioning**: Polyfilled via `@oddbird/css-anchor-positioning`

### Alpine.js Integration

The component is powered by the `spireTooltip` Alpine.js component:

```javascript
x-data="spireTooltip({
    placement: 'top',
    trigger: 'hover',
    delay: 300,
    duration: null
})"
```

### Styling

Tooltips use the `.spire-tooltip__content` class for styling. Customize in your CSS:

```css
.spire-tooltip__content {
    /* Custom styles */
    @apply bg-primary text-white;
    @apply text-sm;
}
```

---

## Related Components

- **[Popover](popover.md)** - For interactive overlays with rich content and user actions
- **[Modal](modal.md)** - For full dialogs requiring user attention
- **[Field Helper](form-primitives.md)** - For persistent form field guidance
- **[Alert](alert.md)** - For important inline messages

---

## Common Patterns

### Icon Button Toolbar

```blade
<div class="flex items-center gap-1 p-1 bg-surface rounded-lg">
    <x-spire::tooltip content="Bold (Ctrl+B)">
        <x-spire::button variant="ghost" size="sm" icon-only>
            <x-spire::icon name="bold" />
        </x-spire::button>
    </x-spire::tooltip>

    <x-spire::tooltip content="Italic (Ctrl+I)">
        <x-spire::button variant="ghost" size="sm" icon-only>
            <x-spire::icon name="italic" />
        </x-spire::button>
    </x-spire::tooltip>

    <x-spire::tooltip content="Underline (Ctrl+U)">
        <x-spire::button variant="ghost" size="sm" icon-only>
            <x-spire::icon name="underline" />
        </x-spire::button>
    </x-spire::tooltip>
</div>
```

### Data Table Actions

```blade
<td class="flex gap-1">
    <x-spire::tooltip content="Edit">
        <x-spire::button
            wire:click="edit({{ $item->id }})"
            variant="ghost"
            size="sm"
            icon-only
        >
            <x-spire::icon name="pencil" />
        </x-spire::button>
    </x-spire::tooltip>

    <x-spire::tooltip content="Delete">
        <x-spire::button
            wire:click="delete({{ $item->id }})"
            color="error"
            variant="ghost"
            size="sm"
            icon-only
        >
            <x-spire::icon name="trash-2" />
        </x-spire::button>
    </x-spire::tooltip>
</td>
```

### Status Indicator

```blade
<div class="flex items-center gap-2">
    <x-spire::badge color="success" dot />
    <span>Online</span>

    <x-spire::tooltip content="Last seen 2 minutes ago" placement="right">
        <x-spire::icon name="info" class="text-muted cursor-help" size="sm" />
    </x-spire::tooltip>
</div>
```
