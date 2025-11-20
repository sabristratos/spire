@props([
    'placement' => 'bottom-start',
    'showSeconds' => false,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('timepicker-content')
    ->addClass('animate-dropdown-bounce');

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->except(['class'])->merge([
    'data-placement' => $placement,
    'data-spire-timepicker-content' => true,
    'popover' => 'auto',
    'class' => $builder->build(),
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
        {{-- Action buttons header --}}
        <div class="spire-timepicker-actions">
            <button
                type="button"
                @click="setNow"
                class="px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10 rounded-md transition-colors"
                x-text="nowText"
            ></button>

            <span class="text-text-muted">|</span>

            <button
                type="button"
                @click="clearTime"
                class="px-3 py-1.5 text-xs font-medium text-text-muted hover:bg-hover rounded-md transition-colors"
                x-text="clearText"
            ></button>
        </div>

        {{-- Time columns --}}
        <div class="spire-timepicker-columns">
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
