# Autocomplete Component

Search input with suggestion dropdown. Filters options as the user types with keyboard navigation and match highlighting.

## Overview

The Autocomplete component provides a text input that shows filtered suggestions based on user input. It's ideal for searching through large datasets or providing type-ahead functionality.

**Key features:**
- Text filtering with match highlighting
- Keyboard navigation (arrow keys, Enter, Escape)
- Popover API for positioning
- Livewire integration with `wire:model`
- Custom option content support
- Accessible with full ARIA support

## Components

- `autocomplete` - Main input with dropdown
- `autocomplete.option` - Individual suggestion option

---

## Props

### Autocomplete (Main)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | `'Type to search...'` | Placeholder text |
| `placement` | string | `'bottom-start'` | Dropdown placement position |
| `disabled` | boolean | `false` | Disable the autocomplete |
| `showOnFocus` | boolean | `true` | Show dropdown when input is focused |
| `minChars` | number | `0` | Minimum characters before showing suggestions |
| `debounce` | number | `300` | Debounce delay in milliseconds |
| `clearable` | boolean | `true` | Show clear button when input has value |
| `highlightMatches` | boolean | `true` | Highlight matching text in suggestions |
| `syncInput` | boolean | `false` | Sync input text to wire:model (for server-side filtering) |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `variant` | string | `'bordered'` | Visual variant: `bordered`, `flat` |
| `color` | string | `'default'` | Color theme: `default`, `primary`, `error` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` |

### Autocomplete.option

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | `''` | Option value (required) |
| `label` | string | `null` | Display label (defaults to slot content text) |
| `disabled` | boolean | `false` | Disable this option |

---

## Slots

### Autocomplete

| Slot | Description |
|------|-------------|
| Default | Contains `<x-spire::autocomplete.option>` elements |

### Autocomplete.option

| Slot | Description |
|------|-------------|
| Default | Custom content (icons, images, multi-line text) |

---

## Examples

### Basic Usage

```blade
<x-spire::autocomplete wire:model="selectedCountry" placeholder="Search countries...">
    <x-spire::autocomplete.option value="us">United States</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="ca">Canada</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="uk">United Kingdom</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="au">Australia</x-spire::autocomplete.option>
</x-spire::autocomplete>
```

### With Minimum Characters

Useful for large datasets to prevent overwhelming the user:

```blade
<x-spire::autocomplete
    wire:model="searchResult"
    :minChars="2"
    placeholder="Type at least 2 characters..."
>
    @foreach($results as $result)
        <x-spire::autocomplete.option value="{{ $result->id }}">
            {{ $result->name }}
        </x-spire::autocomplete.option>
    @endforeach
</x-spire::autocomplete>
```

### Custom Option Content

Use the `label` prop to define what shows in the input when selected:

```blade
<x-spire::autocomplete wire:model="selectedUser" placeholder="Search users...">
    @foreach($users as $user)
        <x-spire::autocomplete.option value="{{ $user->id }}" label="{{ $user->name }}">
            <div class="flex items-center gap-2">
                <img src="{{ $user->avatar }}" class="w-6 h-6 rounded-full" alt="" />
                <div>
                    <div class="font-medium">{{ $user->name }}</div>
                    <div class="text-xs text-muted">{{ $user->email }}</div>
                </div>
            </div>
        </x-spire::autocomplete.option>
    @endforeach
</x-spire::autocomplete>
```

### Server-Side Search (Async Loading)

For large datasets, filter on the server using `syncInput`:

```php
// Livewire component
public string $search = '';

#[Computed]
public function products(): Collection
{
    if (strlen($this->search) < 2) {
        return collect();
    }

    return Product::where('name', 'like', "%{$this->search}%")
        ->limit(10)
        ->get();
}
```

```blade
<x-spire::autocomplete
    wire:model.live="search"
    :minChars="2"
    syncInput
    placeholder="Search products..."
