@props([
    'mode' => 'single',
    'size' => spire_default('slider', 'size', 'md'),
    'color' => 'neutral',
    'min' => 0,
    'max' => 100,
    'step' => 1,
    'showSteps' => false,
    'marks' => [],
    'showValue' => true,
    'editableValue' => false,
    'showTooltip' => true,
    'disabled' => false,
    'readonly' => false,
    'label' => null,
    'icon' => null,
    'iconTrailing' => null,
])

@php
use SpireUI\Support\WireEntangle;
use SpireUI\Support\ComponentClass;

$wireConfig = WireEntangle::fromAttributes($attributes);
$componentId = $attributes->get('id') ?? 'spire-slider-' . uniqid();
$livewireInputId = $componentId . '-livewire-input';

$normalizedMarks = is_array($marks) ? $marks : [];
$hasIcons = $icon || $iconTrailing || isset($leading) || isset($trailing);

$containerBuilder = ComponentClass::make('slider')
    ->when($disabled, fn($b) => $b->modifier('disabled'))
    ->when($readonly, fn($b) => $b->modifier('readonly'))
    ->when(!empty($normalizedMarks) || $showSteps, fn($b) => $b->modifier('with-marks'))
    ->when($hasIcons, fn($b) => $b->modifier('with-icons'));

$iconSize = match($size) {
    'sm' => 'size-4',
    'lg' => 'size-6',
    default => 'size-5',
};

$trackBuilder = ComponentClass::make('slider-track')
    ->size($size);

$thumbBuilder = ComponentClass::make('slider-thumb')
    ->size($size)
    ->color($color);

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$wrapperAttributes = $attributes->only(['class', 'style'])->merge([
    'class' => $containerBuilder->build(),
    'id' => $componentId,
]);

$filteredAttributes = WireEntangle::filteredAttributes($attributes);
@endphp

