# Checkbox Component

Checkbox input with support for labels, descriptions, indeterminate state, and multiple visual variants. Includes group component for organized multi-select.

## Overview

The Checkbox component provides customizable checkboxes with:

- Three visual variants (regular, pill, card)
- Indeterminate (tri-state) support
- Label and description text
- Group component for organized selections
- Full Livewire integration

---

## Props

### Checkbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'regular'` | Visual variant: `regular`, `pill`, `card` |
| `size` | string | `'md'` | Size: `sm`, `md`, `lg` |
| `color` | string | `'primary'` | Color: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `featured` |
| `radius` | string | `'md'` | Border radius: `sm`, `md`, `lg` |
| `name` | string | `null` | Form field name |
| `value` | string | `null` | Checkbox value |
| `checked` | boolean | `false` | Checked state |
| `indeterminate` | boolean | `false` | Indeterminate state |
| `disabled` | boolean | `false` | Disabled state |
| `required` | boolean | `false` | Required field |
| `label` | string | `null` | Label text |
| `description` | string | `null` | Helper description |

### Checkbox Group

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | string | `'vertical'` | Layout: `vertical`, `horizontal` |
| `gap` | string | `'md'` | Gap between items: `sm`, `md`, `lg` |
| `label` | string | `null` | Group label |
| `description` | string | `null` | Group description |
| `error` | string | `null` | Error message |
| `helper` | string | `null` | Helper text |
| `required` | boolean | `false` | Shows required indicator |

---

## Slots

### Checkbox

| Slot | Description | Variants |
|------|-------------|----------|
| Default | Custom content below label/description | `card` only |
| `checkIcon` | Custom check icon | `regular`, `card` |

### Checkbox Group

| Slot | Description |
|------|-------------|
| Default | Contains checkbox elements |

---

## Examples

### Basic Checkbox

```blade
<x-spire::checkbox
    name="terms"
    value="accepted"
    label="I accept the terms and conditions"
/>
```

### With Description

```blade
<x-spire::checkbox
    name="newsletter"
    label="Subscribe to newsletter"
    description="Get weekly updates about new features and tips"
    wire:model="subscribeNewsletter"
/>
```

### Required Checkbox

```blade
<x-spire::checkbox
    name="terms"
    value="accepted"
    label="I accept the terms and conditions"
    required
/>
```

### Disabled Checkbox

```blade
<x-spire::checkbox
    name="disabled"
    label="This option is unavailable"
    disabled
/>
```

### Colors

```blade
<x-spire::checkbox color="primary" label="Primary" checked />
<x-spire::checkbox color="success" label="Success" checked />
<x-spire::checkbox color="error" label="Error" checked />
<x-spire::checkbox color="warning" label="Warning" checked />
<x-spire::checkbox color="info" label="Info" checked />
```

### Sizes

```blade
<x-spire::checkbox size="sm" label="Small checkbox" />
<x-spire::checkbox size="md" label="Medium checkbox" />
<x-spire::checkbox size="lg" label="Large checkbox" />
```

### Indeterminate State

Useful for "select all" with partial selection:

```blade
<x-spire::checkbox
    label="Select all"
    :indeterminate="$someSelected && !$allSelected"
    :checked="$allSelected"
    wire:click="toggleAll"
/>
```

### Pill Variant

Compact tag-like style:

```blade
<x-spire::checkbox variant="pill" name="tags[]" value="laravel" label="Laravel" />
<x-spire::checkbox variant="pill" name="tags[]" value="vue" label="Vue" />
<x-spire::checkbox variant="pill" name="tags[]" value="tailwind" label="Tailwind" />
```

### Card Variant

Full-width card with rich content:

```blade
<x-spire::checkbox
    variant="card"
    name="plan"
    value="pro"
    label="Pro Plan"
    description="$29/month with all features included"
>
    <ul class="text-sm text-muted list-disc pl-4 mt-2">
        <li>Unlimited projects</li>
        <li>Priority support</li>
        <li>Advanced analytics</li>
    </ul>
</x-spire::checkbox>
```

### Checkbox Group

```blade
<x-spire::checkbox.group
    label="Interests"
    description="Select all that apply"
    required
    :error="$errors->first('interests')"
>
    <x-spire::checkbox name="interests[]" value="sports" label="Sports" wire:model="interests" />
    <x-spire::checkbox name="interests[]" value="music" label="Music" wire:model="interests" />
    <x-spire::checkbox name="interests[]" value="tech" label="Technology" wire:model="interests" />
    <x-spire::checkbox name="interests[]" value="travel" label="Travel" wire:model="interests" />
</x-spire::checkbox.group>
```

### Horizontal Group

```blade
<x-spire::checkbox.group
    label="Features"
    orientation="horizontal"
    gap="lg"
>
    <x-spire::checkbox variant="pill" name="features[]" value="api" label="API Access" />
    <x-spire::checkbox variant="pill" name="features[]" value="webhooks" label="Webhooks" />
    <x-spire::checkbox variant="pill" name="features[]" value="analytics" label="Analytics" />
</x-spire::checkbox.group>
```

### Group with Helper Text

```blade
<x-spire::checkbox.group
    label="Notifications"
    helper="You can change these settings at any time"
>
    <x-spire::checkbox name="notifications[]" value="email" label="Email" />
    <x-spire::checkbox name="notifications[]" value="sms" label="SMS" />
    <x-spire::checkbox name="notifications[]" value="push" label="Push notifications" />
</x-spire::checkbox.group>
```

### Livewire Integration

#### Single Boolean

```php
public bool $acceptTerms = false;
```

```blade
<x-spire::checkbox
    wire:model="acceptTerms"
    label="Accept terms"
/>
```

#### Array of Values

```php
public array $selectedFeatures = [];
```

```blade
<x-spire::checkbox name="features[]" value="api" wire:model="selectedFeatures" label="API" />
<x-spire::checkbox name="features[]" value="webhooks" wire:model="selectedFeatures" label="Webhooks" />
<x-spire::checkbox name="features[]" value="analytics" wire:model="selectedFeatures" label="Analytics" />
```

#### Live Updates

```blade
<x-spire::checkbox
    wire:model.live="enableNotifications"
    label="Enable notifications"
/>
```

---

## Accessibility

- Hidden native input with screen reader support
- `aria-labelledby` links to label
- `aria-describedby` links to description
- Required indicator announced to screen readers
- Proper focus states with visible outline
- Group uses `role="group"` with `aria-labelledby`

---

## Best Practices

### Do

- Use checkboxes for independent on/off toggles
- Use checkboxes for multi-select scenarios
- Always provide a `label` for accessibility
- Use `description` for additional context
- Use `pill` variant for compact tag selections
- Use `card` variant for rich content (plans, options)
- Set `required` on the group, not individual items

### Don't

- Don't use checkboxes for mutually exclusive choices (use radio)
- Don't forget `name` attribute for form submission
- Don't use overly long labels
- Don't nest checkboxes inside other form elements

---

## Technical Notes

- Uses `WireEntangle` helper for Livewire integration
- Auto-generates unique IDs for accessibility
- Styling uses CSS `:has()` selector
- No JavaScript required - pure CSS/Blade
