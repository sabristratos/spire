# Datepicker Component

A rich date selection input with popover calendar, supporting single date, date range, and multiple date selection with segmented input, presets, and internationalization.

## Overview

The Datepicker component provides a complete date input solution with:

- **Single mode** - Select one date with segmented input (MM/DD/YYYY)
- **Range mode** - Select start and end dates with presets
- **Multiple mode** - Select multiple dates displayed as chips

**Key features:**
- Segmented date input with auto-advance
- Popover calendar for visual selection
- Date constraints (min/max, disabled dates, disabled days of week)
- Range constraints (min/max range length)
- Built-in presets for common ranges
- Internationalization via locale
- Auto-detect date format by locale
- Keyboard navigation
- Full ARIA accessibility

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mode` | string | `'single'` | Selection mode: `single`, `range`, `multiple` |
| `placeholder` | string | `null` | Placeholder text (auto-translated) |
| `placement` | string | `'bottom-start'` | Popover placement |
| `disabled` | boolean | `false` | Disable the input |
| `width` | string | `'md'` | Content width: `sm`, `md`, `lg`, `auto` |
| `format` | string | `'auto'` | Date format or `auto` for locale detection |
| `minDate` | string | `null` | Minimum selectable date (YYYY-MM-DD) |
| `maxDate` | string | `null` | Maximum selectable date (YYYY-MM-DD) |
| `disabledDates` | array | `[]` | Specific disabled dates (YYYY-MM-DD format) |
| `disabledDaysOfWeek` | array | `[]` | Disabled days (0=Sunday, 6=Saturday) |
| `locale` | string | `null` | Locale for formatting (defaults to browser) |
| `firstDayOfWeek` | int | `null` | First day of week (0=Sunday, 1=Monday) |
| `minRange` | int | `null` | Minimum days required in range |
| `maxRange` | int | `null` | Maximum days allowed in range |
| `maxDates` | int | `null` | Maximum dates in multiple mode |
| `maxChipsDisplay` | int | `3` | Max chips to show before overflow |
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
public ?array $dateRange = null;  // null when empty

// With values:
public ?array $dateRange = ['start' => '2025-01-01', 'end' => '2025-01-15'];
```

### Multiple Mode

```php
public array $selectedDates = [];  // ['2025-01-01', '2025-01-15', '2025-01-20']
```

---

## Examples

### Basic Single Date

```blade
<x-spire::datepicker wire:model="selectedDate" />
```

### With Placeholder

```blade
<x-spire::datepicker
    wire:model="selectedDate"
    placeholder="Select a date"
/>
```

### Range Selection

```blade
<x-spire::datepicker
    wire:model.live="dateRange"
    mode="range"
/>
```

### Range with Presets

Shows sidebar with quick selection options:

```blade
<x-spire::datepicker
    wire:model.live="dateRange"
    mode="range"
    showPresets
    :presets="[
        ['key' => 'last_7_days', 'label' => 'Last 7 days'],
        ['key' => 'last_30_days', 'label' => 'Last 30 days'],
        ['key' => 'this_month', 'label' => 'This month'],
        ['key' => 'last_month', 'label' => 'Last month'],
    ]"
/>
```

### Multiple Selection

```blade
<x-spire::datepicker
    wire:model="selectedDates"
    mode="multiple"
    :maxDates="5"
    :maxChipsDisplay="3"
/>
```

### With Date Constraints

```blade
<x-spire::datepicker
    wire:model="appointmentDate"
    :minDate="now()->format('Y-m-d')"
    :maxDate="now()->addMonths(3)->format('Y-m-d')"
    :disabledDaysOfWeek="[0, 6]"
/>
```

### Booking System (Range Length Constraints)

```blade
<x-spire::datepicker
    wire:model="vacationRange"
    mode="range"
    :minRange="3"
    :maxRange="14"
    :minDate="now()->format('Y-m-d')"
/>
```

### Custom Locale

```blade
<x-spire::datepicker
    wire:model="selectedDate"
    locale="de-DE"
    :firstDayOfWeek="1"
/>
```

### Livewire Integration

