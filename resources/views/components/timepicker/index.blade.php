@props([
    'placeholder' => null,
    'placement' => 'bottom-start',
    'disabled' => false,
    'use24Hour' => null,
    'minuteStep' => 1,
    'showSeconds' => false,
])

@php
use SpireUI\Support\WireEntangle;

$wireConfig = WireEntangle::fromAttributes($attributes);
$placeholderText = $placeholder ?? __('spire::spire-ui.timepicker.placeholder');
$use24HourValue = is_null($use24Hour) ? 'null' : ($use24Hour ? 'true' : 'false');
$minuteStepValue = is_numeric($minuteStep) ? (int) $minuteStep : 1;
$showSecondsValue = $showSeconds ? 'true' : 'false';
@endphp

<div
    x-data="timepickerComponent({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        placeholder: '{{ $placeholderText }}',
        use24Hour: {{ $use24HourValue }},
        minuteStep: {{ $minuteStepValue }},
        showSeconds: {{ $showSecondsValue }},
        nowText: '{{ __('spire::spire-ui.timepicker.now') }}',
        clearText: '{{ __('spire::spire-ui.timepicker.clear') }}',
        hourLabel: '{{ __('spire::spire-ui.timepicker.hour') }}',
        minuteLabel: '{{ __('spire::spire-ui.timepicker.minute') }}',
        secondLabel: '{{ __('spire::spire-ui.timepicker.second') }}',
        periodLabel: '{{ __('spire::spire-ui.timepicker.period') }}',
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
            <x-spire::timepicker.trigger :placement="$placement" :disabled="$disabled" />
            <x-spire::timepicker.content :placement="$placement" :showSeconds="$showSeconds" />
        </div>
    </div>
</div>
