@aware(['placement' => 'bottom-start'])

@props([
    'width' => 'md',
])

@php
use SpireUI\Support\ComponentStyles;

$widthClasses = [
    'sm' => 'min-w-[12rem]',
    'md' => 'min-w-[14rem]',
    'lg' => 'min-w-[16rem]',
    'xl' => 'min-w-[20rem]',
    'auto' => 'min-w-max',
];

$baseClasses = 'animate-dropdown-bounce bg-surface border border-border rounded-lg shadow-lg p-1';

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $widthClasses[$width] ?? $widthClasses['md'],
]);

$mergedAttributes = $attributes->merge([
    'data-placement' => $placement,
    'popover' => 'auto',
    'class' => $classString,
    'role' => 'menu',
    'tabindex' => '-1',
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
