# Sidebar Component

A full-featured navigation sidebar with collapsible sections, nested items, badges, mobile drawer support, and icon-only collapsed mode.

---

## Sidebar (Parent Container)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | string | `'md'` | Width: `sm` (14rem), `md` (16rem), `lg` (18rem) |
| `variant` | string | `'bordered'` | Style: `bordered`, `elevated`, `floating` |
| `collapsed` | boolean | `false` | Start in icon-only collapsed state |
| `collapsible` | boolean | `false` | Enable collapse toggle functionality |
| `position` | string | `'left'` | Position: `left`, `right` |
| `drawer` | boolean | `false` | Enable mobile drawer mode with backdrop |
| `persist` | boolean | `true` | Persist collapsed state to localStorage |
| `storageKey` | string | `'spire-sidebar-collapsed'` | localStorage key for persistence |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Main content area |
| `header` | Logo/branding area at the top |
| `footer` | Footer area at the bottom |

---

## Sidebar.Header

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closable` | boolean | `false` | Show close button (for mobile drawer) |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Header content (logo, title, etc.) - hidden in collapsed mode |
| `collapsed` | Alternative content for collapsed mode (e.g., icon-only logo) |

---

## Sidebar.Content

Scrollable content wrapper for navigation items.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Navigation sections and items |

---

## Sidebar.Footer

Sticky footer area.

### Slots

| Slot | Description |
|------|-------------|
| `default` | Footer content (user info, logout, etc.) - hidden in collapsed mode |
| `collapsed` | Alternative content for collapsed mode (e.g., avatar only) |

---

## Sidebar.Section (Collapsible Group)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `null` | Section title text |
| `icon` | string | `null` | Icon name for section header |
| `defaultOpen` | boolean | `true` | Start expanded |
| `collapsible` | boolean | `true` | Allow collapse/expand |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Navigation items within the section |

---

## Sidebar.Item (Navigation Item)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | string | `null` | Icon name |
| `href` | string | `null` | Navigation URL (uses `<a>` tag) |
| `route` | string | `null` | Named route (auto-generates `href`) |
| `active` | boolean\|null | `null` | Active/selected state (`null` = auto-detect, `true`/`false` = override) |
| `activeWhen` | string\|array | `null` | Custom URL patterns for active state (e.g., `'users/*'`, `['users/*', 'profile/*']`) |
| `activeRoute` | string\|array | `null` | Custom route patterns for active state (e.g., `'admin.*'`) |
| `activeMatch` | string | `'exact'` | Matching strategy: `'exact'` or `'starts-with'` |
| `autoActive` | boolean | `true` | Enable/disable automatic active state detection |
| `disabled` | boolean | `false` | Disabled state |
| `badge` | string | `null` | Badge text/count |
| `badgeColor` | string | `'primary'` | Badge color: `primary`, `secondary`, `success`, `warning`, `error`, `neutral` |
| `shortcut` | string | `null` | Keyboard shortcut display |
| `description` | string | `null` | Subtitle/description text |
| `defaultExpanded` | boolean | `false` | Start with nested items expanded |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Item label text |
| `label` | Custom label content |
| `children` | Nested navigation items |

### Automatic Active State Detection

Sidebar items **automatically detect** if they match the current page and apply active styling without manual configuration.

#### Basic Auto-Detection

```blade
{{-- ✅ Automatic: Active when on /dashboard --}}
<x-spire::sidebar.item href="/dashboard" icon="layout-dashboard">
    Dashboard
</x-spire::sidebar.item>

{{-- ✅ Automatic: Active when on /users --}}
<x-spire::sidebar.item href="/users" icon="users">
    Users
</x-spire::sidebar.item>
```

**No need for manual `:active="request()->is('dashboard')"` anymore!**

#### Named Route Detection

Use Laravel route names for reliable matching (recommended):

```blade
{{-- Active when route name is 'dashboard' --}}
<x-spire::sidebar.item route="dashboard" icon="layout-dashboard">
    Dashboard
</x-spire::sidebar.item>

{{-- Active when route name is 'users.index' --}}
<x-spire::sidebar.item route="users.index" icon="users">
    Users
