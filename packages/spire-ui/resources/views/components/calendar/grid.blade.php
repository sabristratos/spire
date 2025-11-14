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
    <div role="row" class="grid grid-cols-7 gap-0 mb-2">
        <template x-for="dayName in dayNames" :key="dayName">
            <div
                role="columnheader"
                class="text-xs font-medium text-primary text-center h-8 flex items-center justify-center"
                x-text="dayName"
            ></div>
        </template>
    </div>

    {{-- Calendar weeks --}}
    <template x-for="(week, weekIndex) in weeks" :key="weekIndex">
        <div role="row" class="grid grid-cols-7 gap-0">
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
                    :class="{
                        'aspect-square w-full flex items-center justify-center text-sm transition-fast relative': true,

                        // Base states
                        'hover:bg-hover cursor-pointer': !isDisabled(day) && mode === 'single',
                        'cursor-pointer': !isDisabled(day) && (mode === 'range' || mode === 'multiple'),
                        'opacity-50 cursor-not-allowed': isDisabled(day),
                        'text-text-muted': !day.isCurrentMonth,

                        // Single mode selection
                        'bg-primary text-primary-foreground hover:bg-primary/90 rounded-md': mode === 'single' && isDateSelected(day.date) && !isDisabled(day),

                        // Range mode - start date
                        'bg-primary text-primary-foreground rounded-l-md': mode === 'range' && isRangeStart(day.date) && !isRangeEnd(day.date),
                        'bg-primary text-primary-foreground rounded-md': mode === 'range' && isRangeStart(day.date) && isRangeEnd(day.date),

                        // Range mode - end date
                        'bg-primary text-primary-foreground rounded-r-md': mode === 'range' && isRangeEnd(day.date) && !isRangeStart(day.date),

                        // Range mode - dates in between
                        'bg-primary/10 text-primary': mode === 'range' && isDateSelected(day.date) && !isRangeStart(day.date) && !isRangeEnd(day.date),

                        // Range preview (hover state)
                        'bg-primary/5 border border-dashed border-primary/30': mode === 'range' && isDateInPreviewRange(day.date) && !isDateSelected(day.date),

                        // Multiple mode selection
                        'bg-primary text-primary-foreground rounded-md': mode === 'multiple' && isDateSelected(day.date),

                        // Today indicator (when not selected)
                        'border-2 border-primary': day.isToday && !isDateSelected(day.date),

                        // Default text color
                        'text-text': day.isCurrentMonth && !isDateSelected(day.date) && !isDisabled(day),
                    }"
                >
                    <span x-text="day.day"></span>
                    <span
                        x-show="mode === 'multiple' && isDateSelected(day.date)"
                        class="absolute top-0 right-0 text-[10px] leading-none"
                    >✓</span>
                </button>
            </template>
        </div>
    </template>
</div>
