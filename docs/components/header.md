# Header Component

A flexible header/navigation component system with support for branding, navigation items, badges, and sidebar integration.

## Overview

The Header component provides a complete navigation header solution with:

- **Sticky positioning** - Fixed to top with optional blur effect
- **Brand section** - Logo and app name with light/dark mode support
- **Navigation items** - Links with icons, badges, and active states
- **Flexible layout** - Spacers and containers for responsive design
- **Sidebar integration** - Toggle button with custom events

**Component parts:**
- `header` - Main container
- `header.brand` - Logo and app name
- `header.navbar` - Navigation item container
- `header.item` - Individual navigation link/button
- `header.spacer` - Flexible layout divider
- `header.toggle` - Sidebar toggle button

---

## Header (Main Container)

The root header element with optional sticky positioning and blur effect.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sticky` | boolean | `false` | Make header sticky to top |
| `container` | boolean | `false` | Wrap content in centered container |
| `blur` | boolean | `false` | Add backdrop blur effect |

### Examples

```blade
{{-- Basic header --}}
<x-spire::header>
    <!-- content -->
</x-spire::header>

{{-- Sticky header with blur --}}
<x-spire::header sticky blur>
    <!-- content -->
</x-spire::header>

{{-- Centered container layout --}}
<x-spire::header sticky container>
    <!-- content -->
</x-spire::header>
```

---

## Header.brand

Logo and branding section, typically placed at the start of the header.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | string | `'/'` | Link destination (renders as div if empty) |
| `logo` | string | `null` | Path to logo image (light mode) |
| `logoDark` | string | `null` | Path to dark mode logo |
| `name` | string | `null` | Brand name text |

### Examples

```blade
{{-- Text only --}}
<x-spire::header.brand name="My App" />

{{-- With logo --}}
<x-spire::header.brand
    href="/"
    :logo="asset('images/logo.svg')"
    name="Acme Corp"
/>

{{-- With dark mode logo --}}
<x-spire::header.brand
    href="/"
    :logo="asset('images/logo-light.svg')"
    :logoDark="asset('images/logo-dark.svg')"
    name="Acme Corp"
/>

{{-- Logo only (no text) --}}
<x-spire::header.brand
    href="/"
    :logo="asset('images/logo.svg')"
/>

{{-- Custom content in slot --}}
<x-spire::header.brand href="/">
    <span class="text-xl font-bold">Custom Brand</span>
</x-spire::header.brand>
```

---

## Header.navbar

Container for grouping navigation items.

### Props

None.

### Examples

```blade
<x-spire::header.navbar>
    <x-spire::header.item href="/about">About</x-spire::header.item>
    <x-spire::header.item href="/services">Services</x-spire::header.item>
    <x-spire::header.item href="/contact">Contact</x-spire::header.item>
</x-spire::header.navbar>
```

---

## Header.item

Navigation item supporting links, icons, badges, and active states.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | string | `null` | Link destination (renders as button if empty) |
| `icon` | string | `null` | Leading icon name |
| `iconTrailing` | string | `null` | Trailing icon name |
| `current` | boolean | `false` | Mark as current/active page |
| `badge` | string | `null` | Badge text content |
| `badgeColor` | string | `'primary'` | Badge color variant |
| `label` | string | `null` | Aria-label for icon-only items |
| `disabled` | boolean | `false` | Disable the item |

### Badge Colors

- `primary` (default)
- `secondary`
- `success`
- `warning`
- `error`
- `neutral`

### Examples

```blade
{{-- Basic text link --}}
<x-spire::header.item href="/dashboard">
    Dashboard
</x-spire::header.item>

{{-- Current page --}}
<x-spire::header.item href="/dashboard" current>
    Dashboard
</x-spire::header.item>

{{-- With icon --}}
<x-spire::header.item href="/projects" icon="folder">
    Projects
</x-spire::header.item>

{{-- With badge --}}
<x-spire::header.item href="/notifications" icon="bell" badge="5" badgeColor="error">
    Notifications
</x-spire::header.item>

{{-- Icon only (with accessibility label) --}}
<x-spire::header.item icon="settings" label="Settings" href="/settings" />

