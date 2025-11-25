@props([])

<x-spire::popover trigger="hover" placement="bottom-start">
    <x-spire::popover.trigger>
        <button
            type="button"
            class="spire-event-calendar__spanning-event"
            :class="{
                'spire-event-calendar__spanning-event--start': getEventLayout(spanEvent, weekIndex).isStart,
                'spire-event-calendar__spanning-event--end': getEventLayout(spanEvent, weekIndex).isEnd,
            }"
            :style="getSpanningEventStyle(spanEvent, weekIndex)"
            @click="handleEventClick(spanEvent, $event)"
            :aria-label="getEventAriaLabel(spanEvent)"
        >
            <span
                class="spire-event-calendar__spanning-event-title"
                x-text="spanEvent.title"
                x-show="getEventLayout(spanEvent, weekIndex).isStart"
            ></span>
        </button>
    </x-spire::popover.trigger>

    <x-spire::popover.content class="bg-surface-subtle" size="sm" padding="none">
        <div class="p-3 border-b border-border">
            <div class="flex items-center gap-2 mb-1">
                <span
                    class="w-3 h-3 rounded-full shrink-0"
                    :style="{ background: getEventColor(spanEvent) }"
                ></span>
                <span class="font-semibold text-text truncate" x-text="spanEvent.title"></span>
            </div>
            <div class="text-sm text-muted">
                <template x-if="spanEvent.allDay">
                    <span>{{ __('spire::spire-ui.event_calendar.all_day') }}</span>
                </template>
                <template x-if="!spanEvent.allDay">
                    <span x-text="formatEventTimeRange(spanEvent)"></span>
                </template>
            </div>
        </div>
        <template x-if="spanEvent.description">
            <div class="p-3 text-sm text-text">
                <p x-text="spanEvent.description"></p>
            </div>
        </template>
        <template x-if="spanEvent.location">
            <div class="px-3 pb-3 text-sm text-muted flex items-center gap-1">
                <x-spire::icon name="marker-pin-01" class="w-3.5 h-3.5 shrink-0" />
                <span x-text="spanEvent.location" class="truncate"></span>
            </div>
        </template>
    </x-spire::popover.content>
</x-spire::popover>
