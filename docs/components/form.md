# Form Utilities

A collection of form utility components for building accessible and consistent forms: labels, error messages, and helper text.

## Overview

The Form utilities provide reusable components for common form elements like labels, error messages, and helper text. These components are designed to be used alongside input components to create fully accessible forms with proper ARIA attributes.

## Components

### Form Label

Accessible label component with support for required indicators.

#### Basic Usage

```blade
<x-spire::form.label for="email">
    Email Address
</x-spire::form.label>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `for` | string\|null | `null` | ID of the associated input element |
| `required` | boolean | `false` | Shows red asterisk (*) indicator |
| `size` | string | `'md'` | Label size: `sm`, `md`, `lg` |

#### Examples

**Required Field:**
```blade
<x-spire::form.label for="username" required>
    Username
</x-spire::form.label>
<x-spire::input id="username" name="username" required />
```

**Different Sizes:**
```blade
<!-- Small label -->
<x-spire::form.label for="code" size="sm">
    Verification Code
</x-spire::form.label>

<!-- Large label -->
<x-spire::form.label for="title" size="lg">
    Article Title
</x-spire::form.label>
```

---

### Form Error

Error message component with automatic Laravel error bag integration.

#### Basic Usage

```blade
<x-spire::form.error name="email" />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string\|null | `null` | Field name to check in Laravel error bag |
| `message` | string\|null | `null` | Custom error message |
| `icon` | string | `'alert-circle'` | Icon name to display |
| `showIcon` | boolean | `true` | Show/hide the error icon |

#### Examples

**Automatic Laravel Validation:**
```blade
<x-spire::input name="email" type="email" />
<x-spire::form.error name="email" />
{{-- Automatically shows Laravel validation errors for 'email' field --}}
```

**Custom Error Message:**
```blade
<x-spire::form.error message="This field is required" />
```

**With Slot Content:**
```blade
<x-spire::form.error>
    <strong>Error:</strong> The password must contain at least one uppercase letter.
</x-spire::form.error>
```

**Without Icon:**
```blade
<x-spire::form.error name="username" :showIcon="false" />
```

**Custom Icon:**
```blade
<x-spire::form.error name="password" icon="lock">
    <x-slot:iconSlot>
        <x-spire::icon name="shield-alert" class="w-4 h-4" />
    </x-slot:iconSlot>
</x-spire::form.error>
```

**With Livewire:**
```blade
<x-spire::input wire:model="email" name="email" />
<x-spire::form.error name="email" />
{{-- Works automatically with Livewire validation --}}
```

---

### Form Helper

Helper text component for providing additional context or instructions.

#### Basic Usage

```blade
<x-spire::form.helper>
    Password must be at least 8 characters long
</x-spire::form.helper>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Text size: `sm`, `md`, `lg` |

#### Examples

**Basic Helper Text:**
```blade
<x-spire::input type="password" name="password" />
<x-spire::form.helper>
    Use a combination of letters, numbers, and symbols
</x-spire::form.helper>
```

**Different Sizes:**
```blade
<!-- Small helper -->
<x-spire::form.helper size="sm">
    Optional field
</x-spire::form.helper>

<!-- Large helper -->
<x-spire::form.helper size="lg">
    This information will be displayed publicly on your profile
</x-spire::form.helper>
```

---

## Complete Form Examples

### Basic Contact Form

```blade
<form method="POST" action="/contact">
    @csrf

    {{-- Name Field --}}
    <div class="space-y-2">
        <x-spire::form.label for="name" required>
            Full Name
        </x-spire::form.label>
        <x-spire::input id="name" name="name" required />
        <x-spire::form.error name="name" />
    </div>

    {{-- Email Field --}}
    <div class="space-y-2">
        <x-spire::form.label for="email" required>
            Email Address
        </x-spire::form.label>
        <x-spire::input id="email" name="email" type="email" required />
        <x-spire::form.helper>
            We'll never share your email with anyone else
        </x-spire::form.helper>
        <x-spire::form.error name="email" />
    </div>

    {{-- Message Field --}}
    <div class="space-y-2">
        <x-spire::form.label for="message" required>
            Message
        </x-spire::form.label>
        <x-spire::textarea id="message" name="message" rows="4" required />
        <x-spire::form.error name="message" />
    </div>

    <x-spire::button type="submit" color="primary">
        Send Message
    </x-spire::button>
