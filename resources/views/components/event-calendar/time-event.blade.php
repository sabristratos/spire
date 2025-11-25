@props([])

<x-spire::popover trigger="hover" placement="left-start">
    <x-spire::popover.trigger
        class="spire-event-calendar__time-event-wrapper"
        x-bind:style="{
            '--event-color': getEventColor(item.event),
            top: item.position.top + '%',
            height: item.position.height + '%',
            left: item.columnLeft + '%',
            width: 'calc(' + item.columnWidth + '% - 4px)',
        }"
    >
        <button
            type="button"
            class="spire-event-calendar__time-event"
            :aria-label="getEventAriaLabel(item.event)"
            @click="handleEventClick(item.event, $event)"
        >
            <span class="spire-event-calendar__time-event-time" x-text="formatEventTime(item.event)"></span>
            <span class="spire-event-calendar__time-event-title" x-text="item.event.title"></span>
        </button>
    </x-spire::popover.trigger>

    <x-spire::popover.content class="bg-surface-subtle" size="sm" padding="none">
        <div class="p-3 border-b border-border">
            <div class="flex items-center gap-2 mb-1">
                <span
                    class="w-3 h-3 rounded-full shrink-0"
                    :style="{ background: getEventColor(item.event) }"
                ></span>
                <span class="font-semibold text-text truncate" x-text="item.event.title"></span>
            </div>
            <div class="text-sm text-muted" x-text="formatEventTimeRange(item.event)"></div>
        </div>
        <template x-if="item.event.description">
            <div class="p-3 text-sm text-text">
                <p x-text="item.event.description"></p>
            </div>
        </template>
        <template x-if="item.event.location">
            <div class="px-3 pb-3 text-sm text-muted flex items-center gap-1">
                <x-spire::icon name="marker-pin-01" class="w-3.5 h-3.5 shrink-0" />
                <span x-text="item.event.location" class="truncate"></span>
            </div>
        </template>
    </x-spire::popover.content>
</x-spire::popover>
