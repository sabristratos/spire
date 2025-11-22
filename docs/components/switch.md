# Switch Component

Toggle switch component for binary on/off states. Features smooth animations, multiple sizes, colors, full keyboard accessibility, and optional icons. Perfect for settings, feature toggles, and preferences.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | string | `null` | Input name attribute |
| `value` | string | `'1'` | Value when checked |
| `checked` | boolean | `false` | Initial checked state |
| `disabled` | boolean | `false` | Disables the switch |
| `required` | boolean | `false` | Marks switch as required |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `color` | string | `'primary'` | Color when checked: `primary`, `secondary`, `success`, `error`, `warning`, `info`, `featured` |
| `radius` | string | `'full'` | Border radius: `none`, `sm`, `md`, `lg`, `full` |
| `label` | string | `null` | Label text displayed next to switch |
| `description` | string | `null` | Helper text displayed below label |
| `id` | string | `null` | Custom ID (auto-generated if not provided) |
| `position` | string | `'right'` | Position of the switch track: `left`, `right` |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Custom label content (overrides `label` and `description` props) |
| `uncheckedIcon` | Icon shown when switch is OFF |
| `checkedIcon` | Icon shown when switch is ON |

---

## Examples

### Basic Switch

Simple toggle with label:

```blade
<x-spire::switch label="Enable notifications" />
```

### With Livewire

Two-way data binding with Livewire:

```blade
<x-spire::switch
    wire:model="notifications"
    label="Email notifications"
/>
```

### With Description

Add helper text below the label:

```blade
<x-spire::switch
    wire:model="darkMode"
    label="Dark Mode"
    description="Enable dark theme across the application"
/>
```

### Different Sizes

Control the switch dimensions:

```blade
{{-- Small --}}
<x-spire::switch size="sm" label="Small switch" />

{{-- Medium (default) --}}
<x-spire::switch size="md" label="Medium switch" />

{{-- Large --}}
<x-spire::switch size="lg" label="Large switch" />
```

### Color Variants

Apply color themes for different contexts:

```blade
{{-- Primary (default) --}}
<x-spire::switch color="primary" label="Primary" checked />

{{-- Secondary --}}
<x-spire::switch color="secondary" label="Secondary" checked />

{{-- Success --}}
<x-spire::switch color="success" label="Active" checked />

{{-- Error --}}
<x-spire::switch color="error" label="Delete Mode" checked />

{{-- Warning --}}
<x-spire::switch color="warning" label="Maintenance" checked />

{{-- Info --}}
<x-spire::switch color="info" label="Info Mode" checked />
```

### With Icons

Add visual indicators for on/off states:

```blade
<x-spire::switch
    wire:model="darkMode"
    label="Dark Mode"
    checked
>
    <x-slot:uncheckedIcon>
        <x-spire::icon name="sun" class="text-yellow-500" />
    </x-slot:uncheckedIcon>

    <x-slot:checkedIcon>
        <x-spire::icon name="moon" class="text-white" />
    </x-slot:checkedIcon>
</x-spire::switch>
```

### Disabled State

Prevent user interaction:

```blade
{{-- Disabled unchecked --}}
<x-spire::switch disabled label="Disabled off" />

{{-- Disabled checked --}}
<x-spire::switch disabled checked label="Disabled on" />
```

### Required Field

Mark as required for form validation:

```blade
<x-spire::switch
    wire:model="acceptTerms"
    label="Accept Terms and Conditions"
    required
/>
```

### Custom Slot Content

Use custom HTML for advanced layouts:

```blade
<x-spire::switch wire:model="emailNotifications">
    <div class="flex items-start gap-2">
        <x-spire::icon name="mail" class="text-primary" />
        <div>
            <div class="font-medium">Email Notifications</div>
            <div class="text-sm text-text-muted">
                Receive updates about your account activity
            </div>
        </div>
    </div>
</x-spire::switch>
```

### Settings Panel

Group multiple switches in a settings interface:

```blade
<div class="space-y-4">
    <h3 class="text-lg font-semibold">Notification Settings</h3>

    <x-spire::switch
        wire:model="notifications.email"
        label="Email Notifications"
        description="Receive email updates about your account"
    />

    <x-spire::separator />

    <x-spire::switch
        wire:model="notifications.push"
        label="Push Notifications"
        description="Get push notifications on your device"
    />

    <x-spire::separator />

    <x-spire::switch
        wire:model="notifications.sms"
        label="SMS Notifications"
        description="Receive text messages for important updates"
    />
</div>
```

### Feature Toggle List

Create a list of toggleable features:

