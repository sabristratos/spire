@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-legend-indicator');
@endphp

<span {{ $attributes->merge(['class' => $builder->build()]) }} data-spire-chart-legend-indicator></span>
