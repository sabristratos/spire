@props([
    'size' => 'md',
    'mode' => 'single',
    'minDate' => null,
    'maxDate' => null,
    'disabledDates' => [],
    'disabledDaysOfWeek' => [],
    'locale' => null,
    'firstDayOfWeek' => null,
    'maxRange' => null,
    'minRange' => null,
    'maxDates' => null,
    'showFooter' => true,
    'showClearButton' => true,
    'showTodayButton' => true,
    'todayButtonBehavior' => 'single-day',
    'showPresets' => false,
    'presets' => [],
])

@php
use SpireUI\Support\WireEntangle;
use SpireUI\Support\DateFormatter;
use SpireUI\Support\ComponentClass;

$wireConfig = WireEntangle::fromAttributes($attributes);

$currentLocale = $locale ?? app()->getLocale();
$currentFirstDayOfWeek = $firstDayOfWeek ?? DateFormatter::getFirstDayOfWeek($currentLocale);

$defaultPresets = [
    ['key' => 'last_7_days', 'label' => __('spire::spire-ui.date.preset_last_7_days')],
    ['key' => 'last_30_days', 'label' => __('spire::spire-ui.date.preset_last_30_days')],
    ['key' => 'this_week', 'label' => __('spire::spire-ui.date.preset_this_week')],
    ['key' => 'last_week', 'label' => __('spire::spire-ui.date.preset_last_week')],
    ['key' => 'this_month', 'label' => __('spire::spire-ui.date.preset_this_month')],
    ['key' => 'last_month', 'label' => __('spire::spire-ui.date.preset_last_month')],
];

$activePresets = empty($presets) ? $defaultPresets : $presets;

$hasPresets = $showPresets && $mode === 'range';

$builder = ComponentClass::make('calendar')
    ->size($size);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

@endphp

<div
    x-data="calendarComponent({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        mode: '{{ $mode }}',
        locale: '{{ $currentLocale }}',
        firstDayOfWeek: {{ $currentFirstDayOfWeek }},
        minDate: {{ $minDate ? "'{$minDate}'" : 'null' }},
        maxDate: {{ $maxDate ? "'{$maxDate}'" : 'null' }},
        disabledDates: {{ json_encode($disabledDates) }},
        disabledDaysOfWeek: {{ json_encode($disabledDaysOfWeek) }},
        maxRange: {{ $maxRange ?? 'null' }},
        minRange: {{ $minRange ?? 'null' }},
        maxDates: {{ $maxDates ?? 'null' }},
        todayButtonBehavior: '{{ $todayButtonBehavior }}',
        presets: {{ json_encode($activePresets) }},
    })"
    {{ $attributes->except(['class'])->merge([
        'class' => $builder->build(),
        'data-spire-calendar' => 'true',
        'data-spire-size' => $size,
        'data-spire-mode' => $mode,
    ]) }}
>
    @if($wireConfig->needsHiddenInput())
        @if($mode === 'range')
            <input
                type="hidden"
                {{ WireEntangle::hiddenInputAttributes($attributes) }}
                :value="JSON.stringify(value)"
            >
        @elseif($mode === 'multiple')
            <template x-for="(date, index) in (Array.isArray(value) ? value : [])" :key="index">
                <input
                    type="hidden"
                    :name="'{{ $attributes->get('name') }}[]'"
                    :value="date"
                >
            </template>
        @else
            <input
                type="hidden"
                {{ WireEntangle::hiddenInputAttributes($attributes) }}
                x-model="value"
            >
        @endif
    @endif

    <div wire:ignore x-id="['calendar-picker']">
        @if($showPresets && $mode === 'range')
            <div class="flex gap-2">
                <x-spire::calendar.presets :presets="$activePresets" />
                <div class="{{ $builder->build() }}">
                    <x-spire::calendar.header />
                    <x-spire::calendar.month-year-picker />
                    <x-spire::calendar.grid />
                    @if($showFooter)
                        <x-spire::calendar.footer
                            :show-clear="$showClearButton"
                            :show-today="$showTodayButton"
                        />
                    @endif
                </div>
            </div>
        @else
            <div class="{{ $builder->build() }}">
                <x-spire::calendar.header />
                <x-spire::calendar.month-year-picker />
                <x-spire::calendar.grid />
                @if($showFooter)
                    <x-spire::calendar.footer
                        :show-clear="$showClearButton"
                        :show-today="$showTodayButton"
                    />
                @endif
            </div>
        @endif
    </div>
</div>
