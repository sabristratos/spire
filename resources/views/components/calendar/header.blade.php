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

    <div
        id="month-year-label"
        class="text-base font-semibold"
        aria-live="polite"
        aria-atomic="true"
    >
        <span x-text="monthName"></span>
        <span x-text="displayYear"></span>
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
