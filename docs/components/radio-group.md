# Radio Group

A layout wrapper component for grouping multiple radio buttons together with shared label, description, helper text, and error messages.

## Overview

The Radio Group component provides a structured container for organizing related radio buttons with proper ARIA attributes, labels, and error handling. It supports both vertical and horizontal orientations and integrates seamlessly with form validation.

## Basic Usage

```blade
<x-spire::checkbox.group label="Choose a plan">
    <x-spire::radio value="free" name="plan">
        Free
    </x-spire::radio>
    <x-spire::radio value="pro" name="plan">
        Pro
    </x-spire::radio>
    <x-spire::radio value="enterprise" name="plan">
        Enterprise
    </x-spire::radio>
</x-spire::checkbox.group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string\|null | `null` | Group label text |
| `description` | string\|null | `null` | Descriptive text shown below the label |
| `helper` | string\|null | `null` | Helper text shown below the radio buttons |
| `error` | string\|null | `null` | Error message (displays with icon) |
| `required` | boolean | `false` | Shows asterisk (*) next to label |
| `orientation` | string | `'vertical'` | Layout direction: `vertical` or `horizontal` |
| `gap` | string | `'md'` | Spacing between radio buttons: `sm`, `md`, `lg` |

## Examples

### With Description

```blade
<x-spire::checkbox.group
    label="Delivery Method"
    description="Choose how you'd like to receive your order"
>
    <x-spire::radio value="standard" name="delivery">
        Standard Shipping (5-7 days)
    </x-spire::radio>
    <x-spire::radio value="express" name="delivery">
        Express Shipping (2-3 days)
    </x-spire::radio>
    <x-spire::radio value="overnight" name="delivery">
        Overnight Shipping (1 day)
    </x-spire::radio>
</x-spire::checkbox.group>
```

### With Helper Text

```blade
<x-spire::checkbox.group
    label="Notification Frequency"
    helper="You can change this setting at any time in your profile"
>
    <x-spire::radio value="instant" name="notifications">
        Instant notifications
    </x-spire::radio>
    <x-spire::radio value="daily" name="notifications">
        Daily digest
    </x-spire::radio>
    <x-spire::radio value="weekly" name="notifications">
        Weekly summary
    </x-spire::radio>
</x-spire::checkbox.group>
```

### Required Field

```blade
<x-spire::checkbox.group
    label="Account Type"
    required
>
    <x-spire::radio value="personal" name="account_type">
        Personal
    </x-spire::radio>
    <x-spire::radio value="business" name="account_type">
        Business
    </x-spire::radio>
</x-spire::checkbox.group>
```

### With Validation Error

```blade
<x-spire::checkbox.group
    label="Select a payment method"
    error="Please choose a payment method to continue"
>
    <x-spire::radio value="credit" name="payment">
        Credit Card
    </x-spire::radio>
    <x-spire::radio value="paypal" name="payment">
        PayPal
    </x-spire::radio>
    <x-spire::radio value="bank" name="payment">
        Bank Transfer
    </x-spire::radio>
</x-spire::checkbox.group>
```

### Horizontal Layout

```blade
<x-spire::checkbox.group
    label="Size"
    orientation="horizontal"
    gap="lg"
>
    <x-spire::radio value="s" name="size">S</x-spire::radio>
    <x-spire::radio value="m" name="size">M</x-spire::radio>
    <x-spire::radio value="l" name="size">L</x-spire::radio>
    <x-spire::radio value="xl" name="size">XL</x-spire::radio>
</x-spire::checkbox.group>
```

### With Livewire

```blade
<x-spire::checkbox.group
    label="Subscription Plan"
    :error="$errors->first('plan')"
>
    <x-spire::radio value="monthly" wire:model.live="plan">
        Monthly ($9/mo)
    </x-spire::radio>
    <x-spire::radio value="yearly" wire:model.live="plan">
        Yearly ($99/yr - Save 8%)
    </x-spire::radio>
</x-spire::checkbox.group>
```

### With Rich Content

```blade
<x-spire::checkbox.group label="Choose your plan">
    <x-spire::radio value="starter" name="pricing">
        <div class="flex flex-col">
            <span class="font-semibold">Starter</span>
            <span class="text-sm text-text-muted">Perfect for individuals</span>
            <span class="text-sm font-bold text-primary">$0/month</span>
        </div>
    </x-spire::radio>

    <x-spire::radio value="pro" name="pricing">
        <div class="flex flex-col">
            <span class="font-semibold">Pro</span>
            <span class="text-sm text-text-muted">Best for small teams</span>
            <span class="text-sm font-bold text-primary">$29/month</span>
        </div>
    </x-spire::radio>
</x-spire::checkbox.group>
```

## Accessibility

- ✅ **ARIA Attributes**: Uses `role="radiogroup"`, `aria-labelledby`, and `aria-invalid`
- ✅ **Semantic HTML**: Proper `<label>` elements with unique IDs
- ✅ **Error Handling**: Error messages use `role="alert"` with alert icon
- ✅ **Keyboard Navigation**: Arrow keys navigate between radio buttons (native behavior)
- ✅ **Screen Readers**: Labels, descriptions, and errors are properly associated
- ✅ **Single Selection**: Radio groups ensure only one option can be selected

## Styling

The component uses these CSS classes:

- `.spire-radio-group` - Container wrapper
- `.spire-radio-group-label` - Label text
- `.spire-radio-group-required` - Required asterisk
- `.spire-radio-group-description` - Description text
- `.spire-radio-group-items` - Radio buttons container
- `.spire-radio-group-items--vertical` / `.spire-radio-group-items--horizontal` - Orientation modifiers
- `.spire-radio-group-helper` - Helper text
- `.spire-radio-group-error` - Error message

## Notes

- The component automatically generates unique IDs for proper ARIA associations
- Use with `<x-spire::radio>` components as children
- All radio buttons in a group should share the same `name` attribute
- Gap values (`sm`, `md`, `lg`) control spacing between radio buttons
- Error messages automatically include an alert icon
- Works seamlessly with Livewire wire:model for reactive updates
- Native keyboard navigation: Arrow keys move between options, Space selects

## Related Components

- [Radio](radio.md) - Individual radio button component
- [Checkbox Group](checkbox-group.md) - Similar grouping for checkboxes
- [Field](field.md) - Generic form field wrapper
