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
    'showPresets' => false,
    'presets' => [],
])

@php
use SpireUI\Support\ComponentClass;

$defaultPresets = [
    ['key' => 'last_7_days', 'label' => __('spire::spire-ui.date.preset_last_7_days')],
    ['key' => 'last_30_days', 'label' => __('spire::spire-ui.date.preset_last_30_days')],
    ['key' => 'this_week', 'label' => __('spire::spire-ui.date.preset_this_week')],
    ['key' => 'last_week', 'label' => __('spire::spire-ui.date.preset_last_week')],
    ['key' => 'this_month', 'label' => __('spire::spire-ui.date.preset_this_month')],
    ['key' => 'last_month', 'label' => __('spire::spire-ui.date.preset_last_month')],
    ['key' => 'this_quarter', 'label' => __('spire::spire-ui.date.preset_this_quarter')],
    ['key' => 'last_quarter', 'label' => __('spire::spire-ui.date.preset_last_quarter')],
    ['key' => 'this_year', 'label' => __('spire::spire-ui.date.preset_this_year')],
    ['key' => 'last_year', 'label' => __('spire::spire-ui.date.preset_last_year')],
];

$activePresets = empty($presets) ? $defaultPresets : $presets;

$builder = ComponentClass::make('datepicker__content')
    ->addClass('spire-overlay')
    ->addClass('spire-overlay--padded-lg')
    ->addClass('animate-dropdown-bounce')
    ->dataAttribute('datepicker-content', 'true');

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
    'showPresets',
    'presets',
])->merge([
    'data-placement' => $placement,
    'popover' => 'auto',
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
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
        {{-- Calendar grid (datepicker manages all calendar state) --}}
        <div wire:ignore>
            <template x-if="mode === 'range'">
                @if($showPresets)
                    <div class="flex gap-3">
                        <x-spire::calendar.presets :presets="$activePresets" />
                        <div>
                            <x-spire::calendar.dual-grid />
                        </div>
                    </div>
                @else
                    <x-spire::calendar.dual-grid />
                @endif
            </template>

            <template x-if="mode !== 'range'">
                <div>
                    <x-spire::calendar.header />
                    <div class="relative">
                        <x-spire::calendar.month-year-picker />
                        <x-spire::calendar.year-picker />
                        <x-spire::calendar.grid />
                    </div>
                    <x-spire::calendar.footer />
                </div>
            </template>
        </div>

        {{-- Footer with range inputs for range mode --}}
        <template x-if="mode === 'range'">
            <div class="spire-datepicker__footer">
                <div class="spire-datepicker__footer__inputs">
                    {{-- Start date segments --}}
                    <div class="spire-datepicker__footer__segment-group">
                        <template x-for="(segment, index) in segmentOrder" :key="'start_' + segment">
                            <div class="contents">
                                <input
                                    type="text"
                                    inputmode="numeric"
                                    :maxlength="segment === 'year' ? 4 : 2"
                                    :placeholder="getSegmentPlaceholders()[segment]"
                                    autocomplete="off"
                                    data-lpignore="true"
                                    data-form-type="other"
                                    :x-ref="'rangeSegment_start_' + segment"
                                    x-model="rangeSegmentValues.start[segment]"
                                    @input="handleRangeSegmentInput(segment, 'start', $event)"
                                    @paste.prevent="handleRangeSegmentPaste('start', $event)"
                                    @keydown="handleRangeSegmentKeydown(segment, 'start', $event)"
                                    @focus="$event.target.select()"
                                    :aria-label="segment === 'month' ? '{{ __('spire::spire-ui.datepicker.month') }}' : segment === 'day' ? '{{ __('spire::spire-ui.datepicker.day') }}' : '{{ __('spire::spire-ui.datepicker.year') }}'"
                                    :class="segment === 'year' ? 'spire-datepicker__footer__segment spire-datepicker__footer__segment--year' : 'spire-datepicker__footer__segment'"
                                />

                                <span
                                    x-show="index < segmentOrder.length - 1"
                                    class="spire-datepicker__footer__segment-separator"
                                    x-text="segmentSeparator"
                                ></span>
                            </div>
                        </template>
                    </div>

                    <span class="spire-datepicker__footer__range-separator">-</span>

                    {{-- End date segments --}}
                    <div class="spire-datepicker__footer__segment-group">
                        <template x-for="(segment, index) in segmentOrder" :key="'end_' + segment">
                            <div class="contents">
                                <input
                                    type="text"
                                    inputmode="numeric"
                                    :maxlength="segment === 'year' ? 4 : 2"
                                    :placeholder="getSegmentPlaceholders()[segment]"
                                    autocomplete="off"
                                    data-lpignore="true"
                                    data-form-type="other"
                                    :x-ref="'rangeSegment_end_' + segment"
                                    x-model="rangeSegmentValues.end[segment]"
                                    @input="handleRangeSegmentInput(segment, 'end', $event)"
                                    @paste.prevent="handleRangeSegmentPaste('end', $event)"
                                    @keydown="handleRangeSegmentKeydown(segment, 'end', $event)"
                                    @focus="$event.target.select()"
                                    :aria-label="segment === 'month' ? '{{ __('spire::spire-ui.datepicker.month') }}' : segment === 'day' ? '{{ __('spire::spire-ui.datepicker.day') }}' : '{{ __('spire::spire-ui.datepicker.year') }}'"
                                    :class="segment === 'year' ? 'spire-datepicker__footer__segment spire-datepicker__footer__segment--year' : 'spire-datepicker__footer__segment'"
                                />

                                <span
                                    x-show="index < segmentOrder.length - 1"
                                    class="spire-datepicker__footer__segment-separator"
                                    x-text="segmentSeparator"
                                ></span>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="spire-datepicker__footer__actions">
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
