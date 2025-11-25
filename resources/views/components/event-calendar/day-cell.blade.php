@props(['weekIndex' => false])

<div
    role="gridcell"
    class="spire-event-calendar__day-cell"
    :class="{
        'spire-event-calendar__day-cell--outside': !day.isCurrentMonth,
        'spire-event-calendar__day-cell--today': day.isToday,
        'spire-event-calendar__day-cell--weekend': day.isWeekend,
    }"
    :style="{ '--spanning-slots': getSpanningSlotsCount(weekIndex) }"
    :data-date="day.date"
>
    <div class="spire-event-calendar__day-header">
        <button
            type="button"
            class="spire-event-calendar__day-button"
            :aria-label="getDayAriaLabel(day)"
            :aria-current="day.isToday ? 'date' : null"
            :tabindex="focusedDate === day.date ? 0 : -1"
            @click="handleDateClick(day, $event)"
            @keydown="handleDayKeydown($event, day, weekIndex)"
            :data-date="day.date"
        >
            <span
                class="spire-event-calendar__day-number"
                :class="{ 'spire-event-calendar__day-number--today': day.isToday }"
                x-text="day.day"
            ></span>
        </button>
    </div>

    <div class="spire-event-calendar__spanning-spacer"></div>

    <div class="spire-event-calendar__day-events" @click.stop>
        <template x-for="event in getVisibleSingleDayEvents(day)" :key="event.id">
            @if(isset($event))
                {{ $event }}
            @else
                <x-spire::event-calendar.event />
            @endif
        </template>

        <template x-if="getHiddenSingleDayEventsCount(day) > 0">
            <button
                type="button"
                class="spire-event-calendar__more-btn"
                @click="showMorePopover(day, $event)"
            >
                <span x-text="'+' + getHiddenSingleDayEventsCount(day) + ' {{ __('spire::spire-ui.event_calendar.more') }}'"></span>
            </button>
        </template>
    </div>

    @if(isset($dayCell))
        <div class="spire-event-calendar__day-custom">
            {{ $dayCell }}
        </div>
    @endif
</div>