</x-spire::sidebar.item>

{{-- Route automatically generates href --}}
<x-spire::sidebar.item route="users.show" href="/users/123" icon="user">
    View User
</x-spire::sidebar.item>
```

#### Wildcard Pattern Matching

Use patterns for parent items or section-wide matching:

```blade
{{-- Active when on /users, /users/123, /users/create, etc. --}}
<x-spire::sidebar.item
    href="/users"
    activeWhen="users/*"
    icon="users"
>
    Users
</x-spire::sidebar.item>

{{-- Multiple patterns --}}
<x-spire::sidebar.item
    href="/settings"
    :activeWhen="['settings/*', 'profile/*']"
    icon="settings"
>
    Settings
</x-spire::sidebar.item>
```

#### Route Pattern Matching

Use route name patterns for wildcard route matching:

```blade
{{-- Active for admin.users, admin.settings, admin.dashboard, etc. --}}
<x-spire::sidebar.item
    route="admin.dashboard"
    activeRoute="admin.*"
    icon="shield"
>
    Admin
</x-spire::sidebar.item>
```

#### Auto Parent Detection (Nested Items)

Parent items **automatically become active** when any child is active:

```blade
{{-- Parent automatically active when on /users/active or /users/pending --}}
<x-spire::sidebar.item icon="users">
    Users
    <x-slot:children>
        <x-spire::sidebar.item href="/users/active">
            Active Users
        </x-spire::sidebar.item>
        <x-spire::sidebar.item href="/users/pending">
            Pending Users
        </x-spire::sidebar.item>
    </x-slot:children>
</x-spire::sidebar.item>
```

**How it works:** Parent items with children automatically use `starts-with` matching on their `href` or check if any child route matches.

#### Manual Override

Override auto-detection with explicit `active` state:

```blade
{{-- Always active --}}
<x-spire::sidebar.item :active="true" href="/special">
    Special Page
</x-spire::sidebar.item>

{{-- Custom condition --}}
<x-spire::sidebar.item
    :active="auth()->user()->hasRole('admin')"
    href="/admin"
>
    Admin Panel
</x-spire::sidebar.item>

{{-- Disable auto-detection --}}
<x-spire::sidebar.item
    href="https://docs.example.com"
    :autoActive="false"
>
    External Docs
</x-spire::sidebar.item>
```

#### Advanced Example: Multi-Level Navigation

```blade
<x-spire::sidebar.content>
    {{-- Top-level item with auto-detection --}}
    <x-spire::sidebar.item route="dashboard" icon="layout-dashboard">
        Dashboard
    </x-spire::sidebar.item>

    {{-- Parent with wildcard pattern --}}
    <x-spire::sidebar.item
        href="/users"
        activeWhen="users/*"
        icon="users"
    >
        User Management
        <x-slot:children>
            {{-- Children auto-detect individually --}}
            <x-spire::sidebar.item route="users.index">
                All Users
            </x-spire::sidebar.item>
            <x-spire::sidebar.item route="users.active">
                Active Users
            </x-spire::sidebar.item>
            <x-spire::sidebar.item route="users.pending">
                Pending Approval
            </x-spire::sidebar.item>
        </x-slot:children>
    </x-spire::sidebar.item>

    {{-- Admin section with route patterns --}}
    <x-spire::sidebar.item
        route="admin.dashboard"
        activeRoute="admin.*"
        icon="shield"
    >
        Admin
        <x-slot:children>
            <x-spire::sidebar.item route="admin.users">
                Manage Users
            </x-spire::sidebar.item>
            <x-spire::sidebar.item route="admin.settings">
                System Settings
            </x-spire::sidebar.item>
        </x-slot:children>
    </x-spire::sidebar.item>
</x-spire::sidebar.content>
```

#### Migration from Manual Active State

**Before (manual):**
```blade
<x-spire::sidebar.item
    href="/dashboard"
    :active="request()->is('dashboard')"
>
    Dashboard
</x-spire::sidebar.item>
```

**After (automatic):**
```blade
<x-spire::sidebar.item href="/dashboard">
    Dashboard
