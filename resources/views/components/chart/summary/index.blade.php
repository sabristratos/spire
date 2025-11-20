@props([])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('chart-summary');
@endphp

<div {{ $attributes->merge(['class' => $builder->build()]) }} data-spire-chart-summary>
    {{ $slot }}
</div>
