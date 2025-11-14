@props([
    'placement' => 'bottom-start',
    'showSeconds' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'animate-dropdown-bounce bg-surface border border-border rounded-lg shadow-lg';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    'p-3',
]);

$mergedAttributes = $attributes->merge([
    'data-placement' => $placement,
    'data-spire-timepicker-content' => true,
    'popover' => 'auto',
    'class' => $classString,
    'role' => 'dialog',
    'aria-label' => __('spire::spire-ui.timepicker.picker_label'),
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    @keydown.escape="hide"
    tabindex="-1"
    {{ $mergedAttributes }}
>
    <div class="flex flex-col gap-3">
        {{-- Action buttons --}}
        <div class="flex items-center justify-between gap-2">
            <button
                type="button"
                @click="setNow"
                class="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                x-text="nowText"
            ></button>

            <button
                type="button"
                @click="clearTime"
                class="px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-hover rounded-md transition-colors"
                x-text="clearText"
            ></button>
        </div>

        {{-- Time columns --}}
        <div class="flex gap-2">
            {{-- Hour column --}}
            <x-spire::timepicker.column
                type="hour"
                :label="__('spire::spire-ui.timepicker.hour')"
            />

            <div class="flex items-center text-text-muted font-bold text-lg px-1">:</div>

            {{-- Minute column --}}
            <x-spire::timepicker.column
                type="minute"
                :label="__('spire::spire-ui.timepicker.minute')"
            />

            @if($showSeconds)
                <div class="flex items-center text-text-muted font-bold text-lg px-1">:</div>

                {{-- Second column --}}
                <x-spire::timepicker.column
                    type="second"
                    :label="__('spire::spire-ui.timepicker.second')"
                />
            @endif

            {{-- Period column (AM/PM) for 12-hour format --}}
            <template x-if="!use24Hour">
                <x-spire::timepicker.column
                    type="period"
                    :label="__('spire::spire-ui.timepicker.period')"
                />
            </template>
        </div>
    </div>
</div>