{{-- Icon only button --}}
<x-spire::header.item icon="search" label="Search" />

{{-- With trailing icon --}}
<x-spire::header.item href="/menu" iconTrailing="chevron-down">
    Menu
</x-spire::header.item>

{{-- Disabled item --}}
<x-spire::header.item disabled>
    Coming Soon
</x-spire::header.item>
```

---

## Header.spacer

Flexible spacer to push content to the right or create visual separation.

### Props

None.

### Examples

```blade
<x-spire::header>
    <x-spire::header.brand name="Logo" />
    <x-spire::header.spacer />  {{-- Pushes everything after to the right --}}
    <x-spire::header.navbar>
        <x-spire::header.item href="/login">Login</x-spire::header.item>
    </x-spire::header.navbar>
</x-spire::header>
```

---

## Header.toggle

Toggle button for opening/closing sidebars, dispatches custom events.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | `'bars-2'` | Icon name for toggle button |
| `target` | string | `null` | ID of target element to dispatch event to |
| `mobile` | boolean | `true` | Use mobile or desktop event type |

### Event Behavior

**With target prop:**
- Dispatches to specific element by ID
- Event: `sidebar-open-mobile` (mobile=true) or `sidebar-toggle` (mobile=false)

**Without target prop:**
- Dispatches to window (global event)
- Event: `spire-sidebar-open-mobile` (mobile=true) or `spire-sidebar-toggle` (mobile=false)

### Examples

```blade
{{-- Dispatch to specific sidebar --}}
<x-spire::header.toggle target="main-sidebar" />

{{-- Dispatch globally --}}
<x-spire::header.toggle />

{{-- Desktop toggle (non-mobile event) --}}
<x-spire::header.toggle target="app-sidebar" :mobile="false" />

{{-- Custom icon --}}
<x-spire::header.toggle icon="menu" target="sidebar" />
```

---

## Complete Layout Examples

### Basic Header

```blade
<x-spire::header>
    <x-spire::header.brand name="My App" />
    <x-spire::header.navbar>
        <x-spire::header.item href="/" current>Home</x-spire::header.item>
        <x-spire::header.item href="/about">About</x-spire::header.item>
        <x-spire::header.item href="/contact">Contact</x-spire::header.item>
    </x-spire::header.navbar>
</x-spire::header>
```

### Application Header

```blade
<x-spire::header sticky container blur>
    {{-- Brand --}}
    <x-spire::header.brand
        href="/"
        :logo="asset('logo.svg')"
        name="Dashboard"
    />

    {{-- Main Navigation --}}
    <x-spire::header.navbar>
        <x-spire::header.item href="/dashboard" icon="home" current>
            Dashboard
        </x-spire::header.item>
        <x-spire::header.item href="/projects" icon="folder">
            Projects
        </x-spire::header.item>
        <x-spire::header.item href="/team" icon="users">
            Team
        </x-spire::header.item>
    </x-spire::header.navbar>

    {{-- Push right content --}}
    <x-spire::header.spacer />

    {{-- Right Actions --}}
    <x-spire::header.navbar>
        <x-spire::header.item
            icon="bell"
            badge="3"
            badgeColor="error"
            href="/notifications"
            label="Notifications"
        />
        <x-spire::header.item
            icon="user"
            href="/profile"
            label="Profile"
        />
    </x-spire::header.navbar>
</x-spire::header>
```

### With Mobile Toggle

```blade
<x-spire::header sticky>
    {{-- Mobile toggle (show on small screens) --}}
    <div class="lg:hidden">
        <x-spire::header.toggle target="mobile-nav" />
    </div>

    <x-spire::header.brand name="App" />

    {{-- Desktop nav (hide on small screens) --}}
    <div class="hidden lg:flex">
        <x-spire::header.navbar>
            <x-spire::header.item href="/features">Features</x-spire::header.item>
            <x-spire::header.item href="/pricing">Pricing</x-spire::header.item>
        </x-spire::header.navbar>
    </div>

    <x-spire::header.spacer />

    <x-spire::header.navbar>
        <x-spire::header.item href="/login">Login</x-spire::header.item>
        <x-spire::button href="/signup" size="sm">Sign Up</x-spire::button>
    </x-spire::header.navbar>
