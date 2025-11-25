# Color Picker Component

A full-featured color picker component with gradient selector, hue slider, hex input, and preset swatches. Returns color values as hex strings.

## Overview

The Color Picker component provides a complete color selection solution with:

- **Gradient picker** - Visual saturation/lightness selector
- **Hue slider** - Full color spectrum selection
- **Hex input** - Direct hex color entry
- **Preset swatches** - Quick selection from curated colors
- **Clearable** - Optional clear button

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | `'Select a color'` | Placeholder text when no color selected |
| `placement` | string | `'bottom-start'` | Popover placement position |
| `disabled` | boolean | `false` | Disables the color picker |
| `clearable` | boolean | `false` | Shows clear button when color is selected |
| `size` | string | `'md'` | Input size: `sm`, `md`, `lg` |
| `variant` | string | `'bordered'` | Input variant: `bordered`, `flat`, `underlined` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |

---

## Value Format

The color picker returns hex color strings in uppercase format:

```php
public string $selectedColor = '';  // '' when empty, '#FF5733' when selected
```

---

## Examples

### Basic Usage

```blade
<x-spire::color-picker wire:model="selectedColor" />
```

### With Placeholder

```blade
<x-spire::color-picker
    wire:model="selectedColor"
    placeholder="Choose a color"
/>
```

### Clearable

```blade
<x-spire::color-picker
    wire:model="selectedColor"
    clearable
/>
```

### With Live Updates

```blade
<x-spire::color-picker
    wire:model.live="selectedColor"
    clearable
/>
```

### Inside a Form Field

```blade
<x-spire::field label="Brand Color" for="brandColor" required>
    <x-spire::color-picker
        id="brandColor"
        wire:model="form.brandColor"
        clearable
    />
</x-spire::field>
```

### Disabled State

```blade
<x-spire::color-picker
    wire:model="selectedColor"
    :disabled="true"
/>
```

### Different Sizes

```blade
<x-spire::color-picker wire:model="color1" size="sm" />
<x-spire::color-picker wire:model="color2" size="md" />
<x-spire::color-picker wire:model="color3" size="lg" />
```

### Livewire Integration

```php
class ColorSelector extends Component
{
    public string $primaryColor = '';
    public string $secondaryColor = '#3B82F6';

    public function mount()
    {
        $this->primaryColor = '#EF4444';
    }

    public function updatedPrimaryColor($value)
    {
        // React to color changes
        $this->dispatch('color-changed', color: $value);
    }
}
```

```blade
<x-spire::color-picker wire:model.live="primaryColor" clearable />

@if($primaryColor)
    <div class="mt-4 p-4 rounded" style="background-color: {{ $primaryColor }}">
        Preview: {{ $primaryColor }}
    </div>
@endif
```

### Event Handling

```blade
<div
    x-data
    @spire-select-changed="console.log('Color changed:', $event.detail)"
    @spire-select-cleared="console.log('Color cleared:', $event.detail)"
>
    <x-spire::color-picker wire:model="selectedColor" clearable />
</div>
```

---

## Preset Colors

The color picker includes 20 curated preset colors:

| Row 1 | | | | | | | | | |
|-------|--|--|--|--|--|--|--|--|--|
| #ef4444 | #f97316 | #f59e0b | #eab308 | #84cc16 | #22c55e | #10b981 | #14b8a6 | #06b6d4 | #0ea5e9 |

| Row 2 | | | | | | | | | |
|-------|--|--|--|--|--|--|--|--|--|
| #3b82f6 | #6366f1 | #8b5cf6 | #a855f7 | #d946ef | #ec4899 | #f43f5e | #78716c | #71717a | #000000 |

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Current hex color value |
| `hue` | number | Current hue (0-360) |
| `saturation` | number | Current saturation (0-100) |
| `lightness` | number | Current lightness (0-100) |
| `hexInput` | string | Current hex input field value |
| `currentHex` | string | Computed hex from HSL values |

### Key Methods

| Method | Description |
|--------|-------------|
| `selectColor()` | Confirm and apply the current color |
| `selectPreset(color)` | Select a preset color |
| `clearSelection()` | Clear the selected color |
| `setColorFromHex(hex)` | Set color from hex string |

### Events

#### spire-select-changed

Dispatched when a color is selected:

```javascript
{
    id: 'color-picker-id',
    name: 'form.color',
    value: '#3B82F6',
    previousValue: '#EF4444',
    metadata: { color: '#3B82F6' },
    timestamp: 1699999999999
}
```

#### spire-select-cleared

Dispatched when the color is cleared:

```javascript
{
    id: 'color-picker-id',
    name: 'form.color',
    value: '',
    previousValue: '#3B82F6',
    timestamp: 1699999999999
}
```

---

## Accessibility

### ARIA Support

- `role="combobox"` on trigger
- `aria-haspopup="dialog"` indicates popover
- `aria-expanded` state tracking
- `aria-controls` linking to content
- `aria-label` on color picker dialog

### Keyboard Navigation

- **Enter/Space** - Open/close picker, confirm selection
- **Escape** - Close picker
- **Tab** - Navigate between controls

---

## Best Practices

### Do

- Use `clearable` for optional color fields
- Use `wire:model.live` when showing real-time previews
- Provide visual feedback showing the selected color
- Use appropriate size for your form layout

### Don't

- Don't use for selecting from a fixed set of colors (use radio buttons or select)
- Don't forget to handle empty state (`''`) in your backend
- Don't assume color format - always expect uppercase hex (`#RRGGBB`)

---

## Technical Notes

### Alpine.js x-model Support

The color picker supports Alpine.js `x-model` for two-way binding without Livewire:

```blade
<div x-data="{ color: '' }">
    <x-spire::color-picker x-model="color" clearable />
    <p>Selected: <span x-text="color || '(none)'"></span></p>
    <div
        x-show="color"
        class="w-8 h-8 rounded"
        :style="{ backgroundColor: color }"
    ></div>
</div>
```

**Data type:** String (uppercase hex format `'#FF5733'` or empty string `''`)

### Color Format

- All colors are returned as uppercase hex strings: `#RRGGBB`
- Input validation accepts both 3 and 6 character hex codes
- Internal color manipulation uses HSL for the gradient picker

### Translations

Key translations under `spire-ui::spire-ui.color-picker`:

- `placeholder` - "Select a color"
- `select` - "Select"
- `clear` - "Clear selection"
- `aria_label` - "Color picker"
