@props([
    'padding' => 'default',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('modal-body');

if ($padding !== 'default') {
    $builder->modifier($padding);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    ...$builder->getDataAttributes(),
]);
@endphp

<div {{ $mergedAttributes }}>
    {{ $slot }}
</div>
