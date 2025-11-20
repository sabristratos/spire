# Documentation Navigation

This file defines the navigation structure for the Spire UI documentation. Use this to generate sidebar menus or table of contents for documentation sites.

## Navigation Structure

### Getting Started
- [Introduction](index.md)
- [Getting Started](getting-started.md)
- [Configuration](configuration.md)
- [Theming & Design System](theming.md)
- [Forms Integration](forms.md)

### Components

#### Form Inputs
- [Input](components/input.md)
- [Textarea](components/textarea.md)
- [Select](components/select.md)
- [Autocomplete](components/autocomplete.md)
- [Checkbox](components/checkbox.md)
- [Radio](components/radio.md)
- [Switch](components/switch.md)
- [Slider](components/slider.md)
- [File Upload](components/file-upload.md)
- [Phone Input](components/phone-input.md)
- [Datepicker](components/datepicker.md)
- [Timepicker](components/timepicker.md)
- [Editor](components/editor.md)
- [Rating](components/rating.md)

#### Form Layout
- [Field](components/field.md)
- [Form Primitives](components/form-primitives.md)

#### Buttons & Actions
- [Button](components/button.md)

#### Navigation
- [Tabs](components/tabs.md)
- [Breadcrumbs](components/breadcrumbs.md)
- [Pagination](components/pagination.md)
- [Sidebar](components/sidebar.md)
- [Header](components/header.md)
- [Dropdown](components/dropdown.md)

#### Data Display
- [Table](components/table.md)
- [Data List](components/data-list.md)
- [Card](components/card.md)
- [Badge](components/badge.md)
- [Avatar](components/avatar.md)
- [Text](components/text.md)
- [Icon](components/icon.md)
- [Separator](components/separator.md)

#### Feedback
- [Alert](components/alert.md)
- [Toast](components/toast.md)
- [Modal](components/modal.md)
- [Spinner](components/spinner.md)
- [Progress](components/progress.md)
- [Tooltip](components/tooltip.md)
- [Popover](components/popover.md)

#### Media
- [Carousel](components/carousel.md)
- [Lightbox](components/lightbox.md)
- [Chart](components/chart.md)

#### Content
- [Accordion](components/accordion.md)
- [Calendar](components/calendar.md)

---

## JSON Navigation Structure

For documentation generators that accept JSON configuration:

```json
{
  "navigation": [
    {
      "title": "Getting Started",
      "items": [
        { "title": "Introduction", "path": "index.md" },
        { "title": "Getting Started", "path": "getting-started.md" },
        { "title": "Configuration", "path": "configuration.md" },
        { "title": "Theming & Design System", "path": "theming.md" },
        { "title": "Forms Integration", "path": "forms.md" }
      ]
    },
    {
      "title": "Components",
      "items": [
        {
          "title": "Form Inputs",
          "items": [
            { "title": "Input", "path": "components/input.md" },
            { "title": "Textarea", "path": "components/textarea.md" },
            { "title": "Select", "path": "components/select.md" },
            { "title": "Autocomplete", "path": "components/autocomplete.md" },
            { "title": "Checkbox", "path": "components/checkbox.md" },
            { "title": "Radio", "path": "components/radio.md" },
            { "title": "Switch", "path": "components/switch.md" },
            { "title": "Slider", "path": "components/slider.md" },
            { "title": "File Upload", "path": "components/file-upload.md" },
            { "title": "Phone Input", "path": "components/phone-input.md" },
            { "title": "Datepicker", "path": "components/datepicker.md" },
            { "title": "Timepicker", "path": "components/timepicker.md" },
            { "title": "Editor", "path": "components/editor.md" },
            { "title": "Rating", "path": "components/rating.md" }
          ]
        },
        {
          "title": "Form Layout",
          "items": [
            { "title": "Field", "path": "components/field.md" },
            { "title": "Form Primitives", "path": "components/form-primitives.md" }
          ]
        },
        {
          "title": "Buttons & Actions",
          "items": [
            { "title": "Button", "path": "components/button.md" }
          ]
        },
        {
          "title": "Navigation",
          "items": [
            { "title": "Tabs", "path": "components/tabs.md" },
            { "title": "Breadcrumbs", "path": "components/breadcrumbs.md" },
            { "title": "Pagination", "path": "components/pagination.md" },
            { "title": "Sidebar", "path": "components/sidebar.md" },
            { "title": "Header", "path": "components/header.md" },
            { "title": "Dropdown", "path": "components/dropdown.md" }
          ]
        },
        {
          "title": "Data Display",
          "items": [
            { "title": "Table", "path": "components/table.md" },
            { "title": "Data List", "path": "components/data-list.md" },
            { "title": "Card", "path": "components/card.md" },
            { "title": "Badge", "path": "components/badge.md" },
            { "title": "Avatar", "path": "components/avatar.md" },
            { "title": "Text", "path": "components/text.md" },
            { "title": "Icon", "path": "components/icon.md" },
            { "title": "Separator", "path": "components/separator.md" }
          ]
        },
        {
          "title": "Feedback",
          "items": [
            { "title": "Alert", "path": "components/alert.md" },
            { "title": "Toast", "path": "components/toast.md" },
            { "title": "Modal", "path": "components/modal.md" },
            { "title": "Spinner", "path": "components/spinner.md" },
            { "title": "Progress", "path": "components/progress.md" },
            { "title": "Tooltip", "path": "components/tooltip.md" },
            { "title": "Popover", "path": "components/popover.md" }
          ]
        },
        {
          "title": "Media",
          "items": [
            { "title": "Carousel", "path": "components/carousel.md" },
            { "title": "Lightbox", "path": "components/lightbox.md" },
            { "title": "Chart", "path": "components/chart.md" }
          ]
        },
        {
          "title": "Content",
          "items": [
            { "title": "Accordion", "path": "components/accordion.md" },
            { "title": "Calendar", "path": "components/calendar.md" }
          ]
        }
      ]
    }
  ]
}
```

