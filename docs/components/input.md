# Input Component

Pure input component with leading/trailing slots for icons and interactive elements.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Visual variant: `bordered`, `flat` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` (affects height, padding, text size) |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` |
| `type` | string | `'text'` | HTML input type: `text`, `email`, `password`, `number`, `tel`, `url`, `search`, `date`, etc. |
| `disabled` | boolean | `false` | Disable the input (prevents interaction) |
| `readonly` | boolean | `false` | Make input read-only (shows but cannot edit) |
| `required` | boolean | `false` | Mark input as required |
| `placeholder` | string | `null` | Placeholder text |
| `icon` | string | `null` | Icon name for leading slot (shorthand) |
| `iconTrailing` | string | `null` | Icon name for trailing slot (shorthand) |
| `clearable` | boolean | `false` | Add clear button in trailing slot |
| `viewable` | boolean | `false` | Add password toggle button in trailing slot (for password inputs) |
| `copyable` | boolean | `false` | Add copy-to-clipboard button in trailing slot |

## Slots

| Slot | Description |
|------|-------------|
| `leading` | Content before input (icons, prefix text). Supports interactive elements. |
| `trailing` | Content after input (icons, buttons, suffix text). Supports interactive elements. |

## Attribute Handling

- **Wrapper receives:** `class`, `style` attributes only
- **Input receives:** All other attributes including `wire:*`, `x-*`, `id`, `name`, `value`, etc.

---

## Examples

### Basic Input

```blade
<x-spire::input
    type="email"
    placeholder="Enter your email"
    wire:model="email"
/>
```

### Icon Shorthand

```blade
{{-- Leading icon --}}
<x-spire::input
    icon="mail"
    type="email"
    placeholder="Email address"
    wire:model="email"
/>

{{-- Trailing icon --}}
<x-spire::input
    iconTrailing="check-circle"
    placeholder="Verified field"
    wire:model="field"
/>

{{-- Both leading and trailing --}}
<x-spire::input
    icon="mail"
    iconTrailing="check-circle"
    type="email"
    placeholder="Verified email"
    wire:model="email"
/>
```

### Combining Icon Props with Slots

Icon props and slots work together - they don't override each other:

```blade
{{-- Icon prop + slot content (both render) --}}
<x-spire::input
    icon="search"
    clearable
    placeholder="Search..."
    wire:model.live="query"
>
    <x-slot:trailing>
        <kbd class="text-xs text-text-muted">⌘K</kbd>
    </x-slot:trailing>
</x-spire::input>
{{-- Renders: search icon | input | ⌘K + clear button --}}

{{-- Multiple trailing elements --}}
<x-spire::input
    icon="globe"
    iconTrailing="chevron-down"
    placeholder="Select country..."
>
    <x-slot:trailing>
        <span class="text-xs text-text-muted">USD</span>
    </x-slot:trailing>
</x-spire::input>
{{-- Renders: globe icon | input | USD + chevron-down icon --}}
```

### Clearable Input

```blade
<x-spire::input
    clearable
    placeholder="Search..."
    wire:model="search"
/>

{{-- With icon --}}
<x-spire::input
    icon="search-md"
    clearable
    placeholder="Search..."
    wire:model.live="query"
/>
```

### Password with Toggle (Viewable)

```blade
<x-spire::input
    type="password"
    viewable
    placeholder="Enter password"
    wire:model="password"
/>
```

### Copyable Input

```blade
{{-- Useful for API tokens, codes, etc. --}}
<x-spire::input
    readonly
    copyable
    wire:model="apiToken"
/>
```

### Input with Leading Icon

```blade
<x-spire::input
    type="email"
    placeholder="Search..."
    wire:model="query"
>
    <x-slot:leading>
        <x-spire::icon name="search-md" class="w-5 h-5 text-text-muted" />
    </x-slot:leading>
</x-spire::input>
```

### Input with Clear Button (Trailing)

```blade
<x-spire::input
    type="text"
    placeholder="Enter username"
    wire:model.live="username"
    x-data="{ value: @entangle('username') }"
>
    <x-slot:trailing>
        <button
            type="button"
            @click="value = ''"
            class="text-text-muted hover:text-text ease-fast"
            x-show="value"
        >
            <x-spire::icon name="x-close" class="w-4 h-4" />
        </button>
    </x-slot:trailing>
</x-spire::input>
```

### Password Input with Toggle

```blade
<div x-data="{ showPassword: false }">
    <x-spire::input
        x-bind:type="showPassword ? 'text' : 'password'"
        placeholder="Enter password"
        wire:model="password"
    >
        <x-slot:trailing>
            <button
                type="button"
                @click="showPassword = !showPassword"
                class="text-text-muted hover:text-text ease-fast"
            >
                <x-spire::icon x-show="!showPassword" name="eye" class="w-5 h-5" />
                <x-spire::icon x-show="showPassword" name="eye-off" class="w-5 h-5" />
            </button>
        </x-slot:trailing>
    </x-spire::input>
</div>
```

