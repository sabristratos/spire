@props([
    'placement' => 'bottom-start',
    'mode' => 'single',
    'width' => 'md',
    'minDate' => null,
    'maxDate' => null,
    'disabledDates' => [],
    'disabledDaysOfWeek' => [],
    'locale' => null,
    'firstDayOfWeek' => null,
    'maxRange' => null,
    'minRange' => null,
    'maxDates' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('datepicker-content')->modifier($width);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except([
    'class',
    'mode',
    'width',
    'minDate',
    'maxDate',
    'disabledDates',
    'disabledDaysOfWeek',
    'locale',
    'firstDayOfWeek',
    'maxRange',
    'minRange',
    'maxDates',
])->merge([
    'data-placement' => $placement,
    'data-spire-datepicker-content' => true,
    'popover' => 'auto',
    'class' => $builder->build(),
    'role' => 'dialog',
    'aria-label' => __('spire::spire-ui.datepicker.picker_label'),
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    @keydown.escape="hide"
    @calendar-date-selected="handleCalendarSelect($event.detail)"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    <div class="flex flex-col gap-3">
        {{-- Action buttons header --}}
        <div class="spire-datepicker-actions">
            <button
                type="button"
                @click="setToday"
                class="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                x-text="todayText"
            ></button>

            <span class="text-text-muted">|</span>

            <button
                type="button"
                @click="clearDate"
                class="px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-hover rounded-md transition-colors"
                x-text="clearText"
            ></button>
        </div>

        {{-- Calendar grid (datepicker manages all calendar state) --}}
        <div wire:ignore>
            {{-- Simple calendar header without month/year picker --}}
            <div class="flex items-center justify-between mb-2 mt-2">
                <x-spire::button
                    type="button"
                    variant="flat"
                    size="sm"
                    icon-only
                    @click="previousMonth"
                    aria-label="{{ __('spire::spire-ui.date.previous_month') }}"
                >
                    <x-slot:leading>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                    </x-slot:leading>
                </x-spire::button>

                <div class="text-base font-semibold" aria-live="polite" aria-atomic="true">
                    <span x-text="monthName"></span>
                    <span x-text="displayYear"></span>
                </div>

                <x-spire::button
                    type="button"
                    variant="flat"
                    size="sm"
                    icon-only
                    @click="nextMonth"
                    aria-label="{{ __('spire::spire-ui.date.next_month') }}"
                >
                    <x-slot:leading>
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </x-slot:leading>
                </x-spire::button>
            </div>

            <x-spire::calendar.grid size="sm" />
        </div>
    </div>
</div>
