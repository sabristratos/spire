# Radio Component

Radio input for single-choice selection with support for labels, descriptions, and multiple visual variants. Includes group component for organized options.

## Overview

The Radio component provides customizable radio buttons with:

- Three visual variants (regular, pill, card)
- Label and description text
- Group component for organized selections
- Full Livewire integration

---

## Props

### Radio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'regular'` | Visual variant: `regular`, `pill`, `card` |
| `size` | string | `'md'` | Size: `sm`, `md`, `lg` |
| `color` | string | `'primary'` | Color: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `featured` |
| `radius` | string | `'md'` | Border radius (indicator always circular) |
| `name` | string | `null` | Form field name (required for grouping) |
| `value` | string | `null` | Radio value |
| `checked` | boolean | `false` | Checked state |
| `disabled` | boolean | `false` | Disabled state |
| `required` | boolean | `false` | Required field |
| `label` | string | `null` | Label text |
| `description` | string | `null` | Helper description |

### Radio Group

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

### Radio

| Slot | Description | Variants |
|------|-------------|----------|
| Default | Custom content below label/description | `card` only |
| `radioIcon` | Custom radio icon | `regular`, `card` |

### Radio Group

| Slot | Description |
|------|-------------|
| Default | Contains radio elements |

---

## Examples

### Basic Radio

```blade
<x-spire::radio name="gender" value="male" label="Male" />
<x-spire::radio name="gender" value="female" label="Female" />
<x-spire::radio name="gender" value="other" label="Other" />
```

### With Description

```blade
<x-spire::radio
    name="plan"
    value="basic"
    label="Basic Plan"
    description="Perfect for getting started - $9/month"
    wire:model="selectedPlan"
/>
```

### Disabled Radio

```blade
<x-spire::radio
    name="option"
    value="unavailable"
    label="Coming soon"
    disabled
/>
```

### Colors

```blade
<x-spire::radio name="status" value="active" color="success" label="Active" checked />
<x-spire::radio name="status" value="pending" color="warning" label="Pending" />
<x-spire::radio name="status" value="inactive" color="error" label="Inactive" />
```

### Sizes

```blade
<x-spire::radio size="sm" name="size" value="sm" label="Small" />
<x-spire::radio size="md" name="size" value="md" label="Medium" />
<x-spire::radio size="lg" name="size" value="lg" label="Large" />
```

### Pill Variant

Compact style for inline selections:

```blade
<x-spire::radio variant="pill" name="size" value="xs" label="XS" />
<x-spire::radio variant="pill" name="size" value="s" label="S" />
<x-spire::radio variant="pill" name="size" value="m" label="M" />
<x-spire::radio variant="pill" name="size" value="l" label="L" />
<x-spire::radio variant="pill" name="size" value="xl" label="XL" />
```

### Card Variant

Full-width card with rich content:

```blade
<x-spire::radio
    variant="card"
    name="shipping"
    value="express"
    label="Express Shipping"
    description="2-3 business days"
>
    <div class="text-lg font-bold text-primary mt-2">$15.99</div>
</x-spire::radio>

<x-spire::radio
    variant="card"
    name="shipping"
    value="standard"
    label="Standard Shipping"
    description="5-7 business days"
>
    <div class="text-lg font-bold text-success mt-2">Free</div>
</x-spire::radio>
```

### Radio Group

```blade
<x-spire::radio-group
    label="Payment Method"
    description="Select how you'd like to pay"
    required
    :error="$errors->first('payment_method')"
>
    <x-spire::radio name="payment" value="card" label="Credit Card" wire:model="paymentMethod" />
    <x-spire::radio name="payment" value="paypal" label="PayPal" wire:model="paymentMethod" />
    <x-spire::radio name="payment" value="bank" label="Bank Transfer" wire:model="paymentMethod" />
</x-spire::radio-group>
```

### Horizontal Group with Pills

