@props(['singleDay' => false])

<div
    class="spire-event-calendar__all-day-row"
    x-show="allDayEvents.length > 0"
>
    <div class="spire-event-calendar__all-day-label">
        {{ __('spire::spire-ui.event_calendar.all_day') }}
    </div>
    <div class="spire-event-calendar__all-day-events">
        @if(!$singleDay)
            <template x-for="day in weekDays" :key="day.date">
                <div class="spire-event-calendar__all-day-cell">
                    <template x-for="event in getAllDayEventsForDate(day.date)" :key="event.id">
                        <x-spire::popover trigger="hover" placement="bottom-start">
                            <x-spire::popover.trigger>
                                <button
                                    type="button"
                                    class="spire-event-calendar__all-day-event"
                                    :style="{ '--event-color': getEventColor(event) }"
                                    :aria-label="getEventAriaLabel(event)"
                                    @click="handleEventClick(event, $event)"
                                    x-text="event.title"
                                ></button>
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
                                        <span>{{ __('spire::spire-ui.event_calendar.all_day') }}</span>
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
                    </template>
                </div>
            </template>
        @else
            <div class="spire-event-calendar__all-day-cell spire-event-calendar__all-day-cell--single">
                <template x-for="event in allDayEvents" :key="event.id">
                    <x-spire::popover trigger="hover" placement="bottom-start">
                        <x-spire::popover.trigger>
                            <button
                                type="button"
                                class="spire-event-calendar__all-day-event"
                                :style="{ '--event-color': getEventColor(event) }"
                                :aria-label="getEventAriaLabel(event)"
                                @click="handleEventClick(event, $event)"
                                x-text="event.title"
                            ></button>
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
                                    <span>{{ __('spire::spire-ui.event_calendar.all_day') }}</span>
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
                </template>
            </div>
        @endif
    </div>
</div>
