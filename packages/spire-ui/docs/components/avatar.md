# Avatar Component

Avatar component displays user profile pictures, initials, or fallback icons. Includes grouping functionality for displaying multiple avatars.

---

## Props

### Avatar (Main Component)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string \| null` | `null` | Image URL for the avatar |
| `name` | `string \| null` | `null` | User name for generating initials fallback |
| `alt` | `string` | `''` | Alt text for the image (uses name if not provided) |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Avatar size |
| `radius` | `'none' \| 'sm' \| 'md' \| 'lg' \| 'full'` | `'full'` | Border radius |
| `color` | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `'primary'` | Background color for initials fallback |
| `isBordered` | `boolean` | `false` | Show border ring around avatar |
| `isDisabled` | `boolean` | `false` | Disabled state with reduced opacity |
| `showFallback` | `boolean` | `true` | Show fallback (initials or icon) when image fails |

### Avatar.Group

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | Avatar size | `'md'` | Size applied to all avatars in group |
| `isGrid` | `boolean` | `false` | Display in grid layout instead of stacked |
| `isBordered` | `boolean` | `false` | Apply border to all avatars in group |
| `ariaLabel` | `string \| null` | `null` | Accessible label for the avatar group |

### Avatar.Overflow

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `count` | `number` | `0` | Number to display (e.g., "+5") |
| `size` | Avatar size | `'md'` | Size matching avatar group |
| `color` | Color variant | `'neutral'` | Background color |
| `isBordered` | `boolean` | `false` | Show border ring |

---

## Slots

### Avatar Slots

| Slot | Description |
|------|-------------|
| `icon` | Custom fallback icon (overrides default user icon) |

### Avatar.Group Slots

| Slot | Description |
|------|-------------|
| `default` | Avatar components to display in the group |

---

## Examples

### Basic Avatar

```blade
{{-- With image --}}
<x-spire::avatar src="https://i.pravatar.cc/150?u=1" alt="John Doe" />

{{-- With initials --}}
<x-spire::avatar name="John Doe" />

{{-- With fallback icon --}}
<x-spire::avatar />
```

### Avatar Sizes

```blade
<x-spire::avatar name="JD" size="sm" />
<x-spire::avatar name="JD" size="md" />
<x-spire::avatar name="JD" size="lg" />
<x-spire::avatar name="JD" size="xl" />
<x-spire::avatar name="JD" size="2xl" />
```

### Avatar Colors

```blade
<x-spire::avatar name="JD" color="default" />
<x-spire::avatar name="JD" color="primary" />
<x-spire::avatar name="JD" color="secondary" />
<x-spire::avatar name="JD" color="success" />
<x-spire::avatar name="JD" color="error" />
<x-spire::avatar name="JD" color="warning" />
<x-spire::avatar name="JD" color="info" />
```

### Bordered Avatar

```blade
<x-spire::avatar src="https://i.pravatar.cc/150?u=1" is-bordered />
<x-spire::avatar name="Jane Doe" is-bordered />
```

### Border Radius Variations

```blade
<x-spire::avatar name="JD" radius="none" />
<x-spire::avatar name="JD" radius="sm" />
<x-spire::avatar name="JD" radius="md" />
<x-spire::avatar name="JD" radius="lg" />
<x-spire::avatar name="JD" radius="full" />
```

### Disabled State

```blade
<x-spire::avatar src="https://i.pravatar.cc/150?u=1" is-disabled />
<x-spire::avatar name="John Doe" is-disabled />
```

### Custom Fallback Icon

```blade
<x-spire::avatar>
    <x-slot:icon>
        <x-spire::icon name="user-circle" class="w-full h-full" />
    </x-slot:icon>
</x-spire::avatar>
```

### Avatar Group (Stacked)

```blade
<x-spire::avatar.group>
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=2" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=3" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=4" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=5" />
</x-spire::avatar.group>
```

### Avatar Group with Overflow Count

```blade
<x-spire::avatar.group>
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=2" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=3" />
    <x-spire::avatar.overflow :count="12" />
</x-spire::avatar.group>
```

### Avatar Group with Dynamic Overflow

```blade
@php
    $users = User::take(3)->get();
    $totalUsers = User::count();
    $remaining = $totalUsers - 3;
@endphp

<x-spire::avatar.group>
    @foreach($users as $user)
        <x-spire::avatar :src="$user->avatar" :name="$user->name" />
    @endforeach

    @if($remaining > 0)
        <x-spire::avatar.overflow :count="$remaining" />
    @endif
</x-spire::avatar.group>
```

### Avatar Group Grid Layout

```blade
<x-spire::avatar.group is-grid>
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=2" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=3" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=4" />
</x-spire::avatar.group>
```

### Avatar Group with Borders

```blade
<x-spire::avatar.group is-bordered>
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=2" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=3" />
</x-spire::avatar.group>
```

### Avatar Group with Size

```blade
<x-spire::avatar.group size="lg">
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=2" />
    <x-spire::avatar src="https://i.pravatar.cc/150?u=3" />
</x-spire::avatar.group>
```

### With Badge (Status Indicator)

```blade
<x-spire::badge.container is-dot color="success" placement="bottom-right">
    <x-spire::avatar src="https://i.pravatar.cc/150?u=1" />
</x-spire::badge.container>
```

---

## Best Practices

### Do

- Use `name` prop to generate initials as fallback (e.g., "John Doe" → "JD")
- Provide meaningful `alt` text for accessibility
- Use `isBordered` to make avatars stand out on images or busy backgrounds
- Use Avatar.Group for displaying team members, collaborators, or participants
- Use Avatar.Overflow to show remaining count in groups with many users
- Use `isGrid` layout for avatar grids in settings or team pages
- Combine with Badge.Container for online/offline status indicators
- Use consistent sizing across your application
- Limit displayed avatars in groups (show 3-5, then use overflow count)

### Don't

- Don't use avatars for non-human entities (use icons or logos instead)
- Don't forget alt text for images (important for screen readers)
- Don't use very small sizes (sm) for photos with important details
- Don't display too many avatars in a stacked group (limit to 3-5)
- Don't nest avatar groups inside each other
- Don't use `showFallback="false"` without providing both src and handling errors
- Don't use initials for security-sensitive contexts (not unique identifiers)
- Don't use square radius (none/sm/md) for profile pictures (use full for faces)

---

## Initials Generation

The avatar automatically generates initials from the `name` prop:
- **"John Doe"** → **"JD"** (first letter of first two words)
- **"Alice"** → **"A"** (single word)
- **"María José García"** → **"MJ"** (supports Unicode/accents)
- Empty name → Shows icon fallback

## Fallback Priority

1. **Image** (`src` prop) - If provided and loads successfully
2. **Initials** (from `name` prop) - If name is provided
3. **Custom Icon** (via `icon` slot) - If provided
4. **Default Icon** - User silhouette icon

All fallbacks respect the `showFallback` prop.