```php
class DateSelector extends Component
{
    // Single mode
    public string $selectedDate = '';

    // Range mode - use null for empty
    public ?array $dateRange = null;

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

    // Filter example
    public function getUsersProperty()
    {
        return User::query()
            ->when($this->dateRange, fn($q) =>
                $q->whereBetween('created_at', [
                    $this->dateRange['start'],
                    $this->dateRange['end']
                ])
            )
            ->get();
    }
}
```

### Event Handling

```blade
<div
    x-data
    @spire-datepicker-cleared="console.log('Cleared:', $event.detail)"
    @spire-date-selected="console.log('Selected:', $event.detail.value)"
>
    <x-spire::datepicker wire:model.live="selectedDate" />
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

Available preset keys:
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
| `formattedDate` | string | Formatted single date |
| `formattedRangeStart` | string | Formatted range start |
| `formattedRangeEnd` | string | Formatted range end |
| `selectedCount` | number | Count of selected dates (multiple mode) |

### Key Methods

| Method | Description |
|--------|-------------|
| `setToday()` | Select today |
| `clearDate()` | Clear selection |
| `handleCalendarSelect(date)` | Handle calendar selection |
| `selectPreset(preset)` | Apply a preset range |

### Events

#### spire-datepicker-cleared

Dispatched when dates are cleared:

```javascript
{
    id: 'datepicker-id',
    value: '',  // or null for range, [] for multiple
    previousValue: '2025-01-15',
    metadata: { mode: 'single' },
    timestamp: 1699999999999
}
```

#### spire-date-selected

Dispatched when a date is selected (from calendar component).

---

## Accessibility

### ARIA Support

- `aria-haspopup="dialog"` on trigger
- `aria-expanded` state
- `aria-controls` linking trigger to content
- `aria-label` on segments and buttons
- `aria-invalid` for error state

### Keyboard Navigation

- **Tab** - Navigate between segments
- **Arrow keys** - Navigate within calendar
- **Enter/Space** - Select date in calendar
- **Escape** - Close popover
- **Arrow Up/Down** - Increment/decrement segment values
- **Backspace** - Clear segment and move to previous

### Segmented Input

Each segment (month, day, year) is independently focusable with:
- Auto-advance on complete input
- Paste support for full dates
- Validation feedback

---

## Date Formats

### Auto-Detection

When `format="auto"` (default), format is detected by locale:

| Locale | Format |
|--------|--------|
| en-US | MM/DD/YYYY |
| en-GB, fr-FR, de-DE | DD/MM/YYYY |
| zh-CN, ja-JP, ko-KR | YYYY-MM-DD |

### Custom Format

```blade
<x-spire::datepicker
    wire:model="date"
    format="YYYY-MM-DD"
/>
```

---

## Best Practices

### Do

- Use `wire:model.live` for reactive filtering
- Set appropriate `minDate`/`maxDate` for business constraints
- Use `mode="range"` with `showPresets` for reporting/analytics
- Use `disabledDaysOfWeek` to block weekends for business scheduling
- Set `maxDates` in multiple mode to prevent over-selection
- Use `null` as initial value for range mode filters
- Provide meaningful placeholder text

### Don't

- Don't set `maxRange` smaller than `minRange`
- Don't use `showPresets` with single or multiple mode (ignored)
- Don't disable all dates
- Don't use `{ start: '', end: '' }` for empty range (use `null`)
- Don't forget different value structures for each mode

---

## Technical Notes

### Date Format

All dates use ISO format internally: `YYYY-MM-DD`

### Range Clearing

When clearing a range datepicker, value is set to `null` (not `{ start: '', end: '' }`).
This ensures filter conditions like `when($this->dateRange, ...)` work correctly.

### Locale Support

Uses native `Intl.DateTimeFormat` for:
- Month and day names in calendar
- Date format detection
- First day of week determination

### Translations

Key translations under `spire-ui::spire-ui.datepicker`:

- `placeholder`, `range_placeholder`, `multiple_placeholder`
- `start_date`, `end_date`
- `today`, `clear`
- `month`, `day`, `year`
- `open_picker`, `remove_date`
