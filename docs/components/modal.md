# Modal Component

Dialog and flyout panel system built on the native HTML `<dialog>` element. Supports centered modals and sidebar flyouts with smooth animations, Livewire integration, and full accessibility.

## Props

### Modal (Main)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | `null` | Unique identifier for programmatic control |
| `size` | string | `'md'` | Modal width: `sm`, `md`, `lg`, `xl`, `2xl`, `full` |
| `variant` | string | `'modal'` | Display variant: `modal` (centered) or `flyout` (sidebar) |
| `position` | string | `'right'` | Flyout position: `left`, `right` (only for flyout variant) |
| `dismissible` | boolean | `true` | Whether clicking outside or pressing Escape closes the modal |
| `padding` | string | `'default'` | Body padding: `default`, `sm`, `lg`, `no-padding` |

### Modal.header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `closable` | boolean | `true` | Whether to show the close button |

### Modal.title

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tag` | string | `'h2'` | HTML tag to use for the title |

### Modal.footer

No props. Accepts standard HTML attributes.

### Modal.trigger

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | Required | Name of the modal to open |

---

## Slots

### Modal (Main)

| Slot | Description |
|------|-------------|
| `default` | Modal body content (automatically wrapped with padding) |
| `header` | Named slot for the header section |
| `footer` | Named slot for the footer section |

The modal uses named slots for header and footer. Content placed directly in the modal (without a named slot) becomes the body content and receives automatic padding.

### Modal.header

| Slot | Description |
|------|-------------|
| Default | Header content (typically contains modal.title) |

### Modal.title

| Slot | Description |
|------|-------------|
| Default | Title text |

### Modal.footer

| Slot | Description |
|------|-------------|
| Default | Footer content (typically action buttons) |

### Modal.trigger

| Slot | Description |
|------|-------------|
| Default | Trigger element (button, link, etc.) |

---

## Examples

### Basic Modal

```blade
<x-spire::modal.trigger name="basic-modal">
    <x-spire::button>Open Modal</x-spire::button>
</x-spire::modal.trigger>

<x-spire::modal name="basic-modal" size="md">
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Modal Title</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <p>This is the modal content.</p>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button variant="bordered" @click="close()">Cancel</x-spire::button>
            <x-spire::button color="primary">Confirm</x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Confirmation Dialog

```blade
<x-spire::modal.trigger name="confirm-delete">
    <x-spire::button color="error">Delete Item</x-spire::button>
</x-spire::modal.trigger>

<x-spire::modal name="confirm-delete" size="sm">
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Confirm Deletion</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <p>Are you sure you want to delete this item? This action cannot be undone.</p>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button variant="bordered" @click="close()">Cancel</x-spire::button>
            <x-spire::button color="error" wire:click="deleteItem">Delete</x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Non-Dismissible Modal

Prevent closing via backdrop click or Escape key:

```blade
<x-spire::modal name="required-action" :dismissible="false">
    <x-slot:header>
        <x-spire::modal.header :closable="false">
            <x-spire::modal.title>Action Required</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <p>You must complete this action before continuing.</p>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button color="primary" wire:click="completeAction">
                Complete
            </x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Flyout Panel (Right Sidebar)

```blade
<x-spire::modal.trigger name="edit-panel">
    <x-spire::button>Edit Details</x-spire::button>
</x-spire::modal.trigger>

<x-spire::modal
    name="edit-panel"
    variant="flyout"
    position="right"
    size="lg"
>
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Edit Product</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <div class="space-y-4">
        <x-spire::field label="Name">
            <x-spire::input wire:model="form.name" />
        </x-spire::field>

        <x-spire::field label="Description">
            <x-spire::textarea wire:model="form.description" />
        </x-spire::field>

        <x-spire::field label="Price">
            <x-spire::input type="number" wire:model="form.price" />
        </x-spire::field>
    </div>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button variant="bordered" @click="close()">Cancel</x-spire::button>
            <x-spire::button color="primary" wire:click="save">Save Changes</x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Left-Side Navigation Drawer

```blade
<x-spire::modal.trigger name="nav-drawer">
    <x-spire::button icon-only variant="ghost" aria-label="Open menu">
        <x-spire::icon name="menu" />
    </x-spire::button>
