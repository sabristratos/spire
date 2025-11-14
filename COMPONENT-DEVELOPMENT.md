# Spire UI Component Development Guide

This guide documents the architectural patterns, best practices, and approaches used in Spire UI component development. Following these guidelines ensures consistency, maintainability, and scalability across all components.

## Table of Contents

1. [Quick Reference](#quick-reference)
2. [Component Structure Pattern](#component-structure-pattern)
3. [Styling Architecture](#styling-architecture)
4. [Variant & Color System](#variant--color-system)
5. [Form Component Guidelines](#form-component-guidelines)
6. [Theme & Token Usage](#theme--token-usage)
7. [Real-World Example: Input Refactoring](#real-world-example-input-refactoring)
8. [Best Practices Checklist](#best-practices-checklist)

---

## Quick Reference

### Essential Principles

✅ **All styling logic in PHP, clean templates**
✅ **Use ComponentStyles utilities consistently**
✅ **Variants follow nested array structure (variants × colors)**
✅ **Conditional classes in dedicated array**
✅ **Use semantic theme tokens, not hardcoded values**

### Component Boilerplate

```php
@props([
    'variant' => 'solid',
    'color' => 'default',
    'size' => 'md',
    // ... other props
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'inline-flex items-center justify-center';

$conditionalClasses = [];
if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    ComponentStyles::sizeClasses($size, 'component-type'),
    ComponentStyles::radiusClasses($radius),
    ComponentStyles::colorClasses($variant, $color),
    ...$conditionalClasses,
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'data-spire-component' => 'true',
]);
@endphp

<element {{ $mergedAttributes }}>
    {{ $slot }}
</element>
```

---

## Component Structure Pattern

### File Organization

**Folder-based components with dot notation:**
```
components/
├── button/
│   ├── index.blade.php      # <x-spire::button />
│   └── group.blade.php       # <x-spire::button.group />
├── input/
│   └── index.blade.php       # <x-spire::input />
└── form/
    ├── error.blade.php       # <x-spire::form.error />
    ├── label.blade.php       # <x-spire::form.label />
    └── helper.blade.php      # <x-spire::form.helper />
```

### Standard Component Anatomy

Every component should follow this structure:

```blade
@props([
    // 1. Required props (no defaults)
    // 2. Common props with sensible defaults
    'variant' => 'solid',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'md',
    // 3. Feature flags
    'disabled' => false,
    'loading' => false,
])

@php
// 4. Imports
use SpireUI\Support\ComponentStyles;

// 5. Base classes (layout, common utilities)
$baseClasses = 'inline-flex items-center gap-2';

// 6. Size/variant/color classes
$sizeClasses = [...];

// 7. Conditional classes (states)
$conditionalClasses = [];

// 8. Build final class string
$classString = ComponentStyles::buildClassString([...]);

// 9. Merge attributes
$mergedAttributes = $attributes->merge([...]);
@endphp

{{-- 10. Clean template using computed values --}}
<element {{ $mergedAttributes }}>
    {{ $slot }}
</element>
```

### Why This Structure?

- **Predictability**: Every component follows the same flow
- **Maintainability**: All logic in PHP section, template stays clean
- **Readability**: Clear separation of concerns
- **Scalability**: Easy to add new features without template clutter

---

## Styling Architecture

### The ComponentStyles Utility

**Location:** `packages/spire-ui/src/Support/ComponentStyles.php`

This utility centralizes reusable styling logic. Always use it instead of defining classes inline.

### Available Methods

| Method | Purpose | Example |
|--------|---------|---------|
| `buildClassString(array)` | Filters empty values and joins classes | `buildClassString([$base, $size, ...$conditional])` |
| `colorClasses($variant, $color)` | Returns color classes for variant | `colorClasses('solid', 'primary')` |
| `sizeClasses($size, $type)` | Returns size classes for component type | `sizeClasses('md', 'input')` |
| `radiusClasses($radius)` | Returns border radius classes | `radiusClasses('md')` |
| `shadowClasses($shadow)` | Returns shadow classes | `shadowClasses('sm')` |
| `ringColorClasses($color)` | Returns focus ring color | `ringColorClasses('primary')` |

### The Three-Class Pattern

Every component should organize classes into three categories:

```php
// 1. BASE CLASSES - Layout and common utilities
$baseClasses = 'flex items-center gap-2 transition-fast';

// 2. VARIANT/SIZE/RADIUS CLASSES - From ComponentStyles
$sizeClasses = ComponentStyles::sizeClasses($size, 'input');
$variantClasses = ComponentStyles::colorClasses($variant, $color);
$radiusClasses = ComponentStyles::radiusClasses($radius);

// 3. CONDITIONAL CLASSES - State-dependent
$conditionalClasses = [];
if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}
if ($readonly) {
    $conditionalClasses[] = 'cursor-default';
}

// 4. COMBINE - Using buildClassString
$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses,
    $radiusClasses,
    $variantClasses,
    ...$conditionalClasses,  // Spread operator for array
]);
```

### ❌ Anti-Pattern: Hardcoded Classes in Template

**Don't do this:**
```blade
<div class="flex items-center gap-2 {{ $variant === 'bordered' ? 'border border-border' : 'bg-surface' }} h-10 px-3 rounded-md">
```

**Do this instead:**
```blade
<div class="{{ $containerClassString }}">
```

### Why?

- **Maintainability**: Change styling in one place (PHP section)
- **Readability**: Template focuses on structure, not styling logic
- **Testability**: Easier to test class combinations
- **DRY Principle**: Reuse via ComponentStyles utilities

---

## Variant & Color System

### Understanding Variants vs Colors

**Variants** = Visual style approach (solid, bordered, flat, ghost, soft, link)
**Colors** = Semantic meaning (default, primary, error, success, etc.)

Every variant can support multiple colors:

```
solid × primary = Filled primary button
bordered × error = Red outlined button
flat × success = Subtle green background button
```

### Adding New Variants to ComponentStyles

When creating a new component type, add its variants to `ComponentStyles::colorVariants()`:

```php
// In ComponentStyles.php
public static function colorVariants(): array
{
    return [
        // ... existing variants ...

        'input-bordered' => [
            'default' => 'border border-border bg-surface shadow-sm focus-within:shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
            'primary' => 'border border-primary bg-surface shadow-sm focus-within:shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
            'error' => 'border border-error bg-surface shadow-sm focus-within:shadow focus-within:border-error focus-within:ring-2 focus-within:ring-error/20',
            'success' => 'border border-success bg-surface shadow-sm focus-within:shadow focus-within:border-success focus-within:ring-2 focus-within:ring-success/20',
            // ... other colors
        ],

        'input-flat' => [
            'default' => 'border-0 bg-surface-subtle shadow-sm focus-within:shadow focus-within:bg-surface',
            'primary' => 'border-0 bg-primary/5 shadow-sm focus-within:shadow focus-within:bg-primary/10',
            'error' => 'border-0 bg-error/5 shadow-sm focus-within:shadow focus-within:bg-error/10',
            // ... other colors
        ],
    ];
}
```

### Using Variants in Components

```php
// In component file
$variantKey = "input-{$variant}";  // Creates 'input-bordered' or 'input-flat'
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$containerClassString = ComponentStyles::buildClassString([
    $baseClasses,
    $variantClasses,  // All variant+color classes applied here
    // ... other classes
]);
```

### Naming Convention

- **Component-specific variants**: Use `{component}-{variant}` format
  - Examples: `input-bordered`, `input-flat`, `select-bordered`
- **Shared variants**: Use simple names
  - Examples: `solid`, `bordered`, `flat`, `ghost`

### The Seven Colors

All variants should support these seven colors:

1. `default` - Neutral, general purpose
2. `primary` - Main brand color, call-to-action
3. `secondary` - Supporting brand color
4. `success` - Positive actions, confirmations
5. `error` - Errors, destructive actions
6. `warning` - Warnings, caution
7. `info` - Informational messages

---

## Form Component Guidelines

### Validation State Handling

Form components must visually indicate validation states:

```php
@props([
    'invalid' => false,  // Explicit prop
    'valid' => false,    // Explicit prop
    // ... other props
])

// Detect validation state from Laravel's error bag
$hasError = $name && $errors->has($name);

// Apply appropriate color
$effectiveColor = $hasError || $invalid ? 'error' : ($valid ? 'success' : $color);

// Use in variant classes
$variantClasses = ComponentStyles::colorClasses($variantKey, $effectiveColor);
```

### Focus State Patterns

Form inputs should use `focus-within:` variants for container-level focus:

```css
/* Standard focus pattern */
focus-within:border-primary
focus-within:ring-2
focus-within:ring-primary/20
```

**Why `focus-within`?**
- Works when inner `<input>` receives focus
- Allows styling the container (which may have icons, buttons, etc.)
- Better visual feedback for complex input components

### Disabled & Readonly States

```php
$conditionalClasses = [];

if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}

if ($readonly) {
    $conditionalClasses[] = 'cursor-default bg-surface-subtle';
}
```

**Accessibility attributes:**
```php
$inputAttributes = $attributes->merge([
    'disabled' => $disabled ? true : null,
    'readonly' => $readonly ? true : null,
    'required' => $required ? true : null,
    'aria-invalid' => $hasError ? 'true' : null,
    'aria-required' => $required ? 'true' : null,
]);
```

### Error Display Integration

Use the Field component wrapper to integrate errors:

```blade
<x-spire::field
    label="Email"
    for="email"
    required
    error="email"
>
    <x-spire::input
        id="email"
        type="email"
        wire:model="email"
    />
</x-spire::field>
```

The Field component automatically:
- Displays errors from `$errors->get('email')`
- Shows the Error component with icon
- Manages helper text visibility

---

## Theme & Token Usage

### Shadow System

Shadows have been calibrated for visibility while remaining subtle:

| Token | Opacity | Use Case |
|-------|---------|----------|
| `shadow-sm` | 8% | Resting state for inputs, cards |
| `shadow` | 12% | Hover state, slight elevation |
| `shadow-md` | 12-9% | Focused elements, dropdowns |
| `shadow-lg` | 15-9% | Modals, popovers |
| `shadow-xl` | 18-12% | High elevation overlays |

**Usage:**
```php
// In ComponentStyles
$variantClasses = [
    'bordered' => 'border border-border bg-surface shadow-sm focus-within:shadow',
];
```

**Theme tokens (theme.css):**
```css
--shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.08);
--shadow: 0 1px 3px 0 oklch(0 0 0 / 0.12), 0 1px 2px -1px oklch(0 0 0 / 0.12);
```

### Semantic Color Tokens

Always use semantic tokens instead of direct color references:

✅ **Good:**
```css
bg-surface
text-text
border-border
focus-within:border-primary
```

❌ **Bad:**
```css
bg-white
text-black
border-gray-300
focus-within:border-blue-500
```

### Why Semantic Tokens?

- **Theme switching**: Automatically work in light/dark mode
- **Consistency**: Same meaning = same color
- **Maintainability**: Change theme-wide, not component-by-component

### Available Semantic Tokens

**Surfaces:**
- `bg-body` - Page background
- `bg-surface` - Card/component background
- `bg-surface-subtle` - Disabled/readonly background
- `bg-overlay` - Modal/dropdown background

**Text:**
- `text-text` - Primary text
- `text-text-muted` - Secondary text
- `text-text-disabled` - Disabled text

**Borders:**
- `border-border` - Default border
- `border-border-hover` - Hover state
- `border-border-focus` - Focus state

**State Colors:**
- `bg-primary`, `text-primary`, `border-primary`
- `bg-error`, `text-error`, `border-error`
- `bg-success`, `text-success`, `border-success`
- etc.

---

## Real-World Example: Input Refactoring

This section demonstrates the evolution of the Input component, showing why consistency matters.

### Before: Inconsistent Pattern

```php
// Input component (old approach)
$variantClasses = [
    'bordered' => 'border border-border bg-surface',
    'flat' => 'border-0 bg-surface-subtle',
];

// Template
<div class="flex items-center gap-2 {{ $variantClasses[$variant] }} {{ ComponentStyles::radiusClasses($radius) }} shadow-sm focus-within:shadow focus-within:border-primary ...">
```

**Problems:**
- ❌ Flat array, no color support
- ❌ Doesn't use `ComponentStyles::colorClasses()`
- ❌ Hardcoded classes in template
- ❌ Inconsistent with Button/Badge pattern
- ❌ Focus states mixed into template
- ❌ Hard to extend with new variants

### After: Consistent Pattern

```php
// Added to ComponentStyles.php
'input-bordered' => [
    'default' => 'border border-border bg-surface shadow-sm focus-within:shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    'primary' => 'border border-primary bg-surface shadow-sm focus-within:shadow focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20',
    'error' => 'border border-error bg-surface shadow-sm focus-within:shadow focus-within:border-error focus-within:ring-2 focus-within:ring-error/20',
    // ... all 7 colors
],
'input-flat' => [
    'default' => 'border-0 bg-surface-subtle shadow-sm focus-within:shadow focus-within:bg-surface',
    'primary' => 'border-0 bg-primary/5 shadow-sm focus-within:shadow focus-within:bg-primary/10',
    // ... all 7 colors
],

// Input component (new approach)
@props([
    'variant' => 'bordered',
    'color' => 'default',  // NEW: Color support
    // ...
])

$baseClasses = 'flex items-center gap-2 transition-fast';

$variantKey = "input-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$conditionalClasses = [];
if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}

$containerClassString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
    ...$conditionalClasses,
]);

// Template
<div class="{{ $containerClassString }}">
```

**Benefits:**
- ✅ Nested array structure (variants × colors)
- ✅ Uses `ComponentStyles::colorClasses()`
- ✅ All classes computed in PHP
- ✅ Clean template (single variable)
- ✅ Consistent with Button/Badge
- ✅ Supports 7 colors out of the box
- ✅ Easy to add validation states

### Impact on Future Components

Now when building Select, Textarea, Date Picker, etc., developers have a clear blueprint:

```php
// Select component
'select-bordered' => [
    'default' => 'border border-border bg-surface shadow-sm focus-within:shadow ...',
    // ... 7 colors
],

// Textarea component
'textarea-bordered' => [
    'default' => 'border border-border bg-surface shadow-sm focus-within:shadow ...',
    // ... 7 colors
],
```

**Result:** All form components follow the exact same structure and styling approach.

---

## Date & Time API

Spire UI provides a comprehensive headless date/time API for building calendar, date picker, time picker, and other date-related components. The API uses a hybrid architecture with both PHP and JavaScript utilities, supporting full internationalization (EN, FR, AR) and timezone handling.

### PHP Helpers

All PHP helpers are located in `packages/spire-ui/src/Support/`.

#### CalendarState

Handles calendar grid generation and date calculations on the server side.

```php
use SpireUI\Support\CalendarState;

// Generate a calendar grid for November 2025
$month = Carbon::parse('2025-11-01');
$weeks = CalendarState::generateMonthGrid($month, firstDayOfWeek: 0);

// Each week contains 7 days with metadata
foreach ($weeks as $week) {
    foreach ($week as $day) {
        echo $day['date'];           // '2025-11-14'
        echo $day['day'];            // 14
        echo $day['isCurrentMonth']; // true/false
        echo $day['isToday'];        // true/false
        echo $day['isWeekend'];      // true/false
    }
}

// Get day names for calendar header
$dayNames = CalendarState::getDayNames(firstDayOfWeek: 0, format: 'short');
// ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Get month names
$monthNames = CalendarState::getMonthNames(format: 'long');
// ['January', 'February', ...]

// Get date range
$dates = CalendarState::getDateRange($startDate, $endDate);
```

**Common Methods:**
- `generateMonthGrid($month, $firstDayOfWeek = 0)` - Generate calendar grid
- `getDayNames($firstDayOfWeek, $format)` - Get localized day names
- `getMonthNames($format)` - Get localized month names
- `getYearRange($start, $end)` - Get array of years
- `getDecadeRange($year)` - Get 10-year range around a year
- `isDayOfWeek($date, $dayOfWeek)` - Check if date is specific day
- `getDateRange($start, $end)` - Get all dates in range

#### DateValidator

Validates dates against constraints (min/max dates, disabled dates, etc.).

```php
use SpireUI\Support\DateValidator;

// Check if date is in range
$isValid = DateValidator::isDateInRange(
    $date,
    minDate: Carbon::parse('2025-11-01'),
    maxDate: Carbon::parse('2025-12-31')
);

// Check if date is disabled
$isDisabled = DateValidator::isDateDisabled(
    $date,
    disabledDates: ['2025-12-25', '2025-12-26']
);

// Check if day of week is disabled
$isDayDisabled = DateValidator::isDayOfWeekDisabled(
    $date,
    disabledDaysOfWeek: [0, 6] // Sunday, Saturday
);

// Validate date against all constraints
$isValid = DateValidator::isDateValid(
    $date,
    minDate: $minDate,
    maxDate: $maxDate,
    disabledDates: $disabledDates,
    disabledDaysOfWeek: [0, 6],
    enabledDates: []
);

// Get validation error message
$error = DateValidator::getValidationError($date, $minDate, $maxDate);
// Returns translated error message or null
```

**Common Methods:**
- `isDateInRange($date, $minDate, $maxDate)` - Range validation
- `isDateDisabled($date, $disabledDates)` - Check disabled dates
- `isDayOfWeekDisabled($date, $disabledDaysOfWeek)` - Check disabled days
- `isDateValid($date, ...)` - Validate all constraints
- `isDateRangeValid($start, $end, ...)` - Validate date range
- `getValidationError($date, ...)` - Get error message

#### TimezoneConverter

Handles timezone conversions between UTC, user timezone, and app timezone.

```php
use SpireUI\Support\TimezoneConverter;

// Convert to user's timezone
$userDate = TimezoneConverter::toUserTimezone($date, $userTimezone);

// Convert to UTC (for storage)
$utcDate = TimezoneConverter::toUTC($date);

// Format for storage (always UTC)
$storedDate = TimezoneConverter::formatForStorage($date, $userTimezone);

// Format for display (user's timezone)
$displayDate = TimezoneConverter::formatForDisplay($date, $userTimezone);

// Get user's timezone (from auth user or config)
$timezone = TimezoneConverter::getUserTimezone();

// Get common timezones grouped by region
$timezones = TimezoneConverter::getCommonTimezones();

// Get current time in specific timezone
$now = TimezoneConverter::nowIn('America/New_York');

// Validate timezone
$isValid = TimezoneConverter::isValidTimezone('America/New_York');
```

**Best Practices:**
- **Always store in UTC**: Use `formatForStorage()` before saving to database
- **Convert for display**: Use `formatForDisplay()` when showing to user
- **User preferences**: Store user timezone and apply automatically
- **Server-side conversions**: Do timezone math on server, not client

#### DateFormatter

Formats dates for display with localization support.

```php
use SpireUI\Support\DateFormatter;

// Format using predefined formats
echo DateFormatter::format($date, 'short');  // 11/14/2025
echo DateFormatter::format($date, 'medium'); // Nov 14, 2025
echo DateFormatter::format($date, 'long');   // November 14, 2025
echo DateFormatter::format($date, 'full');   // Thursday, November 14, 2025

// Format with specific locale
echo DateFormatter::format($date, 'long', 'fr'); // 14 Novembre 2025
echo DateFormatter::format($date, 'long', 'ar'); // 14 نوفمبر 2025

// Format time
echo DateFormatter::formatTime($date, use24Hour: false); // 3:45 PM
echo DateFormatter::formatTime($date, use24Hour: true);  // 15:45

// Relative formatting
echo DateFormatter::relative($date); // 2 hours ago

// Calendar formatting
echo DateFormatter::calendar($date); // Today, Tomorrow, or formatted date

// Format date range
echo DateFormatter::formatRange($startDate, $endDate, 'medium');
// Nov 14, 2025 to Nov 21, 2025

// Get localized month/day names
echo DateFormatter::getMonthName(11, 'long', 'fr'); // Novembre
echo DateFormatter::getDayName(4, 'long', 'ar');    // الخميس

// Get first day of week for locale
$firstDay = DateFormatter::getFirstDayOfWeek('ar'); // 6 (Saturday)
```

**Locale-Specific Behaviors:**
- **English (en)**: First day = Sunday (0), Format = M/D/Y
- **French (fr)**: First day = Monday (1), Format = D/M/Y
- **Arabic (ar)**: First day = Saturday (6), Format = D/M/Y, RTL = true

### JavaScript Utilities

All JavaScript utilities are located in `packages/spire-ui/resources/js/`.

#### CalendarUtils

Client-side calendar generation and date manipulation using native JavaScript.

```javascript
import { CalendarUtils } from './calendar-utils.js';

// Generate calendar grid for November 2025
const weeks = CalendarUtils.generateMonthGrid(2025, 10, 0);
// Returns array of weeks with day metadata

// Format date as YYYY-MM-DD
const formatted = CalendarUtils.formatDate(2025, 10, 14); // '2025-11-14'

// Parse date string
const { year, month, day } = CalendarUtils.parseDate('2025-11-14');

// Date arithmetic
const tomorrow = CalendarUtils.addDays('2025-11-14', 1);
const nextMonth = CalendarUtils.addMonths('2025-11-14', 1);
const nextYear = CalendarUtils.addYears('2025-11-14', 1);

// Date comparisons
const isBefore = CalendarUtils.isBefore('2025-11-14', '2025-11-15');
const isAfter = CalendarUtils.isAfter('2025-11-14', '2025-11-13');
const isSame = CalendarUtils.isSameDate('2025-11-14', '2025-11-14');

// Get today's date
const today = CalendarUtils.today(); // '2025-11-14'

// Get day/month names
const dayNames = CalendarUtils.getDayNames(0, 'en-US', 'short');
const monthNames = CalendarUtils.getMonthNames('en-US', 'long');

// Get date range
const dates = CalendarUtils.getDateRange('2025-11-01', '2025-11-30');
```

#### DateFormatter

Client-side date formatting using native Intl API.

```javascript
import { DateFormatter } from './date-formatter.js';

// Format using presets
const short = DateFormatter.format('2025-11-14', 'short', 'en-US');
const medium = DateFormatter.format('2025-11-14', 'medium', 'en-US');
const long = DateFormatter.format('2025-11-14', 'long', 'en-US');
const full = DateFormatter.format('2025-11-14', 'full', 'en-US');

// Format time
const time12 = DateFormatter.formatTime('2025-11-14T15:45:00', false, 'en-US');
const time24 = DateFormatter.formatTime('2025-11-14T15:45:00', true, 'en-US');

// Format datetime
const datetime = DateFormatter.formatDateTime('2025-11-14T15:45:00', 'medium', false, 'en-US');

// Relative time
const relative = DateFormatter.relative('2025-11-14T12:00:00', 'en-US');
// "2 hours ago"

// Format date range
const range = DateFormatter.formatRange('2025-11-14', '2025-11-21', 'medium', 'en-US');
// "Nov 14 – 21, 2025" (using native formatRange)

// Get localized names
const monthName = DateFormatter.getMonthName(10, 'long', 'fr'); // Novembre
const dayName = DateFormatter.getDayName(4, 'long', 'ar'); // الخميس

// Get ARIA label for accessibility
const ariaLabel = DateFormatter.getAriaLabel('2025-11-14', 'en-US');
// "Thursday, November 14, 2025"

// Check locale direction
const isRTL = DateFormatter.isRTL('ar'); // true
```

### Translation Keys

All date-related translations are in `resources/lang/{locale}/spire-ui.php` under the `date` key.

```php
// Access translations
__('spire-ui::date.today')              // Today / Aujourd'hui / اليوم
__('spire-ui::date.tomorrow')           // Tomorrow / Demain / غداً
__('spire-ui::date.yesterday')          // Yesterday / Hier / أمس
__('spire-ui::date.select_date')        // Select a date
__('spire-ui::date.previous_month')     // Previous month
__('spire-ui::date.next_month')         // Next month

// Month names
__('spire-ui::date.months.long')        // Array of month names
__('spire-ui::date.months.short')       // Array of short month names

// Day names
__('spire-ui::date.days.long')          // Array of day names
__('spire-ui::date.days.short')         // Array of short day names
__('spire-ui::date.days.min')           // Array of minimal day names (single letter)

// Error messages
__('spire-ui::date.error.before_min_date', ['date' => $minDate])
__('spire-ui::date.error.after_max_date', ['date' => $maxDate])
__('spire-ui::date.error.date_disabled')
__('spire-ui::date.error.invalid_date')
```

### Building Date Components

When building date picker, calendar, or time picker components, follow these patterns:

#### 1. Server-Side Calendar Generation

Generate the calendar grid on the server for initial render:

```php
@php
use SpireUI\Support\CalendarState;
use SpireUI\Support\DateFormatter;

$currentMonth = now();
$weeks = CalendarState::generateMonthGrid($currentMonth);
$dayNames = CalendarState::getDayNames(
    DateFormatter::getFirstDayOfWeek(),
    'short'
);
@endphp

<div class="calendar">
    <div class="calendar-header">
        @foreach($dayNames as $dayName)
            <div>{{ $dayName }}</div>
        @endforeach
    </div>

    @foreach($weeks as $week)
        <div class="calendar-week">
            @foreach($week as $day)
                <button
                    type="button"
                    @class([
                        'calendar-day',
                        'other-month' => !$day['isCurrentMonth'],
                        'today' => $day['isToday'],
                        'weekend' => $day['isWeekend'],
                    ])
                >
                    {{ $day['day'] }}
                </button>
            @endforeach
        </div>
    @endforeach
</div>
```

#### 2. Client-Side Interactivity with Alpine

Use Alpine for dynamic calendar updates:

```javascript
// datepicker.js
export function datepicker(config = {}) {
    return {
        value: config.value || '',
        viewingYear: new Date().getFullYear(),
        viewingMonth: new Date().getMonth(),
        minDate: config.minDate || null,
        maxDate: config.maxDate || null,
        disabledDates: config.disabledDates || [],

        weeks: [],

        init() {
            this.generateCalendar();
        },

        generateCalendar() {
            this.weeks = CalendarUtils.generateMonthGrid(
                this.viewingYear,
                this.viewingMonth,
                0 // first day of week
            );
        },

        selectDate(dateString) {
            if (!this.isDateDisabled(dateString)) {
                this.value = dateString;
            }
        },

        nextMonth() {
            this.viewingMonth++;
            if (this.viewingMonth > 11) {
                this.viewingMonth = 0;
                this.viewingYear++;
            }
            this.generateCalendar();
        },

        previousMonth() {
            this.viewingMonth--;
            if (this.viewingMonth < 0) {
                this.viewingMonth = 11;
                this.viewingYear--;
            }
            this.generateCalendar();
        },

        isDateDisabled(dateString) {
            if (this.minDate && CalendarUtils.isBefore(dateString, this.minDate)) {
                return true;
            }
            if (this.maxDate && CalendarUtils.isAfter(dateString, this.maxDate)) {
                return true;
            }
            return this.disabledDates.includes(dateString);
        },
    };
}
```

#### 3. Timezone Handling

Always handle timezones on the server:

```php
// In your Livewire component
class AppointmentForm extends Component
{
    public $appointmentDate;

    public function mount()
    {
        // Display in user's timezone
        $this->appointmentDate = TimezoneConverter::formatForDisplay(
            $this->appointment->scheduled_at
        )->toDateString();
    }

    public function save()
    {
        $this->validate([
            'appointmentDate' => 'required|date',
        ]);

        // Store in UTC
        $utcDate = TimezoneConverter::formatForStorage(
            Carbon::parse($this->appointmentDate)
        );

        $this->appointment->update([
            'scheduled_at' => $utcDate,
        ]);
    }
}
```

#### 4. Validation Integration

Integrate with Laravel's validation system:

```php
// Form Request
public function rules(): array
{
    return [
        'appointment_date' => [
            'required',
            'date',
            'after:today',
            'before:' . now()->addMonths(6)->toDateString(),
        ],
    ];
}

// Component
@php
use SpireUI\Support\DateValidator;

$hasError = $errors->has('appointment_date');
$effectiveColor = $hasError ? 'error' : $color;
@endphp

<x-spire::field
    label="Appointment Date"
    for="appointment_date"
    required
    error="appointment_date"
>
    <x-spire::datepicker
        id="appointment_date"
        wire:model="appointment_date"
        color="{{ $effectiveColor }}"
        :min-date="now()->toDateString()"
        :max-date="now()->addMonths(6)->toDateString()"
    />
</x-spire::field>
```

### Accessibility Requirements

Date components must be fully accessible:

```blade
{{-- Calendar grid with proper ARIA --}}
<div role="grid" aria-label="{{ __('spire-ui::date.select_date') }}">
    <div role="row">
        @foreach($dayNames as $dayName)
            <div role="columnheader">{{ $dayName }}</div>
        @endforeach
    </div>

    @foreach($weeks as $week)
        <div role="row">
            @foreach($week as $day)
                <button
                    type="button"
                    role="gridcell"
                    aria-label="{{ DateFormatter::format($day['carbon'], 'full') }}"
                    aria-selected="{{ $day['date'] === $value ? 'true' : 'false' }}"
                    aria-disabled="{{ $isDisabled ? 'true' : 'false' }}"
                    @if($day['isToday']) aria-current="date" @endif
                >
                    {{ $day['day'] }}
                </button>
            @endforeach
        </div>
    @endforeach
</div>
```

**Keyboard Navigation (to be implemented in components):**
- Arrow keys: Navigate between days
- Page Up/Down: Previous/next month
- Home/End: First/last day of week
- Enter/Space: Select date
- Escape: Close calendar

### API Design Principles

The date/time API follows these principles:

1. **Hybrid Architecture**: PHP for calendar calculations, JavaScript for interactivity
2. **Server-Side Timezone**: All timezone conversions happen on server
3. **Native APIs**: No external dependencies (Carbon + native JS)
4. **Full i18n**: Support for EN, FR, AR out of the box
5. **Timezone-Aware**: UTC storage, user timezone display
6. **Validation-Ready**: Integrate with Laravel validation
7. **Accessibility-First**: WCAG 2.2 AA compliance built-in

---

## Best Practices Checklist

Use this checklist when creating or refactoring components:

### Component Structure

- [ ] Props defined at top with sensible defaults
- [ ] PHP section organized: imports → base classes → conditional classes → build → merge
- [ ] Template uses computed variables, not inline logic
- [ ] Follows folder-based structure with `index.blade.php`

### Styling

- [ ] Uses `ComponentStyles::buildClassString()` for class assembly
- [ ] Uses `ComponentStyles::colorClasses()` for variants
- [ ] Uses `ComponentStyles::sizeClasses()` for sizing
- [ ] Uses `ComponentStyles::radiusClasses()` for border radius
- [ ] Base classes separated from conditional classes
- [ ] No hardcoded classes in template

### Variants & Colors

- [ ] Variants added to `ComponentStyles::colorVariants()`
- [ ] Supports all 7 colors (default, primary, secondary, success, error, warning, info)
- [ ] Naming follows `{component}-{variant}` convention for component-specific variants
- [ ] Variants include all necessary states (hover, focus, active)

### Form Components (if applicable)

- [ ] Supports `invalid` and `valid` props
- [ ] Integrates with Laravel's `$errors` bag
- [ ] Uses `focus-within:` for container-level focus
- [ ] Handles `disabled`, `readonly`, `required` states
- [ ] Includes proper ARIA attributes
- [ ] Works with Field component wrapper

### Theme & Tokens

- [ ] Uses semantic tokens (`bg-surface`, `text-text`, etc.)
- [ ] Shadow levels appropriate for component elevation
- [ ] No hardcoded color values
- [ ] Supports light/dark mode via theme tokens

### Accessibility

- [ ] Proper ARIA attributes (`aria-invalid`, `aria-required`, etc.)
- [ ] Keyboard navigation support
- [ ] Focus states clearly visible
- [ ] Disabled state uses `cursor-not-allowed`
- [ ] Labels properly associated with inputs

### Documentation

- [ ] PHPDoc blocks for complex logic
- [ ] Prop descriptions for non-obvious behavior
- [ ] Usage examples in comments (optional)

### Livewire Integration

- [ ] Wire attributes pass through correctly
- [ ] No conflicts with Livewire morphing
- [ ] Uses `wire:ignore` when necessary (Alpine components)

---

## Additional Resources

- **ComponentStyles.php**: Source of truth for styling utilities
- **theme.css**: Semantic tokens and design system variables
- **Button component**: Gold standard example for interactive elements
- **Input component**: Gold standard example for form elements
- **Field component**: Layout wrapper for form elements

---

## Contributing

When adding new patterns or improving existing ones, update this guide to reflect the changes. Keep the Quick Reference section current with the most common patterns.

**Last Updated:** 2025-11-13
