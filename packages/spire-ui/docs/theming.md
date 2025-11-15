# Theming Guide

Spire UI uses a modern, flexible theming system built on CSS custom properties (variables) with **OKLCH color space** and Tailwind CSS v4.

---

## Table of Contents

1. [Color System Overview](#color-system-overview)
2. [Base Color Palette](#base-color-palette)
3. [Color Scales](#color-scales)
4. [Semantic Tokens](#semantic-tokens)
5. [Interactive States](#interactive-states)
6. [Utility Classes](#utility-classes)
7. [Light & Dark Mode](#light--dark-mode)
8. [Customization](#customization)
9. [Design Tokens Reference](#design-tokens-reference)

---

## Color System Overview

Spire UI's color system is built on three layers:

### Layer 1: Base Colors (Foundation)
Seven base colors defined in OKLCH color space:
- `--color-primary-base` - Brand primary color (green)
- `--color-secondary-base` - Brand secondary color (orange)
- `--color-neutral-base` - Grayscale base (gray)
- `--color-success-base` - Success states (green)
- `--color-error-base` - Error states (red)
- `--color-warning-base` - Warning states (yellow)
- `--color-info-base` - Informational states (blue)

### Layer 2: Color Scales (11 shades per color)
Each base color generates a scale from 50 (lightest) to 950 (darkest):
- **50-400**: Lighter shades (backgrounds, subtle accents)
- **500**: Base shade (from `-base` color)
- **600-950**: Darker shades (text, borders, active states)

### Layer 3: Semantic Tokens (Purpose-driven)
Context-aware tokens that automatically adapt to light/dark mode:
- Layout: `--color-body`, `--color-surface`, `--color-overlay`
- Text: `--color-text`, `--color-text-muted`, `--color-text-disabled`
- Borders: `--color-border`, `--color-border-hover`, `--color-border-focus`
- Interactive: `--color-hover`, `--color-active`
- Branded: `--color-primary`, `--color-secondary`, etc.

---

## Base Color Palette

```css
@theme {
  /* Brand Colors */
  --color-primary-base: oklch(0.60 0.083 118.52);    /* Green - Primary brand */
  --color-secondary-base: oklch(0.50 0.1794 50.61);  /* Orange - Secondary brand */

  /* Semantic Colors */
  --color-neutral-base: oklch(0.50 0 0);             /* Gray - Neutral elements */
  --color-success-base: oklch(0.50 0.15 150);        /* Green - Success states */
  --color-error-base: oklch(0.55 0.20 25);           /* Red - Error states */
  --color-warning-base: oklch(0.65 0.15 75);         /* Yellow - Warning states */
  --color-info-base: oklch(0.55 0.15 220);           /* Blue - Info states */
}
```

### OKLCH Color Space Benefits
- **Perceptually uniform** - Equal changes in values = equal perceived color difference
- **Better contrast control** - Easier to maintain WCAG AA/AAA compliance
- **Vibrant colors** - Wider gamut than RGB/HSL
- **Predictable lightness** - `l` value directly correlates to perceived brightness

---

## Color Scales

Each base color generates 11 shades using relative color syntax:

### Scale Structure

| Shade | Lightness Offset | Usage |
|-------|------------------|-------|
| **50** | `+0.40` to `+0.48` | Very subtle backgrounds |
| **100** | `+0.35` to `+0.43` | Subtle backgrounds, hover states |
| **200** | `+0.25` to `+0.35` | Light backgrounds |
| **300** | `+0.15` to `+0.25` | Borders, dividers |
| **400** | `+0.05` to `+0.15` | Muted text, disabled elements |
| **500** | `0` (base) | Default color value |
| **600** | `-0.08` to `-0.15` | Primary text, buttons |
| **700** | `-0.15` to `-0.25` | Hover states, dark text |
| **800** | `-0.25` to `-0.35` | Active states, emphasis |
| **900** | `-0.35` to `-0.43` | High contrast text, dark surfaces |
| **950** | `-0.40` to `-0.48` | Maximum contrast, very dark surfaces |

### Example: Primary Scale Generation

```css
@theme {
  --color-primary-base: oklch(0.60 0.083 118.52);

  --color-primary-50: oklch(from var(--color-primary-base) calc(l + 0.40) c h);
  --color-primary-100: oklch(from var(--color-primary-base) calc(l + 0.35) c h);
  --color-primary-200: oklch(from var(--color-primary-base) calc(l + 0.25) c h);
  --color-primary-300: oklch(from var(--color-primary-base) calc(l + 0.15) c h);
  --color-primary-400: oklch(from var(--color-primary-base) calc(l + 0.08) c h);
  --color-primary-500: oklch(from var(--color-primary-base) l c h);
  --color-primary-600: oklch(from var(--color-primary-base) calc(l - 0.08) c h);
  --color-primary-700: oklch(from var(--color-primary-base) calc(l - 0.15) c h);
  --color-primary-800: oklch(from var(--color-primary-base) calc(l - 0.25) c h);
  --color-primary-900: oklch(from var(--color-primary-base) calc(l - 0.35) c h);
  --color-primary-950: oklch(from var(--color-primary-base) calc(l - 0.40) c h);
}
```

This same pattern applies to all seven color families.

---

## Semantic Tokens

Semantic tokens provide context-aware colors that automatically adapt to light/dark mode.

### Layout Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-body` | `neutral-50` | `neutral-950` | Page background |
| `--color-surface` | `white` | `neutral-800` | Card backgrounds, panels |
| `--color-surface-subtle` | `neutral-100` | `neutral-900` | Subtle surface variation |
| `--color-overlay` | `white` | `neutral-800` | Modal/popover backgrounds |

### Text Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-text` | `neutral-900` | `neutral-100` | Primary text |
| `--color-text-muted` | `neutral-600` | `neutral-400` | Secondary text, labels |
| `--color-text-disabled` | `neutral-400` | `neutral-600` | Disabled text |

### Border Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-border` | `neutral-300` | `neutral-700` | Default borders |
| `--color-border-hover` | `neutral-400` | `neutral-600` | Hovered borders |
| `--color-border-focus` | `primary-600` | `primary-400` | Focused borders |

### Generic Interactive Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--color-hover` | `text @ 5% opacity` | `text @ 10% opacity` | Generic hover overlay |
| `--color-active` | `text @ 10% opacity` | `text @ 15% opacity` | Generic active/pressed overlay |

---

## Interactive States

All interactive color variants have hover and active states defined:

### Brand Colors

#### Primary
```css
--color-primary: light-dark(primary-600, primary-700);
--color-primary-hover: light-dark(primary-700, primary-800);
--color-primary-active: light-dark(primary-800, primary-900);
--color-primary-foreground: white;
```

#### Secondary
```css
--color-secondary: light-dark(secondary-600, secondary-700);
--color-secondary-hover: light-dark(secondary-700, secondary-800);
--color-secondary-active: light-dark(secondary-800, secondary-900);
--color-secondary-foreground: white;
```

### Semantic Colors

#### Success
```css
--color-success: light-dark(success-600, success-400);
--color-success-hover: light-dark(success-700, success-800);
--color-success-active: light-dark(success-800, success-900);
--color-success-bg: light-dark(success-50, success-950);
--color-success-foreground: white;
```

#### Error
```css
--color-error: light-dark(error-600, error-400);
--color-error-hover: light-dark(error-700, error-800);
--color-error-active: light-dark(error-800, error-900);
--color-error-bg: light-dark(error-50, error-950);
--color-error-foreground: white;
```

#### Warning
```css
--color-warning: light-dark(warning-600, warning-400);
--color-warning-hover: light-dark(warning-700, warning-800);
--color-warning-active: light-dark(warning-800, warning-900);
--color-warning-bg: light-dark(warning-50, warning-950);
--color-warning-foreground: white;
```

#### Info
```css
--color-info: light-dark(info-600, info-400);
--color-info-hover: light-dark(info-700, info-800);
--color-info-active: light-dark(info-800, info-900);
--color-info-bg: light-dark(info-50, info-950);
--color-info-foreground: white;
```

#### Neutral
```css
--color-neutral: light-dark(neutral-400, neutral-600);
--color-neutral-hover: light-dark(neutral-700, neutral-600);
--color-neutral-active: light-dark(neutral-800, neutral-500);
--color-neutral-foreground: light-dark(neutral-900, white);
```

### Border Colors (for colored borders)

```css
--color-neutral-border: light-dark(neutral-700, neutral-800);
--color-primary-border: light-dark(primary-700, primary-800);
--color-secondary-border: light-dark(secondary-700, secondary-800);
--color-success-border: light-dark(success-700, success-800);
--color-error-border: light-dark(error-700, error-800);
--color-warning-border: light-dark(warning-700, warning-800);
--color-info-border: light-dark(info-700, info-800);
```

---

## Utility Classes

Tailwind CSS v4 automatically generates utility classes from all CSS custom properties in `@theme`.

### Color Scale Utilities

All 11 shades (50-950) generate utilities for every color:

```blade
{{-- Backgrounds --}}
<div class="bg-primary-50">Lightest primary background</div>
<div class="bg-primary-500">Base primary background</div>
<div class="bg-primary-900">Darkest primary background</div>

{{-- Text --}}
<p class="text-error-600">Error text</p>
<p class="text-success-700">Success text</p>

{{-- Borders --}}
<div class="border border-warning-300">Warning border</div>
```

### Semantic Token Utilities

Semantic tokens generate utilities that automatically adapt to light/dark mode:

```blade
{{-- Layout --}}
<body class="bg-body text-text">
<div class="bg-surface">Card background</div>
<div class="bg-surface-subtle">Subtle surface</div>

{{-- Text --}}
<h1 class="text-text">Primary heading</h1>
<p class="text-text-muted">Secondary text</p>
<span class="text-text-disabled">Disabled text</span>

{{-- Borders --}}
<input class="border border-border focus:border-border-focus" />
```

### Interactive State Utilities

```blade
{{-- Buttons --}}
<button class="bg-primary hover:bg-primary-hover active:bg-primary-active">
  Primary Button
</button>

{{-- Alerts --}}
<div class="bg-success-bg text-success border border-success-border">
  Success alert
</div>
```

### Special Utilities

```blade
{{-- Shadow (with color) --}}
<div class="shadow-lg shadow-primary/30">Primary glow</div>

{{-- Opacity variants --}}
<div class="bg-primary/20">20% opacity primary</div>
<div class="text-error/50">50% opacity error text</div>

{{-- Ring (focus states) --}}
<button class="ring-2 ring-primary ring-offset-2">Focused</button>
```

---

## Light & Dark Mode

The design system uses the `light-dark()` CSS function for automatic mode switching.

### How It Works

```css
/* Automatically switches based on user's color-scheme preference */
--color-text: light-dark(var(--color-neutral-900), var(--color-neutral-100));
/*                        ^^^^^^^^^^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^^^^^^^^^
                              Light mode value      Dark mode value        */
```

### Color Scheme Detection

The system respects:
1. **User's OS preference** - `prefers-color-scheme: dark`
2. **Manual override** - Setting `color-scheme` on `:root` or `html`

### Manual Mode Switching

```css
/* Force light mode */
:root {
  color-scheme: light;
}

/* Force dark mode */
:root {
  color-scheme: dark;
}
```

Or using JavaScript:

```javascript
// Toggle dark mode
document.documentElement.style.colorScheme = 'dark';

// Toggle light mode
document.documentElement.style.colorScheme = 'light';

// Use system preference
document.documentElement.style.colorScheme = 'light dark';
```

---

## Customization

### Changing Base Colors

To customize the theme, override the base colors in your CSS:

```css
@theme {
  /* Override primary brand color */
  --color-primary-base: oklch(0.55 0.20 250); /* Blue instead of green */

  /* Override secondary brand color */
  --color-secondary-base: oklch(0.60 0.15 300); /* Purple instead of orange */
}
```

All color scales and semantic tokens will automatically regenerate based on the new base color.

### Adjusting Semantic Tokens

Override specific semantic tokens for fine-tuned control:

```css
@theme {
  /* Use a different shade for body background */
  --color-body: light-dark(var(--color-neutral-100), var(--color-neutral-900));

  /* Use primary color for links */
  --color-text-link: var(--color-primary);
  --color-text-link-hover: var(--color-primary-hover);
}
```

### Customizing Border Radius

```css
@theme {
  /* Make everything more rounded */
  --radius-base: 0.5rem; /* Default: 0.25rem */
}
```

All radius tokens (`--radius-sm`, `--radius-md`, etc.) are calculated from `--radius-base`.

### Customizing Transitions

```css
@theme {
  /* Faster animations */
  --ease-fast: 100ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Design Tokens Reference

### Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px` | Subtle elevation |
| `--shadow` | `0 1px 3px` | Default shadow |
| `--shadow-md` | `0 4px 6px` | Medium elevation |
| `--shadow-lg` | `0 10px 15px` | High elevation |
| `--shadow-xl` | `0 20px 25px` | Maximum elevation |

### Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | `0.125rem` | Subtle rounding |
| `--radius` | `0.25rem` | Default rounding |
| `--radius-md` | `0.375rem` | Medium rounding |
| `--radius-lg` | `0.5rem` | Large rounding |
| `--radius-xl` | `0.75rem` | Extra large rounding |
| `--radius-2xl` | `1rem` | Very round |
| `--radius-3xl` | `1.5rem` | Maximum rounding |
| `--radius-full` | `9999px` | Fully rounded (pills, circles) |

### Transition Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-fast` | `150ms ease-out` | Quick interactions |
| `--transition-base` | `200ms ease-out` | Default transitions |
| `--transition-slow` | `300ms ease-out` | Deliberate animations |

### Special Tokens

```css
/* Button-specific */
--color-button-border-highlight: light-dark(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
--inset-shadow-button: inset 0 1px 1px 0 light-dark(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
--inset-shadow-button-active: inset 0 2px 4px 0 light-dark(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4));

/* Focus rings */
--ring-offset-color: var(--color-body);
```

---

## Best Practices

### Do

- ✅ Use semantic tokens (`--color-text`, `--color-surface`) for layout elements
- ✅ Use specific shades (`primary-600`, `error-50`) for fixed colors
- ✅ Use hover/active tokens for interactive elements
- ✅ Customize via base colors for consistent theming
- ✅ Test in both light and dark modes
- ✅ Use OKLCH for custom colors to maintain perceptual consistency

### Don't

- ❌ Hardcode hex/rgb colors in components
- ❌ Use absolute color values for text (use semantic tokens)
- ❌ Override individual scale shades (override base colors instead)
- ❌ Mix HSL/RGB with OKLCH (stick to one color space)
- ❌ Forget to test color contrast (WCAG AA minimum)
- ❌ Use `--color-text` for colored text (use specific color tokens)

---

## WCAG Contrast Compliance

The color system is designed to meet WCAG AA standards:

- **Text on backgrounds**: Minimum 4.5:1 contrast ratio
- **Large text** (18pt+): Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 against adjacent colors

### Testing Contrast

Use browser DevTools or online tools to verify:
- Light mode: `neutral-900` on `neutral-50` ✓ (passes AA)
- Dark mode: `neutral-100` on `neutral-950` ✓ (passes AA)
- Colored buttons: `white` on `primary-600` ✓ (passes AA)

---

## Examples

### Custom Brand Colors

```css
/* your-theme.css */
@theme {
  /* Company brand: Purple & Teal */
  --color-primary-base: oklch(0.55 0.20 280); /* Purple */
  --color-secondary-base: oklch(0.60 0.15 200); /* Teal */
}
```

### High Contrast Mode

```css
@theme {
  /* Increase contrast for better accessibility */
  --color-text: light-dark(var(--color-neutral-950), var(--color-neutral-50));
  --color-border: light-dark(var(--color-neutral-500), var(--color-neutral-500));
}
```

### Themed Component

```blade
<button class="
  bg-primary
  text-primary-foreground
  hover:bg-primary-hover
  active:bg-primary-active
  border-2
  border-primary-border
  rounded-md
  shadow-lg
  shadow-primary/20
  ease-fast
">
  Themed Button
</button>
```

---

## Resources

- **OKLCH Color Picker**: https://oklch.com
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/
- **Tailwind CSS v4 Docs**: https://tailwindcss.com/docs
- **CSS `light-dark()` function**: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark

---

**Next Steps**: Explore the [component documentation](./index.md) to see how these tokens are applied in real components.
