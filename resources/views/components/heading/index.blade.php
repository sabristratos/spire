@props([
    'size' => config('spire-ui.defaults.heading.size', 'sm'),
    'level' => null,
    'accent' => false,
])

@php
use SpireUI\Support\ComponentClass;

$tag = $level ? "h{$level}" : 'div';

$builder = ComponentClass::make('heading')
    ->size($size)
    ->when($accent, fn($b) => $b->modifier('accent'));

if ($customClass = $attributes->get('class')) {
    $builder->addClass($customClass);
}

$mergedAttributes = $attributes->merge([
    'class' => $builder->build(),
]);
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $tag }}>