</x-spire::sidebar.item>
```

**Still works (backward compatible):**
The manual `:active` prop still works and takes precedence over auto-detection.

---

## Sidebar.Divider

Visual separator between sections or items.

---

## Sidebar.Toggle

Button to toggle sidebar collapse state. By default, dispatches a global window event that any sidebar on the page will respond to.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `target` | string | `null` | Target sidebar ID (for targeting a specific sidebar) |
| `mobile` | boolean | `false` | Toggle mobile drawer instead of collapse |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Custom button content (default shows menu/panel icon) |

### Event Behavior

- **Without `target`**: Dispatches `spire-sidebar-toggle` event to window (global)
- **With `target`**: Dispatches `sidebar-toggle` event to specific sidebar element by ID

This allows the toggle button to be placed anywhere on the page:

```blade
{{-- Toggle can be in a separate header component --}}
<header class="flex items-center p-4">
    <x-spire::sidebar.toggle />
    <h1>My App</h1>
</header>

{{-- Sidebar responds to the global event --}}
<x-spire::sidebar collapsible>
    {{-- ... --}}
</x-spire::sidebar>
```

---

## Examples

### Basic Sidebar

```blade
<x-spire::sidebar>
    <x-slot:header>
        <img src="/logo.svg" alt="Logo" class="h-8" />
    </x-slot:header>

    <x-spire::sidebar.content>
        {{-- Active state is automatically detected --}}
        <x-spire::sidebar.item href="/dashboard" icon="layout-dashboard">
            Dashboard
        </x-spire::sidebar.item>
        <x-spire::sidebar.item href="/users" icon="users">
            Users
        </x-spire::sidebar.item>
        <x-spire::sidebar.item href="/settings" icon="settings">
            Settings
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>

    <x-slot:footer>
        <x-spire::sidebar.item icon="logout">
            Logout
        </x-spire::sidebar.item>
    </x-slot:footer>
</x-spire::sidebar>
```

### With Collapsible Sections

```blade
<x-spire::sidebar collapsible>
    <x-slot:header>
        <img src="/logo.svg" alt="Logo" class="h-8" />
        <x-spire::sidebar.toggle class="ml-auto" />
    </x-slot:header>

    <x-spire::sidebar.content>
        <x-spire::sidebar.section title="Main" icon="home">
            <x-spire::sidebar.item
                href="/dashboard"
                icon="layout-dashboard"
                badge="3"
            >
                Dashboard
            </x-spire::sidebar.item>
            <x-spire::sidebar.item href="/analytics" icon="chart-bar">
                Analytics
            </x-spire::sidebar.item>
        </x-spire::sidebar.section>

        <x-spire::sidebar.divider />

        <x-spire::sidebar.section title="Management" icon="folder" :defaultOpen="false">
            <x-spire::sidebar.item href="/projects" icon="briefcase">
                Projects
            </x-spire::sidebar.item>
            <x-spire::sidebar.item href="/tasks" icon="check-square">
                Tasks
            </x-spire::sidebar.item>
        </x-spire::sidebar.section>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### With Nested Items

```blade
<x-spire::sidebar>
    <x-spire::sidebar.content>
        <x-spire::sidebar.item icon="users" :defaultExpanded="true">
            Users
            <x-slot:children>
                <x-spire::sidebar.item href="/users/active">
                    Active Users
                </x-spire::sidebar.item>
                <x-spire::sidebar.item href="/users/pending">
                    Pending
                </x-spire::sidebar.item>
                <x-spire::sidebar.item href="/users/archived">
                    Archived
                </x-spire::sidebar.item>
            </x-slot:children>
        </x-spire::sidebar.item>

        <x-spire::sidebar.item icon="settings">
            Settings
            <x-slot:children>
                <x-spire::sidebar.item href="/settings/profile">
                    Profile
                </x-spire::sidebar.item>
                <x-spire::sidebar.item href="/settings/security">
                    Security
                </x-spire::sidebar.item>
            </x-slot:children>
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### With Badges and Shortcuts

```blade
<x-spire::sidebar>
    <x-spire::sidebar.content>
        <x-spire::sidebar.item
            href="/inbox"
            icon="inbox"
            badge="12"
            badgeColor="error"
            shortcut="⌘I"
        >
            Inbox
        </x-spire::sidebar.item>

        <x-spire::sidebar.item
            href="/notifications"
            icon="bell"
            badge="3"
            badgeColor="warning"
        >
            Notifications
        </x-spire::sidebar.item>

        <x-spire::sidebar.item
            href="/search"
            icon="search"
            shortcut="⌘K"
        >
            Search
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### With Descriptions

