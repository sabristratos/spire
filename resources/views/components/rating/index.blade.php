@props([
    'value' => 0,
    'maxRating' => 5,
    'size' => 'md',
    'color' => 'warning',
    'readonly' => false,
    'disabled' => false,
    'allowHalf' => false,
    'showTooltip' => false,
    'showReset' => false,
    'showValue' => false,
    'name' => null,
    'id' => null,
])

@php
use SpireUI\Support\ComponentClass;
use SpireUI\Support\WireEntangle;

$componentId = $id ?? 'spire-rating-' . uniqid();
$wireConfig = WireEntangle::fromAttributes($attributes);

$containerBuilder = ComponentClass::make('rating')
    ->size($size)
    ->color($color)
    ->when($readonly, fn($b) => $b->modifier('readonly'))
    ->when(!$readonly && !$disabled, fn($b) => $b->modifier('interactive'))
    ->addIf($disabled, 'opacity-50 cursor-not-allowed');

if ($customClass = $attributes->get('class')) {
    $containerBuilder->addClass($customClass);
}

$starSizes = [
    'sm' => 'w-4 h-4',
    'md' => 'w-5 h-5',
    'lg' => 'w-6 h-6',
];

$iconSize = $starSizes[$size] ?? $starSizes['md'];
@endphp

<div
    x-data="spireRating({
        @if($wireConfig->hasWireModel())
            value: $wire.entangle('{{ $wireConfig->wireModel }}', {{ $wireConfig->liveModifier() }}),
        @else
            value: {{ $value }},
        @endif
        maxRating: {{ $maxRating }},
        readonly: @js($readonly),
        allowHalf: @js($allowHalf),
        showTooltip: @js($showTooltip)
    })"
    id="{{ $componentId }}"
    class="{{ $containerBuilder->build() }}"
    {!! collect($containerBuilder->getDataAttributes())->map(fn($v, $k) => "$k=\"$v\"")->implode(' ') !!}
    role="slider"
    aria-valuemin="0"
    aria-valuemax="{{ $maxRating }}"
    :aria-valuenow="value"
    :aria-valuetext="`${value} out of {{ $maxRating }} stars`"
    aria-label="Rating"
    :aria-readonly="readonly ? 'true' : null"
    {{ WireEntangle::filteredAttributes($attributes) }}
>
    @if($wireConfig->needsHiddenInput())
        <input
            type="hidden"
            {{ WireEntangle::hiddenInputAttributes($attributes) }}
            x-model="value"
        >
    @endif

    <div class="spire-rating-container">
        <div
            x-ref="content"
            popover="hint"
            class="spire-tooltip-content animate-pop"
            data-placement="top"
        >
            <span x-text="`Rated ${value} Star${value !== 1 ? 's' : ''}`"></span>
        </div>

        <div class="spire-rating-stars" x-ref="trigger">
            @for ($i = 1; $i <= $maxRating; $i++)
                <button
                    type="button"
                    @if(!$readonly && !$disabled)
                    @click="handleClick({{ $i }}, $event)"
                    @mouseenter="hoverRating({{ $i }}, $event)"
                    @mousemove="handleMouseMove({{ $i }}, $event)"
                    @mouseleave="clearHover()"
                    @endif
                    :disabled="readonly || {{ $disabled ? 'true' : 'false' }}"
                    class="spire-rating-star"
                    :class="{
                        'spire-rating-star--filled': isStarFilled({{ $i }}),
                        'spire-rating-star--half': isStarHalf({{ $i }})
                    }"
                    :aria-label="`Rate {{ $i }} stars`"
                >
                    <x-spire::icon
                        name="star"
                        class="spire-rating-star-icon spire-rating-star-icon--outline {{ $iconSize }}"
                    />
                    <x-spire::icon
                        name="star"
                        class="spire-rating-star-icon spire-rating-star-icon--filled {{ $iconSize }}"
                    />
                </button>
            @endfor
        </div>

        @if($showValue)
            <div class="spire-rating-value">
                <span x-text="value"></span>
                <span class="spire-rating-value-separator">/</span>
                <span>{{ $maxRating }}</span>
            </div>
        @endif

        @if($showReset)
            <button
                type="button"
                @click="reset()"
                :disabled="value === 0 || readonly || {{ $disabled ? 'true' : 'false' }}"
                class="spire-rating-reset"
                aria-label="Reset rating"
            >
                <x-spire::icon name="refresh-ccw" class="w-3 h-3" />
                <span>Reset</span>
            </button>
        @endif
    </div>
</div>
