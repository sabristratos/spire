# Select Component

Feature-rich dropdown selection component with support for single and multiple selection, search filtering, keyboard navigation, and full Livewire integration.

## Props

### Select (Main)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | `'Select an option'` | Placeholder text when no selection |
| `placement` | string | `'bottom-start'` | Dropdown placement position |
| `disabled` | boolean | `false` | Disables the select |
| `searchable` | boolean | `false` | Enables search/filter functionality |
| `searchPlaceholder` | string | `'Search options...'` | Search input placeholder |
| `multiple` | boolean | `false` | Enables multi-select mode |
| `max` | number | `null` | Maximum selections allowed (multi-select only) |

### Select.option

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | `''` | The option value (required) |
| `label` | string | `null` | Display label (defaults to slot content) |
| `disabled` | boolean | `false` | Disables the option |

---

## Slots

### Select (Main)

| Slot | Description |
|------|-------------|
| Default | Contains `<x-spire::select.option>` elements |

### Select.option

| Slot | Description |
|------|-------------|
| Default | Option display content |

---

## Examples

### Basic Single Select

```blade
<x-spire::select wire:model="country" placeholder="Select a country">
    <x-spire::select.option value="us">United States</x-spire::select.option>
    <x-spire::select.option value="ca">Canada</x-spire::select.option>
    <x-spire::select.option value="uk">United Kingdom</x-spire::select.option>
</x-spire::select>
```

### Searchable Select

```blade
<x-spire::select
    wire:model="country"
    searchable
    searchPlaceholder="Search countries..."
>
    <x-spire::select.option value="us">United States</x-spire::select.option>
    <x-spire::select.option value="ca">Canada</x-spire::select.option>
    <x-spire::select.option value="uk">United Kingdom</x-spire::select.option>
    <x-spire::select.option value="fr">France</x-spire::select.option>
    <x-spire::select.option value="de">Germany</x-spire::select.option>
</x-spire::select>
```

### Multiple Select

```blade
<x-spire::select
    wire:model="selectedFruits"
    multiple
    placeholder="Select fruits"
>
    <x-spire::select.option value="apple">Apple</x-spire::select.option>
    <x-spire::select.option value="banana">Banana</x-spire::select.option>
    <x-spire::select.option value="cherry">Cherry</x-spire::select.option>
    <x-spire::select.option value="orange">Orange</x-spire::select.option>
</x-spire::select>
```

### Multiple Select with Max Limit

```blade
<x-spire::select
    wire:model="selectedTags"
    multiple
    :max="3"
    placeholder="Select up to 3 tags"
>
    <x-spire::select.option value="php">PHP</x-spire::select.option>
    <x-spire::select.option value="laravel">Laravel</x-spire::select.option>
    <x-spire::select.option value="vue">Vue.js</x-spire::select.option>
    <x-spire::select.option value="react">React</x-spire::select.option>
    <x-spire::select.option value="alpine">Alpine.js</x-spire::select.option>
</x-spire::select>
```

### Multiple Select with Search

```blade
<x-spire::select
    wire:model="form.tags"
    multiple
    searchable
    placeholder="Select tags"
>
    @foreach($tagSuggestions as $tag)
        <x-spire::select.option value="{{ $tag }}">
            {{ $tag }}
        </x-spire::select.option>
    @endforeach
</x-spire::select>
```

### Disabled Options

```blade
<x-spire::select wire:model="category">
    <x-spire::select.option value="">Select a category</x-spire::select.option>
    <x-spire::select.option value="electronics">Electronics</x-spire::select.option>
    <x-spire::select.option value="clothing">Clothing</x-spire::select.option>
    <x-spire::select.option value="deprecated" :disabled="true">
        Deprecated (disabled)
    </x-spire::select.option>
</x-spire::select>
```

### Dynamic Options from Array

```blade
<x-spire::select wire:model="selectedCategory" searchable>
    <x-spire::select.option value="">All Categories</x-spire::select.option>
    @foreach($categories as $category)
        <x-spire::select.option value="{{ $category->id }}">
            {{ $category->name }}
        </x-spire::select.option>
    @endforeach
</x-spire::select>
```

### Custom Option Content

Use the `label` prop to set the display text in the trigger while providing custom content in the dropdown:

```blade
<x-spire::select wire:model="assignee" placeholder="Select assignee">
    @foreach($users as $user)
        <x-spire::select.option value="{{ $user->id }}" label="{{ $user->name }}">
            <div class="flex items-center gap-2">
                <img src="{{ $user->avatar }}" class="w-6 h-6 rounded-full" />
                <div>
                    <div class="font-medium">{{ $user->name }}</div>
                    <div class="text-xs text-text-muted">{{ $user->email }}</div>
                </div>
            </div>
        </x-spire::select.option>
    @endforeach
</x-spire::select>
```

### Inside a Form Field

```blade
<x-spire::field label="Category" for="product-category" required>
    <x-spire::select wire:model="form.category" searchable>
        <x-spire::select.option value="">Select a category</x-spire::select.option>
        @foreach($categories as $category)
            <x-spire::select.option value="{{ $category->id }}">
                {{ $category->name }}
            </x-spire::select.option>
        @endforeach
    </x-spire::select>
</x-spire::field>
```

