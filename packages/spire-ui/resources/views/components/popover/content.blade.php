@aware(['placement' => 'bottom-start'])

@props([
    'size' => 'md',
    'padding' => 'normal',
])

@php
use SpireUI\Support\ComponentStyles;

$sizeClasses = [
    'sm' => 'max-w-xs',
    'md' => 'max-w-sm',
    'lg' => 'max-w-md',
    'xl' => 'max-w-lg',
];

$paddingClasses = [
    'none' => '',
    'sm' => 'p-3',
    'normal' => 'p-4',
    'lg' => 'p-6',
];

$baseClasses = 'animate-pop bg-surface border border-border rounded-lg shadow-lg';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    $paddingClasses[$padding] ?? $paddingClasses['normal'],
]);

$mergedAttributes = $attributes->merge([
    'data-placement' => $placement,
    'popover' => 'auto',
    'class' => $classString,
]);
@endphp

<div
    :id="$id('popover')"
    x-ref="content"
    @toggle="handleToggle"
    {{ $mergedAttributes }}
>
    {{ $slot }}
</div>
