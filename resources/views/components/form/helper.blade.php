@props([
    'size' => 'md',
])

@php
use SpireUI\Support\ComponentStyles;

$sizeClasses = [
    'sm' => 'text-xs',
    'md' => 'text-sm',
];

$classString = ComponentStyles::buildClassString([
    'text-text-muted',
    $sizeClasses[$size] ?? $sizeClasses['md'],
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'data-spire-helper' => 'true',
]);
@endphp

<p {{ $mergedAttributes }}>
    {{ $slot }}
</p>