---

## YAML Navigation Structure

For documentation generators that use YAML configuration (like VuePress, Docusaurus):

```yaml
sidebar:
  - title: Getting Started
    collapsable: false
    children:
      - path: /
        title: Introduction
      - path: /getting-started
        title: Getting Started
      - path: /configuration
        title: Configuration
      - path: /theming
        title: Theming & Design System
      - path: /forms
        title: Forms Integration

  - title: Components
    collapsable: true
    children:
      - title: Form Inputs
        children:
          - /components/input
          - /components/textarea
          - /components/select
          - /components/autocomplete
          - /components/checkbox
          - /components/radio
          - /components/switch
          - /components/slider
          - /components/file-upload
          - /components/phone-input
          - /components/datepicker
          - /components/timepicker
          - /components/editor
          - /components/rating

      - title: Form Layout
        children:
          - /components/field
          - /components/form-primitives

      - title: Buttons & Actions
        children:
          - /components/button

      - title: Navigation
        children:
          - /components/tabs
          - /components/breadcrumbs
          - /components/pagination
          - /components/sidebar
          - /components/header
          - /components/dropdown

      - title: Data Display
        children:
          - /components/table
          - /components/data-list
          - /components/card
          - /components/badge
          - /components/avatar
          - /components/text
          - /components/icon
          - /components/separator

      - title: Feedback
        children:
          - /components/alert
          - /components/toast
          - /components/modal
          - /components/spinner
          - /components/progress
          - /components/tooltip
          - /components/popover

      - title: Media
        children:
          - /components/carousel
          - /components/lightbox
          - /components/chart

      - title: Content
        children:
          - /components/accordion
          - /components/calendar
```

---

## GitHub Pages Setup

For GitHub Pages with Jekyll:

1. Create a `_config.yml` in the docs root:

```yaml
theme: jekyll-theme-cayman
title: Spire UI Documentation
description: Modern TALL stack component library

navigation:
  - title: Home
    url: /
  - title: Getting Started
    url: /getting-started
  - title: Configuration
    url: /configuration
  - title: Theming
    url: /theming
  - title: Components
    url: /#components
```

2. Enable GitHub Pages in repository settings
3. Set source to `/docs` folder on `main` branch
4. Documentation will be available at `https://yourusername.github.io/spire-ui/`

---

## Component Quick Links

For easy reference, here are direct links to all component documentation:

**Most Used Components:**
- [Button](components/button.md) • [Input](components/input.md) • [Select](components/select.md) • [Modal](components/modal.md) • [Card](components/card.md)

**Form Components:**
- [Checkbox](components/checkbox.md) • [Radio](components/radio.md) • [Switch](components/switch.md) • [Textarea](components/textarea.md) • [Slider](components/slider.md) • [File Upload](components/file-upload.md)

**Layout & Navigation:**
- [Tabs](components/tabs.md) • [Accordion](components/accordion.md) • [Sidebar](components/sidebar.md) • [Header](components/header.md) • [Breadcrumbs](components/breadcrumbs.md)

**Feedback & Overlay:**
- [Alert](components/alert.md) • [Toast](components/toast.md) • [Tooltip](components/tooltip.md) • [Popover](components/popover.md) • [Spinner](components/spinner.md) • [Progress](components/progress.md)

**Data Display:**
- [Table](components/table.md) • [Data List](components/data-list.md) • [Avatar](components/avatar.md) • [Badge](components/badge.md) • [Icon](components/icon.md)
