@props([
    'label' => '',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-legend');
@endphp

<div {{ $attributes->merge(['class' => $builder->build()]) }} data-spire-chart-legend>
    {{ $slot }}
    <span class="spire-chart-legend-label">{{ $label }}</span>
</div>
