@props([
    'for' => null,
    'required' => false,
    'size' => 'md',
])

@php
use SpireUI\Support\ComponentStyles;

$sizeClasses = [
    'sm' => 'text-xs',
    'md' => 'text-sm',
    'lg' => 'text-base',
];

$classString = ComponentStyles::buildClassString([
    'block',
    'font-medium',
    'text-text',
    $sizeClasses[$size] ?? $sizeClasses['md'],
]);

$mergedAttributes = $attributes->merge([
    'for' => $for,
    'class' => $classString,
    'data-spire-label' => 'true',
]);
@endphp

<label {{ $mergedAttributes }}>
    {{ $slot }}
    @if($required)
        <span class="text-error">*</span>
    @endif
</label>
