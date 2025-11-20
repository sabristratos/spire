@props([
    'axis' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-axis-line');
@endphp

<line
    {{ $attributes->merge(['class' => $builder->build()]) }}
    :x1="getAxisLineX1ByType('{{ $axis }}')"
    :y1="getAxisLineY1ByType('{{ $axis }}')"
    :x2="getAxisLineX2ByType('{{ $axis }}')"
    :y2="getAxisLineY2ByType('{{ $axis }}')"
    stroke="currentColor"
    data-spire-chart-axis-line
    data-axis-type="{{ $axis }}"
/>
