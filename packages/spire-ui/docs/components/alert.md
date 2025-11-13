# Alert Component

Temporary notifications that provide concise feedback about an action or event.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| null` | `null` | Alert title text |
| `description` | `string \| null` | `null` | Alert description/message text |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'default'` | Alert color variant |
| `variant` | `'solid' \| 'bordered' \| 'flat'` | `'flat'` | Visual style variant |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Border radius |
| `isClosable` | `boolean` | `false` | Show close button and enable dismissal |
| `hideIcon` | `boolean` | `false` | Hide the alert icon |
| `icon` | `string \| null` | `null` | Custom icon name (overrides default color-based icon) |

---

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main alert message content (overrides `description` prop) |
| `icon` | Custom icon component (overrides default icon) |
| `startContent` | Additional content before icon and message |
| `endContent` | Additional content after message (useful for action buttons) |

---

## Examples

### Basic Alert

```blade
<x-spire::alert
    title="This is an alert"
    description="Thanks for subscribing to our newsletter!"
/>
```

### Alert Colors

```blade
<x-spire::alert color="default" description="This is a default alert" />
<x-spire::alert color="primary" description="This is a primary alert" />
<x-spire::alert color="secondary" description="This is a secondary alert" />
<x-spire::alert color="success" description="This is a success alert" />
<x-spire::alert color="error" description="This is an error alert" />
<x-spire::alert color="warning" description="This is a warning alert" />
<x-spire::alert color="info" description="This is an info alert" />
```

### Alert Variants

```blade
<x-spire::alert variant="solid" description="This is a solid variant alert" />
<x-spire::alert variant="bordered" description="This is a bordered variant alert" />
<x-spire::alert variant="flat" description="This is a flat variant alert" />
```

### Border Radius

```blade
<x-spire::alert radius="none" description="This is a none radius alert" />
<x-spire::alert radius="sm" description="This is a sm radius alert" />
<x-spire::alert radius="md" description="This is a md radius alert" />
<x-spire::alert radius="lg" description="This is a lg radius alert" />
<x-spire::alert radius="full" description="This is a full radius alert" />
```

### Custom Icon

```blade
<x-spire::alert
    title="Custom Icon Alert"
    description="An alert with a custom icon"
    icon="heart"
    color="error"
/>
```

### Without Icon

```blade
<x-spire::alert
    title="This is an alert"
    description="Thanks for subscribing to our newsletter!"
    hide-icon
/>
```

### Closable Alert

```blade
<x-spire::alert
    title="Success Notification"
    description="Your action has been completed successfully."
    color="success"
    is-closable
/>
```

### With Action Buttons

```blade
<x-spire::alert
    title="You have no credits left"
    description="Upgrade to a paid plan to continue"
    color="warning"
>
    <x-slot:endContent>
        <x-spire::button size="sm" color="warning" variant="flat">
            Upgrade
        </x-spire::button>
    </x-slot:endContent>
</x-spire::alert>
```

### With Title and Description

```blade
<x-spire::alert
    title="Payment Successful"
    description="Your payment has been processed. You'll receive a confirmation email shortly."
    color="success"
    variant="bordered"
    is-closable
/>
```

### Using Slot for Description

```blade
<x-spire::alert title="Important Notice" color="info">
    Please read the <a href="#" class="underline font-medium">terms and conditions</a> before proceeding.
</x-spire::alert>
```

### Solid Variant with Actions

```blade
<x-spire::alert
    title="New update available"
    description="A new version of the app is ready to install."
    variant="solid"
    color="primary"
>
    <x-slot:endContent>
        <div class="flex gap-2">
            <x-spire::button size="sm" variant="bordered" color="primary">
                Later
            </x-spire::button>
            <x-spire::button size="sm" color="primary">
                Update Now
            </x-spire::button>
        </div>
    </x-slot:endContent>
</x-spire::alert>
```

### Custom Icon Slot

```blade
<x-spire::alert
    title="Custom Icon via Slot"
    description="This alert uses a custom icon component"
    color="info"
>
    <x-slot:icon>
        <x-spire::icon name="star-01" class="w-5 h-5" />
    </x-slot:icon>
</x-spire::alert>
```

---

## Best Practices

### Do

- Use appropriate colors to convey meaning (success for confirmations, error for failures, warning for cautions)
- Keep alert messages concise and actionable
- Use `title` for the main message and `description` for additional context
- Make alerts dismissible (`isClosable`) when they're not critical
- Use `endContent` for action buttons related to the alert
- Provide clear, specific messages that help users understand what happened
- Use consistent alert styling across your application

### Don't

- Don't use alerts for form validation errors (use field-level validation instead)
- Don't make critical system alerts dismissible (like errors that prevent app usage)
- Don't use too many alerts simultaneously (creates alert fatigue)
- Don't use solid variant for non-critical information (can be too prominent)
- Don't nest alerts inside each other
- Don't use alerts for permanent content (use cards or other components)
- Don't use long messages in alerts (keep them brief and scannable)
- Don't override the default icon unless there's a good reason (users expect certain icons for success/error/warning)

---

## Default Icons by Color

The alert automatically displays appropriate icons based on the `color` prop:

- **default, primary, secondary, info** → `info-circle` icon
- **success** → `check-circle` icon (checkmark)
- **error** → `alert-circle` icon (circle with exclamation)
- **warning** → `alert-triangle` icon (triangle with exclamation)

You can override this by providing a custom `icon` prop or using the `icon` slot.

---

## Accessibility

- Uses `role="alert"` for proper screen reader announcements
- Uses `aria-live="polite"` to announce dynamic changes
- Close button includes `aria-label="Close alert"` for screen readers
- Proper keyboard support for close button (focusable and activatable with Enter/Space)
- Sufficient color contrast for all variants and colors
- Icons provide visual reinforcement but don't rely solely on color to convey meaning

---

## Dismissal Behavior

When `isClosable` is set to `true`:
- A close button (X) appears in the top-right corner
- Clicking the close button triggers a smooth fade-out animation
- Alert is removed from the DOM after the animation completes
- Uses Alpine.js for client-side state management (fast, no server round-trip)
- Once dismissed, the alert cannot be restored (page refresh required)

For server-side dismissal control, use Livewire's `wire:model` with a visibility property instead.
