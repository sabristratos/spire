# Calendar Component

Full-featured date selection component supporting single date, date range, and multiple date selection with month/year navigation, presets, and internationalization.

## Overview

The Calendar component provides a rich date selection interface with:

- **Single mode** - Select one date
- **Range mode** - Select start and end dates with optional presets
- **Multiple mode** - Select multiple individual dates

**Key features:**
- Month/year picker navigation
- Date constraints (min/max, disabled dates, disabled days of week)
- Range constraints (min/max range length)
- Built-in presets for common ranges
- Internationalization via locale
- Keyboard navigation
- Full ARIA accessibility

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | string | `'single'` | Selection mode: `single`, `range`, `multiple` |
| `size` | string | `'md'` | Size variant: `sm`, `md`, `lg` |
| `minDate` | string | `null` | Minimum selectable date (YYYY-MM-DD) |
| `maxDate` | string | `null` | Maximum selectable date (YYYY-MM-DD) |
| `disabledDates` | array | `[]` | Specific disabled dates (YYYY-MM-DD format) |
| `disabledDaysOfWeek` | array | `[]` | Disabled days (0=Sunday, 6=Saturday) |
| `locale` | string | `null` | Locale for formatting (defaults to app locale) |
| `firstDayOfWeek` | int | `null` | First day of week (0=Sunday, 1=Monday) |
| `minRange` | int | `null` | Minimum days required in range |
| `maxRange` | int | `null` | Maximum days allowed in range |
| `maxDates` | int | `null` | Maximum dates in multiple mode |
| `showFooter` | boolean | `true` | Show footer with Clear/Today buttons |
| `showClearButton` | boolean | `true` | Show Clear button |
| `showTodayButton` | boolean | `true` | Show Today button |
| `todayButtonBehavior` | string | `'single-day'` | Today behavior in range: `single-day`, `start-only` |
| `showPresets` | boolean | `false` | Show preset sidebar (range mode only) |
| `presets` | array | `[]` | Custom presets (uses defaults if empty) |

---

## Value Structure

### Single Mode

```php
public string $selectedDate = '';  // '2025-01-15' or ''
```

### Range Mode

```php
public array $dateRange = ['start' => null, 'end' => null];

// With values:
public array $dateRange = ['start' => '2025-01-01', 'end' => '2025-01-15'];
```

### Multiple Mode

```php
public array $selectedDates = [];  // ['2025-01-01', '2025-01-15', '2025-01-20']
```

---

## Examples

### Basic Single Date

```blade
<x-spire::calendar wire:model="selectedDate" />
```

### Range Selection

```blade
<x-spire::calendar
    wire:model="dateRange"
    mode="range"
/>
```

### Range with Presets

Shows sidebar with quick selection options:

```blade
<x-spire::calendar
    wire:model="dateRange"
    mode="range"
    :show-presets="true"
/>
```

### Multiple Selection

```blade
<x-spire::calendar
    wire:model="selectedDates"
    mode="multiple"
    :max-dates="5"
/>
```

### With Date Constraints

```blade
<x-spire::calendar
    wire:model="appointmentDate"
    min-date="2025-01-01"
    max-date="2025-12-31"
    :disabled-days-of-week="[0, 6]"
/>
```

### With Specific Disabled Dates

Block holidays or unavailable dates:

```blade
<x-spire::calendar
    wire:model="selectedDate"
    :disabled-dates="['2025-01-01', '2025-12-25', '2025-12-31']"
/>
```

### Range with Length Constraints

Useful for booking systems:

```blade
<x-spire::calendar
    wire:model="vacationRange"
    mode="range"
    :min-range="3"
    :max-range="14"
/>
```

### Custom Locale

```blade
<x-spire::calendar
    wire:model="selectedDate"
    locale="fr-FR"
    :first-day-of-week="1"
/>
```

### Without Footer

```blade
<x-spire::calendar
    wire:model="selectedDate"
    :show-footer="false"
/>
```

### Custom Presets

```blade
<x-spire::calendar
    wire:model="dateRange"
    mode="range"
    :show-presets="true"
    :presets="[
        ['key' => 'last_7_days', 'label' => 'Past Week'],
        ['key' => 'last_30_days', 'label' => 'Past Month'],
        ['key' => 'this_month', 'label' => 'Current Month'],
    ]"
/>
```

### Size Variants

```blade
<x-spire::calendar wire:model="date" size="sm" />
<x-spire::calendar wire:model="date" size="md" />
<x-spire::calendar wire:model="date" size="lg" />
```