>
    @foreach($this->products as $product)
        <x-spire::autocomplete.option value="{{ $product->id }}" label="{{ $product->name }}">
            {{ $product->name }}
        </x-spire::autocomplete.option>
    @endforeach
</x-spire::autocomplete>
```

The `syncInput` prop syncs the input text directly to your Livewire property as the user types, making it easy to fetch filtered results from the server.

### Without Show on Focus

Only show dropdown after user starts typing:

```blade
<x-spire::autocomplete
    wire:model="query"
    :showOnFocus="false"
    :minChars="1"
>
    @foreach($suggestions as $suggestion)
        <x-spire::autocomplete.option value="{{ $suggestion }}">
            {{ $suggestion }}
        </x-spire::autocomplete.option>
    @endforeach
</x-spire::autocomplete>
```

### With Disabled Options

```blade
<x-spire::autocomplete wire:model="status">
    <x-spire::autocomplete.option value="active">Active</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="pending">Pending</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="deprecated" :disabled="true">
        Deprecated (unavailable)
    </x-spire::autocomplete.option>
</x-spire::autocomplete>
```

### Inside a Form Field

```blade
<x-spire::field label="Category" for="category" required>
    <x-spire::autocomplete
        wire:model="form.category"
        placeholder="Search categories..."
    >
        @foreach($categories as $category)
            <x-spire::autocomplete.option value="{{ $category->id }}">
                {{ $category->name }}
            </x-spire::autocomplete.option>
        @endforeach
    </x-spire::autocomplete>
</x-spire::field>
```

### Size Variants

```blade
<x-spire::autocomplete size="sm" wire:model="small" placeholder="Small" />
<x-spire::autocomplete size="md" wire:model="medium" placeholder="Medium (default)" />
<x-spire::autocomplete size="lg" wire:model="large" placeholder="Large" />
```

### Style Variants

```blade
{{-- Bordered (default) --}}
<x-spire::autocomplete variant="bordered" wire:model="value" />

{{-- Flat --}}
<x-spire::autocomplete variant="flat" wire:model="value" />
```

### Color Variants

```blade
<x-spire::autocomplete color="default" wire:model="value" />
<x-spire::autocomplete color="primary" wire:model="value" />
<x-spire::autocomplete color="error" wire:model="value" />
```

### Event Handling

```blade
<x-spire::autocomplete
    wire:model="selectedValue"
    @spire-autocomplete-selected="handleSelection($event.detail)"
    @spire-autocomplete-cleared="handleClear($event.detail)"
>
    <x-spire::autocomplete.option value="1">Option 1</x-spire::autocomplete.option>
    <x-spire::autocomplete.option value="2">Option 2</x-spire::autocomplete.option>
</x-spire::autocomplete>
```

```javascript
function handleSelection(detail) {
    console.log('Selected:', detail.value, detail.label);
}

