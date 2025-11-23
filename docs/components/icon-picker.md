# Icon Picker Component

A searchable icon picker component that displays a curated selection of Lucide icons in a dropdown grid. Returns the icon name as a string.

## Overview

The Icon Picker component provides an intuitive way to select icons with:

- **Curated icon set** - ~125 commonly used Lucide icons
- **Search filtering** - Quick search to find icons by name
- **Grid display** - Visual grid layout for easy browsing
- **Keyboard navigation** - Full arrow key and selection support
- **Clearable** - Optional clear button

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | `'Select an icon'` | Placeholder text when no icon selected |
| `searchPlaceholder` | string | `'Search icons...'` | Search input placeholder |
| `placement` | string | `'bottom-start'` | Popover placement position |
| `disabled` | boolean | `false` | Disables the icon picker |
| `clearable` | boolean | `false` | Shows clear button when icon is selected |
| `size` | string | `'md'` | Input size: `sm`, `md`, `lg` |
| `variant` | string | `'bordered'` | Input variant: `bordered`, `flat`, `underlined` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |

---

## Value Format

The icon picker returns the icon name as a string:

```php
public string $selectedIcon = '';  // '' when empty, 'home' when selected
```

---

## Examples

### Basic Usage

```blade
<x-spire::icon-picker wire:model="selectedIcon" />
```

### With Placeholder

```blade
<x-spire::icon-picker
    wire:model="selectedIcon"
    placeholder="Choose an icon"
/>
```

### Clearable

```blade
<x-spire::icon-picker
    wire:model="selectedIcon"
    clearable
/>
```

### With Live Updates

```blade
<x-spire::icon-picker
    wire:model.live="selectedIcon"
    clearable
/>

@if($selectedIcon)
    <div class="mt-4 flex items-center gap-2">
        <x-spire::icon :name="$selectedIcon" class="w-6 h-6" />
        <span>{{ $selectedIcon }}</span>
    </div>
@endif
```

### Inside a Form Field

```blade
<x-spire::field label="Menu Icon" for="menuIcon" helper="Select an icon for your menu item.">
    <x-spire::icon-picker
        id="menuIcon"
        wire:model="form.icon"
        clearable
    />
</x-spire::field>
```

### Disabled State

```blade
<x-spire::icon-picker
    wire:model="selectedIcon"
    :disabled="true"
/>
```

### Different Sizes

```blade
<x-spire::icon-picker wire:model="icon1" size="sm" />
<x-spire::icon-picker wire:model="icon2" size="md" />
<x-spire::icon-picker wire:model="icon3" size="lg" />
```

### Livewire Integration

```php
class IconSelector extends Component
{
    public string $selectedIcon = '';

    public function mount()
    {
        $this->selectedIcon = 'home';
    }

    public function updatedSelectedIcon($value)
    {
        // React to icon changes
        $this->dispatch('icon-changed', icon: $value);
    }
}
```

```blade
<x-spire::icon-picker wire:model.live="selectedIcon" clearable />

@if($selectedIcon)
    <div class="flex items-center gap-3 p-4 bg-surface-alt rounded-lg">
        <x-spire::icon :name="$selectedIcon" class="w-8 h-8 text-primary" />
        <div>
            <div class="font-medium">Selected Icon</div>
            <code class="text-sm text-text-muted">{{ $selectedIcon }}</code>
        </div>
    </div>
@endif
```

### Event Handling

```blade
<div
    x-data
    @spire-select-changed="console.log('Icon changed:', $event.detail)"
    @spire-select-cleared="console.log('Icon cleared:', $event.detail)"
>
    <x-spire::icon-picker wire:model="selectedIcon" clearable />
</div>
```

---

## Available Icons

The icon picker includes ~125 curated Lucide icons covering common use cases:

**Navigation & UI:**
`arrow-down`, `arrow-left`, `arrow-right`, `arrow-up`, `chevron-down`, `chevron-left`, `chevron-right`, `chevron-up`, `menu`, `more-horizontal`, `more-vertical`, `x`

**Actions:**
`check`, `check-circle`, `plus`, `plus-circle`, `minus`, `edit`, `trash`, `trash-2`, `copy`, `download`, `upload`, `save`, `refresh-cw`, `repeat`, `undo`, `redo`

