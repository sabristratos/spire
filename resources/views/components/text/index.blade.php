@props([
    'as' => config('spire-ui.defaults.text.as', 'p'),
    'variant' => config('spire-ui.defaults.text.variant', 'default'),
    'color' => null,
])

@php
use SpireUI\Support\ComponentClass;

$builder = ComponentClass::make('text')
    ->modifier($variant)
    ->when($color, fn($b) => $b->modifier($color));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
]);
@endphp

<{{ $as }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $as }}>
