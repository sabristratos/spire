# Slider Component

Accessible input component for selecting numeric values within a range. Supports single value selection and range selection with dual thumbs, with full keyboard navigation and touch support.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | string | `'single'` | Slider mode: `single` (one thumb) or `range` (two thumbs) |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `color` | string | `'primary'` | Color theme: `primary`, `secondary`, `success`, `warning`, `error`, `info` |
| `min` | number | `0` | Minimum value |
| `max` | number | `100` | Maximum value |
| `step` | number | `1` | Step increment between values |
| `showSteps` | boolean | `false` | Display visual dots at each step position |
| `marks` | array | `[]` | Array of labeled marks (see marks example) |
| `showValue` | boolean | `true` | Display current value above the slider |
| `showTooltip` | boolean | `true` | Show tooltip while dragging |
| `disabled` | boolean | `false` | Disable all interactions |
| `readonly` | boolean | `false` | Prevent value changes but keep styling |
| `label` | string | `null` | Label text displayed above the slider |

---

## Examples

### Basic Single Slider

```blade
<x-spire::slider
    wire:model.live="volume"
    label="Volume"
    :min="0"
    :max="100"
/>
```

### Range Slider

Select a range with two thumbs:

```blade
<x-spire::slider
    wire:model.live="priceRange"
    mode="range"
    label="Price Range"
    :min="0"
    :max="1000"
    :step="10"
/>
```

In your Livewire component, use an array with `start` and `end` keys:

```php
public array $priceRange = ['start' => 100, 'end' => 500];
```

### With Step Markers

Display visual dots at each step position:

```blade
<x-spire::slider
    wire:model.live="rating"
    label="Rating"
    :min="0"
    :max="10"
    :step="1"
    :show-steps="true"
/>
```

### With Custom Marks

Add labeled positions that users can click to jump to:

```blade
<x-spire::slider
    wire:model.live="temperature"
    label="Temperature"
    :min="0"
    :max="100"
    :marks="[
        ['value' => 0, 'label' => 'Cold'],
        ['value' => 25, 'label' => 'Cool'],
        ['value' => 50, 'label' => 'Warm'],
        ['value' => 75, 'label' => 'Hot'],
        ['value' => 100, 'label' => 'Extreme']
    ]"
/>
```

### Different Sizes

```blade
{{-- Small --}}
<x-spire::slider
    wire:model="value"
    size="sm"
    label="Small"
/>

{{-- Medium (default) --}}
<x-spire::slider
    wire:model="value"
    size="md"
    label="Medium"
/>

{{-- Large --}}
<x-spire::slider
    wire:model="value"
    size="lg"
    label="Large"
/>
```

### Different Colors

```blade
<x-spire::slider wire:model="v1" color="primary" label="Primary" />
<x-spire::slider wire:model="v2" color="secondary" label="Secondary" />
<x-spire::slider wire:model="v3" color="success" label="Success" />
<x-spire::slider wire:model="v4" color="warning" label="Warning" />
<x-spire::slider wire:model="v5" color="error" label="Error" />
<x-spire::slider wire:model="v6" color="info" label="Info" />
```

### Disabled State

```blade
<x-spire::slider
    label="System Load (Read Only)"
    :min="0"
    :max="100"
    :value="85"
    :disabled="true"
/>
```

### Readonly State

Prevents changes but maintains full styling:

```blade
<x-spire::slider
    label="Current Progress"
    :min="0"
    :max="100"
    :value="65"
    :readonly="true"
/>
```

### Without Value Display

Hide the current value display:

```blade
<x-spire::slider
    wire:model.live="opacity"
    label="Opacity"
    :min="0"
    :max="100"
    :show-value="false"
/>
```

### Custom Step Value

```blade
<x-spire::slider
    wire:model.live="quantity"
    label="Quantity (increments of 5)"
    :min="0"
    :max="100"
    :step="5"
    :show-steps="true"
/>
```

### Range Slider with Marks

Combine range mode with custom marks:

```blade
<x-spire::slider
    wire:model.live="budgetRange"
    mode="range"
    label="Budget Range"
    :min="0"
    :max="10000"
    :step="500"
    :marks="[
        ['value' => 0, 'label' => '$0'],
        ['value' => 2500, 'label' => '$2.5k'],
        ['value' => 5000, 'label' => '$5k'],
        ['value' => 7500, 'label' => '$7.5k'],
        ['value' => 10000, 'label' => '$10k']
    ]"
    color="success"
/>
```

