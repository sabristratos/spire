# Spinner Component

Loading spinner component with multiple variants (ring, dots, nested-rings) size options, and color themes. Essential for indicating loading states in buttons, cards, page sections, and overlays. Fully accessible with ARIA attributes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'ring'` | Visual variant: `ring`, `dots`, `nested-rings` |
| `size` | string | `null` | Fixed size: `sm`, `md`, `lg` (defaults to adaptive/100% container size) |
| `color` | string | `'primary'` | Color theme: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `featured` |
| `label` | string | `null` | Accessible label for screen readers (defaults to "Loading...") |

---

## Examples

### Basic Spinner

Default ring spinner that adapts to container size:

```blade
<x-spire::spinner />
```

### With Fixed Size

Specify explicit dimensions:

```blade
{{-- Small (16px) --}}
<x-spire::spinner size="sm" />

{{-- Medium (20px) --}}
<x-spire::spinner size="md" />

{{-- Large (64px) --}}
<x-spire::spinner size="lg" />
```

### Adaptive Sizing

Spinner automatically fills its container when no size is specified:

```blade
{{-- Fills a 32px container --}}
<div class="w-8 h-8">
    <x-spire::spinner />
</div>

{{-- Fills a 200px container --}}
<div class="w-50 h-50">
    <x-spire::spinner />
</div>
```

### Variants

Choose between different animation styles:

```blade
{{-- Ring (default) - Spinning circular border --}}
<x-spire::spinner variant="ring" />

{{-- Dots - Three bouncing dots --}}
<x-spire::spinner variant="dots" />

{{-- Nested Rings - Two concentric spinning rings --}}
<x-spire::spinner variant="nested-rings" />
```

### Color Themes

Match spinner color to context:

```blade
{{-- Primary (default) --}}
<x-spire::spinner color="primary" />

{{-- Secondary --}}
<x-spire::spinner color="secondary" />

{{-- Success --}}
<x-spire::spinner color="success" />

{{-- Error --}}
<x-spire::spinner color="error" />

{{-- Warning --}}
<x-spire::spinner color="warning" />

{{-- Info --}}
<x-spire::spinner color="info" />
```

### In Buttons

Show loading state in buttons:

```blade
<x-spire::button wire:click="save" :disabled="$loading">
    @if($loading)
        <x-slot:leading>
            <x-spire::spinner size="sm" class="text-current" />
        </x-slot:leading>
        Saving...
    @else
        Save Changes
    @endif
</x-spire::button>
```

### Icon Button Loading

Replace icon with spinner during loading:

```blade
<x-spire::button icon-only :disabled="$syncing">
    @if($syncing)
        <x-spire::spinner size="sm" />
    @else
        <x-spire::icon name="refresh-cw" />
    @endif
</x-spire::button>
```

### Card Loading State

Show loading overlay on cards:

```blade
<x-spire::card class="relative">
    @if($loading)
        <div class="absolute inset-0 flex items-center justify-center bg-surface/80 backdrop-blur-sm z-10">
            <x-spire::spinner size="lg" />
        </div>
    @endif

    <x-spire::card.header>
        <x-spire::card.title>Card Content</x-spire::card.title>
    </x-spire::card.header>

    <x-spire::card.body>
        {{-- Card content --}}
    </x-spire::card.body>
</x-spire::card>
```

### Page Loading Overlay

Full-page loading indicator:

```blade
@if($pageLoading)
    <div class="fixed inset-0 flex items-center justify-center bg-body/50 backdrop-blur-sm z-50">
        <div class="text-center">
            <x-spire::spinner size="lg" />
            <p class="mt-4 text-text-muted">Loading page content...</p>
        </div>
    </div>
@endif
```

### Inline with Text

Show spinner alongside loading messages:

```blade
<div class="flex items-center gap-2">
    <x-spire::spinner size="sm" />
    <span class="text-text-muted">Processing your request...</span>
</div>
```

### Table Loading Row

Indicate loading state in tables:

```blade
<table class="w-full">
    <thead>
        <tr>
            <th>Name</th>
            <th>Status</th>
        </tr>
    </thead>
    <tbody>
        @if($loading)
            <tr>
                <td colspan="2" class="text-center py-8">
                    <x-spire::spinner size="md" />
                    <p class="mt-2 text-text-muted">Loading data...</p>
                </td>
            </tr>
        @else
            @foreach($items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->status }}</td>
                </tr>
            @endforeach
        @endif
    </tbody>
</table>
```

### Modal Loading

Show spinner in modal while loading content:

```blade
<x-spire::modal wire:model="showModal">
    <x-spire::modal.header>
        <x-spire::modal.title>User Details</x-spire::modal.title>
    </x-spire::modal.header>

    <x-spire::modal.body>
        @if($loadingUser)
            <div class="flex items-center justify-center py-12">
                <x-spire::spinner size="lg" />
            </div>
        @else
            {{-- User details content --}}
        @endif
    </x-spire::modal.body>