```blade
<x-spire::card>
    <x-spire::card.header>
        <x-spire::card.title>Features</x-spire::card.title>
    </x-spire::card.header>

    <x-spire::card.body class="space-y-4">
        <x-spire::switch
            wire:model="features.analytics"
            label="Analytics"
            description="Track user behavior and site performance"
            color="success"
        />

        <x-spire::switch
            wire:model="features.api"
            label="API Access"
            description="Enable API endpoints for external integrations"
            color="primary"
        />

        <x-spire::switch
            wire:model="features.beta"
            label="Beta Features"
            description="Enable experimental features (may be unstable)"
            color="warning"
        />
    </x-spire::card.body>
</x-spire::card>
```

### Privacy Controls

Use switches for privacy and security settings:

```blade
<div class="space-y-4">
    <h3 class="text-lg font-semibold">Privacy Settings</h3>

    <x-spire::switch
        wire:model="privacy.profilePublic"
        label="Public Profile"
        description="Make your profile visible to everyone"
        color="success"
        checked
    />

    <x-spire::switch
        wire:model="privacy.showEmail"
        label="Show Email"
        description="Display your email on your public profile"
        color="primary"
    />

    <x-spire::switch
        wire:model="privacy.allowMessages"
        label="Allow Direct Messages"
        description="Let other users send you messages"
        color="primary"
        checked
    />

    <x-spire::switch
        wire:model="privacy.twoFactor"
        label="Two-Factor Authentication"
        description="Require 2FA for account security"
        color="success"
        checked
    />
</div>
```

### Table Row Actions

Use switches in data tables for quick toggles:

```blade
<table class="w-full">
    <thead>
        <tr>
            <th>User</th>
            <th>Status</th>
            <th>Admin</th>
        </tr>
    </thead>
    <tbody>
        @foreach($users as $user)
            <tr>
                <td>{{ $user->name }}</td>
                <td>
                    <x-spire::switch
                        wire:model="users.{{ $user->id }}.active"
                        size="sm"
                        color="success"
                        :checked="$user->active"
                    />
                </td>
                <td>
                    <x-spire::switch
                        wire:model="users.{{ $user->id }}.is_admin"
                        size="sm"
                        color="warning"
                        :checked="$user->is_admin"
                    />
                </td>
            </tr>
        @endforeach
    </tbody>
</table>
```

### Live Updates

Use live updates for instant feedback:

```blade
<div>
    <x-spire::switch
        wire:model.live="maintenanceMode"
        label="Maintenance Mode"
        description="Put the site into maintenance mode"
        color="error"
    />

    @if($maintenanceMode)
        <x-spire::alert color="warning" class="mt-4">
            Site is now in maintenance mode. Only admins can access.
        </x-spire::alert>
    @endif
</div>
```

---

## Best Practices

### Do

✅ **Use for binary states** - Perfect for on/off, enable/disable scenarios
```blade
<x-spire::switch label="Enable feature" />
```

✅ **Provide clear labels** - Users should understand what the switch controls
```blade
<x-spire::switch
    label="Dark Mode"
    description="Enable dark theme"
/>
```

✅ **Use appropriate colors** - Match colors to context
```blade
<x-spire::switch color="success" label="Account Active" />
<x-spire::switch color="error" label="Delete on Exit" />
```

✅ **Add descriptions for complex settings** - Explain what the switch does
```blade
<x-spire::switch
    label="Two-Factor Authentication"
    description="Require a verification code when signing in"
/>
```

✅ **Group related switches** - Use separators for clarity
```blade
<x-spire::switch label="Email" />
<x-spire::separator />
<x-spire::switch label="Push" />
```

### Don't

❌ **Don't use for more than two options** - Use Radio or Select instead
```blade
{{-- Bad: Multiple exclusive options --}}
<x-spire::switch label="Theme: Light" />
<x-spire::switch label="Theme: Dark" />
<x-spire::switch label="Theme: Auto" />

{{-- Good: Use radio group --}}
<x-spire::radio-group name="theme">
    <x-spire::radio value="light" label="Light" />
    <x-spire::radio value="dark" label="Dark" />
    <x-spire::radio value="auto" label="Auto" />
</x-spire::radio-group>
```

❌ **Don't use unclear labels** - Be specific about what toggles
```blade
{{-- Bad: Vague label --}}
<x-spire::switch label="Setting" />

{{-- Good: Clear label --}}
<x-spire::switch label="Enable email notifications" />
```

❌ **Don't require confirmation for switches** - Switches should act immediately
```blade
{{-- Bad: Modal confirmation --}}
<x-spire::switch wire:click="confirmDelete" label="Delete Mode" />

{{-- Good: Direct toggle or use button --}}
<x-spire::switch wire:model.live="deleteMode" label="Delete Mode" />
```

❌ **Don't nest switches in other interactive elements** - Creates accessibility issues

---

## Accessibility

### ARIA Attributes

The Switch component implements proper ARIA attributes automatically:

- `role="switch"` - Identifies as a toggle switch
- `aria-checked` - Announces current state (true/false)
- `aria-labelledby` - Links to label text
- `aria-describedby` - Links to description text
- `aria-required` - Indicates required fields

