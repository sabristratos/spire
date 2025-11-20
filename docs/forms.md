# Forms

Comprehensive guide to building forms with Spire UI components. All components integrate seamlessly with Livewire for real-time validation and updates.

## Overview

Spire UI provides a complete set of form components:

- **Text inputs** - [Input](components/input.md), [Textarea](components/textarea.md)
- **Selection** - [Select](components/select.md), [Autocomplete](components/autocomplete.md), [Checkbox](components/checkbox.md), [Radio](components/radio.md), [Switch](components/switch.md)
- **Specialized** - [Slider](components/slider.md), [Rating](components/rating.md), [Datepicker](components/datepicker.md), [Timepicker](components/timepicker.md)
- **Rich content** - [Editor](components/editor.md), [File Upload](components/file-upload.md)

All components support:
- Livewire `wire:model` binding
- Consistent sizing (`sm`, `md`, `lg`)
- Validation error display
- Accessibility best practices

> **Note**: Some examples reference `checkbox-group` and `radio-group` components. These are wrapper components for grouping checkbox/radio inputs and are documented within the [Checkbox](components/checkbox.md) and [Radio](components/radio.md) documentation pages.

---

## Form Infrastructure

### Field Wrapper

The Field component provides consistent layout with label, error, and helper text:

```blade
<x-spire::field
    label="Email"
    for="email"
    required
    error="email"
    helper="We'll never share your email"
>
    <x-spire::input id="email" type="email" wire:model="email" />
</x-spire::field>
```

**Props:**

| Prop | Type | Description |
|------|------|-------------|
| `label` | string | Label text |
| `for` | string | Input ID for label |
| `required` | boolean | Show required asterisk |
| `error` | string | Field name for validation |
| `helper` | string | Helper text below input |
| `size` | string | Size: `sm`, `md`, `lg` |

See [Field documentation](components/field.md) for more details.

### Form Primitives

For custom layouts, use individual primitives:

```blade
<div class="space-y-2">
    <x-spire::form.label for="name" required>Full Name</x-spire::form.label>
    <x-spire::input id="name" wire:model="name" />
    <x-spire::form.error name="name" />
    <x-spire::form.helper>As it appears on your ID</x-spire::form.helper>
</div>
```

---

## Text Inputs

### Input

Text input with support for icons, clear button, password toggle, and copy functionality.

```blade
{{-- Basic --}}
<x-spire::input wire:model="email" type="email" placeholder="Email address" />

{{-- With icon --}}
<x-spire::input wire:model="search" icon="search" placeholder="Search..." clearable />

{{-- Password with toggle --}}
<x-spire::input wire:model="password" type="password" viewable />

{{-- Copyable --}}
<x-spire::input wire:model="apiKey" copyable readonly />
```

**Key Props:** `variant`, `size`, `icon`, `iconTrailing`, `clearable`, `viewable`, `copyable`

See [Input documentation](components/input.md).

### Textarea

Multi-line text input with resize control.

```blade
<x-spire::textarea
    wire:model="description"
    rows="6"
    resize="vertical"
    placeholder="Enter description..."
/>
```

**Key Props:** `variant`, `size`, `rows`, `resize` (`vertical`, `horizontal`, `none`, `both`)

See [Textarea documentation](components/textarea.md).

---

## Selection Components

### Select

Dropdown selection with search and multi-select support.

```blade
{{-- Single select --}}
<x-spire::select wire:model="country" placeholder="Select country" searchable>
    <x-spire::select.option value="us">United States</x-spire::select.option>
    <x-spire::select.option value="ca">Canada</x-spire::select.option>
    <x-spire::select.option value="uk">United Kingdom</x-spire::select.option>
</x-spire::select>

{{-- Multiple select --}}
<x-spire::select wire:model="tags" placeholder="Select tags" multiple :max="5">
    <x-spire::select.option value="php">PHP</x-spire::select.option>
    <x-spire::select.option value="laravel">Laravel</x-spire::select.option>
    <x-spire::select.option value="vue">Vue</x-spire::select.option>
</x-spire::select>
```

**Key Props:** `searchable`, `multiple`, `max`, `placement`

See [Select documentation](components/select.md).

### Autocomplete

Search input with filtered suggestions.

```blade
<x-spire::autocomplete
    wire:model="selectedUser"
    placeholder="Search users..."
    :min-chars="2"
>
    @foreach($users as $user)
        <x-spire::autocomplete.option value="{{ $user->id }}" label="{{ $user->name }}">
            <div class="flex items-center gap-2">
                <img src="{{ $user->avatar }}" class="w-6 h-6 rounded-full" />
                <span>{{ $user->name }}</span>
            </div>
        </x-spire::autocomplete.option>
    @endforeach
</x-spire::autocomplete>
```

**Key Props:** `minChars`, `debounce`, `showOnFocus`, `clearable`, `highlightMatches`

