@props([
    'size' => 'md',
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('helper')
    ->size($size);

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
    'data-spire-helper' => 'true',
]);
@endphp

<p {{ $mergedAttributes }}>
    {{ $slot }}
</p>
