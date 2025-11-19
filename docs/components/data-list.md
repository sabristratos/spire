# DataList

Displays metadata as a list of key-value pairs using semantic HTML.

## Basic Usage

```blade
<x-spire::data-list>
    <x-spire::data-list.item>
        <x-spire::data-list.label>Status</x-spire::data-list.label>
        <x-spire::data-list.value>Active</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label>ID</x-spire::data-list.label>
        <x-spire::data-list.value>usr_12345</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label>Email</x-spire::data-list.label>
        <x-spire::data-list.value>user@example.com</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

## Component Parts

### Root

Container for all data list content. Uses semantic `<dl>` element.

```blade
<x-spire::data-list orientation="horizontal" size="md">
    <!-- Items -->
</x-spire::data-list>
```

**Props:**
- `orientation` - Layout direction: `horizontal` (default) | `vertical`
- `size` - Text and spacing size: `sm` | `md` (default) | `lg`

### Item

Wraps each key-value pair.

```blade
<x-spire::data-list.item align="baseline">
    <!-- Label and Value -->
</x-spire::data-list.item>
```

**Props:**
- `align` - Vertical alignment: `start` | `center` | `end` | `baseline` (default)

### Label

The key/label using semantic `<dt>` element.

```blade
<x-spire::data-list.label
    color="muted"
    width="120px"
>
    Label Text
</x-spire::data-list.label>
```

**Props:**
- `color` - Text color: `default` | `muted` (default) | `primary` | `secondary` | `success` | `error` | `warning` | `info`
- `width` - Fixed width (e.g., `120px`, `8rem`)
- `minWidth` - Minimum width
- `maxWidth` - Maximum width

### Value

The value using semantic `<dd>` element.

```blade
<x-spire::data-list.value>
    Value content
</x-spire::data-list.value>
```

## Examples

### Vertical Orientation

Stack labels above values for compact layouts.

```blade
<x-spire::data-list orientation="vertical">
    <x-spire::data-list.item>
        <x-spire::data-list.label>Name</x-spire::data-list.label>
        <x-spire::data-list.value>John Doe</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label>Role</x-spire::data-list.label>
        <x-spire::data-list.value>Administrator</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

### With Fixed Label Width

Align values by setting a consistent label width.

```blade
<x-spire::data-list>
    <x-spire::data-list.item>
        <x-spire::data-list.label width="120px">Full Name</x-spire::data-list.label>
        <x-spire::data-list.value>Jane Smith</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label width="120px">Email</x-spire::data-list.label>
        <x-spire::data-list.value>jane@example.com</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label width="120px">Phone</x-spire::data-list.label>
        <x-spire::data-list.value>+1 234 567 890</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

### Colored Labels

Use semantic colors for different types of information.

```blade
<x-spire::data-list>
    <x-spire::data-list.item>
        <x-spire::data-list.label color="success">Status</x-spire::data-list.label>
        <x-spire::data-list.value>Active</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label color="error">Errors</x-spire::data-list.label>
        <x-spire::data-list.value>3 issues found</x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label color="warning">Warning</x-spire::data-list.label>
        <x-spire::data-list.value>Password expires soon</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

### Different Sizes

```blade
{{-- Small --}}
<x-spire::data-list size="sm">
    <x-spire::data-list.item>
        <x-spire::data-list.label>Small</x-spire::data-list.label>
        <x-spire::data-list.value>Compact text</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>

{{-- Medium (default) --}}
<x-spire::data-list size="md">
    <x-spire::data-list.item>
        <x-spire::data-list.label>Medium</x-spire::data-list.label>
        <x-spire::data-list.value>Standard text</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>

{{-- Large --}}
<x-spire::data-list size="lg">
    <x-spire::data-list.item>
        <x-spire::data-list.label>Large</x-spire::data-list.label>
        <x-spire::data-list.value>Larger text</x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

### Rich Content in Values

Values can contain any content, including other components.

```blade
<x-spire::data-list>
    <x-spire::data-list.item>
        <x-spire::data-list.label width="100px">Status</x-spire::data-list.label>
        <x-spire::data-list.value>
            <x-spire::badge color="success">Active</x-spire::badge>
        </x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item>
        <x-spire::data-list.label width="100px">Avatar</x-spire::data-list.label>
        <x-spire::data-list.value>
            <x-spire::avatar src="/path/to/image.jpg" size="sm" />
        </x-spire::data-list.value>
    </x-spire::data-list.item>
    <x-spire::data-list.item align="start">
        <x-spire::data-list.label width="100px">Actions</x-spire::data-list.label>
        <x-spire::data-list.value>
            <div class="flex gap-2">
                <x-spire::button size="sm">Edit</x-spire::button>
                <x-spire::button size="sm" variant="outline">Delete</x-spire::button>
            </div>
        </x-spire::data-list.value>
    </x-spire::data-list.item>
</x-spire::data-list>
```

## Accessibility

The DataList component uses semantic HTML elements:
- `<dl>` - Description list container
- `<dt>` - Description term (label)
- `<dd>` - Description details (value)

This provides proper accessibility support for screen readers without additional ARIA attributes.