</x-spire::modal>
```

### Empty State Loading

Show spinner in empty states:

```blade
@if($loading)
    <div class="flex flex-col items-center justify-center py-12">
        <x-spire::spinner size="lg" />
        <p class="mt-4 text-text-muted">Loading your data...</p>
    </div>
@elseif($items->isEmpty())
    <x-spire::empty-state
        icon="inbox"
        title="No items found"
        description="Get started by creating your first item"
    />
@else
    {{-- Items list --}}
@endif
```

### Livewire Loading Indicator

Use with Livewire's wire:loading directive:

```blade
<div>
    <x-spire::button wire:click="refresh">
        Refresh Data
    </x-spire::button>

    <div wire:loading wire:target="refresh" class="inline-flex items-center gap-2 ml-2">
        <x-spire::spinner size="sm" />
        <span class="text-sm text-text-muted">Refreshing...</span>
    </div>
</div>
```

### Form Submit Loading

Disable form during submission:

```blade
<form wire:submit="save">
    <div class="space-y-4">
        <x-spire::field label="Name" name="name">
            <x-spire::input wire:model="name" :disabled="$saving" />
        </x-spire::field>

        <x-spire::button type="submit" :disabled="$saving">
            @if($saving)
                <x-slot:leading>
                    <x-spire::spinner size="sm" />
                </x-slot:leading>
                Saving...
            @else
                Save
            @endif
        </x-spire::button>
    </div>
</form>
```

### Dots Variant in Button

Use dots for a more subtle loading indicator:

```blade
<x-spire::button wire:click="process" :disabled="$processing">
    @if($processing)
        <x-slot:leading>
            <x-spire::spinner variant="dots" size="sm" />
        </x-slot:leading>
        Processing...
    @else
        Process
    @endif
</x-spire::button>
```

### Nested Rings for Full Page

Use nested rings variant for dramatic full-page loading:

```blade
<div class="fixed inset-0 flex items-center justify-center bg-body/90 backdrop-blur-md z-50">
    <div class="text-center">
        <x-spire::spinner variant="nested-rings" size="lg" />
        <h3 class="mt-6 text-lg font-semibold">Loading Application</h3>
        <p class="mt-2 text-text-muted">Please wait while we prepare everything...</p>
    </div>
</div>
```

---

## Best Practices

### Do

✅ **Use appropriate size** - Match spinner size to context
```blade
<x-spire::spinner size="sm" /> {{-- In buttons --}}
<x-spire::spinner size="lg" /> {{-- In overlays --}}
```

✅ **Provide context** - Add text labels explaining what's loading
```blade
<div class="text-center">
    <x-spire::spinner />
    <p class="mt-2">Loading your dashboard...</p>
</div>
```

✅ **Match colors** - Use appropriate color for context
```blade
<x-spire::spinner color="success" /> {{-- Success operations --}}
<x-spire::spinner color="error" /> {{-- Error retries --}}
```

✅ **Disable interactions** - Prevent actions while loading
```blade
<x-spire::button :disabled="$loading">
    @if($loading)
        <x-slot:leading><x-spire::spinner size="sm" /></x-slot:leading>
        Loading...
    @endif
</x-spire::button>
```

✅ **Use semantic labels** - Provide accessible labels
```blade
<x-spire::spinner label="Loading user profile" />
```

### Don't

❌ **Don't show spinners indefinitely** - Always have timeout/error handling
```blade
{{-- Bad: No error handling --}}
@if($loading)
    <x-spire::spinner />
@endif

{{-- Good: Handle errors --}}
@if($loading)
    <x-spire::spinner />
@elseif($error)
    <x-spire::alert color="error">{{ $error }}</x-spire::alert>
@endif
```

❌ **Don't use large spinners in small spaces** - Causes layout shift
```blade
{{-- Bad: Large spinner in button --}}
<x-spire::button>
    <x-spire::spinner size="lg" /> Loading
</x-spire::button>

{{-- Good: Small spinner in button --}}
<x-spire::button>
    <x-spire::spinner size="sm" /> Loading
</x-spire::button>
```

❌ **Don't overuse animated spinners** - Can be distracting
```blade
{{-- Bad: Spinners everywhere --}}
<x-spire::spinner /> <x-spire::spinner /> <x-spire::spinner />

{{-- Good: Single meaningful spinner --}}
<x-spire::spinner />
```

❌ **Don't forget adaptive sizing** - Use size prop only when needed
```blade
{{-- Bad: Fixed size in flexible container --}}
<div class="w-full h-64">
    <x-spire::spinner size="sm" /> {{-- Too small --}}
</div>

{{-- Good: Adaptive sizing --}}
<div class="w-full h-64">
    <x-spire::spinner /> {{-- Fills container --}}
