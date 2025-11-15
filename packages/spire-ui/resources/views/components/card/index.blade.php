@props([
    'shadow' => 'md',
    'radius' => 'lg',
    'variant' => 'elevated',
    'fullWidth' => false,
    'isHoverable' => false,
    'isPressable' => false,
    'isBlurred' => false,
    'isFooterBlurred' => false,
    'href' => null,
    'padding' => 'md',
])

@php
use SpireUI\Support\ComponentStyles;

    $tag = $href ? 'a' : 'div';

    $variantClasses = [
        'elevated' => 'bg-surface',
        'bordered' => 'bg-surface border border-border',
        'flat' => 'bg-surface-subtle',
    ];

    $classString = ComponentStyles::buildClassString([
        'relative',
        'overflow-hidden',
        'ease-fast',
        $variantClasses[$variant] ?? $variantClasses['elevated'],
        $variant === 'elevated' ? ComponentStyles::shadowClasses($shadow) : '',
        ComponentStyles::radiusClasses($radius, true),
        ComponentStyles::paddingClasses($padding),
        $fullWidth ? 'w-full' : '',
        $isHoverable ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' : '',
        $isPressable ? 'cursor-pointer active:scale-[0.98]' : '',
        $isBlurred ? 'backdrop-blur-md bg-surface/70' : '',
    ]);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'href' => $href,
        'role' => ($isPressable && !$href) ? 'button' : null,
        'tabindex' => ($isPressable && !$href) ? '0' : null,
        'data-spire-card' => 'true',
        'data-spire-hoverable' => $isHoverable ? 'true' : null,
        'data-spire-pressable' => $isPressable ? 'true' : null,
        'data-spire-blurred' => $isBlurred ? 'true' : null,
        'data-spire-footer-blurred' => $isFooterBlurred ? 'true' : null,
    ]);
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $tag }}>
