# Phone Input Component

An international phone number input with country selection, featuring flag icons, searchable country dropdown, and dial code prefix.

## Overview

The Phone Input component provides a comprehensive phone number input solution with:

- **Country selector** - Dropdown with flag icons and dial codes
- **Virtual scrolling** - Performance optimized for ~240 countries
- **Always searchable** - Filter countries by name, code, or dial code
- **Preferred countries** - Show frequently used countries at the top

**Key features:**
- Flag icons from flag-icons library
- Searchable country dropdown
- Preferred countries support
- Dial code prefix display
- Keyboard navigation
- Livewire integration
- ARIA accessibility

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultCountry` | string | `'us'` | Default country code (ISO 3166-1 alpha-2) |
| `placeholder` | string | `null` | Phone number placeholder (auto-translated) |
| `placement` | string | `'bottom-start'` | Dropdown placement |
| `size` | string | `'md'` | Input size: `sm`, `md`, `lg` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |
| `disabled` | boolean | `false` | Disable the input |
| `required` | boolean | `false` | Mark as required |
| `preferredCountries` | array | `[]` | Country codes to show first |
| `showDialCode` | boolean | `true` | Show dial code in trigger |

---

## Value Format

Phone values are stored as E.164-like strings (dial code + national number):

```php
// In Livewire component
public ?string $phone = null;  // '+12025551234' or null
```

**Format:** `+{dialCode}{nationalNumber}` with non-digits stripped from national number.

---

## Examples

### Basic Usage

```blade
<x-spire::phone-input wire:model="phone" />
```

### With Default Country

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="de"
/>
```

### With Placeholder

```blade
<x-spire::phone-input
    wire:model="phone"
    placeholder="Enter phone number"
/>
```

### With Preferred Countries

Show frequently used countries at the top of the dropdown:

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="us"
    :preferred-countries="['us', 'ca', 'gb', 'de']"
/>
```

### Size Variants

```blade
{{-- Small --}}
<x-spire::phone-input wire:model="phone" size="sm" />

{{-- Medium (default) --}}
<x-spire::phone-input wire:model="phone" size="md" />

{{-- Large --}}
<x-spire::phone-input wire:model="phone" size="lg" />
```

### Border Radius

```blade
<x-spire::phone-input wire:model="phone" radius="none" />
<x-spire::phone-input wire:model="phone" radius="sm" />
<x-spire::phone-input wire:model="phone" radius="md" />
<x-spire::phone-input wire:model="phone" radius="lg" />
<x-spire::phone-input wire:model="phone" radius="full" />
```

### Without Dial Code Display

Hide the dial code in the trigger button:

```blade
<x-spire::phone-input
    wire:model="phone"
    :show-dial-code="false"
/>
```

### Disabled State

```blade
<x-spire::phone-input
    wire:model="phone"
    :disabled="true"
/>
```

### Required Field

```blade
<x-spire::phone-input
    wire:model="phone"
    :required="true"
/>
```

### In a Form Field

```blade
<x-spire::field label="Phone Number" for="phone" required>
    <x-spire::phone-input
        wire:model="phone"
        :preferred-countries="['us', 'ca']"
    />
    @error('phone')
        <span class="text-sm text-error">{{ $message }}</span>
    @enderror
</x-spire::field>
```

### Livewire Integration

```php
class ContactForm extends Component
{
    public ?string $phone = null;
    public ?string $countryCode = null;

    public function rules()
    {
        return [
            'phone' => 'required|regex:/^\+[0-9]{10,15}$/',
        ];
    }

    public function save()
    {
        $this->validate();

        Contact::create([
            'phone' => $this->phone,
        ]);

        session()->flash('message', 'Contact saved!');
    }
}
```

### Complete Form Example

```blade
<x-spire::form wire:submit="save">
    <x-spire::field label="Full Name" for="name" required>
        <x-spire::input wire:model="name" />
    </x-spire::field>

    <x-spire::field label="Email" for="email" required>
        <x-spire::input wire:model="email" type="email" />
    </x-spire::field>

    <x-spire::field label="Phone Number" for="phone">
        <x-spire::phone-input
            wire:model="phone"
            default-country="us"
            :preferred-countries="['us', 'ca', 'mx']"
        />
    </x-spire::field>

    <x-spire::button type="submit">
        Save Contact
    </x-spire::button>
