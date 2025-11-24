# Dropdown Component

Accessible dropdown menu built on the native Popover API with keyboard navigation using the roving-tabindex pattern. Supports icons, shortcuts, submenus, and multiple trigger modes.

## Props

### Dropdown (Main)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | string | `'bottom-start'` | Position relative to trigger |
| `trigger` | string | `'click'` | How to open: `click`, `hover`, `both` |

### Dropdown.content

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `width` | string | `'md'` | Menu width: `sm`, `md`, `lg`, `xl`, `auto` |

### Dropdown.item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | `null` | Icon name to display |
| `shortcut` | string | `null` | Keyboard shortcut text (e.g., "Cmd+K") |
| `disabled` | boolean | `false` | Disables the item |
| `href` | string | `null` | Makes item a link |
| `destructive` | boolean | `false` | Applies danger styling (red) |

### Dropdown.label

No props. Used for group headers.

### Dropdown.separator

No props. Horizontal divider line.

### Dropdown.submenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `''` | Text label for submenu trigger |
| `icon` | string | `null` | Icon for the trigger |
| `disabled` | boolean | `false` | Disables the submenu |
| `placement` | string | `'right-start'` | Position of submenu panel |

---

## Slots

### Dropdown (Main)

| Slot | Description |
|------|-------------|
| Default | Trigger and content components |

### Dropdown.trigger

| Slot | Description |
|------|-------------|
| Default | Trigger element (usually a button) |

### Dropdown.content

| Slot | Description |
|------|-------------|
| Default | Menu items, labels, separators |

### Dropdown.item

| Slot | Description |
|------|-------------|
| Default | Item label text |

### Dropdown.label

| Slot | Description |
|------|-------------|
| Default | Label text |

### Dropdown.submenu

| Slot | Description |
|------|-------------|
| Default | Submenu items |

---

## Examples

### Basic Dropdown

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button variant="bordered">
            Options
            <x-spire::icon name="chevron-down" class="w-4 h-4" />
        </x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item>Profile</x-spire::dropdown.item>
        <x-spire::dropdown.item>Settings</x-spire::dropdown.item>
        <x-spire::dropdown.item>Logout</x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Icons and Shortcuts

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button>File</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item icon="file-plus" shortcut="Cmd+N">
            New
        </x-spire::dropdown.item>
        <x-spire::dropdown.item icon="folder-open" shortcut="Cmd+O">
            Open
        </x-spire::dropdown.item>
        <x-spire::dropdown.separator />
        <x-spire::dropdown.item icon="save" shortcut="Cmd+S">
            Save
        </x-spire::dropdown.item>
        <x-spire::dropdown.item icon="save" shortcut="Cmd+Shift+S">
            Save As...
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Labels and Groups

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button>Account</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.label>Account</x-spire::dropdown.label>
        <x-spire::dropdown.item icon="user">Profile</x-spire::dropdown.item>
        <x-spire::dropdown.item icon="credit-card">Billing</x-spire::dropdown.item>

        <x-spire::dropdown.separator />

        <x-spire::dropdown.label>Support</x-spire::dropdown.label>
        <x-spire::dropdown.item icon="help-circle">Help Center</x-spire::dropdown.item>
        <x-spire::dropdown.item icon="message-circle">Contact Us</x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Destructive Action

```blade
<x-spire::dropdown placement="bottom-end">
    <x-spire::dropdown.trigger>
        <x-spire::button icon-only variant="ghost" aria-label="More options">
            <x-spire::icon name="dots-vertical" />
        </x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item wire:click="edit({{ $id }})">
            Edit
        </x-spire::dropdown.item>
        <x-spire::dropdown.item wire:click="duplicate({{ $id }})">
            Duplicate
        </x-spire::dropdown.item>
        <x-spire::dropdown.separator />
        <x-spire::dropdown.item
            destructive
            wire:click="delete({{ $id }})"
            wire:confirm="Are you sure you want to delete this item?"
        >
            Delete
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Links

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button>Navigate</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item href="/dashboard">Dashboard</x-spire::dropdown.item>
        <x-spire::dropdown.item href="/settings">Settings</x-spire::dropdown.item>
        <x-spire::dropdown.separator />
        <x-spire::dropdown.item href="https://docs.example.com" target="_blank">
            Documentation
            <x-spire::icon name="external-link" class="w-3 h-3" />
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Disabled Items

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button>Actions</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item>Enable Feature</x-spire::dropdown.item>
        <x-spire::dropdown.item :disabled="true">
            Premium Only
        </x-spire::dropdown.item>
        <x-spire::dropdown.item :disabled="!$canExport">
            Export Data
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### With Submenu

```blade
<x-spire::dropdown>
    <x-spire::dropdown.trigger>
        <x-spire::button>Edit</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item shortcut="Cmd+Z">Undo</x-spire::dropdown.item>
        <x-spire::dropdown.item shortcut="Cmd+Shift+Z">Redo</x-spire::dropdown.item>

        <x-spire::dropdown.separator />

        <x-spire::dropdown.submenu label="Transform">
            <x-spire::dropdown.item>Rotate</x-spire::dropdown.item>
            <x-spire::dropdown.item>Scale</x-spire::dropdown.item>
            <x-spire::dropdown.item>Skew</x-spire::dropdown.item>
        </x-spire::dropdown.submenu>

        <x-spire::dropdown.submenu label="Align">
            <x-spire::dropdown.item>Left</x-spire::dropdown.item>
            <x-spire::dropdown.item>Center</x-spire::dropdown.item>
            <x-spire::dropdown.item>Right</x-spire::dropdown.item>
        </x-spire::dropdown.submenu>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### Actions Menu (Table Row Pattern)

