@props([
    'shadow' => 'md',
    'radius' => 'lg',
    'variant' => 'elevated',
    'fullWidth' => false,
    'hoverable' => false,
    'pressable' => false,
    'blurred' => false,
    'footerBlurred' => false,
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
        ->when($hoverable, fn($b) => $b->modifier('hoverable'))
        ->when($pressable, fn($b) => $b->modifier('pressable'))
        ->when($blurred, fn($b) => $b->modifier('blurred'))
        ->dataAttribute('hoverable', $hoverable ? 'true' : null)
        ->dataAttribute('pressable', $pressable ? 'true' : null)
        ->dataAttribute('blurred', $blurred ? 'true' : null)
        ->dataAttribute('footer-blurred', $footerBlurred ? 'true' : null);

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
        'href' => $href,
        'role' => ($pressable && !$href) ? 'button' : null,
        'tabindex' => ($pressable && !$href) ? '0' : null,
    ]);
@endphp

<{{ $tag }} {{ $mergedAttributes }}>
    {{ $slot }}
</{{ $tag }}>