</x-spire::form>
```

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `selectedCountryCode` | string | Current country code (e.g., 'us') |
| `selectedCountry` | object | Current country object with name, dialCode |
| `phoneNumber` | string | National phone number (without dial code) |
| `fullValue` | string | Complete phone number with dial code |
| `searchQuery` | string | Current search filter text |
| `countries` | array | All available countries |
| `filteredCountries` | array | Countries matching search query |

### Key Methods

| Method | Description |
|--------|-------------|
| `selectCountryByCode(code)` | Select a country by its ISO code |
| `updateFullValue()` | Recalculate the full phone value |
| `parsePhoneNumber(value)` | Parse a phone string to extract country |

---

## Events

The component dispatches custom events:

### spire-phone-input-changed

Fired when the phone number value changes.

```javascript
{
    id: 'phone-input-unique-id',
    value: '+12025551234',
    timestamp: 1699999999999,
    countryCode: 'us',
    dialCode: '+1',
    nationalNumber: '2025551234'
}
```

### spire-phone-input-country-changed

Fired when the selected country changes.

```javascript
{
    id: 'phone-input-unique-id',
    value: 'gb',
    previousValue: 'us',
    timestamp: 1699999999999,
    dialCode: '+44',
    countryName: 'United Kingdom'
}
```

---

## Accessibility

### ARIA Support

- `aria-haspopup="listbox"` on country trigger
- `aria-expanded` state
- `aria-activedescendant` for keyboard navigation
- `role="listbox"` on dropdown
- `role="option"` on country options
- `aria-selected` for current selection

### Keyboard Navigation

- **Tab** - Navigate between country button and phone input
- **Arrow Up/Down** - Navigate country options
- **Enter** - Select highlighted country
- **Escape** - Close dropdown
- **Home/End** - Jump to first/last country
- **Type to search** - Filter countries by typing

---

## Country Data

The component includes data for ~240 countries with:

- ISO 3166-1 alpha-2 code (lowercase)
- Country name (English)
- International dial code

### Supported Countries

All countries and territories with international dial codes are supported, including:

- Major countries (US, UK, Germany, France, etc.)
- Territories (Puerto Rico, Guam, etc.)
- Small nations (Vatican City, Monaco, etc.)

---

## Virtual Scrolling

The dropdown uses virtual scrolling for performance:

- Only visible items are rendered
- Smooth scrolling with 5-item buffer
- Handles ~240 countries efficiently
- No lag when filtering or scrolling

---

## Best Practices

### Do

- Use `preferredCountries` for your target audience
- Set appropriate `defaultCountry` for your users
- Use `wire:model.live` when you need real-time validation
- Store phone numbers in E.164 format (`+12025551234`)
- Validate phone numbers with regex or validation library

### Don't

- Don't show dial code if users prefer compact display
- Don't use without a default country
- Don't forget to handle `null` values
- Don't rely on client-side validation alone

---

## Styling

### CSS Classes

The component uses BEM-inspired classes:

```css
.spire-phone-input              /* Main container */
.spire-phone-input--sm          /* Size small */
.spire-phone-input--md          /* Size medium */
.spire-phone-input--lg          /* Size large */
.spire-phone-input-country      /* Country selector button */
.spire-phone-input-flag         /* Flag icon container */
.spire-phone-input-dial-code    /* Dial code text */
.spire-phone-input-number       /* Phone number input */
.spire-phone-input-dropdown     /* Dropdown container */
.spire-phone-input-search       /* Search container */
.spire-phone-input-list         /* Country list */
.spire-phone-input-option       /* Country option */
.spire-phone-input-empty        /* No results message */
```

### Customizing Colors

Use Tailwind utilities on the parent:

```blade
<div class="[&_.spire-phone-input-country]:bg-primary-50">
    <x-spire::phone-input wire:model="phone" />
</div>
```

---

## Translations

Key translations under `spire-ui::spire-ui.phone-input`:

| Key | Default (English) |
|-----|-------------------|
| `placeholder` | Phone number |
| `search_placeholder` | Search countries... |
| `no_results` | No countries found |
| `select_country` | Select country |

---

## Form Validation

### Laravel Validation

```php
public function rules()
{
    return [
        // Basic format validation
        'phone' => 'nullable|regex:/^\+[0-9]{10,15}$/',

        // Required with specific format
        'phone' => 'required|regex:/^\+1[0-9]{10}$/', // US only
    ];
}
```

### Custom Validation Message

```php
public function messages()
{
    return [
        'phone.regex' => 'Please enter a valid phone number.',
    ];
}
```

---

## Common Patterns

### Customer Contact Form

```blade
<x-spire::field label="Phone" for="phone" required>
    <x-spire::phone-input
        wire:model="phone"
        default-country="us"
        :preferred-countries="['us', 'ca', 'mx']"
        placeholder="(555) 123-4567"
    />
</x-spire::field>
```

### International Business

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="gb"
    :preferred-countries="['gb', 'de', 'fr', 'nl', 'be']"
/>
```

### European Focus

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="de"
    :preferred-countries="['de', 'at', 'ch', 'fr', 'nl']"
/>
```

### Middle East

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="ae"
    :preferred-countries="['ae', 'sa', 'kw', 'qa', 'bh']"
/>
```

### Asia Pacific

```blade
<x-spire::phone-input
    wire:model="phone"
    default-country="sg"
    :preferred-countries="['sg', 'my', 'id', 'th', 'vn', 'ph']"
/>
```

---

## Technical Notes

### Alpine.js x-model Support

The phone input supports Alpine.js `x-model` for two-way binding without Livewire:

```blade
<div x-data="{ phone: '' }">
    <x-spire::phone-input
        x-model="phone"
        default-country="us"
        :preferred-countries="['us', 'ca', 'gb']"
    />
    <p>Phone: <span x-text="phone || '(none)'"></span></p>
</div>
```

**Data type:** String in E.164-like format (`'+12025551234'` or empty string `''`)

### Flag Icons

Flags are provided by the `flag-icons` npm package:
- Square flags using `.fi.fis.fi-{code}` classes
- SVG flags included as CSS background images
- Approximately 50KB total CSS

### Performance

- Virtual scrolling renders only visible items
- 5-item buffer for smooth scrolling
- Search filters run on client-side
- No network requests for country data

### Browser Support

- Modern browsers with CSS anchor positioning
- Polyfill included for older browsers
- Popover API with fallback