### With Event Handling

```blade
<div
    x-data
    @spire-slider-changed="console.log('Value changed:', $event.detail.value)"
    @spire-slider-change-end="console.log('Drag ended:', $event.detail.value)"
>
    <x-spire::slider
        wire:model.live="value"
        label="With Events"
    />
</div>
```

---

## Keyboard Navigation

The slider supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `ArrowRight` / `ArrowUp` | Increase by one step |
| `ArrowLeft` / `ArrowDown` | Decrease by one step |
| `PageUp` | Increase by 10 steps |
| `PageDown` | Decrease by 10 steps |
| `Home` | Jump to minimum value |
| `End` | Jump to maximum value |

---

## Events

### spire-slider-changed

Dispatched on each value change (click, keyboard, drag).

```javascript
{
    id: 'slider-element-id',
    name: 'volume',
    value: 75,                    // or { start: 20, end: 80 } for range
    previousValue: 70,
    timestamp: 1699999999999
}
```

### spire-slider-change-end

Dispatched when drag operation ends.

```javascript
{
    id: 'slider-element-id',
    name: 'volume',
    value: 75,
    timestamp: 1699999999999
}
```

### Listening to Events

```blade
<div @spire-slider-changed.window="handleChange($event.detail)">
    <x-spire::slider wire:model="value" />
</div>
```

---

## Best Practices

### Do

- Use `wire:model.live` for real-time updates
- Provide a descriptive `label` for accessibility
- Use `showSteps` for sliders with few discrete values
- Use `marks` to indicate meaningful values (e.g., price tiers)
- Choose appropriate `step` values (e.g., 5, 10, 25 for large ranges)
- Use semantic colors (`success` for positive metrics, `error` for warnings)

### Don't

- Don't use too many steps with `showSteps` (becomes cluttered)
- Don't set `step` larger than the range allows
- Don't use range mode when only one value is needed
- Don't hide both `showValue` and `showTooltip` (users need feedback)
- Don't use sliders for precise numeric input (use number input instead)

---

## Accessibility

- Uses `role="slider"` with proper ARIA attributes
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow` for current state
- `aria-valuetext` for screen reader description
- `aria-orientation="horizontal"`
- `aria-disabled` and `aria-readonly` for states
- Separate labels for range mode thumbs ("Minimum value", "Maximum value")
- Full keyboard navigation support
- Focus indicators on thumbs

---

## Technical Notes

### Alpine.js x-model Support

The slider component supports Alpine.js `x-model` for two-way binding without Livewire:

```blade
{{-- Single value slider --}}
<div x-data="{ volume: 50 }">
    <x-spire::slider x-model="volume" label="Volume" />
    <p>Volume: <span x-text="volume"></span>%</p>
</div>

{{-- Range slider --}}
<div x-data="{ priceRange: { start: 100, end: 500 } }">
    <x-spire::slider
        x-model="priceRange"
        mode="range"
        label="Price Range"
        :min="0"
        :max="1000"
    />
    <p>Range: $<span x-text="priceRange.start"></span> - $<span x-text="priceRange.end"></span></p>
</div>
```

**Data types:**
- Single mode: Bind to a number
- Range mode: Bind to an object with `start` and `end` properties

### Livewire Integration

**Single mode** - bind to a number:

```php
public int $volume = 50;
```

```blade
<x-spire::slider wire:model.live="volume" />
```

**Range mode** - bind to an array with `start` and `end`:

```php
public array $priceRange = ['start' => 100, 'end' => 500];
```

```blade
<x-spire::slider wire:model.live="priceRange" mode="range" />
```

### Marks Format

Each mark is an array with `value` and `label` keys:

```php
$marks = [
    ['value' => 0, 'label' => 'Min'],
    ['value' => 50, 'label' => 'Mid'],
    ['value' => 100, 'label' => 'Max'],
];
```

### Translations

The slider component supports these translation keys under `spire-ui::spire-ui.slider`:

- `min_label` - "Minimum value" (for range start thumb)
- `max_label` - "Maximum value" (for range end thumb)
- `value_label` - "Value" (for single thumb)
- `range_label` - "Range"