### Search Input (Both Slots)

```blade
<x-spire::input
    type="search"
    placeholder="Search articles..."
    wire:model.live="search"
    x-data="{ value: @entangle('search') }"
>
    <x-slot:leading>
        <x-spire::icon name="search-md" class="w-5 h-5 text-text-muted" />
    </x-slot:leading>

    <x-slot:trailing>
        <button
            type="button"
            @click="value = ''"
            x-show="value"
            class="text-text-muted hover:text-text"
        >
            <x-spire::icon name="x-close" class="w-4 h-4" />
        </button>
    </x-slot:trailing>
</x-spire::input>
```

### Variants

```blade
{{-- Bordered (default) --}}
<x-spire::input variant="bordered" placeholder="Bordered input" />

{{-- Flat --}}
<x-spire::input variant="flat" placeholder="Flat input" />
```

### Sizes

```blade
{{-- Small --}}
<x-spire::input size="sm" placeholder="Small input" />

{{-- Medium (default) --}}
<x-spire::input size="md" placeholder="Medium input" />

{{-- Large --}}
<x-spire::input size="lg" placeholder="Large input" />
```

### Disabled and Readonly

```blade
{{-- Disabled --}}
<x-spire::input disabled placeholder="Disabled input" value="Cannot edit" />

{{-- Readonly --}}
<x-spire::input readonly placeholder="Readonly input" value="Can see but not edit" />
```

### With Manual Label and Error

```blade
<x-spire::form.label for="email" required>
    Email Address
</x-spire::form.label>

<x-spire::input
    id="email"
    type="email"
    wire:model="email"
    placeholder="you@example.com"
/>

<x-spire::form.error name="email" />
```

---

## Best Practices

### Do

- Use convenience props (`icon`, `clearable`, `viewable`, `copyable`) for common patterns
- Combine icon props with slots when you need both (they render together)
- Use leading/trailing slots for custom interactive elements
- Use proper input types (`email`, `tel`, `url`) for better mobile keyboards
- Provide clear placeholder text that doesn't repeat the label
- Use the flat variant for inputs on colored backgrounds
- Ensure leading/trailing content doesn't obscure input text
- Use `clearable` for search inputs and filters
- Use `viewable` for password fields to improve user experience
- Use `copyable` for read-only values like API tokens or codes

### Don't

- Don't put too much content in leading/trailing slots (max 2-3 elements)
- Don't use tiny interactive elements in slots (minimum 16x16px touch target)
- Don't use placeholder text as the only label (accessibility issue)
- Don't nest inputs inside other inputs
- Don't override padding classes that accommodate slot content

---

## Accessibility

- Inputs are automatically linked to labels via `for`/`id` attributes
- Use `required` prop for required fields
- The component supports `aria-*` attributes passed through
- Invalid states trigger `invalid` and `user-invalid` pseudo-classes
- Focus states are clearly visible with ring effect
- Disabled inputs have proper `disabled` attribute and styling

---

## Technical Notes

### Livewire Integration

All `wire:*` attributes pass through to the input element:

```blade
<x-spire::input
    wire:model.live="email"
    wire:loading.attr="disabled"
    wire:keydown.enter="submit"
/>
```

### Alpine.js Integration

All `x-*` attributes pass through to the input element:

```blade
<x-spire::input
    x-model="username"
    x-on:input="validateUsername"
    x-bind:disabled="isProcessing"
/>
```

### Interactive Slot Content

Leading/trailing slots use `[&>*]:pointer-events-auto` to allow interactive elements:

```blade
<x-slot:trailing>
    <button type="button" @click="clearInput()">
        <x-spire::icon name="x" />
    </button>
</x-slot:trailing>
```

### Automatic Padding

The component automatically adds padding when slots are present:
- Leading slot adds `pl-10` to input
- Trailing slot adds `pr-10` to input

### Convenience Props Implementation

The component uses DRY principles by reusing existing components:

**Icons:** Uses `<x-spire::icon>` component with size variants
- Small input: `w-4 h-4`
- Medium input: `w-5 h-5`
- Large input: `w-6 h-6`

**Buttons:** Uses `<x-spire::button>` with `variant="ghost"` and `icon-only`
- Automatically scales with input size
- Uses semantic translations for ARIA labels

**Alpine.js Integration:**
- `clearable`/`copyable` require `wire:model` and use `@entangle` for reactivity
- `viewable` adds local Alpine state (`showPassword`) and dynamic type binding
- Components only wrap in Alpine when needed to minimize overhead

**Props + Slots:**
- Icon props and slots render together (they don't override each other)
- Order: icon prop → slot content (leading), slot content → convenience buttons → iconTrailing prop (trailing)
- This allows combining simple icons with custom slot content
