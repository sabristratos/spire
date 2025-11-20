@props([
    'field' => 'value',
    'label' => null,
    'format' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-tooltip-value');
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()]) }}
    data-spire-chart-tooltip-value
>
    @if($label)
        <span class="spire-chart-tooltip-label">{{ $label }}</span>
    @endif
    <span class="spire-chart-tooltip-number" x-text="formatValue(getValueAtIndex(hoveredIndex, '{{ $field }}'), {{ $format ? json_encode($format) : '{}' }})"></span>
</div>
