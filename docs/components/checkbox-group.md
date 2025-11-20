# Checkbox Group

A layout wrapper component for grouping multiple checkboxes together with shared label, description, helper text, and error messages.

## Overview

The Checkbox Group component provides a structured container for organizing related checkboxes with proper ARIA attributes, labels, and error handling. It supports both vertical and horizontal orientations and integrates seamlessly with form validation.

## Basic Usage

```blade
<x-spire::checkbox-group label="Select your interests">
    <x-spire::checkbox value="tech" name="interests[]">
        Technology
    </x-spire::checkbox>
    <x-spire::checkbox value="design" name="interests[]">
        Design
    </x-spire::checkbox>
    <x-spire::checkbox value="music" name="interests[]">
        Music
    </x-spire::checkbox>
</x-spire::checkbox-group>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string\|null | `null` | Group label text |
| `description` | string\|null | `null` | Descriptive text shown below the label |
| `helper` | string\|null | `null` | Helper text shown below the checkboxes |
| `error` | string\|null | `null` | Error message (displays with icon) |
| `required` | boolean | `false` | Shows asterisk (*) next to label |
| `orientation` | string | `'vertical'` | Layout direction: `vertical` or `horizontal` |
| `gap` | string | `'md'` | Spacing between checkboxes: `sm`, `md`, `lg` |

## Examples

### With Description

```blade
<x-spire::checkbox-group
    label="Newsletter Preferences"
    description="Choose the types of emails you'd like to receive"
>
    <x-spire::checkbox value="weekly" name="newsletter[]">
        Weekly Digest
    </x-spire::checkbox>
    <x-spire::checkbox value="updates" name="newsletter[]">
        Product Updates
    </x-spire::checkbox>
    <x-spire::checkbox value="promotions" name="newsletter[]">
        Promotions
    </x-spire::checkbox>
</x-spire::checkbox-group>
```

### With Helper Text

```blade
<x-spire::checkbox-group
    label="Privacy Settings"
    helper="You can change these settings at any time in your profile"
>
    <x-spire::checkbox value="public" name="privacy[]">
        Make profile public
    </x-spire::checkbox>
    <x-spire::checkbox value="search" name="privacy[]">
        Allow search engines to index
    </x-spire::checkbox>
</x-spire::checkbox-group>
```

### Required Field

```blade
<x-spire::checkbox-group
    label="Terms and Conditions"
    required
>
    <x-spire::checkbox value="terms" name="agreements[]" required>
        I agree to the terms of service
    </x-spire::checkbox>
    <x-spire::checkbox value="privacy" name="agreements[]" required>
        I accept the privacy policy
    </x-spire::checkbox>
</x-spire::checkbox-group>
```

### With Validation Error

```blade
<x-spire::checkbox-group
    label="Select at least one option"
    error="Please select at least one option to continue"
>
    <x-spire::checkbox value="option1" name="options[]">
        Option 1
    </x-spire::checkbox>
    <x-spire::checkbox value="option2" name="options[]">
        Option 2
    </x-spire::checkbox>
</x-spire::checkbox-group>
```

### Horizontal Layout

```blade
<x-spire::checkbox-group
    label="Size"
    orientation="horizontal"
    gap="lg"
>
    <x-spire::checkbox value="s" name="size">Small</x-spire::checkbox>
    <x-spire::checkbox value="m" name="size">Medium</x-spire::checkbox>
    <x-spire::checkbox value="l" name="size">Large</x-spire::checkbox>
    <x-spire::checkbox value="xl" name="size">X-Large</x-spire::checkbox>
</x-spire::checkbox-group>
```

### With Livewire

```blade
<x-spire::checkbox-group
    label="Categories"
    :error="$errors->first('categories')"
>
    <x-spire::checkbox value="1" wire:model="categories">Web Development</x-spire::checkbox>
    <x-spire::checkbox value="2" wire:model="categories">Mobile Apps</x-spire::checkbox>
    <x-spire::checkbox value="3" wire:model="categories">UI/UX Design</x-spire::checkbox>
</x-spire::checkbox-group>
```

## Accessibility

- ✅ **ARIA Attributes**: Uses `role="group"`, `aria-labelledby`, and `aria-describedby`
- ✅ **Semantic HTML**: Proper `<label>` elements with unique IDs
- ✅ **Error Handling**: Error messages include alert icon and proper styling
- ✅ **Keyboard Navigation**: Individual checkboxes are fully keyboard accessible
- ✅ **Screen Readers**: Labels, descriptions, and errors are properly associated

## Styling

The component uses these CSS classes:

- `.spire-checkbox-group` - Container wrapper
- `.spire-checkbox-group--vertical` / `.spire-checkbox-group--horizontal` - Orientation modifiers
- `.spire-checkbox-group-label` - Label text
- `.spire-checkbox-group-required` - Required asterisk
- `.spire-checkbox-group-description` - Description text
- `.spire-checkbox-group-items` - Checkboxes container
- `.spire-checkbox-group-helper` - Helper text
- `.spire-checkbox-group-error` - Error message

## Notes

- The component automatically generates unique IDs for proper ARIA associations
- Use with `<x-spire::checkbox>` components as children
- Gap values (`sm`, `md`, `lg`) control spacing between checkboxes
- Error messages automatically include an alert icon
- Works seamlessly with Livewire wire:model for reactive updates

## Related Components

- [Checkbox](checkbox.md) - Individual checkbox component
- [Radio Group](radio-group.md) - Similar grouping for radio buttons
- [Field](field.md) - Generic form field wrapper
