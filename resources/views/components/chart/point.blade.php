@props([
    'field' => 'value',
    'r' => '4',
    'strokeWidth' => '2',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-point');
@endphp

<g
    {{ $attributes->merge(['class' => '']) }}
    data-spire-chart-points
    data-spire-field="{{ $field }}"
    data-spire-point-r="{{ $r }}"
    data-spire-point-stroke-width="{{ $strokeWidth }}"
    data-spire-point-class="{{ $builder->build() }}"
    x-effect="renderPoints($el, '{{ $field }}')"
></g>
