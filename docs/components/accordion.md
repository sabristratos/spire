# Accordion Component

Expandable panels for organizing content into collapsible sections with smooth animations.

---

## Accordion (Parent Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | string | `'bordered'` | Visual variant: `bordered`, `flat`, `shadow` |
| `color` | string | `'default'` | Color theme: `default`, `primary`, `secondary`, `success`, `error`, `warning`, `info` |
| `radius` | string | `'md'` | Border radius: `none`, `sm`, `md`, `lg`, `xl`, `2xl`, `full` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` (affects padding and text size) |
| `allowMultiple` | boolean | `false` | Allow multiple items to be open simultaneously |
| `defaultOpen` | int\|array | `null` | Index or array of indices to open by default |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Container for `<x-spire-ui::accordion.item>` components |

---

## Accordion.Item (Child Component)

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | `null` | Item title text |
| `subtitle` | string | `null` | Optional subtitle text |
| `isDisabled` | boolean | `false` | Disable the item (prevents opening/closing) |
| `hideIcon` | boolean | `false` | Hide the chevron icon |
| `icon` | string | `'chevron-down'` | Icon name (rotates when open) |
| `isOpen` | boolean | `false` | Initial open state (overridden by parent's `defaultOpen`) |
| `index` | int | `null` | Item index for single-open mode coordination |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Collapsible content |
| `title` | Custom title content (alternative to `title` prop) |
| `subtitle` | Custom subtitle content (alternative to `subtitle` prop) |
| `startContent` | Content before title (e.g., icon, avatar) |
| `endContent` | Content after title, before chevron (e.g., badge, status) |

---

## Examples

### Basic Accordion

```blade
<x-spire-ui::accordion>
    <x-spire-ui::accordion.item title="What is Spire UI?" :index="0">
        Spire UI is a modern TALL stack component library built with Laravel, Alpine.js, Livewire, and Tailwind CSS v4.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="How do I install it?" :index="1">
        Install Spire UI using Composer: <code>composer require stratos/spire-ui</code>
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Is it free?" :index="2">
        Yes! Spire UI is completely free and open source under the MIT license.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### Single Open Mode (Default)

Only one item can be open at a time:

```blade
<x-spire-ui::accordion :defaultOpen="0">
    <x-spire-ui::accordion.item title="Section 1" :index="0">
        This section opens by default. When you open another section, this one closes automatically.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Section 2" :index="1">
        Opening this section will close Section 1.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Section 3" :index="2">
        Only one section is open at a time in single-open mode.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### Multiple Open Mode

Allow multiple items to be open simultaneously:

```blade
<x-spire-ui::accordion :allowMultiple="true" :defaultOpen="[0, 2]">
    <x-spire-ui::accordion.item title="Section 1" :index="0">
        This section is open by default and stays open when others are clicked.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Section 2" :index="1">
        This section starts closed.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Section 3" :index="2">
        This section is also open by default. Multiple sections can be open at once!
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### Variants

```blade
{{-- Bordered (default) --}}
<x-spire-ui::accordion variant="bordered">
    <x-spire-ui::accordion.item title="Bordered Variant" :index="0">
        Border around the entire accordion with dividers between items.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>

{{-- Flat --}}
<x-spire-ui::accordion variant="flat">
    <x-spire-ui::accordion.item title="Flat Variant" :index="0">
        Subtle background with spacing between items.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>

{{-- Shadow --}}
<x-spire-ui::accordion variant="shadow">
    <x-spire-ui::accordion.item title="Shadow Variant" :index="0">
        Elevated appearance with shadow effect.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### Sizes

```blade
{{-- Small --}}
<x-spire-ui::accordion size="sm">
    <x-spire-ui::accordion.item title="Small Size" :index="0">
        Compact padding and smaller text.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>

{{-- Medium (default) --}}
<x-spire-ui::accordion size="md">
    <x-spire-ui::accordion.item title="Medium Size" :index="0">
        Standard padding and text size.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>

{{-- Large --}}
<x-spire-ui::accordion size="lg">
    <x-spire-ui::accordion.item title="Large Size" :index="0">
        Spacious padding and larger text.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### With Subtitles

