@props([
    'orientation' => 'horizontal',
    'size' => 'md',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('data-list')
    ->size($size)
    ->modifier($orientation);
@endphp

<dl {{ $attributes->merge(['class' => $builder->build(), ...$builder->getDataAttributes()]) }}>
    {{ $slot }}
</dl>
