@props([
    'size' => 'md',
    'variant' => 'bordered',
    'radius' => 'md',
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'error' => false,
])

@php
use SpireUI\Support\ComponentClass;

$containerBuilder = ComponentClass::make('timepicker-container');

$boxBuilder = ComponentClass::make('timepicker-box')
    ->size($size)
    ->variant($variant)
    ->radius($radius)
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($error, fn($b) => $b->modifier('error'))
    ->when($readonly, fn($b) => $b->modifier('readonly'));

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$wrapperAttributes = $attributes->only(['class', 'style'])->merge([
    'class' => $containerBuilder->build(),
]);

$boxAttributes = $attributes->except(['class', 'style'])->merge([
    'class' => $boxBuilder->build(),
    'aria-haspopup' => 'dialog',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
    ...$boxBuilder->getDataAttributes(),
]);
@endphp

<div {{ $wrapperAttributes }}>
    <div x-ref="trigger" {{ $boxAttributes }}>
    <div class="spire-timepicker-trigger__segments" data-form-type="other">
        {{-- Hour segment --}}
        <input
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="--"
            autocomplete="off"
            data-lpignore="true"
            data-form-type="other"
            x-ref="hourSegment"
            x-model="segmentValues.hour"
            @input="handleSegmentInput('hour', $event)"
            @paste.prevent="handleSegmentPaste($event)"
            @keydown="handleSegmentKeydown('hour', $event)"
            @focus="focusedSegment = 'hour'; $event.target.select()"
            aria-label="{{ __('spire::spire-ui.timepicker.hour') }}"
            class="spire-timepicker-trigger__segment"
            :disabled="@js($disabled)"
            :readonly="@js($readonly)"
            :required="@js($required)"
            :aria-invalid="@js($error)"
        />

        <span class="spire-timepicker-trigger__separator">:</span>

        {{-- Minute segment --}}
        <input
            type="text"
            inputmode="numeric"
            maxlength="2"
            placeholder="--"
            autocomplete="off"
            data-lpignore="true"
            data-form-type="other"
            x-ref="minuteSegment"
            x-model="segmentValues.minute"
            @input="handleSegmentInput('minute', $event)"
            @paste.prevent="handleSegmentPaste($event)"
            @keydown="handleSegmentKeydown('minute', $event)"
            @focus="focusedSegment = 'minute'; $event.target.select()"
            aria-label="{{ __('spire::spire-ui.timepicker.minute') }}"
            class="spire-timepicker-trigger__segment"
            :disabled="@js($disabled)"
            :readonly="@js($readonly)"
            :required="@js($required)"
            :aria-invalid="@js($error)"
        />

        {{-- Second segment (conditional) --}}
        <template x-if="showSeconds">
            <div class="flex items-center">
                <span class="spire-timepicker-trigger__separator">:</span>
                <input
                    type="text"
                    inputmode="numeric"
                    maxlength="2"
                    placeholder="--"
                    autocomplete="off"
                    data-lpignore="true"
                    data-form-type="other"
                    x-ref="secondSegment"
                    x-model="segmentValues.second"
                    @input="handleSegmentInput('second', $event)"
                    @paste.prevent="handleSegmentPaste($event)"
                    @keydown="handleSegmentKeydown('second', $event)"
                    @focus="focusedSegment = 'second'; $event.target.select()"
                    aria-label="{{ __('spire::spire-ui.timepicker.second') }}"
                    class="spire-timepicker-trigger__segment"
                    :disabled="@js($disabled)"
                    :readonly="@js($readonly)"
                    :required="@js($required)"
                    :aria-invalid="@js($error)"
                />
            </div>
        </template>

        {{-- Period segment (AM/PM) for 12-hour format --}}
        <template x-if="!use24Hour">
            <button
                type="button"
                x-ref="periodSegment"
                @click="togglePeriod(); focusedSegment = 'period'"
                @focus="focusedSegment = 'period'"
                @keydown.space.prevent="togglePeriod()"
                @keydown.enter.prevent="togglePeriod()"
                aria-label="{{ __('spire::spire-ui.timepicker.period') }}"
                class="spire-timepicker-trigger__segment spire-timepicker-trigger__segment--period"
                :disabled="@js($disabled)"
            >
                <span x-text="segmentValues.period || 'AM'"></span>
            </button>
        </template>

        {{-- Clock icon button to open picker --}}
        <x-spire::button
            type="button"
            variant="ghost"
            size="sm"
            icon-only
            @click="toggle(); $event.stopPropagation()"
            class="ml-auto shrink-0"
            :aria-label="__('spire::spire-ui.timepicker.open_picker')"
            :disabled="$disabled"
        >
            <x-spire::icon name="clock" class="w-4 h-4" />
        </x-spire::button>
    </div>
    </div>
</div>
