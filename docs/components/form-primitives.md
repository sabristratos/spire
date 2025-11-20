# Form Primitives

Standalone, reusable components for building custom form layouts: Label, Error, and Helper.

---

## Form Label

Semantic label component with size variants and required indicator.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | string | `null` | Input ID to associate with |
| `required` | boolean | `false` | Show required asterisk |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Label text content |

### Examples

```blade
{{-- Basic label --}}
<x-spire::form.label for="email">
    Email Address
</x-spire::form.label>

{{-- Required field --}}
<x-spire::form.label for="password" required>
    Password
</x-spire::form.label>

{{-- With custom content --}}
<x-spire::form.label for="username">
    Username
    <span class="text-text-muted text-xs">(publicly visible)</span>
</x-spire::form.label>

{{-- Different sizes --}}
<x-spire::form.label for="small" size="sm">Small Label</x-spire::form.label>
<x-spire::form.label for="medium" size="md">Medium Label</x-spire::form.label>
<x-spire::form.label for="large" size="lg">Large Label</x-spire::form.label>
```

---

## Form Error

Error message component with automatic Laravel validation integration.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | `null` | Field name to check in `$errors` bag |
| `message` | string | `null` | Explicit error message (overrides `$errors`) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom error content (overrides everything) |

### Logic Priority

1. **Slot provided** → Use slot content
2. **Message prop provided** → Use message
3. **Name provided** → Check `$errors->first($name)`
4. **None provided** → Render nothing

### Examples

```blade
{{-- Auto from Laravel $errors bag --}}
<x-spire::form.error name="email" />

{{-- Manual error message --}}
<x-spire::form.error message="Email is required" />

{{-- Custom error format with slot --}}
<x-spire::form.error>
    <div class="flex items-center gap-2">
        <x-spire::icon name="alert-circle" class="w-4 h-4 text-error" />
        <span>Custom error message here</span>
    </div>
</x-spire::form.error>

{{-- With @error directive --}}
@error('password')
    <x-spire::form.error message="{{ $message }}" />
@enderror
```

---

## Form Helper

Helper text component for providing guidance.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Size variant: `sm`, `md` |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Helper text content |

### Examples

```blade
{{-- Basic helper text --}}
<x-spire::form.helper>
    Must be at least 8 characters
</x-spire::form.helper>

{{-- Small helper text --}}
<x-spire::form.helper size="sm">
    Optional field
</x-spire::form.helper>

{{-- With custom formatting --}}
<x-spire::form.helper>
    Password must contain:
    <ul class="list-disc ml-4 mt-1">
        <li>At least 8 characters</li>
        <li>One uppercase letter</li>
        <li>One number</li>
    </ul>
</x-spire::form.helper>
```

---

## Complete Custom Form Example

Using all primitives together for full layout control:

```blade
<div class="space-y-6">
    {{-- Email Field --}}
    <div>
        <x-spire::form.label for="email" required>
            Email Address
        </x-spire::form.label>

        <div class="mt-1.5">
            <x-spire::input
                id="email"
                type="email"
                wire:model="email"
                placeholder="you@example.com"
            >
                <x-slot:leading>
                    <x-spire::icon name="mail" class="w-5 h-5 text-text-muted" />
                </x-slot:leading>
            </x-spire::input>
        </div>

        <div class="mt-1.5">
            <x-spire::form.error name="email" />
            @if(!$errors->has('email'))
                <x-spire::form.helper>
                    We'll never share your email with anyone
                </x-spire::form.helper>
            @endif
        </div>
    </div>

    {{-- Password Field --}}
    <div x-data="{ showPassword: false }">
        <x-spire::form.label for="password" required>
            Password
        </x-spire::form.label>

        <div class="mt-1.5">
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
        </div>

        <div class="mt-1.5">
            <x-spire::form.error name="password" />
            @if(!$errors->has('password'))
                <x-spire::form.helper>
                    Must be at least 8 characters
                </x-spire::form.helper>
            @endif
        </div>
    </div>

    {{-- Submit Button --}}
    <x-spire::button type="submit" color="primary">
        Create Account
    </x-spire::button>
</div>
```

---

## Best Practices

### Do

- Use primitives when you need full layout control
- Combine primitives with Field component for complex forms
- Keep helper text concise and actionable
- Use proper for/id linking for accessibility
- Show only error OR helper, never both simultaneously

### Don't

- Don't use primitives for simple forms (use Field component instead)
- Don't forget to add spacing between primitives and inputs
- Don't nest form primitives inside each other
- Don't use error component without checking if error exists first
- Don't override default error/helper styling unless necessary

---

## When to Use Primitives vs Field Component

### Use Primitives When:
- You need custom layout/spacing
- Building complex multi-input fields
- Creating custom form components
- Need fine-grained control over error display

### Use Field Component When:
- Building standard single-input fields
- Want automatic spacing and layout
- Need quick form prototyping
- Following standard form patterns

---

## Accessibility

- Labels properly link to inputs via `for`/`id`
- Required indicator (`*`) is visible and announced
- Error messages use semantic HTML (`<p>` tags)
- Helper text provides additional context
- All text meets WCAG contrast requirements