### Today Button Behavior

In range mode, control what "Today" does:

```blade
{{-- Sets start=end=today (default) --}}
<x-spire::calendar
    wire:model="dateRange"
    mode="range"
    today-button-behavior="single-day"
/>

{{-- Sets only start=today --}}
<x-spire::calendar
    wire:model="dateRange"
    mode="range"
    today-button-behavior="start-only"
/>
```

### Livewire Integration

```php
class DateSelector extends Component
{
    // Single mode
    public string $selectedDate = '';

    // Range mode
    public array $dateRange = ['start' => null, 'end' => null];

    // Multiple mode
    public array $selectedDates = [];

    public function mount()
    {
        // Set initial values
        $this->selectedDate = '2025-01-15';
        $this->dateRange = [
            'start' => '2025-01-01',
            'end' => '2025-01-31'
        ];
    }
}
```

### Event Handling

```blade
<div
    x-data
    @spire-date-selected="console.log('Selected:', $event.detail.value)"
>
    <x-spire::calendar wire:model="selectedDate" />
</div>
```

---

## Built-in Presets

When `showPresets` is enabled without custom presets:

| Preset | Description |
|--------|-------------|
| Last 7 days | Previous 7 days including today |
| Last 30 days | Previous 30 days including today |
| This week | Current week |
| Last week | Previous full week |
| This month | First of month to today |
| Last month | Full previous month |

### Custom Preset Keys

Available preset keys for custom presets:
- `last_7_days`
- `last_30_days`
- `this_week`
- `last_week`
- `this_month`
- `last_month`

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | string\|object\|array | Current selection |
| `mode` | string | Selection mode |
| `displayMonth` | number | Current month (0-11) |
| `displayYear` | number | Current year |
| `hasSelection` | boolean | Whether any date is selected |

### Key Methods

| Method | Description |
|--------|-------------|
| `selectDate(dateString)` | Select a date |
| `clearSelection()` | Clear all selected dates |
| `selectToday()` | Select today |
| `selectPreset(preset)` | Apply a preset range |
| `nextMonth()` | Navigate to next month |
| `previousMonth()` | Navigate to previous month |
| `isDisabled(day)` | Check if day is disabled |
| `isDateSelected(dateString)` | Check if date is selected |
| `isDateInRange(dateString)` | Check if date is in range |

### Events

#### spire-date-selected

Dispatched when a date is selected:

```javascript
{
    id: 'calendar-id',
    name: 'selectedDate',
    value: '2025-01-15',
    previousValue: '2025-01-10',
    timestamp: 1699999999999
}
```

---

## Accessibility

### ARIA Support

- `role="grid"` on calendar container
- `role="gridcell"` on day cells
- `aria-selected` on selected dates
- `aria-disabled` on disabled dates
- `aria-current="date"` on today
- `aria-live="polite"` for announcements

### Keyboard Navigation

- **Enter/Space** - Select date
- **Escape** - Close pickers
- Focus management in month/year pickers

### Screen Reader Announcements

- Selection changes announced
- Full date descriptions via `aria-label`
- Preset application announced

---

## Best Practices

### Do

- Use `mode="range"` with `showPresets` for common date range scenarios
- Set appropriate `minDate`/`maxDate` for business constraints
- Use `disabledDaysOfWeek` to block weekends for business scheduling
- Provide `locale` for internationalized applications
- Set reasonable `maxDates` in multiple mode
- Use `minRange`/`maxRange` for booking duration requirements

### Don't

- Don't set `maxRange` smaller than `minRange`
- Don't use `showPresets` with single or multiple mode (ignored)
- Don't disable all dates
- Don't hide footer when users need Clear/Today actions
- Don't forget different value structures for each mode

---

## Technical Notes

### Date Format

All dates use ISO format: `YYYY-MM-DD`

### Locale Support

Uses native `Intl.DateTimeFormat` for:
- Month and day names
- First day of week (if not specified)

### First Day of Week

Automatically determined by locale if not specified:
- Sunday (0) for en-US
- Monday (1) for European locales
- Saturday (6) for Arabic locales

### Translations

Key translations under `spire-ui::spire-ui.date`:

- `today`, `clear`, `select`
- `previous_month`, `next_month`
- `preset_last_7_days`, `preset_last_30_days`
- `preset_this_week`, `preset_last_week`
- `preset_this_month`, `preset_last_month`
- `max_dates_reached`, `range_selected`