</x-spire::header>
```

### Admin Layout with Sidebar

```blade
<x-spire::header sticky>
    {{-- Sidebar toggle --}}
    <x-spire::header.toggle target="admin-sidebar" />

    <x-spire::header.brand
        :logo="asset('admin-logo.svg')"
        name="Admin Panel"
    />

    <x-spire::header.spacer />

    <x-spire::header.navbar>
        <x-spire::header.item icon="search" label="Search" />
        <x-spire::header.item
            icon="bell"
            badge="{{ $unreadCount }}"
            badgeColor="error"
            href="/admin/notifications"
            label="Notifications"
        />

        <x-spire::dropdown placement="bottom-end">
            <x-spire::dropdown.trigger>
                <x-spire::header.item icon="user" iconTrailing="chevron-down">
                    {{ auth()->user()->name }}
                </x-spire::header.item>
            </x-spire::dropdown.trigger>
            <x-spire::dropdown.content>
                <x-spire::dropdown.item icon="user" href="/profile">
                    Profile
                </x-spire::dropdown.item>
                <x-spire::dropdown.item icon="settings" href="/settings">
                    Settings
                </x-spire::dropdown.item>
                <x-spire::dropdown.separator />
                <x-spire::dropdown.item icon="log-out" href="/logout">
                    Logout
                </x-spire::dropdown.item>
            </x-spire::dropdown.content>
        </x-spire::dropdown>
    </x-spire::header.navbar>
</x-spire::header>
```

---

## Accessibility

### ARIA Support

- Header items use `aria-current="page"` when `current` is true
- Icon-only items require `label` prop for screen readers
- Toggle button has translated aria-label
- Spacer is hidden from screen readers (`aria-hidden="true"`)
- Disabled items have `aria-disabled="true"`

### Keyboard Navigation

- All items are focusable via Tab
- Links activate on Enter
- Buttons activate on Enter/Space
- Focus styles with visible outline

### Best Practices

```blade
{{-- Always provide label for icon-only items --}}
<x-spire::header.item icon="settings" label="Settings" />

{{-- Mark current page --}}
<x-spire::header.item href="{{ route('dashboard') }}" :current="request()->routeIs('dashboard')">
    Dashboard
</x-spire::header.item>
```

---

## Best Practices

### Do

- Use `sticky` with `blur` for modern glass effect
- Use `container` for centered content layouts
- Always provide `label` for icon-only items
- Use `current` prop to indicate active page
- Use semantic badge colors (error for alerts, success for positive)
- Combine with dropdown for user menus
- Use `spacer` to push items to the right

### Don't

- Don't nest navbars inside navbars
- Don't use badge without icon (poor visibility)
- Don't forget href for navigable items
- Don't skip label on icon-only items
- Don't use too many items (consider dropdown for overflow)

---

## Technical Notes

### CSS Classes

All components use `.spire-header*` naming convention:
- `.spire-header` - Main container
- `.spire-header-brand` - Brand section
- `.spire-header-navbar` - Navigation container
- `.spire-header-item` - Navigation item
- `.spire-header-spacer` - Flexible spacer
- `.spire-header-toggle` - Toggle button

### Data Attributes

- `data-spire-header` - Main header
- `data-spire-sticky="true"` - When sticky
- `data-spire-header-brand` - Brand component
- `data-spire-header-item` - Navigation item
- `data-spire-current="true"` - Current page item
- `data-spire-header-navbar` - Navbar container
- `data-spire-header-toggle` - Toggle button

### Translations

Key translations under `spire-ui::spire-ui.header`:

- `toggle_menu` - Toggle button aria-label
- `navigation` - Navigation landmark label

### Sidebar Integration

The toggle component dispatches custom events for sidebar integration:

```javascript
// Listen for toggle events
document.getElementById('my-sidebar').addEventListener('sidebar-open-mobile', () => {
    // Open mobile sidebar
});

// Or listen globally
window.addEventListener('spire-sidebar-toggle', () => {
    // Toggle sidebar
});
```
