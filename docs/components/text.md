# Text, Heading & Link Components

Consistent typographical components for headings, body copy, and clickable links throughout your application.

---

## Text Component

The standard text component for body copy and general content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `'p' \| 'span' \| 'div' \| 'label'` | `'p'` | HTML element to render |
| `variant` | `'default' \| 'strong' \| 'subtle'` | `'default'` | Text emphasis variant |
| `color` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info'` | `null` | Semantic color |

### Examples

#### Basic Usage

```blade
<x-spire::text>
    This is the standard text component for body copy and general content throughout your application.
</x-spire::text>
```

#### Text Variants

```blade
<x-spire::text variant="strong">Strong text with emphasis</x-spire::text>
<x-spire::text>Default text color</x-spire::text>
<x-spire::text variant="subtle">Subtle muted text</x-spire::text>
```

#### Semantic Colors

```blade
<x-spire::text color="primary">Primary colored text</x-spire::text>
<x-spire::text color="success">Success message</x-spire::text>
<x-spire::text color="error">Error message</x-spire::text>
<x-spire::text color="warning">Warning message</x-spire::text>
<x-spire::text color="info">Informational text</x-spire::text>
```

#### Custom Sizes (Use Tailwind)

Use standard Tailwind classes to control size, allowing easy responsive adaptation:

```blade
<x-spire::text class="text-lg">Larger text size</x-spire::text>
<x-spire::text>Default text size</x-spire::text>
<x-spire::text class="text-sm">Smaller text</x-spire::text>
<x-spire::text class="text-xs md:text-sm lg:text-base">Responsive sizing</x-spire::text>
```

#### Inline Text

Use `as="span"` for inline text within other elements:

```blade
<x-spire::text>
    Visit our <x-spire::text as="span" color="primary">documentation</x-spire::text> for more information.
</x-spire::text>
```

#### Combined with Links

```blade
<x-spire::text>
    Visit our <x-spire::link href="/docs">documentation</x-spire::link> for more information.
</x-spire::text>
```

---

## Heading Component

A consistent heading component for section titles and labels.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Size of the heading (14px, 16px, 24px) |
| `level` | `1 \| 2 \| 3 \| 4 \| 5 \| 6` | `null` | HTML heading level (h1-h6), defaults to div |
| `accent` | `boolean` | `false` | Applies primary color styling |

### Examples

#### Basic Usage

```blade
<x-spire::heading>Default heading</x-spire::heading>
```

#### Heading Sizes

```blade
<x-spire::heading size="sm">Small (14px) - Use liberally for labels</x-spire::heading>
<x-spire::heading size="md">Medium (16px) - Use for modal/card headings</x-spire::heading>
<x-spire::heading size="lg">Large (24px) - Use rarely for hero text</x-spire::heading>
```

#### Semantic Heading Levels

Use the `level` prop for proper HTML semantics and accessibility:

```blade
<x-spire::heading level="1" size="lg">Page Title</x-spire::heading>
<x-spire::heading level="2" size="md">Section Heading</x-spire::heading>
<x-spire::heading level="3">Subsection Heading</x-spire::heading>
```

#### Accent Headings

```blade
<x-spire::heading accent>Accent colored heading</x-spire::heading>
<x-spire::heading size="lg" accent>Large accent heading</x-spire::heading>
```

#### With Text Component

```blade
<x-spire::heading level="2" size="md">User Profile</x-spire::heading>
<x-spire::text variant="subtle" class="mt-2">
    This information will be displayed publicly.
</x-spire::text>
```

#### Leading Subheading Pattern

```blade
<div>
    <x-spire::text variant="subtle">Year to date</x-spire::text>
    <x-spire::heading size="lg" class="mb-1">$7,532.16</x-spire::heading>
    <div class="flex items-center gap-2">
        <x-spire::icon name="trending-up" class="w-4 h-4 text-success" />
        <x-spire::text as="span" color="success" class="text-sm">15.2%</x-spire::text>
    </div>
</div>
```

---

## Link Component

Clickable text that navigates to other pages or resources.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | `'#'` | The URL the link points to |
| `variant` | `'default' \| 'ghost' \| 'subtle'` | `'default'` | Link style variant |
| `external` | `boolean` | `false` | Opens in new tab with security attributes |

### Examples

#### Basic Link

```blade
<x-spire::link href="/dashboard">Go to Dashboard</x-spire::link>
```

#### Link Variants

```blade
<x-spire::link href="#" variant="default">Default link</x-spire::link>
<x-spire::link href="#" variant="ghost">Ghost link</x-spire::link>
<x-spire::link href="#" variant="subtle">Subtle link</x-spire::link>
```

#### External Links

External links automatically open in a new tab and include security attributes (`rel="noopener noreferrer"`):

```blade
<x-spire::link href="https://github.com" external>
    GitHub
</x-spire::link>
```

#### Links in Text

```blade
<x-spire::text>
    Read our <x-spire::link href="/privacy">privacy policy</x-spire::link>
    and <x-spire::link href="/terms">terms of service</x-spire::link>.
</x-spire::text>
```

#### Navigation Links

```blade
<nav class="flex gap-4">
    <x-spire::link href="/" variant="ghost">Home</x-spire::link>
    <x-spire::link href="/about" variant="ghost">About</x-spire::link>
    <x-spire::link href="/contact" variant="ghost">Contact</x-spire::link>
</nav>
```

---

## Best Practices

### Do

- Use `<x-spire::text>` for all body copy to ensure consistent typography
- Use semantic `color` props for status messages (success, error, warning)
- Use `variant="subtle"` for secondary/helper text
- Use `variant="strong"` for important information
- Use Tailwind classes for size control (`text-sm`, `text-lg`) to enable responsive design
- Always use `external` prop for links to external domains
- Use `as="span"` when you need inline text elements

### Don't

- Don't use raw `<p>` or `<span>` tags when you could use `<x-spire::text>`
- Don't use links for actions that don't navigate (use buttons instead)
- Don't forget the `external` prop for links that open new tabs
- Don't override the base text color unnecessarily - use variants instead
