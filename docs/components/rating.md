# Rating Component

Interactive star rating input with support for half-stars, tooltips, and read-only display. Ideal for reviews, feedback forms, and satisfaction ratings.

## Overview

The Rating component provides:

- Full and half-star ratings
- Interactive and read-only modes
- Reset button option
- Numeric value display
- Livewire integration
- Full accessibility support

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | number | `0` | Current rating value |
| `maxRating` | number | `5` | Maximum number of stars |
| `size` | string | `'md'` | Size: `sm`, `md`, `lg` |
| `color` | string | `'warning'` | Color: `warning`, `primary`, `secondary`, `success`, `error`, `info` |
| `readonly` | boolean | `false` | Display only, no interaction |
| `disabled` | boolean | `false` | Disabled with visual opacity |
| `allowHalf` | boolean | `false` | Enable half-star ratings |
| `showTooltip` | boolean | `false` | Show tooltip on rating change |
| `showReset` | boolean | `false` | Show reset button |
| `showValue` | boolean | `false` | Display numeric value (e.g., "3/5") |
| `name` | string | `null` | Name for form submission |

---

## Examples

### Basic Usage

```blade
<x-spire::rating :value="3" />
```

### Interactive with Livewire

```blade
<x-spire::rating wire:model="userRating" />
```

### Live Updates

```blade
<x-spire::rating wire:model.live="rating" />
```

### Half-Star Ratings

Enable more granular ratings:

```blade
<x-spire::rating
    wire:model="rating"
    :allow-half="true"
/>
```

### With Value Display

Show numeric value alongside stars:

```blade
<x-spire::rating
    wire:model="rating"
    :show-value="true"
/>
```

### With Reset Button

Allow users to clear their rating:

```blade
<x-spire::rating
    wire:model="rating"
    :show-reset="true"
/>
```

### With Tooltip

Show temporary feedback on change:

```blade
<x-spire::rating
    wire:model="rating"
    :show-tooltip="true"
/>
```

### Full Featured

```blade
<x-spire::rating
    wire:model="productRating"
    :max-rating="5"
    :allow-half="true"
    :show-tooltip="true"
    :show-reset="true"
    :show-value="true"
    size="lg"
    color="warning"
/>
```

### Read-Only Display

For displaying existing ratings:

```blade
<x-spire::rating
    :value="4.5"
    :readonly="true"
    :allow-half="true"
/>
```

### Custom Max Rating

Use more or fewer stars:

```blade
<x-spire::rating
    wire:model="rating"
    :max-rating="10"
/>
```

### Sizes

```blade
<x-spire::rating size="sm" :value="3" />
<x-spire::rating size="md" :value="3" />
<x-spire::rating size="lg" :value="3" />
```

### Colors

```blade
<x-spire::rating color="warning" :value="4" />  {{-- Default --}}
<x-spire::rating color="primary" :value="4" />
<x-spire::rating color="success" :value="4" />
<x-spire::rating color="error" :value="4" />
```

### Event Handling

```blade
<x-spire::rating
    wire:model="rating"
    @spire-rating-changed="handleChange($event.detail)"
    @spire-rating-reset="handleReset($event.detail)"
/>
```

```javascript
function handleChange(detail) {
    console.log('New rating:', detail.value);
    console.log('Previous:', detail.previousValue);
}

function handleReset(detail) {
    console.log('Rating cleared');
}
```

### In a Review Form

```blade
<div class="space-y-4">
    <x-spire::field label="Your Rating" required>
        <x-spire::rating
            wire:model="review.rating"
            :allow-half="true"
            :show-value="true"
            size="lg"
        />
    </x-spire::field>

    <x-spire::field label="Your Review">
        <x-spire::textarea
            wire:model="review.comment"
            placeholder="Tell us about your experience..."
        />
    </x-spire::field>

    <x-spire::button type="submit" color="primary">
        Submit Review
    </x-spire::button>
</div>
```

---

## Alpine.js API

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | number | Current rating value |
| `maxRating` | number | Maximum rating |
| `readonly` | boolean | Read-only state |
| `allowHalf` | boolean | Half-star mode |
| `hoveredValue` | number\|null | Currently hovered value |

### Methods

| Method | Description |
|--------|-------------|
| `setRating(value)` | Set rating programmatically |
| `reset()` | Reset rating to 0 |

### Events

#### spire-rating-changed

Dispatched when rating value changes:

```javascript
{
    id: 'rating-id',
    name: 'userRating',
    value: 4.5,
    previousValue: 3,
    timestamp: 1699999999999
}
```

#### spire-rating-reset

Dispatched when rating is reset:

```javascript
{
    id: 'rating-id',
    name: 'userRating',
    value: 0,
    previousValue: 4.5,
    timestamp: 1699999999999
}
```

---

## Accessibility

- Uses `role="slider"` for screen readers
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for range
- `aria-valuetext` provides human-readable value
- `aria-readonly` when in read-only mode
- Individual star buttons have descriptive labels
- Focus-visible outlines on interactive elements

---

## Best Practices

### Do

- Use `allowHalf` for detailed ratings (product reviews)
- Show `showValue` when users need exact numeric feedback
- Provide `showReset` for forms where clearing is valid
- Use `readonly` for displaying existing ratings
- Use `warning` color (default) for standard ratings
- Size appropriately - `lg` for prominent inputs, `sm` for compact displays

### Don't

- Don't use `disabled` when you mean `readonly`
- Don't use excessive `maxRating` values (5-10 is typical)
- Don't forget to handle the rating value in your backend
- Don't hide the value when precision matters

---

## Technical Notes

- Uses `WireEntangle` helper for Livewire integration
- Half-star calculated from click position on star
- Tooltip displays for 2 seconds then auto-hides
- Implements `destroy()` for timer cleanup
