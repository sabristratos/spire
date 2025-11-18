# Toast Component

Notification system for displaying temporary messages to users. Supports auto-dismiss, stacking, multiple positions, and both JavaScript and Livewire triggering methods.

## Props

### Toast.container

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | string | `'bottom-right'` | Position on screen: `top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right` |
| `duration` | integer | `5000` | Default auto-dismiss duration in milliseconds |
| `variant` | string | `'solid'` | Default visual variant: `solid`, `soft` |

---

## Toast Options

When triggering a toast, you can pass these options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | `''` | Toast heading text |
| `message` | string | `''` | Toast body text |
| `color` | string | `'default'` | Color scheme: `default`, `success`, `error`, `warning`, `info` |
| `variant` | string | Container default | Visual variant: `solid`, `soft` |
| `duration` | integer | Container default | Auto-dismiss time in ms (0 = no auto-dismiss) |
| `dismissible` | boolean | `true` | Show/hide close button |
| `showProgress` | boolean | `false` | Show countdown progress bar |

---

## Examples

### Basic Setup

Add the toast container to your layout (typically before closing `</body>`):

```blade
{{-- In your layout file --}}
<x-spire::toast.container />
```

### Custom Position and Duration

```blade
<x-spire::toast.container
    position="top-right"
    :duration="3000"
/>
```

### Soft Variant Container

```blade
<x-spire::toast.container
    position="bottom-center"
    variant="soft"
/>
```

### Triggering from JavaScript

Use the global `toast` helper to show notifications:

```blade
{{-- Success toast --}}
<x-spire::button
    @click="toast.success('Saved!', 'Your changes have been saved')"
>
    Save Changes
</x-spire::button>

{{-- Error toast --}}
<x-spire::button
    @click="toast.error('Error!', 'Something went wrong')"
    color="error"
>
    Delete
</x-spire::button>

{{-- Info toast --}}
<x-spire::button
    @click="toast.info('Info', 'This is an informational message')"
    variant="bordered"
>
    Show Info
</x-spire::button>

{{-- Warning toast --}}
<x-spire::button
    @click="toast.warning('Warning', 'Please review before continuing')"
    color="warning"
>
    Proceed
</x-spire::button>
```

### With Custom Options

```blade
<x-spire::button
    @click="toast.success('Uploaded!', 'File uploaded successfully', {
        duration: 8000,
        showProgress: true
    })"
>
    Upload File
</x-spire::button>
```

### Persistent Toast (No Auto-Dismiss)

```blade
<x-spire::button
    @click="toast.warning('Important Notice', 'This requires your attention', {
        duration: 0,
        dismissible: true
    })"
>
    Show Important Notice
</x-spire::button>
```

### Non-Dismissible Toast

```blade
<x-spire::button
    @click="toast.show('Processing...', 'Please wait while we complete your request', {
        duration: 0,
        dismissible: false,
        color: 'default'
    })"
>
    Start Processing
</x-spire::button>
```

### Multiple Toasts

```javascript
// Show multiple toasts in sequence
toast.success('Step 1', 'First step completed');
setTimeout(() => toast.info('Step 2', 'Second step in progress'), 500);
setTimeout(() => toast.success('Step 3', 'All steps completed!'), 1000);
```

### Triggering from Livewire

Dispatch the `spire-toast-add` event from your Livewire component:

```php
// In your Livewire component
public function save()
{
    // ... save logic ...

    $this->dispatch('spire-toast-add', [
        'title' => 'Success!',
        'message' => 'Record saved successfully.',
        'color' => 'success',
    ]);
}

public function delete()
{
    // ... delete logic ...

    $this->dispatch('spire-toast-add', [
        'title' => 'Deleted',
        'message' => 'Record has been removed.',
        'color' => 'error',
        'duration' => 3000,
    ]);
}

public function processWithFeedback()
{
    $this->dispatch('spire-toast-add', [
        'title' => 'Processing...',
        'message' => 'Please wait.',
        'color' => 'default',
        'duration' => 0,
        'dismissible' => false,
    ]);

    // ... long process ...

    $this->dispatch('spire-toast-add', [
        'title' => 'Complete!',
        'message' => 'Processing finished successfully.',
        'color' => 'success',
    ]);
}
```

### With Progress Bar

```blade
<x-spire::button
    @click="toast.info('Uploading...', 'Your file is being uploaded', {
        showProgress: true,
        duration: 10000
    })"
>
    Upload with Progress
</x-spire::button>
```

