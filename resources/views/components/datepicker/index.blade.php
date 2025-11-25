@props([
    'placeholder' => null,
    'placement' => spire_default('datepicker', 'placement', 'bottom-start'),
    'disabled' => false,
    'mode' => 'single',
    'width' => 'md',
    'format' => spire_default('datepicker', 'format', 'auto'),
    'minDate' => null,
    'maxDate' => null,
    'disabledDates' => [],
    'disabledDaysOfWeek' => [],
    'locale' => null,
    'firstDayOfWeek' => spire_default('datepicker', 'firstDayOfWeek', null),
    'maxRange' => null,
    'minRange' => null,
    'maxDates' => null,
    'maxChipsDisplay' => 3,
    'showPresets' => false,
    'presets' => [],
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? match($mode) {
    'range' => __('spire::spire-ui.datepicker.range_placeholder'),
    'multiple' => __('spire::spire-ui.datepicker.multiple_placeholder'),
    default => __('spire::spire-ui.datepicker.placeholder'),
};
@endphp

<div
    x-modelable="value"
    x-data="spireDatepicker({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @else
            value: {{ $mode === 'range' ? "{ start: '', end: '' }" : ($mode === 'multiple' ? '[]' : "''") }},
        @endif
        mode: '{{ $mode }}',
        placeholder: '{{ $placeholderText }}',
        todayText: '{{ __('spire::spire-ui.datepicker.today') }}',
        clearText: '{{ __('spire::spire-ui.datepicker.clear') }}',
        monthLabel: '{{ __('spire::spire-ui.datepicker.month') }}',
        dayLabel: '{{ __('spire::spire-ui.datepicker.day') }}',
        yearLabel: '{{ __('spire::spire-ui.datepicker.year') }}',
        @if($minDate) minDate: '{{ $minDate }}', @endif
        @if($maxDate) maxDate: '{{ $maxDate }}', @endif
        @if(!empty($disabledDates)) disabledDates: @js($disabledDates), @endif
        @if(!empty($disabledDaysOfWeek)) disabledDaysOfWeek: @js($disabledDaysOfWeek), @endif
        @if($locale) locale: '{{ $locale }}', @endif
        format: '{{ $format }}',
        @if($firstDayOfWeek !== null) firstDayOfWeek: {{ $firstDayOfWeek }}, @endif
        @if($maxRange) maxRange: {{ $maxRange }}, @endif
        @if($minRange) minRange: {{ $minRange }}, @endif
        @if($maxDates) maxDates: {{ $maxDates }}, @endif
        maxChipsDisplay: {{ $maxChipsDisplay }},
    })"
    {{ WireEntangle::filteredAttributes($attributes) }}
>
    @if($wireConfig->needsHiddenInput())
        <input
            type="hidden"
            {{ WireEntangle::hiddenInputAttributes($attributes) }}
            x-model="value"
        >
    @endif

    <div wire:ignore>
        <div
            x-id="['popover']"
            class="relative"
        >
            <x-spire::datepicker.trigger
                :placement="$placement"
                :disabled="$disabled"
                :mode="$mode"
            />
            <x-spire::datepicker.content
                :placement="$placement"
                :mode="$mode"
                :width="$width"
                :minDate="$minDate"
                :maxDate="$maxDate"
                :disabledDates="$disabledDates"
                :disabledDaysOfWeek="$disabledDaysOfWeek"
                :locale="$locale"
                :firstDayOfWeek="$firstDayOfWeek"
                :maxRange="$maxRange"
                :minRange="$minRange"
                :maxDates="$maxDates"
                :show-presets="$showPresets"
                :presets="$presets"
            />
        </div>
    </div>
</div>
