# Timepicker Component

A time selection input with popover scroll columns, supporting 12-hour and 24-hour formats with customizable minute intervals and optional seconds.

## Overview

The Timepicker component provides an intuitive time input solution with:

- **Segmented input** - Click-to-edit hour, minute, and optional second segments
- **Scroll columns** - Visual selection with snap-to-center behavior
- **12/24 hour support** - Auto-detect or explicit format selection
- **Minute stepping** - Customizable intervals (1, 5, 15, 30 minutes)

**Key features:**
- Segmented time input with auto-advance
- Popover with scrollable columns
- Auto-detect 12/24 hour format by locale
- AM/PM toggle for 12-hour format
- Now and Clear quick actions
- Keyboard navigation
- ARIA accessibility

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | string | `null` | Placeholder text (auto-translated) |
| `placement` | string | `'bottom-start'` | Popover placement |
| `disabled` | boolean | `false` | Disable the input |
| `use24Hour` | boolean | `null` | Force 12/24 hour (null = auto-detect) |
| `minuteStep` | int | `1` | Minute interval: 1, 5, 15, 30 |
| `showSeconds` | boolean | `false` | Show seconds column |

---

## Value Format

Time values are stored as strings:

```php
// Without seconds
public ?string $selectedTime = null;  // '14:30' or null

// With seconds
public ?string $selectedTime = null;  // '14:30:45' or null
```

**Format:** `HH:MM` or `HH:MM:SS` (24-hour format)

---

## Examples

### Basic Usage

```blade
<x-spire::timepicker wire:model="selectedTime" />
```

### With Placeholder

```blade
<x-spire::timepicker
    wire:model="selectedTime"
    placeholder="Select time"
/>
```

### 24-Hour Format

```blade
<x-spire::timepicker
    wire:model="selectedTime"
    :use24Hour="true"
/>
```

### 12-Hour Format (AM/PM)

```blade
<x-spire::timepicker
    wire:model="selectedTime"
    :use24Hour="false"
/>
```

### With Minute Steps

15-minute intervals for scheduling:

```blade
<x-spire::timepicker
    wire:model="appointmentTime"
    :minuteStep="15"
/>
```

30-minute intervals:

```blade
<x-spire::timepicker
    wire:model="meetingTime"
    :minuteStep="30"
/>
```

### With Seconds

```blade
<x-spire::timepicker
    wire:model="preciseTime"
    :showSeconds="true"
/>
```

### Disabled State

```blade
<x-spire::timepicker
    wire:model="lockedTime"
    :disabled="true"
/>
```

### Reactive Filtering

```blade
<x-spire::timepicker
    wire:model.live="activeAfter"
    placeholder="Filter by time"
    :minuteStep="15"
/>
```

### Livewire Integration

```php
class TimeSelector extends Component
{
    public ?string $selectedTime = null;
    public ?string $startTime = null;
    public ?string $endTime = null;

    public function mount()
    {
        // Set initial values
        $this->selectedTime = '09:00';
        $this->startTime = '08:00';
        $this->endTime = '17:00';
    }

    // Filter example
    public function getItemsProperty()
    {
        return Item::query()
            ->when($this->startTime, fn($q) =>
                $q->where('time', '>=', $this->startTime)
            )
            ->when($this->endTime, fn($q) =>
                $q->where('time', '<=', $this->endTime)
            )
            ->get();
    }
}
```

### In a Form

```blade
<x-spire::form wire:submit="save">
    <x-spire::field label="Appointment Time" for="time">
        <x-spire::timepicker
            wire:model="appointmentTime"
            :minuteStep="15"
            placeholder="Select appointment time"
        />
    </x-spire::field>

    <x-spire::button type="submit">
        Schedule
    </x-spire::button>
</x-spire::form>
```

### Time Range (Two Pickers)

```blade
<div class="flex items-center gap-2">
    <x-spire::timepicker
        wire:model="startTime"
        placeholder="Start"
        :minuteStep="30"
    />
    <span class="text-muted">to</span>
    <x-spire::timepicker
        wire:model="endTime"
        placeholder="End"
        :minuteStep="30"
    />
</div>
```

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Current time value (HH:MM or HH:MM:SS) |
| `hour` | number | Current hour (0-23) |
| `minute` | number | Current minute (0-59) |
| `second` | number | Current second (0-59) |
| `period` | string | AM or PM (12-hour mode) |
| `use24Hour` | boolean | Whether using 24-hour format |
| `minuteStep` | number | Minute interval |
| `showSeconds` | boolean | Whether showing seconds |

