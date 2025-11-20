@props([
    'field' => 'value',
    'curve' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-line');
@endphp

<path
    {{ $attributes->merge(['class' => $builder->build()]) }}
    :d="generateLinePath('{{ $field }}', {{ $curve ? "'" . $curve . "'" : 'null' }})"
    fill="none"
    stroke="currentColor"
    data-spire-chart-line
    data-spire-field="{{ $field }}"
/>
