@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-tooltip');
@endphp

<div
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-show="hoveredIndex >= 0"
    x-transition:enter="transition ease-out duration-100"
    x-transition:enter-start="opacity-0 scale-95"
    x-transition:enter-end="opacity-100 scale-100"
    x-transition:leave="transition ease-in duration-75"
    x-transition:leave-start="opacity-100 scale-100"
    x-transition:leave-end="opacity-0 scale-95"
    :style="{
        left: getCursorX() + 'px',
        top: '50%',
        transform: 'translate(' + (getCursorX() > width / 2 ? 'calc(-100% - 12px)' : '12px') + ', -50%)'
    }"
    data-spire-chart-tooltip
    :data-spire-visible="hoveredIndex >= 0"
>
    {{ $slot }}
</div>
