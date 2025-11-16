<div
    role="grid"
    aria-labelledby="month-year-label"
    :aria-multiselectable="mode === 'multiple' ? 'true' : null"
>
    {{-- Screen reader announcements --}}
    <div aria-live="polite" aria-atomic="true" class="sr-only">
        <span x-text="selectionAnnouncement"></span>
    </div>
    {{-- Day names header --}}
    <div role="row" class="grid grid-cols-7 gap-0.5 mb-2">
        <template x-for="dayName in dayNames" :key="dayName">
            <div
                role="columnheader"
                class="spire-calendar-day-header"
                x-text="dayName"
            ></div>
        </template>
    </div>

    {{-- Calendar weeks --}}
    <template x-for="(week, weekIndex) in weeks" :key="weekIndex">
        <div role="row" class="grid grid-cols-7 gap-0.5">
            <template x-for="day in week" :key="day.date">
                <button
                    type="button"
                    role="gridcell"
                    @click="selectDate(day.date)"
                    @mouseenter="handleDateHover(day.date)"
                    @mouseleave="clearHover"
                    @keydown.enter.prevent="selectDate(day.date)"
                    @keydown.space.prevent="selectDate(day.date)"
                    :aria-selected="isDateSelected(day.date)"
                    :aria-disabled="isDisabled(day)"
                    :aria-current="day.isToday ? 'date' : null"
                    :aria-label="getAriaLabel(day)"
                    :data-date="day.date"
                    :data-spire-selected="mode === 'single' && isDateSelected(day.date) ? 'true' : (mode === 'multiple' && isDateSelected(day.date) ? 'true' : null)"
                    :data-spire-selection-start="isRangeStart(day.date) ? 'true' : null"
                    :data-spire-selection-end="isRangeEnd(day.date) ? 'true' : null"
                    :data-spire-in-range="mode === 'range' && isDateSelected(day.date) && !isRangeStart(day.date) && !isRangeEnd(day.date) ? 'true' : null"
                    :data-spire-highlighted="isDateInPreviewRange(day.date) ? 'true' : null"
                    :data-spire-highlighted-start="isPreviewStart(day.date) ? 'true' : null"
                    :data-spire-highlighted-end="isPreviewEnd(day.date) ? 'true' : null"
                    :data-spire-today="day.isToday ? 'true' : null"
                    :data-spire-outside-month="!day.isCurrentMonth ? 'true' : null"
                    :data-spire-disabled="isDisabled(day) ? 'true' : null"
                    :data-spire-weekend="day.isWeekend ? 'true' : null"
                    :disabled="isDisabled(day)"
                    class="spire-calendar-day"
                >
                    <span x-text="day.day"></span>
                </button>
            </template>
        </div>
    </template>
</div>
