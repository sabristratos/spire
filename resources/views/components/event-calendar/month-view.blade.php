@props([])

<div
    class="spire-event-calendar__month-view"
    role="grid"
    aria-labelledby="spire-event-calendar-title"
    x-ref="calendarGrid"
>
    <div class="sr-only" aria-live="polite" aria-atomic="true" x-ref="announcer">
        <span x-text="announcement"></span>
    </div>

    <div role="row" class="spire-event-calendar__day-names">
        <template x-for="dayName in dayNames" :key="dayName">
            <div role="columnheader" class="spire-event-calendar__day-name" x-text="dayName"></div>
        </template>
    </div>

    <div class="spire-event-calendar__grid">
        <template x-for="(week, weekIndex) in weeks" :key="weekIndex">
            <div role="row" class="spire-event-calendar__week">
                <div class="spire-event-calendar__spanning-events">
                    <template x-for="spanEvent in getSpanningEventsForWeek(weekIndex)" :key="'span-' + spanEvent.id + '-' + weekIndex">
                        <x-spire::event-calendar.spanning-event>
                            @if(isset($event))
                                <x-slot:event>{{ $event }}</x-slot:event>
                            @endif
                        </x-spire::event-calendar.spanning-event>
                    </template>
                </div>

                <template x-for="day in week" :key="day.date">
                    <x-spire::event-calendar.day-cell :week-index="true">
                        @if(isset($event))
                            <x-slot:event>{{ $event }}</x-slot:event>
                        @endif
                        @if(isset($dayCell))
                            <x-slot:dayCell>{{ $dayCell }}</x-slot:dayCell>
                        @endif
                    </x-spire::event-calendar.day-cell>
                </template>
            </div>
        </template>
    </div>
</div>
