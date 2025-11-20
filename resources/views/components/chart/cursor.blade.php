@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-cursor');
@endphp

<line
    {{ $attributes->merge(['class' => $builder->build()]) }}
    x-show="hoveredIndex >= 0"
    x-transition:enter="transition ease-out duration-100"
    x-transition:enter-start="opacity-0"
    x-transition:enter-end="opacity-100"
    x-transition:leave="transition ease-in duration-75"
    x-transition:leave-start="opacity-100"
    x-transition:leave-end="opacity-0"
    :x1="getCursorX()"
    :y1="yRange[0]"
    :x2="getCursorX()"
    :y2="yRange[1]"
    stroke="currentColor"
    data-spire-chart-cursor
/>
