# Tabs Component

Accessible tabbed interface for organizing content into selectable panels with keyboard navigation.

---

## Tabs (Root Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `defaultValue` | string | first tab | Value of the initially active tab |
| `orientation` | string | `'horizontal'` | Tab list orientation: `horizontal`, `vertical` |
| `activationMode` | string | `'automatic'` | When tabs activate: `automatic` (on focus), `manual` (on Enter/Space) |
| `variant` | string | `'underline'` | Visual variant: `default`, `underline`, `pills`, `bordered`, `soft` |
| `color` | string | `'primary'` | Color theme: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `neutral` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `fullWidth` | boolean | `false` | Whether tabs should fill the container width |
| `scrollable` | boolean | `true` | Enable horizontal scrolling for many tabs |
| `syncHash` | boolean | `false` | Sync active tab with URL hash (e.g., `#tab-name`) |
| `name` | string | `null` | Name for event identification |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Container for tabs list and content panels |

---

## Tabs.List (Child Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | `null` | Accessible label for the tab list |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Container for `<x-spire::tabs.trigger>` components |

---

## Tabs.Trigger (Child Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | **required** | Unique identifier for this tab (must match content value) |
| `disabled` | boolean | `false` | Disable this tab (still focusable for accessibility) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Tab button content (text, icons, etc.) |

---

## Tabs.Content (Child Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string | **required** | Unique identifier matching the trigger value |
| `forceMount` | boolean | `false` | Keep content in DOM when inactive (disables x-cloak) |
| `lazy` | boolean | `false` | Only render content after first activation (performance optimization) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Panel content |

---

## Examples

### Basic Tabs

```blade
<x-spire::tabs default-value="account">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="account">Account</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="password">Password</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="notifications">Notifications</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="account">
        <h3 class="font-medium mb-2">Account Settings</h3>
        <p>Manage your account information and preferences here.</p>
    </x-spire::tabs.content>

    <x-spire::tabs.content value="password">
        <h3 class="font-medium mb-2">Change Password</h3>
        <p>Update your password to keep your account secure.</p>
    </x-spire::tabs.content>

    <x-spire::tabs.content value="notifications">
        <h3 class="font-medium mb-2">Notification Preferences</h3>
        <p>Control how and when you receive notifications.</p>
    </x-spire::tabs.content>
</x-spire::tabs>
```

### Variants

```blade
{{-- Underline (default) --}}
<x-spire::tabs variant="underline" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Underline</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Style</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Minimal bottom border indicator.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Clean and modern look.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Default (solid background) --}}
<x-spire::tabs variant="default" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Default</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Style</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Solid background on active tab.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Button-like appearance.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Pills --}}
<x-spire::tabs variant="pills" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Pills</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Style</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Rounded pill-shaped tabs.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Friendly and approachable.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Bordered --}}
<x-spire::tabs variant="bordered" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Bordered</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Style</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Card-like tabs with borders.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Clear delineation between tabs.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Soft --}}
<x-spire::tabs variant="soft" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Soft</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Style</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Subtle background tint.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Gentle, non-intrusive appearance.</x-spire::tabs.content>
</x-spire::tabs>
```

### Sizes

```blade
{{-- Small --}}
<x-spire::tabs size="sm" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Small</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Size</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Compact tabs for tight spaces.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Smaller padding and text.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Medium (default) --}}
<x-spire::tabs size="md" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Medium</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Size</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Standard size for most use cases.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Balanced padding and text.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Large --}}
<x-spire::tabs size="lg" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Large</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Size</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Prominent tabs for emphasis.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">More padding and larger text.</x-spire::tabs.content>
</x-spire::tabs>
```

### Vertical Orientation

```blade
<x-spire::tabs orientation="vertical" variant="default" default-value="general">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="general">General</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="appearance">Appearance</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="privacy">Privacy</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="advanced">Advanced</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="general">
        <h3 class="font-medium mb-2">General Settings</h3>
        <p>Configure general application settings like language and timezone.</p>
    </x-spire::tabs.content>

    <x-spire::tabs.content value="appearance">
        <h3 class="font-medium mb-2">Appearance</h3>
        <p>Customize the look and feel of your interface.</p>
    </x-spire::tabs.content>

    <x-spire::tabs.content value="privacy">
        <h3 class="font-medium mb-2">Privacy Settings</h3>
        <p>Control your data and privacy preferences.</p>
    </x-spire::tabs.content>

    <x-spire::tabs.content value="advanced">
        <h3 class="font-medium mb-2">Advanced Options</h3>
        <p>Advanced configuration for power users.</p>
    </x-spire::tabs.content>
</x-spire::tabs>
```

### Full Width Tabs

```blade
<x-spire::tabs :full-width="true" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">First</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Second</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab3">Third</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="tab1">First tab content</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Second tab content</x-spire::tabs.content>
    <x-spire::tabs.content value="tab3">Third tab content</x-spire::tabs.content>
</x-spire::tabs>
```

### With Icons

