@props(['placement' => 'bottom-start'])

{{-- Month/Year Picker Popover --}}
<div
    :id="$id('calendar-picker')"
    x-ref="content"
    popover="auto"
    data-placement="{{ $placement }}"
    @toggle="console.log('🔄 Popover toggle event', { newState: $event.newState, oldState: $event.oldState })"
    role="dialog"
    aria-label="{{ __('spire::spire-ui.date.month_year_picker') }}"
    class="animate-dropdown-bounce bg-surface border border-border rounded-lg shadow-lg p-4 min-w-[280px]"
>
    {{-- Year Stepper --}}
    <div class="flex items-center justify-between mb-4 gap-2">
        <button
            type="button"
            @click="previousYear"
            :disabled="isYearDisabled(pickerYear - 1)"
            aria-label="{{ __('spire::spire-ui.date.previous_year') }}"
            class="p-2 hover:bg-hover rounded-md ease-fast disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>

        <span class="text-lg font-semibold text-text min-w-[60px] text-center" x-text="pickerYear"></span>

        <button
            type="button"
            @click="nextYear"
            :disabled="isYearDisabled(pickerYear + 1)"
            aria-label="{{ __('spire::spire-ui.date.next_year') }}"
            class="p-2 hover:bg-hover rounded-md ease-fast disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>
    </div>

    {{-- Month Grid (3x4) --}}
    <div
        role="grid"
        aria-label="{{ __('spire::spire-ui.date.select_month') }}"
        class="grid grid-cols-3 gap-2"
    >
        <template x-for="(month, index) in monthNames" :key="index">
            <button
                type="button"
                role="gridcell"
                @click="selectMonth(index)"
                :disabled="isMonthDisabled(index, pickerYear)"
                :aria-selected="displayMonth === index && displayYear === pickerYear"
                :aria-current="index === new Date().getMonth() && pickerYear === new Date().getFullYear() ? 'date' : null"
                :class="{
                    'py-2 px-3 rounded-md text-sm font-medium ease-fast': true,
                    'hover:bg-hover cursor-pointer': !isMonthDisabled(index, pickerYear),
                    'bg-primary text-primary-foreground hover:bg-primary/90': displayMonth === index && displayYear === pickerYear && !isMonthDisabled(index, pickerYear),
                    'border-2 border-primary': index === new Date().getMonth() && pickerYear === new Date().getFullYear() && !(displayMonth === index && displayYear === pickerYear),
                    'opacity-50 cursor-not-allowed': isMonthDisabled(index, pickerYear),
                    'text-text': !isMonthDisabled(index, pickerYear) && !(displayMonth === index && displayYear === pickerYear),
                }"
                x-text="month"
            ></button>
        </template>
    </div>
</div>
