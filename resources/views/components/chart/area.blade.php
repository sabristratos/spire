@props([
    'field' => 'value',
    'curve' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-area');
@endphp

<path
    {{ $attributes->merge(['class' => $builder->build()]) }}
    :d="generateAreaPath('{{ $field }}', {{ $curve ? "'" . $curve . "'" : 'null' }})"
    fill="currentColor"
    stroke="none"
    data-spire-chart-area
    data-spire-field="{{ $field }}"
/>