```blade
<x-spire::tabs default-value="dashboard">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="dashboard">
            <x-spire::icon name="home-01" class="w-4 h-4" />
            Dashboard
        </x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="analytics">
            <x-spire::icon name="bar-chart-square-02" class="w-4 h-4" />
            Analytics
        </x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="settings">
            <x-spire::icon name="settings-01" class="w-4 h-4" />
            Settings
        </x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="dashboard">Dashboard content</x-spire::tabs.content>
    <x-spire::tabs.content value="analytics">Analytics content</x-spire::tabs.content>
    <x-spire::tabs.content value="settings">Settings content</x-spire::tabs.content>
</x-spire::tabs>
```

### Disabled Tabs

```blade
<x-spire::tabs default-value="active">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="active">Active Tab</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="disabled" :disabled="true">Disabled Tab</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="another">Another Tab</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="active">This tab is active and selectable.</x-spire::tabs.content>
    <x-spire::tabs.content value="disabled">This content cannot be viewed.</x-spire::tabs.content>
    <x-spire::tabs.content value="another">This tab is also selectable.</x-spire::tabs.content>
</x-spire::tabs>
```

### Manual Activation

```blade
<x-spire::tabs activation-mode="manual" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Tab 1</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Tab 2</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab3">Tab 3</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="tab1">Press Enter or Space to activate tabs.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Use arrow keys to focus, then activate.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab3">Useful when tab content is expensive to load.</x-spire::tabs.content>
</x-spire::tabs>
```

### Color Variants

```blade
{{-- Primary (default) --}}
<x-spire::tabs color="primary" variant="pills" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Primary</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Color</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Primary color theme.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Default brand color.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Success --}}
<x-spire::tabs color="success" variant="pills" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Success</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Color</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Success color theme.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Great for completed states.</x-spire::tabs.content>
</x-spire::tabs>

{{-- Error --}}
<x-spire::tabs color="error" variant="pills" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Error</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Color</x-spire::tabs.trigger>
    </x-spire::tabs.list>
    <x-spire::tabs.content value="tab1">Error color theme.</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">For warnings or alerts.</x-spire::tabs.content>
</x-spire::tabs>
```

### Scrollable Tabs

Use for many tabs that don't fit in the container width:

```blade
<x-spire::tabs :scrollable="true" default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Dashboard</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Analytics</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab3">Reports</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab4">Users</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab5">Settings</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab6">Notifications</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab7">Billing</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab8">Integrations</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="tab1">Dashboard content</x-spire::tabs.content>
    <x-spire::tabs.content value="tab2">Analytics content</x-spire::tabs.content>
    {{-- ... more content panels --}}
</x-spire::tabs>
```

### URL Hash Sync

Sync tab state with URL for bookmarking and sharing:

```blade
<x-spire::tabs :sync-hash="true" default-value="overview">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="overview">Overview</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="features">Features</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="pricing">Pricing</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="overview">
        Overview content. URL will show #overview
    </x-spire::tabs.content>

    <x-spire::tabs.content value="features">
        Features content. URL will show #features
    </x-spire::tabs.content>

    <x-spire::tabs.content value="pricing">
        Pricing content. URL will show #pricing
    </x-spire::tabs.content>
</x-spire::tabs>
```

### Lazy Loading

Only render content when first activated (great for heavy content):

```blade
<x-spire::tabs default-value="tab1">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="tab1">Active</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab2">Lazy Loaded</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="tab3">Also Lazy</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="tab1">
        This content loads immediately.
    </x-spire::tabs.content>

    <x-spire::tabs.content value="tab2" :lazy="true">
        <livewire:heavy-component />
        This content only renders after first click.
    </x-spire::tabs.content>

    <x-spire::tabs.content value="tab3" :lazy="true">
        Also lazy - won't be in DOM until activated.
    </x-spire::tabs.content>
</x-spire::tabs>
```

### Controlled Mode (wire:model / x-model)

Bind tab state to external state using x-modelable:

```blade
{{-- With Alpine.js --}}
<div x-data="{ activeTab: 'settings' }">
    <x-spire::tabs x-model="activeTab">
        <x-spire::tabs.list>
            <x-spire::tabs.trigger value="profile">Profile</x-spire::tabs.trigger>
            <x-spire::tabs.trigger value="settings">Settings</x-spire::tabs.trigger>
        </x-spire::tabs.list>

        <x-spire::tabs.content value="profile">Profile content</x-spire::tabs.content>
        <x-spire::tabs.content value="settings">Settings content</x-spire::tabs.content>
    </x-spire::tabs>

    <p>Current tab: <span x-text="activeTab"></span></p>
    <button @click="activeTab = 'profile'">Go to Profile</button>
</div>

{{-- With Livewire --}}
<x-spire::tabs wire:model="currentTab">
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="overview">Overview</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="details">Details</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="overview">Overview content</x-spire::tabs.content>
    <x-spire::tabs.content value="details">Details content</x-spire::tabs.content>
</x-spire::tabs>
```

### With Livewire

