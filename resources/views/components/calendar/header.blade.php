<div class="relative flex items-center justify-between mb-3">
    <x-spire::button
        type="button"
        variant="bordered"
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

    <button
        type="button"
        @click="showMonthYearPicker = !showMonthYearPicker"
        id="month-year-label"
        class="text-base font-semibold hover:text-primary hover:bg-hover px-3 py-1 rounded-md transition-colors cursor-pointer"
        aria-live="polite"
        aria-atomic="true"
        :aria-expanded="showMonthYearPicker"
        aria-label="{{ __('spire::spire-ui.date.select_month_year') }}"
    >
        <span x-text="monthName"></span>
        <span x-text="displayYear"></span>
        <svg class="inline-block w-4 h-4 ml-1 text-muted transition-transform" :class="showMonthYearPicker ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
    </button>

    <x-spire::button
        type="button"
        variant="bordered"
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
