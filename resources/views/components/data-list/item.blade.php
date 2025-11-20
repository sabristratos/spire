@props([
    'align' => 'baseline',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('data-list-item')
    ->modifier($align);
@endphp

<div {{ $attributes->merge(['class' => $builder->build()]) }}>
    {{ $slot }}
</div>
