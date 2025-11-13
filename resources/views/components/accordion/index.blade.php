@props([
    'variant' => 'bordered',
    'color' => 'default',
    'radius' => 'md',
    'size' => 'md',
    'allowMultiple' => false,
    'defaultOpen' => null,
])

@php
use SpireUI\Support\ComponentStyles;

$variantClasses = [
    'bordered' => 'border border-border',
    'flat' => 'bg-surface-subtle',
    'shadow' => ComponentStyles::shadowClasses('md'),
];

$sizeClasses = [
    'sm' => 'text-sm',
    'md' => 'text-base',
    'lg' => 'text-lg',
];

$classString = ComponentStyles::buildClassString([
    'flex',
    'flex-col',
    ComponentStyles::radiusClasses($radius),
    $variantClasses[$variant] ?? $variantClasses['bordered'],
    $sizeClasses[$size] ?? $sizeClasses['md'],
    $variant === 'bordered' ? 'divide-y divide-border' : 'gap-2',
]);

$accordionId = 'accordion-' . uniqid();
$defaultOpenIndex = is_array($defaultOpen) ? ($defaultOpen[0] ?? null) : $defaultOpen;

$defaultOpenArray = is_array($defaultOpen) ? $defaultOpen : ($defaultOpen !== null ? [$defaultOpen] : []);
$defaultOpenJson = !empty($defaultOpenArray) ? json_encode($defaultOpenArray) : '[]';

$mergedAttributes = $attributes->merge([
    'class' => $classString,
    'data-spire-accordion' => 'true',
    'data-spire-accordion-id' => $accordionId,
    'data-spire-variant' => $variant,
    'data-spire-color' => $color,
    'data-spire-size' => $size,
    'data-spire-allow-multiple' => $allowMultiple ? 'true' : 'false',
    'data-spire-default-open' => $defaultOpenJson,
]);
@endphp

@if($allowMultiple)
    <div {{ $mergedAttributes }}>
        {{ $slot }}
    </div>
@else
    <div {{ $mergedAttributes }} x-data="{ openItem: {{ $defaultOpenIndex ?? 'null' }} }">
        {{ $slot }}
    </div>
@endif
