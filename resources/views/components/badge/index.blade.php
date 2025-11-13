@props([
    'variant' => 'solid',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'full',
    'isDisabled' => false,
    'isDot' => false,
])

@php
use SpireUI\Support\ComponentStyles;

    $dotSizes = [
        'sm' => 'w-1.5 h-1.5',
        'md' => 'w-2 h-2',
        'lg' => 'w-2.5 h-2.5',
    ];

    $dotColors = [
        'default' => 'bg-neutral',
        'primary' => 'bg-primary',
        'secondary' => 'bg-secondary',
        'success' => 'bg-success',
        'error' => 'bg-error',
        'warning' => 'bg-warning',
        'info' => 'bg-info',
    ];

    $classString = ComponentStyles::buildClassString([
        'inline-flex',
        'items-center',
        'justify-center',
        'font-medium',
        'transition-fast',
        'whitespace-nowrap',
        ComponentStyles::sizeClasses($size, 'badge'),
        ComponentStyles::radiusClasses($radius),
        ComponentStyles::colorClasses($variant, $color),
        $isDisabled ? 'opacity-50 cursor-not-allowed' : '',
    ]);

    $mergedAttributes = $attributes->merge([
        'class' => $classString,
        'data-spire-badge' => 'true',
        'data-spire-variant' => $variant,
        'data-spire-color' => $color,
        'data-spire-disabled' => $isDisabled ? 'true' : null,
    ]);

    $showDot = $isDot || $variant === 'dot';
@endphp

<span {{ $mergedAttributes }}>
    @if(isset($startContent))
        <span class="inline-flex items-center justify-center shrink-0">
            {{ $startContent }}
        </span>
    @endif

    @if($showDot)
        <span class="{{ $dotSizes[$size] ?? $dotSizes['md'] }} {{ $dotColors[$color] ?? $dotColors['default'] }} rounded-full shrink-0"></span>
    @endif

    <span class="inline-flex items-center">
        {{ $slot }}
    </span>

    @if(isset($endContent))
        <span class="inline-flex items-center justify-center shrink-0">
            {{ $endContent }}
        </span>
    @endif
</span>
