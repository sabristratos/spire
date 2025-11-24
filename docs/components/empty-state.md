# Empty State

A component for displaying empty or no-data states with customizable icons, messaging, and actions.

## Overview

The Empty State component helps communicate to users when there's no data to display, encouraging them to take action or providing helpful context. It supports custom icons, illustrations, loading states, and action buttons.

## Basic Usage

```blade
<x-spire::empty-state
    title="No results found"
    description="Try adjusting your search or filters to find what you're looking for"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string\|null | Translated default | Main heading text |
| `description` | string\|null | Translated default | Descriptive text below title |
| `icon` | string\|null | `'inbox'` | Icon name or null to hide default |
| `iconSize` | string | `'lg'` | Icon size: `sm`, `md`, `lg`, `xl` |
| `color` | string | `'default'` | Color variant |
| `variant` | string | `'default'` | Style variant |
| `radius` | string | `'lg'` | Border radius |
| `hideIcon` | boolean | `false` | Completely hide icon/illustration section |
| `loading` | boolean | `false` | Show loading skeleton state |

## Examples

### With Custom Icon

```blade
<x-spire::empty-state
    icon="search"
    title="No search results"
    description="We couldn't find any items matching your search"
/>
```

### With Large Icon

```blade
<x-spire::empty-state
    icon="users"
    iconSize="xl"
    title="No team members yet"
    description="Invite your first team member to get started"
/>
```

### With Action Buttons

```blade
<x-spire::empty-state
    icon="file-plus"
    title="No documents"
    description="You haven't created any documents yet"
>
    <x-slot:actions>
        <x-spire::button color="primary">
            Create Document
        </x-spire::button>
        <x-spire::button variant="outline">
            Import Documents
        </x-spire::button>
    </x-slot:actions>
</x-spire::empty-state>
```

### With Custom Illustration

```blade
<x-spire::empty-state
    title="No notifications"
    description="You're all caught up!"
>
    <x-slot:illustration>
        <svg class="w-32 h-32">
            <!-- Custom SVG illustration -->
        </svg>
    </x-slot:illustration>
</x-spire::empty-state>
```

### Loading State

```blade
<x-spire::empty-state loading />
```

### Without Icon

```blade
<x-spire::empty-state
    hideIcon
    title="Coming Soon"
    description="This feature will be available in the next release"
/>
```

### With Custom Title and Description Slots

```blade
<x-spire::empty-state icon="inbox">
    <x-slot:titleSlot>
        <span class="text-2xl font-bold">No Messages</span>
    </x-slot:titleSlot>

    <x-slot:descriptionSlot>
        <p class="text-muted">
            Your inbox is empty. When you receive messages,
            <span class="font-semibold">they'll appear here</span>.
        </p>
    </x-slot:descriptionSlot>

    <x-slot:actions>
        <x-spire::button>Compose Message</x-spire::button>
    </x-slot:actions>
</x-spire::empty-state>
```

### Complete Custom Content

```blade
<x-spire::empty-state icon="shopping-cart" iconSize="xl">
    <div class="space-y-4 text-center">
        <h3 class="text-xl font-bold">Your cart is empty</h3>
        <p class="text-muted max-w-md">
            Looks like you haven't added any items to your cart yet.
            Start shopping to fill it up!
        </p>
        <div class="flex gap-3 justify-center">
            <x-spire::button color="primary">
                Browse Products
            </x-spire::button>
            <x-spire::button variant="outline">
                View Wishlist
            </x-spire::button>
        </div>
    </div>
</x-spire::empty-state>
```

### Different Variants

```blade
<!-- Subtle variant -->
<x-spire::empty-state
    variant="subtle"
    icon="folder"
    title="No files"
    description="This folder is empty"
/>

<!-- Bordered variant -->
<x-spire::empty-state
    variant="bordered"
    icon="calendar"
    title="No events scheduled"
    description="Create your first event to get started"
/>
```

### Common Use Cases

**No Search Results:**
```blade
<x-spire::empty-state
    icon="search"
    iconSize="lg"
    title="No results found"
    description='No results for "{{ $query }}". Try different keywords or check your spelling.'
>
    <x-slot:actions>
        <x-spire::button variant="outline" wire:click="clearSearch">
            Clear Search
        </x-spire::button>
    </x-slot:actions>
</x-spire::empty-state>
```

**Empty Table:**
```blade
<x-spire::empty-state
    icon="table"
    title="No data available"
    description="There are no records to display at this time"
>
    <x-slot:actions>
        <x-spire::button wire:click="$refresh">
            Refresh
        </x-spire::button>
    </x-slot:actions>
</x-spire::empty-state>
```

**404 Not Found:**
```blade
<x-spire::empty-state
    icon="alert-triangle"
    iconSize="xl"
    title="404 - Page Not Found"
    description="The page you're looking for doesn't exist or has been moved"
>
    <x-slot:actions>
        <x-spire::button color="primary" href="/">
            Go to Homepage
        </x-spire::button>
    </x-slot:actions>
</x-spire::empty-state>
```

## Slots

| Slot | Description |
|------|-------------|
| `illustration` | Custom illustration/image to replace icon |
| `titleSlot` | Custom title content (overrides `title` prop) |
| `descriptionSlot` | Custom description content (overrides `description` prop) |
| `actions` | Action buttons or links |
| Default slot | Complete custom content (when no title/description slots) |

## Accessibility

- ✅ **Semantic HTML**: Uses proper heading hierarchy and paragraph elements
- ✅ **ARIA Attributes**: Includes `role="status"` and `aria-live="polite"`
- ✅ **Loading States**: Provides visual loading skeletons with proper animations
- ✅ **Screen Reader Friendly**: All content is accessible to screen readers
- ✅ **Keyboard Navigation**: Action buttons are fully keyboard accessible

## Styling

The component uses these CSS classes:

- `.spire-empty-state` - Main container
- `.spire-empty-state__icon` - Icon/illustration wrapper
- `.spire-empty-state__illustration` - Custom illustration container
- `.spire-empty-state__content` - Text content wrapper
- `.spire-empty-state__title` - Title text
- `.spire-empty-state__description` - Description text
- `.spire-empty-state__actions` - Actions button container
- `.spire-empty-state__loading` - Loading state wrapper
- `.spire-empty-state__loading-icon` - Loading icon skeleton
- `.spire-empty-state__loading-text` - Loading text skeleton

## Notes

- Default icon is `inbox` if no icon is specified
- Icon sizes map to specific Tailwind classes: `sm` (w-8 h-8), `md` (w-12 h-12), `lg` (w-16 h-16), `xl` (w-24 h-24)
- Loading state shows animated skeleton placeholders
- Use `titleSlot` and `descriptionSlot` for rich content with HTML
- Use default slot for complete custom layouts
- Works great in tables, search results, dashboards, and error pages
- Component includes proper ARIA live region for dynamic content updates

## Related Components

- [Spinner](spinner.md) - Loading indicator
- [Alert](alert.md) - Alert messages
- [Card](card.md) - Content container