**Communication:**
`mail`, `message-circle`, `message-square`, `send`, `phone`, `at-sign`, `bell`

**Media:**
`image`, `camera`, `video`, `mic`, `music`, `play`, `pause`, `volume-2`

**Files & Data:**
`file`, `file-text`, `folder`, `clipboard`, `database`, `archive`, `package`

**Users & Social:**
`user`, `user-plus`, `users`, `heart`, `star`, `thumbs-up`, `thumbs-down`, `smile`

**Layout & Display:**
`grid`, `list`, `layers`, `layout`, `maximize`, `minimize`, `eye`, `eye-off`

**Objects:**
`home`, `settings`, `search`, `filter`, `calendar`, `clock`, `globe`, `map`, `map-pin`, `link`, `lock`, `unlock`, `key`, `shield`, `flag`, `tag`, `bookmark`, `award`, `gift`, `briefcase`, `credit-card`, `shopping-cart`, `shopping-bag`, `truck`

**Development:**
`code`, `terminal`, `activity`, `zap`, `target`, `sliders`, `bar-chart`, `pie-chart`, `trending-up`

**Status & Alerts:**
`info`, `alert-circle`, `alert-triangle`, `help-circle`, `x-circle`

**Weather & Nature:**
`sun`, `moon`, `cloud`

**Devices:**
`monitor`, `smartphone`, `printer`, `wifi`, `airplay`, `power`

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Current icon name value |
| `selectedIcon` | string | Currently selected icon |
| `searchQuery` | string | Current search filter |
| `filteredIcons` | array | Icons matching search query |
| `highlightedIndex` | number | Currently highlighted icon index |

### Key Methods

| Method | Description |
|--------|-------------|
| `selectIcon(name)` | Select an icon by name |
| `clearSelection()` | Clear the selected icon |
| `getIconHtml(name)` | Get SVG HTML for an icon |

### Events

#### spire-select-changed

Dispatched when an icon is selected:

```javascript
{
    id: 'icon-picker-id',
    name: 'form.icon',
    value: 'home',
    previousValue: 'settings',
    metadata: { icon: 'home' },
    timestamp: 1699999999999
}
```

#### spire-select-cleared

Dispatched when the icon is cleared:

```javascript
{
    id: 'icon-picker-id',
    name: 'form.icon',
    value: '',
    previousValue: 'home',
    timestamp: 1699999999999
}
```

---

## Accessibility

### ARIA Support

- `role="combobox"` on trigger
- `aria-haspopup="listbox"` indicates dropdown
- `aria-expanded` state tracking
- `aria-controls` linking to content
- `role="listbox"` on icon grid
- `role="option"` on each icon button
- `aria-selected` on selected icon
- `aria-activedescendant` for keyboard navigation
- Live region announces available results

### Keyboard Navigation

- **Enter/Space** - Open picker, select highlighted icon
- **Escape** - Close picker, clear search
- **Arrow Down** - Highlight next icon
- **Arrow Up** - Highlight previous icon
- **Home** - Jump to first icon
- **End** - Jump to last icon
- **Type** - Filter icons by search

---

## Best Practices

### Do

- Use `clearable` for optional icon fields
- Use `wire:model.live` when showing real-time previews
- Display the selected icon visually alongside its name
- Use appropriate size for your form layout

### Don't

- Don't use for selecting from a fixed set of icons (use radio buttons)
- Don't forget to handle empty state (`''`) in your backend
- Don't forget to render the icon using `<x-spire::icon :name="$value" />`

---

## Technical Notes

### Icon Rendering

Icons are pre-rendered on the server and cached on the client for performance. The component uses the existing Spire UI icon system under the hood.

### Using Selected Icons

Display selected icons using the icon component:

```blade
@if($selectedIcon)
    <x-spire::icon :name="$selectedIcon" class="w-5 h-5" />
@endif
```

### Translations

Key translations under `spire-ui::spire-ui.icon-picker`:

- `placeholder` - "Select an icon"
- `search_placeholder` - "Search icons..."
- `no_results` - "No icons found"
- `clear` - "Clear selection"
- `aria_label` - "Icon picker"
- `results_available` - "icons available"