Common pattern for table row actions:

```blade
<x-spire::dropdown placement="bottom-end">
    <x-spire::dropdown.trigger>
        <x-spire::button icon-only size="sm" variant="ghost" aria-label="Row actions">
            <x-spire::icon name="dots-vertical" />
        </x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content width="sm">
        <x-spire::dropdown.item wire:click="view({{ $item->id }})">
            <x-spire::icon name="eye" class="w-4 h-4" />
            View
        </x-spire::dropdown.item>
        <x-spire::dropdown.item wire:click="edit({{ $item->id }})">
            <x-spire::icon name="edit" class="w-4 h-4" />
            Edit
        </x-spire::dropdown.item>
        <x-spire::dropdown.separator />
        <x-spire::dropdown.item
            destructive
            wire:click="delete({{ $item->id }})"
            wire:confirm="Delete this item?"
        >
            <x-spire::icon name="trash" class="w-4 h-4" />
            Delete
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### Hover Trigger

```blade
<x-spire::dropdown trigger="hover">
    <x-spire::dropdown.trigger>
        <x-spire::button>Hover Me</x-spire::button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content>
        <x-spire::dropdown.item>Option 1</x-spire::dropdown.item>
        <x-spire::dropdown.item>Option 2</x-spire::dropdown.item>
        <x-spire::dropdown.item>Option 3</x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

### Different Placements

```blade
{{-- Top placement --}}
<x-spire::dropdown placement="top-start">
    ...
</x-spire::dropdown>

{{-- Right placement --}}
<x-spire::dropdown placement="right">
    ...
</x-spire::dropdown>

{{-- Bottom end (right-aligned) --}}
<x-spire::dropdown placement="bottom-end">
    ...
</x-spire::dropdown>
```

### User Menu Example

```blade
<x-spire::dropdown placement="bottom-end">
    <x-spire::dropdown.trigger>
        <button class="flex items-center gap-2">
            <x-spire::avatar :src="$user->avatar" :name="$user->name" size="sm" />
            <span>{{ $user->name }}</span>
            <x-spire::icon name="chevron-down" class="w-4 h-4" />
        </button>
    </x-spire::dropdown.trigger>

    <x-spire::dropdown.content width="lg">
        <div class="px-3 py-2 border-b border-border">
            <div class="font-medium">{{ $user->name }}</div>
            <div class="text-sm text-muted">{{ $user->email }}</div>
        </div>

        <x-spire::dropdown.item href="/profile" icon="user">
            Profile
        </x-spire::dropdown.item>
        <x-spire::dropdown.item href="/settings" icon="settings">
            Settings
        </x-spire::dropdown.item>

        <x-spire::dropdown.separator />

        <x-spire::dropdown.item href="/logout" icon="log-out">
            Sign Out
        </x-spire::dropdown.item>
    </x-spire::dropdown.content>
</x-spire::dropdown>
```

---

## Keyboard Navigation

The dropdown supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `Enter` | Open dropdown / Select highlighted item |
| `Space` | Open dropdown / Select highlighted item |
| `Escape` | Close dropdown |
| `ArrowDown` | Move to next item |
| `ArrowUp` | Move to previous item |
| `Home` | Jump to first item |
| `End` | Jump to last item |

Navigation wraps around from last to first item and vice versa.

---

## Trigger Modes

### Click (Default)

Opens on click, closes on click outside or item selection:

```blade
<x-spire::dropdown trigger="click">
```

### Hover

Opens on mouse enter, closes on mouse leave (with 300ms delay):

```blade
<x-spire::dropdown trigger="hover">
```

### Both

Responds to both click and hover:

```blade
<x-spire::dropdown trigger="both">
```

---

## Best Practices

### Do

- Use `placement="bottom-end"` for right-aligned triggers (e.g., table row actions)
- Include icons for common actions to improve scannability
- Use `destructive` prop for dangerous actions like delete
- Add `wire:confirm` for irreversible actions
- Group related items with labels and separators
- Use `shortcut` prop to show keyboard shortcuts
- Provide `aria-label` on icon-only trigger buttons

### Don't

- Don't nest too many levels of submenus (max 2 levels recommended)
- Don't put too many items in a single dropdown (consider using a modal instead)
- Don't use hover trigger for touch devices
- Don't forget to close the dropdown after Livewire actions (it closes automatically)
- Don't use dropdowns for form inputs (use select component instead)

---

## Accessibility

- Uses `role="menu"` and `role="menuitem"` for proper semantics
- Implements roving-tabindex pattern for keyboard navigation
- `aria-haspopup` and `aria-expanded` on trigger
- `aria-disabled` on disabled items
- `role="separator"` on dividers
- Focus management when opening/closing
- Escape key closes the dropdown

---

## Technical Notes

### Width Reference

| Width | Value |
|-------|-------|
| `sm` | 12rem (192px) |
| `md` | 14rem (224px) |
| `lg` | 16rem (256px) |
| `xl` | 20rem (320px) |
| `auto` | min-content |

### Placement Options

| Position | Variants |
|----------|----------|
| `top` | `top`, `top-start`, `top-end` |
| `bottom` | `bottom`, `bottom-start`, `bottom-end` |
| `left` | `left`, `left-start`, `left-end` |
| `right` | `right`, `right-start`, `right-end` |

### Livewire Integration

Dropdown items work seamlessly with Livewire directives:

```blade
<x-spire::dropdown.item wire:click="save">Save</x-spire::dropdown.item>
<x-spire::dropdown.item wire:click="delete" wire:confirm="Are you sure?">Delete</x-spire::dropdown.item>
```

The dropdown automatically closes after an item is clicked.