<div
    x-data="spireSlider({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @endif
        mode: '{{ $mode }}',
        min: {{ $min }},
        max: {{ $max }},
        step: {{ $step }},
        disabled: {{ $disabled ? 'true' : 'false' }},
        readonly: {{ $readonly ? 'true' : 'false' }},
        showTooltip: {{ $showTooltip ? 'true' : 'false' }},
        marks: @js($normalizedMarks),
        showSteps: {{ $showSteps ? 'true' : 'false' }},
        minLabel: '{{ __('spire::spire-ui.slider.min_label') }}',
        maxLabel: '{{ __('spire::spire-ui.slider.max_label') }}',
        valueLabel: '{{ $label ?? __('spire::spire-ui.slider.value_label') }}',
    })"
    {{ $wrapperAttributes }}
    {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
>
    @if($wireConfig->needsHiddenInput())
        @if($mode === 'range')
            <input
                type="hidden"
                {{ WireEntangle::hiddenInputAttributes($attributes) }}
                :value="JSON.stringify(value)"
            >
        @else
            <input
                type="hidden"
                {{ WireEntangle::hiddenInputAttributes($attributes) }}
                x-model="value"
            >
        @endif
    @endif

    <div wire:ignore>
        @if($label || $showValue)
            <div class="spire-slider-header">
                @if($label)
                    <label class="spire-slider-label">{{ $label }}</label>
                @endif

                @if($showValue)
                    @if($editableValue && !$readonly && !$disabled)
                        @if($mode === 'range')
                            <div class="spire-slider-inputs">
                                <input
                                    type="number"
                                    class="spire-slider-input"
                                    x-ref="startInput"
                                    x-effect="if (!$el.matches(':focus')) $el.value = value.start"
                                    @change="updateRangeFromInput('start', $event.target.value)"
                                    min="{{ $min }}"
                                    max="{{ $max }}"
                                    step="{{ $step }}"
                                    aria-label="{{ __('spire::spire-ui.slider.min_label') }}"
                                >
                                <span class="spire-slider-input-separator">–</span>
                                <input
                                    type="number"
                                    class="spire-slider-input"
                                    x-ref="endInput"
                                    x-effect="if (!$el.matches(':focus')) $el.value = value.end"
                                    @change="updateRangeFromInput('end', $event.target.value)"
                                    min="{{ $min }}"
                                    max="{{ $max }}"
                                    step="{{ $step }}"
                                    aria-label="{{ __('spire::spire-ui.slider.max_label') }}"
                                >
                            </div>
                        @else
                            <input
                                type="number"
                                class="spire-slider-input"
                                x-ref="valueInput"
                                x-effect="if (!$el.matches(':focus')) $el.value = value"
                                @change="updateFromInput($event.target.value)"
                                min="{{ $min }}"
                                max="{{ $max }}"
                                step="{{ $step }}"
                                aria-label="{{ $label ?? __('spire::spire-ui.slider.value_label') }}"
                            >
                        @endif
                    @else
                        <output class="spire-slider-value" x-text="formatValue()"></output>
                    @endif
                @endif
            </div>
        @endif

        <div class="spire-slider-track-wrapper">
            @if($icon)
                <x-spire::icon :name="$icon" class="spire-slider-icon {{ $iconSize }}" />
            @endif
            @if(isset($leading))
                <span class="spire-slider-icon">{{ $leading }}</span>
            @endif

            <div
                class="spire-slider-container"
                :class="{ 'opacity-50 cursor-not-allowed': disabled }"
                :data-spire-dragging="isDragging"
            >
            <div
                x-ref="track"
                class="{{ $trackBuilder->build() }}"
                {!! collect($trackBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
                @mousedown="handleTrackClick($event)"
                @touchstart="handleTouchStart($event)"
                role="presentation"
            >
                <div
                    class="spire-slider-fill spire-slider-fill--{{ $color }}"
                    x-show="mode === 'single' || (mode === 'range' && value.start !== value.end)"
                    :style="getFillStyle()"
                ></div>

                <template x-if="showSteps">
                    <div class="spire-slider-steps">
                        <template x-for="stepValue in stepMarkers" :key="stepValue">
                            <div
                                class="spire-slider-step"
                                :class="{ 'spire-slider-step--active': isStepInRange(stepValue) }"
                                :style="getStepStyle(stepValue)"
                                :data-spire-in-range="isStepInRange(stepValue)"
                            ></div>
                        </template>
                    </div>
                </template>

                <template x-if="marks.length > 0">
                    <div class="spire-slider-marks">
                        <template x-for="mark in marks" :key="mark.value">
                            <div
                                class="spire-slider-mark"
                                :class="{ 'spire-slider-mark--active': isStepInRange(mark.value) }"
                                :style="getMarkStyle(mark.value)"
                                @click="!disabled && !readonly && jumpToValue(mark.value)"
                            >
                                <div
                                    class="spire-slider-mark-dot"
                                    :data-spire-in-range="isStepInRange(mark.value)"
                                ></div>
                                <span class="spire-slider-mark-label" x-text="mark.label"></span>
                            </div>
                        </template>
                    </div>
                </template>

                @if($mode === 'range')
                    <div
                        x-ref="startThumb"
                        class="{{ $thumbBuilder->build() }}"
                        :style="getThumbStyle('start')"
                        :data-spire-dragging="isDragging && activeThumb === 'start'"
                        @mousedown="startDrag('start', $event)"
                        @touchstart="startDrag('start', $event)"
                        @keydown="handleKeyDown('start', $event)"
                        role="slider"
                        tabindex="{{ $disabled || $readonly ? '-1' : '0' }}"
                        :aria-label="minLabel"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="value.start"
                        :aria-valuetext="formatAriaValue(value.start)"
                        aria-orientation="horizontal"
                        :aria-disabled="disabled ? 'true' : null"
                        :aria-readonly="readonly ? 'true' : null"
                    ></div>

                    <div
                        x-ref="endThumb"
                        class="{{ $thumbBuilder->build() }}"
                        :style="getThumbStyle('end')"
                        :data-spire-dragging="isDragging && activeThumb === 'end'"
                        @mousedown="startDrag('end', $event)"
                        @touchstart="startDrag('end', $event)"
                        @keydown="handleKeyDown('end', $event)"
                        role="slider"
                        tabindex="{{ $disabled || $readonly ? '-1' : '0' }}"
                        :aria-label="maxLabel"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="value.end"
                        :aria-valuetext="formatAriaValue(value.end)"
                        aria-orientation="horizontal"
                        :aria-disabled="disabled ? 'true' : null"
                        :aria-readonly="readonly ? 'true' : null"
                    ></div>
                @else
                    <div
                        x-ref="thumb"
                        class="{{ $thumbBuilder->build() }}"
                        :style="getThumbStyle()"
                        :data-spire-dragging="isDragging"
                        @mousedown="startDrag('single', $event)"
                        @touchstart="startDrag('single', $event)"
                        @keydown="handleKeyDown('single', $event)"
                        role="slider"
                        tabindex="{{ $disabled || $readonly ? '-1' : '0' }}"
                        :aria-label="valueLabel"
                        :aria-valuemin="min"
                        :aria-valuemax="max"
                        :aria-valuenow="value"
                        :aria-valuetext="formatAriaValue(value)"
                        aria-orientation="horizontal"
                        :aria-disabled="disabled ? 'true' : null"
                        :aria-readonly="readonly ? 'true' : null"
                    ></div>
                @endif
            </div>

            <div
                x-show="showTooltip && tooltipVisible"
                x-ref="tooltip"
                class="spire-tooltip__content"
                :style="getTooltipStyle()"
                role="tooltip"
                x-text="tooltipValue"
                x-cloak
            ></div>
        </div>

            @if($iconTrailing)
                <x-spire::icon :name="$iconTrailing" class="spire-slider-icon {{ $iconSize }}" />
            @endif
            @if(isset($trailing))
                <span class="spire-slider-icon">{{ $trailing }}</span>
            @endif
        </div>
    </div>
</div>