function handleClear(detail) {
    console.log('Cleared, was:', detail.previousValue);
}
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowDown` | Highlight next option / Open dropdown |
| `ArrowUp` | Highlight previous option / Open dropdown |
| `Enter` | Select highlighted option |
| `Escape` | Close dropdown |
| `Home` | Jump to first option |
| `End` | Jump to last option |

---

## Alpine.js API

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Selected value |
| `inputValue` | string | Current text in input |
| `selectedLabel` | string | Label of selected option |
| `open` | boolean | Whether dropdown is open |
| `highlightedIndex` | number | Currently highlighted option index |
| `filteredOptions` | array | Options filtered by input |
| `syncInput` | boolean | Whether input syncs to value |

### Methods

| Method | Description |
|--------|-------------|
| `show()` | Open dropdown |
| `hide()` | Close dropdown |
| `selectOption(value, label)` | Select an option |
| `clearInput()` | Clear input and value |
| `highlightNext()` | Highlight next option |
| `highlightPrev()` | Highlight previous option |

### Events

#### spire-autocomplete-selected

Dispatched when an option is selected.

```javascript
{
    id: 'autocomplete-id',
    name: 'field-name',
    value: 'selected-value',
    previousValue: 'old-value',
    label: 'Option Label',
    timestamp: 1699999999999
}
```

#### spire-autocomplete-cleared

Dispatched when input is cleared.

```javascript
{
    id: 'autocomplete-id',
    name: 'field-name',
    value: '',
    previousValue: 'old-value',
    timestamp: 1699999999999
}
```

---

## Accessibility

The component implements comprehensive ARIA support:

**Input:**
- `role="combobox"` - Identifies as combobox
- `aria-autocomplete="list"` - Indicates autocomplete behavior
- `aria-expanded` - Tracks dropdown state
- `aria-controls` - Points to dropdown
- `aria-activedescendant` - Points to highlighted option
- `autocomplete="off"` - Prevents browser autocomplete

**Dropdown:**
- `role="listbox"` - Identifies as listbox

**Options:**
- `role="option"` - Identifies as option
- `aria-selected` - Selection state
- `aria-disabled` - Disabled state

---

## Best Practices

### Do

- Use `minChars` for large datasets to prevent overwhelming users
- Use `syncInput` with `wire:model.live` for server-side filtering
- Provide meaningful `placeholder` text
- Use `label` prop when options have custom HTML
- Use `wire:key` when rendering options in dynamic loops
- Consider computed properties in Livewire for filtered results

### Don't

- Don't set `minChars` too high - users expect feedback
- Don't use extremely long option content
- Don't forget `label` prop with custom option content
- Don't disable all options
- Don't use for small static lists - use Select instead
- Don't forget to handle empty states

---

## Autocomplete vs Select

| Feature | Autocomplete | Select |
|---------|-------------|--------|
| Input type | Text (user types) | Button trigger |
| Filtering | Built-in | Optional (`searchable`) |
| Primary use | Search large lists | Choose from known options |
| Multiple selection | No | Yes |
| Match highlighting | Yes | No |

**Use Autocomplete when:**
- Users need to search through many options
- Options come from a server query
- You want type-ahead functionality

**Use Select when:**
- Limited, known set of options
- Multiple selection needed
- No searching required

---

## Technical Notes

### Alpine.js x-model Support

The autocomplete supports Alpine.js `x-model` for two-way binding without Livewire:

```blade
<div x-data="{ selectedUser: '' }">
    <x-spire::autocomplete x-model="selectedUser" placeholder="Search users...">
        <x-spire::autocomplete.option value="1" label="John Doe">John Doe</x-spire::autocomplete.option>
        <x-spire::autocomplete.option value="2" label="Jane Smith">Jane Smith</x-spire::autocomplete.option>
        <x-spire::autocomplete.option value="3" label="Bob Wilson">Bob Wilson</x-spire::autocomplete.option>
    </x-spire::autocomplete>
    <p>Selected: <span x-text="selectedUser || '(none)'"></span></p>
</div>
```

**Data type:** String (the `value` attribute of the selected option)

### Livewire Integration

```blade
{{-- Basic binding --}}
<x-spire::autocomplete wire:model="value">

{{-- Live updates --}}
<x-spire::autocomplete wire:model.live="value">

{{-- Debounced --}}
<x-spire::autocomplete wire:model.live.debounce.500ms="value">
```

### Dynamic Options

The component uses a `MutationObserver` to watch for slot content changes, automatically updating when server-side filtering changes available options.

### Match Highlighting

Matching text is highlighted with:
```html
<mark class="bg-primary/20 text-primary font-medium">matched</mark>
```

### Translations

| Key | Default |
|-----|---------|
| `autocomplete.placeholder` | "Type to search..." |
| `autocomplete.no_results` | "No results found" |
| `autocomplete.min_chars_message` | "Type at least :count more character(s)" |
| `autocomplete.clear` | "Clear input" |