```blade
<x-spire::sidebar size="lg">
    <x-spire::sidebar.content>
        <x-spire::sidebar.item
            href="/team"
            icon="users"
            description="Manage team members"
        >
            Team
        </x-spire::sidebar.item>

        <x-spire::sidebar.item
            href="/billing"
            icon="credit-card"
            description="Subscription & invoices"
        >
            Billing
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### Mobile Drawer Mode

```blade
{{-- Toggle button (outside sidebar) --}}
<x-spire::sidebar.toggle mobile class="md:hidden" />

{{-- Sidebar with drawer mode --}}
<x-spire::sidebar drawer class="md:relative md:translate-x-0">
    <x-spire::sidebar.header :closable="true">
        <img src="/logo.svg" alt="Logo" class="h-8" />
    </x-spire::sidebar.header>

    <x-spire::sidebar.content>
        {{-- Navigation items --}}
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### Collapsible Icon-Only Mode

```blade
<x-spire::sidebar collapsible :collapsed="false">
    <x-slot:header>
        <img src="/logo.svg" alt="Logo" class="h-8" />
        <x-spire::sidebar.toggle class="ml-auto" />
    </x-slot:header>

    <x-spire::sidebar.content>
        {{-- Items show tooltips in collapsed mode --}}
        <x-spire::sidebar.item href="/dashboard" icon="layout-dashboard">
            Dashboard
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

### localStorage Persistence

By default, the sidebar's collapsed state is automatically saved to localStorage and restored on page refresh:

```blade
{{-- Collapsed state persists across page refreshes (default behavior) --}}
<x-spire::sidebar collapsible>
    {{-- ... --}}
</x-spire::sidebar>

{{-- Disable persistence --}}
<x-spire::sidebar collapsible :persist="false">
    {{-- Collapsed state resets on page refresh --}}
</x-spire::sidebar>

{{-- Custom storage key (useful for multiple sidebars) --}}
<x-spire::sidebar collapsible storageKey="admin-sidebar-collapsed">
    {{-- Uses 'admin-sidebar-collapsed' in localStorage --}}
</x-spire::sidebar>

{{-- Another sidebar with different key --}}
<x-spire::sidebar collapsible storageKey="settings-sidebar-collapsed">
    {{-- Uses 'settings-sidebar-collapsed' in localStorage --}}
</x-spire::sidebar>
```

**Persistence behavior:**
- The collapsed state is saved to localStorage whenever it changes
- On page load, the stored value takes precedence over the `collapsed` prop
- Each sidebar can have a unique `storageKey` for independent persistence
- Set `:persist="false"` to disable localStorage persistence entirely

### Smart Collapsed Mode with Custom Content

Use the `collapsed` slot on header/footer to show different content when the sidebar is collapsed:

```blade
<x-spire::sidebar collapsible>
    <x-spire::sidebar.header>
        {{-- Full logo when expanded --}}
        <img src="/logo-full.svg" alt="Acme Inc" class="h-8" />
        <x-spire::sidebar.toggle class="ml-auto" />

        <x-slot:collapsed>
            {{-- Icon logo when collapsed --}}
            <img src="/logo-icon.svg" alt="Acme" class="h-8 w-8" />
        </x-slot:collapsed>
    </x-spire::sidebar.header>

    <x-spire::sidebar.content>
        <x-spire::sidebar.section title="Main">
            <x-spire::sidebar.item href="/dashboard" icon="layout-dashboard" badge="3">
                Dashboard
            </x-spire::sidebar.item>
            <x-spire::sidebar.item href="/inbox" icon="inbox" badge="12" badgeColor="error">
                Inbox
            </x-spire::sidebar.item>
        </x-spire::sidebar.section>
    </x-spire::sidebar.content>

    <x-spire::sidebar.footer>
        {{-- Full user info when expanded --}}
        <x-spire::sidebar.item href="/profile" icon="user">
            John Doe
        </x-spire::sidebar.item>

        <x-slot:collapsed>
            {{-- Just avatar when collapsed --}}
            <x-spire::avatar src="/avatar.jpg" size="sm" />
        </x-slot:collapsed>
    </x-spire::sidebar.footer>