</x-spire::modal.trigger>

<x-spire::modal
    name="nav-drawer"
    variant="flyout"
    position="left"
    size="sm"
    padding="no-padding"
>
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Navigation</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <nav class="flex flex-col">
        <a href="/dashboard" class="px-6 py-3 hover:bg-surface">Dashboard</a>
        <a href="/products" class="px-6 py-3 hover:bg-surface">Products</a>
        <a href="/orders" class="px-6 py-3 hover:bg-surface">Orders</a>
        <a href="/customers" class="px-6 py-3 hover:bg-surface">Customers</a>
        <a href="/settings" class="px-6 py-3 hover:bg-surface">Settings</a>
    </nav>
</x-spire::modal>
```

### Modal with Livewire wire:model

Bind modal open state to a Livewire property:

```php
// In your Livewire component
public bool $showCreateModal = false;

public function openCreateModal()
{
    $this->reset('form');
    $this->showCreateModal = true;
}

public function save()
{
    $this->validate();
    // Save logic...
    $this->showCreateModal = false;
}
```

```blade
<x-spire::button wire:click="openCreateModal">Create Item</x-spire::button>

<x-spire::modal wire:model="showCreateModal" size="lg">
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Create New Item</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <div class="space-y-4">
        <x-spire::field label="Name" error="form.name">
            <x-spire::input wire:model="form.name" />
        </x-spire::field>

        <x-spire::field label="Email" error="form.email">
            <x-spire::input type="email" wire:model="form.email" />
        </x-spire::field>
    </div>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button variant="bordered" @click="$wire.showCreateModal = false">
                Cancel
            </x-spire::button>
            <x-spire::button color="primary" wire:click="save">
                Create
            </x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Modal with Custom Padding

```blade
<x-spire::modal name="image-preview" size="2xl" padding="no-padding">
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Image Preview</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <img src="{{ $imageUrl }}" alt="Preview" class="w-full" />
</x-spire::modal>
```

### Large Modal with Scrollable Content

```blade
<x-spire::modal name="terms-modal" size="xl">
    <x-slot:header>
        <x-spire::modal.header>
            <x-spire::modal.title>Terms of Service</x-spire::modal.title>
        </x-spire::modal.header>
    </x-slot:header>

    <div class="prose prose-sm max-h-96 overflow-y-auto">
        {{-- Long content here --}}
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing this service...</p>
        {{-- More content --}}
    </div>

    <x-slot:footer>
        <x-spire::modal.footer>
            <x-spire::button variant="bordered" @click="close()">Decline</x-spire::button>
            <x-spire::button color="primary" wire:click="acceptTerms">Accept</x-spire::button>
        </x-spire::modal.footer>
    </x-slot:footer>
</x-spire::modal>
```

### Listening to Modal Events

```blade
<div
    @spire-modal-opened.window="handleOpened($event.detail)"
    @spire-modal-closed.window="handleClosed($event.detail)"
>
    {{-- Your content --}}
</div>
```

```javascript
function handleOpened(detail) {
    if (detail.name === 'my-modal') {
        console.log('My modal opened');
    }
}

function handleClosed(detail) {
    if (detail.name === 'my-modal') {
        console.log('My modal closed');
    }
}
```

---

## Opening and Closing Modals

### Method 1: Using modal.trigger

The simplest way to open a modal:

```blade
<x-spire::modal.trigger name="my-modal">
    <x-spire::button>Open Modal</x-spire::button>
</x-spire::modal.trigger>
```

### Method 2: Custom Event Dispatch

Open, close, or toggle modals from anywhere:

```blade
{{-- From Alpine.js --}}
<x-spire::button @click="$dispatch('spire-modal-open-my-modal')">
    Open
</x-spire::button>

<x-spire::button @click="$dispatch('spire-modal-close-my-modal')">
    Close
</x-spire::button>

<x-spire::button @click="$dispatch('spire-modal-toggle-my-modal')">
    Toggle
</x-spire::button>
```

```javascript
// From vanilla JavaScript
window.dispatchEvent(new CustomEvent('spire-modal-open-my-modal'));
window.dispatchEvent(new CustomEvent('spire-modal-close-my-modal'));
window.dispatchEvent(new CustomEvent('spire-modal-toggle-my-modal'));
```