See [Autocomplete documentation](components/autocomplete.md).

### Checkbox

Single checkbox or grouped checkboxes for multi-select.

```blade
{{-- Single boolean --}}
<x-spire::checkbox wire:model="acceptTerms" label="Accept terms and conditions" />

{{-- Array of values --}}
<x-spire::checkbox-group label="Interests" required :error="$errors->first('interests')">
    <x-spire::checkbox name="interests[]" value="sports" wire:model="interests" label="Sports" />
    <x-spire::checkbox name="interests[]" value="music" wire:model="interests" label="Music" />
    <x-spire::checkbox name="interests[]" value="tech" wire:model="interests" label="Technology" />
</x-spire::checkbox-group>

{{-- Pill variant --}}
<x-spire::checkbox-group orientation="horizontal">
    <x-spire::checkbox variant="pill" name="tags[]" value="featured" label="Featured" />
    <x-spire::checkbox variant="pill" name="tags[]" value="new" label="New" />
</x-spire::checkbox-group>
```

**Key Props:** `variant` (`regular`, `pill`, `card`), `size`, `color`, `indeterminate`

See [Checkbox documentation](components/checkbox.md).

### Radio

Radio buttons for single-choice selection.

```blade
<x-spire::radio-group label="Payment Method" required>
    <x-spire::radio name="payment" value="card" wire:model="payment" label="Credit Card" />
    <x-spire::radio name="payment" value="paypal" wire:model="payment" label="PayPal" />
    <x-spire::radio name="payment" value="bank" wire:model="payment" label="Bank Transfer" />
</x-spire::radio-group>

{{-- Card variant for plans --}}
<x-spire::radio-group label="Select Plan">
    <x-spire::radio variant="card" name="plan" value="basic" wire:model="plan" label="Basic" description="$9/month">
        <ul class="text-sm mt-2"><li>5 projects</li></ul>
    </x-spire::radio>
    <x-spire::radio variant="card" name="plan" value="pro" wire:model="plan" label="Pro" description="$29/month">
        <ul class="text-sm mt-2"><li>Unlimited projects</li></ul>
    </x-spire::radio>
</x-spire::radio-group>
```

**Key Props:** `variant` (`regular`, `pill`, `card`), `size`, `color`

See [Radio documentation](components/radio.md).

### Switch

Toggle switch for boolean values.

```blade
<x-spire::switch
    wire:model="notifications"
    label="Enable notifications"
    description="Receive email updates about your account"
/>

{{-- Different colors --}}
<x-spire::switch wire:model="active" label="Active" color="success" />
<x-spire::switch wire:model="featured" label="Featured" color="primary" />
```

**Key Props:** `size`, `color`, `label`, `description`

See [Switch documentation](components/switch.md).

---

## Specialized Inputs

### Slider

Range slider for numeric values.

```blade
{{-- Single value --}}
<x-spire::slider
    wire:model.live="volume"
    label="Volume"
    :min="0"
    :max="100"
    :show-value="true"
/>

{{-- Range --}}
<x-spire::slider
    wire:model.live="priceRange"
    mode="range"
    :min="0"
    :max="1000"
    :step="10"
    :show-tooltip="true"
/>
```

**Livewire property for range:**
```php
public array $priceRange = ['start' => 100, 'end' => 500];
```

**Key Props:** `mode` (`single`, `range`), `min`, `max`, `step`, `showSteps`, `marks`, `showValue`, `showTooltip`

See [Slider documentation](components/slider.md).

### Rating

Star rating input.

```blade
<x-spire::rating
    wire:model="productRating"
    :allow-half="true"
    :show-value="true"
    :show-reset="true"
    size="lg"
/>

{{-- Read-only display --}}
<x-spire::rating :value="4.5" :readonly="true" :allow-half="true" />
```

**Key Props:** `maxRating`, `allowHalf`, `showTooltip`, `showReset`, `showValue`, `readonly`

See [Rating documentation](components/rating.md).

### Datepicker

Date selection with calendar.

```blade
{{-- Single date --}}
<x-spire::datepicker wire:model="birthdate" />

{{-- Date range with presets --}}
<x-spire::datepicker
    wire:model="dateRange"
    mode="range"
    :show-presets="true"
/>

{{-- With constraints --}}
<x-spire::datepicker
    wire:model="appointment"
    min-date="2025-01-01"
    :disabled-days-of-week="[0, 6]"
/>
```

**Livewire properties:**
```php
public string $birthdate = '';
public array $dateRange = ['start' => null, 'end' => null];
public array $selectedDates = []; // for multiple mode
```

**Key Props:** `mode` (`single`, `range`, `multiple`), `minDate`, `maxDate`, `disabledDates`, `disabledDaysOfWeek`, `showPresets`

See [Calendar documentation](components/calendar.md).

### Timepicker

Time selection input.

