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
use SpireUI\Support\ComponentClass;

    $tag = $href ? 'a' : 'div';

    $builder = ComponentClass::make('card')
        ->modifier($variant)
        ->modifier("padding-{$padding}")
        ->radius($radius)
        ->when($variant === 'elevated', fn($b) => $b->shadow($shadow))
        ->when($fullWidth, fn($b) => $b->modifier('full-width'))
        ->when($isHoverable, fn($b) => $b->modifier('hoverable'))
        ->when($isPressable, fn($b) => $b->modifier('pressable'))
        ->when($isBlurred, fn($b) => $b->modifier('blurred'));

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
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