```blade
<x-spire::tabs
    default-value="profile"
    x-on:spire-tabs-changed.window="$wire.setActiveTab($event.detail.value)"
>
    <x-spire::tabs.list>
        <x-spire::tabs.trigger value="profile">Profile</x-spire::tabs.trigger>
        <x-spire::tabs.trigger value="billing">Billing</x-spire::tabs.trigger>
    </x-spire::tabs.list>

    <x-spire::tabs.content value="profile">
        <livewire:profile-form />
    </x-spire::tabs.content>

    <x-spire::tabs.content value="billing">
        <livewire:billing-form />
    </x-spire::tabs.content>
</x-spire::tabs>
```

---

## Accessibility

The Tabs component follows WAI-ARIA Tabs Pattern and WCAG AA standards:

### ARIA Attributes

- Tab list has `role="tablist"` with `aria-orientation`
- Each tab has `role="tab"` with `aria-selected`, `aria-controls`
- Each panel has `role="tabpanel"` with `aria-labelledby`
- Disabled tabs use `aria-disabled="true"` (remain focusable for discoverability)

### Keyboard Navigation

**Horizontal Orientation:**
- **Arrow Right**: Move focus to next tab
- **Arrow Left**: Move focus to previous tab
- **Home**: Move focus to first tab
- **End**: Move focus to last tab
- **Enter/Space**: Activate focused tab (manual mode)
- **Tab**: Move focus into/out of tab list

**Vertical Orientation:**
- **Arrow Down**: Move focus to next tab
- **Arrow Up**: Move focus to previous tab
- **Home/End**: Same as horizontal

### Focus Management

- Uses roving tabindex pattern
- Only the active tab is in the Tab sequence (`tabindex="0"`)
- Other tabs have `tabindex="-1"`
- Focus indicators are clearly visible

### Screen Readers

- Tab state changes announced via `aria-selected`
- Panel association communicated via `aria-controls` / `aria-labelledby`
- Disabled tabs announced as disabled

---

## Events

The Tabs component dispatches custom events for integration:

### spire-tabs-changed

Dispatched when the active tab changes.

```javascript
// Event detail
{
    id: 'tabs-1',      // Component instance ID
    name: null,        // Optional name prop
    value: 'tab2',     // New active tab value
    previousValue: 'tab1',  // Previous active tab
    timestamp: 1699999999999
}
```

**Listening in Alpine:**

```blade
<div x-on:spire-tabs-changed.window="console.log($event.detail.value)">
    <x-spire::tabs>...</x-spire::tabs>
</div>
```

**Listening in Livewire:**

```blade
<x-spire::tabs x-on:spire-tabs-changed="$wire.handleTabChange($event.detail.value)">
    ...
</x-spire::tabs>
```

---

## Best Practices

### Do

- Use tabs for content that belongs in the same context but doesn't need to be visible simultaneously
- Keep tab labels short and descriptive (1-3 words)
- Default to the most relevant or frequently used tab
- Use icons to improve scannability for complex tab sets
- Test keyboard navigation thoroughly
- Provide meaningful accessible labels for tab lists
- Use `forceMount` when tab content needs to maintain state
- Use `lazy` for expensive content that doesn't need to load until viewed
- Use `syncHash` for shareable/bookmarkable tab states

### Don't

- Don't use tabs for sequential steps (use a stepper instead)
- Don't hide critical content or primary actions behind non-default tabs
- Don't use more than 5-7 tabs (consider a different navigation pattern)
- Don't nest tabs within tabs (confusing UX)
- Don't use long tab labels that cause wrapping
- Don't disable all tabs (always keep at least one enabled)
- Don't rely solely on color to indicate active state

---

## Technical Notes

### Alpine.js Integration

- Uses `spireTabs` Alpine data component
- State managed with `activeTab` reactive property
- Roving tabindex for keyboard navigation
- Automatic/manual activation modes supported
- `x-modelable` for wire:model/x-model binding
- ResizeObserver for cursor repositioning on container resize
- URL hash synchronization with history.pushState

### Animated Cursor

The tabs component features a smooth animated cursor that slides between tabs:

- Cursor position calculated from active tab's offset/dimensions
- CSS transitions (200ms ease-out) for smooth movement
- Initial positioning without animation to prevent flash
- ResizeObserver handles container resize updates
- Per-variant styling (underline, pills, bordered, etc.)

### Content Panel Animations

Tab panels animate with fade and slide transitions:

- `x-transition:enter` with 200ms ease-out
- `x-transition:leave` with 150ms ease-in
- Fade opacity + slide translate-y effect
- `x-cloak` hides inactive panels initially

### CSS Architecture

- Uses `ComponentClass` for consistent BEM naming
- Variants controlled via CSS classes and `aria-selected` attribute
- Color applied through Tailwind's color utilities
- Dark mode supported via CSS media queries

### Livewire Compatibility

- Events bubble to window for Livewire listening
- Use `wire:ignore` if tab state should persist across Livewire updates
- Content inside panels can contain Livewire components

### Styling Customization

The Tabs component uses:
- `data-spire-*` attributes for variant/size/color targeting
- CSS custom properties from `theme.css` for colors
- `aria-selected` for active state styling
- Standard Tailwind utilities for spacing and layout
