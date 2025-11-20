@props([
    'axis' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-grid');
@endphp

<g
    {{ $attributes->merge(['class' => '']) }}
    data-spire-chart-grid
    data-axis-type="{{ $axis }}"
    data-spire-grid-class="{{ $builder->build() }}"
    x-effect="renderGridLines($el, '{{ $axis }}')"
></g>
