# Textarea Component

Multi-line text input component with customizable resize behavior, character counting, and comprehensive error state styling. Supports all standard textarea features with enhanced UX and full Livewire integration.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Visual variant: `bordered`, `flat` |
| `color` | string | `'default'` | Color theme: `default`, `primary`, `error` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |
| `rows` | number | `4` | Number of visible text rows |
| `disabled` | boolean | `false` | Disables the textarea |
| `readonly` | boolean | `false` | Makes textarea read-only |
| `required` | boolean | `false` | Marks field as required |
| `placeholder` | string | `null` | Placeholder text when empty |
| `resize` | string | `'vertical'` | Resize behavior: `none`, `vertical`, `horizontal`, `both` |

---

## Examples

### Basic Textarea

Simple multi-line text input:

```blade
<x-spire::textarea placeholder="Enter your message..." />
```

### With Livewire

Two-way data binding with Livewire:

```blade
<x-spire::textarea wire:model="description" placeholder="Describe your project..." />
```

### Different Sizes

Control the padding and font size:

```blade
{{-- Small --}}
<x-spire::textarea size="sm" placeholder="Small textarea" />

{{-- Medium (default) --}}
<x-spire::textarea size="md" placeholder="Medium textarea" />

{{-- Large --}}
<x-spire::textarea size="lg" placeholder="Large textarea" />
```

### Row Count

Adjust the visible height:

```blade
{{-- Compact - 2 rows --}}
<x-spire::textarea :rows="2" placeholder="Brief comment..." />

{{-- Default - 4 rows --}}
<x-spire::textarea :rows="4" placeholder="Standard message..." />

{{-- Tall - 10 rows --}}
<x-spire::textarea :rows="10" placeholder="Long description..." />
```

### Variants

Choose between bordered or flat styles:

```blade
{{-- Bordered (default) --}}
<x-spire::textarea variant="bordered" placeholder="Bordered textarea" />

{{-- Flat - subtle background --}}
<x-spire::textarea variant="flat" placeholder="Flat textarea" />
```

### Color Themes

Apply color themes for different states:

```blade
{{-- Default - neutral colors --}}
<x-spire::textarea color="default" placeholder="Default color" />

{{-- Primary - brand color focus --}}
<x-spire::textarea color="primary" placeholder="Primary color" />

{{-- Error - for validation errors --}}
<x-spire::textarea color="error" placeholder="Error state" />
```

### Border Radius

Customize corner rounding:

```blade
{{-- No radius --}}
<x-spire::textarea radius="none" placeholder="Sharp corners" />

{{-- Small radius --}}
<x-spire::textarea radius="sm" placeholder="Small corners" />

{{-- Medium radius (default) --}}
<x-spire::textarea radius="md" placeholder="Medium corners" />

{{-- Large radius --}}
<x-spire::textarea radius="lg" placeholder="Large corners" />
```

### Resize Behavior

Control how users can resize the textarea:

```blade
{{-- Vertical resize only (default) --}}
<x-spire::textarea resize="vertical" placeholder="Resize vertically" />

{{-- No resize - fixed size --}}
<x-spire::textarea resize="none" placeholder="Fixed size" />

{{-- Horizontal resize only --}}
<x-spire::textarea resize="horizontal" placeholder="Resize horizontally" />

{{-- Resize both directions --}}
<x-spire::textarea resize="both" placeholder="Resize any direction" />
```

### Disabled State

Prevent user interaction:

```blade
<x-spire::textarea disabled placeholder="Disabled textarea">
    This content cannot be edited
</x-spire::textarea>
```

### Readonly State

Display-only text that can be selected and copied:

```blade
<x-spire::textarea readonly :rows="6">
This is read-only content that users can select and copy,
but not edit. Perfect for displaying terms, agreements,
or generated content.
</x-spire::textarea>
```

### Required Field

Mark as required for form validation:

```blade
<x-spire::textarea required placeholder="This field is required *" />
```

### With Field Wrapper

Use with Field component for complete form layout:

```blade
<x-spire::field label="Description" name="description" required>
    <x-spire::textarea wire:model="description" placeholder="Describe your product..." />
</x-spire::field>
```

### With Helper Text

Add guidance below the textarea:

```blade
<x-spire::field
    label="Bio"
    name="bio"
    helper="Tell us a bit about yourself. Maximum 500 characters."
>
    <x-spire::textarea
        wire:model="bio"
        placeholder="Your bio..."
        :rows="5"
    />
</x-spire::field>
```

### With Validation Error

Display error messages for failed validation:

```blade
<x-spire::field
    label="Comments"
    name="comments"
    error="Comments must be at least 10 characters"
>
    <x-spire::textarea
        wire:model="comments"
        color="error"
        placeholder="Leave your comments..."
    />
</x-spire::field>
```

### Character Counter (Livewire)

Track character count with Livewire:

```blade
<div>
    <x-spire::field label="Review" name="review">
        <x-spire::textarea
            wire:model.live="review"
            placeholder="Write your review..."
            :rows="5"
        />
    </x-spire::field>

    <div class="text-sm text-muted text-right mt-1">
        {{ strlen($review) }} / 500 characters
    </div>
</div>
```

### Auto-growing with Alpine.js

Create a textarea that grows as content is added:

```blade
<x-spire::textarea
    x-data="{
        resize() {
            $el.style.height = 'auto';
            $el.style.height = $el.scrollHeight + 'px';
        }
    }"
    x-init="resize()"
    @input="resize()"
    resize="none"
    :rows="3"
    placeholder="Type to auto-grow..."
/>
```

### Rich Formatting Instructions

Provide formatting guidance:

```blade
<x-spire::field
    label="Message"
    name="message"
    helper="Supports **bold**, *italic*, and [links](url)"
>
    <x-spire::textarea
        wire:model="message"
        placeholder="Write your message using Markdown..."
        :rows="6"
    />
</x-spire::field>
```

---

## Best Practices

### Do

✅ **Set appropriate row count** - Match initial height to expected content length
```blade
<x-spire::textarea :rows="2" placeholder="Brief comment" />
<x-spire::textarea :rows="10" placeholder="Detailed feedback" />
```

✅ **Use Field wrapper** - For proper labels and error messages
```blade
<x-spire::field label="Description" name="description">
    <x-spire::textarea wire:model="description" />
</x-spire::field>
```

✅ **Provide clear placeholders** - Guide users on what to enter
```blade
<x-spire::textarea placeholder="Describe what makes this product unique..." />
```

✅ **Consider resize behavior** - Disable if fixed layout required
```blade
<x-spire::textarea resize="none" /> {{-- For cards, modals --}}
<x-spire::textarea resize="vertical" /> {{-- For forms (default) --}}
```

✅ **Show character limits** - Help users stay within constraints
```blade
<x-spire::textarea wire:model.live="bio" />
<p class="text-sm text-muted">{{ strlen($bio) }}/500</p>
```

### Don't

❌ **Don't use for single-line input** - Use Input component instead
```blade
{{-- Bad: Single line textarea --}}
<x-spire::textarea :rows="1" />

{{-- Good: Use input --}}
<x-spire::input />
```

❌ **Don't forget validation states** - Show errors with color prop
```blade
{{-- Bad: No visual error indication --}}
<x-spire::textarea wire:model="description" />
@error('description') <span>{{ $message }}</span> @enderror

{{-- Good: Visual error state --}}
<x-spire::field label="Description" name="description" :error="$errors->first('description')">
    <x-spire::textarea wire:model="description" />
</x-spire::field>
```

❌ **Don't set excessive rows** - Start compact, let users resize
```blade
{{-- Bad: Too tall initially --}}
<x-spire::textarea :rows="20" />

{{-- Good: Reasonable start --}}
<x-spire::textarea :rows="4" resize="vertical" />
```

❌ **Don't use readonly for temporary states** - Use disabled instead
```blade
{{-- Bad: readonly for loading --}}
<x-spire::textarea :readonly="$loading" />

{{-- Good: disabled for loading --}}
<x-spire::textarea :disabled="$loading" />
```

---

## Accessibility

### ARIA Attributes

The Textarea component supports standard ARIA attributes:

```blade
<x-spire::textarea
    aria-label="Product Description"
    aria-describedby="description-help"
    aria-required="true"
/>
<p id="description-help">Describe the key features</p>
```

### Required Fields

Use the `required` prop for required fields:

```blade
<x-spire::field label="Review" name="review" required>
    <x-spire::textarea wire:model="review" required />
</x-spire::field>
```

### Error Messages

Associate error messages with `aria-describedby`:

```blade
<x-spire::textarea
    wire:model="comments"
    color="error"
    aria-describedby="comments-error"
    aria-invalid="true"
/>
<span id="comments-error" role="alert">
    Comments must be at least 10 characters
</span>
```

### Keyboard Support

Standard textarea keyboard shortcuts work:
- **Tab**: Move focus to next element
- **Shift+Tab**: Move focus to previous element
- **Enter**: New line
- **Ctrl/Cmd+A**: Select all text

---

## Technical Notes

### Styling

Textareas use the `.spire-textarea` base class with BEM-style modifiers:

```css
.spire-textarea {
    /* Base styles */
}

.spire-textarea--md {
    /* Medium size */
}

.spire-textarea--bordered {
    /* Bordered variant */
}

.spire-textarea--resize-vertical {
    /* Vertical resize only */
}
```

### Custom Classes

Add custom classes via the `class` attribute:

```blade
<x-spire::textarea class="font-mono" placeholder="Code snippet..." />
```

### Livewire Integration

Use standard Livewire wire:model directives:

```blade
{{-- Standard binding --}}
<x-spire::textarea wire:model="description" />

{{-- Live binding (real-time updates) --}}
<x-spire::textarea wire:model.live="bio" />

{{-- Debounced binding --}}
<x-spire::textarea wire:model.live.debounce.500ms="search" />
```

### Default Configuration

Set global defaults in `config/spire-ui.php`:

```php
'defaults' => [
    'textarea' => [
        'size' => 'md',
        'radius' => 'lg',
        'rows' => 4,
        'resize' => 'vertical',
    ],
],
```

### Dark Mode

Textareas automatically adapt to dark mode using semantic color tokens:
- Background: `surface` → `surface` (dark)
- Border: `border` → `border` (dark)
- Text: `text` → `text` (dark)
- Placeholder: `text-muted` → `text-muted` (dark)

---

## Related Components

- **[Input](input.md)** - For single-line text input
- **[Field](field.md)** - Form field wrapper with labels and errors
- **[Form Primitives](form-primitives.md)** - Standalone label, error, and helper components
- **[Editor](editor.md)** - Rich text WYSIWYG editor for formatted content
- **[Select](select.md)** - Dropdown selection component

---

## Common Patterns

### Contact Form

```blade
<form wire:submit="submit">
    <div class="space-y-4">
        <x-spire::field label="Name" name="name" required>
            <x-spire::input wire:model="name" />
        </x-spire::field>

        <x-spire::field label="Email" name="email" required>
            <x-spire::input type="email" wire:model="email" />
        </x-spire::field>

        <x-spire::field label="Message" name="message" required>
            <x-spire::textarea
                wire:model="message"
                placeholder="How can we help you?"
                :rows="6"
            />
        </x-spire::field>

        <x-spire::button type="submit">Send Message</x-spire::button>
    </div>
</form>
```

### Product Review

```blade
<div>
    <x-spire::field
        label="Your Review"
        name="review"
        helper="Share your experience with this product"
    >
        <x-spire::textarea
            wire:model.live="review"
            placeholder="What did you think?"
            :rows="5"
        />
    </x-spire::field>

    <div class="flex justify-between items-center text-sm text-muted mt-1">
        <span>Minimum 50 characters</span>
        <span>{{ strlen($review) }} / 500</span>
    </div>
</div>
```

### Code Snippet Input

```blade
<x-spire::field label="Code" name="code">
    <x-spire::textarea
        wire:model="code"
        class="font-mono text-sm"
        placeholder="Paste your code here..."
        :rows="10"
        resize="both"
    />
</x-spire::field>
```

### Terms Acceptance

```blade
<x-spire::field label="Terms and Conditions" name="terms">
    <x-spire::textarea readonly :rows="8" resize="none">
Terms and Conditions

1. Acceptance of Terms
By accessing and using this service...

2. User Responsibilities
You agree to use the service only for lawful purposes...

[continued...]
    </x-spire::textarea>
</x-spire::field>

<x-spire::checkbox wire:model="acceptTerms" required>
    I have read and agree to the terms and conditions
</x-spire::checkbox>
```
