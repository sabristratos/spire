<div class="spire-calendar-dual">
    {{-- First Month --}}
    <div class="spire-calendar-dual__month">
        <div class="flex items-center justify-between mb-3">
            <x-spire::button
                type="button"
                variant="outline"
                size="sm"
                icon-only
                @click="previousMonth"
                aria-label="{{ __('spire::spire-ui.date.previous_month') }}"
            >
                <x-slot:leading>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                    </svg>
                </x-slot:leading>
            </x-spire::button>

            <div class="text-base font-semibold" aria-live="polite" aria-atomic="true">
                <span x-text="monthName"></span>
                <span x-text="displayYear"></span>
            </div>

            <div class="w-8"></div>
        </div>

        <x-spire::calendar.grid />
    </div>

    {{-- Second Month --}}
    <div class="spire-calendar-dual__month" x-data="{
        get nextMonthName() {
            const nextMonth = this.displayMonth === 11 ? 0 : this.displayMonth + 1;
            const nextYear = this.displayMonth === 11 ? this.displayYear + 1 : this.displayYear;
            return $root.querySelector('[x-data]').__x.$data.monthNames ?
                new Intl.DateTimeFormat(this.locale, { month: 'long' }).format(new Date(nextYear, nextMonth, 1)) :
                '';
        },
        get nextMonthYear() {
            return this.displayMonth === 11 ? this.displayYear + 1 : this.displayYear;
        }
    }">
        <div class="flex items-center justify-between mb-3">
            <div class="w-8"></div>

            <div class="text-base font-semibold" aria-live="polite" aria-atomic="true">
                <span x-text="nextMonthName"></span>
                <span x-text="nextMonthYear"></span>
            </div>

            <x-spire::button
                type="button"
                variant="outline"
                size="sm"
                icon-only
                @click="nextMonth"
                aria-label="{{ __('spire::spire-ui.date.next_month') }}"
            >
                <x-slot:leading>
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                </x-slot:leading>
            </x-spire::button>
        </div>

        {{-- Second month grid with adjusted displayMonth --}}
        <div
            role="grid"
            aria-labelledby="month-year-label"
            :aria-multiselectable="mode === 'multiple' ? 'true' : null"
            x-data="{
                get secondMonthWeeks() {
                    const nextMonth = this.displayMonth === 11 ? 0 : this.displayMonth + 1;
                    const nextYear = this.displayMonth === 11 ? this.displayYear + 1 : this.displayYear;
                    const CalendarUtils = window.CalendarUtils || {};
                    return CalendarUtils.generateMonthGrid ? CalendarUtils.generateMonthGrid(nextYear, nextMonth, this.firstDayOfWeek) : [];
                }
            }"
        >
            <div role="row" class="grid grid-cols-7 gap-0.5 mb-2">
                <template x-for="dayName in dayNames" :key="dayName">
                    <div
                        role="columnheader"
                        class="spire-calendar-day-header"
                        x-text="dayName"
                    ></div>
                </template>
            </div>

            <template x-for="(week, weekIndex) in secondMonthWeeks" :key="weekIndex">
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
                            :data-spire-selected="isDateSelected(day.date) ? 'true' : null"
                            :data-spire-selection-start="isRangeStart(day.date) ? 'true' : null"
                            :data-spire-selection-end="isRangeEnd(day.date) ? 'true' : null"
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
    </div>
</div>
