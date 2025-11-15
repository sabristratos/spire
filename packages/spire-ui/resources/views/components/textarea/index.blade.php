@props([
    'variant' => 'bordered',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'md',
    'rows' => 4,
    'disabled' => false,
    'readonly' => false,
    'required' => false,
    'placeholder' => null,
    'resize' => 'vertical',
])

@php
use SpireUI\Support\ComponentStyles;

$baseClasses = 'w-full ease-fast';

$resizeClasses = [
    'none' => 'resize-none',
    'vertical' => 'resize-y',
    'horizontal' => 'resize-x',
    'both' => 'resize',
];

$variantKey = "textarea-{$variant}";
$variantClasses = ComponentStyles::colorClasses($variantKey, $color);

$conditionalClasses = [];

if ($disabled) {
    $conditionalClasses[] = 'opacity-50 cursor-not-allowed';
}

if ($readonly) {
    $conditionalClasses[] = 'cursor-default';
}

$classString = ComponentStyles::buildClassString([
    $baseClasses,
    ComponentStyles::sizeClasses($size, 'textarea'),
    ComponentStyles::radiusClasses($radius),
    $variantClasses,
    $resizeClasses[$resize] ?? $resizeClasses['vertical'],
    ...$conditionalClasses,
]);

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'rows' => $rows,
    'disabled' => $disabled ? true : null,
    'readonly' => $readonly ? true : null,
    'required' => $required ? true : null,
    'placeholder' => $placeholder,
    'data-spire-textarea' => 'true',
    'data-spire-variant' => $variant,
    'data-spire-size' => $size,
]);
@endphp

<textarea {{ $mergedAttributes }}>{{ $slot }}</textarea>
