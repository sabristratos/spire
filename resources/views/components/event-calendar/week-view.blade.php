@props([])

<div class="spire-event-calendar__week-view">
    <x-spire::event-calendar.all-day-row />

    <div class="spire-event-calendar__time-grid-container">
        <div class="spire-event-calendar__time-axis">
            <div class="spire-event-calendar__time-axis-header"></div>
            <template x-for="slot in timeSlots" :key="slot.key">
                <div class="spire-event-calendar__time-label" x-text="slot.label"></div>
            </template>
        </div>

        <div class="spire-event-calendar__day-columns">
            <div class="spire-event-calendar__day-headers">
                <template x-for="day in weekDays" :key="day.date">
                    <div
                        class="spire-event-calendar__day-header-cell"
                        :class="{ 'spire-event-calendar__day-header-cell--today': day.isToday }"
                    >
                        <span class="spire-event-calendar__day-name-label" x-text="day.dayName"></span>
                        <span
                            class="spire-event-calendar__day-date-label"
                            :class="{ 'spire-event-calendar__day-date-label--today': day.isToday }"
                            x-text="day.day"
                        ></span>
                    </div>
                </template>
            </div>

            <div class="spire-event-calendar__time-grid">
                <template x-for="day in weekDays" :key="day.date">
                    <x-spire::event-calendar.time-grid>
                        @if(isset($event))
                            <x-slot:event>{{ $event }}</x-slot:event>
                        @endif
                    </x-spire::event-calendar.time-grid>
                </template>
            </div>
        </div>
    </div>
</div>