### With Event Handling

```blade
<x-spire::select
    wire:model="selectedValue"
    @spire-select-changed="handleChange($event.detail)"
>
    <x-spire::select.option value="option1">Option 1</x-spire::select.option>
    <x-spire::select.option value="option2">Option 2</x-spire::select.option>
</x-spire::select>
```

```javascript
function handleChange(detail) {
    console.log('Selected:', detail.value);
    console.log('Previous:', detail.previousValue);
    console.log('Label:', detail.label);
}
```

### Disabled Select

```blade
<x-spire::select wire:model="status" :disabled="true">
    <x-spire::select.option value="active">Active</x-spire::select.option>
    <x-spire::select.option value="inactive">Inactive</x-spire::select.option>
</x-spire::select>
```

---

## Multiple Select Features

When `multiple` is enabled, the select component provides additional functionality:

### Tags Display
Selected items appear as removable tags in the trigger button. Click the × on any tag to remove it from selection.

### Select All / Clear All
Action buttons appear in the dropdown header to select or clear all options at once.

### Selection Counter
Shows "X / Y selected" in the dropdown header and "X items selected" in the trigger when many items are selected.

### Max Limit
When `max` is set, options become disabled once the limit is reached. A message appears: "Maximum X selections reached".

### Persistent Dropdown
The dropdown stays open after selecting an option, allowing multiple selections without reopening.

---

## Keyboard Navigation

The component supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `Enter` | Open dropdown / Select highlighted option |
| `Space` | Open dropdown / Select highlighted option |
| `Escape` | Close dropdown |
| `ArrowDown` | Move highlight to next option |
| `ArrowUp` | Move highlight to previous option |
| `Home` | Jump to first option |
| `End` | Jump to last option |

When `searchable` is enabled, typing will filter the options in real-time.

---

## Events

### spire-select-changed

Dispatched when the selection changes.

**Payload for single select:**
```javascript
{
    id: 'select-id',
    name: 'form.category',
    value: 'electronics',
    previousValue: 'clothing',
    label: 'Electronics',
    timestamp: 1699999999999
}
```

**Payload for multiple select:**
```javascript
{
    id: 'select-id',
    name: 'form.tags',
    value: ['php', 'laravel', 'alpine'],
    previousValue: ['php', 'laravel'],
    action: 'added',  // or 'removed'
    timestamp: 1699999999999
}
```

### spire-select-cleared

Dispatched when the selection is cleared.

```javascript
{
    id: 'select-id',
    name: 'form.category',
    value: '',        // or [] for multiple
    previousValue: 'electronics',
    timestamp: 1699999999999
}
```

### Listening to Events

```javascript
// Via Alpine
<div x-data @spire-select-changed.window="handleChange($event.detail)">

// Via vanilla JavaScript
window.addEventListener('spire-select-changed', (event) => {
    console.log('Selected:', event.detail.value);
});
```

---

## Best Practices

### Do

- Use `searchable` for lists with more than 7-10 options
- Provide a meaningful `placeholder` that describes what to select
- Use `label` prop for custom option content to ensure proper display in the trigger
- Use `wire:model.live` when you need real-time updates
- Set a reasonable `max` limit for multiple select to prevent overwhelming selections
- Include an empty option ("Select a category") for optional fields

### Don't

- Don't use multiple select for exclusive choices (use radio buttons or single select)
- Don't forget `wire:key` when rendering options in a loop that can change
- Don't use extremely long option text - keep it scannable
- Don't set `max` too low - allow users flexibility in their selections
- Don't disable all options - always provide at least one selectable option

---

## Accessibility

The component implements proper ARIA attributes:

- Trigger has `role="combobox"` with `aria-haspopup="listbox"`
- Dropdown has `role="listbox"` with options having `role="option"`
- `aria-expanded` indicates dropdown state
- `aria-selected` marks selected options
- `aria-disabled` marks disabled options
- `aria-multiselectable` when multiple mode is enabled
- `aria-activedescendant` tracks keyboard focus for screen readers
- Proper focus management when opening/closing dropdown

---

## Technical Notes

### Livewire Integration

The select component integrates seamlessly with Livewire through `wire:model`:

```blade
{{-- Basic binding --}}
<x-spire::select wire:model="selectedValue">

{{-- Live updates --}}
<x-spire::select wire:model.live="selectedValue">

{{-- Debounced updates --}}
<x-spire::select wire:model.live.debounce.300ms="selectedValue">
```

For multiple select, bind to an array property:

```php
// In your Livewire component
public array $selectedTags = [];
```

```blade
<x-spire::select wire:model="selectedTags" multiple>
```

### Translations

The select component supports these translation keys under `spire-ui::spire-ui.select`:

- `placeholder` - "Select an option"
- `no_options` - "No options available"
- `search_placeholder` - "Search options..."
- `no_results` - "No results found"
- `items_selected` - ":count items selected"
- `more_items` - "+ :count more"
- `select_all` - "Select All"
- `clear_all` - "Clear All"
- `selected` - "selected"
- `max_reached` - "Maximum :max selections reached"
