@props([])

<x-spire::popover trigger="hover" placement="bottom-start">
    <x-spire::popover.trigger>
        <button
            type="button"
            class="spire-event-calendar__event"
            :class="{
                'spire-event-calendar__event--all-day': event.allDay,
                'spire-event-calendar__event--multi-day': isMultiDayEvent(event),
                'spire-event-calendar__event--start': isEventStart(event, day.date),
                'spire-event-calendar__event--end': isEventEnd(event, day.date),
            }"
            :style="{ '--event-color': getEventColor(event) }"
            @click="handleEventClick(event, $event)"
        >
            <span class="spire-event-calendar__event-dot"></span>
            <span
                class="spire-event-calendar__event-time"
                x-show="!event.allDay && formatEventTime(event)"
                x-text="formatEventTime(event)"
            ></span>
            <span class="spire-event-calendar__event-title" x-text="event.title"></span>
        </button>
    </x-spire::popover.trigger>

    <x-spire::popover.content class="bg-surface-subtle" size="sm" padding="none">
        <div class="p-3 border-b border-border">
            <div class="flex items-center gap-2 mb-1">
                <span
                    class="w-3 h-3 rounded-full shrink-0"
                    :style="{ background: getEventColor(event) }"
                ></span>
                <span class="font-semibold text-text truncate" x-text="event.title"></span>
            </div>
            <div class="text-sm text-muted">
                <template x-if="event.allDay">
                    <span>{{ __('spire::spire-ui.event_calendar.all_day') }}</span>
                </template>
                <template x-if="!event.allDay">
                    <span x-text="formatEventTimeRange(event)"></span>
                </template>
            </div>
        </div>
        <template x-if="event.description">
            <div class="p-3 text-sm text-text">
                <p x-text="event.description"></p>
            </div>
        </template>
        <template x-if="event.location">
            <div class="px-3 pb-3 text-sm text-muted flex items-center gap-1">
                <x-spire::icon name="marker-pin-01" class="w-3.5 h-3.5 shrink-0" />
                <span x-text="event.location" class="truncate"></span>
            </div>
        </template>
    </x-spire::popover.content>
</x-spire::popover>
