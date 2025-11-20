@props([
    'variant' => 'solid',
    'color' => 'default',
    'size' => 'md',
    'radius' => 'full',
    'disabled' => false,
])

@php
use SpireUI\Support\ComponentClass;

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
        'featured' => 'bg-featured',
    ];

    $showDot = $variant === 'dot';

    $builder = ComponentClass::make('badge')
        ->size($size)
        ->radius($radius)
        ->when($showDot, fn($b) => $b->modifier('dot'))
        ->addIf($disabled, 'opacity-50', 'cursor-not-allowed')
        ->dataAttribute('disabled', $disabled ? 'true' : null);

    if ($variant !== 'dot') {
        $builder->colorVariant($color, $variant);
    }

    if ($customClass = $attributes->get('class')) {
        $builder->addClass($customClass);
    }

    $mergedAttributes = $attributes->merge([
        'class' => $builder->build(),
        ...$builder->getDataAttributes(),
    ]);
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
