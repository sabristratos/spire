@props([])

<div class="spire-event-calendar__day-view">
    <x-spire::event-calendar.all-day-row :single-day="true" />

    <div class="spire-event-calendar__time-grid-container spire-event-calendar__time-grid-container--single">
        <div class="spire-event-calendar__time-axis">
            <template x-for="slot in timeSlots" :key="slot.key">
                <div class="spire-event-calendar__time-label" x-text="slot.label"></div>
            </template>
        </div>

        <div class="spire-event-calendar__time-grid">
            <div x-data="{ get day() { return { date: currentDayDate, isToday: new Date(currentDayDate).toDateString() === new Date().toDateString() } } }">
                <x-spire::event-calendar.time-grid>
                    @if(isset($event))
                        <x-slot:event>{{ $event }}</x-slot:event>
                    @endif
                </x-spire::event-calendar.time-grid>
            </div>
        </div>
    </div>
</div>