</div>
```

---

## Accessibility

### ARIA Attributes

The Spinner component implements proper ARIA attributes automatically:

- `role="status"` - Identifies as a status indicator
- `aria-label` - Provides screen reader announcement (defaults to "Loading...")

### Custom Labels

Provide meaningful labels for different loading states:

```blade
<x-spire::spinner label="Loading user profile" />
<x-spire::spinner label="Saving changes" />
<x-spire::spinner label="Uploading files" />
```

### Screen Reader Announcements

Spinners are announced to screen readers with their label. Ensure labels describe what's being loaded:

```blade
{{-- Good --}}
<x-spire::spinner label="Loading dashboard data" />

{{-- Bad --}}
<x-spire::spinner label="Loading" /> {{-- Too vague --}}
```

### Live Regions

For dynamic loading states, use ARIA live regions:

```blade
<div aria-live="polite" aria-atomic="true">
    @if($loading)
        <x-spire::spinner label="Processing your request" />
    @else
        <span>Processing complete</span>
    @endif
</div>
```

---

## Technical Notes

### Styling

Spinners use BEM-style class naming:

```css
.spire-spinner {
    /* Container */
}

.spire-spinner-ring {
    /* Ring variant element */
}

.spire-spinner-dot {
    /* Dot variant element */
}
```

### Animations

- **Ring**: CSS `animate-spin` (continuous 360° rotation)
- **Dots**: CSS `animate-bounce` with staggered delays
- **Nested Rings**: Two rings spinning at same speed

### Adaptive vs Fixed Sizing

**Adaptive (default)**:
- No `size` prop specified
- Fills 100% of container width/height
- Maintains 1:1 aspect ratio
- Scales border width proportionally

**Fixed**:
- `size` prop specified (`sm`, `md`, `lg`)
- Explicit pixel dimensions
- Fixed border widths

### Performance

- Uses CSS animations (hardware-accelerated)
- No JavaScript required
- Minimal DOM elements (1-3 divs)
- No layout thrashing

### Dark Mode

Spinners automatically adapt to dark mode:
- Border colors use semantic tokens
- Theme colors remain vibrant
- Background transparency works in both modes

### Custom Styling

Add custom classes for specific use cases:

```blade
<x-spire::spinner class="text-blue-500" />
```

### Default Configuration

Set global default variant in `config/spire-ui.php`:

```php
'spinner' => [
    'default_variant' => env('SPIRE_UI_SPINNER_VARIANT', 'ring'),
],
```

---

## Related Components

- **[Button](button.md)** - Use spinners in loading buttons
- **[Modal](modal.md)** - Show spinners while loading modal content
- **[Card](card.md)** - Add loading overlays to cards
- **[Progress](progress.md)** - For determinate progress with percentages
- **[Alert](alert.md)** - Display after loading completes

---

## Common Patterns

### Global Loading Overlay

```blade
@if($globalLoading)
    <div class="fixed inset-0 flex items-center justify-center bg-body/80 backdrop-blur-sm z-50">
        <div class="text-center">
            <x-spire::spinner size="lg" color="primary" />
            <p class="mt-4 font-medium">{{ $loadingMessage }}</p>
        </div>
    </div>
@endif
```

### Inline Action Loading

```blade
<div class="flex items-center justify-between">
    <span>{{ $item->name }}</span>

    <x-spire::button
        wire:click="syncItem({{ $item->id }})"
        variant="ghost"
        size="sm"
        :disabled="$syncingId === $item->id"
    >
        @if($syncingId === $item->id)
            <x-spire::spinner size="sm" />
        @else
            <x-spire::icon name="refresh-cw" />
        @endif
    </x-spire::button>
</div>
```

### Search with Loading

```blade
<div>
    <x-spire::input
        wire:model.live.debounce.300ms="search"
        placeholder="Search..."
    >
        <x-slot:trailing>
            <div wire:loading wire:target="search">
                <x-spire::spinner size="sm" />
            </div>
        </x-slot:trailing>
    </x-spire::input>

    <div class="mt-4">
        @if($searching)
            <div class="flex items-center justify-center py-8">
                <x-spire::spinner />
            </div>
        @else
            {{-- Search results --}}
        @endif
    </div>
</div>
```

### Multi-Step Process

```blade
<div class="space-y-4">
    @foreach($steps as $index => $step)
        <div class="flex items-center gap-3">
            @if($currentStep > $index)
                <x-spire::icon name="check-circle" class="text-success" />
            @elseif($currentStep === $index)
                <x-spire::spinner size="sm" color="primary" />
            @else
                <div class="w-5 h-5 rounded-full border-2 border-border"></div>
            @endif

            <span class="@if($currentStep === $index) font-medium @endif">
                {{ $step['label'] }}
            </span>
        </div>
    @endforeach
</div>
```