```blade
<x-spire::radio-group
    label="Size"
    orientation="horizontal"
    gap="sm"
>
    <x-spire::radio variant="pill" name="size" value="xs" label="XS" wire:model="selectedSize" />
    <x-spire::radio variant="pill" name="size" value="s" label="S" wire:model="selectedSize" />
    <x-spire::radio variant="pill" name="size" value="m" label="M" wire:model="selectedSize" />
    <x-spire::radio variant="pill" name="size" value="l" label="L" wire:model="selectedSize" />
    <x-spire::radio variant="pill" name="size" value="xl" label="XL" wire:model="selectedSize" />
</x-spire::radio-group>
```

### Card Group for Plans

```blade
<x-spire::radio-group
    label="Select a Plan"
    required
>
    <x-spire::radio
        variant="card"
        name="plan"
        value="starter"
        label="Starter"
        description="For individuals"
        wire:model="selectedPlan"
    >
        <div class="mt-2">
            <span class="text-2xl font-bold">$9</span>
            <span class="text-text-muted">/month</span>
        </div>
    </x-spire::radio>

    <x-spire::radio
        variant="card"
        name="plan"
        value="pro"
        label="Professional"
        description="For small teams"
        wire:model="selectedPlan"
    >
        <div class="mt-2">
            <span class="text-2xl font-bold">$29</span>
            <span class="text-text-muted">/month</span>
        </div>
    </x-spire::radio>

    <x-spire::radio
        variant="card"
        name="plan"
        value="enterprise"
        label="Enterprise"
        description="For large organizations"
        wire:model="selectedPlan"
    >
        <div class="mt-2">
            <span class="text-2xl font-bold">$99</span>
            <span class="text-text-muted">/month</span>
        </div>
    </x-spire::radio>
</x-spire::radio-group>
```

### Group with Helper Text

```blade
<x-spire::radio-group
    label="Notification Preference"
    helper="This setting can be changed later in your profile"
>
    <x-spire::radio name="notification" value="all" label="All notifications" />
    <x-spire::radio name="notification" value="important" label="Important only" />
    <x-spire::radio name="notification" value="none" label="None" />
</x-spire::radio-group>
```

### Livewire Integration

```php
public string $selectedPlan = 'basic';
public string $paymentMethod = '';
```

```blade
<x-spire::radio-group label="Plan">
    <x-spire::radio name="plan" value="basic" label="Basic" wire:model="selectedPlan" />
    <x-spire::radio name="plan" value="pro" label="Pro" wire:model="selectedPlan" />
    <x-spire::radio name="plan" value="enterprise" label="Enterprise" wire:model="selectedPlan" />
</x-spire::radio-group>
```

#### Live Updates

```blade
<x-spire::radio-group label="Theme">
    <x-spire::radio name="theme" value="light" label="Light" wire:model.live="theme" />
    <x-spire::radio name="theme" value="dark" label="Dark" wire:model.live="theme" />
    <x-spire::radio name="theme" value="system" label="System" wire:model.live="theme" />
</x-spire::radio-group>
```

---

## Accessibility

- Hidden native input with screen reader support
- `aria-labelledby` links to label
- `aria-describedby` links to description
- Required indicator announced to screen readers
- Proper focus states with visible outline
- Group uses `role="radiogroup"` with `aria-labelledby`
- Error message has `role="alert"`

---

## Best Practices

### Do

- Use radio buttons for mutually exclusive single-choice selections
- Always use the same `name` for radios in a group
- Always provide a `label` for accessibility
- Use `description` for additional context
- Use `pill` variant for compact inline selections (sizes, ratings)
- Use `card` variant for rich content (plans, shipping options)
- Set `required` on the group, not individual radios
- Apply `wire:model` to all radios in a group

### Don't

- Don't use radios for multi-select scenarios (use checkbox)
- Don't mix different `name` values in a radio group
- Don't forget `name` attribute - radios won't group properly
- Don't use overly long labels
- Don't use radio when user should be able to deselect (use checkbox)

---

## Technical Notes

- Uses `WireEntangle` helper for Livewire integration
- Auto-generates unique IDs for accessibility
- Indicator always uses `rounded-full` regardless of radius prop
- Styling uses CSS `:has()` selector
- No JavaScript required - pure CSS/Blade