### Keyboard Navigation

- **Tab**: Focus on switch
- **Space**: Toggle switch state
- **Enter**: Toggle switch state (when focused)

### Screen Reader Support

- State changes are announced automatically
- Labels and descriptions are properly associated
- Required indicators are included in label

### Visual Focus

Clear focus indicators appear when navigating via keyboard:
- Outline ring in component color
- 2px outline offset for visibility

---

## Technical Notes

### Styling

Switches use BEM-style class naming:

```css
.spire-switch-track {
    /* Track (background) */
}

.spire-switch-thumb {
    /* Sliding thumb */
}

.spire-switch-label {
    /* Label text */
}

.spire-switch-description {
    /* Description text */
}
```

### Animation

Smooth transitions on state changes:
- **Thumb slide**: 150ms with smooth easing
- **Background color**: 150ms fade
- **Icon opacity**: 150ms fade

### Livewire Integration

Use standard Livewire wire:model directives:

```blade
{{-- Standard binding --}}
<x-spire::switch wire:model="enabled" />

{{-- Live binding (instant updates) --}}
<x-spire::switch wire:model.live="enabled" />
```

### Form Submission

Switches work like standard checkboxes in forms:

```blade
<form wire:submit="save">
    <x-spire::switch name="notifications" value="1" />
    <x-spire::button type="submit">Save</x-spire::button>
</form>
```

When checked, submits `notifications=1`. When unchecked, nothing is submitted.

### Dark Mode

Switches automatically adapt to dark mode:
- Unchecked state: `neutral-300` (light), `neutral-600` (dark)
- Checked state: Theme colors remain vibrant
- Thumb: Always white with subtle shadow

---

## Related Components

- **[Checkbox](checkbox.md)** - For multi-select scenarios and lists
- **[Radio](radio.md)** - For exclusive single selection from multiple options
- **[Field](field.md)** - Form field wrapper with labels and errors
- **[Button](button.md)** - For actions rather than state changes

---

## Common Patterns

### Settings Page

```blade
<x-spire::card>
    <x-spire::card.header>
        <x-spire::card.title>Account Settings</x-spire::card.title>
    </x-spire::card.header>

    <x-spire::card.body class="space-y-4">
        <div>
            <h4 class="font-medium mb-3">Notifications</h4>
            <div class="space-y-3">
                <x-spire::switch
                    wire:model="settings.emailNotifications"
                    label="Email Notifications"
                    description="Receive updates via email"
                />

                <x-spire::switch
                    wire:model="settings.pushNotifications"
                    label="Push Notifications"
                    description="Get real-time notifications"
                />
            </div>
        </div>

        <x-spire::separator />

        <div>
            <h4 class="font-medium mb-3">Privacy</h4>
            <div class="space-y-3">
                <x-spire::switch
                    wire:model="settings.profilePublic"
                    label="Public Profile"
                    description="Make your profile visible"
                    color="success"
                />

                <x-spire::switch
                    wire:model="settings.showActivity"
                    label="Show Activity"
                    description="Display your activity status"
                />
            </div>
        </div>
    </x-spire::card.body>

    <x-spire::card.footer>
        <x-spire::button wire:click="save">
            Save Settings
        </x-spire::button>
    </x-spire::card.footer>
</x-spire::card>
```

### Conditional Content

```blade
<div>
    <x-spire::switch
        wire:model.live="showAdvanced"
        label="Show Advanced Options"
        color="primary"
    />

    @if($showAdvanced)
        <div class="mt-4 p-4 bg-surface rounded-lg space-y-3">
            <x-spire::switch
                wire:model="advanced.debug"
                label="Debug Mode"
                description="Enable detailed logging"
                color="warning"
            />

            <x-spire::switch
                wire:model="advanced.caching"
                label="Advanced Caching"
                description="Use aggressive caching strategies"
                color="success"
            />
        </div>
    @endif
</div>
```

### Confirmation Required

```blade
<div>
    <x-spire::switch
        wire:model.live="dangerousMode"
        label="Danger Mode"
        description="Enable destructive operations"
        color="error"
    />

    @if($dangerousMode && !$confirmed)
        <x-spire::alert color="error" class="mt-4">
            <p class="font-medium">Warning!</p>
            <p>This will allow destructive operations. Are you sure?</p>

            <div class="flex gap-2 mt-3">
                <x-spire::button
                    wire:click="confirmDangerMode"
                    color="error"
                    size="sm"
                >
                    Confirm
                </x-spire::button>

                <x-spire::button
                    wire:click="$set('dangerousMode', false)"
                    variant="ghost"
                    size="sm"
                >
                    Cancel
                </x-spire::button>
            </div>
        </x-spire::alert>
    @endif
</div>
```