### Method 3: Livewire wire:model

Bind to a boolean property that controls the modal state:

```blade
<x-spire::modal wire:model="showModal">
    {{-- Content --}}
</x-spire::modal>
```

The modal automatically:
- Opens when the property becomes `true`
- Closes when the property becomes `false`
- Updates the property when closed via backdrop/Escape

### Closing from Inside the Modal

Use the `close()` method available within the modal's Alpine scope:

```blade
<x-spire::button @click="close()">Cancel</x-spire::button>
```

---

## Events

### spire-modal-opened

Dispatched when a modal opens.

```javascript
{
    id: 'modal-element-id',
    name: 'my-modal',
    value: true,
    timestamp: 1699999999999
}
```

### spire-modal-closed

Dispatched when a modal closes.

```javascript
{
    id: 'modal-element-id',
    name: 'my-modal',
    value: false,
    timestamp: 1699999999999
}
```

### spire-modal-cancelled

Dispatched when a modal is closed via Escape key or backdrop click (only when dismissible).

```javascript
{
    id: 'modal-element-id',
    name: 'my-modal',
    value: false,
    timestamp: 1699999999999
}
```

### Listening in Livewire

```php
use Livewire\Attributes\On;

#[On('spire-modal-closed')]
public function handleModalClosed($detail)
{
    if ($detail['name'] === 'create-modal') {
        $this->resetForm();
    }
}
```

---

## Best Practices

### Do

- Use `name` prop for modals that need programmatic control
- Use `wire:model` for form modals to easily reset state on close
- Use `sm` size for simple confirmations, `lg` or `xl` for forms
- Use flyout variant for editing panels and navigation drawers
- Provide clear action buttons in the footer
- Use `dismissible="false"` only for critical actions that must be completed
- Close modal after successful form submission

### Don't

- Don't nest modals inside other modals
- Don't use modals for simple notifications (use toasts instead)
- Don't make modals too tall - use scrollable body content instead
- Don't forget to handle the close action in footer buttons
- Don't use `full` size unless absolutely necessary
- Don't remove the close button without providing another way to close
- Don't add extra padding to content - the modal body has default padding (`p-6`). Use `padding="no-padding"` prop if you need custom padding control

---

## Accessibility

- Uses native `<dialog>` element with `role="dialog"` and `aria-modal="true"`
- Automatic `aria-labelledby` linking to modal title
- Close button has accessible label
- Focus is trapped within the modal when open
- Escape key closes the modal (respects `dismissible` prop)
- Page scroll is locked when modal is open
- Returns focus to trigger element on close

---

## Technical Notes

### Size Reference

**Centered Modal Widths:**

| Size | Max Width |
|------|-----------|
| `sm` | 24rem (384px) |
| `md` | 28rem (448px) |
| `lg` | 32rem (512px) |
| `xl` | 36rem (576px) |
| `2xl` | 42rem (672px) |
| `full` | 100% (with margin) |

**Flyout Widths:**

| Size | Width |
|------|-------|
| `sm` | 16rem (256px) |
| `md` | 20rem (320px) |
| `lg` | 24rem (384px) |
| `xl` | 28rem (448px) |
| `2xl` | 32rem (512px) |
| `full` | 100% |

### Animations

- **Centered modal**: Scales from 0.95 to 1.0 with fade-in
- **Flyout**: Slides in from left or right edge
- **Backdrop**: Fades in with blur effect

All animations use 200ms duration with ease-out timing.

### Default Padding

The modal body has default padding applied. When placing content directly in the modal (not in header/footer), it will have this padding:

| Padding Prop | Value |
|--------------|-------|
| `default` | `p-6` (24px) |
| `sm` | `p-4` (16px) |
| `lg` | `p-8` (32px) |
| `no-padding` | `p-0` (0px) |

**Note:** Don't wrap your content in additional padding divs - use the `padding` prop to control spacing.

### Translations

The modal component supports these translation keys under `spire-ui::spire-ui.modal`:

- `close` - "Close modal"
- `confirm_title` - "Confirm action"
- `confirm_message` - "Are you sure you want to proceed?"
