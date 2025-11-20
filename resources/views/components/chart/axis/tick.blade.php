@props([
    'axis' => null,
    'dy' => null,
    'dx' => null,
    'textAnchor' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-tick');
@endphp

<g
    {{ $attributes->merge(['class' => '']) }}
    data-spire-chart-ticks
    data-axis-type="{{ $axis }}"
    data-spire-tick-class="{{ $builder->build() }}"
    data-spire-tick-dy="{{ $dy ?? '0' }}"
    data-spire-tick-dx="{{ $dx ?? '0' }}"
    data-spire-tick-anchor="{{ $textAnchor ?? 'middle' }}"
    x-effect="renderTicks($el, '{{ $axis }}')"
></g>
