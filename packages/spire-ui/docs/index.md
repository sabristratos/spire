# Spire UI Component Library

A modern TALL stack component library built with Laravel, Livewire, Alpine.js, and Tailwind CSS v4.

## Getting Started

### Theming & Design System
Complete guide to Spire UI's theming system, including color tokens, OKLCH color space, light/dark mode, semantic tokens, interactive states, utility classes, and customization options.

[View Theming Guide](theming.md)

---

## Components

### Button
Interactive button component with multiple variants (solid, bordered, ghost, soft, link), colors, sizes, and states. Supports icons, loading states, and can be rendered as links. Full keyboard accessibility.

[View Documentation](components/button.md)

### Button Group
Groups multiple buttons together horizontally or vertically with seamless borders and proper edge rounding. Automatically handles styling for first, middle, and last buttons in the group.

[View Documentation](components/button-group.md)

### Icon
SVG icon component with size variants and color customization. Includes the complete Untitled UI icon set with 1000+ icons. Uses inline SVG for optimal performance and styling flexibility.

[View Documentation](components/icon.md)

### Card
Versatile container component for grouping related content including text, images, and actions. Supports multiple variants (elevated, bordered, flat), hover effects, pressable interactions, blurred backgrounds, and responsive layouts. Includes header, body, footer, and media child components.

[View Documentation](components/card.md)

### Badge
Two-part badge system: standalone Badge component for chips/tags with variants, colors, and icons; Badge.Container for positioning notification badges on avatars, icons, and buttons. Supports dot indicators, custom content, and all corner placements.

[View Documentation](components/badge.md)

### Avatar
Display user profile pictures with automatic fallbacks to initials or icons. Includes Avatar.Group for stacked or grid layouts with count indicators. Supports multiple sizes, colors, borders, and status badges. Fully accessible with proper alt text handling.

[View Documentation](components/avatar.md)

### Alert
Temporary notifications providing concise feedback about actions or events. Features color-coded variants (success, error, warning, info), automatic icons, optional close button with smooth dismissal, and support for action buttons. Includes solid, bordered, flat, and faded visual styles.

[View Documentation](components/alert.md)

### Accordion
Expandable panels for organizing content into collapsible sections with smooth Alpine.js animations. Supports single or multiple open items, color variants, sizes, and full keyboard accessibility. Includes parent Accordion and child Accordion.Item components with subtitle and icon customization.

[View Documentation](components/accordion.md)

### Input
Flexible input component with convenience props for icons and interactive features. Supports leading/trailing slots, clearable inputs, password visibility toggle, copy-to-clipboard functionality, and full Livewire/Alpine.js integration. Multiple variants (bordered, flat) and sizes with automatic error state styling.

[View Documentation](components/input.md)

### Field
Convenience wrapper component for form inputs providing proper spacing and layout. Automatically manages labels, helper text, and error messages. Supports both shorthand props and custom slots for maximum flexibility. Integrates seamlessly with Input and other form components.

[View Documentation](components/field.md)

### Form Primitives (Label, Error, Helper)
Standalone, reusable components for building custom form layouts. Includes Form Label with required indicator, Form Error with Laravel validation integration, and Form Helper for guidance text. Perfect for complete layout control when Field component is too opinionated.

[View Documentation](components/form-primitives.md)
