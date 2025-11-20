# Breadcrumbs Component

A navigation component that shows the user's current location within a site hierarchy and provides links to parent pages.

---

## Props

### Breadcrumbs (Container)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the breadcrumbs |
| `separator` | `string` | `'chevron-right'` | Icon name for separator between items |
| `separatorText` | `string \| null` | `null` | Text separator (e.g., `/`). When set, overrides `separator` icon |
| `maxVisible` | `number \| null` | `null` | Maximum items to show before collapsing. First and last items always visible |

### Breadcrumbs.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string \| null` | `null` | URL for the breadcrumb link |
| `current` | `boolean` | `false` | Whether this is the current page |
| `icon` | `string \| null` | `null` | Leading icon name |
| `disabled` | `boolean` | `false` | Disabled state |
| `separator` | `string` | `'chevron-right'` | Override separator icon for this item |
| `separatorText` | `string \| null` | `null` | Override separator text for this item |
| `last` | `boolean` | `false` | Whether this is the last item (hides separator) |

---

## Slots

### Breadcrumbs

| Slot | Description |
|------|-------------|
| `default` | Breadcrumb items (`<x-spire::breadcrumbs.item>`) |

### Breadcrumbs.Item

| Slot | Description |
|------|-------------|
| `default` | The breadcrumb label text |

---

## Examples

### Basic Usage

```blade
<x-spire::breadcrumbs>
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/products">Products</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Product Name</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### With Icons

```blade
<x-spire::breadcrumbs>
    <x-spire::breadcrumbs.item href="/" icon="home">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/dashboard" icon="layout-dashboard">Dashboard</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/settings" icon="settings">Settings</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current icon="user">Profile</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### Size Variants

```blade
{{-- Small --}}
<x-spire::breadcrumbs size="sm">
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Page</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>

{{-- Medium (default) --}}
<x-spire::breadcrumbs size="md">
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Page</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>

{{-- Large --}}
<x-spire::breadcrumbs size="lg">
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Page</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### Text Separator

```blade
<x-spire::breadcrumbs separatorText="/">
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/products">Products</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Product Name</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### Custom Separator Icon

```blade
<x-spire::breadcrumbs separator="arrow-right">
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/products">Products</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Product Name</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### Collapsed Breadcrumbs

When you have many items, use `maxVisible` to collapse middle items into a dropdown:

```blade
<x-spire::breadcrumbs :maxVisible="3">
    <x-spire::breadcrumbs.item href="/" icon="home">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/category">Category</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/subcategory">Subcategory</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/sub-subcategory">Sub-subcategory</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Current Page</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

This will show: Home > ... > Sub-subcategory > Current Page

The collapsed items (Category, Subcategory) will be accessible via a dropdown menu.

### Disabled Items

```blade
<x-spire::breadcrumbs>
    <x-spire::breadcrumbs.item href="/">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/products" disabled>Products</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>Product Name</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

### With Livewire

```blade
<x-spire::breadcrumbs>
    <x-spire::breadcrumbs.item href="{{ route('home') }}">Home</x-spire::breadcrumbs.item>
    @foreach($breadcrumbs as $breadcrumb)
        <x-spire::breadcrumbs.item
            :href="$breadcrumb['url']"
            :current="$loop->last"
            :icon="$breadcrumb['icon'] ?? null"
        >
            {{ $breadcrumb['label'] }}
        </x-spire::breadcrumbs.item>
    @endforeach
</x-spire::breadcrumbs>
```

### E-commerce Example

```blade
<x-spire::breadcrumbs size="sm">
    <x-spire::breadcrumbs.item href="/" icon="home">Home</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/electronics">Electronics</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/electronics/phones">Phones</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item href="/electronics/phones/smartphones">Smartphones</x-spire::breadcrumbs.item>
    <x-spire::breadcrumbs.item current>iPhone 15 Pro</x-spire::breadcrumbs.item>
</x-spire::breadcrumbs>
```

---

## Accessibility

The breadcrumbs component follows WAI-ARIA best practices:

- Uses semantic `<nav>` element with `aria-label="Breadcrumb"`
- Uses ordered list `<ol>` for sequential navigation
- Current page is marked with `aria-current="page"`
- Separators are hidden from screen readers with `aria-hidden="true"`
- Disabled items have `aria-disabled="true"`
- Interactive elements are keyboard accessible with visible focus states

---

## Best Practices

### Do

- Always mark the current page with the `current` prop
- Use meaningful, concise labels for each breadcrumb
- Include a home/root link as the first item
- Use the `last` prop on the final item to hide its separator
- Consider using icons for the first (home) item to save space

### Don't

- Don't include the current page as a clickable link
- Don't make breadcrumb trails excessively long - use `maxVisible` for deep hierarchies
- Don't use breadcrumbs for non-hierarchical navigation
- Don't duplicate page titles exactly - use abbreviated versions if needed

---

## Customization

### CSS Classes

The component uses BEM-like naming with the `spire-` prefix:

- `.spire-breadcrumbs` - Container
- `.spire-breadcrumbs__list` - The ordered list
- `.spire-breadcrumbs__item` - Each list item
- `.spire-breadcrumbs__link` - Clickable links
- `.spire-breadcrumbs__text` - Non-clickable text (current/disabled)
- `.spire-breadcrumbs__separator` - Separator element
- `.spire-breadcrumbs__icon` - Leading icons
- `.spire-breadcrumbs--sm/md/lg` - Size modifiers
- `.spire-breadcrumbs-item--current` - Current page state
- `.spire-breadcrumbs-item--disabled` - Disabled state

### Example: Custom Styling

```css
/* Custom link colors */
.spire-breadcrumbs__link {
    @apply text-blue-600 hover:text-blue-800;
}

/* Custom separator color */
.spire-breadcrumbs__separator {
    @apply text-gray-400;
}

/* Larger icons */
.spire-breadcrumbs--lg .spire-breadcrumbs__icon {
    @apply w-6 h-6;
}
```
