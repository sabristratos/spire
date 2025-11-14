@props([
    'size' => 'md',
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'flex items-center justify-between gap-2 w-full transition-fast';

$sizeClasses = [
    'sm' => 'h-8 px-2 text-sm',
    'md' => 'h-10 px-2 text-base',
    'lg' => 'h-12 px-2 text-lg',
];

$variantKey = "input-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    $sizeClasses[$size] ?? $sizeClasses['md'],
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'type' => 'button',
    'aria-haspopup' => 'dialog',
    'x-bind:aria-expanded' => 'open',
    'x-bind:aria-controls' => '$id("popover")',
    'x-bind:disabled' => $disabled ? 'true' : 'false',
]);
@endphp

<div x-ref="trigger" class="w-full">
    <button {{ $mergedAttributes }}>
        <span class="flex-1 text-left truncate text-text" x-text="formattedTime" x-show="formattedTime"></span>
        <span class="flex-1 text-left truncate text-text-muted" x-text="placeholder" x-show="!formattedTime"></span>

        <x-spire::icon name="clock" class="w-4 h-4 shrink-0 text-text-muted" />
    </button>
</div>
