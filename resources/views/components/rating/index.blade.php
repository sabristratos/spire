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
    x-data="ratingComponent({
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
        @if($showTooltip)
            <div
                x-ref="tooltip"
                x-show="tooltipVisible"
                x-transition:enter="transition ease-out duration-200"
                x-transition:enter-start="opacity-0 -translate-y-2"
                x-transition:enter-end="opacity-100 translate-y-0"
                x-transition:leave="transition ease-in duration-150"
                x-transition:leave-start="opacity-100 translate-y-0"
                x-transition:leave-end="opacity-0 -translate-y-2"
                class="spire-rating-tooltip"
                style="display: none;"
            >
                <span x-text="`Rated ${value} Star${value !== 1 ? 's' : ''}`"></span>
            </div>
        @endif

        <div class="spire-rating-stars">
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
                        :class="$iconSize"
                        class="spire-rating-star-icon spire-rating-star-icon--outline"
                    />
                    <x-spire::icon
                        name="star"
                        :class="$iconSize"
                        class="spire-rating-star-icon spire-rating-star-icon--filled"
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
                <x-spire::icon name="refresh-ccw-01" class="w-3 h-3" />
                <span>Reset</span>
            </button>
        @endif
    </div>
</div>