### Using Custom Event Dispatch

```javascript
// Dispatch event directly
window.dispatchEvent(new CustomEvent('spire-toast-add', {
    detail: {
        title: 'Custom Toast',
        message: 'This was triggered via CustomEvent',
        color: 'info',
        variant: 'soft',
        duration: 7000,
        dismissible: true,
        showProgress: true
    }
}));
```

### Listening to Toast Events

```javascript
// Listen for when toasts are shown
window.addEventListener('spire-toast-shown', (event) => {
    console.log('Toast shown:', event.detail.id, event.detail.toast.title);
});

// Listen for when toasts are hidden
window.addEventListener('spire-toast-hidden', (event) => {
    console.log('Toast hidden:', event.detail.id);
});
```

---

## JavaScript API

The global `toast` helper provides convenient methods for triggering notifications:

### Methods

| Method | Description |
|--------|-------------|
| `toast.show(title, message, options)` | Show a generic toast with custom options |
| `toast.success(title, message, options)` | Show a success toast (green) |
| `toast.error(title, message, options)` | Show an error toast (red) |
| `toast.warning(title, message, options)` | Show a warning toast (yellow) |
| `toast.info(title, message, options)` | Show an info toast (blue) |

### Options Parameter

All methods accept an optional third parameter with these options:

```javascript
{
    duration: 5000,        // Auto-dismiss time in ms (0 = no auto-dismiss)
    dismissible: true,     // Show close button
    showProgress: false,   // Show countdown progress bar
    variant: 'solid'       // Visual variant: 'solid' or 'soft'
}
```

### Examples

```javascript
// Basic usage
toast.success('Saved!', 'Your changes have been saved');

// With custom duration
toast.error('Error!', 'Something went wrong', { duration: 8000 });

// With progress bar
toast.info('Uploading...', 'Please wait', {
    showProgress: true,
    duration: 10000
});

// Persistent toast
toast.warning('Important', 'Please read carefully', { duration: 0 });

// Soft variant
toast.success('Done!', 'Task completed', { variant: 'soft' });
```

---

## Events

| Event | Detail | Description |
|-------|--------|-------------|
| `spire-toast-add` | Toast options object | Dispatch to add a new toast |
| `spire-toast-shown` | `{ id, toast }` | Fired when a toast is displayed |
| `spire-toast-hidden` | `{ id, toast }` | Fired when a toast is removed |

---

## Best Practices

### Do

- Place `<x-spire::toast.container />` once in your main layout
- Use appropriate colors for message types (success for confirmations, error for failures)
- Keep toast messages brief and actionable
- Use `showProgress` for longer-duration toasts so users know when they'll disappear
- Provide `dismissible: true` for most toasts so users can close them early
- Use persistent toasts (`duration: 0`) sparingly, only for critical information

### Don't

- Don't show too many toasts at once (more than 3-4 becomes overwhelming)
- Don't use toasts for critical errors that require user action - use modals instead
- Don't make toasts too long - they should be scannable at a glance
- Don't use non-dismissible toasts unless absolutely necessary
- Don't rely solely on toasts for important information - they disappear automatically

---

## Accessibility

- Toast container uses `role="region"` with `aria-label` for screen readers
- Individual toasts use `role="alert"` for immediate announcement
- Close buttons have accessible labels
- Toasts pause auto-dismiss timer on hover/focus
- Color is not the only indicator - icons are included for each type

---

## Technical Notes

### Positions

| Position | Description |
|----------|-------------|
| `top-left` | Top left corner |
| `top-center` | Top center |
| `top-right` | Top right corner |
| `bottom-left` | Bottom left corner |
| `bottom-center` | Bottom center |
| `bottom-right` | Bottom right corner (default) |

### Icons by Color

Each color type automatically displays an appropriate icon:

| Color | Icon |
|-------|------|
| `default` | bell |
| `success` | check-circle |
| `error` | alert-circle |
| `warning` | alert-triangle |
| `info` | info |

### Timer Behavior

- Timer pauses when user hovers over a toast
- Timer resumes when user moves mouse away
- Progress bar (if enabled) reflects remaining time
- Setting `duration: 0` disables auto-dismiss entirely

### Translations

The toast component supports these translation keys under `spire-ui::spire-ui.toast`:

- `close` - "Close notification"