</x-spire::sidebar>
```

**Collapsed mode behavior:**
- Section headers are hidden, items flow together with subtle separators
- Dividers are hidden to maintain clean appearance
- Items without icons are hidden (would appear empty)
- Badges show as small colored indicator dots on icons
- Tooltips include badge counts (e.g., "Inbox (12)")

### Size Variants

```blade
{{-- Small --}}
<x-spire::sidebar size="sm">
    {{-- 14rem width --}}
</x-spire::sidebar>

{{-- Medium (default) --}}
<x-spire::sidebar size="md">
    {{-- 16rem width --}}
</x-spire::sidebar>

{{-- Large --}}
<x-spire::sidebar size="lg">
    {{-- 18rem width --}}
</x-spire::sidebar>
```

### Style Variants

```blade
{{-- Bordered (default) --}}
<x-spire::sidebar variant="bordered">
    {{-- Border on the right edge --}}
</x-spire::sidebar>

{{-- Elevated --}}
<x-spire::sidebar variant="elevated">
    {{-- Shadow effect --}}
</x-spire::sidebar>

{{-- Floating --}}
<x-spire::sidebar variant="floating">
    {{-- Detached with rounded corners and shadow --}}
</x-spire::sidebar>
```

### Disabled Items

```blade
<x-spire::sidebar>
    <x-spire::sidebar.content>
        <x-spire::sidebar.item href="/active" icon="check">
            Active Item
        </x-spire::sidebar.item>

        <x-spire::sidebar.item
            icon="lock"
            :disabled="true"
            description="Upgrade to access"
        >
            Premium Feature
        </x-spire::sidebar.item>
    </x-spire::sidebar.content>
</x-spire::sidebar>
```

---

## Accessibility

The Sidebar component follows WCAG AA accessibility standards:

### ARIA Attributes

- Container has `role="navigation"` with `aria-label`
- Collapsible sections use `aria-expanded` on triggers
- Items use `aria-current="page"` for active state
- Disabled items have `aria-disabled="true"`
- Mobile drawer manages focus trap and body scroll lock

### Keyboard Navigation

- **Tab**: Move between interactive items
- **Enter/Space**: Activate item or toggle section
- **Arrow Up/Down**: Navigate between items (roving tabindex)
- **Home/End**: Jump to first/last item
- **Escape**: Close mobile drawer
- **Type-ahead**: Focus item by typing its label

### Screen Readers

- Navigation structure is properly announced
- State changes (collapsed, expanded) are announced
- Badges and shortcuts are read with items
- Mobile open/close states are announced

---

## Best Practices

### Do

- Keep navigation hierarchy to 2-3 levels maximum
- Use icons consistently across all items
- Place most important items at the top
- Use badges sparingly for important counts
- Provide keyboard shortcuts for frequently used items
- Test collapsed mode to ensure icons are meaningful
- Use sections to group related items logically
- Provide `collapsed` slot content for header/footer with icon-only alternatives
- Ensure all visible items in collapsed mode have icons

### Don't

- Don't nest more than 2 levels of items (confusing UX)
- Don't use too many badges (creates visual noise)
- Don't hide critical navigation in collapsed mode
- Don't use vague icons without labels
- Don't disable items without explanation
- Don't put more than 15-20 items (consider grouping)
- Don't add items without icons if using collapsible mode (they'll be hidden when collapsed)

---

## Events

### Dispatched Events

The sidebar dispatches custom events for state changes:

| Event | Payload | Description |
|-------|---------|-------------|
| `sidebar-toggled` | `{ value: boolean }` | Collapse state changed |
| `sidebar-mobile-opened` | `{ value: true }` | Mobile drawer opened |
| `sidebar-mobile-closed` | `{ value: false }` | Mobile drawer closed |

### Listening to Events

```blade
<div x-on:sidebar-toggled.window="handleCollapse($event.detail)">
    {{-- Handle sidebar collapse --}}
