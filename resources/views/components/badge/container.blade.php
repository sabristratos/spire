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
use SpireUI\Support\ComponentStyles;

    $placementClasses = [
        'top-right' => 'top-1 right-1 translate-x-1/2 -translate-y-1/2',
        'top-left' => 'top-1 left-1 -translate-x-1/2 -translate-y-1/2',
        'bottom-right' => 'bottom-1 right-1 translate-x-1/2 translate-y-1/2',
        'bottom-left' => 'bottom-1 left-1 -translate-x-1/2 translate-y-1/2',
    ];

    $sizeClasses = [
        'sm' => $isDot ? 'w-2 h-2' : 'min-w-4 h-4 text-xs px-1',
        'md' => $isDot ? 'w-2.5 h-2.5' : 'min-w-5 h-5 text-xs px-1.5',
        'lg' => $isDot ? 'w-3 h-3' : 'min-w-6 h-6 text-sm px-2',
    ];

    $badgeClassString = ComponentStyles::buildClassString([
        'absolute',
        'flex',
        'items-center',
        'justify-center',
        'rounded-full',
        'font-semibold',
        'transition-fast',
        'z-10',
        $placementClasses[$placement] ?? $placementClasses['top-right'],
        $sizeClasses[$size] ?? $sizeClasses['md'],
        ComponentStyles::colorClasses('solid', $color),
        $showOutline ? 'ring-2 ring-surface' : '',
        $isInvisible ? 'hidden' : '',
    ]);

    $containerAttributes = $attributes->merge([
        'class' => 'relative inline-flex shrink-0',
        'data-spire-badge-container' => 'true',
    ]);
@endphp

<span {{ $containerAttributes }}>
    {{ $slot }}

    @if($content || $isDot)
        <span
            class="{{ $badgeClassString }}"
            data-spire-badge-indicator="true"
            data-spire-placement="{{ $placement }}"
            data-spire-color="{{ $color }}"
        >
            @if(!$isDot && $content)
                {{ $content }}
            @endif
        </span>
    @endif
</span>
