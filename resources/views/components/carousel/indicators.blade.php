@props([
    'variant' => config('spire-ui.defaults.carousel.indicators.variant', 'dots'),
    'size' => config('spire-ui.defaults.carousel.indicators.size', config('spire-ui.defaults.size', 'sm')),
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('carousel-indicators')
    ->modifier($variant)
    ->modifier($size);
@endphp

<div
    {{ $attributes->merge([
        'class' => $builder->build(),
        'role' => 'tablist',
        'aria-label' => __('spire-ui.carousel.slide_indicators'),
    ]) }}
>
    <template x-for="(_, index) in totalPages" x-bind:key="index">
        <button
            type="button"
            class="spire-carousel-indicators__item"
            role="tab"
            x-on:click="goToPage(index)"
            x-bind:aria-selected="isCurrentPage(index)"
            x-bind:aria-current="isCurrentPage(index) ? 'true' : null"
            x-bind:aria-label="getIndicatorLabel(index)"
            x-bind:tabindex="isCurrentPage(index) ? 0 : -1"
            x-bind:data-spire-carousel-active="isCurrentPage(index)"
        >
            @if($variant === 'numbers')
                <span x-text="index + 1"></span>
            @endif
        </button>
    </template>
</div>
