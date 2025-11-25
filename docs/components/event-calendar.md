# Event Calendar Component

Full-featured event calendar component supporting month, week, and day views with timed events, all-day events, multi-day spanning events, and full accessibility.

## Overview

The Event Calendar component provides a rich interface for displaying and interacting with events:

- **Month view** - Traditional calendar grid with events
- **Week view** - Time grid showing hourly slots
- **Day view** - Single day with hourly time slots

**Key features:**
- Timed, all-day, and multi-day spanning events
- View switching with navigation
- Event click and date click handlers
- Overflow popover for days with many events
- Responsive design (auto-switches to day view on mobile)
- Keyboard navigation
- Full ARIA accessibility
- Internationalization via locale

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | array | `[]` | Array of event objects to display |
| `view` | string | `'month'` | Initial view: `month`, `week`, `day` |
| `date` | string | `null` | Initial date to display (YYYY-MM-DD) |
| `locale` | string | `null` | Locale for formatting (defaults to app locale) |
| `firstDayOfWeek` | int | `null` | First day of week (0=Sunday, 1=Monday) |
| `maxEventsPerDay` | int | `3` | Max events shown per day before "+more" |
| `weekends` | bool | `true` | Show weekend columns |
| `startHour` | int | `6` | Start hour for time grid (week/day views) |
| `endHour` | int | `22` | End hour for time grid (week/day views) |
| `showViewSwitcher` | bool | `true` | Show month/week/day view buttons |

---

## Event Object Structure

Each event in the `events` array should have:

```php
[
    'id' => 1,                              // Required: Unique identifier
    'title' => 'Team Meeting',              // Required: Display title
    'start' => '2025-01-15T09:00:00',       // Required: Start datetime
    'end' => '2025-01-15T10:30:00',         // Optional: End datetime
    'allDay' => false,                      // Optional: All-day event flag
    'color' => 'blue',                      // Optional: Event color
    'description' => 'Weekly sync',         // Optional: Description
    'location' => 'Conference Room A',      // Optional: Location
]
```

### Date/Time Formats

- **Date only** (all-day): `'2025-01-15'`
- **With time**: `'2025-01-15T09:00:00'` or `'2025-01-15 09:00:00'`

### Color Options

Named colors: `blue`, `red`, `green`, `yellow`, `purple`, `pink`, `orange`, `teal`

Custom colors: Any valid hex (`#3b82f6`) or RGB (`rgb(59, 130, 246)`) value.

---

## Examples

### Basic Usage

```blade
<x-spire::event-calendar :events="$events" />
```

### With Event Handlers (Livewire)

```blade
<x-spire::event-calendar
    :events="$this->events"
    x-on:event-click="$wire.onEventClick($event.detail.event)"
    x-on:date-click="$wire.onDateClick($event.detail.date)"
/>
```

```php
class CalendarPage extends Component
{
    #[Computed]
    public function events(): array
    {
        return [
            [
                'id' => 1,
                'title' => 'Team Standup',
                'start' => '2025-01-15T09:00:00',
                'end' => '2025-01-15T09:30:00',
                'color' => 'blue',
            ],
            [
                'id' => 2,
                'title' => 'Company Holiday',
                'start' => '2025-01-20',
                'allDay' => true,
                'color' => 'green',
            ],
            [
                'id' => 3,
                'title' => 'Conference',
                'start' => '2025-01-22',
                'end' => '2025-01-24',
                'allDay' => true,
                'color' => 'purple',
            ],
        ];
    }

    public function onEventClick(array $event): void
    {
        // Handle event click
        $this->dispatch('open-modal', eventId: $event['id']);
    }

    public function onDateClick(string $date): void
    {
        // Handle date click (e.g., create new event)
        $this->dispatch('create-event', date: $date);
    }
}
```

### Week View

```blade
<x-spire::event-calendar
    :events="$events"
    view="week"
/>
```

### Day View

```blade
<x-spire::event-calendar
    :events="$events"
    view="day"
    date="2025-01-15"
/>
```

### Hide Weekends (Business Calendar)

```blade
<x-spire::event-calendar
    :events="$events"
    :weekends="false"
/>
```

### Custom Time Range

For a work-hours-only calendar:

```blade
<x-spire::event-calendar
    :events="$events"
    view="week"
    :start-hour="8"
    :end-hour="18"
/>
```

### Limit Events Per Day

```blade
<x-spire::event-calendar
    :events="$events"
    :max-events-per-day="2"
/>
```

### Without View Switcher

```blade
<x-spire::event-calendar
    :events="$events"
    view="month"
    :show-view-switcher="false"
/>
```

### Custom Locale

```blade
<x-spire::event-calendar
    :events="$events"
    locale="fr-FR"
    :first-day-of-week="1"
/>
```

### Custom Event Slot

Override how events are rendered:

```blade
<x-spire::event-calendar :events="$events">
    <x-slot:event>
        <div
            class="px-1 py-0.5 text-xs rounded truncate cursor-pointer"
            :style="{ backgroundColor: getEventColor(event) }"
            @click="handleEventClick(event, $event)"
        >
            <span x-text="event.title" class="text-white font-medium"></span>
        </div>
    </x-slot:event>
</x-spire::event-calendar>
```

### Custom Day Cell Slot

Override day cell rendering in month view:

```blade
<x-spire::event-calendar :events="$events">
    <x-slot:dayCell>
        <div class="h-full flex flex-col">
            <span
                class="text-sm font-medium"
                :class="day.isToday ? 'text-primary' : 'text-muted'"
                x-text="day.day"
            ></span>
            <div class="flex-1 overflow-hidden">
                <!-- Custom event rendering -->
            </div>
        </div>
    </x-slot:dayCell>
</x-spire::event-calendar>
```

---

## Events

### event-click

Dispatched when an event is clicked:

```javascript
{
    event: {
        id: 1,
        title: 'Team Meeting',
        start: '2025-01-15T09:00:00',
        // ... all event properties
    },
    jsEvent: MouseEvent
}
```

```blade
<x-spire::event-calendar
    :events="$events"
    x-on:event-click="console.log($event.detail.event)"
/>
```

### date-click

Dispatched when a date or time slot is clicked:

```javascript
{
    date: '2025-01-15',
    time: '09:00',      // Only in week/day view when clicking a time slot
    allDay: false,      // true if clicking day header or month cell
    jsEvent: MouseEvent
}
```

```blade
<x-spire::event-calendar
    :events="$events"
    x-on:date-click="console.log($event.detail.date, $event.detail.time)"
/>
```

### view-change

Dispatched when the view or visible date range changes:

```javascript
{
    view: 'month',
    start: '2025-01-01',
    end: '2025-01-31'
}
```

```blade
<x-spire::event-calendar
    :events="$events"
    x-on:view-change="loadEvents($event.detail.start, $event.detail.end)"
/>
```

---

## Slots

| Slot | Description | Available Variables |
|------|-------------|---------------------|
| `event` | Custom event rendering | `event` (event object) |
| `dayCell` | Custom day cell in month view | `day` (day object with `date`, `day`, `isToday`, `isCurrentMonth`, `events`) |

---

## Alpine.js API

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `events` | array | All events |
| `view` | string | Current view (`month`, `week`, `day`) |
| `displayMonth` | number | Current month (0-11) |
| `displayYear` | number | Current year |
| `monthName` | string | Localized month name |
| `weeks` | array | Month grid data (month view) |
| `weekDays` | array | Week days data (week view) |
| `currentDayDate` | string | Current day (day view) |
| `timeSlots` | array | Time slots for time grid |
| `isMobile` | boolean | Mobile viewport detected |

### Key Methods

| Method | Description |
|--------|-------------|
| `setView(view)` | Change view (`month`, `week`, `day`) |
| `previousPeriod()` | Navigate to previous month/week/day |
| `nextPeriod()` | Navigate to next month/week/day |
| `goToToday()` | Navigate to current date |
| `getEventsForDate(dateString)` | Get events for a specific date |
| `formatEventTime(event)` | Get formatted start time |
| `formatEventTimeRange(event)` | Get formatted time range |
| `getEventColor(event)` | Get CSS color for event |
| `isMultiDayEvent(event)` | Check if event spans multiple days |

---

## Accessibility

### ARIA Support

- `role="grid"` on calendar container
- `role="gridcell"` on day cells
- `aria-label` with full date and event count
- `aria-current="date"` on today
- `aria-live="polite"` region for announcements

### Keyboard Navigation

| Key | Action |
|-----|--------|
| **Arrow Left/Right** | Move focus to previous/next day |
| **Arrow Up/Down** | Move focus to previous/next week |
| **Home** | First day of week |
| **End** | Last day of week |
| **Ctrl+Home** | First day of year |
| **Ctrl+End** | Last day of year |
| **Page Up** | Previous month |
| **Page Down** | Next month |
| **Shift+Page Up** | Previous year |
| **Shift+Page Down** | Next year |
| **Enter/Space** | Trigger date click |

### Screen Reader Announcements

- Date changes announced with event count
- Month/year changes announced
- Event details read with title, time, and location

---

## Best Practices

### Do

- Provide unique `id` for each event
- Use semantic colors (red for urgent, green for confirmed, etc.)
- Set appropriate `maxEventsPerDay` based on your cell height
- Use `view-change` event to lazy-load events for the visible range
- Provide `description` and `location` for accessibility
- Use `weekends: false` for business applications

### Don't

- Don't create events without an `id` (slot assignment breaks)
- Don't use very long event titles (they truncate)
- Don't set `endHour` less than or equal to `startHour`
- Don't rely on color alone to convey meaning (use title/description)
- Don't forget mobile users auto-switch to day view

---

## Technical Notes

### Date Handling

All dates use ISO format:
- Date only: `YYYY-MM-DD`
- With time: `YYYY-MM-DDTHH:MM:SS` or `YYYY-MM-DD HH:MM:SS`

### Multi-Day Events

Events spanning multiple days automatically:
- Show as continuous bars in month view
- Appear in the all-day section in week view
- Require both `start` and `end` with different dates

### Mobile Behavior

On viewports below 640px:
- Automatically switches to day view
- View switcher hides month/week options
- Optimized touch interactions

### Locale Support

Uses native `Intl.DateTimeFormat` for:
- Month and day names
- Time formatting (12h vs 24h based on locale)
- First day of week (if not specified)

### Translations

Key translations under `spire-ui::spire-ui.event_calendar`:
- `today`, `month`, `week`, `day`
- `previous`, `next`
- `all_day`, `more`
