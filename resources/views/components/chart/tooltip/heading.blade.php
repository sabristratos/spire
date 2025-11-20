@props([
    'field' => null,
    'format' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-tooltip-heading');
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-chart-tooltip-heading
    x-text="formatValue({{ $field ? "getValueAtIndex(hoveredIndex, '" . $field . "')" : "''" }}, {{ $format ? json_encode($format) : '{}' }})"
></div>
