@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-viewport');
@endphp

<div {{ $attributes->merge(['class' => $builder->build()]) }} data-spire-chart-viewport>
    {{ $slot }}
</div>
