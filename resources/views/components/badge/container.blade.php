@props([
    'content' => null,
    'placement' => 'top-right',
    'color' => 'error',
    'size' => 'md',
    'isDot' => false,
    'isInvisible' => false,
    'showOutline' => true,
])

@php
use SpireUI\Support\ComponentClass;

    $indicatorBuilder = ComponentClass::make('badge__indicator')
        ->modifier($placement)
        ->size($size)
        ->colorVariant($color, 'solid')
        ->when($isDot, fn($b) => $b->modifier('dot'))
        ->when($showOutline, fn($b) => $b->modifier('outline'))
        ->addIf($isInvisible, 'hidden');

    $containerAttributes = $attributes->merge([
        'class' => 'spire-badge__container',
        'data-spire-badge-container' => 'true',
    ]);
@endphp

<span {{ $containerAttributes }}>
    {{ $slot }}

    @if($content || $isDot)
        <span
            class="{{ $indicatorBuilder->build() }}"
            data-spire-badge-indicator="true"
            data-spire-placement="{{ $placement }}"
            {!! implode(' ', array_map(fn($k, $v) => "{$k}=\"{$v}\"", array_keys($indicatorBuilder->getDataAttributes()), $indicatorBuilder->getDataAttributes())) !!}
        >
            @if(!$isDot && $content)
                {{ $content }}
            @endif
        </span>
    @endif
</span>
