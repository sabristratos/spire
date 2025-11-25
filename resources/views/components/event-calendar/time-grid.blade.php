@props([])

<div
    class="spire-event-calendar__time-column"
    :data-date="day.date"
>
    <template x-for="slot in timeSlots" :key="slot.key">
        <div
            class="spire-event-calendar__time-slot"
            @click="handleTimeSlotClick(day.date, slot.hour, $event)"
        ></div>
    </template>

    <div class="spire-event-calendar__time-events">
        <template x-for="item in getEventsWithColumns(timedEvents, day.date)" :key="item.event.id">
            @if(isset($event))
                {{ $event }}
            @else
                <x-spire::event-calendar.time-event />
            @endif
        </template>
    </div>

    <template x-if="day.isToday && isWithinTimeRange()">
        <div
            class="spire-event-calendar__now-indicator"
            :style="{ top: getCurrentTimePosition() + '%' }"
        ></div>
    </template>
</div>
