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
            <template x-if="mode === 'range'">
                <x-spire::calendar.dual-grid />
            </template>

            <template x-if="mode !== 'range'">
                <div>
                    <x-spire::calendar.header />
                    <x-spire::calendar.grid />
                </div>
            </template>
        </div>

        {{-- Footer with range inputs for range mode --}}
        <template x-if="mode === 'range'">
            <div class="spire-datepicker-footer">
                <div class="spire-datepicker-footer__inputs">
                    <input
                        type="text"
                        class="spire-datepicker-footer__input"
                        :value="formattedRangeStart"
                        placeholder="{{ __('spire::spire-ui.datepicker.start_date') }}"
                        readonly
                    />
                    <span class="spire-datepicker-footer__separator">-</span>
                    <input
                        type="text"
                        class="spire-datepicker-footer__input"
                        :value="formattedRangeEnd"
                        placeholder="{{ __('spire::spire-ui.datepicker.end_date') }}"
                        readonly
                    />
                </div>
                <div class="spire-datepicker-footer__actions">
                    <x-spire::button
                        type="button"
                        variant="ghost"
                        size="sm"
                        @click="clearDate"
                    >
                        {{ __('spire::spire-ui.common.cancel') }}
                    </x-spire::button>
                    <x-spire::button
                        type="button"
                        variant="solid"
                        size="sm"
                        color="primary"
                        @click="hide"
                    >
                        {{ __('spire::spire-ui.datepicker.set_date') }}
                    </x-spire::button>
                </div>
            </div>
        </template>
    </div>
</div>
