@props(['placement' => 'bottom-start'])

{{-- Year Picker View --}}
<div
    class="absolute inset-0 w-full bg-surface z-20"
    x-show="showYearPicker"
    x-transition:enter="transition-opacity transition-transform ease-out duration-200"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition-opacity transition-transform ease-in duration-150"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"
    @keydown.escape="showYearPicker = false"
    role="dialog"
    aria-label="{{ __('spire::spire-ui.date.year_picker') }}"
    x-cloak
>
    {{-- Decade Stepper --}}
    <div class="flex items-center justify-between mb-4 gap-2">
        <button
            type="button"
            @click="previousDecade"
            :disabled="isDecadeDisabled(pickerDecadeStart - 12)"
            aria-label="{{ __('spire::spire-ui.date.previous_decade') }}"
            class="p-2 hover:bg-hover rounded-md ease-fast disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
        </button>

        <span
            class="text-lg font-semibold text-text min-w-[120px] text-center"
            x-text="`${pickerDecadeStart} - ${pickerDecadeStart + 11}`"
        ></span>

        <button
            type="button"
            @click="nextDecade"
            :disabled="isDecadeDisabled(pickerDecadeStart + 12)"
            aria-label="{{ __('spire::spire-ui.date.next_decade') }}"
            class="p-2 hover:bg-hover rounded-md ease-fast disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>
    </div>

    {{-- Year Grid (4x3 = 12 years) --}}
    <div
        role="grid"
        aria-label="{{ __('spire::spire-ui.date.select_year') }}"
        class="grid grid-cols-4 gap-2"
    >
        <template x-for="year in getYearRange()" :key="year">
            <button
                type="button"
                role="gridcell"
                @click="selectYear(year)"
                :disabled="isYearDisabled(year)"
                :aria-selected="pickerYear === year"
                :aria-current="year === new Date().getFullYear() ? 'date' : null"
                :class="{
                    'py-2 px-3 rounded-md text-sm font-medium ease-fast': true,
                    'hover:bg-hover cursor-pointer': !isYearDisabled(year),
                    'bg-primary text-primary-foreground hover:bg-primary/90': pickerYear === year && !isYearDisabled(year),
                    'border-2 border-primary': year === new Date().getFullYear() && pickerYear !== year,
                    'opacity-50 cursor-not-allowed': isYearDisabled(year),
                    'text-text': !isYearDisabled(year) && pickerYear !== year,
                }"
                x-text="year"
            ></button>
        </template>
    </div>
</div>
