@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-zero-line');
@endphp

<line
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-show="hasNegativeValues()"
    :x1="xRange[0]"
    :y1="getZeroY()"
    :x2="xRange[1]"
    :y2="getZeroY()"
    stroke="currentColor"
    data-spire-chart-zero-line
/>