</form>
```

### Registration Form with Validation

```blade
<form method="POST" action="/register">
    @csrf

    <div class="space-y-4">
        {{-- Username --}}
        <div class="space-y-2">
            <x-spire::form.label for="username" required>
                Username
            </x-spire::form.label>
            <x-spire::input
                id="username"
                name="username"
                value="{{ old('username') }}"
                :error="$errors->has('username')"
            />
            <x-spire::form.helper size="sm">
                3-20 characters, letters and numbers only
            </x-spire::form.helper>
            <x-spire::form.error name="username" />
        </div>

        {{-- Email --}}
        <div class="space-y-2">
            <x-spire::form.label for="email" required>
                Email
            </x-spire::form.label>
            <x-spire::input
                id="email"
                name="email"
                type="email"
                value="{{ old('email') }}"
                :error="$errors->has('email')"
            />
            <x-spire::form.error name="email" />
        </div>

        {{-- Password --}}
        <div class="space-y-2">
            <x-spire::form.label for="password" required>
                Password
            </x-spire::form.label>
            <x-spire::input
                id="password"
                name="password"
                type="password"
                :error="$errors->has('password')"
            />
            <x-spire::form.helper>
                At least 8 characters with uppercase, lowercase, and numbers
            </x-spire::form.helper>
            <x-spire::form.error name="password" />
        </div>

        {{-- Confirm Password --}}
        <div class="space-y-2">
            <x-spire::form.label for="password_confirmation" required>
                Confirm Password
            </x-spire::form.label>
            <x-spire::input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
            />
        </div>

        <x-spire::button type="submit" color="primary" class="w-full">
            Create Account
        </x-spire::button>
    </div>
</form>
```

### Livewire Form

```blade
<form wire:submit="save">
    <div class="space-y-4">
        {{-- Title --}}
        <div class="space-y-2">
            <x-spire::form.label for="title" required>
                Post Title
            </x-spire::form.label>
            <x-spire::input
                id="title"
                wire:model.blur="title"
                :error="$errors->has('title')"
            />
            <x-spire::form.error name="title" />
        </div>

        {{-- Category --}}
        <div class="space-y-2">
            <x-spire::form.label for="category">
                Category
            </x-spire::form.label>
            <x-spire::select
                id="category"
                wire:model.live="category"
                :error="$errors->has('category')"
            >
                <option value="">Select a category</option>
                <option value="tech">Technology</option>
                <option value="design">Design</option>
                <option value="business">Business</option>
            </x-spire::select>
            <x-spire::form.error name="category" />
        </div>

        {{-- Content --}}
        <div class="space-y-2">
            <x-spire::form.label for="content" required>
                Content
            </x-spire::form.label>
            <x-spire::textarea
                id="content"
                wire:model.blur="content"
                rows="6"
                :error="$errors->has('content')"
            />
            <x-spire::form.helper>
                Markdown formatting is supported
            </x-spire::form.helper>
            <x-spire::form.error name="content" />
        </div>

        {{-- Published --}}
        <div class="space-y-2">
            <x-spire::checkbox wire:model.boolean="published" name="published">
                Publish immediately
            </x-spire::checkbox>
        </div>

        <div class="flex gap-3">
            <x-spire::button type="submit" color="primary">
                Save Post
            </x-spire::button>
            <x-spire::button type="button" variant="outline" wire:click="cancel">
                Cancel
            </x-spire::button>
        </div>
    </div>
</form>
```

## Accessibility

- ✅ **Semantic HTML**: Uses proper `<label>` and `<p>` elements
- ✅ **Associations**: Labels use `for` attribute to associate with inputs
- ✅ **Error Indication**: Error component includes visual icon and proper styling
- ✅ **ARIA Attributes**: Error messages can be associated with inputs via `aria-describedby`
- ✅ **Required Indicators**: Visual asterisk with proper semantic meaning
- ✅ **Screen Reader Support**: All content is accessible to assistive technologies

## Styling

### Label Classes
- `.spire-label` - Base label styling
- `.spire-label--sm` / `.spire-label--md` / `.spire-label--lg` - Size variants

### Error Classes
- `.spire-error` - Error message container
- Icon and text are displayed with flexbox

### Helper Classes
- `.spire-helper` - Helper text styling
- `.spire-helper--sm` / `.spire-helper--md` / `.spire-helper--lg` - Size variants

## Notes

- **Form.error** automatically integrates with Laravel's `$errors` bag
- If both `name` and `message` props are provided, `message` takes precedence
- Error component only renders if there's an actual error message
- Works seamlessly with Livewire validation
- All components support custom classes via the `class` attribute
- Helper text should be associated with inputs using `aria-describedby` for best accessibility

## Related Components

- [Field](field.md) - Complete field wrapper with label, input, and error
- [Input](input.md) - Text input component
- [Textarea](textarea.md) - Multi-line text input
- [Select](select.md) - Dropdown select component
- [Checkbox](checkbox.md) - Checkbox input
- [Radio](radio.md) - Radio button input