### Key Methods

| Method | Description |
|--------|-------------|
| `setNow()` | Set to current time |
| `clearTime()` | Clear time value |
| `formatDisplayTime()` | Get formatted display string |
| `parseTimeValue(string)` | Parse time string to components |

---

## Accessibility

### ARIA Support

- `aria-haspopup="dialog"` on trigger
- `aria-expanded` state
- `aria-controls` linking trigger to content
- `aria-label` on each segment
- `role="listbox"` on scroll columns
- `role="option"` on selectable items

### Keyboard Navigation

- **Tab** - Navigate between segments
- **Arrow Up/Down** - Increment/decrement values
- **Enter** - Confirm selection
- **Escape** - Close popover
- **A/P keys** - Toggle AM/PM in 12-hour mode

### Segmented Input

Each segment (hour, minute, second, period) is independently focusable with:
- Click to focus and select all
- Type to replace value
- Auto-advance on complete input

---

## 12-Hour vs 24-Hour

### Auto-Detection

When `use24Hour` is `null` (default), format is detected by browser locale:

| Locale | Format |
|--------|--------|
| en-US | 12-hour (AM/PM) |
| en-GB, de-DE, fr-FR | 24-hour |

### Display vs Storage

**Storage:** Always 24-hour format (`14:30`)

**Display:** Depends on `use24Hour` setting
- 24-hour: `14:30`
- 12-hour: `2:30 PM`

---

## Minute Step Intervals

The `minuteStep` prop controls available minute options:

| Step | Available Minutes |
|------|-------------------|
| 1 | 00, 01, 02, ... 59 |
| 5 | 00, 05, 10, 15, ... 55 |
| 15 | 00, 15, 30, 45 |
| 30 | 00, 30 |

Common use cases:
- **1** - Precise time logging
- **5** - General scheduling
- **15** - Appointment slots
- **30** - Meeting blocks

---

## Best Practices

### Do

- Use `wire:model.live` for reactive filtering
- Use appropriate `minuteStep` for the use case (15 or 30 for appointments)
- Set `use24Hour` explicitly for business applications
- Use `null` as initial value for optional time filters
- Provide meaningful placeholder text
- Use `showSeconds` only when precision is needed

### Don't

- Don't use `showSeconds` for scheduling (unnecessary precision)
- Don't use `minuteStep="1"` for appointment booking (too many options)
- Don't forget to handle `null` values in your logic
- Don't mix 12-hour display with 24-hour expectations

---

## Technical Notes

### Time Format

All times are stored in 24-hour format: `HH:MM` or `HH:MM:SS`

### Scroll Behavior

The popover columns use CSS scroll-snap for smooth selection:
- Centered snap alignment
- Momentum scrolling on touch devices
- Automatic centering on selection

### Translations

Key translations under `spire-ui::spire-ui.timepicker`:

- `placeholder`
- `now`, `clear`
- `hour`, `minute`, `second`
- `period` (AM/PM label)

### Form Integration

Works with standard Laravel validation:

```php
public function rules()
{
    return [
        'selectedTime' => 'nullable|date_format:H:i',
        'preciseTime' => 'nullable|date_format:H:i:s',
    ];
}
```

---

## Common Patterns

### Opening Hours Selector

```blade
<div class="grid grid-cols-2 gap-4">
    <x-spire::field label="Opens At">
        <x-spire::timepicker
            wire:model="opensAt"
            :minuteStep="30"
            :use24Hour="true"
        />
    </x-spire::field>

    <x-spire::field label="Closes At">
        <x-spire::timepicker
            wire:model="closesAt"
            :minuteStep="30"
            :use24Hour="true"
        />
    </x-spire::field>
</div>
```

### Filter by Activity Time

```blade
<x-spire::field label="Active After">
    <x-spire::timepicker
        wire:model.live="activeAfter"
        placeholder="Filter by time"
        :minuteStep="15"
    />
</x-spire::field>
```

### Appointment Booking

```blade
<x-spire::field label="Preferred Time" required>
    <x-spire::timepicker
        wire:model="preferredTime"
        :minuteStep="15"
        :use24Hour="false"
        placeholder="Select preferred time"
    />
    @error('preferredTime')
        <span class="text-sm text-error">{{ $message }}</span>
    @enderror
</x-spire::field>
```