```blade
<x-spire::timepicker
    wire:model="appointmentTime"
    :use24Hour="true"
    :minute-step="15"
/>

{{-- 12-hour with seconds --}}
<x-spire::timepicker
    wire:model="time"
    :use24Hour="false"
    :show-seconds="true"
/>
```

**Key Props:** `use24Hour`, `minuteStep`, `showSeconds`, `placeholder`

---

## Rich Content

### Editor

Rich text editor powered by Tiptap.

```blade
<x-spire::editor
    wire:model="content"
    placeholder="Start writing..."
    :show-char-count="true"
    :buttons="['bold', 'italic', 'heading', 'bulletList', 'orderedList', 'link']"
/>
```

**Key Props:** `format` (`html`, `json`), `buttons`, `showCharCount`, `toolbar`

See [Editor documentation](components/editor.md).

### File Upload

File upload with drag-and-drop, preview, and validation.

```blade
<x-spire::file-upload
    wire:model="photos"
    :accept="['image/*']"
    :max-size="5242880"
    :max-files="10"
    multiple
/>

{{-- With existing files (e.g., Spatie Media Library) --}}
<x-spire::file-upload
    wire:model="newPhotos"
    :existing="$product->getMedia('gallery')"
    remove-event="removeGalleryImage"
    multiple
/>
```

**Key Props:** `accept`, `maxSize`, `maxFiles`, `multiple`, `existing`, `removeEvent`, `autoUpload`

---

## Common Patterns

### Livewire Integration

All form components support Livewire binding:

```blade
{{-- Standard binding (on blur/change) --}}
<x-spire::input wire:model="email" />

{{-- Live updates (on input) --}}
<x-spire::input wire:model.live="search" />

{{-- Debounced live updates --}}
<x-spire::input wire:model.live.debounce.300ms="search" />
```

### Validation

Use the Field wrapper with `error` prop:

```blade
<x-spire::field label="Email" error="email">
    <x-spire::input wire:model="email" type="email" />
</x-spire::field>
```

In your Livewire component:

```php
public function save()
{
    $this->validate([
        'email' => 'required|email',
        'name' => 'required|min:2',
    ]);

    // Save logic...
}
```

### Complete Form Example

```blade
<form wire:submit="save" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <x-spire::field label="First Name" for="firstName" required error="firstName">
            <x-spire::input id="firstName" wire:model="firstName" />
        </x-spire::field>

        <x-spire::field label="Last Name" for="lastName" required error="lastName">
            <x-spire::input id="lastName" wire:model="lastName" />
        </x-spire::field>
    </div>

    <x-spire::field label="Email" for="email" required error="email">
        <x-spire::input id="email" type="email" wire:model="email" icon="mail" />
    </x-spire::field>

    <x-spire::field label="Department" for="department" required error="department">
        <x-spire::select id="department" wire:model="department" placeholder="Select department">
            <x-spire::select.option value="engineering">Engineering</x-spire::select.option>
            <x-spire::select.option value="marketing">Marketing</x-spire::select.option>
            <x-spire::select.option value="sales">Sales</x-spire::select.option>
        </x-spire::select>
    </x-spire::field>

    <x-spire::field label="Bio" for="bio" error="bio" helper="Brief description about yourself">
        <x-spire::textarea id="bio" wire:model="bio" rows="4" />
    </x-spire::field>

    <x-spire::field label="Start Date" for="startDate" error="startDate">
        <x-spire::datepicker id="startDate" wire:model="startDate" />
    </x-spire::field>

    <x-spire::checkbox-group label="Skills" error="skills">
        <x-spire::checkbox name="skills[]" value="php" wire:model="skills" label="PHP" />
        <x-spire::checkbox name="skills[]" value="javascript" wire:model="skills" label="JavaScript" />
        <x-spire::checkbox name="skills[]" value="python" wire:model="skills" label="Python" />
    </x-spire::checkbox-group>

    <x-spire::switch
        wire:model="subscribeNewsletter"
        label="Subscribe to newsletter"
        description="Receive weekly updates"
    />

    <div class="flex justify-end gap-3">
        <x-spire::button type="button" variant="ghost" wire:click="cancel">
            Cancel
        </x-spire::button>
        <x-spire::button type="submit" color="primary">
            Save
        </x-spire::button>
    </div>
</form>
```

---

## Best Practices

### Do

- Wrap inputs in Field component for consistent layout
- Use appropriate input types (`email`, `password`, `tel`)
- Provide clear labels and helper text
- Show validation errors inline with inputs
- Use `wire:model.live` sparingly (consider debounce)
- Group related fields with proper spacing

### Don't

- Don't use checkboxes for mutually exclusive options (use radio)
- Don't skip labels - use `sr-only` class if hiding visually
- Don't forget `required` indicators for mandatory fields
- Don't use Select for very long lists (use Autocomplete)
- Don't overload forms - break into steps if needed
