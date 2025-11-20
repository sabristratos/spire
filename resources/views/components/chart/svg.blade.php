@props([
    'gutter' => '8',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-svg');
@endphp

<svg
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-init="setGutter('{{ $gutter }}')"
    @mousemove="handleMouseMove($event)"
    @mouseleave="handleMouseLeave()"
    data-spire-chart-svg
    preserveAspectRatio="none"
    width="100%"
    height="100%"
>
    {{ $slot }}
</svg>