</div>
```

### Listened Events (Global)

The sidebar listens for these global window events:

| Event | Description |
|-------|-------------|
| `spire-sidebar-toggle` | Toggle collapse state |
| `spire-sidebar-open-mobile` | Open mobile drawer |

### Listened Events (Local)

The sidebar also listens for these events on the sidebar element itself (use `target` prop on toggle):

| Event | Description |
|-------|-------------|
| `sidebar-toggle` | Toggle collapse state |
| `sidebar-open-mobile` | Open mobile drawer |
| `sidebar-close-mobile` | Close mobile drawer |

---

## Alpine.js Methods

The sidebar exposes these methods via Alpine:

| Method | Description |
|--------|-------------|
| `toggle()` | Toggle collapsed state |
| `expand()` | Exit collapsed state |
| `collapse()` | Enter collapsed state |
| `openMobile()` | Open mobile drawer |
| `closeMobile()` | Close mobile drawer |
| `toggleMobile()` | Toggle mobile drawer |

### External Control

The sidebar listens for global window events, so you can control it from anywhere:

```blade
{{-- Using the toggle component (recommended) --}}
<x-spire::sidebar.toggle />

{{-- Or dispatch the global event directly --}}
<button x-on:click="window.dispatchEvent(new CustomEvent('spire-sidebar-toggle'))">
    Toggle Sidebar
</button>

{{-- For mobile drawer --}}
<button x-on:click="window.dispatchEvent(new CustomEvent('spire-sidebar-open-mobile'))">
    Open Mobile Menu
</button>

{{-- Target a specific sidebar by ID --}}
<button x-on:click="document.getElementById('main-sidebar')?.dispatchEvent(new CustomEvent('sidebar-toggle'))">
    Toggle Main Sidebar
</button>
```

---

## Technical Notes

### Alpine.js Integration

- Uses `spireSidebar`, `spireSidebarSection`, and `spireSidebarItem` Alpine components
- Collapse animation uses `x-collapse` directive
- Keyboard navigation uses the shared `keyboard` module with roving tabindex
- Body scroll is locked when mobile drawer is open

### CSS Architecture

- Uses `spire-sidebar-*` class naming convention
- Dark mode support via semantic color tokens

**Collapsed mode CSS behavior:**
- Section triggers are hidden completely (items remain)
- Dividers are hidden for cleaner appearance
- Items without icons are hidden (would appear empty)
- Header/footer show `collapsed` slot content instead of default
- Badge indicators appear as small dots on icons
- Tooltips show label + badge count on hover

### Livewire Compatibility

- Use `wire:navigate` on items for SPA navigation
- Add `wire:ignore` if sidebar state needs to persist
- Dispatch Livewire events from Alpine for server-side actions

```blade
<x-spire::sidebar.item
    wire:navigate
    href="/dashboard"
    x-on:click="$wire.trackNavigation('dashboard')"
>
    Dashboard
</x-spire::sidebar.item>
```

### Responsive Layout

For a typical dashboard layout:

```blade
<div class="flex h-screen">
    {{-- Mobile toggle --}}
    <button class="md:hidden fixed top-4 left-4 z-50" x-on:click="$dispatch('sidebar-open-mobile')">
        <x-spire::icon name="menu" />
    </button>

    {{-- Sidebar --}}
    <x-spire::sidebar
        drawer
        class="hidden md:flex md:relative md:translate-x-0"
        collapsible
    >
        {{-- ... --}}
    </x-spire::sidebar>

    {{-- Main content --}}
    <main class="flex-1 overflow-auto">
        {{-- Page content --}}
    </main>
</div>
```
