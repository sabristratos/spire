# Field Component

Convenience wrapper component that provides proper spacing and layout for form inputs with labels, errors, and helper text.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `null` | Label text (shorthand alternative to label slot) |
| `for` | string | `null` | Input ID for label association |
| `required` | boolean | `false` | Show required asterisk on label |
| `error` | string | `null` | Field name to check in `$errors` bag or explicit error message |
| `helper` | string | `null` | Helper text (only shown if no error) |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` (affects label and helper text) |

## Slots

| Slot | Description |
|------|-------------|
| `label` | Custom label content (overrides `label` prop) |
| `default` | The input component goes here |
| `error` | Custom error content (overrides `error` prop) |
| `helper` | Custom helper content (overrides `helper` prop) |

---

## Examples

### Basic Field (Shorthand with Props)

```blade
<x-spire::field
    label="Email Address"
    for="email"
    required
    error="email"
    helper="We'll never share your email with anyone"
>
    <x-spire::input
        id="email"
        type="email"
        wire:model="email"
        placeholder="you@example.com"
    />
</x-spire::field>
```

### Custom Label (with Slots)

```blade
<x-spire::field>
    <x-slot:label>
        <x-spire::form.label for="username" required>
            Username <span class="text-text-muted">(publicly visible)</span>
        </x-spire::form.label>
    </x-slot:label>

    <x-spire::input
        id="username"
        type="text"
        wire:model="username"
    />

    <x-slot:error>
        <x-spire::form.error name="username" />
    </x-slot:error>
</x-spire::field>
```

### Field with Leading Icon

```blade
<x-spire::field
    label="Search"
    for="search"
    helper="Search by name, email, or phone number"
>
    <x-spire::input
        id="search"
        type="search"
        wire:model.live="search"
    >
        <x-slot:leading>
            <x-spire::icon name="search-md" class="w-5 h-5 text-text-muted" />
        </x-slot:leading>
    </x-spire::input>
</x-spire::field>
```

### Password Field with Toggle

```blade
<div x-data="{ showPassword: false }">
    <x-spire::field
        label="Password"
        for="password"
        required
        error="password"
        helper="Must be at least 8 characters"
    >
        <x-spire::input
            id="password"
            x-bind:type="showPassword ? 'text' : 'password'"
            wire:model="password"
        >
            <x-slot:trailing>
                <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="text-text-muted hover:text-text"
                >
                    <x-spire::icon x-show="!showPassword" name="eye" class="w-5 h-5" />
                    <x-spire::icon x-show="showPassword" name="eye-off" class="w-5 h-5" />
                </button>
            </x-slot:trailing>
        </x-spire::input>
    </x-spire::field>
</div>
```

### Field Sizes

```blade
{{-- Small --}}
<x-spire::field label="Small Field" size="sm">
    <x-spire::input size="sm" />
</x-spire::field>

{{-- Medium (default) --}}
<x-spire::field label="Medium Field" size="md">
    <x-spire::input size="md" />
</x-spire::field>

{{-- Large --}}
<x-spire::field label="Large Field" size="lg">
    <x-spire::input size="lg" />
</x-spire::field>
```

### Custom Error Format

```blade
<x-spire::field label="Email" for="email">
    <x-spire::input
        id="email"
        type="email"
        wire:model="email"
    />

    <x-slot:error>
        @error('email')
            <div class="flex items-center gap-2 text-error text-sm">
                <x-spire::icon name="alert-circle" class="w-4 h-4" />
                <span>{{ $message }}</span>
            </div>
        @enderror
    </x-slot:error>
</x-spire::field>
```

### Field Without Label

```blade
<x-spire::field
    error="query"
    helper="Search across all fields"
>
    <x-spire::input
        type="search"
        wire:model.live="query"
        placeholder="Search..."
    >
        <x-slot:leading>
            <x-spire::icon name="search-md" class="w-5 h-5 text-text-muted" />
        </x-slot:leading>
    </x-spire::input>
</x-spire::field>
```

---

## Best Practices

### Do

- Use Field component for standard form layouts to reduce boilerplate
- Match input size with field size for consistent typography
- Provide helper text for complex or unfamiliar inputs
- Use error prop with field name for automatic Laravel validation integration
- Keep helper text concise (1-2 short sentences max)
- Use slots for custom label formatting (badges, tooltips, etc.)

### Don't

- Don't nest Field components inside each other
- Don't use Field for inline form layouts (use Input directly)
- Don't show both error and helper text simultaneously (Field handles this automatically)
- Don't forget to set `for` prop for label association
- Don't use Field for non-input elements (buttons, checkboxes, etc.) without customization

---

## Spacing

The Field component provides consistent spacing:

- **Label to Input:** `mb-1.5` (6px)
- **Input to Helper/Error:** `mt-1.5` (6px)

This creates a comfortable vertical rhythm for form fields.

---

## Error Handling

### Automatic Laravel Integration

When `error` prop contains a field name, the component automatically checks Laravel's `$errors` bag:

```blade
{{-- Checks $errors->has('email') and displays $errors->first('email') --}}
<x-spire::field error="email">
    <x-spire::input wire:model="email" />
</x-spire::field>
```

**Important:** Pass the field name as a string, not the error message itself:

```blade
{{-- ✅ Correct: Pass field name --}}
<x-spire::field error="email">

{{-- ❌ Wrong: Don't pass $errors->first() --}}
<x-spire::field :error="$errors->first('email')">
```

The component will automatically look up the error from Laravel's `$errors` bag using the field name you provide.

### Manual Error Message

Pass a full error message instead of field name:

```blade
<x-spire::field error="This email is already taken">
    <x-spire::input wire:model="email" />
</x-spire::field>
```

### Custom Error Slot

Override error display entirely with custom content:

```blade
<x-spire::field>
    <x-spire::input wire:model="email" />

    <x-slot:error>
        <x-spire::form.error name="email" />
    </x-slot:error>
</x-spire::field>
```

---

## Accessibility

- Proper label/input association via `for`/`id` attributes
- Required fields show visual indicator (red asterisk)
- Error messages are properly announced to screen readers
- Helper text provides additional context
- All spacing meets WCAG touch target guidelines

---

## Technical Notes

### Prop vs Slot Priority

Slots always override props:
1. If slot exists → use slot content
2. Else if prop exists → use prop content
3. Else → render nothing

### Helper vs Error Display

Only one is shown at a time:
1. If error exists → show error (hide helper)
2. Else if helper exists → show helper
3. Else → show nothing

This prevents visual clutter and ensures users see the most important feedback first.