```blade
<x-spire-ui::accordion>
    <x-spire-ui::accordion.item
        title="Account Settings"
        subtitle="Manage your profile and preferences"
        :index="0"
    >
        Update your email, password, notification settings, and more.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item
        title="Privacy & Security"
        subtitle="Control your data and security settings"
        :index="1"
    >
        Manage two-factor authentication, connected apps, and data privacy.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### With Custom Content

```blade
<x-spire-ui::accordion variant="flat" size="lg">
    <x-spire-ui::accordion.item :index="0">
        <x-slot:startContent>
            <x-spire-ui::icon name="user-01" class="w-5 h-5 text-primary" />
        </x-slot:startContent>

        <x-slot:title>
            <span class="text-primary">Account Information</span>
        </x-slot:title>

        <x-slot:endContent>
            <x-spire-ui::badge color="success" size="sm">Complete</x-spire-ui::badge>
        </x-slot:endContent>

        Your account has been verified and all information is up to date.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item :index="1">
        <x-slot:startContent>
            <x-spire-ui::icon name="bell-01" class="w-5 h-5 text-warning" />
        </x-slot:startContent>

        <x-slot:title>
            Notifications
        </x-slot:title>

        <x-slot:endContent>
            <x-spire-ui::badge color="warning" size="sm">Action Required</x-spire-ui::badge>
        </x-slot:endContent>

        You have 3 pending notification settings that need your attention.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

### Disabled Items

```blade
<x-spire-ui::accordion>
    <x-spire-ui::accordion.item title="Active Section" :index="0">
        This section is clickable and can be expanded.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item
        title="Disabled Section"
        subtitle="This feature is coming soon"
        :isDisabled="true"
        :index="1"
    >
        This content is not accessible yet.
    </x-spire-ui::accordion.item>

    <x-spire-ui::accordion.item title="Another Active Section" :index="2">
        This section is also clickable.
    </x-spire-ui::accordion.item>
</x-spire-ui::accordion>
```

---

## Accessibility

The Accordion component follows WCAG AA accessibility standards:

### ARIA Attributes

- Each item has `role="region"` for proper semantic structure
- Trigger buttons include `aria-expanded` (dynamically toggled)
- `aria-controls` links the button to its content panel
- `aria-labelledby` links the content panel back to its button
- Disabled items have `aria-disabled="true"`

### Keyboard Navigation

- **Tab**: Move focus between accordion item triggers
- **Enter/Space**: Toggle the focused item open/closed
- **Focus indicators**: Clear visual focus states for keyboard users

### Screen Readers

- State changes are announced automatically via `aria-expanded`
- Proper semantic structure with headings and regions
- Disabled items are announced as "disabled" to screen reader users

---

## Best Practices

### Do

- Use accordions to organize long content into scannable sections
- Keep titles concise and descriptive (1-5 words)
- Use single-open mode for mutually exclusive content (FAQs, settings categories)
- Use multiple-open mode when users need to reference multiple sections
- Provide clear subtitles when titles alone aren't descriptive enough
- Add visual indicators (icons, badges) to highlight important items
- Test with keyboard navigation to ensure full accessibility

### Don't

- Don't nest accordions inside other accordions (confusing UX)
- Don't hide critical actions or primary content inside closed accordions
- Don't use accordions for short content that fits comfortably on the page
- Don't disable items without providing clear reasoning (use subtitles)
- Don't remove the chevron icon unless you provide a clear alternative indicator
- Don't use more than 10-15 items (consider pagination or filtering instead)
- Don't use tiny text or insufficient padding (hurts readability)

---

## Technical Notes

### Alpine.js Integration

- Uses `x-collapse` directive for smooth height animations
- Single-open mode: Parent manages state with `openItem` variable
- Multiple-open mode: Each item manages its own `open` state
- Chevron rotation: CSS transition on the icon with `rotate-180` class

### Animation Performance

- Height animation uses Alpine's built-in collapse plugin
- Transitions use CSS `transition-transform` for optimal performance
- Icon rotation is GPU-accelerated via CSS transforms
- No JavaScript required for animations after initial render

### Livewire Compatibility

If using within Livewire components:
- Add `wire:ignore` to the accordion container if state needs to persist across Livewire updates
- Use `wire:model` on hidden inputs inside items if you need to sync state with Livewire

### Styling Customization

The Accordion component uses:
- `ComponentStyles` utility for consistent variant/color/size handling
- CSS custom properties from `theme.css` for colors and transitions
- Tailwind utility classes for layout and spacing
- `data-spire-*` attributes for targeting specific states in custom CSS
